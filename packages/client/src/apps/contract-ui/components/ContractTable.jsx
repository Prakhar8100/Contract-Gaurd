import React from 'react'

export function ContractTable({ contracts, onView, onEdit, onDelete, loading }) {
  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading contracts...</div>
  }

  if (!contracts.length) {
    return <div className="text-center py-8 text-gray-500">No contracts found</div>
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contract #</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Value</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Duration</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => {
            const startDate = new Date(contract.startDate).toLocaleDateString()
            const endDate = new Date(contract.endDate).toLocaleDateString()
            return (
              <tr key={contract._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{contract.contractNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{contract.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{contract.clientName}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">${contract.value.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{startDate} - {endDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    contract.status === 'active' ? 'bg-green-100 text-green-800' :
                    contract.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    contract.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                    contract.status === 'expired' ? 'bg-red-100 text-red-800' :
                    contract.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {contract.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onView(contract._id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(contract._id)}
                      className="text-green-600 hover:text-green-800 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(contract._id)}
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
