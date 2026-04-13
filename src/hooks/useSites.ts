import { supabase, Site } from '@/lib/supabaseClient'
import { useSupabaseQuery } from './useSupabaseQuery'

export function useSites() {
  return useSupabaseQuery<Site>(
    () => supabase.from('sites').select('*').order('name'),
    []
  )
}
