import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export interface ProcessingVisualizationProps {
  jobId: string;
  onComplete: (outputUrl: string) => void;
  onFailed: (failureSource: 'user' | 'system', reason: string) => void;
  prompt?: string; // Optional, for prompt echo
}

type AgentName = 'Producer' | 'DP' | 'Lighting' | 'Editor' | 'Stunt' | 'Foley';

const AGENTS: AgentName[] = [
  'Producer',
  'DP',
  'Lighting',
  'Editor',
  'Stunt',
  'Foley',
];

const AGENT_ICONS: Record<AgentName, string> = {
  Producer: '🎬',
  DP: '📷',
  Lighting: '💡',
  Editor: '✂️',
  Stunt: '⚡',
  Foley: '🎵',
};

const STATUS_COLORS = {
  idle: 'border-gray-400',
  active: 'border-blue-400 animate-pulse',
  complete: 'border-green-500',
};

const STATUS_BG = {
  idle: 'bg-gray-700 opacity-40',
  active: 'bg-blue-700',
  complete: 'bg-green-600',
};

const MAX_RECONNECTS = 3;
const NO_EVENT_TIMEOUT = 30000;
const CALCULATING_TIMEOUT = 15000;

interface AgentStatus {
  status: 'idle' | 'active' | 'complete';
  progress: number;
  message: string;
}

interface FrameThumb {
  frameIndex: number;
  thumbnailUrl: string;
}

export const ProcessingVisualization: React.FC<ProcessingVisualizationProps> = ({
  jobId,
  onComplete,
  onFailed,
  prompt,
}) => {
  // Agent state
  const [agentStatuses, setAgentStatuses] = useState<Record<AgentName, 'idle' | 'active' | 'complete'>>({
    Producer: 'idle',
    DP: 'idle',
    Lighting: 'idle',
    Editor: 'idle',
    Stunt: 'idle',
    Foley: 'idle',
  });
  const [agentMessages, setAgentMessages] = useState<Record<AgentName, string>>({
    Producer: '',
    DP: '',
    Lighting: '',
    Editor: '',
    Stunt: '',
    Foley: '',
  });
  const [agentProgress, setAgentProgress] = useState<Record<AgentName, number>>({
    Producer: 0,
    DP: 0,
    Lighting: 0,
    Editor: 0,
    Stunt: 0,
    Foley: 0,
  });

  // Frame state
  const [framesComplete, setFramesComplete] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [frameThumbs, setFrameThumbs] = useState<FrameThumb[]>([]);

  // Time/ETA
  const [etaSeconds, setEtaSeconds] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [calculatingSince, setCalculatingSince] = useState<number | null>(null);

  // Connection
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [reconnecting, setReconnecting] = useState(false);
  const [noEventTimeout, setNoEventTimeout] = useState(false);

  // Banner
  const [showStillWorking, setShowStillWorking] = useState(false);

  // WebSocket ref
  const wsRef = useRef<WebSocket | null>(null);
  const lastEventTime = useRef(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const calcTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Elapsed timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // No event timeout
  useEffect(() => {
    const checkTimeout = () => {
      if (Date.now() - lastEventTime.current > NO_EVENT_TIMEOUT) {
        setShowStillWorking(true);
      } else {
        setShowStillWorking(false);
      }
    };
    const interval = setInterval(checkTimeout, 2000);
    return () => clearInterval(interval);
  }, []);

  // Calculating... fallback
  useEffect(() => {
    if (etaSeconds === null && framesComplete > 0 && totalFrames > 0) {
      if (!calculatingSince) setCalculatingSince(Date.now());
      if (!calcTimeoutRef.current) {
        calcTimeoutRef.current = setTimeout(() => {
          // Fallback to client ETA
          setEtaSeconds(
            framesComplete > 0
              ? Math.round((elapsedSeconds / framesComplete) * (totalFrames - framesComplete))
              : null
          );
        }, CALCULATING_TIMEOUT);
      }
    } else {
      setCalculatingSince(null);
      if (calcTimeoutRef.current) {
        clearTimeout(calcTimeoutRef.current);
        calcTimeoutRef.current = null;
      }
    }
    // eslint-disable-next-line
  }, [etaSeconds, framesComplete, totalFrames, elapsedSeconds]);

  // WebSocket connect/disconnect/retry
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimer: NodeJS.Timeout | null = null;
    let closed = false;

    function connect() {
      ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://api/reconstructions/${jobId}/progress`);
      wsRef.current = ws;
      setIsConnected(true);
      setReconnecting(false);
      ws.onopen = () => {
        setIsConnected(true);
        setReconnecting(false);
        setReconnectAttempts(0);
      };
      ws.onclose = () => {
        setIsConnected(false);
        if (!closed && reconnectAttempts < MAX_RECONNECTS) {
          setReconnecting(true);
          setReconnectAttempts((n) => n + 1);
          reconnectTimer = setTimeout(connect, 1500);
        }
      };
      ws.onerror = () => {
        ws?.close();
      };
      ws.onmessage = (event) => {
        lastEventTime.current = Date.now();
        setShowStillWorking(false);
        const msg = JSON.parse(event.data);
        handleEvent(msg);
      };
    }
    connect();
    return () => {
      closed = true;
      ws?.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
    // eslint-disable-next-line
  }, [jobId]);

  // Disconnect on complete/failed
  const disconnectWS = () => {
    wsRef.current?.close();
  };

  // Handle backend events
  function handleEvent(msg: any) {
    const { event, data } = msg;
    if (event === 'agent_started' || event === 'agent_progress') {
      const agent: AgentName = data.agent;
      setAgentStatuses((s) => ({ ...s, [agent]: 'active' }));
      setAgentProgress((p) => ({ ...p, [agent]: data.progress ?? 0 }));
      setAgentMessages((m) => ({ ...m, [agent]: data.message ?? '' }));
    } else if (event === 'agent_complete') {
      const agent: AgentName = data.agent;
      setAgentStatuses((s) => ({ ...s, [agent]: 'complete' }));
      setAgentProgress((p) => ({ ...p, [agent]: 1 }));
      setAgentMessages((m) => ({ ...m, [agent]: data.message ?? '' }));
    } else if (event === 'frame_complete') {
      setFramesComplete(data.frameIndex);
      setTotalFrames(data.totalFrames);
      setFrameThumbs((thumbs) => [
        ...thumbs,
        { frameIndex: data.frameIndex, thumbnailUrl: data.thumbnailUrl },
      ]);
    } else if (event === 'job_eta_update') {
      setEtaSeconds(data.etaSeconds);
    } else if (event === 'job_complete') {
      disconnectWS();
      onComplete(data.outputUrl);
    } else if (event === 'job_failed') {
      disconnectWS();
      onFailed(data.failureSource, data.failureReason);
    }
  }

  // Cancel handler
  const handleCancel = async () => {
    if (!window.confirm('Cancel? Your credits will be refunded.')) return;
    try {
      await fetch(`/api/reconstructions/${jobId}/cancel`, { method: 'POST' });
    } catch (e) {
      // ignore
    }
  };

  // Prompt echo
  const promptText = prompt ? prompt.slice(0, 100) : '';

  // ETA display logic
  let etaDisplay = 'Calculating...';
  if (framesComplete > 0 && totalFrames > 0) {
    if (etaSeconds !== null) {
      etaDisplay = `Est. remaining: ~${etaSeconds}s`;
    } else if (calculatingSince && Date.now() - calculatingSince > CALCULATING_TIMEOUT) {
      // fallback
      const fallback = framesComplete > 0 ? Math.round((elapsedSeconds / framesComplete) * (totalFrames - framesComplete)) : null;
      etaDisplay = fallback !== null ? `Est. remaining: ~${fallback}s` : 'Calculating...';
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-neutral-900 rounded-xl shadow-lg flex flex-col gap-6">
      {/* Section 1: Prompt echo */}
      <div className="text-white/60 text-sm italic mb-2">Reconstructing: “{promptText}”</div>

      {/* Section 2: Agent crew grid */}
      <div className="grid grid-cols-3 gap-6 md:gap-8">
        {AGENTS.map((agent) => {
          const status = agentStatuses[agent];
          const icon = AGENT_ICONS[agent];
          return (
            <div
              key={agent}
              className={clsx(
                'flex flex-col items-center p-2 rounded-lg transition-all',
                status === 'active' && 'scale-105 shadow-blue-400/40 shadow-lg',
                status === 'complete' && 'opacity-100',
                status === 'idle' && 'opacity-40',
                'relative',
                'data-fade'
              )}
            >
              <div
                className={clsx(
                  'w-14 h-14 flex items-center justify-center rounded-full border-4 mb-2 text-3xl font-bold transition-all',
                  STATUS_COLORS[status],
                  STATUS_BG[status],
                  status === 'active' && 'animate-glow',
                )}
              >
                {icon}
                {status === 'complete' && (
                  <span className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 text-xs">✔️</span>
                )}
              </div>
              <div className="text-white font-semibold text-sm mb-1">{agent}</div>
              <div className="w-16 h-1 bg-neutral-700 rounded overflow-hidden mb-1">
                <div
                  className="h-1 bg-blue-400 transition-all"
                  style={{ width: `${Math.round(agentProgress[agent] * 100)}%` }}
                />
              </div>
              <div className="text-white/70 text-xs truncate w-20" title={agentMessages[agent]}>
                {agentMessages[agent]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 3: Frame progress bar */}
      <div className="mt-2">
        <div className="flex justify-between text-white/70 text-xs mb-1">
          <span>Frames: {framesComplete} / {totalFrames || '?'}</span>
        </div>
        <div className="relative w-full h-4 bg-neutral-800 rounded-full flex items-center overflow-hidden">
          <div
            className="absolute left-0 top-0 h-4 bg-blue-500 transition-all"
            style={{ width: totalFrames ? `${(framesComplete / totalFrames) * 100}%` : '0%' }}
          />
          <div className="flex absolute left-0 top-0 h-4 w-full items-center px-1 gap-1">
            {frameThumbs.map((thumb, i) => (
              <img
                key={thumb.frameIndex}
                src={thumb.thumbnailUrl}
                alt={`Frame ${thumb.frameIndex}`}
                className="w-4 h-4 rounded-full border-2 border-blue-400 bg-neutral-900 object-cover transition-transform animate-slide-in"
                style={{ left: `${(thumb.frameIndex - 1) * (100 / (totalFrames || 1))}%` }}
                data-fade
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Time / ETA row */}
      <div className="flex justify-between items-center mt-2 text-white/80 text-xs">
        <span>Elapsed: {elapsedSeconds}s</span>
        <span>{etaDisplay}</span>
      </div>

      {/* Section 5: Cancel button */}
      <div className="flex justify-end mt-4">
        <button
          className="text-red-400 text-xs underline hover:text-red-300 transition"
          onClick={handleCancel}
        >
          [Cancel reconstruction]
        </button>
      </div>

      {/* Reconnecting/Still working banners */}
      {reconnecting && (
        <div className="absolute left-0 right-0 bottom-0 bg-yellow-900/80 text-yellow-200 text-center py-2 rounded-b-xl">
          Reconnecting to job server...
        </div>
      )}
      {showStillWorking && (
        <div className="absolute left-0 right-0 bottom-0 bg-blue-900/80 text-blue-200 text-center py-2 rounded-b-xl">
          Still working...
        </div>
      )}
    </div>
  );
};

export default ProcessingVisualization;
