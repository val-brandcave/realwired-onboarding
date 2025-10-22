"use client";

import { useRouter } from "next/navigation";

export default function ITChecklistIntro() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-slate-200">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Let's Check IT Readiness
        </h1>

        {/* Description */}
        <p className="text-slate-600 mb-6 leading-relaxed">
          Before you go live, we need to confirm that your IT team has completed two essential setup tasks to ensure your team can access YouConnect without issues.
        </p>

        {/* Time Estimate */}
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Estimated time: 2 minutes</span>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push('/it-checklist')}
          className="w-full bg-[#9F2E2B] hover:bg-[#8A2825] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Let's Get Started!
        </button>
      </div>
    </div>
  );
}

