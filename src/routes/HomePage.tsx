
import React from 'react';
import { Link } from 'react-router-dom';
import { CountUp } from '@/components/CountUp';
import heroVideo from '/assets/home-hero-DBs3qkXq.mp4';

export function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-[#0B0F14] overflow-x-hidden">
      {/* HERO SECTION */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14]/80 via-[#0B0F14]/60 to-black/90 -z-10" />
        <div className="absolute inset-0 pointer-events-none select-none" style={{backgroundImage:'linear-gradient(to right,rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'40px 40px',opacity:0.18}} />
        <div className="container mx-auto px-6 max-w-5xl text-center py-32 flex flex-col items-center justify-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
            <span className="font-mono text-xs tracking-[2px] text-white/40 uppercase">AURASENSE</span>
            <span className="font-mono text-xs tracking-[2px] text-primary uppercase">· Video Agent</span>
          </div>
          <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-white mb-2">NEPA</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-6">Neuromorphic Edge Perception Agent</h2>
          <p className="text-lg text-[#cdd3de] mb-8 max-w-2xl mx-auto">Deterministic inference at the edge. No cloud. No latency. No compromise. Built for autonomous retail, aerial inspection, and robotic delivery operations across Asia-Pacific.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to="/dashboard" className="px-8 py-4 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-colors text-center">Launch NEPA Console →</Link>
            <Link to="/about/contact" className="px-8 py-4 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors text-center">Request pilot access</Link>
          </div>
          {/* Live metrics row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden max-w-3xl mx-auto mt-12">
            <div className="bg-zinc-950 px-6 py-5 flex flex-col items-center">
              <span className="font-mono text-[10px] tracking-[2px] uppercase text-primary mb-1">Inference Latency</span>
              <span className="text-2xl font-bold text-[#cdd3de]">&lt;<CountUp target={42} suffix="ms" /></span>
              <span className="text-xs text-white/55">live edge benchmark</span>
            </div>
            <div className="bg-zinc-950 px-6 py-5 flex flex-col items-center">
              <span className="font-mono text-[10px] tracking-[2px] uppercase text-primary mb-1">Edge Nodes Active</span>
              <span className="text-2xl font-bold text-[#cdd3de]">12</span>
              <span className="text-xs text-white/55">across HK pilots</span>
            </div>
            <div className="bg-zinc-950 px-6 py-5 flex flex-col items-center">
              <span className="font-mono text-[10px] tracking-[2px] uppercase text-primary mb-1">Audit Events Today</span>
              <span className="text-2xl font-bold text-[#cdd3de]">3,847</span>
              <span className="text-xs text-white/55">signed records</span>
            </div>
          </div>
          <div className="italic text-white/50 mt-8">AuraSense — Perception to Sensation. Orchestration by low latency and inference cost.</div>
        </div>
      </div>

      {/* WHAT NEPA DOES */}
      <section className="border-t border-white/10 py-24 bg-transparent">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">WHAT NEPA DOES</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Three operations. One engine.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">01 · DETECT</div>
              <div className="text-[#cdd3de] font-semibold mb-1">Neuromorphic spike streams</div>
              <div className="text-white/65 text-sm">Anomaly detection at the sensor edge. V-JEPA 2 world modeling fused with spike-timing-dependent plasticity. Sub-millisecond response.</div>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">02 · DECIDE</div>
              <div className="text-[#cdd3de] font-semibold mb-1">Deterministic arbitration</div>
              <div className="text-white/65 text-sm">Three-loop closed control: detect → dispatch → confirm. Every decision traceable, replayable, and bounded by degraded-safe policies.</div>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">03 · DELIVER</div>
              <div className="text-[#cdd3de] font-semibold mb-1">Cryptographic receipts</div>
              <div className="text-white/65 text-sm">Ed25519-signed SignatureMaps. Replay-verified evidence chains. Compliance-ready exports for PDPO, GDPR, and insurance audit.</div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO SURFACES, ONE ENGINE */}
      <section className="border-t border-white/10 py-24 bg-transparent">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">Two surfaces · one engine</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">NEPA is the engine. AuraStudio is how creators experience it.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">ENTERPRISE — VODA</div>
              <div className="text-[#cdd3de] font-semibold mb-1">License the multi-agent orchestration engine.</div>
              <div className="text-white/65 text-sm mb-4">Drives any generative video pipeline needing perception grounding and cryptographic provenance.</div>
              <Link to="/products/voda" className="text-primary font-mono text-xs tracking-[2px] uppercase hover:underline">License VODA →</Link>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">CONSUMER — AuraStudio</div>
              <div className="text-[#cdd3de] font-semibold mb-1">A full crew of AI agents turning your real footage — phone, drone, robot — into production-grade cinema.</div>
              <div className="text-white/65 text-sm mb-4">App Store · End of May 2026.</div>
              <a href="https://aurastudiohk.com" target="_blank" rel="noopener noreferrer" className="text-primary font-mono text-xs tracking-[2px] uppercase hover:underline">Join the waitlist →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR SURFACES */}
      <section className="border-t border-white/10 py-20 bg-zinc-950/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">Four surfaces · one core</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Same NEPA engine. Different operational lenses.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/products/voda" className="bg-zinc-900/40 border border-white/10 rounded-xl p-4 flex flex-col items-center hover:border-primary transition-colors group">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-1">VODA</div>
              <div className="text-[#cdd3de] font-semibold mb-1">Video Operations</div>
              <div className="text-white/65 text-xs">Diagnose · Correct · Govern</div>
            </Link>
            <Link to="/products/soda" className="bg-zinc-900/40 border border-white/10 rounded-xl p-4 flex flex-col items-center hover:border-primary transition-colors group">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-1">SODA</div>
              <div className="text-[#cdd3de] font-semibold mb-1">Store Operations</div>
              <div className="text-white/65 text-xs">Detect · Alert · Audit</div>
            </Link>
            <Link to="/products/foda" className="bg-zinc-900/40 border border-white/10 rounded-xl p-4 flex flex-col items-center hover:border-primary transition-colors group">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-1">FODA</div>
              <div className="text-[#cdd3de] font-semibold mb-1">Facade Operations</div>
              <div className="text-white/65 text-xs">Drone · Replay · Seal</div>
            </Link>
            <Link to="/products/roda" className="bg-zinc-900/40 border border-white/10 rounded-xl p-4 flex flex-col items-center hover:border-primary transition-colors group">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-1">RODA</div>
              <div className="text-[#cdd3de] font-semibold mb-1">Robotic Dispatch</div>
              <div className="text-white/65 text-xs">Detect · Dispatch · Confirm</div>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/10 py-24 bg-transparent">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">FROM PERCEPTION TO SENSATION</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Without empathy, how intelligent can it be?</h2>
          <div className="text-[#cdd3de] mb-8">AuraSense is the first AI company whose core metric is perception accuracy, not attention extraction. That distinction is our competitive advantage, our technical thesis, and our moral foundation.</div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/agent" className="px-8 py-4 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-colors text-center">Try the NEPA Agent →</Link>
            <Link to="/about/contact" className="px-8 py-4 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors text-center">Talk to AuraSense</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
