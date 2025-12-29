"use client";

import { useState, useEffect, ReactNode } from "react";

export interface ConfigSection {
  id: string;
  title: string;
  description?: string;
  component: ReactNode;
}

interface EditConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  onPreview?: () => void; // Optional preview handler
  title: string;
  sections: ConfigSection[];
  hasUnsavedChanges?: boolean;
}

export function EditConfigModal({
  isOpen,
  onClose,
  onApply,
  onPreview,
  title,
  sections,
  hasUnsavedChanges = false,
}: EditConfigModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === sections.length - 1;
  const currentSection = sections[currentStep];

  // Reset to first step when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, hasUnsavedChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedWarning(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowUnsavedWarning(false);
    onClose();
  };

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(s => s + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(s => s - 1);
    }
  };

  const handleApply = () => {
    onApply();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Full-page modal */}
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <div className="flex items-center gap-3">
              {onPreview && (
                <button
                  onClick={onPreview}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  aria-label="Preview full form"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview Full Form
                </button>
              )}
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress Section */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-3">
              Section {currentStep + 1} of {sections.length}: {currentSection.title}
            </div>
            
            {/* Progress Bar */}
            <div className="flex gap-2">
              {sections.map((_, idx) => (
                <div 
                  key={idx}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    idx < currentStep 
                      ? 'bg-green-500' 
                      : idx === currentStep 
                      ? 'bg-[#7D2522]' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Step Indicators with Labels */}
            <div className="flex justify-between mt-4">
              {sections.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => {
                    // Allow navigation to current or previous steps only
                    if (idx <= currentStep) {
                      setCurrentStep(idx);
                    }
                  }}
                  disabled={idx > currentStep}
                  className={`flex flex-col items-center gap-1 transition-opacity ${
                    idx > currentStep ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    idx < currentStep 
                      ? 'bg-green-500 text-white' 
                      : idx === currentStep 
                      ? 'bg-[#7D2522] text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {idx < currentStep ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span className={`text-xs text-center max-w-[100px] ${
                    idx === currentStep ? 'font-medium text-gray-900' : 'text-gray-600'
                  }`}>
                    {section.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            {currentSection.description && (
              <p className="text-gray-600 mb-6">{currentSection.description}</p>
            )}
            {currentSection.component}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              {!isFirstStep && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
              )}
            </div>
            
            {isLastStep ? (
              <button
                onClick={handleApply}
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#7D2522] to-[#510906] rounded-lg hover:shadow-lg transition-all"
              >
                Apply Changes
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#7D2522] to-[#510906] rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                Save & Next Section
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </footer>
      </div>

      {/* Unsaved Changes Warning Modal */}
      {showUnsavedWarning && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Unsaved Changes
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  You have unsaved changes. Are you sure you want to close without applying them?
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowUnsavedWarning(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Continue Editing
                  </button>
                  <button
                    onClick={handleConfirmClose}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Discard Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

