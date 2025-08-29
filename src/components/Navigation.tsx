import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Utensils, Dumbbell, User, Target } from 'lucide-react'

const navItems = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Diet', path: '/diet', icon: Utensils },
  { name: 'Workout', path: '/workout', icon: Dumbbell },
  { name: 'Explorer', path: '/body-explorer', icon: Target },
  { name: 'Profile', path: '/profile', icon: User },
]

export const Navigation: React.FC = () => {
  const location = useLocation()

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl px-2 py-2 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`relative px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors ${
                    isActive 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="pill"
                      className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="text-sm font-medium relative z-10 hidden sm:block">{item.name}</span>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}