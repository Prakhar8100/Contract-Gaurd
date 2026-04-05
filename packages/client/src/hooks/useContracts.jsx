import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export function useContracts() {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
  const token = localStorage.getItem('authToken')

  const fetchContracts = useCallback(async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams(filters)
      const response = await axios.get(`${apiUrl}/contracts?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setContracts(response.data.contracts || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contracts')
      console.error('Fetch contracts error:', err)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, token])

  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/contracts/stats/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setStats(response.data.stats)
    } catch (err) {
      console.error('Fetch stats error:', err)
    }
  }, [apiUrl, token])

  const createContract = useCallback(async (contractData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(`${apiUrl}/contracts`, contractData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setContracts([response.data.contract, ...contracts])
      return response.data.contract
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create contract'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, token, contracts])

  const updateContract = useCallback(async (id, contractData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.put(`${apiUrl}/contracts/${id}`, contractData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setContracts(contracts.map(c => c._id === id ? response.data.contract : c))
      return response.data.contract
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update contract'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, token, contracts])

  const deleteContract = useCallback(async (id) => {
    try {
      setLoading(true)
      setError(null)
      await axios.delete(`${apiUrl}/contracts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setContracts(contracts.filter(c => c._id !== id))
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete contract'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, token, contracts])

  useEffect(() => {
    if (token) {
      fetchContracts()
      fetchStats()
    }
  }, [token])

  return {
    contracts,
    loading,
    error,
    stats,
    fetchContracts,
    fetchStats,
    createContract,
    updateContract,
    deleteContract,
  }
}
