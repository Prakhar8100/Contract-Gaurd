import 'dotenv/config.js'
import express from 'express'
import jwt from 'jsonwebtoken'
import connectDB from './config/db.js'
import User from './models/User.js'
import authMiddleware from './middleware/auth.js'

const app = express()
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRE = '7d'
const PORT = 3001

// Middleware
app.use(express.json())

// Connect to MongoDB
connectDB()

// ============= AUTH ROUTES =============

/**
 * GET /seed
 * Create initial test user (development only)
 */
app.get('/seed', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: 'admin@test.com' })
    if (existingUser) {
      return res.json({ message: 'Admin user already exists', user: existingUser.email })
    }

    const testUser = new User({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
      status: 'active',
    })

    await testUser.save()
    res.json({ message: 'Test user created successfully', email: 'admin@test.com', password: 'password123' })
  } catch (error) {
    console.error('Seed error:', error)
    res.status(500).json({ message: 'Seed failed', error: error.message })
  }
})

/**
 * POST /register
 * Register a new user
 */
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' })
    }

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      role: role || 'user',
    })

    await user.save()

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    )

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Registration failed', error: error.message })
  }
})

/**
 * POST /login
 * Login user and return JWT token
 */
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Check if account is active
    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Account is not active' })
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    )

    // Update last login
    user.lastLogin = new Date()
    user.loginAttempts = 0
    await user.save()

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: user.toJSON(),
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Login failed', error: error.message })
  }
})

/**
 * POST /refresh
 * Refresh JWT token
 */
app.post('/refresh', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    )

    res.json({
      success: true,
      token,
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    res.status(500).json({ message: 'Token refresh failed', error: error.message })
  }
})

/**
 * GET /me
 * Get current user profile
 */
app.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      success: true,
      user: user.toJSON(),
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Failed to fetch user', error: error.message })
  }
})

/**
 * GET /users
 * Get all users (admin only)
 */
app.get('/users', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can view all users' })
    }

    const users = await User.find().select('-password')
    res.json({
      success: true,
      count: users.length,
      users,
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ message: 'Failed to fetch users', error: error.message })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Auth Service is running' })
})

app.listen(PORT, () => {
  console.log(`🔐 Auth Service running on port ${PORT}`)
})
