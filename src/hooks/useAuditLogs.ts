import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { API_CONFIG, getAuthHeaders } from '@/config/api'
import {
  AuditLog,
  AuditLogsResponse,
  AuditLogFilters,
} from '@/types/nepa'

interface UseAuditLogsOptions {
  page?: number
  pageSize?: number
  filters?: AuditLogFilters
  autoFetch?: boolean
}

export function useAuditLogs(options: UseAuditLogsOptions = {}) {
  const { page = 1, pageSize = 20, filters = {}, autoFetch = true } = options
  const { accessToken, logout, refresh } = useAuth()
  
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLogs = useCallback(async () => {
    if (!accessToken) {
      setError('No access token available')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value) acc[key] = value
          return acc
        }, {} as Record<string, string>),
      })

      const response = await fetch(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.audit.logs}?${params}`,
        {
          headers: getAuthHeaders(accessToken),
        }
      )

      if (response.status === 401) {
        try {
          await refresh()
          return fetchLogs()
        } catch {
          logout()
          throw new Error('Authentication failed')
        }
      }

      if (!response.ok) {
        throw new Error('Failed to fetch audit logs')
      }

      const data: AuditLogsResponse = await response.json()
      setLogs(data.logs)
      setTotal(data.total)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch audit logs'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [accessToken, page, pageSize, filters, logout, refresh])

  useEffect(() => {
    if (autoFetch && accessToken) {
      fetchLogs()
    }
  }, [autoFetch, accessToken, fetchLogs])

  return {
    logs,
    total,
    isLoading,
    error,
    refresh: fetchLogs,
  }
}
