export interface User {
  id: string
  email: string
  name?: string
  role: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuditLog {
  id: string
  timestamp: string
  actor: string
  action: string
  entity: string
  entityId?: string
  status: 'success' | 'failed' | 'pending'
  severity: 'info' | 'warning' | 'error' | 'critical'
  hash: string
  details?: Record<string, unknown>
}

export interface AuditLogsResponse {
  logs: AuditLog[]
  total: number
  page: number
  pageSize: number
}

export interface AuditLogFilters {
  startDate?: string
  endDate?: string
  severity?: string
  entityId?: string
}

export interface RobotTask {
  id: string
  name: string
  type: string
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
  priority: number
  createdAt: string
  updatedAt: string
  completedAt?: string
  robotId?: string
  progress?: number
  error?: string
  metadata?: Record<string, unknown>
}

export interface RobotTasksResponse {
  tasks: RobotTask[]
  total: number
}

export interface CreateTaskRequest {
  name: string
  type: string
  priority?: number
  robotId?: string
  metadata?: Record<string, unknown>
}

export interface UpdateTaskStatusRequest {
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
  progress?: number
  error?: string
}

export interface FacadeFinding {
  id: string
  buildingId: string
  buildingName: string
  type: 'BRS' | 'concealment' | 'crack' | 'spalling' | 'corrosion' | 'other'
  severity: 'low' | 'medium' | 'high' | 'critical'
  location: {
    floor?: number
    facade?: string
    coordinates?: { x: number; y: number }
  }
  detectedAt: string
  status: 'open' | 'in-progress' | 'resolved' | 'false-positive'
  confidence: number
  imageUrl?: string
  notes?: string
}

export interface FacadeFindingsResponse {
  findings: FacadeFinding[]
  total: number
  summary: {
    totalBuildings: number
    openDefects: number
    criticalCount: number
  }
}

export interface FacadeFindingFilters {
  buildingId?: string
  severity?: string
  startDate?: string
  endDate?: string
  status?: string
}

export interface HealthMetrics {
  timestamp: string
  latency: {
    p50: number
    p95: number
    p99: number
  }
  throughput: number
  errorRate: number
  activeConnections: number
  queueDepth: number
}

export interface LiveIntelligence {
  recentAlerts: Array<{
    id: string
    type: string
    severity: 'info' | 'warning' | 'error' | 'critical'
    message: string
    timestamp: string
  }>
  metrics: HealthMetrics
  systemStatus: 'healthy' | 'degraded' | 'down'
}

export interface VerifyHashRequest {
  logId: string
  hash: string
}

export interface VerifyHashResponse {
  verified: boolean
  status: 'verified' | 'tampered' | 'unknown'
  message?: string
}
