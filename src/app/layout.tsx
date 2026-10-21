import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NemoGuard AI — Autonomous Enterprise Legal & Regulatory Intelligence Engine",
  description: "Built for Nebius × NVIDIA AI Hackathon. Millisecond contract auditing, lawyer-grade redlining, and real-time Tavily case law precedent search powered by NVIDIA Nemotron-70B on Nebius Token Factory.",
  keywords: ["NVIDIA Nemotron", "Nebius AI", "Legal AI", "Contract Redlining", "Tavily Search", "NeMo Guardrails"],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: "/logo.png",
  },
};

import { AuthProvider } from "@/lib/authContext";
import MobileBottomNav from "@/components/MobileBottomNav";
import Preloader from "@/components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col bg-[#05080c] text-slate-100">
        <Preloader />
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
