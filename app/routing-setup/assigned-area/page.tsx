"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { RouteRule } from "@/lib/onboarding-context";

// Multi-select component
function MultiSelect({ 
  options, 
  selected, 
  onChange, 
  placeholder 
}: { 
  options: string[]; 
  selected: string[]; 
  onChange: (selected: string[]) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const removeItem = (option: string) => {
    onChange(selected.filter(item => item !== option));
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-sm text-left border border-input rounded-lg bg-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring flex items-center justify-between"
      >
        {selected.length === 0 ? (
          <span className="text-muted-foreground">{placeholder}</span>
        ) : (
          <span className="text-foreground">{selected.length} selected</span>
        )}
        <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-input rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
              />
              <span className="text-sm text-foreground">{option}</span>
            </label>
          ))}
        </div>
      )}

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
            >
              {item}
              <button type="button" onClick={() => removeItem(item)} className="hover:text-destructive" aria-label={`Remove ${item}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AssignedAreaRoutingPage() {
  const { state, addRoute, deleteRoute, updateRoute, updateRouting } = useOnboarding();
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteRule | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    assignedAreaJobManagerId: '',
    locationIds: [] as string[],
  });

  const mockJobManagers = [
    { id: 'jm1', name: 'Sarah Johnson' },
    { id: 'jm2', name: 'Michael Chen' },
    { id: 'jm3', name: 'Emily Rodriguez' },
    { id: 'jm4', name: 'David Kim' },
    { id: 'jm5', name: 'Amanda Foster' },
  ];

  const mockLocations = ['West Coast', 'East Coast', 'Midwest', 'Southwest', 'Southeast', 'Northeast', 'Pacific Northwest', 'Gulf Coast'];

  const assignedAreaRoutes = state.routing.routes.filter(r => r.type === 'assigned-area');

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingRoute(null);
    setFormData({
      name: '',
      assignedAreaJobManagerId: '',
      locationIds: [],
    });
  };

  const handleEdit = (route: RouteRule) => {
    setIsCreating(true);
    setEditingRoute(route);
    setFormData({
      name: route.name,
      assignedAreaJobManagerId: route.config.assignedAreaJobManagerId || '',
      locationIds: route.config.locationIds || [],
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingRoute(null);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.assignedAreaJobManagerId || formData.locationIds.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const config = {
      assignedAreaJobManagerId: formData.assignedAreaJobManagerId,
      locationIds: formData.locationIds,
    };

    if (editingRoute) {
      updateRoute(editingRoute.id, {
        name: formData.name.trim(),
        config,
      });
    } else {
      addRoute({
        name: formData.name.trim(),
        type: 'assigned-area',
        priority: 3,
        enabled: true,
        config,
      });
    }

    handleCancel();
  };

  const handleDeleteRoute = (routeId: string) => {
    if (confirm('Are you sure you want to delete this route?')) {
      deleteRoute(routeId);
    }
  };

  const handleToggleRoute = (routeId: string) => {
    const route = state.routing.routes.find(r => r.id === routeId);
    if (route) {
      updateRoute(routeId, { enabled: !route.enabled });
    }
  };

  const handleContinue = () => {
    updateRouting({ assignedAreaCompleted: true, completed: true });
    router.push('/routing-setup/complete');
  };

  const canProceed = assignedAreaRoutes.length > 0;

  const steps = [
    { id: '1', label: 'Select Types', status: 'completed' as const },
    { id: '2', label: 'Configure Routes', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={1} 
      steps={steps}
      title="Routing"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Setup Assigned Area Routing
          </h1>
          <p className="text-base text-muted-foreground">
            Route orders based on geographic location or regional coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {assignedAreaRoutes.length > 0 && (
              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Your Assigned Area Routes ({assignedAreaRoutes.length})
                </h3>
                {assignedAreaRoutes.map((route) => {
                  const jobManager = mockJobManagers.find(jm => jm.id === route.config.assignedAreaJobManagerId);
                  const locations = route.config.locationIds || [];

                  return (
                    <div key={route.id} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-700 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-foreground text-base">{route.name}</h3>
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded">P 3</span>
                            {route.enabled && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">✓ Active</span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {jobManager && (
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Job Manager: {jobManager.name}</span>
                            )}
                            {locations.length > 0 && (
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Locations: {locations.join(', ')}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(route)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded" title="Edit route">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button onClick={() => handleDeleteRoute(route.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded" title="Delete route">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={route.enabled} onChange={() => handleToggleRoute(route.id)} className="sr-only peer" aria-label={`Enable ${route.name}`} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9F2E2B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9F2E2B]"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {isCreating ? (
              <div className="bg-card border-2 border-primary rounded-lg p-6 mb-6">
                <h3 className="text-base font-semibold text-foreground mb-4">
                  {editingRoute ? 'Edit Route' : 'Create New Assigned Area Route'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Route Name <span className="text-destructive">*</span></label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., West Coast Regional Team" className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Job Manager <span className="text-destructive">*</span></label>
                    <select value={formData.assignedAreaJobManagerId} onChange={(e) => setFormData({...formData, assignedAreaJobManagerId: e.target.value})} className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white" aria-label="Select job manager">
                      <option value="">Select a job manager...</option>
                      {mockJobManagers.map((jm) => (
                        <option key={jm.id} value={jm.id}>{jm.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Locations <span className="text-destructive">*</span></label>
                    <MultiSelect options={mockLocations} selected={formData.locationIds} onChange={(selected) => setFormData({...formData, locationIds: selected})} placeholder="Select locations..." />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button onClick={handleSave} className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]/50 shadow-md">
                      {editingRoute ? 'Update Route' : 'Save Route'}
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent">Cancel</button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={handleStartCreate} className="w-full px-4 py-3 text-sm font-medium text-primary bg-primary/5 border-2 border-dashed border-primary rounded-lg hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary transition-colors">
                + Add New Assigned Area Route
              </button>
            )}

            <div className="flex items-center justify-between mt-6">
              <button onClick={() => router.push('/routing-setup/logical')} className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors">
                ← Back to Logical Routing
              </button>
              <button onClick={handleContinue} disabled={!canProceed} className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                {canProceed ? 'Complete Routing Setup →' : 'Create at least one route'}
              </button>
            </div>
          </div>

          {/* Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-slate-900">Assigned Area Routing</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6">
                Geographic routing assigns orders based on property location. This is typically used as a fallback when other routing methods don't match.
              </p>

              {/* Priority Flow - Highlighted */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-4">Your Priority Flow</h4>
                <div className="space-y-2">
                  {state.routing.requestTypeCompleted && (
                    <div className="flex items-start gap-3 opacity-40">
                      <div className="w-10 h-10 bg-slate-300 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-semibold">1</div>
                      <div className="flex-1 pt-2">
                        <div className="font-medium text-slate-700 text-sm">Request Type (✓ Completed)</div>
                      </div>
                    </div>
                  )}

                  {state.routing.logicalCompleted && (
                    <>
                      <div className="ml-5 flex items-center gap-2">
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <div className="flex items-start gap-3 opacity-40">
                        <div className="w-10 h-10 bg-slate-300 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-semibold">2</div>
                        <div className="flex-1 pt-2">
                          <div className="font-medium text-slate-700 text-sm">Logical (✓ Completed)</div>
                        </div>
                      </div>
                      <div className="ml-5 flex items-center gap-2">
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </>
                  )}

                  <div className="flex items-start gap-3 bg-blue-100 border-2 border-blue-400 rounded-lg p-3">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-semibold">3</div>
                    <div className="flex-1 pt-2">
                      <div className="font-bold text-blue-900 text-sm mb-1 flex items-center gap-2">
                        Assigned Area
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">You are here</span>
                      </div>
                      <p className="text-xs text-blue-800">Geographic routing by location</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How This Works */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">How This Works</h4>
                <ol className="space-y-1.5 text-xs text-slate-700 list-decimal list-inside">
                  <li>Order property location is identified</li>
                  <li>System matches to your defined regions</li>
                  <li>Assigns to regional job manager</li>
                  <li>Acts as fallback if other routes don't match</li>
                </ol>
              </div>

              {/* Examples */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Examples</h4>
                <div className="space-y-2 text-xs">
                  <div className="bg-white/70 rounded p-2 border border-blue-100">
                    <p className="text-slate-700">"West Coast properties → CA Regional Manager"</p>
                  </div>
                  <div className="bg-white/70 rounded p-2 border border-blue-100">
                    <p className="text-slate-700">"Southeast Region → Amanda Foster"</p>
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

