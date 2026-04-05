import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export function useGuards() {
  const [guards, setGuards] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
  const token = localStorage.getItem('authToken')

  const fetchGuards = useCallback(async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams(filters)
      const response = await axios.get(`${apiUrl}/guards?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setGuards(response.data.guards || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch guards')
      console.error('Fetch guards error:', err)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, token])

  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/guards/stats/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setStats(response.data.stats)
    } catch (err) {
      console.error('Fetch stats error:', err)
    }
  }, [apiUrl, token])

  const createGuard = useCallback(async (guardData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(`${apiUrl}/guards`, guardData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setGuards([response.data.guard, ...guards])
      return response.data.guard
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create guard'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, token, guards])

  const updateGuard = useCallback(async (id, guardData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.put(`${apiUrl}/guards/${id}`, guardData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setGuards(guards.map(g => g._id === id ? response.data.guard : g))
      return response.data.guard
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update guard'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, token, guards])

  const deleteGuard = useCallback(async (id) => {
    try {
      setLoading(true)
      setError(null)
      await axios.delete(`${apiUrl}/guards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setGuards(guards.filter(g => g._id !== id))
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete guard'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, token, guards])

  const createSchedule = useCallback(async (guardId, scheduleData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(`${apiUrl}/guards/${guardId}/schedules`, scheduleData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data.schedule
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create schedule'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, token])

  const reportIncident = useCallback(async (guardId, incidentData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(`${apiUrl}/guards/${guardId}/incidents`, incidentData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data.incident
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to report incident'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, token])

  useEffect(() => {
    if (token) {
      fetchGuards()
      fetchStats()
    }
  }, [token])

  return {
    guards,
    loading,
    error,
    stats,
    fetchGuards,
    fetchStats,
    createGuard,
    updateGuard,
    deleteGuard,
    createSchedule,
    reportIncident,
  }
}
