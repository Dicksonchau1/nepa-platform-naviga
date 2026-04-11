import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LiveBadge } from '@/components/LiveBadge'

type Role = 'user' | 'agent'
type AttachmentType = 'video-file' | 'video-url' | 'image'

type Attachment = {
  type: AttachmentType
  name: string
  preview?: string
  url?: string
}

type Message = {
  id: string
  role: Role
  content: string
  timestamp: Date
  attachment?: Attachment
  thinking?: boolean
  agentUsed?: string
}

const SUGGESTIONS = [
  {
    icon: '🎥',
    label: 'Analyse a video feed',
    prompt: 'Upload a video and run VODA inference to detect people, objects, and anomalies.',
  },
  {
    icon: '🏪',
    label: 'Set up unmanned retail monitoring',
    prompt: 'How do I configure SODA for an unmanned retail store with 4 cameras and shelf tracking?',
  },
  {
    icon: '🏗️',
    label: 'Run a facade inspection',
    prompt: 'I want to inspect a building facade for BRS defects using FODA. How do I start?',
  },
  {
    icon: '🤖',
    label: 'Configure a robot mission',
    prompt: 'Set up a RODA delivery mission for an autonomous robot navigating a retail floor.',
  },
]

const AGENT_RESPONSES: Record<string, { agent: string; response: string }> = {
  default: {
    agent: 'NEPA',
    response: `I'm NEPA — the AuraSense edge AI assistant. I can help you:

- **Analyse video footage** using VODA (Video Agent)
- **Set up facility surveillance** using SODA (Surveillance Agent)
- **Configure drone inspections** using FODA (Facade Agent)
- **Plan robot missions** using RODA (Robotic Agent)
- **Deploy edge inference** using EODA (Edge Agent)

Upload a video file, paste a video URL, or describe what you want to detect — and I'll route your request to the right NEPA agent.`,
  },
  video: {
    agent: 'VODA',
    response: `**VODA** is processing your video input.

Running inference pipeline:
\`\`\`
> LOADING MODEL     : YOLOv8 + TensorRT
> RESOLUTION        : 1920×1080
> INFERENCE_RT      : 34ms per frame
> CLASSES_ACTIVE    : person, object, anomaly, zone
> AUDIT_CHAIN       : SHA-256 enabled
\`\`\`

**Detections found:**
- 👤 3× Person — tracked across frames
- 📦 Shelf zone — monitored, stock at 68%
- ⚠️ Dwell time exceeded — Camera 2, 00:47s
- ✅ No anomalies detected

Every detection has been written to your audit ledger with SHA-256 hash, confidence score, and millisecond timestamp. Would you like to export the full audit log as JSON?`,
  },
  retail: {
    agent: 'SODA',
    response: `**SODA** can configure your unmanned retail setup in the following steps:

**1. Camera registration**
Register each camera by RTSP URL or local device ID in the FacilityWatch console. SODA supports up to 16 concurrent streams.

**2. Zone configuration**
Define zones per camera — entrance, aisle, POS, stock room. Each zone gets its own alert thresholds.

**3. Shelf setup**
Add your shelf and aisle layout. SODA tracks visual stock levels and fires low-stock alerts at your configured threshold (default: 20%).

**4. Alert routing**
Configure severity levels (critical / warning / info) per event type: loitering, crowd density, unauthorised access, shelf empty, dwell time exceeded.

**5. Go live**
SODA begins inference immediately on-device. All events appear in the FacilityWatch alert feed within one inference cycle (<40ms).

Want me to generate a configuration template for your 4-camera setup?`,
  },
  facade: {
    agent: 'FODA',
    response: `**FODA** — Facade Agent — handles aerial structural inspection via drone.

**Pre-flight checklist:**
\`\`\`
> DRONE_CONNECTED   : awaiting pairing
> CAMERA_RESOLUTION : 4K / 30fps
> INFERENCE_MODEL   : BRS + Concealment v2.1
> AUDIT_CHAIN       : SHA-256 enabled
> FLIGHT_ZONE       : not yet configured
\`\`\`

**To start a facade inspection:**
1. Pair your drone via the FODA console
2. Define the building polygon and floor count
3. FODA auto-generates the flight path for full facade coverage
4. Inference runs on-device during flight — BRS detection, concealment analysis, structural defect classification
5. A full inspection report with GPS-tagged findings is written to your audit ledger on completion

Upload an existing facade video or connect your drone to begin. What building are you inspecting?`,
  },
  robot: {
    agent: 'RODA',
    response: `**RODA** — Robotic Agent — handles autonomous navigation and mission orchestration.

**Mission setup:**
\`\`\`
> ROBOT_CONNECTED   : awaiting pairing
> MAP_LOADED        : not yet configured
> MISSION_TYPE      : delivery / patrol / inspection
> OBSTACLE_AVOID    : enabled
> AUDIT_CHAIN       : SHA-256 enabled
\`\`\`

**To configure a delivery mission:**
1. Upload your floor plan or let RODA map the environment via SLAM
2. Define pickup and delivery waypoints
3. Set obstacle avoidance sensitivity and speed profile
4. RODA executes the mission autonomously — logging every waypoint, stop, and event to the audit ledger
5. Mission complete events trigger notifications in the NEPA console

What type of robot are you deploying and what is the floor plan dimensions?`,
  },
}

function routeToAgent(text: string, hasAttachment: boolean): { agent: string; response: string } {
  const t = text.toLowerCase()
  if (hasAttachment || t.includes('video') || t.includes('upload') || t.includes('voda') || t.includes('detect'))
    return AGENT_RESPONSES.video
  if (t.includes('retail') || t.includes('shelf') || t.includes('soda') || t.includes('store') || t.includes('camera'))
    return AGENT_RESPONSES.retail
  if (t.includes('facade') || t.includes('foda') || t.includes('drone') || t.includes('inspect') || t.includes('brs'))
    return AGENT_RESPONSES.facade
  if (t.includes('robot') || t.includes('roda') || t.includes('mission') || t.includes('delivery') || t.includes('navigate'))
    return AGENT_RESPONSES.robot
  return AGENT_RESPONSES.default
}

function uid() {
  return Math.random().toString(36).slice(2)
}

function formatContent(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('```') || line.startsWith('> ')) {
      return (
        <div key={i} className="font-mono text-[11px] text-cyan-300/80 bg-[#050508] border border-white/8 px-3 py-1 my-0.5 rounded">
          {line.replace(/^```|^> /, '')}
        </div>
      )
    }
    if (line.startsWith('**') && line.includes('**', 2)) {
      const content = line.replace(/\*\*/g, '')
      return <p key={i} className="font-semibold text-white/90 mt-3 mb-1">{content}</p>
    }
    if (line.startsWith('- ') || line.match(/^\d+\./)) {
      return (
        <div key={i} className="flex items-start gap-2 text-white/60 text-sm leading-relaxed">
          <span className="text-cyan-400/50 shrink-0 mt-0.5">
            {line.startsWith('- ') ? '·' : line.match(/^(\d+)\./)?.[1] + '.'}
          </span>
          <span>{line.replace(/^- |\d+\.\s/, '')}</span>
        </div>
      )
    }
    if (line.trim() === '') return <div key={i} className="h-1" />
    return <p key={i} className="text-white/60 text-sm leading-relaxed">{line}</p>
  })
}

export function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [attachment, setAttachment] = useState<Attachment | null>(null)
  const [isThinking, setIsThinking] = useState(false)
  const [agent, setAgent] = useState<string | null>(null)

  const fileRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = 'auto'
      textRef.current.style.height = Math.min(textRef.current.scrollHeight, 160) + 'px'
    }
  }, [input])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const isVideo = file.type.startsWith('video/')
    const isImage = file.type.startsWith('image/')
    setAttachment({
      type: isVideo ? 'video-file' : isImage ? 'image' : 'video-file',
      name: file.name,
      preview: URL.createObjectURL(file),
    })
    setShowUrlInput(false)
  }

  const handleUrlSubmit = () => {
    if (!videoUrl.trim()) return
    setAttachment({
      type: 'video-url',
      name: videoUrl,
      url: videoUrl,
    })
    setShowUrlInput(false)
    setVideoUrl('')
  }

  const clearAttachment = () => {
    setAttachment(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text && !attachment) return

    const userMsg: Message = {
      id: uid(),
      role: 'user',
      content: text || (attachment ? `Analysing: ${attachment.name}` : ''),
      timestamp: new Date(),
      attachment: attachment ?? undefined,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setAttachment(null)
    if (fileRef.current) fileRef.current.value = ''
    setIsThinking(true)

    await new Promise((r) => setTimeout(r, 1400 + Math.random() * 800))

    const { agent: agentName, response } = routeToAgent(text, !!attachment)
    setAgent(agentName)

    const agentMsg: Message = {
      id: uid(),
      role: 'agent',
      content: response,
      timestamp: new Date(),
      agentUsed: agentName,
    }
    setMessages((prev) => [...prev, agentMsg])
    setIsThinking(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSuggestion = (prompt: string) => {
    setInput(prompt)
    textRef.current?.focus()
  }

  const isEmpty = messages.length === 0

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col">

      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#050508]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="#00C8F0" strokeWidth="1.5"/>
                <polygon points="14,7 21,10.5 21,17.5 14,21 7,17.5 7,10.5" fill="#00C8F015" stroke="#00C8F0" strokeWidth="1"/>
                <circle cx="14" cy="14" r="2.5" fill="#00C8F0"/>
              </svg>
              <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                AuraSense
              </span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-sm text-white/50">NEPA Agent</span>
          </div>

          <div className="flex items-center gap-3">
            {agent && (
              <div className="flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 rounded">
                <span className="font-mono text-[10px] text-cyan-400/70 tracking-widest">
                  ROUTING TO
                </span>
                <span className="font-mono text-[11px] font-bold text-cyan-400">
                  {agent}
                </span>
              </div>
            )}
            <LiveBadge />
            <Link
              to="/dashboard"
              className="text-xs border border-white/15 text-white/50 px-3 py-1.5 hover:border-white/30 hover:text-white/80 transition-colors font-mono"
            >
              Console
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pt-20 pb-48">

        {isEmpty && (
          <div className="flex-1 flex flex-col items-center justify-center py-20">

            <div className="mb-8 relative">
              <div
                className="w-20 h-20 rounded-full border border-cyan-500/20 flex items-center justify-center"
                style={{ boxShadow: '0 0 40px rgba(0,212,255,0.08)' }}
              >
                <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                  <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="#00C8F0" strokeWidth="1.5"/>
                  <polygon points="14,7 21,10.5 21,17.5 14,21 7,17.5 7,10.5" fill="#00C8F015" stroke="#00C8F0" strokeWidth="1"/>
                  <circle cx="14" cy="14" r="2.5" fill="#00C8F0"/>
                </svg>
              </div>
              <div
                className="absolute inset-0 rounded-full border border-cyan-500/10"
                style={{ animation: 'spin 12s linear infinite' }}
              />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 text-center">
              Hello, I'm NEPA
            </h1>
            <p className="text-white/40 text-center max-w-md leading-relaxed mb-12 text-sm">
              Your edge AI agent for video intelligence, facility surveillance,
              facade inspection, and robotic mission control. Upload a video,
              paste a URL, or describe what you need.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSuggestion(s.prompt)}
                  className="flex flex-col items-start gap-2 border border-white/8 bg-[#0A0D14] hover:bg-[#0E1118] hover:border-white/15 rounded-xl p-4 text-left transition-all group"
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors leading-snug">
                    {s.label}
                  </span>
                  <span className="text-xs text-white/30 leading-relaxed line-clamp-2">
                    {s.prompt}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
              <span className="text-xs text-white/25 mr-1">Powered by</span>
              {['VODA', 'SODA', 'FODA', 'RODA', 'EODA'].map((a) => (
                <span
                  key={a}
                  className="font-mono text-[10px] text-cyan-400/50 bg-cyan-400/5 border border-cyan-400/15 px-2.5 py-1 rounded"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {!isEmpty && (
          <div className="flex-1 space-y-6 py-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

                {msg.role === 'agent' && (
                  <div className="shrink-0 w-8 h-8 rounded-full border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center mt-1">
                    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                      <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="#00C8F0" strokeWidth="1.5"/>
                      <circle cx="14" cy="14" r="2.5" fill="#00C8F0"/>
                    </svg>
                  </div>
                )}

                <div className={`flex flex-col gap-2 max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>

                  {msg.role === 'agent' && msg.agentUsed && (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-cyan-400/60 tracking-widest">
                        {msg.agentUsed}
                      </span>
                      <span className="text-[10px] text-white/20">
                        {msg.timestamp.toLocaleTimeString('en-HK', { hour12: false })}
                      </span>
                    </div>
                  )}

                  {msg.role === 'user' && (
                    <span className="text-[10px] text-white/20 font-mono">
                      {msg.timestamp.toLocaleTimeString('en-HK', { hour12: false })}
                    </span>
                  )}

                  {msg.attachment && (
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0A0D14] max-w-xs">
                      {msg.attachment.type === 'video-file' && msg.attachment.preview && (
                        <video
                          src={msg.attachment.preview}
                          className="w-full max-h-40 object-cover"
                          muted
                          onLoadedMetadata={(e) => {
                            const video = e.currentTarget
                            video.play()
                            video.addEventListener('ended', () => {
                              video.pause()
                            }, { once: true })
                          }}
                        />
                      )}
                      {msg.attachment.type === 'image' && msg.attachment.preview && (
                        <img
                          src={msg.attachment.preview}
                          alt="attachment"
                          className="w-full max-h-40 object-cover"
                        />
                      )}
                      <div className="px-3 py-2 flex items-center gap-2 border-t border-white/8">
                        <span className="text-white/30 text-lg">
                          {msg.attachment.type === 'video-url' ? '🔗' : '🎥'}
                        </span>
                        <span className="text-xs text-white/50 truncate font-mono">
                          {msg.attachment.type === 'video-url'
                            ? msg.attachment.url
                            : msg.attachment.name}
                        </span>
                      </div>
                    </div>
                  )}

                  {msg.content && (
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-[#0E1118] border border-white/10 text-white/80 text-sm leading-relaxed'
                          : 'bg-transparent text-white/70'
                      }`}
                    >
                      {msg.role === 'agent'
                        ? <div className="space-y-1">{formatContent(msg.content)}</div>
                        : msg.content
                      }
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center mt-1 text-xs font-bold text-black">
                    U
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-4 justify-start">
                <div className="shrink-0 w-8 h-8 rounded-full border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center">
                  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                    <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="#00C8F0" strokeWidth="1.5"/>
                    <circle cx="14" cy="14" r="2.5" fill="#00C8F0"/>
                  </svg>
                </div>
                <div className="flex items-center gap-1 px-4 py-3 bg-[#0A0D14] border border-white/8 rounded-2xl">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400/60"
                      style={{ animation: `thinking-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#050508] via-[#050508]/95 to-transparent pt-6 pb-6 px-4">
        <div className="max-w-4xl mx-auto">

          {attachment && (
            <div className="mb-3 flex items-center gap-3 bg-[#0A0D14] border border-white/10 rounded-xl px-4 py-3">
              <span className="text-white/40 text-lg shrink-0">
                {attachment.type === 'video-url' ? '🔗' : '🎥'}
              </span>
              <span className="text-xs text-white/50 font-mono truncate flex-1">
                {attachment.type === 'video-url' ? attachment.url : attachment.name}
              </span>
              <button
                onClick={clearAttachment}
                className="text-white/30 hover:text-white/60 transition-colors text-sm shrink-0"
              >
                ✕
              </button>
            </div>
          )}

          {showUrlInput && (
            <div className="mb-3 flex items-center gap-2 bg-[#0A0D14] border border-white/10 rounded-xl px-4 py-2">
              <span className="text-white/30 text-sm shrink-0">🔗</span>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleUrlSubmit() }}
                placeholder="Paste YouTube, RTSP, or direct video URL…"
                className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/20 focus:outline-none font-mono"
                autoFocus
              />
              <button
                onClick={handleUrlSubmit}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-mono shrink-0 border border-cyan-500/30 px-3 py-1 hover:bg-cyan-500/10"
              >
                Add
              </button>
              <button
                onClick={() => setShowUrlInput(false)}
                className="text-white/25 hover:text-white/50 transition-colors text-sm shrink-0"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex items-end gap-3 bg-[#0A0D14] border border-white/12 rounded-2xl px-4 py-3 focus-within:border-white/25 transition-colors">

            <div className="flex items-center gap-1 shrink-0 mb-0.5">
              <button
                onClick={() => fileRef.current?.click()}
                title="Upload video or image"
                className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 rounded-lg transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </button>

              <button
                onClick={() => { setShowUrlInput((v) => !v); setAttachment(null) }}
                title="Paste video URL"
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                  showUrlInput
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </button>
            </div>

            <textarea
              ref={textRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask NEPA — describe what you want to detect, inspect, or configure…"
              rows={1}
              className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/25 focus:outline-none resize-none leading-relaxed py-1 max-h-40"
              style={{ scrollbarWidth: 'none' }}
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim() && !attachment}
              className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all mb-0.5 ${
                input.trim() || attachment
                  ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          <p className="text-center text-[11px] text-white/20 mt-3 font-mono">
            NEPA runs inference on-device · No data sent to cloud · Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="video/*,image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <style>{`
        @keyframes thinking-dot {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(-3px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
