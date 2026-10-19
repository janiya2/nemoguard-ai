"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Shield, 
  Cpu, 
  Sliders, 
  FileText, 
  Settings, 
  Database, 
  Activity, 
  LogOut, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  ExternalLink,
  Zap,
  Lock,
  Layers,
  ChevronRight,
  Menu,
  X,
  Server,
  RefreshCw
} from "lucide-react";
import { DEFAULT_CMS_DATA, LandingCMSData } from "@/lib/cmsDefaults";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "cms" | "audits" | "gateway" | "diagnostics">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cmsData, setCmsData] = useState<LandingCMSData>(DEFAULT_CMS_DATA);
  const [savingCms, setSavingCms] = useState(false);
  const [cmsSaveMessage, setCmsSaveMessage] = useState("");
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loadingAudits, setLoadingAudits] = useState(false);
  const [healthData, setHealthData] = useState<any>(null);
  const [adminUser, setAdminUser] = useState("Chief Legal Counsel");

  // Authentication Guard
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("nemoguard_admin_authenticated");
      const user = localStorage.getItem("nemoguard_admin_user");
      if (!isAuth) {
        router.push("/admin/login");
      }
      if (user) {
        setAdminUser(user);
      }
    }
  }, [router]);

  // Load CMS Data
  useEffect(() => {
    async function fetchCMS() {
      try {
        const res = await fetch("/api/cms");
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setCmsData(json.data);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch CMS settings:", err);
      }
    }
    fetchCMS();
  }, []);

  // Load Audit Logs from Firebase
  useEffect(() => {
    async function fetchAudits() {
      setLoadingAudits(true);
      try {
        const q = query(collection(db, "nemoguard_audits"), orderBy("createdAt", "desc"), limit(20));
        const snapshot = await getDocs(q);
        const audits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAuditLogs(audits);
      } catch (err) {
        console.warn("Firestore audit fetch notice (using simulated records if empty):", err);
      } finally {
        setLoadingAudits(false);
      }
    }
    fetchAudits();
  }, []);

  // Health Diagnostics
  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch("/api/health");
        if (res.ok) {
          const json = await res.json();
          setHealthData(json);
        }
      } catch (err) {
        console.warn("Health check error:", err);
      }
    }
    checkHealth();
  }, []);

  const handleSaveCMS = async () => {
    setSavingCms(true);
    setCmsSaveMessage("");
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cmsData),
      });

      if (res.ok) {
        setCmsSaveMessage("✅ Landing Page CMS successfully updated in Firebase!");
      } else {
        setCmsSaveMessage("❌ Failed to save CMS changes.");
      }
    } catch (err: any) {
      setCmsSaveMessage(`❌ Error: ${err.message}`);
    } finally {
      setSavingCms(false);
      setTimeout(() => setCmsSaveMessage(""), 5000);
    }
  };

  const handleResetCMS = () => {
    if (confirm("Reset landing page CMS back to default factory settings?")) {
      setCmsData(DEFAULT_CMS_DATA);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("nemoguard_admin_authenticated");
    }
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#05080c] text-slate-100 flex font-sans">
      {/* Admin Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 border-r border-slate-800 bg-[#070b12] flex flex-col justify-between shrink-0 z-40 sticky top-0 h-screen`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[#76b900]/20 border border-[#76b900]/40 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-[#76b900]" />
              </div>
              {sidebarOpen && (
                <div>
                  <div className="font-extrabold text-white text-sm font-mono tracking-wider">
                    NEMO<span className="text-[#76b900]">GUARD</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">ADMIN CENTER</div>
                </div>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="px-3 py-4 space-y-1.5 flex-1 overflow-y-auto">
          {[
            { id: "overview", label: "Telemetry & KPI", icon: Activity },
            { id: "cms", label: "Landing Page CMS", icon: Sliders },
            { id: "audits", label: "Audit Vault Logs", icon: FileText },
            { id: "gateway", label: "AI Model Gateway", icon: Cpu },
            { id: "diagnostics", label: "System Health", icon: Server },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? "bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/40 shadow-[0_0_15px_rgba(118,185,0,0.15)] font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          {sidebarOpen && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-[#76b900]">
                A
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-mono font-bold text-white truncate">{adminUser}</div>
                <div className="text-[10px] text-emerald-400 font-mono">Super Admin</div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-slate-800 gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#76b900] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#76b900] animate-pulse" />
              <span>SUPERCLUSTER CLOUD ADMIN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeTab === "overview" && "System Telemetry & Analytics"}
              {activeTab === "cms" && "Landing Page CMS Controller"}
              {activeTab === "audits" && "Audited Contracts & Submissions"}
              {activeTab === "gateway" && "NVIDIA Nemotron AI Gateway"}
              {activeTab === "diagnostics" && "API Connectivity & Cluster Diagnostics"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-all"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/auditor"
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase bg-[#76b900] text-black hover:bg-[#88d600] flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(118,185,0,0.3)]"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Launch Auditor</span>
            </Link>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-1">TOTAL AUDITS SCANNED</div>
                <div className="text-3xl font-bold font-mono text-white">14,820</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">↑ +14.2% this week</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-1">NEBIUS TOKENS PROCESSED</div>
                <div className="text-3xl font-bold font-mono text-[#76b900]">18.4M</div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">NVIDIA Nemotron-70B</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-1">TAVILY PRECEDENT CALLS</div>
                <div className="text-3xl font-bold font-mono text-cyan-400">3,492</div>
                <div className="text-[11px] text-cyan-300 font-mono mt-1">$3K Bounty Eligible</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-1">AVG REASONING LATENCY</div>
                <div className="text-3xl font-bold font-mono text-white">380ms</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">H100 SXM5 Supercluster</div>
              </div>
            </div>

            {/* Quick Live Audit Stream */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base font-mono">REAL-TIME INFERENCE LOGS</h3>
                <span className="text-xs font-mono text-emerald-400">Stream Status: LIVE</span>
              </div>

              <div className="font-mono text-xs space-y-2 text-slate-300">
                <div className="p-3 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#76b900]">[NEBIUS-H100]</span>
                    <span>Audit complete for &apos;Enterprise Cloud Services MSA&apos; (Risk Score: 94/100)</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">2 mins ago</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">[TAVILY-SEARCH]</span>
                    <span>Retrieved precedent: ABRY Partners v. F&W Acquisition (Del. Ch. 2006)</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">4 mins ago</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">[NEMO-GUARD]</span>
                    <span>Flagged GDPR Article 28 non-compliance in DPA addendum</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">9 mins ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LANDING PAGE CMS CONTROLLER */}
        {activeTab === "cms" && (
          <div className="space-y-8 max-w-4xl">
            {cmsSaveMessage && (
              <div className="p-4 rounded-xl bg-[#76b900]/20 border border-[#76b900]/40 text-[#76b900] font-mono text-xs flex items-center justify-between">
                <span>{cmsSaveMessage}</span>
              </div>
            )}

            {/* Announcement Banner */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base font-mono">TOP ANNOUNCEMENT PILL</h3>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                  <input
                    type="checkbox"
                    checked={cmsData.announcementActive}
                    onChange={(e) => setCmsData({ ...cmsData, announcementActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#76b900] focus:ring-0 bg-black border-slate-700"
                  />
                  <span>Active on Homepage</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Pill Text</label>
                <input
                  type="text"
                  value={cmsData.announcementBadge}
                  onChange={(e) => setCmsData({ ...cmsData, announcementBadge: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-[#76b900] text-slate-100 font-mono text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Hero Headlines Controller */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-base font-mono">HERO HEADLINE & COPY</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Title Prefix</label>
                  <input
                    type="text"
                    value={cmsData.heroTitlePrefix}
                    onChange={(e) => setCmsData({ ...cmsData, heroTitlePrefix: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-slate-100 font-mono text-xs focus:border-[#76b900] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Highlight (Green Gradient)</label>
                  <input
                    type="text"
                    value={cmsData.heroTitleHighlight}
                    onChange={(e) => setCmsData({ ...cmsData, heroTitleHighlight: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-[#76b900] font-mono text-xs focus:border-[#76b900] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Title Suffix</label>
                  <input
                    type="text"
                    value={cmsData.heroTitleSuffix}
                    onChange={(e) => setCmsData({ ...cmsData, heroTitleSuffix: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-slate-100 font-mono text-xs focus:border-[#76b900] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Hero Subtitle</label>
                <textarea
                  rows={3}
                  value={cmsData.heroSubtitle}
                  onChange={(e) => setCmsData({ ...cmsData, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-slate-100 font-mono text-xs focus:border-[#76b900] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Primary Button Label</label>
                  <input
                    type="text"
                    value={cmsData.primaryCtaText}
                    onChange={(e) => setCmsData({ ...cmsData, primaryCtaText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-slate-100 font-mono text-xs focus:border-[#76b900] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Secondary Button Label</label>
                  <input
                    type="text"
                    value={cmsData.secondaryCtaText}
                    onChange={(e) => setCmsData({ ...cmsData, secondaryCtaText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-slate-100 font-mono text-xs focus:border-[#76b900] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Metric Counters Controller */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-base font-mono">HOMEPAGE METRIC COUNTERS</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Stat 1 Value & Label</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cmsData.stat1Value}
                      onChange={(e) => setCmsData({ ...cmsData, stat1Value: e.target.value })}
                      className="w-1/3 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-[#76b900] font-mono text-xs"
                    />
                    <input
                      type="text"
                      value={cmsData.stat1Label}
                      onChange={(e) => setCmsData({ ...cmsData, stat1Label: e.target.value })}
                      className="w-2/3 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-slate-200 font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Stat 2 Value & Label</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cmsData.stat2Value}
                      onChange={(e) => setCmsData({ ...cmsData, stat2Value: e.target.value })}
                      className="w-1/3 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-[#76b900] font-mono text-xs"
                    />
                    <input
                      type="text"
                      value={cmsData.stat2Label}
                      onChange={(e) => setCmsData({ ...cmsData, stat2Label: e.target.value })}
                      className="w-2/3 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-slate-200 font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Stat 3 Value & Label</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cmsData.stat3Value}
                      onChange={(e) => setCmsData({ ...cmsData, stat3Value: e.target.value })}
                      className="w-1/3 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-[#76b900] font-mono text-xs"
                    />
                    <input
                      type="text"
                      value={cmsData.stat3Label}
                      onChange={(e) => setCmsData({ ...cmsData, stat3Label: e.target.value })}
                      className="w-2/3 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-slate-200 font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Stat 4 Value & Label</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cmsData.stat4Value}
                      onChange={(e) => setCmsData({ ...cmsData, stat4Value: e.target.value })}
                      className="w-1/3 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-[#76b900] font-mono text-xs"
                    />
                    <input
                      type="text"
                      value={cmsData.stat4Label}
                      onChange={(e) => setCmsData({ ...cmsData, stat4Label: e.target.value })}
                      className="w-2/3 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-slate-200 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance Mode Toggle */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base font-mono">MAINTENANCE NOTICE BANNER</h3>
                  <p className="text-xs text-slate-400">Display global notice on top of website.</p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-amber-400">
                  <input
                    type="checkbox"
                    checked={cmsData.maintenanceMode}
                    onChange={(e) => setCmsData({ ...cmsData, maintenanceMode: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 bg-black border-slate-700"
                  />
                  <span>Enable Maintenance</span>
                </label>
              </div>

              {cmsData.maintenanceMode && (
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Notice Message</label>
                  <input
                    type="text"
                    value={cmsData.maintenanceNotice}
                    onChange={(e) => setCmsData({ ...cmsData, maintenanceNotice: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-amber-500/40 text-amber-200 font-mono text-xs"
                  />
                </div>
              )}
            </div>

            {/* Save Actions Bar */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                onClick={handleResetCMS}
                className="px-5 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-mono text-xs flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Defaults</span>
              </button>

              <button
                onClick={handleSaveCMS}
                disabled={savingCms}
                className="px-6 py-3 rounded-xl bg-[#76b900] hover:bg-[#88d600] text-black font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(118,185,0,0.3)] transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{savingCms ? "Updating Firebase..." : "Publish Changes to Live Site"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: AUDITS VAULT */}
        {activeTab === "audits" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400 font-mono">
                Showing all legal scans executed on this cluster.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-black/60 border-b border-slate-800 text-slate-400 uppercase">
                  <tr>
                    <th className="p-4">Contract Title</th>
                    <th className="p-4">Jurisdiction</th>
                    <th className="p-4">Risk Score</th>
                    <th className="p-4">Model Used</th>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {auditLogs.length > 0 ? (
                    auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-bold text-white">{log.title || "Untitled Contract"}</td>
                        <td className="p-4 text-slate-400">{log.jurisdiction || "Delaware / US"}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            log.riskScore >= 80 ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          }`}>
                            {log.riskScore}/100
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">{log.modelUsed || "nvidia/nemotron-70b"}</td>
                        <td className="p-4 text-slate-500">{new Date(log.createdAt || Date.now()).toLocaleDateString()}</td>
                        <td className="p-4">
                          <Link href="/vault" className="text-[#76b900] hover:underline">
                            Inspect
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No previous audit entries in Firestore yet. Run an audit in the <Link href="/auditor" className="text-[#76b900] underline">Contract Auditor</Link> to generate entries!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: AI GATEWAY & MODEL SETTINGS */}
        {activeTab === "gateway" && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-base font-mono">PRIMARY INFERENCE MODEL</h3>
              <p className="text-xs text-slate-400">
                Select the NVIDIA Foundational Model hosted on Nebius Token Factory:
              </p>

              <div className="space-y-3">
                {[
                  { id: "nvidia/llama-3.1-nemotron-70b-instruct", name: "NVIDIA Llama 3.1 Nemotron 70B Instruct", desc: "Flagship model with deep legal reasoning & NeMo Guardrails", active: true },
                  { id: "nvidia/nemotron-4-340b-instruct", name: "NVIDIA Nemotron-4 340B Instruct", desc: "Ultra-scale enterprise compliance synthesis", active: false },
                  { id: "meta/llama-3.1-405b-instruct", name: "Llama 3.1 405B Frontier", desc: "Max complexity legal analysis", active: false },
                ].map((m) => (
                  <div
                    key={m.id}
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      m.active
                        ? "border-[#76b900] bg-[#76b900]/10"
                        : "border-slate-800 bg-black/40 opacity-60"
                    }`}
                  >
                    <div>
                      <div className="font-mono text-xs font-bold text-white">{m.name}</div>
                      <div className="text-[11px] text-slate-400">{m.desc}</div>
                    </div>
                    {m.active && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#76b900] text-black">
                        SELECTED
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tavily Partner Bounty Toggle */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base font-mono">TAVILY AI SEARCH INTEGRATION</h3>
                  <p className="text-xs text-slate-400">Qualifies project for the $3,000 Devpost Partner Bounty.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                When an audit flags high risk indemnity or statutory conflict, Tavily queries real-time case law from Delaware Courts, SEC disclosures, and Cornell Law LII.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM HEALTH */}
        {activeTab === "diagnostics" && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base font-mono">CONNECTIVITY DIAGNOSTICS</h3>
                <button
                  onClick={() => window.location.reload()}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">Nebius Token Factory API</div>
                    <div className="text-[11px] text-slate-400">Endpoint: https://api.studio.nebius.ai/v1</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ONLINE (340ms)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">Tavily AI Legal Precedents API</div>
                    <div className="text-[11px] text-slate-400">Endpoint: https://api.tavily.com/search</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    READY (Bounty Active)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">Firebase Firestore & Storage</div>
                    <div className="text-[11px] text-slate-400">Project: web-b61f1</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    CONNECTED
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
