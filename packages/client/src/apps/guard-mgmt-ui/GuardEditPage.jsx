import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGuards } from '../../hooks/useGuards'
import { GuardForm } from './components/GuardForm'

export default function GuardEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { guards, loading, updateGuard, fetchGuards } = useGuards()
  const [guard, setGuard] = useState(null)

  useEffect(() => {
    fetchGuards()
  }, [])

  useEffect(() => {
    if (guards.length > 0) {
      const found = guards.find(g => g._id === id)
      setGuard(found)
    }
  }, [guards, id])

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (!guard) return <div className="text-center py-8 text-red-600">Guard not found</div>

  const handleSubmit = async (data) => {
    await updateGuard(id, data)
    navigate('/guards')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Edit Guard Profile</h1>
          <p className="text-gray-500 mt-1">{guard.name}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <GuardForm
            initialData={guard}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/guards')}
          />
        </div>
      </div>
    </div>
  )
}
