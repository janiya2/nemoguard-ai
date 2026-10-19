export interface SampleContract {
  id: string;
  title: string;
  category: string;
  tag: string;
  summary: string;
  content: string;
}

export const SAMPLE_CONTRACTS: SampleContract[] = [
  {
    id: "saas-msa",
    title: "Enterprise SaaS Master Services Agreement",
    category: "Cloud Services & SLA",
    tag: "High Risk Indemnity",
    summary: "A one-sided SaaS vendor contract with unlimited customer liability, no service credit caps, and aggressive termination clauses.",
    content: `MASTER SERVICES AGREEMENT (ENTERPRISE EDITION)
BETWEEN: CloudApex Corp ("Provider") AND Enterprise Client LLC ("Customer")

SECTION 8: LIMITATION OF LIABILITY & INDEMNIFICATION
8.1 CUSTOMER INDEMNIFICATION OBLIGATIONS. Customer shall defend, indemnify, and hold harmless Provider, its affiliates, directors, and contractors from and against any and all claims, damages, liabilities, losses, and expenses (including attorney's fees) arising out of or related to Customer's use of the CloudApex AI platform, any data ingested into the system, or any third-party intellectual property infringement claims.

8.2 UNLIMITED LIABILITY FOR CUSTOMER. Notwithstanding any provision herein to the contrary, Customer's liability under Section 8.1 shall be UNLIMITED, and no statutory cap or aggregate fee ceiling shall apply.

8.3 PROVIDER LIABILITY CAP. Provider's total aggregate liability arising out of or related to this Agreement under any legal theory (whether contract, tort, gross negligence, or strict liability) shall be strictly capped at the fees paid by Customer to Provider in the preceding thirty (30) days, not to exceed $500.00 USD in aggregate.

SECTION 11: DATA OWNERSHIP & DERIVATIVE AI TRAINING
11.4 Provider retains an irrevocable, perpetual, worldwide, royalty-free license to use Customer Confidential Data, uploaded documents, and employee telemetry to train, fine-tune, benchmark, and deploy Provider's commercial artificial intelligence and foundational language models without restriction, attribution, or compensation.`
  },
  {
    id: "ai-dpa",
    title: "AI Model Vendor Data Processing Addendum (DPA)",
    category: "Data Privacy & EU AI Act",
    tag: "Regulatory Violation",
    summary: "Cross-border data processing contract violating GDPR Article 28 breach reporting timelines and EU AI Act transparency rules.",
    content: `DATA PROCESSING ADDENDUM (EU & CALIFORNIA COMPLIANCE)
PARTIES: NeuralCore Systems SAS ("Data Processor") AND GlobalRetail AG ("Data Controller")

CLAUSE 4: SECURITY INCIDENTS & BREACH NOTIFICATION
4.2 NOTIFICATION TIMELINE. In the event of a confirmed Personal Data Breach impacting Controller Personal Data within Processor's GPU computing cluster, Processor shall inform Controller in writing without undue delay, and in any event within thirty (30) business days following completion of Processor's internal forensic investigation.

4.5 AUDIT RIGHTS WAIVER. Controller agrees that due to confidential proprietary GPU infrastructure, physical or remote independent audits by Controller or regulatory authorities are strictly prohibited. Processor's annual self-attested SOC2 Type 1 summary shall serve as sole and conclusive proof of compliance.

CLAUSE 7: CROSS-BORDER TRANSFERS & AUTOMATED DECISIONING
7.1 Processor reserves the absolute right to route customer training prompts and proprietary enterprise inputs through cloud servers located in any sovereign jurisdiction globally without providing prior written notice or requiring Standard Contractual Clauses (SCCs).`
  },
  {
    id: "ma-indemnity",
    title: "M&A Stock Purchase Indemnification & Survival Clause",
    category: "Corporate M&A",
    tag: "Delaware Law Risk",
    summary: "Aggressive merger acquisition survival period with non-reliance disclaimers that conflict with Delaware Chancery Court fraud precedent (ABRY Partners).",
    content: `AGREEMENT AND PLAN OF MERGER
BY AND AMONG: Falcon Holdings Corp ("Buyer") AND Apex BioTech Inc ("Seller")

SECTION 9: SURVIVAL OF REPRESENTATIONS & EXCLUSIVE REMEDY
9.1 SURVIVAL. The representations and warranties of the Seller contained in Article III of this Agreement shall survive the Closing for a period of six (6) months, after which all claims shall be irrevocably barred, waived, and released forever.

9.4 NON-RELIANCE & FRAUD WAIVER. Buyer expressly agrees that it is acquiring the Company on an "AS-IS, WHERE-IS" basis. Buyer disclaims reliance upon any representations or warranties not explicitly set forth herein, including any extra-contractual statements, financial projections, or intentional omissions made by Seller or its officers.

9.5 EXCLUSION OF FRAUD CLAIMS. To the fullest extent permitted by applicable law, Buyer unconditionally waives any right to assert any claim in tort, fraud, intentional misrepresentation, or fraudulent inducement arising from or relating to the negotiation, execution, or performance of this Agreement.`
  },
  {
    id: "nda-noncompete",
    title: "Executive Non-Disclosure & Restrictive Covenant",
    category: "Employment & Trade Secret",
    tag: "FTC Non-Compete Ban",
    summary: "Overly restrictive 3-year global non-compete covenant unenforceable under FTC 2024 regulations and California Labor Code 16600.",
    content: `CONFIDENTIALITY AND INTELLECTUAL PROPERTY COVENANT
PARTIES: QuantumAI Technologies Inc ("Company") AND Executive Employee ("Recipient")

SECTION 4: POST-EMPLOYMENT RESTRICTIVE COVENANTS
4.1 WORLDWIDE NON-COMPETE. For a period of thirty-six (36) months following the termination of employment for any reason, Recipient shall not, directly or indirectly, anywhere in the world, engage in, perform services for, consult with, invest in, or otherwise participate in any enterprise, business, startup, or open-source software project that develops, trains, or commercializes machine learning models, neural networks, or legal technology software.

4.3 INJUNCTIVE RELIEF & LIQUIDATED DAMAGES. Recipient acknowledges that a breach of Section 4.1 shall result in irreparable harm, and agrees to pay liquidated damages to the Company in the fixed amount of $500,000 USD per violation, without requirement of proof of actual financial damage.`
  }
];
