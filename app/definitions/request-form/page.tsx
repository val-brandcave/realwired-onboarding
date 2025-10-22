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
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-slate-900">What's Happening Here?</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                You're previewing how request forms capture order information. This helps you understand the data structure before customizing your own forms.
              </p>

              {/* What You'll Learn */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>How request form data is captured and organized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>What information loan officers need to provide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Which fields are essential vs. optional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Required document types and reject reasons</span>
                  </li>
                </ul>
              </div>

              {/* Field Categories */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Form Sections</h4>
                <div className="space-y-3 text-xs">
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Overview</div>
                    <p className="text-slate-600">Context fields that identify the request</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Request Details</div>
                    <p className="text-slate-600">Loan details, customer info, and requirements</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Document Types</div>
                    <p className="text-slate-600">Required documents for this request type</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Reject Reasons</div>
                    <p className="text-slate-600">Predefined reasons for declining requests</p>
                  </div>
                </div>
              </div>

              {/* Next Step */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Next Step</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  After selecting a request, you'll configure which fields to include, customize their labels, and manage document types and reject reasons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
