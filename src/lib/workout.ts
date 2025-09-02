// src/lib/workout.ts
export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  muscle: string;
  difficulty: string;
  videoUrl: string;
  instructions: string[];
  equipment?: string;
  primaryMuscles: string[];
  secondaryMuscles?: string[];
}

export interface WorkoutPlan {
  exercises: Exercise[];
  workoutType: string;
  totalDuration: string;
  totalExercises: number;
}

const PROXY_URL = 'http://localhost:3001/api';

export async function generateWorkoutPlan(
  targetMuscles: string[],
  frequency: string,
  experience: string,
  location: string
): Promise<WorkoutPlan> {
  try {
    console.log("📤 Sending workout generation request...");
    
    const response = await fetch(`${PROXY_URL}/generate-workout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetMuscles,
        frequency,
        experience,
        location
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to generate workout plan');
    }

    console.log("✅ Successfully received workout plan");
    return data.workoutPlan;
    
  } catch (error) {
    console.error("❌ Workout generation error:", error);
    if (error instanceof Error) {
      throw new Error(`Workout API: ${error.message}`);
    }
    throw new Error("Failed to generate workout plan");
  }
}