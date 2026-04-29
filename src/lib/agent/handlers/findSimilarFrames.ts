import { createClient } from '@supabase/supabase-js'
import type { ToolContext } from '../tools'

interface Input { frame_id: string; limit?: number }

export async function findSimilarFrames(input: Input, ctx: ToolContext) {
  const sb = createClient(ctx.supabaseUrl, ctx.supabaseServiceKey, { auth: { persistSession: false } })

  // Calls a Postgres RPC defined in step 7 below — voda_find_similar_frames(frame_id, k)
  const { data, error } = await sb.rpc('voda_find_similar_frames', {
    ref_frame_id: input.frame_id,
    k: input.limit ?? 5,
  })
  if (error) throw new Error(error.message)
  return data
}
