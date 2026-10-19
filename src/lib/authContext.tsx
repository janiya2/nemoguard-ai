"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: "General Counsel" | "Chief Compliance Officer" | "Senior Risk Auditor" | "Guest Reviewer";
  tier: "Enterprise Legal Suite" | "Pro Counsel" | "Guest Trial";
  avatar: string;
  isGuest: boolean;
  memberSince: string;
  jurisdictionPreference: string;
}

export interface SavedAudit {
  id: string;
  userId: string;
  title: string;
  timestamp: string;
  createdAt?: any;
  overallScore: number;
  totalClauses: number;
  criticalIssues: number;
  jurisdiction: string;
  certHash: string;
  executiveSummary: string;
  clauses?: any[];
  ratified?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  savedAudits: SavedAudit[];
  loading: boolean;
  loginAsGuest: () => void;
  loginWithPersona: (personaKey: "counsel" | "compliance") => void;
  loginWithEmail: (email: string, name?: string, org?: string, role?: string) => Promise<void>;
  signupWithEmail: (email: string, name: string, org: string, role?: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  saveAuditToProfile: (auditData: Omit<SavedAudit, "id" | "userId" | "timestamp">) => Promise<string | null>;
  deleteAuditFromProfile: (auditId: string) => Promise<void>;
  refreshAudits: () => Promise<void>;
}

export function getOrCreateGuestUser(): UserProfile {
  let guestId = "guest_client";
  if (typeof window !== "undefined") {
    let stored = localStorage.getItem("nemoguard_guest_client_id");
    if (!stored) {
      stored = `guest_${Math.random().toString(36).substring(2, 8)}_${Date.now().toString(36).slice(-4)}`;
      localStorage.setItem("nemoguard_guest_client_id", stored);
    }
    guestId = stored;
  }
  return {
    id: guestId,
    name: "Guest Reviewer",
    email: "guest.reviewer@nemoguard.ai",
    organization: "Global AI Hackathon Evaluation",
    role: "Guest Reviewer",
    tier: "Guest Trial",
    avatar: "⚖️",
    isGuest: true,
    memberSince: "October 2026",
    jurisdictionPreference: "Delaware / US Federal & EU"
  };
}

const DEMO_PERSONAS: Record<"counsel" | "compliance", UserProfile> = {
  counsel: {
    id: "user-counsel-apex",
    name: "Elena Rostova, Esq.",
    email: "e.rostova@apexholdings.legal",
    organization: "Apex Enterprise Holdings & Tech Fund",
    role: "General Counsel",
    tier: "Enterprise Legal Suite",
    avatar: "👩‍⚖️",
    isGuest: false,
    memberSince: "January 2026",
    jurisdictionPreference: "Delaware / US Federal & EU"
  },
  compliance: {
    id: "user-compliance-vanguard",
    name: "Marcus Vance, CCEP",
    email: "m.vance@vanguardfintech.io",
    organization: "Vanguard Global Financial Intelligence",
    role: "Chief Compliance Officer",
    tier: "Enterprise Legal Suite",
    avatar: "🛡️",
    isGuest: false,
    memberSince: "March 2026",
    jurisdictionPreference: "European Union (AI Act & GDPR)"
  }
};

const DEFAULT_SAMPLE_AUDITS: SavedAudit[] = [
  {
    id: "sample-audit-01",
    userId: "user-counsel-apex",
    title: "Enterprise Multi-Cloud Master Services Agreement (MSA)",
    timestamp: "Oct 18, 2026 • 16:42 UTC",
    overallScore: 84,
    totalClauses: 4,
    criticalIssues: 2,
    jurisdiction: "Delaware / US Federal & EU",
    certHash: "0x76B9E4F8B2C99A410D8F3E229B0D1CA67F4",
    executiveSummary: "High adversarial exposure detected in unilateral indemnity & aggregate liability cap ($500). Remediated with Delaware UCC § 2-719 bilateral ceiling.",
    ratified: true
  },
  {
    id: "sample-audit-02",
    userId: "user-counsel-apex",
    title: "Senior Executive Employment & Global Restrictive Covenant",
    timestamp: "Oct 17, 2026 • 11:15 UTC",
    overallScore: 91,
    totalClauses: 3,
    criticalIssues: 3,
    jurisdiction: "California / US FTC Non-Compete Ban",
    certHash: "0x3F91A8E20D54B7C9114EA882190BF33A",
    executiveSummary: "Unenforceable 24-month non-compete violating FTC 16 CFR § 910 and Cal. Bus. & Prof. Code § 16600. Replaced with garden leave protocol.",
    ratified: true
  },
  {
    id: "sample-audit-03",
    userId: "user-compliance-vanguard",
    title: "Cross-Border Artificial Intelligence Training Data Processing Addendum (DPA)",
    timestamp: "Oct 16, 2026 • 09:30 UTC",
    overallScore: 78,
    totalClauses: 5,
    criticalIssues: 2,
    jurisdiction: "European Union (AI Act & GDPR)",
    certHash: "0x9180EFA2310DC45981BB7721A0F2994D",
    executiveSummary: "Uncontrolled intellectual property extraction and automated high-risk model retraining without GDPR Article 28 data deletion guarantees.",
    ratified: false
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [savedAudits, setSavedAudits] = useState<SavedAudit[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize session from LocalStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("nemoguard_active_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const guestUser = getOrCreateGuestUser();
        setUser(guestUser);
        localStorage.setItem("nemoguard_active_user", JSON.stringify(guestUser));
      }
    } catch {
      setUser(getOrCreateGuestUser());
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch audits whenever user changes
  useEffect(() => {
    if (!user) return;
    refreshAudits();
  }, [user?.id]);

  const refreshAudits = async () => {
    if (!user) return;

    // Load local cache scoped strictly to user.id
    try {
      const cached = localStorage.getItem(`nemoguard_audits_${user.id}`);
      let initialList: SavedAudit[] = [];
      if (cached) {
        initialList = JSON.parse(cached);
      } else {
        // Pre-populate demo personas ONLY; guests start with CLEAN EMPTY state so others' audits don't bleed
        if (user.id === "user-counsel-apex") {
          initialList = DEFAULT_SAMPLE_AUDITS.filter(a => a.userId === "user-counsel-apex");
        } else if (user.id === "user-compliance-vanguard") {
          initialList = DEFAULT_SAMPLE_AUDITS.filter(a => a.userId === "user-compliance-vanguard");
        } else {
          initialList = [];
        }
        localStorage.setItem(`nemoguard_audits_${user.id}`, JSON.stringify(initialList));
      }
      setSavedAudits(initialList);

      // Only sync from Firestore if this is a registered user (NOT guest)
      if (!user.isGuest) {
        try {
          const q = query(
            collection(db, "nemoguard_audits"),
            where("userId", "==", user.id)
          );
          const snap = await getDocs(q);
          if (!snap.empty) {
            const remoteList: SavedAudit[] = snap.docs.map(docSnap => ({
              id: docSnap.id,
              ...(docSnap.data() as any)
            }));
            // Merge unique audits
            const merged = [...remoteList];
            initialList.forEach(localItem => {
              if (!merged.some(r => r.id === localItem.id)) {
                merged.push(localItem);
              }
            });
            setSavedAudits(merged);
            localStorage.setItem(`nemoguard_audits_${user.id}`, JSON.stringify(merged));
          }
        } catch (firestoreErr) {
          console.warn("Firestore sync optional offline fallback:", firestoreErr);
        }
      }
    } catch (err) {
      console.warn("Failed loading audits:", err);
    }
  };

  const loginAsGuest = () => {
    const guestUser = getOrCreateGuestUser();
    setUser(guestUser);
    localStorage.setItem("nemoguard_active_user", JSON.stringify(guestUser));
  };

  const loginWithPersona = (personaKey: "counsel" | "compliance") => {
    const selected = DEMO_PERSONAS[personaKey];
    setUser(selected);
    localStorage.setItem("nemoguard_active_user", JSON.stringify(selected));
  };

  const loginWithEmail = async (email: string, name?: string, org?: string, role?: string) => {
    const sanitizedEmail = email.trim().toLowerCase();
    const resolvedName = name?.trim() || sanitizedEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Corporate Counsel";
    const resolvedOrg = org?.trim() || "Enterprise Legal Counsel";
    const resolvedRole = (role as any) || "General Counsel";

    const newUser: UserProfile = {
      id: `usr_${sanitizedEmail.replace(/[^a-z0-9]/g, "_")}`,
      name: resolvedName,
      email: sanitizedEmail,
      organization: resolvedOrg,
      role: resolvedRole,
      tier: "Enterprise Legal Suite",
      avatar: "🏛️",
      isGuest: false,
      memberSince: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      jurisdictionPreference: "Delaware / US Federal & EU"
    };

    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("nemoguard_active_user", JSON.stringify(newUser));
    }

    // Persist to Firestore
    try {
      await addDoc(collection(db, "nemoguard_users"), {
        ...newUser,
        lastLogin: serverTimestamp()
      });
    } catch {}
  };

  const signupWithEmail = async (email: string, name: string, org: string, role?: string) => {
    return loginWithEmail(email, name, org, role);
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser: UserProfile = {
      ...user,
      ...updates,
      isGuest: updates.isGuest !== undefined ? updates.isGuest : false // Customizing profile upgrades to verified enterprise counsel
    };
    setUser(updatedUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("nemoguard_active_user", JSON.stringify(updatedUser));
    }

    try {
      await addDoc(collection(db, "nemoguard_users"), {
        ...updatedUser,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.warn("Firestore user update notice:", err);
    }
  };

  const logout = () => {
    loginAsGuest();
  };

  const saveAuditToProfile = async (auditData: Omit<SavedAudit, "id" | "userId" | "timestamp">): Promise<string | null> => {
    if (!user) return null;

    const newAuditId = `audit_${Date.now()}`;
    const formattedTimestamp = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }) + " • " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newRecord: SavedAudit = {
      ...auditData,
      id: newAuditId,
      userId: user.id,
      timestamp: formattedTimestamp
    };

    // Update state & local storage immediately for zero lag (scoped to this specific user.id)
    const updated = [newRecord, ...savedAudits.filter(a => a.id !== newAuditId)];
    setSavedAudits(updated);
    try {
      localStorage.setItem(`nemoguard_audits_${user.id}`, JSON.stringify(updated));
    } catch {}

    // Only persist to Firestore if user is a registered enterprise user (NOT a temporary guest draft)
    try {
      if (!user.isGuest) {
        await addDoc(collection(db, "nemoguard_audits"), {
          ...newRecord,
          isGuest: false,
          createdAt: serverTimestamp()
        });
      }
    } catch (err) {
      console.warn("Firestore audit save fallback:", err);
    }

    return newAuditId;
  };

  const deleteAuditFromProfile = async (auditId: string) => {
    if (!user) return;
    const updated = savedAudits.filter(a => a.id !== auditId);
    setSavedAudits(updated);
    try {
      localStorage.setItem(`nemoguard_audits_${user.id}`, JSON.stringify(updated));
    } catch {}

    try {
      await deleteDoc(doc(db, "nemoguard_audits", auditId));
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        savedAudits,
        loading,
        loginAsGuest,
        loginWithPersona,
        loginWithEmail,
        signupWithEmail,
        updateUserProfile,
        logout,
        saveAuditToProfile,
        deleteAuditFromProfile,
        refreshAudits
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
