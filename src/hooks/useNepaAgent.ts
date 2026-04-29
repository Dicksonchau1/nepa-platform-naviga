import { useCallback, useEffect, useRef, useState } from 'react'

export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  role: ChatRole
  content: string
  timestamp?: string
  model?: string
}

interface ApiResponse {
  sessionId: string
  content: string
  model: string
  error?: string
}

const SESSION_KEY = 'nepa-agent-session-id'
const HISTORY_KEY = 'nepa-agent-history'
const MAX_HISTORY = 20

export function useNepaAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sessionIdRef = useRef<string | null>(null)

  // Load persisted session on mount
  useEffect(() => {
    try {
      const sid = localStorage.getItem(SESSION_KEY)
      const hist = localStorage.getItem(HISTORY_KEY)
      if (sid) sessionIdRef.current = sid
      if (hist) {
        const parsed = JSON.parse(hist) as ChatMessage[]
        if (Array.isArray(parsed)) setMessages(parsed.slice(-MAX_HISTORY))
      }
    } catch {}
  }, [])

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)))
    } catch {}
  }, [messages])

  const send = useCallback(async (userText: string) => {
    if (!userText.trim() || isLoading) return

    setError(null)
    setIsLoading(true)

    const userMsg: ChatMessage = {
      role: 'user',
      content: userText,
      timestamp: new Date().toISOString(),
    }

    // Optimistic add
    const newHistory = [...messages, userMsg]
    setMessages(newHistory)

    try {
      const apiMessages = newHistory.map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          sessionId: sessionIdRef.current,
        }),
        signal: AbortSignal.timeout(60_000),
      })

      const data = (await res.json()) as ApiResponse

      if (!res.ok || data.error) {
        throw new Error(data.error || `agent returned ${res.status}`)
      }

      sessionIdRef.current = data.sessionId
      try { localStorage.setItem(SESSION_KEY, data.sessionId) } catch {}

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.content || '(no content)',
          model: data.model,
          timestamp: new Date().toISOString(),
        },
      ])
    } catch (err: any) {
      const msg = err?.message ?? 'agent request failed'
      setError(msg)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ ${msg}`,
          timestamp: new Date().toISOString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, messages])

  const reset = useCallback(() => {
    setMessages([])
    setError(null)
    sessionIdRef.current = null
    try {
      localStorage.removeItem(SESSION_KEY)
      localStorage.removeItem(HISTORY_KEY)
    } catch {}
  }, [])

  return { messages, isLoading, error, send, reset, sessionId: sessionIdRef.current }
}
