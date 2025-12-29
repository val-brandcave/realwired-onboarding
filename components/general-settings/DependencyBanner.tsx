"use client";

import { useRouter } from "next/navigation";

export type ModuleStatus = 'completed' | 'in_progress' | 'not_started';

interface ModuleDependency {
  module: string;
  status: ModuleStatus;
  route?: string;
}

interface DependencyBannerProps {
  dependencies: ModuleDependency[];
  message?: string;
}

export function DependencyBanner({ dependencies, message }: DependencyBannerProps) {
  const router = useRouter();
  const hasIncomplete = dependencies.some(d => d.status !== 'completed');

  if (!hasIncomplete) {
    return null; // All dependencies met, no banner needed
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <svg 
          className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">
            Module Dependencies
          </h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {dependencies.map((dep) => (
              <ModuleBadge key={dep.module} {...dep} onNavigate={router.push} />
            ))}
          </div>
          <p className="text-sm text-gray-700">
            {message || 
              "Some settings on this page work best after completing dependent modules. You can configure defaults now and return later to refine."
            }
          </p>
        </div>
      </div>
    </div>
  );
}

interface ModuleBadgeProps extends ModuleDependency {
  onNavigate: (route: string) => void;
}

function ModuleBadge({ module, status, route, onNavigate }: ModuleBadgeProps) {
  const isClickable = status !== 'completed' && route;

  const statusConfig = {
    completed: {
      icon: '✓',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
    },
    in_progress: {
      icon: '→',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-200',
    },
    not_started: {
      icon: '○',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200',
    },
  };

  const config = statusConfig[status];

  if (isClickable) {
    return (
      <button
        onClick={() => route && onNavigate(route)}
        className={`
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          border transition-all hover:scale-105 hover:shadow-md
          ${config.bgColor} ${config.textColor} ${config.borderColor}
        `}
      >
        <span>{config.icon}</span>
        <span>{module}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border
        ${config.bgColor} ${config.textColor} ${config.borderColor}
      `}
    >
      <span>{config.icon}</span>
      <span>{module}</span>
    </span>
  );
}

