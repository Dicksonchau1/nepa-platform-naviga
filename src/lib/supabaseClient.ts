/**
 * Supabase Client — single instance for the entire app.
 * Uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from .env
 * RLS is enabled on all tables — auth session is automatically injected.
 */
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment variables. ' +
    'Copy .env.example to .env and fill in your Supabase credentials.'
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

/** Helper to get typed table references */
export type Tables = Database['public']['Tables']
export type Enums = Database['public']['Enums']

/** Row types for convenience */
export type Site = Tables['sites']['Row']
export type Camera = Tables['cameras']['Row']
export type Alert = Tables['alerts']['Row']
export type AuditLogEntry = Tables['audit_log']['Row']
export type UserProfile = Tables['user_profiles']['Row']
export type DailyStat = Tables['daily_stats']['Row']
export type Shelf = Tables['shelves']['Row']
export type RetailAlert = Tables['retail_alerts']['Row']
export type Robot = Tables['robots']['Row']
export type Mission = Tables['missions']['Row']
export type RobotTelemetry = Tables['robot_telemetry']['Row']
export type Drone = Tables['drones']['Row']
export type Building = Tables['buildings']['Row']
export type FlightPlan = Tables['flight_plans']['Row']
export type InspectionFinding = Tables['inspection_findings']['Row']
export type ServiceStatus = Tables['service_status']['Row']

/** Portal type enum */
export type PortalType = Enums['portal_type']
