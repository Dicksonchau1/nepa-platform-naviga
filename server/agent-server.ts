import 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'
import { openrouter, AGENT_MODEL, AGENT_MAX_TOKENS, FALLBACK_MODEL } from '../src/lib/agent/openrouter'
import { getOpenAITools, executeToolCall, type ToolContext } from '../src/lib/agent/tools'

const app = express()
app.use(express.json({ limit: '1mb' }))

const PORT = parseInt(process.env.AGENT_PORT || '8010', 10)

const SYSTEM_PROMPT = `You are NEPA Agent, the operational AI for the AuraSense NEPA platform.

You answer ONLY about the operator's live deployment. Call the relevant tool whenever the operator asks about nodes, lanes, alerts, latency, audit events, or VODA diagnostics. Never invent data. After tool results, give a concise structured answer (1-3 sentences plus bullets if needed). Use mono-spaced terminal style for system data.

Today is ${new Date().toISOString()}. Deployment is live.`

app.post('/api/agent/chat', async (req, res) => {
  try {
    const { messages = [], operatorId = null, sessionId = randomUUID() } = req.body ?? {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' })
    }

    const ctx: ToolContext = {
      operatorId,
      sessionId,
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      nepaApiBase: process.env.NEPA_API_BASE || 'http://100.119.159.20:8000',
      vodaApiBase: process.env.VODA_API_BASE || 'http://127.0.0.1:8002',
    }

    const sb = createClient(ctx.supabaseUrl, ctx.supabaseServiceKey, { auth: { persistSession: false } })

    sb.from('audit_log').insert({
      actor_id: operatorId ?? 'anonymous',
      action: 'agent.chat.user_message',
      payload: { session_id: sessionId, message: messages[messages.length - 1] },
    }).then(() => null, () => null)

    const conversation: any[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ]

    let model = AGENT_MODEL
    let finalContent = ''
    const maxIterations = 6

    for (let i = 0; i < maxIterations; i++) {
      let completion
      try {
        completion = await openrouter.chat.completions.create({
          model,
          max_tokens: AGENT_MAX_TOKENS,
          tools: getOpenAITools(),
          tool_choice: 'auto',
          messages: conversation,
        })
      } catch (err: any) {
        if (model !== FALLBACK_MODEL) {
          console.warn(`[agent] ${model} failed, falling back to ${FALLBACK_MODEL}:`, err?.message)
          model = FALLBACK_MODEL
          continue
        }
        throw err
      }

      const choice = completion.choices[0]
      const msg = choice.message

      if (!msg.tool_calls || msg.tool_calls.length === 0) {
        finalContent = msg.content ?? ''
        conversation.push(msg)
        break
      }

      conversation.push(msg)
      for (const tc of msg.tool_calls) {
        const fn = tc.function
        let args: any = {}
        try { args = JSON.parse(fn.arguments || '{}') } catch {}
        const result = await executeToolCall(fn.name, args, ctx)

        sb.from('audit_log').insert({
          actor_id: 'agent',
          action: `agent.tool.${fn.name}`,
          payload: { session_id: sessionId, args, result_preview: result.slice(0, 500) },
        }).then(() => null, () => null)

        conversation.push({
          role: 'tool',
          tool_call_id: tc.id,
          content: result,
        })
      }
    }

    sb.from('audit_log').insert({
      actor_id: 'agent',
      action: 'agent.chat.final_response',
      payload: { session_id: sessionId, response_preview: finalContent.slice(0, 500), model },
    }).then(() => null, () => null)

    res.json({ sessionId, content: finalContent, model })
  } catch (err: any) {
    console.error('[agent] error:', err)
    res.status(500).json({ error: err?.message ?? 'agent failed' })
  }
})

app.get('/api/agent/health', (_req, res) => res.json({ ok: true, model: AGENT_MODEL }))

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`[agent] listening on http://127.0.0.1:${PORT}`)
  console.log(`[agent] model=${AGENT_MODEL} fallback=${FALLBACK_MODEL}`)
})

process.on('SIGTERM', () => { console.log('[agent] SIGTERM'); server.close(() => process.exit(0)) })
process.on('SIGINT',  () => { console.log('[agent] SIGINT');  server.close(() => process.exit(0)) })
