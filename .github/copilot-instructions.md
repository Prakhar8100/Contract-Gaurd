# Copilot Instructions for Contract Guard

This file provides workspace-specific guidance for developing the Contract Guard application.

## Project Overview

Contract Guard is a full-stack MERN application with:
- React + Vite frontend with Tailwind CSS (no TypeScript)
- Express.js API gateway
- Three microservices (Auth, Contract, Guard)
- MongoDB + Redis data layer
- Docker + GitHub Actions CI/CD

## Workspace Structure

The project is organized as a monorepo using Yarn workspaces:

- `packages/client/` - React + Vite frontend with Tailwind CSS using Auth, Contract, Guard Mgmt, and Dashboard UIs
- `packages/api-gateway/` - Express.js API gateway with routing, security, and validation
- `packages/services/` - Microservices for authentication, contracts, and guard management

## Development Workflow

### Starting Development

```bash
# Install all dependencies
yarn install

# Run all services in development mode
yarn dev

# Individual workspace development
cd packages/client && yarn dev      # Frontend only (port 5173)
cd packages/api-gateway && yarn dev # API Gateway (port 3000)
cd packages/services && yarn dev    # Services (ports 3001-3003)
```

### Building for Production

```bash
yarn build
```

## Key Technologies

**Frontend Stack**:
- React 18
- Vite (build tool)
- React Router for navigation
- Axios for HTTP requests
- **Tailwind CSS for styling** (no CSS files)
- **JavaScript (ES6+)** - No TypeScript

**Backend Stack**:
- Express.js
- Mongoose for MongoDB
- Redis for caching
- JWT for authentication
- Helmet for security headers
- Morgan for logging

## Code Standards

- Use ES6+ syntax (pure JavaScript)
- **Use Tailwind CSS utility classes** for all styling
- Follow RESTful API conventions
- Validate all inputs with Joi/Zod
- Use meaningful commit messages
- Add tests for new features
- Document complex logic

## Common Tasks

### Adding a New UI Component (Client)

Create component in appropriate app folder with Tailwind CSS:
```
packages/client/src/apps/[app-name]/components/[ComponentName].jsx
```

Example component:
```jsx
export function MyButton() {
  return (
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
      Click me
    </button>
  )
}
```

### Adding a New API Endpoint

Add route to appropriate service:
```
packages/services/src/[service-name].js
```

Register route in API Gateway:
```
packages/api-gateway/src/index.js
```

### Adding Dependencies

```bash
# Add to root package.json
yarn add [package-name]

# Add to specific workspace
cd packages/[workspace] && yarn add [package-name]
```

## Styling with Tailwind CSS

**Do**:
- Use Tailwind utility classes: `className="bg-blue-600 text-white px-4 py-2"`
- Combine classes for responsive design: `className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"`
- Use Tailwind's color palette: `bg-blue-600`, `text-red-500`, `border-green-400`

**Don't**:
- Create separate CSS files (use Tailwind instead)
- Use TypeScript type annotations
- Import CSS modules (use Tailwind utilities)

## Debugging

- Use `yarn dev` with browser DevTools (Vite has excellent HMR)
- API Gateway logs via Morgan middleware
- Check service console output for errors
- Use VS Code debugger with node --inspect

## Environment Variables

Create `.env` files in service directories:

```env
# API Gateway (.env)
PORT=3000
API_URL=http://localhost:3000

# Services (.env)
MONGODB_URI=mongodb://localhost:27017
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
```

## Testing

```bash
# Run tests for all workspaces
yarn test

# Run tests for specific workspace
cd packages/[workspace] && yarn test
```

## Performance Tips

- Use Vite's code splitting for client
- Implement Redis caching for frequently accessed data
- Use pagination for API responses
- Optimize images before storing
- Tailwind CSS is already optimized in production builds

## Security Best Practices

- Always validate input with Joi/Zod
- Use Helmet for HTTP headers
- Implement CORS properly
- Hash passwords with bcryptjs
- Use environment variables for secrets
- Rate limit API endpoints
- Validate JWT tokens

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)

## Getting Help

- Check existing code in same workspace for patterns
- Review error messages carefully
- Use browser DevTools for frontend issues
- Check service logs for backend issues
- Refer to Tailwind CSS docs for styling questions
