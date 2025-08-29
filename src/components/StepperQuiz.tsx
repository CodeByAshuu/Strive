import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { useAuth } from './../contexts/AuthContext'
import { supabase } from './../lib/supabase'

interface StepperData {
  age: number | null
  weight: number | null
  height: number | null
  goal: string | null
  workoutFrequency: string | null
  targetWeight: number | null
}

const steps = [
  { id: 'age', title: 'What\'s your age?', type: 'number', placeholder: 'Enter your age', min: 13, max: 100 },
  { id: 'weight', title: 'Current weight (kg)?', type: 'number', placeholder: 'Enter current weight', min: 30, max: 300 },
  { id: 'height', title: 'Height (cm)?', type: 'number', placeholder: 'Enter height', min: 100, max: 250 },
  {
    id: 'goal',
    title: 'What\'s your fitness goal?',
    type: 'select',
    options: ['Bulking', 'Cutting', 'Lean Bulk', 'Maintenance', 'General Fitness']
  },
  {
    id: 'workoutFrequency',
    title: 'How often do you workout?',
    type: 'select',
    options: ['2-3 times/week', '3-4 times/week', '4-5 times/week', '5+ times/week', 'Light workout']
  },
  { id: 'targetWeight', title: 'Target weight (kg)?', type: 'number', placeholder: 'Enter target weight', min: 30, max: 300 }
]

export const StepperQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<StepperData>({
    age: null,
    weight: null,
    height: null,
    goal: null,
    workoutFrequency: null,
    targetWeight: null,
  })
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          age: data.age,
          weight: data.weight,
          height: data.height,
          goal: data.goal,
          workout_frequency: data.workoutFrequency,
          target_weight: data.targetWeight,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
      navigate('/dashboard')
    } catch (error) {
      console.error('Error saving profile:', error)
    }
    setLoading(false)
  }

  const updateData = <K extends keyof StepperData>(key: K, value: StepperData[K]) => {
  setData(prev => ({ ...prev, [key]: value }))
}


  const isStepValid = () => {
    const key = currentStepData.id as keyof StepperData
    return data[key] !== null && data[key] !== ''
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <Card className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-emerald-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {currentStepData.title}
              </h2>

              {currentStepData.type === 'number' && (
                <input
                  type="number"
                  placeholder={currentStepData.placeholder}
                  min={currentStepData.min}
                  max={currentStepData.max}
                  value={data[currentStepData.id as keyof StepperData] || ''}
                  onChange={(e) => updateData(currentStepData.id as keyof StepperData, parseInt(e.target.value) || null)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white text-lg"
                  autoFocus
                />
              )}

              {currentStepData.type === 'select' && (
                <div className="space-y-3">
                  {currentStepData.options?.map((option) => (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => updateData(currentStepData.id as keyof StepperData, option)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        data[currentStepData.id as keyof StepperData] === option
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white">{option}</span>
                        {data[currentStepData.id as keyof StepperData] === option && (
                          <Check className="w-5 h-5 text-emerald-500" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              loading={loading && currentStep === steps.length - 1}
              className="flex items-center space-x-2"
            >
              <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
              {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}