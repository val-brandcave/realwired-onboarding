"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BrandingPage() {
  const { state, updateCompanySetup, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  const orgName = state.companySetup.organizationName || "Custom Bank";
  const [primaryColor, setPrimaryColor] = useState(state.companySetup.primaryColor || "#9F2E2B");
  const [logoUrl, setLogoUrl] = useState(state.companySetup.logoUrl || "");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('organization-setup', 2, 4); // Step 2 of 4
  }, [updateModuleProgress]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setLogoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    updateCompanySetup({
      primaryColor,
      logoUrl,
      brandingSkipped: false
    });
    router.push('/organization-setup/participants');
  };

  const handleSkip = () => {
    updateCompanySetup({
      brandingSkipped: true
    });
    router.push('/organization-setup/participants');
  };

  const handleBack = () => {
    router.push('/organization-setup/org-info');
  };

  const steps = [
    { id: '1', label: 'Organization Info', status: 'completed' as const },
    { id: '2', label: 'Branding', status: 'in_progress' as const },
    { id: '3', label: 'Participants', status: 'not_started' as const },
    { id: '4', label: 'IT Config', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={1} 
      steps={steps}
      title="Organization Setup"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Customize Your Branding
          </h1>
          <p className="text-base text-muted-foreground">
            Add your logos and brand colors to personalize the YouConnect experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-6">
              {/* Logo Upload Section */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Upload Organization Logo</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a high-resolution logo (recommended: 1200x400px or larger, PNG format with transparent background)
                </p>
                
                {/* Upload Area */}
                <div className="border-2 border-dashed border-border rounded-lg p-6 bg-white">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {!logoPreview ? (
                      <>
                        <div className="w-full h-40 bg-slate-50 rounded-lg flex flex-col items-center justify-center border border-slate-200">
                          <svg className="w-16 h-16 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm font-medium text-slate-600 mb-1">Drop your logo here or click below to upload</p>
                          <p className="text-xs text-slate-500">PNG, JPG, SVG • Max 10MB</p>
                        </div>
                        <label htmlFor="logo-upload" className="cursor-pointer w-full">
                          <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                          <span className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Upload Logo
                          </span>
                        </label>
                      </>
                    ) : (
                      <>
                        {/* Logo Size Previews */}
                        <div className="w-full space-y-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-foreground">Logo Size Previews</h3>
                            <button
                              onClick={() => {
                                setLogoPreview(null);
                                setLogoUrl("");
                              }}
                              className="text-xs text-destructive hover:text-destructive/80 font-medium flex items-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Remove & Upload New
                            </button>
                          </div>
                          
                          {/* Large Size */}
                          <div className="bg-white border border-border rounded-lg p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-48 h-16 bg-slate-50 rounded flex items-center justify-center p-2 border border-slate-200">
                                <img src={logoPreview} alt="Large logo" className="max-w-full max-h-full object-contain" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">Large (192x64px)</p>
                                <p className="text-xs text-muted-foreground">Used in navigation header and main branding</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Medium Size */}
                          <div className="bg-white border border-border rounded-lg p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-32 h-12 bg-slate-50 rounded flex items-center justify-center p-2 border border-slate-200">
                                <img src={logoPreview} alt="Medium logo" className="max-w-full max-h-full object-contain" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">Medium (128x48px)</p>
                                <p className="text-xs text-muted-foreground">Used in email headers and reports</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Small Size */}
                          <div className="bg-white border border-border rounded-lg p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-16 h-8 bg-slate-50 rounded flex items-center justify-center p-1 border border-slate-200">
                                <img src={logoPreview} alt="Small logo" className="max-w-full max-h-full object-contain" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">Small (64x32px)</p>
                                <p className="text-xs text-muted-foreground">Used in favicons and compact views</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Primary Color Section */}
              <div className="pt-6 border-t border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Brand Color</h2>
                
                <div>
                  <label htmlFor="primary-color" className="block text-sm font-medium text-foreground mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-20 h-20 rounded-lg border-2 border-border cursor-pointer"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-full px-4 py-3 text-base border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-mono uppercase"
                        placeholder="#9F2E2B"
                      />
                      <p className="mt-2 text-xs text-muted-foreground">
                        Used for buttons, links, accents, and interactive elements throughout the platform
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="pt-6 border-t border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Brand Preview</h2>
                
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 space-y-4 border border-slate-200">
                  {/* Mock Header */}
                  <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between border-t-4" style={{ borderTopColor: primaryColor }}>
                    <div className="flex items-center gap-3">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo in header" className="h-8 object-contain" />
                      ) : (
                        <div className="w-32 h-8 bg-slate-200 rounded flex items-center justify-center">
                          <span className="text-xs text-slate-500">Your Logo</span>
                        </div>
                      )}
                      <span className="text-base font-semibold text-slate-900">
                        {orgName}
                      </span>
                    </div>
                    <div className="px-3 py-1 rounded text-xs font-medium text-white" style={{ backgroundColor: primaryColor }}>
                      YouConnect
                    </div>
                  </div>

                  {/* Mock Buttons */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg shadow-md transition-transform hover:scale-105"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Primary Action
                    </button>
                    <button
                      className="px-6 py-2.5 text-sm font-medium rounded-lg border-2 bg-white transition-transform hover:scale-105"
                      style={{ borderColor: primaryColor, color: primaryColor }}
                    >
                      Secondary Action
                    </button>
                  </div>

                  {/* Mock Card */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">Sample Card</h3>
                    <p className="text-xs text-slate-600 mb-3">
                      This is how your branded elements will appear in the platform.
                    </p>
                    <a href="#" className="text-sm font-medium hover:underline" style={{ color: primaryColor }}>
                      Learn more →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBack}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSkip}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Skip for now
                </button>
                <button 
                  onClick={handleContinue}
                  className="px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Educational Panel (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              {/* Why We Need This */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Your branding makes YouConnect feel like your own platform. Logos and colors help your team instantly recognize the platform and create a professional experience. All uploads are optional and can be updated later.
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
                    Video Tutorial (3:15)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    {/* Background image placeholder - corporate people conversing */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Customizing Your Branding">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Customizing Your Branding</p>
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
                    <span className="flex-1 text-left">Branding Guidelines.pdf</span>
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>

                {/* Note Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-blue-900">
                      <strong>Note:</strong> Branding is optional for now. You can skip this step and add logos and colors later from Settings.
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

