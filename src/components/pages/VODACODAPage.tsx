import { ProductPage } from './ProductPage'
import { FilmStrip, Atom, Cpu, FileVideo } from '@phosphor-icons/react'

export default function VODACODAPage() {
  return (
    <ProductPage
      eyebrow="NEPA PLATFORM · VIDEO INTELLIGENCE"
      title="VODA / CODA — Video Intelligence Pipeline"
      subtitle="VODA analyzes video with neuromorphic precision. CODA turns every alert into a cinematic evidence report. Together they form a fully automated video intelligence SaaS — from raw frames to boardroom-ready output."
      features={[
        {
          icon: <Atom size={40} />,
          title: 'NEPA-First Adaptive Processing',
          description:
            'Fast path for normal frames, LLM consultation only when anomaly score or quality triggers fire. Dramatically reduces API cost while preserving maximum intelligence on critical moments.',
        },
        {
          icon: <Cpu size={40} />,
          title: 'Neuromorphic Video Analysis',
          description:
            'Every frame feeds the SignatureMap. Every anomaly trains the DopamineModulator. The system builds a continuously-learning model of behavior — frame by frame, store by store.',
        },
        {
          icon: <FileVideo size={40} />,
          title: 'Cinematic Evidence Reports',
          description:
            'Every alert auto-generates a narrated video evidence report via ffmpeg + edge-tts. Daily summaries delivered to the operator. Weekly trend reports with STDP-learned patterns.',
        },
        {
          icon: <FilmStrip size={40} />,
          title: 'CODA Report Distribution',
          description:
            'Reports delivered as narrated MP4 + JSON payload with anomaly score, fired triggers, predicted state, and LLM consultation results. Boardroom-ready output, automated.',
        },
      ]}
      integrationTitle="How VODA/CODA Connects to NEPA Core"
      integrationDescription="SaaS-first video intelligence pipeline with automated evidence reports. Deploy in cloud SaaS or self-hosted environments with deterministic audit trails."
    />
  )
}
