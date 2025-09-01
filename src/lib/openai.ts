// src/lib/openai.ts
import axios from "axios";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error("❌ Missing OpenAI API key in .env file");
  throw new Error("OpenAI API key is missing");
}

const openaiApi = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export interface WeeklyMealPlan {
  [day: string]: {
    [mealType: string]: string;
  };
}

interface OpenAIErrorResponse {
  response?: {
    status?: number;
    data?: {
      error?: {
        message?: string;
      };
    };
  };
  message?: string;
}

export async function getMealPlan(prompt: string): Promise<WeeklyMealPlan> {
  const maxRetries = 3;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      console.log(`🔄 Attempt ${retries + 1} to generate meal plan...`);
      
      const response = await openaiApi.post("/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are a professional Indian nutritionist. Always respond with valid JSON format only. Your response should be a JSON object with days as keys and meal objects as values." 
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" },
      });

      const content = response.data.choices[0].message.content;
      console.log("✅ Received response from OpenAI");
      
      try {
        const parsedContent = JSON.parse(content);
        
        // Validate the response structure
        if (typeof parsedContent === 'object' && parsedContent !== null) {
          // Check if it has at least some expected structure
          const firstDay = Object.keys(parsedContent)[0];
          if (firstDay && typeof parsedContent[firstDay] === 'object') {
            return parsedContent as WeeklyMealPlan;
          }
        }
        
        throw new Error("Invalid response structure");
        
      } catch (parseError) {
        console.error("❌ JSON parsing error:", parseError);
        throw new Error("Failed to parse OpenAI response as JSON");
      }
      
    }  catch (error: unknown) {
  retries++;
  const err = error as OpenAIErrorResponse;
  
  // Detailed error logging
  console.error("❌ Detailed error status:", err.response?.status);
  console.error("❌ Detailed error data:", JSON.stringify(err.response?.data, null, 2));
  console.error("❌ Detailed error message:", err.message);
  
  if (err.response?.status === 429) {
    const rateLimitInfo = err.response?.data || {};
    console.warn("⚠️ Rate limit details:", JSON.stringify(rateLimitInfo, null, 2));
    const delay = Math.pow(2, retries) * 1000;
    console.warn(`⚠️ Rate limit hit, retrying in ${delay}ms... (${retries}/${maxRetries})`);
    await new Promise((res) => setTimeout(res, delay));
    continue;
  }
      
      if (err.response?.status && err.response.status >= 500) {
        // Server error - retry
        console.warn(`⚠️ Server error, retrying... (${retries}/${maxRetries})`);
        await new Promise((res) => setTimeout(res, 2000));
        continue;
      }
      
      // Other errors (network, authentication, etc.)
      console.error("❌ OpenAI API error:", err.response?.data || err.message);
      
      if (err.response?.status === 401) {
        throw new Error("Invalid API key. Please check your OpenAI API key.");
      } else if (err.response?.status === 404) {
        throw new Error("Model not found. Please check the model name.");
      } else if (err.response?.data?.error?.message) {
        throw new Error(err.response.data.error.message);
      } else {
        throw new Error(err.message || "Failed to connect to OpenAI API");
      }
    }
  }
  
  throw new Error("Max retries reached. Please try again later.");
}