"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { LendingGroup } from "@/lib/onboarding-context";

// Multi-select component for regions and products
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
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="hover:text-destructive"
                aria-label={`Remove ${item}`}
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

export default function LendingGroupsPage() {
  const { state, updateUsers } = useOnboarding();
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [editingGroup, setEditingGroup] = useState<LendingGroup | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '' as LendingGroup['type'] | '',
    regions: [] as string[],
    products: [] as string[],
  });

  const groupTypes: LendingGroup['type'][] = [
    'Commercial', 'Consumer', 'Mortgage', 'Auto', 'Personal', 'Small Business', 'Credit Card', 'Other'
  ];

  const availableRegions = state.companySetup.regions.length > 0 
    ? state.companySetup.regions 
    : ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West Coast'];

  const availableProducts = [
    'Fixed Rate Loan', 'Adjustable Rate Loan', 'Line of Credit (LOC)', 
    'Lease', 'Home Equity Loan', 'Construction Loan', 'Bridge Loan', 'Other'
  ];

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingGroup(null);
    setFormData({
      name: '',
      type: '',
      regions: [],
      products: [],
    });
  };

  const handleEdit = (group: LendingGroup) => {
    setIsCreating(true);
    setEditingGroup(group);
    setFormData({
      name: group.name,
      type: group.type,
      regions: group.regions,
      products: group.products,
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingGroup(null);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.type) {
      alert('Please fill in group name and type');
      return;
    }

    const groupData: Omit<LendingGroup, 'id'> = {
      name: formData.name.trim(),
      type: formData.type as LendingGroup['type'],
      regions: formData.regions,
      products: formData.products,
    };

    if (editingGroup) {
      const updatedGroups = state.users.lendingGroups.map(g =>
        g.id === editingGroup.id ? { ...groupData, id: g.id } : g
      );
      updateUsers({ lendingGroups: updatedGroups });
    } else {
      const newGroup: LendingGroup = {
        ...groupData,
        id: `lg-${Date.now()}`,
      };
      updateUsers({ lendingGroups: [...state.users.lendingGroups, newGroup] });
    }

    handleCancel();
  };

  const handleDelete = (groupId: string) => {
    if (confirm('Are you sure you want to delete this lending group?')) {
      updateUsers({ 
        lendingGroups: state.users.lendingGroups.filter(g => g.id !== groupId) 
      });
    }
  };

  const handleContinue = () => {
    updateUsers({ completed: true });
    router.push('/users/complete');
  };

  const canProceed = state.users.lendingGroups.length > 0;

  const steps = [
    { id: '1', label: 'Team Members', status: 'completed' as const },
    { id: '2', label: 'Lending Groups', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={1} 
      steps={steps}
      title="Team & Groups Setup"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Setup Lending Groups
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Create lending groups to organize your loan products and regional divisions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            {/* Groups List */}
            {state.users.lendingGroups.length > 0 && (
              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Your Lending Groups ({state.users.lendingGroups.length})
                </h3>
                {state.users.lendingGroups.map((group) => (
                  <div key={group.id} className="bg-card border border-border rounded-lg p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-foreground">{group.name}</h3>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {group.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {group.regions.length > 0 && (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              Regions: {group.regions.join(', ')}
                            </span>
                          )}
                          {group.products.length > 0 && (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              Products: {group.products.length}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(group)}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
                          title="Edit group"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(group.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                          title="Delete group"
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
              <div className="bg-card border-2 border-primary rounded-lg p-6 mb-6">
                <h3 className="text-base font-semibold text-foreground mb-4">
                  {editingGroup ? 'Edit Lending Group' : 'Create New Lending Group'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Group Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Florida Commercial Division"
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Group Type <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as LendingGroup['type']})}
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                      aria-label="Select group type"
                    >
                      <option value="">Select a type...</option>
                      {groupTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Regions (Optional)
                    </label>
                    <MultiSelect
                      options={availableRegions}
                      selected={formData.regions}
                      onChange={(selected) => setFormData({...formData, regions: selected})}
                      placeholder="Select regions..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Associated Products (Optional)
                    </label>
                    <MultiSelect
                      options={availableProducts}
                      selected={formData.products}
                      onChange={(selected) => setFormData({...formData, products: selected})}
                      placeholder="Select products..."
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]/50 shadow-md"
                    >
                      {editingGroup ? 'Update Group' : 'Save Group'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleStartCreate}
                className="w-full px-4 py-3 text-sm font-medium text-primary bg-primary/5 border-2 border-dashed border-primary rounded-lg hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              >
                + Add New Lending Group
              </button>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button 
                onClick={() => router.push('/users')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back to Team Members
              </button>
              <button 
                onClick={handleContinue}
                disabled={!canProceed}
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {canProceed ? 'Complete Setup →' : 'Create at least one lending group'}
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
                <h3 className="font-semibold text-slate-900">About Lending Groups</h3>
              </div>
              
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                Lending groups help organize your loan products by division, region, or business line for better routing and reporting.
              </p>

              {/* Why This Matters */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Why This Matters</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Route orders based on lending division or product type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Create region-specific groups for geographic coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Enable product-specific workflows and assignments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5 font-bold">•</span>
                    <span>Improve reporting and analytics by division</span>
                  </li>
                </ul>
              </div>

              {/* Examples */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h4 className="font-medium text-slate-900 text-sm mb-3">Examples</h4>
                <div className="space-y-2 text-xs">
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Florida Commercial Division</div>
                    <p className="text-slate-600">Type: Commercial • Region: Southeast</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="font-medium text-slate-900 mb-1">Consumer Mortgage Team</div>
                    <p className="text-slate-600">Type: Mortgage • Products: Fixed/ARM</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-medium text-slate-900 text-sm mb-3">Tips</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">•</span>
                    <span>Align groups with your organizational structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>You'll use these groups in logical routing rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-700 mt-0.5">→</span>
                    <span>Can add or modify groups later</span>
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

