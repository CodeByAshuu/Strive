import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Gamepad2, Blocks as Stretchs, Dumbbell, ArrowLeft, Download, Target, Clock, MapPin, Zap } from 'lucide-react'
import { Card, GlareCard } from './ui/Card'
import { Button } from './ui/Button'
import { useAuth } from './../contexts/AuthContext'
import { supabase } from './../lib/supabase'
import { muscleStretches, type Stretch } from '../data/stretches';
import { generateWorkoutSplit, type WorkoutSplit, type Exercise } from '../lib/workoutSplit';
import jsPDF from 'jspdf'
import GlareHover from './ui/GlareHover'
import cutTextBg from '../assets/cut-text-bg-3.jpeg'


type Section = 'main' | 'calculator' | 'funzone' | 'stretch' | 'split'

interface UserProfile {
  age: number | null
  weight: number | null
  height: number | null
  goal: string | null
  workout_frequency: string | null
  target_weight: number | null
}

interface Challenge {
  id: string
  title: string
  description: string
  duration: string
  difficulty: string
  completed: boolean
}


interface SplitConfig {
  experience: string;
  days: string;
  location: string;
  cardio: boolean;
}

const challenges: Challenge[] = [
  {
    id: '30-day-pushup',
    title: '30-Day Push-up Challenge',
    description: 'Build upper body strength with progressive push-up training',
    duration: '30 days',
    difficulty: 'Intermediate',
    completed: false
  },
  {
    id: 'plank-challenge',
    title: 'Plank Challenge',
    description: 'Strengthen your core with daily plank holds',
    duration: '21 days',
    difficulty: 'Beginner',
    completed: false
  },
  {
    id: 'core-crusher',
    title: 'Core Crusher Challenge',
    description: 'Intense core workout routine for defined abs',
    duration: '14 days',
    difficulty: 'Advanced',
    completed: false
  }
]


export const BodyExplorer: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('main')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const { user } = useAuth()

  // Calculator states
  const [bmi, setBmi] = useState({ height: '', weight: '', result: 0 })
  const [bmr, setBmr] = useState({ age: '', gender: 'male', weight: '', height: '', activity: '1.2', result: 0 })
  const [oneRepMax, setOneRepMax] = useState({ weight: '', reps: '', result: 0 })

  // Stretch states
  const [selectedMuscle, setSelectedMuscle] = useState<string>('Neck')

  // Split generator states
  const [splitConfig, setSplitConfig] = useState<SplitConfig>({
  experience: '',
  days: '',
  location: '',
  cardio: false
});
  const [generatedSplit, setGeneratedSplit] = useState<WorkoutSplit | null>(null);
const [splitLoading, setSplitLoading] = useState(false);
const [splitError, setSplitError] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    }
  }, [user])

  const fetchUserProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return
      }

      if (data) {
        setUserProfile({
          age: data.age,
          weight: data.weight,
          height: data.height,
          goal: data.goal,
          workout_frequency: data.workout_frequency,
          target_weight: data.target_weight,
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  // Calculator functions
  const calculateBMI = () => {
    const heightM = parseFloat(bmi.height) / 100
    const weightKg = parseFloat(bmi.weight)
    if (heightM && weightKg) {
      const result = weightKg / (heightM * heightM)
      setBmi(prev => ({ ...prev, result: Math.round(result * 10) / 10 }))
    }
  }

  const calculateBMR = () => {
    const { age, gender, weight, height, activity } = bmr
    if (age && weight && height) {
      let result
      if (gender === 'male') {
        result = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age))
      } else {
        result = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age))
      }
      result *= parseFloat(activity)
      setBmr(prev => ({ ...prev, result: Math.round(result) }))
    }
  }

  const calculateOneRepMax = () => {
    const weight = parseFloat(oneRepMax.weight)
    const reps = parseFloat(oneRepMax.reps)
    if (weight && reps) {
      const result = weight * (1 + reps / 30)
      setOneRepMax(prev => ({ ...prev, result: Math.round(result * 10) / 10 }))
    }
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' }
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' }
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' }
    return { category: 'Obese', color: 'text-red-600' }
  }

  const generateWorkoutSplitPlan = async () => {
  if (!splitConfig.experience || !splitConfig.days || !splitConfig.location) {
    setSplitError('Please fill all required fields');
    return;
  }

  setSplitLoading(true);
  setSplitError('');
  
  try {
    const goal = userProfile?.goal || 'General Fitness';
    
    const split = await generateWorkoutSplit(
      splitConfig.experience,
      splitConfig.days,
      splitConfig.location,
      goal,
      splitConfig.cardio
    );
    
    setGeneratedSplit(split);
  } catch (error) {
    setSplitError(error instanceof Error ? error.message : 'Failed to generate workout split');
  }
  setSplitLoading(false);
};

  const downloadSplitPDF = () => {
  if (!generatedSplit) return

  const doc = new jsPDF()
  
  // Header
  doc.setFillColor(16, 185, 129)
  doc.rect(0, 0, 210, 30, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.text('STRIVE', 20, 18)
  doc.setFontSize(12)
  doc.text('Your Personalized Workout Split', 20, 25)

  doc.setTextColor(0, 0, 0)
  
  let y = 45
  doc.setFontSize(16)
  doc.text(generatedSplit.splitName, 20, y)
  y += 10

  doc.setFontSize(10)
  doc.text(`Goal: ${generatedSplit.goal}`, 20, y)
  doc.text(`Experience: ${generatedSplit.experience}`, 120, y)
  y += 5
  doc.text(`Location: ${generatedSplit.location}`, 20, y)
  doc.text(`Duration: ${generatedSplit.totalDuration}`, 120, y)
  y += 15

  generatedSplit.days.forEach((day) => {
    if (y > 250) {
      doc.addPage()
      y = 20
    }

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(`${day.day}: ${day.focus} (${day.duration})`, 20, y)
    y += 8

    day.exercises.forEach((exercise) => {
      if (y > 270) {
        doc.addPage()
        y = 20
      }

      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text(`${exercise.name}`, 25, y)
      doc.text(`${exercise.sets} × ${exercise.reps} (${exercise.rest} rest)`, 160, y)
      y += 6
    })

    y += 10
  })

  doc.save('STRIVE-workout-split.pdf')
}

  const mainSections = [
    {
      id: 'calculator',
      title: 'Calculator',
      description: 'BMI, BMR, Calorie & 1RM calculators',
      icon: Calculator,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'funzone',
      title: 'Fun Zone',
      description: 'Challenges, polls & fitness games',
      icon: Gamepad2,
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'stretch',
      title: 'Stretch Library',
      description: 'Targeted stretches for every muscle',
      icon: Stretchs,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'split',
      title: 'Split Generator',
      description: 'AI-powered workout split creation',
      icon: Dumbbell,
      gradient: 'from-blue-500 to-emerald-600'
    }
  ]

  if (currentSection === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="container mx-auto px-4 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-2 text-white">
              Fitness Toolkit
            </h1>
            {/* <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your complete fitness toolkit for calculations, challenges, stretches, and workout planning
            </p> */}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {mainSections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  {/* <GlareCard> */}
                  <GlareHover
              key={section.title}
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              className="h-full"
            >
                    <motion.div
                      className="p-8 cursor-pointer h-full flex flex-col justify-center items-center relative overflow-hidden"
                      onClick={() => setCurrentSection(section.id as Section)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3 className="text-6xl font-bold mb-3 relative z-10">
                        <span
                          className="bg-clip-text text-transparent"
                          style={{
                            backgroundImage: `url(${cutTextBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          {section.title}
                        </span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 relative z-10">
                        {section.description}
                      </p>
                      <Icon
                        className="absolute bottom-3 right-3 w-40 h-40 lg:w-56 lg:h-56 opacity-10 rotate-12 text-emerald-400 pointer-events-none"
                        aria-hidden="true"
                      />
                    </motion.div>
                  {/* </GlareCard> */}
                  </GlareHover>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (currentSection === 'calculator') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Fitness Calculators
              </span>
            </h1>
            <Button
              variant="ghost"
              onClick={() => setCurrentSection('main')}
              className="mr-4 flex justify-center items-center text-white hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BMI Calculator */}
            <GlareCard>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">BMI Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Height (cm)</label>
                    <input
                      type="number"
                      value={bmi.height}
                      onChange={(e) => setBmi(prev => ({ ...prev, height: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter height"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Weight (kg)</label>
                    <input
                      type="number"
                      value={bmi.weight}
                      onChange={(e) => setBmi(prev => ({ ...prev, weight: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter weight"
                    />
                  </div>
                  <Button onClick={calculateBMI} className="w-full">Calculate BMI</Button>
                  {bmi.result > 0 && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <p className="text-2xl font-bold text-emerald-600">{bmi.result}</p>
                      <p className={`text-sm ${getBMICategory(bmi.result).color}`}>
                        {getBMICategory(bmi.result).category}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </GlareCard>

            {/* 1RM Calculator */}
            <GlareCard>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1 Rep Max Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Weight Lifted (kg)</label>
                    <input
                      type="number"
                      value={oneRepMax.weight}
                      onChange={(e) => setOneRepMax(prev => ({ ...prev, weight: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter weight"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Reps Performed</label>
                    <input
                      type="number"
                      value={oneRepMax.reps}
                      onChange={(e) => setOneRepMax(prev => ({ ...prev, reps: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter reps"
                    />
                  </div>
                  <Button onClick={calculateOneRepMax} className="w-full">Calculate 1RM</Button>
                  {oneRepMax.result > 0 && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <p className="text-2xl font-bold text-emerald-600">{oneRepMax.result} kg</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Estimated 1 Rep Max</p>
                    </div>
                  )}
                </div>
              </div>
            </GlareCard>

            {/* BMR Calculator */}
            <GlareCard>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">BMR Calculator</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Age</label>
                      <input
                        type="number"
                        value={bmr.age}
                        onChange={(e) => setBmr(prev => ({ ...prev, age: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter Age"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Gender</label>
                      <select
                        value={bmr.gender}
                        onChange={(e) => setBmr(prev => ({ ...prev, gender: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                        
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Weight (kg)</label>
                      <input
                        type="number"
                        value={bmr.weight}
                        onChange={(e) => setBmr(prev => ({ ...prev, weight: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter weight"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Height (cm)</label>
                      <input
                        type="number"
                        value={bmr.height}
                        onChange={(e) => setBmr(prev => ({ ...prev, height: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter height"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Activity Level</label>
                    <select
                      value={bmr.activity}
                      onChange={(e) => setBmr(prev => ({ ...prev, activity: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="1.2">Sedentary</option>
                      <option value="1.375">Light Activity</option>
                      <option value="1.55">Moderate Activity</option>
                      <option value="1.725">Very Active</option>
                      <option value="1.9">Extremely Active</option>
                    </select>
                  </div>
                  <Button onClick={calculateBMR} className="w-full">Calculate BMR</Button>
                  {bmr.result > 0 && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <p className="text-2xl font-bold text-emerald-600">{bmr.result}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Calories per day</p>
                    </div>
                  )}
                </div>
              </div>
            </GlareCard>

            {/* Calorie Calculator */}
            <GlareCard>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Calorie Calculator</h3>
                {bmr.result > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <p className="font-semibold text-green-800 dark:text-green-300">Maintenance</p>
                        <p className="text-2xl font-bold text-green-600">{bmr.result}</p>
                        <p className="text-sm text-green-600">calories/day</p>
                      </div>
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <p className="font-semibold text-red-800 dark:text-red-300">Cutting (Deficit)</p>
                        <p className="text-2xl font-bold text-red-600">{bmr.result - 500}</p>
                        <p className="text-sm text-red-600">calories/day</p>
                      </div>
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <p className="font-semibold text-blue-800 dark:text-blue-300">Bulking (Surplus)</p>
                        <p className="text-2xl font-bold text-blue-600">{bmr.result + 500}</p>
                        <p className="text-sm text-blue-600">calories/day</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                    Calculate your BMR first to see calorie recommendations
                  </p>
                )}
              </div>
            </GlareCard>
          </div>
        </div>
      </div>
    )
  }

  if (currentSection === 'funzone') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Fun Zone
              </span>
            </h1>
            <Button
              variant="ghost"
              onClick={() => setCurrentSection('main')}
              className="mr-4 flex justify-center items-center text-white hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlareCard>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        challenge.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                        challenge.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                        {challenge.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {challenge.description}
                    </p>
                    
                    <Button className="w-full">
                      {challenge.completed ? 'View Progress' : 'Start Challenge'}
                    </Button>
                  </div>
                </GlareCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (currentSection === 'stretch') {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Stretch Library
            </span>
          </h1>
          <Button
            variant="ghost"
            onClick={() => setCurrentSection('main')}
            className="mr-4 flex justify-center items-center text-white hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>

        {/* First Row: Muscle Selection */}
        <div className="mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Select Muscle Group</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Object.keys(muscleStretches).map((muscle) => (
                <motion.button
                  key={muscle}
                  onClick={() => setSelectedMuscle(muscle)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedMuscle === muscle
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-cyan-300 text-gray-700 dark:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Target className="w-4 h-4 mb-1" />
                  <span className="text-sm font-medium">{muscle}</span>
                </motion.button>
              ))}
            </div>
          </Card>
        </div>

        {/* Second Row: Stretches in Bento Grid */}
        <div className="mb-3">
          <Card className="p-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedMuscle} Stretches
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {muscleStretches[selectedMuscle as keyof typeof muscleStretches]?.length || 0} stretches available
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {muscleStretches[selectedMuscle as keyof typeof muscleStretches]?.map((stretch: Stretch) => (
              <GlareHover className="h-full">
                <div className="p-5 md:p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      stretch.difficulty === 'Beginner' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300' :
                      stretch.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {stretch.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {stretch.name}
                  </h3>

                  {/* Image Placeholder */}
                  <div className="mb-3 relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-1">
                    {stretch.image ? (
                      <img 
                        src={stretch.image} 
                        alt={stretch.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Image coming soon</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Muscles Worked */}
                  <div className="mt-auto">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Muscles Worked:</h4>
                    <div className="flex flex-wrap gap-2">
                      {stretch.primaryMuscles.map((muscle, idx) => (
                        <span key={idx} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs">
                          {muscle}
                        </span>
                      ))}
                      {stretch.secondaryMuscles?.map((muscle, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlareHover>
          ))}
        </div>
      </div>
    </div>
  )
}

  if (currentSection === 'split') {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pb-8 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Split Generator
            </span>
          </h1>
          <Button
            variant="ghost"
            onClick={() => setCurrentSection('main')}
            className="mr-4 flex justify-center items-center text-white hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>

        {/* Error Message */}
        {splitError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-6"
          >
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <span className="text-red-700 dark:text-red-300">{splitError}</span>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-8">
          <Card className="p-8 flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Configure Your Workout Split
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Target className="w-4 h-4 inline mr-1" />
                  Experience Level
                </label>
                <div className="space-y-3">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSplitConfig(prev => ({ ...prev, experience: level }))}
                      className={`w-full p-5 rounded-xl border text-left transition-all text-sm ${
                        splitConfig.experience === level
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Days Per Week */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Days Per Week
                </label>
                <div className="space-y-2">
                  {['3', '4', '5', '6'].map((days) => (
                    <button
                      key={days}
                      onClick={() => setSplitConfig(prev => ({ ...prev, days }))}
                      className={`w-full p-3 rounded-xl border text-left transition-all text-sm ${
                        splitConfig.days === days
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <div className="space-y-3">
                  {['Gym', 'Home', 'Hybrid'].map((location) => (
                    <button
                      key={location}
                      onClick={() => setSplitConfig(prev => ({ ...prev, location }))}
                      className={`w-full p-5 rounded-xl border text-left transition-all text-sm ${
                        splitConfig.location === location
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cardio Toggle */}
            <div className="mb-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={splitConfig.cardio}
                    onChange={(e) =>
                      setSplitConfig((prev) => ({ ...prev, cardio: e.target.checked }))
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      splitConfig.cardio ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-[2.2px] left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        splitConfig.cardio ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
                <span className="text-gray-700 dark:text-gray-300 flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  Include Cardio Days
                </span>
              </label>
            </div>

            {/* User Goal Display */}
            {userProfile?.goal && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  <strong>Your Goal:</strong> {userProfile.goal}
                </p>
              </div>
            )}

            <Button
              onClick={generateWorkoutSplitPlan}
              disabled={!splitConfig.experience || !splitConfig.days || !splitConfig.location || splitLoading}
              loading={splitLoading}
              className="w-full flex justify-center items-center"
            >
              <Dumbbell className="w-5 h-5 mr-2" />
              Generate Weekly Split
            </Button>
          </Card>

          {/* Generated Split */}
          {generatedSplit && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {generatedSplit.splitName}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {generatedSplit.totalDuration} • {generatedSplit.totalExercises} exercises
                    </p>
                  </div>
                  <Button onClick={downloadSplitPDF} variant="secondary" className="flex justify-center items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{generatedSplit.experience}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Goal</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{generatedSplit.goal}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{generatedSplit.location}</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedSplit.days.map((day) => (
                  <Card
                    key={day.day}
                    className="p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {day.day}: {day.focus}
                      </h3>
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm">
                        {day.duration}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {day.exercises.map((exercise: Exercise, exerciseIndex: number) => (
                        <div key={exerciseIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {exercise.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {exercise.muscleGroup}
                              {exercise.equipment && ` • ${exercise.equipment}`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-emerald-600">
                              {exercise.sets} × {exercise.reps}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {exercise.rest} rest
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
  }

  return null
}