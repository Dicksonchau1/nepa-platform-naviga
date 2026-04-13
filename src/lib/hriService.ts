/**
 * NEPA-HRI Service Client — wraps the Affective Modulation Layer API.
 * Separate microservice from the main inference API.
 * Used in Agent Chat to inject stability context into LLM prompts.
 */

const HRI_BASE_URL = import.meta.env.VITE_HRI_API_URL || 'http://localhost:8001'

export interface AMLContext {
  session_id: string
  frame: number
  metrics: {
    E_t: number
    S_t: number
    delta_t: number
    volatility_index: number
    feeling_load: number
    augmentation_score: number
    p_escalation: number
    t_recover: number
  }
  envelope: {
    kappa: number
    inside_omega: boolean
    regime: 'A_stable' | 'B_escalation'
  }
  recommended_action: 'LOCAL_HANDLE' | 'ESCALATE' | 'DEESCALATE'
  prompt_injection: string
}

export interface EvaluateRequest {
  interaction_trace: number[]
  incidents?: number[]
  kappa?: number
  desired_manifold?: number[]
}

export interface FrameRequest {
  session_id: string
  E_t: number
  incident?: number
  E_desired?: number
}

class HRIService {
  private apiKey: string | null = null

  setApiKey(key: string) {
    this.apiKey = key
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey
    }
    return headers
  }

  async health(): Promise<{ status: string; version: string; platform: string }> {
    const response = await fetch(`${HRI_BASE_URL}/health`)
    if (!response.ok) throw new Error('HRI API unreachable')
    return response.json()
  }

  /** Full trace evaluation — 1 billed session */
  async evaluate(request: EvaluateRequest): Promise<AMLContext> {
    const response = await fetch(`${HRI_BASE_URL}/session/evaluate`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(request),
    })
    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: 'Evaluation failed' }))
      throw new Error(err.detail || 'Evaluation failed')
    }
    return response.json()
  }

  /** Start a stateful streaming session — 1 billed session */
  async startSession(): Promise<{ session_id: string; status: string }> {
    const response = await fetch(`${HRI_BASE_URL}/session/start`, {
      method: 'POST',
      headers: this.getHeaders(),
    })
    if (!response.ok) throw new Error('Failed to start HRI session')
    return response.json()
  }

  /** Push one frame into a live session — no extra billing */
  async pushFrame(request: FrameRequest): Promise<AMLContext> {
    const response = await fetch(`${HRI_BASE_URL}/session/frame`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(request),
    })
    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: 'Frame push failed' }))
      throw new Error(err.detail || 'Frame push failed')
    }
    return response.json()
  }

  /** End and clear a session */
  async endSession(sessionId: string): Promise<void> {
    await fetch(`${HRI_BASE_URL}/session/${sessionId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })
  }
}

export const hriService = new HRIService()
