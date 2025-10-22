"use client";

import React, { useState } from 'react';
import { VideoModal } from '@/components/ui/VideoModal';
import { HelpModal } from '@/components/ui/HelpModal';

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
  showWalkthrough?: boolean;
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
      {/* eslint-disable @next/next/no-inline-styles -- Dynamic width for progress bar */}
      <div 
        {...ariaProps}
        className="h-full bg-[#9F2E2B] transition-all duration-700 ease-out"
        style={{ width: `${progressPercent}%` }}
      />
      {/* eslint-enable @next/next/no-inline-styles */}
    </div>
  );
}

export function MainLayout({ 
  children, 
  currentStep = 0, 
  steps = [],
  title = "YouConnect Onboarding",
  showWalkthrough = true
}: MainLayoutProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation - Fixed Header */}
      <div className="sticky top-0 z-50">
        <header className="bg-white border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Logo and Title */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">YC</span>
                </div>
                <div>
                  <h1 className="text-base font-semibold text-foreground">{title}</h1>
                </div>
              </div>

              {/* Right side - Action buttons */}
              <div className="flex items-center gap-2">
                {showWalkthrough && (
                  <button 
                    onClick={() => setShowVideo(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#9F2E2B] bg-[#FDF6F5] border border-[#E8B5B3] rounded-lg hover:bg-[#FBF0EF] hover:border-[#D69692] focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:ring-offset-2 transition-colors"
                    aria-label="Watch onboarding walkthrough video"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Walkthrough
                  </button>
                )}
                <button 
                  onClick={() => setShowHelp(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                  aria-label="Get help with current section"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Need Help?
                </button>
              </div>
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

      {/* Video Modal */}
      <VideoModal 
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        title="Onboarding Setup Walkthrough"
      />

      {/* Help Modal */}
      <HelpModal 
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        onOpenVideo={() => setShowVideo(true)}
      />
    </div>
  );
}

