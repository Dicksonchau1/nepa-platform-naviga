/**
 * API Configuration — wires the React frontend to the FastAPI backend.
 * Auth and data queries go through Supabase directly.
 * This config covers VODA, CODA, and NEPA inference endpoints.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const HRI_BASE_URL = import.meta.env.VITE_HRI_API_URL || 'http://localhost:8001'

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  hriUrl: HRI_BASE_URL,
  endpoints: {
    /* ---- VODA V1 (video perception) ---- */
    voda: {
      health: '/voda/health',
      keys: '/voda/keys',
      revokeKey: (keyId: string) => `/voda/keys/${keyId}`,
      providers: '/voda/providers',
      removeProvider: (provider: string) => `/voda/providers/${provider}`,
      process: '/voda/process',
      diagnose: '/voda/diagnose',
      reconstruct: '/voda/reconstruct',
      stitch: '/voda/stitch',
      agentChat: '/voda/agent/chat',
      usage: '/voda/usage',
    },
    /* ---- CODA V1 (cinematic render) ---- */
    coda: {
      presets: '/coda/presets',
      film: '/coda/film',
      avatar: '/coda/avatar',
      pitch: '/coda/pitch',
      renderStatus: (jobId: string) => `/coda/render-status/${jobId}`,
    },
    /* ---- Legacy NEPA inference (kept for playground/agent) ---- */
    nepa: {
      infer: '/api/nepa/infer',
      upload: '/api/nepa/upload',
      status: (taskId: string) => `/api/nepa/status/${taskId}`,
    },
  },
}

/** Plain JSON headers (no auth). */
export function getHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
  }
}

/** Auth headers using Supabase JWT for legacy NEPA inference calls. */
export function getAuthHeaders(token: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

/** Auth headers using a VODA API key for VODA/CODA endpoints. */
export function getApiKeyHeaders(apiKey: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey,
  }
}
