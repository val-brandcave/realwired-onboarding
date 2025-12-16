"use client";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  onStepClick?: (step: number) => void;
}

export function Stepper({ currentStep, totalSteps, stepLabels, onStepClick }: StepperProps) {
  return (
    <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
      {/* Steps */}
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;
          const isClickable = isCompleted && onStepClick;

          return (
            <div key={stepNum} className="flex items-center">
              {/* Step Circle */}
              <button
                onClick={() => isClickable && onStepClick(stepNum)}
                disabled={!isClickable}
                className={`
                  relative flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg
                  transition-all duration-200
                  ${isActive
                    ? 'bg-[#9F2E2B] text-white scale-110 shadow-lg'
                    : isCompleted
                    ? 'bg-green-500 text-white hover:scale-105 cursor-pointer'
                    : 'bg-gray-200 text-gray-400'
                  }
                  ${isClickable ? 'hover:shadow-xl' : ''}
                `}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNum
                )}
              </button>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div className={`w-32 h-1 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Labels */}
      <div className="flex items-center justify-center mt-6 gap-32">
        {stepLabels.map((label, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;
          
          return (
            <div key={index} className="text-center">
              <div className={`text-sm font-medium ${
                isActive ? 'text-[#9F2E2B]' : isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Step Info */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          <svg className="w-4 h-4 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
          </span>
        </div>
      </div>
    </div>
  );
}

