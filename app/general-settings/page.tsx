"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function GeneralSettingsPage() {
  const { state, updateGeneralSettings } = useOnboarding();
  const router = useRouter();
  
  const [vendorResponseDays, setVendorResponseDays] = useState(state.generalSettings.timers.vendorResponseDays);
  const [reviewDueDateDays, setReviewDueDateDays] = useState(state.generalSettings.timers.reviewDueDateDays);
  const [vendorLateDays, setVendorLateDays] = useState(state.generalSettings.timers.vendorLateDays);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSave = (timerUpdates: Partial<typeof state.generalSettings.timers>) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      updateGeneralSettings({ timers: { ...state.generalSettings.timers, ...timerUpdates } });
    }, 250);
  };

  const handleVendorResponseChange = (value: number) => {
    const clamped = Math.max(1, Math.min(10, value));
    setVendorResponseDays(clamped);
    debouncedSave({ vendorResponseDays: clamped });
  };

  const handleReviewDueDateChange = (value: number) => {
    const clamped = Math.max(1, Math.min(14, value));
    setReviewDueDateDays(clamped);
    debouncedSave({ reviewDueDateDays: clamped });
  };

  const handleVendorLateChange = (value: number) => {
    const clamped = Math.max(3, Math.min(15, value));
    setVendorLateDays(clamped);
    debouncedSave({ vendorLateDays: clamped });
  };

  const handleToggle = (key: keyof typeof state.generalSettings.timers) => (checked: boolean) => {
    updateGeneralSettings({ timers: { ...state.generalSettings.timers, [key]: checked } });
  };

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
      showWalkthrough={false}
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

          <div className="space-y-5">
            {/* Vendor Response */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="vendor-response-slider" className="text-sm font-medium text-foreground">Vendor Response Time</label>
                <span className="text-sm font-semibold text-primary">{vendorResponseDays} days</span>
              </div>
              <input
                id="vendor-response-slider"
                type="range"
                min="1"
                max="10"
                value={vendorResponseDays}
                onChange={(e) => handleVendorResponseChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#9F2E2B] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9F2E2B] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#9F2E2B] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                aria-label={`Vendor response time: ${vendorResponseDays} days`}
              />
              <p className="text-xs text-muted-foreground mt-1">
                How long vendors have to submit their report
              </p>
            </div>

            {/* Review Due Date */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="review-due-slider" className="text-sm font-medium text-foreground">Review Due Date</label>
                <span className="text-sm font-semibold text-primary">{reviewDueDateDays} days</span>
              </div>
              <input
                id="review-due-slider"
                type="range"
                min="1"
                max="14"
                value={reviewDueDateDays}
                onChange={(e) => handleReviewDueDateChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#9F2E2B] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9F2E2B] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#9F2E2B] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                aria-label={`Review due date: ${reviewDueDateDays} days`}
              />
              <p className="text-xs text-muted-foreground mt-1">
                How long reviewers have to complete their review
              </p>
            </div>

            {/* Vendor Late Timer */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="vendor-late-slider" className="text-sm font-medium text-foreground">Vendor Late Notification</label>
                <span className="text-sm font-semibold text-primary">{vendorLateDays} days</span>
              </div>
              <input
                id="vendor-late-slider"
                type="range"
                min="3"
                max="15"
                value={vendorLateDays}
                onChange={(e) => handleVendorLateChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#9F2E2B] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9F2E2B] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#9F2E2B] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                aria-label={`Vendor late notification: ${vendorLateDays} days`}
              />
              <p className="text-xs text-muted-foreground mt-1">
                When to send late notifications to vendors
              </p>
            </div>

            {/* Email Preferences */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-start gap-3">
                <input
                  id="daily-emails"
                  type="checkbox"
                  checked={state.generalSettings.timers.dailyEmailsEnabled}
                  onChange={(e) => handleToggle('dailyEmailsEnabled')(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                  aria-label="Daily reminder emails"
                />
                <label htmlFor="daily-emails" className="cursor-pointer">
                  <div className="font-medium text-foreground text-sm mb-1">Daily reminder emails</div>
                  <div className="text-xs text-muted-foreground">Send daily reminders for pending orders</div>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="escalate-managers"
                  type="checkbox"
                  checked={state.generalSettings.timers.escalateToManagersEnabled}
                  onChange={(e) => handleToggle('escalateToManagersEnabled')(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                  aria-label="Escalate to managers"
                />
                <label htmlFor="escalate-managers" className="cursor-pointer">
                  <div className="font-medium text-foreground text-sm mb-1">Escalate to managers</div>
                  <div className="text-xs text-muted-foreground">After 3 missed timers, notify managers</div>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="weekend-notifications"
                  type="checkbox"
                  checked={state.generalSettings.timers.weekendNotificationsEnabled}
                  onChange={(e) => handleToggle('weekendNotificationsEnabled')(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                  aria-label="Weekend notifications"
                />
                <label htmlFor="weekend-notifications" className="cursor-pointer">
                  <div className="font-medium text-foreground text-sm mb-1">Weekend notifications</div>
                  <div className="text-xs text-muted-foreground">Send email reminders on weekends</div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Bid Engagement Panel (Read-only) */}
        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Bid Engagement Panel</h2>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
              Configured by Realwired
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            These templates are pre-configured during onboarding by the Realwired team and will appear in your order forms. Click the download icon on each template to review its details.
          </p>

          <div className="space-y-3">
            {state.generalSettings.bidEngagementPanel.templates.map((template) => (
              <div key={template.id} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="flex-1">
                  <div className="font-medium text-foreground mb-1">{template.name}</div>
                  <div className="text-sm text-muted-foreground">{template.description}</div>
                </div>
                <button
                  onClick={() => {
                    alert(`Downloading ${template.name}...`);
                  }}
                  className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
                  title={`Download ${template.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-900">
              <strong>Note:</strong> These templates are managed by Realwired during your onboarding process. Contact support if you need changes.
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
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-slate-900">Understanding Settings</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                These settings control how your workflow operates and how team members receive notifications.
              </p>

              {/* Settings Explained */}
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Days Calculation
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    <strong>Business days</strong> exclude weekends and holidays. <strong>Calendar days</strong> count every day. Choose based on your team's working schedule.
                  </p>
                </div>

                <div className="pb-4 border-b border-border">
                  <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Workflow Timers
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Set realistic timeframes based on your typical order complexity:
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-[#9F2E2B] mt-0.5">•</span>
                      <span><strong>Vendor Response:</strong> Time for vendors to accept and deliver</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#9F2E2B] mt-0.5">•</span>
                      <span><strong>Review Due Date:</strong> Time for internal review completion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#9F2E2B] mt-0.5">•</span>
                      <span><strong>Late Notification:</strong> When to alert about overdue orders</span>
                    </li>
                  </ul>
                </div>

                <div className="pb-4 border-b border-border">
                  <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Notifications
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Daily reminders keep your team on track. Escalations to managers ensure nothing falls through the cracks. Weekend notifications are optional.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Bid Engagement Panel
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    These pre-configured templates are managed by Realwired during onboarding. They'll appear automatically in your order forms.
                  </p>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium text-foreground text-sm mb-3">Tips</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9F2E2B] mt-0.5">•</span>
                    <span>Start with recommended defaults and adjust based on experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9F2E2B] mt-0.5">•</span>
                    <span>All settings can be changed later without disrupting active orders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9F2E2B] mt-0.5">•</span>
                    <span>Timer changes auto-save as you adjust sliders</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

