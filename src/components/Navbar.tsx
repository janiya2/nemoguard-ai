"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  LayoutGrid,
  Database,
  User,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Lock,
  Swords,
  Zap,
  Gauge
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/authContext";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  // Close mobile menu whenever pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // If inside admin dashboard, the admin sidebar handles navigation
  const isAdminDashboard = pathname.startsWith("/admin/dashboard");
  if (isAdminDashboard) {
    return null;
  }

  const navLinks = [
    { name: "Overview", href: "/", icon: LayoutGrid, desc: "Autonomous System Specs" },
    { name: "Contract Auditor", href: "/auditor", icon: Shield, desc: "Nemotron-70B Live Redliner" },
    { name: "AI War Room", href: "/war-room", icon: Swords, desc: "Multi-Agent Dispute Settlement" },
    { name: "NeMo Guardrails", href: "/guardrails", icon: Zap, desc: "Adversarial Stress-Test Sandbox", isHighlight: true },
    { name: "H100 Benchmark", href: "/benchmark", icon: Gauge, desc: "Nemotron vs. GPT-4o Token Race", isHighlight: true },
    { name: "Precedent Vault", href: "/vault", icon: Database, desc: "Tavily Real-Time Grounding" },
    { name: "Counsel Profile", href: "/profile", icon: User, desc: "Audits, Vault & Identity" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-[#040812]/92 backdrop-blur-2xl border-b border-slate-800/80 shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
        {/* Ambient Top Laser Flare */}
        <div className="absolute -top-10 left-1/4 right-1/4 h-14 bg-gradient-to-r from-transparent via-[#76b900]/20 via-cyan-400/15 to-transparent blur-2xl pointer-events-none" />

        {/* Ambient Glowing Bottom Laser Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#76b900] via-[#00f0ff] to-transparent pointer-events-none shadow-[0_0_12px_rgba(118,185,0,0.7)]" />

        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between relative z-10">
          {/* Brand Logo & Supercluster Identity */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center p-1 rounded-xl bg-gradient-to-br from-[#76b900]/30 via-[#0a1222] to-[#040814] border border-[#76b900]/60 shadow-[0_0_20px_rgba(118,185,0,0.4)] group-hover:shadow-[0_0_30px_rgba(118,185,0,0.7)] group-hover:border-[#76b900] transition-all duration-300">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden bg-black/90 relative">
                <img
                  src="/logo.png"
                  alt="NemoGuard AI Official Emblem"
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-300"
                />
              </div>
              {/* Pulsing Emerald Ping Dot */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#76b900] opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#76b900] shadow-[0_0_8px_#76b900]" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold tracking-wider text-white text-base sm:text-lg font-mono">
                  NEMO<span className="text-[#76b900] drop-shadow-[0_0_12px_rgba(118,185,0,0.7)]">GUARD</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black tracking-widest uppercase bg-gradient-to-r from-[#76b900]/25 to-emerald-500/20 text-[#76b900] border border-[#76b900]/50 rounded-md shadow-[0_0_10px_rgba(118,185,0,0.25)]">
                  AI
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-tight -mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>NVIDIA Nemotron • Nebius H100</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Floating Dock */}
          <nav className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-[#070d18]/85 border border-slate-800/90 backdrop-blur-md shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl transition-all duration-200 text-xs font-mono tracking-wide flex items-center gap-1.5 relative group ${
                    isActive
                      ? "text-white bg-gradient-to-r from-[#76b900]/25 via-[#76b900]/15 to-transparent border border-[#76b900]/60 shadow-[0_0_16px_rgba(118,185,0,0.3)] font-bold"
                      : link.isHighlight
                      ? "text-[#76b900] hover:text-white bg-[#76b900]/10 hover:bg-[#76b900]/20 border border-[#76b900]/30 hover:border-[#76b900]/60 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#76b900]" : link.isHighlight ? "text-[#76b900]" : "text-slate-400 group-hover:text-slate-200"}`} />
                  <span>{link.name}</span>
                  {link.isHighlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] shadow-[0_0_6px_#76b900] animate-pulse" />
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#76b900] rounded-full shadow-[0_0_8px_#76b900]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Account / Profile & CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Live Supercluster Health Badge */}
            <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-400">Cluster:</span>
              <strong className="text-[#76b900]">38ms</strong>
            </div>

            <Link
              href="/profile"
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-300 shadow-md ${
                pathname === "/profile"
                  ? "bg-[#76b900]/20 border-[#76b900] text-white shadow-[0_0_20px_rgba(118,185,0,0.3)]"
                  : "bg-[#090f1e]/90 border-slate-700/80 hover:border-[#76b900]/60 text-slate-300 hover:text-white hover:bg-[#0c1527]"
              }`}
            >
              <span className="text-base p-0.5 rounded-lg bg-black/60 border border-slate-800">
                {user?.avatar || "⚖️"}
              </span>
              <div className="flex flex-col text-left">
                <span className="font-bold text-[11px] text-white truncate max-w-[110px]">
                  {user?.name || "Guest Reviewer"}
                </span>
                <span className="text-[9px] text-[#76b900] font-semibold -mt-0.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#76b900]" />
                  {user?.isGuest ? "Guest Mode" : "Enterprise"}
                </span>
              </div>
            </Link>

            <Link
              href="/auditor"
              className="relative group overflow-hidden px-4.5 py-2 rounded-xl text-xs font-black tracking-wider uppercase bg-gradient-to-r from-[#76b900] via-[#85cf00] to-[#5ea100] text-black shadow-[0_0_25px_rgba(118,185,0,0.45)] hover:shadow-[0_0_35px_rgba(118,185,0,0.75)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 border border-white/30"
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none transition-transform" />
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Audit Contract</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-white hover:border-[#76b900] transition-all focus:outline-none shadow-md"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#76b900]" />
            ) : (
              <Menu className="w-6 h-6 text-slate-200" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu & Dark Backdrop Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay covering page completely */}
          <div
            className="fixed inset-0 top-16 bg-black/85 backdrop-blur-md z-40 md:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Solid Drawer Menu */}
          <div className="fixed top-16 left-0 right-0 z-50 md:hidden bg-[#070b14] border-b border-[#76b900]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] px-4 py-4 space-y-2.5 max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-fadeIn">
            {/* User Profile Bar on Mobile */}
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#0c1424] to-[#090f1b] border border-[#76b900]/40 shadow-[0_0_15px_rgba(118,185,0,0.1)] active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 rounded-xl bg-black/60 border border-slate-800">
                  {user?.avatar || "⚖️"}
                </span>
                <div>
                  <p className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    {user?.name || "Guest Reviewer"}
                    <span className="px-1.5 py-0.2 text-[8px] font-mono uppercase rounded bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/40">
                      {user?.isGuest ? "Guest" : "Enterprise"}
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {user?.organization || "Tap to switch to Enterprise Account"}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#76b900]" />
            </Link>

            {/* Nav Links with Crisp Solid Cards */}
            <div className="space-y-1.5 pt-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-[#76b900]/15 border border-[#76b900] text-white shadow-[0_0_15px_rgba(118,185,0,0.15)]"
                        : "bg-slate-900/70 border border-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive
                            ? "bg-[#76b900] text-black"
                            : "bg-black/60 text-slate-300 border border-slate-800"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p
                          className={`text-xs font-mono font-bold ${
                            isActive ? "text-[#76b900]" : "text-white"
                          }`}
                        >
                          {link.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {link.desc}
                        </p>
                      </div>
                    </div>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#76b900] shadow-[0_0_8px_#76b900]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Prominent CTA on Mobile */}
            <div className="pt-2">
              <Link
                href="/auditor"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold font-mono uppercase bg-gradient-to-r from-[#76b900] to-[#599100] text-black shadow-[0_0_25px_rgba(118,185,0,0.4)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                <span>Launch Contract Auditor Now</span>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Fixed Header Spacer to prevent content overlap */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />
    </>
  );
}
