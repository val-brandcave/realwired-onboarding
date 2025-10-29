"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding, type OrganizationSetupData } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useEffect } from "react";

export default function ServicesPage() {
  const { state, updateCompanySetup } = useOnboarding();
  const router = useRouter();
  const firstCheckboxRef = useRef<HTMLInputElement>(null);

  // Focus first checkbox on mount for accessibility
  useEffect(() => {
    firstCheckboxRef.current?.focus();
  }, []);

  const canProceed = useMemo(() => {
    return (
      state.companySetup.hasResidentialAppraisals ||
      state.companySetup.hasCommercialAppraisals ||
      state.companySetup.hasEnvironmental ||
      state.companySetup.hasExternalReviews
    );
  }, [state.companySetup]);

  const onToggleService = (key: keyof OrganizationSetupData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCompanySetup({ [key]: e.target.checked });
  };

  const handleContinue = () => {
    if (!canProceed) return;
    router.push('/organization-setup/complete');
  };

  const handleBack = () => {
    router.push('/organization-setup/it-config');
  };

  const steps = [
    { id: '1', label: 'Organization Info', status: 'completed' as const },
    { id: '2', label: 'Branding', status: 'completed' as const },
    { id: '3', label: 'Participants', status: 'completed' as const },
    { id: '4', label: 'IT Config', status: 'completed' as const },
    { id: '5', label: 'Services', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={4} 
      steps={steps}
      title="Organization Setup"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Services Offered
          </h1>
          <p className="text-base text-muted-foreground">
            Tell us about the services you offer so we can personalize your YouConnect experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Main Card */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">
                    What kind of services does your organization offer?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Select all that apply. We'll customize your workflow based on your selections.
                  </p>
                </div>
              </div>

              {/* Service Selection Cards */}
              <div className="space-y-2.5">
                {/* Residential Appraisals */}
                <label 
                  className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    state.companySetup.hasResidentialAppraisals 
                      ? 'bg-primary/5 border-primary' 
                      : 'bg-background border-border hover:border-primary/30'
                  }`}
                >
                  <input
                    ref={firstCheckboxRef}
                    type="checkbox"
                    checked={state.companySetup.hasResidentialAppraisals}
                    onChange={onToggleService('hasResidentialAppraisals')}
                    className="mt-0.5 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                    aria-label="We do residential appraisals"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <div className="font-medium text-foreground text-sm">Residential Appraisals</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Single-family homes, condos, townhouses, and other residential properties
                    </div>
                  </div>
                  {state.companySetup.hasResidentialAppraisals && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>

                {/* Commercial Appraisals */}
                <label 
                  className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    state.companySetup.hasCommercialAppraisals 
                      ? 'bg-primary/5 border-primary' 
                      : 'bg-background border-border hover:border-primary/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={state.companySetup.hasCommercialAppraisals}
                    onChange={onToggleService('hasCommercialAppraisals')}
                    className="mt-0.5 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                    aria-label="We do commercial appraisals"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div className="font-medium text-foreground text-sm">Commercial Appraisals</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Office buildings, retail spaces, industrial properties, and commercial real estate
                    </div>
                  </div>
                  {state.companySetup.hasCommercialAppraisals && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>

                {/* Environmental Reviews */}
                <label 
                  className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    state.companySetup.hasEnvironmental 
                      ? 'bg-primary/5 border-primary' 
                      : 'bg-background border-border hover:border-primary/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={state.companySetup.hasEnvironmental}
                    onChange={onToggleService('hasEnvironmental')}
                    className="mt-0.5 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                    aria-label="We do environmental reviews"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="font-medium text-foreground text-sm">Environmental Reviews</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Environmental site assessments, Phase I/II reports, and contamination reviews
                    </div>
                  </div>
                  {state.companySetup.hasEnvironmental && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>

                {/* External Reviews */}
                <label 
                  className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    state.companySetup.hasExternalReviews 
                      ? 'bg-primary/5 border-primary' 
                      : 'bg-background border-border hover:border-primary/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={state.companySetup.hasExternalReviews}
                    onChange={onToggleService('hasExternalReviews')}
                    className="mt-0.5 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                    aria-label="We do external reviews"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0121 12c0 .441-.02.877-.058 1.31M16.5 8.5A7.5 7.5 0 1012 20.5a7.5 7.5 0 004.5-1.5m0 0a11.95 11.95 0 01-4.5 1.5 11.95 11.95 0 01-4.5-1.5" />
                      </svg>
                      <div className="font-medium text-foreground text-sm">External Reviews</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Third-party document reviews, compliance checks, and quality assurance reviews
                    </div>
                  </div>
                  {state.companySetup.hasExternalReviews && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBack}
                className="px-3 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                disabled={!canProceed}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all ${
                  canProceed
                    ? 'text-primary-foreground bg-primary hover:bg-primary/90'
                    : 'text-muted-foreground bg-muted cursor-not-allowed'
                }`}
              >
                {canProceed ? 'Complete Setup →' : 'Select at least one service'}
              </button>
            </div>
          </div>

          {/* Right Column: Educational Panel (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              {/* Why We Need This */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Your service selection determines which workflows, forms, and routing options are available. This ensures YouConnect shows only what's relevant to your organization.
                </p>
              </div>

              <div className="space-y-4">
                {/* Video Tutorial */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video Tutorial (3:30)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    {/* Background image placeholder - corporate people conversing */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Choosing Your Services">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Choosing Your Services</p>
                    </div>
                  </div>
                </div>

                {/* Resource Guide */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Resource Guide
                  </h4>
                  <button 
                    onClick={() => {
                      // Download logic here
                      console.log('Downloading PDF...');
                    }}
                    className="w-full px-3 py-2 text-xs font-medium text-foreground bg-card hover:bg-accent border border-border rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="flex-1 text-left">Service Selection Guide.pdf</span>
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>

                {/* Note Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-blue-900">
                      <strong>Note:</strong> You can enable or disable services at any time. Most organizations start with residential and add more later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

