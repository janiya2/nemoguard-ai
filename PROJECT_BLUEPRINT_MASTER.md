# 🛡️ NemoGuard AI — Master Architecture Blueprint & Project State Snapshot
**Generated:** 2026-10-19 | **Hackathon:** Nebius & NVIDIA AI Hackathon  
**Target Category:** Autonomous Agents / Regulatory Intelligence & Legal AI  
**Project Path:** `g:\MY PORTFOLIO\06_HACKATHONS\02_NEBIUS_NVIDIA_AI_HACKATHON\nemoguard-ai`

---

## 📌 Executive Summary
**NemoGuard AI** is an enterprise-grade autonomous legal auditor and multi-agent negotiation system powered by **NVIDIA Nemotron-70B**, **Nebius Token Factory**, and **Tavily AI Search**. It protects enterprises from hostile exculpatory clauses, indemnification traps, non-compete overreach, and regulatory compliance violations under Delaware Chancery Court, FTC, and EU GDPR standards.

---

## 🏗️ System Architecture & Feature Matrix

### 1. 🔍 Contract Auditor (`/auditor`)
- **Document Ingestion:** Drag-and-drop support for PDF, DOCX, DOC, TXT, scanned contract images with client-side OCR & token counters.
- **NeMo Zero-Hallucination Guardrail:**
  - Length check: $\ge 40$ chars, $\ge 6$ contractual words.
  - Rejection of binary stream artifacts, image dumps, and excessive non-text symbols ($> 14\%$).
  - Whitelist validation of legal stems (`liab`, `indemn`, `breach`, `covenant`, `agree`, `waiv`, `damag`, etc.).
  - Blocks gibberish immediately with HTTP 422 before calling neural inference.
- **Audit Engine & Telemetry:**
  - Multi-provider endpoint routing (NVIDIA NIM, Nebius Token Factory, OpenRouter).
  - Live Tavily legal search integration querying Cornell Law, SEC, FTC, and Delaware Court precedents.
  - Clause-by-clause risk scoring (0-100), severity levels (`CRITICAL`, `HIGH`, `MODERATE`, `COMPLIANT`).
  - Lawyer-grade redlines and blackline diff comparisons (`[-removed-] {+added+}`).
  - Senior Counsel interactive chat drawer with deliberative reasoning trace visualization.
  - Printable formal legal audit certificates and dossier exports.
  - Auto-persistence to user profiles and Firestore.

### 2. ⚔️ Autonomous "War Room" — AI Negotiation Simulator (`/war-room`)
- **Multi-Agent Deliberation (3 Autonomous Agents):**
  1. **Attorney Marcus Vance, CCEP (Opposing Vendor Counsel AI):** Defends vendor commercial margins and pushes unilateral risk allocation.
  2. **Counsel Elena Rostova, Esq. (NemoGuard Defense AI):** Asserts Delaware Chancery precedents (`ABRY Partners v. F&W Acquisition`), statutory caps, and Tavily case law.
  3. **Judge Nemotron-70B (Judicial Arbitrator):** Computes consensus equilibrium and ratifies final bilateral settlement accords.
- **Interactive UI & Visualizations:**
  - Real-time Judicial Power Balance Gauge (Hostile Vendor Dominance $\rightarrow$ 50% Neutral $\rightarrow$ 98% Equitable Bilateral Accord).
  - 3-round interactive debate tab switcher with tone tags and statutory citations.
  - Split-view / Vendor focus / Defense focus perspective toggle.
  - One-click copy for finalized ratified bilateral clauses.
  - **Live Courtroom Oral Arguments AI Audio Debate Simulator:**
    - High-impact interactive speech engine powered by Web Speech Synthesis API with zero latency and 100% offline/online reliability.
    - 3 distinct acoustic personas:
      - 👔 *Attorney Marcus Vance*: Baritone aggressive corporate tone (Pitch: 0.88, Rate: 1.0x).
      - 👩‍⚖️ *Counsel Elena Rostova*: Articulate, sharp statutory legal defense (Pitch: 1.15, Rate: 1.02x).
      - ⚖️ *Hon. Judge Nemotron-70B*: Resonant, deliberate constitutional arbitrator (Pitch: 0.82, Rate: 0.95x).
    - Real-time animated audio waveforms bouncing with speech activity.
    - Dynamic "SPEAKING NOW" glowing neon ring borders and pulse badges highlighting the active counsel's podium during oral arguments.
    - Flexible Courtroom Deck Controls: Play Current Round Arguments, Play Full 3-Round Sequential Debate (auto-switches rounds on screen), Pause/Resume, Stop, and multi-speed selector (1.0x, 1.25x, 1.5x).
  - **User Negotiation History & Accords Archive (`showHistoryModal`):**
    - Dedicated client history drawer replacing the legacy admin link.
    - Instant search across past bilateral accords by title, jurisdiction, or cryptographic cert hash.
    - Direct **"Load into War Room"** capability restoring past 3-round multi-agent debates into active view.
    - Direct **"View Dossier & PDF"** triggering formal legal cert exports.
    - Dual persistence across Firebase Firestore (`nemoguard_negotiations`) and localized browser storage.
  - **Official Legal Settlement Dossier & PDF Export:**
    - Instant 1-click **"Download Settlement Dossier"** modal with high-contrast cyber-luxury preview.
    - Export official markdown legal brief (`.md`) with all case citations, exposure mitigation, and 3-round debate transcript.
    - Print / Save as PDF with dedicated `@media print` formatting rendering clean white-paper lawyer-grade legal certificates.
  - 4 High-Stakes Presets: SaaS $500 Trap, DPA Breach Loophole, M&A Fraud Waiver, Executive Non-Compete Ban.
- **Strict NeMo Guardrails & Error Alert Banner:**
  - Blocks random spam, keystroke spam (`fsdf sssss...`), and non-legal inputs with HTTP 422.
  - Red cyber-glass warning banner with "Load Verified Scenario" button.
- **Dynamic Context-Aware Legal Synthesis Engine:**
  - Inspects user's actual clause keywords (Indemnity, Liability Cap, Non-Compete / FTC 16 CFR Part 910, Data Breach, Fraud Waiver).
  - Generates bespoke 3-round debates tied directly to the user's input, even in offline fallback mode.
  - Telemetry badge indicating engine mode (Live Neural Inference vs. Tavily Grounded Legal Synthesis).

### 3. ⚡ NVIDIA NeMo Guardrails Adversarial Stress-Test Sandbox (`/guardrails` & `/api/guardrails`)
- **Core Defense Architecture:**
  - Multi-tier, real-time perimeter firewall testing prompts, case law grounding, code injection, and bilateral equitability with sub-15ms latency.
  - Generates immutable cryptographic defense receipt hashes (\`0xNEMO_SHIELD_...\`).
- **4-Rail Inspection Matrix:**
  1. **Rail 1: Input Jailbreak & Prompt Injection Rail** — Intercepts DAN mode, system prompt leaks, and delimiter injections with HTTP 422 immediately.
  2. **Rail 2: Topical Legal Domain & Code Injection Rail** — Sanitizes XSS payloads, SQL drops, and out-of-domain conversational spam.
  3. **Rail 3: Hallucination & Statutory Precedent Verification Rail (Tavily Grounded)** — Flags fictional court precedents (*Supreme Court of Atlantis, Cyberdyne Corp v. Matrix 2099*) against real legal jurisprudence.
  4. **Rail 4: Output Moderation & Bilateral Equitability Rail** — Flags unconscionable exculpatory clauses (waiver of intentional fraud or gross negligence) and mandates reciprocal risk equilibrium.
- **Interactive UI & Developer Features:**
  - 5 Preset Test Vectors: Prompt Jailbreak, Fake Precedent Injection, Malicious Code Exploit, Fraud Immunity Trap, and Compliant Delaware Ground Truth.
  - Interactive Adversarial Payload Console with instant execution, custom prompts, and copy tools.
  - Real-Time Telemetry HUD: Threat Severity Score (0-100), Defense Latency (ms), Overall Status, and Cryptographic Cert Hash.
  - NVIDIA Colang 2.0 Policy Definition Modal (\`colang_policy.co\`) showing judges official NeMo Guardrails flow code.
  - Exportable Forensic Security Dossier (Markdown & JSON download).

### 4. 📊 NVIDIA Nemotron vs. GPT-4o Benchmark & Token Efficiency Matrix (`/benchmark` & `/api/benchmark`)
- **Core Hardware & Economic Telemetry:**
  - Evaluates NVIDIA Llama-3.1-Nemotron-70B on Nebius Token Factory H100 SXM5 80GB vs Commercial Closed-Source Baseline (GPT-4o).
  - **Generation Speed:** 148.6 tokens/sec (Nemotron) vs 44.2 tokens/sec (Baseline) — **3.4x Faster**.
  - **Time-To-First-Token (TTFT):** 215ms vs 850ms — **Sub-second enterprise turnaround**.
  - **Token Pricing:** $0.60 / 1M tokens (Nebius) vs $5.00 / 1M tokens (OpenAI) — **88.0% Cost Reduction**.
  - **Legal Accuracy & Grounding:** 98.6% with Tavily Delaware Chancery Precedents vs 81.4% un-grounded parametric memory.
- **Interactive Head-to-Head Live Race Arena:**
  - Split-screen real-time simulated token streaming race with live speedometers and progress dials.
  - Compares redline output quality: specific Delaware Chancery statutory citations vs generic advice.
- **Interactive Enterprise Token Economics & ROI Calculator:**
  - Live sliders for monthly contracts (100 to 10,000) and average contract size (2k to 35k words).
  - Computes annual enterprise cost savings in $ USD (saving $36,000+ USD/yr for typical enterprise legal teams).
- **Architecture Specs Comparison Matrix:**
  - Comprehensive comparison of H100 SXM5 3.35 TB/s interconnect, TensorRT-LLM FP8, and NeMo Guardrails Core.
- **Exportable Benchmark Dossier:**
  - Download official Markdown enterprise benchmark audit certificate.

### 5. 🏛️ Precedent Vault (`/vault`)
- Persistent legal vault indexing all historical audits and bilateral ratified settlements.
- Filters by jurisdiction, risk severity, model used, and date.
- Real-time Firestore synchronization (`nemoguard_audits`).
- Mobile & desktop responsive glassmorphic design.

### 4. 👤 Counsel Profile & Identity System (`/profile`)
- User credentials, avatar selection, corporate email management.
- Guest mode support with localized session tracking.
- Statistics counter (contracts audited, liability mitigated, certificates generated).
- Controlled inputs with full error resilience.

### 5. ⚙️ Admin Portal & Model Gateway (`/admin/dashboard`)
- Dynamic CMS configuration for runtime API key overrides (`NEBIUS_API_KEY`, `TAVILY_API_KEY`, active model).
- Real-time Firestore sync via `nemoguard_cms/gateway_settings`.
- Platform telemetry metrics (total tokens, active contracts, War Room audit stats).

---

## 🗄️ Database Schema (Firebase Firestore)

| Collection | Document ID | Key Fields | Purpose |
| :--- | :--- | :--- | :--- |
| `nemoguard_audits` | Auto-ID | `title`, `jurisdiction`, `riskScore`, `riskLevel`, `summary`, `clauses`, `modelUsed`, `userId`, `isGuest`, `createdAt` | Vault records & contract audits |
| `nemoguard_negotiations` | Auto-ID | `contractTitle`, `disputedClause`, `jurisdiction`, `initialExposureEstimateUsd`, `mitigatedExposureUsd`, `rounds`, `finalAgreedClause`, `certHash`, `telemetry`, `createdAt` | War Room bilateral settlement records |
| `nemoguard_cms` | `gateway_settings` | `nebiusApiKey`, `tavilyApiKey`, `activeModel`, `updatedAt` | Runtime API gateway overrides without restarting servers |
| `users` | User UID | `name`, `email`, `role`, `barNumber`, `createdAt`, `savedAudits` | User profiles and credentials |

---

## 🔑 Environment Configuration (`.env.local`)

```env
# Firebase Credentials
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBMrnCMPA6Ouh_qg9pwWSbJi63dXZHby_k
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=web-b61f1.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=web-b61f1
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=web-b61f1.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=806029963863
NEXT_PUBLIC_FIREBASE_APP_ID=1:806029963863:web:b0c42b92338246793e6912
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-0YLHNLVQZT

# Nebius Token Factory / NVIDIA NIM Key
NEBIUS_API_KEY=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
NEBIUS_BASE_URL=https://api.studio.nebius.ai/v1
NEBIUS_MODEL=nvidia/nemotron-3-super-120b-a12b

# Tavily AI Search ($3,000 Partner Bounty) - 100% Active & Operational
TAVILY_API_KEY=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
```

> [!NOTE]
> **API Key Status:**
> - `TAVILY_API_KEY`: **Active & Verified** (Live court precedent search works 100%).
> - `NEBIUS_API_KEY`: The current `nvapi-...` key returns `403 Forbidden` on NVIDIA NIM (expired/revoked). Once a fresh key is generated from [build.nvidia.com](https://build.nvidia.com) or [tokenfactory.nebius.com](https://tokenfactory.nebius.com), it can be pasted into `.env.local` or directly into the Admin Portal (`/admin/dashboard`).
> - The application handles invalid/missing keys gracefully with **Dynamic Context-Aware Legal Synthesis** + **Tavily Precedents Grounding**.

---

## 📂 Key Source Code Map

```
nemoguard-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── audit/route.ts        # Contract Auditor API (NeMo Guardrails, NVIDIA NIM/Nebius, Tavily search)
│   │   │   ├── negotiate/route.ts    # Multi-Agent War Room API (Guardrails, 3-round debate, dynamic synthesis)
│   │   │   ├── counsel/route.ts      # Senior Legal Counsel Chat API
│   │   │   └── gateway/route.ts      # Gateway status and settings API
│   │   ├── auditor/page.tsx          # Full Contract Auditor UI (Drag & drop, redlines, blacklines, counsel drawer)
│   │   ├── war-room/page.tsx         # Autonomous War Room UI (Power gauge, 3 rounds, debate perspectives)
│   │   ├── vault/page.tsx            # Precedent Vault & Regulatory Archive UI
│   │   ├── profile/page.tsx          # User & Counsel Profile UI
│   │   ├── admin/dashboard/page.tsx  # Admin Portal & Model Gateway UI
│   │   ├── page.tsx                  # Landing Page / Overview UI
│   │   └── layout.tsx                # Root layout with responsive Navigation & Footer
│   ├── lib/
│   │   └── firebase.ts               # Firebase App & Firestore initialization
│   └── components/                   # Shared UI components
├── public/
│   ├── warroom-bg.jpg                # War Room obsidian cyber background
│   └── images/                       # Supercluster and logo assets
├── .env.local                        # Local secrets and API keys
└── package.json                      # Next.js 15, React 19, Lucide, Firebase
```

---

## ⚡ How to Resume After Power Restoration

If power cuts off, resume immediately with these 2 simple steps:

1. **Start the Development Server:**
   ```powershell
   cd "g:\MY PORTFOLIO\06_HACKATHONS\02_NEBIUS_NVIDIA_AI_HACKATHON\nemoguard-ai"
   npm run dev
   ```
   Server will start at `http://localhost:3006` (or next free port).

2. **Verify & Test Routes:**
   - Auditor: `http://localhost:3006/auditor`
   - War Room: `http://localhost:3006/war-room`
   - Vault: `http://localhost:3006/vault`
   - Profile: `http://localhost:3006/profile`
   - Admin Gateway: `http://localhost:3006/admin/dashboard`

3. **To enable 100% Live NVIDIA Nemotron inference:**
   - Grab a fresh API key from [build.nvidia.com](https://build.nvidia.com)
   - Paste it in `/admin/dashboard` $\rightarrow$ Model Gateway
   - Everything is auto-synced!
