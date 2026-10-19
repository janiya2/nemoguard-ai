"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Key, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin@nemoguard.ai");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple robust authentication simulation for hackathon demo
    setTimeout(() => {
      if (password === "nemoguard2026" || password === "admin" || password === "nvidia") {
        if (typeof window !== "undefined") {
          localStorage.setItem("nemoguard_admin_authenticated", "true");
          localStorage.setItem("nemoguard_admin_user", username);
          localStorage.setItem("nemoguard_admin_login_time", new Date().toISOString());
        }
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Try demo passkey 'nemoguard2026' or click One-Click Demo Access.");
        setLoading(false);
      }
    }, 600);
  };

  const handleOneClickDemo = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nemoguard_admin_authenticated", "true");
      localStorage.setItem("nemoguard_admin_user", "chief-counsel@nemoguard.ai");
      localStorage.setItem("nemoguard_admin_login_time", new Date().toISOString());
    }
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      {/* Background cyber radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#76b900]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#76b900]/30 shadow-[0_0_50px_rgba(118,185,0,0.15)] space-y-6">
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
                <span className="text-[11px] text-[#76b900] font-mono">
                  Demo: nemoguard2026
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
              className="w-full py-3.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase bg-gradient-to-r from-[#76b900] to-[#599100] text-black shadow-[0_0_20px_rgba(118,185,0,0.3)] hover:shadow-[0_0_30px_rgba(118,185,0,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>{loading ? "Authenticating..." : "Authenticate Admin"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Bypass for Hackathon Reviewers */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={handleOneClickDemo}
              className="w-full py-2.5 rounded-xl text-xs font-mono font-semibold tracking-wide border border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>One-Click Demo Passkey (Instant Access)</span>
            </button>
          </div>

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
