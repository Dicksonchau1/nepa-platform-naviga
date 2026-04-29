import type { ToolContext } from '../tools'
export async function getNodeStatus(_input: {}, ctx: ToolContext) {
  const res = await fetch(`${ctx.nepaApiBase}/nodes/status`, { signal: AbortSignal.timeout(5000) })
  if (!res.ok) throw new Error(`nepa-api /nodes/status returned ${res.status}`)
  return res.json()
}
