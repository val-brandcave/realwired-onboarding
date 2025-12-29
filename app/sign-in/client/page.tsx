"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type CustomerAuthFlow = "email" | "sso";
type AuthStep = "email-input" | "otp-input";

export default function ClientSignInPage() {
  const router = useRouter();
  const [customerFlow, setCustomerFlow] = useState<CustomerAuthFlow>("email");
  const [authStep, setAuthStep] = useState<AuthStep>("email-input");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showCodeSent, setShowCodeSent] = useState(false);

  const validateEmail = (email: string) => {
    const hasAt = email.includes("@");
    const hasDomain = email.split("@")[1]?.includes(".");
    return hasAt && hasDomain;
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setShowCodeSent(true);
    setTimeout(() => {
      setAuthStep("otp-input");
      setShowCodeSent(false);
    }, 800);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      router.push("/welcome");
    }
  };

  const handleChangeEmail = () => {
    setAuthStep("email-input");
    setOtp("");
  };

  const handleResendCode = () => {
    setShowCodeSent(true);
    setTimeout(() => setShowCodeSent(false), 2000);
  };

  const handleCustomerSSO = () => {
    router.push("/hub");
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
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Bank Sign In</h1>
              <p className="text-sm text-slate-600">
                Primary Onboarding Manager Access
              </p>
            </div>

            {/* Auth Content */}
            <div className="px-6 pb-6">
              {customerFlow === "email" && authStep === "email-input" && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Work email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                      }}
                      placeholder="name@company.com"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] transition-all ${
                        emailError ? "border-red-500" : "border-slate-300"
                      }`}
                    />
                    {emailError && (
                      <p className="mt-1.5 text-sm text-red-600">{emailError}</p>
                    )}
                    {showCodeSent && (
                      <p className="mt-1.5 text-sm text-green-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Code sent to {email}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleSendCode}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg"
                  >
                    Send access code
                  </button>

                  <button
                    onClick={() => setCustomerFlow("sso")}
                    className="w-full text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  >
                    Use Org SSO instead
                  </button>
                </div>
              )}

              {customerFlow === "email" && authStep === "otp-input" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Enter access code</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      We sent a 6-digit code to <span className="font-medium">{email}</span>
                    </p>
                    
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] text-center text-2xl font-mono tracking-widest"
                    />
                    {showCodeSent && (
                      <p className="mt-2 text-sm text-green-600 flex items-center gap-1 justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Code resent
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 6}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Verify & continue
                  </button>

                  <div className="flex items-center justify-center gap-4 text-sm">
                    <button
                      onClick={handleChangeEmail}
                      className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                      Change email
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      onClick={handleResendCode}
                      className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                      Resend code
                    </button>
                  </div>
                </div>
              )}

              {customerFlow === "sso" && (
                <div className="space-y-5">
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-600 mb-6">
                      Sign in with your organization's SSO provider to access your onboarding workspace.
                    </p>
                    
                    <button
                      onClick={handleCustomerSSO}
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg"
                    >
                      Continue with Org SSO
                    </button>

                    <button
                      onClick={() => setCustomerFlow("email")}
                      className="w-full mt-3 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                      ← Back to email access code
                    </button>
                  </div>
                </div>
              )}
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
      <footer className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-slate-200 bg-white/90 backdrop-blur-sm">
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

