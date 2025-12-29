"use client";

interface ModuleFunnelData {
  moduleId: string;
  moduleName: string;
  completionRate: number;
  color: string;
}

interface ModuleCompletionFunnelProps {
  modules: ModuleFunnelData[];
}

export function ModuleCompletionFunnel({ modules }: ModuleCompletionFunnelProps) {
  // Sort by completion rate descending
  const sortedModules = [...modules].sort((a, b) => b.completionRate - a.completionRate);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          Module Completion Funnel
        </h3>
        <p className="text-sm text-gray-600">
          Percentage of clients completing each module
        </p>
      </div>
      
      {/* Module Progress Bars */}
      <div className="space-y-4">
        {sortedModules.map((module) => (
          <div key={module.moduleId}>
            {/* Module Name + Percentage */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-gray-900">
                {module.moduleName}
              </span>
              <span className="text-sm font-bold text-gray-900">
                {module.completionRate}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${module.completionRate}%`,
                  backgroundColor: module.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Default module colors - complementary palette
export const MODULE_COLORS = {
  'company-setup': '#3b82f6',      // Blue - Professional, trustworthy
  'vendors': '#10b981',            // Emerald - Success, growth
  'users': '#f59e0b',              // Amber - Active, warm
  'definitions': '#ec4899',        // Pink - Creative, distinct
  'routing': '#8b5cf6',            // Purple - Strategic, sophisticated
  'general-settings': '#06b6d4',   // Cyan - Technical, modern
  'it-checklist': '#6366f1',       // Indigo - Secure, stable
};

