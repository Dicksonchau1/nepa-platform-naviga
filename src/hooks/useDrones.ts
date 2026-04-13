import { supabase, Drone, Building, FlightPlan, InspectionFinding } from '@/lib/supabaseClient'
import { useSupabaseQuery } from './useSupabaseQuery'
import { useRealtimeTable } from './useRealtimeSubscription'

export function useDrones(siteId?: string) {
  const query = useSupabaseQuery<Drone>(
    () => {
      let q = supabase.from('drones').select('*').order('name')
      if (siteId) q = q.eq('site_id', siteId)
      return q
    },
    [siteId]
  )

  return {
    ...query,
    flyingCount: query.data.filter((d) => d.status === 'flying').length,
  }
}

export function useBuildings(siteId?: string) {
  return useSupabaseQuery<Building>(
    () => {
      let q = supabase.from('buildings').select('*').order('name')
      if (siteId) q = q.eq('site_id', siteId)
      return q
    },
    [siteId]
  )
}

export function useFlightPlans(buildingId?: string, droneId?: string) {
  return useSupabaseQuery<FlightPlan>(
    () => {
      let q = supabase.from('flight_plans')
        .select('*, buildings(name), drones(name)')
        .order('created_at', { ascending: false })
      if (buildingId) q = q.eq('building_id', buildingId)
      if (droneId) q = q.eq('drone_id', droneId)
      return q
    },
    [buildingId, droneId]
  )
}

export function useInspectionFindings(buildingId?: string, severity?: string) {
  return useSupabaseQuery<InspectionFinding>(
    () => {
      let q = supabase.from('inspection_findings')
        .select('*, buildings(name), flight_plans(name)')
        .order('created_at', { ascending: false })
      if (buildingId) q = q.eq('building_id', buildingId)
      if (severity) q = q.eq('severity', severity as any)
      return q
    },
    [buildingId, severity]
  )
}
