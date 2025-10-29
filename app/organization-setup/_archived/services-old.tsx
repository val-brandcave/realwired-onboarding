"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding, type OrganizationSetupData } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useEffect } from "react";

export default function OrganizationSetupPage() {
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
    router.push('/organization-setup/org-info');
  };

  const steps = [
    { id: '1', label: 'Services', status: 'in_progress' as const },
    { id: '2', label: 'Organization Info', status: 'not_started' as const },
    { id: '3', label: 'Branding', status: 'not_started' as const },
    { id: '4', label: 'Participants', status: 'not_started' as const },
    { id: '5', label: 'IT Config', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={0} 
      steps={steps}
      title="Organization Setup"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Organization Setup
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
                onClick={() => router.push('/')}
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
                {canProceed ? 'Next →' : 'Select at least one service'}
              </button>
            </div>
          </div>

          {/* Right Column: Educational Panel (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-foreground text-sm">Why This Matters</h3>
              </div>
              
              <p className="text-xs text-muted-foreground mb-4">
                Your service selection determines which workflows, forms, and routing options are available. This ensures YouConnect shows only what's relevant to your organization.
              </p>

              {/* Service Definitions */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Residential Appraisals
                  </h4>
                  <p className="text-xs text-muted-foreground mb-1.5">
                    Property valuations for homes and residential units to support mortgage lending decisions.
                  </p>
                  <div className="text-xs text-muted-foreground bg-card/50 rounded p-1.5 border border-border">
                    <strong className="text-foreground">Example orgs:</strong> Community banks, credit unions, mortgage lenders focusing on home loans
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground text-xs mb-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Commercial Appraisals
                  </h4>
                  <p className="text-xs text-muted-foreground mb-1.5">
                    Valuations for commercial real estate including office, retail, industrial, and multi-family properties.
                  </p>
                  <div className="text-xs text-muted-foreground bg-card/50 rounded p-1.5 border border-border">
                    <strong className="text-foreground">Example orgs:</strong> Commercial lenders, regional banks, investment firms with CRE portfolios
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground text-xs mb-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Environmental Reviews
                  </h4>
                  <p className="text-xs text-muted-foreground mb-1.5">
                    Environmental site assessments to identify potential contamination or hazards before property transactions.
                  </p>
                  <div className="text-xs text-muted-foreground bg-card/50 rounded p-1.5 border border-border">
                    <strong className="text-foreground">Example orgs:</strong> Banks with industrial/commercial portfolios, lenders in regulated industries
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground text-xs mb-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0121 12c0 .441-.02.877-.058 1.31M16.5 8.5A7.5 7.5 0 1012 20.5a7.5 7.5 0 004.5-1.5m0 0a11.95 11.95 0 01-4.5 1.5 11.95 11.95 0 01-4.5-1.5" />
                    </svg>
                    External Reviews
                  </h4>
                  <p className="text-xs text-muted-foreground mb-1.5">
                    Quality control reviews of third-party appraisals to ensure compliance and accuracy.
                  </p>
                  <div className="text-xs text-muted-foreground bg-card/50 rounded p-1.5 border border-border">
                    <strong className="text-foreground">Example orgs:</strong> Lenders using external appraisal management companies, banks with compliance review teams
                  </div>
                </div>

                {/* Common Combinations */}
                <div className="pt-3 border-t border-border">
                  <h4 className="font-medium text-foreground text-xs mb-2">Common Combinations</h4>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong className="text-foreground">Residential only:</strong> Community banks, credit unions</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong className="text-foreground">Residential + Commercial:</strong> Regional banks, full-service lenders</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong className="text-foreground">All services:</strong> Large banks with diverse portfolios and strict compliance requirements</span>
                    </div>
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

