/**
 * DeveloperMode — shared Developer Mode tab content for all portals.
 * Sections: API Reference, API Keys, Webhooks.
 */
import { useCallback, useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase } from '@/lib/supabase'
import { createApiKey, revokeApiKey, listApiKeys } from '@/lib/apiKeys'

// ─── Types ────────────────────────────────────────────────────────────────────

type PortalId = 'drone_inspect' | 'facility_watch' | 'robotic_ops' | 'voda'

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  description: string
  curl: string
}

interface ApiKeyRow {
  id: string
  label: string
  key_prefix: string
  created_at: string
  last_used_at: string | null
  revoked_at: string | null
}

interface WebhookRow {
  id: string
  url: string
  events: string[]
  is_active: boolean
  last_delivery_at: string | null
  last_status: number | null
  signing_secret: string
  created_at: string
}

// ─── Per-portal endpoint definitions ─────────────────────────────────────────

const ENDPOINTS: Record<PortalId, ApiEndpoint[]> = {
  drone_inspect: [
    {
      method: 'GET',
      path: '/api/v1/foda/drones',
      description: 'List all drones in your fleet',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/foda/drones \\
  -H "Authorization: Bearer <YOUR_API_KEY>"`,
    },
    {
      method: 'GET',
      path: '/api/v1/foda/drones/{id}',
      description: 'Get details for a specific drone',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/foda/drones/{id} \\
  -H "Authorization: Bearer <YOUR_API_KEY>"`,
    },
    {
      method: 'POST',
      path: '/api/v1/foda/flight-plans',
      description: 'Create a new flight plan',
      curl: `curl -X POST https://api.aurasense.ai/api/v1/foda/flight-plans \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"drone_id":"<id>","building_id":"<id>","scheduled_at":"2025-01-01T09:00:00Z"}'`,
    },
    {
      method: 'GET',
      path: '/api/v1/foda/flight-plans/{id}/findings',
      description: 'Retrieve inspection findings for a flight plan',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/foda/flight-plans/{id}/findings \\
  -H "Authorization: Bearer <YOUR_API_KEY>"`,
    },
    {
      method: 'POST',
      path: '/api/v1/foda/buildings',
      description: 'Register a new building for inspection',
      curl: `curl -X POST https://api.aurasense.ai/api/v1/foda/buildings \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Tower A","address":"123 Main St","floor_count":20,"height_m":80}'`,
    },
  ],
  facility_watch: [
    {
      method: 'GET',
      path: '/api/v1/soda/cameras',
      description: 'List all cameras across your facilities',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/soda/cameras \\
  -H "Authorization: Bearer <YOUR_API_KEY>"`,
    },
    {
      method: 'POST',
      path: '/api/v1/soda/cameras/{id}/snapshot',
      description: 'Capture an on-demand snapshot from a camera',
      curl: `curl -X POST https://api.aurasense.ai/api/v1/soda/cameras/{id}/snapshot \\
  -H "Authorization: Bearer <YOUR_API_KEY>"`,
    },
    {
      method: 'GET',
      path: '/api/v1/soda/alerts',
      description: 'Stream retail alerts via Server-Sent Events (SSE)',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/soda/alerts \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Accept: text/event-stream"`,
    },
    {
      method: 'GET',
      path: '/api/v1/soda/shelves',
      description: 'List all shelves and their stock levels',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/soda/shelves \\
  -H "Authorization: Bearer <YOUR_API_KEY>"`,
    },
    {
      method: 'POST',
      path: '/api/v1/soda/alerts/{id}/ack',
      description: 'Acknowledge an open retail alert',
      curl: `curl -X POST https://api.aurasense.ai/api/v1/soda/alerts/{id}/ack \\
  -H "Authorization: Bearer <YOUR_API_KEY>"`,
    },
  ],
  robotic_ops: [
    {
      method: 'GET',
      path: '/api/v1/roda/robots',
      description: 'List all robots in the fleet',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/roda/robots \\
  -H "Authorization: Bearer <YOUR_API_KEY>"`,
    },
    {
      method: 'POST',
      path: '/api/v1/roda/missions',
      description: 'Create and dispatch a new robot mission',
      curl: `curl -X POST https://api.aurasense.ai/api/v1/roda/missions \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"robot_id":"<id>","mission_type":"patrol","waypoints":[]}'`,
    },
    {
      method: 'GET',
      path: '/api/v1/roda/robots/{id}/telemetry',
      description: 'Stream live telemetry for a robot (SSE)',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/roda/robots/{id}/telemetry \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Accept: text/event-stream"`,
    },
    {
      method: 'POST',
      path: '/api/v1/roda/robots/{id}/command',
      description: 'Send a real-time command to a robot',
      curl: `curl -X POST https://api.aurasense.ai/api/v1/roda/robots/{id}/command \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"command":"stop"}'`,
    },
    {
      method: 'GET',
      path: '/api/v1/roda/missions/{id}/status',
      description: 'Get current status and progress of a mission',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/roda/missions/{id}/status \\
  -H "Authorization: Bearer <YOUR_API_KEY>"`,
    },
  ],
  voda: [
    {
      method: 'POST',
      path: '/api/v1/voda/sessions',
      description: 'Start a new VODA processing session',
      curl: `curl -X POST https://api.aurasense.ai/api/v1/voda/sessions \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"mode":"diagnose","source_url":"https://example.com/input.mp4"}'`,
    },
    {
      method: 'GET',
      path: '/api/v1/voda/sessions/{id}',
      description: 'Get the current status of a VODA session',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/voda/sessions/{id} \\
  -H "Authorization: Bearer <YOUR_API_KEY>"`,
    },
    {
      method: 'POST',
      path: '/api/v1/voda/sessions/{id}/enhance',
      description: 'Trigger video enhancement on an existing session',
      curl: `curl -X POST https://api.aurasense.ai/api/v1/voda/sessions/{id}/enhance \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"profile":"ultra"}'`,
    },
    {
      method: 'GET',
      path: '/api/v1/voda/sessions/{id}/report',
      description: 'Download the CODA quality report for a completed session',
      curl: `curl -X GET https://api.aurasense.ai/api/v1/voda/sessions/{id}/report \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  --output report.pdf`,
    },
  ],
}

const METHOD_COLOR: Record<string, string> = {
  GET:    'bg-blue-500/15 text-blue-400 border-blue-500/30',
  POST:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  PUT:    'bg-amber-500/15 text-amber-400 border-amber-500/30',
  PATCH:  'bg-purple-500/15 text-purple-400 border-purple-500/30',
  DELETE: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [text])
  return (
    <Button size="sm" variant="outline" onClick={copy} className="shrink-0 text-xs h-7 px-2">
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  )
}

// ─── API Reference section ────────────────────────────────────────────────────

function ApiReference({ portal }: { portal: PortalId }) {
  const endpoints = ENDPOINTS[portal]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">API Reference</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Authenticate every request with{' '}
          <code className="mono text-xs bg-muted px-1 py-0.5 rounded">Authorization: Bearer &lt;YOUR_API_KEY&gt;</code>.
          Base URL: <code className="mono text-xs bg-muted px-1 py-0.5 rounded">https://api.aurasense.ai</code>
        </p>
      </div>
      <div className="space-y-3">
        {endpoints.map((ep) => (
          <Card key={ep.path} className="p-4 bg-card/50 backdrop-blur-xl border-border/50 space-y-3">
            <div className="flex items-start gap-3 flex-wrap">
              <span
                className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-mono font-semibold ${METHOD_COLOR[ep.method]}`}
              >
                {ep.method}
              </span>
              <code className="mono text-sm font-medium break-all">{ep.path}</code>
            </div>
            <p className="text-sm text-muted-foreground">{ep.description}</p>
            <div className="relative">
              <pre className="mono text-xs bg-muted/60 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all pr-16">
                {ep.curl}
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text={ep.curl} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── API Keys section ─────────────────────────────────────────────────────────

function ApiKeysSection({ portal }: { portal: PortalId }) {
  const [keys, setKeys] = useState<ApiKeyRow[]>([])
  const [loading, setLoading] = useState(true)
  const [generateOpen, setGenerateOpen] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [generating, setGenerating] = useState(false)
  const [newFullKey, setNewFullKey] = useState<string | null>(null)
  const [revoking, setRevoking] = useState<string | null>(null)

  const loadKeys = useCallback(async () => {
    setLoading(true)
    try {
      const data = await listApiKeys(portal)
      setKeys((data ?? []) as ApiKeyRow[])
    } catch (err) {
      console.error('Failed to load API keys:', err)
    } finally {
      setLoading(false)
    }
  }, [portal])

  useEffect(() => { void loadKeys() }, [loadKeys])

  const handleGenerate = async () => {
    if (!newLabel.trim()) return
    setGenerating(true)
    try {
      const { fullKey } = await createApiKey(portal, newLabel.trim())
      setNewFullKey(fullKey)
      setNewLabel('')
      await loadKeys()
    } catch (err) {
      console.error('Failed to create API key:', err)
    } finally {
      setGenerating(false)
    }
  }

  const handleRevoke = async (id: string) => {
    setRevoking(id)
    try {
      await revokeApiKey(id)
      await loadKeys()
    } catch (err) {
      console.error('Failed to revoke API key:', err)
    } finally {
      setRevoking(null)
    }
  }

  const activeKeys = keys.filter((k) => !k.revoked_at)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">API Keys</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Keys are scoped to this portal. The full key is shown once — save it immediately.
          </p>
        </div>
        <Button onClick={() => { setNewFullKey(null); setGenerateOpen(true) }} size="sm">
          Generate new key
        </Button>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground py-8 text-center">Loading keys…</div>
      ) : activeKeys.length === 0 ? (
        <Card className="p-8 text-center bg-card/50 border-border/50 border-dashed">
          <p className="text-sm text-muted-foreground">No active API keys. Generate one to get started.</p>
        </Card>
      ) : (
        <Card className="bg-card/50 border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-3 text-muted-foreground font-medium">Label</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Key prefix</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Created</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Last used</th>
                  <th className="text-left p-3 text-muted-foreground font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {activeKeys.map((key) => (
                  <tr key={key.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20">
                    <td className="p-3 font-medium">{key.label}</td>
                    <td className="p-3">
                      <code className="mono text-xs bg-muted px-2 py-1 rounded">{key.key_prefix}••••••••</code>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">
                      {new Date(key.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">
                      {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive/30 hover:bg-destructive/10 h-7 text-xs"
                        disabled={revoking === key.id}
                        onClick={() => void handleRevoke(key.id)}
                      >
                        {revoking === key.id ? 'Revoking…' : 'Revoke'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Generate dialog */}
      <Dialog open={generateOpen} onOpenChange={(open) => { if (!open) { setNewFullKey(null) } setGenerateOpen(open) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate API Key</DialogTitle>
            <DialogDescription>
              Give this key a label so you can identify it later. The full key is shown only once.
            </DialogDescription>
          </DialogHeader>
          {newFullKey ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 space-y-3">
                <p className="text-sm font-medium text-amber-400">Save this key — it will not be shown again.</p>
                <div className="relative">
                  <code className="mono text-xs break-all block bg-muted rounded p-3 pr-16">{newFullKey}</code>
                  <div className="absolute top-2 right-2">
                    <CopyButton text={newFullKey} />
                  </div>
                </div>
              </div>
              <Button className="w-full" onClick={() => { setNewFullKey(null); setGenerateOpen(false) }}>
                I've saved my key — close
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Key label</label>
                <Input
                  placeholder="e.g. Production backend, CI pipeline…"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') void handleGenerate() }}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setGenerateOpen(false)}>Cancel</Button>
                <Button onClick={() => void handleGenerate()} disabled={!newLabel.trim() || generating}>
                  {generating ? 'Generating…' : 'Generate'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Webhooks section ─────────────────────────────────────────────────────────

function WebhooksSection({ portal }: { portal: PortalId }) {
  const [webhooks, setWebhooks] = useState<WebhookRow[]>([])
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [newEvents, setNewEvents] = useState('')
  const [adding, setAdding] = useState(false)
  const [revealSecret, setRevealSecret] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const loadWebhooks = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('webhooks')
        .select('*')
        .eq('portal', portal)
        .order('created_at', { ascending: false })
      if (error) throw error
      setWebhooks((data ?? []) as WebhookRow[])
    } catch (err) {
      console.error('Failed to load webhooks:', err)
    } finally {
      setLoading(false)
    }
  }, [portal])

  useEffect(() => { void loadWebhooks() }, [loadWebhooks])

  const generateSigningSecret = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(32))
    return 'whsec_' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
  }

  const handleAdd = async () => {
    if (!newUrl.trim()) return
    setAdding(true)
    try {
      const events = newEvents.split(',').map((e) => e.trim()).filter(Boolean)
      const signing_secret = generateSigningSecret()
      const { error } = await supabase.from('webhooks').insert({
        portal,
        url: newUrl.trim(),
        events: events.length ? events : ['*'],
        signing_secret,
        is_active: true,
      })
      if (error) throw error
      setNewUrl('')
      setNewEvents('')
      setAddOpen(false)
      await loadWebhooks()
    } catch (err) {
      console.error('Failed to add webhook:', err)
    } finally {
      setAdding(false)
    }
  }

  const handleToggle = async (id: string, is_active: boolean) => {
    try {
      await supabase.from('webhooks').update({ is_active: !is_active }).eq('id', id)
      await loadWebhooks()
    } catch (err) {
      console.error('Failed to toggle webhook:', err)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await supabase.from('webhooks').delete().eq('id', id)
      await loadWebhooks()
    } catch (err) {
      console.error('Failed to delete webhook:', err)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Webhooks</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Receive real-time event notifications at your endpoint. Each webhook has a unique HMAC signing secret.
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)} size="sm">
          Add webhook
        </Button>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground py-8 text-center">Loading webhooks…</div>
      ) : webhooks.length === 0 ? (
        <Card className="p-8 text-center bg-card/50 border-border/50 border-dashed">
          <p className="text-sm text-muted-foreground">No webhooks configured. Add one to start receiving events.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {webhooks.map((hook) => (
            <Card key={hook.id} className="p-4 bg-card/50 backdrop-blur-xl border-border/50 space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`h-2 w-2 rounded-full shrink-0 ${hook.is_active ? 'bg-emerald-500' : 'bg-muted-foreground'}`}
                  />
                  <code className="mono text-sm break-all">{hook.url}</code>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => void handleToggle(hook.id, hook.is_active)}
                  >
                    {hook.is_active ? 'Disable' : 'Enable'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                    disabled={deleting === hook.id}
                    onClick={() => void handleDelete(hook.id)}
                  >
                    {deleting === hook.id ? 'Deleting…' : 'Delete'}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {hook.events.map((ev) => (
                  <Badge key={ev} variant="outline" className="text-xs">
                    {ev}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Signing secret:</span>
                {revealSecret === hook.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <code className="mono text-xs bg-muted px-2 py-1 rounded break-all flex-1">
                      {hook.signing_secret}
                    </code>
                    <CopyButton text={hook.signing_secret} />
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setRevealSecret(null)}>
                      Hide
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-muted-foreground"
                    onClick={() => setRevealSecret(hook.id)}
                  >
                    Reveal
                  </Button>
                )}
              </div>

              {hook.last_delivery_at && (
                <p className="text-xs text-muted-foreground">
                  Last delivery: {new Date(hook.last_delivery_at).toLocaleString()}
                  {hook.last_status != null && (
                    <span className={hook.last_status >= 200 && hook.last_status < 300 ? ' text-emerald-400' : ' text-rose-400'}>
                      {' '}({hook.last_status})
                    </span>
                  )}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add webhook dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Webhook</DialogTitle>
            <DialogDescription>
              Enter the HTTPS endpoint that should receive event payloads. A unique signing secret will be generated automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Endpoint URL</label>
              <Input
                placeholder="https://your-server.com/webhooks/aurasense"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Events <span className="text-muted-foreground font-normal">(comma-separated, or leave blank for all)</span></label>
              <Input
                placeholder="finding.created, drone.landed, mission.completed"
                value={newEvents}
                onChange={(e) => setNewEvents(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button onClick={() => void handleAdd()} disabled={!newUrl.trim() || adding}>
                {adding ? 'Adding…' : 'Add webhook'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Main DeveloperMode component ─────────────────────────────────────────────

const PORTAL_LABELS: Record<PortalId, string> = {
  drone_inspect: 'FODA',
  facility_watch: 'SODA',
  robotic_ops: 'RODA',
  voda: 'VODA',
}

interface DeveloperModeProps {
  portal: PortalId
}

export function DeveloperMode({ portal }: DeveloperModeProps) {
  return (
    <div className="p-8 space-y-2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Developer Mode</h2>
        <p className="text-muted-foreground mt-1">
          {PORTAL_LABELS[portal]} REST API reference, key management, and webhook configuration.
        </p>
      </div>

      <Tabs defaultValue="api-reference" className="space-y-6">
        <TabsList>
          <TabsTrigger value="api-reference">API Reference</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="api-reference" className="space-y-4">
          <ApiReference portal={portal} />
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <ApiKeysSection portal={portal} />
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <WebhooksSection portal={portal} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
