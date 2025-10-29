"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegionsSetupPage() {
  const { state, updateCompanySetup } = useOnboarding();
  const router = useRouter();
  const [selectedRegions, setSelectedRegions] = useState<string[]>(state.companySetup.regions || []);

  const usaRegions = [
    'Northeast', 'Mid-Atlantic', 'Southeast', 'Florida', 
    'Midwest', 'Great Lakes', 'Great Plains', 'Southwest',
    'Rocky Mountain', 'West Coast', 'Pacific Northwest', 'Alaska & Hawaii'
  ];

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const handleContinue = () => {
    if (selectedRegions.length === 0) {
      alert('Please select at least one region');
      return;
    }

    // Save regions
    updateCompanySetup({ regions: selectedRegions });

    // Navigate to locations
    router.push('/organization-setup/locations');
  };

  const steps = [
    { id: '1', label: 'Services', status: 'completed' as const },
    { id: '2', label: 'Request Processes', status: 'completed' as const },
    { id: '3', label: 'Regions', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={2} 
      steps={steps}
      title="Organization Setup"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Select Your Regions of Operation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the geographic regions where your organization operates. This helps us configure location-based routing and regional settings.
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
                    {selectedRegions.length} {selectedRegions.length === 1 ? 'region' : 'regions'} selected
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Select at least one region
                </span>
              </div>
            </div>

            {/* Regions Grid */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-5">United States Regions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {usaRegions.map((region) => {
                  const isSelected = selectedRegions.includes(region);
                  
                  return (
                    <label
                      key={region}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-primary/10 border-primary shadow-sm' 
                          : 'bg-card border-border hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRegion(region)}
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                        aria-label={`Select ${region} region`}
                      />
                      <div className="flex-1">
                        <span className={`text-sm font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {region}
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
                onClick={() => router.push('/organization-setup/request-types')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                disabled={selectedRegions.length === 0}
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
                <h3 className="font-semibold text-slate-900">Why Regions Matter</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                Defining your regions of operation helps us configure location-based features and routing rules tailored to your coverage areas.
              </p>

              {/* How We Use This */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">How We Use This</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Configure geographic routing rules for your coverage areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Set up regional job manager assignments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Populate location dropdowns throughout the system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Enable region-specific reporting and analytics</span>
                  </li>
                </ul>
              </div>

              {/* Auto-Population */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Smart Defaults</h4>
                <p className="text-xs text-slate-700 mb-2">
                  Based on your selected regions, we'll automatically:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Populate state and location dropdowns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Suggest zip code ranges for routing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Configure time zones for notifications</span>
                  </li>
                </ul>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Tips</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">•</span>
                    <span>Select all regions where you actively process orders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">•</span>
                    <span>You can add or remove regions later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">•</span>
                    <span>Multiple regions enable better geographic routing</span>
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

