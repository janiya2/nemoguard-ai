import Link from "next/link";
import { Shield, Cpu, Lock, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#040609] text-slate-400 text-xs font-sans mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#76b900]/20 border border-[#76b900]/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#76b900]" />
              </div>
              <span className="font-extrabold text-white text-base font-mono">
                NEMO<span className="text-[#76b900]">GUARD</span> AI
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Autonomous Legal & Regulatory Intelligence Engine built for the Nebius × NVIDIA Global AI Hackathon.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#76b900]">
              <span className="w-2 h-2 rounded-full bg-[#76b900]" />
              <span>Nebius Supercluster v2.4</span>
            </div>
          </div>

          {/* Infrastructure */}
          <div className="space-y-2">
            <h4 className="text-white font-mono text-xs uppercase tracking-wider font-semibold">
              AI Stack
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <span className="text-slate-300">NVIDIA Nemotron-70B</span> (Reasoning)
              </li>
              <li>
                <span className="text-slate-300">Nebius Token Factory</span> (GPU Cloud)
              </li>
              <li>
                <span className="text-slate-300">Tavily AI Search</span> ($3K Partner Bounty)
              </li>
              <li>
                <span className="text-slate-300">NeMo Guardrails</span> (Hallucination Free)
              </li>
            </ul>
          </div>

          {/* Compliance Frameworks */}
          <div className="space-y-2">
            <h4 className="text-white font-mono text-xs uppercase tracking-wider font-semibold">
              Jurisdictions
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Delaware Chancery Court Precedents</li>
              <li>European Union AI Act (2024/1689)</li>
              <li>GDPR Article 28 / DPA Compliance</li>
              <li>FTC Restrictive Covenant Ban (16 CFR)</li>
            </ul>
          </div>

          {/* Quick Access */}
          <div className="space-y-2">
            <h4 className="text-white font-mono text-xs uppercase tracking-wider font-semibold">
              Portals
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/auditor" className="hover:text-[#76b900] transition-colors">
                  Contract Auditor
                </Link>
              </li>
              <li>
                <Link href="/vault" className="hover:text-[#76b900] transition-colors">
                  Precedent Vault
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-[#76b900] hover:underline flex items-center gap-1 font-mono">
                  <Lock className="w-3 h-3" />
                  Admin CMS Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 NemoGuard AI. Apache-2.0 License. Built for the Nebius × NVIDIA Global AI Hackathon on Devpost.</p>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-[#76b900]">H100 SXM5 Verified</span>
            <span>•</span>
            <span className="text-cyan-400">Tavily Grounded</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
