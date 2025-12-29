"use client";

import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";

interface AvatarGroupProps {
  participantIds: string[];
  max?: number;
  showDropdown?: boolean;
}

export function AvatarGroup({ participantIds, max = 4, showDropdown = true }: AvatarGroupProps) {
  const { state } = useOnboarding();
  const [showAll, setShowAll] = useState(false);
  
  // Get participant details
  const allParticipants = [
    state.companySetup.primaryDecisionMaker,
    ...(state.companySetup.additionalParticipants || [])
  ].filter(Boolean);
  
  const participants = participantIds
    .map(id => allParticipants.find(p => p?.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== null && p !== undefined);
  
  const visibleParticipants = participants.slice(0, max);
  const remainingCount = Math.max(0, participants.length - max);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string): string => {
    // Generate consistent color based on name
    const colors = [
      '#9F2E2B', // Burgundy
      '#2563eb', // Blue
      '#059669', // Green
      '#d97706', // Amber
      '#7c3aed', // Purple
      '#dc2626', // Red
      '#0891b2', // Cyan
    ];
    
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  if (participants.length === 0) {
    return (
      <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
        ?
      </div>
    );
  }

  return (
    <div className="relative flex items-center">
      <div className="flex items-center -space-x-2">
        {visibleParticipants.map((participant, idx) => (
          <div
            key={participant.id}
            className="relative w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white shadow-sm transition-transform hover:scale-110 hover:z-10"
            style={{ backgroundColor: participant.avatarColor || getAvatarColor(participant.name) }}
            title={participant.name}
          >
            {getInitials(participant.name)}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div 
            className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-xs font-semibold text-white shadow-sm"
            title={`${remainingCount} more participant${remainingCount > 1 ? 's' : ''}`}
          >
            +{remainingCount}
          </div>
        )}
        
        {showDropdown && participants.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAll(!showAll);
            }}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Show all participants"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Dropdown Menu */}
      {showAll && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setShowAll(false)}
          />
          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px] z-30">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Assigned Participants
            </div>
            <div className="space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-2 py-1">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
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
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

