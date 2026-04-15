export type VodaTier = 'free' | 'pro' | 'enterprise'

export type ApiKeyStatus = 'active' | 'revoked' | 'expired'

export interface ApiKey {
  id: string
  key_prefix: string
  name: string
  tier: VodaTier
  created_at: string
  last_used_at?: string | null
  status: ApiKeyStatus
}

export interface CreateKeyResponse {
  id: string
  key: string
  key_prefix: string
  name: string
  tier: VodaTier
  created_at: string
  last_used_at?: string | null
  status: ApiKeyStatus
}

export interface ProvidersResponse {
  providers: ProviderInfo[]
}

export interface ProviderInfo {
  provider: string
  label: string
  models: string[]
  connected: boolean
  last_validated_at?: string | null
}

export interface UsageResponse {
  tier: VodaTier
  daily_limit: number
  used_today: number
  usage_30d: Array<{ date: string; frames: number }>
  billing_portal_url?: string | null
  period_start?: string | null
  period_end?: string | null
}

export interface HealthResponse {
  status: 'ok' | 'degraded' | 'down'
  version?: string
  timestamp?: string
}

export interface ProcessResponse {
  job_id: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
  output_url?: string | null
  results?: Record<string, unknown>
}

export type RecommendationSeverity = 'low' | 'medium' | 'high'

export interface DiagnosisRecommendation {
  message: string
  severity: RecommendationSeverity
}

export interface TemporalMetrics {
  frame_drops: number
  flicker: number
  bitrate_stability: number
}

export interface DiagnosisResponse {
  metrics: {
    sharpness: number
    noise: number
    exposure: number
    color_cast: number
    resolution: number
  }
  recommendations: DiagnosisRecommendation[]
  temporal?: TemporalMetrics | null
  preview_url?: string | null
}

export interface ReconstructDetection {
  id: string
  label: string
  confidence: number
  polygon: Array<{ x: number; y: number }>
  depth?: number | null
}

export interface SceneGraph {
  nodes: Array<{ id: string; label: string; depth?: number | null }>
  edges: Array<{ source: string; target: string; relation: string }>
}

export interface ReconstructResponse {
  image_url: string
  detections: ReconstructDetection[]
  scene_graph?: SceneGraph | null
}

export interface StitchResponse {
  image_url: string
  seam_score: number
  download_url?: string | null
}
