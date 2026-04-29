import { toast } from 'sonner'
import type {
  CreateKeyResponse,
  ProvidersResponse,
  ProcessResponse,
  DiagnosisResponse,
  ReconstructResponse,
  StitchResponse,
  UsageResponse,
  HealthResponse,
  ApiKey,
} from '@/types/voda'

const VODA_BASE_URL = import.meta.env.VITE_VODA_API_URL || 'http://localhost:8001'
const UPGRADE_EVENT = 'voda:upgrade'

let inMemoryApiKey: string | null = null

export const getStoredVodaApiKey = () => inMemoryApiKey

export const setStoredVodaApiKey = (key: string) => {
  inMemoryApiKey = key
}

export const clearStoredVodaApiKey = () => {
  inMemoryApiKey = null
}

type RequestOptions = RequestInit & {
  skipAuthRedirect?: boolean
}

const dispatchUpgradeEvent = () => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(UPGRADE_EVENT))
}

const getErrorMessage = async (response: Response) => {
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    const data = await response.json().catch(() => null)
    if (data?.detail) return data.detail as string
    if (data?.message) return data.message as string
  }
  return response.statusText || 'Request failed'
}

const handleResponse = async <T>(response: Response, options?: RequestOptions): Promise<T> => {
  if (response.status === 401 && !options?.skipAuthRedirect) {
    toast.error('Session expired. Please sign in again.')
    if (typeof window !== 'undefined') {
      window.location.assign('/auth/sign-in')
    }
    throw new Error('Unauthorized')
  }

  if (response.status === 429) {
    toast.error('Usage limit reached. Upgrade to Pro to continue.')
    dispatchUpgradeEvent()
    throw new Error('Upgrade required')
  }

  if (!response.ok) {
    const message = await getErrorMessage(response)
    toast.error(message)
    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

const vodaFetch = async <T>(path: string, options: RequestOptions = {}) => {
  const headers = new Headers(options.headers || {})
  const apiKey = getStoredVodaApiKey()
  if (apiKey) {
    headers.set('X-API-Key', apiKey)
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  const bodyIsFormData = options.body instanceof FormData
  if (!bodyIsFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${VODA_BASE_URL}${path}`, {
    ...options,
    headers,
    mode: 'cors',
    credentials: 'omit',
  })

  return handleResponse<T>(response, options)
}

const buildFilesPayload = (files: File[], extras?: Record<string, string>) => {
  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))
  if (extras) {
    Object.entries(extras).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  return formData
}

export const vodaApi = {
  async createApiKey(name: string): Promise<CreateKeyResponse> {
    return vodaFetch<CreateKeyResponse>('/voda/api-keys', {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
  },
  async listApiKeys(): Promise<{ keys: ApiKey[] }> {
    return vodaFetch<{ keys: ApiKey[] }>('/voda/api-keys', {
      method: 'GET',
    })
  },
  async revokeApiKey(keyId: string): Promise<void> {
    await vodaFetch<void>(`/voda/api-keys/${keyId}`, {
      method: 'DELETE',
    })
  },
  async addProviderKey(provider: string, apiKey: string): Promise<void> {
    await vodaFetch<void>('/voda/providers', {
      method: 'POST',
      body: JSON.stringify({ provider, api_key: apiKey }),
    })
  },
  async listProviders(): Promise<ProvidersResponse> {
    return vodaFetch<ProvidersResponse>('/voda/providers', {
      method: 'GET',
    })
  },
  async removeProvider(provider: string): Promise<void> {
    await vodaFetch<void>(`/voda/providers/${provider}`, {
      method: 'DELETE',
    })
  },
  async processFrames(
    files: File[],
    provider: string,
    model?: string,
    settings?: Record<string, unknown>
  ): Promise<ProcessResponse> {
    const formData = buildFilesPayload(files, {
      provider,
      ...(model ? { model } : {}),
      ...(settings ? { settings: JSON.stringify(settings) } : {}),
    })
    return vodaFetch<ProcessResponse>('/voda/process', {
      method: 'POST',
      body: formData,
    })
  },
  async diagnoseFrames(files: File[]): Promise<DiagnosisResponse> {
    const formData = buildFilesPayload(files)
    return vodaFetch<DiagnosisResponse>('/voda/diagnose', {
      method: 'POST',
      body: formData,
    })
  },
  async reconstructScene(files: File[]): Promise<ReconstructResponse> {
    const formData = buildFilesPayload(files)
    return vodaFetch<ReconstructResponse>('/voda/reconstruct', {
      method: 'POST',
      body: formData,
    })
  },
  async stitchFrames(files: File[], mode: 'panoramic' | 'temporal'): Promise<StitchResponse> {
    const formData = buildFilesPayload(files, { mode })
    return vodaFetch<StitchResponse>('/voda/stitch', {
      method: 'POST',
      body: formData,
    })
  },
  async getUsage(): Promise<UsageResponse> {
    return vodaFetch<UsageResponse>('/voda/usage', {
      method: 'GET',
    })
  },
  async getHealth(): Promise<HealthResponse> {
    return vodaFetch<HealthResponse>('/voda/health', {
      method: 'GET',
      skipAuthRedirect: true,
    })
  },
  async createCheckoutSession(tier: 'pro' | 'enterprise'): Promise<{ url: string }> {
    return vodaFetch<{ url: string }>('/voda/billing/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ tier }),
    })
  },
}

export const vodaUpgradeEventName = UPGRADE_EVENT
