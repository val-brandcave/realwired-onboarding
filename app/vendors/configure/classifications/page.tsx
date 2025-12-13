"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface VendorStatus {
  id: string;
  name: string;
  monitorCredentials: boolean;
  isDefault: boolean; // non-editable/non-deletable defaults
}

export default function VendorClassificationsPage() {
  const { updateModuleProgress } = useOnboarding();
  const router = useRouter();

  // Track progress
  useEffect(() => {
    updateModuleProgress('vendors', 2, 4); // Step 2 of 4
  }, [updateModuleProgress]);

  // Vendor Statuses
  const [vendorStatuses, setVendorStatuses] = useState<VendorStatus[]>([
    { id: '1', name: 'New Applicant', monitorCredentials: false, isDefault: true },
    { id: '2', name: 'Pending Applicant', monitorCredentials: false, isDefault: true },
    { id: '3', name: 'Approved', monitorCredentials: true, isDefault: false },
    { id: '4', name: 'Unapproved', monitorCredentials: false, isDefault: false },
    { id: '5', name: 'Pending', monitorCredentials: true, isDefault: false },
    { id: '6', name: 'Temporary Approval', monitorCredentials: true, isDefault: false },
    { id: '7', name: 'Rejected', monitorCredentials: false, isDefault: false },
    { id: '8', name: 'Retired', monitorCredentials: false, isDefault: false },
    { id: '9', name: 'Deceased', monitorCredentials: false, isDefault: false },
  ]);

  // Vendor Specialties
  const [specialties, setSpecialties] = useState<string[]>([
    'Hotel',
    'Convenience Store',
    'Oil & Gas',
    'Airport',
    'Golf Course',
  ]);

  // Vendor Designations
  const [designations, setDesignations] = useState<string[]>([
    'MAI',
    'MRICS',
    'SRA',
    'SREA',
    'SRPA',
    'AI-GRS',
    'AI-RRS',
    'Certified Residential',
    'Certified General',
    'Trainee',
  ]);

  const handleDeleteStatus = (id: string) => {
    const status = vendorStatuses.find(s => s.id === id);
    if (status?.isDefault) {
      alert('System default statuses cannot be deleted.');
      return;
    }
    if (confirm('Are you sure you want to delete this status?')) {
      setVendorStatuses(vendorStatuses.filter(s => s.id !== id));
    }
  };

  const handleContinue = () => {
    router.push('/vendors/configure/geography');
  };

  const steps = [
    { id: '1', label: 'Types', status: 'completed' as const },
    { id: '2', label: 'Classifications', status: 'in_progress' as const },
    { id: '3', label: 'Geography', status: 'not_started' as const },
    { id: '4', label: 'Upload', status: 'not_started' as const },
  ];

  return (
    <MainLayout
      currentStep={1}
      steps={steps}
      title="Vendors Setup"
      breadcrumbs={[
        { label: "Home", href: "/hub", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>) },
        { label: "Vendors", href: "/vendors-intro" },
        { label: "Classifications" },
      ]}
      footerNav={{
        previousLabel: "Back",
        onPrevious: () => router.push('/vendors/configure/types'),
        nextLabel: "Next: Geography",
        onNext: handleContinue,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Vendor Classifications
              </h1>
              <p className="text-base text-muted-foreground">
                Configure vendor statuses, business specialties, and professional designations.
              </p>
            </div>

            {/* Section 1: Vendor Statuses */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Vendor Statuses
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Configure vendor lifecycle statuses and which ones require credential monitoring.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vendorStatuses.map((status) => (
                  <div key={status.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={status.name}
                          disabled={status.isDefault}
                          onChange={(e) => {
                            const updated = vendorStatuses.map(s => 
                              s.id === status.id ? { ...s, name: e.target.value } : s
                            );
                            setVendorStatuses(updated);
                          }}
                          className={`flex-1 px-2 py-1 text-sm border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring ${
                            status.isDefault ? 'bg-muted cursor-not-allowed' : 'bg-white'
                          }`}
                        />
                        {status.isDefault && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded border border-slate-200 whitespace-nowrap">
                            System Default
                          </span>
                        )}
                      </div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={status.monitorCredentials}
                          onChange={(e) => {
                            const updated = vendorStatuses.map(s => 
                              s.id === status.id ? { ...s, monitorCredentials: e.target.checked } : s
                            );
                            setVendorStatuses(updated);
                          }}
                          className="w-3.5 h-3.5 text-primary border-input rounded focus:ring-primary"
                        />
                        <span className="text-xs text-muted-foreground">Monitor Credentials</span>
                      </label>
                    </div>
                    <button
                      onClick={() => handleDeleteStatus(status.id)}
                      disabled={status.isDefault}
                      className={`ml-3 p-2 rounded-lg transition-colors ${
                        status.isDefault 
                          ? 'text-muted-foreground cursor-not-allowed opacity-50' 
                          : 'text-destructive hover:bg-destructive/10'
                      }`}
                      title={status.isDefault ? 'Cannot delete system default' : 'Delete status'}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    const newStatus: VendorStatus = {
                      id: Date.now().toString(),
                      name: 'New Status',
                      monitorCredentials: false,
                      isDefault: false,
                    };
                    setVendorStatuses([...vendorStatuses, newStatus]);
                  }}
                  className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  + Add Status
                </button>
              </div>
            </div>

            {/* Section 2: Vendor Specialties */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Vendor Specialties
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Define business specialties that vendors can be associated with (e.g., property types, industries).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={specialty}
                      onChange={(e) => {
                        const updated = [...specialties];
                        updated[index] = e.target.value;
                        setSpecialties(updated);
                      }}
                      className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                      onClick={() => {
                        setSpecialties(specialties.filter((_, i) => i !== index));
                      }}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Remove specialty"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setSpecialties([...specialties, 'New Specialty']);
                  }}
                  className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  + Add Specialty
                </button>
              </div>
            </div>

            {/* Section 3: Vendor Designations */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Vendor Designations
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Manage professional credentials or designations recognized by your organization.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {designations.map((designation, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => {
                        const updated = [...designations];
                        updated[index] = e.target.value;
                        setDesignations(updated);
                      }}
                      className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                      onClick={() => {
                        setDesignations(designations.filter((_, i) => i !== index));
                      }}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Remove designation"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setDesignations([...designations, 'New Designation']);
                  }}
                  className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  + Add Designation
                </button>
              </div>
            </div>

          </div>

          {/* Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <h3 className="font-semibold text-foreground text-sm mb-3">Classifications</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Organize vendors by status, specialty, and professional designations for better management and reporting.
              </p>

              {/* Video Tutorial */}
              <div className="mb-4">
                <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Video Tutorial (2:15)
                </h4>
                <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Classifications">
                      <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Vendor Classifications</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="pb-3 border-b border-primary/20">
                  <p className="font-medium text-foreground mb-2">Classification Types:</p>
                  <ul className="space-y-1">
                    <li>• <strong>Statuses:</strong> Vendor lifecycle stages</li>
                    <li>• <strong>Specialties:</strong> Business domains</li>
                    <li>• <strong>Designations:</strong> Professional credentials</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-foreground mb-2">Credential Monitoring:</p>
                  <p>Only vendors with monitored statuses (Approved, Pending, Temporary Approval) will appear in solicitation workflows.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

