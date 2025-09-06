import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { targetMuscles, frequency, experience, location } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Gemini API key not configured on server' 
      });
    }

    if (!targetMuscles || !frequency || !experience || !location) {
      return res.status(400).json({ 
        error: 'All parameters are required' 
      });
    }

    const MODEL_NAME = 'models/gemini-1.5-flash-002';
    const API_URL = `https://generativelanguage.googleapis.com/v1/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const prompt = `
    Create a detailed workout plan based on the following user preferences:

    TARGET MUSCLES: ${targetMuscles.join(', ')}
    TRAINING FREQUENCY: ${frequency}
    EXPERIENCE LEVEL: ${experience}
    WORKOUT LOCATION: ${location}

    REQUIREMENTS:
    - Generate 6-8 exercises
    - Include exercises appropriate for the location (${location})
    - Adjust difficulty based on experience level (${experience})
    - Focus on the target muscle groups
    - Include proper sets, reps, and rest periods
    - Provide clear instructions for each exercise
    - Include YouTube video URLs for exercise tutorials
    - Specify primary and secondary muscles worked

    EXERCISE FORMAT FOR EACH EXERCISE:
    {
      "name": "Exercise Name",
      "sets": 3-4,
      "reps": "8-12" or "10-15",
      "rest": "60-90s",
      "muscle": "Primary Muscle Group",
      "difficulty": "${experience}",
      "videoUrl": "https://www.youtube.com/watch?v=video_id",
      "instructions": ["Step 1", "Step 2", "Step 3", "Step 4"],
      "primaryMuscles": ["muscle1", "muscle2"],
      "secondaryMuscles": ["muscle3", "muscle4"]
    }

    OUTPUT FORMAT:
    Return ONLY valid JSON with this structure:
    {
      "exercises": [
        { ...exercise1 },
        { ...exercise2 },
        { ...exercise3 },
        { ...exercise4 }
      ],
      "workoutType": "e.g., Upper Body, Push Day, etc.",
      "totalDuration": "e.g., 45-60 minutes",
      "totalExercises": 4
    }

    IMPORTANT: Return ONLY valid JSON format with no additional text.
    `;

    const response = await axios.post(
      API_URL,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
          topP: 0.8,
          topK: 40,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000
      }
    );

    if (!response.data || !response.data.candidates || !response.data.candidates[0]) {
      throw new Error('Invalid response format from Gemini API');
    }

    const content = response.data.candidates[0].content.parts[0].text;
    
    if (!content) {
      throw new Error('No content received from Gemini API');
    }

    let cleanContent = content.trim();
    cleanContent = cleanContent.replace(/^```json\s*/i, '');
    cleanContent = cleanContent.replace(/\s*```$/i, '');
    cleanContent = cleanContent.replace(/^```\s*/i, '');
    cleanContent = cleanContent.trim();

    try {
      const parsedContent = JSON.parse(cleanContent);
      
      if (parsedContent.exercises && Array.isArray(parsedContent.exercises)) {
        return res.json({ success: true, workoutPlan: parsedContent });
      }
      
      throw new Error('Invalid workout plan structure');
      
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      res.status(500).json({ 
        error: 'Failed to parse workout response as JSON' 
      });
    }

  } catch (error) {
    console.error('Workout generation error:', error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    } else {
      res.status(500).json({ 
        error: error.response?.data?.error?.message || 'Failed to generate workout plan' 
      });
    }
  }
}