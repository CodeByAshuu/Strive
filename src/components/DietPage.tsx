import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Utensils, DollarSign, Leaf, ChefHat } from 'lucide-react'
import { Button } from './ui/Button'
import { Card, GlareCard } from './ui/Card'

interface MealPlan {
  type: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  ingredients: string[]
  instructions: string[]
}

const sampleMealPlans: MealPlan[] = [
  {
    type: 'Breakfast',
    name: 'Protein Power Bowl',
    calories: 420,
    protein: 35,
    carbs: 25,
    fats: 18,
    ingredients: ['3 eggs', '1 cup oats', '1 banana', '1 tbsp almond butter', 'Greek yogurt'],
    instructions: ['Cook eggs', 'Prepare oats', 'Slice banana', 'Mix with yogurt', 'Add almond butter']
  },
  {
    type: 'Lunch',
    name: 'Lean Muscle Builder',
    calories: 580,
    protein: 45,
    carbs: 35,
    fats: 22,
    ingredients: ['200g chicken breast', '150g brown rice', 'Mixed vegetables', 'Olive oil', 'Herbs'],
    instructions: ['Grill chicken', 'Cook brown rice', 'Steam vegetables', 'Season with herbs', 'Drizzle olive oil']
  },
  {
    type: 'Dinner',
    name: 'Recovery Feast',
    calories: 520,
    protein: 40,
    carbs: 30,
    fats: 20,
    ingredients: ['200g salmon', '150g sweet potato', 'Asparagus', 'Quinoa', 'Lemon'],
    instructions: ['Bake salmon', 'Roast sweet potato', 'Steam asparagus', 'Cook quinoa', 'Add lemon zest']
  }
]

export const DietPage: React.FC = () => {
  const [budget, setBudget] = useState('')
  const [preference, setPreference] = useState('')
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [loading, setLoading] = useState(false)

  const generateMealPlan = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setMealPlans(sampleMealPlans)
    setLoading(false)
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
            🍽️ Personalized Diet Plans
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get AI-powered meal plans tailored to your goals, budget, and preferences
          </p>
        </motion.div>

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
                  Budget Range
                </label>
                <div className="space-y-2">
                  {['Low ($20-40/week)', 'Medium ($40-80/week)', 'High ($80+/week)'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setBudget(option)}
                      className={`w-full p-3 rounded-xl border text-left transition-all ${
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
                  Dietary Preference
                </label>
                <div className="space-y-2">
                  {['Omnivore', 'Vegetarian', 'Vegan', 'Keto', 'Paleo'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setPreference(option)}
                      className={`w-full p-3 rounded-xl border text-left transition-all ${
                        preference === option
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
              onClick={generateMealPlan}
              disabled={!budget || !preference}
              loading={loading}
              className="w-full"
            >
              <ChefHat className="w-5 h-5 mr-2" />
              Generate Meal Plan
            </Button>
          </Card>
        </motion.div>

        {/* Meal Plans */}
        {mealPlans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Your Personalized Meal Plan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mealPlans.map((meal, index) => (
                <motion.div
                  key={meal.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <GlareCard>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium">
                          {meal.type}
                        </span>
                        <Utensils className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {meal.name}
                      </h3>
                      
                      {/* Macros */}
                      <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-emerald-600">{meal.calories}</p>
                          <p className="text-xs text-gray-500">Calories</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{meal.protein}g</p>
                          <p className="text-xs text-gray-500">Protein</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">{meal.carbs}g</p>
                          <p className="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{meal.fats}g</p>
                          <p className="text-xs text-gray-500">Fats</p>
                        </div>
                      </div>

                      {/* Ingredients */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ingredients:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {meal.ingredients.map((ingredient, idx) => (
                            <li key={idx}>• {ingredient}</li>
                          ))}
                        </ul>
                      </div>

                      <Button variant="secondary" className="w-full">
                        View Recipe
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