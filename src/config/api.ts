const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    auth: {
      login: '/auth/login',
      refresh: '/auth/refresh',
      logout: '/auth/logout',
    },
    audit: {
      logs: '/audit/logs',
      verify: '/audit/verify',
    },
    tasks: {
      list: '/tasks',
      create: '/tasks',
      update: (id: string) => `/tasks/${id}`,
      status: (id: string) => `/tasks/${id}/status`,
    },
    facade: {
      findings: '/facade/findings',
      summary: '/facade/summary',
    },
    metrics: {
      health: '/metrics/health',
      live: '/metrics/live',
    },
  },
}

export function getAuthHeaders(token: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
}

export function getHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
  }
}
