"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getRequestTypesList, getRequestById } from "@/lib/sample-requests";

export default function RequestFormSelectionPage() {
  const { state, updateDefinitions } = useOnboarding();
  const router = useRouter();
  const [selectedRequestId, setSelectedRequestId] = useState<string>(
    state.definitions.selectedSampleRequestId || ''
  );

  const requestTypes = getRequestTypesList();
  const selectedRequest = selectedRequestId ? getRequestById(selectedRequestId) : null;

  const handleContinue = () => {
    if (!selectedRequestId) return;
    
    // Save the selected request ID
    updateDefinitions({ selectedSampleRequestId: selectedRequestId });
    
    // Navigate to configuration page
    router.push('/definitions/request-form/configure');
  };

  // Document types and reject reasons from context
  const documentTypes = state.definitions.documentTypes;
  const rejectReasons = state.definitions.rejectReasons;

  const steps = [
    { id: '1', label: 'Properties', status: 'completed' as const },
    { id: '2', label: 'Request Form', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={1} 
      steps={steps}
      title="Definitions"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Understanding Request Forms
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select a sample request to see how request forms are structured in YouConnect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Request Type Dropdown */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 mb-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Select a Sample Request
                </h2>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Choose one of these sample requests to see the complete form structure.
              </p>

              <div>
                <label htmlFor="request-type" className="block text-sm font-semibold text-foreground mb-2">
                  Request Type
                </label>
                <select
                  id="request-type"
                  value={selectedRequestId}
                  onChange={(e) => setSelectedRequestId(e.target.value)}
                  className="w-full px-4 py-3 text-base border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                >
                  <option value="">-- Select a request type to preview --</option>
                  {requestTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Full Form Preview */}
            {selectedRequest && (
              <div className="space-y-6">
                {/* Overview Section */}
                <div className="bg-white border-2 border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">Overview</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      Preview
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">Request Type</label>
                      <select disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Request type">
                        <option>{selectedRequest.requestType}</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">Property Address</label>
                      <input type="text" value={selectedRequest.propertyAddress} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Property address" />
                    </div>
                  </div>
                </div>

                {/* Request Details Section */}
                <div className="bg-white border-2 border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">Request Details</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      Preview
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Request Purpose</label>
                      <input type="text" value={selectedRequest.requestPurpose} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Request purpose" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Loan Officer</label>
                      <input type="text" value={selectedRequest.loanOfficer} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Loan officer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Customer Name</label>
                      <input type="text" value={selectedRequest.customerName} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Customer name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Borrower Email</label>
                      <input type="email" value={selectedRequest.borrowerEmail || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Borrower email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Borrower Phone</label>
                      <input type="tel" value={selectedRequest.borrowerPhone || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Borrower phone" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Co-Borrower Name</label>
                      <input type="text" value={selectedRequest.coborroweName || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Co-borrower name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Loan Amount</label>
                      <input type="text" value={'$' + selectedRequest.loanAmount.toLocaleString()} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Loan amount" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">LTV Ratio</label>
                      <input type="text" value={selectedRequest.ltvRatio + '%'} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="LTV ratio" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Loan Type</label>
                      <input type="text" value={selectedRequest.loanType} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Loan type" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Appraisal Type</label>
                      <input type="text" value={selectedRequest.appraisalType || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Appraisal type" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Turn Time</label>
                      <input type="text" value={selectedRequest.turnTime} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Turn time" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Ordering Party</label>
                      <input type="text" value={selectedRequest.orderingParty} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Ordering party" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Order Date</label>
                      <input type="date" value={selectedRequest.orderDate} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Order date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Due Date</label>
                      <input type="date" value={selectedRequest.dueDate} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Due date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Rush Order</label>
                      <input type="text" value={selectedRequest.rushOrder ? 'Yes' : 'No'} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Rush order" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Client File Number</label>
                      <input type="text" value={selectedRequest.clientFileNumber || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Client file number" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Loan Number</label>
                      <input type="text" value={selectedRequest.loanNumber || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Loan number" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Sales Price</label>
                      <input type="text" value={selectedRequest.salesPrice ? '$' + selectedRequest.salesPrice.toLocaleString() : ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Sales price" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Refinance Purpose</label>
                      <input type="text" value={selectedRequest.refinancePurpose || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Refinance purpose" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">Special Instructions</label>
                      <textarea value={selectedRequest.specialInstructions} disabled rows={2} className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Special instructions" />
                    </div>
                  </div>
                </div>

                {/* Document Types Section */}
                <div className="bg-white border-2 border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">Document Types</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      Preview
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {documentTypes.map((type, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg border border-border">
                        <input 
                          type="checkbox" 
                          checked 
                          disabled 
                          className="w-4 h-4 text-primary cursor-not-allowed"
                          aria-label={`Document type: ${type}`}
                        />
                        <span className="text-sm text-foreground">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reject Reasons Section */}
                <div className="bg-white border-2 border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">Reject Reasons</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      Preview
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {rejectReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg border border-border">
                        <input 
                          type="checkbox" 
                          checked 
                          disabled 
                          className="w-4 h-4 text-primary cursor-not-allowed"
                          aria-label={`Reject reason: ${reason}`}
                        />
                        <span className="text-sm text-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    ✨ This is a complete request form. In the next step, you'll select which fields you want to include and customize their labels.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-6">
              <button 
                onClick={() => router.push('/definitions/properties/preview')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                disabled={!selectedRequestId}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Configure Field Selection →
              </button>
            </div>
          </div>

          {/* Right Column: Educational Panel (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              {/* Why We Need This */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Request forms capture all the information needed to process orders. Customizing these forms ensures loan officers provide exactly what your team needs, reducing back-and-forth and speeding up your workflow.
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
                    Video Tutorial (5:30)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    {/* Background image placeholder - corporate people conversing */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Request Form Configuration">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Request Form Configuration</p>
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
                    <span className="flex-1 text-left">Request Form Guide.pdf</span>
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
                      <strong>Tip:</strong> Only include fields that are truly necessary. Simpler forms mean faster submissions and happier users.
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
