import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from './../contexts/AuthContext'
import { Card, GlareCard } from './ui/Card'
import { Button } from './ui/Button'
import { Link } from 'react-router-dom'
import { Utensils, Dumbbell, Target, } from 'lucide-react'
import Waves from './ui/WaveBackground';

export const Dashboard: React.FC = () => {
  const { user } = useAuth()

  const features = [
    {
      title: 'Personalized Diet Plans',
      description: 'Get AI-generated meal plans tailored to your goals and preferences',
      icon: Utensils,
      link: '/diet',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Custom Workouts',
      description: 'Access workout routines designed for your fitness level and goals',
      icon: Dumbbell,
      link: '/workout',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Body Explorer',
      description: 'Interactive muscle targeting with exercise recommendations',
      icon: Target,
      link: '/body-explorer',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 pb-24">
      <div className='z-1 absolute inset-0'>
          <Waves
          lineColor="#10B981"
          backgroundColor="rgba(255, 255, 255, 0)"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh] z-20 relative px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-wide uppercase mb-6"
        >
          STRIVE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300"
        >
          Welcome back, {user?.user_metadata?.name?.split(' ')[0] || 'Warrior'}!
        </motion.p>
      </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <GlareCard>
                  <div className="p-8">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {feature.description}
                    </p>
                    <Link to={feature.link}>
                      <Button className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </GlareCard>
              </motion.div>
            )
          })}
        </div>

        {/* Motivational Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
            <h2 className="text-2xl font-bold mb-4">🔥 Today's Challenge</h2>
            <p className="text-lg mb-6">
              "The only bad workout is the one that didn't happen."
            </p>
            <p className="opacity-90">
              You're stronger than yesterday. Keep pushing forward!
            </p>
          </Card>
        </motion.div>
      </div>
  )
}