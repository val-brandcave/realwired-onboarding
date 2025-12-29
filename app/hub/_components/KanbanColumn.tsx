"use client";

import { useState } from "react";
import { ModuleCard } from "./ModuleCard";
import type { ModuleDetails, OnboardingModule } from "@/lib/onboarding-context";

interface KanbanColumnProps {
  title: string;
  count: number;
  color: 'blue' | 'orange' | 'red' | 'green';
  modules: ModuleDetails[];
  draggedModuleId: OnboardingModule | null;
  onDrop: (moduleId: OnboardingModule, reason?: string) => void;
  onModuleClick: (moduleId: OnboardingModule) => void;
  onDragStart: (moduleId: OnboardingModule) => void;
  onDragEnd: () => void;
  acceptsDrop?: boolean;
  requiresReason?: boolean;
}

export function KanbanColumn({ 
  title, 
  count, 
  color, 
  modules, 
  draggedModuleId,
  onDrop,
  onModuleClick,
  onDragStart,
  onDragEnd,
  acceptsDrop = true,
  requiresReason = false 
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showBlockerModal, setShowBlockerModal] = useState<OnboardingModule | null>(null);
  
  const colorClasses = {
    blue: {
      header: 'bg-teal-100 text-teal-800 border-teal-200',
      badge: 'bg-teal-600 text-white',
    },
    orange: {
      header: 'bg-orange-100 text-orange-800 border-orange-200',
      badge: 'bg-orange-600 text-white',
    },
    red: {
      header: 'bg-red-100 text-red-800 border-red-200',
      badge: 'bg-red-600 text-white',
    },
    green: {
      header: 'bg-green-100 text-green-800 border-green-200',
      badge: 'bg-green-600 text-white',
    },
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (acceptsDrop) {
      e.preventDefault();
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!acceptsDrop || !draggedModuleId) return;
    
    if (requiresReason) {
      // Show blocker modal
      setShowBlockerModal(draggedModuleId);
    } else {
      // Update status directly
      onDrop(draggedModuleId);
    }
  };

  const handleBlockerSubmit = (reason: string) => {
    if (showBlockerModal) {
      onDrop(showBlockerModal, reason);
      setShowBlockerModal(null);
    }
  };

  return (
    <div className="flex flex-col px-3">
      {/* Column Header - Colored Background */}
      <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg mb-4 border ${colorClasses[color].header}`}>
        <h3 className="text-sm font-bold uppercase tracking-wide">
          {title}
        </h3>
        <span className={`inline-flex items-center justify-center min-w-[24px] h-5 px-1.5 rounded-full text-xs font-bold ${colorClasses[color].badge}`}>
          {count}
        </span>
      </div>
      
      {/* Drop Zone */}
      <div
        className={`
          flex-1 space-y-3 min-h-[500px] transition-all relative
          ${isDragOver && acceptsDrop ? 'bg-blue-50/50 rounded-lg' : ''}
          ${isDragOver && !acceptsDrop ? 'bg-red-50/50 rounded-lg' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drop Zone Indicator */}
        {isDragOver && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`px-4 py-2 rounded-lg font-medium text-sm ${
              acceptsDrop 
                ? 'bg-blue-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {acceptsDrop ? 'Drop here to move' : 'Cannot move here'}
            </div>
          </div>
        )}
        
        {/* Module Cards */}
        {modules.map(module => (
          <ModuleCard 
            key={module.id} 
            module={module}
            onClick={() => onModuleClick(module.id)}
            onDragStart={() => onDragStart(module.id)}
            onDragEnd={onDragEnd}
            isDragging={draggedModuleId === module.id}
          />
        ))}
        
        {/* Empty State */}
        {modules.length === 0 && !isDragOver && (
          <div className="flex items-center justify-center h-full py-12">
            <p className="text-sm text-gray-400">No modules here</p>
          </div>
        )}
      </div>
      
      {/* Blocker Reason Modal */}
      {showBlockerModal && (
        <BlockerReasonModal
          isOpen={true}
          moduleId={showBlockerModal}
          onClose={() => setShowBlockerModal(null)}
          onSubmit={handleBlockerSubmit}
        />
      )}
    </div>
  );
}

// Blocker Reason Modal Component (inline for now)
function BlockerReasonModal({ 
  isOpen, 
  moduleId,
  onClose, 
  onSubmit 
}: { 
  isOpen: boolean; 
  moduleId: OnboardingModule;
  onClose: () => void; 
  onSubmit: (reason: string) => void;
}) {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');

  const reasons = [
    'Waiting on internal approval',
    'Technical issue / error',
    'Missing information from team',
    'Waiting on external party (IT, vendor, etc.)',
    'Need help from CS agent',
    'Other (please describe below)',
  ];

  const handleSubmit = () => {
    if (!selectedReason) return;
    const fullReason = details ? `${selectedReason}: ${details}` : selectedReason;
    onSubmit(fullReason);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-xl font-bold text-gray-900">
            What's blocking your progress?
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            This will notify your CS agent and create a support ticket.
          </p>
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Reason Options */}
          <div className="space-y-2">
            {reasons.map((reason) => (
              <label
                key={reason}
                className={`
                  flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all
                  ${selectedReason === reason 
                    ? 'border-[#9F2E2B] bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="blocker-reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="mt-1 text-[#9F2E2B] focus:ring-[#9F2E2B]"
                />
                <span className="text-sm text-gray-700">{reason}</span>
              </label>
            ))}
          </div>
          
          {/* Additional Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional details (optional)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide more context about what's blocking you..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 p-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedReason}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Blocker
          </button>
        </div>
      </div>
    </div>
  );
}

