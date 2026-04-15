/**
 * Supabase Client — single instance for the entire app.
 * Uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from .env
 * RLS is enabled on all tables — auth session is automatically injected.
 */
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL
const envSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!envSupabaseUrl || !envSupabaseAnonKey) {
  console.warn(
    'Supabase environment variables are missing. Copy .env.example to .env and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  )
}

const supabaseUrl = envSupabaseUrl ?? 'https://example.supabase.co'
const supabaseAnonKey = envSupabaseAnonKey ?? 'public-anon-key'

export const isSupabaseConfigured = Boolean(envSupabaseUrl && envSupabaseAnonKey)

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
