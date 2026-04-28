import React from "react";
import { Link } from "react-router-dom";

export const SODAPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0F14] relative overflow-x-hidden">
      {/* Grid overlay */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-20 select-none" style={{backgroundImage:'linear-gradient(to right,rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'40px 40px'}} />

      {/* 1. Launch Banner */}
      <div className="border-b border-primary/20 bg-gradient-to-r from-primary/10 py-2.5 text-center text-primary font-semibold tracking-wide text-xs uppercase" data-fade>
        FIELD PILOT END OF MAY 2026 · REQUEST EARLY ACCESS
      </div>

      {/* 2. Hero Section */}
      <section className="max-w-6xl mx-auto py-24 px-6 sm:px-10" data-fade>
        <div className="mb-6">
          <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-3">SODA · STORE OPERATIONS DECISION AGENT</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">Neuromorphic theft detection. WhatsApp alerts. Zero video stored.</h1>
          <p className="text-lg text-[#cdd3de] mb-6 max-w-2xl">SODA runs perception at the shelf, not in the cloud. Real-time anomaly detection routes operator alerts to WhatsApp with a replay link to the signed inference frame — no raw video leaves the store.</p>
          <div className="border-l-2 border-primary pl-3 font-mono text-xs text-primary mb-8">Designed for edge privacy, audit-ready by default.</div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:support@aurasensehk.com?subject=SODA%20Pilot" className="px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-colors text-center">Request SODA pilot →</a>
            <Link to="/dashboard/soda" className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors text-center">See live demo</Link>
          </div>
        </div>
      </section>

      {/* 3. Proof Strip */}
      <section className="border-y border-white/10 bg-zinc-900/40 py-6" data-fade>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-1">Detection Latency</div>
            <div className="text-[#cdd3de] text-lg font-semibold">&lt; 80ms shelf-to-WhatsApp</div>
          </div>
          <div>
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-1">Privacy</div>
            <div className="text-[#cdd3de] text-lg font-semibold">Zero raw video stored, PDPO-aligned</div>
          </div>
          <div>
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-1">Deployment</div>
            <div className="text-[#cdd3de] text-lg font-semibold">Jetson Orin NX + WhatsApp Business API</div>
          </div>
        </div>
      </section>

      {/* 4. Powered by NEPA cross-link band */}
      <section className="py-20" data-fade>
        <div className="max-w-5xl mx-auto px-6">
          <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">Powered by NEPA</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">SODA runs on the same engine. The shelf becomes a node in the dashboard.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/agent" className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col items-start hover:border-primary transition-colors group">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">JUDGE</div>
              <div className="text-[#cdd3de] font-semibold mb-1">Real-time shelf analysis</div>
              <div className="text-white/55 text-sm">Spike-timing anomaly detection</div>
            </Link>
            <Link to="/agent" className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col items-start hover:border-primary transition-colors group">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">COMPOSER</div>
              <div className="text-[#cdd3de] font-semibold mb-1">Anomaly classification</div>
              <div className="text-white/55 text-sm">Contextual event labeling</div>
            </Link>
            <Link to="/agent" className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col items-start hover:border-primary transition-colors group">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">DIRECTOR</div>
              <div className="text-[#cdd3de] font-semibold mb-1">WhatsApp routing</div>
              <div className="text-white/55 text-sm">Operator alert delivery</div>
            </Link>
            <Link to="/agent" className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col items-start hover:border-primary transition-colors group">
              <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">AUDITOR</div>
              <div className="text-[#cdd3de] font-semibold mb-1">Replay-verified evidence</div>
              <div className="text-white/55 text-sm">Signed frame audit trail</div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Capability Grid */}
      <section className="py-20" data-fade>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">Shelf Anomaly Detection</div>
            <div className="text-[#cdd3de] mb-2">Spike-timing analysis flags loitering, dwell, and shrinkage events in real time on Jetson edge hardware.</div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">WhatsApp Alert Routing</div>
            <div className="text-[#cdd3de] mb-2">Operator alerts arrive in &lt;80ms with timestamped replay link. Severity-classified, operator-ready context.</div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">Replay-Verified Evidence</div>
            <div className="text-[#cdd3de] mb-2">Every alert ships with Ed25519-signed SignatureMap. Frame-linked evidence ready for compliance review and incident investigation.</div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">Edge-Only Privacy</div>
            <div className="text-[#cdd3de] mb-2">Inference at the shelf. No video upload, no cloud round-trip. PDPO and GDPR aligned by design.</div>
          </div>
        </div>
      </section>

      {/* 6. Terminal Status Block */}
      <section className="py-16" data-fade>
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-[#080c11] border border-white/10 rounded-xl p-6 font-mono text-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-400" />
              <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-white/40">// SODA Runtime Status</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <div className="text-primary">module:</div>
              <div className="text-primary">soda-edge-v1.0.0</div>
              <div className="text-primary">cameras_active:</div>
              <div className="text-primary">12</div>
              <div className="text-green-500">nepa_link:</div>
              <div className="text-green-500">CONNECTED</div>
              <div className="text-primary">alerts_24h:</div>
              <div className="text-primary">7</div>
              <div className="text-primary">avg_latency_ms:</div>
              <div className="text-primary">78</div>
              <div className="text-green-500">audit_chain:</div>
              <div className="text-green-500">INTACT</div>
              <div className="text-green-500">evidence_retained:</div>
              <div className="text-green-500">ALL</div>
              <div className="text-green-500">health:</div>
              <div className="text-green-500">ALL_CLEAR</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Deployment Fits */}
      <section className="py-20" data-fade>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">Unmanned Convenience</div>
            <div className="text-[#cdd3de]">24/7 stores with no human staff</div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">Pharmacy &amp; Cold Chain</div>
            <div className="text-[#cdd3de]">Compliance + inventory monitoring</div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">Logistics Distribution</div>
            <div className="text-[#cdd3de]">Pick/pack zone monitoring</div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="font-mono text-xs tracking-[2px] uppercase text-primary mb-2">Cross-Border Retail</div>
            <div className="text-[#cdd3de]">Multi-jurisdiction PDPO-aligned audit</div>
          </div>
        </div>
      </section>

      {/* 8. Positioning Callout */}
      <section className="py-16 text-center" data-fade>
        <div className="max-w-3xl mx-auto px-6">
          <blockquote className="text-2xl sm:text-3xl font-semibold text-[#cdd3de] mb-4">"SODA is not a generic CCTV analytics tool. It is a deployable edge intelligence layer that turns the shelf into an audit-grade signal."</blockquote>
          <cite className="font-mono text-xs text-white/40">AURASENSE · DESIGNED TO PROTECT, NOT SURVEIL</cite>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-20 text-center" data-fade>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Perception at the shelf. Signal at the operator's phone.</h2>
          <div className="text-[#cdd3de] mb-8">Request a SODA pilot or schedule a technical briefing for procurement evaluation.</div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@aurasensehk.com?subject=SODA%20Pilot" className="px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-colors text-center">Request pilot →</a>
            <Link to="/about/contact" className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors text-center">Talk to AuraSense</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
