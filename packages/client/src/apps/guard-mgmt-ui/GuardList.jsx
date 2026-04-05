import React, { useState, useEffect } from 'react'
import { guardAPI } from '../../api/client'

export function GuardList() {
  const [guards, setGuards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGuards()
  }, [])

  const fetchGuards = async () => {
    try {
      const response = await guardAPI.list()
      setGuards(response.data.guards || [])
    } catch (err) {
      console.error('Failed to fetch guards:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">Loading guards...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Guards</h2>

        {guards.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">No guards found</p>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Add Guard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guards.map((guard) => (
              <div key={guard.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{guard.name}</h3>
                <p className="text-gray-600 text-sm">ID: {guard.id}</p>
                <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  View Schedule
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
