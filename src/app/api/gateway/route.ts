import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const docRef = doc(db, "nemoguard_cms", "gateway_settings");
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return NextResponse.json({ success: true, data: snap.data() });
    }

    // Default settings
    return NextResponse.json({
      success: true,
      data: {
        activeModel: "nvidia/llama-3.1-nemotron-70b-instruct",
        tavilyEnabled: true,
        nebiusApiKey: process.env.NEBIUS_API_KEY || "",
        tavilyApiKey: process.env.TAVILY_API_KEY || "",
        searchDepth: "advanced",
        sensitivity: 8
      }
    });
  } catch (error: any) {
    console.warn("Gateway GET notice:", error);
    return NextResponse.json({
      success: true,
      data: {
        activeModel: "nvidia/llama-3.1-nemotron-70b-instruct",
        tavilyEnabled: true,
        nebiusApiKey: "",
        tavilyApiKey: "",
        searchDepth: "advanced",
        sensitivity: 8
      }
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Save to Firebase Firestore (Realtime Cloud Sync)
    const docRef = doc(db, "nemoguard_cms", "gateway_settings");
    await setDoc(docRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    // 2. Auto-sync to local .env.local file on disk
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, "utf-8");
        
        if (body.nebiusApiKey && body.nebiusApiKey.trim().length > 5) {
          const cleanKey = body.nebiusApiKey.trim();
          if (envContent.includes("NEBIUS_API_KEY=")) {
            envContent = envContent.replace(/NEBIUS_API_KEY=.*/, `NEBIUS_API_KEY=${cleanKey}`);
          } else {
            envContent += `\nNEBIUS_API_KEY=${cleanKey}`;
          }
        }

        if (body.tavilyApiKey && body.tavilyApiKey.trim().length > 5) {
          const cleanTavily = body.tavilyApiKey.trim();
          if (envContent.includes("TAVILY_API_KEY=")) {
            envContent = envContent.replace(/TAVILY_API_KEY=.*/, `TAVILY_API_KEY=${cleanTavily}`);
          } else {
            envContent += `\nTAVILY_API_KEY=${cleanTavily}`;
          }
        }

        if (body.activeModel) {
          const cleanModel = body.activeModel.trim();
          if (envContent.includes("NEBIUS_MODEL=")) {
            envContent = envContent.replace(/NEBIUS_MODEL=.*/, `NEBIUS_MODEL=${cleanModel}`);
          } else {
            envContent += `\nNEBIUS_MODEL=${cleanModel}`;
          }
        }

        fs.writeFileSync(envPath, envContent, "utf-8");
      }
    } catch (fsErr) {
      console.warn("Could not sync .env.local on disk (likely serverless/read-only filesystem):", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: "AI Gateway model selection and API keys saved successfully to Firebase & .env.local!"
    });
  } catch (error: any) {
    console.error("Gateway POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

