"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("nemoguard_admin_authenticated");
      if (isAuth === "true") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/admin/login");
      }
    }
  }, [router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center font-mono text-xs text-[#76b900]">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-black/60 border border-[#76b900]/30 shadow-[0_0_20px_rgba(118,185,0,0.2)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#76b900] animate-ping" />
        <span>Authenticating & Routing to Admin Center...</span>
      </div>
    </div>
  );
}
