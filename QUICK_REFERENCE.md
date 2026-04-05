# Contract Guard - Quick Reference Guide

## 🎯 What Was Implemented

### ✅ Phase 2 Features (Just Completed)

#### 1. **Contract Service (Port 3002)**
Full CRUD operations with complete Joi validation:
- `GET /` - List contracts with filtering (status, type, search)
- `POST /` - Create contract with validation
- `GET /:id` - Get single contract details
- `PUT /:id` - Update contract (all fields optional)
- `DELETE /:id` - Delete contract
- `PATCH /:id/status` - Change contract status
- `GET /stats/summary` - Contract statistics (total, active, completed, value)

**Validation Rules:**
- Title: 3-100 chars, required
- Contract Number: Unique, required
- Client Name: 2+ chars, required
- Start/End Dates: ISO format, end > start
- Value: Positive number, required
- Type: security, maintenance, consultation, other
- Status: draft, active, pending, completed, expired, cancelled

#### 2. **Guard Service (Port 3003)**
Complete guard management with scheduling and incidents:

**Guard Management:**
- `GET /` - List guards with filtering
- `POST /` - Create guard
- `GET /:id` - Get guard details (populates schedules + incidents)
- `PUT /:id` - Update guard profile
- `DELETE /:id` - Delete guard
- `GET /stats/summary` - Guard statistics

**Scheduling:**
- `POST /:id/schedules` - Create work schedule
- `GET /:id/schedules` - Get guard's schedules
- Schedule types: patrol, fixed-post, mobile-patrol

**Incident Management:**
- `POST /:id/incidents` - Report incident
- `GET /:id/incidents` - Get guard's incidents
- Severity levels: low, medium, high, critical
- Auto-tracks dates and categorization

#### 3. **Form Validation with Joi**
Centralized validation in `/validators/schemas.js`:
- `createContractSchema` - Validates contract creation
- `updateContractSchema` - Validates contract updates (all fields optional)
- `createGuardSchema` - Validates guard creation
- `updateGuardSchema` - Validates guard updates
- `createScheduleSchema` - Validates schedule creation
- `createIncidentSchema` - Validates incident reporting
- `validate()` middleware - Automatic request validation

**Validation Features:**
- Required field enforcement
- Type checking (string, number, date, email, phone)
- Pattern matching (regex for phone/time)
- Unique constraint support
- Date range validation (endDate > startDate)
- Enum validation for status/type fields
- Detailed error messages with field names

#### 4. **Dashboard Real Data Integration**
Updated Dashboard to fetch and display real metrics:
- **Active Contracts** - Fetches from `/contracts/stats`
- **Total Contract Value** - Aggregated from all contracts
- **Active Guards** - Fetches from `/guards/stats`
- **Compliance Score** - Calculated as average of active/total ratios
- **Recent Contracts List** - Last 5 contracts with status badges
- **Recent Guards List** - Last 5 guards with status indicators
- **Loading States** - Shows loading text while fetching
- **Auto-refresh** - Calculates compliance when data changes

#### 5. **Frontend Hooks for Data Management**

**`useContracts()` Hook:**
```javascript
const {
  contracts,          // Array of contracts
  loading,            // Loading state
  error,              // Error message
  stats,              // { total, active, completed, totalValue }
  fetchContracts(),   // Fetch with optional filters
  fetchStats(),       // Fetch statistics
  createContract(),   // Create new contract
  updateContract(),   // Update existing contract
  deleteContract(),   // Delete contract
} = useContracts()
```

**`useGuards()` Hook:**
```javascript
const {
  guards,             // Array of guards
  loading,            // Loading state
  error,              // Error message
  stats,              // { total, active, scheduled, incidents }
  fetchGuards(),      // Fetch with optional filters
  fetchStats(),       // Fetch statistics
  createGuard(),      // Create new guard
  updateGuard(),      // Update guard profile
  deleteGuard(),      // Delete guard
  createSchedule(),   // Create work schedule
  reportIncident(),   // Report security incident
} = useGuards()
```

### 📊 Database Models

**Contract Model:**
- Fields: title, description, contractNumber, clientName/Email/Phone
- Dates: startDate, endDate (with timestamps)
- Financial: value (number)
- Status tracking: status (enum), type (enum)
- Relationships: createdBy, lastModifiedBy (User refs)
- E-Signature: signed, signedBy, signedAt
- Documents array: name, url, uploadedAt

**Guard Model:**
- Personal: name, email (unique), phone, employeeId (unique)
- Employment: position (enum), status (enum), joinDate
- Skills: specialization array (e.g., ['patrol', 'cctv'])
- Certifications: array with name, expiryDate, issueDate
- Relationships: schedules array, incidents array, contractAssignments array
- Emergency: contactPerson (name, relationship, phone)
- Documents: ID, certificates, photos

**Schedule Model:**
- Assignment: guardId, contractId, 
- Time: startDate, endDate, startTime (HH:MM), endTime (HH:MM)
- Details: location, type (patrol/fixed-post/mobile-patrol)
- Status: scheduled, in-progress, completed, cancelled
- Notes: Additional instructions

**Incident Model:**
- Reporter: guardId, contractId
- Details: title, description, incidentDate, location
- Classification: severity (low/medium/high/critical), category
- Status: reported, investigating, resolved, closed
- Attachments: array of URLs for evidence/photos

### 🔗 API Gateway Routes
All microservices accessible through central gateway (port 3000):
- `/api/auth/*` → Auth Service (3001)
- `/api/contracts/*` → Contract Service (3002)
- `/api/guards/*` → Guard Service (3003)

**Gateway Features:**
- Request proxying with proper headers
- Authorization header passthrough
- Health check endpoint: `/health`
- Security: Helmet, CORS, Morgan logging

## 🚀 Running the System

### Start Everything at Once
```bash
cd "c:\Users\HP\OneDrive\Desktop\Contract Gaurd"
npm run dev
```

Starts in parallel:
- Frontend: http://localhost:5173
- API Gateway: http://localhost:3000
- Auth Service: http://localhost:3001
- Contract Service: http://localhost:3002
- Guard Service: http://localhost:3003

### Start Services Individually
```bash
# Terminal 1: Frontend
cd packages/client && npm run dev

# Terminal 2: API Gateway
cd packages/api-gateway && npm run dev

# Terminal 3: All microservices
cd packages/services && npm run dev
```

## 📖 API Usage Examples

### Create a Contract
```bash
curl -X POST http://localhost:3000/api/contracts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Building Security",
    "contractNumber": "CTR-001",
    "clientName": "ABC Corp",
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T00:00:00Z",
    "value": 50000,
    "type": "security"
  }'
```

### Get Filtered Contracts
```bash
# Get active security contracts
curl "http://localhost:3000/api/contracts?status=active&type=security" \
  -H "Authorization: Bearer <token>"

# Search contracts
curl "http://localhost:3000/api/contracts?search=ABC" \
  -H "Authorization: Bearer <token>"
```

### Create Guard
```bash
curl -X POST http://localhost:3000/api/guards \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+1-555-0100",
    "employeeId": "EMP-001",
    "position": "security-guard",
    "joinDate": "2024-01-01T00:00:00Z"
  }'
```

### Schedule Guard
```bash
curl -X POST http://localhost:3000/api/guards/{guardId}/schedules \
  -H "Authorization: Bearer <token>" \
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
curl -X POST http://localhost:3000/api/guards/{guardId}/incidents \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Unauthorized Access",
    "description": "Someone tried to access secure area",
    "incidentDate": "2024-01-15T14:30:00Z",
    "severity": "high",
    "category": "security-breach"
  }'
```

### Get Statistics
```bash
# Contract stats
curl http://localhost:3000/api/contracts/stats/summary \
  -H "Authorization: Bearer <token>"

# Guard stats
curl http://localhost:3000/api/guards/stats/summary \
  -H "Authorization: Bearer <token>"
```

## 🔐 Authentication

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@contractguard.com",
    "password": "password123"
  }'
```

**Response includes token:**
```json
{
  "success": true,
  "user": {...},
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Using Token
All authenticated endpoints require:
```
Headers: Authorization: Bearer <token>
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Authorization: Bearer <old_token>"
```

## 📚 Complete Documentation

Full API reference available in: [API_DOCUMENTATION_COMPLETE.md](../API_DOCUMENTATION_COMPLETE.md)

## 🧪 Testing Your API

### Using cURL
See examples above

### Using Postman
1. Create new project
2. Import API endpoints
3. Add Authorization header with Bearer token
4. Test CRUD operations

### Using Browser DevTools
1. Open http://localhost:5173
2. Login with demo credentials
3. Open Network tab
4. Interact with UI to see API calls
5. Check request/response payloads

## ⚙️ Configuration

### .env Files Location

**packages/services/.env:**
```env
MONGODB_URI=mongodb://localhost:27017/contract-guard
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
PORT=3001
```

**packages/api-gateway/.env:**
```env
PORT=3000
AUTH_SERVICE_URL=http://localhost:3001
CONTRACT_SERVICE_URL=http://localhost:3002
GUARD_SERVICE_URL=http://localhost:3003
```

**packages/client/.env:**
```env
VITE_API_URL=http://localhost:3000/api
```

## 🎨 Frontend Styling

All UI uses **Tailwind CSS** (no separate CSS files):
- Color palette: blue, green, purple, yellow, red, gray
- Responsive: grid, flex with breakpoints (md:, lg:)
- Spacing: p-, m-, gap- utilities
- Borders: border-l-4 colored left borders
- Shadows: shadow, shadow-lg on cards
- Transitions: smooth hover effects

## 📋 File Organization

```
packages/
├── client/
│   └── src/apps/
│       ├── auth-ui/LoginPage.jsx          ← Login/Register
│       ├── contract-ui/                   ← Contract pages (TODO)
│       ├── guard-mgmt-ui/                 ← Guard pages (TODO)
│       └── dashboard-ui/Dashboard.jsx     ← Real data dashboard ✅
├── api-gateway/src/index.js               ← Route proxying ✅
└── services/src/
    ├── auth-service.js                    ← Auth endpoints ✅
    ├── contract-service.js                ← Contract CRUD ✅
    ├── guard-service.js                   ← Guard + Schedule + Incident ✅
    ├── models/
    │   ├── User.js                        ← User schema ✅
    │   ├── Contract.js                    ← Contract schema ✅
    │   ├── Guard.js                       ← Guard schema ✅
    │   ├── Schedule.js                    ← Schedule schema ✅
    │   └── Incident.js                    ← Incident schema ✅
    ├── validators/schemas.js              ← Joi validation ✅
    ├── middleware/auth.js                 ← JWT middleware ✅
    └── config/db.js                       ← MongoDB setup ✅

client/src/hooks/
├── useAuth.jsx                            ← Auth state ✅
├── useContracts.jsx                       ← Contract hooks ✅
└── useGuards.jsx                          ← Guard hooks ✅
```

## ✨ Next Steps

1. **Build Contract UI Pages** - List, create, edit, view contracts
2. **Build Guard UI Pages** - List, create, edit, assign schedules
3. **Add More Dashboard Features** - Charts, trends, notifications
4. **Testing** - Unit tests for services and components
5. **Deployment** - Docker, CI/CD, production hosting

## 📞 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Services won't start | Check MongoDB is running: `mongod` |
| Port already in use | Kill process: `lsof -i :3000` / Windows: `netstat` |
| CORS errors | Verify VITE_API_URL in .env matches API Gateway |
| Token expired | Call `/api/auth/refresh` endpoint |
| Validation errors | Check error response for field-specific issues |
| Module not found | Run `npm install` in root directory |

---

**Status:** Phase 2 Complete ✅ - Ready for Phase 3 (UI Pages)

Generated: April 2024
