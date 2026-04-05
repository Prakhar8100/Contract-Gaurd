import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'AIzaSyD4M_ZY0WFeK-rYPtQo41es-qEpDLrHQSM')
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export default authMiddleware
