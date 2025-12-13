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
  const { state: _state, updateRouting, updateModuleProgress } = useOnboarding();
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
      breadcrumbs={[
        { label: "Home", href: "/hub", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>) },
        { label: "Routing", href: "/routing-intro" },
        { label: "Request Type Routing" },
      ]}
      footerNav={{
        previousLabel: "Back",
        onPrevious: () => router.push('/routing-intro'),
        nextLabel: "Next: Logical Routing",
        onNext: handleContinue,
      }}
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

          </div>

          {/* Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-3">Request Type Routing</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Assign specific job managers to handle different types of requests. When an order is created with a specific request type, it will automatically route to the assigned job manager.
                </p>

                {/* Video Tutorial */}
                <div className="mb-4">
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video Tutorial (2:45)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Request Type Routing">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Request Type Routing Overview</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">How it works:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Assign job managers to request types</li>
                    <li>Orders automatically route based on type</li>
                    <li>Highest priority routing method</li>
                    <li>Leave as "None" to use other routing</li>
                  </ul>
                </div>
              </div>

              {/* Routing Priority Hierarchy */}
              <div className="border-t border-primary/20 pt-4">
                <h4 className="font-semibold text-foreground text-sm mb-2">Routing Priority</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  When a request comes in, the system checks routing types in this order:
                </p>
                
                {/* Visual Flow Diagram */}
                <div className="bg-white border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-[#9F2E2B] text-white text-xs font-bold rounded">1</div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground">Request Type</p>
                      <p className="text-xs text-muted-foreground">Check first</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-[#9F2E2B] text-white text-xs font-bold rounded">2</div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground">Logical Routing</p>
                      <p className="text-xs text-muted-foreground">If no match above</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-[#9F2E2B] text-white text-xs font-bold rounded">3</div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground">Assigned Area</p>
                      <p className="text-xs text-muted-foreground">Final fallback</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-blue-900 mb-1">Flexible Configuration</p>
                    <p className="text-xs text-blue-700">
                      You don't have to use all 3 routing types. Choose the combination that works best for your organization's workflow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
