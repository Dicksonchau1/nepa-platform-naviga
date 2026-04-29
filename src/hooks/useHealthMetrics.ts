/**
 * useHealthMetrics — rewritten to use Supabase directly.
 * Reads from service_status table + aggregates from alerts.
 * Replaces old REST call to /metrics/live.
 */
import { useState, useEffect, useCallback } from 'react'
import { supabase, ServiceStatus } from '@/lib/supabase'
import { useRealtimeSubscription } from './useRealtimeSubscription'

export interface LiveIntelligence {
  recentAlerts: Array<{
    id: string
    type: string
    severity: 'info' | 'warning' | 'critical'
    message: string
    timestamp: string
  }>
  serviceStatuses: ServiceStatus[]
  systemStatus: 'healthy' | 'degraded' | 'down'
}

export function useHealthMetrics(pollInterval?: number) {
  const [intelligence, setIntelligence] = useState<LiveIntelligence | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch service status for all portals
      const { data: statuses, error: statusError } = await supabase
        .from('service_status')
        .select('*')

      if (statusError) throw new Error(statusError.message)

      // Fetch recent alerts (last 24h)
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      const { data: alerts, error: alertError } = await supabase
        .from('alerts')
        .select('id, portal, severity, title, description, created_at')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(10)

      if (alertError) throw new Error(alertError.message)

      // Determine overall system status
      const portalStates = (statuses ?? []).map((s) => s.state)
      let systemStatus: 'healthy' | 'degraded' | 'down' = 'healthy'
      if (portalStates.some((s) => s === 'offline' || s === 'maintenance')) systemStatus = 'down'
      else if (portalStates.some((s) => s === 'degraded')) systemStatus = 'degraded'

      setIntelligence({
        recentAlerts: (alerts ?? []).map((a) => ({
          id: a.id,
          type: a.portal,
          severity: a.severity as 'info' | 'warning' | 'critical',
          message: a.description ?? a.title,
          timestamp: a.created_at,
        })),
        serviceStatuses: statuses ?? [],
        systemStatus,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch health metrics'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMetrics()

    if (pollInterval && pollInterval > 0) {
      const interval = setInterval(fetchMetrics, pollInterval)
      return () => clearInterval(interval)
    }
  }, [fetchMetrics, pollInterval])

  // Live subscription on alerts
  useRealtimeSubscription({
    table: 'alerts',
    event: 'INSERT',
    onInsert: () => fetchMetrics(),
  })

  return {
    intelligence,
    isLoading,
    error,
    refresh: fetchMetrics,
  }
}
