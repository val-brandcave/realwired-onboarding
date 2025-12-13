"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type UploadStatus = 'none' | 'uploading' | 'in-review' | 'configured';

export default function VendorsPage() {
  const { state: _state, updateModuleProgress } = useOnboarding();
  const router = useRouter();

  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('vendors', 4, 4); // Step 4 of 4 - 100%
  }, [updateModuleProgress]);

  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('none');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTemplateDownload = () => {
    // Create a sample CSV template for vendors
    const csvContent = "Vendor Name,Company,Email,Phone,License Number,Coverage States\nJohn Appraiser,ABC Appraisals Inc,john@abcappraisals.com,(555) 123-4567,LA-12345,California|Nevada\nJane Reviewer,XYZ Reviews LLC,jane@xyzreviews.com,(555) 987-6543,LR-67890,Arizona|Texas|New Mexico";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vendor-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setUploadStatus('uploading');
    
    // Mark as ready to proceed immediately
    // Note: In real app, this would update a vendors state
    
    // Simulate upload
    setTimeout(() => {
      setUploadStatus('in-review');
      
      // After 3 seconds, mark as configured
      setTimeout(() => {
        setUploadStatus('configured');
      }, 3000);
    }, 800);
  };

  const handleContinue = () => {
    router.push('/vendors/complete');
  };

  const canProceed = uploadStatus !== 'none';

  const steps = [
    { id: '1', label: 'Types', status: 'completed' as const },
    { id: '2', label: 'Classifications', status: 'completed' as const },
    { id: '3', label: 'Search Criteria', status: 'completed' as const },
    { id: '4', label: 'Upload', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={3} 
      steps={steps}
      title="Vendors Setup"
      breadcrumbs={[
        { label: "Home", href: "/hub", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>) },
        { label: "Vendors", href: "/vendors-intro" },
        { label: "Upload Roster" },
      ]}
      footerNav={{
        previousLabel: "Back",
        onPrevious: () => router.push('/vendors/configure/geography'),
        nextLabel: canProceed ? "Complete Vendors Module" : "Please upload vendor roster",
        onNext: handleContinue,
        nextDisabled: !canProceed,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Vendor Network Configuration
              </h1>
              <p className="text-base text-muted-foreground">
                Download the template, fill in your vendor details, and upload it back. Our CS team will configure everything for you.
              </p>
            </div>

            {/* Step 1: Download Template */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-700 font-bold text-lg">1</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Download Vendor Template
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download the spreadsheet template to fill in your vendor details including company names, contacts, licenses, and coverage areas.
                  </p>
                  <button
                    onClick={handleTemplateDownload}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Template
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Contact CS Team (Optional) */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-700 font-bold text-lg">2</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Need Help? Contact CS Team <span className="text-sm text-muted-foreground font-normal">(Optional)</span>
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule a meeting with our Customer Experience team to discuss your vendor network and get guidance on filling out the template.
                  </p>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors border-2 border-slate-300 hover:border-slate-400"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule Meeting with CS Team
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Upload Completed Template */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-700 font-bold text-lg">3</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Upload Completed Template
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you've filled in the template, upload it here. Our team will review and configure your vendor network.
                  </p>
                  
                  <div className="space-y-3">
                    {/* Upload Button - Always Visible */}
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleTemplateUpload}
                        className="hidden"
                        id="template-upload"
                      />
                      <label
                        htmlFor="template-upload"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] cursor-pointer transition-all shadow-md hover:shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        {uploadStatus === 'none' ? 'Upload Template' : 'Re-upload Template'}
                      </label>
                    </div>

                    {/* Status Display */}
                    {uploadStatus === 'uploading' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-900">Uploading template...</p>
                            <p className="text-xs text-blue-700">{uploadedFileName}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {uploadStatus === 'in-review' && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="animate-pulse w-5 h-5 bg-amber-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-amber-900">In Review / Progress</p>
                            <p className="text-xs text-amber-700">Our CS team is reviewing and configuring your vendor network...</p>
                            <p className="text-xs text-amber-600 mt-1">File: {uploadedFileName}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {uploadStatus === 'configured' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-900">✓ Configured Successfully!</p>
                            <p className="text-xs text-green-700">Your vendor network has been set up and configured.</p>
                            <p className="text-xs text-green-600 mt-1">File: {uploadedFileName}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <h3 className="font-semibold text-foreground text-sm mb-3">How This Works</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Our CS team will configure your vendor network and coverage areas. Upload your template and we'll set everything up for you.
              </p>

              {/* Video Tutorial */}
              <div className="mb-4">
                <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Video Tutorial (2:45)
                </h4>
                <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Vendor Setup">
                      <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Vendor Network Configuration</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <p>Download the vendor template spreadsheet</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <p>Fill in vendor details (Name, Company, Contact, License, Coverage)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <p>Optionally, schedule a call with our CS team for guidance</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <p>Upload the completed template</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">5.</span>
                  <p>Our team will configure all vendors and their coverage areas</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-primary/20">
                <h4 className="font-semibold text-foreground text-xs mb-2">Template Includes:</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Vendor contact information</li>
                  <li>• License numbers & expiration</li>
                  <li>• Coverage areas and search criteria</li>
                  <li>• Specialties & certifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CS Team Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Schedule Meeting with CS Team</h2>
              <button 
                onClick={() => setShowContactModal(false)} 
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-6">
                Our Customer Experience team is here to help! Schedule a call to discuss your vendor network, coverage requirements, and any questions about the setup process.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">What to expect:</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Review your vendor network requirements</li>
                      <li>• Discuss coverage areas and specialties</li>
                      <li>• Get help completing the vendor template</li>
                      <li>• Duration: 15-30 minutes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    alert('Meeting request sent! Our CS team will contact you within 24 hours to schedule a time.');
                    setShowContactModal(false);
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                >
                  Request Meeting
                </button>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-input rounded-lg hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

