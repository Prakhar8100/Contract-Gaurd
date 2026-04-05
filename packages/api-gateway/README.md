# API Gateway

Express.js API gateway with:
- Rate limiting
- Helmet security headers
- CORS support
- Request validation (Joi/Zod)
- Morgan logging

## Development

```bash
yarn dev
```

Server runs on http://localhost:3000

## Routes

- `/api/auth/*` → Auth service
- `/api/contracts/*` → Contract service
- `/api/guards/*` → Guard service
