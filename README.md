# Contract Guard - Full Stack MERN Application

A comprehensive **security and contract management system** built with **MongoDB, Express.js, React, Node.js (MERN)** and **Tailwind CSS** for stunning UI. Includes complete authentication, contract CRUD operations, guard scheduling, incident tracking, and real-time analytics.

## ✨ Features

- 🔐 **Complete Authentication System** - JWT-based auth with role-based access control (RBAC)
- 📋 **Contract Management** - Full CRUD operations with status tracking and document management
- 👮 **Guard Management** - Employee profiles, certifications, specializations
- 📅 **Work Scheduling** - Shift planning, contract assignments, duty tracking
- 📊 **Incident Tracking** - Report and manage security incidents
- 📈 **Real-time Analytics** - Dashboard with live metrics and compliance scoring
- ✅ **Form Validation** - Joi schema validation for all inputs
- 🎨 **Beautiful UI** - Responsive design with Tailwind CSS
- 🚀 **Production-Ready** - Proper error handling, logging, and security headers

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
│   │   │   │   ├── auth-ui/            # Login/Register UI
│   │   │   │   ├── contract-ui/        # Contract Management
│   │   │   │   ├── guard-mgmt-ui/      # Guard Management
│   │   │   │   └── dashboard-ui/       # Analytics Dashboard
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.jsx         # Auth state management
│   │   │   │   ├── useContracts.jsx    # Contract CRUD hooks
│   │   │   │   └── useGuards.jsx       # Guard CRUD hooks
│   │   │   ├── components/             # Reusable components
│   │   │   └── App.jsx
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── tailwind.config.js
│   │
│   ├── api-gateway/                    # Express Gateway (Port 3000)
│   │   ├── src/
│   │   │   └── index.js               # Route proxying
│   │   ├── package.json
│   │   └── .env
│   │
│   └── services/                       # Microservices
│       ├── src/
│       │   ├── auth-service.js         # Auth endpoints (3001)
│       │   ├── contract-service.js     # Contract endpoints (3002)
│       │   ├── guard-service.js        # Guard endpoints (3003)
│       │   ├── models/
│       │   │   ├── User.js            # User schema
│       │   │   ├── Contract.js        # Contract schema
│       │   │   ├── Guard.js           # Guard schema
│       │   │   ├── Schedule.js        # Work schedule
│       │   │   └── Incident.js        # Incident reports
│       │   ├── middleware/
│       │   │   └── auth.js            # JWT verification
│       │   ├── config/
│       │   │   └── db.js              # MongoDB setup
│       │   └── validators/
│       │       └── schemas.js         # Joi validation schemas
│       ├── package.json
│       └── .env
│
├── API_DOCUMENTATION_COMPLETE.md      # Complete API reference
├── package.json                        # Root package (npm workspaces)
└── README.md
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

Create `.env` files in three locations:

**`packages/services/.env`:**
```env
MONGODB_URI=mongodb://localhost:27017/contract-guard
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=3001
```

**`packages/api-gateway/.env`:**
```env
PORT=3000
AUTH_SERVICE_URL=http://localhost:3001
CONTRACT_SERVICE_URL=http://localhost:3002
GUARD_SERVICE_URL=http://localhost:3003
```

**`packages/client/.env`:**
```env
VITE_API_URL=http://localhost:3000/api
```

### Step 3: Start Services

**Option A: Run all services together**
```bash
# From root directory
npm run dev
```

This starts:
- 📱 Frontend: http://localhost:5173
- 🌐 API Gateway: http://localhost:3000
- 🔐 Auth Service: http://localhost:3001
- 📋 Contract Service: http://localhost:3002
- 👮 Guard Service: http://localhost:3003

**Option B: Run services individually**
```bash
# Terminal 1 - Frontend
cd packages/client
npm run dev

# Terminal 2 - API Gateway
cd packages/api-gateway
npm run dev

# Terminal 3 - All microservices
cd packages/services
npm run dev
```

### Step 4: Login to Application

Open http://localhost:5173 and use demo credentials:
```
Email: admin@contractguard.com
Password: password123
```

> **Note:** First time will create the user in MongoDB

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

## 🚨 Error Handling

All API responses include consistent error format:

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

## 📊 Dashboard Metrics

The dashboard displays real-time metrics:
- ✅ Active contracts count
- 💰 Total contract value
- 👥 Active guards count
- 📈 Compliance score (0-100%)
- 📋 Recent contracts list
- 👮 Recent guards list

Metrics auto-refresh when underlying data changes.

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
