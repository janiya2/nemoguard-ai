"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Scale,
  Swords,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  ChevronRight,
  FileText,
  User,
  ExternalLink,
  Flame,
  Award,
  Layers,
  Terminal,
  Activity,
  History,
  ShieldAlert,
  Cpu
} from "lucide-react";

interface NegotiationRound {
  roundNumber: number;
  phaseName: string;
  equilibriumScore: number;
  opposingCounsel: {
    speaker: string;
    tone: string;
    argument: string;
    proposedTerms: string;
  };
  defenseCounsel: {
    speaker: string;
    tone: string;
    argument: string;
    statutoryCitation: string;
  };
  arbitratorNote: string;
}

interface NegotiationData {
  contractTitle: string;
  disputedClause: string;
  jurisdiction: string;
  initialExposureEstimateUsd: string;
  mitigatedExposureUsd: string;
  initialEquilibrium: number;
  finalEquilibrium: number;
  rounds: NegotiationRound[];
  finalAgreedClause: string;
  statutoryBasis: string;
  concessionsMade: string[];
  settlementVerdict: string;
  certHash: string;
  telemetry?: {
    mode: string;
    provider: string;
    modelUsed: string;
    apiNotice?: string;
  };
}

const PRESET_WAR_ROOM_SCENARIOS = [
  {
    id: "sc-saas",
    title: "SaaS Master Services Agreement — $500 Liability Trap",
    jurisdiction: "Delaware Chancery Court",
    clause: "Customer shall defend, indemnify, and hold harmless Vendor against any third-party claims or IP losses. Vendor's total aggregate cumulative liability to Customer under all circumstances shall not exceed $500.",
    disputeSummary: "Unilateral customer indemnification paired with an illusory $500 vendor liability ceiling on multi-million dollar cloud services."
  },
  {
    id: "sc-dpa",
    title: "AI Model Vendor DPA — 30-Day Breach Reporting Loophole",
    jurisdiction: "European Union / GDPR Art. 28",
    clause: "Vendor will notify Customer of confirmed data security incidents within thirty (30) business days. Customer grants Vendor perpetual right to process inputs for foundation model retraining.",
    disputeSummary: "Illegal 30-day data breach notification window violating European statutory 72-hour ceiling and customer IP extraction."
  },
  {
    id: "sc-ma",
    title: "M&A Purchase Agreement — Total Fraud Liability Waiver",
    jurisdiction: "Delaware Corporate Law",
    clause: "All representations and warranties terminate six (6) months post-closing. Buyer unconditionally waives all fraud remedies, extra-contractual claims, and statutory disclosure protections.",
    disputeSummary: "Attempted contractual fraud disclaimer violating Delaware Chancery public policy regarding fraudulent inducement."
  },
  {
    id: "sc-nda",
    title: "Executive Restrictive Covenant — 36-Month Global Ban",
    jurisdiction: "US Federal / FTC 16 CFR Part 910",
    clause: "Employee agrees not to engage directly or indirectly in any competing software enterprise worldwide for thirty-six (36) months following separation for any reason.",
    disputeSummary: "Unlawful worldwide 3-year non-compete covenant rendered void under 2024 FTC non-compete regulations."
  }
];

export default function WarRoomPage() {
  const [selectedScenario, setSelectedScenario] = useState(PRESET_WAR_ROOM_SCENARIOS[0]);
  const [customClause, setCustomClause] = useState(PRESET_WAR_ROOM_SCENARIOS[0].clause);
  const [contractTitle, setContractTitle] = useState(PRESET_WAR_ROOM_SCENARIOS[0].title);
  const [jurisdiction, setJurisdiction] = useState(PRESET_WAR_ROOM_SCENARIOS[0].jurisdiction);
  
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [negotiationData, setNegotiationData] = useState<NegotiationData | null>(null);
  const [activeRoundTab, setActiveRoundTab] = useState<number>(1);
  const [copiedAccord, setCopiedAccord] = useState(false);
  const [debatePerspective, setDebatePerspective] = useState<"split" | "vendor" | "defense">("split");
  const [inputError, setInputError] = useState<string | null>(null);

  const handleSelectScenario = (sc: typeof PRESET_WAR_ROOM_SCENARIOS[0]) => {
    setSelectedScenario(sc);
    setContractTitle(sc.title);
    setCustomClause(sc.clause);
    setJurisdiction(sc.jurisdiction);
    if (inputError) setInputError(null);
  };

  const handleStartNegotiation = async () => {
    setIsNegotiating(true);
    setNegotiationData(null);
    setInputError(null);
    try {
      const res = await fetch("/api/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractTitle,
          disputedClause: customClause,
          jurisdiction
        })
      });
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        setInputError(null);
        setNegotiationData(json.data);
        setActiveRoundTab(1);
      } else {
        setInputError(json.error || "Negotiation failed. Please verify input clause.");
      }
    } catch (err: any) {
      console.error("Negotiation initiation failed:", err);
      setInputError(`Connection error: ${err.message || "Failed to reach negotiation orchestrator."}`);
    } finally {
      setIsNegotiating(false);
    }
  };

  const handleCopyAccord = () => {
    if (negotiationData?.finalAgreedClause) {
      navigator.clipboard.writeText(negotiationData.finalAgreedClause);
      setCopiedAccord(true);
      setTimeout(() => setCopiedAccord(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-x-hidden pb-28 md:pb-16">
      
      {/* Background Graphic & Ambient Obsidian Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/warroom-bg.jpg')` }}
        />
        {/* Dark Obsidian Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080c]/90 via-[#05080c]/85 to-[#05080c]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_900px_at_50%_-120px,#76b9001a,transparent)]" />
        
        {/* Dual Neon Podiums Ambient Highlights (Red Left / Green Right) */}
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#76b900]/12 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Hero Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500/15 via-[#76b900]/15 to-[#76b900]/20 border border-[#76b900]/40 text-xs font-mono text-[#76b900] shadow-[0_0_20px_rgba(118,185,0,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#76b900] animate-ping" />
              <Swords className="w-3.5 h-3.5" />
              <span>Autonomous Multi-Agent AI Negotiation War Room</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
              <Activity className="w-3 h-3 text-[#76b900]" />
              <span>3 AI Agents • NVIDIA Nemotron-70B • Tavily Live Case Law</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                Autonomous Legal <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-[#76b900]">
                  Contract Negotiation War Room
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 leading-relaxed">
                Watch two autonomous AI counsels powered by NVIDIA Nemotron-70B debate hostile contract clauses round-by-round in real-time, trade concessions, and execute an equitable bilateral settlement agreement.
              </p>
            </div>

            <Link
              href="/admin/dashboard"
              className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all self-start lg:self-end"
            >
              <History className="w-3.5 h-3.5 text-[#76b900]" />
              <span>View War Room Audit Stats in Admin</span>
            </Link>
          </div>
        </div>

        {/* 1. SCENARIO CONFIGURATION SECTION */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Step 1: Select High-Stakes Disputed Contract Clause
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#76b900]">1-Click Scenarios Available</span>
          </div>

          {/* Scenario Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_WAR_ROOM_SCENARIOS.map((sc) => {
              const isSelected = selectedScenario.id === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleSelectScenario(sc)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 border relative ${
                    isSelected
                      ? "bg-[#76b900]/15 border-[#76b900] shadow-[0_0_20px_rgba(118,185,0,0.2)]"
                      : "bg-black/50 border-slate-800 hover:border-slate-700 hover:bg-black/70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-slate-400 px-1.5 py-0.2 rounded bg-slate-800/80">
                      {sc.jurisdiction.split("/")[0]}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#76b900] shadow-[0_0_6px_#76b900]" />}
                  </div>
                  <h4 className="text-xs font-mono font-bold text-white line-clamp-1 mb-1">
                    {sc.title.split("—")[0]}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-sans line-clamp-2">
                    {sc.disputeSummary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Editable Disputed Clause Text Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <label className="text-slate-300 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Hostile / Disputed Contract Language:</span>
              </label>
              <span className="text-slate-500 text-[10px]">Editable for custom testing</span>
            </div>
            <textarea
              rows={3}
              value={customClause}
              onChange={(e) => {
                setCustomClause(e.target.value);
                if (inputError) setInputError(null);
              }}
              className="w-full p-3.5 rounded-2xl bg-black/80 border border-slate-700 focus:border-[#76b900] text-rose-200 font-mono text-xs leading-relaxed outline-none transition-colors"
            />

            {/* Input Validation & NeMo Guardrail Error Box */}
            {inputError && (
              <div className="mt-3 p-4 rounded-2xl bg-rose-950/70 border border-rose-500/70 text-rose-200 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_25px_rgba(244,63,94,0.2)] animate-fadeIn">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-rose-300 flex items-center gap-2">
                      <span>NeMo Guardrail Rejection: Negotiation Terminated</span>
                      <span className="text-[10px] bg-rose-500/20 px-1.5 py-0.2 rounded border border-rose-500/40 text-rose-300">
                        Zero Hallucination
                      </span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-rose-200/90">{inputError}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectScenario(PRESET_WAR_ROOM_SCENARIOS[0])}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-500/40 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-2 shrink-0 transition-colors shadow-sm self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#76b900]" />
                  <span>Load Verified Scenario</span>
                </button>
              </div>
            )}
          </div>

          {/* Launch Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Grounding: <strong>{jurisdiction}</strong></span>
            </div>

            <button
              onClick={handleStartNegotiation}
              disabled={isNegotiating}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-[#76b900] text-black font-extrabold font-mono text-xs uppercase flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(118,185,0,0.4)] hover:shadow-[0_0_45px_rgba(118,185,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isNegotiating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Agents Debating in Real-Time...</span>
                </>
              ) : (
                <>
                  <Swords className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>Initiate Autonomous War Room Negotiation</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2. LIVE WAR ROOM ARENA (MULTI-AGENT DEBATE) */}
        {negotiationData && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Live Equilibrium & Power Balance Bar */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#180a0e] via-[#090d16] to-[#08180c] border border-slate-700 shadow-[0_15px_45px_rgba(0,0,0,0.8)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                    <Scale className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 flex-wrap">
                      <span>Judicial Power Balance Gauge</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        Consensus Equilibrium: {negotiationData.rounds[activeRoundTab - 1]?.equilibriumScore}%
                      </span>
                      {negotiationData.telemetry && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 font-mono">
                          <Cpu className="w-3 h-3 text-cyan-400" />
                          <span>{negotiationData.telemetry.modelUsed}</span>
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {negotiationData.rounds[activeRoundTab - 1]?.arbitratorNote}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Initial Exposure</span>
                    <span className="text-rose-400 font-bold">{negotiationData.initialExposureEstimateUsd}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Mitigated Liability</span>
                    <span className="text-[#76b900] font-bold">{negotiationData.mitigatedExposureUsd}</span>
                  </div>
                </div>
              </div>

              {/* Progress Slider Meter */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Hostile Vendor Dominance
                  </span>
                  <span className="text-amber-400 font-bold">50% Neutral Equilibrium</span>
                  <span className="text-[#76b900] font-bold flex items-center gap-1">
                    Equitable Bilateral Accord
                    <span className="w-2 h-2 rounded-full bg-[#76b900]" />
                  </span>
                </div>
                
                <div className="w-full h-3 rounded-full bg-black/80 border border-slate-700 overflow-hidden p-0.5 relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-[#76b900] transition-all duration-700 shadow-[0_0_15px_rgba(118,185,0,0.5)]"
                    style={{ width: `${negotiationData.rounds[activeRoundTab - 1]?.equilibriumScore}%` }}
                  />
                </div>
              </div>

              {/* Round Navigation Tabs */}
              <div className="flex items-center gap-2 pt-2 overflow-x-auto">
                {negotiationData.rounds.map((rnd) => (
                  <button
                    key={rnd.roundNumber}
                    onClick={() => setActiveRoundTab(rnd.roundNumber)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 shrink-0 ${
                      activeRoundTab === rnd.roundNumber
                        ? "bg-[#76b900] text-black font-extrabold shadow-[0_0_15px_rgba(118,185,0,0.35)]"
                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>Round {rnd.roundNumber}:</span>
                    <span className="hidden sm:inline">{rnd.phaseName}</span>
                    <span className="text-[10px] px-1.5 rounded bg-black/30">
                      {rnd.equilibriumScore}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile View Perspective Switcher */}
            <div className="sm:hidden flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-mono font-bold">
              <button
                type="button"
                onClick={() => setDebatePerspective("split")}
                className={`flex-1 py-1.5 rounded-lg ${debatePerspective === "split" ? "bg-slate-800 text-white" : "text-slate-400"}`}
              >
                Both Podiums
              </button>
              <button
                type="button"
                onClick={() => setDebatePerspective("vendor")}
                className={`flex-1 py-1.5 rounded-lg ${debatePerspective === "vendor" ? "bg-rose-950 text-rose-300" : "text-slate-400"}`}
              >
                Vendor Counsel
              </button>
              <button
                type="button"
                onClick={() => setDebatePerspective("defense")}
                className={`flex-1 py-1.5 rounded-lg ${debatePerspective === "defense" ? "bg-emerald-950 text-[#76b900]" : "text-slate-400"}`}
              >
                NemoGuard
              </button>
            </div>

            {/* DUAL COUNSEL PODIUMS (ROUND DETAILS) */}
            {(() => {
              const currentRound = negotiationData.rounds[activeRoundTab - 1];
              if (!currentRound) return null;

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* PODIUM 1: OPPOSING VENDOR COUNSEL */}
                  {(debatePerspective === "split" || debatePerspective === "vendor") && (
                    <div className="p-6 rounded-3xl bg-gradient-to-b from-[#180a0e] to-[#090b12] border border-rose-500/40 shadow-[0_10px_35px_rgba(244,63,94,0.15)] flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        {/* Agent Identity */}
                        <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                              👔
                            </div>
                            <div>
                              <p className="text-xs font-bold text-rose-300 font-mono flex items-center gap-1.5">
                                {currentRound.opposingCounsel.speaker}
                              </p>
                              <p className="text-[10px] text-slate-400 font-mono">
                                Vendor Commercial Advocate • Tone: <strong className="text-rose-400">{currentRound.opposingCounsel.tone}</strong>
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                            Vendor Stance
                          </span>
                        </div>

                        {/* Speech Bubble / Argument */}
                        <div className="p-4 rounded-2xl bg-black/60 border border-rose-950/80 space-y-2">
                          <span className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-wider block">
                            Opposing Counsel Argument:
                          </span>
                          <p className="text-xs text-rose-100/90 leading-relaxed font-sans italic">
                            "{currentRound.opposingCounsel.argument}"
                          </p>
                        </div>

                        {/* Proposed Terms at this Round */}
                        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20">
                          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                            Vendor's Proposed Language:
                          </span>
                          <p className="text-xs font-mono text-rose-300">
                            {currentRound.opposingCounsel.proposedTerms}
                          </p>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-rose-950 flex items-center justify-between">
                        <span>Agent 1 • Multi-Turn Reasoner</span>
                        <span className="text-rose-400">Nemotron-70B Active</span>
                      </div>
                    </div>
                  )}

                  {/* PODIUM 2: NEMOGUARD ENTERPRISE DEFENSE */}
                  {(debatePerspective === "split" || debatePerspective === "defense") && (
                    <div className="p-6 rounded-3xl bg-gradient-to-b from-[#08180c] to-[#090b12] border border-[#76b900]/40 shadow-[0_10px_35px_rgba(118,185,0,0.15)] flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        {/* Agent Identity */}
                        <div className="flex items-center justify-between pb-3 border-b border-[#76b900]/20">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#76b900]/20 border border-[#76b900]/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(118,185,0,0.3)]">
                              👩‍⚖️
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                                {currentRound.defenseCounsel.speaker}
                              </p>
                              <p className="text-[10px] text-slate-400 font-mono">
                                Enterprise Defense AI • Tone: <strong className="text-[#76b900]">{currentRound.defenseCounsel.tone}</strong>
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/40 uppercase">
                            NemoGuard Defense
                          </span>
                        </div>

                        {/* Speech Bubble / Rebuttal */}
                        <div className="p-4 rounded-2xl bg-black/60 border border-emerald-950/80 space-y-2">
                          <span className="text-[10px] font-mono text-[#76b900] uppercase font-bold tracking-wider block">
                            Enterprise Counter-Argument:
                          </span>
                          <p className="text-xs text-emerald-100/90 leading-relaxed font-sans italic">
                            "{currentRound.defenseCounsel.argument}"
                          </p>
                        </div>

                        {/* Precedent / Statutory Grounding Box */}
                        <div className="p-3.5 rounded-2xl bg-[#76b900]/10 border border-[#76b900]/30 space-y-1">
                          <span className="text-[10px] font-mono text-[#76b900] uppercase font-bold block flex items-center gap-1">
                            <Scale className="w-3 h-3 text-[#76b900]" />
                            <span>Binding Statutory Citation & Grounding:</span>
                          </span>
                          <p className="text-xs font-mono text-slate-200 font-semibold">
                            {currentRound.defenseCounsel.statutoryCitation}
                          </p>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-emerald-950 flex items-center justify-between">
                        <span>Agent 2 • Grounded by Tavily</span>
                        <span className="text-[#76b900]">Nemotron-70B Verified</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 3. FINAL SETTLEMENT ACCORD & BILATERAL CERTIFICATE */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0a1420] to-[#05080e] border-2 border-[#76b900] shadow-[0_0_50px_rgba(118,185,0,0.25)] space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76b900]/20 text-[#76b900] text-xs font-mono font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>FINAL RATIFIED ACCORD REACHED</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                    Bilateral Agreed Contract Language
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Cert Hash: <code className="text-[#76b900]">{negotiationData.certHash}</code>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyAccord}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-white flex items-center gap-2 transition-colors"
                  >
                    {copiedAccord ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAccord ? "Copied Accord" : "Copy Bilateral Clause"}</span>
                  </button>

                  <Link
                    href={`/auditor?sample=custom`}
                    className="px-4 py-2.5 rounded-xl bg-[#76b900] hover:bg-[#88d600] text-black font-mono font-bold text-xs uppercase flex items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                  >
                    <span>Audit in Nemotron</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Side by Side Diff: Disputed Hostile vs. Final Agreed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original Hostile Clause */}
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Original Hostile Language (Vulnerable)</span>
                  </span>
                  <p className="text-xs font-mono text-rose-200/80 leading-relaxed bg-black/60 p-3 rounded-xl border border-rose-900/50 line-through decoration-rose-500/60">
                    {negotiationData.disputedClause}
                  </p>
                </div>

                {/* Final Agreed Bilateral Clause */}
                <div className="p-4 rounded-2xl bg-[#76b900]/10 border border-[#76b900]/50 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#76b900] font-bold block flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#76b900]" />
                    <span>Ratified Bilateral Clause (Clean Execution)</span>
                  </span>
                  <p className="text-xs font-mono text-emerald-200 leading-relaxed bg-black/60 p-3 rounded-xl border border-[#76b900]/40 font-semibold shadow-inner">
                    {negotiationData.finalAgreedClause}
                  </p>
                </div>
              </div>

              {/* Key Concessions Won */}
              <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Key Commercial Concessions Won Through AI Debate:
                </span>
                <ul className="space-y-1.5 text-xs font-mono text-slate-200">
                  {negotiationData.concessionsMade.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#76b900] font-bold">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
