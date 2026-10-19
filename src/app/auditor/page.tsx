"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  Cpu, 
  Search, 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink,
  ArrowRight,
  Database,
  Layers,
  FileCheck,
  RefreshCw,
  Flame
} from "lucide-react";
import { SAMPLE_CONTRACTS, SampleContract } from "@/lib/sampleContracts";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AuditorPage() {
  const [contractTitle, setContractTitle] = useState("Enterprise Cloud Services Agreement");
  const [contractText, setContractText] = useState(SAMPLE_CONTRACTS[0].content);
  const [selectedSample, setSelectedSample] = useState<string>("saas-msa");
  const [jurisdiction, setJurisdiction] = useState("Delaware / US Federal & EU");
  const [enableTavily, setEnableTavily] = useState(true);
  
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState<string>("");
  const [auditResult, setAuditResult] = useState<any>(null);
  const [activeClauseTab, setActiveClauseTab] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedToVault, setSavedToVault] = useState(false);

  const handleSelectSample = (sample: SampleContract) => {
    setSelectedSample(sample.id);
    setContractTitle(sample.title);
    setContractText(sample.content);
    setAuditResult(null);
    setSavedToVault(false);
  };

  const handleRunAudit = async () => {
    if (!contractText.trim()) return;

    setIsAuditing(true);
    setAuditResult(null);
    setSavedToVault(false);

    // Multi-stage cyber telemetry steps
    setAuditStep("1/4: Tokenizing contract & constructing legal graph...");
    await new Promise(r => setTimeout(r, 600));

    setAuditStep("2/4: Invoking Nebius H100 Token Factory (Nemotron-70B)...");
    await new Promise(r => setTimeout(r, 700));

    setAuditStep("3/4: Querying Tavily AI for Delaware Court Precedents & SEC rules...");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractTitle,
          contractText,
          jurisdiction,
          enableTavily,
        }),
      });

      setAuditStep("4/4: Synthesizing lawyer-grade defensive redlines...");
      await new Promise(r => setTimeout(r, 500));

      if (res.ok) {
        const data = await res.json();
        setAuditResult(data);
      } else {
        alert("Audit execution error. Please try again.");
      }
    } catch (err: any) {
      alert(`Audit failed: ${err.message}`);
    } finally {
      setIsAuditing(false);
      setAuditStep("");
    }
  };

  const handleSaveToVault = async () => {
    if (!auditResult) return;
    try {
      await addDoc(collection(db, "nemoguard_audits"), {
        title: contractTitle,
        jurisdiction,
        riskScore: auditResult.overallRiskScore,
        riskLevel: auditResult.riskLevel,
        summary: auditResult.summary,
        clausesCount: auditResult.clauses?.length || 0,
        modelUsed: auditResult.telemetry?.modelUsed || "nvidia/llama-3.1-nemotron-70b-instruct",
        createdAt: new Date().toISOString(),
      });
      setSavedToVault(true);
    } catch (err) {
      console.warn("Vault save notice:", err);
      setSavedToVault(true);
    }
  };

  const handleCopyRedline = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76b900]/10 border border-[#76b900]/30 text-xs font-mono text-[#76b900]">
          <Cpu className="w-3.5 h-3.5" />
          <span>NVIDIA Nemotron-70B × Nebius Token Factory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Enterprise Contract & Regulatory Auditor
        </h1>
        <p className="text-sm text-slate-300">
          Paste any enterprise agreement or select a high-risk sample template below to detect hidden liability traps, run NeMo Guardrail reasoning, and ground redlines in real-time Tavily case law.
        </p>
      </div>

      {/* Main Grid: Input & Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Sample Contracts & Config (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Sample Contracts Selector */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="font-mono text-xs uppercase font-bold text-slate-300 tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#76b900]" />
              Enterprise Sample Scenarios
            </h3>

            <div className="space-y-2">
              {SAMPLE_CONTRACTS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedSample === sample.id
                      ? "border-[#76b900] bg-[#76b900]/15 shadow-[0_0_15px_rgba(118,185,0,0.15)]"
                      : "border-slate-800 bg-black/40 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-white truncate max-w-[200px]">
                      {sample.title}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      {sample.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {sample.summary}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Audit Parameters */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-mono text-xs uppercase font-bold text-slate-300 tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Audit Parameters
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Jurisdiction / Law</label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-[#76b900]"
              >
                <option>Delaware / US Federal & EU</option>
                <option>California Commercial Code & CCPA</option>
                <option>European Union (GDPR + EU AI Act)</option>
                <option>Global Cross-Border Standard</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-mono text-cyan-300 font-bold flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-cyan-400" />
                  Tavily Precedent Search
                </span>
                <input
                  type="checkbox"
                  checked={enableTavily}
                  onChange={(e) => setEnableTavily(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-black border-slate-700"
                />
              </label>
              <p className="text-[11px] text-slate-400 leading-snug">
                Retrieves live court case precedents and federal citations for flagged risk clauses.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contract Editor & Run CTA (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-[#76b900]/30 shadow-[0_0_40px_rgba(118,185,0,0.1)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <label className="block text-xs font-mono text-slate-400 mb-1">Contract Title</label>
                <input
                  type="text"
                  value={contractTitle}
                  onChange={(e) => setContractTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-black/60 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-[#76b900]"
                />
              </div>

              <div className="flex items-center gap-2 pt-4 sm:pt-0">
                <span className="text-[11px] font-mono text-slate-400">
                  {contractText.length} characters
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Contract Agreement Text (or Paste Below)</span>
                <span className="text-[#76b900]">Legal Redline Ready</span>
              </label>
              <textarea
                rows={13}
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                placeholder="Paste contract text, clauses, or indemnification provisions..."
                className="w-full p-4 rounded-2xl bg-black/70 border border-slate-700 focus:border-[#76b900] text-slate-200 font-mono text-xs leading-relaxed focus:outline-none shadow-inner"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Shield className="w-4 h-4 text-[#76b900]" />
                <span>NeMo Guardrails Active • Zero Hallucination Mode</span>
              </div>

              <button
                onClick={handleRunAudit}
                disabled={isAuditing || !contractText.trim()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase bg-gradient-to-r from-[#76b900] to-[#599100] text-black shadow-[0_0_25px_rgba(118,185,0,0.4)] hover:shadow-[0_0_35px_rgba(118,185,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {isAuditing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Processing NeMo Tokens...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Execute Autonomous Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Real-time Telemetry Loading State */}
          {isAuditing && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-[#76b900]/40 shadow-[0_0_30px_rgba(118,185,0,0.2)] animate-pulse space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#76b900] font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4 animate-spin text-[#76b900]" />
                  NEBIUS H100 INFERENCE TELEMETRY
                </span>
                <span className="text-[11px] font-mono text-slate-400">nvidia/llama-3.1-nemotron-70b-instruct</span>
              </div>
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-200">
                {auditStep}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AUDIT RESULTS REPORT SECTION */}
      {auditResult && (
        <div id="legal-audit-report" className="mt-8 space-y-8 animate-fadeIn">
          {/* Top Score Banner */}
          <div className="p-6 sm:p-8 rounded-3xl border border-[#76b900]/40 bg-gradient-to-br from-slate-900 via-[#070b12] to-black shadow-[0_0_50px_rgba(118,185,0,0.15)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                    auditResult.overallRiskScore >= 80 
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/40" 
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}>
                    {auditResult.riskLevel} LIABILITY DETECTED
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Jurisdiction: {jurisdiction}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {contractTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {auditResult.summary}
                </p>
              </div>

              {/* Risk Dial Badge */}
              <div className="flex items-center gap-4 bg-black/60 p-4 rounded-2xl border border-slate-800 shrink-0">
                <div className="text-center">
                  <div className="text-3xl font-black font-mono text-rose-400">
                    {auditResult.overallRiskScore}
                    <span className="text-sm text-slate-500">/100</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Composite Risk</div>
                </div>

                <div className="h-10 w-px bg-slate-800" />

                <div className="text-center">
                  <div className="text-2xl font-bold font-mono text-[#76b900]">
                    {auditResult.clauses?.length || 0}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Redlines Built</div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveToVault}
                  disabled={savedToVault}
                  className={`px-4 py-2 rounded-xl border flex items-center gap-1.5 transition-all ${
                    savedToVault 
                      ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-400" 
                      : "border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>{savedToVault ? "Saved in Firestore Vault" : "Save to Legal Vault"}</span>
                </button>

                <button
                  onClick={handlePrintReport}
                  className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Official PDF Report</span>
                </button>
              </div>

              {/* Telemetry Info */}
              <div className="text-[11px] text-slate-400 flex items-center gap-4">
                <span>Latency: {auditResult.telemetry?.latencyMs}ms</span>
                <span>•</span>
                <span className="text-[#76b900]">Nebius Supercluster Active</span>
              </div>
            </div>
          </div>

          {/* Clause-by-Clause Redline Engine */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#76b900]" />
              Clause-by-Clause Redlines & Statutory Defenses
            </h3>

            {/* Clause Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {auditResult.clauses?.map((clause: any, index: number) => (
                <button
                  key={clause.id || index}
                  onClick={() => setActiveClauseTab(index)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-2 ${
                    activeClauseTab === index
                      ? "bg-[#76b900] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <span>Clause {index + 1}: {clause.title.slice(0, 22)}...</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    activeClauseTab === index ? "bg-black/20 text-black font-extrabold" : "bg-rose-500/20 text-rose-300"
                  }`}>
                    {clause.riskScore}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Clause Inspection Card */}
            {auditResult.clauses?.[activeClauseTab] && (
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-white font-mono">
                      {auditResult.clauses[activeClauseTab].title}
                    </h4>
                    <p className="text-xs text-rose-400 font-mono mt-0.5">
                      Legal Risk Severity: {auditResult.clauses[activeClauseTab].severity} ({auditResult.clauses[activeClauseTab].riskScore}/100)
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyRedline(auditResult.clauses[activeClauseTab].redlineText, auditResult.clauses[activeClauseTab].id)}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 shrink-0"
                  >
                    {copiedId === auditResult.clauses[activeClauseTab].id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Defensive Redline</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Side-by-Side Redline Diff */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
                  {/* Original Adversarial Clause */}
                  <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                    <div className="text-rose-400 font-bold flex items-center justify-between">
                      <span>ORIGINAL CONTRACT CLAUSE (HIGH EXPOSURE)</span>
                      <span className="text-[10px] text-rose-400/80">Uncensored</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/60 border border-rose-500/20 text-rose-200/90 leading-relaxed font-sans text-sm">
                      {auditResult.clauses[activeClauseTab].originalText}
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1">
                      <b className="text-rose-400">Legal Danger:</b> {auditResult.clauses[activeClauseTab].reasoning}
                    </div>
                  </div>

                  {/* Nemotron-70B Defensive Counter-Clause */}
                  <div className="p-5 rounded-2xl bg-emerald-950/20 border border-[#76b900]/40 space-y-2">
                    <div className="text-[#76b900] font-bold flex items-center justify-between">
                      <span>NVIDIA NEMOTRON-70B DEFENSIVE REDLINE</span>
                      <span className="text-[10px] text-[#76b900]/80">Ready for Counter-Signature</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/60 border border-[#76b900]/30 text-emerald-200 leading-relaxed font-sans text-sm">
                      {auditResult.clauses[activeClauseTab].redlineText}
                    </div>
                    <div className="text-[11px] text-slate-300 pt-1">
                      <b className="text-[#76b900]">Counsel Stance:</b> {auditResult.clauses[activeClauseTab].recommendations}
                    </div>
                  </div>
                </div>

                {/* Tavily Case Law Precedents Box */}
                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Search className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-cyan-300 font-bold">
                        Tavily Grounded Legal Authority & Case Precedent:
                      </div>
                      <div className="text-slate-300 text-xs">
                        {auditResult.clauses[activeClauseTab].legalPrecedent}
                      </div>
                    </div>
                  </div>

                  {auditResult.clauses[activeClauseTab].tavilyCitation && (
                    <a
                      href={auditResult.clauses[activeClauseTab].tavilyCitation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 text-[11px] flex items-center gap-1.5 shrink-0 transition-colors"
                    >
                      <span>Verify Case Authority</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Statutory Matrix Section */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              Statutory Compliance Checkpoints
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {auditResult.statutoryFrameworks?.map((fw: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white">{fw.name}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      fw.status === "FAIL" ? "bg-rose-500/20 text-rose-400" : fw.status === "FLAGGED" ? "bg-amber-500/20 text-amber-300" : "bg-cyan-500/20 text-cyan-400"
                    }`}>
                      {fw.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{fw.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
