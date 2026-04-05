import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { LoginPage } from './apps/auth-ui/LoginPage'
import { Dashboard } from './apps/dashboard-ui/Dashboard'
import { Navigation } from './components/Navigation'
import { ProtectedRoute } from './components/ProtectedRoute'

// Contract Pages
import ContractListPage from './apps/contract-ui/ContractListPage'
import ContractEditPage from './apps/contract-ui/ContractEditPage'
import ContractDetailPage from './apps/contract-ui/ContractDetailPage'

// Guard Pages
import GuardListPage from './apps/guard-mgmt-ui/GuardListPage'
import GuardEditPage from './apps/guard-mgmt-ui/GuardEditPage'
import GuardDetailPage from './apps/guard-mgmt-ui/GuardDetailPage'

import './index.css'

function AppLayout() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLogin && <Navigation />}
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboard */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Contract Routes */}
        <Route path="/contracts" element={<ProtectedRoute><ContractListPage /></ProtectedRoute>} />
        <Route path="/contracts/edit/:id" element={<ProtectedRoute><ContractEditPage /></ProtectedRoute>} />
        <Route path="/contracts/view/:id" element={<ProtectedRoute><ContractDetailPage /></ProtectedRoute>} />

        {/* Guard Routes */}
        <Route path="/guards" element={<ProtectedRoute><GuardListPage /></ProtectedRoute>} />
        <Route path="/guards/edit/:id" element={<ProtectedRoute><GuardEditPage /></ProtectedRoute>} />
        <Route path="/guards/view/:id" element={<ProtectedRoute><GuardDetailPage /></ProtectedRoute>} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
