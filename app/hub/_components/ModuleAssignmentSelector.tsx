"use client";

import { useState } from "react";
import { useOnboarding, type OnboardingModule } from "@/lib/onboarding-context";

interface ModuleAssignmentSelectorProps {
  moduleId: OnboardingModule;
  isModule1Complete: boolean;
}

export function ModuleAssignmentSelector({ moduleId, isModule1Complete }: ModuleAssignmentSelectorProps) {
  const { state, updateModuleAssignment } = useOnboarding();
  const [showSelector, setShowSelector] = useState(false);
  
  // Get all available participants
  const allParticipants = [
    state.companySetup.primaryDecisionMaker,
    ...(state.companySetup.additionalParticipants || [])
  ].filter(Boolean);
  
  // Get currently assigned participants for this module
  const assignment = state.moduleAssignments.find(a => a.moduleId === moduleId);
  const assignedIds = assignment?.assignedParticipantIds || [];
  
  const assignedParticipants = assignedIds
    .map(id => allParticipants.find(p => p?.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== null && p !== undefined);
  
  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string): string => {
    const colors = ['#9F2E2B', '#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626', '#0891b2'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const toggleParticipant = (participantId: string) => {
    const newAssignedIds = assignedIds.includes(participantId)
      ? assignedIds.filter(id => id !== participantId)
      : [...assignedIds, participantId];
    
    updateModuleAssignment(moduleId, newAssignedIds);
  };

  // If Module 1 not complete, show locked state
  if (!isModule1Complete && moduleId !== 'company-setup') {
    return (
      <div className="flex items-center gap-2 opacity-50">
        <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
          🔒
        </div>
        <span className="text-xs text-gray-500">Complete Module 1 to assign</span>
      </div>
    );
  }

  return (
    <div className="relative flex items-center">
      {/* Avatar Display */}
      <div className="flex items-center -space-x-2">
        {assignedParticipants.slice(0, 4).map((participant) => (
          <div
            key={participant.id}
            className="relative w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white shadow-sm transition-transform hover:scale-110 hover:z-10"
            style={{ backgroundColor: participant.avatarColor || getAvatarColor(participant.name) }}
            title={participant.name}
          >
            {getInitials(participant.name)}
          </div>
        ))}
        
        {assignedParticipants.length > 4 && (
          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-xs font-semibold text-white shadow-sm">
            +{assignedParticipants.length - 4}
          </div>
        )}
        
        {/* Dropdown Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSelector(!showSelector);
          }}
          className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded hover:bg-gray-100"
          aria-label="Change assignments"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Assignment Selector Dropdown */}
      {showSelector && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setShowSelector(false)}
          />
          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[280px] z-30">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Assign Participants
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {allParticipants.map((participant) => (
                <label
                  key={participant.id}
                  className="flex items-center gap-3 py-2 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={assignedIds.includes(participant.id)}
                    onChange={() => toggleParticipant(participant.id)}
                    className="w-4 h-4 text-[#9F2E2B] border-gray-300 rounded focus:ring-[#9F2E2B]"
                  />
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: participant.avatarColor || getAvatarColor(participant.name) }}
                  >
                    {getInitials(participant.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {participant.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {participant.email}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => setShowSelector(false)}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

