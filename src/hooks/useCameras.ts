import { supabase, Camera } from '@/lib/supabaseClient'
import { useSupabaseQuery } from './useSupabaseQuery'
import { useRealtimeTable } from './useRealtimeSubscription'

export function useCameras(siteId?: string) {
  const query = useSupabaseQuery<Camera>(
    () => {
      let q = supabase.from('cameras').select('*').order('name')
      if (siteId) q = q.eq('site_id', siteId)
      return q
    },
    [siteId]
  )

  // Live updates — camera status changes in realtime
  const liveData = useRealtimeTable<Camera>(
    'cameras',
    query.data,
    siteId ? `site_id=eq.${siteId}` : undefined
  )

  return {
    ...query,
    data: liveData,
  }
}
