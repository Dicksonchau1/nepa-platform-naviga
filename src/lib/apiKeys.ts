import { supabase } from './supabase'

const PREFIX_BY_PORTAL: Record<string, string> = {
  drone_inspect: 'sk_foda_',
  facility_watch: 'sk_soda_',
  robotic_ops: 'sk_roda_',
  voda: 'sk_voda_',
}

// Returns the full key ONCE — this is the only time the plaintext key is seen.
export async function createApiKey(
  portal: 'drone_inspect' | 'facility_watch' | 'robotic_ops' | 'voda',
  label: string
): Promise<{ id: string; fullKey: string }> {
  const randomBytes = crypto.getRandomValues(new Uint8Array(24))
  const body = btoa(String.fromCharCode(...randomBytes))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  const fullKey = PREFIX_BY_PORTAL[portal] + body
  const keyPrefix = fullKey.slice(0, 12)
  const hashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(fullKey))
  const keyHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2,'0')).join('')

  const { data, error } = await supabase
    .from('api_keys')
    .insert({ portal, label, key_prefix: keyPrefix, key_hash: keyHash })
    .select('id')
    .single()
  if (error) throw error
  return { id: data.id, fullKey }
}

export async function revokeApiKey(id: string) {
  const { error } = await supabase
    .from('api_keys')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

export async function listApiKeys(portal: string) {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('portal', portal)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function deleteApiKey(id: string) {
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', id)
  if (error) throw error
}
