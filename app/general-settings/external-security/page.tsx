"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { SettingItem } from "@/components/general-settings/SettingItem";
import { Toggle } from "@/components/general-settings/Toggle";

export default function ExternalSecurityPage() {
  const { state, updateGeneralSettings, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  useEffect(() => {
    updateModuleProgress('general-settings', 3, 3);
  }, [updateModuleProgress]);
  
  const [settings, setSettings] = useState(state.generalSettings);

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateGeneralSettings(settings);
    router.push('/general-settings/review');
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
        { label: "External & Security" },
      ]}
      footerNav={{
        previousLabel: "Back",
        onPrevious: () => router.push('/general-settings/permissions'),
        nextLabel: "Review & Complete",
        onNext: handleSave,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            External Users & Security
          </h1>
          <p className="text-base text-muted-foreground">
            Configure vendor and reviewer webform settings, plus session security options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            
            <Accordion defaultExpanded={['vendor-webform']}>
              
              {/* SECTION: Vendor Webform Configuration */}
              <AccordionItem id="vendor-webform" title="Vendor Webform Configuration" count={5}>
                <SettingItem
                  title="Show Request Documents on Bid Solicitation"
                  description="When sending bid requests, vendors receive a webform. This controls if they can view Request Documents at the bidding stage."
                  recommendation="Recommended: Enable"
                  additionalInfo="Without this enabled, even documents marked 'Display to Vendor – Solicitation' will not appear on their webform."
                  control={
                    <Toggle
                      value={settings.showRequestDocsOnSolicitation}
                      onChange={(val) => handleChange('showRequestDocsOnSolicitation', val)}
                      ariaLabel="Show request documents on solicitation"
                    />
                  }
                />
                
                <SettingItem
                  title="Default 'Display to Vendor – Solicitation' Checkbox"
                  description="In the Request Documents panel, there's a checkbox for whether a document should be displayed to vendors during solicitation."
                  recommendation="Recommended: Disable"
                  additionalInfo="If enabled, JMs would have to uncheck any documents they don't want presented at solicitation."
                  control={
                    <Toggle
                      value={settings.defaultDisplayToVendorSolicitation}
                      onChange={(val) => handleChange('defaultDisplayToVendorSolicitation', val)}
                      ariaLabel="Default display to vendor solicitation"
                    />
                  }
                />
                
                <SettingItem
                  title="Default 'Display to Vendor – Engagement' Checkbox"
                  description="Controls if documents are automatically set to be displayed to vendors after engagement (vendor is selected)."
                  additionalInfo="If enabled, JMs would have to uncheck documents they want to keep hidden after engagement."
                  control={
                    <Toggle
                      value={settings.defaultDisplayToVendorEngagement}
                      onChange={(val) => handleChange('defaultDisplayToVendorEngagement', val)}
                      ariaLabel="Default display to vendor engagement"
                    />
                  }
                />
                
                <SettingItem
                  title="Allow Vendors to Upload Documents in Comments"
                  description="When a vendor sends or replies to a comment, this gives them the ability to attach documents/files."
                  control={
                    <Toggle
                      value={settings.allowVendorUploadInComments}
                      onChange={(val) => handleChange('allowVendorUploadInComments', val)}
                      ariaLabel="Allow vendor upload in comments"
                    />
                  }
                />
              </AccordionItem>

              {/* SECTION: Reviewer Webform Configuration */}
              <AccordionItem id="reviewer-webform" title="Reviewer Webform Configuration" count={4}>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground mb-6">
                    Control document visibility for webform-based reviewers (typically external reviewers). These settings affect what reviewers can see when accessing requests through the webform.
                  </p>
                  
                  <SettingItem
                    title="Show Bank Documents to Internal Reviewers (Webform)"
                    description="Allow internal reviewers accessing via webform to see Bank Documents (Review Forms, Checklists, etc.)."
                    control={
                      <Toggle
                        value={settings.showBankDocsInternalReviewer}
                        onChange={(val) => handleChange('showBankDocsInternalReviewer', val)}
                        ariaLabel="Show bank documents to internal reviewers"
                      />
                    }
                  />
                  
                  <SettingItem
                    title="Show Bank Documents to External Reviewers"
                    description="Allow external reviewers to see Bank Documents when accessing requests via webform."
                    control={
                      <Toggle
                        value={settings.showBankDocsExternalReviewer}
                        onChange={(val) => handleChange('showBankDocsExternalReviewer', val)}
                        ariaLabel="Show bank documents to external reviewers"
                      />
                    }
                  />
                  
                  <SettingItem
                    title="Show Request Documents to Internal Reviewers (Webform)"
                    description="Allow internal reviewers accessing via webform to see Request Documents."
                    control={
                      <Toggle
                        value={settings.showRequestDocsInternalReviewer}
                        onChange={(val) => handleChange('showRequestDocsInternalReviewer', val)}
                        ariaLabel="Show request documents to internal reviewers"
                      />
                    }
                  />
                  
                  <SettingItem
                    title="Show Request Documents to External Reviewers"
                    description="Allow external reviewers to see Request Documents when accessing requests via webform."
                    control={
                      <Toggle
                        value={settings.showRequestDocsExternalReviewer}
                        onChange={(val) => handleChange('showRequestDocsExternalReviewer', val)}
                        ariaLabel="Show request documents to external reviewers"
                      />
                    }
                  />
                </div>
              </AccordionItem>

              {/* SECTION: Session Security */}
              <AccordionItem id="session" title="Session Security" count={5}>
                <SettingItem
                  title="Enable Session Timer"
                  description="Force logout for users after a set period of inactivity. Enhances security by preventing unauthorized access to unattended workstations."
                  recommendation="Recommended: Enable (~30min)"
                  control={
                    <Toggle
                      value={settings.enableSessionTimer}
                      onChange={(val) => handleChange('enableSessionTimer', val)}
                      ariaLabel="Enable session timer"
                    />
                  }
                  conditionalContent={
                    settings.enableSessionTimer && (
                      <>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="session-timeout" className="block text-sm font-medium text-foreground mb-1.5">
                              Inactivity Duration (minutes)
                            </label>
                            <input
                              id="session-timeout"
                              type="number"
                              min="5"
                              max="120"
                              value={settings.sessionTimeoutMinutes}
                              onChange={(e) => handleChange('sessionTimeoutMinutes', parseInt(e.target.value))}
                              className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Time until automatic logout (recommended: 30 minutes)
                            </p>
                          </div>

                          <SettingItem
                            title="Enable Warning Popup"
                            description="Show a warning popup before the session expires, giving users a chance to stay logged in."
                            control={
                              <Toggle
                                value={settings.enableWarningPopup}
                                onChange={(val) => handleChange('enableWarningPopup', val)}
                                ariaLabel="Enable warning popup"
                              />
                            }
                            conditionalContent={
                              settings.enableWarningPopup && (
                                <>
                                  <div className="mb-4">
                                    <label htmlFor="warning-time" className="block text-sm font-medium text-foreground mb-1.5">
                                      Warning Time (minutes before logout)
                                    </label>
                                    <input
                                      id="warning-time"
                                      type="number"
                                      min="1"
                                      max={settings.sessionTimeoutMinutes - 1}
                                      value={settings.warningTimeMinutes}
                                      onChange={(e) => handleChange('warningTimeMinutes', parseInt(e.target.value))}
                                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                                    />
                                  </div>

                                  <SettingItem
                                    title="Enable Secondary Warning"
                                    description="Show a final warning closer to session expiration for extra notification."
                                    control={
                                      <Toggle
                                        value={settings.enableSecondaryWarning}
                                        onChange={(val) => handleChange('enableSecondaryWarning', val)}
                                        ariaLabel="Enable secondary warning"
                                      />
                                    }
                                    conditionalContent={
                                      settings.enableSecondaryWarning && (
                                        <div>
                                          <label htmlFor="secondary-warning-time" className="block text-sm font-medium text-foreground mb-1.5">
                                            Final Warning Time (minutes before logout)
                                          </label>
                                          <input
                                            id="secondary-warning-time"
                                            type="number"
                                            min="1"
                                            max={settings.warningTimeMinutes - 1}
                                            value={settings.secondaryWarningTimeMinutes}
                                            onChange={(e) => handleChange('secondaryWarningTimeMinutes', parseInt(e.target.value))}
                                            className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                                          />
                                        </div>
                                      )
                                    }
                                    showConditional={settings.enableSecondaryWarning}
                                  />
                                </>
                              )
                            }
                            showConditional={settings.enableWarningPopup}
                          />
                        </div>
                      </>
                    )
                  }
                  showConditional={settings.enableSessionTimer}
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
                  Configure how external parties (vendors and reviewers) interact with your system through webforms, plus security settings to protect your data.
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
                    Video Tutorial (3:45)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: External & Security">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">External Users & Security</p>
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
                      <strong>Tip:</strong> Session security can be configured now. Webform settings can be refined after adding vendors and reviewers.
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

