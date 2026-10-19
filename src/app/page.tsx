"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  Cpu, 
  Search, 
  FileCheck, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Layers,
  Scale,
  Activity,
  Zap,
  Sliders
} from "lucide-react";
import { DEFAULT_CMS_DATA, LandingCMSData } from "@/lib/cmsDefaults";

export default function HomePage() {
  const [cms, setCms] = useState<LandingCMSData>(DEFAULT_CMS_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCMS() {
      try {
        const res = await fetch("/api/cms");
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setCms(json.data);
          }
        }
      } catch (err) {
        console.warn("Using default CMS data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCMS();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Cyber Grid & Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#76b900]/15 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Admin Quick Banner Notice if in Maintenance */}
      {cms.maintenanceMode && (
        <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 text-center text-xs font-mono text-amber-300 flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>{cms.maintenanceNotice}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Announcement Pill */}
          {cms.announcementActive && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#76b900]/10 border border-[#76b900]/30 shadow-[0_0_20px_rgba(118,185,0,0.15)] text-xs font-mono text-[#76b900] animate-cyber-pulse">
              <Zap className="w-3.5 h-3.5 text-[#76b900]" />
              <span>{cms.announcementBadge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#76b900]" />
            </div>
          )}

          {/* Dynamic Hero Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            {cms.heroTitlePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76b900] via-[#94e400] to-cyan-400 glow-text-nvidia">
              {cms.heroTitleHighlight}
            </span>{" "}
            {cms.heroTitleSuffix}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            {cms.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auditor"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-[#76b900] to-[#599100] text-black shadow-[0_0_30px_rgba(118,185,0,0.4)] hover:shadow-[0_0_45px_rgba(118,185,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 font-mono"
            >
              <Sparkles className="w-4 h-4" />
              <span>{cms.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/vault"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:border-[#76b900]/50 hover:text-white transition-all flex items-center justify-center gap-2 font-mono"
            >
              <Scale className="w-4 h-4 text-[#76b900]" />
              <span>{cms.secondaryCtaText}</span>
            </Link>
          </div>

          {/* Admin CMS Notice Pill */}
          <div className="pt-2 flex items-center justify-center gap-3 text-xs text-slate-400 font-mono">
            <span>Admin-Controlled CMS Active</span>
            <span>•</span>
            <Link href="/admin/login" className="text-[#76b900] hover:underline flex items-center gap-1">
              <Sliders className="w-3 h-3" />
              Edit via Admin Panel
            </Link>
          </div>
        </div>

        {/* Dynamic Key Metric Counters */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { value: cms.stat1Value, label: cms.stat1Label },
            { value: cms.stat2Value, label: cms.stat2Label },
            { value: cms.stat3Value, label: cms.stat3Label },
            { value: cms.stat4Value, label: cms.stat4Label },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-[#76b900]/30 transition-all text-center group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono group-hover:text-[#76b900] transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-sans">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Cyber Auditor Demo Preview */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-[#76b900]/30 bg-gradient-to-b from-slate-900/90 to-[#060913] p-6 sm:p-10 shadow-[0_0_50px_rgba(118,185,0,0.12)]">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div>
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span>LIVE NEBIUS AUDIT TELEMETRY</span>
                  <span className="px-2 py-0.5 text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded">
                    HIGH RISK DETECTED
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Target: Enterprise SaaS Agreement § 8.2 (Unlimited Indemnification Trap)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-[#76b900]/10 border border-[#76b900]/30 text-[#76b900]">
                Nemotron-70B Active
              </span>
              <span className="px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                Tavily Live Case Law
              </span>
            </div>
          </div>

          {/* Side-by-Side Comparison Mock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 font-mono text-xs">
            {/* Dangerous Original Clause */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between text-rose-400 font-bold">
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  FLAGGED ADVERSARIAL CLAUSE
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  Risk: 94/100
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans text-sm bg-black/40 p-3 rounded-lg border border-rose-500/20">
                &ldquo;Customer liability under Section 8.1 shall be <span className="text-rose-400 font-bold underline">UNLIMITED</span>, and no statutory cap or aggregate fee ceiling shall apply under any circumstance.&rdquo;
              </p>
              <div className="text-[11px] text-rose-300/80">
                ⚠️ Severe exposure: Zero reciprocal protection. Enterprise liable for uncapped third-party consequential damages.
              </div>
            </div>

            {/* AI Redline & Precedent */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-[#76b900]/40 space-y-3">
              <div className="flex items-center justify-between text-[#76b900] font-bold">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#76b900]" />
                  NEMOTRON DEFENSIVE REDLINE
                </span>
                <span className="px-2 py-0.5 rounded bg-[#76b900]/20 text-[#76b900]">
                  Risk: 12/100 (Safe)
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed font-sans text-sm bg-black/40 p-3 rounded-lg border border-[#76b900]/30">
                &ldquo;Each party shall mutually defend and indemnify the other against direct claims, <span className="text-[#76b900] font-bold">subject to an aggregate liability ceiling equal to 12 months fees paid</span>.&rdquo;
              </p>
              <div className="text-[11px] text-cyan-300 flex items-center gap-1.5 font-mono">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tavily Precedent: <i>ABRY Partners v. F&W Acquisition, Del. Ch. 2006</i></span>
              </div>
            </div>
          </div>

          {/* Quick Launch CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/auditor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-[#76b900] text-white hover:text-black font-mono text-xs font-bold uppercase transition-all shadow-[0_0_20px_rgba(118,185,0,0.2)]"
            >
              <span>Test with your own contract</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {cms.featuresHeading}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {cms.featuresSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cms.featuresList.map((feat) => (
            <div
              key={feat.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-[#76b900]/50 transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#76b900]/15 border border-[#76b900]/30 flex items-center justify-center text-[#76b900] group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-[#76b900]" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {feat.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regulatory Matrix */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">{cms.regulationsHeading}</h3>
            <p className="text-xs text-slate-400">
              Zero synthetic hallucinations. Tested against primary legal authorities and regulatory bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cms.regulationsList.map((reg, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#05080c] border border-slate-800/80 hover:border-[#76b900]/30 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#76b900]">{reg.code}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{reg.jurisdiction}</span>
                </div>
                <div className="text-sm font-semibold text-white">{reg.name}</div>
                <p className="text-[11px] text-slate-400 leading-snug">{reg.riskFocus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Live System Telemetry Banner */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-2xl bg-black/60 border border-[#76b900]/20 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#76b900] animate-pulse" />
            <span className="text-slate-300 font-bold">{cms.systemStatusText}</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">{cms.systemModelName}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-cyan-400">Tavily Grounding: ACTIVE</span>
            <span>•</span>
            <span className="text-[#76b900]">{cms.systemClusterStatus}</span>
            <span>•</span>
            <Link href="/admin/dashboard" className="text-slate-300 hover:text-white underline">
              Admin Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
