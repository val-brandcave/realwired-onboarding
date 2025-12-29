"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { SettingItem } from "@/components/general-settings/SettingItem";
import { Toggle } from "@/components/general-settings/Toggle";

export default function SystemWorkflowPage() {
  const { state, updateGeneralSettings, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  useEffect(() => {
    updateModuleProgress('general-settings', 1, 3);
  }, [updateModuleProgress]);
  
  const [settings, setSettings] = useState(state.generalSettings);
  
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

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateGeneralSettings(settings);
    router.push('/general-settings/permissions');
  };

  return (
    <MainLayout 
      currentStep={5} 
      steps={[]}
      title="YouConnect Onboarding"
      breadcrumbs={[
        { 
          label: "Home", 
          href: "/hub", 
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          )
        },
        { label: "General Settings", href: "/general-settings-intro" },
        { label: "System & Workflow" },
      ]}
      footerNav={{
        previousLabel: "Back",
        onPrevious: () => router.push('/hub'),
        nextLabel: "Save & Continue",
        onNext: handleSave,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            System & Workflow Settings
          </h1>
          <p className="text-base text-muted-foreground">
            Configure core system behavior, calculation methods, and automated workflow timers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            
            <Accordion defaultExpanded={['core', 'timers']}>
              
              {/* SECTION 1: Core System Settings */}
              <AccordionItem id="core" title="Core System Settings" count={3}>
                <SettingItem
                  title="Days Calculation Method"
                  description="Choose how due dates are calculated throughout the system. Business days exclude weekends, while calendar days include all days."
                  control={
                    <select
                      value={settings.daysCalculation}
                      onChange={(e) => handleChange('daysCalculation', e.target.value as 'business' | 'calendar')}
                      className="px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                    >
                      <option value="business">Business Days</option>
                      <option value="calendar">Calendar Days</option>
                    </select>
                  }
                />
                
                <SettingItem
                  title="Review Approval Required"
                  description="Require manager approval before marking reviews as complete. Adds a quality check layer to the review workflow."
                  control={
                    <Toggle
                      value={settings.reviewApprovalRequired}
                      onChange={(val) => handleChange('reviewApprovalRequired', val)}
                      ariaLabel="Review approval required"
                    />
                  }
                />
                
                <SettingItem
                  title="Estimated Total Completion Date"
                  description="Automatically calculates and displays estimated completion date based on expected report delivery + review days. Updates trigger email notifications to lenders."
                  control={
                    <Toggle
                      value={settings.enableEstimatedCompletionDate}
                      onChange={(val) => handleChange('enableEstimatedCompletionDate', val)}
                      ariaLabel="Enable estimated completion date"
                    />
                  }
                />
              </AccordionItem>

              {/* SECTION 2: Workflow Timers */}
              <AccordionItem id="timers" title="Workflow Timers" count={12}>
                <div className="space-y-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    Configure automated reminder and escalation timers for various workflow stages. These control when notifications are sent to keep your team and vendors on track.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label htmlFor="request-escalation" className="block text-sm font-medium text-foreground mb-1.5">
                        Request Escalation Days
                      </label>
                      <select
                        id="request-escalation"
                        value={requestEscalationDays}
                        onChange={(e) => setRequestEscalationDays(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
                          className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
                            className="w-4 h-4 text-[#9F2E2B] border-input rounded focus:ring-[#9F2E2B]"
                          />
                          Include 1 step
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="remind-jm-pending" className="block text-sm font-medium text-foreground mb-1.5">
                        Remind JM - Pending Review
                      </label>
                      <select
                        id="remind-jm-pending"
                        value={remindJmPendingReview}
                        onChange={(e) => setRemindJmPendingReview(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                      >
                        <option value="On">On</option>
                        <option value="Off">Off</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="awaiting-resubmission" className="block text-sm font-medium text-foreground mb-1.5">
                        Awaiting Resubmission
                      </label>
                      <select
                        id="awaiting-resubmission"
                        value={awaitingResubmission}
                        onChange={(e) => setAwaitingResubmission(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                      >
                        <option value="1 day">1 day</option>
                        <option value="2 days">2 days</option>
                        <option value="3 days">3 days</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="remind-reviewer-jm" className="block text-sm font-medium text-foreground mb-1.5">
                        Remind Reviewer & JM - Not Accepted
                      </label>
                      <select
                        id="remind-reviewer-jm"
                        value={remindReviewerJmNotAccepted}
                        onChange={(e) => setRemindReviewerJmNotAccepted(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
                        className="w-full md:w-1/2 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
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
              </AccordionItem>

              {/* SECTION 3: Default Filters & Views */}
              <AccordionItem id="filters" title="Default Filters & Views" count={4}>
                <SettingItem
                  title="Show 'Not Submitted' Orders by Default"
                  description="By default, the system displays 'Submitted' and 'In Progress' orders. Enable this to also show 'Not Submitted' orders for Job Managers and Bank Admins."
                  additionalInfo="Only applies to orders created within YouConnect (no Glances option)"
                  control={
                    <Toggle
                      value={settings.showNotSubmittedByDefault}
                      onChange={(val) => handleChange('showNotSubmittedByDefault', val)}
                      ariaLabel="Show not submitted orders by default"
                    />
                  }
                />
                
                <SettingItem
                  title="Default 'My Items' for Bank Admins"
                  description="Controls if 'My Items' will be checked by default for all Bank Admins on the Requests tab. When enabled, Bank Admins see only work they're associated with on initial login."
                  control={
                    <Toggle
                      value={settings.myItemsDefaultForBankAdmins}
                      onChange={(val) => handleChange('myItemsDefaultForBankAdmins', val)}
                      ariaLabel="Default my items for bank admins"
                    />
                  }
                />
                
                <SettingItem
                  title="Enable Department Filters on Searches"
                  description="Filter orders by department (Appraisal vs Environmental). When enabled, users in Environmental Dept will see only Environmental request types by default."
                  control={
                    <Toggle
                      value={settings.enableDepartmentFilters}
                      onChange={(val) => handleChange('enableDepartmentFilters', val)}
                      ariaLabel="Enable department filters"
                    />
                  }
                />
                
                <SettingItem
                  title="Add JM/LO Notification Copy to 'My Items'"
                  description="Users in the JM or LO Notification Copy fields will see those requests on their main Requests page when 'My Items' is checked. Recommended so users can see all orders they're involved in."
                  recommendation="Recommended: Enable"
                  control={
                    <Toggle
                      value={settings.addNotificationCopyToMyItems}
                      onChange={(val) => handleChange('addNotificationCopyToMyItems', val)}
                      ariaLabel="Add notification copy to my items"
                    />
                  }
                />
              </AccordionItem>

              {/* SECTION 4: Property & Data Configuration */}
              <AccordionItem id="property-data" title="Property & Data Configuration" count={2}>
                <SettingItem
                  title="Parcel Number Format (State + County Fields)"
                  description="If using Parcel Number on Property Record, expose two additional fields for State and County associated with each Parcel # entry."
                  additionalInfo="Property Address already has State and County, so may be redundant unless you often see multiple state/counties for your Parcel #s."
                  control={
                    <Toggle
                      value={settings.enableParcelStateCounty}
                      onChange={(val) => handleChange('enableParcelStateCounty', val)}
                      ariaLabel="Enable parcel state and county fields"
                    />
                  }
                />
                
                <SettingItem
                  title="Include System Fee in Vendor Fee Quotes"
                  description="If the YouConnect system fee is a percentage of the vendor fee, include the System Fee within Vendor 'Fee Quotes' and 'Totals' displayed on the Vendor Bid Response panel."
                  control={
                    <Toggle
                      value={settings.includeSystemFeeInVendorQuotes}
                      onChange={(val) => handleChange('includeSystemFeeInVendorQuotes', val)}
                      ariaLabel="Include system fee in vendor quotes"
                    />
                  }
                />
              </AccordionItem>
              
            </Accordion>

          </div>

          {/* Educational Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              {/* Why We Need This */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  These foundational settings control how your entire system operates. They affect due date calculations, notification timing, and default views for all users.
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
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: System & Workflow Settings">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">System & Workflow Settings</p>
                    </div>
                  </div>
                </div>

                {/* Tip Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-xs text-blue-900">
                      <strong>Tip:</strong> Start with recommended defaults and adjust based on your bank's needs. All settings can be changed later.
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

