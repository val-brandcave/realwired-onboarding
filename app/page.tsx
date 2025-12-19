"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthTab = "customer" | "cs";
type CustomerAuthFlow = "email" | "sso";
type AuthStep = "email-input" | "otp-input";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AuthTab>("customer");
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

    // Show success message and transition to OTP input
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
    // Returning customer - skip welcome
    router.push("/hub");
  };

  const handleCSSSO = () => {
    router.push("/cs-portal");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Main Content - Centered Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Sign-In Card */}
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
              <h1 className="text-2xl font-bold text-slate-900 mb-1">YouConnect Onboarding</h1>
              <p className="text-sm text-slate-600">
                Secure access to onboarding and configuration
              </p>
            </div>

            {/* Segmented Control */}
            <div className="px-6 mb-6">
              <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
                <button
                  onClick={() => setActiveTab("customer")}
                  className={`flex-1 px-6 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    activeTab === "customer"
                      ? "bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Customer Access
                </button>
                <button
                  onClick={() => setActiveTab("cs")}
                  className={`flex-1 px-6 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    activeTab === "cs"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  CS Team Access
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="px-6 pb-6">
              {/* Customer Tab */}
              {activeTab === "customer" && (
                <div className="space-y-5">
                  {customerFlow === "email" && authStep === "email-input" && (
                    <>
                      {/* Email Input State */}
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
                    </>
                  )}

                  {customerFlow === "email" && authStep === "otp-input" && (
                    <>
                      {/* OTP Input State */}
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
                    </>
                  )}

                  {customerFlow === "sso" && (
                    <>
                      {/* Customer SSO Flow */}
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
                    </>
                  )}
                </div>
              )}

              {/* CS Team Tab */}
              {activeTab === "cs" && (
                <div className="space-y-5 py-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Customer Success Team Portal
                    </h3>
                    <p className="text-sm text-slate-600 mb-6">
                      Internal access for managing onboarding and configuration
                    </p>
                  </div>

                  <button
                    onClick={handleCSSSO}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Continue with Org SSO
                  </button>

                  <p className="text-xs text-center text-slate-500">
                    For approved CS team members only
                  </p>
                </div>
              )}
            </div>
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
