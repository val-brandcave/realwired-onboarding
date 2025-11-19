"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OnboardingParticipant } from "@/lib/onboarding-context";
import { AssignmentManager } from "./AssignmentManager";

interface ModuleCardProps {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'ready' | 'unassigned' | 'in-progress';
  progress: number;
  currentStep?: number;
  totalSteps?: number;
  duration: string;
  targetDate?: string; // New: ISO date string (YYYY-MM-DD)
  assignedParticipants: OnboardingParticipant[];
  availableParticipants: OnboardingParticipant[];
  path: string;
  configuredSections?: string[];
  onStart: () => void;
  onReview: () => void;
  onEdit: () => void;
  onUpdateAssignment: (participantIds: string[]) => void;
  isModule1?: boolean;
}

export function ModuleCard({
  id,
  moduleNumber,
  title,
  description,
  icon,
  status,
  progress,
  currentStep,
  totalSteps,
  duration,
  targetDate,
  assignedParticipants,
  availableParticipants,
  configuredSections = [],
  onStart,
  onReview,
  onEdit,
  onUpdateAssignment,
  isModule1 = false,
}: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const statusConfig = {
    completed: { dot: '🟢', color: 'bg-green-100 border-green-300', label: 'Completed' },
    ready: { dot: '🔵', color: 'bg-blue-100 border-blue-300', label: 'Ready' },
    unassigned: { dot: '🟡', color: 'bg-amber-100 border-amber-300', label: 'Not Assigned' },
    'in-progress': { dot: '🟣', color: 'bg-purple-100 border-purple-300', label: 'In Progress' },
  };

  const config = statusConfig[status];
  const displayedAvatars = assignedParticipants.slice(0, 3);
  const remainingCount = assignedParticipants.length - 3;

  return (
    <div
      className={`relative group transition-all duration-300 ${
        isExpanded ? 'col-span-1 row-span-2' : ''
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`relative bg-white rounded-xl border-2 transition-all duration-300 h-full ${
          config.color
        } ${
          isExpanded
            ? 'shadow-2xl scale-105 z-10'
            : 'shadow-sm hover:shadow-md'
        }`}
      >
        {/* Status dot (top-right) */}
        <div className="absolute top-3 right-3 text-2xl">
          {config.dot}
        </div>

        {/* Module number badge (top-left) */}
        <div className="absolute top-3 left-3 w-6 h-6 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {moduleNumber}
        </div>

        {/* Card content */}
        <div className="p-6 pt-12">
          {/* Icon */}
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all ${
            status === 'completed'
              ? 'bg-green-500 text-white'
              : status === 'in-progress'
              ? 'bg-purple-500 text-white'
              : status === 'ready'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-300 text-slate-500'
          }`}>
            {status === 'completed' ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <div className="scale-125">{icon}</div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-center font-bold text-slate-900 text-base mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Mini progress bar */}
          {!isExpanded && (
            <div className="mb-3">
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    status === 'completed'
                      ? 'bg-green-500'
                      : status === 'in-progress'
                      ? 'bg-purple-500'
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              {totalSteps && (
                <div className="flex justify-center gap-1 mt-2">
                  {Array.from({ length: totalSteps }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx < (currentStep || 0)
                          ? 'bg-green-500'
                          : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Compact info */}
          {!isExpanded && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {duration}
                </span>
              </div>
              
              {/* Target date badge */}
              {targetDate && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-lg border border-blue-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(targetDate)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Avatar stack */}
          {!isExpanded && assignedParticipants.length > 0 && (
            <div className="flex justify-center -space-x-2 mt-3">
              {displayedAvatars.map((participant) => (
                <div
                  key={participant.id}
                  className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                  style={{ backgroundColor: participant.avatarColor }}
                  title={participant.name}
                >
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </div>
              ))}
              {remainingCount > 0 && (
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-white text-xs font-semibold">
                  +{remainingCount}
                </div>
              )}
            </div>
          )}

          {/* Expanded content */}
          {isExpanded && (
            <div className="mt-4 space-y-4 animate-fade-in">
              {/* Description */}
              <p className="text-sm text-slate-600 text-center leading-relaxed">
                {description}
              </p>

              {/* Detailed progress */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-700">Progress</span>
                  <span className="text-sm font-bold text-slate-900">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      status === 'completed'
                        ? 'bg-green-500'
                        : status === 'in-progress'
                        ? 'bg-purple-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {currentStep && totalSteps && (
                  <div className="text-xs text-slate-500 mt-1 text-center">
                    Step {currentStep} of {totalSteps}
                  </div>
                )}
              </div>

              {/* Target completion date */}
              {targetDate && (
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-900">Expected Completion</span>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(targetDate)}
                    </div>
                  </div>
                </div>
              )}

              {/* CS Configured badges */}
              {configuredSections.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-xs font-medium text-blue-900 mb-2">
                    ✓ CS Team Configured:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {configuredSections.map((section, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignment Management */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-700">
                  {assignedParticipants.length > 0 ? 'Assigned to:' : 'No one assigned yet'}
                </div>
                
                {/* Current Assignments Display */}
                {assignedParticipants.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {assignedParticipants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-lg"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                          style={{ backgroundColor: participant.avatarColor }}
                        >
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs text-slate-700">{participant.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Assignment Manager */}
                <AssignmentManager
                  moduleId={id}
                  moduleTitle={title}
                  assignedParticipants={assignedParticipants}
                  availableParticipants={availableParticipants}
                  onUpdateAssignment={onUpdateAssignment}
                  disabled={isModule1}
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                {status === 'completed' && (
                  <>
                    <button
                      onClick={onReview}
                      className="flex-1 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Review
                    </button>
                    <button
                      onClick={onEdit}
                      className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Edit
                    </button>
                  </>
                )}
                {(status === 'ready' || status === 'in-progress') && (
                  <button
                    onClick={onStart}
                    className="w-full px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md"
                  >
                    {status === 'in-progress' || progress > 0 ? 'Continue →' : 'Start →'}
                  </button>
                )}
                {status === 'unassigned' && (
                  <button
                    disabled
                    className="w-full px-3 py-2 text-xs font-medium text-slate-500 bg-slate-200 rounded-lg cursor-not-allowed"
                  >
                    Not Assigned
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

