import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Play, Info } from 'lucide-react'
import { Card, GlareCard } from './ui/Card'
import { Button } from './ui/Button'

interface Exercise {
  name: string
  difficulty: string
  equipment: string
  instructions: string[]
  videoUrl: string
}

const muscleGroups = [
  { name: 'Chest', exercises: [
    { name: 'Push-ups', difficulty: 'Beginner', equipment: 'Bodyweight', instructions: ['Start in plank position', 'Lower chest to floor', 'Push back up'], videoUrl: '#' },
    { name: 'Bench Press', difficulty: 'Intermediate', equipment: 'Barbell', instructions: ['Lie on bench', 'Lower bar to chest', 'Press up'], videoUrl: '#' },
  ]},
  { name: 'Back', exercises: [
    { name: 'Pull-ups', difficulty: 'Intermediate', equipment: 'Pull-up bar', instructions: ['Hang from bar', 'Pull chin over bar', 'Lower with control'], videoUrl: '#' },
    { name: 'Rows', difficulty: 'Beginner', equipment: 'Resistance band', instructions: ['Pull band to chest', 'Squeeze shoulder blades', 'Return slowly'], videoUrl: '#' },
  ]},
  { name: 'Arms', exercises: [
    { name: 'Bicep Curls', difficulty: 'Beginner', equipment: 'Dumbbells', instructions: ['Keep elbows still', 'Curl weight up', 'Lower slowly'], videoUrl: '#' },
    { name: 'Tricep Dips', difficulty: 'Intermediate', equipment: 'Chair/Bench', instructions: ['Place hands on edge', 'Lower body down', 'Push back up'], videoUrl: '#' },
  ]},
  { name: 'Legs', exercises: [
    { name: 'Squats', difficulty: 'Beginner', equipment: 'Bodyweight', instructions: ['Feet shoulder-width apart', 'Lower like sitting', 'Stand back up'], videoUrl: '#' },
    { name: 'Lunges', difficulty: 'Beginner', equipment: 'Bodyweight', instructions: ['Step forward', 'Lower back knee', 'Return to standing'], videoUrl: '#' },
  ]},
  { name: 'Core', exercises: [
    { name: 'Plank', difficulty: 'Beginner', equipment: 'Bodyweight', instructions: ['Hold straight line', 'Keep core tight', 'Breathe steadily'], videoUrl: '#' },
    { name: 'Crunches', difficulty: 'Beginner', equipment: 'Bodyweight', instructions: ['Lie on back', 'Lift shoulders up', 'Lower slowly'], videoUrl: '#' },
  ]},
  { name: 'Shoulders', exercises: [
    { name: 'Shoulder Press', difficulty: 'Beginner', equipment: 'Dumbbells', instructions: ['Start at shoulder height', 'Press straight up', 'Lower with control'], videoUrl: '#' },
    { name: 'Lateral Raises', difficulty: 'Beginner', equipment: 'Dumbbells', instructions: ['Arms at sides', 'Lift out to sides', 'Lower slowly'], videoUrl: '#' },
  ]},
]

export const BodyExplorer: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string>('')
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])

  const handleMuscleClick = (muscleName: string) => {
    setSelectedMuscle(muscleName)
    const muscle = muscleGroups.find(m => m.name === muscleName)
    setSelectedExercises(muscle?.exercises || [])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pb-24">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 Body Explorer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Click on muscle groups to discover targeted exercises and tutorials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Body Diagram */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Select Target Muscle
              </h2>
              
              {/* Interactive Body */}
              <div className="relative max-w-md mx-auto">
                {/* Body SVG Placeholder - would be replaced with actual interactive body */}
                <div className="aspect-[3/4] bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-3xl relative overflow-hidden">
                  {/* Muscle Group Buttons */}
                  <div className="absolute inset-4 grid grid-cols-2 gap-2">
                    {muscleGroups.map((muscle, index) => (
                      <motion.button
                        key={muscle.name}
                        onClick={() => handleMuscleClick(muscle.name)}
                        className={`p-4 rounded-2xl border-2 transition-all text-sm font-medium ${
                          selectedMuscle === muscle.name
                            ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                            : 'border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 hover:border-emerald-300'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <Target className="w-5 h-5 mx-auto mb-1" />
                        {muscle.name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Exercise Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {selectedMuscle ? (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedMuscle} Exercises
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedExercises.length} exercises found for {selectedMuscle.toLowerCase()}
                  </p>
                </Card>

                {selectedExercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <GlareCard>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                            {exercise.difficulty}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                            {exercise.equipment}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          {exercise.name}
                        </h3>
                        
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <Info className="w-4 h-4 mr-1" />
                            Instructions:
                          </h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {exercise.instructions.map((instruction, idx) => (
                              <li key={idx}>• {instruction}</li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Tutorial
                        </Button>
                      </div>
                    </GlareCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Select a Muscle Group
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Click on any muscle group to see targeted exercises and tutorials
                </p>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}