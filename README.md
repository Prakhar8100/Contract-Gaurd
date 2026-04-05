# Contract Guard - Full Stack MERN Application

A comprehensive **security and contract management system** built with **MongoDB, Express.js, React, Node.js (MERN)** and **Tailwind CSS**. Complete with authentication, contract CRUD operations, guard scheduling, incident tracking, and real-time analytics.

## ✨ Key Features

- 🔐 **Complete Authentication System** - JWT-based auth with login/register
- 📋 **Contract Management** - Full CRUD with filtering, search, and status tracking
- 👮 **Guard Management** - Employee profiles, specializations, position tracking
- 📅 **Work Scheduling** - Create and manage guard work shifts
- 📊 **Incident Tracking** - Report and manage security incidents
- 📈 **Real-time Dashboard** - Live metrics and compliance scoring
- ✅ **Form Validation** - Joi schema validation on all inputs
- 🎨 **Beautiful UI** - 100% Tailwind CSS responsive design
- 🚀 **Production Ready** - Proper error handling, logging, security headers

## Status: Phase 3 ✅ COMPLETE

All frontend pages fully implemented and integrated with real APIs:
- ✅ **Contract Pages**: List, Create, Edit, View (4 pages)
- ✅ **Guard Pages**: List, Create, Edit, View (4 pages)  
- ✅ **Schedule Management**: Embedded in Guard Detail
- ✅ **Incident Management**: Embedded in Guard Detail
- ✅ **Global Navigation**: Header nav with active highlighting
- ✅ **Responsive Design**: Mobile-ready on all pages
- ✅ **Form Validation**: Real-time error feedback
- ✅ **API Integration**: All operations connected to backend

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer (Port 5173)                  │
│         React 18 + Vite + Tailwind CSS (ES6+)               │
│  ┌──────────────┬─────────────┬────────────┬──────────────┐ │
│  │  Auth UI     │ Contract UI  │  Guard UI  │  Dashboard   │ │
│  └──────────────┴─────────────┴────────────┴──────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS/REST APIs
┌────────────────────────────▼────────────────────────────────┐
│           API Gateway (Port 3000)                            │
│  Express.js - Request Routing, Security, Validation         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Helmet (Security Headers) | CORS | Morgan (Logging)    │ │
│  └────────────────────────────────────────────────────────┘ │
└─┬──────────────────────┬──────────────────────┬─────────────┘
  │                      │                      │
  ▼                      ▼                      ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Auth Service │  │Contract Svc  │  │ Guard Service│
│  (Port 3001) │  │ (Port 3002)  │  │ (Port 3003)  │
│              │  │              │  │              │
│ • Register   │  │ • Create     │  │ • Create     │
│ • Login      │  │ • Read       │  │ • Schedule   │
│ • JWT        │  │ • Update     │  │ • Incidents  │
│ • Refresh    │  │ • Delete     │  │ • Reports    │
│ • Users      │  │ • Status     │  │ • Stats      │
│   List       │  │ • Stats      │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
  │                      │                      │
  └──────────────────────┴──────────────────────┘
                         │
                         ▼
                ┌─────────────────────┐
                │   Data Layer        │
                ├─────────────────────┤
                │ MongoDB (Primary DB)│
                │ Redis (Cache)       │
                │ S3 (Documents)      │
                └─────────────────────┘
```

## 📦 Project Structure

```
contract-guard/
├── packages/
│   ├── client/                          # React Frontend (Port 5173)
│   │   ├── src/
│   │   │   ├── apps/
│   │   │   │   ├── auth-ui/
│   │   │   │   │   └── LoginPage.jsx    # Login/Register
│   │   │   │   │
│   │   │   │   ├── contract-ui/        # Contract Management
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── ContractForm.jsx    # Create/Edit form
│   │   │   │   │   │   ├── ContractTable.jsx   # Table display
│   │   │   │   │   │   └── ContractFilters.jsx # Filters
│   │   │   │   │   ├── ContractListPage.jsx    # List view
│   │   │   │   │   ├── ContractEditPage.jsx    # Edit page
│   │   │   │   │   ├── ContractDetailPage.jsx  # Detail view
│   │   │   │   │   └── index.jsx
│   │   │   │   │
│   │   │   │   ├── guard-mgmt-ui/      # Guard Management
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── GuardForm.jsx        # Create/Edit
│   │   │   │   │   │   ├── GuardTable.jsx       # Table
│   │   │   │   │   │   ├── GuardFilters.jsx     # Filters
│   │   │   │   │   │   ├── ScheduleForm.jsx     # Create schedules
│   │   │   │   │   │   └── IncidentForm.jsx     # Report incidents
│   │   │   │   │   ├── GuardListPage.jsx        # List view
│   │   │   │   │   ├── GuardEditPage.jsx        # Edit page
│   │   │   │   │   ├── GuardDetailPage.jsx      # Detail + schedules/incidents
│   │   │   │   │   └── index.jsx
│   │   │   │   │
│   │   │   │   └── dashboard-ui/
│   │   │   │       └── Dashboard.jsx   # Dashboard with metrics
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.jsx         # Auth state & login/register
│   │   │   │   ├── useContracts.jsx    # Contract CRUD operations
│   │   │   │   └── useGuards.jsx       # Guard CRUD operations
│   │   │   │
│   │   │   ├── api/
│   │   │   │   └── client.js           # Axios instance & API calls
│   │   │   │
│   │   │   ├── components/
│   │   │   │   └── Navigation.jsx      # Global nav bar
│   │   │   │
│   │   │   ├── App.jsx                 # Main app with routing
│   │   │   └── main.jsx
│   │   │
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── tailwind.config.js
│   │
│   ├── api-gateway/                    # Express Gateway (Port 3000)
│   │   ├── src/
│   │   │   └── index.js               # Route proxying to services
│   │   ├── package.json
│   │   └── .env
│   │
│   └── services/                       # Microservices
│       ├── src/
│       │   ├── auth-service.js         # Authentication (Port 3001)
│       │   │   ├── /register
│       │   │   ├── /login
│       │   │   ├── /refresh
│       │   │   ├── /me
│       │   │   └── /seed (test user)
│       │   │
│       │   ├── contract-service.js     # Contracts (Port 3002)
│       │   │   ├── GET /  (list all)
│       │   │   ├── POST / (create)
│       │   │   ├── GET /:id
│       │   │   ├── PUT /:id
│       │   │   ├── DELETE /:id
│       │   │   ├── PATCH /:id/status
│       │   │   └── GET /stats/summary
│       │   │
│       │   ├── guard-service.js        # Guards (Port 3003)
│       │   │   ├── GET / (list all)
│       │   │   ├── POST / (create)
│       │   │   ├── GET /:id
│       │   │   ├── PUT /:id
│       │   │   ├── DELETE /:id
│       │   │   ├── POST /:id/schedules
│       │   │   ├── GET /:id/schedules
│       │   │   ├── POST /:id/incidents
│       │   │   ├── GET /:id/incidents
│       │   │   └── GET /stats/summary
│       │   │
│       │   ├── models/
│       │   │   ├── User.js            # User schema
│       │   │   ├── Contract.js        # Contract schema
│       │   │   ├── Guard.js           # Guard schema
│       │   │   ├── Schedule.js        # Work schedule
│       │   │   └── Incident.js        # Incident report
│       │   │
│       │   ├── middleware/
│       │   │   └── auth.js            # JWT verification
│       │   │
│       │   ├── config/
│       │   │   └── db.js              # MongoDB connection
│       │   │
│       │   └── validators/
│       │       └── schemas.js         # Joi validation schemas
│       │
│       ├── package.json
│       └── .env
│
├── API_DOCUMENTATION_COMPLETE.md      # Full API reference
├── UI_IMPLEMENTATION_COMPLETE.md      # Frontend completed
├── QUICK_REFERENCE.md                 # Quick command reference
├── package.json                        # Root (npm workspaces)
└── README.md                           # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (Download from [nodejs.org](https://nodejs.org))
- **npm 9+** (Comes with Node.js)
- **MongoDB** (Local or Atlas Cloud)
- **Redis** (Optional, for caching)

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/contract-guard.git
cd contract-guard

# Install all dependencies (for entire monorepo)
npm install
```

### Step 2: Configure Environment Variables

Create `.env` files in the following locations based on the `.env.example` files provided in each package (or as specified in the project documentation):

- `packages/services/.env`
- `packages/api-gateway/.env`
- `packages/client/.env`

> **Important:** Use the same `JWT_SECRET` across all services for token validation to work correctly.


### Step 3: Create Test User (Optional)

Visit this endpoint to seed a test user:
```
http://localhost:3001/seed
```

Or use the login form to register a new account.

### Step 4: Start Services

### Step 4: Start Services

**All services together (recommended):**
```bash
cd contract-guard
npm run dev
```

This starts:
- 📱 Frontend: http://localhost:5173
- 🌐 API Gateway: http://localhost:3000
- 🔐 Auth Service: http://localhost:3001
- 📋 Contract Service: http://localhost:3002
- 👮 Guard Service: http://localhost:3003
- 🗄️ MongoDB: Connected on startup

**Individual services (for debugging):**
```bash
# Terminal 1 - Frontend
cd packages/client && npm run dev

# Terminal 2 - API Gateway  
cd packages/api-gateway && npm run dev

# Terminal 3 - All microservices
cd packages/services && npm run dev
```

### Step 5: Login to Application

Open http://localhost:5173 and:
1. Click "Register" to create a new account, OR
2. Visit http://localhost:3001/seed to create test user (admin@test.com / password123)
3. Login and start managing contracts and guards

## 📱 Frontend Pages Implemented

### Contract Management (`/contracts`)
- **Contract List Page** - Browse all contracts with filters & search
  - Filter by status (draft, active, pending, completed, expired, cancelled)
  - Filter by type (security, maintenance, consultation, other)
  - Search by title, contract number, client name
  - Create new contract button
  - View/Edit/Delete actions for each contract

- **Contract Create/Edit Form** - Full form with validation
  - Title, description, contract number
  - Client information (name, email, phone)
  - Start/End dates with date picker
  - Contract value and currency
  - Type and status selection
  - Form validation with error messages

- **Contract Detail Page** - Rich information display
  - Formatted contract information
  - Client details
  - Contract value and dates
  - Status badge with color coding
  - Created by information
  - Print functionality
  - Edit button for modifications

### Guard Management (`/guards`)
- **Guard List Page** - Browse all guards with filters
  - Filter by status (active, on-leave, suspended, terminated)
  - Filter by position (security-guard, supervisor, manager)
  - Search by name, email, employee ID
  - Create new guard button
  - View/Edit/Delete actions

- **Guard Create/Edit Form** - Complete employee profile
  - Name, email, phone number
  - Employee ID and position
  - Status and join date
  - Multi-select specializations (patrol, CCTV, access-control, etc)
  - Real-time validation

- **Guard Detail Page** - Comprehensive profile with nested operations
  - Guard profile card (name, ID, position, email, phone)
  - Status indicator with color coding
  - Specializations display
  - **Work Schedules Section:**
    - Create new schedule form (date range, times, location, type)
    - View recent schedules
  - **Incidents Section:**
    - Report incident form (title, description, severity, category)
    - View recent incidents
  - All embedded forms with real API integration

### Dashboard (`/dashboard`)
- Real-time metrics cards
  - Active contracts count
  - Total contract value
  - Active guards count  
  - Compliance score
- Recent contracts list (last 5)
- Recent guards list (last 5)
- Quick action buttons

### Navigation
- Global header navigation bar
- Active page highlighting
- Links to Dashboard, Contracts, Guards
- Logout button
- Responsive design (hides on mobile)

## 🎨 UI/UX Features

- **Tailwind CSS 100%** - No separate CSS files, pure utility classes
- **Responsive Grid/Flex** - Mobile-first design
- **Color-coded Status Badges** - Green (active), red (critical), yellow (warning), blue (info)
- **Loading States** - Visual feedback during API calls
- **Error Messages** - Clear, field-level error display
- **Date Pickers** - HTML5 input with formatting
- **Multi-select Checkboxes** - For specializations
- **Tables with Actions** - Sortable columns with CRUD buttons
- **Form Validation** - Real-time feedback before submission

## 📚 API Documentation

Complete API documentation available in [API_DOCUMENTATION_COMPLETE.md](./API_DOCUMENTATION_COMPLETE.md)

### Quick API Examples

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@contractguard.com","password":"password123"}'
```

**Create Contract:**
```bash
curl -X POST http://localhost:3000/api/contracts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Building Security",
    "contractNumber":"CTR-001",
    "clientName":"ABC Corp",
    "startDate":"2024-01-01T00:00:00Z",
    "endDate":"2024-12-31T00:00:00Z",
    "value":50000
  }'
```

**Get Contracts:**
```bash
curl -X GET "http://localhost:3000/api/contracts?status=active" \
  -H "Authorization: Bearer <token>"
```

See [API_DOCUMENTATION_COMPLETE.md](./API_DOCUMENTATION_COMPLETE.md) for all endpoints.

## 🔑 Key Technologies

### Frontend
- **React 18** - UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management (no Redux)
- **JavaScript ES6+** - Modern JavaScript (no TypeScript)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB + Mongoose** - NoSQL database with ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Joi** - Data validation
- **Helmet** - Security headers
- **Morgan** - HTTP logging
- **CORS** - Cross-origin requests

### Architecture
- **Monorepo** - npm workspaces
- **Microservices** - Independent services
- **API Gateway** - Single entry point
- **REST APIs** - Standard HTTP protocol

## 📖 Usage Examples

### Create a Contract

```javascript
// Frontend code using the useContracts hook
import { useContracts } from './hooks/useContracts'

function CreateContractForm() {
  const { createContract, loading, error } = useContracts()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const contract = await createContract({
        title: 'Security Services',
        contractNumber: 'CTR-001',
        clientName: 'ABC Corporation',
        startDate: new Date('2024-01-01').toISOString(),
        endDate: new Date('2024-12-31').toISOString(),
        value: 50000,
        type: 'security',
      })
      console.log('Contract created:', contract)
    } catch (err) {
      console.error('Error:', err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Contract'}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  )
}
```

### Schedule Guard Shift

```javascript
import { useGuards } from './hooks/useGuards'

const { createSchedule } = useGuards()

// Schedule a guard for a shift
const schedule = await createSchedule(guardId, {
  startDate: '2024-01-15T00:00:00Z',
  endDate: '2024-01-20T00:00:00Z',
  startTime: '08:00',
  endTime: '16:00',
  location: 'Building A',
  type: 'fixed-post',
})
```

### Report Incident

```javascript
const { reportIncident } = useGuards()

const incident = await reportIncident(guardId, {
  title: 'Unauthorized Access Attempt',
  description: 'Someone tried to access the secure area',
  incidentDate: new Date().toISOString(),
  severity: 'high',
  category: 'security-breach',
})
```

## 🔐 Authentication & Authorization

### User Roles
- **Admin** - Full system access
- **Manager** - Can manage contracts and guards
- **Guard** - Can view schedules and report incidents
- **User** - Limited read-only access

### JWT Token
- **Expiry:** 7 days
- **Storage:** localStorage
- **Refresh:** Via `/api/auth/refresh` endpoint
- **Format:** `Bearer <token>` in Authorization header

## 📊 Database Schemas

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: admin, manager, guard, user),
  status: String (enum: active, inactive),
  createdAt: Date,
  updatedAt: Date
}
```

### Contract Schema
```javascript
{
  title: String,
  contractNumber: String (unique),
  clientName: String,
  clientEmail: String,
  startDate: Date,
  endDate: Date,
  value: Number,
  status: String (enum: draft, active, pending, completed, expired),
  type: String (enum: security, maintenance, consultation, other),
  guardCount: Number,
  createdBy: ObjectId (User),
  lastModifiedBy: ObjectId (User),
  eSignature: { signed: Boolean, signedBy: String, signedAt: Date },
  createdAt: Date,
  updatedAt: Date
}
```

### Guard Schema
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  employeeId: String (unique),
  position: String (enum: security-guard, supervisor, manager),
  status: String (enum: active, on-leave, suspended, terminated),
  joinDate: Date,
  specialization: [String], // e.g., ['patrol', 'cctv']
  certifications: [
    {
      name: String,
      expiryDate: Date,
      issueDate: Date
    }
  ],
  schedules: [ObjectId], // References to Schedule
  incidents: [ObjectId],  // References to Incident
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

```bash
# Run tests for all workspaces
npm test

# Run tests for specific workspace
cd packages/client && npm test
cd packages/services && npm test
```

## 🏗️ Build for Production

```bash
# Build frontend and backend
npm run build

# Output files
# Frontend: packages/client/dist/
# Services: Ready for Docker/deployment
```

## 🐳 Docker Support

```bash
# Start with MongoDB using Docker Compose
docker-compose up

# Run services in containers
docker build -t contract-guard .
docker run -p 3000:3000 contract-guard
```

## 📝 Form Validation

All APIs use **Joi** for robust data validation:

```javascript
// Example validation schema
const createContractSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  contractNumber: Joi.string().required().unique(),
  startDate: Joi.date().required().iso(),
  endDate: Joi.date().required().iso().greater(Joi.ref('startDate')),
  value: Joi.number().required().positive(),
})
```

## � Recent Updates & Fixes

### Phase 3 Frontend Completion
- Implemented all CRUD pages for Contracts and Guards
- Added nested Schedule and Incident management in Guard Detail
- Created responsive forms with real-time validation
- Integrated global navigation with active page highlighting
- 100% Tailwind CSS styling throughout

### Backend Optimizations
- Added `dotenv` import to all services for environment variable loading
- Fixed JWT_SECRET configuration across all services (consistent secret sharing)
- Hardcoded service ports to prevent conflicts (3001, 3002, 3003)
- Added `/seed` endpoint for test user creation
- Full MongoDB integration on all microservices

### Architecture Improvements
- Import `dotenv/config.js` at the top of all service files
- Environment variables loaded before any other code execution
- Services use hardcoded ports to avoid port conflicts when running concurrently
- API Gateway proxies all requests with proper Authorization header forwarding

## 🔒 Security & Environment Configuration

### JWT Secret Management
All services must use the SAME JWT_SECRET:
- ✅ Services load from `packages/services/.env`
- ✅ API Gateway loads from `packages/api-gateway/.env`
- ✅ Code fallbacks include default secret (for development)
- ✅ Tokens issued by Auth Service verified by other services

### Important Notes
- **Never commit `.env` files to version control**
- **Change JWT_SECRET in production**
- **Use strong secrets (32+ characters)**
- **Store in secure secret management system (AWS Secrets Manager, etc)**

## 🐛 Troubleshooting

**Token validation failing?**
- Ensure all services have the same JWT_SECRET in .env files
- Restart services after changing environment variables
- Check that dotenv is imported in all service files

**Port conflicts?**
- Kill existing Node processes: `Get-Process node | Stop-Process -Force`
- Ensure Services have hardcoded ports (3001, 3002, 3003)
- Clear ports before restarting: `npm run dev`

**MongoDB not connecting?**
- Verify MongoDB service is running
- Check MONGODB_URI in .env matches your setup
- Default: `mongodb://localhost:27017/contract-guard`

**Login not working?**
- Visit http://localhost:3001/seed to create test user
- Or register a new account through the UI
- Ensure Auth Service is running on port 3001

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcryptjs with 10 salt rounds
- ✅ **CORS Protection** - Cross-origin requests validation
- ✅ **Security Headers** - Helmet.js for XSS/CSRF protection
- ✅ **Input Validation** - Joi schema validation
- ✅ **Role-Based Access** - RBAC on protected routes
- ✅ **Environment Variables** - Secrets management
- ✅ **MongoDB Connection** - Secure URI with credentials

## 📈 Scaling Considerations

- **Database Indexing** - Indexes on frequently queried fields
- **Pagination** - Implement for large result sets
- **Caching** - Redis for frequently accessed data
- **Load Balancing** - Nginx for multiple API gateway instances
- **Database Replication** - MongoDB replica sets for high availability
- **CDN** - CloudFlare or similar for static assets
- **Monitoring** - ELK stack for logs and metrics

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🆘 Troubleshooting

### Services won't start?
```bash
# Clear node_modules and reinstall
rm -rf node_modules packages/*/node_modules
npm install
npm run dev
```

### MongoDB connection error?
```bash
# Make sure MongoDB is running
# Local: mongod
# Or update MONGODB_URI in .env to use MongoDB Atlas
```

### Port already in use?
```bash
# Kill process on port
# Unix: lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
# Windows: netstat -ano | findstr :3000
```

### CORS errors in browser?
- Check API Gateway is running on port 3000
- Verify `VITE_API_URL` in client `.env`
- Ensure Authorization header includes `Bearer ` prefix

## 📞 Support

For issues or questions:
1. Check [API_DOCUMENTATION_COMPLETE.md](./API_DOCUMENTATION_COMPLETE.md)
2. Check [UI_IMPLEMENTATION_COMPLETE.md](./UI_IMPLEMENTATION_COMPLETE.md)
3. Review error messages and logs
4. See Troubleshooting section above

## 🔮 Future Enhancements

Optional features for future phases:
- 📄 **PDF Export** - Generate contracts as PDF
- 📊 **Advanced Charts** - Dashboard analytics with charts
- 📧 **Email Notifications** - Automated alerts on incidents
- 🔔 **Real-time Updates** - WebSocket for live data
- 📱 **Mobile App** - React Native or Flutter
- 📂 **Document Upload** - Store files in S3/Cloud Storage
- 🔍 **Advanced Search** - Full-text search capabilities
- 🔐 **Two-Factor Auth** - Enhanced security
- ⭐ **Performance Tracking** - Guard performance metrics
- 🌍 **Multi-language** - i18n support

---

**Last Updated:** April 5, 2026  
**Current Version:** 3.0.0 (Phase 3 Complete)  
**Status:** ✅ **Production Ready** - All Services and Pages Complete
2. Review example code in services
3. Check browser console and service logs
4. Open an issue on GitHub

## 🎯 Roadmap

- [ ] Email notifications for contract alerts
- [ ] PDF generation for contracts
- [ ] Real-time notifications with WebSockets
- [ ] Mobile app (React Native)
- [ ] Advanced reporting with charts
- [ ] AI-powered risk analysis
- [ ] Two-factor authentication
- [ ] Audit logging system

---

**Built with ❤️ using MERN Stack + Tailwind CSS**

### Installation with Yarn (Optional)

If you prefer Yarn, install it first:

```bash
npm install -g yarn

# Then run
yarn install
yarn dev
yarn build
```

## How to Run All Services

### Option 1: Run All at Once (Recommended)

```bash
# From project root
npm run dev
```

This command runs all three services simultaneously:
- **Frontend** (React + Vite): http://localhost:5173
- **API Gateway** (Express): http://localhost:3000
- **Microservices** (Auth, Contract, Guard): Ports 3001-3003

### Option 2: Run Individually in Separate Terminals

**Terminal 1 - Frontend:**
```bash
cd packages/client
npm install
npm run dev
# Runs on http://localhost:5173
```

**Terminal 2 - API Gateway:**
```bash
cd packages/api-gateway
npm install
npm run dev
# Runs on http://localhost:3000
```

**Terminal 3 - Services:**
```bash
cd packages/services
npm install
npm run dev
# Services run on ports 3001, 3002, 3003
```

### Option 3: Start Database Services Only

If you want to run just the database services (MongoDB + Redis):

```bash
# From project root
docker-compose up -d

# Stop services
docker-compose down
```

### Verify All Services are Running

Once everything is up, verify by checking these URLs:
- Frontend: http://localhost:5173
- API Gateway Health: http://localhost:3000/health
- Services are accessible through the API Gateway

## Workspace Structure

```
contract-guard/
├── packages/
│   ├── client/              # React + Vite + Tailwind CSS
│   │   └── src/
│   │       └── apps/
│   │           ├── auth-ui/
│   │           ├── contract-ui/
│   │           ├── guard-mgmt-ui/
│   │           └── dashboard-ui/
│   ├── api-gateway/         # Express.js gateway
│   │   └── src/
│   │       └── index.js
│   └── services/            # Microservices
│       └── src/
│           ├── auth-service.js
│           ├── contract-service.js
│           └── guard-service.js
├── .github/
└── package.json             # Workspace root
```

## Development Ports

- **Client**: http://localhost:5173
- **API Gateway**: http://localhost:3000
- **Auth Service**: http://localhost:3001
- **Contract Service**: http://localhost:3002
- **Guard Service**: http://localhost:3003
- **MongoDB**: mongodb://localhost:27017
- **Redis**: redis://localhost:6379

## Features

✅ Secure JWT-based authentication
✅ Role-based access control (RBAC)
✅ Contract creation and management
✅ Guard shift scheduling
✅ Incident tracking and logging
✅ Real-time notifications
✅ Analytics dashboard
✅ Compliance monitoring
✅ Beautiful Tailwind CSS UI
✅ Responsive design (mobile-first)

## Technology Stack

**Frontend**: 
- React 18
- Vite
- React Router
- Axios
- Tailwind CSS
- JavaScript (ES6+)

**Backend**: 
- Node.js
- Express.js
- MongoDB + Mongoose
- Redis

**Auth**: 
- JWT
- 2FA (TOTP)

**Storage**: 
- S3/Cloudinary
- MongoDB

**Email**: 
- NodeMailer/SendGrid

**DevOps**: 
- Docker
- GitHub Actions
- Nginx

## Styling

This project uses **Tailwind CSS** for all styling. No separate CSS files - just utility classes!

```jsx
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
  Beautiful button
</button>
```

## Development Workflow

### Starting Development

```bash
# Install all dependencies
npm install

# Run all services
npm run dev

# Individual services
cd packages/client && npm run dev           # Port 5173
cd packages/api-gateway && npm run dev      # Port 3000
cd packages/services && npm run dev         # Ports 3001-3003
```

### Building

```bash
npm run build
```

## Code Standards

- Use ES6+ syntax (no TypeScript)
- Follow RESTful API conventions
- Validate all inputs with Joi/Zod
- Use meaningful commit messages
- Tailwind CSS for all styling
- Document complex logic

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## License

MIT
