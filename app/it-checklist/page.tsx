"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ITChecklist() {
  const router = useRouter();
  const { state, updateITChecklist } = useOnboarding();
  const [emailDomains, setEmailDomains] = useState(state.itChecklist.emailDomainsAllowlisted);
  const [urlAccess, setUrlAccess] = useState(state.itChecklist.urlAccessVerified);

  const handleContinue = () => {
    updateITChecklist({
      emailDomainsAllowlisted: emailDomains,
      urlAccessVerified: urlAccess,
      completed: true,
    });
    router.push('/it-checklist/complete');
  };

  const canProceed = emailDomains && urlAccess;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/hub')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Hub</span>
          </button>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">IT Readiness Checklist</h1>
          <p className="text-slate-600">
            Verify that your IT team has completed these essential setup tasks to ensure smooth access for your team.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          {/* Info Banner */}
          <div className="bg-blue-50 border-b border-blue-100 p-4 rounded-t-xl">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Why is this important?</p>
                <p>These IT configurations are critical for ensuring your team can send and receive emails from YouConnect, and that all users can access the platform from your organization's network.</p>
              </div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="p-6 space-y-6">
            {/* Item 1: Email Domains */}
            <div className="border border-slate-200 rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <input
                    type="checkbox"
                    id="email-domains"
                    checked={emailDomains}
                    onChange={(e) => setEmailDomains(e.target.checked)}
                    className="w-5 h-5 text-[#9F2E2B] border-slate-300 rounded focus:ring-[#9F2E2B] cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="email-domains" className="flex items-center gap-2 cursor-pointer mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">Email Domains Allowlisted</h3>
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </label>
                  <p className="text-slate-600 mb-3 text-sm">
                    Your IT team must allowlist these email domains to ensure you can send and receive notifications from YouConnect:
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 mb-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <code className="font-mono text-slate-700">@[yourbank].realwired.com</code>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <code className="font-mono text-slate-700">no-reply@[yourbank].realwired.com</code>
                      </li>
                    </ul>
                  </div>
                  <p className="text-xs text-slate-500">
                    <strong>Action required:</strong> Forward this information to your IT department for email server configuration.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 2: URL Access */}
            <div className="border border-slate-200 rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <input
                    type="checkbox"
                    id="url-access"
                    checked={urlAccess}
                    onChange={(e) => setUrlAccess(e.target.checked)}
                    className="w-5 h-5 text-[#9F2E2B] border-slate-300 rounded focus:ring-[#9F2E2B] cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="url-access" className="flex items-center gap-2 cursor-pointer mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">URL Access Verified</h3>
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </label>
                  <p className="text-slate-600 mb-3 text-sm">
                    Ensure your team can access the YouConnect platform from your organization's network:
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <code className="font-mono text-slate-700">https://[yourbank].youconnect.com</code>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    <strong>Action required:</strong> Verify that your firewall/proxy allows access to this URL. Test by having a team member access the platform from your network.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Summary */}
          {canProceed && (
            <div className="bg-green-50 border-t border-green-100 p-4">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-green-900">
                  All IT requirements confirmed! You're ready to continue.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!canProceed}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              canProceed
                ? 'bg-[#9F2E2B] hover:bg-[#8A2825] text-white shadow-md hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Complete IT Checklist →
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

