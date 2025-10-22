"use client";

import { useRouter } from "next/navigation";

export default function GeneralSettingsIntroPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50/30 to-slate-100 px-4">
      <div className="w-full max-w-md">
        {/* Card with subtle border accent */}
        <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-[#9F2E2B] p-6 md:p-8">
          {/* Icon with gradient background */}
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#9F2E2B] to-[#7D2522] rounded-xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Title with accent */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Let's Configure General Settings
          </h1>

          {/* Description as bullet points */}
          <p className="text-sm text-slate-600 mb-2">
            Configure the final settings that control your workflow:
          </p>
          <ul className="space-y-1.5 mb-5">
            <li className="flex items-start gap-2 text-slate-600 text-sm">
              <svg className="w-4 h-4 text-[#9F2E2B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Choose between business days or calendar days for deadlines</span>
            </li>
            <li className="flex items-start gap-2 text-slate-600 text-sm">
              <svg className="w-4 h-4 text-[#9F2E2B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Set workflow timers (vendor response, review due dates, late notifications)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-600 text-sm">
              <svg className="w-4 h-4 text-[#9F2E2B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Configure notification preferences (daily emails, escalations, weekend alerts)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-600 text-sm">
              <svg className="w-4 h-4 text-[#9F2E2B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Review bid engagement panel settings (pre-configured by Realwired)</span>
            </li>
          </ul>

          {/* Time Estimate with styled container */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-slate-700 mb-6 border border-slate-200">
            <svg className="w-4 h-4 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Approximate completion time – <strong className="text-slate-900">8 minutes</strong></span>
          </div>

          {/* CTA Button with brand color */}
          <button
            onClick={() => router.push('/general-settings')}
            className="w-full py-3 px-6 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
          >
            Let's Get Started! →
          </button>
        </div>
      </div>
    </div>
  );
}
