"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { REQUEST_TEMPLATES, getTemplateById } from "@/lib/field-templates";
import type { RequestFormField } from "@/lib/onboarding-context";
import { FormFieldPreview } from "@/components/property-config/FormFieldPreview";

export default function RequestPreviewPage() {
  const router = useRouter();
  const { state, updateDefinitions } = useOnboarding();

  // Get selected template or default to 'basic-request'
  const selectedTemplateId = state.definitions.selectedRequestTemplate || 'basic-request';
  const selectedTemplate = getTemplateById(REQUEST_TEMPLATES, selectedTemplateId);

  // Apply template to fields (only once on mount)
  useEffect(() => {
    if (selectedTemplate && !state.definitions.requestFieldsConfigured) {
      const updatedFields = state.definitions.requestFormFields.map(field => {
        // If template.enabledFieldIds is empty, enable all fields
        const shouldEnable = selectedTemplate.enabledFieldIds.length === 0 
          ? true 
          : selectedTemplate.enabledFieldIds.includes(field.id);
        
        return {
          ...field,
          enabled: shouldEnable,
        };
      });
      
      updateDefinitions({ 
        requestFormFields: updatedFields,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplateId]); // Only run when template ID changes

  // Get fields by category (request form uses category, not panel)
  const overviewFields = state.definitions.requestFormFields.filter(f => f.category === 'overview' && f.enabled);
  const detailsFields = state.definitions.requestFormFields.filter(f => f.category === 'details' && f.enabled);

  const sections = [
    { id: 'overview', name: 'Request Overview', fields: overviewFields },
    { id: 'details', name: 'Request Details', fields: detailsFields },
  ];

  const totalFields = overviewFields.length + detailsFields.length;
  const requiredFields = [...overviewFields, ...detailsFields].filter(f => f.required).length;

  const handleEnterEditMode = () => {
    // Navigate to overview edit page
    router.push('/definitions/request-form/configure/overview');
  };

  const handleContinue = () => {
    // Mark request fields as configured
    updateDefinitions({ 
      requestFieldsConfigured: true
    });
    // Move to bid panels
    router.push('/definitions/bid-panels');
  };

  const steps = [
    { id: '1', label: 'Property Categories', status: 'completed' as const },
    { id: '2', label: 'Property Fields', status: 'completed' as const },
    { id: '3', label: 'Request Types', status: 'completed' as const },
    { id: '4', label: 'Request Form', status: 'in_progress' as const },
  ];

  const renderFieldPreview = (field: RequestFormField) => (
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
        { label: "Request Form", href: "/definitions/request-types-setup" },
        { label: "Preview Configuration" },
      ]}
      footerNav={{
        previousLabel: "Back to Templates",
        onPrevious: () => router.push('/definitions/request-form/templates'),
        nextLabel: "Continue to Bid Panels",
        onNext: handleContinue,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header with Edit Button */}
            <div className="flex items-start justify-between mb-8 gap-4">
              <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Request Form Configuration Preview
            </h1>
            <p className="text-gray-600 flex items-center gap-2 flex-wrap">
              {selectedTemplate ? (
                <>
                  <span>Showing</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                    {selectedTemplate.name}
                  </span>
                  <span>template with</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                    {totalFields} fields
                  </span>
                  <span>• You can use this configuration as-is or customize it.</span>
                </>
              ) : (
                <>Preview of your request form fields. You can use this as-is or customize it.</>
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

            {/* Overview Section */}
            {overviewFields.length > 0 && (
              <div className="mb-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Request Overview
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

            {/* Details Section */}
            {detailsFields.length > 0 && (
              <div className="mb-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Request Details
              </h2>
              <span className="text-sm text-gray-600">
                {detailsFields.length} fields
              </span>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {detailsFields.map(renderFieldPreview)}
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
                    <p>• <strong>{totalFields}</strong> total fields enabled</p>
                    <p>• <strong>{requiredFields}</strong> required fields</p>
                    <p>• <strong>{[...overviewFields, ...detailsFields].filter(f => f.systemRequired).length}</strong> system fields</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    Ready to continue? Click "Continue to Bid Panels" below, or click "Edit Configuration" above to customize.
                  </p>
                </div>
              </div>
            </div>
      </div>
    </MainLayout>
  );
}

