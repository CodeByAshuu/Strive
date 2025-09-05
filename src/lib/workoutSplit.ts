// src/lib/workoutSplit.ts
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

const PROXY_URL = 'http://localhost:3001/api';

export async function generateWorkoutSplit(
  experience: string,
  daysPerWeek: string,
  location: string,
  goal: string,
  includeCardio: boolean
): Promise<WorkoutSplit> {
  try {
    console.log("📤 Sending workout split generation request...");
    
    const response = await fetch(`${PROXY_URL}/generate-workout-split`, {
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
    console.error("❌ Workout split generation error:", error);
    if (error instanceof Error) {
      throw new Error(`Workout Split API: ${error.message}`);
    }
    throw new Error("Failed to generate workout split");
  }
}