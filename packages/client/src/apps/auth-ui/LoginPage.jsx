import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function LoginPage() {
  const [email, setEmail] = useState('admin@contractguard.com')
  const [password, setPassword] = useState('password123')
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const { login, register, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isLogin) {
      const result = await login(email, password)
      if (result.success) {
        navigate('/dashboard')
      }
    } else {
      const result = await register(name, email, password, 'user')
      if (result.success) {
        navigate('/dashboard')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Contract Guard
        </h1>
        <p className="text-center text-gray-600 text-sm mb-8">
          Security & Contract Management
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@contractguard.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setEmail('')
              setPassword('')
              setName('')
            }}
            className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600 text-xs mb-3">
            <strong>Demo Credentials:</strong>
          </p>
          <p className="text-center text-gray-600 text-xs">
            Email: <code className="bg-gray-100 px-2 py-1 rounded">admin@contractguard.com</code>
          </p>
          <p className="text-center text-gray-600 text-xs">
            Password: <code className="bg-gray-100 px-2 py-1 rounded">password123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
