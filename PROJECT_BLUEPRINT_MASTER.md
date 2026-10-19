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
  - 4 High-Stakes Presets: SaaS $500 Trap, DPA Breach Loophole, M&A Fraud Waiver, Executive Non-Compete Ban.
- **Strict NeMo Guardrails & Error Alert Banner:**
  - Blocks random spam, keystroke spam (`fsdf sssss...`), and non-legal inputs with HTTP 422.
  - Red cyber-glass warning banner with "Load Verified Scenario" button.
- **Dynamic Context-Aware Legal Synthesis Engine:**
  - Inspects user's actual clause keywords (Indemnity, Liability Cap, Non-Compete / FTC 16 CFR Part 910, Data Breach, Fraud Waiver).
  - Generates bespoke 3-round debates tied directly to the user's input, even in offline fallback mode.
  - Telemetry badge indicating engine mode (Live Neural Inference vs. Tavily Grounded Legal Synthesis).

### 3. 🏛️ Precedent Vault (`/vault`)
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
