import axios from 'axios';

const AVAILABLE_MODELS = [
  'models/gemini-1.5-flash-002',
  'models/gemini-1.5-pro',
  'models/gemini-1.5-flash',
  'models/gemini-2.0-flash-001'
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    // Use the first available model
    const MODEL_NAME = AVAILABLE_MODELS[0];
    const API_URL = `https://generativelanguage.googleapis.com/v1/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;

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
      
      if (typeof parsedContent === 'object' && parsedContent !== null) {
        const firstDay = Object.keys(parsedContent)[0];
        if (firstDay && typeof parsedContent[firstDay] === 'object') {
          return res.json({ success: true, mealPlan: parsedContent });
        }
      }
      
      throw new Error('Invalid JSON structure from Gemini');
      
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      res.status(500).json({ 
        error: 'Failed to parse AI response as JSON. Please try again.' 
      });
    }

  } catch (error) {
    console.error('Serverless function error:', error.response?.data || error.message);
    
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
}