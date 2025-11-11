"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface VendorType {
  id: string;
  name: string;
  stateLicenseRequired: boolean;
  eoRequired: boolean;
  autoLiability: boolean;
  commercialLiability: boolean;
  masterAgreement: boolean;
  allowToLO: boolean;
}

export default function VendorTypesConfigurePage() {
  const { state, updateModuleProgress } = useOnboarding();
  const router = useRouter();

  // Track progress
  useEffect(() => {
    updateModuleProgress('vendors', 1, 4); // Step 1 of 4
  }, [updateModuleProgress]);

  const [vendorTypes, setVendorTypes] = useState<VendorType[]>([
    { id: '1', name: 'Appraisal', stateLicenseRequired: true, eoRequired: true, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
    { id: '2', name: 'Environmental', stateLicenseRequired: false, eoRequired: false, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
    { id: '3', name: 'Broker', stateLicenseRequired: false, eoRequired: false, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
    { id: '4', name: 'External Evaluator', stateLicenseRequired: false, eoRequired: false, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
    { id: '5', name: 'External Reviewer', stateLicenseRequired: false, eoRequired: false, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
    { id: '6', name: 'Internal Evaluator', stateLicenseRequired: false, eoRequired: false, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
    { id: '7', name: 'Internal Reviewer', stateLicenseRequired: false, eoRequired: false, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDeleteType = (id: string) => {
    if (confirm('Are you sure you want to delete this vendor type?')) {
      setVendorTypes(vendorTypes.filter(t => t.id !== id));
    }
  };

  const handleAddType = () => {
    const newType: VendorType = {
      id: Date.now().toString(),
      name: 'New Vendor Type',
      stateLicenseRequired: false,
      eoRequired: false,
      autoLiability: false,
      commercialLiability: false,
      masterAgreement: false,
      allowToLO: false,
    };
    setVendorTypes([...vendorTypes, newType]);
    setEditingId(newType.id);
  };

  const handleContinue = () => {
    router.push('/vendors/configure/classifications');
  };

  const steps = [
    { id: '1', label: 'Types', status: 'in_progress' as const },
    { id: '2', label: 'Classifications', status: 'not_started' as const },
    { id: '3', label: 'Geography', status: 'not_started' as const },
    { id: '4', label: 'Upload', status: 'not_started' as const },
  ];

  return (
    <MainLayout
      currentStep={0}
      steps={steps}
      title="Vendors Setup"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Vendor Types & Credential Monitoring
              </h1>
              <p className="text-base text-muted-foreground">
                Define vendor types and configure which credentials should be monitored for each type.
              </p>
            </div>

            {/* Vendor Type Cards */}
            <div className="space-y-4 mb-6">
              {vendorTypes.map((type) => (
                <div key={type.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {editingId === type.id ? (
                        <input
                          type="text"
                          value={type.name}
                          onChange={(e) => {
                            const updated = vendorTypes.map(t => 
                              t.id === type.id ? { ...t, name: e.target.value } : t
                            );
                            setVendorTypes(updated);
                          }}
                          onBlur={() => setEditingId(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingId(null);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                          autoFocus
                          className="text-lg font-semibold text-foreground px-2 py-1 border-2 border-primary rounded focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      ) : (
                        <h3 
                          className="text-lg font-semibold text-foreground cursor-pointer hover:text-primary"
                          onClick={() => setEditingId(type.id)}
                        >
                          {type.name}
                        </h3>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Click name to edit • Select credentials to monitor
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteType(type.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Delete vendor type"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground mb-2">Credential Monitoring:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={type.stateLicenseRequired}
                          onChange={(e) => {
                            const updated = vendorTypes.map(t => 
                              t.id === type.id ? { ...t, stateLicenseRequired: e.target.checked } : t
                            );
                            setVendorTypes(updated);
                          }}
                          className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">State License Required</span>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={type.eoRequired}
                          onChange={(e) => {
                            const updated = vendorTypes.map(t => 
                              t.id === type.id ? { ...t, eoRequired: e.target.checked } : t
                            );
                            setVendorTypes(updated);
                          }}
                          className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">E&O Insurance Required</span>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={type.autoLiability}
                          onChange={(e) => {
                            const updated = vendorTypes.map(t => 
                              t.id === type.id ? { ...t, autoLiability: e.target.checked } : t
                            );
                            setVendorTypes(updated);
                          }}
                          className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">Auto Liability</span>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={type.commercialLiability}
                          onChange={(e) => {
                            const updated = vendorTypes.map(t => 
                              t.id === type.id ? { ...t, commercialLiability: e.target.checked } : t
                            );
                            setVendorTypes(updated);
                          }}
                          className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">Commercial Liability</span>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={type.masterAgreement}
                          onChange={(e) => {
                            const updated = vendorTypes.map(t => 
                              t.id === type.id ? { ...t, masterAgreement: e.target.checked } : t
                            );
                            setVendorTypes(updated);
                          }}
                          className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">Master Agreement</span>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={type.allowToLO}
                          onChange={(e) => {
                            const updated = vendorTypes.map(t => 
                              t.id === type.id ? { ...t, allowToLO: e.target.checked } : t
                            );
                            setVendorTypes(updated);
                          }}
                          className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">Allow to Loan Officer</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Type Button */}
            <button
              onClick={handleAddType}
              className="w-full px-4 py-3 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-primary/30 mb-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Vendor Type
            </button>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => router.push('/vendors-intro')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleContinue}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl"
              >
                Next: Classifications →
              </button>
            </div>
          </div>

          {/* Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <h3 className="font-semibold text-foreground text-sm mb-3">Vendor Types & Credentials</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Define the types of vendors your organization works with and which credentials need to be monitored for compliance.
              </p>

              {/* Video Tutorial */}
              <div className="mb-4">
                <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Video Tutorial (2:30)
                </h4>
                <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Vendor Types">
                      <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Vendor Types & Credentials</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="pb-3 border-b border-primary/20">
                  <p className="font-medium text-foreground mb-2">Credential Types:</p>
                  <ul className="space-y-1">
                    <li>• <strong>State License:</strong> Professional licensing</li>
                    <li>• <strong>E&O Insurance:</strong> Errors & Omissions coverage</li>
                    <li>• <strong>Auto Liability:</strong> Vehicle insurance</li>
                    <li>• <strong>Commercial Liability:</strong> General liability</li>
                    <li>• <strong>Master Agreement:</strong> Contract on file</li>
                    <li>• <strong>Allow to LO:</strong> Loan Officer visibility</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-foreground mb-2">How It Works:</p>
                  <p>Checked credentials will be monitored for expiration and compliance alerts will be sent when they need renewal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

