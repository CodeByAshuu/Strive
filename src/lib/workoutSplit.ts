import { API_CONFIG, API_ENDPOINTS } from './config';

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  muscleGroup: string;
  equipment?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
  duration: string;
}

export interface WorkoutSplit {
  splitName: string;
  goal: string;
  experience: string;
  location: string;
  days: WorkoutDay[];
  totalDuration: string;
  totalExercises: number;
}

// const PROXY_URL = 'http://localhost:3001/api';

export async function generateWorkoutSplit(
  experience: string,
  daysPerWeek: string,
  location: string,
  goal: string,
  includeCardio: boolean
): Promise<WorkoutSplit> {
  const maxRetries = 3;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      console.log(`📤 Sending workout split request (attempt ${retries + 1}/${maxRetries})...`);
      
      const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.workoutSplit}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experience,
          daysPerWeek,
          location,
          goal,
          includeCardio
        }),
      });

      if (response.status === 429) {
        retries++;
        const delay = Math.pow(2, retries) * 1000;
        console.warn(`⚠️ Rate limit hit, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate workout split');
      }

      console.log("✅ Successfully received workout split");
      return data.workoutSplit;
      
    } catch (error) {
      retries++;
      
      if (retries >= maxRetries) {
        console.error("❌ Final attempt failed:", error);
        if (error instanceof Error) {
          throw new Error(`Workout Split API: ${error.message}`);
        }
        throw new Error("Failed to generate workout split after multiple attempts");
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error("Max retries reached. Please try again later.");
}