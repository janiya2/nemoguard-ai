"use client";

import { useEffect, useState } from "react";
import { Shield, Sparkles, Zap, Lock, Cpu, Database, CheckCircle2 } from "lucide-react";

const BOOT_STAGES = [
  { progress: 15, text: "INITIALIZING NEMOTRON-70B INFERENCE KERNEL...", icon: Cpu },
  { progress: 38, text: "CONNECTING NEBIUS 8x H100 3.2 Tbps INFINIBAND FABRIC...", icon: Zap },
  { progress: 62, text: "COMPILING COLANG 2.0 GUARDRAILS SECURITY GATE (<15ms)...", icon: Lock },
  { progress: 84, text: "GROUNDING DELAWARE STATUTORY PRECEDENT VAULT & TAVILY...", icon: Database },
  { progress: 100, text: "SECURE ENCLAVE ACTIVE • LAUNCHING NEMOGUARD AI...", icon: CheckCircle2 },
];

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Lock body scroll while preloader is visible
    document.body.style.overflow = "hidden";

    // Progress timer: runs smoothly from 0 to 100 in ~2.1 seconds
    const startTime = Date.now();
    const duration = 2100; // 2.1 seconds for maximum visual impact

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 22) setCurrentStageIndex(0);
      else if (pct < 45) setCurrentStageIndex(1);
      else if (pct < 68) setCurrentStageIndex(2);
      else if (pct < 90) setCurrentStageIndex(3);
      else setCurrentStageIndex(4);

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = "";
            sessionStorage.setItem("nemoguard_preloader_seen", "true");
          }, 700);
        }, 350);
      }
    }, 25);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || !visible) return null;

  const currentStage = BOOT_STAGES[currentStageIndex];
  const StageIcon = currentStage.icon;

  return (
    <div
      style={{ backgroundColor: "#03060a", zIndex: 999999 }}
      className={`fixed inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out select-none ${
        fading ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Cyber Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[#03060a] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(118,185,0,0.2)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(0,240,255,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      {/* Moving Laser Scan Line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#76b900] via-[#00f0ff] to-transparent opacity-40 blur-sm animate-[scanLine_2s_infinite_linear]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        
        {/* Hackathon Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76b900]/10 border border-[#76b900]/30 text-[#76b900] text-[11px] font-mono font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(118,185,0,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#76b900] animate-pulse" />
          Nebius × NVIDIA AI Hackathon
        </div>

        {/* Center Logo Shield with Rotating Radar Rings */}
        <div className="relative flex items-center justify-center w-36 h-36 mb-8">
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-0 rounded-full bg-[#76b900]/25 blur-2xl animate-pulse" />
          
          {/* Rotating Outer Tech Ring 1 (Clockwise) */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#76b900]/50 animate-[spin_8s_linear_infinite]" />
          
          {/* Rotating Tech Ring 2 (Counter-Clockwise Cyan) */}
          <div className="absolute inset-2 rounded-full border border-t-[#00f0ff] border-r-transparent border-b-[#00f0ff]/40 border-l-transparent animate-[spin_5s_linear_infinite_reverse]" />
          
          {/* Inner Hexagonal / Circular Shield Housing */}
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0c1624] via-[#050a12] to-[#020509] border-2 border-[#76b900]/80 shadow-[0_0_35px_rgba(118,185,0,0.5)] flex items-center justify-center p-2.5 overflow-hidden group">
            {/* Logo Image */}
            <img
              src="/logo.png"
              alt="NemoGuard AI Official Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(118,185,0,0.8)]"
            />
            
            {/* Holographic Sheen Animation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-[sheen_2s_infinite]" />
          </div>

          {/* Corner Cyber Accents */}
          <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#76b900]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#76b900]" />
          <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00f0ff]" />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00f0ff]" />
        </div>

        {/* Brand Title */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl sm:text-3xl font-black tracking-wider text-white font-mono">
            NEMO<span className="text-[#76b900] drop-shadow-[0_0_15px_rgba(118,185,0,0.8)]">GUARD</span>
          </span>
          <span className="px-2 py-0.5 text-[11px] font-black tracking-widest uppercase bg-gradient-to-r from-[#76b900]/30 to-[#00f0ff]/20 text-[#76b900] border border-[#76b900]/50 rounded-md shadow-[0_0_12px_rgba(118,185,0,0.4)]">
            AI
          </span>
        </div>

        <p className="text-[12px] text-slate-400 font-mono tracking-wide uppercase mb-6">
          Autonomous Enterprise Legal Intelligence Engine
        </p>

        {/* High-Tech Progress Bar */}
        <div className="w-full bg-[#08111b] border border-slate-800 rounded-full h-2 p-0.5 mb-3 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#76b900] via-[#86efac] to-[#00f0ff] shadow-[0_0_15px_rgba(118,185,0,0.9)] transition-all duration-75 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Blazing Head Particle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]" />
          </div>
        </div>

        {/* Status Line & Percentage */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mb-6">
          <div className="flex items-center gap-1.5 text-left truncate mr-2">
            <StageIcon className="w-3.5 h-3.5 text-[#76b900] shrink-0 animate-pulse" />
            <span className="truncate text-slate-300 font-semibold">{currentStage.text}</span>
          </div>
          <span className="text-[#76b900] font-black shrink-0 tracking-widest text-[12px]">
            [{progress.toString().padStart(2, "0")}%]
          </span>
        </div>

        {/* Lead Architect & Technology Credit Footer */}
        <div className="flex items-center justify-between w-full pt-4 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
          <span>ARCHITECT: JANITHA DILSHAN</span>
          <span className="text-slate-400">INNOXPERT TECH</span>
          <span>NVIDIA 70B • H100</span>
        </div>

        {/* Skip button for convenience */}
        <button
          onClick={() => {
            setFading(true);
            setTimeout(() => {
              setVisible(false);
              document.body.style.overflow = "";
              sessionStorage.setItem("nemoguard_preloader_seen", "true");
            }, 300);
          }}
          className="mt-6 text-[10px] font-mono text-slate-600 hover:text-slate-400 tracking-widest uppercase transition-colors"
        >
          [ Click to Skip ]
        </button>

      </div>

      <style jsx>{`
        @keyframes scanLine {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(100vh); }
        }
        @keyframes sheen {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
