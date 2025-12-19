"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { PROPERTY_TEMPLATES } from "@/lib/field-templates";
import { useOnboarding } from "@/lib/onboarding-context";
import { TemplatePreviewModal } from "@/components/property-config/TemplatePreviewModal";
import Image from "next/image";

export default function PropertyTemplatesPage() {
  const router = useRouter();
  const { updateDefinitions } = useOnboarding();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewModal, setPreviewModal] = useState<{ templateId: string; name: string; thumbnail: string } | null>(null);

  const handleContinue = () => {
    if (!selectedTemplate) return;

    // Save selected template to context
    updateDefinitions({ 
      selectedPropertyTemplate: selectedTemplate 
    });

    // Navigate to preview page
    router.push('/definitions/properties/preview');
  };

  const steps = [
    { id: '1', label: 'Property Categories', status: 'completed' as const },
    { id: '2', label: 'Property Record', status: 'in_progress' as const },
    { id: '3', label: 'Request Types', status: 'not_started' as const },
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
        { label: "Property Record", href: "/definitions/property-categories" },
        { label: "Choose Template" },
      ]}
      footerNav={{
        previousLabel: "Back to Categories",
        onPrevious: () => router.push('/definitions/property-categories'),
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
              Choose Your Property Record Template
            </h1>
            <p className="text-lg text-gray-600">
              Select a preset template to get started quickly. You'll be able to preview the fields and customize them on the next page.
            </p>
          </div>

          {/* Template Cards - Radio Selection */}
          <div className="space-y-3">
          {PROPERTY_TEMPLATES.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                hover:shadow-md hover:scale-[1.01]
                ${selectedTemplate === template.id
                  ? 'border-[#9F2E2B] bg-red-50 shadow-sm ring-2 ring-[#9F2E2B] ring-opacity-50'
                  : 'border-gray-200 bg-white hover:border-[#9F2E2B]'
                }
              `}
            >
              <div className="flex items-start gap-4">
                {/* Radio Circle */}
                <div className={`
                  mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                  ${selectedTemplate === template.id
                    ? 'border-[#9F2E2B] bg-[#9F2E2B]'
                    : 'border-gray-300 bg-white'
                  }
                `}>
                  {selectedTemplate === template.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>

                {/* Template Info - Left Side */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-bold text-gray-900">
                      {template.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {template.fieldCount} fields
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2 leading-snug">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-gray-600 italic">
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
                  className="relative w-36 h-24 bg-gray-100 rounded-md overflow-hidden border-2 border-gray-300 hover:border-[#9F2E2B] transition-all cursor-pointer group flex-shrink-0"
                >
                  <Image
                    src="/panel-screenshots/bid-engagement-appraisal-panel-option2.png"
                    alt={`${template.name} preview`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded text-[10px] font-medium shadow-lg">
                      Click to enlarge
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Educational Sidebar - 1 column */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
            {/* Why We Need This */}
            <div className="mb-4">
              <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
              <p className="text-xs text-muted-foreground">
                Templates are pre-configured sets of property fields based on common lending scenarios. They help you get started quickly without worrying about which fields to enable. Each template is designed for specific use cases and can be customized after selection.
              </p>
            </div>

            <div className="space-y-4">
              {/* Video Tutorial */}
              <div>
                <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Video Tutorial (2:30)
                </h4>
                <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Property Templates Guide">
                      <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Property Templates Guide</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div>
                <h4 className="font-medium text-foreground text-xs mb-2">Details</h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Standard Residential</strong>: Best for most residential lending (single-family, condos)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Commercial Focus</strong>: Adds commercial-specific fields (tenants, excess land, multiple buildings)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Full-Service</strong>: All available fields for maximum flexibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Click the thumbnail on any template to see a detailed preview</span>
                  </li>
                </ul>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  <div className="text-xs text-blue-900">
                    <p className="font-semibold mb-1">Tip</p>
                    <p>After selecting a template, you'll see a preview of all the fields in a form layout. You can either continue with the template as-is, or click "Edit Configuration" to customize fields, add new ones, or change their order.</p>
                  </div>
                </div>
              </div>
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

