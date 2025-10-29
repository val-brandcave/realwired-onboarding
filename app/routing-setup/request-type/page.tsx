"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Request Type with Job Manager assignment
interface RequestTypeAssignment {
  id: string;
  name: string;
  category: string;
  jobManagerId: string;
}

export default function RequestTypeRoutingPage() {
  const { state, updateRouting, updateModuleProgress } = useOnboarding();
  const router = useRouter();

  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('routing', 1, 3); // Step 1 of 3
  }, [updateModuleProgress]);

  // Sample request types (8 types)
  const [requestTypes, setRequestTypes] = useState<RequestTypeAssignment[]>([
    { id: 'rt-1', name: 'Residential Appraisal (Full)', category: 'Residential', jobManagerId: '' },
    { id: 'rt-2', name: 'Commercial Property Valuation', category: 'Commercial', jobManagerId: '' },
    { id: 'rt-3', name: 'BPO - Broker Price Opinion', category: 'Residential', jobManagerId: '' },
    { id: 'rt-4', name: 'Environmental Site Assessment', category: 'Environmental', jobManagerId: '' },
    { id: 'rt-5', name: 'Desktop Review - Residential', category: 'Residential', jobManagerId: '' },
    { id: 'rt-6', name: 'Agricultural Land Appraisal', category: 'Agricultural', jobManagerId: '' },
    { id: 'rt-7', name: 'Multi-Family Complex Valuation', category: 'Commercial', jobManagerId: '' },
    { id: 'rt-8', name: 'Phase I Environmental Report', category: 'Environmental', jobManagerId: '' },
  ]);

  // Mock job managers
  const jobManagers = [
    { id: 'jm1', name: 'Sarah Johnson' },
    { id: 'jm2', name: 'Michael Chen' },
    { id: 'jm3', name: 'Emily Rodriguez' },
    { id: 'jm4', name: 'David Kim' },
    { id: 'jm5', name: 'Robert Williams' },
  ];

  const handleJobManagerChange = (requestTypeId: string, jobManagerId: string) => {
    setRequestTypes(prev => 
      prev.map(rt => rt.id === requestTypeId ? { ...rt, jobManagerId } : rt)
    );
  };

  const handleContinue = () => {
    updateRouting({ requestTypeCompleted: true });
    router.push('/routing-setup/logical');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Residential': 'bg-blue-100 text-blue-800 border-blue-200',
      'Commercial': 'bg-purple-100 text-purple-800 border-purple-200',
      'Environmental': 'bg-green-100 text-green-800 border-green-200',
      'Agricultural': 'bg-amber-100 text-amber-800 border-amber-200',
    };
    return colors[category] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  const steps = [
    { id: '1', label: 'Request Type', status: 'in_progress' as const },
    { id: '2', label: 'Logical', status: 'not_started' as const },
    { id: '3', label: 'Assigned Area', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={0} 
      steps={steps}
      title="Routing Setup"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Request Type Routing
              </h1>
              <p className="text-base text-muted-foreground">
                Assign job managers to specific request types. This is optional - you can skip this step if you prefer to use logical or assigned area routing.
              </p>
            </div>

            {/* Request Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {requestTypes.map((requestType) => (
                <div key={requestType.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="mb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        {requestType.name}
                      </h3>
                    </div>
                    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded border ${getCategoryColor(requestType.category)}`}>
                      {requestType.category}
                    </span>
                  </div>

                  <div>
                    <label htmlFor={`jm-${requestType.id}`} className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Assign Job Manager
                    </label>
                    <select
                      id={`jm-${requestType.id}`}
                      value={requestType.jobManagerId}
                      onChange={(e) => handleJobManagerChange(requestType.id, e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                    >
                      <option value="">None (Use other routing)</option>
                      {jobManagers.map((jm) => (
                        <option key={jm.id} value={jm.id}>
                          {jm.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button 
                onClick={() => router.push('/routing-intro')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl"
              >
                Next: Logical Routing →
              </button>
            </div>
          </div>

          {/* Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <h3 className="font-semibold text-foreground text-sm mb-3">Request Type Routing</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Assign specific job managers to handle different types of requests. When an order is created with a specific request type, it will automatically route to the assigned job manager.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-blue-900">
                    <strong>Note:</strong> This step is optional. You can skip it and use logical or assigned area routing instead.
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">How it works:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Assign job managers to request types</li>
                  <li>Orders automatically route based on type</li>
                  <li>Overrides other routing rules</li>
                  <li>Leave as "None" to use other routing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
