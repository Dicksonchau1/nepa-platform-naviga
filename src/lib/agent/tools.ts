import { z } from 'zod'
import type { ChatCompletionTool } from 'openai/resources/chat/completions'

import { getNodeStatus }       from './handlers/getNodeStatus'
import { getActiveLanes }      from './handlers/getActiveLanes'
import { getAlertQueue }       from './handlers/getAlertQueue'
import { getAuditEvents }      from './handlers/getAuditEvents'
import { getInferenceLatency } from './handlers/getInferenceLatency'
import { runVodaDiagnostic }   from './handlers/runVodaDiagnostic'
import { findSimilarFrames }   from './handlers/findSimilarFrames'
import { registerCamera }      from './handlers/registerCamera'

export interface ToolContext {
  operatorId: string | null
  sessionId: string
  supabaseUrl: string
  supabaseServiceKey: string
  nepaApiBase: string
  vodaApiBase: string
}

export interface ToolDef<TInput = any, TOutput = any> {
  name: string
  description: string
  parameters: Record<string, any>
  validator: z.ZodType<TInput>
  handler: (input: TInput, ctx: ToolContext) => Promise<TOutput>
}

export const TOOL_REGISTRY: Record<string, ToolDef> = {
  nepa_get_node_status: {
    name: 'nepa_get_node_status',
    description: 'Returns ACTIVE/STANDBY/OFFLINE status, latency, and last-heartbeat for every NEPA edge node.',
    parameters: { type: 'object', properties: {}, required: [] },
    validator: z.object({}),
    handler: getNodeStatus,
  },

  nepa_get_active_lanes: {
    name: 'nepa_get_active_lanes',
    description: 'Returns every currently-running inference lane: camera_id, name, agent_type (SODA/FODA/VODA/RODA/NEPA), status (LIVE/PAUSED), fps, freshness (FRESH/STALE/NEVER), seconds since last frame.',
    parameters: { type: 'object', properties: {}, required: [] },
    validator: z.object({}),
    handler: getActiveLanes,
  },

  nepa_get_alert_queue: {
    name: 'nepa_get_alert_queue',
    description: 'Returns recent alerts from the alert_queue, optionally filtered by severity, agent, or time range.',
    parameters: {
      type: 'object',
      properties: {
        limit: { type: 'integer', default: 10 },
        severity: { type: 'string', enum: ['low','medium','high','critical'] },
        since_minutes: { type: 'integer' },
      },
    },
    validator: z.object({
      limit: z.number().int().min(1).max(100).optional().default(10),
      severity: z.enum(['low','medium','high','critical']).optional(),
      since_minutes: z.number().int().positive().optional(),
    }),
    handler: getAlertQueue,
  },

  nepa_get_audit_events: {
    name: 'nepa_get_audit_events',
    description: 'Queries audit_log for operator actions, agent tool calls, system events. Use for chain-of-custody questions.',
    parameters: {
      type: 'object',
      properties: {
        limit: { type: 'integer', default: 20 },
        actor: { type: 'string' },
        since_minutes: { type: 'integer' },
      },
    },
    validator: z.object({
      limit: z.number().int().min(1).max(200).optional().default(20),
      actor: z.string().optional(),
      since_minutes: z.number().int().positive().optional(),
    }),
    handler: getAuditEvents,
  },

  nepa_get_inference_latency: {
    name: 'nepa_get_inference_latency',
    description: 'Returns p50/p95/p99 inference latency in ms, plus per-node breakdown.',
    parameters: { type: 'object', properties: {}, required: [] },
    validator: z.object({}),
    handler: getInferenceLatency,
  },

  nepa_run_voda_diagnostic: {
    name: 'nepa_run_voda_diagnostic',
    description: 'Triggers VODA diagnostic on camera or frame. Returns anomaly score, entities, signature, action recs.',
    parameters: {
      type: 'object',
      properties: {
        camera_id: { type: 'string' },
        frame_id:  { type: 'string' },
      },
      required: ['camera_id'],
    },
    validator: z.object({
      camera_id: z.string().uuid(),
      frame_id:  z.string().uuid().optional(),
    }),
    handler: runVodaDiagnostic,
  },

  nepa_voda_find_similar_frames: {
    name: 'nepa_voda_find_similar_frames',
    description: 'pgvector cosine search over SignatureMap. Finds frames similar to a reference frame.',
    parameters: {
      type: 'object',
      properties: {
        frame_id: { type: 'string' },
        limit:    { type: 'integer', default: 5 },
      },
      required: ['frame_id'],
    },
    validator: z.object({
      frame_id: z.string().uuid(),
      limit:    z.number().int().min(1).max(20).optional().default(5),
    }),
    handler: findSimilarFrames,
  },

  nepa_register_camera: {
    name: 'nepa_register_camera',
    description: 'Registers a new camera in the deployment. Requires a name and RTSP URL. Use when the operator says "add a camera", "register an RTSP feed", or describes a new physical camera to onboard.',
    parameters: {
      type: 'object',
      properties: {
        name:        { type: 'string', description: 'Human-readable name, e.g. "Front entrance"' },
        rtsp_url:    { type: 'string', description: 'Full RTSP URL, e.g. rtsp://user:pass@192.168.1.10:554/stream' },
        location:    { type: 'string', description: 'Physical location label, optional' },
        agent_type:  { type: 'string', enum: ['SODA','FODA','VODA','RODA','NEPA'], description: 'Which NEPA agent should consume this feed. Default NEPA.' },
        fps_target:  { type: 'integer', description: 'Target inference fps. Default 5.' },
      },
      required: ['name', 'rtsp_url'],
    },
    validator: z.object({
      name: z.string().min(1).max(120),
      rtsp_url: z.string().min(7).max(500),
      location: z.string().max(200).optional(),
      agent_type: z.enum(['SODA','FODA','VODA','RODA','NEPA']).optional(),
      fps_target: z.number().int().min(1).max(30).optional(),
    }),
    handler: registerCamera,
  },
}

export function getOpenAITools(): ChatCompletionTool[] {
  return Object.values(TOOL_REGISTRY).map(t => ({
    type: 'function' as const,
    function: { name: t.name, description: t.description, parameters: t.parameters },
  }))
}

export async function executeToolCall(
  name: string,
  rawInput: unknown,
  ctx: ToolContext,
): Promise<string> {
  const tool = TOOL_REGISTRY[name]
  if (!tool) return JSON.stringify({ ok: false, error: `Unknown tool: ${name}` })
  try {
    const validated = tool.validator.parse(rawInput ?? {})
    const t0 = Date.now()
    const result = await tool.handler(validated, ctx)
    return JSON.stringify({ ok: true, latency_ms: Date.now() - t0, result })
  } catch (err: any) {
    return JSON.stringify({ ok: false, error: err?.message ?? String(err) })
  }
}
