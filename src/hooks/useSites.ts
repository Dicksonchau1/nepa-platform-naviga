import { supabase, Site } from '@/lib/supabase'
import { useSupabaseQuery } from './useSupabaseQuery'

export function useSites() {
  return useSupabaseQuery<Site>(
    () => supabase.from('sites').select('*').order('name'),
    []
  )
}
