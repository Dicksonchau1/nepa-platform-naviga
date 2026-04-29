import { createClient } from '@supabase/supabase-js'
import type { ToolContext } from '../tools'

interface Input { limit?: number; actor?: string; since_minutes?: number }

export async function getAuditEvents(input: Input, ctx: ToolContext) {
  const sb = createClient(ctx.supabaseUrl, ctx.supabaseServiceKey, { auth: { persistSession: false } })
  let q = sb.from('audit_log').select('*').order('created_at', { ascending: false }).limit(input.limit ?? 20)
  if (input.actor) q = q.eq('actor_id', input.actor)
  if (input.since_minutes) {
    const since = new Date(Date.now() - input.since_minutes * 60_000).toISOString()
    q = q.gte('created_at', since)
  }
  const { data, error } = await q
  if (error) throw new Error(error.message)
  return data
}
