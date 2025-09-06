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