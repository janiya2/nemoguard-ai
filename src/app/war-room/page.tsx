"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Scale,
  Swords,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  ChevronRight,
  FileText,
  User,
  ExternalLink,
  Flame,
  Award,
  Layers,
  Terminal,
  Activity,
  History,
  ShieldAlert,
  Cpu,
  Printer,
  Download,
  FileDown,
  X,
  BadgeCheck,
  QrCode,
  Search,
  Clock,
  ArrowUpRight,
  BookOpen,
  FolderArchive,
  Trash2,
  Filter,
  ShieldCheck,
  CheckCheck,
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Mic
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

interface NegotiationRound {
  roundNumber: number;
  phaseName: string;
  equilibriumScore: number;
  opposingCounsel: {
    speaker: string;
    tone: string;
    argument: string;
    proposedTerms: string;
  };
  defenseCounsel: {
    speaker: string;
    tone: string;
    argument: string;
    statutoryCitation: string;
  };
  arbitratorNote: string;
}

interface NegotiationData {
  contractTitle: string;
  disputedClause: string;
  jurisdiction: string;
  initialExposureEstimateUsd: string;
  mitigatedExposureUsd: string;
  initialEquilibrium: number;
  finalEquilibrium: number;
  rounds: NegotiationRound[];
  finalAgreedClause: string;
  statutoryBasis: string;
  concessionsMade: string[];
  settlementVerdict: string;
  certHash: string;
  telemetry?: {
    mode: string;
    provider: string;
    modelUsed: string;
    apiNotice?: string;
  };
}

const PRESET_WAR_ROOM_SCENARIOS = [
  {
    id: "sc-saas",
    title: "SaaS Master Services Agreement — $500 Liability Trap",
    jurisdiction: "Delaware Chancery Court",
    clause: "Customer shall defend, indemnify, and hold harmless Vendor against any third-party claims or IP losses. Vendor's total aggregate cumulative liability to Customer under all circumstances shall not exceed $500.",
    disputeSummary: "Unilateral customer indemnification paired with an illusory $500 vendor liability ceiling on multi-million dollar cloud services."
  },
  {
    id: "sc-dpa",
    title: "AI Model Vendor DPA — 30-Day Breach Reporting Loophole",
    jurisdiction: "European Union / GDPR Art. 28",
    clause: "Vendor will notify Customer of confirmed data security incidents within thirty (30) business days. Customer grants Vendor perpetual right to process inputs for foundation model retraining.",
    disputeSummary: "Illegal 30-day data breach notification window violating European statutory 72-hour ceiling and customer IP extraction."
  },
  {
    id: "sc-ma",
    title: "M&A Purchase Agreement — Total Fraud Liability Waiver",
    jurisdiction: "Delaware Corporate Law",
    clause: "All representations and warranties terminate six (6) months post-closing. Buyer unconditionally waives all fraud remedies, extra-contractual claims, and statutory disclosure protections.",
    disputeSummary: "Attempted contractual fraud disclaimer violating Delaware Chancery public policy regarding fraudulent inducement."
  },
  {
    id: "sc-nda",
    title: "Executive Restrictive Covenant — 36-Month Global Ban",
    jurisdiction: "US Federal / FTC 16 CFR Part 910",
    clause: "Employee agrees not to engage directly or indirectly in any competing software enterprise worldwide for thirty-six (36) months following separation for any reason.",
    disputeSummary: "Unlawful worldwide 3-year non-compete covenant rendered void under 2024 FTC non-compete regulations."
  }
];

const BENCHMARK_PAST_NEGOTIATIONS: NegotiationData[] = [
  {
    contractTitle: "Enterprise SaaS Master Services Agreement — $500 Liability Trap",
    disputedClause: "Customer shall defend, indemnify, and hold harmless Vendor against any third-party claims or IP losses. Vendor's total aggregate cumulative liability to Customer under all circumstances shall not exceed $500.",
    jurisdiction: "Delaware Chancery Court",
    initialExposureEstimateUsd: "$5,000,000 USD",
    mitigatedExposureUsd: "$250,000 USD (Trailing 12-Month Fees)",
    initialEquilibrium: 18,
    finalEquilibrium: 94,
    finalAgreedClause: "Each party shall defend, indemnify, and hold harmless the other party against third-party claims arising from gross negligence or intellectual property infringement. Cumulative liability shall not exceed twelve (12) times monthly fees paid, with express carve-outs for confidentiality breaches.",
    statutoryBasis: "Delaware UCC § 2-719 & ABRY Partners V, L.P. v. F&W Acquisition LLC (Del. Ch. 2006)",
    concessionsMade: [
      "Removed unilateral $500 vendor liability ceiling",
      "Inserted reciprocal mutual indemnification",
      "Carved out gross negligence and data confidentiality breaches from liability cap",
      "Enforced 12-month trailing fee recovery standard"
    ],
    settlementVerdict: "EQUITY RESTORED — RATIFIED BILATERAL ACCORD",
    certHash: "0xNEMO_89F2A71D_CFCB463C",
    rounds: [
      {
        roundNumber: 1,
        phaseName: "Initial Commercial Posturing & Threat Modeling",
        equilibriumScore: 18,
        opposingCounsel: {
          speaker: "Attorney Marcus Vance, CCEP",
          tone: "Aggressive & Unyielding",
          argument: "Vendor cannot accept uncapped consequential risk under cloud hosting margins. The $500 ceiling is standard enterprise risk distribution.",
          proposedTerms: "Maintain $500 vendor liability cap as drafted."
        },
        defenseCounsel: {
          speaker: "Counsel Elena Rostova, Esq.",
          tone: "Assertive & Precedent-Backed",
          argument: "Under Delaware UCC § 2-719 and ABRY Partners, an illusory $500 exculpatory cap for gross service failure is commercially unconscionable.",
          statutoryCitation: "Delaware UCC § 2-719(2); Restatement (Second) of Contracts § 178."
        },
        arbitratorNote: "Vendor's position exceeds commercial norms. Recommend 12-month fee cap baseline."
      },
      {
        roundNumber: 2,
        phaseName: "Precedent Rebuttal & Regulatory Alignment",
        equilibriumScore: 68,
        opposingCounsel: {
          speaker: "Attorney Marcus Vance, CCEP",
          tone: "Defensive & Conceding Margin",
          argument: "Vendor will entertain a fee multiplier, provided claims are restricted strictly to direct outage loss and IP is excluded.",
          proposedTerms: "Bilateral indemnity capped at 6 months fees, excluding patent claims."
        },
        defenseCounsel: {
          speaker: "Counsel Elena Rostova, Esq.",
          tone: "Uncompromising & Statutory",
          argument: "IP claims and data protection breaches must be expressly carved out from aggregate caps per FTC & Delaware public policy.",
          statutoryCitation: "Del. Ch. precedent in ABRY Partners; 16 CFR Part 910."
        },
        arbitratorNote: "Parties converging rapidly on mutual indemnification with confidentiality carveouts."
      },
      {
        roundNumber: 3,
        phaseName: "Judicial Settlement & Equilibrium Consensus",
        equilibriumScore: 94,
        opposingCounsel: {
          speaker: "Attorney Marcus Vance, CCEP",
          tone: "Pragmatic & Reconciled",
          argument: "Agreed to mutual 12-month fee cap with gross negligence carve-outs in exchange for mutual waiver of speculative lost profits.",
          proposedTerms: "Ratify bilateral 12x fee trailing cap with mutual confidentiality carveout."
        },
        defenseCounsel: {
          speaker: "Counsel Elena Rostova, Esq.",
          tone: "Consensus Ratified",
          argument: "Consensus terms accepted. Reciprocal commercial parity established.",
          statutoryCitation: "Delaware General Corporation Law § 145 & UCC § 2-719."
        },
        arbitratorNote: "Equitable consensus reached. Final bilateral accord ratified."
      }
    ]
  },
  {
    contractTitle: "AI Model Vendor DPA — 30-Day Breach Reporting Loophole",
    disputedClause: "Vendor will notify Customer of confirmed data security incidents within thirty (30) business days. Customer grants Vendor perpetual right to process inputs for foundation model retraining.",
    jurisdiction: "European Union / GDPR Art. 28",
    initialExposureEstimateUsd: "$12,000,000 USD",
    mitigatedExposureUsd: "$0 Statutory Regulatory Exposure",
    initialEquilibrium: 14,
    finalEquilibrium: 98,
    finalAgreedClause: "Vendor shall notify Customer in writing without undue delay, and in any event within thirty-six (36) hours, of becoming aware of any actual or suspected Personal Data Breach. Vendor is strictly prohibited from utilizing, training, or fine-tuning any foundation or commercial AI models on Customer Data.",
    statutoryBasis: "EU GDPR Article 28(3)(f), Article 33 Mandatory 72-Hour Breach Threshold & EU AI Act (EU) 2024/1689",
    concessionsMade: [
      "Reduced notification window from 30 business days to strict 36 hours",
      "Total ban on customer data extraction for AI foundation model training",
      "Inserted mandatory forensic audit and breach remediation obligations"
    ],
    settlementVerdict: "EQUITY RESTORED — RATIFIED BILATERAL ACCORD",
    certHash: "0xNEMO_4B71C899_01AD44EF",
    rounds: [
      {
        roundNumber: 1,
        phaseName: "Initial Commercial Posturing & Threat Modeling",
        equilibriumScore: 14,
        opposingCounsel: {
          speaker: "Attorney Marcus Vance, CCEP",
          tone: "Defensive & Technical",
          argument: "30 business days is required for complex forensic validation before external disclosure.",
          proposedTerms: "Maintain 30-day reporting standard."
        },
        defenseCounsel: {
          speaker: "Counsel Elena Rostova, Esq.",
          tone: "Statutory Enforcement",
          argument: "Under GDPR Article 33, processors must notify supervisory authorities within 72 hours. 30 days is illegal and subjects Customer to 4% global turnover fines.",
          statutoryCitation: "GDPR Art. 28(3)(f) & Art. 33."
        },
        arbitratorNote: "Vendor timeline directly violates statutory ceilings. Immediate adjustment required."
      },
      {
        roundNumber: 2,
        phaseName: "Precedent Rebuttal & Regulatory Alignment",
        equilibriumScore: 72,
        opposingCounsel: {
          speaker: "Attorney Marcus Vance, CCEP",
          tone: "Yielding on Regulatory Mandate",
          argument: "Vendor concedes to 72 hours for confirmed breaches, but retains telemetry rights.",
          proposedTerms: "72-hour notification for high-severity breaches only."
        },
        defenseCounsel: {
          speaker: "Counsel Elena Rostova, Esq.",
          tone: "Statutory & Privacy Defense",
          argument: "Customer requires 36 hours so Customer has remaining 36 hours to meet statutory deadline. Zero training rights on corporate data.",
          statutoryCitation: "EDPB Guidelines 01/2021 on Data Breach Notifications."
        },
        arbitratorNote: "Standard market compromise: 36 hours processor notice + absolute prohibition on model retraining."
      },
      {
        roundNumber: 3,
        phaseName: "Judicial Settlement & Equilibrium Consensus",
        equilibriumScore: 98,
        opposingCounsel: {
          speaker: "Attorney Marcus Vance, CCEP",
          tone: "Full Statutory Compliance",
          argument: "Agreed to 36-hour breach disclosure and zero model retraining on proprietary data.",
          proposedTerms: "Ratify 36-hour notice and strict data isolation."
        },
        defenseCounsel: {
          speaker: "Counsel Elena Rostova, Esq.",
          tone: "Consensus Ratified",
          argument: "Complete regulatory compliance achieved. Accord accepted.",
          statutoryCitation: "GDPR Article 82 & EU AI Act Transparency Requirements."
        },
        arbitratorNote: "100% GDPR-compliant bilateral accord ratified."
      }
    ]
  }
];

export default function WarRoomPage() {
  const [selectedScenario, setSelectedScenario] = useState(PRESET_WAR_ROOM_SCENARIOS[0]);
  const [customClause, setCustomClause] = useState(PRESET_WAR_ROOM_SCENARIOS[0].clause);
  const [contractTitle, setContractTitle] = useState(PRESET_WAR_ROOM_SCENARIOS[0].title);
  const [jurisdiction, setJurisdiction] = useState(PRESET_WAR_ROOM_SCENARIOS[0].jurisdiction);
  
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [negotiationData, setNegotiationData] = useState<NegotiationData | null>(null);
  const [activeRoundTab, setActiveRoundTab] = useState<number>(1);
  const [copiedAccord, setCopiedAccord] = useState(false);
  const [debatePerspective, setDebatePerspective] = useState<"split" | "vendor" | "defense">("split");
  const [inputError, setInputError] = useState<string | null>(null);
  const [showDossierModal, setShowDossierModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // User History State
  const [savedNegotiations, setSavedNegotiations] = useState<NegotiationData[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historySearchQuery, setHistorySearchQuery] = useState("");
  const [historyCategoryFilter, setHistoryCategoryFilter] = useState<"all" | "high-eq" | "delaware" | "eu" | "custom">("all");
  const [copiedCertHash, setCopiedCertHash] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Courtroom Oral Arguments Live Audio Simulator State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [currentSpeaker, setCurrentSpeaker] = useState<"vendor" | "defense" | "judge" | null>(null);
  const [speakingRound, setSpeakingRound] = useState<number | null>(null);
  const [isFullDebateMode, setIsFullDebateMode] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load negotiation history on mount
  useEffect(() => {
    const loadHistory = async () => {
      setIsLoadingHistory(true);
      try {
        const map = new Map<string, NegotiationData>();

        // 1. From LocalStorage
        try {
          const localStr = localStorage.getItem("nemoguard_saved_negotiations");
          if (localStr) {
            const localArr: NegotiationData[] = JSON.parse(localStr);
            localArr.forEach((item) => {
              if (item?.certHash) map.set(item.certHash, item);
            });
          }
        } catch (e) {}

        // 2. From Firestore
        try {
          const q = query(collection(db, "nemoguard_negotiations"), orderBy("createdAt", "desc"), limit(20));
          const snap = await getDocs(q);
          snap.forEach((doc) => {
            const d = doc.data() as any;
            if (d && d.contractTitle && d.finalAgreedClause && d.certHash) {
              map.set(d.certHash, d as NegotiationData);
            }
          });
        } catch (dbErr) {
          console.warn("Firestore history fetch notice:", dbErr);
        }

        // 3. Fallback Benchmarks
        BENCHMARK_PAST_NEGOTIATIONS.forEach((b) => {
          if (!map.has(b.certHash)) {
            map.set(b.certHash, b);
          }
        });

        setSavedNegotiations(Array.from(map.values()));
      } catch (err) {
        console.warn("History loading error:", err);
        setSavedNegotiations(BENCHMARK_PAST_NEGOTIATIONS);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadHistory();
  }, []);

  const handleSelectScenario = (sc: typeof PRESET_WAR_ROOM_SCENARIOS[0]) => {
    stopCourtroomAudio();
    setSelectedScenario(sc);
    setContractTitle(sc.title);
    setCustomClause(sc.clause);
    setJurisdiction(sc.jurisdiction);
    if (inputError) setInputError(null);
  };

  const handleStartNegotiation = async () => {
    stopCourtroomAudio();
    setIsNegotiating(true);
    setNegotiationData(null);
    setInputError(null);
    try {
      const res = await fetch("/api/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractTitle,
          disputedClause: customClause,
          jurisdiction
        })
      });
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        setInputError(null);
        setNegotiationData(json.data);
        setActiveRoundTab(1);

        // Prepend to saved negotiations & save to local storage
        setSavedNegotiations((prev) => {
          const updated = [json.data, ...prev.filter((p) => p.certHash !== json.data.certHash)];
          try {
            localStorage.setItem("nemoguard_saved_negotiations", JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
      } else {
        setInputError(json.error || "Negotiation failed. Please verify input clause.");
      }
    } catch (err: any) {
      console.error("Negotiation initiation failed:", err);
      setInputError(`Connection error: ${err.message || "Failed to reach negotiation orchestrator."}`);
    } finally {
      setIsNegotiating(false);
    }
  };

  const handleLoadHistoryItem = (item: NegotiationData) => {
    stopCourtroomAudio();
    setNegotiationData(item);
    setContractTitle(item.contractTitle);
    setCustomClause(item.disputedClause);
    setJurisdiction(item.jurisdiction);
    setActiveRoundTab(1);
    setShowHistoryModal(false);
  };

  const handleViewHistoryDossier = (item: NegotiationData) => {
    setNegotiationData(item);
    setShowHistoryModal(false);
    setShowDossierModal(true);
  };

  const handleCopyCertHash = (hash: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopiedCertHash(hash);
    setTimeout(() => setCopiedCertHash(null), 1800);
  };

  const handleDeleteHistoryItem = (certHash: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedNegotiations((prev) => {
      const updated = prev.filter((item) => item.certHash !== certHash);
      try {
        localStorage.setItem("nemoguard_saved_negotiations", JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
  };

  const handleResetToBenchmarks = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      localStorage.removeItem("nemoguard_saved_negotiations");
    } catch (err) {}
    setSavedNegotiations(BENCHMARK_PAST_NEGOTIATIONS);
  };

  const getJurisdictionBadgeStyle = (jur: string) => {
    const l = jur.toLowerCase();
    if (l.includes("delaware")) {
      return "bg-sky-500/15 text-sky-300 border-sky-500/30";
    }
    if (l.includes("gdpr") || l.includes("eu")) {
      return "bg-purple-500/15 text-purple-300 border-purple-500/30";
    }
    if (l.includes("california") || l.includes("ccpa")) {
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    }
    return "bg-[#76b900]/15 text-[#76b900] border-[#76b900]/30";
  };

  // Pre-load Web Speech API voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadV = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) setVoicesLoaded(true);
      };
      loadV();
      window.speechSynthesis.onvoiceschanged = loadV;
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const getVoiceForPersona = (role: "vendor" | "defense" | "judge"): SpeechSynthesisVoice | null => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    if (role === "vendor") {
      return (
        voices.find((v) => v.lang.startsWith("en") && (v.name.includes("David") || v.name.includes("Guy") || v.name.includes("Male") || v.name.includes("Mark") || v.name.includes("US English"))) ||
        voices.find((v) => v.lang.startsWith("en") && !v.name.includes("Zira")) ||
        voices[0]
      );
    } else if (role === "defense") {
      return (
        voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Zira") || v.name.includes("Aria") || v.name.includes("Samantha") || v.name.includes("Female") || v.name.includes("Victoria") || v.name.includes("UK English"))) ||
        voices.find((v) => v.lang.startsWith("en") && !v.name.includes("David")) ||
        voices[0]
      );
    } else {
      return (
        voices.find((v) => v.lang.startsWith("en") && (v.name.includes("George") || v.name.includes("Daniel") || v.name.includes("Natural") || v.name.includes("Oliver"))) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0]
      );
    }
  };

  const stopCourtroomAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsAudioPlaying(false);
    setIsAudioPaused(false);
    setCurrentSpeaker(null);
    setSpeakingRound(null);
  };

  const togglePauseCourtroomAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isAudioPaused) {
        window.speechSynthesis.resume();
        setIsAudioPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsAudioPaused(true);
      }
    }
  };

  const playOralArguments = (targetRoundNum?: number, fullDebate: boolean = false) => {
    if (!negotiationData || !negotiationData.rounds || negotiationData.rounds.length === 0) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();
    setIsAudioPlaying(true);
    setIsAudioPaused(false);
    setIsFullDebateMode(fullDebate);

    const startRoundNum = targetRoundNum ?? activeRoundTab;
    const roundsToPlay = fullDebate
      ? negotiationData.rounds.filter((r) => r.roundNumber >= startRoundNum)
      : [negotiationData.rounds[startRoundNum - 1]];

    let currentRoundIndex = 0;

    const playRoundInSequence = () => {
      if (currentRoundIndex >= roundsToPlay.length) {
        setIsAudioPlaying(false);
        setIsAudioPaused(false);
        setCurrentSpeaker(null);
        setSpeakingRound(null);
        return;
      }

      const rnd = roundsToPlay[currentRoundIndex];
      setActiveRoundTab(rnd.roundNumber);
      setSpeakingRound(rnd.roundNumber);

      const speakStep = (role: "vendor" | "defense" | "judge", text: string, onDone: () => void) => {
        const u = new SpeechSynthesisUtterance(text);
        const voice = getVoiceForPersona(role);
        if (voice) u.voice = voice;

        if (role === "vendor") {
          u.pitch = 0.88;
          u.rate = audioSpeed * 1.0;
        } else if (role === "defense") {
          u.pitch = 1.15;
          u.rate = audioSpeed * 1.02;
        } else {
          u.pitch = 0.82;
          u.rate = audioSpeed * 0.95;
        }

        u.onstart = () => {
          setCurrentSpeaker(role);
        };

        u.onend = () => {
          setTimeout(onDone, 450);
        };

        u.onerror = (err) => {
          console.warn("Speech playback notice:", err);
          onDone();
        };

        window.speechSynthesis.speak(u);
      };

      // 1. Marcus Vance (Vendor Counsel)
      const vendorText = `${rnd.opposingCounsel.speaker} representing the Vendor. ${rnd.opposingCounsel.argument} Proposed terms: ${rnd.opposingCounsel.proposedTerms || 'Terms as submitted.'}`;
      speakStep("vendor", vendorText, () => {
        // 2. Elena Rostova (NemoGuard Defense)
        const defenseText = `${rnd.defenseCounsel.speaker} for the Defense. ${rnd.defenseCounsel.argument} Precedent citation: ${rnd.defenseCounsel.statutoryCitation || 'Delaware General Corporation Law.'}`;
        speakStep("defense", defenseText, () => {
          // 3. Hon. Judge Nemotron-70B (Judicial Arbitrator)
          const judgeText = `Judicial Arbitrator Nemotron-70B consensus evaluation. ${rnd.arbitratorNote}. Current equilibrium evaluated at ${rnd.equilibriumScore} percent.`;
          speakStep("judge", judgeText, () => {
            currentRoundIndex++;
            playRoundInSequence();
          });
        });
      });
    };

    playRoundInSequence();
  };

  const handleCopyAccord = () => {
    if (negotiationData?.finalAgreedClause) {
      navigator.clipboard.writeText(negotiationData.finalAgreedClause);
      setCopiedAccord(true);
      setTimeout(() => setCopiedAccord(false), 2000);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!negotiationData) return;
    const mdContent = `# 🛡️ NEMOGUARD AI — OFFICIAL LEGAL SETTLEMENT ACCORD & AUDIT DOSSIER
**Arbitration Docket / Cert Hash:** \`${negotiationData.certHash}\`  
**Date of Execution:** ${new Date().toUTCString()}  
**Contract Matter:** ${negotiationData.contractTitle}  
**Governing Jurisdiction:** ${negotiationData.jurisdiction}  
**AI Inference Engine:** NVIDIA Nemotron-70B • Nebius Token Factory H100 Supercluster  
**Statutory Verification:** Grounded in Real-Time by Tavily AI Search  

---

## ⚖️ Executive Settlement Summary
- **Arbitration Verdict:** ${negotiationData.settlementVerdict || "EQUITY RESTORED — RATIFIED BILATERAL ACCORD"}
- **Initial Hostile Exposure:** ${negotiationData.initialExposureEstimateUsd}
- **Mitigated Exposure Under Ratified Accord:** ${negotiationData.mitigatedExposureUsd}
- **Judicial Equilibrium Shift:** ${negotiationData.initialEquilibrium}% (Hostile Vendor Dominance) ➔ ${negotiationData.finalEquilibrium}% (Equitable Bilateral Accord)

---

## 📜 Section I: Operative Contract Language Comparison

### 1.1 Original Contested Language (Stricken Hostile Terms)
> ~${negotiationData.disputedClause}~

### 1.2 Ratified Bilateral Clause (Clean Execution)
> **"${negotiationData.finalAgreedClause}"**

---

## 🎯 Section II: Key Commercial Concessions Won Through AI Debate
${negotiationData.concessionsMade.map((c, i) => `${i + 1}. **${c}**`).join("\n")}

---

## 🏛️ Section III: Statutory Basis & Authoritative Precedents
${negotiationData.statutoryBasis || "Delaware UCC § 2-719; ABRY Partners V, L.P. v. F&W Acquisition LLC (Del. Ch. 2006); FTC 16 CFR Part 910; EU GDPR Art. 28/82."}

---

## ⚔️ Section IV: Multi-Agent Negotiation Transcript (3 Rounds)

${negotiationData.rounds.map((r) => `
### Round ${r.roundNumber}: ${r.phaseName} (Equilibrium: ${r.equilibriumScore}%)

#### 🔴 ${r.opposingCounsel.speaker} (Vendor Commercial Counsel — Tone: ${r.opposingCounsel.tone}):
"${r.opposingCounsel.argument}"

*Proposed Vendor Terms:*  
\`${r.opposingCounsel.proposedTerms}\`

#### 🟢 ${r.defenseCounsel.speaker} (Enterprise Defense AI — Tone: ${r.defenseCounsel.tone}):
"${r.defenseCounsel.argument}"

*Binding Statutory Grounding:*  
\`${r.defenseCounsel.statutoryCitation}\`

#### ⚖️ Judicial Arbitrator Note (Judge Nemotron-70B):
*${r.arbitratorNote}*
`).join("\n---\n")}

---

## ✍️ Section V: Attestation & Digital Execution

| Signatory | Role | Cryptographic Verification |
| :--- | :--- | :--- |
| **Elena Rostova, Esq.** | Enterprise Defense AI (NemoGuard) | \`RATIFIED_AUTONOMOUS_DEFENSE\` |
| **Marcus Vance, Esq.** | Vendor Commercial Counsel AI | \`CONCEDED_COMMERCIAL_TERMS\` |
| **Hon. Nemotron-70B** | Judicial Neural Arbitrator | \`${negotiationData.certHash}\` |

*Generated by NemoGuard AI — Autonomous Legal & Regulatory Risk Intelligence Engine.*
`;

    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `NemoGuard_Bilateral_Accord_${negotiationData.certHash.replace(/[^a-zA-Z0-9]/g, "_")}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-x-hidden pb-28 md:pb-16">
      
      {/* Background Graphic & Ambient Obsidian Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/warroom-bg.jpg')` }}
        />
        {/* Dark Obsidian Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080c]/90 via-[#05080c]/85 to-[#05080c]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_900px_at_50%_-120px,#76b9001a,transparent)]" />
        
        {/* Dual Neon Podiums Ambient Highlights (Red Left / Green Right) */}
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#76b900]/12 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Hero Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500/15 via-[#76b900]/15 to-[#76b900]/20 border border-[#76b900]/40 text-xs font-mono text-[#76b900] shadow-[0_0_20px_rgba(118,185,0,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#76b900] animate-ping" />
              <Swords className="w-3.5 h-3.5" />
              <span>Autonomous Multi-Agent AI Negotiation War Room</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
              <Activity className="w-3 h-3 text-[#76b900]" />
              <span>3 AI Agents • NVIDIA Nemotron-70B • Tavily Live Case Law</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                Autonomous Legal <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-[#76b900]">
                  Contract Negotiation War Room
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 leading-relaxed">
                Watch two autonomous AI counsels powered by NVIDIA Nemotron-70B debate hostile contract clauses round-by-round in real-time, trade concessions, and execute an equitable bilateral settlement agreement.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap self-start lg:self-end">
              <Link
                href="/benchmark"
                className="px-3.5 py-2.5 rounded-xl border border-emerald-500/40 bg-gradient-to-r from-slate-900 to-[#041f16] hover:border-emerald-400 text-xs font-mono text-emerald-300 hover:text-white flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] group"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>H100 Benchmark Matrix 📊</span>
              </Link>

              <Link
                href="/guardrails"
                className="px-3.5 py-2.5 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-slate-900 to-[#041924] hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] group"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>NeMo Guardrails Sandbox ⚡</span>
              </Link>

              <button
                onClick={() => setShowHistoryModal(true)}
                className="px-4 py-2.5 rounded-xl border border-[#76b900]/40 bg-gradient-to-r from-slate-900 via-[#06180c] to-slate-900 hover:border-[#76b900] text-xs font-mono text-slate-200 hover:text-white flex items-center gap-2.5 transition-all shadow-[0_0_20px_rgba(118,185,0,0.15)] group cursor-pointer"
              >
                <History className="w-4 h-4 text-[#76b900] group-hover:rotate-45 transition-transform" />
                <span>Negotiation History & Accords</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/40">
                  {savedNegotiations.length} Cases
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. SCENARIO CONFIGURATION SECTION */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Step 1: Select High-Stakes Disputed Contract Clause
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#76b900]">1-Click Scenarios Available</span>
          </div>

          {/* Scenario Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_WAR_ROOM_SCENARIOS.map((sc) => {
              const isSelected = selectedScenario.id === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleSelectScenario(sc)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 border relative ${
                    isSelected
                      ? "bg-[#76b900]/15 border-[#76b900] shadow-[0_0_20px_rgba(118,185,0,0.2)]"
                      : "bg-black/50 border-slate-800 hover:border-slate-700 hover:bg-black/70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-slate-400 px-1.5 py-0.2 rounded bg-slate-800/80">
                      {sc.jurisdiction.split("/")[0]}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#76b900] shadow-[0_0_6px_#76b900]" />}
                  </div>
                  <h4 className="text-xs font-mono font-bold text-white line-clamp-1 mb-1">
                    {sc.title.split("—")[0]}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-sans line-clamp-2">
                    {sc.disputeSummary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Editable Disputed Clause Text Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <label className="text-slate-300 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Hostile / Disputed Contract Language:</span>
              </label>
              <span className="text-slate-500 text-[10px]">Editable for custom testing</span>
            </div>
            <textarea
              rows={3}
              value={customClause}
              onChange={(e) => {
                setCustomClause(e.target.value);
                if (inputError) setInputError(null);
              }}
              className="w-full p-3.5 rounded-2xl bg-black/80 border border-slate-700 focus:border-[#76b900] text-rose-200 font-mono text-xs leading-relaxed outline-none transition-colors"
            />

            {/* Input Validation & NeMo Guardrail Error Box */}
            {inputError && (
              <div className="mt-3 p-4 rounded-2xl bg-rose-950/70 border border-rose-500/70 text-rose-200 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_25px_rgba(244,63,94,0.2)] animate-fadeIn">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-rose-300 flex items-center gap-2">
                      <span>NeMo Guardrail Rejection: Negotiation Terminated</span>
                      <span className="text-[10px] bg-rose-500/20 px-1.5 py-0.2 rounded border border-rose-500/40 text-rose-300">
                        Zero Hallucination
                      </span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-rose-200/90">{inputError}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectScenario(PRESET_WAR_ROOM_SCENARIOS[0])}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-500/40 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-2 shrink-0 transition-colors shadow-sm self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#76b900]" />
                  <span>Load Verified Scenario</span>
                </button>
              </div>
            )}
          </div>

          {/* Launch Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Grounding: <strong>{jurisdiction}</strong></span>
            </div>

            <button
              onClick={handleStartNegotiation}
              disabled={isNegotiating}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-[#76b900] text-black font-extrabold font-mono text-xs uppercase flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(118,185,0,0.4)] hover:shadow-[0_0_45px_rgba(118,185,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isNegotiating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Agents Debating in Real-Time...</span>
                </>
              ) : (
                <>
                  <Swords className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>Initiate Autonomous War Room Negotiation</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2. LIVE WAR ROOM ARENA (MULTI-AGENT DEBATE) */}
        {negotiationData && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Live Equilibrium & Power Balance Bar */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#180a0e] via-[#090d16] to-[#08180c] border border-slate-700 shadow-[0_15px_45px_rgba(0,0,0,0.8)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                    <Scale className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2 flex-wrap">
                      <span>Judicial Power Balance Gauge</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        Consensus Equilibrium: {negotiationData.rounds[activeRoundTab - 1]?.equilibriumScore}%
                      </span>
                      {isAudioPlaying && currentSpeaker === "judge" && (
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-bold border border-amber-300 flex items-center gap-1 font-mono animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                          <Scale className="w-3 h-3" />
                          <span>HON. NEMOTRON-70B ARBITRATING NOW</span>
                        </span>
                      )}
                      {negotiationData.telemetry && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 font-mono">
                          <Cpu className="w-3 h-3 text-cyan-400" />
                          <span>{negotiationData.telemetry.modelUsed}</span>
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {negotiationData.rounds[activeRoundTab - 1]?.arbitratorNote}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Initial Exposure</span>
                    <span className="text-rose-400 font-bold">{negotiationData.initialExposureEstimateUsd}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Mitigated Liability</span>
                    <span className="text-[#76b900] font-bold">{negotiationData.mitigatedExposureUsd}</span>
                  </div>
                </div>
              </div>

              {/* Progress Slider Meter */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Hostile Vendor Dominance
                  </span>
                  <span className="text-amber-400 font-bold">50% Neutral Equilibrium</span>
                  <span className="text-[#76b900] font-bold flex items-center gap-1">
                    Equitable Bilateral Accord
                    <span className="w-2 h-2 rounded-full bg-[#76b900]" />
                  </span>
                </div>
                
                <div className="w-full h-3 rounded-full bg-black/80 border border-slate-700 overflow-hidden p-0.5 relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-[#76b900] transition-all duration-700 shadow-[0_0_15px_rgba(118,185,0,0.5)]"
                    style={{ width: `${negotiationData.rounds[activeRoundTab - 1]?.equilibriumScore}%` }}
                  />
                </div>
              </div>

              {/* Round Navigation Tabs */}
              <div className="flex items-center gap-2 pt-2 overflow-x-auto">
                {negotiationData.rounds.map((rnd) => (
                  <button
                    key={rnd.roundNumber}
                    onClick={() => setActiveRoundTab(rnd.roundNumber)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 shrink-0 ${
                      activeRoundTab === rnd.roundNumber
                        ? "bg-[#76b900] text-black font-extrabold shadow-[0_0_15px_rgba(118,185,0,0.35)]"
                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>Round {rnd.roundNumber}:</span>
                    <span className="hidden sm:inline">{rnd.phaseName}</span>
                    <span className="text-[10px] px-1.5 rounded bg-black/30">
                      {rnd.equilibriumScore}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2.5 COURTROOM LIVE ORAL ARGUMENTS AUDIO DECK */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0d1624]/95 via-[#091f16]/95 to-[#0d1624]/95 border border-[#76b900]/40 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(118,185,0,0.15)] flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl">
              {/* Left: Live Audio Status & Animated Waveforms */}
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all ${
                  isAudioPlaying 
                    ? "bg-[#76b900]/25 border-[#76b900] text-[#76b900] shadow-[0_0_25px_rgba(118,185,0,0.5)]" 
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}>
                  {isAudioPlaying ? (
                    <Mic className="w-5 h-5 animate-pulse text-[#76b900]" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-2 flex-wrap">
                      <span>Courtroom Oral Arguments Simulator</span>
                      {isAudioPlaying && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/50 animate-pulse shadow-[0_0_15px_rgba(118,185,0,0.4)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] animate-ping" />
                          LIVE AUDIO DEBATE
                        </span>
                      )}
                    </h4>
                  </div>

                  {/* Speaker Subtitle & Dynamic Soundwave Bars */}
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    {isAudioPlaying && currentSpeaker ? (
                      <div className="flex items-center gap-2 text-xs font-mono">
                        {currentSpeaker === "vendor" && (
                          <span className="text-rose-400 font-bold flex items-center gap-1.5 bg-rose-950/40 px-2 py-0.5 rounded-lg border border-rose-900/50">
                            <span className="text-sm">👔</span>
                            Speaking: Attorney Marcus Vance (Vendor)
                          </span>
                        )}
                        {currentSpeaker === "defense" && (
                          <span className="text-[#76b900] font-bold flex items-center gap-1.5 bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-900/50">
                            <span className="text-sm">👩‍⚖️</span>
                            Speaking: Counsel Elena Rostova (NemoGuard)
                          </span>
                        )}
                        {currentSpeaker === "judge" && (
                          <span className="text-amber-400 font-bold flex items-center gap-1.5 bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-900/50">
                            <span className="text-sm">⚖️</span>
                            Speaking: Hon. Judge Nemotron-70B
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 font-mono">
                        Listen to autonomous synthetic voices debate contractual liability in real-time
                      </p>
                    )}

                    {/* Animated Soundwave Equalizer Bars */}
                    {isAudioPlaying && !isAudioPaused && (
                      <div className="flex items-end gap-0.5 h-4">
                        <span className="w-1 bg-[#76b900] rounded-full animate-[bounce_0.8s_infinite] h-2" />
                        <span className="w-1 bg-[#76b900] rounded-full animate-[bounce_0.6s_infinite] h-4" />
                        <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.9s_infinite] h-3" />
                        <span className="w-1 bg-rose-400 rounded-full animate-[bounce_0.7s_infinite] h-4" />
                        <span className="w-1 bg-[#76b900] rounded-full animate-[bounce_0.85s_infinite] h-2.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Audio Playback Controls */}
              <div className="flex items-center flex-wrap gap-2">
                {!isAudioPlaying ? (
                  <>
                    <button
                      onClick={() => playOralArguments(activeRoundTab, false)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#76b900] to-emerald-500 hover:from-[#88d600] hover:to-emerald-400 text-black font-mono font-bold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(118,185,0,0.4)] hover:shadow-[0_0_30px_rgba(118,185,0,0.6)] transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Round {activeRoundTab} Arguments</span>
                    </button>

                    <button
                      onClick={() => playOralArguments(1, true)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-[#76b900]/40 text-[#76b900] hover:text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm hover:border-[#76b900] transition-all cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Play Full 3-Round Debate</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={togglePauseCourtroomAudio}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      {isAudioPaused ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Resume</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={stopCourtroomAudio}
                      className="px-3.5 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-200 font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Square className="w-3 h-3 fill-current" />
                      <span>Stop Audio</span>
                    </button>
                  </>
                )}

                {/* Speed Selector */}
                <div className="flex items-center rounded-xl bg-black/60 border border-slate-800 p-0.5 text-[10px] font-mono">
                  {[1.0, 1.25, 1.5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setAudioSpeed(s)}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        audioSpeed === s
                          ? "bg-[#76b900] text-black font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile View Perspective Switcher */}
            <div className="sm:hidden flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-mono font-bold">
              <button
                type="button"
                onClick={() => setDebatePerspective("split")}
                className={`flex-1 py-1.5 rounded-lg ${debatePerspective === "split" ? "bg-slate-800 text-white" : "text-slate-400"}`}
              >
                Both Podiums
              </button>
              <button
                type="button"
                onClick={() => setDebatePerspective("vendor")}
                className={`flex-1 py-1.5 rounded-lg ${debatePerspective === "vendor" ? "bg-rose-950 text-rose-300" : "text-slate-400"}`}
              >
                Vendor Counsel
              </button>
              <button
                type="button"
                onClick={() => setDebatePerspective("defense")}
                className={`flex-1 py-1.5 rounded-lg ${debatePerspective === "defense" ? "bg-emerald-950 text-[#76b900]" : "text-slate-400"}`}
              >
                NemoGuard
              </button>
            </div>

            {/* DUAL COUNSEL PODIUMS (ROUND DETAILS) */}
            {(() => {
              const currentRound = negotiationData.rounds[activeRoundTab - 1];
              if (!currentRound) return null;

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* PODIUM 1: OPPOSING VENDOR COUNSEL */}
                  {(debatePerspective === "split" || debatePerspective === "vendor") && (
                    <div className={`p-6 rounded-3xl bg-gradient-to-b from-[#180a0e] to-[#090b12] border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                      isAudioPlaying && currentSpeaker === "vendor"
                        ? "border-rose-500 ring-4 ring-rose-500/30 shadow-[0_0_45px_rgba(244,63,94,0.45)] scale-[1.01]"
                        : "border-rose-500/40 shadow-[0_10px_35px_rgba(244,63,94,0.15)]"
                    }`}>
                      <div className="space-y-3">
                        {/* Agent Identity */}
                        <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                              👔
                            </div>
                            <div>
                              <p className="text-xs font-bold text-rose-300 font-mono flex items-center gap-1.5">
                                {currentRound.opposingCounsel.speaker}
                              </p>
                              <p className="text-[10px] text-slate-400 font-mono">
                                Vendor Commercial Advocate • Tone: <strong className="text-rose-400">{currentRound.opposingCounsel.tone}</strong>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {isAudioPlaying && currentSpeaker === "vendor" && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-rose-500 text-black border border-rose-400 flex items-center gap-1 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.8)]">
                                <Mic className="w-2.5 h-2.5 animate-spin" />
                                <span>SPEAKING NOW</span>
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                              Vendor Stance
                            </span>
                          </div>
                        </div>

                        {/* Speech Bubble / Argument */}
                        <div className="p-4 rounded-2xl bg-black/60 border border-rose-950/80 space-y-2">
                          <span className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-wider block">
                            Opposing Counsel Argument:
                          </span>
                          <p className="text-xs text-rose-100/90 leading-relaxed font-sans italic">
                            "{currentRound.opposingCounsel.argument}"
                          </p>
                        </div>

                        {/* Proposed Terms at this Round */}
                        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20">
                          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                            Vendor's Proposed Language:
                          </span>
                          <p className="text-xs font-mono text-rose-300">
                            {currentRound.opposingCounsel.proposedTerms}
                          </p>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-rose-950 flex items-center justify-between">
                        <span>Agent 1 • Multi-Turn Reasoner</span>
                        <span className="text-rose-400">Nemotron-70B Active</span>
                      </div>
                    </div>
                  )}

                  {/* PODIUM 2: NEMOGUARD ENTERPRISE DEFENSE */}
                  {(debatePerspective === "split" || debatePerspective === "defense") && (
                    <div className={`p-6 rounded-3xl bg-gradient-to-b from-[#08180c] to-[#090b12] border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                      isAudioPlaying && currentSpeaker === "defense"
                        ? "border-[#76b900] ring-4 ring-[#76b900]/30 shadow-[0_0_45px_rgba(118,185,0,0.45)] scale-[1.01]"
                        : "border-[#76b900]/40 shadow-[0_10px_35px_rgba(118,185,0,0.15)]"
                    }`}>
                      <div className="space-y-3">
                        {/* Agent Identity */}
                        <div className="flex items-center justify-between pb-3 border-b border-[#76b900]/20">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#76b900]/20 border border-[#76b900]/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(118,185,0,0.3)]">
                              👩‍⚖️
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                                {currentRound.defenseCounsel.speaker}
                              </p>
                              <p className="text-[10px] text-slate-400 font-mono">
                                Enterprise Defense AI • Tone: <strong className="text-[#76b900]">{currentRound.defenseCounsel.tone}</strong>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {isAudioPlaying && currentSpeaker === "defense" && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#76b900] text-black border border-emerald-400 flex items-center gap-1 animate-pulse shadow-[0_0_12px_rgba(118,185,0,0.8)]">
                                <Mic className="w-2.5 h-2.5 animate-spin" />
                                <span>SPEAKING NOW</span>
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/40 uppercase">
                              NemoGuard Defense
                            </span>
                          </div>
                        </div>

                        {/* Speech Bubble / Rebuttal */}
                        <div className="p-4 rounded-2xl bg-black/60 border border-emerald-950/80 space-y-2">
                          <span className="text-[10px] font-mono text-[#76b900] uppercase font-bold tracking-wider block">
                            Enterprise Counter-Argument:
                          </span>
                          <p className="text-xs text-emerald-100/90 leading-relaxed font-sans italic">
                            "{currentRound.defenseCounsel.argument}"
                          </p>
                        </div>

                        {/* Precedent / Statutory Grounding Box */}
                        <div className="p-3.5 rounded-2xl bg-[#76b900]/10 border border-[#76b900]/30 space-y-1">
                          <span className="text-[10px] font-mono text-[#76b900] uppercase font-bold block flex items-center gap-1">
                            <Scale className="w-3 h-3 text-[#76b900]" />
                            <span>Binding Statutory Citation & Grounding:</span>
                          </span>
                          <p className="text-xs font-mono text-slate-200 font-semibold">
                            {currentRound.defenseCounsel.statutoryCitation}
                          </p>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-emerald-950 flex items-center justify-between">
                        <span>Agent 2 • Grounded by Tavily</span>
                        <span className="text-[#76b900]">Nemotron-70B Verified</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 3. FINAL SETTLEMENT ACCORD & BILATERAL CERTIFICATE */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0a1420] to-[#05080e] border-2 border-[#76b900] shadow-[0_0_50px_rgba(118,185,0,0.25)] space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76b900]/20 text-[#76b900] text-xs font-mono font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>FINAL RATIFIED ACCORD REACHED</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                    Bilateral Agreed Contract Language
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Cert Hash: <code className="text-[#76b900]">{negotiationData.certHash}</code>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowDossierModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-[#76b900] to-[#88d600] hover:brightness-110 text-black font-mono font-bold text-xs uppercase flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(118,185,0,0.4)]"
                  >
                    <FileDown className="w-4 h-4 text-black" />
                    <span>Download Settlement Dossier</span>
                  </button>

                  <button
                    onClick={handlePrintDossier}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-[#76b900]/50 text-[#76b900] hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                    title="Print or Save as PDF"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / PDF</span>
                  </button>

                  <button
                    onClick={handleCopyAccord}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-white flex items-center gap-2 transition-colors"
                  >
                    {copiedAccord ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAccord ? "Copied Accord" : "Copy Clause"}</span>
                  </button>

                  <Link
                    href={`/auditor?sample=custom`}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono font-bold text-xs uppercase flex items-center gap-1.5 transition-colors"
                  >
                    <span>Audit in Nemotron</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Side by Side Diff: Disputed Hostile vs. Final Agreed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original Hostile Clause */}
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Original Hostile Language (Vulnerable)</span>
                  </span>
                  <p className="text-xs font-mono text-rose-200/80 leading-relaxed bg-black/60 p-3 rounded-xl border border-rose-900/50 line-through decoration-rose-500/60">
                    {negotiationData.disputedClause}
                  </p>
                </div>

                {/* Final Agreed Bilateral Clause */}
                <div className="p-4 rounded-2xl bg-[#76b900]/10 border border-[#76b900]/50 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#76b900] font-bold block flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#76b900]" />
                    <span>Ratified Bilateral Clause (Clean Execution)</span>
                  </span>
                  <p className="text-xs font-mono text-emerald-200 leading-relaxed bg-black/60 p-3 rounded-xl border border-[#76b900]/40 font-semibold shadow-inner">
                    {negotiationData.finalAgreedClause}
                  </p>
                </div>
              </div>

              {/* Key Concessions Won */}
              <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Key Commercial Concessions Won Through AI Debate:
                </span>
                <ul className="space-y-1.5 text-xs font-mono text-slate-200">
                  {negotiationData.concessionsMade.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#76b900] font-bold">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

        {/* 4. MODAL: OFFICIAL LEGAL ARBITRATION DOSSIER & BILATERAL ACCORD */}
        {showDossierModal && negotiationData && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print">
            <div className="relative max-w-4xl w-full bg-[#0a0f18] border-2 border-[#76b900]/70 rounded-3xl shadow-[0_0_80px_rgba(118,185,0,0.35)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
              
              {/* Modal Control Bar */}
              <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-[#76b900]/30 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#76b900]/20 border border-[#76b900]/50 flex items-center justify-center text-[#76b900]">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2">
                      <span>Official Bilateral Settlement Dossier</span>
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Cert Hash: <code className="text-[#76b900]">{negotiationData.certHash}</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadMarkdown}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadSuccess ? "Dossier Saved (.md)!" : "Download (.md)"}</span>
                  </button>

                  <button
                    onClick={handlePrintDossier}
                    className="px-3.5 py-2 rounded-xl bg-[#76b900] hover:bg-[#88d600] text-black font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>

                  <button
                    onClick={() => setShowDossierModal(false)}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Content — Lawyer Grade Dossier Preview */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-200">
                
                {/* Official Certificate Header */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#07140a] to-slate-900 border border-[#76b900]/40 text-center space-y-2 relative overflow-hidden">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76b900]/20 text-[#76b900] text-xs font-mono font-bold">
                    <Shield className="w-3.5 h-3.5" />
                    <span>NEMOGUARD AI • LEGAL INTELLIGENCE SUPERCLUSTER</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                    RATIFIED ARBITRATION ACCORD & SETTLEMENT DOSSIER
                  </h2>
                  <p className="text-xs text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
                    Executing bilateral resolution under Delaware Chancery Court, FTC 16 CFR Part 910, and European GDPR statutory ceilings. Certified through autonomous adversarial debate.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[11px] font-mono text-slate-400">
                    <span>Engine: <strong className="text-white">NVIDIA Nemotron-70B</strong></span>
                    <span>•</span>
                    <span>Cloud: <strong className="text-cyan-300">Nebius H100 Token Factory</strong></span>
                    <span>•</span>
                    <span>Precedents: <strong className="text-emerald-300">Tavily Live Grounding</strong></span>
                  </div>
                </div>

                {/* Case Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Matter</span>
                    <span className="text-xs font-mono font-bold text-white truncate block">{negotiationData.contractTitle}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Jurisdiction</span>
                    <span className="text-xs font-mono font-bold text-emerald-300 block">{negotiationData.jurisdiction}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Hostile Exposure</span>
                    <span className="text-xs font-mono font-bold text-rose-400 block">{negotiationData.initialExposureEstimateUsd}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Equilibrium Shift</span>
                    <span className="text-xs font-mono font-bold text-[#76b900] block">{negotiationData.initialEquilibrium}% ➔ {negotiationData.finalEquilibrium}%</span>
                  </div>
                </div>

                {/* Operative Clauses Comparison */}
                <div className="space-y-4">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#76b900]" />
                    <span>Section I: Operative Contract Language Comparison</span>
                  </h5>

                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
                      Stricken Contested Provision (Original Hostile Terms):
                    </span>
                    <p className="text-xs font-mono text-rose-200/90 leading-relaxed line-through decoration-rose-500">
                      {negotiationData.disputedClause}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#76b900]/10 border border-[#76b900]/60 space-y-1">
                    <span className="text-[10px] font-mono text-[#76b900] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ratified Bilateral Clause (Clean Execution Standard):</span>
                    </span>
                    <p className="text-xs font-mono text-emerald-100 font-semibold leading-relaxed">
                      "{negotiationData.finalAgreedClause}"
                    </p>
                  </div>
                </div>

                {/* Concessions & Statutory Grounding */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
                      Section II: Concessions Won in AI War Room
                    </span>
                    <ul className="space-y-1.5 text-xs font-mono text-slate-200">
                      {negotiationData.concessionsMade.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#76b900] font-bold">✓</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
                      Section III: Binding Statutory Grounding
                    </span>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">
                      {negotiationData.statutoryBasis || "Delaware UCC § 2-719; ABRY Partners V, L.P. v. F&W Acquisition LLC (Del. Ch. 2006); FTC 16 CFR Part 910; Restatement (Second) of Contracts § 178."}
                    </p>
                  </div>
                </div>

                {/* 3-Round Transcript Brief */}
                <div className="space-y-3">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                    <Swords className="w-4 h-4 text-rose-400" />
                    <span>Section IV: Adversarial Multi-Agent Deliberations (3 Rounds)</span>
                  </h5>

                  <div className="space-y-2.5">
                    {negotiationData.rounds.map((r) => (
                      <div key={r.roundNumber} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-white">Round {r.roundNumber}: {r.phaseName}</span>
                          <span className="text-[#76b900]">Equilibrium: {r.equilibriumScore}%</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded-lg bg-rose-950/20 border border-rose-900/40 text-rose-200/90 italic">
                            <strong className="text-rose-400 font-mono not-italic block">{r.opposingCounsel.speaker}:</strong>
                            "{r.opposingCounsel.argument}"
                          </div>
                          <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-emerald-200/90 italic">
                            <strong className="text-[#76b900] font-mono not-italic block">{r.defenseCounsel.speaker}:</strong>
                            "{r.defenseCounsel.argument}"
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tri-Party Signatures & Digital Seal */}
                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Enterprise Defense AI</span>
                      <p className="text-xs font-serif italic text-emerald-300 font-bold">Elena Rostova, Esq.</p>
                      <span className="text-[9px] font-mono text-emerald-500 block">✓ RATIFIED</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Vendor Commercial Counsel</span>
                      <p className="text-xs font-serif italic text-rose-300 font-bold">Marcus Vance, Esq.</p>
                      <span className="text-[9px] font-mono text-rose-400 block">✓ CONCEDED</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-[#76b900]/40 space-y-1">
                      <span className="text-[10px] font-mono text-[#76b900] uppercase block">Judicial Neural Arbitrator</span>
                      <p className="text-xs font-mono text-white font-bold">Hon. Nemotron-70B</p>
                      <span className="text-[9px] font-mono text-[#76b900] block">0xNEMO_VERIFIED</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 5. DEDICATED PRINT CONTAINER: PRISTINE WHITE-PAPER LEGAL DOSSIER (PDF EXPORT) */}
        {negotiationData && (
          <div id="war-room-settlement-dossier" className="hidden print:block text-slate-900 bg-white font-sans p-4">
            <div className="border-4 border-double border-slate-800 p-8 space-y-6">
              
              {/* Official Court & Arbitration Header */}
              <div className="text-center pb-6 border-b-2 border-slate-800 space-y-1">
                <p className="text-xs font-mono uppercase tracking-widest text-slate-600">
                  NEMOGUARD AI ARBITRATION TRIBUNAL • SUPERCLUSTER NEURAL INFERENCE
                </p>
                <h1 className="text-2xl font-serif font-extrabold uppercase tracking-tight text-black">
                  OFFICIAL BILATERAL CONTRACT RATIFICATION ACCORD
                </h1>
                <p className="text-xs font-serif italic text-slate-700">
                  In the Matter of: {negotiationData.contractTitle} | Jurisdiction: {negotiationData.jurisdiction}
                </p>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  Cert Docket Hash: {negotiationData.certHash} • Ratified: {new Date().toUTCString()}
                </p>
              </div>

              {/* Case Summary Docket */}
              <div className="grid grid-cols-2 gap-4 text-xs font-serif border border-slate-300 p-4 bg-slate-50">
                <div>
                  <p><strong>Arbitration Verdict:</strong> {negotiationData.settlementVerdict || "EQUITY RESTORED — RATIFIED BILATERAL ACCORD"}</p>
                  <p><strong>Initial Hostile Exposure:</strong> {negotiationData.initialExposureEstimateUsd}</p>
                </div>
                <div>
                  <p><strong>Mitigated Exposure:</strong> {negotiationData.mitigatedExposureUsd}</p>
                  <p><strong>Equilibrium Shift:</strong> {negotiationData.initialEquilibrium}% (Vendor) ➔ {negotiationData.finalEquilibrium}% (Bilateral)</p>
                </div>
              </div>

              {/* Stricken Language vs. Ratified Accord */}
              <div className="space-y-3">
                <h3 className="text-sm font-serif font-bold uppercase border-b border-slate-400 pb-1">
                  I. Operative Contract Language Comparison
                </h3>
                
                <div className="p-3 bg-red-50 border border-red-200 text-xs">
                  <strong className="text-red-900 block font-mono text-[10px] uppercase">Stricken Contested Provision:</strong>
                  <p className="line-through text-red-950 font-serif leading-relaxed mt-1">
                    {negotiationData.disputedClause}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50 border-2 border-emerald-600 text-xs">
                  <strong className="text-emerald-900 block font-mono text-[10px] uppercase">Ratified Executable Bilateral Clause:</strong>
                  <p className="font-serif font-bold text-slate-900 leading-relaxed mt-1">
                    "{negotiationData.finalAgreedClause}"
                  </p>
                </div>
              </div>

              {/* Key Concessions */}
              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold uppercase border-b border-slate-400 pb-1">
                  II. Commercial Concessions Granted
                </h3>
                <ul className="list-disc pl-5 text-xs font-serif space-y-1">
                  {negotiationData.concessionsMade.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Statutory Basis */}
              <div className="space-y-1 text-xs font-serif">
                <h3 className="text-sm font-serif font-bold uppercase border-b border-slate-400 pb-1">
                  III. Statutory Authorities & Precedents
                </h3>
                <p className="italic text-slate-800">
                  {negotiationData.statutoryBasis || "Delaware UCC § 2-719; ABRY Partners V, L.P. v. F&W Acquisition LLC (Del. Ch. 2006); FTC 16 CFR Part 910; EU GDPR Art. 28/82."}
                </p>
              </div>

              {/* Formal Attestation & Signatures */}
              <div className="pt-8 border-t-2 border-slate-800">
                <div className="grid grid-cols-3 gap-6 text-center text-xs font-serif">
                  <div>
                    <div className="border-b border-slate-900 pb-1 font-bold text-slate-900">Elena Rostova, Esq.</div>
                    <span className="text-[10px] text-slate-600 block mt-1">Lead Enterprise Defense AI</span>
                    <span className="text-[9px] font-mono text-emerald-800 block">✓ RATIFIED ACCORD</span>
                  </div>
                  <div>
                    <div className="border-b border-slate-900 pb-1 font-bold text-slate-900">Marcus Vance, Esq.</div>
                    <span className="text-[10px] text-slate-600 block mt-1">Vendor Commercial Counsel AI</span>
                    <span className="text-[9px] font-mono text-slate-700 block">✓ CONCEDED TERMS</span>
                  </div>
                  <div>
                    <div className="border-b border-slate-900 pb-1 font-bold text-slate-900">Hon. Nemotron-70B</div>
                    <span className="text-[10px] text-slate-600 block mt-1">Judicial Neural Arbitrator</span>
                    <span className="text-[9px] font-mono text-slate-800 block">NVIDIA × NEBIUS RATIFIED</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 6. MODAL: USER NEGOTIATION HISTORY & ACCORDS ARCHIVE */}
        {showHistoryModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-hidden no-print animate-in fade-in duration-200">
            <div className="relative max-w-5xl w-full bg-[#080d19]/95 border border-emerald-500/30 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(118,185,0,0.12)] overflow-hidden my-auto max-h-[90vh] flex flex-col">
              
              {/* Top Neon Ambient Accent Line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#76b900] to-transparent pointer-events-none z-30" />

              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-900/95 to-slate-900/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#76b900]/25 to-emerald-950/40 border border-[#76b900]/40 flex items-center justify-center text-[#76b900] shadow-[0_0_15px_rgba(118,185,0,0.25)]">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-white font-mono">
                        Negotiation History & Accords Archive
                      </h4>
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-[#76b900]/15 text-[#76b900] border border-[#76b900]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] animate-pulse" />
                        Live Neural Ledger
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-0.5">
                      <span>{savedNegotiations.length} Bilateral Accords Ratified</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400">NVIDIA Nemotron-70B</span>
                    </div>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetToBenchmarks}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/80 text-[11px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
                    title="Reset to clean benchmark accords (removes test junk)"
                  >
                    <RefreshCw className="w-3 h-3 text-[#76b900]" />
                    <span>Reset Benchmarks</span>
                  </button>

                  <button
                    onClick={() => setShowHistoryModal(false)}
                    className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 text-slate-400 hover:text-rose-200 flex items-center justify-center transition-colors border border-slate-700/80 hover:border-rose-800/80 cursor-pointer"
                    title="Close (ESC)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="p-3.5 sm:p-4 bg-black/40 border-b border-slate-800/80 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={historySearchQuery}
                      onChange={(e) => setHistorySearchQuery(e.target.value)}
                      placeholder="Search by contract title, jurisdiction, cert hash, or keyword..."
                      className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/90 border border-slate-700/90 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#76b900] focus:ring-1 focus:ring-[#76b900]/40 transition-all"
                    />
                    {historySearchQuery && (
                      <button
                        onClick={() => setHistorySearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="hidden md:inline-block px-2.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-500 select-none">
                    ESC to close
                  </span>
                </div>

                {/* Filter Chips Bar */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] font-mono text-slate-500 mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3 text-slate-400" />
                    <span>Filter:</span>
                  </span>

                  {[
                    { id: "all", label: `All Accords (${savedNegotiations.length})` },
                    { id: "high-eq", label: "High Equilibrium (≥90%)" },
                    { id: "delaware", label: "Delaware Law" },
                    { id: "eu", label: "EU / GDPR" },
                    { id: "custom", label: "Custom Runs" },
                  ].map((tab) => {
                    const isActive = historyCategoryFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setHistoryCategoryFilter(tab.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/50 font-bold shadow-[0_0_10px_rgba(118,185,0,0.2)]"
                            : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* History Items List */}
              <div className="p-3.5 sm:p-5 overflow-y-auto space-y-3.5 max-h-[calc(90vh-190px)]">
                {isLoadingHistory ? (
                  <div className="py-16 text-center text-xs font-mono text-slate-400 flex flex-col items-center justify-center gap-3">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#76b900]" />
                    <span>Loading negotiation archive...</span>
                  </div>
                ) : (() => {
                  const filtered = savedNegotiations.filter((n) => {
                    const q = historySearchQuery.toLowerCase().trim();
                    const matchesSearch =
                      !q ||
                      n.contractTitle.toLowerCase().includes(q) ||
                      n.jurisdiction.toLowerCase().includes(q) ||
                      n.certHash.toLowerCase().includes(q) ||
                      n.finalAgreedClause.toLowerCase().includes(q) ||
                      n.disputedClause.toLowerCase().includes(q);

                    if (!matchesSearch) return false;

                    if (historyCategoryFilter === "high-eq") {
                      return n.finalEquilibrium >= 90;
                    }
                    if (historyCategoryFilter === "delaware") {
                      return n.jurisdiction.toLowerCase().includes("delaware");
                    }
                    if (historyCategoryFilter === "eu") {
                      return n.jurisdiction.toLowerCase().includes("gdpr") || n.jurisdiction.toLowerCase().includes("eu");
                    }
                    if (historyCategoryFilter === "custom") {
                      return !BENCHMARK_PAST_NEGOTIATIONS.some((b) => b.certHash === n.certHash);
                    }
                    return true;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="py-16 text-center space-y-3">
                        <FolderArchive className="w-10 h-10 text-slate-600 mx-auto" />
                        <p className="text-xs font-mono text-slate-400">No matching negotiation records found.</p>
                        <button
                          onClick={() => {
                            setHistorySearchQuery("");
                            setHistoryCategoryFilter("all");
                          }}
                          className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-mono text-[#76b900] border border-slate-700 hover:border-[#76b900] transition-colors cursor-pointer"
                        >
                          Clear Filters
                        </button>
                      </div>
                    );
                  }

                  return filtered.map((item, idx) => {
                    const isCustom = !BENCHMARK_PAST_NEGOTIATIONS.some((b) => b.certHash === item.certHash);
                    const isCopied = copiedCertHash === item.certHash;

                    return (
                      <div
                        key={item.certHash || idx}
                        className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900/95 via-[#06120b]/70 to-slate-900/95 border border-slate-800/90 hover:border-[#76b900]/40 transition-all duration-200 space-y-2.5 shadow-sm hover:shadow-[0_4px_25px_rgba(0,0,0,0.5)] group"
                      >
                        {/* Card Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/70">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold border uppercase tracking-wider ${getJurisdictionBadgeStyle(item.jurisdiction)}`}>
                                {item.jurisdiction}
                              </span>

                              <button
                                onClick={(e) => handleCopyCertHash(item.certHash, e)}
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-mono text-slate-400 bg-slate-950/80 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                                title="Click to copy Cert Hash"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Cert:</span>
                                    <code className="text-slate-300">{item.certHash}</code>
                                    <Copy className="w-2.5 h-2.5 text-slate-500" />
                                  </>
                                )}
                              </button>

                              {isCustom && (
                                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                  Custom Run
                                </span>
                              )}
                            </div>

                            <h5 className="text-sm font-bold text-white font-mono tracking-tight group-hover:text-[#88d600] transition-colors">
                              {item.contractTitle}
                            </h5>
                          </div>

                          {/* Visual Equilibrium Gauge */}
                          <div className="flex flex-col sm:items-end gap-1">
                            <div className="flex items-center gap-1.5 text-xs font-mono">
                              <span className="text-slate-400 text-[10px]">Equilibrium:</span>
                              <span className="text-rose-400 font-semibold">{item.initialEquilibrium}%</span>
                              <span className="text-slate-500">➔</span>
                              <span className="text-[#76b900] font-bold">{item.finalEquilibrium}%</span>
                            </div>
                            <div className="w-28 h-1.5 bg-slate-800/90 rounded-full overflow-hidden flex border border-slate-700/50">
                              <div
                                style={{ width: `${Math.min(100, item.finalEquilibrium)}%` }}
                                className="bg-gradient-to-r from-amber-400 via-[#76b900] to-emerald-400 h-full rounded-full shadow-[0_0_8px_rgba(118,185,0,0.6)]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Diff Comparison Side-by-Side (Compact & Break-all protected) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                          <div className="p-2.5 rounded-xl bg-rose-950/20 border-l-2 border-l-rose-500/80 border-y border-r border-rose-900/30 text-rose-200/90 space-y-1">
                            <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-rose-400 font-bold">
                              <span>Contested Clause</span>
                              <span className="text-[8px] text-rose-500/70 font-mono">Pre-Arbitration</span>
                            </div>
                            <p className="line-through text-[11px] leading-relaxed line-clamp-2 break-all text-rose-200/80">
                              {item.disputedClause}
                            </p>
                          </div>

                          <div className="p-2.5 rounded-xl bg-emerald-950/20 border-l-2 border-l-[#76b900] border-y border-r border-emerald-800/40 text-emerald-100 space-y-1">
                            <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-[#76b900] font-bold">
                              <span>Ratified Bilateral Accord</span>
                              <span className="text-[8px] text-emerald-400/70 font-mono">Consensus Executed</span>
                            </div>
                            <p className="font-semibold text-[11px] leading-relaxed line-clamp-2 break-all text-emerald-200">
                              "{item.finalAgreedClause}"
                            </p>
                          </div>
                        </div>

                        {/* Concessions Micro-Chips */}
                        {item.concessionsMade && item.concessionsMade.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {item.concessionsMade.slice(0, 3).map((c, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-slate-950/80 text-slate-300 border border-slate-800">
                                ✓ {c}
                              </span>
                            ))}
                            {item.concessionsMade.length > 3 && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-slate-950/50 text-slate-500 border border-slate-800/50">
                                +{item.concessionsMade.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Actions Toolbar */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/70">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Exposure Mitigated:</span>
                            <strong className="text-emerald-400 font-bold">{item.mitigatedExposureUsd}</strong>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleLoadHistoryItem(item)}
                              className="px-3 py-1.5 rounded-xl bg-[#76b900] hover:bg-[#88d600] text-black font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(118,185,0,0.3)] hover:shadow-[0_0_20px_rgba(118,185,0,0.5)] cursor-pointer"
                            >
                              <span>Load into War Room</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleViewHistoryDossier(item)}
                              className="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 hover:text-white flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Dossier & PDF</span>
                            </button>

                            <button
                              onClick={(e) => handleDeleteHistoryItem(item.certHash, e)}
                              className="w-7 h-7 rounded-xl bg-slate-800/70 hover:bg-rose-950/70 border border-slate-700/80 hover:border-rose-800/80 text-slate-400 hover:text-rose-300 flex items-center justify-center transition-colors cursor-pointer"
                              title="Delete from local archive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
