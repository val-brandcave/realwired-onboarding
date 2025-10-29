"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding-context";
import { useEffect } from "react";

export default function VendorsCompletePage() {
  const router = useRouter();
  const { markModuleComplete } = useOnboarding();

  useEffect(() => {
    markModuleComplete('vendors');
  }, [markModuleComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-slate-50 px-4">
      <div className="w-full max-w-lg">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-green-500 p-6 md:p-8">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Vendors Module Complete!
          </h1>

          {/* Description */}
          <p className="text-base text-slate-600 mb-6">
            Your vendor network configuration has been submitted. Our CX team will review and configure all vendor details, licenses, and coverage areas.
          </p>

          {/* What's Next Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">What's Next?</h2>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Continue to Routing module to set up order assignment rules</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Configure workflow settings and preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Complete IT readiness checklist</span>
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/hub')}
            className="w-full py-3 px-6 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl"
          >
            Return to Hub
          </button>
        </div>
      </div>
    </div>
  );
}

