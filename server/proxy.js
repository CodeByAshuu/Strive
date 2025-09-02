// server/proxy.js
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Use one of the available models that supports generateContent
const AVAILABLE_MODELS = [
  'models/gemini-1.5-flash-002',     // Most recent Gemini 1.5 Pro
  'models/gemini-1.5-pro',         // Stable Gemini 1.5 Pro
  'models/gemini-1.5-flash-002',   // Fast and efficient
  'models/gemini-1.5-flash',       // Fast and versatile
  'models/gemini-2.0-flash-001'    // Latest Flash model
];

// Meal plan generation endpoint
app.post('/api/generate-meal-plan', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Gemini API key not configured on server' 
      });
    }

    if (!prompt) {
      return res.status(400).json({ 
        error: 'Prompt is required' 
      });
    }

    console.log('📤 Forwarding request to Gemini API...');

    // Use the first available model
    const MODEL_NAME = AVAILABLE_MODELS[0]; // gemini-1.5-pro-002
    const API_URL = `https://generativelanguage.googleapis.com/v1/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    console.log(`🤖 Using model: ${MODEL_NAME}`);

    const response = await axios.post(
      API_URL,
      {
        contents: [{
          parts: [{
            text: `${prompt}\n\nIMPORTANT: Return ONLY valid JSON format with no additional text, no markdown, no code blocks. The response must be valid JSON that can be parsed by JSON.parse().`
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

    console.log('✅ Received response from Gemini API');

    if (!response.data || !response.data.candidates || !response.data.candidates[0]) {
      throw new Error('Invalid response format from Gemini API');
    }

    // Extract and clean the content
    const content = response.data.candidates[0].content.parts[0].text;
    
    if (!content) {
      throw new Error('No content received from Gemini API');
    }

    let cleanContent = content.trim();
    
    // Remove JSON code blocks if present
    cleanContent = cleanContent.replace(/^```json\s*/i, '');
    cleanContent = cleanContent.replace(/\s*```$/i, '');
    cleanContent = cleanContent.replace(/^```\s*/i, '');
    cleanContent = cleanContent.trim();

    console.log('📝 Cleaned content length:', cleanContent.length);

    try {
      const parsedContent = JSON.parse(cleanContent);
      
      // Validate the response structure
      if (typeof parsedContent === 'object' && parsedContent !== null) {
        const firstDay = Object.keys(parsedContent)[0];
        if (firstDay && typeof parsedContent[firstDay] === 'object') {
          console.log('🎉 Successfully generated meal plan!');
          return res.json({ success: true, mealPlan: parsedContent });
        }
      }
      
      throw new Error('Invalid JSON structure from Gemini');
      
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw content that failed:', cleanContent.substring(0, 200) + '...');
      res.status(500).json({ 
        error: 'Failed to parse AI response as JSON. Please try again.' 
      });
    }

  } catch (error) {
    console.error('Proxy server error:', error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    } else if (error.response?.status === 401) {
      res.status(401).json({ 
        error: 'Invalid API key. Please check your Gemini API key.' 
      });
    } else if (error.response?.status === 404) {
      res.status(404).json({ 
        error: 'API endpoint not found. The model might not be available.' 
      });
    } else if (error.code === 'ECONNABORTED') {
      res.status(408).json({ 
        error: 'Request timeout. Please try again.' 
      });
    } else {
      res.status(500).json({ 
        error: error.response?.data?.error?.message || 'Failed to generate meal plan. Please try again.' 
      });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Proxy server is running',
    timestamp: new Date().toISOString(),
    availableModels: AVAILABLE_MODELS
  });
});

// Get available models (for debugging)
app.get('/api/models', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
    );

    // Filter only models that support generateContent
    const generateContentModels = response.data.models.filter(model => 
      model.supportedGenerationMethods?.includes('generateContent')
    );

    res.json({ 
      models: generateContentModels,
      recommended: AVAILABLE_MODELS[0]
    });
  } catch (error) {
    console.error('Models fetch error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`🔧 API Key present: ${!!process.env.GEMINI_API_KEY}`);
  console.log(`🤖 Using model: ${AVAILABLE_MODELS[0]}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});


app.post('/api/generate-workout', async (req, res) => {
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

    console.log('📤 Generating workout plan...');

    const MODEL_NAME = 'models/gemini-1.5-flash-002';
    const API_URL = `https://generativelanguage.googleapis.com/v1/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const prompt = `
    Create a detailed workout plan based on the following user preferences:

    TARGET MUSCLES: ${targetMuscles.join(', ')}
    TRAINING FREQUENCY: ${frequency}
    EXPERIENCE LEVEL: ${experience}
    WORKOUT LOCATION: ${location}

    REQUIREMENTS:
    - Generate 4-6 exercises
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

    console.log('✅ Received workout response from Gemini API');

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
        console.log('🎉 Successfully generated workout plan!');
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
});