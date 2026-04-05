import React from 'react'

export function ContractFilters({ onStatusChange, onTypeChange, onSearchChange, filters = {} }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search title, number, client..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
          <select
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="security">Security</option>
            <option value="maintenance">Maintenance</option>
            <option value="consultation">Consultation</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  )
}
