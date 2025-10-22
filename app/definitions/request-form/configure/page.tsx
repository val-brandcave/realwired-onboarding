"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { RequestFormField } from "@/lib/onboarding-context";

export default function RequestFormConfigurePage() {
  const { state, updateDefinitions } = useOnboarding();
  const router = useRouter();
  const [fields, setFields] = useState<RequestFormField[]>(state.definitions.requestFormFields);
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>(state.definitions.documentTypes);
  const [selectedRejectReasons, setSelectedRejectReasons] = useState<string[]>(state.definitions.rejectReasons);

  const selectedRequestId = state.definitions.selectedSampleRequestId;

  // If no request is selected, redirect back to selection page
  useEffect(() => {
    if (!selectedRequestId) {
      router.push('/definitions/request-form');
    }
  }, [selectedRequestId, router]);

  if (!selectedRequestId) {
    return null;
  }

  const toggleField = (fieldId: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId && !field.readonly && !field.required
          ? { ...field, enabled: !field.enabled }
          : field
      )
    );
  };

  const updateFieldLabel = (fieldId: string, newLabel: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId ? { ...field, customLabel: newLabel } : field
      )
    );
  };

  const handleToggleDocType = (type: string) => {
    setSelectedDocTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleToggleRejectReason = (reason: string) => {
    setSelectedRejectReasons(prev => 
      prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]
    );
  };

  const handleContinue = () => {
    // Save the field configuration
    updateDefinitions({ 
      requestFormFields: fields,
      documentTypes: selectedDocTypes,
      rejectReasons: selectedRejectReasons,
    });
    
    // Navigate to preview page
    router.push('/definitions/request-form/preview');
  };

  const overviewFields = fields.filter(f => f.category === 'overview');
  const detailsFields = fields.filter(f => f.category === 'details');
  const enabledCount = fields.filter(f => f.enabled && !f.readonly).length;

  const steps = [
    { id: '1', label: 'Properties', status: 'completed' as const },
    { id: '2', label: 'Request Form', status: 'in_progress' as const },
  ];

  // All available document types and reject reasons
  const allDocTypes = [
    'Appraisal Report', 'Inspection Report', 'Environmental Assessment', 
    'Title Document', 'Review Letter', 'Supporting Documents'
  ];
  
  const allRejectReasons = [
    'Incomplete Information', 'Scope of Work Issue', 'Valuation Discrepancy', 
    'Compliance Issue', 'Other'
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
            Configure Request Form Field Labels
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select which fields you want in your request forms and customize their labels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selection Summary */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-foreground">
                    {enabledCount} detail fields selected • {selectedDocTypes.length} document types • {selectedRejectReasons.length} reject reasons
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Check boxes to include • Edit labels by clicking them
                </span>
              </div>
            </div>

            {/* Overview Section (Always Included) */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground">Overview</h2>
                  <p className="text-sm text-muted-foreground">Context fields (always included)</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {overviewFields.map((field) => {
                  const displayLabel = field.customLabel || field.label;

                  return (
                    <div 
                      key={field.id} 
                      className="border rounded-lg p-4 bg-primary/5 border-primary/30"
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox (disabled for overview) */}
                        <div className="pt-1">
                          <input
                            type="checkbox"
                            checked={true}
                            disabled
                            className="w-5 h-5 rounded border-gray-300 text-primary cursor-not-allowed opacity-50"
                            aria-label={`${field.label} field (always included)`}
                          />
                        </div>
                        
                        {/* Editable Label */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <input
                              type="text"
                              value={displayLabel}
                              onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                              className="flex-1 px-2 py-1 text-sm font-semibold text-foreground bg-white border border-input hover:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded transition-colors"
                              placeholder="Field label"
                              aria-label={`Edit label for ${field.label}`}
                              title={`Edit label for ${field.label}`}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {field.type === 'select' ? 'Dropdown selection' : 'Text input'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Request Details Section */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Request Details</h2>
                  <p className="text-sm text-muted-foreground">Configurable fields for your request forms</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailsFields.map((field) => {
                  const displayLabel = field.customLabel || field.label;

                  return (
                    <div 
                      key={field.id} 
                      className={`border rounded-lg p-4 transition-all ${
                        field.enabled 
                          ? 'bg-primary/5 border-primary/30 shadow-sm' 
                          : 'bg-muted/30 border-border'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <div className="pt-1">
                          <input
                            type="checkbox"
                            id={`field-${field.id}`}
                            checked={field.enabled}
                            onChange={() => toggleField(field.id)}
                            disabled={field.required}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={`Include ${field.label} field`}
                          />
                        </div>
                        
                        {/* Editable Label */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <input
                              type="text"
                              value={displayLabel}
                              onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                              className="flex-1 px-2 py-1 text-sm font-semibold text-foreground bg-white border border-input hover:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded transition-colors"
                              placeholder="Field label"
                              aria-label={`Edit label for ${field.label}`}
                              title={`Edit label for ${field.label}`}
                            />
                            {field.required && (
                              <span className="text-destructive text-xs font-semibold px-2 py-0.5 bg-red-50 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {field.type === 'textarea' ? 'Multi-line text field' : 
                             field.type === 'select' ? 'Dropdown selection' :
                             field.type === 'email' ? 'Email address' :
                             field.type === 'tel' ? 'Phone number' :
                             field.type === 'date' ? 'Date picker' :
                             field.type === 'number' ? 'Numeric value' : 
                             'Text input'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Document Types Section */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Document Types</h2>
                  <p className="text-sm text-muted-foreground">Select required document types for this request</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allDocTypes.map((type) => (
                  <label key={type} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer border border-transparent hover:border-border transition-all">
                    <input
                      type="checkbox"
                      checked={selectedDocTypes.includes(type)}
                      onChange={() => handleToggleDocType(type)}
                      className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-primary cursor-pointer"
                      aria-label={`Include ${type}`}
                    />
                    <span className="text-sm text-foreground">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reject Reasons Section */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Reject Reasons</h2>
                  <p className="text-sm text-muted-foreground">Select predefined reasons for declining requests</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allRejectReasons.map((reason) => (
                  <label key={reason} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer border border-transparent hover:border-border transition-all">
                    <input
                      type="checkbox"
                      checked={selectedRejectReasons.includes(reason)}
                      onChange={() => handleToggleRejectReason(reason)}
                      className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-primary cursor-pointer"
                      aria-label={`Include ${reason}`}
                    />
                    <span className="text-sm text-foreground">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button 
                onClick={() => router.push('/definitions/request-form')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl"
              >
                Preview Configured Form →
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
                <h3 className="font-semibold text-slate-900">How to Use This Page</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6">
                Select which fields to include in your request forms and customize their label names to match your bank's terminology.
              </p>

              {/* Instructions */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Instructions</h4>
                <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside">
                  <li>Check boxes for detail fields you want to include</li>
                  <li>Click on any label to edit and customize it</li>
                  <li>Overview fields are always included</li>
                  <li>Select relevant document types and reject reasons</li>
                </ol>
              </div>

              {/* Field Sections */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Form Sections</h4>
                <div className="space-y-3 text-xs">
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Overview</div>
                    <p className="text-slate-600">Always included - Request Type and Property Address</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Request Details</div>
                    <p className="text-slate-600">Configurable fields - select what information you need</p>
                  </div>
                </div>
              </div>

              {/* Why This Matters */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Why This Matters</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Streamlines request submission for loan officers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Use terminology familiar to your team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Ensures you collect all necessary information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Reduces back-and-forth for missing data</span>
                  </li>
                </ul>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Tips</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Include fields that vary by request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>You can always add or remove fields later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Preview your form before finalizing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
