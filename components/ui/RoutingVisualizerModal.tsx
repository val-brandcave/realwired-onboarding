"use client";

import React from 'react';

interface RoutingVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  routingStrategy: 'request-type-jm' | 'logical-routing' | 'assigned-area';
}

export function RoutingVisualizerModal({ 
  isOpen, 
  onClose, 
  routingStrategy 
}: RoutingVisualizerModalProps) {
  if (!isOpen) return null;

  const getStrategyLabel = (): string => {
    switch (routingStrategy) {
      case 'request-type-jm':
        return 'Request Type Job Manager (Priority 1)';
      case 'logical-routing':
        return 'Logical Routing (Priority 2)';
      case 'assigned-area':
        return 'Assigned Area (Priority 3 - Fallback)';
      default:
        return 'Not Selected';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close routing visualizer"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="pr-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Routing Visualizer</h3>
                <p className="text-white/80 text-sm">See how orders are assigned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Current Selection Banner */}
          <div className="bg-gradient-to-r from-[#FDF6F5] to-white border-l-4 border-[#9F2E2B] rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#9F2E2B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 mb-1">Your Current Selection:</p>
                <p className="text-base font-bold text-[#9F2E2B]">{getStrategyLabel()}</p>
              </div>
            </div>
          </div>

          {/* Routing Precedence Flow */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Routing Precedence Flow</h4>
            
            {/* Priority 1: Request Type Job Manager */}
            <div 
              className={`
                relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all
                ${routingStrategy === 'request-type-jm' 
                  ? 'border-[#9F2E2B] bg-[#FDF6F5] shadow-md' 
                  : 'border-slate-200 bg-white'
                }
              `}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0 ${
                routingStrategy === 'request-type-jm' 
                  ? 'bg-[#9F2E2B] text-white' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold text-slate-900">Request Type Job Manager</h5>
                  {routingStrategy === 'request-type-jm' && (
                    <span className="px-2.5 py-1 bg-[#9F2E2B] text-white rounded-full text-xs font-semibold">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Highest priority. Each request type can have a dedicated Job Manager.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Best for banks with specialized teams per request type</span>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Priority 2: Logical Routing */}
            <div 
              className={`
                relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all
                ${routingStrategy === 'logical-routing' 
                  ? 'border-[#9F2E2B] bg-[#FDF6F5] shadow-md' 
                  : 'border-slate-200 bg-white'
                }
              `}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0 ${
                routingStrategy === 'logical-routing' 
                  ? 'bg-[#9F2E2B] text-white' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold text-slate-900">Logical Routing</h5>
                  {routingStrategy === 'logical-routing' && (
                    <span className="px-2.5 py-1 bg-[#9F2E2B] text-white rounded-full text-xs font-semibold">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Rules-based assignment using multiple criteria (location, loan amount, property type, etc.).
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Flexible rules for complex assignment scenarios</span>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Priority 3: Assigned Area */}
            <div 
              className={`
                relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all
                ${routingStrategy === 'assigned-area' 
                  ? 'border-[#9F2E2B] bg-[#FDF6F5] shadow-md' 
                  : 'border-slate-200 bg-white'
                }
              `}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0 ${
                routingStrategy === 'assigned-area' 
                  ? 'bg-[#9F2E2B] text-white' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold text-slate-900">Assigned Area (Fallback)</h5>
                  {routingStrategy === 'assigned-area' && (
                    <span className="px-2.5 py-1 bg-[#9F2E2B] text-white rounded-full text-xs font-semibold">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Default assignment by geographic area or default Job Manager.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Ensures every order gets assigned</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-amber-900">
                <strong>How it works:</strong> If no rule matches at your selected priority level, the system automatically falls through to the next level until an assignment is made.
              </p>
            </div>
          </div>

          {/* Example Scenarios */}
          <div className="mt-6">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Example Scenarios</h4>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h5 className="font-semibold text-slate-900 mb-1">Appraisal Request in Springfield</h5>
                    <p className="text-sm text-slate-600">
                      Priority 1: Checks Request Type JM → <span className="text-[#9F2E2B] font-semibold">Assigned to Appraisal JM</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <h5 className="font-semibold text-slate-900 mb-1">Commercial Review in Downtown</h5>
                    <p className="text-sm text-slate-600">
                      Priority 1: No Request Type JM → Priority 2: Logical rule matches → <span className="text-[#9F2E2B] font-semibold">Assigned by rule</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <h5 className="font-semibold text-slate-900 mb-1">Unmatched Request Type</h5>
                    <p className="text-sm text-slate-600">
                      Priority 1: No JM → Priority 2: No rule → Priority 3: <span className="text-[#9F2E2B] font-semibold">Area fallback</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200">
          <button 
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#9F2E2B] rounded-lg hover:bg-[#7D2522] focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:ring-offset-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

