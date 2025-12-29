"use client";

import { ReactNode } from "react";

interface SettingItemProps {
  title: string;
  description: string;
  additionalInfo?: string;
  recommendation?: string;
  control: ReactNode;
  conditionalContent?: ReactNode;
  showConditional?: boolean;
  disabled?: boolean;
  disabledReason?: string;
}

export function SettingItem({
  title,
  description,
  additionalInfo,
  recommendation,
  control,
  conditionalContent,
  showConditional,
  disabled = false,
  disabledReason,
}: SettingItemProps) {
  return (
    <div className={`border-b border-border py-6 last:border-b-0 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h4 className="text-base font-semibold text-foreground">
              {title}
            </h4>
            {recommendation && (
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded whitespace-nowrap">
                {recommendation}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          {disabled ? (
            <div className="opacity-50 pointer-events-none">{control}</div>
          ) : (
            control
          )}
        </div>
      </div>

      {additionalInfo && (
        <div className="flex gap-2 items-start bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
          <svg
            className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-gray-700">{additionalInfo}</p>
        </div>
      )}

      {disabled && disabledReason && (
        <div className="flex gap-2 items-start bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
          <svg
            className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-sm text-gray-700 italic">
            ℹ️ {disabledReason}
          </p>
        </div>
      )}

      {showConditional && conditionalContent && (
        <div className="ml-6 mt-4 pl-4 border-l-2 border-gray-300 space-y-4">
          {conditionalContent}
        </div>
      )}
    </div>
  );
}

