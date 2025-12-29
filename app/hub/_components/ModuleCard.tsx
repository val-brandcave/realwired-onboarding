"use client";

import { useRouter } from "next/navigation";
import { ModuleAssignmentSelector } from "./ModuleAssignmentSelector";
import type { ModuleDetails, OnboardingModule } from "@/lib/onboarding-context";
import { useOnboarding } from "@/lib/onboarding-context";

interface ModuleMetadata {
  number: number;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  totalSteps: number;
  route: string;
}

const MODULE_METADATA: Record<OnboardingModule, ModuleMetadata> = {
  'company-setup': {
    number: 1,
    title: 'Organization Setup',
    description: 'Configure vendor types, credentials, classifications, search criteria, then upload template',
    duration: '8 Min',
    totalSteps: 4,
    route: '/organization-setup-intro',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  'definitions': {
    number: 2,
    title: 'Definitions',
    description: 'Configure vendor types, credentials, classifications, search criteria, then upload template',
    duration: '18 Min',
    totalSteps: 7,
    route: '/definitions-intro',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  'users': {
    number: 3,
    title: 'Users Setup',
    description: 'Configure vendor types, credentials, classifications, search criteria, then upload template',
    duration: '5 Min',
    totalSteps: 2,
    route: '/users-intro',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  'vendors': {
    number: 4,
    title: 'Vendors Setup',
    description: 'Configure vendor types, credentials, classifications, search criteria, then upload template',
    duration: '5 Min',
    totalSteps: 2,
    route: '/vendors-intro',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  'routing': {
    number: 5,
    title: 'Routing',
    description: 'Configure vendor types, credentials, classifications, search criteria, then upload template',
    duration: '12 Min',
    totalSteps: 3,
    route: '/routing-intro',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  'general-settings': {
    number: 6,
    title: 'General Settings',
    description: 'Configure vendor types, credentials, classifications, search criteria, then upload template',
    duration: '8 Min',
    totalSteps: 3,
    route: '/general-settings-intro',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  'it-checklist': {
    number: 7,
    title: 'IT Readiness Checklist',
    description: 'Configure vendor types, credentials, classifications, search criteria, then upload template',
    duration: '2 Min',
    totalSteps: 1,
    route: '/it-checklist-intro',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
};

interface ModuleCardProps {
  module: ModuleDetails;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

export function ModuleCard({ module, onClick, onDragStart, onDragEnd, isDragging }: ModuleCardProps) {
  const router = useRouter();
  const { state } = useOnboarding();
  const metadata = MODULE_METADATA[module.id];
  const isDraggable = module.status !== 'completed';
  
  // Check if Module 1 (company-setup) is complete
  const isModule1Complete = state.moduleStatuses['company-setup'] === 'completed';

  const getProgressColor = (progress: number): string => {
    if (progress === 0) return 'bg-gray-300';
    if (progress < 50) return 'bg-orange-400';
    if (progress < 100) return 'bg-amber-400';
    return 'bg-green-500';
  };

  const getStatusBadge = () => {
    switch (module.status) {
      case 'not_started':
        return <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">▶ To Do</span>;
      case 'in_progress':
        return <span className="inline-flex items-center px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">● In Progress</span>;
      case 'blocked':
        return <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">🔴 Blocked</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">✓ Completed</span>;
    }
  };

  const renderActionButton = () => {
    switch (module.status) {
      case 'not_started':
        return (
          <button 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="w-full py-2.5 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Start</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        );
      case 'in_progress':
        return (
          <button 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="w-full py-2.5 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        );
      case 'blocked':
        return (
          <button 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="w-full py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Resolve Block</span>
          </button>
        );
      case 'completed':
        return (
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="flex-1 py-2 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#9F2E2B] hover:text-[#9F2E2B] transition-colors text-sm"
            >
              Review
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="flex-1 py-2 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-medium rounded-lg hover:shadow-lg transition-all text-sm"
            >
              Edit
            </button>
          </div>
        );
    }
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={(e) => {
        if (!isDraggable) {
          e.preventDefault();
          return;
        }
        e.dataTransfer.effectAllowed = 'move';
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      className={`
        bg-white rounded-lg border-2 border-gray-200 p-5 
        transition-all hover:shadow-md
        ${isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      {/* Header: Module Number + Status Badge */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-gray-600 font-medium">
          Module {metadata.number}
        </span>
        {getStatusBadge()}
      </div>
      
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 flex items-center justify-center text-gray-700">
          {metadata.icon}
        </div>
      </div>
      
      {/* Title */}
      <h4 className="text-lg font-bold text-gray-900 text-center mb-2">
        {metadata.title}
      </h4>
      
      {/* Duration Badge */}
      <div className="flex justify-center mb-3">
        <span className="text-sm text-gray-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
          {metadata.duration}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm text-gray-600 text-center mb-4 leading-snug line-clamp-3 min-h-[60px]">
        {metadata.description}
      </p>
      
      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span className="font-semibold">{module.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(module.progress)}`}
            style={{ width: `${module.progress}%` }}
          />
        </div>
      </div>
      
      {/* Step Indicator */}
      <div className="text-center text-xs text-gray-500 mb-4">
        Step {module.currentStep} of {metadata.totalSteps}
      </div>
      
      {/* Module Assignment Selector */}
      <div className="flex justify-center mb-4">
        <ModuleAssignmentSelector 
          moduleId={module.id}
          isModule1Complete={isModule1Complete}
        />
      </div>
      
      {/* Action Button */}
      {renderActionButton()}
      
      {/* Blocker Info (if blocked) */}
      {module.status === 'blocked' && module.blockerReason && (
        <div className="mt-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-2.5">
          <div className="font-semibold mb-1">Blocked:</div>
          <div className="text-red-600">{module.blockerReason}</div>
        </div>
      )}
    </div>
  );
}

