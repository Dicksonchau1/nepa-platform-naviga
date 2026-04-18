/**
 * VODA Service — frontend client for the VODA V1 FastAPI backend.
 * Handles API-key auth, frame processing, quality diagnostics, and usage.
 */
import { API_CONFIG, getApiKeyHeaders } from '@/config/api'

export interface VodaKeyInfo {
  id: string
  key_prefix: string
  name: string
  tier: string
  is_active: boolean
  created_at: string
  last_used_at: string | null
}

export interface VodaUsage {
  today: {
    frames_used: number
    frames_limit: number
    tier: string
  }
  history: Array<{
    date: string
    frames_processed: number
    provider_used: string | null
    nepa_latency_ms: number | null
    total_latency_ms: number | null
  }>
}

export interface ProcessResult {
  frame_id: string
  success: boolean
  nepa_latency_ms: number
  provider_latency_ms: number | null
  total_latency_ms: number
  output_url: string | null
  error: string | null
}

export interface ProcessResponse {
  processed: number
  failed: number
  provider: string
  model: string | null
  usage: { frames_used_today: number; daily_limit: number; tier: string }
  results: ProcessResult[]
}

export interface ProviderInfo {
  provider: string
  name: string
  models: string[]
  requires_key: boolean
}

export interface AgentChatResponse {
  session_id: string
  response: string
}

class VodaService {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl
  }

  private url(path: string): string {
    return `${this.baseUrl}${path}`
  }

  /* ---- Health ---- */
  async health(): Promise<Record<string, unknown>> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.health))
    if (!res.ok) throw new Error(`VODA health check failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- API Keys ---- */
  async createKey(apiKey: string, name = 'Default'): Promise<{
    api_key: string; key_prefix: string; name: string; tier: string; id: string
  }> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.keys), {
      method: 'POST',
      headers: getApiKeyHeaders(apiKey),
      body: JSON.stringify({ name }),
    })
    if (!res.ok) throw new Error(`Create key failed: ${res.statusText}`)
    return res.json()
  }

  async listKeys(apiKey: string): Promise<{ keys: VodaKeyInfo[] }> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.keys), {
      headers: getApiKeyHeaders(apiKey),
    })
    if (!res.ok) throw new Error(`List keys failed: ${res.statusText}`)
    return res.json()
  }

  async revokeKey(apiKey: string, keyId: string): Promise<{ status: string }> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.revokeKey(keyId)), {
      method: 'DELETE',
      headers: getApiKeyHeaders(apiKey),
    })
    if (!res.ok) throw new Error(`Revoke key failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- Providers (BYOK) ---- */
  async listProviders(apiKey: string): Promise<{
    configured: string[]; available: ProviderInfo[]; free_model: ProviderInfo
  }> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.providers), {
      headers: getApiKeyHeaders(apiKey),
    })
    if (!res.ok) throw new Error(`List providers failed: ${res.statusText}`)
    return res.json()
  }

  async addProvider(apiKey: string, provider: string, providerApiKey: string): Promise<Record<string, unknown>> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.providers), {
      method: 'POST',
      headers: getApiKeyHeaders(apiKey),
      body: JSON.stringify({ provider, api_key: providerApiKey }),
    })
    if (!res.ok) throw new Error(`Add provider failed: ${res.statusText}`)
    return res.json()
  }

  async removeProvider(apiKey: string, provider: string): Promise<{ status: string }> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.removeProvider(provider)), {
      method: 'DELETE',
      headers: getApiKeyHeaders(apiKey),
    })
    if (!res.ok) throw new Error(`Remove provider failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- Frame Processing ---- */
  async processFrames(
    apiKey: string,
    files: File[],
    provider = 'nepa_free',
    model?: string,
    settings?: Record<string, unknown>,
  ): Promise<ProcessResponse> {
    const formData = new FormData()
    files.forEach((f) => formData.append('files', f))
    formData.append('provider', provider)
    if (model) formData.append('model', model)
    if (settings) formData.append('settings', JSON.stringify(settings))

    const res = await fetch(this.url(API_CONFIG.endpoints.voda.process), {
      method: 'POST',
      headers: { 'X-API-Key': apiKey },
      body: formData,
    })
    if (!res.ok) throw new Error(`Process frames failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- Quality Pipeline ---- */
  async diagnose(apiKey: string, framesB64: string[], timestamps?: number[]): Promise<Record<string, unknown>> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.diagnose), {
      method: 'POST',
      headers: getApiKeyHeaders(apiKey),
      body: JSON.stringify({ frames_b64: framesB64, timestamps }),
    })
    if (!res.ok) throw new Error(`Diagnose failed: ${res.statusText}`)
    return res.json()
  }

  async reconstruct(apiKey: string, frameB64: string, detections: Record<string, unknown>[] = []): Promise<Record<string, unknown>> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.reconstruct), {
      method: 'POST',
      headers: getApiKeyHeaders(apiKey),
      body: JSON.stringify({ frame_b64: frameB64, detections }),
    })
    if (!res.ok) throw new Error(`Reconstruct failed: ${res.statusText}`)
    return res.json()
  }

  async stitch(apiKey: string, framesB64: string[], opts?: { timestamps?: number[]; overlap_pct?: number; mode?: string }): Promise<Record<string, unknown>> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.stitch), {
      method: 'POST',
      headers: getApiKeyHeaders(apiKey),
      body: JSON.stringify({ frames_b64: framesB64, ...opts }),
    })
    if (!res.ok) throw new Error(`Stitch failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- Agent Chat ---- */
  async agentChat(apiKey: string, message: string, sessionId?: string): Promise<AgentChatResponse> {
    const params = new URLSearchParams({ message })
    if (sessionId) params.append('session_id', sessionId)
    const res = await fetch(`${this.url(API_CONFIG.endpoints.voda.agentChat)}?${params}`, {
      method: 'POST',
      headers: getApiKeyHeaders(apiKey),
    })
    if (!res.ok) throw new Error(`Agent chat failed: ${res.statusText}`)
    return res.json()
  }

  /* ---- Usage ---- */
  async getUsage(apiKey: string): Promise<VodaUsage> {
    const res = await fetch(this.url(API_CONFIG.endpoints.voda.usage), {
      headers: getApiKeyHeaders(apiKey),
    })
    if (!res.ok) throw new Error(`Get usage failed: ${res.statusText}`)
    return res.json()
  }
}

export const vodaService = new VodaService()
