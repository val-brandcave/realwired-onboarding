"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { PROPERTY_TEMPLATES, getTemplateById } from "@/lib/field-templates";
import type { PropertyRecordField } from "@/lib/onboarding-context";
import { FormFieldPreview } from "@/components/property-config/FormFieldPreview";

export default function PropertyPreviewPage() {
  const router = useRouter();
  const { state, updateDefinitions } = useOnboarding();
  const [isEditMode, setIsEditMode] = useState(false);

  // Get selected template or default to 'standard-residential'
  const selectedTemplateId = state.definitions.selectedPropertyTemplate || 'standard-residential';
  const selectedTemplate = getTemplateById(PROPERTY_TEMPLATES, selectedTemplateId);

  // Apply template to fields (only once on mount)
  useEffect(() => {
    if (selectedTemplate && !state.definitions.propertyFieldsConfigured) {
      const updatedFields = state.definitions.propertyRecordFields.map(field => {
        // If template.enabledFieldIds is empty, enable all fields (Full-Service)
        const shouldEnable = selectedTemplate.enabledFieldIds.length === 0 
          ? true 
          : selectedTemplate.enabledFieldIds.includes(field.id);
        
        return {
          ...field,
          enabled: shouldEnable,
        };
      });
      
      updateDefinitions({ 
        propertyRecordFields: updatedFields,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplateId]); // Only run when template ID changes

  const overviewFields = state.definitions.propertyRecordFields.filter(
    f => f.category === 'overview' && f.enabled
  );
  const advancedFields = state.definitions.propertyRecordFields.filter(
    f => f.category === 'advanced' && f.enabled
  );

  const handleEnterEditMode = () => {
    setIsEditMode(true);
    // Navigate to overview edit page
    router.push('/definitions/properties/configure/overview');
  };

  const handleContinue = () => {
    // Mark property fields as configured
    updateDefinitions({ propertyFieldsConfigured: true });
    // Move to request types
    router.push('/definitions/request-types-setup');
  };

  const steps = [
    { id: '1', label: 'Property Categories', status: 'completed' as const },
    { id: '2', label: 'Property Record', status: 'in_progress' as const },
    { id: '3', label: 'Request Types', status: 'not_started' as const },
  ];

  const renderFieldPreview = (field: PropertyRecordField) => (
    <div key={field.id}>
      <FormFieldPreview field={field} />
    </div>
  );

  return (
    <MainLayout
      currentStep={1}
      steps={steps}
      title="Definitions"
      breadcrumbs={[
        { 
          label: "Home", 
          href: "/hub",
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          )
        },
        { label: "Definitions", href: "/definitions-intro" },
        { label: "Property Record", href: "/definitions/property-categories" },
        { label: "Preview Configuration" },
      ]}
      footerNav={{
        previousLabel: "Back to Templates",
        onPrevious: () => router.push('/definitions/properties/templates'),
        nextLabel: "Continue to Request Types",
        onNext: handleContinue,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Edit Button */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Property Record Configuration Preview
            </h1>
            <p className="text-gray-600">
              {selectedTemplate ? (
                <>
                  Showing <strong>{selectedTemplate.name}</strong> template with <strong>{overviewFields.length + advancedFields.length} fields</strong>. 
                  You can use this configuration as-is or customize it.
                </>
              ) : (
                <>Preview of your property record fields. You can use this as-is or customize it.</>
              )}
            </p>
          </div>
          <button
            onClick={handleEnterEditMode}
            className="px-6 py-3 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Configuration
          </button>
        </div>

        {/* Template Info Banner */}
        {selectedTemplate && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">{selectedTemplate.name} Template</p>
                <p className="mb-2">{selectedTemplate.description} - {selectedTemplate.useCase}</p>
                <p className="text-xs text-blue-800">
                  💡 <strong>Tip:</strong> You can click on dropdown fields to expand and see the available options, even in preview mode!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Primary Property Information Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Primary Property Information
            </h2>
            <span className="text-sm text-gray-600">
              {state.definitions.propertyRecordFields.filter(f => f.category === 'overview' && f.enabled && ['street-address', 'apt-unit', 'city', 'state', 'zip-code', 'county', 'portfolio', 'portfolio-description'].includes(f.id)).length} fields
            </span>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {state.definitions.propertyRecordFields
              .filter(f => ['street-address', 'apt-unit', 'city', 'state', 'zip-code', 'county', 'portfolio', 'portfolio-description'].includes(f.id) && f.enabled)
              .map(renderFieldPreview)}
          </div>
        </div>

        {/* Property Overview Section */}
        {overviewFields.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Property Overview
              </h2>
              <span className="text-sm text-gray-600">
                {overviewFields.length} fields
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {overviewFields.map(renderFieldPreview)}
            </div>
          </div>
        )}

        {/* Advanced Details Section */}
        {advancedFields.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Advanced Details
              </h2>
              <span className="text-sm text-gray-600">
                {advancedFields.length} fields
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advancedFields.map(renderFieldPreview)}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">
                Configuration Summary
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p>• <strong>{overviewFields.length + advancedFields.length}</strong> total fields enabled</p>
                <p>• <strong>{[...overviewFields, ...advancedFields].filter(f => f.required).length}</strong> required fields</p>
                <p>• <strong>{[...overviewFields, ...advancedFields].filter(f => f.systemRequired).length}</strong> system fields</p>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Ready to continue? Click "Continue to Request Types" below, or click "Edit Configuration" above to customize.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

