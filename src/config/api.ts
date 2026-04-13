/**
 * API Configuration — for the NEPA Inference backend (FastAPI).
 * Auth and data queries now go through Supabase directly.
 * This config is ONLY for the inference/agent endpoints.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const HRI_BASE_URL = import.meta.env.VITE_HRI_API_URL || 'http://localhost:8001'

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  hriUrl: HRI_BASE_URL,
  endpoints: {
    nepa: {
      infer: '/api/nepa/infer',
      upload: '/api/nepa/upload',
      status: (taskId: string) => `/api/nepa/status/${taskId}`,
    },
  },
}

export function getHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
  }
}

/** For inference API calls that need auth, pass Supabase JWT */
export function getAuthHeaders(token: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
}
