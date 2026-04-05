import React, { useState } from 'react'
import { useContracts } from '../../../hooks/useContracts';

export function ContractForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    contractNumber: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    startDate: '',
    endDate: '',
    value: '',
    type: 'security',
    status: 'draft',
    guardCount: 1,
    notes: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' || name === 'guardCount' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    
    try {
      await onSubmit(formData)
    } catch (error) {
      if (error.message.includes('Validation failed')) {
        setErrors({ submit: error.message })
      } else {
        setErrors({ submit: error.message })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Building A Security"
            required
          />
        </div>

        {/* Contract Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Contract Number *</label>
          <input
            type="text"
            name="contractNumber"
            value={formData.contractNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., CTR-001"
            required
          />
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name *</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., ABC Corporation"
            required
          />
        </div>

        {/* Client Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Client Email</label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="contact@client.com"
          />
        </div>

        {/* Client Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Client Phone</label>
          <input
            type="tel"
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1-555-0100"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="security">Security</option>
            <option value="maintenance">Maintenance</option>
            <option value="consultation">Consultation</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate.split('T')[0] || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value + 'T00:00:00Z' }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">End Date *</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate.split('T')[0] || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value + 'T00:00:00Z' }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Value */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Contract Value ($) *</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="50000"
            min="0"
            required
          />
        </div>

        {/* Guard Count */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guards</label>
          <input
            type="number"
            name="guardCount"
            value={formData.guardCount}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Contract details and requirements"
          rows={4}
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Additional notes"
          rows={3}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {initialData ? '✓ Update Contract' : '+ Create Contract'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
