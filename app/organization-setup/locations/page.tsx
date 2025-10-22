"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Map regions to states
const regionToStates: Record<string, string[]> = {
  'Northeast': ['ME', 'NH', 'VT', 'MA', 'RI', 'CT'],
  'Mid-Atlantic': ['NY', 'NJ', 'PA', 'DE', 'MD'],
  'Southeast': ['VA', 'WV', 'KY', 'TN', 'NC', 'SC', 'GA', 'AL', 'MS'],
  'Florida': ['FL'],
  'Midwest': ['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'IA', 'MO'],
  'Great Lakes': ['MI', 'WI', 'MN', 'OH', 'IN'],
  'Great Plains': ['ND', 'SD', 'NE', 'KS', 'OK'],
  'Southwest': ['TX', 'NM', 'AZ'],
  'Rocky Mountain': ['MT', 'ID', 'WY', 'NV', 'UT', 'CO'],
  'West Coast': ['CA', 'OR', 'WA'],
  'Pacific Northwest': ['WA', 'OR', 'ID'],
  'Alaska & Hawaii': ['AK', 'HI'],
};

const stateNames: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
  'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
  'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
  'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
};

export default function LocationsSetupPage() {
  const { state, updateCompanySetup } = useOnboarding();
  const router = useRouter();

  // Get states based on selected regions
  const getStatesFromRegions = () => {
    const stateSet = new Set<string>();
    state.companySetup.regions.forEach(region => {
      const states = regionToStates[region] || [];
      states.forEach(s => stateSet.add(s));
    });
    return Array.from(stateSet).sort();
  };

  const applicableStates = getStatesFromRegions();
  const [selectedStates, setSelectedStates] = useState<string[]>(
    state.companySetup.states.length > 0 ? state.companySetup.states : applicableStates
  );

  // Auto-select all applicable states on mount if none selected
  useEffect(() => {
    if (state.companySetup.states.length === 0 && applicableStates.length > 0) {
      setSelectedStates(applicableStates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleState = (stateCode: string) => {
    setSelectedStates(prev =>
      prev.includes(stateCode)
        ? prev.filter(s => s !== stateCode)
        : [...prev, stateCode]
    );
  };

  const handleContinue = () => {
    if (selectedStates.length === 0) {
      alert('Please select at least one state');
      return;
    }

    updateCompanySetup({ states: selectedStates, completed: true });
    router.push('/organization-setup/complete');
  };

  const steps = [
    { id: '1', label: 'Services', status: 'completed' as const },
    { id: '2', label: 'Request Processes', status: 'completed' as const },
    { id: '3', label: 'Regions', status: 'completed' as const },
    { id: '4', label: 'Locations', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={3} 
      steps={steps}
      title="Organization Setup"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Confirm Your Operating States
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Based on your selected regions, here are the applicable states. All are pre-selected — uncheck any you don't operate in.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            {/* Selection Summary */}
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-foreground">
                    {selectedStates.length} of {applicableStates.length} states selected
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Based on regions: {state.companySetup.regions.join(', ')}
                </span>
              </div>
            </div>

            {/* States Grid */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-5">States in Your Regions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {applicableStates.map((stateCode) => {
                  const isSelected = selectedStates.includes(stateCode);
                  const stateName = stateNames[stateCode] || stateCode;
                  
                  return (
                    <label
                      key={stateCode}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-primary/10 border-primary shadow-sm' 
                          : 'bg-card border-border hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleState(stateCode)}
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                        aria-label={`Select ${stateName}`}
                      />
                      <div className="flex-1">
                        <span className={`text-sm font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {stateName} ({stateCode})
                        </span>
                      </div>
                      {isSelected && (
                        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => router.push('/organization-setup/regions')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back to Regions
              </button>
              <button 
                onClick={handleContinue}
                disabled={selectedStates.length === 0}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Organization Setup →
              </button>
            </div>
          </div>

          {/* Educational Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-slate-900">State-Level Configuration</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                We've pre-selected all states within your chosen regions. Uncheck any states where you don't actively process orders.
              </p>

              {/* How We Use This */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">How We Use This</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Populate state dropdowns in forms and filters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Configure state-specific routing rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Enable compliance with state regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Track orders by state for reporting</span>
                  </li>
                </ul>
              </div>

              {/* Why Pre-Selected */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Why Pre-Selected?</h4>
                <p className="text-xs text-slate-700 mb-2">
                  We automatically checked all states in your selected regions to save you time. Simply uncheck any you don't need.
                </p>
                <p className="text-xs text-slate-700">
                  This is faster than manually selecting dozens of states one by one.
                </p>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Tips</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">•</span>
                    <span>Keep only states where you actively do business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>You can add or remove states later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>More states enable finer routing granularity</span>
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

