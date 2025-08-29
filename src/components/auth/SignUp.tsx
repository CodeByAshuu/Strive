import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/Button'
// import { Input } from '../ui/Input'
import { Card } from '../ui/Card'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export const SignUp: React.FC = () => {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const password = watch('password')

  const onSubmit = async (data: FormData) => {
    // Client-side validation
    if (!data.name.trim()) {
      setError('name', { message: 'Name is required' })
      return
    }
    if (!data.email.trim()) {
      setError('email', { message: 'Email is required' })
      return
    }
    if (!data.password) {
      setError('password', { message: 'Password is required' })
      return
    }
    if (data.password.length < 6) {
      setError('password', { message: 'Password must be at least 6 characters' })
      return
    }
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Passwords must match' })
      return
    }
    if (!data.terms) {
      setError('terms', { message: 'You must agree to the terms and conditions' })
      return
    }

    setLoading(true)
    try {
      const { error } = await signUp(data.email, data.password, { name: data.name })
      if (error) {
        setError('email', { message: error.message })
      } else {
        navigate('/stepper')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError('email', { message: err.message })
      } else {
        setError('email', { message: 'Something went wrong' })
      }
    }
    setLoading(false)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <motion.h1
              className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              FitForge
            </motion.h1>
            <p className="text-gray-600 dark:text-gray-400">Create your fitness journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register('confirmPassword', { 
                  required: 'Confirm password is required',
                  validate: value => value === password || 'Passwords must match'
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                {...register('terms', { required: 'You must agree to the terms and conditions' })}
                className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-emerald-600 hover:text-emerald-700 underline"
                >
                  Terms & Conditions
                </button>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms.message}</p>
            )}

            <Button type="submit" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Terms & Conditions</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 max-h-64 overflow-y-auto">
              <p>By using FitForge, you agree to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide accurate information about your fitness goals</li>
                <li>Use the platform responsibly for fitness purposes</li>
                <li>Respect the privacy of other users</li>
                <li>Consult healthcare professionals before starting new routines</li>
              </ul>
            </div>
            <Button
              onClick={() => setShowTerms(false)}
              className="w-full mt-4"
              variant="secondary"
            >
              Close
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}