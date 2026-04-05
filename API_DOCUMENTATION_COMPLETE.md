# Contract Guard API Documentation

Complete API reference for Contract Guard services including Auth, Contract, and Guard Management.

## Base URL
```
http://localhost:3000/api
```

## Authentication
All endpoints (except login/register) require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. AUTH SERVICE (`/api/auth`)

### Register User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Create a new user account
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```
- **Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate user and receive JWT token
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Current User
- **Endpoint:** `GET /api/auth/me`
- **Description:** Get authenticated user profile
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

### Refresh Token
- **Endpoint:** `POST /api/auth/refresh`
- **Description:** Get new JWT token using existing token
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### List All Users
- **Endpoint:** `GET /api/auth/users`
- **Description:** Get list of all users (admin only)
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `role`: Filter by role (admin, manager, guard, user)
  - `search`: Search by name or email
- **Response (200):**
```json
{
  "success": true,
  "count": 5,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  ]
}
```

---

## 2. CONTRACT SERVICE (`/api/contracts`)

### Get All Contracts
- **Endpoint:** `GET /api/contracts`
- **Description:** Retrieve all contracts with optional filtering
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `status`: Filter by status (draft, active, pending, completed, expired, cancelled)
  - `type`: Filter by type (security, maintenance, consultation, other)
  - `search`: Search by title, contract number, or client name
- **Response (200):**
```json
{
  "success": true,
  "count": 3,
  "contracts": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Building A Security",
      "contractNumber": "CTR-001",
      "clientName": "ABC Corporation",
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-12-31T00:00:00Z",
      "value": 50000,
      "status": "active",
      "type": "security",
      "guardCount": 5,
      "createdBy": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-01T10:00:00Z",
      "updatedAt": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### Create Contract
- **Endpoint:** `POST /api/contracts`
- **Description:** Create a new contract
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Body:**
```json
{
  "title": "Building A Security",
  "description": "24/7 security for building A",
  "contractNumber": "CTR-001",
  "clientName": "ABC Corporation",
  "clientEmail": "contact@abc.com",
  "clientPhone": "+1-555-0101",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-12-31T00:00:00Z",
  "value": 50000,
  "type": "security",
  "status": "draft",
  "guardCount": 5,
  "notes": "Special requirements for executive area"
}
```
- **Validation Rules:**
  - `title` (required): 3-100 characters
  - `contractNumber` (required): Must be unique
  - `clientName` (required): 2+ characters
  - `startDate`, `endDate` (required): ISO 8601 date format
  - `endDate` must be after `startDate`
  - `value` (required): Must be positive number
- **Response (201):**
```json
{
  "success": true,
  "message": "Contract created successfully",
  "contract": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Building A Security",
    ...
  }
}
```

### Get Single Contract
- **Endpoint:** `GET /api/contracts/:id`
- **Description:** Retrieve a specific contract by ID
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: Contract MongoDB ID
- **Response (200):**
```json
{
  "success": true,
  "contract": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Building A Security",
    ...
  }
}
```

### Update Contract
- **Endpoint:** `PUT /api/contracts/:id`
- **Description:** Update contract details
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Parameters:**
  - `id`: Contract MongoDB ID
- **Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "value": 55000,
  "status": "active"
}
```
- **Response (200):**
```json
{
  "success": true,
  "message": "Contract updated successfully",
  "contract": { ... }
}
```

### Delete Contract
- **Endpoint:** `DELETE /api/contracts/:id`
- **Description:** Delete a contract
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: Contract MongoDB ID
- **Response (200):**
```json
{
  "success": true,
  "message": "Contract deleted successfully"
}
```

### Update Contract Status
- **Endpoint:** `PATCH /api/contracts/:id/status`
- **Description:** Change contract status
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Parameters:**
  - `id`: Contract MongoDB ID
- **Body:**
```json
{
  "status": "active"
}
```
- **Valid Statuses:** draft, active, pending, completed, expired, cancelled
- **Response (200):**
```json
{
  "success": true,
  "message": "Contract status updated to active",
  "contract": { ... }
}
```

### Get Contract Statistics
- **Endpoint:** `GET /api/contracts/stats/summary`
- **Description:** Get contract overview statistics
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**
```json
{
  "success": true,
  "stats": {
    "total": 10,
    "active": 6,
    "completed": 3,
    "totalValue": 500000
  }
}
```

---

## 3. GUARD SERVICE (`/api/guards`)

### Get All Guards
- **Endpoint:** `GET /api/guards`
- **Description:** Retrieve all guards with optional filtering
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `status`: Filter by status (active, on-leave, suspended, terminated)
  - `position`: Filter by position (security-guard, supervisor, manager)
  - `search`: Search by name, email, or employee ID
- **Response (200):**
```json
{
  "success": true,
  "count": 2,
  "guards": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Mike Johnson",
      "email": "mike@example.com",
      "phone": "+1-555-0102",
      "employeeId": "EMP-001",
      "position": "security-guard",
      "status": "active",
      "joinDate": "2023-06-01T00:00:00Z",
      "specialization": ["patrol", "cctv"],
      "createdAt": "2023-06-01T10:00:00Z",
      "updatedAt": "2023-06-01T10:00:00Z"
    }
  ]
}
```

### Create Guard
- **Endpoint:** `POST /api/guards`
- **Description:** Create a new guard record
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Mike Johnson",
  "email": "mike@example.com",
  "phone": "+1-555-0102",
  "employeeId": "EMP-001",
  "position": "security-guard",
  "status": "active",
  "joinDate": "2023-06-01T00:00:00Z",
  "specialization": ["patrol", "cctv"]
}
```
- **Validation Rules:**
  - `name` (required): 2-50 characters
  - `email` (required): Valid email format, must be unique
  - `phone` (required): Valid phone format
  - `employeeId` (required): Alphanumeric, must be unique
  - `joinDate` (required): ISO 8601 date format
  - `position`: security-guard, supervisor, or manager
  - `status`: active, on-leave, suspended, or terminated
- **Response (201):**
```json
{
  "success": true,
  "message": "Guard created successfully",
  "guard": { ... }
}
```

### Get Single Guard
- **Endpoint:** `GET /api/guards/:id`
- **Description:** Retrieve a specific guard by ID
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: Guard MongoDB ID
- **Response (200):**
```json
{
  "success": true,
  "guard": { ... }
}
```

### Update Guard
- **Endpoint:** `PUT /api/guards/:id`
- **Description:** Update guard profile
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Parameters:**
  - `id`: Guard MongoDB ID
- **Body:** (all fields optional)
```json
{
  "position": "supervisor",
  "status": "on-leave",
  "specialization": ["patrol", "cctv", "access-control"]
}
```
- **Response (200):**
```json
{
  "success": true,
  "message": "Guard updated successfully",
  "guard": { ... }
}
```

### Delete Guard
- **Endpoint:** `DELETE /api/guards/:id`
- **Description:** Remove a guard from system
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: Guard MongoDB ID
- **Response (200):**
```json
{
  "success": true,
  "message": "Guard deleted successfully"
}
```

---

## 4. GUARD SCHEDULES (`/api/guards/:id/schedules`)

### Create Guard Schedule
- **Endpoint:** `POST /api/guards/:id/schedules`
- **Description:** Create a work schedule for a guard
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Parameters:**
  - `id`: Guard MongoDB ID
- **Body:**
```json
{
  "contractId": "507f1f77bcf86cd799439012",
  "startDate": "2024-01-15T00:00:00Z",
  "endDate": "2024-01-20T00:00:00Z",
  "startTime": "08:00",
  "endTime": "16:00",
  "location": "Building A, Main Entrance",
  "type": "fixed-post",
  "notes": "Day shift only"
}
```
- **Validation Rules:**
  - `guardId` (required): Valid guard ID
  - `startDate`, `endDate` (required): ISO 8601 format
  - `endDate` must be after `startDate`
  - `startTime`, `endTime`: HH:MM format
  - `type`: patrol, fixed-post, or mobile-patrol
- **Response (201):**
```json
{
  "success": true,
  "message": "Schedule created successfully",
  "schedule": {
    "_id": "507f1f77bcf86cd799439014",
    "guardId": "507f1f77bcf86cd799439013",
    "contractId": "507f1f77bcf86cd799439012",
    "startDate": "2024-01-15T00:00:00Z",
    "endDate": "2024-01-20T00:00:00Z",
    "startTime": "08:00",
    "endTime": "16:00",
    "location": "Building A, Main Entrance",
    "type": "fixed-post",
    "status": "scheduled",
    "notes": "Day shift only"
  }
}
```

### Get Guard Schedules
- **Endpoint:** `GET /api/guards/:id/schedules`
- **Description:** Retrieve all schedules for a guard
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: Guard MongoDB ID
- **Response (200):**
```json
{
  "success": true,
  "count": 3,
  "schedules": [ ... ]
}
```

---

## 5. GUARD INCIDENTS (`/api/guards/:id/incidents`)

### Report Incident
- **Endpoint:** `POST /api/guards/:id/incidents`
- **Description:** Report a security incident
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Parameters:**
  - `id`: Guard MongoDB ID
- **Body:**
```json
{
  "title": "Unauthorized Access Attempt",
  "description": "Someone tried to access the server room without credentials",
  "incidentDate": "2024-01-15T14:30:00Z",
  "location": "Building A, Server Room",
  "severity": "high",
  "category": "security-breach",
  "contractId": "507f1f77bcf86cd799439012"
}
```
- **Validation Rules:**
  - `title` (required): 3-100 characters
  - `description` (required): 1-1000 characters
  - `incidentDate` (required): ISO 8601 format
  - `severity`: low, medium, high, or critical
  - `guardId` (required): Valid guard ID
- **Response (201):**
```json
{
  "success": true,
  "message": "Incident reported successfully",
  "incident": {
    "_id": "507f1f77bcf86cd799439015",
    "guardId": "507f1f77bcf86cd799439013",
    "title": "Unauthorized Access Attempt",
    "severity": "high",
    "status": "reported",
    ...
  }
}
```

### Get Guard Incidents
- **Endpoint:** `GET /api/guards/:id/incidents`
- **Description:** Retrieve all incidents for a guard
- **Headers:** `Authorization: Bearer <token>`
- **Parameters:**
  - `id`: Guard MongoDB ID
- **Response (200):**
```json
{
  "success": true,
  "count": 2,
  "incidents": [ ... ]
}
```

---

## 6. GUARD STATISTICS (`/api/guards/stats/summary`)

### Get Guard Statistics
- **Endpoint:** `GET /api/guards/stats/summary`
- **Description:** Get overall guard management statistics
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**
```json
{
  "success": true,
  "stats": {
    "total": 15,
    "active": 12,
    "scheduled": 8,
    "incidents": 3
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "\"email\" must be a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid or missing authentication token"
}
```

### 403 Forbidden
```json
{
  "message": "You do not have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "message": "Contract not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Failed to fetch contracts",
  "error": "Error message details"
}
```

---

## cURL Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "admin"
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

### Create Contract
```bash
curl -X POST http://localhost:3000/api/contracts \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Building A Security",
    "contractNumber": "CTR-001",
    "clientName": "ABC Corporation",
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T00:00:00Z",
    "value": 50000,
    "type": "security"
  }'
```

### Get All Contracts
```bash
curl -X GET "http://localhost:3000/api/contracts?status=active" \
  -H "Authorization: Bearer <your_token>"
```

### Create Guard
```bash
curl -X POST http://localhost:3000/api/guards \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mike Johnson",
    "email": "mike@example.com",
    "phone": "+1-555-0102",
    "employeeId": "EMP-001",
    "position": "security-guard",
    "joinDate": "2023-06-01T00:00:00Z"
  }'
```

### Create Guard Schedule
```bash
curl -X POST http://localhost:3000/api/guards/507f1f77bcf86cd799439013/schedules \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "startDate": "2024-01-15T00:00:00Z",
    "endDate": "2024-01-20T00:00:00Z",
    "startTime": "08:00",
    "endTime": "16:00",
    "location": "Building A",
    "type": "fixed-post"
  }'
```

### Report Incident
```bash
curl -X POST http://localhost:3000/api/guards/507f1f77bcf86cd799439013/incidents \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Unauthorized Access Attempt",
    "description": "Someone tried to access the server room",
    "incidentDate": "2024-01-15T14:30:00Z",
    "severity": "high",
    "category": "security-breach"
  }'
```

---

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting
Currently no rate limiting implemented. Production deployment should implement request throttling per IP/user.

## Pagination
List endpoints should support pagination. Add query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

## Sorting
List endpoints should support sorting:
- `sortBy`: Field to sort by
- `sortOrder`: asc or desc

---

**Last Updated:** April 2024
**API Version:** 1.0.0
