"use client";

import { OnboardingParticipant } from "@/lib/onboarding-context";
import { useState, useRef, useEffect } from "react";

interface ParticipantSelectorProps {
  participants: OnboardingParticipant[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  moduleTitle: string;
  onAssign?: (selectedIds: string[]) => void;
  disabled?: boolean;
}

export function ParticipantSelector({
  participants,
  selectedIds,
  onChange,
  moduleTitle,
  onAssign,
  disabled = false
}: ParticipantSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedIds, setTempSelectedIds] = useState<string[]>(selectedIds);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleParticipant = (id: string) => {
    if (tempSelectedIds.includes(id)) {
      // Don't allow removing the last participant
      if (tempSelectedIds.length > 1) {
        setTempSelectedIds(tempSelectedIds.filter(pid => pid !== id));
      }
    } else {
      setTempSelectedIds([...tempSelectedIds, id]);
    }
  };

  const handleAssign = () => {
    onChange(tempSelectedIds);
    if (onAssign) {
      onAssign(tempSelectedIds);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedIds(selectedIds);
    setIsOpen(false);
  };

  const selectedParticipants = participants.filter(p => selectedIds.includes(p.id));
  
  // Generate avatar initials
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
          disabled 
            ? 'text-muted-foreground bg-muted/50 cursor-not-allowed' 
            : 'text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80'
        }`}
      >
        <div className="flex -space-x-2">
          {selectedParticipants.slice(0, 3).map(participant => (
            <div
              key={participant.id}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
              style={{ backgroundColor: participant.avatarColor }}
              title={participant.name}
            >
              {getInitials(participant.name)}
            </div>
          ))}
          {selectedParticipants.length > 3 && (
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-400 text-white text-xs font-semibold border-2 border-white">
              +{selectedParticipants.length - 3}
            </div>
          )}
        </div>
        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-72 bg-white rounded-lg shadow-lg border border-border p-3">
          <div className="text-xs font-semibold text-foreground mb-2">
            Assign Participants: {moduleTitle}
          </div>
          <div className="space-y-1.5 max-h-60 overflow-y-auto">
            {participants.map(participant => {
              const isSelected = tempSelectedIds.includes(participant.id);
              const isLast = tempSelectedIds.length === 1 && isSelected;
              
              return (
                <label
                  key={participant.id}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-primary/5' : 'hover:bg-muted'
                  } ${isLast ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => !isLast && toggleParticipant(participant.id)}
                    disabled={isLast}
                    className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                  />
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                    style={{ backgroundColor: participant.avatarColor }}
                  >
                    {getInitials(participant.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <div className="text-xs font-medium text-foreground truncate">{participant.name}</div>
                      {participant.role && (
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded shrink-0">
                          {participant.role}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{participant.email}</div>
                  </div>
                  {participant.id === 'primary-decision-maker' && (
                    <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded shrink-0">Primary</span>
                  )}
                </label>
              );
            })}
          </div>
          {tempSelectedIds.length === 1 && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                At least one participant must be assigned
              </p>
            </div>
          )}
          
          {/* Action Buttons */}
          {onAssign && (
            <div className="mt-3 pt-3 border-t border-border flex gap-2">
              <button
                onClick={handleCancel}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#9F2E2B] rounded-lg hover:bg-[#8A2826] transition-colors"
              >
                Assign
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

