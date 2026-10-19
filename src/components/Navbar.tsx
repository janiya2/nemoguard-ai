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
  Swords
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
    { name: "Precedent Vault", href: "/vault", icon: Database, desc: "Tavily Real-Time Grounding" },
    { name: "Counsel Profile", href: "/profile", icon: User, desc: "Audits, Vault & Identity" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 border-b border-[#76b900]/25 bg-[#05080c]/95 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#76b900]/50 group-hover:border-[#76b900] transition-all shadow-[0_0_18px_rgba(118,185,0,0.35)] bg-black/80">
              <img
                src="/logo.png"
                alt="NemoGuard AI Official Emblem"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#76b900] rounded-full animate-ping pointer-events-none" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#76b900] rounded-full pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold tracking-wider text-white text-base sm:text-lg font-mono">
                  NEMO<span className="text-[#76b900]">GUARD</span>
                </span>
                <span className="px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase bg-[#76b900]/15 text-[#76b900] border border-[#76b900]/30 rounded">
                  AI
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-tight block -mt-0.5">
                NVIDIA Nemotron × Nebius
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg transition-all text-xs font-mono tracking-wide ${
                    isActive
                      ? "text-[#76b900] bg-[#76b900]/10 border border-[#76b900]/30 shadow-[0_0_12px_rgba(118,185,0,0.15)] font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Account / Profile & CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/profile"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                pathname === "/profile"
                  ? "bg-[#76b900]/15 border-[#76b900] text-white shadow-[0_0_15px_rgba(118,185,0,0.2)]"
                  : "bg-slate-900/80 border-slate-700/80 hover:border-[#76b900]/50 text-slate-300 hover:text-white"
              }`}
            >
              <span className="text-base">{user?.avatar || "⚖️"}</span>
              <div className="flex flex-col text-left">
                <span className="font-bold text-[11px] truncate max-w-[120px]">
                  {user?.name || "Guest Reviewer"}
                </span>
                <span className="text-[9px] text-[#76b900] font-semibold -mt-0.5">
                  {user?.isGuest ? "Guest Mode" : "Enterprise"}
                </span>
              </div>
            </Link>

            <Link
              href="/auditor"
              className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-[#76b900] to-[#599100] text-black shadow-[0_0_20px_rgba(118,185,0,0.35)] hover:shadow-[0_0_30px_rgba(118,185,0,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Audit Contract</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-[#76b900]/50 transition-all focus:outline-none"
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
