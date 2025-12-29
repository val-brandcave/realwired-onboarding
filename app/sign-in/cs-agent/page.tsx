"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CSAgentSignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCSSSO = () => {
    router.push("/cs-portal");
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock sign-in
    router.push("/cs-portal");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Logo and Title */}
            <div className="pt-8 pb-6 px-6 text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <img 
                  src="/realwired-logo.png" 
                  alt="RealWired Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">CS Team Sign In</h1>
              <p className="text-sm text-slate-600">
                Customer Success Team Agent Access
              </p>
            </div>

            {/* Auth Content */}
            <div className="px-6 pb-6">
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Internal Team Access
                  </h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Sign in with your RealWired credentials to access the CS Portal
                  </p>
                </div>

                <button
                  onClick={handleCSSSO}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Continue with RealWired SSO
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-slate-500">Or sign in with email</span>
                  </div>
                </div>

                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div>
                    <label htmlFor="cs-email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      id="cs-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="agent@realwired.com"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="cs-password" className="block text-sm font-medium text-slate-700 mb-2">
                      Password
                    </label>
                    <input
                      id="cs-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Sign In
                  </button>
                </form>

                <p className="text-xs text-center text-slate-500">
                  For approved CS team members only
                </p>
              </div>
            </div>
          </div>

          {/* Back to Role Selection */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2 mx-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to role selection
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-4 py-3 border-t border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap text-xs text-slate-500">
          <span>Quick demo access:</span>
          <button
            onClick={() => router.push("/hub")}
            className="px-2 py-1 text-[#9F2E2B] hover:text-white hover:bg-[#9F2E2B] border border-[#9F2E2B] rounded transition-colors"
          >
            Hub
          </button>
          <button
            onClick={() => router.push("/cs-portal")}
            className="px-2 py-1 text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 rounded transition-colors"
          >
            CS Portal
          </button>
        </div>
      </footer>
    </div>
  );
}

