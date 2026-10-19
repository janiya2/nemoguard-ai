import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

    const docRef = doc(db, "nemoguard_cms", "gateway_settings");
    await setDoc(docRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    return NextResponse.json({
      success: true,
      message: "AI Gateway model selection and API keys saved successfully to Firebase!"
    });
  } catch (error: any) {
    console.error("Gateway POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
