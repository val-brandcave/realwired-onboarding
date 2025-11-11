"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdditionalSearchCriteriaPage() {
  const { state, updateModuleProgress } = useOnboarding();
  const router = useRouter();

  // Track progress
  useEffect(() => {
    updateModuleProgress('vendors', 3, 4); // Step 3 of 4
  }, [updateModuleProgress]);

  // Field 1 - Label and Values
  const [field1Label, setField1Label] = useState('Region');
  const [field1Values, setField1Values] = useState<string[]>([
    'Northeast',
    'Southeast',
    'Midwest',
    'Southwest',
    'West',
  ]);

  // Field 2 - Label and Values
  const [field2Label, setField2Label] = useState('Sub-Region');
  const [field2Values, setField2Values] = useState<string[]>([
    'Metro Area',
    'County',
    'State Zone',
  ]);

  const handleContinue = () => {
    router.push('/vendors/upload');
  };

  const steps = [
    { id: '1', label: 'Types', status: 'completed' as const },
    { id: '2', label: 'Classifications', status: 'completed' as const },
    { id: '3', label: 'Search Criteria', status: 'in_progress' as const },
    { id: '4', label: 'Upload', status: 'not_started' as const },
  ];

  return (
    <MainLayout
      currentStep={2}
      steps={steps}
      title="Vendors Setup"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Additional Search Criteria
              </h1>
              <p className="text-base text-muted-foreground">
                Configure two custom search fields to help filter and find vendors during solicitation.
              </p>
            </div>

            {/* Explanatory Banner */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-2">You Can Have Two Additional Search Criteria</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    These are custom fields you can use to tag and search for vendors during solicitation. 
                    The examples below show common uses, but <strong>you can change these to whatever you want</strong>.
                  </p>
                  <div className="bg-white/60 rounded-lg p-3 space-y-2">
                    <p className="text-xs text-blue-900 font-medium">Example Use Cases:</p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• <strong>Geography:</strong> "Region" and "Sub-Region" for location-based search</li>
                      <li>• <strong>Complexity:</strong> "Vendor Complexity" and "Grade Level" for capability matching</li>
                      <li>• <strong>Custom Tags:</strong> Any two criteria that help you organize and find vendors</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Field 1 */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Search Field 1
              </h2>
              
              {/* Field Label */}
              <div className="mb-4 pb-4 border-b border-border">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Field Label <span className="text-muted-foreground">(customize this)</span>
                </label>
                <input
                  type="text"
                  value={field1Label}
                  onChange={(e) => setField1Label(e.target.value)}
                  placeholder="e.g., Region, Vendor Complexity, etc."
                  className="w-full max-w-md px-4 py-2.5 text-sm font-medium border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  This label will appear in vendor forms and search filters
                </p>
              </div>

              {/* Field Values */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Values for "{field1Label}"
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {field1Values.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const updated = [...field1Values];
                          updated[index] = e.target.value;
                          setField1Values(updated);
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        onClick={() => {
                          setField1Values(field1Values.filter((_, i) => i !== index));
                        }}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        title={`Remove ${value}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      setField1Values([...field1Values, `New ${field1Label}`]);
                    }}
                    className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                  >
                    + Add Value
                  </button>
                </div>
              </div>
            </div>

            {/* Field 2 */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Search Field 2
              </h2>
              
              {/* Field Label */}
              <div className="mb-4 pb-4 border-b border-border">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Field Label <span className="text-muted-foreground">(customize this)</span>
                </label>
                <input
                  type="text"
                  value={field2Label}
                  onChange={(e) => setField2Label(e.target.value)}
                  placeholder="e.g., Sub-Region, Grade Level, etc."
                  className="w-full max-w-md px-4 py-2.5 text-sm font-medium border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  This label will appear in vendor forms and search filters
                </p>
              </div>

              {/* Field Values */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Values for "{field2Label}"
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {field2Values.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const updated = [...field2Values];
                          updated[index] = e.target.value;
                          setField2Values(updated);
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        onClick={() => {
                          setField2Values(field2Values.filter((_, i) => i !== index));
                        }}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        title={`Remove ${value}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      setField2Values([...field2Values, `New ${field2Label}`]);
                    }}
                    className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                  >
                    + Add Value
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => router.push('/vendors/configure/classifications')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleContinue}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl"
              >
                Next: Upload Template →
              </button>
            </div>
          </div>

          {/* Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <h3 className="font-semibold text-foreground text-sm mb-3">Additional Search Criteria</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Configure two custom fields to tag and search vendors during solicitation. These are completely customizable to match your workflow.
              </p>

              {/* Video Tutorial */}
              <div className="mb-4">
                <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Video Tutorial (2:15)
                </h4>
                <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Additional Search Criteria">
                      <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Additional Search Criteria</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="pb-3 border-b border-primary/20">
                  <p className="font-medium text-foreground mb-2">Why Two Fields?</p>
                  <p>Most organizations use these for geography (Region + Sub-Region), but you can customize them for any purpose - complexity levels, grade tiers, service types, etc.</p>
                </div>

                <div className="pb-3 border-b border-primary/20">
                  <p className="font-medium text-foreground mb-2">Common Patterns:</p>
                  <ul className="space-y-1">
                    <li>• <strong>Geography:</strong> Region → Sub-Region</li>
                    <li>• <strong>Capability:</strong> Complexity → Grade Level</li>
                    <li>• <strong>Custom:</strong> Any two criteria you need</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-900">
                    <strong>Tip:</strong> These criteria become searchable tags when soliciting vendors for orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

