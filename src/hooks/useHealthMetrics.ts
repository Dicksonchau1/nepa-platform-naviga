import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { API_CONFIG, getAuthHeaders } from '@/config/api'
import { LiveIntelligence } from '@/types/nepa'

export function useHealthMetrics(pollInterval?: number) {
  const { accessToken, logout, refresh } = useAuth()
  
  const [intelligence, setIntelligence] = useState<LiveIntelligence | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = useCallback(async () => {
    if (!accessToken) {
      setError('No access token available')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.metrics.live}`,
        {
          headers: getAuthHeaders(accessToken),
        }
      )

      if (response.status === 401) {
        try {
          await refresh()
          return fetchMetrics()
        } catch {
          logout()
          throw new Error('Authentication failed')
        }
      }

      if (!response.ok) {
        throw new Error('Failed to fetch health metrics')
      }

      const data: LiveIntelligence = await response.json()
      setIntelligence(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch health metrics'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [accessToken, logout, refresh])

  useEffect(() => {
    if (accessToken) {
      fetchMetrics()

      if (pollInterval && pollInterval > 0) {
        const interval = setInterval(fetchMetrics, pollInterval)
        return () => clearInterval(interval)
      }
    }
  }, [accessToken, pollInterval, fetchMetrics])

  return {
    intelligence,
    isLoading,
    error,
    refresh: fetchMetrics,
  }
}
