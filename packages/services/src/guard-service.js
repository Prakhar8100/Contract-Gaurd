import 'dotenv/config.js'
import express from 'express'
import connectDB from './config/db.js'
import authMiddleware from './middleware/auth.js'
import Guard from './models/Guard.js'
import Schedule from './models/Schedule.js'
import Incident from './models/Incident.js'
import { createGuardSchema, updateGuardSchema, createScheduleSchema, createIncidentSchema, validate } from './validators/schemas.js'

const app = express()

app.use(express.json())
connectDB()

// ============= GUARD ROUTES =============

/**
 * GET /
 * Get all guards
 */
app.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, position, search } = req.query
    let filter = {}

    if (status) filter.status = status
    if (position) filter.position = position
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } },
      ]
    }

    const guards = await Guard.find(filter)
      .populate('schedules')
      .sort({ name: 1 })

    res.json({
      success: true,
      count: guards.length,
      guards,
    })
  } catch (error) {
    console.error('Get guards error:', error)
    res.status(500).json({ message: 'Failed to fetch guards', error: error.message })
  }
})

/**
 * POST /
 * Create new guard
 */
app.post('/', authMiddleware, validate(createGuardSchema), async (req, res) => {
  try {
    const guard = new Guard(req.body)
    await guard.save()

    res.status(201).json({
      success: true,
      message: 'Guard created successfully',
      guard,
    })
  } catch (error) {
    console.error('Create guard error:', error)
    res.status(500).json({ message: 'Failed to create guard', error: error.message })
  }
})

/**
 * GET /:id
 * Get single guard
 */
app.get('/:id', authMiddleware, async (req, res) => {
  try {
    const guard = await Guard.findById(req.params.id)
      .populate('schedules')
      .populate('incidents')

    if (!guard) {
      return res.status(404).json({ message: 'Guard not found' })
    }

    res.json({
      success: true,
      guard,
    })
  } catch (error) {
    console.error('Get guard error:', error)
    res.status(500).json({ message: 'Failed to fetch guard', error: error.message })
  }
})

/**
 * PUT /:id
 * Update guard
 */
app.put('/:id', authMiddleware, validate(updateGuardSchema), async (req, res) => {
  try {
    const guard = await Guard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!guard) {
      return res.status(404).json({ message: 'Guard not found' })
    }

    res.json({
      success: true,
      message: 'Guard updated successfully',
      guard,
    })
  } catch (error) {
    console.error('Update guard error:', error)
    res.status(500).json({ message: 'Failed to update guard', error: error.message })
  }
})

/**
 * DELETE /:id
 * Delete guard
 */
app.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const guard = await Guard.findByIdAndDelete(req.params.id)

    if (!guard) {
      return res.status(404).json({ message: 'Guard not found' })
    }

    res.json({
      success: true,
      message: 'Guard deleted successfully',
    })
  } catch (error) {
    console.error('Delete guard error:', error)
    res.status(500).json({ message: 'Failed to delete guard', error: error.message })
  }
})

// ============= SCHEDULE ROUTES =============

/**
 * POST /:id/schedules
 * Create schedule for guard
 */
app.post('/:id/schedules', authMiddleware, validate(createScheduleSchema), async (req, res) => {
  try {
    const guard = await Guard.findById(req.params.id)
    if (!guard) {
      return res.status(404).json({ message: 'Guard not found' })
    }

    const schedule = new Schedule({
      ...req.body,
      guardId: req.params.id,
    })

    await schedule.save()
    guard.schedules.push(schedule._id)
    await guard.save()

    res.status(201).json({
      success: true,
      message: 'Schedule created successfully',
      schedule,
    })
  } catch (error) {
    console.error('Create schedule error:', error)
    res.status(500).json({ message: 'Failed to create schedule', error: error.message })
  }
})

/**
 * GET /:id/schedules
 * Get guard schedules
 */
app.get('/:id/schedules', authMiddleware, async (req, res) => {
  try {
    const schedules = await Schedule.find({ guardId: req.params.id })
      .populate('contractId', 'title clientName')
      .sort({ startDate: -1 })

    res.json({
      success: true,
      count: schedules.length,
      schedules,
    })
  } catch (error) {
    console.error('Get schedules error:', error)
    res.status(500).json({ message: 'Failed to fetch schedules', error: error.message })
  }
})

// ============= INCIDENT ROUTES =============

/**
 * POST /:id/incidents
 * Report incident
 */
app.post('/:id/incidents', authMiddleware, validate(createIncidentSchema), async (req, res) => {
  try {
    const guard = await Guard.findById(req.params.id)
    if (!guard) {
      return res.status(404).json({ message: 'Guard not found' })
    }

    const incident = new Incident({
      ...req.body,
      guardId: req.params.id,
    })

    await incident.save()
    guard.incidents.push(incident._id)
    await guard.save()

    res.status(201).json({
      success: true,
      message: 'Incident reported successfully',
      incident,
    })
  } catch (error) {
    console.error('Create incident error:', error)
    res.status(500).json({ message: 'Failed to report incident', error: error.message })
  }
})

/**
 * GET /:id/incidents
 * Get guard incidents
 */
app.get('/:id/incidents', authMiddleware, async (req, res) => {
  try {
    const incidents = await Incident.find({ guardId: req.params.id })
      .populate('contractId', 'title')
      .sort({ incidentDate: -1 })

    res.json({
      success: true,
      count: incidents.length,
      incidents,
    })
  } catch (error) {
    console.error('Get incidents error:', error)
    res.status(500).json({ message: 'Failed to fetch incidents', error: error.message })
  }
})

/**
 * GET /stats/summary
 * Get guard statistics
 */
app.get('/stats/summary', authMiddleware, async (req, res) => {
  try {
    const total = await Guard.countDocuments()
    const active = await Guard.countDocuments({ status: 'active' })
    const scheduled = await Schedule.countDocuments({ status: 'scheduled' })
    const incidents = await Incident.countDocuments()

    res.json({
      success: true,
      stats: {
        total,
        active,
        scheduled,
        incidents,
      },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`👮 Guard Service running on port ${PORT}`)
})
