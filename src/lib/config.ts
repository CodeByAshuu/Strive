
// Determine the correct API base URL
const getApiBaseUrl = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    console.log('Using VITE_API_URL:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  // Check if we're running on localhost (development)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('Detected localhost - using development API');
    return 'http://localhost:3001/api';
  }
  
  // Check if we're in development mode
  if (import.meta.env.MODE === 'development' || import.meta.env.DEV) {
    console.log('Detected development mode - using development API');
    return 'http://localhost:3001/api';
  }
  
  // For production, use relative path to Vercel API routes
  console.log('Using production API path');
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
console.log('🔍 CONFIG DEBUG INFO:');
console.log('API Base URL:', API_CONFIG.baseURL);
console.log('Environment MODE:', import.meta.env.MODE);
console.log('Environment DEV:', import.meta.env.DEV);
console.log('Environment PROD:', import.meta.env.PROD);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Window location:', typeof window !== 'undefined' ? window.location.hostname : 'server-side');
console.log('Is localhost:', typeof window !== 'undefined' ? window.location.hostname === 'localhost' : 'unknown');

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