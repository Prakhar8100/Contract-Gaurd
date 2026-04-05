import React, { useState } from 'react'

export function GuardForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    position: 'security-guard',
    status: 'active',
    joinDate: '',
    specialization: [],
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleSpecialization = (spec) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...prev.specialization, spec]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    try {
      await onSubmit(formData)
    } catch (error) {
      setErrors({ submit: error.message })
    }
  }

  const specializations = ['patrol', 'cctv', 'access-control', 'investigation', 'vip-protection']

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., John Smith"
            required
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID *</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., EMP-001"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1-555-0100"
            required
          />
        </div>

        {/* Join Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Join Date *</label>
          <input
            type="date"
            name="joinDate"
            value={formData.joinDate.split('T')[0] || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, joinDate: e.target.value + 'T00:00:00Z' }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="security-guard">Security Guard</option>
            <option value="supervisor">Supervisor</option>
            <option value="manager">Manager</option>
          </select>
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
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="suspended">Suspended</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
      </div>

      {/* Specializations */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Specializations</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {specializations.map(spec => (
            <label key={spec} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.specialization.includes(spec)}
                onChange={() => toggleSpecialization(spec)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm text-gray-700 capitalize">{spec}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {initialData ? '✓ Update Guard' : '+ Create Guard'}
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
