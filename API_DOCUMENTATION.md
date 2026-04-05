# Contract Guard API Documentation

## Authentication Service (Port 3001)

### POST /register
Register a new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

---

### POST /login
Login with email and password

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

---

### POST /refresh
Refresh JWT token (requires Authorization header)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### GET /me
Get current user profile (requires Authorization header)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "lastLogin": "2026-04-05T14:00:00.000Z"
  }
}
```

---

### GET /users
Get all users (admin only, requires Authorization header)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "users": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active"
    }
  ]
}
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Database Models

### User (MongoDB)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin, manager, guard, user),
  status: String (active, inactive, suspended),
  phone: String,
  avatar: String,
  lastLogin: Date,
  loginAttempts: Number,
  lockUntil: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide email and password"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid email or password"
}
```

### 403 Forbidden
```json
{
  "message": "Account is not active"
}
```

### 409 Conflict
```json
{
  "message": "User already exists"
}
```

### 500 Internal Server Error
```json
{
  "message": "Login failed",
  "error": "Error details"
}
```

---

## Next Steps

- [ ] Implement Contract Service endpoints
- [ ] Implement Guard Service endpoints
- [ ] Add request logging middleware
- [ ] Add rate limiting
- [ ] Add validation schemas (Joi/Zod)
- [ ] Add password reset endpoint
- [ ] Add 2FA (TOTP)
