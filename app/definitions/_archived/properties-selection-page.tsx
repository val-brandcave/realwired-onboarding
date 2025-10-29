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
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              {/* Why We Need This */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Property categories help organize the fields that appear in your property records. You'll be able to select which fields are essential for your appraisal process and customize records to match your bank's requirements.
                </p>
              </div>

              <div className="space-y-4">
                {/* Video Tutorial */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video Tutorial (4:00)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    {/* Background image placeholder - corporate people conversing */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Property Categories">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Property Categories</p>
                    </div>
                  </div>
                </div>

                {/* Resource Guide */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Resource Guide
                  </h4>
                  <button 
                    onClick={() => {
                      // Download logic here
                      console.log('Downloading PDF...');
                    }}
                    className="w-full px-3 py-2 text-xs font-medium text-foreground bg-card hover:bg-accent border border-border rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="flex-1 text-left">Property Fields Guide.pdf</span>
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>

                {/* Tip Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-xs text-blue-900">
                      <strong>Tip:</strong> Start with essential fields only. You can always add more property fields later as your needs evolve.
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
