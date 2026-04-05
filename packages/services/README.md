# Business Services

Microservices for contract and guard management:

## Auth Service (Port 3001)
- JWT engine
- RBAC (Role-Based Access Control)
- 2FA/TOTP support
- Token refresh

## Contract Service (Port 3002)
- CRUD operations
- Versioning
- e-Signature flow
- Expiry scheduler

## Guard Service (Port 3003)
- Shift scheduling
- Patrol check-in
- Incident reports
- GPS logging

## Development

```bash
yarn dev
```
