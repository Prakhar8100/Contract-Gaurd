import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContracts } from '../../hooks/useContracts'

export default function ContractDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { contracts, loading } = useContracts()
  const [contract, setContract] = useState(null)
  const [statusUpdate, setStatusUpdate] = useState(null)

  useEffect(() => {
    if (contracts.length > 0) {
      const found = contracts.find(c => c._id === id)
      setContract(found)
    }
  }, [contracts, id])

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (!contract) return <div className="text-center py-8 text-red-600">Contract not found</div>

  const startDate = new Date(contract.startDate).toLocaleDateString()
  const endDate = new Date(contract.endDate).toLocaleDateString()
  const createdDate = new Date(contract.createdAt).toLocaleDateString()

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{contract.title}</h1>
            <p className="text-gray-500 mt-1">Contract #{contract.contractNumber}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/contracts')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              ← Back
            </button>
            <button
              onClick={() => navigate(`/contracts/edit/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Status Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Contract Status</h2>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(contract.status)}`}>
                  {contract.status.toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Type</p>
                <p className="text-lg font-semibold text-gray-800">{contract.type}</p>
              </div>
            </div>
          </div>

          {/* Contract Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Client Information</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">{contract.clientName}</p>
                {contract.clientEmail && <p className="text-gray-600">📧 {contract.clientEmail}</p>}
                {contract.clientPhone && <p className="text-gray-600">📱 {contract.clientPhone}</p>}
              </div>

              <div>
                <p className="text-sm text-gray-600 font-semibold">Contract Duration</p>
                <p className="text-gray-800 mt-1">{startDate} → {endDate}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-semibold">Number of Guards</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{contract.guardCount}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Contract Value</p>
                <p className="text-3xl font-bold text-green-600 mt-1">${contract.value.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-semibold">Created</p>
                <p className="text-gray-600 mt-1">{createdDate}</p>
                {contract.createdBy && (
                  <p className="text-sm text-gray-500">By {contract.createdBy.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {contract.description && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{contract.description}</p>
            </div>
          )}

          {/* Notes */}
          {contract.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Notes</h3>
              <p className="text-gray-700 leading-relaxed">{contract.notes}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold transition"
          >
            🖨️ Print
          </button>
          <button
            onClick={() => navigate(`/contracts/edit/${id}`)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition"
          >
            📝 Edit Contract
          </button>
        </div>
      </div>
    </div>
  )
}
