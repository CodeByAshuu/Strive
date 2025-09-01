import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Leaf, ChefHat, Download, Calendar, AlertCircle } from 'lucide-react'
import { useAuth } from './../contexts/AuthContext'
import { supabase } from './../lib/supabase'
import { getMealPlan, type WeeklyMealPlan } from './../lib/openai'
import { Button } from './ui/Button'
import { Card, GlareCard } from './ui/Card'
import jsPDF from 'jspdf'

interface UserProfile {
  age: number | null
  weight: number | null
  height: number | null
  goal: string | null
  workout_frequency: string | null
  target_weight: number | null
}

export const DietPage: React.FC = () => {
  const { user } = useAuth()
  const [budget, setBudget] = useState('')
  const [preference, setPreference] = useState('')
  const [customPreference, setCustomPreference] = useState('')
  const [weeklyMealPlan, setWeeklyMealPlan] = useState<WeeklyMealPlan>({})
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [error, setError] = useState('')
  const [profileComplete, setProfileComplete] = useState(false)

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
        const profile = {
          age: data.age,
          weight: data.weight,
          height: data.height,
          goal: data.goal,
          workout_frequency: data.workout_frequency,
          target_weight: data.target_weight,
        }
        setUserProfile(profile)
        
        // Check if profile is complete enough
        const isComplete = data.age && data.weight && data.height && data.goal
        setProfileComplete(!!isComplete)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const getMealFrequency = (goal: string | null): string[] => {
    if (!goal) return ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    
    const lowerGoal = goal.toLowerCase();
    switch (lowerGoal) {
      case 'bulking':
      case 'lean bulk':
        return ['Breakfast', 'Brunch', 'Lunch', 'Snack', 'Dinner', 'Post-Workout']
      case 'cutting':
        return ['Breakfast', 'Lunch', 'Snack', 'Dinner']
      case 'maintenance':
      case 'general fitness':
        return ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Evening Snack']
      default:
        return ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    }
  }

  const handleGenerateMealPlan = async () => {
    setError("")
    
    if (!userProfile) {
      setError("Please complete your profile first")
      return
    }

    if (!profileComplete) {
      setError("Your profile is incomplete. Please update your age, weight, height, and goal.")
      return
    }

    if (!budget || !preference || (preference === 'Custom' && !customPreference)) {
      setError("Please select budget and preference options")
      return
    }

    setLoading(true)
    console.log("🔄 Starting meal plan generation...")
    
    try {
      const finalPreference = preference === 'Custom' ? customPreference : preference
      const mealTypes = getMealFrequency(userProfile.goal)

      const prompt = `
      Create a detailed 7-day Indian meal plan based on the following user information:
      
      USER PROFILE:
      - Age: ${userProfile.age} years
      - Current Weight: ${userProfile.weight} kg
      - Height: ${userProfile.height} cm
      - Goal Weight: ${userProfile.target_weight} kg
      - Workout Frequency: ${userProfile.workout_frequency}
      - Fitness Goal: ${userProfile.goal}
      - Budget: ${budget}
      - Dietary Preference: ${finalPreference}
      
      MEAL STRUCTURE:
      ${mealTypes.length} meals per day: ${mealTypes.join(", ")}
      
      REQUIREMENTS:
      - Focus on authentic Indian foods and ingredients
      - Include portion sizes and cooking methods
      - Adjust calories and macros based on the fitness goal
      - Consider the budget constraints
      - Respect dietary preferences
      
      OUTPUT FORMAT:
      Return ONLY valid JSON with this structure:
      {
        "Day 1": {
          "Breakfast": "Meal description with portions",
          "Lunch": "Meal description with portions",
          ...
        },
        "Day 2": { ... },
        ...
        "Day 7": { ... }
      }
      `

      console.log("📤 Sending prompt to OpenAI...")
      const response = await getMealPlan(prompt)
      console.log("✅ Successfully received meal plan:", response)
      setWeeklyMealPlan(response)
      
    } catch (error: unknown) {
      console.error("❌ Error generating meal plan:", error)
      if (error instanceof Error) {
        setError(error.message || "Failed to generate meal plan. Please try again.")
      } else {
        setError("Failed to generate meal plan. Please try again.")
      }
    }
    setLoading(false)
  }

  const calculateCalories = (profile: UserProfile | null): number => {
    if (!profile) return 2000
    
    // Basic calorie calculation based on goal and user data
    const baseCalories = 2000 // Default base
    
    if (!profile.goal) return baseCalories
    
    const lowerGoal = profile.goal.toLowerCase();
    switch (lowerGoal) {
      case 'bulking':
      case 'lean bulk':
        return baseCalories + 500 // Surplus for muscle gain
      case 'cutting':
        return baseCalories - 500 // Deficit for fat loss
      case 'maintenance':
      case 'general fitness':
      default:
        return baseCalories
    }
  }

  const downloadMealPlanPDF = () => {
    const doc = new jsPDF()
    
    // Set initial coordinates
    let y = 20
    let page = 1
    
    // Add header with logo/background
    doc.setFillColor(16, 185, 129) // Emerald color
    doc.rect(0, 0, 210, 30, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("STRIVE", 20, 20)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Your Personalized Meal Plan", 20, 27)
    
    // Reset text color for content
    doc.setTextColor(0, 0, 0)
    y = 45
    
    // Add user info section
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Weekly Meal Plan", 20, y)
    y += 10
    
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Goal: ${userProfile?.goal || "Not specified"}`, 20, y)
    doc.text(`Budget: ${budget || "Not specified"}`, 120, y)
    y += 5
    doc.text(`Preference: ${preference === "Custom" ? customPreference : preference || "Not specified"}`, 20, y)
    y += 5
    doc.text(`Age: ${userProfile?.age || "Not specified"} years`, 20, y)
    doc.text(`Weight: ${userProfile?.weight || "Not specified"} kg`, 120, y)
    y += 5
    doc.text(`Target Weight: ${userProfile?.target_weight || "Not specified"} kg`, 20, y)
    doc.text(`Workout Frequency: ${userProfile?.workout_frequency || "Not specified"}`, 120, y)
    y += 15
    
    // Add meal plan content
    Object.entries(weeklyMealPlan).forEach(([day, meals]) => {
      // Check if we need a new page
      if (y > 250) {
        doc.addPage()
        page++
        y = 20
        
        // Add header to new page
        doc.setFillColor(16, 185, 129)
        doc.rect(0, 0, 210, 30, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(12)
        doc.setFont("helvetica", "normal")
        doc.text(`STRIVE - Meal Plan (Page ${page})`, 20, 20)
        doc.setTextColor(0, 0, 0)
        y = 35
      }
      
      // Day header
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text(day, 20, y)
      y += 8
      
      // Meals for the day
      Object.entries(meals).forEach(([mealType, meal]) => {
        // Check if we need a new page before adding meal
        if (y > 270) {
          doc.addPage()
          page++
          y = 20
          
          // Add header to new page
          doc.setFillColor(16, 185, 129)
          doc.rect(0, 0, 210, 30, "F")
          doc.setTextColor(255, 255, 255)
          doc.setFontSize(12)
          doc.setFont("helvetica", "normal")
          doc.text(`STRIVE - Meal Plan (Page ${page})`, 20, 20)
          doc.setTextColor(0, 0, 0)
          y = 35
          
          // Re-add day header on new page
          doc.setFontSize(14)
          doc.setFont("helvetica", "bold")
          doc.text(day, 20, y)
          y += 8
        }
        
        // Meal type
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        const mealTypeText = `${mealType}:`
        doc.text(mealTypeText, 25, y)
        y += 4
        
        // Meal description with proper text wrapping
        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)
        
        const splitText = doc.splitTextToSize(meal, 160)
        const textHeight = splitText.length * 4
        
        // Check if text will fit on current page
        if (y + textHeight > 270) {
          doc.addPage()
          page++
          y = 20
          
          // Add header to new page
          doc.setFillColor(16, 185, 129)
          doc.rect(0, 0, 210, 30, "F")
          doc.setTextColor(255, 255, 255)
          doc.setFontSize(12)
          doc.setFont("helvetica", "normal")
          doc.text(`STRIVE - Meal Plan (Page ${page})`, 20, 20)
          doc.setTextColor(0, 0, 0)
          y = 35
        }
        
        doc.text(splitText, 25, y)
        y += textHeight + 6
      })
      
      // Add space between days
      y += 10
    })
    
    // Add footer with generation date
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text(`Generated on: ${new Date().toLocaleDateString()} - Page ${i} of ${totalPages}`, 20, 285)
    }
    
    // Save the PDF
    doc.save("strive-meal-plan.pdf")
  }

  const mealTypes = getMealFrequency(userProfile?.goal ?? null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🍽️ Personalized Diet Plans
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get AI-powered Indian meal plans tailored to your goals, budget, and preferences
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-6"
          >
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 dark:text-red-300">{error}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile Incomplete Warning */}
        {!profileComplete && user && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-6"
          >
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-yellow-700 dark:text-yellow-300">
                  Please complete your profile with age, weight, height, and fitness goal to generate meal plans.
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Customize Your Plan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Budget Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Budget Range (INR)
                </label>
                <div className="space-y-2">
                  {['₹1500-₹3000/week', '₹3000-₹6000/week', '₹6000+/week'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setBudget(option)}
                      className={`w-full p-3 rounded-xl border text-left transition-all dark:text-gray-200 ${
                        budget === option
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preference Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Leaf className="w-4 h-4 inline mr-1" />
                  Food Preference
                </label>
                <div className="space-y-2">
                  {['Vegetarian', 'Eggetarian', 'Non-Vegetarian', 'Jain', 'Custom'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setPreference(option)}
                      className={`w-full p-3 rounded-xl border text-left transition-all dark:text-gray-200 ${
                        preference === option
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {preference === 'Custom' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter your custom preference"
                      value={customPreference}
                      onChange={(e) => setCustomPreference(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Meal Frequency Info */}
            {userProfile?.goal && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  Your Meal Plan Structure
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                  Based on your goal ({userProfile.goal}), you'll get {mealTypes.length} meals per day:
                </p>
                <div className="flex flex-wrap gap-2">
                  {mealTypes.map((meal) => (
                    <span key={meal} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-lg text-xs">
                      {meal}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-blue-500 dark:text-blue-400 mt-2">
                  Target: {calculateCalories(userProfile)} calories per day
                </p>
              </div>
            )}

            <Button
              onClick={handleGenerateMealPlan}
              disabled={!budget || !preference || (preference === 'Custom' && !customPreference) || !userProfile || !profileComplete}
              loading={loading}
              className="w-full flex items-center justify-center"
            >
              <ChefHat className="w-5 h-5 mr-2" />
              Generate AI-Powered Meal Plan
            </Button>
          </Card>
        </motion.div>

        {/* Weekly Meal Plans */}
        {Object.keys(weeklyMealPlan).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your 7-Day Indian Meal Plan
              </h2>
              <Button onClick={downloadMealPlanPDF} variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(weeklyMealPlan).map(([day, meals]) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <GlareCard>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {day}
                        </h3>
                        <Calendar className="w-5 h-5 text-emerald-500" />
                      </div>
                      
                      <div className="space-y-4">
                        {Object.entries(meals).map(([mealType, meal]) => (
                          <div key={mealType} className="border-l-4 border-emerald-500 pl-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {mealType}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {meal}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlareCard>
                </motion.div>
              ))}
            </div>

            {/* Nutritional Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <Card className="p-8 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
                <h3 className="text-2xl font-bold mb-4">📊 Weekly Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold">{mealTypes.length}</p>
                    <p className="text-sm opacity-90">Meals per day</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">7</p>
                    <p className="text-sm opacity-90">Days planned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">{calculateCalories(userProfile)}</p>
                    <p className="text-sm opacity-90">Calories/day</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">{budget.split('-')[0]}</p>
                    <p className="text-sm opacity-90">Budget range</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}