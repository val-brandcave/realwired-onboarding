"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding, type RequestCategory, type CustomRequestType } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function RequestTypesSetupPage() {
  const { state, updateDefinitions, updateModuleProgress } = useOnboarding();
  const router = useRouter();

  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('definitions', 3, 4); // Step 3 of 4
  }, [updateModuleProgress]);

  const [requestCategories, setRequestCategories] = useState<RequestCategory[]>(
    state.definitions.requestCategories || []
  );
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [_editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [newRequestTypeName, setNewRequestTypeName] = useState('');
  const [newRequestTypeProcess, setNewRequestTypeProcess] = useState<'1-step' | '2-step'>('2-step');

  const MAX_CATEGORIES = 3;

  const handleExpandCategory = (categoryId: string) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
      setEditingCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
      const category = requestCategories.find(c => c.id === categoryId);
      if (category) {
        setEditingCategoryId(categoryId);
        setEditCategoryName(category.name);
      }
    }
  };

  const handleSaveCategory = (categoryId: string) => {
    if (!editCategoryName.trim()) {
      alert('Category name cannot be empty');
      return;
    }

    setRequestCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, name: editCategoryName.trim() }
          : cat
      )
    );
    setEditingCategoryId(null);
    setExpandedCategoryId(null);
  };

  const handleAddRequestType = (categoryId: string) => {
    if (!newRequestTypeName.trim()) return;

    const newRequestType: CustomRequestType = {
      id: `rt-${Date.now()}`,
      name: newRequestTypeName.trim(),
      category: 'Other',
      processType: newRequestTypeProcess
    };

    setRequestCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, requestTypes: [...cat.requestTypes, newRequestType] }
          : cat
      )
    );
    setNewRequestTypeName('');
    setNewRequestTypeProcess('2-step');
  };

  const handleRemoveRequestType = (categoryId: string, requestTypeId: string) => {
    setRequestCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, requestTypes: cat.requestTypes.filter(rt => rt.id !== requestTypeId) }
          : cat
      )
    );
  };

  const handleUpdateRequestType = (categoryId: string, requestTypeId: string, updates: Partial<CustomRequestType>) => {
    setRequestCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              requestTypes: cat.requestTypes.map(rt =>
                rt.id === requestTypeId ? { ...rt, ...updates } : rt
              )
            }
          : cat
      )
    );
  };

  const handleAddCategory = () => {
    if (requestCategories.length >= MAX_CATEGORIES) {
      alert(`Maximum of ${MAX_CATEGORIES} categories allowed`);
      return;
    }

    const newCategory: RequestCategory = {
      id: `req-cat-${Date.now()}`,
      name: 'New Request Category',
      requestTypes: []
    };
    setRequestCategories(prev => [...prev, newCategory]);
    setExpandedCategoryId(newCategory.id);
    setEditingCategoryId(newCategory.id);
    setEditCategoryName(newCategory.name);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? All request types under it will also be removed.')) {
      setRequestCategories(prev => prev.filter(cat => cat.id !== categoryId));
      if (expandedCategoryId === categoryId) {
        setExpandedCategoryId(null);
        setEditingCategoryId(null);
      }
    }
  };

  const handleContinue = () => {
    if (requestCategories.length === 0) {
      alert('Please create at least one request category');
      return;
    }

    updateDefinitions({ requestCategories });
    router.push('/definitions/request-form/configure');
  };

  const steps = [
    { id: '1', label: 'Property Categories', status: 'completed' as const },
    { id: '2', label: 'Property Fields', status: 'completed' as const },
    { id: '3', label: 'Request Types', status: 'in_progress' as const },
    { id: '4', label: 'Request Form', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={2} 
      steps={steps}
      title="Definitions"
      breadcrumbs={[
        { label: "Home", href: "/hub", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>) },
        { label: "Definitions", href: "/definitions-intro" },
        { label: "Request Types" },
      ]}
      footerNav={{
        previousLabel: "Back",
        onPrevious: () => router.push('/definitions/properties/configure/advanced'),
        nextLabel: "Next: Configure Request Form",
        onNext: handleContinue,
        nextDisabled: requestCategories.length === 0,
        nextTooltip: requestCategories.length === 0 ? "Configure at least one request type" : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Request Categories & Types
          </h1>
          <p className="text-base text-muted-foreground">
            Define request categories and the specific types within each category
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            {/* Categories List */}
            <div className="space-y-3 mb-6">
              {requestCategories.map((category) => (
                <div key={category.id} className="bg-card border-2 border-border rounded-xl overflow-hidden transition-all">
                  {/* Category Header */}
                  <div className="p-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => handleExpandCategory(category.id)}
                        className="p-1.5 hover:bg-slate-200 rounded transition-colors"
                        aria-label={expandedCategoryId === category.id ? 'Collapse category' : 'Expand category'}
                      >
                        <svg 
                          className={`w-5 h-5 text-slate-600 transition-transform ${expandedCategoryId === category.id ? 'rotate-90' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-base text-foreground">{category.name}</h3>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs font-medium rounded">
                            {category.requestTypes.length} types
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                      title="Delete category"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Expanded Content - Edit Mode */}
                  {expandedCategoryId === category.id && (
                    <div className="border-t-2 border-slate-200 bg-white p-5 space-y-4">
                      {/* Edit Category Name */}
                      <div className="pb-4 border-b border-slate-200">
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          Category Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="w-full px-3 py-2.5 text-sm border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="e.g., Appraisal"
                          autoFocus
                        />
                      </div>

                      {/* Request Types List */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Request Types</h4>
                        
                        {/* Existing Request Types */}
                        {category.requestTypes.length > 0 ? (
                          <div className="space-y-2 mb-3">
                            {category.requestTypes.map((requestType, index) => (
                              <div key={requestType.id} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <span className="text-xs font-medium text-slate-500 w-6">{index + 1}.</span>
                                <input
                                  type="text"
                                  value={requestType.name}
                                  onChange={(e) => handleUpdateRequestType(category.id, requestType.id, { name: e.target.value })}
                                  className="flex-1 px-2 py-1.5 text-sm border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                                  aria-label={`Request type name for ${requestType.name}`}
                                  placeholder="Request type name"
                                />
                                <select
                                  value={requestType.processType || '2-step'}
                                  onChange={(e) => handleUpdateRequestType(category.id, requestType.id, { processType: e.target.value as '1-step' | '2-step' })}
                                  className="px-2 py-1.5 text-xs border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                                  aria-label="Process type"
                                >
                                  <option value="1-step">1-Step</option>
                                  <option value="2-step">2-Step</option>
                                </select>
                                <button
                                  onClick={() => handleRemoveRequestType(category.id, requestType.id)}
                                  className="p-1.5 text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                                  title="Remove request type"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-slate-500 border border-dashed border-slate-300 rounded-lg mb-3">
                            <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-xs">No request types added yet</p>
                          </div>
                        )}

                        {/* Add Request Type */}
                        <div className="space-y-2">
                          <div className="grid grid-cols-12 gap-2">
                            <input
                              type="text"
                              value={newRequestTypeName}
                              onChange={(e) => setNewRequestTypeName(e.target.value)}
                              placeholder="Enter request type name"
                              className="col-span-7 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                              onKeyPress={(e) => e.key === 'Enter' && handleAddRequestType(category.id)}
                              aria-label="New request type name"
                            />
                            <select
                              value={newRequestTypeProcess}
                              onChange={(e) => setNewRequestTypeProcess(e.target.value as '1-step' | '2-step')}
                              className="col-span-3 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                              aria-label="Process type for new request"
                              title="Process type"
                            >
                              <option value="1-step">1-Step</option>
                              <option value="2-step">2-Step</option>
                            </select>
                            <button
                              onClick={() => handleAddRequestType(category.id)}
                              disabled={!newRequestTypeName.trim()}
                              className="col-span-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              aria-label="Add request type"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Save/Cancel Buttons */}
                      <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => handleSaveCategory(category.id)}
                          className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setExpandedCategoryId(null);
                            setEditingCategoryId(null);
                          }}
                          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Category Button */}
            {requestCategories.length < MAX_CATEGORIES && (
              <button
                onClick={handleAddCategory}
                className="w-full px-4 py-4 text-sm font-medium text-primary bg-white border-2 border-dashed border-primary/40 rounded-lg hover:bg-primary/5 hover:border-primary transition-colors flex items-center justify-center gap-2 mb-6"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Request Category ({requestCategories.length}/{MAX_CATEGORIES})
              </button>
            )}

          </div>

          {/* Educational Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Request categories and types define the different services your organization offers. These help with workflow routing, form customization, and reporting.
                </p>
              </div>

              <div className="space-y-4">
                {/* Process Type Explanation */}
                <div className="bg-white border border-border rounded p-3">
                  <h4 className="text-xs font-semibold text-foreground mb-2">Process Types</h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-medium text-primary">2-Step Process</p>
                      <p className="text-slate-600">Vendor engagement + internal review</p>
                    </div>
                    <div>
                      <p className="font-medium text-primary">1-Step Process</p>
                      <p className="text-slate-600">Internal review only (no vendor)</p>
                    </div>
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2">Examples</h4>
                  <div className="space-y-2 text-xs">
                    <div className="bg-white border border-border rounded p-2">
                      <p className="font-semibold text-foreground mb-1">Appraisal</p>
                      <p className="text-slate-600 text-xs">Residential Appraisal (2-step), Commercial Appraisal (2-step), Review (1-step)</p>
                    </div>
                    <div className="bg-white border border-border rounded p-2">
                      <p className="font-semibold text-foreground mb-1">Environmental</p>
                      <p className="text-slate-600 text-xs">ESA I PNA (2-step), Environmental Records Search (1-step)</p>
                    </div>
                  </div>
                </div>

                {/* Tip Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-blue-900">
                      <strong>Tip:</strong> Maximum {MAX_CATEGORIES} categories allowed. Click on a category to expand and manage its request types.
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
