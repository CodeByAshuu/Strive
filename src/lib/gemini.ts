import { API_CONFIG, API_ENDPOINTS } from './config';

export interface WeeklyMealPlan {
  [day: string]: {
    [mealType: string]: string;
  };
}

// const PROXY_URL = 'http://localhost:3001/api';

export async function getMealPlanFromGemini(prompt: string): Promise<WeeklyMealPlan> {
  try {
    console.log("📤 Sending request to proxy server...");
    
    const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.mealPlan}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to generate meal plan');
    }

    console.log("✅ Successfully received meal plan from proxy");
    return data.mealPlan;
    
  } catch (error) {
    console.error("❌ Proxy server error:", error);
    if (error instanceof Error) {
      throw new Error(`Server: ${error.message}`);
    }
    throw new Error("Failed to generate meal plan");
  }
}