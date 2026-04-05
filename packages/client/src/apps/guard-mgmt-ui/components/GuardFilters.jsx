import React from 'react'

export function GuardFilters({ onStatusChange, onPositionChange, onSearchChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search name, email, ID..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="suspended">Suspended</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>

        {/* Position Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
          <select
            onChange={(e) => onPositionChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Positions</option>
            <option value="security-guard">Security Guard</option>
            <option value="supervisor">Supervisor</option>
            <option value="manager">Manager</option>
          </select>
        </div>
      </div>
    </div>
  )
}
