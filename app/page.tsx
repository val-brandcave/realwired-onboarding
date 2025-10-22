"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect directly to Iteration 2 (Module 1 entry)
    router.push("/organization-setup-intro");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-red-50">
      <div className="text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#9F2E2B] to-[#7D2522] rounded-2xl mb-4 shadow-lg">
          <span className="text-white font-bold text-3xl">YC</span>
        </div>
        
        {/* Loading Message */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          YouConnect Onboarding
        </h1>
        <p className="text-slate-600">
          Loading your onboarding experience...
        </p>
        
        {/* Spinner */}
        <div className="mt-6">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#9F2E2B] border-r-transparent"></div>
        </div>
      </div>
    </div>
  );
}
