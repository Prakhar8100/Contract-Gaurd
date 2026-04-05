# Contract Guard Client

React + Vite client application with Tailwind CSS and pure JavaScript.

## Features

- **Auth UI**: Login page with form validation
- **Contract UI**: View and manage contracts with API integration
- **Guard Mgmt UI**: Guard management and scheduling
- **Dashboard UI**: Analytics dashboard with quick actions
- **Responsive Design**: Mobile-first with Tailwind CSS
- **API Integration**: Axios with JWT authentication

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool (fast HMR)
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **JavaScript (ES6+)** - No TypeScript

## Development

```bash
yarn install
yarn dev
```

Visit http://localhost:5173

## Building

```bash
yarn build
```

## Project Structure

```
src/
├── apps/
│   ├── auth-ui/         # Login/Register
│   ├── contract-ui/     # Contract management
│   ├── guard-mgmt-ui/   # Guard scheduling
│   └── dashboard-ui/    # Analytics
├── api/                 # Axios client
├── components/          # Shared components
├── hooks/              # Custom React hooks
└── index.css           # Tailwind directives
```

## Styling

All components use **Tailwind CSS** utility classes. No separate CSS files needed.

Example:
```jsx
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
  Click me
</button>
```
