"use client";

import { useRouter } from "next/navigation";
import { ModuleAssignmentSelector } from "./ModuleAssignmentSelector";
import type { OnboardingModule, ModuleDetails } from "@/lib/onboarding-context";
import { useOnboarding } from "@/lib/onboarding-context";

interface ModuleMetadata {
  number: number;
  title: string;
  description: string;
  duration: string;
  route: string;
}

const MODULE_METADATA: Record<OnboardingModule, ModuleMetadata> = {
  'company-setup': {
    number: 1,
    title: 'Organization Setup',
    description: 'Configure your organization info, branding, onboarding participants, and IT security settings to get started.',
    duration: '8 Min',
    route: '/organization-setup-intro',
  },
  'definitions': {
    number: 2,
    title: 'Definitions',
    description: 'Setup property categories, request types, and configure form fields for your property records and request forms.',
    duration: '18 Min',
    route: '/definitions-intro',
  },
  'users': {
    number: 3,
    title: 'Users Setup',
    description: 'Configure vendor types, credentials, classifications, search criteria, then upload template with your team roster.',
    duration: '5 Min',
    route: '/users-intro',
  },
  'vendors': {
    number: 4,
    title: 'Vendors Setup',
    description: 'Configure vendor types, credentials, classifications, search criteria, then upload template with vendor contacts.',
    duration: '5 Min',
    route: '/vendors-intro',
  },
  'routing': {
    number: 5,
    title: 'Routing',
    description: 'Configure smart routing rules based on request type, location, or custom logic to automatically assign work.',
    duration: '12 Min',
    route: '/routing-intro',
  },
  'general-settings': {
    number: 6,
    title: 'General Settings',
    description: 'Configure workflow timers, notification policies, review approval requirements, and bid engagement settings.',
    duration: '8 Min',
    route: '/general-settings-intro',
  },
  'it-checklist': {
    number: 7,
    title: 'IT Readiness Checklist',
    description: 'Confirm IT team has completed essential setup tasks including email allowlisting and URL access verification.',
    duration: '2 Min',
    route: '/it-checklist-intro',
  },
};

interface NextModuleHeroProps {
  moduleId: OnboardingModule;
}

export function NextModuleHero({ moduleId }: NextModuleHeroProps) {
  const router = useRouter();
  const { state } = useOnboarding();
  const metadata = MODULE_METADATA[moduleId];
  
  // Check if Module 1 is complete
  const isModule1Complete = state.moduleStatuses['company-setup'] === 'completed';

  const handleStart = () => {
    router.push(metadata.route);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow mb-8">
      {/* Full-Width Compact Layout */}
      <div className="flex items-center p-5 gap-5">
        {/* Video Thumbnail - Proper Size */}
        <div className="relative w-40 h-24 flex-shrink-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-lg overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }} />
          
          {/* Play Button */}
          <button 
            className="absolute inset-0 flex items-center justify-center group"
            aria-label="Play module walkthrough video"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Open video modal
            }}
          >
            <div className="w-12 h-12 bg-[#9F2E2B] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </button>
          
          {/* Video duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
            2:30
          </div>
        </div>
      
        {/* Content - Flex Grow */}
        <div className="flex-1 min-w-0">
          {/* Label */}
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
            YOUR NEXT MODULE
          </p>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {metadata.title}
          </h2>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            {metadata.description}
          </p>
          
          {/* Meta Info Row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
              Module {metadata.number}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
              ⏱ {metadata.duration}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Assigned to:</span>
              <ModuleAssignmentSelector 
                moduleId={moduleId}
                isModule1Complete={isModule1Complete}
              />
            </div>
          </div>
        </div>
        
        {/* Get Started Button - Right Side */}
        <div className="flex-shrink-0">
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg hover:shadow-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all flex items-center gap-2 group"
          >
            <span>Get started</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

