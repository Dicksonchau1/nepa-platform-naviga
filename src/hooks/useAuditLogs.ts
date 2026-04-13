/**
 * useAuditLogs — rewritten to use Supabase directly.
 * Reads from audit_log table.
 * Replaces old REST call to /audit/logs.
 */
import { useState, useCallback, useEffect } from 'react'
import { supabase, AuditLogEntry } from '@/lib/supabaseClient'
import type { PortalType } from '@/lib/supabaseClient'

interface AuditLogFilters {
  portal?: PortalType
  startDate?: string
  endDate?: string
  userId?: string
  action?: string
}

export function useAuditLogs(filters: AuditLogFilters = {}, page = 1, pageSize = 25) {
  const [logs, setLogs] = useState<AuditLogEntry[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLogs = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      let q = supabase
        .from('audit_log')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

      if (filters.portal) q = q.eq('portal', filters.portal)
      if (filters.userId) q = q.eq('user_id', filters.userId)
      if (filters.action) q = q.eq('action', filters.action)
      if (filters.startDate) q = q.gte('created_at', filters.startDate)
      if (filters.endDate) q = q.lte('created_at', filters.endDate)

      const { data, count, error: queryError } = await q

      if (queryError) throw new Error(queryError.message)

      setLogs(data ?? [])
      setTotal(count ?? 0)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch audit logs'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [filters.portal, filters.userId, filters.action, filters.startDate, filters.endDate, page, pageSize])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  return {
    logs,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    isLoading,
    error,
    refresh: fetchLogs,
  }
}
