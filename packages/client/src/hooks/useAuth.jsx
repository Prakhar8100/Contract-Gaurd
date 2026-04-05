import React, { createContext, useState, useContext } from 'react'
import { authAPI } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('auth_token'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (email, password) => {
    setLoading(true)
    setError('')
    try {
      const response = await authAPI.login(email, password)
      const { token, user } = response.data
      
      setToken(token)
      setUser(user)
      localStorage.setItem('auth_token', token)
      
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password, role = 'user') => {
    setLoading(true)
    setError('')
    try {
      const response = await authAPI.register({ name, email, password, role })
      const { token, user } = response.data
      
      setToken(token)
      setUser(user)
      localStorage.setItem('auth_token', token)
      
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setError('')
    localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
