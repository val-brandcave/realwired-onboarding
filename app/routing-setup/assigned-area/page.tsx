"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
interface AssignedArea {
  id: string;
  name: string;
  jobManagerId: string;
  escalationManagerId: string;
  isDefault: boolean;
}

export default function AssignedAreaRoutingPage() {
  const { state: _state, addRoute: _addRoute, deleteRoute: _deleteRoute, updateRoute: _updateRoute, updateRouting, updateModuleProgress } = useOnboarding();
  const router = useRouter();

  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('routing', 3, 3); // Step 3 of 3 - 100%
  }, [updateModuleProgress]);

  const [routingMode, setRoutingMode] = useState<'single' | 'multiple'>('single');
  
  // Single area state
  const [singleArea, setSingleArea] = useState({
    departmentName: '',
    email: '',
  });

  // Multiple areas state
  const [assignedAreas, setAssignedAreas] = useState<AssignedArea[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingArea, setEditingArea] = useState<AssignedArea | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    jobManagerId: '',
    escalationManagerId: '',
    isDefault: false,
  });

  // Mock job managers
  const jobManagers = [
    { id: 'jm1', name: 'Sarah Johnson' },
    { id: 'jm2', name: 'Michael Chen' },
    { id: 'jm3', name: 'Emily Rodriguez' },
    { id: 'jm4', name: 'David Kim' },
    { id: 'jm5', name: 'Robert Williams' },
  ];

  const handleCreateNew = () => {
    setFormData({
      name: '',
      jobManagerId: '',
      escalationManagerId: '',
      isDefault: false,
    });
    setEditingArea(null);
    setIsCreating(true);
  };

  const handleEdit = (area: AssignedArea) => {
    setFormData({
      name: area.name,
      jobManagerId: area.jobManagerId,
      escalationManagerId: area.escalationManagerId,
      isDefault: area.isDefault,
    });
    setEditingArea(area);
    setIsCreating(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.jobManagerId) return;

    if (editingArea) {
      setAssignedAreas(prev =>
        prev.map(area =>
          area.id === editingArea.id
            ? { ...area, ...formData }
            : area
        )
      );
    } else {
      const newArea: AssignedArea = {
        id: `area-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name,
        jobManagerId: formData.jobManagerId,
        escalationManagerId: formData.escalationManagerId,
        isDefault: formData.isDefault,
      };
      setAssignedAreas([...assignedAreas, newArea]);
    }

    setIsCreating(false);
    setEditingArea(null);
  };

  const handleDelete = (areaId: string) => {
    if (confirm('Are you sure you want to delete this assigned area?')) {
      setAssignedAreas(prev => prev.filter(a => a.id !== areaId));
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingArea(null);
  };

  const handleComplete = () => {
    updateRouting({ 
      assignedAreaCompleted: true,
      completed: true 
    });
    router.push('/routing-setup/complete');
  };

  const canProceed = routingMode === 'single' 
    ? singleArea.departmentName.trim() && singleArea.email.trim()
    : assignedAreas.length > 0;

  const steps = [
    { id: '1', label: 'Request Type', status: 'completed' as const },
    { id: '2', label: 'Logical', status: 'completed' as const },
    { id: '3', label: 'Assigned Area', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={2} 
      steps={steps}
      title="Routing Setup"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Assigned Area Routing
          </h1>
          <p className="text-base text-muted-foreground">
                Configure how requests are routed to assigned areas or departments.
          </p>
        </div>

            {/* Routing Mode Selection */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Routing Configuration</h2>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="radio"
                    name="routingMode"
                    value="single"
                    checked={routingMode === 'single'}
                    onChange={() => setRoutingMode('single')}
                    className="w-5 h-5 text-primary border-input mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">All requests to one assigned area</p>
                    <p className="text-xs text-muted-foreground mt-1">Route all requests to a single department or area</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="radio"
                    name="routingMode"
                    value="multiple"
                    checked={routingMode === 'multiple'}
                    onChange={() => setRoutingMode('multiple')}
                    className="w-5 h-5 text-primary border-input mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">Multiple assigned areas</p>
                    <p className="text-xs text-muted-foreground mt-1">Create multiple areas with specific job managers and escalation paths</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Single Area Configuration */}
            {routingMode === 'single' && (
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h2 className="text-base font-semibold text-foreground mb-4">Single Assigned Area Configuration</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Department Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={singleArea.departmentName}
                      onChange={(e) => setSingleArea({ ...singleArea, departmentName: e.target.value })}
                      placeholder="e.g., Appraisal Services, Lending Operations"
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                        </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      value={singleArea.email}
                      onChange={(e) => setSingleArea({ ...singleArea, email: e.target.value })}
                      placeholder="department@example.com"
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Multiple Areas Configuration */}
            {routingMode === 'multiple' && (
              <>
                {/* Existing Areas */}
                {assignedAreas.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {assignedAreas.map((area) => (
                      <div key={area.id} className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-base font-semibold text-foreground">{area.name}</h3>
                              {area.isDefault && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded border border-green-300">
                                  Default
                                </span>
                            )}
                          </div>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <p><span className="font-medium">Job Manager:</span> {jobManagers.find(jm => jm.id === area.jobManagerId)?.name || 'N/A'}</p>
                              {area.escalationManagerId && (
                                <p><span className="font-medium">Escalation:</span> {jobManagers.find(jm => jm.id === area.escalationManagerId)?.name}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(area)}
                              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              title="Edit area"
                            >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                            <button
                              onClick={() => handleDelete(area.id)}
                              className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              title="Delete area"
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
                      {editingArea ? 'Edit Assigned Area' : 'Create Assigned Area'}
                    </h2>
                
                <div className="space-y-4">
                  <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Area Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., North Region, Commercial Department"
                          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                  </div>

                  <div>
                        <label htmlFor="job-manager-select" className="block text-sm font-medium text-foreground mb-1">
                          Job Manager <span className="text-destructive">*</span>
                        </label>
                        <select
                          id="job-manager-select"
                          value={formData.jobManagerId}
                          onChange={(e) => setFormData({ ...formData, jobManagerId: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Select job manager</option>
                          {jobManagers.map((jm) => (
                        <option key={jm.id} value={jm.id}>{jm.name}</option>
                      ))}
                    </select>
                  </div>

                      <div>
                        <label htmlFor="escalation-manager-select" className="block text-sm font-medium text-foreground mb-1">
                          Escalation Manager <span className="text-sm text-muted-foreground font-normal">(Optional)</span>
                        </label>
                        <select
                          id="escalation-manager-select"
                          value={formData.escalationManagerId}
                          onChange={(e) => setFormData({ ...formData, escalationManagerId: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">None</option>
                          {jobManagers.map((jm) => (
                            <option key={jm.id} value={jm.id}>{jm.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <label className="flex items-center gap-2 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={formData.isDefault}
                            onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                            className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                          />
                          <span className="text-sm font-medium text-foreground">Set as Default</span>
                        </label>
                        <div className="text-xs text-muted-foreground">
                          Default area receives unmatched requests
                        </div>
                  </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <button
                          onClick={handleSave}
                          disabled={!formData.name.trim() || !formData.jobManagerId}
                          className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {editingArea ? 'Update Area' : 'Save Area'}
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
                    className="w-full px-4 py-3 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-primary/30 mb-6"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Assigned Area
              </button>
                )}

                {assignedAreas.length === 0 && !isCreating && (
                  <div className="text-center py-8 bg-muted/30 rounded-lg border-2 border-dashed border-border mb-6">
                    <svg className="w-12 h-12 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-sm text-muted-foreground">No assigned areas created yet</p>
                  </div>
                )}
              </>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button 
                onClick={() => router.push('/routing-setup/logical')} 
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
                <button 
                onClick={handleComplete}
                  disabled={!canProceed} 
                className={`px-6 py-3 text-base font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all ${
                  canProceed
                    ? 'text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] hover:from-[#8A2826] hover:to-[#6B1F1D] shadow-lg hover:shadow-xl'
                    : 'text-muted-foreground bg-muted cursor-not-allowed'
                }`}
              >
                Complete Module →
                </button>
            </div>
          </div>

          {/* Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-3">Assigned Area Routing</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Route requests to specific departments or geographic areas. You can configure a single area for all requests or create multiple areas with specific managers.
                </p>

                {/* Video Tutorial */}
                <div className="mb-4">
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video Tutorial (2:30)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Assigned Area Routing">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Assigned Area Routing Overview</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-1">Single Area:</p>
                    <p>All requests go to one department with a single email address.</p>
                  </div>

                  <div>
                    <p className="font-medium text-foreground mb-1">Multiple Areas:</p>
                    <p>Create areas with job managers and escalation paths. Mark one as default for unmatched requests.</p>
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
