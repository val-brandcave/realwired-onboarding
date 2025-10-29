"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GeneralSettingsCompletePage() {
  const { markModuleComplete } = useOnboarding();
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    markModuleComplete('general-settings');
  }, [markModuleComplete]);

  const steps = [
    { id: '1', label: 'Core Settings', status: 'completed' as const },
    { id: '2', label: 'Timers', status: 'completed' as const },
    { id: '3', label: 'Bid Engagement', status: 'completed' as const },
  ];

  return (
    <MainLayout 
      currentStep={3} 
      steps={steps}
      title="General Settings"
    >
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
          {[...Array(50)].map((_, i) => (
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

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg border-2 border-border p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <svg 
                  className="w-7 h-7 text-primary animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-2">
              General Settings Complete!
            </h1>

            <p className="text-sm text-muted-foreground mb-6">
              Great job! Your workflow settings are configured. One more module to go!
            </p>

            <button
              onClick={() => router.push('/hub')}
              className="w-full px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] border-2 border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all hover:scale-105"
            >
              See Next Steps
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotateZ(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotateZ(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </MainLayout>
  );
}

