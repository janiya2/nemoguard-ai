"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Cpu, Lock, Sparkles, Database, Terminal, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If inside admin dashboard, the admin sidebar handles navigation
  const isAdminDashboard = pathname.startsWith("/admin/dashboard");

  if (isAdminDashboard) {
    return null;
  }

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Contract Auditor", href: "/auditor" },
    { name: "Precedent Vault", href: "/vault" },
    { name: "Admin Portal", href: "/admin/login", isBadge: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-nvidia-400/20 bg-[#05080c]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#76b900]/20 to-[#0a0f18] border border-[#76b900]/40 group-hover:border-[#76b900] transition-all shadow-[0_0_15px_rgba(118,185,0,0.2)]">
            <Shield className="w-5 h-5 text-[#76b900] group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#76b900] rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#76b900] rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-white text-lg font-mono">
                NEMO<span className="text-[#76b900]">GUARD</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-[#76b900]/15 text-[#76b900] border border-[#76b900]/30 rounded">
                AI
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight block -mt-0.5">
              NVIDIA Nemotron-70B × Nebius
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            if (link.isBadge) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="ml-3 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold tracking-wider uppercase border border-slate-700 bg-slate-900/60 hover:bg-[#76b900]/15 hover:border-[#76b900]/50 hover:text-[#76b900] text-slate-300 transition-all flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-[#76b900]" />
                  {link.name}
                </Link>
              );
            }
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? "text-[#76b900] bg-[#76b900]/10 border border-[#76b900]/30 shadow-[0_0_12px_rgba(118,185,0,0.15)]"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Live Cluster Status & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/25 text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-[#76b900] animate-pulse" />
            <span>Nebius H100 Online</span>
          </div>

          <Link
            href="/auditor"
            className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-[#76b900] to-[#599100] text-black shadow-[0_0_20px_rgba(118,185,0,0.35)] hover:shadow-[0_0_30px_rgba(118,185,0,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audit Contract</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#05080c]/95 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/auditor"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center mt-3 py-2.5 rounded-xl text-xs font-bold uppercase bg-[#76b900] text-black"
          >
            Audit Contract Now
          </Link>
        </div>
      )}
    </header>
  );
}
