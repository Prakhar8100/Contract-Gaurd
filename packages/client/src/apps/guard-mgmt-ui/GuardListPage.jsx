import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGuards } from '../../hooks/useGuards'
import { GuardForm } from './components/GuardForm'
import { GuardTable } from './components/GuardTable'
import { GuardFilters } from './components/GuardFilters'

export default function GuardListPage() {
  const navigate = useNavigate()
  const { guards, loading, error, createGuard, deleteGuard, fetchGuards } = useGuards()
  const [showForm, setShowForm] = useState(false)
  const [filters, setFilters] = useState({ status: '', position: '', search: '' })

  const handleCreateSubmit = async (data) => {
    await createGuard(data)
    setShowForm(false)
    await fetchGuards(filters)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this guard?')) {
      await deleteGuard(id)
    }
  }

  const handleFilterChange = async (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    await fetchGuards(newFilters)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Security Guards</h1>
            <p className="text-gray-500 mt-1">Manage your guard team and assignments</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
          >
            {showForm ? '✕ Cancel' : '+ New Guard'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Create Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Guard</h2>
            <GuardForm
              onSubmit={handleCreateSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Filters */}
        {!showForm && (
          <>
            <GuardFilters
              onStatusChange={(val) => handleFilterChange('status', val)}
              onPositionChange={(val) => handleFilterChange('position', val)}
              onSearchChange={(val) => handleFilterChange('search', val)}
            />

            {/* Guard Table */}
            <GuardTable
              guards={guards}
              loading={loading}
              onView={(id) => navigate(`/guards/view/${id}`)}
              onEdit={(id) => navigate(`/guards/edit/${id}`)}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  )
}
