import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContracts } from '../../hooks/useContracts'
import { ContractForm } from './components/ContractForm'
import { ContractTable } from './components/ContractTable'
import { ContractFilters } from './components/ContractFilters'

export default function ContractListPage() {
  const navigate = useNavigate()
  const { contracts, loading, error, createContract, updateContract, deleteContract, fetchContracts } = useContracts()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filters, setFilters] = useState({ status: '', type: '', search: '' })

  const handleCreateSubmit = async (data) => {
    await createContract(data)
    setShowForm(false)
    await fetchContracts(filters)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      await deleteContract(id)
    }
  }

  const handleFilterChange = async (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    await fetchContracts(newFilters)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Contracts</h1>
            <p className="text-gray-500 mt-1">Manage all your contracts in one place</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
          >
            {showForm ? '✕ Cancel' : '+ New Contract'}
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Contract</h2>
            <ContractForm
              onSubmit={handleCreateSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Filters */}
        {!showForm && (
          <>
            <ContractFilters
              onStatusChange={(val) => handleFilterChange('status', val)}
              onTypeChange={(val) => handleFilterChange('type', val)}
              onSearchChange={(val) => handleFilterChange('search', val)}
            />

            {/* Contract Table */}
            <ContractTable
              contracts={contracts}
              loading={loading}
              onView={(id) => navigate(`/contracts/view/${id}`)}
              onEdit={(id) => navigate(`/contracts/edit/${id}`)}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  )
}
