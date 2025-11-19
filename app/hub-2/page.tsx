"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding, type OnboardingParticipant } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { CircularProgress } from "./_components/CircularProgress";
import { ModuleCard } from "./_components/ModuleCard";
import { UnifiedHelpCenter } from "./_components/UnifiedHelpCenter";
import { Snackbar } from "@/components/ui/Snackbar";

export default function HubPageV2() {
  const { state: originalState, updateModuleAssignment, resetModuleProgress, getSectionConfigStatus } = useOnboarding();
  const router = useRouter();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Target completion dates set by CS agent (same as edit-client page)
  const moduleTargetDates: Record<string, string> = {
    'organization-setup': '2025-12-01',
    'definitions': '2025-12-08',
    'users': '2025-12-15',
    'vendors': '2025-12-22',
    'routing': '2025-12-29',
    'general-settings': '2026-01-05',
    'it-checklist': '2026-02-12',
  };

  // Override state for Hub V2 demo - showing mid-stage with ~60% completion
  const state = useMemo(() => ({
    ...originalState,
    companySetup: {
      ...originalState.companySetup,
      completed: true, // Module 1: Completed
    },
    definitions: {
      ...originalState.definitions,
      completed: true, // Module 2: Completed
    },
    users: {
      ...originalState.users,
      completed: true, // Module 3: Completed
    },
    routing: {
      ...originalState.routing,
      completed: false, // Module 5: In Progress
    },
    generalSettings: {
      ...originalState.generalSettings,
      completed: false, // Module 6: Not Started
    },
    itChecklist: {
      ...originalState.itChecklist,
      completed: false, // Module 7: Not Started
    },
    moduleStatuses: {
      ...originalState.moduleStatuses,
      'company-setup': 'completed' as const,
      'definitions': 'completed' as const,
      'users': 'completed' as const,
      'vendors': 'in_progress' as const, // Module 4: In Progress
      'routing': 'not_started' as const,
      'general-settings': 'not_started' as const,
      'it-checklist': 'not_started' as const,
    },
    moduleProgress: {
      'organization-setup': { currentStep: 4, totalSteps: 4 }, // 100%
      'definitions': { currentStep: 4, totalSteps: 4 }, // 100%
      'users': { currentStep: 2, totalSteps: 2 }, // 100%
      'vendors': { currentStep: 2, totalSteps: 4 }, // 50% - In Progress
      'routing': { currentStep: 0, totalSteps: 2 }, // 0%
      'general-settings': { currentStep: 0, totalSteps: 3 }, // 0%
      'it-checklist': { currentStep: 0, totalSteps: 1 }, // 0%
    },
    moduleAssignments: [
      { moduleId: 'organization-setup', assignedParticipantIds: ['primary-decision-maker'] },
      { moduleId: 'definitions', assignedParticipantIds: ['primary-decision-maker'] },
      { moduleId: 'users', assignedParticipantIds: ['primary-decision-maker', 'participant-2'] },
      { moduleId: 'vendors', assignedParticipantIds: ['primary-decision-maker'] }, // Assigned to John Smith (current user)
      { moduleId: 'routing', assignedParticipantIds: ['primary-decision-maker', 'participant-4'] },
      { moduleId: 'general-settings', assignedParticipantIds: [] }, // Unassigned
      { moduleId: 'it-checklist', assignedParticipantIds: ['participant-2'] }, // Assigned to Sarah
    ],
    configuredSections: {
      'organization-setup-org-info': {
        isConfigured: true,
        configuredBy: 'Samuel Kite',
        configuredAt: '2024-11-10T14:30:00Z',
      },
      'organization-setup-branding': {
        isConfigured: true,
        configuredBy: 'Jennifer Martinez',
        configuredAt: '2024-11-11T09:15:00Z',
      },
      'definitions-property-categories': {
        isConfigured: true,
        configuredBy: 'Samuel Kite',
        configuredAt: '2024-11-12T16:45:00Z',
      },
      'vendors-vendor-types': {
        isConfigured: true,
        configuredBy: 'Jennifer Martinez',
        configuredAt: '2024-11-14T11:20:00Z',
      },
    },
  }), [originalState]);

  // Calculate days until go-live
  const getDaysUntilGoLive = () => {
    if (!state.projectedGoLiveDate) return null;
    const today = new Date();
    const goLiveDate = new Date(state.projectedGoLiveDate);
    const diffTime = goLiveDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilGoLive = getDaysUntilGoLive();

  // Get all participants
  const allParticipants = useMemo(() => {
    const participants: OnboardingParticipant[] = [];
    if (state.companySetup.primaryDecisionMaker) {
      participants.push(state.companySetup.primaryDecisionMaker);
    }
    if (state.companySetup.additionalParticipants) {
      participants.push(...state.companySetup.additionalParticipants);
    }
    return participants;
  }, [state.companySetup.primaryDecisionMaker, state.companySetup.additionalParticipants]);

  // Calculate module progress
  const getModuleProgress = (moduleId: string) => {
    const progress = state.moduleProgress[moduleId];
    if (!progress) return 0;
    return Math.round((progress.currentStep / progress.totalSteps) * 100);
  };

  const getProgressDetails = (moduleId: string) => {
    const progress = state.moduleProgress[moduleId];
    if (!progress) return null;
    return {
      currentStep: progress.currentStep,
      totalSteps: progress.totalSteps,
      percentage: Math.round((progress.currentStep / progress.totalSteps) * 100),
    };
  };

  // Handle module start
  const handleModuleStart = (modulePath: string, moduleId: string) => {
    resetModuleProgress(moduleId);
    router.push(modulePath);
  };

  // Get assigned participants for a module
  const getModuleParticipants = (moduleId: string) => {
    const assignment = state.moduleAssignments?.find(a => a.moduleId === moduleId);
    const assignedIds = assignment?.assignedParticipantIds || ['primary-decision-maker'];
    return allParticipants.filter(p => assignedIds.includes(p.id));
  };

  // Handle assignment update
  const handleUpdateAssignment = (moduleId: string, moduleTitle: string) => (participantIds: string[]) => {
    updateModuleAssignment(moduleId, participantIds);
    const participantNames = allParticipants
      .filter(p => participantIds.includes(p.id))
      .map(p => p.name)
      .join(', ');
    setSnackbarMessage(`Updated assignments for ${moduleTitle}: ${participantNames || 'No one assigned'}`);
    setShowSnackbar(true);
  };

  // Define modules
  const modules = [
    {
      id: 'organization-setup',
      moduleNumber: 1,
      title: 'Organization Setup',
      description: 'Set up organization info, branding, onboarding participants, and IT configuration',
      completed: state.companySetup.completed,
      path: '/organization-setup-intro',
      duration: '8 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'definitions',
      moduleNumber: 2,
      title: 'Definitions',
      description: 'Setup property categories, request types, and configure form fields',
      completed: state.definitions.completed,
      path: '/definitions-intro',
      duration: '18 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'users',
      moduleNumber: 3,
      title: 'Users Setup',
      description: 'Download template, fill in team details, and upload for CS team configuration',
      completed: state.users.completed,
      path: '/users-intro',
      duration: '5 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'vendors',
      moduleNumber: 4,
      title: 'Vendors Setup',
      description: 'Configure vendor types, credentials, classifications, search criteria, then upload template',
      completed: state.moduleStatuses['vendors'] === 'completed',
      path: '/vendors-intro',
      duration: '8 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'routing',
      moduleNumber: 5,
      title: 'Routing',
      description: 'Create routing rules to automatically assign orders (Request Type, Logical, Assigned Area)',
      completed: state.routing.completed,
      path: '/routing-intro',
      duration: '12 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      id: 'general-settings',
      moduleNumber: 6,
      title: 'General Settings',
      description: 'Configure workflow timers, notifications, and bid engagement panel settings',
      completed: state.generalSettings.completed,
      path: '/general-settings-intro',
      duration: '8 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'it-checklist',
      moduleNumber: 7,
      title: 'IT Readiness Checklist',
      description: 'Ensure your team can access YouConnect without technical issues',
      completed: state.itChecklist.completed,
      path: '/it-checklist-intro',
      duration: '2 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const completedModules = modules.filter(m => m.completed).length;
  const module1Completed = modules[0].completed;
  const overallProgress = Math.round((completedModules / modules.length) * 100);

  // Determine module status
  const getModuleStatus = (module: typeof modules[0], index: number): 'completed' | 'ready' | 'unassigned' | 'in-progress' => {
    if (module.completed) return 'completed';
    
    const currentUserId = 'primary-decision-maker';
    const moduleAssignment = state.moduleAssignments.find(a => a.moduleId === module.id);
    const isAssigned = moduleAssignment?.assignedParticipantIds.includes(currentUserId);
    const hasAnyAssignee = moduleAssignment && moduleAssignment.assignedParticipantIds.length > 0;
    
    // Check if module has any progress (indicates in-progress state)
    const progress = getModuleProgress(module.id);
    if (progress > 0 && progress < 100 && hasAnyAssignee) {
      return 'in-progress';
    }
    
    if (index === 0 && isAssigned) return 'ready';
    if (!module1Completed) return 'unassigned';
    if (isAssigned) return 'ready';
    if (hasAnyAssignee) return 'ready'; // Assigned to someone else
    return 'unassigned';
  };
  
  // Find next module - prioritize in-progress, then ready modules
  const nextModule = useMemo(() => {
    const inProgress = modules.find((m, i) => getModuleStatus(m, i) === 'in-progress');
    if (inProgress) return inProgress;
    return modules.find(m => !m.completed);
  }, [modules]);

  // Get CS configured sections
  const getConfiguredSections = (moduleId: string): string[] => {
    const sections: string[] = [];
    if (moduleId === 'organization-setup') {
      if (getSectionConfigStatus('organization-setup-org-info').isConfigured) sections.push('Org Info');
      if (getSectionConfigStatus('organization-setup-branding').isConfigured) sections.push('Branding');
      if (getSectionConfigStatus('organization-setup-it-config').isConfigured) sections.push('IT Config');
    } else if (moduleId === 'definitions') {
      if (getSectionConfigStatus('definitions-property-categories').isConfigured) sections.push('Properties');
      if (getSectionConfigStatus('definitions-request-types').isConfigured) sections.push('Requests');
    } else if (moduleId === 'vendors') {
      if (getSectionConfigStatus('vendors-vendor-types').isConfigured) sections.push('Vendor Setup');
    } else if (moduleId === 'routing') {
      if (getSectionConfigStatus('routing-request-type-routing').isConfigured) sections.push('Routing Rules');
    }
    return sections;
  };

  // Categorize modules
  const todoModules = modules.filter((m, i) => {
    const status = getModuleStatus(m, i);
    return status === 'ready' && !m.completed;
  });

  const inProgressModules = modules.filter((m, i) => {
    const status = getModuleStatus(m, i);
    return status === 'in-progress';
  });

  const completedMods = modules.filter(m => m.completed);
  const unassignedModules = modules.filter((m, i) => {
    const status = getModuleStatus(m, i);
    return status === 'unassigned';
  });

  // Show confetti on 100%
  useEffect(() => {
    if (overallProgress === 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [overallProgress]);

  return (
    <MainLayout currentStep={0} steps={[]} title="YouConnect Onboarding Hub">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#9F2E2B', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotateZ(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotateZ(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Dashboard */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-5 py-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Live Tracking</h2>
              </div>
            </div>

            {/* Content: Two-column layout */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* Left: Go-Live Date Info */}
                <div className="space-y-4">
                  {/* Go-Live Date */}
                  <div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      Go-Live Date
                    </div>
                    <div className="text-base font-bold text-slate-900 leading-tight">
                      {state.projectedGoLiveDate ? new Date(state.projectedGoLiveDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : 'Not set'}
                    </div>
                  </div>

                  {/* Days Remaining */}
                  {daysUntilGoLive !== null && (
                    <div>
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                        Time Left
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm ${
                        daysUntilGoLive < 0
                          ? 'bg-red-100 text-red-700'
                          : daysUntilGoLive <= 7
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          {daysUntilGoLive < 0
                            ? `${Math.abs(daysUntilGoLive)} days overdue`
                            : daysUntilGoLive === 0
                            ? 'Today!'
                            : daysUntilGoLive === 1
                            ? '1 day'
                            : `${daysUntilGoLive} days`}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      Status
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs ${
                      daysUntilGoLive !== null && daysUntilGoLive < 0
                        ? 'bg-red-100 text-red-700'
                        : daysUntilGoLive !== null && daysUntilGoLive <= 7
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        daysUntilGoLive !== null && daysUntilGoLive < 0
                          ? 'bg-red-500'
                          : daysUntilGoLive !== null && daysUntilGoLive <= 7
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                      }`}></div>
                      {daysUntilGoLive !== null && daysUntilGoLive < 0
                        ? 'Behind Schedule'
                        : daysUntilGoLive !== null && daysUntilGoLive <= 7
                        ? 'At Risk'
                        : 'On Track'}
                    </div>
                  </div>
                </div>

                {/* Right: Progress Donut */}
                <div className="flex items-center justify-center">
                  <CircularProgress
                    percentage={overallProgress}
                    daysRemaining={null}
                    completedModules={completedModules}
                    totalModules={modules.length}
                    size={160}
                    strokeWidth={14}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Next Module Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl shadow-lg border-2 border-primary/30 p-6">
            {nextModule ? (
              <div className="h-full flex flex-col">
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  Your Next Module
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {nextModule.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{nextModule.title}</h2>
                    <span className="inline-block px-2 py-1 bg-slate-900 text-white text-xs font-bold rounded mt-1">
                      Module {nextModule.moduleNumber}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 mb-4 flex-1">{nextModule.description}</p>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>{nextModule.duration}</strong> estimated</span>
                  </div>

                  {getModuleParticipants(nextModule.id).length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600">Assigned:</span>
                      <div className="flex -space-x-2">
                        {getModuleParticipants(nextModule.id).slice(0, 3).map((p) => (
                          <div
                            key={p.id}
                            className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                            style={{ backgroundColor: p.avatarColor }}
                            title={p.name}
                          >
                            {p.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => router.push(nextModule.path)}
                  className="mt-6 w-full sm:w-auto px-8 py-3 text-base font-bold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-xl hover:from-[#8A2826] hover:to-[#6B1F1D] shadow-xl hover:shadow-2xl transition-all"
                >
                  Start Module →
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">All Modules Complete! 🎉</h2>
                <p className="text-slate-600 max-w-md">
                  Excellent work! Your YouConnect instance is fully configured.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">To Do</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                {todoModules.length + unassignedModules.length}
              </span>
            </div>
            <div className="space-y-4">
              {[...todoModules, ...unassignedModules].map((module, index) => {
                const status = getModuleStatus(module, modules.indexOf(module));
                const progressDetails = getProgressDetails(module.id);
                return (
                  <ModuleCard
                    key={module.id}
                    id={module.id}
                    moduleNumber={module.moduleNumber}
                    title={module.title}
                    description={module.description}
                    icon={module.icon}
                    status={status}
                    progress={getModuleProgress(module.id)}
                    currentStep={progressDetails?.currentStep}
                    totalSteps={progressDetails?.totalSteps}
                    duration={module.duration}
                    targetDate={moduleTargetDates[module.id]}
                    assignedParticipants={getModuleParticipants(module.id)}
                    availableParticipants={allParticipants}
                    path={module.path}
                    configuredSections={getConfiguredSections(module.id)}
                    onStart={() => handleModuleStart(module.path, module.id)}
                    onReview={() => router.push(`/review/${module.id}`)}
                    onEdit={() => handleModuleStart(module.path, module.id)}
                    onUpdateAssignment={handleUpdateAssignment(module.id, module.title)}
                    isModule1={module.id === 'organization-setup'}
                  />
                );
              })}
              {todoModules.length === 0 && unassignedModules.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">No modules to start</p>
                </div>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">In Progress</h3>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                {inProgressModules.length}
              </span>
            </div>
            <div className="space-y-4">
              {inProgressModules.map((module, index) => {
                const status = getModuleStatus(module, modules.indexOf(module));
                const progressDetails = getProgressDetails(module.id);
                return (
                  <ModuleCard
                    key={module.id}
                    id={module.id}
                    moduleNumber={module.moduleNumber}
                    title={module.title}
                    description={module.description}
                    icon={module.icon}
                    status={status}
                    progress={getModuleProgress(module.id)}
                    currentStep={progressDetails?.currentStep}
                    totalSteps={progressDetails?.totalSteps}
                    duration={module.duration}
                    targetDate={moduleTargetDates[module.id]}
                    assignedParticipants={getModuleParticipants(module.id)}
                    availableParticipants={allParticipants}
                    path={module.path}
                    configuredSections={getConfiguredSections(module.id)}
                    onStart={() => handleModuleStart(module.path, module.id)}
                    onReview={() => router.push(`/review/${module.id}`)}
                    onEdit={() => handleModuleStart(module.path, module.id)}
                    onUpdateAssignment={handleUpdateAssignment(module.id, module.title)}
                    isModule1={module.id === 'organization-setup'}
                  />
                );
              })}
              {inProgressModules.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-sm">No modules in progress</p>
                </div>
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Completed</h3>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                {completedMods.length}
              </span>
            </div>
            <div className="space-y-4">
              {completedMods.map((module, index) => {
                const status = getModuleStatus(module, modules.indexOf(module));
                const progressDetails = getProgressDetails(module.id);
                return (
                  <ModuleCard
                    key={module.id}
                    id={module.id}
                    moduleNumber={module.moduleNumber}
                    title={module.title}
                    description={module.description}
                    icon={module.icon}
                    status={status}
                    progress={100}
                    currentStep={progressDetails?.totalSteps}
                    totalSteps={progressDetails?.totalSteps}
                    duration={module.duration}
                    targetDate={moduleTargetDates[module.id]}
                    assignedParticipants={getModuleParticipants(module.id)}
                    availableParticipants={allParticipants}
                    path={module.path}
                    configuredSections={getConfiguredSections(module.id)}
                    onStart={() => handleModuleStart(module.path, module.id)}
                    onReview={() => router.push(`/review/${module.id}`)}
                    onEdit={() => handleModuleStart(module.path, module.id)}
                    onUpdateAssignment={handleUpdateAssignment(module.id, module.title)}
                    isModule1={module.id === 'organization-setup'}
                  />
                );
              })}
              {completedMods.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <p className="text-sm">No completed modules yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Unified Help Center (Chat + CS Team) */}
      <UnifiedHelpCenter />

      {/* Snackbar */}
      <Snackbar
        message={snackbarMessage}
        isVisible={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        type="success"
      />
    </MainLayout>
  );
}

