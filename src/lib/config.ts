
// Determine the correct API base URL
const getApiBaseUrl = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Check if we're in development mode
  if (import.meta.env.MODE === 'development' || import.meta.env.DEV) {
    return 'http://localhost:3001/api';
  }
  
  // For production, use relative path to Vercel API routes
  return '/api';
};

export const API_CONFIG = {
  baseURL: getApiBaseUrl(),
};

export const API_ENDPOINTS = {
  mealPlan: '/generate-meal-plan',
  workout: '/generate-workout',
  workoutSplit: '/generate-workout-split',
};

// Debug log to check what URL is being used
console.log('API Base URL:', API_CONFIG.baseURL);
console.log('Environment:', import.meta.env.MODE);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('DEV mode:', import.meta.env.DEV);

// Test function to check API connectivity
export const testApiConnection = async () => {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}/health`);
    const data = await response.json();
    console.log('✅ API Health Check:', data);
    return data;
  } catch (error) {
    console.error('❌ API Health Check Failed:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};