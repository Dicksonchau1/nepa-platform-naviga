/**
 * useFacadeFindings — rewritten to use Supabase directly.
 * Reads from inspection_findings + buildings tables.
 * Replaces old REST call to /facade/findings.
 */
import { useState, useCallback, useEffect } from 'react'
import { supabase, InspectionFinding } from '@/lib/supabase'

interface FacadeFindingFilters {
  buildingId?: string
  severity?: string
  status?: string
  startDate?: string
  endDate?: string
}

interface UseFacadeFindingsOptions {
  filters?: FacadeFindingFilters
  autoFetch?: boolean
}

export function useFacadeFindings(options: UseFacadeFindingsOptions = {}) {
  const { filters = {}, autoFetch = true } = options

  const [findings, setFindings] = useState<InspectionFinding[]>([])
  const [total, setTotal] = useState(0)
  const [summary, setSummary] = useState({
    totalBuildings: 0,
    openDefects: 0,
    criticalCount: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFindings = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Query findings with building join
      let q = supabase
        .from('inspection_findings')
        .select('*, buildings(name)', { count: 'exact' })
        .order('created_at', { ascending: false })

      if (filters.buildingId) q = q.eq('building_id', filters.buildingId)
      if (filters.severity) q = q.eq('severity', filters.severity as any)
      if (filters.status) q = q.eq('status', filters.status as any)
      if (filters.startDate) q = q.gte('created_at', filters.startDate)
      if (filters.endDate) q = q.lte('created_at', filters.endDate)

      const { data, count, error: queryError } = await q

      if (queryError) throw new Error(queryError.message)

      setFindings(data ?? [])
      setTotal(count ?? 0)

      // Get building count
      const { count: buildingCount } = await supabase
        .from('buildings')
        .select('id', { count: 'exact', head: true })

      // Compute summary
      const open = (data ?? []).filter((f) => f.status === 'open').length
      const critical = (data ?? []).filter((f) => f.severity === 'critical').length

      setSummary({
        totalBuildings: buildingCount ?? 0,
        openDefects: open,
        criticalCount: critical,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch facade findings'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [filters.buildingId, filters.severity, filters.status, filters.startDate, filters.endDate])

  useEffect(() => {
    if (autoFetch) {
      fetchFindings()
    }
  }, [autoFetch, fetchFindings])

  return {
    findings,
    total,
    summary,
    isLoading,
    error,
    refresh: fetchFindings,
  }
}
