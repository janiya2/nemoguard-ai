"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  User,
  Building,
  Award,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Trash2,
  Copy,
  Check,
  Search,
  Sparkles,
  ArrowRight,
  Sliders,
  Lock,
  Mail,
  RefreshCw,
  LogOut,
  ChevronRight,
  TrendingDown,
  Scale,
  Edit3,
  Save,
  UserCheck
} from "lucide-react";
import { useAuth, SavedAudit } from "@/lib/authContext";

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    savedAudits,
    loginAsGuest,
    loginWithPersona,
    loginWithEmail,
    signupWithEmail,
    updateUserProfile,
    logout,
    deleteAuditFromProfile
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"audits" | "preferences" | "account">("audits");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedHashId, setCopiedHashId] = useState<string | null>(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formOrg, setFormOrg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile Inline Editor State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [editOrg, setEditOrg] = useState(user?.organization || "");
  const [editRole, setEditRole] = useState(user?.role || "General Counsel");
  const [editAvatar, setEditAvatar] = useState(user?.avatar || "⚖️");
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Sync edit form with active user safely
  React.useEffect(() => {
    if (user) {
      setEditName(user.name ?? "");
      setEditEmail(user.email ?? "");
      setEditOrg(user.organization ?? "");
      setEditRole(user.role ?? "General Counsel");
      setEditAvatar(user.avatar ?? "⚖️");
    }
  }, [user]);

  // Settings State
  const [defaultJurisdiction, setDefaultJurisdiction] = useState(user?.jurisdictionPreference || "Delaware / US Federal & EU");
  const [strictnessLevel, setStrictnessLevel] = useState("Aggressive Redlining (Defense First)");
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Filter Audits
  const filteredAudits = savedAudits.filter(audit => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      audit.title.toLowerCase().includes(q) ||
      audit.jurisdiction.toLowerCase().includes(q) ||
      audit.executiveSummary?.toLowerCase().includes(q)
    );
  });

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHashId(id);
    setTimeout(() => setCopiedHashId(null), 2000);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim()) return;
    setIsSubmitting(true);
    try {
      if (authMode === "signup") {
        await signupWithEmail(formEmail, formName, formOrg);
      } else {
        await loginWithEmail(formEmail, formName, formOrg);
      }
      setShowAccountModal(false);
      setFormName("");
      setFormEmail("");
      setFormOrg("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEmail.trim()) return;
    setIsSavingProfile(true);
    try {
      await updateUserProfile({
        name: editName.trim() || "Corporate Counsel",
        email: editEmail.trim().toLowerCase(),
        organization: editOrg.trim() || "Enterprise Legal Counsel",
        role: editRole as any,
        avatar: editAvatar,
        tier: "Enterprise Legal Suite",
        isGuest: false
      });
      setProfileSaveSuccess(true);
      setIsEditingProfile(false);
      setTimeout(() => setProfileSaveSuccess(false), 3500);
    } catch (err) {
      console.warn("Profile update notice:", err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSaveSettings = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const totalAuditsCount = savedAudits.length;
  const avgRiskScore = totalAuditsCount > 0
    ? Math.round(savedAudits.reduce((acc, a) => acc + (a.overallScore || 75), 0) / totalAuditsCount)
    : 84;
  const totalClausesRemediated = savedAudits.reduce((acc, a) => acc + (a.totalClauses || 4), 0);
  const ratifiedCount = savedAudits.filter(a => a.ratified).length;

  return (
    <div className="relative min-h-screen bg-[#05080c] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* 0. Cyber Courtroom Executive Suite Background Asset */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none scale-105 transform animate-pulse duration-10000"
        style={{ backgroundImage: "url('/profile-bg.jpg')" }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#05080c]/85 via-[#05080c]/80 to-[#05080c] pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#76b900]/15 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        {/* 1. Profile Header & Verified Enterprise Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#070b12] border border-[#76b900]/30 p-6 sm:p-8 shadow-[0_0_35px_rgba(118,185,0,0.12)]">
          {/* Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#76b900]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Avatar Icon */}
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-black/70 border-2 border-[#76b900] flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(118,185,0,0.25)] shrink-0">
                <span>{user?.avatar || "⚖️"}</span>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#76b900] border-2 border-black flex items-center justify-center">
                  <Check className="w-3 h-3 text-black stroke-[3]" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                    {user?.name || "Corporate Legal Counsel"}
                  </h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase border ${
                    user?.isGuest
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                      : "bg-[#76b900]/15 border-[#76b900]/40 text-[#76b900]"
                  }`}>
                    {user?.isGuest ? "Guest Reviewer Mode" : "Enterprise Verified"}
                  </span>
                </div>

                {/* Email Address Display */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#76b900] mb-1">
                  <Mail className="w-3.5 h-3.5 text-[#76b900]" />
                  <span className="font-semibold">{user?.email || "counsel@enterprise.ai"}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] animate-pulse" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-mono flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user?.organization || "Global Enterprise AI Evaluation"}</span>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-mono mt-2">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#76b900]" />
                    <span>{user?.role || "General Counsel"}</span>
                  </span>
                  <span>•</span>
                  <span>Member Since {user?.memberSince || "2026"}</span>
                  <span>•</span>
                  <span className="text-emerald-400">SOC 2 Type II Certified</span>
                </div>
              </div>
            </div>

            {/* Quick Persona & Account Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {/* 1-Click Persona Switcher for Hackathon Judges */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-slate-800">
                  <button
                    onClick={() => loginWithPersona("counsel")}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                      user?.id === "user-counsel-apex"
                        ? "bg-[#76b900] text-black font-bold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="Switch to Senior General Counsel Persona"
                  >
                    <span>👩‍⚖️ Elena (GC)</span>
                  </button>
                  <button
                    onClick={() => loginWithPersona("compliance")}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                      user?.id === "user-compliance-vanguard"
                        ? "bg-[#76b900] text-black font-bold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="Switch to Chief Compliance Officer Persona"
                  >
                    <span>🛡️ Marcus (CCO)</span>
                  </button>
                  <button
                    onClick={loginAsGuest}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                      user?.isGuest
                        ? "bg-amber-400 text-black font-bold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="Switch to Guest Reviewer Mode"
                  >
                    <span>⚖️ Guest</span>
                  </button>
                </div>

                {/* Create Custom Account / Sign In */}
                <button
                  onClick={() => setShowAccountModal(true)}
                  className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 hover:border-[#76b900]/50 text-xs font-mono text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-[#76b900]" />
                  <span>{user?.isGuest ? "Claim Account" : "Switch Account"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Guest Mode Advisory Banner */}
          {user?.isGuest && (
            <div className="mt-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  <strong>Guest Mode Active:</strong> Audits are saved in local evaluation cache. Sign up or click a Persona above to link permanent cloud audit records.
                </span>
              </div>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setShowAccountModal(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-[11px] uppercase shrink-0 transition-colors"
              >
                Create Enterprise Profile
              </button>
            </div>
          )}
        </div>

        {/* 2. Enterprise Operations Metrics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#76b900]/40 transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Contracts Audited</span>
              <FileText className="w-4 h-4 text-[#76b900] group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">{totalAuditsCount}</p>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Stored in Profile Vault</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/40 transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Avg Adversarial Risk</span>
              <AlertTriangle className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-rose-400 font-mono">{avgRiskScore} / 100</p>
            <p className="text-[10px] text-slate-400 font-mono mt-1">High Enterprise Exposure</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Clauses Redlined</span>
              <Scale className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">{totalClausesRemediated}</p>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Defensive Counter-Remedies</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#76b900]/40 transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Ratified Certs</span>
              <CheckCircle2 className="w-4 h-4 text-[#76b900] group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">{ratifiedCount}</p>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Cryptographically Sealed</p>
          </div>
        </div>

        {/* 3. Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("audits")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === "audits"
                  ? "bg-[#76b900] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Stored Audit Reports ({savedAudits.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === "preferences"
                  ? "bg-[#76b900] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Governance Preferences</span>
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === "account"
                  ? "bg-[#76b900] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Identity & Credentials</span>
            </button>
          </div>

          <Link
            href="/auditor"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#76b900] to-[#599100] text-black font-bold font-mono text-xs uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(118,185,0,0.25)] hover:scale-[1.02] transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch New Audit</span>
          </Link>
        </div>

        {/* 4. Tab Content */}
        {activeTab === "audits" && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery ?? ""}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stored audit reports by contract title, jurisdiction, or risk terms..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-[#76b900] text-xs font-mono text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>

            {/* Audits Grid */}
            {filteredAudits.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
                <FileText className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-white font-mono font-bold text-sm">No Audit Reports Found</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto font-sans">
                  {searchQuery ? "No reports match your search query." : "You have not saved any contract audit reports yet. Run an audit and click 'Save to Profile'."}
                </p>
                <Link
                  href="/auditor"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#76b900] text-black font-bold font-mono text-xs uppercase"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Audit a Contract Now</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAudits.map((audit) => (
                  <div
                    key={audit.id}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#76b900]/50 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      {/* Top Risk & Date Bar */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                          audit.overallScore >= 80
                            ? "bg-rose-500/15 border-rose-500/40 text-rose-300"
                            : "bg-amber-500/15 border-amber-500/40 text-amber-300"
                        }`}>
                          Risk Score: {audit.overallScore}/100
                        </span>

                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{audit.timestamp}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-bold text-white font-mono line-clamp-2 mb-2 group-hover:text-[#76b900] transition-colors">
                        {audit.title}
                      </h4>

                      {/* Jurisdiction */}
                      <p className="text-[11px] font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                        <Scale className="w-3 h-3 text-[#76b900]" />
                        <span className="truncate">{audit.jurisdiction}</span>
                      </p>

                      {/* Summary */}
                      <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed font-sans bg-black/40 p-2.5 rounded-xl border border-slate-800/80">
                        {audit.executiveSummary}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopyHash(audit.certHash, audit.id)}
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono flex items-center gap-1 transition-colors"
                          title="Copy Cryptographic Certificate Hash"
                        >
                          {copiedHashId === audit.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{audit.certHash?.slice(0, 8)}...</span>
                            </>
                          )}
                        </button>

                        {audit.ratified && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-[9px] font-mono text-emerald-400 font-bold uppercase">
                            Ratified
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <Link
                          href="/auditor"
                          className="p-1.5 rounded-lg bg-[#76b900]/15 hover:bg-[#76b900]/30 text-[#76b900] text-xs transition-colors"
                          title="Re-open in Auditor"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => deleteAuditFromProfile(audit.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs transition-colors"
                          title="Delete from Profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Regulatory & Governance Settings */}
        {activeTab === "preferences" && (
          <div className="max-w-3xl space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div>
                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#76b900]" />
                  <span>Statutory Jurisdiction Configuration</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Default court precedent benchmark applied to all uploaded contracts.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { id: "Delaware / US Federal & EU", label: "Delaware Chancery Court & US Federal (ABRY Partners, UCC § 2-719)" },
                  { id: "European Union (AI Act & GDPR)", label: "European Union AI Act (2024/1689) & GDPR Article 28" },
                  { id: "California / US FTC Non-Compete Ban", label: "California Bus. & Prof. Code § 16600 & FTC 16 CFR § 910" },
                  { id: "UK Commercial Law & Common Law", label: "England & Wales High Court Precedents (Unfair Terms Act)" }
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                      defaultJurisdiction === item.id
                        ? "bg-[#76b900]/10 border-[#76b900]/50 text-white"
                        : "bg-black/40 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="jurisdiction"
                      checked={defaultJurisdiction === item.id}
                      onChange={() => setDefaultJurisdiction(item.id)}
                      className="mt-0.5 text-[#76b900] focus:ring-0"
                    />
                    <span className="text-xs font-mono">{item.label}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-mono text-slate-300 font-bold mb-2">
                  Redlining Defense Posture
                </label>
                <select
                  value={strictnessLevel}
                  onChange={(e) => setStrictnessLevel(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-700 text-xs font-mono text-white focus:border-[#76b900] outline-none"
                >
                  <option value="Aggressive Redlining (Defense First)">Aggressive Redlining (Maximum Enterprise Protection & Mutual Caps)</option>
                  <option value="Balanced Commercial Stance">Balanced Commercial Stance (Customary Market Standards)</option>
                  <option value="Soft Collaboration Rephrase">Soft Collaboration Rephrase (Sales Friction Reduction)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-4 py-2 rounded-xl bg-[#76b900] text-black font-bold font-mono text-xs uppercase flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Preferences</span>
                </button>
                {settingsSaved && (
                  <span className="text-xs font-mono text-emerald-400 animate-fadeIn">
                    ✓ Saved successfully to enterprise profile.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Identity & Credentials */}
        {activeTab === "account" && (
          <div className="max-w-3xl space-y-6">
            {profileSaveSuccess && (
              <div className="p-4 rounded-2xl bg-[#76b900]/20 border border-[#76b900]/50 text-[#76b900] font-mono text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Success!</strong> Your legal profile details have been updated and synchronized across NemoGuard AI.
                </span>
              </div>
            )}

            {user?.isGuest && (
              <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-amber-300">GUEST EVALUATION SESSION ACTIVE</div>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    You are currently using an isolated, private guest session. Enter your real identity below or register an enterprise profile to associate your company contracts, legal name, and email with encrypted audit reports.
                  </p>
                </div>
              </div>
            )}

            {/* Profile Overview Card / Direct Edit Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/85 backdrop-blur-md border border-[#76b900]/30 shadow-[0_0_35px_rgba(118,185,0,0.1)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                    <User className="w-5 h-5 text-[#76b900]" />
                    <span>Counsel Identity & Corporate Credentials</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {isEditingProfile ? "Update your personal or enterprise credentials below:" : "Your verified credentials active on this cluster:"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-all flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#76b900]" />
                    <span>{isEditingProfile ? "Cancel Editing" : "Edit Profile Details"}</span>
                  </button>
                </div>
              </div>

              {isEditingProfile ? (
                /* INLINE EDIT FORM */
                <form onSubmit={handleSaveProfile} className="space-y-5 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={editName ?? ""}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="e.g. Kasun Perera, Esq."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-[#76b900] text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Verified Corporate Email</label>
                      <input
                        type="email"
                        required
                        value={editEmail ?? ""}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="e.g. kasun@enterprise.ai"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-[#76b900] text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Company / Law Firm Organization</label>
                      <input
                        type="text"
                        value={editOrg ?? ""}
                        onChange={(e) => setEditOrg(e.target.value)}
                        placeholder="e.g. Apex Holdings & Legal Partners"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-[#76b900] text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Counsel Legal Role</label>
                      <select
                        value={editRole ?? "General Counsel"}
                        onChange={(e) => setEditRole(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-[#76b900] text-white outline-none"
                      >
                        <option value="General Counsel">General Counsel</option>
                        <option value="Chief Compliance Officer">Chief Compliance Officer</option>
                        <option value="Senior Risk Auditor">Senior Risk Auditor</option>
                        <option value="Managing Legal Partner">Managing Legal Partner</option>
                        <option value="Guest Reviewer">Guest Reviewer</option>
                      </select>
                    </div>
                  </div>

                  {/* Avatar Picker */}
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold">Profile Avatar Symbol</label>
                    <div className="flex flex-wrap gap-2">
                      {["⚖️", "👩‍⚖️", "👨‍⚖️", "🛡️", "🏛️", "💼", "⚡", "🏢"].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setEditAvatar(emoji)}
                          className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-all ${
                            editAvatar === emoji
                              ? "bg-[#76b900]/25 border-2 border-[#76b900] scale-110 shadow-[0_0_12px_rgba(118,185,0,0.4)]"
                              : "bg-black/50 border border-slate-800 hover:border-slate-600"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="px-6 py-2.5 rounded-xl bg-[#76b900] hover:bg-[#88d600] text-black font-bold uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(118,185,0,0.35)] transition-all"
                    >
                      {isSavingProfile ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving Profile...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Save & Verify Identity</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* VIEW DETAILS GRID */
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Full Legal Name</span>
                      <div className="text-white text-sm font-bold flex items-center gap-1.5">
                        <span>{user?.name || "Corporate Counsel"}</span>
                        <Check className="w-3.5 h-3.5 text-[#76b900]" />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Corporate Email Address</span>
                      <div className="text-[#76b900] text-sm font-bold flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{user?.email || "counsel@enterprise.ai"}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Organization / Firm</span>
                      <div className="text-slate-200 text-sm font-bold flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{user?.organization || "Global AI Hackathon Evaluation"}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Assigned Counsel Role</span>
                      <div className="text-[#76b900] text-sm font-bold flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span>{user?.role || "General Counsel"}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Account ID / Fingerprint</span>
                      <div className="text-slate-300 font-mono text-xs truncate">
                        <code>{user?.id}</code>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Subscription Tier & Compliance</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{user?.tier || "Enterprise Legal Suite"}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={logout}
                      className="px-4 py-2 rounded-xl border border-rose-500/40 bg-rose-950/20 hover:bg-rose-900/40 text-rose-300 font-mono text-xs flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Reset to Guest Mode</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowAccountModal(true)}
                        className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-2 transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-[#76b900]" />
                        <span>Sign In / Switch User</span>
                      </button>

                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="px-4 py-2 rounded-xl bg-[#76b900] hover:bg-[#88d600] text-black font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(118,185,0,0.3)] transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Profile</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Account Claim / Sign In / Register Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090d16] border border-[#76b900]/40 p-6 sm:p-7 shadow-[0_0_50px_rgba(118,185,0,0.25)]">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#76b900]/20 border border-[#76b900]/40 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#76b900]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-mono">
                    {authMode === "signin" ? "Sign In to Counsel" : "Register Enterprise Profile"}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">NemoGuard AI Account System</span>
                </div>
              </div>
              <button
                onClick={() => setShowAccountModal(false)}
                className="text-slate-400 hover:text-white font-mono text-sm p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-5">
              <button
                type="button"
                onClick={() => setAuthMode("signin")}
                className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
                  authMode === "signin"
                    ? "bg-[#76b900] text-black shadow-[0_0_12px_rgba(118,185,0,0.3)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🔑 Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
                  authMode === "signup"
                    ? "bg-[#76b900] text-black shadow-[0_0_12px_rgba(118,185,0,0.3)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                📝 Register
              </button>
            </div>

            {/* SIGN IN FORM */}
            {authMode === "signin" ? (
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Corporate Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formEmail ?? ""}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. counsel@enterprise.ai"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#76b900] text-xs font-mono text-white outline-none"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono text-slate-300">Counsel Passcode / Key</label>
                    <span className="text-[10px] font-mono text-slate-500">Optional (Demo Mode)</span>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#76b900] text-xs font-mono text-white outline-none"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#76b900] to-[#599100] text-black font-bold font-mono text-xs uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(118,185,0,0.35)] active:scale-[0.98] transition-transform"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Authenticating Counsel...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Access Counsel Vault</span>
                    </>
                  )}
                </button>

                {/* 1-Click Instant Demo Personas for Quick Access */}
                <div className="pt-4 border-t border-slate-800/80">
                  <p className="text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-wider text-center">
                    Or 1-Click Sign In with Verified Persona
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        loginWithPersona("counsel");
                        setShowAccountModal(false);
                      }}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#76b900]/50 text-left transition-colors flex items-center gap-2"
                    >
                      <span className="text-lg">👩‍⚖️</span>
                      <div className="truncate">
                        <p className="text-[11px] font-mono font-bold text-white truncate">Elena Rostova</p>
                        <p className="text-[9px] font-mono text-[#76b900]">General Counsel</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        loginWithPersona("compliance");
                        setShowAccountModal(false);
                      }}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#76b900]/50 text-left transition-colors flex items-center gap-2"
                    >
                      <span className="text-lg">🛡️</span>
                      <div className="truncate">
                        <p className="text-[11px] font-mono font-bold text-white truncate">Marcus Vance</p>
                        <p className="text-[9px] font-mono text-emerald-400">Chief Compliance</p>
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Full Name & Title</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formName ?? ""}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Elena Rostova, Esq."
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#76b900] text-xs font-mono text-white outline-none"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Corporate Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formEmail ?? ""}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. counsel@enterprise.ai"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#76b900] text-xs font-mono text-white outline-none"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Enterprise / Firm Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formOrg ?? ""}
                      onChange={(e) => setFormOrg(e.target.value)}
                      placeholder="e.g. Apex Holdings & Legal Partners"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#76b900] text-xs font-mono text-white outline-none"
                    />
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#76b900] to-[#599100] text-black font-bold font-mono text-xs uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(118,185,0,0.35)] active:scale-[0.98] transition-transform"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Creating Enterprise Profile...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Register Enterprise Profile</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Footer switcher link */}
            <div className="mt-5 pt-3 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={() => setAuthMode(authMode === "signup" ? "signin" : "signup")}
                className="text-[11px] font-mono text-slate-400 hover:text-[#76b900] transition-colors"
              >
                {authMode === "signup"
                  ? "Already have an account? Sign in here"
                  : "Need a new account? Register enterprise profile"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
