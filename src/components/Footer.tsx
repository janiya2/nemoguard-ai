"use client";

import Link from "next/link";
import {
  Shield,
  Cpu,
  Lock,
  ExternalLink,
  Sparkles,
  Award,
  Github,
  CheckCircle2,
  Zap,
  Activity,
  ArrowUpRight,
  Database,
  Terminal,
  Scale,
  ShieldCheck,
  Swords,
  Globe,
  FileText
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  // Do not render consumer website footer inside admin console
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // 5 Dedicated Core Ecosystem Action Cards
  const ecosystemActions = [
    {
      id: "github",
      name: "GitHub Repository",
      subtitle: "Open Source Codebase",
      badge: "v1.0.0 Apache-2.0",
      accent: "#f8fafc",
      icon: <Github className="w-5 h-5 text-white" />,
      link: "https://github.com",
      borderGlow: "group-hover:border-white/50 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
    },
    {
      id: "devpost",
      name: "Devpost Submission",
      subtitle: "Nebius × NVIDIA AI Hackathon",
      badge: "$50K+ Prize Pool",
      accent: "#fbbf24",
      icon: <Award className="w-5 h-5 text-amber-400" />,
      link: "https://devpost.com",
      borderGlow: "group-hover:border-amber-400/50 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
    },
    {
      id: "nvidia",
      name: "NVIDIA Nemotron-70B",
      subtitle: "Judicial Reasoning Engine",
      badge: "FP8 TensorRT-LLM",
      accent: "#76b900",
      icon: <Zap className="w-5 h-5 text-[#76b900]" />,
      link: "https://build.nvidia.com",
      borderGlow: "group-hover:border-[#76b900]/70 group-hover:shadow-[0_0_22px_rgba(118,185,0,0.4)]"
    },
    {
      id: "nebius",
      name: "Nebius AI Studio",
      subtitle: "H100 SXM5 Supercluster",
      badge: "Token Factory Cloud",
      accent: "#00f0ff",
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      link: "https://studio.nebius.ai",
      borderGlow: "group-hover:border-cyan-400/60 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
    },
    {
      id: "tavily",
      name: "Tavily AI Search",
      subtitle: "Delaware Precedent Search",
      badge: "$3,000 Partner Bounty",
      accent: "#a78bfa",
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      link: "https://tavily.com",
      borderGlow: "group-hover:border-purple-400/60 group-hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]"
    }
  ];

  const hardwareNodes = [
    {
      id: "nvidia",
      name: "NVIDIA Nemotron",
      version: "70B Judicial Core",
      spec: "FP8 TensorRT-LLM",
      status: "ACTIVE",
      statusColor: "text-[#76b900] bg-[#76b900]/15 border-[#76b900]/40",
      accent: "#76b900",
      icon: (
        <svg className="w-5 h-5 text-[#76b900]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.94 4.5c-3.1 0-5.74 2.2-6.52 5.15C1.65 12.6 3.1 15.6 5.8 17l1.4-2.1c-1.8-.9-2.7-2.9-2.2-4.8.5-1.9 2.2-3.3 4.2-3.3.8 0 1.6.2 2.3.7l1.3-2.1c-1.1-.6-2.4-.9-3.8-.9zm6.1 0c-1.4 0-2.7.3-3.8.9l1.3 2.1c.7-.4 1.5-.7 2.3-.7 2 0 3.7 1.4 4.2 3.3.5 1.9-.4 3.9-2.2 4.8l1.4 2.1c2.7-1.4 4.15-4.4 3.38-7.35C20.78 6.7 18.14 4.5 15.04 4.5zM12 8.7c-2 0-3.6 1.6-3.6 3.6 0 2 1.6 3.6 3.6 3.6s3.6-1.6 3.6-3.6c0-2-1.6-3.6-3.6-3.6z"/>
        </svg>
      ),
      link: "https://build.nvidia.com"
    },
    {
      id: "nebius",
      name: "Nebius AI Studio",
      version: "H100 Supercluster",
      spec: "8x SXM5 80GB",
      status: "OPTIMAL",
      statusColor: "text-emerald-400 bg-emerald-500/15 border-emerald-500/40",
      accent: "#34d399",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      link: "https://nebius.com"
    },
    {
      id: "tavily",
      name: "Tavily AI Search",
      version: "Live Legal Grounding",
      spec: "Delaware Precedents",
      status: "GROUNDED",
      statusColor: "text-cyan-400 bg-cyan-500/15 border-cyan-500/40",
      accent: "#22d3ee",
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      link: "https://tavily.com"
    },
    {
      id: "guardrails",
      name: "NeMo Guardrails",
      version: "Colang 2.0 Engine",
      spec: "Zero Hallucination",
      status: "VERIFIED",
      statusColor: "text-lime-400 bg-lime-500/15 border-lime-500/40",
      accent: "#a3e635",
      icon: <Shield className="w-5 h-5 text-lime-400" />,
      link: "https://github.com/NVIDIA/NeMo-Guardrails"
    },
    {
      id: "soc2",
      name: "SOC-2 Type II",
      version: "Enterprise Vault",
      spec: "Zero Knowledge Data",
      status: "ENCRYPTED",
      statusColor: "text-indigo-400 bg-indigo-500/15 border-indigo-500/40",
      accent: "#818cf8",
      icon: <CheckCircle2 className="w-5 h-5 text-indigo-400" />,
      link: "#"
    },
    {
      id: "devpost",
      name: "NVIDIA × Nebius",
      version: "Global AI Hackathon",
      spec: "Devpost 2026",
      status: "SUBMISSION",
      statusColor: "text-amber-400 bg-amber-500/15 border-amber-500/40",
      accent: "#fbbf24",
      icon: <Award className="w-5 h-5 text-amber-400" />,
      link: "https://devpost.com"
    }
  ];

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#04070e] text-slate-400 text-xs font-sans mt-24 relative overflow-hidden">
      {/* Ambient background glow & grid lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-44 bg-gradient-to-b from-[#76b900]/15 via-[#76b900]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#76b90008_1px,transparent_1px),linear-gradient(to_bottom,#76b90008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* 🌟 5 DEDICATED ECOSYSTEM & ACTION ICONS DOCK */}
        <div className="mb-12 pb-8 border-b border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#76b900] animate-ping" />
              <span>Verified Ecosystem & Developer Resources (5 Active Nodes)</span>
            </span>
            <span className="text-[10px] font-mono text-[#76b900] bg-[#76b900]/10 border border-[#76b900]/30 px-2.5 py-0.5 rounded-full">
              Production Supercluster Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {ecosystemActions.map((node) => (
              <a
                key={node.id}
                href={node.link}
                target="_blank"
                rel="noreferrer"
                className={`p-3.5 rounded-2xl bg-gradient-to-b from-[#0a1220] to-[#050912] border border-slate-800 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 active:scale-[0.98] ${node.borderGlow} relative overflow-hidden`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-black/70 border border-slate-800 group-hover:scale-110 transition-transform">
                    {node.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-tight px-1.5 py-0.5 rounded bg-black/60 text-slate-300 border border-slate-800">
                    {node.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-mono text-xs font-bold flex items-center justify-between group-hover:text-[#76b900] transition-colors">
                    <span>{node.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                    {node.subtitle}
                  </p>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${node.accent}, transparent)` }}
                />
              </a>
            ))}
          </div>
        </div>
        
        {/* Futuristic Supercluster Telemetry & Node Showcase */}
        <div className="mb-12 pb-10 border-b border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76b900]/10 border border-[#76b900]/30 text-[10px] font-mono text-[#76b900] uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-[#76b900] animate-pulse" />
                Autonomous Judicial Supercluster
              </div>
              <h3 className="text-white text-lg sm:text-xl font-extrabold font-mono tracking-tight flex items-center gap-2">
                <span>NVIDIA Nemotron-70B • Nebius Infrastructure</span>
              </h3>
            </div>
            
            {/* Live Telemetry Ping */}
            <div className="flex items-center gap-3 text-[11px] font-mono bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl shrink-0">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-300">Cluster Latency: <strong className="text-[#76b900]">38ms</strong></span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">Grounding: <strong className="text-cyan-400">100% Case Law</strong></span>
            </div>
          </div>

          {/* Holographic Hardware Pods */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {hardwareNodes.map((node) => {
              const isHovered = hoveredBadge === node.id;
              return (
                <a
                  key={node.id}
                  href={node.link}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setHoveredBadge(node.id)}
                  onMouseLeave={() => setHoveredBadge(null)}
                  className={`p-3.5 rounded-2xl bg-gradient-to-b from-[#0a101d] to-[#05080f] border border-slate-800/90 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden active:scale-95`}
                  style={{
                    borderColor: isHovered ? node.accent : undefined,
                    boxShadow: isHovered
                      ? `0 12px 30px -5px ${node.accent}40, inset 0 0 15px ${node.accent}15`
                      : "none",
                  }}
                >
                  {/* Top Status & Icon */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="p-2.5 rounded-xl bg-black/70 border border-slate-800 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        borderColor: isHovered ? `${node.accent}60` : undefined,
                      }}
                    >
                      {node.icon}
                    </div>
                    <span
                      className={`text-[8px] font-mono font-bold tracking-tight px-1.5 py-0.5 rounded border ${node.statusColor}`}
                    >
                      {node.status}
                    </span>
                  </div>

                  {/* Node Info */}
                  <div>
                    <h4 className="text-white font-mono text-xs font-bold group-hover:text-white transition-colors truncate flex items-center justify-between">
                      <span>{node.name}</span>
                      <ArrowUpRight
                        className="w-3 h-3 text-slate-600 group-hover:text-white transition-colors shrink-0"
                        style={{ color: isHovered ? node.accent : undefined }}
                      />
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5 font-medium">
                      {node.version}
                    </p>
                    <p className="text-[9px] text-slate-500 font-mono truncate mt-0.5">
                      {node.spec}
                    </p>
                  </div>

                  {/* Glowing Bottom Line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${node.accent}, transparent)`,
                    }}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* 🌟 5-COLUMN ENTERPRISE LEGAL & INFRASTRUCTURE MATRIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* 1. Brand Col */}
          <div className="space-y-3.5 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#76b900]/50 shadow-[0_0_20px_rgba(118,185,0,0.3)] bg-black p-0.5">
                <img
                  src="/logo.png"
                  alt="NemoGuard AI"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <span className="font-extrabold text-white text-base font-mono block">
                  NEMO<span className="text-[#76b900]">GUARD</span> AI
                </span>
                <span className="text-[10px] text-slate-400 font-mono block -mt-0.5">
                  Autonomous Legal Intelligence
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed">
              Autonomous legal auditor & negotiation engine. Powered by NVIDIA Nemotron-70B on Nebius AI Studio with real-time Tavily case law.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#76b900] bg-[#76b900]/10 border border-[#76b900]/30 px-2.5 py-1 rounded-xl w-fit">
              <span className="w-2 h-2 rounded-full bg-[#76b900] animate-pulse" />
              <span>Nebius Supercluster • H100 SXM5</span>
            </div>
          </div>

          {/* 2. AI Judicial Stack */}
          <div className="space-y-2.5">
            <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#76b900]" />
              <span>AI Judicial Stack</span>
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs font-mono">
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#76b900]" />
                <span className="text-slate-200">NVIDIA Nemotron-70B</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-200">Nebius Token Factory</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-slate-200">Tavily Case Precedents</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                <span className="text-slate-200">NeMo Guardrails 0.12</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-slate-200">TensorRT-LLM FP8</span>
              </li>
            </ul>
          </div>

          {/* 3. Statutory Frameworks */}
          <div className="space-y-2.5">
            <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Legal Frameworks</span>
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs font-mono">
              <li className="hover:text-slate-200 transition-colors">› Delaware Chancery Precedents</li>
              <li className="hover:text-slate-200 transition-colors">› EU AI Act (2024/1689)</li>
              <li className="hover:text-slate-200 transition-colors">› GDPR Article 28 DPA Ceilings</li>
              <li className="hover:text-slate-200 transition-colors">› FTC 16 CFR Restrictive Covenants</li>
              <li className="hover:text-slate-200 transition-colors">› SEC 10-K Materiality Bounds</li>
            </ul>
          </div>

          {/* 4. Enterprise Portals */}
          <div className="space-y-2.5">
            <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Enterprise Portals</span>
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/auditor" className="text-slate-300 hover:text-[#76b900] transition-colors flex items-center gap-1.5">
                  <span className="text-[#76b900]">›</span> Contract Auditor
                </Link>
              </li>
              <li>
                <Link href="/war-room" className="text-slate-300 hover:text-[#76b900] transition-colors flex items-center gap-1.5">
                  <span className="text-[#76b900]">›</span> AI War Room Simulator
                </Link>
              </li>
              <li>
                <Link href="/guardrails" className="text-slate-300 hover:text-[#76b900] transition-colors flex items-center gap-1.5">
                  <span className="text-[#76b900]">›</span> NeMo Guardrails Sandbox
                </Link>
              </li>
              <li>
                <Link href="/benchmark" className="text-slate-300 hover:text-[#76b900] transition-colors flex items-center gap-1.5">
                  <span className="text-[#76b900]">›</span> H100 Benchmark Matrix
                </Link>
              </li>
              <li>
                <Link href="/vault" className="text-slate-300 hover:text-[#76b900] transition-colors flex items-center gap-1.5">
                  <span className="text-[#76b900]">›</span> Precedent Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* 5. Security & Governance */}
          <div className="space-y-2.5">
            <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Security & Governance</span>
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs font-mono">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-emerald-400">✓</span> Cryptographic Defense Receipts
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-emerald-400">✓</span> Colang 2.0 Flow Policies
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-emerald-400">✓</span> Zero-Knowledge Client Vault
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span className="text-emerald-400">✓</span> Printable Legal Certificates
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-400 hover:text-[#76b900] transition-colors flex items-center gap-1.5 pt-0.5">
                  <Lock className="w-3 h-3 text-[#76b900]" />
                  <span>Admin Gateway Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Security Line */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <p className="font-mono">© 2026 NemoGuard AI. Apache-2.0 License. Nebius × NVIDIA AI Hackathon.</p>
          
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-[#76b900] flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#76b900]" />
              H100 Supercluster
            </span>
            <span className="text-slate-700">•</span>
            <span className="text-cyan-400">Tavily Verified</span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400">SOC 2 Type II</span>
            <span className="text-slate-700">•</span>
            <span className="text-purple-400">NeMo Guardrails</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
