import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Clock, LocateIcon, Play } from 'lucide-react'
import { Button } from './ui/Button'
import { Card, GlareCard } from './ui/Card'
import Model, { IExerciseData, IMuscleStats } from 'react-body-highlighter';  
import type { Muscle } from 'react-body-highlighter'
import { generateWorkoutPlan, type WorkoutPlan, type Exercise as GeneratedExercise } from '../lib/workout'


// Supported muscles by the body highlight component
const SUPPORTED_MUSCLES: readonly Muscle[] = [
  // Back
  'trapezius',
  'upper-back',
  'lower-back',
  // Chest
  'chest',
  // Arms
  'biceps',
  'triceps',
  'forearm',
  'back-deltoids',
  'front-deltoids',
  // Abs
  'abs',
  'obliques',
  // Legs
  'adductor',
  'hamstring',
  'quadriceps',
  'abductors',
  'calves',
  'gluteal',
  // Head
  'head',
  'neck'
 ] as const

export const WorkoutPage: React.FC = () => {
  const [frequency, setFrequency] = useState('')
  const [experience, setExperience] = useState('')
  const [location, setLocation] = useState('')
  const [selectedMuscles, setSelectedMuscles] = useState<Muscle[]>([])
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [loading, setLoading] = useState(false)

  const generateWorkout = async () => {
    setLoading(true)
    try {
      const plan = await generateWorkoutPlan(
        selectedMuscles,
        frequency,
        experience,
        location
      )
      setWorkoutPlan(plan)
    } catch (error) {
      console.error(error)
      alert(
        error instanceof Error ? error.message : 'Failed to generate workout plan'
      )
    } finally {
      setLoading(false)
    }
  }

  const frequencies = ['1x per week','2x per week', '3x per week', 'Push/Pull/Legs', 'Upper/Lower']
  const experiences = ['Beginner', 'Intermediate', 'Advanced']
  const locations = ['Gym', 'Home', 'Outdoor']

  // Build highlighting data from selected muscles
  const data: IExerciseData[] = useMemo(() => {
    return selectedMuscles.map((muscle: Muscle) => ({
      name: `Selected - ${muscle}`,
      muscles: [muscle],
      frequency: 1
    }))
  }, [selectedMuscles])

  const handleClick = React.useCallback(({ muscle }: IMuscleStats) => {
    if (!muscle) return
    if (!SUPPORTED_MUSCLES.includes(muscle)) return
    setWorkoutPlan(null)
    setSelectedMuscles((prev) =>
      prev.includes(muscle)
        ? prev.filter((m) => m !== muscle)
        : [...prev, muscle]
    )
  }, [])

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

            {/* Body Highlight Model */}
            <div className="flex flex-col items-center gap-4 mb-12">
              <div className="flex justify-center gap-6">
                <Model data={data} onClick={handleClick} highlightedColors={["#0984e3", "#74b9ff"]} />
                <Model
                  type="posterior"
                  data={data}
                  highlightedColors={["#e65a5a", "#db2f2f"]}
                  onClick={handleClick}
                />
              </div>
              {selectedMuscles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedMuscles.map((m) => (
                    <span key={m} className="px-3 py-1 rounded-full text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                      {m}
                    </span>
                  ))}
                </div>
              )}
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
              
              {/* Location */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <LocateIcon className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <div className="space-y-2">
                  {locations.map((option) => (
                    <button
                      key={option}
                      onClick={() => setLocation(option)}
                      className={`w-full p-3 rounded-xl border text-left transition-all text-gray-200 ${
                        location === option
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
              disabled={!frequency || !experience || !location || selectedMuscles.length === 0}
              loading={loading}
              className="w-full flex justify-center items-center"
            >
              <Dumbbell className="w-5 h-5 mr-2" />
              Generate Workout Plan
            </Button>
          </Card>
        </motion.div>

        {/* Workout Plan */}
        {workoutPlan && workoutPlan.exercises.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {workoutPlan.workoutType || 'Your Workout'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workoutPlan.exercises.map((exercise: GeneratedExercise, index: number) => (
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

                      {exercise.videoUrl ? (
                        <a
                          href={exercise.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full"
                        >
                          <Button variant="secondary" className="w-full flex justify-center items-center">
                            <Play className="w-4 h-4 mr-2" />
                            Watch Tutorial
                          </Button>
                        </a>
                      ) : (
                        <Button variant="secondary" className="w-full flex justify-center items-center" disabled>
                          <Play className="w-4 h-4 mr-2" />
                          No Tutorial Available
                        </Button>
                      )}
                    </div>
                  </GlareCard>
                </motion.div>
              ))}
            </div>
            {workoutPlan.totalDuration && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Total Duration: {workoutPlan.totalDuration} • Exercises: {workoutPlan.totalExercises}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}