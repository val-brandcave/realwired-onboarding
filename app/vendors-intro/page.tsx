"use client";

import { useRouter } from "next/navigation";

export default function VendorsIntroPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50/30 to-slate-100 px-4">
      <div className="w-full max-w-md">
        {/* Card with subtle border accent */}
        <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-[#9F2E2B] p-6 md:p-8">
          {/* Icon with gradient background */}
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#9F2E2B] to-[#7D2522] rounded-xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>

          {/* Title with accent */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Let's Setup Your Vendors
          </h1>

          {/* Description as bullet points */}
          <p className="text-sm text-slate-600 mb-2">
            We've simplified vendor setup with a template-based approach:
          </p>
          <ul className="space-y-1.5 mb-5">
            <li className="flex items-start gap-2 text-slate-600 text-sm">
              <svg className="w-4 h-4 text-[#9F2E2B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Download the vendor template spreadsheet</span>
            </li>
            <li className="flex items-start gap-2 text-slate-600 text-sm">
              <svg className="w-4 h-4 text-[#9F2E2B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fill in vendor details, licenses, and coverage areas</span>
            </li>
            <li className="flex items-start gap-2 text-slate-600 text-sm">
              <svg className="w-4 h-4 text-[#9F2E2B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Schedule a call with our CX team (optional)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-600 text-sm">
              <svg className="w-4 h-4 text-[#9F2E2B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Upload template - we'll configure everything</span>
            </li>
          </ul>

          {/* Time Estimate with styled container */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-slate-700 mb-6 border border-slate-200">
            <svg className="w-4 h-4 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Approximate completion time – <strong className="text-slate-900">5 minutes</strong></span>
          </div>

          {/* CTA Button with brand color */}
          <button
            onClick={() => router.push('/vendors')}
            className="w-full py-3 px-6 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
          >
            Let's Get Started! →
          </button>
        </div>
      </div>
    </div>
  );
}

