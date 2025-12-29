"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { SettingItem } from "@/components/general-settings/SettingItem";
import { Toggle } from "@/components/general-settings/Toggle";

export default function PermissionsPage() {
  const { state, updateGeneralSettings, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  useEffect(() => {
    updateModuleProgress('general-settings', 2, 3);
  }, [updateModuleProgress]);
  
  const [settings, setSettings] = useState(state.generalSettings);

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateGeneralSettings(settings);
    router.push('/general-settings/external-security');
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
        { label: "Internal Permissions" },
      ]}
      footerNav={{
        previousLabel: "Back",
        onPrevious: () => router.push('/general-settings/system-workflow'),
        nextLabel: "Save & Continue",
        onNext: handleSave,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Internal User Permissions
          </h1>
          <p className="text-base text-muted-foreground">
            Configure permissions and visibility for Job Managers, Bank Admins, and Loan Officers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            
            <Accordion defaultExpanded={['permissions']}>
              
              {/* SECTION: Permissions & Editing */}
              <AccordionItem id="permissions" title="Permissions & Editing" count={4}>
                <SettingItem
                  title="Enable Edit for 'On Hold' Requests"
                  description="When a request is on hold, edits cannot be made by default. Choose who can edit requests that are on hold."
                  additionalInfo="Comments and Documents can be added while on hold by lenders or Job Managers."
                  control={
                    <select
                      value={settings.enableEditOnHold}
                      onChange={(e) => handleChange('enableEditOnHold', e.target.value)}
                      className="px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] min-w-[200px]"
                    >
                      <option value="disabled">Disabled</option>
                      <option value="jm_only">Job Managers Only</option>
                      <option value="jm_and_ba">JMs & Bank Admins</option>
                    </select>
                  }
                />
                
                <SettingItem
                  title="Forbid Edit to Loan Officers After JM Accepts"
                  description="Prevents LOs from (1) editing a Request after a JM has accepted it, and (2) editing a Property record if there is a Request In Progress associated with it."
                  recommendation="Recommended: Enable"
                  control={
                    <Toggle
                      value={settings.forbidLOEditAfterAcceptance}
                      onChange={(val) => handleChange('forbidLOEditAfterAcceptance', val)}
                      ariaLabel="Forbid LO edit after acceptance"
                    />
                  }
                />
                
                <SettingItem
                  title="Enable Review Approval"
                  description="Allows a Job Manager or Reviewer to send a request for review to another JM/Reviewer prior to completing the order. This is an optional step in the workflow."
                  control={
                    <Toggle
                      value={settings.enableReviewApproval}
                      onChange={(val) => handleChange('enableReviewApproval', val)}
                      ariaLabel="Enable review approval"
                    />
                  }
                />
                
                <SettingItem
                  title="Review Due Date – Require at Acceptance"
                  description="Requires Reviewers to enter a 'Review Due Date' in a popup when they select 'Accept for Review' (Internal Reviews Only). Ensures field is populated."
                  recommendation="Recommended: Enable"
                  control={
                    <Toggle
                      value={settings.requireReviewDueDateAtAcceptance}
                      onChange={(val) => handleChange('requireReviewDueDateAtAcceptance', val)}
                      ariaLabel="Require review due date at acceptance"
                    />
                  }
                />
              </AccordionItem>

              {/* SECTION: Loan Officer Access & Visibility */}
              <AccordionItem id="lo-access" title="Loan Officer Access & Visibility" count={10}>
                <SettingItem
                  title="Always Show Report Panels to LOs"
                  description="By default, Report Submission and Request Review panels are hidden from LOs until Completed. Enable to show as soon as uploaded."
                  additionalInfo="As needed, a JM can manually make a report or review visible at an earlier stage/status."
                  control={
                    <Toggle
                      value={settings.alwaysShowReportPanelsToLOs}
                      onChange={(val) => handleChange('alwaysShowReportPanelsToLOs', val)}
                      ariaLabel="Always show report panels to LOs"
                    />
                  }
                />
                
                <SettingItem
                  title="Always Show Bid/Engagement Panels to LOs"
                  description="If disabled, LOs cannot see the Bid/Engagement panel. If enabled, panel becomes visible on Request Wizard, allowing LOs to enter valuation scenarios."
                  additionalInfo="We can hide/remove specific fields from the panel while keeping it visible."
                  control={
                    <Toggle
                      value={settings.alwaysShowBidPanelsToLOs}
                      onChange={(val) => handleChange('alwaysShowBidPanelsToLOs', val)}
                      ariaLabel="Always show bid panels to LOs"
                    />
                  }
                />
                
                <SettingItem
                  title="Always Show Bank Documents to LOs"
                  description="Bank Documents (Review Forms, Checklists, etc.) are hidden from LOs by default. Enable to give LOs visibility to this panel."
                  additionalInfo="Individual documents can still be hidden from LOs even if panel is visible."
                  control={
                    <Toggle
                      value={settings.alwaysShowBankDocsToLOs}
                      onChange={(val) => handleChange('alwaysShowBankDocsToLOs', val)}
                      ariaLabel="Always show bank documents to LOs"
                    />
                  }
                />
                
                <SettingItem
                  title="Allow Loan Officers to Act as Job Managers"
                  description="By default, only JMs and Bank Admins can be Job Managers. Enable to allow specific LOs to facilitate bidding and engaging vendors on selected request types."
                  control={
                    <select
                      value={settings.allowLOsActAsJM}
                      onChange={(e) => handleChange('allowLOsActAsJM', e.target.value)}
                      className="px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] min-w-[200px]"
                    >
                      <option value="disabled">Disabled</option>
                      <option value="selected_types">Selected Request Types</option>
                    </select>
                  }
                />
                
                <SettingItem
                  title="Allow Loan Officers to Clone Requests"
                  description="By default, only JMs and Bank Admins can clone requests to reduce data entry time. Enable to allow LOs to clone as well."
                  control={
                    <Toggle
                      value={settings.allowLOsToClone}
                      onChange={(val) => handleChange('allowLOsToClone', val)}
                      ariaLabel="Allow LOs to clone requests"
                    />
                  }
                />
                
                <SettingItem
                  title="Enable LO Bid Selection"
                  description="Allows a JM to send submitted vendor bids to the LO for time/fee approval/selection. This is an optional step in the workflow."
                  recommendation="Recommended: Enable"
                  control={
                    <Toggle
                      value={settings.enableLOBidSelection}
                      onChange={(val) => handleChange('enableLOBidSelection', val)}
                      ariaLabel="Enable LO bid selection"
                    />
                  }
                />
                
                <SettingItem
                  title="Automatically Check 'Display to LOs'"
                  description="Before using LO Bid Selection, JMs check which bids to present. This controls if that checkbox is checked or unchecked by default."
                  recommendation="Recommended: Unchecked"
                  disabled={!settings.enableLOBidSelection}
                  disabledReason="This setting requires 'Enable LO Bid Selection' to be enabled first."
                  control={
                    <Toggle
                      value={settings.autoCheckDisplayToLOs}
                      onChange={(val) => handleChange('autoCheckDisplayToLOs', val)}
                      disabled={!settings.enableLOBidSelection}
                      ariaLabel="Auto-check display to LOs"
                    />
                  }
                />
                
                <SettingItem
                  title="Require Prepayment Proof"
                  description="Requires the LO to upload prepayment proof at Bid Selection/approval time (if LO Bid Selection is enabled)."
                  additionalInfo="If 'Enable LO Bid Selection' is disabled or all LOs use Glances, this does not apply."
                  disabled={!settings.enableLOBidSelection}
                  disabledReason="This setting requires 'Enable LO Bid Selection' to be enabled first."
                  control={
                    <Toggle
                      value={settings.requirePrepaymentProof}
                      onChange={(val) => handleChange('requirePrepaymentProof', val)}
                      disabled={!settings.enableLOBidSelection}
                      ariaLabel="Require prepayment proof"
                    />
                  }
                />
                
                <SettingItem
                  title="Default Loan Officer to Ordered By"
                  description="When creating a new Request, the logged in user is auto-populated in 'Ordered By'. Enable to also auto-populate the LO field with this user."
                  recommendation="Recommended: Do not enable"
                  additionalInfo="Otherwise user may forget to change it when creating requests for other LOs."
                  control={
                    <Toggle
                      value={settings.defaultLOToOrderedBy}
                      onChange={(val) => handleChange('defaultLOToOrderedBy', val)}
                      ariaLabel="Default LO to ordered by"
                    />
                  }
                />
                
                <SettingItem
                  title="Allow LOs to Select Documents from Other Requests"
                  description="By default, JMs can use 'select' functionality to pull files from other Requests. Enable to give LOs this ability as well."
                  control={
                    <Toggle
                      value={settings.allowLOSelectDocs}
                      onChange={(val) => handleChange('allowLOSelectDocs', val)}
                      ariaLabel="Allow LO to select documents"
                    />
                  }
                />
              </AccordionItem>

              {/* SECTION: Request List View & Fee Display */}
              <AccordionItem id="request-list" title="Request List View & Fee Display" count={7}>
                <div className="py-4 space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Control what information appears in the 'i' (Additional Details) popup on the Requests tab.
                  </p>
                  
                  <div>
                    <label className="block text-base font-semibold text-foreground mb-3">
                      Fee Visibility (All Users)
                    </label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select which fees should be visible to all users:
                    </p>
                    <div className="space-y-2">
                      {[
                        { id: 'vendorFee', label: 'Vendor Fee' },
                        { id: 'reviewFee', label: 'Review Fee' },
                        { id: 'mgmtFee', label: 'Management Fee' },
                        { id: 'systemFee', label: 'System Fee (1-step)' },
                        { id: 'totalFee', label: 'Total Fee' },
                      ].map((fee) => (
                        <label key={fee.id} className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.additionalDetailsPopup.includes(fee.id)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...settings.additionalDetailsPopup, fee.id]
                                : settings.additionalDetailsPopup.filter(f => f !== fee.id);
                              handleChange('additionalDetailsPopup', newValue);
                            }}
                            className="w-4 h-4 text-[#9F2E2B] border-input rounded focus:ring-[#9F2E2B]"
                          />
                          <span className="text-sm text-foreground">{fee.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <label className="block text-base font-semibold text-foreground mb-3">
                      Hide From Loan Officers
                    </label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Additional controls specific to LOs:
                    </p>
                    <div className="space-y-2">
                      {[
                        { id: 'vendor', label: 'Hide Engaged Vendor Name' },
                        { id: 'reviewer', label: 'Hide Engaged Reviewer Name' },
                      ].map((item) => (
                        <label key={item.id} className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.hideEngagedFromLOs.includes(item.id)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...settings.hideEngagedFromLOs, item.id]
                                : settings.hideEngagedFromLOs.filter(i => i !== item.id);
                              handleChange('hideEngagedFromLOs', newValue);
                            }}
                            className="w-4 h-4 text-[#9F2E2B] border-input rounded focus:ring-[#9F2E2B]"
                          />
                          <span className="text-sm text-foreground">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionItem>

              {/* SECTION: LO Field-Level Configuration */}
              <AccordionItem id="lo-fields" title="LO Field-Level Configuration" count={8}>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground mb-6">
                    Granular control over field visibility for Loan Officers within the Vendor Bid Response panel and related views.
                  </p>
                  
                  <div className="space-y-4">
                    <SettingItem
                      title="Show Value As Is"
                      description="Allow LOs to see the appraised value once entered by the vendor."
                      control={
                        <Toggle
                          value={settings.loCanSeeValueAsIs}
                          onChange={(val) => handleChange('loCanSeeValueAsIs', val)}
                          ariaLabel="Show value as is to LOs"
                        />
                      }
                    />
                    
                    <SettingItem
                      title="Show Vendor Bid Response (VBR) Panel"
                      description="Display the Vendor Bid Response panel to LOs. Only applicable when LO Bid Selection is used."
                      control={
                        <Toggle
                          value={settings.loCanSeeVBRPanel}
                          onChange={(val) => handleChange('loCanSeeVBRPanel', val)}
                          ariaLabel="Show VBR panel to LOs"
                        />
                      }
                    />
                    
                    <SettingItem
                      title="Show Vendor Grades"
                      description="Allow LOs to see vendor ratings and performance grades."
                      control={
                        <Toggle
                          value={settings.loCanSeeVendorGrades}
                          onChange={(val) => handleChange('loCanSeeVendorGrades', val)}
                          ariaLabel="Show vendor grades to LOs"
                        />
                      }
                    />
                    
                    <SettingItem
                      title="Show Fee Quote"
                      description="Display individual vendor fee quotes to LOs in the bid response."
                      control={
                        <Toggle
                          value={settings.loCanSeeFeeQuote}
                          onChange={(val) => handleChange('loCanSeeFeeQuote', val)}
                          ariaLabel="Show fee quote to LOs"
                        />
                      }
                    />
                    
                    <SettingItem
                      title="Show Total Fee"
                      description="Display the total calculated fee to LOs."
                      control={
                        <Toggle
                          value={settings.loCanSeeTotalFee}
                          onChange={(val) => handleChange('loCanSeeTotalFee', val)}
                          ariaLabel="Show total fee to LOs"
                        />
                      }
                    />
                    
                    <SettingItem
                      title="Show View Summary Link"
                      description="Display the 'View Summary' link within the VBR panel for LOs."
                      control={
                        <Toggle
                          value={settings.loCanSeeViewSummary}
                          onChange={(val) => handleChange('loCanSeeViewSummary', val)}
                          ariaLabel="Show view summary to LOs"
                        />
                      }
                    />
                    
                    <SettingItem
                      title="Show Fee Breakdown"
                      description="Display the detailed breakdown of fees to LOs in the View Summary section."
                      control={
                        <Toggle
                          value={settings.showFeeBreakdownToLO}
                          onChange={(val) => handleChange('showFeeBreakdownToLO', val)}
                          ariaLabel="Show fee breakdown to LOs"
                        />
                      }
                      conditionalContent={
                        settings.showFeeBreakdownToLO && (
                          <SettingItem
                            title="Hide Management Fee in Breakdown"
                            description="Hide the management fee line item from the fee breakdown shown to LOs."
                            control={
                              <Toggle
                                value={settings.hideMgmtFeeInBreakdown}
                                onChange={(val) => handleChange('hideMgmtFeeInBreakdown', val)}
                                ariaLabel="Hide management fee in breakdown"
                              />
                            }
                          />
                        )
                      }
                      showConditional={settings.showFeeBreakdownToLO}
                    />
                  </div>
                </div>
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
                  These settings control what internal users can see and do. Configure permissions to balance transparency with role-appropriate access.
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
                    Video Tutorial (4:15)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Internal Permissions">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Internal Permissions</p>
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
                      <strong>Tip:</strong> Start with recommended defaults and customize based on your bank's workflow needs.
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

