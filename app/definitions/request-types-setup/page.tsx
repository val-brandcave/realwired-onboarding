"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CustomRequestType } from "@/lib/onboarding-context";

export default function RequestTypesSetupPage() {
  const { state, updateDefinitions } = useOnboarding();
  const router = useRouter();

  const [requestTypes, setRequestTypes] = useState<CustomRequestType[]>(state.definitions.customRequestTypes);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState<CustomRequestType['category']>('Residential');

  const requestCategories: CustomRequestType['category'][] = [
    'Residential', 'Commercial', 'Environmental', 'Agricultural', 'Other'
  ];

  const handleStartEdit = (requestType: CustomRequestType) => {
    setEditingId(requestType.id);
    setEditName(requestType.name);
    setEditCategory(requestType.category);
  };

  const handleSaveEdit = (typeId: string) => {
    if (!editName.trim()) {
      alert('Request type name cannot be empty');
      return;
    }

    setRequestTypes(prev =>
      prev.map(rt =>
        rt.id === typeId
          ? { ...rt, name: editName.trim(), category: editCategory }
          : rt
      )
    );
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditCategory('Residential');
  };

  const handleAdd = () => {
    const newType: CustomRequestType = {
      id: `rt-${Date.now()}`,
      name: 'New Request Type',
      category: 'Residential',
    };
    setRequestTypes(prev => [...prev, newType]);
    handleStartEdit(newType);
  };

  const handleDelete = (typeId: string) => {
    if (confirm('Are you sure you want to delete this request type?')) {
      setRequestTypes(prev => prev.filter(rt => rt.id !== typeId));
    }
  };

  const handleContinue = () => {
    if (requestTypes.length === 0) {
      alert('Please create at least one request type');
      return;
    }

    updateDefinitions({ customRequestTypes: requestTypes });
    router.push('/definitions/request-form');
  };

  const steps = [
    { id: '1', label: 'Property Categories', status: 'completed' as const },
    { id: '2', label: 'Properties', status: 'completed' as const },
    { id: '3', label: 'Request Types', status: 'in_progress' as const },
    { id: '4', label: 'Request Form', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={2} 
      steps={steps}
      title="Definitions"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Define Your Request Types
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Create and customize the types of requests your organization processes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            {/* Request Types List */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Your Request Types ({requestTypes.length})
              </h3>
              {requestTypes.map((requestType) => (
                <div key={requestType.id} className="bg-card border border-border rounded-lg p-5">
                  {editingId === requestType.id ? (
                    /* Edit Mode */
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Request Type Name</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                          placeholder="e.g., Residential Appraisal"
                          autoFocus
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Request Type Category</label>
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value as CustomRequestType['category'])}
                          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                          aria-label="Select request category"
                        >
                          {requestCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveEdit(requestType.id)}
                          className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]/50"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-foreground">{requestType.name}</h3>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                            {requestType.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(requestType)}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
                          title="Edit request type"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(requestType.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                          title="Delete request type"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Button */}
            <button
              onClick={handleAdd}
              className="w-full px-4 py-3 text-sm font-medium text-primary bg-primary/5 border-2 border-dashed border-primary rounded-lg hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary transition-colors mb-6"
            >
              + Add New Request Type
            </button>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => router.push('/definitions/properties/preview')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back to Property Preview
              </button>
              <button 
                onClick={handleContinue}
                disabled={requestTypes.length === 0}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Request Form →
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
                <h3 className="font-semibold text-slate-900">About Request Types</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                Request types define the different kinds of orders or services your team handles. They're used for routing and workflow customization.
              </p>

              {/* Why This Matters */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Why This Matters</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Essential for request type-based routing (Priority 1)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Used in logical routing rules and filters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Enables type-specific workflows and templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Helps with reporting and analytics</span>
                  </li>
                </ul>
              </div>

              {/* Examples */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Examples</h4>
                <div className="space-y-2 text-xs">
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Residential Appraisal</div>
                    <p className="text-slate-600">Category: Residential</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Commercial Appraisal</div>
                    <p className="text-slate-600">Category: Commercial</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Phase I Environmental</div>
                    <p className="text-slate-600">Category: Environmental</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Tips</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">•</span>
                    <span>Click on any request type to edit inline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Match names to your internal terminology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Categories help with organization and filtering</span>
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

