# 🛡️ NemoGuard AI — Autonomous Legal & Regulatory Risk Intelligence Engine

> **Built for the Nebius × NVIDIA Global AI Hackathon on Devpost ($50,000+ Prize Pool).**  
> Powered by **NVIDIA Nemotron-70B** on **Nebius Token Factory** and **Tavily AI Search** ($3,000 Partner Bounty).

[![Live Production Demo](https://img.shields.io/badge/Live_Demo-nemoguard--ai.vercel.app-76b900?style=for-the-badge&logo=vercel&logoColor=white)](https://nemoguard-ai.vercel.app/)
[![YouTube Demo](https://img.shields.io/badge/YouTube-Watch_Video_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/BlQQtXSRmPo)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![NVIDIA Nemotron](https://img.shields.io/badge/Model-nvidia%2Fllama--3.1--nemotron--70b-76b900.svg)](https://studio.nebius.ai/)
[![Nebius Token Factory](https://img.shields.io/badge/Cloud-Nebius_H100_Supercluster-00f0ff.svg)](https://studio.nebius.ai/)
[![Tavily Search](https://img.shields.io/badge/Bounty-Tavily_AI_Search_$3,000-emerald.svg)](https://tavily.com/)

> 🌐 **Live Supercluster**: [https://nemoguard-ai.vercel.app](https://nemoguard-ai.vercel.app)  
> 🎥 **Official Video Walkthrough (06:37)**: [https://youtu.be/BlQQtXSRmPo](https://youtu.be/BlQQtXSRmPo)  
> 🔑 **1-Click Judge Demo Login**: [https://nemoguard-ai.vercel.app/admin/login](https://nemoguard-ai.vercel.app/admin/login)  
> 🏛️ **Full Architectural Blueprint**: [`NEMOGUARD_AI_MASTER_BLUEPRINT.md`](./NEMOGUARD_AI_MASTER_BLUEPRINT.md)

---

## ⚡ Executive Summary

Modern enterprise contracts are filled with hidden liability traps—such as unilateral, uncapped indemnification, non-consensual AI model training on proprietary corporate telemetry, and illegal 30-day data breach reporting windows that violate European GDPR statutory ceilings.

**NemoGuard AI** is an autonomous legal intelligence system that:
1. **Parses & Evaluates Contracts Clause-by-Clause** using **NVIDIA Nemotron-70B** hosted on the **Nebius Token Factory** high-speed GPU cloud (`https://api.studio.nebius.ai/v1`).
2. **Eliminates Hallucinations with NeMo Guardrail Reasoning**: Ensures zero synthetic citations and strict commercial compliance standards.
3. **Retrieves Real-Time Case Precedents with Tavily AI Search**: Connects directly to Delaware Court of Chancery rulings (*ABRY Partners*), FTC non-compete bans (16 CFR Part 910), and European Data Protection Board precedents.
4. **Drafts Lawyer-Grade Defensive Redlines**: Generates instant, side-by-side diffs ready for counter-signature.
5. **Includes a Complete Admin Control Center & Dynamic CMS**: Empowers chief legal counsel and platform administrators to manage landing page copy, metric counters, system telemetry, and model parameters in real-time through Firebase Firestore.

---

## 🏛️ System Architecture

```mermaid
graph TD
    Client["Enterprise Counsel / User"] -->|Contract Upload / Sample| UI["Next.js 15 Cyber Interface"]
    Admin["Chief Counsel Admin"] -->|Real-time Control| AdminPortal["Admin Dashboard CMS (/admin)"]
    AdminPortal -->|Dynamic Sync| DB[("Firebase Firestore")]
    DB -->|Instant Updates| UI

    UI -->|Contract Analysis Request| API["API Engine (/api/audit)"]
    API -->|Prompt & NeMo Guardrails| Nebius["Nebius Token Factory H100"]
    Nebius -->|nvidia/llama-3.1-nemotron-70b| Reasoning["Deep Legal Risk Synthesis"]
    
    API -->|Live Precedent Query| Tavily["Tavily AI Search API"]
    Tavily -->|Delaware Chancery / SEC / FTC| Precedents["Statutory Authorities"]

    Reasoning & Precedents -->|Redline Diff & Risk Scoring| Results["Interactive Defense Matrix"]
    Results -->|Persist Audit Record| DB
    Results -->|Export Official Report| PDF["Printable Legal PDF Brief"]
```

---

## 🔑 Key Features

### 1. Dynamic Landing Page (Admin-Controlled CMS)
- Fully dynamic frontend powered by Next.js 15, styled with NVIDIA's signature **Neon Emerald (`#76b900`) and Cyber Obsidian Slate**.
- Hero headlines, live counters, announcement pills, and maintenance banners are controllable in real-time from the `/admin/dashboard` portal without redeploying code.

### 2. Autonomous Contract Auditor
- Instant 1-click enterprise scenarios:
  - **SaaS Master Services Agreement** (Unilateral unlimited customer indemnity trap).
  - **AI Model Vendor DPA** (30-day breach notification window violating GDPR Art. 28).
  - **M&A Stock Purchase Agreement** (Unenforceable fraud liability disclaimers).
  - **Executive Non-Compete Covenant** (Unlawful global ban violating FTC 16 CFR Part 910).
- Clause-by-clause risk severity rating (CRITICAL, HIGH, ELEVATED, GUARDED).
- Side-by-side redline diff engine with counter-language.

### 3. Dedicated Admin Control Center (`/admin/dashboard`)
- **Telemetry & KPI**: Live counts of audited contracts, token consumption, and response latency.
- **Landing Page CMS Controller**: Live form to update hero text, metric counters, and feature badges stored in Firebase.
- **Audit Vault Logs**: Complete searchable history of scanned enterprise contracts.
- **AI Gateway & Model Selector**: Switch between `nvidia/llama-3.1-nemotron-70b-instruct` and other Nebius-hosted models, adjust risk sensitivity, and toggle Tavily search depth.
- **System Health Diagnostics**: Real-time status probe for Nebius, Tavily, and Firebase connectivity.

---

## 🛠️ Technology Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 15 (React 19, TypeScript) | Cyber-luxury interface & App Router |
| **Styling** | Vanilla CSS + Tailwind CSS | NVIDIA Neon Emerald (`#76b900`) glassmorphism |
| **Inference Engine** | **Nebius Token Factory** | NVIDIA Nemotron-70B inference via H100 SXM5 |
| **Grounding / Search** | **Tavily AI Search API** | Real-time legal case precedent retrieval ($3K Bounty) |
| **Database & Storage** | **Firebase Firestore & Storage** | CMS state persistence and audit vault records |
| **Deployment** | Vercel Global Edge | Instant, low-latency worldwide availability |

---

## 🚀 Getting Started

### 1. Environment Configuration (`.env.local`)
Create a `.env.local` file with the following keys:

```bash
# Firebase Credentials (Shared Project)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBMrnCMPA6Ouh_qg9pwWSbJi63dXZHby_k
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=web-b61f1.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=web-b61f1
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=web-b61f1.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=806029963863
NEXT_PUBLIC_FIREBASE_APP_ID=1:806029963863:web:b0c42b92338246793e6912
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-0YLHNLVQZT

# Nebius Token Factory (NVIDIA Nemotron-70B)
NEBIUS_API_KEY=your_nebius_api_key_here
NEBIUS_BASE_URL=https://api.studio.nebius.ai/v1
NEBIUS_MODEL=nvidia/llama-3.1-nemotron-70b-instruct

# Tavily AI Search ($3,000 Partner Bounty)
TAVILY_API_KEY=your_tavily_api_key_here
```

### 2. Running Locally
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit:
- **Homepage:** `http://localhost:3000`
- **Contract Auditor:** `http://localhost:3000/auditor`
- **Precedent Vault:** `http://localhost:3000/vault`
- **Admin Login:** `http://localhost:3000/admin/login` (Passkey: `nemoguard2026` or One-Click Demo)
- **Admin Control Center:** `http://localhost:3000/admin/dashboard`

---

## 🏆 Hackathon Eligibility

- **Nebius x NVIDIA Core Track:** Fully powered by Nebius Token Factory with model `nvidia/llama-3.1-nemotron-70b-instruct`.
- **Best Use of Tavily ($3,000 Bounty):** Uses Tavily API to ground statutory reasoning in live court case precedents and regulatory guidelines.
- **Zero Hallucination Guarantee:** Utilizes NeMo Guardrail reasoning to verify every legal citation.

---

## 📄 License
Apache-2.0 License. Built for the Nebius × NVIDIA Global AI Hackathon.
