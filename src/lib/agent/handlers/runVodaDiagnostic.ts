import type { ToolContext } from '../tools'

interface Input { camera_id: string; frame_id?: string }

export async function runVodaDiagnostic(input: Input, ctx: ToolContext) {
  const res = await fetch(`${ctx.vodaApiBase}/voda/diagnose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`voda /voda/diagnose returned ${res.status}: ${text.slice(0, 200)}`)
  }
  return res.json()
}
