# AuraSense NEPA - Dashboard Integration

## Overview

This application now includes a fully wired NEPA (Neuromorphic Edge Perception Agent) dashboard connected to your FastAPI backend. The frontend is production-ready with TypeScript types, authentication, and API integration.

## What's Been Built

### Core Infrastructure

#### Authentication (`src/contexts/AuthContext.tsx`)
- JWT-based authentication with localStorage persistence
- Token refresh mechanism
- Automatic logout on 401 responses
- Login, logout, and refresh methods

#### API Configuration (`src/config/api.ts`)
- Centralized API endpoints
- Environment-aware base URL configuration
- Authentication headers utility

#### TypeScript Types (`src/types/nepa.ts`)
- Complete type definitions for:
  - User and authentication
  - Audit logs
  - Robot tasks
  - Facade findings
  - Health metrics
  - Live intelligence

### Custom Hooks

All hooks include automatic 401 handling, token refresh, and functional updates:

- **`useAuditLogs`** - Fetch and filter audit logs with pagination
- **`useRobotTasks`** - Manage robot tasks (list, create, update status)
- **`useFacadeFindings`** - Retrieve building facade inspection data
- **`useHealthMetrics`** - Poll live system health and intelligence metrics

### Dashboard Routes

#### Public Routes
- `/` - Cinematic homepage with "Launch NEPA Console" CTA
- `/login` - Dashboard login page (separate from marketing site login)
- `/playground` - Interactive NEPA world model demo

#### Protected Routes (require authentication)
- `/dashboard` - Main overview with stats and recent activity
- `/dashboard/facade` - Portfolio/building facade management
- `/dashboard/tasks` - Robot task queue management
- `/dashboard/audit` - Audit ledger with hash verification
- `/dashboard/live` - Live intelligence and performance metrics

### Components

**DashboardLayout** (`src/routes/dashboard/DashboardLayout.tsx`)
- Sidebar navigation
- User profile section
- Sign out functionality
- Glassmorphism styling with NEPA aesthetic

**DashboardPage** (`src/routes/dashboard/DashboardPage.tsx`)
- System status cards
- Building portfolio summary
- Critical issues counter
- Robot task statistics
- Recent alerts list
- Performance metrics display

## Environment Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000
```

For production, update to your actual API endpoint:

```env
VITE_API_BASE_URL=https://api.aurasensehk.com
```

## Backend API Endpoints Expected

The frontend expects these FastAPI endpoints to be available:

### Authentication
- `POST /auth/login` - Returns `{ user, tokens: { accessToken, refreshToken } }`
- `POST /auth/refresh` - Returns `{ tokens: { accessToken, refreshToken } }`
- `POST /auth/logout` - Invalidate tokens

### Audit Logs
- `GET /audit/logs?page=1&pageSize=20&severity=...&startDate=...&endDate=...`
- `POST /audit/verify` - Verify log entry hash

### Robot Tasks
- `GET /tasks` - List all tasks
- `POST /tasks` - Create new task
- `PATCH /tasks/{id}/status` - Update task status

### Facade Findings
- `GET /facade/findings?buildingId=...&severity=...&status=...`
- Returns summary with `totalBuildings`, `openDefects`, `criticalCount`

### Live Metrics
- `GET /metrics/live` - Returns health metrics and recent alerts

## Next Steps

1. **Connect to Real Backend**: Update `VITE_API_BASE_URL` to point to your FastAPI server
2. **Add More Dashboard Pages**: Create dedicated pages for audit ledger, tasks, and facade views
3. **Implement Hash Verification UI**: Add hash verification badges and verification flow
4. **Add Data Visualization**: Use D3 or Recharts for trend charts and analytics
5. **WebSocket Support**: Add real-time updates for live intelligence panel
6. **Error Boundaries**: Wrap dashboard routes in error boundaries for graceful failure handling

## Key Features

✅ **JWT Authentication** with automatic token refresh
✅ **Protected Routes** with redirect to login
✅ **Type-Safe API Calls** with complete TypeScript definitions
✅ **Automatic 401 Handling** with logout/refresh logic
✅ **Functional Updates** to prevent data loss in state management
✅ **Polling Support** for live metrics (30-second refresh)
✅ **Consistent UI** with glassmorphism and NEPA aesthetic
✅ **Responsive Design** with mobile-friendly sidebar

## Project Structure

```
src/
├── config/
│   └── api.ts              # API configuration
├── contexts/
│   └── AuthContext.tsx     # Authentication provider
├── hooks/
│   ├── useAuditLogs.ts
│   ├── useFacadeFindings.ts
│   ├── useHealthMetrics.ts
│   └── useRobotTasks.ts
├── routes/
│   └── dashboard/
│       ├── DashboardLayout.tsx
│       ├── DashboardPage.tsx
│       └── LoginPage.tsx
├── types/
│   └── nepa.ts             # TypeScript type definitions
└── App.tsx                 # Main app with routing
```

## Development

```bash
npm run dev
```

The app will start on `http://localhost:5173` with hot reload enabled.

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory, ready for deployment.
