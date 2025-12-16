"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { REQUEST_TEMPLATES } from "@/lib/field-templates";
import { useOnboarding } from "@/lib/onboarding-context";
import { TemplatePreviewModal } from "@/components/property-config/TemplatePreviewModal";
import Image from "next/image";

export default function RequestTemplatesPage() {
  const router = useRouter();
  const { updateDefinitions } = useOnboarding();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewModal, setPreviewModal] = useState<{ templateId: string; name: string; thumbnail: string } | null>(null);

  const handleContinue = () => {
    if (!selectedTemplate) return;

    // Save selected template to context
    updateDefinitions({ 
      selectedRequestTemplate: selectedTemplate 
    });

    // Navigate to preview page
    router.push('/definitions/request-form/preview');
  };

  const steps = [
    { id: '1', label: 'Property Categories', status: 'completed' as const },
    { id: '2', label: 'Property Fields', status: 'completed' as const },
    { id: '3', label: 'Request Types', status: 'completed' as const },
    { id: '4', label: 'Request Form', status: 'in_progress' as const },
  ];

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
        { label: "Choose Template" },
      ]}
      footerNav={{
        previousLabel: "Back to Request Types",
        onPrevious: () => router.push('/definitions/request-types-setup'),
        nextLabel: "Continue with Selected Template",
        onNext: handleContinue,
        nextDisabled: !selectedTemplate,
        nextTooltip: !selectedTemplate ? "Please select a template to continue" : undefined,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Choose Your Request Form Template
            </h1>
            <p className="text-lg text-gray-600">
              Select a preset template to get started quickly. You'll be able to preview the fields and customize them on the next page.
            </p>
          </div>

          {/* Template Cards - Radio Selection */}
          <div className="space-y-4">
          {REQUEST_TEMPLATES.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`
                w-full text-left p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer
                hover:shadow-lg hover:scale-[1.02]
                ${selectedTemplate === template.id
                  ? 'border-[#9F2E2B] bg-red-50 shadow-md ring-2 ring-[#9F2E2B] ring-opacity-50'
                  : 'border-gray-200 bg-white hover:border-[#9F2E2B]'
                }
              `}
            >
              <div className="flex items-start gap-6">
                {/* Radio Circle */}
                <div className={`
                  mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                  ${selectedTemplate === template.id
                    ? 'border-[#9F2E2B] bg-[#9F2E2B]'
                    : 'border-gray-300 bg-white'
                  }
                `}>
                  {selectedTemplate === template.id && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>

                {/* Template Info - Left Side */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {template.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {template.fieldCount} fields
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-600 italic">
                      {template.useCase}
                    </p>
                  </div>
                </div>

                {/* Thumbnail Preview - Right Side */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewModal({ 
                      templateId: template.id, 
                      name: template.name, 
                      thumbnail: '/panel-screenshots/bid-engagement-appraisal-panel-option2.png'
                    });
                  }}
                  className="relative w-48 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300 hover:border-[#9F2E2B] transition-all cursor-pointer group flex-shrink-0"
                >
                  <Image
                    src="/panel-screenshots/bid-engagement-appraisal-panel-option2.png"
                    alt={`${template.name} preview`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg">
                      Click to enlarge
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">What happens next?</p>
              <p>After selecting a template, you'll preview the fields in a read-only view. You can either use the template as-is or enter edit mode to customize the fields, panels, and add new ones.</p>
            </div>
          </div>
        </div>
        </div>

        {/* Educational Sidebar - 1 column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* What are Templates? */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">What are Templates?</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Templates are pre-configured sets of request form fields based on common workflow scenarios. They help you get started with the right fields for your specific use case.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Click the thumbnail image on any template to see a detailed preview before selecting.
              </p>
            </div>

            {/* How to Choose */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">How to Choose</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Basic Request</strong>: Core request and loan fields for simple workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Full Appraisal</strong>: Adds bid/engagement and report submission panels</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Complete Review</strong>: All panels including internal review and QA workflow</span>
                </li>
              </ul>
            </div>

            {/* What's Next */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">What's Next?</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                After selecting a template, you'll see a preview of all the fields organized by panels in a form layout. You can test dropdowns to see options, then either continue or click "Edit Configuration" to customize.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Template Preview Modal */}
      {previewModal && (
        <TemplatePreviewModal
          isOpen={true}
          onClose={() => setPreviewModal(null)}
          templateName={previewModal.name}
          thumbnailUrl={previewModal.thumbnail}
        />
      )}
    </MainLayout>
  );
}

