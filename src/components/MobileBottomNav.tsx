"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Database, User, LayoutGrid, Sparkles, Swords } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Hide on admin dashboard
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    {
      name: "Overview",
      href: "/",
      icon: LayoutGrid,
    },
    {
      name: "War Room",
      href: "/war-room",
      icon: Swords,
    },
    {
      name: "Auditor",
      href: "/auditor",
      icon: Shield,
      isPrimary: true,
    },
    {
      name: "Vault",
      href: "/vault",
      icon: Database,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      badge: user?.isGuest ? "Guest" : "Pro",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-3 left-2 right-2 z-40 max-w-md mx-auto">
      {/* Floating Cyber Glass Dock */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="relative flex items-center justify-between px-3 py-2 rounded-2xl bg-[#060a14]/95 backdrop-blur-2xl border border-[#76b900]/40 shadow-[0_12px_40px_rgba(0,0,0,0.95)]"
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#76b900] to-transparent pointer-events-none" />

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative -top-4 flex flex-col items-center group focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl overflow-hidden relative ${
                    isActive
                      ? "bg-gradient-to-tr from-[#76b900] to-[#4e8000] text-black shadow-[0_0_25px_rgba(118,185,0,0.8)] scale-110 border-2 border-white/40"
                      : "bg-[#0b1220] border-2 border-[#76b900]/60 text-[#76b900] shadow-[0_0_15px_rgba(118,185,0,0.3)] hover:scale-105"
                  }`}
                >
                  <img
                    src="/logo.png"
                    alt="Auditor"
                    className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform"
                  />
                  <div className="absolute inset-0 bg-[#76b900]/10 mix-blend-overlay pointer-events-none" />
                </div>
                <span className="text-[10px] font-mono font-extrabold tracking-tight mt-1 text-[#76b900] flex items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  <Sparkles className="w-2.5 h-2.5" />
                  {item.name}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 relative group focus:outline-none ${
                isActive
                  ? "text-[#76b900]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive
                      ? "scale-115 text-[#76b900] stroke-[2.3] drop-shadow-[0_0_8px_rgba(118,185,0,0.6)]"
                      : "group-hover:scale-110 stroke-[1.8]"
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#76b900] shadow-[0_0_8px_#76b900]" />
                )}
                {item.badge && !isActive && (
                  <span className="absolute -top-1.5 -right-3 px-1 py-0.2 text-[8px] font-mono font-bold rounded bg-slate-900 text-[#76b900] border border-[#76b900]/40">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-mono mt-1 tracking-tight ${
                  isActive ? "font-bold text-[#76b900]" : "text-slate-400 group-hover:text-slate-200"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
