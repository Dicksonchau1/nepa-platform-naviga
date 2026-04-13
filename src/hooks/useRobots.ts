import { supabase, Robot, Mission, RobotTelemetry } from '@/lib/supabaseClient'
import { useSupabaseQuery } from './useSupabaseQuery'
import { useRealtimeTable } from './useRealtimeSubscription'

export function useRobots(siteId?: string) {
  const query = useSupabaseQuery<Robot>(
    () => {
      let q = supabase.from('robots').select('*').order('name')
      if (siteId) q = q.eq('site_id', siteId)
      return q
    },
    [siteId]
  )

  const liveData = useRealtimeTable<Robot>('robots', query.data)

  return {
    ...query,
    data: liveData,
    activeCount: liveData.filter((r) => r.status === 'active').length,
  }
}

export function useMissions(siteId?: string, robotId?: string) {
  return useSupabaseQuery<Mission>(
    () => {
      let q = supabase.from('missions').select('*, robots(name)').order('created_at', { ascending: false })
      if (siteId) q = q.eq('site_id', siteId)
      if (robotId) q = q.eq('robot_id', robotId)
      return q
    },
    [siteId, robotId]
  )
}

export function useRobotTelemetry(robotId: string, limit = 100) {
  return useSupabaseQuery<RobotTelemetry>(
    () =>
      supabase
        .from('robot_telemetry')
        .select('*')
        .eq('robot_id', robotId)
        .order('ts', { ascending: false })
        .limit(limit),
    [robotId, limit],
    { enabled: !!robotId }
  )
}
