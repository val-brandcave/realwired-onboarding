"use client";

import { useState } from "react";
import type { OnboardingParticipant } from "@/lib/onboarding-context";

interface AssignmentManagerProps {
  moduleId: string;
  moduleTitle: string;
  assignedParticipants: OnboardingParticipant[];
  availableParticipants: OnboardingParticipant[];
  onUpdateAssignment: (participantIds: string[]) => void;
  disabled?: boolean;
}

export function AssignmentManager({
  moduleId,
  moduleTitle,
  assignedParticipants,
  availableParticipants,
  onUpdateAssignment,
  disabled = false,
}: AssignmentManagerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const assignedIds = assignedParticipants.map(p => p.id);
  const unassignedParticipants = availableParticipants.filter(p => !assignedIds.includes(p.id));

  const handleToggleParticipant = (participantId: string) => {
    if (assignedIds.includes(participantId)) {
      // Remove participant
      const newIds = assignedIds.filter(id => id !== participantId);
      onUpdateAssignment(newIds);
    } else {
      // Add participant
      onUpdateAssignment([...assignedIds, participantId]);
    }
  };

  const handleAssignToMe = () => {
    const currentUserId = 'primary-decision-maker'; // In real app, get from auth
    if (!assignedIds.includes(currentUserId)) {
      onUpdateAssignment([...assignedIds, currentUserId]);
    }
  };

  if (disabled) {
    return (
      <div className="bg-slate-100 rounded-lg p-3 border border-slate-200">
        <div className="text-xs text-slate-500 text-center">
          Assignment locked for this module
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-between"
      >
        <span>Manage Assignments</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Popover */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-slate-200 z-20 max-h-64 overflow-y-auto">
            <div className="p-3 space-y-3">
              {/* Currently Assigned */}
              {assignedParticipants.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                    Currently Assigned
                  </div>
                  <div className="space-y-1">
                    {assignedParticipants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg group hover:bg-red-50 transition-colors"
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                          style={{ backgroundColor: participant.avatarColor }}
                        >
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-slate-900 truncate">{participant.name}</div>
                          {participant.role && (
                            <div className="text-xs text-slate-500 truncate">{participant.role}</div>
                          )}
                        </div>
                        <button
                          onClick={() => handleToggleParticipant(participant.id)}
                          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                          title="Remove"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available to Assign */}
              {unassignedParticipants.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                    Available to Assign
                  </div>
                  <div className="space-y-1">
                    {unassignedParticipants.map((participant) => (
                      <button
                        key={participant.id}
                        onClick={() => handleToggleParticipant(participant.id)}
                        className="w-full flex items-center gap-2 p-2 bg-white rounded-lg group hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300"
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                          style={{ backgroundColor: participant.avatarColor }}
                        >
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="text-xs font-medium text-slate-900 truncate">{participant.name}</div>
                          {participant.role && (
                            <div className="text-xs text-slate-500 truncate">{participant.role}</div>
                          )}
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Action: Assign to Me */}
              {!assignedIds.includes('primary-decision-maker') && (
                <div className="pt-2 border-t border-slate-200">
                  <button
                    onClick={handleAssignToMe}
                    className="w-full px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Assign to Me
                  </button>
                </div>
              )}

              {/* Empty State */}
              {assignedParticipants.length === 0 && unassignedParticipants.length === 0 && (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-500">No participants available</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

