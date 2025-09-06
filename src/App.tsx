import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { PrivateRoute } from './components/common/PrivateRoute'
import { Navigation } from './components/Navigation'
import { SignUp } from './components/auth/SignUp'
import { Login } from './components/auth/Login'
import { StepperQuiz } from './components/StepperQuiz'
import { Dashboard } from './components/Dashboard'
import { DietPage } from './components/DietPage'
import { WorkoutPage } from './components/WorkoutPage'
import { BodyExplorer } from './components/BodyExplorer'
import { ProfilePage } from './components/ProfilePage'
import { testApiConnection } from './lib/config'

function App() {
  useEffect(() => {
    // Test API connection on app load
    testApiConnection();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            
            {/* Private Routes */}
            <Route path="/stepper" element={
              <PrivateRoute>
                <StepperQuiz />
              </PrivateRoute>
            } />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
                <Navigation />
              </PrivateRoute>
            } />
            
            <Route path="/diet" element={
              <PrivateRoute>
                <DietPage />
                <Navigation />
              </PrivateRoute>
            } />
            
            <Route path="/workout" element={
              <PrivateRoute>
                <WorkoutPage />
                <Navigation />
              </PrivateRoute>
            } />
            
            <Route path="/body-explorer" element={
              <PrivateRoute>
                <BodyExplorer />
                <Navigation />
              </PrivateRoute>
            } />
            
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
                <Navigation />
              </PrivateRoute>
            } />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App