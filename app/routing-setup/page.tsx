"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RoutingTypeOption = 'request-type' | 'logical' | 'assigned-area';

export default function RoutingSetupPage() {
  const { state, updateRouting } = useOnboarding();
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<RoutingTypeOption[]>([]);

  const toggleType = (type: RoutingTypeOption) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleContinue = () => {
    if (selectedTypes.length === 0) return;
    
    // Store selected types in context for tracking
    updateRouting({ selectedRoutingTypes: selectedTypes });
    
    // Navigate to first selected routing type
    if (selectedTypes.includes('request-type')) {
      router.push('/routing-setup/request-type');
    } else if (selectedTypes.includes('logical')) {
      router.push('/routing-setup/logical');
    } else {
      router.push('/routing-setup/assigned-area');
    }
  };

  const routingOptions = [
    {
      id: 'request-type' as RoutingTypeOption,
      title: 'Request Type Job Manager',
      description: 'Route orders based on the type of request (e.g., Appraisal, BPO, Review)',
      priority: 1,
      example: 'Example: All Residential Appraisals → Sarah Johnson',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'logical' as RoutingTypeOption,
      title: 'Logical Routing',
      description: 'Create custom rules based on multiple criteria (property type, loan amount, lending group)',
      priority: 2,
      example: 'Example: IF Commercial AND Loan > $1M → Senior Team',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'assigned-area' as RoutingTypeOption,
      title: 'Assigned Area',
      description: 'Route orders based on geographic location or region',
      priority: 3,
      example: 'Example: West Coast properties → Regional Manager',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const steps = [
    { id: '1', label: 'Select Types', status: 'in_progress' as const },
    { id: '2', label: 'Configure Routes', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={0} 
      steps={steps}
      title="Routing"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Select Routing Types
          </h1>
          <p className="text-base text-muted-foreground">
            Choose one or more routing strategies you want to configure. Select at least one.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Routing Type Cards */}
            <div className="space-y-4 mb-6">
              {routingOptions.map((option) => {
                const isSelected = selectedTypes.includes(option.id);
                
                return (
                  <label
                    key={option.id}
                    className={`block cursor-pointer transition-all ${
                      isSelected 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : 'hover:border-primary/50'
                    }`}
                  >
                    <div className={`bg-card border-2 rounded-xl p-6 ${
                      isSelected ? 'border-primary shadow-lg' : 'border-border'
                    }`}>
                      <div className="flex items-start gap-4">
                        {/* Checkbox */}
                        <div className="pt-1">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleType(option.id)}
                            className="w-6 h-6 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                            aria-label={`Select ${option.title}`}
                          />
                        </div>

                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                          {option.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-foreground">{option.title}</h3>
                            <span className="px-2.5 py-1 bg-slate-700 text-white text-xs font-semibold rounded shadow-sm">
                              Priority {option.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {option.description}
                          </p>
                          <div className="bg-muted/30 border border-border rounded-lg p-3">
                            <p className="text-xs text-foreground italic">
                              {option.example}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Info Message */}
            {selectedTypes.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  ✨ You've selected {selectedTypes.length} routing {selectedTypes.length === 1 ? 'type' : 'types'}. 
                  You'll configure each one in the following steps, starting with the highest priority.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => router.push('/hub')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back to Hub
              </button>
              <button 
                onClick={handleContinue}
                disabled={selectedTypes.length === 0}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Setup →
              </button>
            </div>
          </div>

          {/* Right Column: Educational Panel (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-slate-900">How Routing Works</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6">
                Routes are checked from highest to lowest priority. The first matching rule assigns the order.
              </p>

              {/* Priority Flow Diagram with Arrows */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-4">Priority Order</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-700 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-semibold">
                      1
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="font-medium text-slate-900 text-sm mb-1">Request Type Job Manager</div>
                      <p className="text-xs text-slate-700">
                        If order matches a request type, assign to designated manager
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow Down */}
                  <div className="ml-5 flex items-center gap-2">
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="text-xs text-slate-600 italic">If no match, check next priority</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-700 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-semibold">
                      2
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="font-medium text-slate-900 text-sm mb-1">Logical Routing</div>
                      <p className="text-xs text-slate-700">
                        Check custom rules (property type, loan amount, location)
                      </p>
                    </div>
                  </div>

                  {/* Arrow Down */}
                  <div className="ml-5 flex items-center gap-2">
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="text-xs text-slate-600 italic">If no match, check next priority</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-700 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-semibold">
                      3
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="font-medium text-slate-900 text-sm mb-1">Assigned Area</div>
                      <p className="text-xs text-slate-700">
                        Route by geographic region or zip code
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Multiple Types */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Why Select Multiple?</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Combine strategies for comprehensive coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Higher priority routes are checked first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Lower priorities act as fallbacks</span>
                  </li>
                </ul>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Tips</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Start with Request Type for simple routing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Add Logical for complex business rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Use Assigned Area for geographic distribution</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
