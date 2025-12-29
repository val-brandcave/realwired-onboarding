"use client";

import { ReactNode } from "react";

export interface StickyFooterNavProps {
  // Previous button
  previousLabel?: string;
  previousHref?: string;
  onPrevious?: () => void;
  previousHidden?: boolean;
  
  // Next button
  nextLabel: string;
  nextHref?: string;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextTooltip?: string;

  // Secondary action button (e.g., Edit Configuration)
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
}

export function StickyFooterNav({
  previousLabel,
  onPrevious,
  previousHidden = false,
  nextLabel,
  onNext,
  nextDisabled = false,
  nextTooltip,
  secondaryAction,
}: StickyFooterNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          {!previousHidden && previousLabel ? (
            <button
              onClick={onPrevious}
              className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-2 hover:bg-gray-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span>{previousLabel}</span>
            </button>
          ) : (
            <div></div>
          )}

          {/* Right side: Secondary Action + Next Button */}
          <div className="flex items-center gap-3">
            {nextTooltip && nextDisabled && (
              <span className="text-sm text-amber-600 font-medium">
                {nextTooltip}
              </span>
            )}

            {/* Secondary Action Button - Outlined style for medium emphasis */}
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 hover:border-[#9F2E2B] hover:text-[#9F2E2B] font-medium rounded-lg transition-all hover:shadow-md flex items-center gap-2"
              >
                {secondaryAction.icon}
                <span>{secondaryAction.label}</span>
              </button>
            )}

            {/* Next/Continue Button - Primary action with gradient */}
            <button
              onClick={onNext}
              disabled={nextDisabled}
              title={nextDisabled ? nextTooltip : undefined}
              className={`
                px-8 py-3 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2
                ${
                  nextDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white hover:from-[#8A2826] hover:to-[#6B1F1D]'
                }
              `}
            >
              <span>{nextLabel}</span>
              {!nextDisabled && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

