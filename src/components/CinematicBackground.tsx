import { useEffect, useState } from 'react'

export function CinematicBackground() {
  return (
    <div className="page-bg">
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />
    </div>
  )
}

interface NodeData {
  label: string
  value: string
  x: string
  y: string
}

const nodePositions: NodeData[] = [
  { label: 'Latency', value: '<2ms', x: '12%', y: '25%' },
  { label: 'Throughput', value: '1840 fps', x: '85%', y: '30%' },
  { label: 'Accuracy', value: '99.4%', x: '15%', y: '65%' },
  { label: 'Nodes Active', value: '47', x: '82%', y: '70%' },
  { label: 'Power Draw', value: '8.2W', x: '50%', y: '18%' },
]

export function FloatingNodes() {
  return (
    <div className="node-field">
      {nodePositions.map((node, idx) => (
        <div
          key={idx}
          className="node-card"
          style={{ left: node.x, top: node.y }}
        >
          <div className="node-dot" />
          <div className="node-label">{node.label}</div>
          <div className="node-value">{node.value}</div>
        </div>
      ))}
    </div>
  )
}

export function ScopeLines() {
  return (
    <div className="scope-lines">
      <div className="scope-line scope-line-1" />
      <div className="scope-line scope-line-2" />
      <div className="scope-line scope-line-3" />
    </div>
  )
}

export function ScrollHUD() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / documentHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sectionIndex = Math.floor(scrollProgress * 5) + 1
  const totalSections = 5

  return (
    <div className="scroll-hud">
      <div className="scroll-hud-ring" />
      <div className="scroll-hud-text">
        {String(sectionIndex).padStart(2, '0')}/{String(totalSections).padStart(2, '0')} · Scroll down
      </div>
    </div>
  )
}

export function ScanlineOverlay() {
  return <div className="scanline-overlay" />
}

interface TickerItem {
  name: string
}

const partners: TickerItem[] = [
  { name: 'NVIDIA PARTNER' },
  { name: 'AWS INFRASTRUCTURE' },
  { name: 'ISO 27001 CERTIFIED' },
  { name: 'SOC 2 TYPE II' },
  { name: 'EDGE COMPUTING COUNCIL' },
  { name: 'NEUROMORPHIC AI CONSORTIUM' },
]

export function TickerBar() {
  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {partners.concat(partners).map((partner, idx) => (
          <div key={idx} className="ticker-item">
            {partner.name}
          </div>
        ))}
      </div>
    </div>
  )
}

interface StatData {
  num: string
  label: string
}

const stats: StatData[] = [
  { num: '<2ms', label: 'Inference Latency' },
  { num: '99.4%', label: 'Deterministic Accuracy' },
  { num: '8.2W', label: 'Edge Power Draw' },
  { num: '1840', label: 'Frames Per Second' },
]

export function StatStrip() {
  return (
    <div className="stat-strip">
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-item">
          <div className="stat-num">{stat.num}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
