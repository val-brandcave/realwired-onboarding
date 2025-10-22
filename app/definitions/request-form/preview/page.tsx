"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRequestById } from "@/lib/sample-requests";

export default function RequestFormPreviewPage() {
  const { state, updateDefinitions } = useOnboarding();
  const router = useRouter();

  const selectedRequestId = state.definitions.selectedSampleRequestId;
  const selectedRequest = selectedRequestId ? getRequestById(selectedRequestId) : null;
  const fields = state.definitions.requestFormFields;
  const documentTypes = state.definitions.documentTypes;
  const rejectReasons = state.definitions.rejectReasons;

  // If no request is selected, redirect back to selection page
  useEffect(() => {
    if (!selectedRequestId) {
      router.push('/definitions/request-form');
    }
  }, [selectedRequestId, router]);

  if (!selectedRequest) {
    return null;
  }

  // Helper to get the value from the selected request for a given field
  const getFieldValue = (fieldId: string): string | number | boolean => {
    const fieldMap: Record<string, string | number | boolean> = {
      'request-type': selectedRequest.requestType,
      'property-address': selectedRequest.propertyAddress,
      'request-purpose': selectedRequest.requestPurpose,
      'loan-officer': selectedRequest.loanOfficer,
      'customer-name': selectedRequest.customerName,
      'borrower-email': selectedRequest.borrowerEmail || '',
      'borrower-phone': selectedRequest.borrowerPhone || '',
      'coborrower-name': selectedRequest.coborroweName || '',
      'loan-amount': selectedRequest.loanAmount,
      'ltv-ratio': selectedRequest.ltvRatio,
      'loan-type': selectedRequest.loanType,
      'appraisal-type': selectedRequest.appraisalType || '',
      'turn-time': selectedRequest.turnTime,
      'ordering-party': selectedRequest.orderingParty,
      'order-date': selectedRequest.orderDate,
      'due-date': selectedRequest.dueDate,
      'rush-order': selectedRequest.rushOrder ? 'Yes' : 'No',
      'client-file-number': selectedRequest.clientFileNumber || '',
      'loan-number': selectedRequest.loanNumber || '',
      'sales-price': selectedRequest.salesPrice || selectedRequest.purchasePrice || '',
      'refinance-purpose': selectedRequest.refinancePurpose || '',
      'special-instructions': selectedRequest.specialInstructions,
    };
    return fieldMap[fieldId] || '';
  };

  const handleContinue = () => {
    // Mark definitions as complete
    updateDefinitions({ completed: true });
    router.push('/definitions/complete');
  };

  const handleEdit = () => {
    router.push('/definitions/request-form/configure');
  };

  const overviewFields = fields.filter(f => f.category === 'overview' && f.enabled);
  const detailsFields = fields.filter(f => f.category === 'details' && f.enabled);
  const totalEnabledCount = fields.filter(f => f.enabled).length;

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
            Request Form Preview
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            This is how your configured request form will look with your selected fields and custom labels.
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {totalEnabledCount} fields • {documentTypes.length} document types • {rejectReasons.length} reject reasons
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Request Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Form Preview</p>
                    <p className="text-sm font-bold text-slate-900">{selectedRequest.requestType}</p>
                  </div>
                </div>
                <button
                  onClick={handleEdit}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Edit Configuration
                </button>
              </div>
            </div>

            {/* Overview Section */}
            {overviewFields.length > 0 && (
              <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {overviewFields.map((field) => {
                    const value = getFieldValue(field.id);
                    const displayLabel = field.customLabel || field.label;

                    return (
                      <div key={field.id} className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-1">
                          {displayLabel}
                          {field.required && <span className="text-destructive ml-1">*</span>}
                        </label>
                        {field.type === 'select' ? (
                          <select disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label={displayLabel}>
                            <option>{String(value)}</option>
                          </select>
                        ) : (
                          <input 
                            type="text" 
                            value={String(value)} 
                            disabled 
                            className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed"
                            aria-label={displayLabel}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Request Details Section */}
            {detailsFields.length > 0 && (
              <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Request Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detailsFields.map((field) => {
                    const value = getFieldValue(field.id);
                    const displayLabel = field.customLabel || field.label;
                    
                    // Format special values
                    let displayValue = String(value);
                    if (field.id === 'loan-amount' && value) {
                      displayValue = '$' + Number(value).toLocaleString();
                    } else if (field.id === 'ltv-ratio' && value) {
                      displayValue = value + '%';
                    } else if (field.id === 'sales-price' && value) {
                      displayValue = '$' + Number(value).toLocaleString();
                    }

                    return (
                      <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          {displayLabel}
                          {field.required && <span className="text-destructive ml-1">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea 
                            value={displayValue} 
                            disabled 
                            rows={2} 
                            className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed"
                            aria-label={displayLabel}
                          />
                        ) : (
                          <input 
                            type="text" 
                            value={displayValue} 
                            disabled 
                            className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed"
                            aria-label={displayLabel}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Document Types Section */}
            {documentTypes.length > 0 && (
              <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Document Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {documentTypes.map((type, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg border border-border">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-foreground">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reject Reasons Section */}
            {rejectReasons.length > 0 && (
              <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Reject Reasons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {rejectReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg border border-border">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-foreground">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-green-900 mb-1">
                    Your request form is configured!
                  </p>
                  <p className="text-sm text-green-700">
                    This form shows only your selected fields with your custom labels. You can go back to make changes or complete this module.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleEdit}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Edit Configuration
              </button>
              <button 
                onClick={handleContinue}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl"
              >
                Complete Definitions →
              </button>
            </div>
          </div>

          {/* Right Column: Educational Panel (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <h3 className="font-semibold text-slate-900">Preview Your Form</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                This preview shows exactly how your request form will appear with your configured fields and custom labels.
              </p>

              {/* What You're Seeing */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">What You're Seeing</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Only your selected fields are shown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Custom label names you edited appear here</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Required fields are marked with an asterisk (*)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Selected document types and reject reasons</span>
                  </li>
                </ul>
              </div>

              {/* Configuration Summary */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Configuration Summary</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-white/70 rounded border border-blue-100">
                    <span className="text-slate-700">Overview Fields</span>
                    <span className="font-semibold text-slate-900">{overviewFields.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/70 rounded border border-blue-100">
                    <span className="text-slate-700">Detail Fields</span>
                    <span className="font-semibold text-slate-900">{detailsFields.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/70 rounded border border-blue-100">
                    <span className="text-slate-700">Document Types</span>
                    <span className="font-semibold text-slate-900">{documentTypes.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/70 rounded border border-blue-100">
                    <span className="text-slate-700">Reject Reasons</span>
                    <span className="font-semibold text-slate-900">{rejectReasons.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-100 rounded border border-blue-200">
                    <span className="text-blue-900 font-medium">Total Fields</span>
                    <span className="font-bold text-blue-900">{totalEnabledCount}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Ready to Continue</h4>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  If everything looks good, complete this module. You've now configured both property records and request forms!
                </p>
                <button
                  onClick={handleEdit}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Need to make changes? Click here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

