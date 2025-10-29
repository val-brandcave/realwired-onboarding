"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type UploadStatus = 'none' | 'uploading' | 'in-review' | 'configured';

export default function VendorsPage() {
  const { state, updateModuleProgress } = useOnboarding();
  const router = useRouter();

  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('vendors', 1, 1); // Step 1 of 1 - 100%
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
    { id: '1', label: 'Vendor Setup', status: 'in_progress' as const },
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
                Vendor Network Configuration
              </h1>
              <p className="text-base text-muted-foreground">
                Download the template, fill in your vendor details, and upload it back. Our CX team will configure everything for you.
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

            {/* Step 2: Contact CX Team (Optional) */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-700 font-bold text-lg">2</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Need Help? Contact CX Team <span className="text-sm text-muted-foreground font-normal">(Optional)</span>
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
                    Schedule Meeting with CX Team
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
                            <p className="text-xs text-amber-700">Our CX team is reviewing and configuring your vendor network...</p>
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
                disabled={!canProceed}
                className={`px-6 py-3 text-base font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all ${
                  canProceed
                    ? 'text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] hover:from-[#8A2826] hover:to-[#6B1F1D] shadow-lg hover:shadow-xl'
                    : 'text-muted-foreground bg-muted cursor-not-allowed'
                }`}
              >
                Complete Module →
              </button>
            </div>
          </div>

          {/* Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <h3 className="font-semibold text-foreground text-sm mb-3">How This Works</h3>
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
                  <p>Optionally, schedule a call with our CX team for guidance</p>
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
                  <li>• Coverage areas (states/regions)</li>
                  <li>• Specialties & certifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CX Team Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Schedule Meeting with CX Team</h2>
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
                    alert('Meeting request sent! Our CX team will contact you within 24 hours to schedule a time.');
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

