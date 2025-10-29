"use client";

import React from 'react';
import { FloatingChatButton } from '@/components/ui/FloatingChatButton';
import { UserProfileDropdown } from './UserProfileDropdown';

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'in_progress' | 'not_started';
}

interface MainLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
  steps?: Step[];
  title?: string;
}

function ProgressBar({ steps }: { steps: Step[] }) {
  // Calculate progress: count completed + in_progress steps
  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const inProgressSteps = steps.filter(s => s.status === 'in_progress').length;
  const totalProgress = completedSteps + (inProgressSteps > 0 ? 0.5 : 0);
  const progressPercent = Math.round((totalProgress / steps.length) * 100);
  
  // ARIA progressbar attributes as props object
  const ariaProps = {
    role: 'progressbar' as const,
    'aria-valuenow': progressPercent,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-label': `Onboarding progress: ${progressPercent}% complete`
  };
  
  return (
    <div className="w-full h-1 bg-slate-200">
      <div 
        {...ariaProps}
        className="h-full bg-[#9F2E2B] transition-all duration-700 ease-out"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
}

export function MainLayout({ 
  children, 
  steps = [],
  title = "YouConnect Onboarding"
}: MainLayoutProps) {

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation - Fixed Header */}
      <div className="sticky top-0 z-50">
        <header className="bg-white border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Logo and Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/realwired-logo.png" 
                    alt="RealWired Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-base font-semibold text-foreground">{title}</h1>
                </div>
              </div>

              {/* User Profile */}
              <UserProfileDropdown />
            </div>
          </div>
        </header>

        {/* Progress Bar - Part of sticky header */}
        {steps.length > 0 && <ProgressBar steps={steps} />}
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - minimal */}
      <footer className="bg-slate-50 border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} RealWired · YouConnect
          </p>
        </div>
      </footer>

      {/* Floating Chat Button - Available on all pages */}
      <FloatingChatButton />
    </div>
  );
}

