"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import type { PropertyRecordField } from "@/lib/onboarding-context";
import { FormFieldPreview } from "@/components/property-config/FormFieldPreview";
import { EditConfigModal } from "@/components/edit-config/EditConfigModal";
import { PropertyOverviewSection } from "@/components/edit-config/PropertyOverviewSection";
import { PropertyAdvancedSection } from "@/components/edit-config/PropertyAdvancedSection";

export default function PropertyPreviewPage() {
  const router = useRouter();
  const { state, updateDefinitions } = useOnboarding();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFields, setEditingFields] = useState<PropertyRecordField[]>([]);

  // Initialize with standard property record (all fields enabled by default)
  // Note: No template selection - YouConnect uses ONE standard property record for all banks
  useEffect(() => {
    if (!state.definitions.propertyFieldsConfigured) {
      // Enable all fields by default for the standard property record
      const updatedFields = state.definitions.propertyRecordFields.map(field => ({
        ...field,
        enabled: true, // All fields enabled in standard configuration
      }));
      
      updateDefinitions({ 
        propertyRecordFields: updatedFields,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const overviewFields = state.definitions.propertyRecordFields.filter(
    f => f.category === 'overview' && f.enabled
  );
  const advancedFields = state.definitions.propertyRecordFields.filter(
    f => f.category === 'advanced' && f.enabled
  );

  const handleEnterEditMode = () => {
    // Initialize editing fields with current state
    setEditingFields(state.definitions.propertyRecordFields);
    setIsEditModalOpen(true);
  };

  const handleApplyChanges = () => {
    // Save the edited fields to context
    updateDefinitions({ 
      propertyRecordFields: editingFields,
      propertyFieldsConfigured: true 
    });
  };

  const handlePreview = () => {
    // Close modal and scroll to top to show preview
    setIsEditModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        { label: "Review Configuration" },
      ]}
      footerNav={{
        previousLabel: "Back to Categories",
        onPrevious: () => router.push('/definitions/property-categories'),
        nextLabel: "Continue to Request Types",
        onNext: handleContinue,
        secondaryAction: {
          label: "Edit Configuration",
          onClick: handleEnterEditMode,
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          ),
        },
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Review Your Property Record Configuration
            </h1>
            <p className="text-gray-600 flex items-center gap-2 flex-wrap">
              <span>This is the standard YouConnect property record with</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                {overviewFields.length + advancedFields.length} fields
              </span>
              <span>enabled. You can use this configuration as-is or customize it to match your needs.</span>
            </p>
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
                    Ready to continue? Click "Continue to Request Types" below, or click "Edit Configuration" to customize your fields.
                  </p>
                </div>
              </div>
            </div>
      </div>

      {/* Edit Configuration Modal */}
      <EditConfigModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onApply={handleApplyChanges}
        onPreview={handlePreview}
        title="Edit Property Configuration"
        sections={[
          {
            id: 'overview',
            title: 'Overview',
            description: 'Configure basic property identification and location fields',
            component: (
              <PropertyOverviewSection
                fields={editingFields}
                onFieldsChange={setEditingFields}
              />
            ),
          },
          {
            id: 'advanced',
            title: 'Advanced',
            description: 'Configure additional property characteristics and specifications',
            component: (
              <PropertyAdvancedSection
                fields={editingFields}
                onFieldsChange={setEditingFields}
              />
            ),
          },
        ]}
      />
    </MainLayout>
  );
}

