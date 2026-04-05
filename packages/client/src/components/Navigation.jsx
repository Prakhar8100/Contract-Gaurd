import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
              CG
            </div>
            <h1 className="text-xl font-bold">Contract Guard</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate('/dashboard')}
              className={`font-semibold transition ${
                isActive('/dashboard') || isActive('/')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => navigate('/contracts')}
              className={`font-semibold transition ${
                isActive('/contracts')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              📋 Contracts
            </button>
            <button
              onClick={() => navigate('/guards')}
              className={`font-semibold transition ${
                isActive('/guards')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              👮 Guards
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition ml-4"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
