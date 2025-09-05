import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from './../contexts/AuthContext'
import { Button } from './ui/Button'
import { Link } from 'react-router-dom'
import { Utensils, Dumbbell, Target, } from 'lucide-react'
import Waves from './ui/WaveBackground';
import GlareHover from './ui/GlareHover';
import '../index.css'; // Ensure this import is present to apply the CSS

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
      description: 'Interactive Calculators, Stretch Library and Challenges to enhance your fitness journey, all in one place',
      icon: Target,
      link: '/body-explorer',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 pb-24">
  
    {/* Hero Section with Waves */}
    <div className="relative min-h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Waves in background */}
      <div className="absolute inset-0 z-0 wave-fade">
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

      {/* Hero content */}
      <div className="relative z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-extrabold text-gray-900 dark:text-white tracking-wide uppercase mb-6"
        >
          STRIVE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-4xl text-gray-700 dark:text-gray-200"
        >
          Welcome back, {user?.user_metadata?.name?.split(' ')[0] || 'Warrior'}!
        </motion.p>
      </div>
    </div>
    

    {/* Feature Cards Section - OUTSIDE the Waves */}
    <div className="relative z-10 mt-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <GlareHover
              key={feature.title}
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              className="h-full"
            >
              <div className="p-8 flex flex-col justify-between h-full">
                <div>
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {feature.description}
                  </p>
                </div>
                <Link to={feature.link}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </GlareHover>
          )
        })}
      </div>
    </div>
  </div>
  )
}