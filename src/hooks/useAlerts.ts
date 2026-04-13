import { supabase, Alert, RetailAlert } from '@/lib/supabaseClient'
import { useSupabaseQuery } from './useSupabaseQuery'
import { useRealtimeTable } from './useRealtimeSubscription'
import type { PortalType } from '@/lib/supabaseClient'

/** System-wide alerts (cross-portal) */
export function useAlerts(portal?: PortalType, siteId?: string) {
  const query = useSupabaseQuery<Alert>(
    () => {
      let q = supabase.from('alerts').select('*').order('created_at', { ascending: false }).limit(50)
      if (portal) q = q.eq('portal', portal)
      if (siteId) q = q.eq('site_id', siteId)
      return q
    },
    [portal, siteId]
  )

  const liveData = useRealtimeTable<Alert>('alerts', query.data)

  return {
    ...query,
    data: liveData,
    openCount: liveData.filter((a) => a.status === 'open').length,
    criticalCount: liveData.filter((a) => a.severity === 'critical').length,
  }
}

/** Retail-specific alerts (SODA/VODA) */
export function useRetailAlerts(siteId?: string) {
  const query = useSupabaseQuery<RetailAlert>(
    () => {
      let q = supabase.from('retail_alerts').select('*, cameras(name), shelves(name)')
        .order('created_at', { ascending: false }).limit(50)
      if (siteId) q = q.eq('site_id', siteId)
      return q
    },
    [siteId]
  )

  const liveData = useRealtimeTable<RetailAlert>('retail_alerts', query.data)

  return {
    ...query,
    data: liveData,
  }
}
