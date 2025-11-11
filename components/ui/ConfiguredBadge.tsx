"use client";

import { useState } from 'react';
import { SectionConfigStatus } from '@/lib/onboarding-context';

interface ConfiguredBadgeProps {
  status: SectionConfigStatus;
  onMarkAsConfigured?: () => void;
  onReconfigure?: () => void;
  sectionName?: string;
}

export function ConfiguredBadge({ 
  status, 
  onMarkAsConfigured, 
  onReconfigure,
  sectionName 
}: ConfiguredBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!status.isConfigured) {
    return onMarkAsConfigured ? (
      <button
        onClick={onMarkAsConfigured}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-300 rounded-md hover:bg-slate-200 hover:text-slate-900 transition-colors"
        aria-label={`Mark ${sectionName || 'section'} as configured`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Mark as Configured
      </button>
    ) : (
      <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 rounded-md">
        Not Configured
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <div 
        className="relative inline-flex"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-md">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Configured
        </span>

        {/* Tooltip */}
        {showTooltip && status.configuredBy && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-max max-w-xs">
            <div className="bg-slate-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Configured by:</span>
                  <span className="font-medium">{status.configuredBy}</span>
                </div>
                {status.configuredAt && (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Date:</span>
                    <span className="font-medium">
                      {new Date(status.configuredAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </span>
                  </div>
                )}
              </div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                <div className="border-4 border-transparent border-t-slate-900"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {onReconfigure && (
        <button
          onClick={onReconfigure}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
          aria-label={`Reconfigure ${sectionName || 'section'}`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reconfigure
        </button>
      )}
    </div>
  );
}

