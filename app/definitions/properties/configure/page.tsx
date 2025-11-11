"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { PropertyRecordField } from "@/lib/onboarding-context";

type FieldInputType = 'text' | 'textarea' | 'number' | 'select' | 'multiselect';

interface ExtendedPropertyField extends PropertyRecordField {
  inputType?: FieldInputType;
  dropdownOptions?: string[];
  systemRequired?: boolean; // Cannot be changed by user
}

// Get available input types based on field context
function getAvailableInputTypes(fieldId: string): { value: FieldInputType; label: string }[] {
  // Simple text fields (address, names, etc.)
  const textOnlyFields = ['street-address', 'apt-unit', 'city', 'county', 'parcel-id'];
  
  if (textOnlyFields.includes(fieldId)) {
    return [
      { value: 'text', label: 'Text Input' },
      { value: 'textarea', label: 'Multi-line Text Field' }
    ];
  }
  
  // Numeric fields
  const numericFields = ['year-built', 'square-footage', 'lot-size', 'bedrooms', 'bathrooms', 'assessed-value'];
  
  if (numericFields.includes(fieldId)) {
    return [
      { value: 'number', label: 'Numeric Value' },
      { value: 'text', label: 'Text Input' }
    ];
  }
  
  // Predefined dropdown fields (property-category, property-type)
  if (fieldId === 'property-category' || fieldId === 'property-type') {
    return [
      { value: 'select', label: 'Dropdown (predefined)' }
    ];
  }
  
  // Fields that benefit from dropdowns
  return [
    { value: 'text', label: 'Text Input' },
    { value: 'textarea', label: 'Multi-line Text Field' },
    { value: 'select', label: 'Dropdown Selection' },
    { value: 'multiselect', label: 'Multi-select Dropdown' },
    { value: 'number', label: 'Numeric Value' }
  ];
}

// Get default dropdown options for fields
function getDefaultDropdownOptions(fieldId: string): string[] {
  const defaults: Record<string, string[]> = {
    'state': ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA'],
    'flood-zone': ['Zone A', 'Zone AE', 'Zone AH', 'Zone AO', 'Zone V', 'Zone VE', 'Zone X (Shaded)', 'Zone X (Unshaded)', 'Zone D', 'Not in Flood Zone'],
    'occupancy-status': ['Owner Occupied', 'Owner Occupied & Leased', 'Tenant Occupied', 'Ground Leased', 'Leasehold (Borrower is tenant)', 'Vacant'],
    'property-status': ['Existing', 'Under Construction', 'Renovation', 'Proposed'],
    'site-area-unit': ['SF', 'Acres', 'Units'],
    'building-size-unit': ['SF', 'Units'],
    'excess-land-unit': ['SF', 'Acres', 'Units'],
    'hoa-applicable': ['Yes', 'No'],
  };
  
  return defaults[fieldId] || [];
}

export default function PropertyRecordConfigurePage() {
  const { state, updateDefinitions, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('definitions', 2, 4); // Step 2 of 4
  }, [updateModuleProgress]);

  // Initialize fields with input types
  const [fields, setFields] = useState<ExtendedPropertyField[]>(
    state.definitions.propertyRecordFields.map(field => ({
      ...field,
      inputType: (field.type as FieldInputType) || 'text',
      dropdownOptions: field.options || getDefaultDropdownOptions(field.id)
    }))
  );

  const [editingDropdownField, setEditingDropdownField] = useState<string | null>(null);
  const [newDropdownItem, setNewDropdownItem] = useState('');
  
  // Custom field creation
  const [showCustomFieldForm, setShowCustomFieldForm] = useState(false);
  const [customFieldLabel, setCustomFieldLabel] = useState('');
  const [customFieldType, setCustomFieldType] = useState<FieldInputType>('text');
  const [customFieldOptions, setCustomFieldOptions] = useState<string[]>([]);
  const [newCustomOption, setNewCustomOption] = useState('');

  const toggleField = (fieldId: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId && !field.systemRequired ? { ...field, enabled: !field.enabled } : field
      )
    );
  };

  const toggleRequired = (fieldId: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId && !field.systemRequired ? { ...field, required: !field.required } : field
      )
    );
  };

  const updateFieldLabel = (fieldId: string, newLabel: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId ? { ...field, customLabel: newLabel } : field
      )
    );
  };

  const updateFieldInputType = (fieldId: string, inputType: FieldInputType) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId 
          ? { 
              ...field, 
              inputType,
              dropdownOptions: (inputType === 'select' || inputType === 'multiselect') 
                ? (field.dropdownOptions || getDefaultDropdownOptions(fieldId))
                : undefined
            }
          : field
      )
    );
  };

  const addDropdownItem = (fieldId: string) => {
    if (!newDropdownItem.trim()) return;
    
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId 
          ? { ...field, dropdownOptions: [...(field.dropdownOptions || []), newDropdownItem.trim()] }
          : field
      )
    );
    setNewDropdownItem('');
  };

  const removeDropdownItem = (fieldId: string, item: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId 
          ? { ...field, dropdownOptions: field.dropdownOptions?.filter(i => i !== item) }
          : field
      )
    );
  };

  // Custom field required state
  const [customFieldRequired, setCustomFieldRequired] = useState(false);

  const handleAddCustomField = () => {
    if (!customFieldLabel.trim()) return;

    const newField: ExtendedPropertyField = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: customFieldLabel.trim(),
      customLabel: customFieldLabel.trim(),
      category: 'advanced',
      type: customFieldType === 'multiselect' ? 'select' : customFieldType,
      enabled: true,
      required: customFieldRequired,
      systemRequired: false,
      inputType: customFieldType,
      dropdownOptions: (customFieldType === 'select' || customFieldType === 'multiselect') 
        ? customFieldOptions 
        : undefined,
    };

    setFields([...fields, newField]);
    
    // Reset form
    setCustomFieldLabel('');
    setCustomFieldType('text');
    setCustomFieldOptions([]);
    setNewCustomOption('');
    setCustomFieldRequired(false);
    setShowCustomFieldForm(false);
  };

  const handleAddCustomOption = () => {
    if (newCustomOption.trim() && !customFieldOptions.includes(newCustomOption.trim())) {
      setCustomFieldOptions([...customFieldOptions, newCustomOption.trim()]);
      setNewCustomOption('');
    }
  };

  const handleRemoveCustomOption = (option: string) => {
    setCustomFieldOptions(customFieldOptions.filter(o => o !== option));
  };

  const handleRemoveCustomField = (fieldId: string) => {
    if (fieldId.startsWith('custom-')) {
      setFields(fields.filter(f => f.id !== fieldId));
    }
  };

  const handleContinue = () => {
    updateDefinitions({ propertyRecordFields: fields });
    router.push('/definitions/request-types-setup');
  };

  const overviewFields = fields.filter(f => f.category === 'overview');
  const advancedFields = fields.filter(f => f.category === 'advanced');
  const enabledCount = fields.filter(f => f.enabled).length;

  const steps = [
    { id: '1', label: 'Property Categories', status: 'completed' as const },
    { id: '2', label: 'Property Fields', status: 'in_progress' as const },
    { id: '3', label: 'Request Types', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={1} 
      steps={steps}
      title="Definitions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Configure Property Record Fields
          </h1>
          <p className="text-base text-muted-foreground">
            Customize the fields that appear in all property records
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Selection Summary */}
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-foreground">
                    {enabledCount} of {fields.length} fields selected
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  * = Required field
                </span>
              </div>
            </div>

            {/* Overview Section */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Overview Fields
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Basic property identification and location information
              </p>
              
              <div className="space-y-3">
                {overviewFields.map((field) => (
                  <FieldConfiguration
                    key={field.id}
                    field={field}
                    onToggle={toggleField}
                    onToggleRequired={toggleRequired}
                    onLabelUpdate={updateFieldLabel}
                    onInputTypeUpdate={updateFieldInputType}
                    onAddDropdownItem={addDropdownItem}
                    onRemoveDropdownItem={removeDropdownItem}
                    editingDropdownField={editingDropdownField}
                    setEditingDropdownField={setEditingDropdownField}
                    newDropdownItem={newDropdownItem}
                    setNewDropdownItem={setNewDropdownItem}
                  />
                ))}
              </div>
            </div>

            {/* Advanced Details Section */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Advanced Details
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Additional property characteristics and specifications
              </p>
              
              <div className="space-y-3">
                {advancedFields.map((field) => (
                  <FieldConfiguration
                    key={field.id}
                    field={field}
                    onToggle={toggleField}
                    onToggleRequired={toggleRequired}
                    onLabelUpdate={updateFieldLabel}
                    onInputTypeUpdate={updateFieldInputType}
                    onAddDropdownItem={addDropdownItem}
                    onRemoveDropdownItem={removeDropdownItem}
                    editingDropdownField={editingDropdownField}
                    setEditingDropdownField={setEditingDropdownField}
                    newDropdownItem={newDropdownItem}
                    setNewDropdownItem={setNewDropdownItem}
                    isPredefinedDropdown={field.id === 'property-category' || field.id === 'property-type'}
                    isCustomField={field.id.startsWith('custom-')}
                    onRemoveCustomField={handleRemoveCustomField}
                  />
                ))}

                {/* Add Custom Field Button/Form */}
                {!showCustomFieldForm ? (
                  <button
                    onClick={() => setShowCustomFieldForm(true)}
                    className="w-full px-4 py-3 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-primary/30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Custom Field
                  </button>
                ) : (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Create Custom Field</h3>
                    
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Field Label <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={customFieldLabel}
                        onChange={(e) => setCustomFieldLabel(e.target.value)}
                        placeholder="e.g., Pool Type, Garage Size"
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <div>
                      <label htmlFor="custom-field-type" className="block text-xs font-medium text-foreground mb-1">
                        Input Type <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="custom-field-type"
                        value={customFieldType}
                        onChange={(e) => setCustomFieldType(e.target.value as FieldInputType)}
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="textarea">Text Area</option>
                        <option value="select">Dropdown (Select)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        id="custom-field-required-property"
                        type="checkbox"
                        checked={customFieldRequired}
                        onChange={(e) => setCustomFieldRequired(e.target.checked)}
                        className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
                      />
                      <label htmlFor="custom-field-required-property" className="text-xs font-medium text-foreground cursor-pointer">
                        Mark as required field
                      </label>
                    </div>

                    {(customFieldType === 'select' || customFieldType === 'multiselect') && (
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Dropdown Options
                        </label>
                        <div className="space-y-2">
                          {customFieldOptions.map((option, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="flex-1 px-2 py-1 bg-white border border-input rounded text-xs">
                                {option}
                              </span>
                              <button
                                onClick={() => handleRemoveCustomOption(option)}
                                className="text-destructive hover:text-destructive/80"
                                aria-label={`Remove ${option}`}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newCustomOption}
                              onChange={(e) => setNewCustomOption(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomOption())}
                              placeholder="Add option"
                              className="flex-1 px-3 py-1.5 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <button
                              onClick={handleAddCustomOption}
                              className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={handleAddCustomField}
                        disabled={!customFieldLabel.trim() || ((customFieldType === 'select' || customFieldType === 'multiselect') && customFieldOptions.length === 0)}
                        className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Create Field
                      </button>
                      <button
                        onClick={() => {
                          setShowCustomFieldForm(false);
                          setCustomFieldLabel('');
                          setCustomFieldType('text');
                          setCustomFieldOptions([]);
                          setNewCustomOption('');
                          setCustomFieldRequired(false);
                        }}
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button 
                onClick={() => router.push('/definitions/property-categories')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                className="px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
              >
                Next: Setup Request Types →
              </button>
            </div>
          </div>

          {/* Right Column: Educational Panel (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Property record fields capture essential information about each property. Customize these fields to match your workflow and data requirements.
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
                    Video Tutorial (2:45)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Property Fields Configuration</p>
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
                      <strong>Tip:</strong> Required fields (marked with *) are always included. You can customize labels and input types for all fields.
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

// Field Configuration Component
function FieldConfiguration({
  field,
  onToggle,
  onToggleRequired,
  onLabelUpdate,
  onInputTypeUpdate,
  onAddDropdownItem,
  onRemoveDropdownItem,
  editingDropdownField,
  setEditingDropdownField,
  newDropdownItem,
  setNewDropdownItem,
  isPredefinedDropdown = false,
  isCustomField = false,
  onRemoveCustomField
}: {
  field: ExtendedPropertyField;
  onToggle: (fieldId: string) => void;
  onToggleRequired: (fieldId: string) => void;
  onLabelUpdate: (fieldId: string, label: string) => void;
  onInputTypeUpdate: (fieldId: string, type: FieldInputType) => void;
  onAddDropdownItem: (fieldId: string) => void;
  onRemoveDropdownItem: (fieldId: string, item: string) => void;
  editingDropdownField: string | null;
  setEditingDropdownField: (fieldId: string | null) => void;
  newDropdownItem: string;
  setNewDropdownItem: (value: string) => void;
  isPredefinedDropdown?: boolean;
  isCustomField?: boolean;
  onRemoveCustomField?: (fieldId: string) => void;
}) {
  const availableInputTypes = getAvailableInputTypes(field.id);
  const showDropdownManagement = (field.inputType === 'select' || field.inputType === 'multiselect') && !isPredefinedDropdown;

  return (
    <div className={`border rounded-lg p-4 hover:shadow-sm transition-shadow ${
      isCustomField ? 'border-blue-300 bg-blue-50/30' : field.systemRequired ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
    }`}>
      {/* Field Header */}
      <div className="flex items-start gap-3 mb-3">
        <label className="flex items-center cursor-pointer mt-1">
          <input
            type="checkbox"
            checked={field.enabled}
            onChange={() => onToggle(field.id)}
            disabled={field.systemRequired}
            className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Enable ${field.label} field`}
          />
        </label>
        
        <div className="flex-1 space-y-2">
          {/* Badges */}
          <div className="flex items-center gap-1 mb-1 flex-wrap">
            {isCustomField && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                Custom Field
              </span>
            )}
            {field.systemRequired && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                System Required
              </span>
            )}
          </div>

          {/* Field Label */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Field Label {field.required && <span className="text-destructive">*</span>}
            </label>
            <input
              type="text"
              value={field.customLabel || field.label}
              onChange={(e) => onLabelUpdate(field.id, e.target.value)}
              disabled={!field.enabled && !field.required && !field.systemRequired}
              className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring disabled:bg-slate-50 disabled:text-slate-500"
              placeholder={field.label}
            />
          </div>

          {/* Required Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`required-${field.id}`}
              checked={field.required || false}
              onChange={() => onToggleRequired(field.id)}
              disabled={field.systemRequired || (!field.enabled && !field.required)}
              className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Mark ${field.label} as required`}
            />
            <label htmlFor={`required-${field.id}`} className="text-xs font-medium text-slate-600 cursor-pointer flex items-center gap-1">
              Required Field
              {field.systemRequired && (
                <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20" aria-label="System required - cannot be changed">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
            </label>
          </div>

          {/* Input Type Selector */}
          {!isPredefinedDropdown ? (
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Input Type
              </label>
              <select
                value={field.inputType}
                onChange={(e) => onInputTypeUpdate(field.id, e.target.value as FieldInputType)}
                disabled={(!field.enabled && !field.required && !field.systemRequired)}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring disabled:bg-slate-50 disabled:text-slate-500"
                aria-label="Field input type"
              >
                {availableInputTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded p-2">
              <p className="text-xs text-amber-900">
                <strong>Dropdown (predefined)</strong> - Options set from Property Categories configured earlier
              </p>
            </div>
          )}

          {/* System Required Info */}
          {field.systemRequired && (
            <div className="bg-amber-50 border border-amber-200 rounded p-2">
              <p className="text-xs text-amber-900">
                <strong>Note:</strong> This field is required by the system and cannot be disabled or made optional. You can only change its label.
              </p>
            </div>
          )}

          {/* Dropdown Items Management */}
          {showDropdownManagement && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-foreground">
                  Dropdown Options
                </label>
                <button
                  onClick={() => setEditingDropdownField(editingDropdownField === field.id ? null : field.id)}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  {editingDropdownField === field.id ? 'Done' : 'Manage Options'}
                </button>
              </div>

              {/* Show current options */}
              {field.dropdownOptions && field.dropdownOptions.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {field.dropdownOptions.slice(0, editingDropdownField === field.id ? undefined : 5).map((option, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-300 text-xs rounded">
                      {option}
                      {editingDropdownField === field.id && (
                        <button
                          onClick={() => onRemoveDropdownItem(field.id, option)}
                          className="hover:text-destructive"
                          aria-label={`Remove ${option}`}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </span>
                  ))}
                  {!editingDropdownField && field.dropdownOptions.length > 5 && (
                    <span className="text-xs text-slate-500">+{field.dropdownOptions.length - 5} more</span>
                  )}
                </div>
              )}

              {/* Add new option */}
              {editingDropdownField === field.id && (
                <div className="flex gap-2 pt-2 border-t border-slate-300">
                  <input
                    type="text"
                    value={newDropdownItem}
                    onChange={(e) => setNewDropdownItem(e.target.value)}
                    placeholder="Add new option..."
                    className="flex-1 px-2 py-1.5 text-xs border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    onKeyPress={(e) => e.key === 'Enter' && onAddDropdownItem(field.id)}
                  />
                  <button
                    onClick={() => onAddDropdownItem(field.id)}
                    disabled={!newDropdownItem.trim()}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-primary hover:bg-primary/90 rounded disabled:opacity-50 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Delete Custom Field Button */}
        {isCustomField && onRemoveCustomField && (
          <button
            onClick={() => onRemoveCustomField(field.id)}
            className="ml-auto text-destructive hover:text-destructive/80 transition-colors p-1"
            title="Remove custom field"
            aria-label="Remove custom field"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
