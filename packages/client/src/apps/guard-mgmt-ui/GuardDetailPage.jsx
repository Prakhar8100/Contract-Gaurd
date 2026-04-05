import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGuards } from '../../hooks/useGuards';
import { ScheduleForm } from './components/ScheduleForm'
import { IncidentForm } from './components/IncidentForm'

export default function GuardDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { guards, loading, createSchedule, reportIncident } = useGuards()
  const [guard, setGuard] = useState(null)
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [showIncidentForm, setShowIncidentForm] = useState(false)
  const [schedules, setSchedules] = useState([])
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    if (guards.length > 0) {
      const found = guards.find(g => g._id === id)
      if (found) {
        setGuard(found)
        setSchedules(found.schedules || [])
        setIncidents(found.incidents || [])
      }
    }
  }, [guards, id])

  const handleCreateSchedule = async (data) => {
    await createSchedule(id, data)
    setShowScheduleForm(false)
  }

  const handleReportIncident = async (data) => {
    await reportIncident(id, data)
    setShowIncidentForm(false)
  }

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (!guard) return <div className="text-center py-8 text-red-600">Guard not found</div>

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'on-leave': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-orange-100 text-orange-800'
      default: return 'bg-red-100 text-red-800'
    }
  }

  const joinDate = new Date(guard.joinDate).toLocaleDateString()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{guard.name}</h1>
            <p className="text-gray-500 mt-1">Employee ID: {guard.employeeId}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/guards')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              ← Back
            </button>
            <button
              onClick={() => navigate(`/guards/edit/${id}`)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Main Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Status</p>
                <span className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(guard.status)}`}>
                  {guard.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-semibold">Position</p>
                <p className="text-lg font-semibold text-gray-800 mt-1 capitalize">{guard.position.replace('-', ' ')}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-semibold">Join Date</p>
                <p className="text-gray-800 mt-1">{joinDate}</p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Email</p>
                <p className="text-gray-800 mt-1">📧 {guard.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-semibold">Phone</p>
                <p className="text-gray-800 mt-1">📱 {guard.phone}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {guard.specialization && guard.specialization.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    {guard.specialization.map(spec => (
                      <span key={spec} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Schedules Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Work Schedules</h2>
              <button
                onClick={() => setShowScheduleForm(!showScheduleForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold transition"
              >
                {showScheduleForm ? '✕' : '+ Schedule'}
              </button>
            </div>

            {showScheduleForm && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <ScheduleForm
                  guardId={id}
                  onSubmit={handleCreateSchedule}
                  onCancel={() => setShowScheduleForm(false)}
                />
              </div>
            )}

            {schedules.length > 0 ? (
              <div className="space-y-3">
                {schedules.slice(0, 5).map((schedule, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded border-l-4 border-blue-600">
                    <p className="font-semibold text-gray-800 capitalize">{schedule.type || 'Shift'}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {schedule.location || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(schedule.startDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No schedules yet</p>
            )}
          </div>

          {/* Incidents Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Incidents</h2>
              <button
                onClick={() => setShowIncidentForm(!showIncidentForm)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold transition"
              >
                {showIncidentForm ? '✕' : '+ Report'}
              </button>
            </div>

            {showIncidentForm && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <IncidentForm
                  guardId={id}
                  onSubmit={handleReportIncident}
                  onCancel={() => setShowIncidentForm(false)}
                />
              </div>
            )}

            {incidents.length > 0 ? (
              <div className="space-y-3">
                {incidents.slice(0, 5).map((incident, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded border-l-4 border-red-600">
                    <p className="font-semibold text-gray-800">{incident.title}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{incident.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        incident.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        incident.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {incident.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No incidents reported</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
