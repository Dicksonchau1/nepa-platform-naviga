import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { API_CONFIG, getAuthHeaders } from '@/config/api'
import {
  FacadeFinding,
  FacadeFindingsResponse,
  FacadeFindingFilters,
} from '@/types/nepa'

interface UseFacadeFindingsOptions {
  filters?: FacadeFindingFilters
  autoFetch?: boolean
}

export function useFacadeFindings(options: UseFacadeFindingsOptions = {}) {
  const { filters = {}, autoFetch = true } = options
  const { accessToken, logout, refresh } = useAuth()
  
  const [findings, setFindings] = useState<FacadeFinding[]>([])
  const [total, setTotal] = useState(0)
  const [summary, setSummary] = useState({
    totalBuildings: 0,
    openDefects: 0,
    criticalCount: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFindings = useCallback(async () => {
    if (!accessToken) {
      setError('No access token available')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
          if (value) acc[key] = value
          return acc
        }, {} as Record<string, string>)
      )

      const response = await fetch(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.facade.findings}?${params}`,
        {
          headers: getAuthHeaders(accessToken),
        }
      )

      if (response.status === 401) {
        try {
          await refresh()
          return fetchFindings()
        } catch {
          logout()
          throw new Error('Authentication failed')
        }
      }

      if (!response.ok) {
        throw new Error('Failed to fetch facade findings')
      }

      const data: FacadeFindingsResponse = await response.json()
      setFindings(data.findings)
      setTotal(data.total)
      setSummary(data.summary)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch facade findings'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [accessToken, filters, logout, refresh])

  useEffect(() => {
    if (autoFetch && accessToken) {
      fetchFindings()
    }
  }, [autoFetch, accessToken, fetchFindings])

  return {
    findings,
    total,
    summary,
    isLoading,
    error,
    refresh: fetchFindings,
  }
}
