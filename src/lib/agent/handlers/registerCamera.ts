import { createClient } from '@supabase/supabase-js'
import type { ToolContext } from '../tools'

interface Input {
  name: string
  rtsp_url: string
  location?: string
  agent_type?: 'SODA' | 'FODA' | 'VODA' | 'RODA' | 'NEPA'
  fps_target?: number
}

export async function registerCamera(input: Input, ctx: ToolContext) {
  const sb = createClient(ctx.supabaseUrl, ctx.supabaseServiceKey, { auth: { persistSession: false } })

  // Basic RTSP URL sanity (don't hit network — agent shouldn't probe arbitrary endpoints)
  if (!/^(rtsp|rtsps|http|https):\/\//i.test(input.rtsp_url)) {
    throw new Error('rtsp_url must start with rtsp://, rtsps://, http://, or https://')
  }

  const { data, error } = await sb
    .from('cameras')
    .insert({
      name: input.name,
      rtsp_url: input.rtsp_url,
      location: input.location,
      agent_type: input.agent_type ?? 'NEPA',
      fps_target: input.fps_target ?? 5,
      owner_id: ctx.operatorId,         // null for anonymous, real uuid when authed
      status: 'PROVISIONED',
    })
    .select('id,name,agent_type,status,rtsp_url,location,fps_target,created_at')
    .single()

  if (error) throw new Error(error.message)
  return { ok: true, camera: data, next_step: 'The ingestion worker will pick this up on its next poll. Status will move PROVISIONED → LIVE once the first frame is received.' }
}
