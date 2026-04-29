import { createClient } from '@supabase/supabase-js'
import type { ToolContext } from '../tools'

export async function getActiveLanes(_input: {}, ctx: ToolContext) {
  const sb = createClient(ctx.supabaseUrl, ctx.supabaseServiceKey, { auth: { persistSession: false } })

  const { data, error } = await sb
    .from('active_lanes_v')
    .select('camera_id,camera_name,agent_type,status,fps_target,last_frame_at,location,freshness,seconds_since_last_frame')
    .order('status', { ascending: false })
    .order('camera_name', { ascending: true })
    .limit(50)

  if (error) throw new Error(error.message)
  return {
    total: data?.length ?? 0,
    lanes: data ?? [],
  }
}
