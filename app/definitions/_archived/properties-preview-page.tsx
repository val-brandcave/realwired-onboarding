"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getPropertyById } from "@/lib/sample-properties";

export default function PropertyPreviewPage() {
  const { state } = useOnboarding();
  const router = useRouter();

  const selectedPropertyId = state.definitions.selectedSamplePropertyId;
  const selectedProperty = selectedPropertyId ? getPropertyById(selectedPropertyId) : null;
  const fields = state.definitions.propertyRecordFields;

  // If no property is selected, redirect back to selection page
  useEffect(() => {
    if (!selectedPropertyId) {
      router.push('/definitions/properties');
    }
  }, [selectedPropertyId, router]);

  if (!selectedProperty) {
    return null;
  }

  // Helper to get the value from the selected property for a given field
  const getFieldValue = (fieldId: string): string | number => {
    const fieldMap: Record<string, string | number> = {
      'street-address': selectedProperty.streetAddress,
      'apt-unit': selectedProperty.aptUnit || '',
      'city': selectedProperty.city,
      'state': selectedProperty.state,
      'zip-code': selectedProperty.zipCode,
      'county': selectedProperty.county,
      'legal-description': selectedProperty.legalDescription,
      'parcel-id': selectedProperty.parcelId,
      'property-category': selectedProperty.propertyCategory,
      'property-type': selectedProperty.propertyType,
      'year-built': selectedProperty.yearBuilt || '',
      'square-footage': selectedProperty.squareFootage || '',
      'lot-size': selectedProperty.lotSize || '',
      'bedrooms': selectedProperty.bedrooms || '',
      'bathrooms': selectedProperty.bathrooms || '',
      'flood-zone': selectedProperty.floodZone,
      'zoning': selectedProperty.zoning,
      'occupancy-status': selectedProperty.occupancyStatus,
      'assessed-value': selectedProperty.assessedValue || '',
      'hoa-applicable': selectedProperty.hoaApplicable,
      'special-assessments': selectedProperty.specialAssessments,
      'environmental-concerns': selectedProperty.environmentalConcerns,
      'additional-notes': selectedProperty.additionalNotes,
    };
    return fieldMap[fieldId] || '';
  };

  const handleContinue = () => {
    router.push('/definitions/request-types-setup');
  };

  const handleEdit = () => {
    router.push('/definitions/properties/configure');
  };

  const overviewFields = fields.filter(f => f.category === 'overview' && f.enabled);
  const advancedFields = fields.filter(f => f.category === 'advanced' && f.enabled);
  const totalEnabledCount = fields.filter(f => f.enabled).length;

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
            Property Form Preview
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            This is how your configured property form will look with your selected fields and custom labels.
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {totalEnabledCount} fields configured
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Property Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Form Preview</p>
                    <p className="text-sm font-bold text-slate-900">{selectedProperty.fullAddress}</p>
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
                    const isEmpty = !value || (typeof value === 'string' && value.trim() === '');

                    return (
                      <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          {displayLabel}
                          {field.required && <span className="text-destructive ml-1">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea 
                            value={String(value)} 
                            disabled 
                            rows={2} 
                            className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed"
                            aria-label={displayLabel}
                          />
                        ) : (
                          <input 
                            type="text" 
                            value={isEmpty ? '' : String(value)} 
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

            {/* Advanced Details Section */}
            {advancedFields.length > 0 && (
              <div className="bg-white border-2 border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Advanced Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {advancedFields.map((field) => {
                    const value = getFieldValue(field.id);
                    const displayLabel = field.customLabel || field.label;
                    const isEmpty = !value || (typeof value === 'string' && value.trim() === '');

                    // Format special values
                    let displayValue = isEmpty ? '' : String(value);
                    if (field.id === 'assessed-value' && value) {
                      displayValue = '$' + Number(value).toLocaleString();
                    } else if (field.id === 'lot-size' && value) {
                      displayValue = Number(value).toLocaleString() + ' sq ft';
                    } else if (field.id === 'square-footage' && value) {
                      displayValue = Number(value).toLocaleString();
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

            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-green-900 mb-1">
                    Your property form is configured!
                  </p>
                  <p className="text-sm text-green-700">
                    This form shows only your selected fields with your custom labels. You can go back to make changes or continue to configure the request form.
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
                Continue to Request Types →
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
                This preview shows exactly how your property form will appear with your configured fields and custom labels.
              </p>

              {/* What You're Seeing */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">What You're Seeing</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Only the fields you selected are shown</span>
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
                    <span>Fields are populated with sample data</span>
                  </li>
                </ul>
              </div>

              {/* Field Distribution */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Field Distribution</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-white/70 rounded border border-blue-100">
                    <span className="text-slate-700">Overview Fields</span>
                    <span className="font-semibold text-slate-900">{overviewFields.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/70 rounded border border-blue-100">
                    <span className="text-slate-700">Advanced Fields</span>
                    <span className="font-semibold text-slate-900">{advancedFields.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-100 rounded border border-blue-200">
                    <span className="text-blue-900 font-medium">Total Selected</span>
                    <span className="font-bold text-blue-900">{totalEnabledCount}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Next Steps</h4>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  If everything looks good, continue to configure your request form fields. You can always come back to adjust property fields later.
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

