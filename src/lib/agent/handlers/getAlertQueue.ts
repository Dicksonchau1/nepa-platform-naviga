import { createClient } from '@supabase/supabase-js'
import type { ToolContext } from '../tools'

interface Input { limit?: number; severity?: string; since_minutes?: number }

export async function getAlertQueue(input: Input, ctx: ToolContext) {
  const sb = createClient(ctx.supabaseUrl, ctx.supabaseServiceKey, { auth: { persistSession: false } })
  let q = sb.from('alerts').select('*').order('created_at', { ascending: false }).limit(input.limit ?? 10)
  if (input.severity) q = q.eq('severity', input.severity)
  if (input.since_minutes) {
    const since = new Date(Date.now() - input.since_minutes * 60_000).toISOString()
    q = q.gte('created_at', since)
  }
  const { data, error } = await q
  if (error) throw new Error(error.message)
  return data
}
