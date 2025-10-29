"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function GeneralSettingsPage() {
  const { state, updateGeneralSettings, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('general-settings', 1, 1); // Step 1 of 1 - 100%
  }, [updateModuleProgress]);
  
  // Workflow timer states
  const [requestEscalationDays, setRequestEscalationDays] = useState('99 months');
  const [vendorConfirmation, setVendorConfirmation] = useState('1 day');
  const [vendorLicenseRenewal, setVendorLicenseRenewal] = useState('20 days');
  const [remindLoToSelect, setRemindLoToSelect] = useState('2 days');
  const [remindJmPendingReview, setRemindJmPendingReview] = useState('2 days');
  const [awaitingResubmission, setAwaitingResubmission] = useState('1 day');
  const [vendorSolicitation, setVendorSolicitation] = useState('2 days');
  const [vendorReminder, setVendorReminder] = useState('1 day');
  const [vendorLate, setVendorLate] = useState('On');
  const [reviewerReminder, setReviewerReminder] = useState('1 day');
  const [includeOneStep, setIncludeOneStep] = useState(false);
  const [reviewerLate, setReviewerLate] = useState('On');
  const [remindReviewerJmNotAccepted, setRemindReviewerJmNotAccepted] = useState('2 days');
  const [inspectionFrequency, setInspectionFrequency] = useState('5 days');
  const [selectedBidTemplate, setSelectedBidTemplate] = useState('3-column');

  const handleDaysCalculationChange = (value: 'business' | 'calendar') => {
    updateGeneralSettings({ daysCalculation: value });
  };

  const handleReviewApprovalChange = (checked: boolean) => {
    updateGeneralSettings({ reviewApprovalRequired: checked });
  };

  const handleContinue = () => {
    updateGeneralSettings({ completed: true });
    router.push('/general-settings/complete');
  };

  return (
    <MainLayout 
      currentStep={5} 
      steps={[]}
      title="YouConnect Onboarding"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            General Settings
          </h1>
          <p className="text-base text-muted-foreground">
            Configure core system settings, workflow timers, and bid engagement preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">

        {/* Core Settings */}
        <div className="bg-card border border-border rounded-lg p-5 mb-5">
          <h2 className="text-lg font-semibold text-foreground mb-3">Core Settings</h2>
          
          <div className="space-y-5">
            {/* Days Calculation */}
            <div>
              <label htmlFor="days-calculation" className="block text-sm font-medium text-foreground mb-2">
                How should due dates be calculated?
              </label>
              <select
                id="days-calculation"
                value={state.generalSettings.daysCalculation}
                onChange={(e) => handleDaysCalculationChange(e.target.value as 'business' | 'calendar')}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="business">Business Days (excludes weekends)</option>
                <option value="calendar">Calendar Days (includes weekends)</option>
              </select>
            </div>

            {/* Review Approval */}
            <div className="flex items-start gap-3">
              <input
                id="review-approval"
                type="checkbox"
                checked={state.generalSettings.reviewApprovalRequired}
                onChange={(e) => handleReviewApprovalChange(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                aria-label="Review approval required"
              />
              <label htmlFor="review-approval" className="cursor-pointer">
                <div className="font-medium text-foreground mb-1">Review approval required</div>
                <div className="text-sm text-muted-foreground">
                  Require manager approval before marking reviews as complete
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Workflow Timers */}
        <div className="bg-card border border-border rounded-lg p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Workflow Timers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Left Column */}
            <div>
              <label htmlFor="request-escalation" className="block text-sm font-medium text-foreground mb-1.5">
                Request Escalation Days
              </label>
              <select
                id="request-escalation"
                value={requestEscalationDays}
                onChange={(e) => setRequestEscalationDays(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="99 months">99 months</option>
                <option value="90 days">90 days</option>
                <option value="60 days">60 days</option>
                <option value="30 days">30 days</option>
              </select>
              </div>

            <div>
              <label htmlFor="vendor-solicitation" className="block text-sm font-medium text-foreground mb-1.5">
                Vendor Solicitation
              </label>
              <select
                id="vendor-solicitation"
                value={vendorSolicitation}
                onChange={(e) => setVendorSolicitation(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
                <option value="5 days">5 days</option>
              </select>
            </div>

            <div>
              <label htmlFor="vendor-confirmation" className="block text-sm font-medium text-foreground mb-1.5">
                Vendor Confirmation
              </label>
              <select
                id="vendor-confirmation"
                value={vendorConfirmation}
                onChange={(e) => setVendorConfirmation(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
              </select>
              </div>

            <div>
              <label htmlFor="vendor-reminder" className="block text-sm font-medium text-foreground mb-1.5">
                Vendor Reminder
              </label>
              <select
                id="vendor-reminder"
                value={vendorReminder}
                onChange={(e) => setVendorReminder(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
              </select>
            </div>

            <div>
              <label htmlFor="vendor-license-renewal" className="block text-sm font-medium text-foreground mb-1.5">
                Vendor License Renewal
              </label>
              <select
                id="vendor-license-renewal"
                value={vendorLicenseRenewal}
                onChange={(e) => setVendorLicenseRenewal(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="10 days">10 days</option>
                <option value="15 days">15 days</option>
                <option value="20 days">20 days</option>
                <option value="30 days">30 days</option>
              </select>
            </div>

            <div>
              <label htmlFor="vendor-late-toggle" className="block text-sm font-medium text-foreground mb-1.5">
                Vendor Late
                </label>
              <select
                id="vendor-late-toggle"
                value={vendorLate}
                onChange={(e) => setVendorLate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="On">On</option>
                <option value="Off">Off</option>
              </select>
              </div>

            <div>
              <label htmlFor="remind-lo-select" className="block text-sm font-medium text-foreground mb-1.5">
                Remind LO to Select Every
                </label>
              <select
                id="remind-lo-select"
                value={remindLoToSelect}
                onChange={(e) => setRemindLoToSelect(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
              </select>
              </div>

            <div>
              <label htmlFor="reviewer-reminder" className="block text-sm font-medium text-foreground mb-1.5">
                Reviewer Reminder
              </label>
              <div className="flex gap-2 items-center">
                <select
                  id="reviewer-reminder"
                  value={reviewerReminder}
                  onChange={(e) => setReviewerReminder(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="1 day">1 day</option>
                  <option value="2 days">2 days</option>
                  <option value="3 days">3 days</option>
                </select>
                <label className="flex items-center gap-2 text-xs whitespace-nowrap">
                <input
                  type="checkbox"
                    checked={includeOneStep}
                    onChange={(e) => setIncludeOneStep(e.target.checked)}
                    className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                  />
                  Include 1 step
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="remind-jm-pending" className="block text-sm font-medium text-foreground mb-1.5">
                Remind JM - Pending Review Solicitation
              </label>
              <select
                id="remind-jm-pending"
                value={remindJmPendingReview}
                onChange={(e) => setRemindJmPendingReview(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
              </select>
            </div>

            <div>
              <label htmlFor="reviewer-late-toggle" className="block text-sm font-medium text-foreground mb-1.5">
                Reviewer Late
              </label>
              <select
                id="reviewer-late-toggle"
                value={reviewerLate}
                onChange={(e) => setReviewerLate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="On">On</option>
                <option value="Off">Off</option>
              </select>
            </div>

            <div>
              <label htmlFor="awaiting-resubmission" className="block text-sm font-medium text-foreground mb-1.5">
                Awaiting Resubmission (Awaiting LO)
              </label>
              <select
                id="awaiting-resubmission"
                value={awaitingResubmission}
                onChange={(e) => setAwaitingResubmission(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
              </select>
            </div>

            <div>
              <label htmlFor="remind-reviewer-jm" className="block text-sm font-medium text-foreground mb-1.5">
                Remind Reviewer & JM - Review Assignment Not Accepted
              </label>
              <select
                id="remind-reviewer-jm"
                value={remindReviewerJmNotAccepted}
                onChange={(e) => setRemindReviewerJmNotAccepted(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="inspection-frequency" className="block text-sm font-medium text-foreground mb-1.5">
                Inspection Frequency
              </label>
              <select
                id="inspection-frequency"
                value={inspectionFrequency}
                onChange={(e) => setInspectionFrequency(e.target.value)}
                className="w-full md:w-1/2 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
                <option value="5 days">5 days</option>
                <option value="7 days">7 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bid Engagement Panel */}
        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Bid Engagement Panel Template</h2>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
              Configured by RealWired
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-5">
            Select the template layout for your bid engagement panel. This determines how vendors will view and interact with bid requirements.
          </p>

          <div className="space-y-4">
            {/* 3 Column Template */}
            <label className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent transition-colors">
              <input
                type="radio"
                name="bidTemplate"
                value="3-column"
                checked={selectedBidTemplate === '3-column'}
                onChange={() => setSelectedBidTemplate('3-column')}
                className="w-5 h-5 text-primary border-input mt-1"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">3 Column Layout</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Displays "Inspection Requirements" and "Approach to Value" side by side with a dedicated third column for additional details.
                </p>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <div className="flex-1">
                    <span className="font-medium">Col 1:</span> Inspection Requirements
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Col 2:</span> Approach to Value
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Col 3:</span> Additional Info
                  </div>
                </div>
              </div>
              <div className="w-24 h-16 bg-slate-100 rounded border border-slate-300 flex items-center justify-center flex-shrink-0">
                <div className="flex gap-1">
                  <div className="w-5 h-12 bg-slate-400 rounded"></div>
                  <div className="w-5 h-12 bg-slate-400 rounded"></div>
                  <div className="w-5 h-12 bg-slate-400 rounded"></div>
                </div>
              </div>
            </label>

            {/* 4 Column Template */}
            <label className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent transition-colors">
              <input
                type="radio"
                name="bidTemplate"
                value="4-column"
                checked={selectedBidTemplate === '4-column'}
                onChange={() => setSelectedBidTemplate('4-column')}
                className="w-5 h-5 text-primary border-input mt-1"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">4 Column Layout</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Displays "Inspection Requirements" and "Approach to Value" with "Value Qualifier" in a separate column, plus additional details.
                </p>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <div className="flex-1">
                    <span className="font-medium">Col 1:</span> Inspection Req.
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Col 2:</span> Approach to Value
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Col 3:</span> Value Qualifier
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Col 4:</span> Details
                  </div>
                </div>
              </div>
              <div className="w-24 h-16 bg-slate-100 rounded border border-slate-300 flex items-center justify-center flex-shrink-0">
                <div className="flex gap-0.5">
                  <div className="w-4 h-12 bg-slate-400 rounded"></div>
                  <div className="w-4 h-12 bg-slate-400 rounded"></div>
                  <div className="w-4 h-12 bg-slate-400 rounded"></div>
                  <div className="w-4 h-12 bg-slate-400 rounded"></div>
                </div>
              </div>
            </label>

            {/* Checkboxes Template */}
            <label className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent transition-colors">
              <input
                type="radio"
                name="bidTemplate"
                value="checkboxes"
                checked={selectedBidTemplate === 'checkboxes'}
                onChange={() => setSelectedBidTemplate('checkboxes')}
                className="w-5 h-5 text-primary border-input mt-1"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">Checkboxes Layout</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Uses checkbox selections for "Interest Value", "Value Type", and "Approached Value" with a dedicated field for "If Leased Fee".
                </p>
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <div>☑ Interest Value • Value Type • Approached Value</div>
                  <div><span className="font-medium">Special Field:</span> If Leased Fee (text input)</div>
                </div>
              </div>
              <div className="w-24 h-16 bg-slate-100 rounded border border-slate-300 flex items-center justify-center flex-shrink-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 border-2 border-slate-500 bg-white"></div>
                    <div className="w-10 h-1.5 bg-slate-400 rounded"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 border-2 border-slate-500 bg-white"></div>
                    <div className="w-10 h-1.5 bg-slate-400 rounded"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 border-2 border-slate-500 bg-white"></div>
                    <div className="w-10 h-1.5 bg-slate-400 rounded"></div>
                  </div>
                  <div className="w-14 h-4 bg-slate-300 rounded mt-1"></div>
                </div>
              </div>
            </label>

            {/* Dropdowns Template */}
            <label className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent transition-colors">
              <input
                type="radio"
                name="bidTemplate"
                value="dropdowns"
                checked={selectedBidTemplate === 'dropdowns'}
                onChange={() => setSelectedBidTemplate('dropdowns')}
                className="w-5 h-5 text-primary border-input mt-1"
              />
                <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">Dropdowns Layout</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Dropdown selectors for all fields including "Inspection Requirements", "Approach to Value", with cascading options based on selections.
                </p>
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <div>▼ Inspection Requirements (dropdown)</div>
                  <div>▼ Approach to Value (dropdown)</div>
                  <div>▼ Additional Options (conditional)</div>
                </div>
              </div>
              <div className="w-24 h-16 bg-slate-100 rounded border border-slate-300 flex items-center justify-center flex-shrink-0">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between w-14 px-1 h-3 bg-white border border-slate-400 rounded">
                    <div className="w-8 h-1 bg-slate-400 rounded"></div>
                    <div className="w-0 h-0 border-l-2 border-r-2 border-t-2 border-slate-500" style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopWidth: '3px', borderLeftWidth: '2px', borderRightWidth: '2px' }}></div>
                  </div>
                  <div className="flex items-center justify-between w-14 px-1 h-3 bg-white border border-slate-400 rounded">
                    <div className="w-8 h-1 bg-slate-400 rounded"></div>
                    <div className="w-0 h-0 border-l-2 border-r-2 border-t-2 border-slate-500" style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopWidth: '3px', borderLeftWidth: '2px', borderRightWidth: '2px' }}></div>
                  </div>
                  <div className="flex items-center justify-between w-14 px-1 h-3 bg-white border border-slate-400 rounded">
                    <div className="w-8 h-1 bg-slate-400 rounded"></div>
                    <div className="w-0 h-0 border-l-2 border-r-2 border-t-2 border-slate-500" style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopWidth: '3px', borderLeftWidth: '2px', borderRightWidth: '2px' }}></div>
                  </div>
                </div>
              </div>
            </label>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-900">
              <strong>Note:</strong> This template will be configured by RealWired during your onboarding process. Your selection will be reviewed and finalized by our team.
            </p>
          </div>
        </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => router.push('/hub')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back to Hub
              </button>
              <button 
                onClick={handleContinue}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Educational Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              {/* Why We Need This */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  These settings control how your workflow operates, when notifications are sent, and how team members stay informed. Proper configuration ensures smooth operations and timely communication.
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
                    Video Tutorial (5:00)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    {/* Background image placeholder - corporate people conversing */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: General Settings Configuration">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">General Settings Configuration</p>
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
                    <span className="flex-1 text-left">General Settings Guide.pdf</span>
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>

                {/* Tip Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-xs text-blue-900">
                      <strong>Tip:</strong> Start with recommended defaults and adjust based on experience. All settings can be changed later.
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

