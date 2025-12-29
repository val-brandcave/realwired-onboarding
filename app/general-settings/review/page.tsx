"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GeneralSettingsReviewPage() {
  const { state, markModuleComplete } = useOnboarding();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'system' | 'permissions' | 'external'>('system');

  const settings = state.generalSettings;

  const handleComplete = () => {
    markModuleComplete('general-settings');
    router.push('/general-settings/complete');
  };

  const handleEdit = (section: 'system' | 'permissions' | 'external') => {
    if (section === 'system') {
      router.push('/general-settings/system-workflow');
    } else if (section === 'permissions') {
      router.push('/general-settings/permissions');
    } else {
      router.push('/general-settings/external-security');
    }
  };

  const tabs = [
    { id: 'system' as const, label: 'System & Workflow', count: 21 },
    { id: 'permissions' as const, label: 'Internal Permissions', count: 29 },
    { id: 'external' as const, label: 'External & Security', count: 14 },
  ];

  // Helper to render read-only field
  const ReadOnlyField = ({ label, value }: { label: string; value: string | boolean | number }) => {
    let displayValue = value;
    if (typeof value === 'boolean') {
      displayValue = value ? 'Enabled' : 'Disabled';
    }
    
    return (
      <div className="flex items-start justify-between py-3 border-b border-border last:border-b-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground ml-4 text-right">{displayValue}</span>
      </div>
    );
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
        { label: "Review Configuration" },
      ]}
      footerNav={{
        previousLabel: "Back",
        onPrevious: () => router.push('/general-settings/external-security'),
        nextLabel: "Confirm & Complete",
        onNext: handleComplete,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#9F2E2B] to-[#7D2522] rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Review Your General Settings
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Review your configuration across all sections. You can edit any section before completing.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-green-900">
              All sections completed
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors
                  ${activeTab === tab.id
                    ? 'border-[#9F2E2B] text-[#9F2E2B]'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-75">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div>
            
            {/* System & Workflow Tab */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                {/* Core System Settings */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Core System Settings</h3>
                    <button
                      onClick={() => handleEdit('system')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div>
                    <ReadOnlyField label="Days Calculation Method" value={settings.daysCalculation === 'business' ? 'Business Days (excludes weekends)' : 'Calendar Days (includes weekends)'} />
                    <ReadOnlyField label="Review Approval Required" value={settings.reviewApprovalRequired} />
                    <ReadOnlyField label="Estimated Total Completion Date" value={settings.enableEstimatedCompletionDate} />
                  </div>
                </div>

                {/* Workflow Timers */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Workflow Timers</h3>
                    <button
                      onClick={() => handleEdit('system')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div>
                      <ReadOnlyField label="Request Escalation Days" value="99 months" />
                      <ReadOnlyField label="Vendor Solicitation" value="2 days" />
                      <ReadOnlyField label="Vendor Confirmation" value="1 day" />
                      <ReadOnlyField label="Vendor Reminder" value="1 day" />
                      <ReadOnlyField label="Vendor License Renewal" value="20 days" />
                      <ReadOnlyField label="Vendor Late" value="On" />
                    </div>
                    <div>
                      <ReadOnlyField label="Remind LO to Select" value="2 days" />
                      <ReadOnlyField label="Reviewer Reminder" value="1 day (+ Include 1-step)" />
                      <ReadOnlyField label="Remind JM - Pending Review" value="2 days" />
                      <ReadOnlyField label="Reviewer Late" value="On" />
                      <ReadOnlyField label="Awaiting Resubmission" value="1 day" />
                      <ReadOnlyField label="Inspection Frequency" value="5 days" />
                    </div>
                  </div>
                </div>

                {/* Default Filters & Views */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Default Filters & Views</h3>
                    <button
                      onClick={() => handleEdit('system')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div>
                    <ReadOnlyField label="Show 'Not Submitted' Orders by Default" value={settings.showNotSubmittedByDefault} />
                    <ReadOnlyField label="Default 'My Items' for Bank Admins" value={settings.myItemsDefaultForBankAdmins} />
                    <ReadOnlyField label="Enable Department Filters" value={settings.enableDepartmentFilters} />
                    <ReadOnlyField label="Add JM/LO Notification Copy to 'My Items'" value={settings.addNotificationCopyToMyItems} />
                  </div>
                </div>

                {/* Property & Data Configuration */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Property & Data Configuration</h3>
                    <button
                      onClick={() => handleEdit('system')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div>
                    <ReadOnlyField label="Parcel Number Format (State + County)" value={settings.enableParcelStateCounty} />
                    <ReadOnlyField label="Include System Fee in Vendor Quotes" value={settings.includeSystemFeeInVendorQuotes} />
                  </div>
                </div>
              </div>
            )}

            {/* Internal Permissions Tab */}
            {activeTab === 'permissions' && (
              <div className="space-y-6">
                {/* Permissions & Editing */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Permissions & Editing</h3>
                    <button
                      onClick={() => handleEdit('permissions')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div>
                    <ReadOnlyField 
                      label="Enable Edit for 'On Hold' Requests" 
                      value={
                        settings.enableEditOnHold === 'disabled' ? 'Disabled' :
                        settings.enableEditOnHold === 'jm_only' ? 'Job Managers Only' :
                        'Job Managers & Bank Admins'
                      } 
                    />
                    <ReadOnlyField label="Forbid Edit to LOs After JM Accepts" value={settings.forbidLOEditAfterAcceptance} />
                    <ReadOnlyField label="Enable Review Approval" value={settings.enableReviewApproval} />
                    <ReadOnlyField label="Review Due Date – Require at Acceptance" value={settings.requireReviewDueDateAtAcceptance} />
                  </div>
                </div>

                {/* LO Access & Visibility */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Loan Officer Access & Visibility</h3>
                    <button
                      onClick={() => handleEdit('permissions')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div>
                    <ReadOnlyField label="Always Show Report Panels to LOs" value={settings.alwaysShowReportPanelsToLOs} />
                    <ReadOnlyField label="Always Show Bid/Engagement Panels to LOs" value={settings.alwaysShowBidPanelsToLOs} />
                    <ReadOnlyField label="Always Show Bank Documents to LOs" value={settings.alwaysShowBankDocsToLOs} />
                    <ReadOnlyField 
                      label="Allow LOs to Act as Job Managers" 
                      value={settings.allowLOsActAsJM === 'disabled' ? 'Disabled' : 'Selected Request Types Only'} 
                    />
                    <ReadOnlyField label="Allow LOs to Clone Requests" value={settings.allowLOsToClone} />
                    <ReadOnlyField label="Enable LO Bid Selection" value={settings.enableLOBidSelection} />
                    <ReadOnlyField label="Automatically Check 'Display to LOs'" value={settings.autoCheckDisplayToLOs} />
                    <ReadOnlyField label="Require Prepayment Proof" value={settings.requirePrepaymentProof} />
                    <ReadOnlyField label="Default LO to Ordered By" value={settings.defaultLOToOrderedBy} />
                    <ReadOnlyField label="Allow LOs to Select Documents" value={settings.allowLOSelectDocs} />
                  </div>
                </div>

                {/* Request List View & Fee Display */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Request List View & Fee Display</h3>
                    <button
                      onClick={() => handleEdit('permissions')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div>
                    <div className="py-3 border-b border-border last:border-b-0">
                      <span className="text-sm text-muted-foreground block mb-2">Fee Visibility (All Users)</span>
                      <div className="flex flex-wrap gap-2">
                        {settings.additionalDetailsPopup.map((fee) => (
                          <span key={fee} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            {fee === 'vendorFee' ? 'Vendor Fee' :
                             fee === 'reviewFee' ? 'Review Fee' :
                             fee === 'mgmtFee' ? 'Management Fee' :
                             fee === 'systemFee' ? 'System Fee' :
                             'Total Fee'}
                          </span>
                        ))}
                        {settings.additionalDetailsPopup.length === 0 && (
                          <span className="text-sm text-muted-foreground italic">None selected</span>
                        )}
                      </div>
                    </div>
                    <div className="py-3">
                      <span className="text-sm text-muted-foreground block mb-2">Hide From Loan Officers</span>
                      <div className="flex flex-wrap gap-2">
                        {settings.hideEngagedFromLOs.map((item) => (
                          <span key={item} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                            {item === 'vendor' ? 'Engaged Vendor' : 'Engaged Reviewer'}
                          </span>
                        ))}
                        {settings.hideEngagedFromLOs.length === 0 && (
                          <span className="text-sm text-muted-foreground italic">Nothing hidden</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* LO Field-Level Configuration */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">LO Field-Level Configuration</h3>
                    <button
                      onClick={() => handleEdit('permissions')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div>
                    <ReadOnlyField label="Show Value As Is" value={settings.loCanSeeValueAsIs} />
                    <ReadOnlyField label="Show Vendor Bid Response Panel" value={settings.loCanSeeVBRPanel} />
                    <ReadOnlyField label="Show Vendor Grades" value={settings.loCanSeeVendorGrades} />
                    <ReadOnlyField label="Show Fee Quote" value={settings.loCanSeeFeeQuote} />
                    <ReadOnlyField label="Show Total Fee" value={settings.loCanSeeTotalFee} />
                    <ReadOnlyField label="Show View Summary Link" value={settings.loCanSeeViewSummary} />
                    <ReadOnlyField label="Show Fee Breakdown" value={settings.showFeeBreakdownToLO} />
                    <ReadOnlyField label="Hide Management Fee in Breakdown" value={settings.hideMgmtFeeInBreakdown} />
                  </div>
                </div>
              </div>
            )}

            {/* External & Security Tab */}
            {activeTab === 'external' && (
              <div className="space-y-6">
                {/* Vendor Webform Configuration */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Vendor Webform Configuration</h3>
                    <button
                      onClick={() => handleEdit('external')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div>
                    <ReadOnlyField label="Show Request Documents on Bid Solicitation" value={settings.showRequestDocsOnSolicitation} />
                    <ReadOnlyField label="Default 'Display to Vendor – Solicitation'" value={settings.defaultDisplayToVendorSolicitation} />
                    <ReadOnlyField label="Default 'Display to Vendor – Engagement'" value={settings.defaultDisplayToVendorEngagement} />
                    <ReadOnlyField label="Allow Vendors to Upload Documents in Comments" value={settings.allowVendorUploadInComments} />
                  </div>
                </div>

                {/* Reviewer Webform Configuration */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Reviewer Webform Configuration</h3>
                    <button
                      onClick={() => handleEdit('external')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div>
                    <ReadOnlyField label="Show Bank Documents to Internal Reviewers" value={settings.showBankDocsInternalReviewer} />
                    <ReadOnlyField label="Show Bank Documents to External Reviewers" value={settings.showBankDocsExternalReviewer} />
                    <ReadOnlyField label="Show Request Documents to Internal Reviewers" value={settings.showRequestDocsInternalReviewer} />
                    <ReadOnlyField label="Show Request Documents to External Reviewers" value={settings.showRequestDocsExternalReviewer} />
                  </div>
                </div>

                {/* Session Security */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Session Security</h3>
                    <button
                      onClick={() => handleEdit('external')}
                      className="text-sm font-medium text-[#9F2E2B] hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                  <div>
                    <ReadOnlyField label="Enable Session Timer" value={settings.enableSessionTimer} />
                    {settings.enableSessionTimer && (
                      <>
                        <ReadOnlyField label="Inactivity Duration" value={`${settings.sessionTimeoutMinutes} minutes`} />
                        <ReadOnlyField label="Enable Warning Popup" value={settings.enableWarningPopup} />
                        {settings.enableWarningPopup && (
                          <>
                            <ReadOnlyField label="Warning Time" value={`${settings.warningTimeMinutes} minutes before logout`} />
                            <ReadOnlyField label="Enable Secondary Warning" value={settings.enableSecondaryWarning} />
                            {settings.enableSecondaryWarning && (
                              <ReadOnlyField label="Final Warning Time" value={`${settings.secondaryWarningTimeMinutes} minutes before logout`} />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Final Info Banner */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                Ready to Complete
              </p>
              <p className="text-sm text-gray-700">
                These are your initial configurations and can be adjusted during testing. Click "Confirm & Complete" when you're ready to finish this module.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
