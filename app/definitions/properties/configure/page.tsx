"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { PropertyRecordField } from "@/lib/onboarding-context";

export default function PropertyRecordConfigurePage() {
  const { state, updateDefinitions } = useOnboarding();
  const router = useRouter();
  const [fields, setFields] = useState<PropertyRecordField[]>(state.definitions.propertyRecordFields);

  const selectedPropertyId = state.definitions.selectedSamplePropertyId;

  // If no property is selected, redirect back to selection page
  useEffect(() => {
    if (!selectedPropertyId) {
      router.push('/definitions/properties');
    }
  }, [selectedPropertyId, router]);

  if (!selectedPropertyId) {
    return null;
  }

  const toggleField = (fieldId: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId && !field.required ? { ...field, enabled: !field.enabled } : field
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

  const handleContinue = () => {
    // Save the field configuration
    updateDefinitions({ propertyRecordFields: fields });
    
    // Navigate to preview page
    router.push('/definitions/properties/preview');
  };

  const overviewFields = fields.filter(f => f.category === 'overview');
  const advancedFields = fields.filter(f => f.category === 'advanced');
  const enabledCount = fields.filter(f => f.enabled).length;

  const steps = [
    { id: '1', label: 'Properties', status: 'in_progress' as const },
    { id: '2', label: 'Request Form', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={0} 
      steps={steps}
      title="Definitions"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Configure Property Field Labels
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select which fields you want in your property records and customize their labels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Selection Summary */}
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-foreground">
                    {enabledCount} of {fields.length} fields selected
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Check boxes to include fields • Edit labels by clicking on them
                </span>
              </div>
            </div>

            {/* Overview Section */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Overview</h2>
                  <p className="text-sm text-muted-foreground">Basic property identification and location fields</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {overviewFields.map((field) => {
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

            {/* Advanced Details Section */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Advanced Details</h2>
                  <p className="text-sm text-muted-foreground">Property characteristics, zoning, and specialized information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advancedFields.map((field) => {
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

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => router.push('/definitions/properties')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back to Selection
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-slate-900">How to Use This Page</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                Select which fields you want to capture and customize their label names to match your bank's terminology.
              </p>

              {/* Instructions */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Instructions</h4>
                <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside">
                  <li>Check the boxes for fields you want to include</li>
                  <li>Click on any label to edit and customize it</li>
                  <li>Required fields are always included (checkboxes disabled)</li>
                  <li>You can still edit labels for required fields</li>
                </ol>
              </div>

              {/* Field Sections */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Field Sections</h4>
                <div className="space-y-3 text-xs">
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Overview Fields</div>
                    <p className="text-slate-600">Essential fields for identifying and locating the property</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Advanced Details</div>
                    <p className="text-slate-600">Detailed property characteristics, zoning, environmental, and financial information</p>
                  </div>
                </div>
              </div>

              {/* Why This Matters */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Why This Matters</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Only capture data you actually need</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Use terminology familiar to your team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Streamline data entry for your workflow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Ensure compliance with your bank's requirements</span>
                  </li>
                </ul>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Tips</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>You can change selections and labels later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Start with essential fields and expand as needed</span>
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
