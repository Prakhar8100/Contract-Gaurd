import 'dotenv/config.js'
import express from 'express'
import connectDB from './config/db.js'
import authMiddleware from './middleware/auth.js'
import Contract from './models/Contract.js'
import { createContractSchema, updateContractSchema, validate } from './validators/schemas.js'

const app = express()

app.use(express.json())
connectDB()

// ============= CONTRACT ROUTES =============

/**
 * GET /
 * Get all contracts
 */
app.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, type, search } = req.query
    let filter = {}

    if (status) filter.status = status
    if (type) filter.type = type
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { contractNumber: { $regex: search, $options: 'i' } },
        { clientName: { $regex: search, $options: 'i' } },
      ]
    }

    const contracts = await Contract.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: contracts.length,
      contracts,
    })
  } catch (error) {
    console.error('Get contracts error:', error)
    res.status(500).json({ message: 'Failed to fetch contracts', error: error.message })
  }
})

/**
 * POST /
 * Create new contract
 */
app.post('/', authMiddleware, validate(createContractSchema), async (req, res) => {
  try {
    const contract = new Contract({
      ...req.body,
      createdBy: req.user.id,
    })

    await contract.save()
    await contract.populate('createdBy', 'name email')

    res.status(201).json({
      success: true,
      message: 'Contract created successfully',
      contract,
    })
  } catch (error) {
    console.error('Create contract error:', error)
    res.status(500).json({ message: 'Failed to create contract', error: error.message })
  }
})

/**
 * GET /:id
 * Get single contract
 */
app.get('/:id', authMiddleware, async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('lastModifiedBy', 'name email')

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' })
    }

    res.json({
      success: true,
      contract,
    })
  } catch (error) {
    console.error('Get contract error:', error)
    res.status(500).json({ message: 'Failed to fetch contract', error: error.message })
  }
})

/**
 * PUT /:id
 * Update contract
 */
app.put('/:id', authMiddleware, validate(updateContractSchema), async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastModifiedBy: req.user.id },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email')

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' })
    }

    res.json({
      success: true,
      message: 'Contract updated successfully',
      contract,
    })
  } catch (error) {
    console.error('Update contract error:', error)
    res.status(500).json({ message: 'Failed to update contract', error: error.message })
  }
})

/**
 * DELETE /:id
 * Delete contract
 */
app.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id)

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' })
    }

    res.json({
      success: true,
      message: 'Contract deleted successfully',
    })
  } catch (error) {
    console.error('Delete contract error:', error)
    res.status(500).json({ message: 'Failed to delete contract', error: error.message })
  }
})

/**
 * PATCH /:id/status
 * Update contract status
 */
app.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body
    const validStatuses = ['draft', 'active', 'pending', 'completed', 'expired', 'cancelled']

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      { status, lastModifiedBy: req.user.id },
      { new: true }
    )

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' })
    }

    res.json({
      success: true,
      message: `Contract status updated to ${status}`,
      contract,
    })
  } catch (error) {
    console.error('Update status error:', error)
    res.status(500).json({ message: 'Failed to update status', error: error.message })
  }
})

/**
 * GET /stats/summary
 * Get contract statistics
 */
app.get('/stats/summary', authMiddleware, async (req, res) => {
  try {
    const total = await Contract.countDocuments()
    const active = await Contract.countDocuments({ status: 'active' })
    const completed = await Contract.countDocuments({ status: 'completed' })
    const value = await Contract.aggregate([
      { $group: { _id: null, total: { $sum: '$value' } } },
    ])

    res.json({
      success: true,
      stats: {
        total,
        active,
        completed,
        totalValue: value[0]?.total || 0,
      },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message })
  }
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`📋 Contract Service running on port ${PORT}`)
})
