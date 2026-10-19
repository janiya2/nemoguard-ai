import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DEFAULT_CMS_DATA, LandingCMSData } from "@/lib/cmsDefaults";

export async function GET() {
  try {
    const docRef = doc(db, "nemoguard_cms", "landing_page");
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return NextResponse.json({ success: true, data: snap.data() });
    }
    return NextResponse.json({ success: true, data: DEFAULT_CMS_DATA, isDefault: true });
  } catch (error) {
    console.warn("CMS GET warning (falling back to default):", error);
    return NextResponse.json({ success: true, data: DEFAULT_CMS_DATA, isDefault: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: LandingCMSData = await req.json();

    const docRef = doc(db, "nemoguard_cms", "landing_page");
    await setDoc(docRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    return NextResponse.json({ success: true, message: "Landing page CMS updated successfully!" });
  } catch (error: any) {
    console.error("CMS POST error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to update CMS" }, { status: 500 });
  }
}
