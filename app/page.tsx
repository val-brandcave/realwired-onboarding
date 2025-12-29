"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  const roles = [
    {
      id: 'bank-admin',
      title: 'Primary Onboarding Manager',
      description: 'Configure and manage your bank\'s YouConnect setup',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      route: '/sign-in/client',
      color: 'from-[#9F2E2B] to-[#7D2522]',
      hoverColor: 'hover:border-[#9F2E2B]',
    },
    {
      id: 'cs-agent',
      title: 'Customer Success Team Agent',
      description: 'Manage and support client onboarding processes',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      route: '/sign-in/cs-agent',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:border-blue-500',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - White */}
      <div className="flex-1 lg:w-2/5 bg-white flex flex-col justify-center px-8 py-12 lg:px-16">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/realwired-logo.png" 
              alt="RealWired Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-[#7D2522] mb-3">
            Welcome to
          </h1>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            YouConnect Onboarding
          </h2>
          
          {/* Demo Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-8">
            <p className="text-sm text-yellow-800 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>This page is for prototype demo only</span>
            </p>
          </div>

          {/* Instruction */}
          <p className="text-base text-slate-600 mb-8">
            Select your role to continue to your workspace
          </p>

          {/* Role Cards */}
          <div className="space-y-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => router.push(role.route)}
                className={`
                  w-full text-left p-5 bg-white border-2 border-slate-200 rounded-xl 
                  hover:shadow-lg transition-all duration-200 group
                  ${role.hoverColor}
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-12 h-12 bg-gradient-to-br ${role.color} 
                    rounded-lg flex items-center justify-center text-white 
                    flex-shrink-0 group-hover:scale-110 transition-transform
                  `}>
                    {role.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {role.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {role.description}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - RealWired Brand Color */}
      <div className="flex-1 lg:w-3/5 bg-gradient-to-br from-[#7D2522] to-[#510906] flex flex-col items-center justify-center px-8 py-8 lg:px-16 text-white">
        <div className="max-w-2xl text-center">
          {/* Large Logo Icon */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-48 h-48 bg-white/10 rounded-full">
              <img 
                src="/realwired-logo.png" 
                alt="RealWired" 
                className="w-32 h-32 object-contain filter brightness-0 invert"
              />
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Streamlined Appraisal Management
          </h2>
        </div>
      </div>

      {/* Footer - Demo Shortcuts */}
      <footer className="absolute bottom-0 left-0 right-0 lg:left-0 lg:right-auto lg:w-2/5 px-4 py-4 border-t border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="max-w-md mx-auto flex items-center justify-center gap-3 flex-wrap text-xs text-slate-500">
          <span>Quick demo access:</span>
          <button
            onClick={() => router.push("/hub")}
            className="px-2 py-1 text-[#9F2E2B] hover:text-white hover:bg-[#9F2E2B] border border-[#9F2E2B] rounded transition-colors"
          >
            Hub
          </button>
          <button
            onClick={() => router.push("/cs-portal")}
            className="px-2 py-1 text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 rounded transition-colors"
          >
            CS Portal
          </button>
        </div>
      </footer>
    </div>
  );
}
