import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const { contractText, contractTitle, enableTavily = true, jurisdiction = "US / Delaware & Global" } = await req.json();

    if (!contractText || contractText.trim().length < 40) {
      return NextResponse.json({
        error: `Invalid Contract Input: The submitted text is too short (${contractText?.trim()?.length || 0} characters). A valid legal clause requires at least 40 characters. Please paste actual contract terms or select one of the Enterprise Sample Scenarios.`
      }, { status: 400 });
    }

    const words = contractText.trim().split(/\s+/);
    if (words.length < 6) {
      return NextResponse.json({
        error: "Invalid Contract Input: The submitted text lacks contractual sentence structure (at least 6 words required). Please enter contractual language or choose a preset template on the left."
      }, { status: 400 });
    }

    // Reject pure random character spam (e.g. dfsdf / asdfghjk)
    const legalOrCommonTokens = [
      "agreement", "contract", "party", "parties", "shall", "clause", "section",
      "liability", "customer", "provider", "client", "vendor", "law", "terms",
      "rights", "breach", "confidential", "indemnif", "employee", "services",
      "dispute", "notice", "termination", "herein", "whereof", "recipient",
      "governing", "obligation", "warranty", "damages", "jurisdiction", "exclusive",
      "intellectual", "property", "data", "affiliate", "hereunder", "provisions",
      "the", "and", "or", "to", "in", "for", "with", "that", "this", "by", "from",
      "not", "all", "any", "be", "is", "are"
    ];
    const textLower = contractText.toLowerCase();
    const tokenMatches = legalOrCommonTokens.filter(token => textLower.includes(token)).length;

    if (tokenMatches < 3) {
      return NextResponse.json({
        error: "Invalid Contract Input: The provided text does not contain recognizable contractual terms or coherent clauses. Please provide real legal provisions or click an Enterprise Scenario template on the left."
      }, { status: 400 });
    }

    let nebiusApiKey = process.env.NEBIUS_API_KEY;
    let tavilyApiKey = process.env.TAVILY_API_KEY;
    const nebiusBaseUrl = process.env.NEBIUS_BASE_URL || "https://api.studio.nebius.ai/v1";
    let nebiusModel = process.env.NEBIUS_MODEL || "nvidia/llama-3.1-nemotron-70b-instruct";

    // Read dynamic settings from Firebase Firestore gateway_settings if configured
    try {
      const { db } = await import("@/lib/firebase");
      const { doc, getDoc } = await import("firebase/firestore");
      const snap = await getDoc(doc(db, "nemoguard_cms", "gateway_settings"));
      if (snap.exists()) {
        const data = snap.data();
        if (data.nebiusApiKey && data.nebiusApiKey.trim().length > 5) {
          nebiusApiKey = data.nebiusApiKey.trim();
        }
        if (data.tavilyApiKey && data.tavilyApiKey.trim().length > 5) {
          tavilyApiKey = data.tavilyApiKey.trim();
        }
        if (data.activeModel) {
          nebiusModel = data.activeModel;
        }
      }
    } catch (e) {
      // Continue with env vars
    }

    let tavilyPrecedents: any[] = [];

    // Optional Tavily AI Search for Live Precedents
    if (enableTavily && tavilyApiKey && tavilyApiKey.trim() !== "") {
      try {
        const tavilyQuery = `legal precedents court cases contract liability indemnification ${contractTitle || "commercial contract"}`;
        const tavilyRes = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: tavilyApiKey,
            query: tavilyQuery,
            search_depth: "advanced",
            include_domains: ["law.cornell.edu", "delaware.gov", "supremecourt.gov", "sec.gov", "ftc.gov", "justia.com"],
            max_results: 3
          }),
        });

        if (tavilyRes.ok) {
          const tavilyData = await tavilyRes.json();
          tavilyPrecedents = tavilyData.results || [];
        }
      } catch (tavilyErr) {
        console.warn("Tavily search warning:", tavilyErr);
      }
    }

    // Strictly enforce live Nebius API key requirement
    if (!nebiusApiKey || nebiusApiKey.trim().length <= 10) {
      return NextResponse.json({
        error: "Live Nebius AI Key Required: Autonomous contract auditing requires an active Nebius Token Factory API key (NVIDIA Nemotron-70B). Please connect your live key in the Admin Portal (Model Gateway) or set NEBIUS_API_KEY in .env.local to execute live AI audits."
      }, { status: 403 });
    }

    // Live Nebius Token Factory Request
    const systemPrompt = `You are NemoGuard AI, an elite autonomous enterprise legal auditor powered by NVIDIA Nemotron-70B on the Nebius Token Factory.
Your job is to perform a rigorous, zero-hallucination legal audit of the provided contract.
Analyze dangerous indemnity traps, unlimited liabilities, regulatory violations (GDPR, EU AI Act, Delaware Chancery Court precedent, SEC rules, FTC non-compete bans), and draft lawyer-grade redlines.

Respond with strict JSON ONLY in the following format:
{
  "overallRiskScore": <number 0-100>,
  "riskLevel": "<CRITICAL | HIGH | ELEVATED | GUARDED>",
  "summary": "<Concise 2-3 sentence executive legal risk summary>",
  "clauses": [
    {
      "id": "c1",
      "title": "<Clause Name, e.g. Unlimited Customer Indemnification>",
      "severity": "<CRITICAL | HIGH | MEDIUM | LOW>",
      "riskScore": <number 0-100>,
      "originalText": "<exact or excerpted original clause text>",
      "redlineText": "<revised, defensible counter-proposal clause text>",
      "reasoning": "<legal explanation of the danger>",
      "legalPrecedent": "<court case citation or statute, e.g. ABRY Partners v. F&W Acquisition, Del. Ch. 2006>",
      "tavilyCitation": "<URL or authoritative source description>",
      "recommendations": "<actionable negotiation stance for counsel>"
    }
  ],
  "statutoryFrameworks": [
    { "name": "Delaware Chancery Fiduciary Law", "status": "FLAGGED", "note": "Uncapped indemnity violates mutual fairness doctrine" },
    { "name": "GDPR Article 28 / Cross-border", "status": "FAIL", "note": "Breach notification exceeds 72h requirement" },
    { "name": "FTC Non-Compete / Restrictive Covenants", "status": "FAIL", "note": "Post-employment worldwide restriction violates 16 CFR Part 910" },
    { "name": "EU AI Act Transparency", "status": "WARNING", "note": "Proprietary GPU training without consent" }
  ]
}`;

    const nebiusRes = await fetch(`${nebiusBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${nebiusApiKey}`,
      },
      body: JSON.stringify({
        model: nebiusModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Contract Title: ${contractTitle}\nJurisdiction: ${jurisdiction}\n\nContract Text:\n${contractText.slice(0, 12000)}` },
        ],
        temperature: 0.2,
        max_tokens: 3500,
        response_format: { type: "json_object" }
      }),
    });

    if (!nebiusRes.ok) {
      const errText = await nebiusRes.text();
      let detailMsg = errText;
      try {
        const parsed = JSON.parse(errText);
        detailMsg = parsed.error?.message || parsed.message || errText;
      } catch {}

      return NextResponse.json({
        error: `Nebius GPU Cluster Error (${nebiusRes.status}): ${detailMsg}. Please verify your API key in the Admin Portal.`
      }, { status: nebiusRes.status });
    }

    const nebiusJson = await nebiusRes.json();
    const rawContent = nebiusJson.choices?.[0]?.message?.content;
    if (!rawContent) {
      return NextResponse.json({
        error: "Nebius GPU Cluster returned an empty response. Please retry."
      }, { status: 502 });
    }

    const parsed = JSON.parse(rawContent);
    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      ...parsed,
      telemetry: {
        modelUsed: nebiusModel,
        nebiusCluster: "Nebius Token Factory (H100 SXM5 Supercluster)",
        latencyMs,
        tokensProcessed: nebiusJson.usage?.total_tokens || Math.floor(contractText.length / 3.8),
        tavilyCalls: tavilyPrecedents.length,
        tavilyPrecedents: tavilyPrecedents.map((p) => ({ title: p.title, url: p.url })),
        isLiveNebius: true,
        engineMode: "LIVE_NVIDIA_NEMOTRON_70B"
      }
    });

  } catch (error: any) {
    console.error("Audit API Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
