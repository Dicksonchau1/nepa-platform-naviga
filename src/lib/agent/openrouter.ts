/**
 * OpenRouter client — speaks OpenAI Chat Completions API
 * with Anthropic/OpenAI/Google models behind it.
 */
import OpenAI from 'openai'

const apiKey = process.env.OPENROUTER_API_KEY
if (!apiKey) {
  throw new Error('OPENROUTER_API_KEY missing in environment (.env)')
}

export const openrouter = new OpenAI({
  apiKey,
  baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    // OpenRouter uses these for analytics + request attribution
    'HTTP-Referer': process.env.NEPA_AGENT_REFERER || 'https://www.aurasensehk.com',
    'X-Title':     process.env.NEPA_AGENT_APP_TITLE || 'AuraSense NEPA Agent',
  },
})

export const AGENT_MODEL    = process.env.NEPA_AGENT_MODEL || 'anthropic/claude-sonnet-4.5'
export const FALLBACK_MODEL = process.env.NEPA_AGENT_FALLBACK_MODEL || 'openai/gpt-5-mini'
export const AGENT_MAX_TOKENS = parseInt(process.env.NEPA_AGENT_MAX_TOKENS || '4096', 10)
