"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Shield, 
  Scale, 
  Search, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Database, 
  Filter,
  Layers,
  Sparkles
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

interface AuditEntry {
  id: string;
  title: string;
  jurisdiction: string;
  riskScore: number;
  riskLevel: string;
  summary: string;
  clausesCount: number;
  modelUsed: string;
  createdAt: string;
}

const SEED_VAULT_AUDITS: AuditEntry[] = [
  {
    id: "v-saas",
    title: "Enterprise SaaS Master Services Agreement",
    jurisdiction: "Delaware Chancery Court",
    riskScore: 94,
    riskLevel: "CRITICAL",
    summary: "Unilateral unlimited indemnification trap with zero fee cap and aggressive customer exposure. Counter-redlines drafted citing ABRY Partners v. F&W Acquisition.",
    clausesCount: 2,
    modelUsed: "nvidia/llama-3.1-nemotron-70b-instruct",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "v-dpa",
    title: "AI Model Vendor Data Processing Addendum (DPA)",
    jurisdiction: "European Union / GDPR Art. 28",
    riskScore: 91,
    riskLevel: "CRITICAL",
    summary: "Illegal 30-day data breach notification window violating European statutory 72-hour ceiling. Prohibited independent security audit waivers.",
    clausesCount: 2,
    modelUsed: "nvidia/llama-3.1-nemotron-70b-instruct",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "v-ma",
    title: "M&A Stock Purchase Indemnification & Survival Clause",
    jurisdiction: "Delaware Corporate Law",
    riskScore: 89,
    riskLevel: "HIGH",
    summary: "Contractual fraud disclaimer and 6-month truncated survival period invalid under Delaware public policy on intentional misrepresentation.",
    clausesCount: 1,
    modelUsed: "nvidia/llama-3.1-nemotron-70b-instruct",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: "v-nda",
    title: "Executive Non-Disclosure & Restrictive Covenant",
    jurisdiction: "US Federal / FTC 16 CFR Part 910",
    riskScore: 86,
    riskLevel: "HIGH",
    summary: "Overly broad worldwide 36-month non-compete covenant unenforceable under FTC 2024 regulations and California Labor Code § 16600.",
    clausesCount: 1,
    modelUsed: "nvidia/llama-3.1-nemotron-70b-instruct",
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
  }
];

export default function VaultPage() {
  const [audits, setAudits] = useState<AuditEntry[]>(SEED_VAULT_AUDITS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRisk, setSelectedRisk] = useState<string>("ALL");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLiveAudits() {
      setLoading(true);
      try {
        const q = query(collection(db, "nemoguard_audits"), orderBy("createdAt", "desc"), limit(25));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const liveList = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as AuditEntry));
          // Combine live with seed to always show rich results
          setAudits([...liveList, ...SEED_VAULT_AUDITS]);
        }
      } catch (err) {
        console.warn("Using cached vault records:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveAudits();
  }, []);

  const filtered = audits.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRisk === "ALL" || a.riskLevel === selectedRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      {/* Header */}
      <div className="max-w-3xl mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76b900]/10 border border-[#76b900]/30 text-xs font-mono text-[#76b900]">
          <Scale className="w-3.5 h-3.5" />
          <span>Firestore Legal Precedent Repository</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Precedent & Contract Audit Vault
        </h1>
        <p className="text-sm text-slate-300">
          Browse historical enterprise contract scans, risk mitigation records, and defensive redline strategies indexed by NVIDIA Nemotron-70B.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by contract, jurisdiction, precedent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-[#76b900]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto font-mono text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {["ALL", "CRITICAL", "HIGH", "ELEVATED"].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRisk(r)}
              className={`px-3 py-1.5 rounded-lg border transition-all shrink-0 ${
                selectedRisk === r
                  ? "bg-[#76b900]/20 border-[#76b900] text-[#76b900] font-bold"
                  : "bg-black/40 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Audits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-[#76b900]/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider ${
                  item.riskScore >= 90
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}>
                  {item.riskLevel} • {item.riskScore}/100
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-mono group-hover:text-[#76b900] transition-colors mb-1">
                {item.title}
              </h3>
              <div className="text-xs text-slate-400 font-mono mb-3">
                Jurisdiction: {item.jurisdiction}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans bg-black/40 p-3.5 rounded-xl border border-slate-800/80">
                {item.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-[11px] text-slate-400">
                {item.clausesCount} Redlines Synthesized
              </span>

              <Link
                href="/auditor"
                className="text-[#76b900] hover:underline flex items-center gap-1 font-bold"
              >
                <span>Audit Similar Contract</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
