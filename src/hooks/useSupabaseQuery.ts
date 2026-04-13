/**
 * Generic Supabase query hook with loading/error states.
 * Wraps any supabase query into a React-friendly hook.
 */
import { useState, useEffect, useCallback, useRef } from 'react'
interface UseSupabaseQueryOptions {
  enabled?: boolean
  pollInterval?: number
}

type SupabaseQueryResult<T> = PromiseLike<{ data: T | null; error: { message: string } | null }>

export function useSupabaseQuery<T>(
  queryFn: () => SupabaseQueryResult<T[]>,
  deps: unknown[] = [],
  options: UseSupabaseQueryOptions = {}
) {
  const { enabled = true, pollInterval } = options
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    if (!enabled) return

    setIsLoading(true)
    setError(null)

    try {
      const { data: result, error: queryError } = await queryFn()

      if (!mountedRef.current) return

      if (queryError) {
        throw new Error(queryError.message)
      }

      setData((result as T[]) ?? [])
    } catch (err) {
      if (!mountedRef.current) return
      const message = err instanceof Error ? err.message : 'Query failed'
      setError(message)
    } finally {
      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [enabled, ...deps])

  useEffect(() => {
    mountedRef.current = true
    fetchData()

    let interval: ReturnType<typeof setInterval> | undefined
    if (pollInterval && pollInterval > 0) {
      interval = setInterval(fetchData, pollInterval)
    }

    return () => {
      mountedRef.current = false
      if (interval) clearInterval(interval)
    }
  }, [fetchData, pollInterval])

  return {
    data,
    isLoading,
    error,
    refresh: fetchData,
  }
}

/** Single-row variant */
export function useSupabaseQuerySingle<T>(
  queryFn: () => SupabaseQueryResult<T>,
  deps: unknown[] = [],
  options: UseSupabaseQueryOptions = {}
) {
  const { enabled = true } = options
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!enabled) return

    setIsLoading(true)
    setError(null)

    try {
      const { data: result, error: queryError } = await queryFn()

      if (queryError) throw new Error(queryError.message)
      setData(result as T)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Query failed'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [enabled, ...deps])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading, error, refresh: fetchData }
}
