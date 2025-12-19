"use client";

import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  // Mock demo data
  const welcomeData = {
    organization: "Union Bank",
    role: "Primary Onboarding Manager",
    userName: "John Smith",
    goLiveTarget: "Jan 30, 2026",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Main Content - Centered Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src="/realwired-logo.png" 
                  alt="RealWired Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
              Welcome to YouConnect Onboarding
            </h1>
            <p className="text-sm text-slate-600 text-center mb-8">
              Your account has been verified. Here's what we have on file for you:
            </p>

            {/* Details Block */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <svg className="w-5 h-5 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Organization
                  </div>
                  <div className="text-base font-semibold text-slate-900">
                    {welcomeData.organization}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <svg className="w-5 h-5 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Name
                  </div>
                  <div className="text-base font-semibold text-slate-900">
                    {welcomeData.userName}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <svg className="w-5 h-5 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Role
                  </div>
                  <div className="text-base font-semibold text-slate-900">
                    {welcomeData.role}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <svg className="w-5 h-5 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Go-live target
                  </div>
                  <div className="text-base font-semibold text-slate-900">
                    {welcomeData.goLiveTarget}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => router.push("/hub")}
              className="w-full px-6 py-3.5 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Start onboarding</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer with Demo Shortcuts */}
      <footer className="w-full px-4 py-4 border-t border-slate-200 bg-white/50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-slate-500">Shortcuts for prototype demo only</span>
          </div>
          <button
            onClick={() => router.push("/hub")}
            className="px-3 py-1.5 text-xs font-medium text-[#9F2E2B] hover:text-white hover:bg-[#9F2E2B] border border-[#9F2E2B] rounded-md transition-colors"
          >
            Customer Onboarding
          </button>
          <button
            onClick={() => router.push("/cs-portal")}
            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 rounded-md transition-colors"
          >
            CS Portal
          </button>
        </div>
      </footer>
    </div>
  );
}

