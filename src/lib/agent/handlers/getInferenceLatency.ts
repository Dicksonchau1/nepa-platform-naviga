import type { ToolContext } from '../tools'
export async function getInferenceLatency(_input: {}, ctx: ToolContext) {
  const res = await fetch(`${ctx.nepaApiBase}/metrics/latency`, { signal: AbortSignal.timeout(5000) })
  if (!res.ok) throw new Error(`nepa-api /metrics/latency returned ${res.status}`)
  return res.json()
}
