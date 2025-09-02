import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Clock, Play } from 'lucide-react'
import { Button } from './ui/Button'
import { Card, GlareCard } from './ui/Card'
import Model, { IExerciseData, IMuscleStats } from 'react-body-highlighter';  


interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  muscle: string
  difficulty: string
  videoUrl: string
  instructions: string[]
}

const sampleWorkouts: Exercise[] = [
  {
    name: 'Bench Press',
    sets: 4,
    reps: '8-12',
    rest: '2-3 min',
    muscle: 'Chest',
    difficulty: 'Intermediate',
    videoUrl: 'https://youtube.com/watch?v=bench-press',
    instructions: ['Lie flat on bench', 'Grip bar slightly wider than shoulders', 'Lower to chest', 'Press up explosively']
  },
  {
    name: 'Barbell Rows',
    sets: 4,
    reps: '8-10',
    rest: '2-3 min',
    muscle: 'Back',
    difficulty: 'Intermediate',
    videoUrl: 'https://youtube.com/watch?v=barbell-rows',
    instructions: ['Bend at hips', 'Keep back straight', 'Row to lower chest', 'Squeeze shoulder blades']
  },
  {
    name: 'Overhead Press',
    sets: 3,
    reps: '8-10',
    rest: '2 min',
    muscle: 'Shoulders',
    difficulty: 'Intermediate',
    videoUrl: 'https://youtube.com/watch?v=overhead-press',
    instructions: ['Start at shoulder height', 'Press straight up', 'Keep core tight', 'Lower with control']
  },
  {
    name: 'Romanian Deadlifts',
    sets: 3,
    reps: '10-12',
    rest: '2 min',
    muscle: 'Legs',
    difficulty: 'Intermediate',
    videoUrl: 'https://youtube.com/watch?v=rdl',
    instructions: ['Hinge at hips', 'Keep knees slightly bent', 'Feel hamstring stretch', 'Drive hips forward']
  }
]

export const WorkoutPage: React.FC = () => {
  const [frequency, setFrequency] = useState('')
  const [experience, setExperience] = useState('')
  const [workout, setWorkout] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)

  const generateWorkout = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setWorkout(sampleWorkouts)
    setLoading(false)
  }

  const frequencies = ['2x per week', '3x per week', 'Push/Pull/Legs', 'Upper/Lower', 'Bro Split']
  const experiences = ['Beginner', 'Intermediate', 'Advanced']

  const data: IExerciseData[] = [
    {
      name: "Bench Press",
      muscles: ["chest", "triceps", "front-deltoids"]
    },
    {
      name: "Tricep Pushdown",
      muscles: ["triceps"]
    }
  ];

  const handleClick = React.useCallback(({ muscle, data }: IMuscleStats) => {
    const { exercises, frequency } = data;

    alert(
      `You clicked the ${muscle}! You've worked out this muscle ${frequency} times through the following exercises: ${JSON.stringify(
        exercises
      )}`
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            💪 Custom Workouts
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI-generated workout routines tailored to your goals and experience level
          </p>
        </motion.div>
        

        {/* Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Customize Your Workout
            </h2>

            <div className="flex justify-center mb-12">
              <Model data={data} onClick={handleClick} />
              <Model
                type="posterior"
                data={data}
                highlightedColors={["#e65a5a", "#db2f2f"]}
                onClick={handleClick}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Frequency
                </label>
                <div className="space-y-2">
                  {frequencies.map((option) => (
                    <button
                      key={option}
                      onClick={() => setFrequency(option)}
                      className={`w-full p-3 rounded-xl border text-left transition-all text-gray-200 ${
                        frequency === option
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Dumbbell className="w-4 h-4 inline mr-1" />
                  Experience
                </label>
                <div className="space-y-2">
                  {experiences.map((option) => (
                    <button
                      key={option}
                      onClick={() => setExperience(option)}
                      className={`w-full p-3 rounded-xl border text-left transition-all text-gray-200 ${
                        experience === option
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={generateWorkout}
              disabled={!frequency || !experience || !location}
              loading={loading}
              className="w-full"
            >
              <Dumbbell className="w-5 h-5 mr-2" />
              Generate Workout Plan
            </Button>
          </Card>
        </motion.div>

        {/* Workout Plan */}
        {workout.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Your Workout
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workout.map((exercise, index) => (
                <motion.div
                  key={exercise.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <GlareCard>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                          {exercise.muscle}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                          {exercise.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {exercise.name}
                      </h3>
                      
                      {/* Exercise Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-emerald-600">{exercise.sets}</p>
                          <p className="text-xs text-gray-500">Sets</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{exercise.reps}</p>
                          <p className="text-xs text-gray-500">Reps</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{exercise.rest}</p>
                          <p className="text-xs text-gray-500">Rest</p>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instructions:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {exercise.instructions.map((instruction, idx) => (
                            <li key={idx}>• {instruction}</li>
                          ))}
                        </ul>
                      </div>

                      <Button variant="secondary" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Tutorial
                      </Button>
                    </div>
                  </GlareCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}