export interface LandingCMSData {
  // Hero Section
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
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;

  // Features Section
  featuresHeading: string;
  featuresSubheading: string;
  featuresList: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
    badge: string;
  }>;

  // Regulatory Standards
  regulationsHeading: string;
  regulationsList: Array<{
    code: string;
    name: string;
    jurisdiction: string;
    riskFocus: string;
  }>;

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
}

export const DEFAULT_CMS_DATA: LandingCMSData = {
  announcementBadge: "⚡ POWERED BY NVIDIA NEMOTRON-70B ON NEBIUS TOKEN FACTORY",
  announcementActive: true,
  heroTitlePrefix: "Autonomous",
  heroTitleHighlight: "Legal & Regulatory",
  heroTitleSuffix: "Risk Intelligence Engine",
  heroSubtitle: "Empower enterprise legal teams with millisecond-speed contract redlining, zero-hallucination NeMo reasoning, and real-time Tavily case law precedent retrieval.",
  primaryCtaText: "Launch Contract Auditor",
  secondaryCtaText: "Explore Precedent Vault",

  stat1Value: "14,820+",
  stat1Label: "Enterprise Clauses Scanned",
  stat2Value: "$84.5M+",
  stat2Label: "Liability Exposure Mitigated",
  stat3Value: "99.82%",
  stat3Label: "Statutory Citation Accuracy",
  stat4Value: "380ms",
  stat4Label: "Avg Nebius Token Latency",

  featuresHeading: "Why Enterprise Counsel Trust NemoGuard AI",
  featuresSubheading: "Engineered specifically on NVIDIA Nemotron-70B supercluster for bulletproof legal reasoning and defensible contract redlines.",
  featuresList: [
    {
      id: "f1",
      icon: "Cpu",
      title: "NVIDIA Nemotron 70B Reasoning",
      description: "Fine-tuned with NVIDIA NeMo Guardrails to eliminate synthetic hallucinations and identify hidden indemnity traps.",
      badge: "NeMo Engine"
    },
    {
      id: "f2",
      icon: "Search",
      title: "Real-Time Tavily Legal Precedents",
      description: "Autonomous live retrieval of Delaware Supreme Court rulings, SEC 10-K guidelines, and FTC regulations.",
      badge: "Tavily $3K Bounty"
    },
    {
      id: "f3",
      icon: "FileCheck",
      title: "Clause-by-Clause Redline Diff",
      description: "Automated, lawyer-grade counter-proposals and defensive language adjustments ready for signature.",
      badge: "Instant Diff"
    },
    {
      id: "f4",
      icon: "ShieldAlert",
      title: "Multi-Jurisdiction Compliance",
      description: "Deep audit across GDPR Article 28, EU AI Act, California CCPA, and standard US Corporate Law.",
      badge: "Global Ready"
    }
  ],

  regulationsHeading: "Defensible Across Strict International Frameworks",
  regulationsList: [
    {
      code: "EU AI ACT",
      name: "High-Risk AI Systems Compliance",
      jurisdiction: "European Union",
      riskFocus: "Model Transparency & Algorithmic Liability"
    },
    {
      code: "DELAWARE CHANCERY",
      name: "Corporate Fiduciary & Indemnity",
      jurisdiction: "United States (DE)",
      riskFocus: "Director Indemnification & Merger Defense"
    },
    {
      code: "GDPR ART. 28",
      name: "Data Processing Agreement Mandates",
      jurisdiction: "Global Data Transfer",
      riskFocus: "Sub-processor Liability & Breach Windows"
    },
    {
      code: "SEC REG D / 10-K",
      name: "Securities & Material Disclosure",
      jurisdiction: "US Federal",
      riskFocus: "Material Contract Disclosures & Representations"
    }
  ],

  systemStatusText: "NEBIUS CLUSTER: OPERATIONAL",
  systemModelName: "nvidia/llama-3.1-nemotron-70b-instruct",
  systemClusterStatus: "Optimal (Latency < 450ms)",
  maintenanceMode: false,
  maintenanceNotice: "System upgrade scheduled for 02:00 UTC. Contract auditor remains fully accessible.",

  activeModel: "nvidia/llama-3.1-nemotron-70b-instruct",
  tavilySearchEnabled: true,
  riskThresholdSensitivity: 8,
};
