export interface LandingCMSData {
  // Hero Section
  heroBgImage: string;
  heroSideImage: string;
  heroShowSideImage: boolean;
  heroTrackBadge: string;
  announcementBadge: string;
  announcementActive: boolean;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;

  // Key Metric Counters
  stat1Value: string;
  stat1Label: string;
  stat1Sub: string;
  stat2Value: string;
  stat2Label: string;
  stat2Sub: string;
  stat3Value: string;
  stat3Label: string;
  stat3Sub: string;
  stat4Value: string;
  stat4Label: string;
  stat4Sub: string;

  // Innovation Matrix Section (Section 3)
  innovationHeading: string;
  innovationSubheading: string;

  // Pipeline (How It Works) Section (Section 4)
  pipelineHeading: string;
  pipelineSubheading: string;
  pipelineSteps: Array<{
    step: string;
    title: string;
    tag: string;
    description: string;
    metric: string;
    icon: string;
    techDetails?: string;
    actionLabel?: string;
    actionLink?: string;
  }>;

  // Features Section (Section 5)
  featuresHeading: string;
  featuresSubheading: string;
  featuresList: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
    badge: string;
    delawareCitation?: string;
    metricHighlight?: string;
    link?: string;
  }>;

  // Regulatory Standards (Section 6)
  regulationsHeading: string;
  regulationsSubheading?: string;
  regulationsSideImage?: string;
  regulationsShowSideImage?: boolean;
  regulationsList: Array<{
    code: string;
    name: string;
    jurisdiction: string;
    riskFocus: string;
    enforcementPenalty?: string;
  }>;

  // Section 7: Nebius H100 GPU Supercluster & Tavily Precedent Engine ($3K Bounty Showcase)
  infraHeading: string;
  infraSubheading: string;
  infraSideImage?: string;
  infraShowSideImage?: boolean;
  infraNodes: Array<{
    id: string;
    title: string;
    badge: string;
    description: string;
    metric: string;
    icon: string;
    link?: string;
  }>;

  // SaaS Token Economics (Legacy optional)
  pricingHeading?: string;
  pricingSubheading?: string;
  pricingTiers?: Array<{
    id: string;
    name: string;
    badge: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    popular: boolean;
  }>;

  // Final CTA Section (Section 8)
  ctaHeading?: string;
  ctaSubheading?: string;
  ctaButtonPrimary?: string;
  ctaButtonSecondary?: string;

  // Live System Status
  systemStatusText: string;
  systemModelName: string;
  systemClusterStatus: string;
  maintenanceMode: boolean;
  maintenanceNotice: string;

  // AI & Search Settings
  activeModel: string;
  tavilySearchEnabled: boolean;
  riskThresholdSensitivity: number; // 1-10

  // Branding & Logo Management
  websiteLogoUrl: string;
  websiteTitle: string;
  websiteTagline: string;
  faviconUrl: string;
  brandAccentColor: string;
}

export const DEFAULT_CMS_DATA: LandingCMSData = {
  // Branding
  websiteLogoUrl: "/logo.png",
  websiteTitle: "NEMOGUARD",
  websiteTagline: "NVIDIA Nemotron × Nebius",
  faviconUrl: "/icon.png",
  brandAccentColor: "#76b900",

  // Hero Section
  heroBgImage: "/hero-cyber-bg.jpg",
  heroSideImage: "/hero-shield-emblem.png",
  heroShowSideImage: true,
  heroTrackBadge: "NEBIUS × NVIDIA GLOBAL AI HACKATHON • BEST APPS & AGENTS TRACK",
  announcementBadge: "⚡ POWERED BY NVIDIA NEMOTRON-70B ON NEBIUS TOKEN FACTORY",
  announcementActive: true,
  heroTitlePrefix: "Autonomous",
  heroTitleHighlight: "Legal & Regulatory",
  heroTitleSuffix: "Risk Intelligence Engine",
  heroSubtitle: "Empower enterprise legal teams with millisecond-speed contract redlining, zero-hallucination NeMo reasoning, and real-time Tavily case law precedent retrieval.",
  primaryCtaText: "Launch Contract Auditor",
  secondaryCtaText: "Enter AI War Room ⚔️",

  stat1Value: "14,820+",
  stat1Label: "Enterprise Clauses Scanned",
  stat1Sub: "Real-Time OCR & Ingestion",
  stat2Value: "$84.5M+",
  stat2Label: "Liability Exposure Mitigated",
  stat2Sub: "Bilateral Delaware Caps",
  stat3Value: "99.82%",
  stat3Label: "Statutory Citation Accuracy",
  stat3Sub: "Tavily Legal Grounding",
  stat4Value: "380ms",
  stat4Label: "Avg Nebius Token Latency",
  stat4Sub: "Nebius H100 SXM5",

  innovationHeading: "Interactive 4-Pillar Innovation Matrix",
  innovationSubheading: "Explore the proprietary autonomous legal intelligence architectures engineered for the Nebius × NVIDIA Global AI Hackathon.",

  // Section 4: Pipeline (How It Works)
  pipelineHeading: "Autonomous 4-Stage Legal Agentic Pipeline",
  pipelineSubheading: "From raw unstructured contract upload to validated bilateral accord in under 3 seconds on Nebius H100 GPU infrastructure.",
  pipelineSteps: [
    {
      step: "01",
      title: "AST Ingestion & OCR",
      tag: "Sub-Second Ingestion",
      description: "Decompiles raw PDF, DOCX, or scanned legal contracts into structured clause trees with jurisdictional Delaware metadata tagging.",
      metric: "< 120ms Parsing",
      icon: "FileText",
      techDetails: "PyMuPDF + Tesseract-OCR AST syntax tree generator extracts clause nodes, identifying § 8.1 indemnities and § 12.4 governing law tags with 0% dropped paragraphs.",
      actionLabel: "Launch Contract Auditor",
      actionLink: "/auditor"
    },
    {
      step: "02",
      title: "NeMo Colang 2.0 Guardrails",
      tag: "Network Edge Defense",
      description: "Interceptors halt prompt injections, hallucinated legal statutes, and adversarial token tampering at the network edge with 0ms wasted GPU compute.",
      metric: "12ms Edge Check",
      icon: "ShieldAlert",
      techDetails: "Colang 2.0 flow runtime intercepts adversarial overrides, hallucinated case citations, and PII leaks. Rejection returns HTTP 422 before touching the LLM cluster.",
      actionLabel: "Test Guardrails Sandbox",
      actionLink: "/guardrails"
    },
    {
      step: "03",
      title: "Nebius H100 Nemotron Inference",
      tag: "Deep Judicial Reasoning",
      description: "NVIDIA Nemotron-70B analyzes uncapped liabilities, one-sided indemnity traps, and assigns precision risk equilibrium scores.",
      metric: "148.6 tokens/sec",
      icon: "Cpu",
      techDetails: "Hosted on Nebius Token Factory (8x H100 SXM5 80GB) with FP8 TensorRT-LLM acceleration. Achieves sub-220ms TTFT and deep legal reasoning.",
      actionLabel: "Run H100 Benchmark",
      actionLink: "/benchmark"
    },
    {
      step: "04",
      title: "Tavily Precedents & Redlines",
      tag: "Autonomous Resolution",
      description: "Retrieves live Delaware Chancery precedents via Tavily and generates lawyer-grade bilateral redlines ready for executive signature.",
      metric: "100% Precedent Validated",
      icon: "Scale",
      techDetails: "Autonomous Tavily API queries retrieve primary case precedents (ABRY Partners, Akorn v. Fresenius), auto-generating Delaware-compliant counter-redlines.",
      actionLabel: "Inspect Precedent Vault",
      actionLink: "/vault"
    }
  ],

  // Section 5: Features
  featuresHeading: "Why Enterprise Counsel Trust NemoGuard AI",
  featuresSubheading: "Engineered specifically on NVIDIA Nemotron-70B supercluster for bulletproof legal reasoning and defensible contract redlines.",
  featuresList: [
    {
      id: "f1",
      icon: "Cpu",
      title: "NVIDIA Nemotron 70B Reasoning",
      description: "Fine-tuned with NVIDIA NeMo Guardrails to eliminate synthetic hallucinations and identify hidden indemnity traps.",
      badge: "NeMo Engine",
      delawareCitation: "Delaware Code Title 8 § 145",
      metricHighlight: "0.00% Hallucination Rate",
      link: "/auditor"
    },
    {
      id: "f2",
      icon: "Search",
      title: "Real-Time Tavily Legal Precedents",
      description: "Autonomous live retrieval of Delaware Supreme Court rulings, SEC 10-K guidelines, and FTC regulations.",
      badge: "Tavily $3K Bounty",
      delawareCitation: "ABRY Partners v. F&W Acquisition",
      metricHighlight: "100% Primary Law Grounded",
      link: "/vault"
    },
    {
      id: "f3",
      icon: "FileCheck",
      title: "Clause-by-Clause Redline Diff",
      description: "Automated, lawyer-grade counter-proposals and defensive language adjustments ready for signature.",
      badge: "Instant Diff",
      delawareCitation: "UCC § 2-719 Consequential Caps",
      metricHighlight: "94% ➔ 12% Risk Exposure Drop",
      link: "/auditor"
    },
    {
      id: "f4",
      icon: "ShieldAlert",
      title: "Multi-Jurisdiction Compliance",
      description: "Deep audit across GDPR Article 28, EU AI Act, California CCPA, and standard US Corporate Law.",
      badge: "Global Ready",
      delawareCitation: "FTC 16 CFR § 910 Restrictive Covenants",
      metricHighlight: "Sub-15ms Edge Verification",
      link: "/guardrails"
    },
    {
      id: "f5",
      icon: "Swords",
      title: "Autonomous War Room Deliberation",
      description: "3-agent adversarial legal debate formulating ratified bilateral accords and liability exposure mitigation.",
      badge: "Multi-Agent",
      delawareCitation: "Akorn v. Fresenius Material Breach",
      metricHighlight: "3-Round Equilibrium Consensus",
      link: "/war-room"
    }
  ],

  // Section 6: Regulations
  regulationsHeading: "Global Regulatory Compliance & Statutory Matrix",
  regulationsSubheading: "Tested against 8 primary judicial jurisdictions and strict enterprise statutory mandates with zero synthetic hallucinations.",
  regulationsSideImage: "/compliance-shield.png",
  regulationsShowSideImage: true,
  regulationsList: [
    {
      code: "DELAWARE CHANCERY",
      name: "Corporate Fiduciary & Indemnity",
      jurisdiction: "United States (DE)",
      riskFocus: "Director Indemnification & Merger Defense (DGCL § 145)",
      enforcementPenalty: "Personal Director Liability / Deal Injunction"
    },
    {
      code: "FTC 16 CFR 910",
      name: "Non-Compete Ban & Restrictive Covenants",
      jurisdiction: "US Federal Trade Commission",
      riskFocus: "Unlawful Worker Restraints & Severance Covenants",
      enforcementPenalty: "Statutory Invalidation & Civil Penalties"
    },
    {
      code: "GDPR ART. 28 / 33",
      name: "Data Processing Agreement Mandates",
      jurisdiction: "European Union / UK",
      riskFocus: "Sub-Processor Liability & 72h Breach Notification",
      enforcementPenalty: "Up to €20M or 4% Global Annual Turnover"
    },
    {
      code: "EU AI ACT ART. 53",
      name: "High-Risk AI Systems Compliance",
      jurisdiction: "European Union (2024/1689)",
      riskFocus: "Model Transparency, Training Data Rights & Bias Audits",
      enforcementPenalty: "Up to €35M or 7% Global Turnover"
    },
    {
      code: "SEC EDGAR / REG D",
      name: "Securities & Material Disclosure",
      jurisdiction: "US Federal (SEC)",
      riskFocus: "Material Definitive Agreement Disclosures (Item 1.01)",
      enforcementPenalty: "SEC Enforcement Action & Shareholder Class Suits"
    },
    {
      code: "UCC § 2-719",
      name: "Enforceability of Consequential Caps",
      jurisdiction: "Uniform Commercial Code",
      riskFocus: "Failure of Essential Purpose in Liability Exclusions",
      enforcementPenalty: "Full Stripping of Liability Limitation Caps"
    },
    {
      code: "CALIFORNIA 16600",
      name: "Void Employment & IP Non-Competes",
      jurisdiction: "State of California (BPC § 16600)",
      riskFocus: "Anti-Employee Restraints & Overbroad IP Assignments",
      enforcementPenalty: "Treble Damages & Mandatory Attorneys' Fees"
    },
    {
      code: "HIPAA BAA § 164",
      name: "Protected Health Information Safeguards",
      jurisdiction: "US HHS OCR",
      riskFocus: "Business Associate Agreement Breach Indemnity Ceilings",
      enforcementPenalty: "Up to $1.9M per Violation Tier"
    }
  ],

  // Section 7: Nebius H100 GPU Supercluster & Tavily Precedent Engine ($3K Bounty Showcase)
  infraHeading: "Nebius H100 Supercluster & Tavily Precedent Engine",
  infraSubheading: "Engineered on Nebius Token Factory with 8x NVIDIA H100 SXM5 GPUs and Tavily AI Search for millisecond-speed primary case precedent grounding.",
  infraSideImage: "/nebius-supercluster.png",
  infraShowSideImage: true,
  infraNodes: [
    {
      id: "node-h100",
      title: "Nebius Token Factory (H100 SXM5)",
      badge: "8x 80GB HBM3",
      description: "Dedicated FP8 TensorRT-LLM acceleration delivering 148.6 tokens/sec throughput and sub-220ms time-to-first-token turnaround.",
      metric: "148.6 tok/s • 215ms TTFT",
      icon: "Cpu",
      link: "/benchmark"
    },
    {
      id: "node-tavily",
      title: "Tavily Real-Time Precedent Search",
      badge: "Official $3K Bounty",
      description: "Autonomous retrieval pipeline querying Delaware Chancery rulings, SEC 10-K guidelines, and FTC compliance mandates in under 180ms.",
      metric: "< 180ms Precedent Fetch",
      icon: "Search",
      link: "/vault"
    },
    {
      id: "node-colang",
      title: "NeMo Colang 2.0 Guardrails Perimeter",
      badge: "Zero-Compute Edge Gate",
      description: "Sub-15ms network edge interception stopping adversarial jailbreaks, hallucinated statutes, and prompt injections with $0.00 GPU waste.",
      metric: "12ms Edge Rejection",
      icon: "ShieldAlert",
      link: "/guardrails"
    },
    {
      id: "node-ast",
      title: "PyMuPDF & Tesseract AST Ingestion",
      badge: "Sub-Second Ingestion",
      description: "Decompiles 100+ page contracts into structured clause trees, tagging governing laws and liability ceilings with 0% dropped paragraphs.",
      metric: "< 120ms AST Generation",
      icon: "FileCheck",
      link: "/auditor"
    }
  ],

  // Section 7: SaaS Token Economics & Pricing
  pricingHeading: "Enterprise Token Economics & Transparent Pricing",
  pricingSubheading: "Deploy on Nebius Token Factory with an 88% compute cost reduction compared to proprietary frontier LLMs. Zero lock-in.",
  pricingTiers: [
    {
      id: "tier-community",
      name: "Hackathon Community",
      badge: "Free Instant Access",
      price: "$0",
      period: "forever",
      description: "Full access for Hackathon judges, solo legal researchers, and developers evaluating NVIDIA Nemotron-70B.",
      features: [
        "10 Real-Time Contract Audits / Day",
        "NVIDIA Nemotron-70B on Nebius H100",
        "NeMo Colang 2.0 Guardrails Sandbox",
        "Delaware Redline Diffs & Precedents",
        "Public Precedent Vault Browsing"
      ],
      ctaText: "Start Instant Demo",
      ctaLink: "/auditor",
      popular: false
    },
    {
      id: "tier-counsel",
      name: "Enterprise Counsel",
      badge: "Most Popular",
      price: "$499",
      period: "/ month",
      description: "Dedicated to in-house corporate legal teams, General Counsel offices, and boutique commercial law firms.",
      features: [
        "Unlimited Autonomous Contract Audits",
        "Autonomous AI War Room (3-Agent Deliberations)",
        "Audio Oral Arguments Synthesizer 🎙️",
        "Live Tavily Case Precedent Grounding",
        "Custom Colang 2.0 Policy Upload",
        "Cryptographic Defense Receipts & PDF Export",
        "Priority Nebius Token Factory Queue"
      ],
      ctaText: "Launch Enterprise Auditor",
      ctaLink: "/auditor",
      popular: true
    },
    {
      id: "tier-supercluster",
      name: "Sovereign Supercluster",
      badge: "Custom Cluster",
      price: "Custom",
      period: "/ enterprise",
      description: "For Fortune 500 legal departments requiring dedicated private Nebius H100 GPU clusters and zero-knowledge data isolation.",
      features: [
        "Dedicated Private Nebius GPU VPC",
        "Air-Gapped Local Model Deployment",
        "Custom Fine-Tuned Nemotron Weights",
        "Direct Internal Legal Management ERP Sync",
        "99.99% Sub-100ms SLA Guarantee",
        "Dedicated NVIDIA Solutions Architect"
      ],
      ctaText: "Deploy Dedicated Cluster",
      ctaLink: "/admin/dashboard",
      popular: false
    }
  ],

  // Section 8: Final High-Impact CTA
  ctaHeading: "Ready to Automate Your Enterprise Contract Defense?",
  ctaSubheading: "Join forward-thinking enterprise legal teams defending millions in contractual liability with NVIDIA Nemotron-70B and Nebius AI Cloud.",
  ctaButtonPrimary: "Launch Contract Auditor",
  ctaButtonSecondary: "Explore AI War Room 🎙️",

  systemStatusText: "NEBIUS CLUSTER: OPERATIONAL",
  systemModelName: "nvidia/llama-3.1-nemotron-70b-instruct",
  systemClusterStatus: "Optimal (Latency < 450ms)",
  maintenanceMode: false,
  maintenanceNotice: "System upgrade scheduled for 02:00 UTC. Contract auditor remains fully accessible.",

  activeModel: "nvidia/llama-3.1-nemotron-70b-instruct",
  tavilySearchEnabled: true,
  riskThresholdSensitivity: 8,
};
