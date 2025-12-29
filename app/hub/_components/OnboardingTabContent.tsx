"use client";

import { useRouter } from "next/navigation";
import { useOnboarding, type OnboardingModule, type ModuleStatus } from "@/lib/onboarding-context";
import { NextModuleHero } from "./NextModuleHero";
import { ModulesKanban } from "./ModulesKanban";

export function OnboardingTabContent() {
  const router = useRouter();
  const { state, setModuleStatus, blockModule, getAllModulesDetails, getProgressOverview } = useOnboarding();
  
  // Get all module details for kanban
  const allModules = getAllModulesDetails();
  
  // Get progress overview for dashboard
  const progressOverview = getProgressOverview();
  
  // Find next module (first not_started or in_progress)
  const nextModule = allModules.find(m => 
    m.status === 'not_started' || m.status === 'in_progress'
  );
  
  // Check if all modules completed
  const allComplete = allModules.every(m => m.status === 'completed');

  const handleModuleStatusChange = (moduleId: OnboardingModule, newStatus: ModuleStatus, reason?: string) => {
    if (newStatus === 'blocked' && reason) {
      blockModule(moduleId, reason);
    } else {
      setModuleStatus(moduleId, newStatus);
    }
  };

  const handleModuleClick = (moduleId: OnboardingModule) => {
    const metadata = MODULE_METADATA_ROUTES[moduleId];
    router.push(metadata.route);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* All Complete State */}
      {allComplete ? (
        <>
          {/* Celebration Banner */}
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Congratulations! All modules completed
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Your YouConnect instance is fully configured and ready for testing.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => router.push('/test-order')}
                className="px-6 py-3 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Create Test Order
              </button>
              <button
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#9F2E2B] hover:text-[#9F2E2B] transition-all"
              >
                Schedule Meeting
              </button>
            </div>
          </div>
          
          {/* Show all modules with progress header */}
          <ModulesKanban
            modules={allModules}
            progressOverview={progressOverview}
            onModuleStatusChange={handleModuleStatusChange}
            onModuleClick={handleModuleClick}
          />
        </>
      ) : (
        <>
          {/* Full-Width Hero Card */}
          {nextModule && (
            <NextModuleHero 
              moduleId={nextModule.id}
            />
          )}
          
          {/* Kanban Modules with Progress in Header */}
          <ModulesKanban
            modules={allModules}
            progressOverview={progressOverview}
            onModuleStatusChange={handleModuleStatusChange}
            onModuleClick={handleModuleClick}
          />
        </>
      )}
    </div>
  );
}

// Module routes mapping
const MODULE_METADATA_ROUTES: Record<OnboardingModule, { route: string }> = {
  'company-setup': { route: '/organization-setup-intro' },
  'definitions': { route: '/definitions-intro' },
  'users': { route: '/users-intro' },
  'vendors': { route: '/vendors-intro' },
  'routing': { route: '/routing-intro' },
  'general-settings': { route: '/general-settings-intro' },
  'it-checklist': { route: '/it-checklist-intro' },
};

