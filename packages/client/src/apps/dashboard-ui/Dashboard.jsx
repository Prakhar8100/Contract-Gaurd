import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContracts } from '../../hooks/useContracts'
import { useGuards } from '../../hooks/useGuards'

export function Dashboard() {
  const navigate = useNavigate()
  const { contracts, stats: contractStats, loading: contractLoading } = useContracts()
  const { guards, stats: guardStats, loading: guardLoading } = useGuards()
  const [complianceScore, setComplianceScore] = useState(0)

  useEffect(() => {
    // Calculate compliance score based on active contracts and guards
    if (contractStats && guardStats) {
      const contractCompliance = contractStats.active / (contractStats.total || 1) * 100
      const guardCompliance = guardStats.active / (guardStats.total || 1) * 100
      const avgCompliance = ((contractCompliance + guardCompliance) / 2)
      setComplianceScore(Math.round(avgCompliance))
    }
  }, [contractStats, guardStats])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's your system overview.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Active Contracts */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Active Contracts</h3>
            {contractLoading ? (
              <p className="text-4xl font-bold text-gray-400">...</p>
            ) : (
              <>
                <p className="text-4xl font-bold text-gray-800">{contractStats?.active || 0}</p>
                <p className="text-gray-500 text-xs mt-2">of {contractStats?.total || 0} total</p>
              </>
            )}
          </div>

          {/* Total Contracts Value */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Contract Value</h3>
            {contractLoading ? (
              <p className="text-4xl font-bold text-gray-400">...</p>
            ) : (
              <>
                <p className="text-4xl font-bold text-gray-800">
                  ${(contractStats?.totalValue || 0).toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-2">all contracts</p>
              </>
            )}
          </div>

          {/* Active Guards */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Active Guards</h3>
            {guardLoading ? (
              <p className="text-4xl font-bold text-gray-400">...</p>
            ) : (
              <>
                <p className="text-4xl font-bold text-gray-800">{guardStats?.active || 0}</p>
                <p className="text-gray-500 text-xs mt-2">of {guardStats?.total || 0} total</p>
              </>
            )}
          </div>

          {/* Compliance Score */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Compliance Score</h3>
            <p className="text-4xl font-bold text-gray-800">{complianceScore}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full" 
                style={{ width: `${complianceScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recent Contracts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Contracts</h2>
            {contractLoading ? (
              <p className="text-gray-500">Loading contracts...</p>
            ) : contracts.length > 0 ? (
              <div className="space-y-3">
                {contracts.slice(0, 5).map(contract => (
                  <div key={contract._id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-semibold text-gray-800">{contract.title}</p>
                      <p className="text-sm text-gray-500">{contract.clientName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      contract.status === 'active' ? 'bg-green-100 text-green-800' :
                      contract.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      contract.status === 'expired' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {contract.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No contracts yet</p>
            )}
          </div>

          {/* Recent Guards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Guards</h2>
            {guardLoading ? (
              <p className="text-gray-500">Loading guards...</p>
            ) : guards.length > 0 ? (
              <div className="space-y-3">
                {guards.slice(0, 5).map(guard => (
                  <div key={guard._id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-semibold text-gray-800">{guard.name}</p>
                      <p className="text-sm text-gray-500">{guard.position}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      guard.status === 'active' ? 'bg-green-100 text-green-800' :
                      guard.status === 'on-leave' ? 'bg-yellow-100 text-yellow-800' :
                      guard.status === 'suspended' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {guard.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No guards yet</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/contracts')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              📋 View Contracts
            </button>
            <button 
              onClick={() => navigate('/guards')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              👮 View Guards
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition">
              📊 Generate Reports
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
