import ProductPage from './ProductPage'
import { FilmStrip, Atom, Cpu, FileVideo } from '@phosphor-icons/react'

export default function VODACODAPage() {
  return (
    <ProductPage
      name="VODA / CODA"
      fullName="Video Operation Decision Agent + Cinematic Output & Distribution Agent"
      tagline="VODA analyzes video with neuromorphic precision. CODA turns every alert into a cinematic evidence report. Together they form a fully automated video intelligence SaaS — from raw frames to boardroom-ready output."
      nepaLayer="pipeline"
      nepaLayerLabel="Full NEPA pipeline — perception → analysis → evidence report"
      pipelineSteps={[
        { step: 'ingest', label: 'Raw Frames In', active: true },
        { step: 'nepa', label: 'NEPA Processes', active: true },
        { step: 'fast-path', label: 'Fast Path (normal)', active: true },
        { step: 'llm-gate', label: 'LLM Gate (anomaly)', active: true },
        { step: 'coda', label: 'CODA Report Out', active: true },
      ]}
      ctaLabel="Start VODA/CODA free trial"
      ctaHref="/auth?mode=signup"
      ctaSecondaryLabel="View VODA/CODA API docs"
      ctaSecondaryHref="/docs/voda-coda"
      integrationNote="SaaS — no edge hardware required"
      deployTarget="Cloud SaaS or self-hosted"
      features={[
        {
          icon: Atom,
          title: 'NEPA-First Adaptive Processing',
          description:
            'Fast path for normal frames, LLM consultation only when anomaly score or quality triggers fire. Dramatically reduces API cost while preserving maximum intelligence on critical moments.',
        },
        {
          icon: Cpu,
          title: 'Neuromorphic Video Analysis',
          description:
            'Every frame feeds the SignatureMap. Every anomaly trains the DopamineModulator. The system builds a continuously-learning model of behavior — frame by frame, store by store.',
        },
        {
          icon: FileVideo,
          title: 'Cinematic Evidence Reports',
          description:
            'Every alert auto-generates a narrated video evidence report via ffmpeg + edge-tts. Daily summaries delivered to the operator. Weekly trend reports with STDP-learned patterns.',
        },
        {
          icon: FilmStrip,
          title: 'CODA Report Distribution',
          description:
            'Reports delivered as narrated MP4 + JSON payload with anomaly score, fired triggers, predicted state, and LLM consultation results. Boardroom-ready output, automated.',
        },
      ]}
      terminalLines={[
        '> VODA pipeline ONLINE — processing HK-KLN-01',
        '> frame 0847: fast_path → latency 1.2ms',
        '> frame 0912: anomaly_score=0.87 → LLM gate FIRES',
        '> [LLM] provider: claude | confidence: 0.94',
        '> triggers_fired: ["theft_risk"]',
        '> predicted_state: "zone_3_critical"',
        '> coda_report_queued: true',
        '> [CODA] narrating evidence clip (00:14:32 → 00:14:58)',
        '> [CODA] report delivered: report_HK-KLN-01_0912.mp4',
        '> VODA: resuming fast_path...',
      ]}
    />
  )
import { useNavigate } from 'react-router-dom'
import { VODAPage } from './VODAPage'

export default function VODACODAPage() {
  const navigate = useNavigate()
  return <VODAPage onNavigate={(page) => navigate(`/${page}`)} />
}
