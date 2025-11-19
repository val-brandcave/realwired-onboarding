"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding-context";
import { useEffect } from "react";

export default function ITChecklistComplete() {
  const router = useRouter();
  const { markModuleComplete, updateITChecklist } = useOnboarding();

  useEffect(() => {
    markModuleComplete('it-checklist');
    updateITChecklist({ completed: true });
  }, [markModuleComplete, updateITChecklist]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-green-50 p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-[fall_3s_ease-in_forwards]"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            backgroundColor: ['#9F2E2B', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'][i % 5],
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center border border-slate-200 relative z-10">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          IT Readiness Complete!
        </h1>

        {/* Description */}
        <p className="text-slate-600 mb-8 leading-relaxed">
          Great! Your IT setup is confirmed. Your team will be able to access YouConnect and receive email notifications without any technical issues. You can always come back to review or update this checklist from your Hub.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => router.push('/hub')}
          className="w-full bg-[#9F2E2B] hover:bg-[#8A2825] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          See Next Steps
        </button>
      </div>
    </div>
  );
}

