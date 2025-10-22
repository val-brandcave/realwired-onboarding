"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PropertyCategory } from "@/lib/onboarding-context";

export default function PropertyCategoriesPage() {
  const { state, updateDefinitions } = useOnboarding();
  const router = useRouter();

  const [categories, setCategories] = useState<PropertyCategory[]>(state.definitions.propertyCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState<PropertyCategory['type']>('Residential');

  const categoryTypes: PropertyCategory['type'][] = [
    'Residential', 'Commercial', 'Environmental', 'Agricultural', 'Other'
  ];

  const handleStartEdit = (category: PropertyCategory) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditType(category.type);
  };

  const handleSaveEdit = (categoryId: string) => {
    if (!editName.trim()) {
      alert('Category name cannot be empty');
      return;
    }

    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, name: editName.trim(), type: editType }
          : cat
      )
    );
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditType('Residential');
  };

  const handleAdd = () => {
    const newCategory: PropertyCategory = {
      id: `cat-${Date.now()}`,
      name: 'New Category',
      type: 'Residential',
    };
    setCategories(prev => [...prev, newCategory]);
    handleStartEdit(newCategory);
  };

  const handleDelete = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const handleContinue = () => {
    if (categories.length === 0) {
      alert('Please create at least one property category');
      return;
    }

    updateDefinitions({ propertyCategories: categories });
    router.push('/definitions/properties');
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
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Setup Property Categories
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Define the types of properties you work with. These categories help organize your property records.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            {/* Categories List */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Your Property Categories ({categories.length})
              </h3>
              {categories.map((category) => (
                <div key={category.id} className="bg-card border border-border rounded-lg p-5">
                  {editingId === category.id ? (
                    /* Edit Mode */
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Category Name</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                          placeholder="e.g., Single Family Residential"
                          autoFocus
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Category Type</label>
                        <select
                          value={editType}
                          onChange={(e) => setEditType(e.target.value as PropertyCategory['type'])}
                          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                          aria-label="Select category type"
                        >
                          {categoryTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveEdit(category.id)}
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
                          <h3 className="font-semibold text-lg text-foreground">{category.name}</h3>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {category.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(category)}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
                          title="Edit category"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                          title="Delete category"
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
              + Add New Property Category
            </button>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => router.push('/hub')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back to Hub
              </button>
              <button 
                onClick={handleContinue}
                disabled={categories.length === 0}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Properties →
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
                <h3 className="font-semibold text-slate-900">About Property Categories</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                Property categories help classify and organize different types of properties you appraise or review.
              </p>

              {/* Why This Matters */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Why This Matters</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Used in routing rules and workflow automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Helps filter and search property records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Enables category-specific reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Supports different workflows per category</span>
                  </li>
                </ul>
              </div>

              {/* Examples */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Examples</h4>
                <div className="space-y-2 text-xs">
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Single Family Residential</div>
                    <p className="text-slate-600">Type: Residential</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Commercial Office Buildings</div>
                    <p className="text-slate-600">Type: Commercial</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Phase I Environmental</div>
                    <p className="text-slate-600">Type: Environmental</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Tips</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">•</span>
                    <span>Click on any category to edit inline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Use names that match your internal terminology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>You can add or modify categories later</span>
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

