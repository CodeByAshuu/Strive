import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Edit2, LogOut, Save } from 'lucide-react'
import { useAuth } from './../contexts/AuthContext'
import { supabase } from './../lib/supabase'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Card } from './ui/Card'
import { useNavigate } from 'react-router-dom'

interface UserProfile {
  age: number | null
  weight: number | null
  height: number | null
  goal: string | null
  workout_frequency: string | null
  target_weight: number | null
}

export const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    age: null,
    weight: null,
    height: null,
    goal: null,
    workout_frequency: null,
    target_weight: null,
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
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
        setProfile({
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

  const handleSave = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...profile,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
      setEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    }
    setLoading(false)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

    const updateProfile = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
        setProfile(prev => ({ ...prev, [key]: value }))
    }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user?.user_metadata?.name || 'Your Profile'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Age"
                  type="number"
                  value={profile.age || ''}
                  onChange={(e) => updateProfile('age', parseInt(e.target.value) || null)}
                  disabled={!editing}
                  placeholder="Enter your age"
                />

                <Input
                  label="Current Weight (kg)"
                  type="number"
                  value={profile.weight || ''}
                  onChange={(e) => updateProfile('weight', parseInt(e.target.value) || null)}
                  disabled={!editing}
                  placeholder="Enter current weight"
                />

                <Input
                  label="Height (cm)"
                  type="number"
                  value={profile.height || ''}
                  onChange={(e) => updateProfile('height', parseInt(e.target.value) || null)}
                  disabled={!editing}
                  placeholder="Enter height"
                />

                <Input
                  label="Target Weight (kg)"
                  type="number"
                  value={profile.target_weight || ''}
                  onChange={(e) => updateProfile('target_weight', parseInt(e.target.value) || null)}
                  disabled={!editing}
                  placeholder="Enter target weight"
                />
              </div>

              {editing && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fitness Goal
                    </label>
                    <select
                      value={profile.goal || ''}
                      onChange={(e) => updateProfile('goal', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select goal</option>
                      <option value="Bulking">Bulking</option>
                      <option value="Cutting">Cutting</option>
                      <option value="Lean Bulk">Lean Bulk</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="General Fitness">General Fitness</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Workout Frequency
                    </label>
                    <select
                      value={profile.workout_frequency || ''}
                      onChange={(e) => updateProfile('workout_frequency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select frequency</option>
                      <option value="2-3 times/week">2-3 times/week</option>
                      <option value="3-4 times/week">3-4 times/week</option>
                      <option value="4-5 times/week">4-5 times/week</option>
                      <option value="5+ times/week">5+ times/week</option>
                      <option value="Light workout">Light workout</option>
                    </select>
                  </div>
                </div>
              )}

              {!editing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fitness Goal
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {profile.goal || 'Not set'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Workout Frequency
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {profile.workout_frequency || 'Not set'}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {editing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      loading={loading}
                      className="flex-1 flex items-center justify-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setEditing(false)}
                      className="flex-1 flex items-center justify-center text-white hover:text-gray-700"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                        onClick={() => setEditing(true)}
                        variant="secondary"
                        className="flex-1 flex items-center justify-center"
                    >
                    <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>

                    <Button
                        onClick={handleSignOut}
                        variant="ghost"
                        className="flex-1 flex items-center justify-center text-white hover:text-gray-700"
                    >
                    <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </Button>

                  </>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}