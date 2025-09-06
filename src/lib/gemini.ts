import { API_CONFIG, API_ENDPOINTS } from './config';

export interface WeeklyMealPlan {
  [day: string]: {
    [mealType: string]: string;
  };
}

// const PROXY_URL = 'http://localhost:3001/api';

export async function getMealPlanFromGemini(prompt: string): Promise<WeeklyMealPlan> {
  try {
    const apiUrl = `${API_CONFIG.baseURL}${API_ENDPOINTS.mealPlan}`;
    console.log("📤 Sending request to:", apiUrl);
    console.log("📤 Full API config:", API_CONFIG);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    console.log("📥 Response status:", response.status);
    console.log("📥 Response ok:", response.ok);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Server error response:", errorData);
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("📥 Response data:", data);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to generate meal plan');
    }

    console.log("✅ Successfully received meal plan from proxy");
    return data.mealPlan;
    
  } catch (error) {
    console.error("❌ Proxy server error:", error);
    if (error instanceof Error) {
      // Check if it's a network error
      if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
        throw new Error(`Network error: Unable to connect to API server. Please check your internet connection and try again.`);
      }
      throw new Error(`Server: ${error.message}`);
    }
    throw new Error("Failed to generate meal plan");
  }
}