export interface WorkspaceFeatureFlags {
  soda_enabled: boolean
  roda_enabled: boolean
  voda_enabled: boolean
  coda_enabled: boolean
  hri_enabled: boolean
  foda_enabled: boolean
  camera_limit: number
  api_quota_monthly: number
  video_minutes_monthly: number
  hri_calls_monthly: number
  consultation_calls_monthly: number
  storage_retention_days: number
  max_stores: number
  max_users: number
}

export interface WorkspaceSubscription {
  workspace_id: string
  plan: 'pilot' | 'professional' | 'enterprise' | 'trial'
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  billing_cycle_start: string
  billing_cycle_end: string
  status: 'active' | 'past_due' | 'cancelled' | 'trial'
  features: WorkspaceFeatureFlags
}

export type ProductKey = 'soda' | 'roda' | 'voda' | 'coda' | 'hri' | 'foda'
