"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50 px-4">
      <div className="max-w-5xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6">
            <img 
              src="/realwired-logo.png" 
              alt="RealWired Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            YouConnect Onboarding
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Welcome to YouConnect Onboarding experience! Choose your role below to access the appropriate interface and begin your journey.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tenant Onboarding Application Card */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all hover:border-[#9F2E2B] group">
            <div className="p-8">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#9F2E2B] to-[#7D2522] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Tenant Onboarding Application
              </h2>
              <p className="text-slate-600 mb-6">
                Set up your YouConnect instance step-by-step. Configure organization settings, define workflows, manage teams, and complete onboarding.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => router.push("/hub")}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* YouConnect CX Portal Card */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all hover:border-blue-500 group">
            <div className="p-8">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                YouConnect CX Portal
              </h2>
              <p className="text-slate-600 mb-6">
                Customer Experience portal for managing tenant onboarding. Monitor progress, track tickets, provide support, and guide clients through their setup.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => router.push("/cx-portal")}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Access Portal</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500">
            This is a proof of concept for RealWired's YouConnect onboarding experience and is subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}
