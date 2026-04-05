import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

// Service URLs
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001'
const CONTRACT_SERVICE_URL = process.env.CONTRACT_SERVICE_URL || 'http://localhost:3002'
const GUARD_SERVICE_URL = process.env.GUARD_SERVICE_URL || 'http://localhost:3003'

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway is running' })
})

// Proxy auth routes
app.use('/api/auth', async (req, res) => {
  try {
    const url = `${AUTH_SERVICE_URL}${req.path}`
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    })
    
    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    console.error('Auth Service error:', error)
    res.status(500).json({ message: 'Auth service error', error: error.message })
  }
})

// Proxy contract routes
app.use('/api/contracts', async (req, res) => {
  try {
    const url = `${CONTRACT_SERVICE_URL}${req.path}`
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    })
    
    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    console.error('Contract Service error:', error)
    res.status(500).json({ message: 'Contract service error', error: error.message })
  }
})

// Proxy guard routes
app.use('/api/guards', async (req, res) => {
  try {
    const url = `${GUARD_SERVICE_URL}${req.path}`
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    })
    
    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    console.error('Guard Service error:', error)
    res.status(500).json({ message: 'Guard service error', error: error.message })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`)
})
