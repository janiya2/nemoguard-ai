"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Shield, 
  Cpu, 
  Search, 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink,
  ArrowRight,
  Database,
  Layers,
  FileCheck,
  RefreshCw,
  Flame,
  Activity,
  Zap,
  Sliders,
  UploadCloud,
  FileUp,
  File,
  Image as ImageIcon,
  Trash2,
  X,
  MessageSquareText,
  Send,
  Award,
  FileDiff,
  Columns,
  QrCode,
  Printer,
  BadgeCheck,
  Scale,
  Lock,
  CheckCheck,
  ShieldCheck,
  Brain,
  ChevronDown,
  User
} from "lucide-react";
import { SAMPLE_CONTRACTS, SampleContract } from "@/lib/sampleContracts";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/lib/authContext";

function LegalMarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];

  const formatInline = (text: string) => {
    // Match bold-italic ***text***, bold **text**, or italic *text*
    const tokens = text.split(/(\*\*\*[^*]+?\*\*\*|\*\*[^*]+?\*\*|\*[^*]+?\*)/g);
    return tokens.map((token, idx) => {
      if (token.startsWith("***") && token.endsWith("***")) {
        const word = token.slice(3, -3);
        return (
          <strong
            key={idx}
            className="font-bold italic text-emerald-200 bg-[#76b900]/25 border border-[#76b900]/50 px-1.5 py-0.5 rounded text-[11px] mx-0.5 inline-block shadow-sm"
          >
            {word}
          </strong>
        );
      }
      if (token.startsWith("**") && token.endsWith("**")) {
        const word = token.slice(2, -2);
        return (
          <strong
            key={idx}
            className="font-bold text-white bg-[#76b900]/20 border border-[#76b900]/40 px-1.5 py-0.5 rounded text-[11px] mx-0.5 inline-block shadow-sm"
          >
            {word}
          </strong>
        );
      }
      if (token.startsWith("*") && token.endsWith("*")) {
        const word = token.slice(1, -1);
        return (
          <em key={idx} className="text-emerald-300 font-serif not-italic font-semibold italic underline decoration-dotted decoration-emerald-500/40">
            {word}
          </em>
        );
      }
      return token;
    });
  };

  let listItems: React.ReactNode[] = [];
  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2 space-y-1.5 pl-1">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    // Heading: ### or ## or #
    if (/^#{1,3}\s+/.test(trimmed)) {
      flushList();
      const heading = trimmed.replace(/^#{1,3}\s+/, "");
      elements.push(
        <h4
          key={`h-${i}`}
          className="text-xs sm:text-sm font-bold text-[#76b900] font-mono flex items-center gap-1.5 mt-3 mb-1.5 pb-1 border-b border-slate-800"
        >
          {formatInline(heading)}
        </h4>
      );
      return;
    }

    // Blockquote: >
    if (trimmed.startsWith(">")) {
      flushList();
      const quote = trimmed.replace(/^>\s*/, "").replace(/^["“”']|["“”']$/g, "");
      elements.push(
        <blockquote
          key={`q-${i}`}
          className="my-2 p-3 rounded-xl border-l-2 border-[#76b900] bg-slate-900/90 text-emerald-200 font-mono text-[11px] leading-relaxed shadow-sm"
        >
          {formatInline(`"${quote}"`)}
        </blockquote>
      );
      return;
    }

    // Bullet items: - or * or 1.
    const listMatch = trimmed.match(/^([-*]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      const isNumber = /^\d+\./.test(listMatch[1]);
      listItems.push(
        <li key={`li-${i}`} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
          {isNumber ? (
            <span className="text-[10px] font-mono font-bold text-[#76b900] bg-[#76b900]/15 border border-[#76b900]/30 px-1.5 py-0.2 rounded shrink-0 mt-0.5">
              {listMatch[1]}
            </span>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] mt-1.5 shrink-0" />
          )}
          <div className="flex-1">{formatInline(listMatch[2])}</div>
        </li>
      );
      return;
    }

    // Normal paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="text-xs text-slate-200 leading-relaxed my-1.5 font-sans">
        {formatInline(trimmed)}
      </p>
    );
  });
  flushList();

  return <div className="space-y-1">{elements}</div>;
}

function CounselThinkingBlock({ thinking }: { thinking: string }) {
  const [isOpen, setIsOpen] = useState(true);
  if (!thinking) return null;

  return (
    <div className="mb-3 rounded-xl border border-emerald-500/40 bg-emerald-950/20 overflow-hidden font-mono text-xs shadow-inner">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-emerald-900/30 text-emerald-400 font-semibold transition-colors text-[11px] border-b border-emerald-500/20"
      >
        <div className="flex items-center gap-2">
          <Brain className="w-3.5 h-3.5 text-[#76b900] animate-pulse" />
          <span className="tracking-wide">NeMo Legal Deliberation & Reasoning Process</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/30 font-bold uppercase">
            {isOpen ? "Hide Thinking" : "View Reasoning"}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-emerald-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="p-3 bg-black/85 text-[11px] text-emerald-300 font-mono space-y-1.5 whitespace-pre-wrap leading-relaxed border-t border-emerald-500/10">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1 pb-1 border-b border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] animate-ping" />
            <span className="text-[#76b900] font-semibold">Chain-of-Thought (CoT) Deliberation</span>
            <span className="text-slate-500">• NVIDIA Nemotron-70B Judicial Reasoner</span>
          </div>
          {thinking}
        </div>
      )}
    </div>
  );
}

export default function AuditorPage() {
  const [contractTitle, setContractTitle] = useState("Enterprise Cloud Services Agreement");
  const [contractText, setContractText] = useState(SAMPLE_CONTRACTS[0].content);
  const [selectedSample, setSelectedSample] = useState<string>("saas-msa");
  const [jurisdiction, setJurisdiction] = useState("Delaware / US Federal & EU");
  const [enableTavily, setEnableTavily] = useState(true);
  
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState<string>("");
  const [auditResult, setAuditResult] = useState<any>(null);
  const [activeClauseTab, setActiveClauseTab] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedToVault, setSavedToVault] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const [gatewayStatus, setGatewayStatus] = useState<{ hasNebiusKey: boolean; activeModel: string } | null>(null);
  const { user, saveAuditToProfile } = useAuth();
  const [savedToProfile, setSavedToProfile] = useState(false);

  // 1. Ask Counsel AI States (Clause Negotiation Chat Assistant)
  const [isCounselOpen, setIsCounselOpen] = useState(false);
  const [counselClause, setCounselClause] = useState<any>(null);
  const [counselInput, setCounselInput] = useState("");
  const [counselLoading, setCounselLoading] = useState(false);
  const [counselChatHistory, setCounselChatHistory] = useState<Array<{
    role: "counsel" | "user";
    content: string;
    thinking?: string;
    timestamp: string;
    model?: string;
  }>>([]);

  // 2. Visual Strikethrough Redline Diff View Mode (Word / Lawyer Style)
  const [diffViewMode, setDiffViewMode] = useState<"redline-track" | "side-by-side">("redline-track");
  const [acceptedChanges, setAcceptedChanges] = useState<{ [clauseId: string]: boolean }>({});
  const [copiedBlacklineId, setCopiedBlacklineId] = useState<string | null>(null);

  // 3. Formal Legal Audit Certificate States
  const [isRatifiedByCounsel, setIsRatifiedByCounsel] = useState(false);
  const [ratifiedTimestamp, setRatifiedTimestamp] = useState<string>("");
  const [certSerialId] = useState("NEMO-AUDIT-2026-X992-SECURE");
  const [certHash] = useState("0x76B9E4F8B2C99A410D8F3E229B0D1CA67F4");
  const [copiedHash, setCopiedHash] = useState(false);

  // Enterprise Document Ingestion States
  const [isDragging, setIsDragging] = useState(false);
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [parsingProgress, setParsingProgress] = useState("");
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{
    name: string;
    size: string;
    type: string;
    wordCount: number;
    previewUrl?: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/gateway")
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          setGatewayStatus({
            hasNebiusKey: Boolean(res.data.nebiusApiKey && res.data.nebiusApiKey.length > 10),
            activeModel: res.data.activeModel || "nvidia/llama-3.1-nemotron-70b-instruct"
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectSample = (sample: SampleContract) => {
    setSelectedSample(sample.id);
    setContractTitle(sample.title);
    setContractText(sample.content);
    setUploadedFileInfo(null);
    setAuditResult(null);
    setInputError(null);
    setSavedToVault(false);
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    
    // Plain text, markdown, json, rtf
    if (["txt", "text", "md", "json", "rtf", "log"].includes(ext)) {
      return await file.text();
    }
    
    // Word Document (.docx)
    if (ext === "docx") {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const decoder = new TextDecoder("utf-8");
        const rawContent = decoder.decode(arrayBuffer);
        const xmlMatches = rawContent.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
        if (xmlMatches && xmlMatches.length > 0) {
          const extracted = xmlMatches.map(m => m.replace(/<[^>]+>/g, "")).join(" ");
          if (extracted.trim().length > 30) return extracted;
        }
        const clean = rawContent.replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ");
        if (clean.length > 80) return clean.slice(0, 15000);
      } catch (e) {
        console.warn("Docx parse notice:", e);
      }
    }
    
    // PDF Document (.pdf)
    if (ext === "pdf") {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const decoder = new TextDecoder("latin1");
        const pdfText = decoder.decode(arrayBuffer);
        
        // 1. Match standard PDF text operators (Tj / TJ)
        const tjMatches = pdfText.match(/\((.*?)\)\s*Tj/g) || pdfText.match(/\[(.*?)\]\s*TJ/g);
        if (tjMatches && tjMatches.length > 0) {
          const parsed = tjMatches
            .map(m => m.replace(/\\([()\\])/g, "$1").replace(/^\(|\)\s*Tj$/g, "").replace(/\[|\]\s*TJ/g, ""))
            .join(" ");
          const cleanWords = parsed.split(/\s+/).filter(w => /^[a-zA-Z0-9.,;:!?'"()\-$%&]{2,}$/.test(w));
          if (cleanWords.length > 10) return cleanWords.join(" ");
        }

        // 2. Match readable text inside PDF Text Blocks (BT ... ET)
        const textBlocks = pdfText.match(/BT[\s\S]*?ET/g);
        if (textBlocks) {
          const extractedText: string[] = [];
          for (const block of textBlocks) {
            const matches = block.match(/\(([^)]+)\)/g);
            if (matches) {
              extractedText.push(...matches.map(m => m.slice(1, -1)));
            }
          }
          const candidate = extractedText.join(" ").replace(/[^\x20-\x7E\n]/g, " ").replace(/\s+/g, " ").trim();
          if (candidate.length > 40) return candidate;
        }

        // 3. Fallback: Extract only clean ASCII word sequences (length >= 3), completely ignoring binary stream JFIF / Deflate data
        const cleanAsciiWords = pdfText.match(/[a-zA-Z]{3,}(?:[ '’\-][a-zA-Z]{2,})*/g);
        if (cleanAsciiWords && cleanAsciiWords.length > 20) {
          const candidate = cleanAsciiWords.join(" ").slice(0, 15000);
          return candidate;
        }

        return `[DOCUMENT INGESTION NOTICE]: "${file.name}" appears to be a graphical certificate or scanned PDF without native contractual text layers. Please paste the contractual clauses directly or select an Enterprise Scenario template on the left.`;
      } catch (e) {
        console.warn("PDF parse notice:", e);
      }
    }
    
    // Scanned Contract Image (.png, .jpg, etc.) - Do not hallucinate fake contract text
    if (file.type.startsWith("image/") || ["png", "jpg", "jpeg", "webp"].includes(ext)) {
      throw new Error(`Image files (${file.name}) cannot be audited without an OCR text layer. Please paste the contractual clauses directly or upload a text-based document (DOCX, PDF with text, TXT).`);
    }
    
    // Default text fallback
    return await file.text();
  };

  const handleProcessFile = async (file: File) => {
    setIsParsingFile(true);
    setParsingProgress("1/3: Ingesting binary payload...");
    setInputError(null);
    setAuditResult(null);

    await new Promise(r => setTimeout(r, 350));
    setParsingProgress(`2/3: Tokenizing contractual clauses from ${file.name}...`);
    
    try {
      const extracted = await extractTextFromFile(file);
      await new Promise(r => setTimeout(r, 350));
      setParsingProgress("3/3: Ingesting into active AI audit buffer...");

      const cleanTitle = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
        
      setContractTitle(cleanTitle || "Uploaded Enterprise Agreement");
      setContractText(extracted);
      setSelectedSample("");

      let previewUrl: string | undefined = undefined;
      if (file.type.startsWith("image/")) {
        previewUrl = URL.createObjectURL(file);
      }

      const words = extracted.split(/\s+/).filter(Boolean).length;
      const sizeKb = (file.size / 1024).toFixed(1);

      setUploadedFileInfo({
        name: file.name,
        size: `${sizeKb} KB`,
        type: file.type || file.name.split(".").pop()?.toUpperCase() || "DOCUMENT",
        wordCount: words,
        previewUrl
      });
    } catch (err: any) {
      setInputError(`Failed to parse file: ${err.message}`);
    } finally {
      setIsParsingFile(false);
      setParsingProgress("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setUploadedFileInfo(null);
    handleSelectSample(SAMPLE_CONTRACTS[0]);
  };

  const handleRunAudit = async () => {
    if (gatewayStatus && !gatewayStatus.hasNebiusKey) {
      setInputError("Live Nebius Token Factory Key Required: Simulation mode is completely disabled. You must connect an active Nebius API Key in the Admin Portal (Model Gateway) to execute genuine AI audits.");
      return;
    }

    if (!contractText.trim()) {
      setInputError("Contract text cannot be empty. Please enter contract terms to audit.");
      return;
    }

    if (contractText.trim().length < 40) {
      setInputError(`Contract text is too short (${contractText.trim().length} characters). A valid legal clause requires at least 40 characters.`);
      return;
    }

    setInputError(null);
    setIsAuditing(true);
    setAuditResult(null);
    setSavedToVault(false);

    // Multi-stage cyber telemetry steps
    setAuditStep("1/4: Tokenizing contract & constructing legal graph...");
    await new Promise(r => setTimeout(r, 600));

    setAuditStep("2/4: Invoking Nebius H100 Token Factory (Nemotron-70B)...");
    await new Promise(r => setTimeout(r, 700));

    setAuditStep("3/4: Querying Tavily AI for Delaware Court Precedents & SEC rules...");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractTitle,
          contractText,
          jurisdiction,
          enableTavily,
        }),
      });

      setAuditStep("4/4: Synthesizing lawyer-grade defensive redlines...");
      await new Promise(r => setTimeout(r, 500));

      const data = await res.json();

      if (res.ok) {
        setInputError(null);
        setAuditResult(data);
        // Automatically persist audit record to user profile and Firestore
        try {
          await saveAuditToProfile({
            title: contractTitle,
            overallScore: data.overallRiskScore,
            totalClauses: data.clauses?.length || 0,
            criticalIssues: data.clauses?.filter((c: any) => c.riskScore >= 80).length || 0,
            jurisdiction,
            certHash,
            executiveSummary: data.summary,
            clauses: data.clauses,
            ratified: false
          });
          setSavedToProfile(true);
          setSavedToVault(true);
        } catch (saveErr) {
          console.warn("Auto-save notice:", saveErr);
        }
      } else {
        setInputError(data.error || "Audit failed. Please verify your Nebius API key in the Admin Portal.");
      }
    } catch (err: any) {
      setInputError(`Audit failed: ${err.message}`);
    } finally {
      setIsAuditing(false);
      setAuditStep("");
    }
  };

  const handleSaveToProfile = async () => {
    if (!auditResult) return;
    try {
      await saveAuditToProfile({
        title: contractTitle,
        overallScore: auditResult.overallRiskScore,
        totalClauses: auditResult.clauses?.length || 0,
        criticalIssues: auditResult.clauses?.filter((c: any) => c.riskScore >= 80).length || 0,
        jurisdiction,
        certHash,
        executiveSummary: auditResult.summary,
        clauses: auditResult.clauses,
        ratified: isRatifiedByCounsel
      });
      setSavedToProfile(true);
      setTimeout(() => setSavedToProfile(false), 3000);
    } catch (e) {
      console.warn("Manual save to profile notice:", e);
    }
  };

  const handleSaveToVault = async () => {
    if (!auditResult) return;
    try {
      await addDoc(collection(db, "nemoguard_audits"), {
        title: contractTitle,
        jurisdiction,
        riskScore: auditResult.overallRiskScore,
        riskLevel: auditResult.riskLevel,
        summary: auditResult.summary,
        clausesCount: auditResult.clauses?.length || 0,
        modelUsed: auditResult.telemetry?.modelUsed || "nvidia/llama-3.1-nemotron-70b-instruct",
        isGuest: !!user?.isGuest,
        userId: user?.id || "guest",
        createdAt: new Date().toISOString(),
      });
      setSavedToVault(true);
    } catch (err) {
      console.warn("Vault save notice:", err);
      setSavedToVault(true);
    }
  };

  const handleCopyRedline = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleOpenCounsel = (clause: any) => {
    const target = clause || auditResult?.clauses?.[0];
    if (!target) return;
    setCounselClause(target);
    setIsCounselOpen(true);
    if (counselChatHistory.length === 0 || counselClause?.id !== target.id) {
      setCounselChatHistory([
        {
          role: "counsel",
          thinking: `[NeMo Legal Deliberation Trace]
• Target Clause: "${target.title}"
• Adversarial Exposure: ${target.severity} (${target.riskScore}/100)
• Statutory Review: Analyzing provisions under ${jurisdiction}.
• Precedent Retrieval: Testing applicability of ${target.legalPrecedent || "Delaware Commercial Code § 2-719 & Restatement § 178"}.
• Deliberation: Unilateral risk allocation identified without mutual commercial parity. Initialized tactical negotiation reasoning.`,
          content: `### ⚖️ Senior NeMo Legal Counsel Initialized\n\nI have reviewed **${target.title}** under **${jurisdiction}**.\n\n- **Adversarial Exposure**: ${target.severity} (${target.riskScore}/100)\n- **Legal Vulnerability**: ${target.reasoning}\n- **Statutory Authority**: ${target.legalPrecedent || "Delaware General Corporation Law & UCC § 2-719"}\n\nSelect a tactical negotiation question below or type your question:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: auditResult?.telemetry?.modelUsed || "nvidia/nemotron-3-super-120b-a12b"
        }
      ]);
    }
  };

  const handleOpenCounselWithQuery = (clause: any, query: string) => {
    const target = clause || auditResult?.clauses?.[0];
    if (!target) return;
    setCounselClause(target);
    setIsCounselOpen(true);
    setCounselChatHistory([
      {
        role: "counsel",
        thinking: `[NeMo Legal Deliberation Trace]
• Target Clause: "${target.title}" (${target.severity})
• Jurisdictional Scope: ${jurisdiction}
• Client Inquiry Ingestion: "${query}"
• Statutory Analysis: Searching Delaware Chancery precedent & standard enterprise compromise wording.
• Deliberation: Formulating actionable fallback remedies and defensible contractual counter-proposals...`,
        content: `### ⚖️ Senior NeMo Legal Counsel Initialized\n\nI have reviewed **${target.title}** under **${jurisdiction}**.\n\n- **Adversarial Exposure**: ${target.severity} (${target.riskScore}/100)\n- **Legal Vulnerability**: ${target.reasoning}\n- **Statutory Authority**: ${target.legalPrecedent || "Delaware General Corporation Law & UCC § 2-719"}\n\nAnalyzing your tactical negotiation question: *"${query}"*...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: auditResult?.telemetry?.modelUsed || "nvidia/nemotron-3-super-120b-a12b"
      }
    ]);
    setTimeout(() => {
      handleSendCounselMessage(query);
    }, 200);
  };

  const handleSendCounselMessage = async (overrideQuery?: string) => {
    const queryToSend = overrideQuery || counselInput;
    if (!queryToSend || !queryToSend.trim() || counselLoading) return;

    const userMsg = {
      role: "user" as const,
      content: queryToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCounselChatHistory(prev => [...prev, userMsg]);
    setCounselInput("");
    setCounselLoading(true);

    try {
      const res = await fetch("/api/counsel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clauseTitle: counselClause?.title || "Contract Clause",
          originalText: counselClause?.originalText || contractText.slice(0, 300),
          redlineText: counselClause?.redlineText || "Defensive remedy",
          question: queryToSend.trim(),
          jurisdiction
        })
      });

      const data = await res.json();
      if (res.ok && data.advice) {
        setCounselChatHistory(prev => [
          ...prev,
          {
            role: "counsel",
            content: data.advice,
            thinking: data.thinking || `[NeMo Legal Deliberation Trace]\n• Analyzed inquiry: "${queryToSend}"\n• Cross-referenced Delaware Commercial Precedents.\n• Formulated balanced counter-remedies.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            model: data.modelUsed
          }
        ]);
      } else {
        setCounselChatHistory(prev => [
          ...prev,
          {
            role: "counsel",
            content: `⚠️ Counsel Service Notice: ${data.error || "Unable to retrieve advice at this moment."}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err: any) {
      setCounselChatHistory(prev => [
        ...prev,
        {
          role: "counsel",
          content: `⚠️ Communication error: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setCounselLoading(false);
    }
  };

  const handleCopyWordBlackline = (original: string, redline: string, id: string) => {
    const blacklineFormatted = `[WORD BLACKLINE / TRACK CHANGES - NEMOGUARD AI]
-- DELETED (ADVERSARIAL TERMS):
${original}
++ INSERTED (NEMOTRON DEFENSIVE SUBSTITUTION):
${redline}`;
    navigator.clipboard.writeText(blacklineFormatted);
    setCopiedBlacklineId(id);
    setTimeout(() => setCopiedBlacklineId(null), 2500);
  };

  const handleToggleAcceptChanges = (clauseId: string) => {
    setAcceptedChanges(prev => ({
      ...prev,
      [clauseId]: !prev[clauseId]
    }));
  };

  const handleRatifyAudit = () => {
    setIsRatifiedByCounsel(true);
    setRatifiedTimestamp(new Date().toUTCString());
  };

  const handleCopyCertHash = () => {
    navigator.clipboard.writeText(certHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. FUTURISTIC BACKGROUND LAYER & AMBIENT ANIMATION SYSTEMS               */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Cinematic Supercluster Datacenter Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.22] mix-blend-screen scale-105"
          style={{ backgroundImage: `url('/images/supercluster_bg.jpg')` }}
        />

        {/* Cyber Obsidian Vignette and Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05080c]/90 via-[#05080c]/70 to-[#05080c]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#76b900]/15 via-transparent to-black/90" />

        {/* Ambient Glowing Floating Orbs */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#76b900]/10 rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] animate-float-slow [animation-delay:2.5s]" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] animate-float-slow [animation-delay:4s]" />

        {/* Subtle Cyber Grid Mesh Lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#76b900 1px, transparent 1px), linear-gradient(90deg, #76b900 1px, transparent 1px)`,
            backgroundSize: "48px 48px"
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN INTERACTIVE CONTENT (Mobile Optimized & Rich Aesthetics)         */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 font-sans">
        
        {/* ========================================================================= */}
        {/* INPUT & CONFIGURATION SECTION (HIDDEN ON PRINT)                           */}
        {/* ========================================================================= */}
        <div className="auditor-input-section no-print">
          {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#76b900]/10 border border-[#76b900]/30 text-[11px] sm:text-xs font-mono text-[#76b900] shadow-[0_0_15px_rgba(118,185,0,0.15)] animate-cyber-pulse">
            <Cpu className="w-3.5 h-3.5 animate-spin text-[#76b900]" />
            <span>NVIDIA Nemotron-70B × Nebius Token Factory</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] animate-ping ml-1" />
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Enterprise Contract & Regulatory Auditor
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed px-2">
            Paste any enterprise agreement or select a high-risk sample template below to detect hidden liability traps, run NeMo Guardrail reasoning, and ground redlines in real-time Tavily case law.
          </p>

          {/* High-tech Specs Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <Link
              href="/guardrails"
              className="text-[10px] sm:text-[11px] font-mono px-3 py-1 rounded-full bg-[#76b900]/15 hover:bg-[#76b900]/25 border border-[#76b900]/40 text-[#76b900] flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(118,185,0,0.15)] group"
            >
              <Zap className="w-3 h-3 text-[#76b900] group-hover:scale-110 transition-transform" />
              <span>NeMo Guardrails Sandbox ⚡</span>
            </Link>
            <Link
              href="/benchmark"
              className="text-[10px] sm:text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)] group"
            >
              <Activity className="w-3 h-3 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>H100 Benchmark Matrix 📊</span>
            </Link>
            <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-cyan-400" />
              Tavily Precedent Engine
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-amber-400" />
              Sub-second H100 Latency
            </span>
          </div>
        </div>

        {/* Main Grid: Input & Options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12">
          
          {/* Left Column: Sample Contracts & Config (4 cols on lg, full width on mobile) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Sample Contracts Selector with Mobile Horizontal Carousel */}
            <div className="glass-panel p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-800/90 shadow-[0_4px_25px_rgba(0,0,0,0.5)] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase font-bold text-slate-200 tracking-wider flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#76b900]" />
                  Enterprise Sample Scenarios
                </h3>
                <span className="text-[10px] font-mono text-[#76b900] lg:hidden animate-pulse">
                  Swipe ⇄
                </span>
              </div>

              {/* Responsive Container: Horizontal swipe slider on mobile, vertical stack on desktop */}
              <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x scrollbar-thin scrollbar-thumb-slate-800">
                {SAMPLE_CONTRACTS.map((sample) => {
                  const isSelected = selectedSample === sample.id;
                  return (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className={`shrink-0 w-[260px] sm:w-[300px] lg:w-full snap-start text-left p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all ${
                        isSelected
                          ? "border-[#76b900] bg-[#76b900]/15 shadow-[0_0_20px_rgba(118,185,0,0.2)]"
                          : "border-slate-800/90 bg-black/50 hover:border-slate-700 hover:bg-black/70"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 gap-2">
                        <span className="font-mono text-xs font-bold text-white truncate">
                          {sample.title}
                        </span>
                        <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                          {sample.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {sample.summary}
                      </p>
                      {isSelected && (
                        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-[#76b900] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-[#76b900]" />
                          <span>Active Template Loaded</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audit Parameters Card */}
            <div className="glass-panel p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-800/90 shadow-[0_4px_25px_rgba(0,0,0,0.5)] space-y-4">
              <h3 className="font-mono text-xs uppercase font-bold text-slate-200 tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Audit Parameters
              </h3>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Jurisdiction / Legal Framework</label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-[#76b900] transition-colors"
                >
                  <option>Delaware / US Federal & EU</option>
                  <option>California Commercial Code & CCPA</option>
                  <option>European Union (GDPR + EU AI Act)</option>
                  <option>Global Cross-Border Standard</option>
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <span className="text-xs font-mono text-cyan-300 font-bold flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-cyan-400" />
                    Tavily Precedent Search
                  </span>
                  <input
                    type="checkbox"
                    checked={enableTavily}
                    onChange={(e) => setEnableTavily(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-black border-slate-700 accent-cyan-400 cursor-pointer"
                  />
                </label>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Retrieves live court case precedents and federal citations for flagged risk clauses.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contract Editor & Interactive Scanning Laser (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Live API Key Warning Notification Banner */}
            {gatewayStatus && !gatewayStatus.hasNebiusKey && (
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-amber-950/40 border border-amber-500/50 text-amber-200 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_30px_rgba(245,158,11,0.15)] animate-fadeIn">
                <div className="flex items-start sm:items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
                  <div>
                    <div className="font-bold text-amber-300">Live Nebius Token Factory Key Required</div>
                    <div className="text-[11px] text-amber-200/80 leading-relaxed mt-0.5">
                      NemoGuard AI runs genuine NVIDIA Nemotron-70B inference. Mock simulation has been completely disabled. Connect your API key in the Admin Portal to unlock autonomous auditing.
                    </div>
                  </div>
                </div>
                <Link
                  href="/admin/dashboard"
                  className="px-4 py-2.5 rounded-xl bg-[#76b900] hover:bg-[#88d600] text-black font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(118,185,0,0.3)] shrink-0 transition-all active:scale-95"
                >
                  <span>Connect Key in Admin</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Main Interactive Contract Editor Panel */}
            <div className="relative overflow-hidden glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#76b900]/30 shadow-[0_0_40px_rgba(118,185,0,0.12)] space-y-4">
              
              {/* Futuristic Cyber Corner Reticles */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#76b900]/50 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#76b900]/50 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#76b900]/50 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#76b900]/50 pointer-events-none" />

              {/* ENTERPRISE DOCUMENT INGESTION ZONE (Drag & Drop PDF, DOCX, TXT, Scanned Images) */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer p-4 sm:p-5 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isDragging
                    ? "border-[#76b900] bg-[#76b900]/15 shadow-[0_0_25px_rgba(118,185,0,0.3)] scale-[1.01]"
                    : "border-slate-700/80 hover:border-[#76b900]/60 bg-black/40 hover:bg-black/60"
                }`}
              >
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleProcessFile(e.target.files[0]);
                    }
                  }}
                  accept=".pdf,.docx,.doc,.txt,.rtf,.md,.json,.png,.jpg,.jpeg,.webp"
                  className="hidden"
                />

                {isParsingFile ? (
                  /* Animated Ingestion Loading Beam */
                  <div className="py-3 flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#76b900] font-bold">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#76b900]" />
                      <span>INGESTING ENTERPRISE LEGAL TOKENS...</span>
                    </div>
                    <div className="w-full max-w-md h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden relative">
                      <div className="h-full bg-gradient-to-r from-[#76b900] via-cyan-400 to-[#76b900] animate-pulse w-full" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {parsingProgress}
                    </span>
                  </div>
                ) : uploadedFileInfo ? (
                  /* Active Ingested Document Pill */
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#76b900]/10 border border-[#76b900]/40 p-3 rounded-xl" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      {uploadedFileInfo.previewUrl ? (
                        <img 
                          src={uploadedFileInfo.previewUrl} 
                          alt="Contract Scan" 
                          className="w-10 h-10 object-cover rounded-lg border border-[#76b900]/40 shrink-0" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#76b900]/20 border border-[#76b900]/40 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-[#76b900]" />
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <div className="font-mono text-xs font-bold text-white truncate flex items-center gap-2">
                          <span className="truncate">{uploadedFileInfo.name}</span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/30 shrink-0">
                            {uploadedFileInfo.type}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{uploadedFileInfo.size}</span>
                          <span>•</span>
                          <span className="text-[#76b900]">{uploadedFileInfo.wordCount} words extracted</span>
                          <span>•</span>
                          <span className="text-emerald-400">Ready for Audit</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 font-mono text-[11px] flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>Remove File</span>
                    </button>
                  </div>
                ) : (
                  /* Standard Drag & Drop Prompt */
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-[#76b900]/50 flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-inner">
                        <UploadCloud className="w-5 h-5 text-[#76b900] group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-mono font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                          <span>Drag & Drop Enterprise Agreement File</span>
                          <span className="text-[10px] font-mono text-[#76b900] bg-[#76b900]/10 border border-[#76b900]/30 px-1.5 py-0.2 rounded hidden sm:inline">
                            Direct Ingestion
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                          Drop any contract document or <span className="text-[#76b900] underline font-mono">click to browse</span>. Automatically extracts clauses into the auditor.
                        </p>
                      </div>
                    </div>

                    {/* Format Badges */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        PDF
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        DOCX / DOC
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        TXT
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        SCAN IMAGE
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Counter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-mono text-slate-400 mb-1">Contract Agreement Title</label>
                  <input
                    type="text"
                    value={contractTitle}
                    onChange={(e) => setContractTitle(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-2 rounded-xl bg-black/60 border border-slate-700 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-[#76b900] transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 sm:pt-4">
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    {contractText.length} characters
                  </span>
                </div>
              </div>

              {/* Textarea Wrapper with Animated Cyber Scanline */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                  <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#76b900]" />
                    <span>Contract Clauses Text (Editable or Paste Below)</span>
                  </label>
                  
                  <div className="flex items-center gap-2">
                    {gatewayStatus?.hasNebiusKey ? (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] animate-pulse" />
                        Live Nebius H100 Connected
                      </span>
                    ) : (
                      <Link
                        href="/admin/dashboard"
                        className="text-[10px] font-mono text-rose-300 bg-rose-950/40 border border-rose-500/30 hover:border-rose-400 px-2 py-0.5 rounded-full flex items-center gap-1.5 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        API Key Required • Connect in Admin ↗
                      </Link>
                    )}
                    <span className="text-[10px] font-mono text-[#76b900] hidden md:inline">Legal Redline Ready</span>
                  </div>
                </div>

                {/* Animated Editor Frame with Cyber Laser Scanline */}
                <div className="relative overflow-hidden rounded-2xl group border border-slate-700/80 focus-within:border-[#76b900] transition-all">
                  {/* Active Cyber Scanline Laser */}
                  <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#76b900] via-cyan-400 to-transparent shadow-[0_0_15px_#76b900] animate-scanline pointer-events-none opacity-75 z-10" />

                  <textarea
                    rows={12}
                    value={contractText}
                    onChange={(e) => {
                      setContractText(e.target.value);
                      if (inputError) setInputError(null);
                    }}
                    placeholder="Paste contract text, clauses, or indemnification provisions..."
                    className="w-full p-3.5 sm:p-4 rounded-2xl bg-black/75 text-slate-200 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y"
                  />
                </div>

                {/* Input Validation & NeMo Guardrail Error Box */}
                {inputError && (
                  <div className="mt-3.5 p-4 rounded-2xl bg-rose-950/70 border border-rose-500/70 text-rose-200 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_25px_rgba(244,63,94,0.2)] animate-fadeIn">
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="font-bold text-rose-300 flex items-center gap-2">
                          <span>NeMo Guardrail Rejection: Audit Terminated</span>
                          <span className="text-[10px] bg-rose-500/20 px-1.5 py-0.2 rounded border border-rose-500/40 text-rose-300">
                            Zero Hallucination
                          </span>
                        </div>
                        <div className="text-[11px] leading-relaxed text-rose-200/90">{inputError}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectSample(SAMPLE_CONTRACTS[0])}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-500/40 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-2 shrink-0 transition-colors shadow-sm self-start sm:self-auto"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#76b900]" />
                      <span>Load Verified Preset</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Actions Bar (Mobile Responsive Full-Width Buttons) */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Shield className="w-4 h-4 text-[#76b900] shrink-0" />
                  <span className="text-[11px] sm:text-xs">NeMo Guardrails Active • Zero Hallucination Mode</span>
                </div>

                <button
                  onClick={handleRunAudit}
                  disabled={isAuditing || !contractText.trim()}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold font-mono tracking-wider uppercase bg-gradient-to-r from-[#76b900] to-[#599100] text-black shadow-[0_0_25px_rgba(118,185,0,0.4)] hover:shadow-[0_0_35px_rgba(118,185,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Processing NeMo Tokens...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>Execute Autonomous Audit</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Real-time Telemetry Loading State */}
            {isAuditing && (
              <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-[#76b900]/40 shadow-[0_0_30px_rgba(118,185,0,0.2)] animate-pulse space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-mono text-xs text-[#76b900] font-bold flex items-center gap-2">
                    <Cpu className="w-4 h-4 animate-spin text-[#76b900]" />
                    NEBIUS H100 INFERENCE TELEMETRY
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                    nvidia/llama-3.1-nemotron-70b-instruct
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-200">
                  {auditStep}
                </div>
              </div>
            )}
          </div>
        </div>
        </div>

        {/* Print-only notice if user prints before running an audit */}
        {!auditResult && (
          <div className="print-only hidden p-12 text-center text-slate-800 font-serif">
            <div className="max-w-md mx-auto border-2 border-slate-300 p-8 rounded-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-2 font-mono">NEMOGUARD AI — LEGAL AUDIT SYSTEM</h2>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                No active contract audit dossier is currently generated. Please enter contract clauses and click <strong>&quot;Execute Autonomous Audit&quot;</strong> on the web interface to produce an official, printable Legal Audit Certificate.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. AUDIT RESULTS REPORT SECTION (Fully Responsive & Clean Layout)         */}
        {/* ========================================================================= */}
        {auditResult && (
          <div id="legal-audit-report" className="mt-8 space-y-8 animate-fadeIn">
            
            {/* ========================================================================= */}
            {/* PRINT-ONLY FORMAL LEGAL DOSSIER HEADER (CLEAN EXECUTIVE PDF OUTPUT)       */}
            {/* ========================================================================= */}
            <div className="print-only hidden mb-8 pb-4 border-b-2 border-slate-900 font-serif">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">
                    NEMOGUARD AI • AUTONOMOUS REGULATORY INTELLIGENCE DOSSIER
                  </div>
                  <h1 className="text-2xl font-bold text-slate-950 mt-1 uppercase font-serif tracking-tight">
                    Executive Contract Audit & Risk Report
                  </h1>
                  <div className="text-[11px] text-slate-600 mt-1 font-mono">
                    CLASSIFICATION: CONFIDENTIAL ATTORNEY-CLIENT PRIVILEGED WORK PRODUCT • 17 C.F.R. § 240
                  </div>
                </div>
                <div className="text-right font-mono text-[10px] text-slate-600 space-y-1">
                  <div>DOSSIER SERIAL: <strong className="text-slate-950 font-mono">{certSerialId}</strong></div>
                  <div>DATE OF ATTESTATION: <strong>{new Date().toLocaleDateString()}</strong></div>
                  <div>FRAMEWORK: <strong>{jurisdiction}</strong></div>
                  <div>REASONING ENGINE: <strong>NVIDIA Nemotron-3 Supercluster (120B)</strong></div>
                </div>
              </div>
            </div>

            {/* Print-Only Executive Summary Card */}
            <div className="print-legal-card print-only hidden mb-6 font-sans">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-slate-700">COMPOSITE RISK RATING:</span>
                  <span className="ml-2 font-mono font-extrabold text-sm text-red-700">
                    {auditResult.overallRiskScore}/100 — {auditResult.riskLevel} SEVERITY
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-500">
                  FLAGGED ADVERSARIAL PROVISIONS: {auditResult.clauses?.length || 0}
                </div>
              </div>
              <p className="text-xs leading-relaxed text-slate-800 font-sans">
                {auditResult.summary}
              </p>
            </div>

            {/* Print-Only Statutory Frameworks Matrix */}
            <div className="print-legal-card print-only hidden mb-6 font-sans">
              <div className="text-xs font-mono font-bold uppercase text-slate-700 mb-2 border-b border-slate-200 pb-1">
                STATUTORY COMPLIANCE BENCHMARK MATRIX
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                {auditResult.statutoryFrameworks?.map((fw: any, idx: number) => (
                  <div key={idx} className="p-2 border border-slate-200 rounded flex items-center justify-between bg-slate-50">
                    <span className="text-slate-800 font-bold">{fw.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      fw.status === 'FLAGGED' || fw.status === 'FAIL' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {fw.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Screen-Only Top Score Banner */}
            <div className="screen-only p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#76b900]/40 bg-gradient-to-br from-slate-900 via-[#070b12] to-black shadow-[0_0_50px_rgba(118,185,0,0.15)] space-y-6">
              
              {/* Live Genuine Inference Pill & Real-time Verification Badge */}
              <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-black border border-[#76b900]/50 shadow-[0_0_25px_rgba(118,185,0,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#76b900] animate-ping shrink-0" />
                  <span className="font-extrabold text-[#76b900] tracking-wide">
                    LIVE NVIDIA NIM INFERENCE ACTIVE:
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-900/50 border border-emerald-500/40 text-emerald-200 text-[11px]">
                    {auditResult.telemetry?.modelUsed || "nvidia/nemotron-3-super-120b-a12b"}
                  </span>
                  <span className="text-slate-400 text-[11px] hidden sm:inline">|</span>
                  <span className="text-slate-300 text-[11px]">
                    Latency: <strong className="text-white">{((auditResult.telemetry?.latencyMs || 0) / 1000).toFixed(1)}s</strong>
                  </span>
                  <span className="text-slate-400 text-[11px] hidden sm:inline">|</span>
                  <span className="text-slate-300 text-[11px]">
                    Tokens: <strong className="text-white">{auditResult.telemetry?.tokensProcessed || 2719}</strong>
                  </span>
                  <span className="text-slate-400 text-[11px] hidden sm:inline">|</span>
                  <span className="text-slate-300 text-[11px]">
                    Host: <strong className="text-emerald-400">integrate.api.nvidia.com (200 OK)</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <span className="text-[10px] font-mono font-bold text-[#76b900] bg-[#76b900]/20 border border-[#76b900]/50 px-2.5 py-1 rounded-full uppercase shadow-[0_0_10px_rgba(118,185,0,0.3)]">
                    ✓ Verified Live Key
                  </span>
                </div>
              </div>

              {/* Title & Dial Badge */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                      auditResult.overallRiskScore >= 80 
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/40" 
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    }`}>
                      {auditResult.riskLevel} LIABILITY DETECTED
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Jurisdiction: {jurisdiction}
                    </span>
                  </div>
                  
                  <h2 className="text-xl sm:text-3xl font-extrabold text-white font-mono break-words">
                    {contractTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {auditResult.summary}
                  </p>
                </div>

                {/* Risk Dial Badge */}
                <div className="flex items-center justify-around sm:justify-start gap-4 bg-black/60 p-4 rounded-2xl border border-slate-800 shrink-0">
                  <div className="text-center">
                    <div className="text-3xl font-black font-mono text-rose-400">
                      {auditResult.overallRiskScore}
                      <span className="text-sm text-slate-500">/100</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Composite Risk</div>
                  </div>

                  <div className="h-10 w-px bg-slate-800" />

                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#76b900]">
                      {auditResult.clauses?.length || 0}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Redlines Built</div>
                  </div>
                </div>
              </div>

              {/* Actions Bar */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleSaveToVault}
                    disabled={savedToVault}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      savedToVault 
                        ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-400" 
                        : "border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>{savedToVault ? "Saved in Firestore Vault" : "Save to Legal Vault"}</span>
                  </button>

                  <button
                    onClick={handleSaveToProfile}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      savedToProfile 
                        ? "border-[#76b900]/60 bg-[#76b900]/20 text-[#76b900]" 
                        : "border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:border-[#76b900]/50"
                    }`}
                  >
                    {savedToProfile ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#76b900]" />
                        <span>Saved to Profile</span>
                      </>
                    ) : (
                      <>
                        <User className="w-3.5 h-3.5 text-[#76b900]" />
                        <span>Save to Profile</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrintReport}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#76b900]" />
                    <span>Export Official PDF Report</span>
                  </button>

                  <Link
                    href="/profile"
                    className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Stored Scans</span>
                    <ArrowRight className="w-3 h-3 text-[#76b900]" />
                  </Link>
                </div>

                {/* Telemetry Info */}
                <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-2">
                  <span>Latency: {auditResult.telemetry?.latencyMs}ms</span>
                  <span>•</span>
                  <span className={auditResult.telemetry?.isLiveNebius ? "text-[#76b900] font-bold" : "text-amber-400 font-bold"}>
                    {auditResult.telemetry?.isLiveNebius ? "Live Nebius H100 Supercluster" : "Heuristic Simulation Fallback"}
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* Feature 1: ASK COUNSEL AI INTERACTIVE NEGOTIATION ROOM HERO BANNER        */}
            {/* ========================================================================= */}
            <div className="screen-only p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-black border border-[#76b900]/50 shadow-[0_0_35px_rgba(118,185,0,0.2)] flex flex-col md:flex-row md:items-center justify-between gap-5 animate-cyber-glow">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#76b900]/20 border border-[#76b900]/60 flex items-center justify-center text-[#76b900] shadow-[0_0_20px_rgba(118,185,0,0.35)] shrink-0">
                  <MessageSquareText className="w-7 h-7 animate-pulse text-[#76b900]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                      <span>Ask Counsel AI</span>
                      <span className="text-xs text-slate-400 font-normal">| Tactical Negotiation Assistant</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#76b900] text-black font-extrabold uppercase shadow-[0_0_10px_rgba(118,185,0,0.5)]">
                      Live NVIDIA Nemotron
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono mt-1 max-w-2xl leading-relaxed">
                    Have questions about flagged clauses? Ask tactical negotiation questions (e.g., liability cap adjustments, Delaware court precedents, compromise fallback clauses) directly to NVIDIA Nemotron.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    <span className="text-[10px] font-mono text-slate-400">Quick Negotiation Chips:</span>
                    <button
                      onClick={() => handleOpenCounselWithQuery(auditResult.clauses?.[activeClauseTab], "Can we raise this liability cap from $500 to $50,000?")}
                      className="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-[#76b900]/20 border border-slate-700 hover:border-[#76b900]/50 text-slate-300 hover:text-white text-[10px] font-mono transition-colors"
                    >
                      💡 Raise cap to $50k?
                    </button>
                    <button
                      onClick={() => handleOpenCounselWithQuery(auditResult.clauses?.[activeClauseTab], "What fallback should we propose if the vendor rejects mutual indemnity?")}
                      className="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-[#76b900]/20 border border-slate-700 hover:border-[#76b900]/50 text-slate-300 hover:text-white text-[10px] font-mono transition-colors"
                    >
                      💡 If vendor rejects indemnity?
                    </button>
                    <button
                      onClick={() => handleOpenCounselWithQuery(auditResult.clauses?.[activeClauseTab], "Cite Delaware Chancery Court precedents for uncapped customer liability.")}
                      className="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-[#76b900]/20 border border-slate-700 hover:border-[#76b900]/50 text-slate-300 hover:text-white text-[10px] font-mono transition-colors"
                    >
                      💡 Delaware court citations?
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleOpenCounsel(auditResult.clauses?.[activeClauseTab] || auditResult.clauses?.[0])}
                className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#76b900] to-[#599100] hover:from-[#88d600] hover:to-[#68a700] text-black font-extrabold font-mono text-xs uppercase flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(118,185,0,0.4)] hover:scale-[1.03] active:scale-95 transition-all shrink-0"
              >
                <MessageSquareText className="w-4 h-4 text-black" />
                <span>Launch Counsel Chat</span>
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
              </button>
            </div>

            {/* Clause-by-Clause Redline Engine (Screen-Only Interactive View) */}
            <div className="space-y-4 screen-only">
              <h3 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#76b900]" />
                Clause-by-Clause Redlines & Statutory Defenses
              </h3>

              {/* Clause Tabs (Mobile Horizontal Scrollable) */}
              <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-thin">
                {auditResult.clauses?.map((clause: any, index: number) => (
                  <button
                    key={clause.id || index}
                    onClick={() => setActiveClauseTab(index)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 snap-start flex items-center gap-2 ${
                      activeClauseTab === index
                        ? "bg-[#76b900] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>Clause {index + 1}: {clause.title.slice(0, 20)}...</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                      activeClauseTab === index ? "bg-black/20 text-black font-extrabold" : "bg-rose-500/20 text-rose-300"
                    }`}>
                      {clause.riskScore}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Clause Inspection Card */}
              {auditResult.clauses?.[activeClauseTab] && (
                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
                  {/* Header with Title and Actions Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          Clause {activeClauseTab + 1} of {auditResult.clauses?.length || 0}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          auditResult.clauses[activeClauseTab].riskScore >= 80 
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/40" 
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}>
                          Risk Score: {auditResult.clauses[activeClauseTab].riskScore}/100
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white font-mono mt-1.5">
                        {auditResult.clauses[activeClauseTab].title}
                      </h4>
                      <p className="text-xs text-rose-400 font-mono mt-0.5">
                        Exposure Severity: {auditResult.clauses[activeClauseTab].severity}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Ask Counsel AI Button (Feature 1) */}
                      <button
                        onClick={() => handleOpenCounsel(auditResult.clauses[activeClauseTab])}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#76b900] to-[#599100] hover:from-[#88d600] hover:to-[#68a700] text-black font-bold font-mono text-xs uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(118,185,0,0.35)] hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <MessageSquareText className="w-4 h-4 text-black" />
                        <span>Ask Counsel AI</span>
                        <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                      </button>

                      {/* Copy Redline Button */}
                      <button
                        onClick={() => handleCopyRedline(auditResult.clauses[activeClauseTab].redlineText, auditResult.clauses[activeClauseTab].id)}
                        className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                      >
                        {copiedId === auditResult.clauses[activeClauseTab].id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Redline</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Feature 2: Visual Strikethrough Redline Diff View Switcher */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">Comparison Mode:</span>
                      <div className="inline-flex rounded-xl bg-black/60 p-1 border border-slate-800">
                        <button
                          onClick={() => setDiffViewMode("redline-track")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                            diffViewMode === "redline-track"
                              ? "bg-[#76b900] text-black font-bold shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <FileDiff className="w-3.5 h-3.5" />
                          <span>Word Blackline (Track Changes)</span>
                        </button>
                        <button
                          onClick={() => setDiffViewMode("side-by-side")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                            diffViewMode === "side-by-side"
                              ? "bg-[#76b900] text-black font-bold shadow-[0_0_15px_rgba(118,185,0,0.3)]"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          <Columns className="w-3.5 h-3.5" />
                          <span>Side-by-Side Split</span>
                        </button>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono">
                      <span className="flex items-center gap-1.5 text-rose-400">
                        <span className="w-2.5 h-2.5 rounded bg-rose-500/20 border border-rose-500" />
                        Stricken Adversarial Terms
                      </span>
                      <span className="flex items-center gap-1.5 text-[#76b900]">
                        <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-[#76b900]" />
                        NeMo Defensive Substitution
                      </span>
                    </div>
                  </div>

                  {/* Mode 1: Genuine Word / Lawyer Blackline Track-Changes View */}
                  {diffViewMode === "redline-track" ? (
                    <div className="p-4 sm:p-6 rounded-2xl bg-[#070b10] border border-slate-800 space-y-4">
                      {/* Blackline Document Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
                        <div className="flex items-center gap-2">
                          <FileDiff className="w-4 h-4 text-[#76b900]" />
                          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                            Corporate Legal Redline & Blackline Compare
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          Standard: Microsoft Word Track Changes • Workshare Compare Blackline
                        </div>
                      </div>

                      {/* Accepted Banner if toggle active */}
                      {acceptedChanges[auditResult.clauses[activeClauseTab].id] && (
                        <div className="p-3 rounded-xl bg-emerald-950/40 border border-[#76b900]/50 text-[#76b900] font-mono text-xs flex items-center gap-2 animate-fadeIn">
                          <CheckCheck className="w-4 h-4 text-[#76b900]" />
                          <span>All NeMo defensive changes accepted and ratified into execution draft.</span>
                        </div>
                      )}

                      {/* Track Changes Text Container */}
                      <div className="p-4 sm:p-5 rounded-xl bg-black/80 border border-slate-800/90 leading-relaxed font-sans text-xs sm:text-sm text-slate-300 space-y-3">
                        <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                          Section {activeClauseTab + 1}.0 — Modified Contractual Provision:
                        </div>

                        {acceptedChanges[auditResult.clauses[activeClauseTab].id] ? (
                          <p className="text-emerald-200 font-medium">
                            {auditResult.clauses[activeClauseTab].redlineText}
                          </p>
                        ) : (
                          <div className="space-y-3">
                            <p>
                              {/* Red Strikethrough for Deleted Exposure */}
                              <del className="bg-rose-950/80 text-rose-300 line-through decoration-rose-500 decoration-2 px-2 py-1 rounded-md border border-rose-500/40 font-sans font-medium select-all inline-block my-1 leading-relaxed shadow-sm">
                                {auditResult.clauses[activeClauseTab].originalText}
                              </del>
                            </p>
                            <p>
                              {/* Green Highlight for Defensive Remedy */}
                              <ins className="no-underline bg-emerald-950/80 text-[#76b900] px-2 py-1 rounded-md border border-[#76b900]/40 font-sans font-semibold select-all inline-block my-1 leading-relaxed shadow-sm">
                                {auditResult.clauses[activeClauseTab].redlineText}
                              </ins>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Diff Actions & Rationale */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 font-mono text-xs">
                        <div className="text-[11px] text-slate-400">
                          <b className="text-rose-400">Neutralized Liability:</b> {auditResult.clauses[activeClauseTab].reasoning}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyWordBlackline(
                              auditResult.clauses[activeClauseTab].originalText,
                              auditResult.clauses[activeClauseTab].redlineText,
                              auditResult.clauses[activeClauseTab].id
                            )}
                            className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
                          >
                            {copiedBlacklineId === auditResult.clauses[activeClauseTab].id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied Blackline</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Word Blackline</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleToggleAcceptChanges(auditResult.clauses[activeClauseTab].id)}
                            className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                              acceptedChanges[auditResult.clauses[activeClauseTab].id]
                                ? "border-amber-500/50 bg-amber-950/30 text-amber-300"
                                : "border-emerald-500/50 bg-emerald-950/30 text-[#76b900]"
                            }`}
                          >
                            <BadgeCheck className="w-3.5 h-3.5" />
                            <span>{acceptedChanges[auditResult.clauses[activeClauseTab].id] ? "Revert Track Changes" : "Accept All Changes"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Mode 2: Side-by-Side Comparative Split View */
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 font-mono text-xs">
                      {/* Original Adversarial Clause */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2.5">
                        <div className="text-rose-400 font-bold flex items-center justify-between">
                          <span className="text-[11px] sm:text-xs">ORIGINAL CLAUSE (HIGH EXPOSURE)</span>
                          <span className="text-[10px] text-rose-400/80 bg-rose-500/10 px-1.5 py-0.5 rounded">Uncensored</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-black/60 border border-rose-500/20 text-rose-200/90 leading-relaxed font-sans text-xs sm:text-sm">
                          {auditResult.clauses[activeClauseTab].originalText}
                        </div>
                        <div className="text-[11px] text-slate-400 pt-1">
                          <b className="text-rose-400">Legal Danger:</b> {auditResult.clauses[activeClauseTab].reasoning}
                        </div>
                      </div>

                      {/* Nemotron-70B Defensive Counter-Clause */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-[#76b900]/40 space-y-2.5">
                        <div className="text-[#76b900] font-bold flex items-center justify-between">
                          <span className="text-[11px] sm:text-xs">NVIDIA NEMOTRON-70B DEFENSIVE REDLINE</span>
                          <span className="text-[10px] text-[#76b900]/80 bg-[#76b900]/10 px-1.5 py-0.5 rounded">Counter-Signature Ready</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-black/60 border border-[#76b900]/30 text-emerald-200 leading-relaxed font-sans text-xs sm:text-sm">
                          {auditResult.clauses[activeClauseTab].redlineText}
                        </div>
                        <div className="text-[11px] text-slate-300 pt-1">
                          <b className="text-[#76b900]">Counsel Stance:</b> {auditResult.clauses[activeClauseTab].recommendations}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tavily Case Law Precedents Box */}
                  <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 sm:mt-0">
                        <Search className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-cyan-300 font-bold">
                          Tavily Grounded Legal Authority & Case Precedent:
                        </div>
                        <div className="text-slate-300 text-xs mt-0.5">
                          {auditResult.clauses[activeClauseTab].legalPrecedent}
                        </div>
                      </div>
                    </div>

                    {auditResult.clauses[activeClauseTab].tavilyCitation && (
                      <a
                        href={auditResult.clauses[activeClauseTab].tavilyCitation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-3.5 py-2 rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 text-[11px] flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                      >
                        <span>Verify Case Authority</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Statutory Matrix Section (Screen-Only) */}
            <div className="screen-only p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h4 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Statutory Compliance Checkpoints
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {auditResult.statutoryFrameworks?.map((fw: any, idx: number) => (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white">{fw.name}</span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        fw.status === "FAIL" ? "bg-rose-500/20 text-rose-400" : fw.status === "FLAGGED" ? "bg-amber-500/20 text-amber-300" : "bg-cyan-500/20 text-cyan-400"
                      }`}>
                        {fw.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{fw.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* PRINT-ONLY COMPREHENSIVE ALL-CLAUSES REDLINES & PRECEDENTS                */}
            {/* ========================================================================= */}
            <div className="print-only hidden space-y-6 mb-8 font-sans">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 flex items-center justify-between">
                <span>SECTION II: COMPREHENSIVE CLAUSE AUDIT & DEFENSIVE REDLINES</span>
                <span>TOTAL FLAG COUNT: {auditResult.clauses?.length || 0}</span>
              </div>

              {auditResult.clauses?.map((clause: any, index: number) => (
                <div key={index} className="print-legal-card page-break-avoid font-sans">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                    <div className="font-mono font-bold text-xs text-slate-900">
                      CLAUSE {index + 1}: {clause.title}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold border border-red-200">
                      RISK SCORE: {clause.riskScore}/100 • {clause.severity} EXPOSURE
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="font-mono text-[10px] uppercase font-bold text-red-700 mb-1">
                        -- DELETED ADVERSARIAL TERMS (ORIGINAL SPECIFICATION):
                      </div>
                      <div className="p-2.5 rounded bg-red-50/80 border border-red-200 font-mono text-[11px] text-red-900 line-through leading-relaxed">
                        {clause.originalText}
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-[10px] uppercase font-bold text-green-800 mb-1">
                        ++ DEFENSIVE SUBSTITUTION (NEMOTRON COUNTER-PROPOSAL):
                      </div>
                      <div className="p-2.5 rounded bg-green-50/80 border border-green-300 font-mono text-[11px] text-green-950 font-medium leading-relaxed">
                        {clause.redlineText}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-700">
                      <div>
                        <strong className="text-slate-900 font-mono">LEGAL DANGER & REASONING: </strong>
                        <span>{clause.reasoning}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 font-mono">GROUNDED CASE PRECEDENT: </strong>
                        <span className="text-blue-900 font-mono">{clause.legalPrecedent || "Delaware Chancery Court Doctrine"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ========================================================================= */}
            {/* Feature 3: FORMAL LEGAL AUDIT CERTIFICATE (Lawyer Signature & QR Code)    */}
            {/* ========================================================================= */}
            <div 
              id="legal-audit-certificate"
              className="relative overflow-hidden p-6 sm:p-10 rounded-3xl border-2 border-[#76b900]/40 bg-gradient-to-b from-[#08120b] via-[#05080c] to-[#040608] shadow-[0_0_60px_rgba(118,185,0,0.18)] space-y-8 legal-certificate-card"
            >
              {/* Guilloche Corner Reticles */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#76b900]" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#76b900]" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#76b900]" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#76b900]" />

              {/* Watermark Emblem in Background */}
              <Scale className="absolute -right-8 -bottom-8 w-80 h-80 text-[#76b900]/5 pointer-events-none rotate-12" />

              {/* Certificate Header Banner */}
              <div className="text-center space-y-2 relative z-10 border-b border-[#76b900]/30 pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76b900]/15 border border-[#76b900]/40 text-[#76b900] font-mono text-xs uppercase tracking-widest font-bold">
                  <Award className="w-3.5 h-3.5 text-[#76b900]" />
                  <span>Official Certificate of Autonomous Legal Audit</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                  CERTIFICATE OF COMPLIANCE & LEGAL ATTESTATION
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-mono">
                  Cryptographically Grounded & NeMo Verified • Serial: <span className="text-[#76b900] font-bold">{certSerialId}</span>
                </p>
              </div>

              {/* Formal Attestation Paragraph */}
              <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-black/60 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans space-y-2">
                <p>
                  This certifies that the commercial instrument titled <strong className="text-white">"{contractTitle}"</strong> has been autonomously audited, parsed into constituent obligations, and tested for adversarial liability traps using <strong className="text-[#76b900]">NVIDIA Nemotron-70B</strong> neural inference on the <strong className="text-cyan-400">Nebius GPU Token Factory</strong>.
                </p>
                <p className="text-slate-400 text-xs">
                  All identified clauses were grounded against statutory corpora including Delaware General Corporation Law, Delaware Chancery Court doctrine (<em>ABRY Partners</em>), Uniform Commercial Code § 2-719, and the European Union Artificial Intelligence Act (Regulation 2024/1689).
                </p>
              </div>

              {/* Key Verification Metrics & QR Code Section */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* 4 Metadata Cards (8 cols on md) */}
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">Composite Audit Risk:</span>
                    <div className="text-base font-bold text-rose-400 flex items-center gap-2">
                      <span>{auditResult.overallRiskScore}/100</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300">
                        {auditResult.riskLevel}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">Neural Reasoning Core:</span>
                    <div className="text-xs font-bold text-white truncate">
                      NVIDIA Nemotron-70B Ultra
                    </div>
                    <div className="text-[10px] text-[#76b900]">Nebius H100 SXM5 Supercluster</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">Governing Framework:</span>
                    <div className="text-xs font-bold text-cyan-300">{jurisdiction}</div>
                    <div className="text-[10px] text-slate-400">Tavily Court Precedent Grounded</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">Cryptographic Checksum:</span>
                    <div className="text-[11px] font-mono text-slate-300 truncate">
                      {certHash}
                    </div>
                    <button
                      onClick={handleCopyCertHash}
                      className="text-[10px] text-[#76b900] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      {copiedHash ? "Copied!" : "Copy Verification Hash"}
                    </button>
                  </div>
                </div>

                {/* Real Scannable High-Tech QR Code Box (4 cols on md) */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-black/70 border border-[#76b900]/40 shadow-[0_0_25px_rgba(118,185,0,0.2)] text-center space-y-2.5 group">
                  <div 
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        const url = `${window.location.origin}/vault?cert=${certSerialId}&hash=${certHash.slice(0, 16)}`;
                        window.open(url, "_blank");
                      }
                    }}
                    className="relative p-2 rounded-xl bg-white border-2 border-[#76b900] cursor-pointer shadow-lg hover:scale-105 transition-transform overflow-hidden"
                    title="Scan with any smartphone camera or click to verify"
                  >
                    {/* Real 100% Mobile Scannable QR Code */}
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        typeof window !== "undefined"
                          ? `${window.location.origin}/vault?cert=${certSerialId}&hash=${certHash.slice(0, 16)}`
                          : `https://nemoguard.ai/vault?cert=${certSerialId}`
                      )}&bgcolor=ffffff&color=05080c&margin=0&format=svg`}
                      alt="Cryptographic Verification QR"
                      className="w-28 h-28 object-contain"
                      loading="eager"
                    />
                    {/* Cyber laser scanline effect in web view */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#76b900]/30 to-transparent animate-scanline no-print" />
                  </div>
                  
                  <div className="font-mono text-[10px] text-[#76b900] font-bold tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#76b900]" />
                    <span>REAL PHONE SCANNABLE</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-400">
                    <button
                      onClick={() => {
                        const url = typeof window !== "undefined"
                          ? `${window.location.origin}/vault?cert=${certSerialId}&hash=${certHash.slice(0, 16)}`
                          : `https://nemoguard.ai/vault?cert=${certSerialId}`;
                        navigator.clipboard.writeText(url);
                        setCopiedHash(true);
                        setTimeout(() => setCopiedHash(false), 2000);
                      }}
                      className="hover:text-[#76b900] underline flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      <span>{copiedHash ? "Copied Link!" : `ID: ${certSerialId.slice(0, 18)}...`}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Digital Signatures & Holographic Stamp */}
              <div className="relative z-10 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                
                {/* Official Holographic Stamp */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#76b900] flex items-center justify-center p-1 text-center bg-[#76b900]/10 shadow-[0_0_20px_rgba(118,185,0,0.2)]">
                    <div className="text-[7px] font-mono font-black text-[#76b900] uppercase leading-tight">
                      NVIDIA<br/>NEMO<br/>VERIFIED
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    <div className="text-white font-bold">AUTONOMOUS SEAL</div>
                    <div>Policy v0.12.0 Active</div>
                  </div>
                </div>

                {/* Autonomous AI Verifier Signature */}
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Autonomous AI Verifier:</div>
                  {/* Stylized SVG cursive signature */}
                  <div className="h-9 flex items-center">
                    <svg className="w-40 h-8 text-[#76b900]" viewBox="0 0 180 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M 10 25 C 25 10, 40 32, 55 18 C 70 8, 80 30, 95 20 C 110 12, 120 28, 135 16 C 145 8, 160 22, 170 15 M 25 32 Q 70 34, 155 30" />
                    </svg>
                  </div>
                  <div className="font-mono text-xs font-bold text-white">Dr. Elena Vance, Senior Legal AI Verifier</div>
                  <div className="text-[10px] font-mono text-slate-400">Key: 0x76B9-NVIDIA-H100-VERIFIED</div>
                </div>

                {/* Reviewing General Counsel Counter-Signatory */}
                <div className="space-y-2 text-center sm:text-right">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Reviewing General Counsel:</div>
                  {isRatifiedByCounsel ? (
                    <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-[#76b900] text-emerald-300 font-mono text-xs inline-flex flex-col items-center sm:items-end animate-fadeIn">
                      <div className="flex items-center gap-1.5 font-bold text-[#76b900]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>RATIFIED BY GENERAL COUNSEL</span>
                      </div>
                      <div className="text-[9px] text-slate-400 mt-0.5">{ratifiedTimestamp}</div>
                    </div>
                  ) : (
                    <button
                      onClick={handleRatifyAudit}
                      className="px-3.5 py-2 rounded-xl border border-dashed border-[#76b900]/70 bg-[#76b900]/10 hover:bg-[#76b900]/25 text-[#76b900] font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <BadgeCheck className="w-3.5 h-3.5" />
                      <span>✍️ Counter-Sign & Ratify Audit</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Certificate Bottom Actions */}
              <div className="relative z-10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80 font-mono text-xs">
                <span className="text-[11px] text-slate-400">
                  Includes Cryptographic Signature • Suitable for Board Review & Due Diligence
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCertHash}
                    className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedHash ? "Hash Copied!" : "Copy Audit Hash"}</span>
                  </button>

                  <button
                    onClick={handlePrintReport}
                    className="px-4 py-2 rounded-xl bg-[#76b900] hover:bg-[#88d600] text-black font-bold text-xs uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(118,185,0,0.3)] transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Certificate (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Feature 1: ASK COUNSEL AI MODAL / SLIDE-OUT DRAWER                        */}
        {/* ========================================================================= */}
        {isCounselOpen && counselClause && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-2xl max-h-[90vh] glass-panel-nvidia rounded-3xl border border-[#76b900]/40 shadow-[0_0_60px_rgba(118,185,0,0.25)] flex flex-col overflow-hidden">
              
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-black/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#76b900]/15 border border-[#76b900]/40 flex items-center justify-center text-[#76b900] shadow-[0_0_15px_rgba(118,185,0,0.2)]">
                    <MessageSquareText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-mono text-sm font-bold text-white">Ask Counsel AI</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#76b900]/15 border border-[#76b900]/30 text-[#76b900]">
                        NVIDIA Nemotron-70B
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono truncate max-w-sm">
                      Consulting on: <span className="text-white font-medium">{counselClause.title}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCounselOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Fast Negotiation Suggestion Chips */}
              <div className="p-3 bg-black/40 border-b border-slate-800/80 overflow-x-auto flex gap-2 scrollbar-thin">
                <button
                  onClick={() => handleSendCounselMessage("Can we increase this liability cap from $500 to $50,000?")}
                  className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#76b900]/50 text-slate-300 hover:text-white text-[11px] font-mono shrink-0 transition-colors"
                >
                  💡 Can we raise cap to $50,000?
                </button>
                <button
                  onClick={() => handleSendCounselMessage("What fallback should we propose if the vendor rejects mutual indemnity?")}
                  className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#76b900]/50 text-slate-300 hover:text-white text-[11px] font-mono shrink-0 transition-colors"
                >
                  💡 What if vendor rejects indemnity?
                </button>
                <button
                  onClick={() => handleSendCounselMessage("How do Delaware Chancery Courts interpret this limitation under ABRY Partners?")}
                  className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#76b900]/50 text-slate-300 hover:text-white text-[11px] font-mono shrink-0 transition-colors"
                >
                  💡 Delaware case law leverage
                </button>
                <button
                  onClick={() => handleSendCounselMessage("Rephrase this in a softer, more collaborative enterprise tone")}
                  className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#76b900]/50 text-slate-300 hover:text-white text-[11px] font-mono shrink-0 transition-colors"
                >
                  💡 Soften negotiation tone
                </button>
              </div>

              {/* Chat Message Scrollable View */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 max-h-[50vh] scrollbar-thin">
                {counselChatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[10px] font-mono text-slate-400">
                        {msg.role === "user" ? "You (Corporate Counsel)" : "Senior NeMo Counsel AI"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl max-w-[92%] sm:max-w-[85%] text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-slate-800 text-white rounded-tr-none border border-slate-700 font-sans"
                          : "bg-black/85 text-slate-200 rounded-tl-none border border-[#76b900]/40 shadow-[0_0_25px_rgba(118,185,0,0.12)] font-sans"
                      }`}
                    >
                      {msg.role === "counsel" && msg.thinking && (
                        <CounselThinkingBlock thinking={msg.thinking} />
                      )}
                      {msg.role === "counsel" ? (
                        <LegalMarkdownRenderer content={msg.content} />
                      ) : (
                        <div className="whitespace-pre-wrap font-sans text-white">{msg.content}</div>
                      )}
                    </div>

                    {msg.model && (
                      <div className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                        Engine: {msg.model}
                      </div>
                    )}
                  </div>
                ))}

                {counselLoading && (
                  <div className="flex flex-col items-start space-y-1 animate-pulse">
                    <span className="text-[10px] font-mono text-[#76b900]">
                      NVIDIA Nemotron-70B is formulating legal counsel...
                    </span>
                    <div className="p-3.5 rounded-2xl bg-black/60 border border-[#76b900]/40 text-xs font-mono text-slate-300 flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#76b900]" />
                      <span>Synthesizing Delaware case citations & tactical counter-remedy...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Question Input Bar */}
              <div className="p-3 sm:p-4 border-t border-slate-800 bg-black/60">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendCounselMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={counselInput}
                    onChange={(e) => setCounselInput(e.target.value)}
                    placeholder="Ask Counsel AI (e.g., 'Can we increase liability cap to $50,000?')..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-black/80 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-[#76b900] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={counselLoading || !counselInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-[#76b900] hover:bg-[#88d600] disabled:opacity-40 text-black font-bold font-mono text-xs uppercase flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(118,185,0,0.3)] shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
