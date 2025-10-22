"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrganizationSetupRequestTypesPage() {
  const { state, updateDefinitions, updateCompanySetup } = useOnboarding();
  const router = useRouter();
  const [twoStepExpanded, setTwoStepExpanded] = useState(false);
  const [oneStepExpanded, setOneStepExpanded] = useState(false);
  
  // Local state for checkbox selections
  const [has2Step, setHas2Step] = useState(true); // Default to true
  const [has1Step, setHas1Step] = useState(false);

  const canProceed = has2Step || has1Step;

  const handleContinue = () => {
    if (!canProceed) return;
    // Update request processes in context
    const updated = state.definitions.requestTypes.map(rt => {
      if (rt.id === 'appraisal-2step') return { ...rt, enabled: has2Step };
      if (rt.id === 'review-only') return { ...rt, enabled: has1Step };
      return rt;
    });
    updateDefinitions({ requestTypes: updated });
    router.push('/organization-setup/regions');
  };

  const handleBack = () => {
    router.push('/organization-setup');
  };

  const steps = [
    { id: '1', label: 'Services', status: 'completed' as const },
    { id: '2', label: 'Request Processes', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={1} 
      steps={steps}
      title="Organization Setup"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Select Your Request Processes
          </h1>
          <p className="text-base text-muted-foreground">
            Choose the types of request processes your organization will use in YouConnect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="space-y-3 mb-6">
              {/* 2-Step Appraisal */}
              <div 
                className={`relative p-5 border-2 rounded-xl transition-all ${
                  has2Step 
                    ? 'bg-primary/5 border-primary' 
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={has2Step}
                    onChange={(e) => setHas2Step(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#9F2E2B] border-input rounded focus:ring-2 focus:ring-[#9F2E2B]"
                    aria-label="2-Step Appraisal Process"
                  />
                  <div className="flex-1">
                    <div className="text-base font-semibold text-foreground mb-1">2-Step Appraisal Process</div>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Full-service workflow:</strong> YouConnect manages vendor engagement, assignment, and review.
                    </p>
                  </div>
                  {has2Step && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Best For */}
                <div>
                  <div className="text-xs font-medium text-foreground mb-1.5">Best for</div>
                  <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
                    <span>Banks managing vendor panels</span>
                    <span className="text-border">|</span>
                    <span>Full appraisal lifecycle control</span>
                    <span className="text-border">|</span>
                    <span>Quality assurance requirements</span>
                  </div>
                </div>
              </div>

              {/* 1-Step Review Only */}
              <div 
                className={`relative p-5 border-2 rounded-xl transition-all ${
                  has1Step 
                    ? 'bg-primary/5 border-primary' 
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={has1Step}
                    onChange={(e) => setHas1Step(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                    aria-label="1-Step Review Only"
                  />
                  <div className="flex-1">
                    <div className="text-base font-semibold text-foreground mb-1">1-Step Review Only</div>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Streamlined workflow:</strong> Review reports from external sources without vendor management.
                    </p>
                  </div>
                  {has1Step && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Best For */}
                <div>
                  <div className="text-xs font-medium text-foreground mb-1.5">Best for</div>
                  <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
                    <span>External AMC relationships</span>
                    <span className="text-border">|</span>
                    <span>Compliance-only reviews</span>
                    <span className="text-border">|</span>
                    <span>Simplified workflows</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBack}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                disabled={!canProceed}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors ${
                  canProceed
                    ? 'text-primary-foreground bg-primary hover:bg-primary/90'
                    : 'text-muted-foreground bg-muted cursor-not-allowed'
                }`}
              >
                {canProceed ? 'Next →' : 'Select at least one type'}
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
                <h3 className="font-semibold text-sm text-foreground">Understanding Request Processes</h3>
              </div>
              
              <p className="text-xs text-muted-foreground mb-4">
                Request processes define how orders flow through your system. Choosing the right processes ensures your team has the workflows they need.
              </p>

              {/* Why This Matters */}
              <div className="mb-4 pb-4 border-b border-border">
                <h4 className="font-medium text-foreground text-xs mb-2">Why This Matters</h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Determines available workflows and forms</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Controls vendor management features</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Sets up routing and assignment logic</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Impacts reporting and compliance tracking</span>
                  </li>
                </ul>
              </div>

              {/* 2-Step Accordion */}
              <div className="mb-4 pb-4 border-b border-border">
                <button
                  onClick={() => setTwoStepExpanded(!twoStepExpanded)}
                  className="w-full flex items-start justify-between gap-2 text-left group"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-xs mb-1 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      2-Step Process
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      A comprehensive workflow where YouConnect manages the entire appraisal lifecycle.
                    </p>
                  </div>
                  <svg 
                    className={`w-3.5 h-3.5 text-muted-foreground flex-shrink-0 transition-transform ${twoStepExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {twoStepExpanded && (
                  <div className="mt-3 space-y-3">
                    {/* Vertical Flow Diagram */}
                    <div className="text-xs">
                      <div className="font-medium text-foreground mb-2">How it's used</div>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="font-medium text-foreground text-xs">Loan officer submits order</div>
                          </div>
                        </div>
                        <div className="ml-3 border-l-2 border-primary/20 h-3"></div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="font-medium text-foreground text-xs">System assigns to vendor</div>
                          </div>
                        </div>
                        <div className="ml-3 border-l-2 border-primary/20 h-3"></div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="font-medium text-foreground text-xs">Vendor completes report</div>
                          </div>
                        </div>
                        <div className="ml-3 border-l-2 border-primary/20 h-3"></div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="font-medium text-foreground text-xs">Internal reviewer evaluates</div>
                          </div>
                        </div>
                        <div className="ml-3 border-l-2 border-primary/20 h-3"></div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="font-medium text-foreground text-xs">Final approval/rejection</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Example Scenarios as Cards */}
                    <div>
                      <div className="font-medium text-foreground mb-1.5 text-xs">Example scenarios</div>
                      <div className="grid grid-cols-1 gap-1.5">
                        <div className="bg-card/50 rounded p-1.5 border border-border flex items-start gap-1.5">
                          <svg className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="text-xs text-muted-foreground">Community bank with 3 job managers overseeing 20 vendors</span>
                        </div>
                        <div className="bg-card/50 rounded p-1.5 border border-border flex items-start gap-1.5">
                          <svg className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          <span className="text-xs text-muted-foreground">Credit union managing residential appraisals in-house</span>
                        </div>
                        <div className="bg-card/50 rounded p-1.5 border border-border flex items-start gap-1.5">
                          <svg className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0121 12c0 .441-.02.877-.058 1.31M16.5 8.5A7.5 7.5 0 1012 20.5a7.5 7.5 0 004.5-1.5m0 0a11.95 11.95 0 01-4.5 1.5 11.95 11.95 0 01-4.5-1.5" />
                          </svg>
                          <span className="text-xs text-muted-foreground">Regional bank requiring dual reviews for high-value loans</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 1-Step Accordion */}
              <div className="mb-4">
                <button
                  onClick={() => setOneStepExpanded(!oneStepExpanded)}
                  className="w-full flex items-start justify-between gap-2 text-left group"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-xs mb-1 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      1-Step Review Only
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      A simplified workflow for reviewing appraisals from external channels.
                    </p>
                  </div>
                  <svg 
                    className={`w-3.5 h-3.5 text-muted-foreground flex-shrink-0 transition-transform ${oneStepExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {oneStepExpanded && (
                  <div className="mt-3 space-y-3">
                    {/* Vertical Flow Diagram */}
                    <div className="text-xs">
                      <div className="font-medium text-foreground mb-2">How it's used</div>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="font-medium text-foreground text-xs">Report arrives from external source</div>
                          </div>
                        </div>
                        <div className="ml-3 border-l-2 border-primary/20 h-3"></div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="font-medium text-foreground text-xs">System assigns to reviewer</div>
                          </div>
                        </div>
                        <div className="ml-3 border-l-2 border-primary/20 h-3"></div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="font-medium text-foreground text-xs">Reviewer evaluates report</div>
                          </div>
                        </div>
                        <div className="ml-3 border-l-2 border-primary/20 h-3"></div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="font-medium text-foreground text-xs">Approval/rejection decision</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Example Scenarios as Cards */}
                    <div>
                      <div className="font-medium text-foreground mb-1.5 text-xs">Example scenarios</div>
                      <div className="grid grid-cols-1 gap-1.5">
                        <div className="bg-card/50 rounded p-1.5 border border-border flex items-start gap-1.5">
                          <svg className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="text-xs text-muted-foreground">Bank using external AMC but needs internal QC</span>
                        </div>
                        <div className="bg-card/50 rounded p-1.5 border border-border flex items-start gap-1.5">
                          <svg className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0121 12c0 .441-.02.877-.058 1.31M16.5 8.5A7.5 7.5 0 1012 20.5a7.5 7.5 0 004.5-1.5m0 0a11.95 11.95 0 01-4.5 1.5 11.95 11.95 0 01-4.5-1.5" />
                          </svg>
                          <span className="text-xs text-muted-foreground">Lender with existing vendor contracts outside YouConnect</span>
                        </div>
                        <div className="bg-card/50 rounded p-1.5 border border-border flex items-start gap-1.5">
                          <svg className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 3h8m-8 4h8m-4 4h4" />
                          </svg>
                          <span className="text-xs text-muted-foreground">Compliance team reviewing externally-sourced reports</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Note */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <svg className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong className="text-foreground">Note:</strong> Most organizations select both types to handle different scenarios. You can always enable/disable later.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

