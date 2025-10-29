"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { PropertyCategory } from "@/lib/onboarding-context";

export default function PropertyCategoriesPage() {
  const { state, updateDefinitions, updateModuleProgress } = useOnboarding();
  const router = useRouter();

  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('definitions', 1, 4); // Step 1 of 4
  }, [updateModuleProgress]);

  const [categories, setCategories] = useState<PropertyCategory[]>(state.definitions.propertyCategories);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [_editingCategoryId, _setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [newPropertyType, setNewPropertyType] = useState('');

  const handleExpandCategory = (categoryId: string) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
      setEditingCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
      const category = categories.find(c => c.id === categoryId);
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

    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, name: editCategoryName.trim() }
          : cat
      )
    );
    setEditingCategoryId(null);
    setExpandedCategoryId(null);
  };

  const handleAddPropertyType = (categoryId: string) => {
    if (!newPropertyType.trim()) return;

    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, propertyTypes: [...cat.propertyTypes, newPropertyType.trim()] }
          : cat
      )
    );
    setNewPropertyType('');
  };

  const handleRemovePropertyType = (categoryId: string, propertyType: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, propertyTypes: cat.propertyTypes.filter(pt => pt !== propertyType) }
          : cat
      )
    );
  };

  const handleAddCategory = () => {
    const newCategory: PropertyCategory = {
      id: `cat-${Date.now()}`,
      name: 'New Property Category',
      type: 'Residential',
      propertyTypes: []
    };
    setCategories(prev => [...prev, newCategory]);
    setExpandedCategoryId(newCategory.id);
    setEditingCategoryId(newCategory.id);
    setEditCategoryName(newCategory.name);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? All property types under it will also be removed.')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      if (expandedCategoryId === categoryId) {
        setExpandedCategoryId(null);
        setEditingCategoryId(null);
      }
    }
  };

  const handleContinue = () => {
    if (categories.length === 0) {
      alert('Please create at least one property category');
      return;
    }

    updateDefinitions({ propertyCategories: categories });
    router.push('/definitions/properties/configure');
  };

  const steps = [
    { id: '1', label: 'Property Categories', status: 'in_progress' as const },
    { id: '2', label: 'Properties', status: 'not_started' as const },
    { id: '3', label: 'Request Form', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={0} 
      steps={steps}
      title="Definitions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Property Categories & Types
          </h1>
          <p className="text-base text-muted-foreground">
            Define property categories and the specific types within each category
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            {/* Categories List */}
            <div className="space-y-3 mb-6">
              {categories.map((category) => (
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
                            {category.propertyTypes.length} types
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
                          placeholder="e.g., Single Family Residential"
                          autoFocus
                        />
                      </div>

                      {/* Property Types List */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Property Types</h4>
                        
                        {/* Existing Property Types */}
                        {category.propertyTypes.length > 0 ? (
                          <div className="space-y-2 mb-3">
                            {category.propertyTypes.map((propertyType, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                                <span className="text-xs font-medium text-slate-500 w-6">{index + 1}.</span>
                                <span className="flex-1 text-sm text-foreground">{propertyType}</span>
                                <button
                                  onClick={() => handleRemovePropertyType(category.id, propertyType)}
                                  className="p-1.5 text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                                  title="Remove property type"
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-xs">No property types added yet</p>
                          </div>
                        )}

                        {/* Add Property Type */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newPropertyType}
                            onChange={(e) => setNewPropertyType(e.target.value)}
                            placeholder="Enter property type name"
                            className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddPropertyType(category.id)}
                          />
                          <button
                            onClick={() => handleAddPropertyType(category.id)}
                            disabled={!newPropertyType.trim()}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Add property type"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
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
            <button
              onClick={handleAddCategory}
              className="w-full px-4 py-4 text-sm font-medium text-primary bg-white border-2 border-dashed border-primary/40 rounded-lg hover:bg-primary/5 hover:border-primary transition-colors flex items-center justify-center gap-2 mb-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Property Category
            </button>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button 
                onClick={() => router.push('/definitions-intro')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                disabled={categories.length === 0}
                className="px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Configure Property Fields →
              </button>
            </div>
          </div>

          {/* Educational Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              {/* Why We Need This */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Property categories and types help organize your property records and enable smart routing, filtering, and reporting in YouConnect.
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
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Property Categories">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Property Categories Setup</p>
                    </div>
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2">Examples</h4>
                  <div className="space-y-2 text-xs">
                    <div className="bg-white border border-border rounded p-2">
                      <p className="font-semibold text-foreground mb-1">Single Family Residential</p>
                      <p className="text-slate-600 text-xs">Detached, Attached, Townhouse, Condo, Mobile Home</p>
                    </div>
                    <div className="bg-white border border-border rounded p-2">
                      <p className="font-semibold text-foreground mb-1">Commercial Property</p>
                      <p className="text-slate-600 text-xs">Office, Retail, Industrial, Warehouse, Hotel</p>
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
                      <strong>Tip:</strong> Click on a category to expand and manage its property types. You can add, edit, or remove types at any time.
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
