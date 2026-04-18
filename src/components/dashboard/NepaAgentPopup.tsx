import { useState, useRef, useEffect, useCallback } from 'react'
import { Brain, X, PaperPlaneRight, ChatDots } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  askNepaAgent,
  getRotatingTip,
  type NepaAgentMessage,
} from '@/lib/nepaAgent'

export function NepaAgentPopup() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<NepaAgentMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isMock, setIsMock] = useState(false)
  const [tip, setTip] = useState(() => getRotatingTip())
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Rotate tip every 8 s
  useEffect(() => {
    const id = setInterval(() => setTip(getRotatingTip()), 8000)
    return () => clearInterval(id)
  }, [])

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      // Reset conversation on close
      setMessages([])
      setIsMock(false)
    }
  }, [open])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: NepaAgentMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await askNepaAgent(messages, text)
      const assistantMsg: NepaAgentMessage = {
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistantMsg])
      if (response.mock) setIsMock(true)
    } catch {
      const errorMsg: NepaAgentMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Tip bubble — shown when closed and there are no messages */}
        {!open && (
          <div className="max-w-[220px] rounded-lg bg-[#0a0a12] border border-cyan-500/20 px-3 py-2 text-xs text-cyan-300/70 mono shadow-lg shadow-black/40 animate-fade-in">
            {tip}
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          title="NEPA Agent"
          className={cn(
            'group relative flex items-center gap-2 rounded-full px-4 py-3',
            'bg-[#050508] border border-cyan-500/30 shadow-lg shadow-black/50',
            'text-cyan-400 hover:text-cyan-200 hover:border-cyan-400/60',
            'transition-all duration-200 hover:shadow-cyan-500/20 hover:shadow-xl',
            !open && 'animate-pulse-slow'
          )}
        >
          {open ? (
            <X size={20} weight="bold" />
          ) : (
            <Brain size={20} weight="duotone" />
          )}
          <span className="text-sm font-medium mono tracking-wide">NEPA Agent</span>
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          className={cn(
            'fixed bottom-24 right-6 z-50',
            'w-[420px] max-w-[calc(100vw-1.5rem)]',
            'rounded-xl border border-cyan-500/20 bg-[#050508] shadow-2xl shadow-black/60',
            'flex flex-col',
            'animate-slide-up'
          )}
          style={{ height: '75vh', maxHeight: '640px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 shrink-0">
            <div className="flex items-center gap-2">
              <Brain size={18} weight="duotone" className="text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-200 mono">NEPA Agent</span>
              {isMock && (
                <Badge
                  variant="outline"
                  className="text-[10px] border-cyan-500/30 text-cyan-400/70 mono px-1.5 py-0"
                >
                  Demo mode
                </Badge>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-cyan-300 transition-colors"
            >
              <X size={16} weight="bold" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 overflow-hidden">
            <div
              ref={scrollRef}
              className="flex flex-col gap-3 p-4 overflow-y-auto h-full"
              style={{ maxHeight: '100%' }}
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full py-12 gap-3 text-center">
                  <ChatDots size={36} weight="duotone" className="text-cyan-500/40" />
                  <p className="text-sm text-muted-foreground">Ask NEPA anything about our products, pricing, or compliance.</p>
                  <p className="text-xs text-cyan-400/50 mono">{tip}</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex gap-2 max-w-[85%]',
                    msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                  )}
                >
                  {msg.role === 'assistant' && (
                    <div className="shrink-0 w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mt-0.5">
                      <Brain size={14} weight="duotone" className="text-cyan-400" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'rounded-xl px-3 py-2 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-cyan-500/15 border border-cyan-500/25 text-cyan-100'
                        : 'bg-white/5 border border-white/8 text-foreground/90'
                    )}
                  >
                    <p>{msg.content}</p>
                    <p className={cn(
                      'text-[10px] mt-1 mono',
                      msg.role === 'user' ? 'text-cyan-400/50 text-right' : 'text-muted-foreground/50'
                    )}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex gap-2 self-start max-w-[85%]">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mt-0.5">
                    <Brain size={14} weight="duotone" className="text-cyan-400" />
                  </div>
                  <div className="rounded-xl px-4 py-3 bg-white/5 border border-white/8 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="shrink-0 flex items-center gap-2 px-3 py-3 border-t border-cyan-500/20">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about NEPA, pricing, compliance…"
              disabled={loading}
              className={cn(
                'flex-1 bg-white/5 border border-cyan-500/20 rounded-lg px-3 py-2',
                'text-sm text-foreground placeholder:text-muted-foreground/50',
                'focus:outline-none focus:border-cyan-500/50 focus:ring-0',
                'disabled:opacity-50 transition-colors mono'
              )}
            />
            <Button
              size="sm"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="shrink-0 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 hover:text-cyan-100 px-3"
              variant="outline"
            >
              <PaperPlaneRight size={16} weight="fill" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
