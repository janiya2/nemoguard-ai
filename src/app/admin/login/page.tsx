"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Key, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt + "lexiguard_salt_seed");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("nemoguard2026");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const performLogin = (userVal: string, passVal: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nemoguard_admin_authenticated", "true");
      const cleanUser = userVal.trim().toLowerCase();
      const displayName = (cleanUser === "admin" || cleanUser.includes("nemoguard") || cleanUser.includes("janitha"))
        ? "Janitha Dilshan (Lead Architect)"
        : userVal;
      localStorage.setItem("nemoguard_admin_user", displayName);
      localStorage.setItem("nemoguard_admin_login_time", new Date().toISOString());
    }
    router.push("/admin/dashboard");
  };

  const handleJudgeQuickLogin = () => {
    setLoading(true);
    performLogin("admin", "nemoguard2026");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // 1. Direct Master Passkey Match (NemoGuard, NVIDIA & Master Keys)
    if (
      cleanPass === "nemoguard2026" ||
      cleanPass === "nvidia" ||
      cleanPass === "admin" ||
      cleanPass === "admin123" ||
      cleanPass === "lexiguard2026"
    ) {
      performLogin(cleanUser, cleanPass);
      return;
    }

    // 2. Live Firebase Firestore Authentication
    try {
      const snap = await getDocs(collection(db, "lexiguard_admins"));
      if (!snap.empty) {
        for (const docSnap of snap.docs) {
          const acc = docSnap.data();
          const matchUser = 
            (acc.username && acc.username.toLowerCase() === cleanUser) ||
            (acc.email && acc.email.toLowerCase() === cleanUser);

          if (matchUser && acc.salt && acc.passwordHash) {
            const computed = await hashPassword(cleanPass, acc.salt);
            if (computed === acc.passwordHash) {
              if (typeof window !== "undefined") {
                localStorage.setItem("nemoguard_admin_authenticated", "true");
                localStorage.setItem("nemoguard_admin_user", acc.displayName || acc.email || acc.username);
                localStorage.setItem("nemoguard_admin_login_time", new Date().toISOString());
              }
              router.push("/admin/dashboard");
              return;
            }
          }
        }
      }
    } catch (firebaseErr) {
      console.warn("Firestore admin lookup notice:", firebaseErr);
    }

    // 3. Fallback error message
    setError("Invalid credentials. Please use the official demo passkey 'nemoguard2026'.");
    setLoading(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      {/* Background cyber radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#76b900]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[490px] relative z-10">
        <div className="glass-panel p-8 sm:p-9 rounded-3xl border border-[#76b900]/30 shadow-[0_0_50px_rgba(118,185,0,0.15)] space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#76b900]/20 to-black border border-[#76b900]/50 flex items-center justify-center shadow-[0_0_20px_rgba(118,185,0,0.3)]">
              <Lock className="w-7 h-7 text-[#76b900]" />
            </div>
            <h1 className="text-2xl font-extrabold text-white font-mono tracking-tight">
              ADMIN CONTROL CENTER
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              NVIDIA Nemotron-70B • System Management Portal
            </p>
          </div>

          {/* Quick 1-Click Judge Access Banner */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#76b900]/10 border border-[#76b900]/40 flex flex-col gap-3 shadow-[0_0_20px_rgba(118,185,0,0.15)]">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#76b900] animate-ping" />
                Hackathon Judge Demo Mode:
              </span>
              <span className="text-[#76b900] font-bold bg-[#76b900]/20 px-2 py-0.5 rounded border border-[#76b900]/40">
                Pre-Configured ✓
              </span>
            </div>
            <button
              type="button"
              onClick={handleJudgeQuickLogin}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-extrabold font-mono uppercase bg-gradient-to-r from-[#76b900] via-[#88d900] to-[#76b900] hover:from-[#84d400] hover:to-[#95ee00] text-black shadow-[0_0_25px_rgba(118,185,0,0.35)] hover:shadow-[0_0_35px_rgba(118,185,0,0.6)] active:scale-[0.99] transition-all flex items-center justify-between gap-2 cursor-pointer group border border-[#88d900]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-black/15 flex items-center justify-center shrink-0">
                  <Key className="w-3.5 h-3.5 text-black group-hover:rotate-45 transition-transform" />
                </div>
                <span className="tracking-wide font-bold">1-Click Judge Demo Login</span>
              </div>
              <div className="flex items-center gap-1 shrink-0 text-[10.5px] font-bold bg-black/15 px-2 py-0.5 rounded-md">
                <span>Instant Access</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider">or sign in manually</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                Admin Username / Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-slate-700 focus:border-[#76b900] text-slate-100 font-mono text-xs focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-medium text-slate-300">
                  Master Passkey
                </label>
                <span className="text-[11px] text-[#76b900] font-mono bg-[#76b900]/10 px-2 py-0.5 rounded border border-[#76b900]/25">
                  Demo Key: nemoguard2026
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-slate-700 focus:border-[#76b900] text-slate-100 font-mono text-xs focus:outline-none transition-all shadow-inner pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold font-mono tracking-wider uppercase bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 hover:border-[#76b900]/50 shadow-md hover:shadow-[0_0_20px_rgba(118,185,0,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Key className="w-4 h-4 text-[#76b900]" />
              <span>{loading ? "Authenticating..." : "Authenticate Admin"}</span>
              <ArrowRight className="w-4 h-4 text-[#76b900] group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-400 hover:text-white font-mono">
              ← Return to NemoGuard AI Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
