"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getPropertyAddressList, getPropertyById } from "@/lib/sample-properties";

export default function PropertiesSelectionPage() {
  const { state, updateDefinitions } = useOnboarding();
  const router = useRouter();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    state.definitions.selectedSamplePropertyId || ''
  );

  const propertyAddresses = getPropertyAddressList();
  const selectedProperty = selectedPropertyId ? getPropertyById(selectedPropertyId) : null;

  const handleContinue = () => {
    if (!selectedPropertyId) {
      alert('Please select a property to continue');
      return;
    }
    
    // Save the selected property
    updateDefinitions({ selectedSamplePropertyId: selectedPropertyId });
    
    // Navigate to the property record configuration page
    router.push('/definitions/properties/configure');
  };

  const steps = [
    { id: '1', label: 'Properties', status: 'in_progress' as const },
    { id: '2', label: 'Request Form', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={0} 
      steps={steps}
      title="Definitions"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Understanding Property Records
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Let's explore how property information is stored in YouConnect. Select a sample property to see what fields are captured in a property record.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Property Selection Card */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 mb-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Select a Sample Property
                </h2>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Choose one of these sample properties to see how YouConnect stores property information. 
                This will help you understand what fields are available and which ones you'll want to use for your workflow.
              </p>

              {/* Dropdown */}
              <div className="mb-6">
                <label htmlFor="property-select" className="block text-sm font-semibold text-foreground mb-2">
                  Property Address
                </label>
                <select
                  id="property-select"
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full px-4 py-3 text-base border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                >
                  <option value="">-- Select a property to preview --</option>
                  {propertyAddresses.map((prop) => (
                    <option key={prop.id} value={prop.id}>
                      {prop.fullAddress}
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Form Preview */}
              {selectedProperty && (
                <div className="space-y-6">
                  {/* Overview Section */}
                  <div className="bg-white border-2 border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-foreground">Overview</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        Preview
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Street Address</label>
                        <input type="text" value={selectedProperty.streetAddress} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Street Address" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Apt/Unit</label>
                        <input type="text" value={selectedProperty.aptUnit || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Apt/Unit" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">City</label>
                        <input type="text" value={selectedProperty.city} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="City" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">State</label>
                        <input type="text" value={selectedProperty.state} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="State" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Zip Code</label>
                        <input type="text" value={selectedProperty.zipCode} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Zip Code" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">County</label>
                        <input type="text" value={selectedProperty.county} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="County" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-1">Legal Description</label>
                        <textarea value={selectedProperty.legalDescription} disabled rows={2} className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Legal Description" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Parcel ID</label>
                        <input type="text" value={selectedProperty.parcelId} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Parcel ID" />
                      </div>
                    </div>
                  </div>

                  {/* Advanced Details Section */}
                  <div className="bg-white border-2 border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-foreground">Advanced Details</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        Preview
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Property Category</label>
                        <input type="text" value={selectedProperty.propertyCategory} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Property Category" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Property Type</label>
                        <input type="text" value={selectedProperty.propertyType} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Property Type" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Year Built</label>
                        <input type="text" value={selectedProperty.yearBuilt || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Year Built" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Square Footage</label>
                        <input type="text" value={selectedProperty.squareFootage ? selectedProperty.squareFootage.toLocaleString() : ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Square Footage" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Lot Size</label>
                        <input type="text" value={selectedProperty.lotSize ? selectedProperty.lotSize.toLocaleString() + ' sq ft' : ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Lot Size" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Bedrooms</label>
                        <input type="text" value={selectedProperty.bedrooms || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Bedrooms" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Bathrooms</label>
                        <input type="text" value={selectedProperty.bathrooms || ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Bathrooms" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Flood Zone</label>
                        <input type="text" value={selectedProperty.floodZone} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Flood Zone" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Zoning</label>
                        <input type="text" value={selectedProperty.zoning} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Zoning" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Occupancy Status</label>
                        <input type="text" value={selectedProperty.occupancyStatus} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Occupancy Status" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Assessed Value</label>
                        <input type="text" value={selectedProperty.assessedValue ? '$' + selectedProperty.assessedValue.toLocaleString() : ''} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Assessed Value" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">HOA Applicable</label>
                        <input type="text" value={selectedProperty.hoaApplicable} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="HOA Applicable" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Special Assessments</label>
                        <input type="text" value={selectedProperty.specialAssessments} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Special Assessments" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Environmental Concerns</label>
                        <input type="text" value={selectedProperty.environmentalConcerns} disabled className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Environmental Concerns" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-1">Additional Notes</label>
                        <textarea value={selectedProperty.additionalNotes} disabled rows={2} className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-muted/30 cursor-not-allowed" aria-label="Additional Notes" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      ✨ This is a complete property record. In the next step, you'll select which fields you want to include in your standard forms and customize their labels.
                    </p>
                  </div>
                </div>
              )}
            </div>

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
                disabled={!selectedPropertyId}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Configure Field Selection →
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
                <h3 className="font-semibold text-slate-900">What's Happening Here?</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                You're about to explore how property records are structured in YouConnect. This will help you understand which property fields are available and which ones matter most for your workflow.
              </p>

              {/* Why This Matters */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>See all available property fields organized by category</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Understand the difference between basic and advanced property details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Choose which fields are essential for your appraisal process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Customize your property records to match your bank's requirements</span>
                  </li>
                </ul>
              </div>

              {/* Field Categories */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Field Categories</h4>
                <div className="space-y-3 text-xs">
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Overview Fields</div>
                    <p className="text-slate-600">Basic property identification: address, location, legal description</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Advanced Details</div>
                    <p className="text-slate-600">Property characteristics: category, flood zone, zoning, assessments</p>
                  </div>
                </div>
              </div>

              {/* Next Step Preview */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Next Step</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  After selecting a property, you'll see its complete record with all fields filled out. You'll then choose which fields you want to include in <strong>your</strong> standard property records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
