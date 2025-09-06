
export const API_CONFIG = {
  baseURL: import.meta.env.DEV 
    ? 'http://localhost:3001/api' 
    : '/api',
};

export const API_ENDPOINTS = {
  mealPlan: '/generate-meal-plan',
  workout: '/generate-workout',
  workoutSplit: '/generate-workout-split',
};

// Debug log to check what URL is being used
console.log('API Base URL:', API_CONFIG.baseURL);
console.log('Environment:', import.meta.env.MODE);