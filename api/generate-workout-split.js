import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { experience, daysPerWeek, location, goal, includeCardio } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Gemini API key not configured on server' 
      });
    }

    if (!experience || !daysPerWeek || !location || !goal) {
      return res.status(400).json({ 
        error: 'All parameters are required' 
      });
    }

    const MODEL_NAME = 'models/gemini-1.5-flash-002';
    const API_URL = `https://generativelanguage.googleapis.com/v1/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const prompt = `
    Create a detailed workout split plan based on the following user preferences:

    EXPERIENCE LEVEL: ${experience}
    DAYS PER WEEK: ${daysPerWeek}
    LOCATION: ${location}
    FITNESS GOAL: ${goal}
    INCLUDE CARDIO: ${includeCardio ? 'Yes' : 'No'}

    REQUIREMENTS:
    - Create a ${daysPerWeek}-day weekly workout split
    - Rest days should be 7 - ${daysPerWeek} = ${7 - daysPerWeek} days
    - Include specific exercises with sets and reps
    - Adjust difficulty based on experience level (${experience})
    - Use equipment appropriate for the location (${location})
    - Focus on the user's goal: ${goal}
    - ${includeCardio ? 'Include cardio sessions where appropriate' : 'No cardio sessions needed'}
    - Provide rest periods between sets
    - Include workout duration estimates

    EXERCISE FORMAT FOR EACH EXERCISE:
    {
      "name": "Exercise Name",
      "sets": 3-4,
      "reps": "8-12" or "10-15" or "4-6" based on goal,
      "rest": "60-90s",
      "muscleGroup": "Primary muscle group",
      "equipment": "Required equipment"
    }

    DAY FORMAT FOR EACH DAY:
    {
      "day": "Day 1",
      "focus": "e.g., Chest & Triceps, Legs, etc.",
      "exercises": [ ...exercises ],
      "duration": "e.g., 45-60 minutes"
    }

    OUTPUT FORMAT:
    Return ONLY valid JSON with this structure:
    {
      "splitName": "e.g., ${experience} ${goal} Split",
      "goal": "${goal}",
      "experience": "${experience}",
      "location": "${location}",
      "days": [
        { ...day1 },
        { ...day2 },
        ...
      ],
      "totalDuration": "e.g., 4-6 hours weekly",
      "totalExercises": 15
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
    cleanContent = cleanContent.replace(/^```\s*/i, '');
    cleanContent = cleanContent.replace(/\s*```$/i, '');
    cleanContent = cleanContent.trim();

    try {
      const parsedContent = JSON.parse(cleanContent);
      
      if (parsedContent.days && Array.isArray(parsedContent.days)) {
        return res.json({ success: true, workoutSplit: parsedContent });
      }
      
      throw new Error('Invalid workout split structure');
      
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      res.status(500).json({ 
        error: 'Failed to parse workout split response as JSON' 
      });
    }

  } catch (error) {
    console.error('Workout split generation error:', error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    } else {
      res.status(500).json({ 
        error: error.response?.data?.error?.message || 'Failed to generate workout split' 
      });
    }
  }
}