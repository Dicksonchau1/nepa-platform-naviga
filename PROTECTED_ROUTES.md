# Protected Routes Implementation

## Overview

AuraSense NEPA uses a robust authentication system with protected routes that prevent unauthorized access to sensitive dashboard pages. The implementation follows React Router v6 patterns with JWT token management.

## Architecture

### 1. AuthContext (`src/contexts/AuthContext.tsx`)

The central authentication state manager that provides:

- **State**: `user`, `accessToken`, `isLoading`, `error`
- **Methods**: `login()`, `logout()`, `refresh()`
- **Persistence**: Tokens stored in localStorage with keys:
  - `nepa_access_token` - JWT access token
  - `nepa_refresh_token` - JWT refresh token  
  - `nepa_user` - User object (id, email, name, role)

#### Key Features

**Token Refresh**: The `refresh()` method automatically renews expired access tokens using the refresh token. If refresh fails, user is logged out.

**Persistent Sessions**: On app load, the context checks localStorage for existing tokens and automatically restores the user session.

**Error Handling**: Login errors are caught and exposed via the `error` state for UI display.

### 2. ProtectedRoute Component (`src/App.tsx`)

A wrapper component that enforces authentication:

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
```

**How it works**:
1. Checks if auth is still loading (initial session restoration)
2. Shows loading UI while determining auth state
3. Redirects to `/login` if no user is authenticated
4. Renders protected content if user is authenticated

### 3. Protected Routes

Currently protected routes in `App.tsx`:

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<DashboardPage />} />
  <Route path="facade" element={<DashboardPage />} />
  <Route path="tasks" element={<RobotTasksPage />} />
  <Route path="audit" element={<DashboardPage />} />
  <Route path="live" element={<DashboardPage />} />
</Route>
```

All routes under `/dashboard/*` are protected and require authentication.

## Login Flow

### User Journey

1. User navigates to `/dashboard` (or any protected route)
2. `ProtectedRoute` detects no authenticated user
3. User is redirected to `/login`
4. User enters credentials and submits
5. `LoginPage` calls `login({ email, password })`
6. `AuthContext.login()`:
   - POSTs to `${API_BASE_URL}/auth/login`
   - Receives `{ user, tokens: { accessToken, refreshToken } }`
   - Stores tokens and user in localStorage
   - Updates context state
7. `LoginPage` navigates to `/dashboard`
8. `ProtectedRoute` now detects authenticated user
9. Dashboard renders successfully

### API Integration

Login endpoint configuration in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  baseUrl: API_BASE_URL, // from VITE_API_BASE_URL env var
  endpoints: {
    auth: {
      login: '/auth/login',
      refresh: '/auth/refresh',
      logout: '/auth/logout',
    },
    // ... other endpoints
  },
}
```

Expected backend response format:

```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string"
  },
  "tokens": {
    "accessToken": "jwt-token-here",
    "refreshToken": "refresh-token-here"
  }
}
```

## Token Management

### Storage Strategy

Uses `localStorage` for persistence across browser sessions. Tokens survive page refreshes and browser restarts.

### Authorization Headers

Protected API calls use the `getAuthHeaders()` helper:

```typescript
const response = await fetch(url, {
  headers: getAuthHeaders(accessToken),
  // ...
})
```

This adds the JWT to the `Authorization: Bearer <token>` header.

### Token Refresh Strategy

When a protected API call returns `401 Unauthorized`:

1. Custom hooks (like `useAuditLogs`) detect the 401
2. Call `refresh()` from `AuthContext`
3. Retry the original request with new token
4. If refresh fails, user is logged out and redirected to login

Example from custom hooks:

```typescript
if (!response.ok) {
  if (response.status === 401) {
    refresh() // triggers re-auth
    return
  }
  throw new Error('Request failed')
}
```

## Security Considerations

### Current Implementation

✅ **JWT-based authentication** - Industry standard token auth  
✅ **Automatic token refresh** - Seamless UX with long sessions  
✅ **Protected route guards** - Prevents unauthorized access  
✅ **Logout clears all auth data** - Proper session cleanup  

### Best Practices Applied

- Tokens stored in localStorage (acceptable for SPAs; more secure than sessionStorage for UX)
- All API calls include auth headers when authenticated
- 401 responses trigger automatic logout
- No sensitive data logged to console

### Production Recommendations

1. **HTTPS Only**: Ensure production deployment uses HTTPS to prevent token interception
2. **Short-lived Access Tokens**: Backend should issue access tokens with short TTL (15-60 min)
3. **HttpOnly Cookies** (Optional): For maximum security, consider moving refresh tokens to httpOnly cookies
4. **CSRF Protection**: If using cookies, implement CSRF tokens
5. **Rate Limiting**: Backend should rate-limit login attempts

## Extending the System

### Adding More Protected Routes

Wrap any route with `<ProtectedRoute>`:

```tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

### Role-Based Access Control (RBAC)

Enhance `ProtectedRoute` to check user roles:

```tsx
function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode
  allowedRoles?: string[]
}) {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
```

Usage:

```tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

### Remember Redirect Location

To return users to their originally requested page after login:

```tsx
// In ProtectedRoute
const location = useLocation()
return <Navigate to="/login" state={{ from: location }} replace />

// In LoginPage after successful login
const location = useLocation()
const from = location.state?.from?.pathname || '/dashboard'
navigate(from, { replace: true })
```

## Troubleshooting

### Issue: Infinite redirect loop

**Cause**: `isLoading` never becomes `false`

**Fix**: Ensure `setIsLoading(false)` is called in AuthContext's `useEffect`

### Issue: User logged out on refresh

**Cause**: localStorage keys not matching

**Fix**: Check `STORAGE_KEYS` constants match what's being read/written

### Issue: 401 errors not triggering refresh

**Cause**: Hooks not checking response status properly

**Fix**: Add `if (response.status === 401) refresh()` to all API hooks

### Issue: Login succeeds but dashboard shows "Loading..."

**Cause**: User state updated but `isLoading` still `true`

**Fix**: Ensure `setIsLoading(false)` is in the `finally` block of `login()`

## File Reference

| File | Purpose |
|------|---------|
| `src/contexts/AuthContext.tsx` | Authentication state and token management |
| `src/App.tsx` | Route configuration with ProtectedRoute wrapper |
| `src/routes/dashboard/LoginPage.tsx` | Login form and submission handler |
| `src/config/api.ts` | API endpoint configuration and header helpers |
| `src/types/nepa.ts` | TypeScript interfaces for auth types |
| `src/hooks/useAuditLogs.ts` | Example hook with 401 handling |

## Testing Authentication Flow

### Manual Testing Checklist

1. ✅ Visit `/dashboard` when logged out → redirects to `/login`
2. ✅ Enter valid credentials → redirects to `/dashboard`
3. ✅ Refresh page while logged in → stays logged in
4. ✅ Logout → clears tokens and redirects to home
5. ✅ Close browser and reopen → session persists
6. ✅ Visit protected route with expired token → triggers refresh
7. ✅ Enter invalid credentials → shows error message
8. ✅ Access nested dashboard routes → all protected

### Mock Backend for Development

If backend is not yet available, you can mock the auth endpoint:

```typescript
// Temporary mock in AuthContext for development
const MOCK_MODE = true

if (MOCK_MODE) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Return mock data
  const mockData = {
    user: { 
      id: '1', 
      email: credentials.email, 
      name: 'Test User',
      role: 'admin' 
    },
    tokens: { 
      accessToken: 'mock-access-token', 
      refreshToken: 'mock-refresh-token' 
    }
  }
  
  // Store and set state
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, mockData.tokens.accessToken)
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockData.tokens.refreshToken)
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockData.user))
  setAccessToken(mockData.tokens.accessToken)
  setUser(mockData.user)
  return
}
```

Remember to remove mock mode before production!
