"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { RouteRule } from "@/lib/onboarding-context";

// Multi-select component
function MultiSelect({ 
  options, 
  selected, 
  onChange, 
  placeholder 
}: { 
  options: string[] | {id: string; name: string}[]; 
  selected: string[]; 
  onChange: (selected: string[]) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const getOptionValue = (opt: string | {id: string; name: string}) => 
    typeof opt === 'string' ? opt : opt.id;
  
  const getOptionLabel = (opt: string | {id: string; name: string}) => 
    typeof opt === 'string' ? opt : opt.name;

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(item => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeItem = (value: string) => {
    onChange(selected.filter(item => item !== value));
  };

  const getLabel = (value: string) => {
    const opt = options.find(o => getOptionValue(o) === value);
    return opt ? getOptionLabel(opt) : value;
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
          {options.map((option) => {
            const value = getOptionValue(option);
            const label = getOptionLabel(option);
            return (
              <label
                key={value}
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(value)}
                  onChange={() => toggleOption(value)}
                  className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            );
          })}
        </div>
      )}

      {/* Selected Pills */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
            >
              {getLabel(value)}
              <button
                type="button"
                onClick={() => removeItem(value)}
                className="hover:text-destructive"
                aria-label={`Remove ${getLabel(value)}`}
              >
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

export default function LogicalRoutingPage() {
  const { state, addRoute, deleteRoute, updateRoute, updateRouting, updateModuleProgress } = useOnboarding();
  const router = useRouter();

  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('routing', 2, 3); // Step 2 of 3
  }, [updateModuleProgress]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteRule | null>(null);
  const [routeCounter, setRouteCounter] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    assigneeId: '',
    assignToCopyId: '', // Changed from array to single string
    requestTypeIds: [] as string[],
    loanAmountMin: '',
    loanAmountMax: '',
    propertyCategoryIds: [] as string[],
    lendingGroupIds: [] as string[],
    locationIds: [] as string[],
    regionIds: [] as string[],
  });

  // Mock data
  const jobManagers = [
    { id: 'jm1', name: 'Sarah Johnson' },
    { id: 'jm2', name: 'Michael Chen' },
    { id: 'jm3', name: 'Emily Rodriguez' },
    { id: 'jm4', name: 'David Kim' },
  ];

  const requestTypes = [
    'Residential Appraisal (Full)',
    'Commercial Property Valuation',
    'BPO - Broker Price Opinion',
    'Environmental Site Assessment',
    'Desktop Review',
  ];

  const propertyCategories = ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Mixed-Use'];
  const lendingGroups = ['Commercial Lending', 'Consumer Lending', 'Mortgage Division', 'Auto Loans', 'Small Business'];
  const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'];
  const regions = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'];

  const logicalRoutes = state.routing.routes.filter(r => r.type === 'logical');

  const handleCreateNew = () => {
    setFormData({
      name: `Logical Route ${routeCounter}`,
      assigneeId: '',
      assignToCopyId: '', // Changed from array to single string
      requestTypeIds: [],
      loanAmountMin: '',
      loanAmountMax: '',
      propertyCategoryIds: [],
      lendingGroupIds: [],
      locationIds: [],
      regionIds: [],
    });
    setRouteCounter(prev => prev + 1);
    setIsCreating(true);
    setEditingRoute(null);
  };

  const handleEdit = (route: RouteRule) => {
    setFormData({
      name: route.name,
      assigneeId: route.config.assigneeId || '',
      assignToCopyId: route.config.assignToCopyId || '', // Changed from array to single string
      requestTypeIds: route.config.logicalRequestTypeIds || [],
      loanAmountMin: '',
      loanAmountMax: '',
      propertyCategoryIds: route.config.propertyCategoryIds || [],
      lendingGroupIds: route.config.lendingGroupIds || [],
      locationIds: route.config.logicalLocationIds || [],
      regionIds: [],
    });
    setEditingRoute(route);
    setIsCreating(true);
  };

  const handleSave = () => {
    // Validate: must have name, assignee, and at least one criteria
    if (!formData.name.trim() || !formData.assigneeId) return;
    
    const hasCriteria = 
      formData.requestTypeIds.length > 0 ||
      formData.loanAmountMin !== '' ||
      formData.loanAmountMax !== '' ||
      formData.propertyCategoryIds.length > 0 ||
      formData.lendingGroupIds.length > 0 ||
      formData.locationIds.length > 0 ||
      formData.regionIds.length > 0;

    if (!hasCriteria) {
      alert('Please select at least one criteria (request type, loan amount, property category, lending group, location, or region)');
      return;
    }

    if (editingRoute) {
      updateRoute(editingRoute.id, {
        name: formData.name,
        config: {
          ...editingRoute.config,
          assigneeId: formData.assigneeId,
          assignToCopyId: formData.assignToCopyId, // Changed from array to single string
          logicalRequestTypeIds: formData.requestTypeIds,
          propertyCategoryIds: formData.propertyCategoryIds,
          lendingGroupIds: formData.lendingGroupIds,
          logicalLocationIds: formData.locationIds,
        }
      });
    } else {
      addRoute({
        name: formData.name,
        type: 'logical',
        priority: logicalRoutes.length + 1,
        enabled: true,
        config: {
          assigneeId: formData.assigneeId,
          assignToCopyId: formData.assignToCopyId, // Changed from array to single string
          logicalRequestTypeIds: formData.requestTypeIds,
          propertyCategoryIds: formData.propertyCategoryIds,
          lendingGroupIds: formData.lendingGroupIds,
          logicalLocationIds: formData.locationIds,
        }
      });
    }

    setIsCreating(false);
    setEditingRoute(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingRoute(null);
  };

  const handleDelete = (routeId: string) => {
    if (confirm('Are you sure you want to delete this routing rule?')) {
      deleteRoute(routeId);
    }
  };

  const handleContinue = () => {
    updateRouting({ logicalCompleted: true });
    router.push('/routing-setup/assigned-area');
  };

  const steps = [
    { id: '1', label: 'Request Type', status: 'completed' as const },
    { id: '2', label: 'Logical', status: 'in_progress' as const },
    { id: '3', label: 'Assigned Area', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={1} 
      steps={steps}
      title="Routing Setup"
      breadcrumbs={[
        { label: "Home", href: "/hub", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>) },
        { label: "Routing", href: "/routing-intro" },
        { label: "Logical Routing" },
      ]}
      footerNav={{
        previousLabel: "Back",
        onPrevious: () => router.push('/routing-setup/request-type'),
        nextLabel: "Next: Assigned Area",
        onNext: handleContinue,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Logical Routing Rules
          </h1>
          <p className="text-base text-muted-foreground">
                Create routing rules based on request criteria like loan amount, property category, or location. This step is optional.
          </p>
        </div>

            {/* Existing Routes */}
            {logicalRoutes.length > 0 && (
              <div className="space-y-3 mb-6">
                {logicalRoutes.map((route) => (
                    <div key={route.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-foreground mb-2">{route.name}</h3>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p><span className="font-medium">Assignee:</span> {jobManagers.find(jm => jm.id === route.config.assigneeId)?.name || 'N/A'}</p>
                          {route.config.assignToCopyId && (
                            <p><span className="font-medium">Copy/CC To:</span> {jobManagers.find(jm => jm.id === route.config.assignToCopyId)?.name || 'N/A'}</p>
                          )}
                          {route.config.logicalRequestTypeIds && route.config.logicalRequestTypeIds.length > 0 && (
                            <p><span className="font-medium">Request Types:</span> {route.config.logicalRequestTypeIds.length} selected</p>
                          )}
                          {route.config.propertyCategoryIds && route.config.propertyCategoryIds.length > 0 && (
                            <p><span className="font-medium">Property Categories:</span> {route.config.propertyCategoryIds.join(', ')}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(route)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Edit route"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        <button
                          onClick={() => handleDelete(route.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Delete route"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Create/Edit Form */}
            {isCreating ? (
              <div className="bg-card border-2 border-primary rounded-xl p-6 mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  {editingRoute ? 'Edit Logical Route' : 'Create New Logical Route'}
                </h2>
                
                <div className="space-y-4">
                  {/* Route Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Route Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Logical Route 1"
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  {/* Assignee (Mandatory) */}
                  <div>
                    <label htmlFor="assignee-select" className="block text-sm font-medium text-foreground mb-1">
                      Assignee <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="assignee-select"
                      value={formData.assigneeId}
                      onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select assignee</option>
                      {jobManagers.map((jm) => (
                        <option key={jm.id} value={jm.id}>{jm.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Assign to Copy/CC (Optional) - Changed to single-select */}
                  <div>
                    <label htmlFor="copy-cc-select" className="block text-sm font-medium text-foreground mb-1">
                      Assign to Copy/CC <span className="text-sm text-muted-foreground font-normal">(Optional - limit 1 user)</span>
                    </label>
                    <select
                      id="copy-cc-select"
                      value={formData.assignToCopyId}
                      onChange={(e) => setFormData({ ...formData, assignToCopyId: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select user to copy on assignment (optional)</option>
                      {jobManagers.map((jm) => (
                        <option key={jm.id} value={jm.id}>{jm.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Criteria Section */}
                  <div className="border-t border-border pt-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Routing Criteria <span className="text-xs text-muted-foreground font-normal">(Select at least one)</span>
                    </h3>

                    <div className="space-y-4">
                      {/* Request Types */}
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Request Types</label>
                        <MultiSelect
                          options={requestTypes}
                          selected={formData.requestTypeIds}
                          onChange={(selected) => setFormData({ ...formData, requestTypeIds: selected })}
                          placeholder="Select request types"
                        />
                      </div>

                      {/* Loan Amount Range */}
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Loan Amount Range</label>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="number"
                            value={formData.loanAmountMin}
                            onChange={(e) => setFormData({ ...formData, loanAmountMin: e.target.value })}
                            placeholder="Min amount"
                            className="px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                          <input
                            type="number"
                            value={formData.loanAmountMax}
                            onChange={(e) => setFormData({ ...formData, loanAmountMax: e.target.value })}
                            placeholder="Max amount"
                            className="px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      </div>

                      {/* Property Category */}
                  <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Property Category</label>
                        <MultiSelect
                          options={propertyCategories}
                          selected={formData.propertyCategoryIds}
                          onChange={(selected) => setFormData({ ...formData, propertyCategoryIds: selected })}
                          placeholder="Select property categories"
                        />
                  </div>

                      {/* Lending Group */}
                  <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Lending Group</label>
                        <MultiSelect
                          options={lendingGroups}
                          selected={formData.lendingGroupIds}
                          onChange={(selected) => setFormData({ ...formData, lendingGroupIds: selected })}
                          placeholder="Select lending groups"
                        />
                  </div>

                      {/* Location (States) */}
                  <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Location (States)</label>
                        <MultiSelect
                          options={states}
                          selected={formData.locationIds}
                          onChange={(selected) => setFormData({ ...formData, locationIds: selected })}
                          placeholder="Select states"
                        />
                  </div>

                      {/* Region */}
                  <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Region</label>
                        <MultiSelect
                          options={regions}
                          selected={formData.regionIds}
                          onChange={(selected) => setFormData({ ...formData, regionIds: selected })}
                          placeholder="Select regions"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <button
                      onClick={handleSave}
                      disabled={!formData.name.trim() || !formData.assigneeId}
                      className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {editingRoute ? 'Update Route' : 'Save Route'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleCreateNew}
                className="w-full px-4 py-3 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-primary/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Logical Route
              </button>
            )}

            {logicalRoutes.length === 0 && !isCreating && (
              <div className="text-center py-8 bg-muted/30 rounded-lg border-2 border-dashed border-border mb-6">
                <svg className="w-12 h-12 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm text-muted-foreground">No logical routing rules created yet</p>
                <p className="text-xs text-muted-foreground mt-1">This step is optional</p>
              </div>
            )}

          </div>

          {/* Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-3">Logical Routing</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Route orders based on specific criteria combinations like loan amount ranges, property types, or geographic locations.
                </p>

                {/* Video Tutorial */}
                <div className="mb-4">
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video Tutorial (3:15)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Logical Routing Rules">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Logical Routing Overview</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">Example:</p>
                  <div className="bg-white border border-border rounded p-2">
                    <p className="font-medium text-xs text-foreground">High-Value Commercial</p>
                    <ul className="space-y-0.5 mt-1 text-xs">
                      <li>• Loan: $1M+</li>
                      <li>• Category: Commercial</li>
                      <li>• Assignee: Senior Manager</li>
                    </ul>
                  </div>
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
