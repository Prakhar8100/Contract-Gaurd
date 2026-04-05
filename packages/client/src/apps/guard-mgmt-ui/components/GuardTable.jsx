import React from 'react'

export function GuardTable({ guards, onView, onEdit, onDelete, loading }) {
  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading guards...</div>
  }

  if (!guards.length) {
    return <div className="text-center py-8 text-gray-500">No guards found</div>
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Employee ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Position</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Join Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guards.map((guard) => {
            const joinDate = new Date(guard.joinDate).toLocaleDateString()
            return (
              <tr key={guard._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{guard.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{guard.employeeId}</td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">{guard.position.replace('-', ' ')}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{guard.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{joinDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    guard.status === 'active' ? 'bg-green-100 text-green-800' :
                    guard.status === 'on-leave' ? 'bg-yellow-100 text-yellow-800' :
                    guard.status === 'suspended' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {guard.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onView(guard._id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(guard._id)}
                      className="text-green-600 hover:text-green-800 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(guard._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
