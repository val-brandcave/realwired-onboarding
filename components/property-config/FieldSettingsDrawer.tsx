import React, { useState } from 'react';
import type { PropertyRecordField, RequestFormField } from '@/lib/onboarding-context';

type FieldInputType = 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'date' | 'file' | 'readonly' | 'link' | 'email' | 'tel' | 'checkbox';

// Generic field type that works for both property and request fields
type GenericField = PropertyRecordField | RequestFormField;

interface FieldSettingsDrawerProps {
  field: GenericField | null;
  onClose: () => void;
  onUpdate: (fieldId: string, updates: Partial<GenericField>) => void;
  onDelete?: (fieldId: string) => void;
}

export function FieldSettingsDrawer({ field, onClose, onUpdate, onDelete }: FieldSettingsDrawerProps) {
  const [newOption, setNewOption] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!field) {
    return null;
  }

  const displayLabel = field.customLabel || field.label;

  const handleLabelChange = (value: string) => {
    onUpdate(field.id, { customLabel: value });
  };

  const handleInputTypeChange = (value: FieldInputType) => {
    const updates: Partial<GenericField> = { type: value as any };
    
    // Initialize options array for select/multiselect/checkbox if not present
    if ((value === 'select' || value === 'multiselect' || value === 'checkbox') && !field.options) {
      updates.options = [];
    }
    
    onUpdate(field.id, updates);
  };

  const handleRequiredToggle = () => {
    if (!field.systemRequired) {
      onUpdate(field.id, { required: !field.required });
    }
  };

  const handleVisibleToggle = () => {
    if (!field.systemRequired) {
      onUpdate(field.id, { enabled: !field.enabled });
    }
  };

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    
    const currentOptions = field.options || [];
    if (!currentOptions.includes(newOption.trim())) {
      onUpdate(field.id, { options: [...currentOptions, newOption.trim()] });
      setNewOption('');
    }
  };

  const handleRemoveOption = (option: string) => {
    const currentOptions = field.options || [];
    onUpdate(field.id, { options: currentOptions.filter(o => o !== option) });
  };

  const getAvailableInputTypes = (): { value: FieldInputType; label: string }[] => {
    // System fixed fields have limited type options
    if (field.systemFixed) {
      // Address fields
      if (['street-address', 'apt-unit', 'city', 'county', 'zip-code'].includes(field.id)) {
        return [
          { value: 'text', label: 'Text Input' },
          { value: 'textarea', label: 'Multi-line Text' }
        ];
      }
      // State field
      if (field.id === 'state') {
        return [
          { value: 'select', label: 'Dropdown' },
          { value: 'text', label: 'Text Input' }
        ];
      }
      // Category/Type fields
      if (field.id === 'property-category' || field.id === 'property-type') {
        return [
          { value: 'select', label: 'Dropdown' }
        ];
      }
    }
    
    // All options for custom fields
    return [
      { value: 'text', label: 'Text Input' },
      { value: 'textarea', label: 'Multi-line Text' },
      { value: 'number', label: 'Number' },
      { value: 'email', label: 'Email' },
      { value: 'tel', label: 'Phone Number' },
      { value: 'select', label: 'Dropdown (Single Select)' },
      { value: 'multiselect', label: 'Dropdown (Multi Select)' },
      { value: 'checkbox', label: 'Checkboxes (Multi Select)' },
      { value: 'date', label: 'Date Picker' },
      { value: 'file', label: 'File Upload' },
      { value: 'readonly', label: 'Read-only Text' },
      { value: 'link', label: 'Clickable Link' }
    ];
  };

  const availableTypes = getAvailableInputTypes();
  const showOptionsManager = field.type === 'select' || field.type === 'multiselect' || field.type === 'checkbox';

  return (
    <div data-settings-drawer className="fixed right-0 top-[4rem] bottom-0 w-96 bg-white border-l border-border shadow-2xl overflow-y-auto z-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-foreground">Field Settings</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-accent rounded transition-colors"
          aria-label="Close settings"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Field ID Badge */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-mono rounded">
            ID: {field.id}
          </span>
          {field.systemFixed && (
            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              System Field
            </span>
          )}
        </div>

        {/* General Section */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            General
          </h3>
          
          {/* Field Label */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">
              Field Label
            </label>
            <input
              type="text"
              value={displayLabel}
              onChange={(e) => handleLabelChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter field label"
            />
            <p className="text-xs text-muted-foreground">
              The label shown to users in the form
            </p>
          </div>
        </div>

        {/* Input Type */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Input Type
          </label>
          <select
            value={field.type}
            onChange={(e) => handleInputTypeChange(e.target.value as FieldInputType)}
            disabled={availableTypes.length === 1}
            className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring disabled:bg-muted disabled:cursor-not-allowed"
          >
            {availableTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {availableTypes.length === 1 && (
            <p className="text-xs text-amber-700 mt-1">
              This field type is fixed by the system
            </p>
          )}
        </div>

        {/* Options Manager for Select/Multiselect */}
        {showOptionsManager && (
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">
              {field.type === 'checkbox' ? 'Checkbox Options' : 'Dropdown Options'}
            </label>
            <div className="space-y-2">
              {/* Existing Options */}
              {field.options && field.options.length > 0 ? (
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {field.options.map((option, idx) => (
                    <div key={idx} className="flex items-center gap-2 group">
                      <div className="flex-1 px-3 py-2 bg-muted border border-border rounded text-sm">
                        {option}
                      </div>
                      <button
                        onClick={() => handleRemoveOption(option)}
                        className="p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Remove ${option}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic py-2">
                  No options added yet
                </p>
              )}

              {/* Add New Option */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                  placeholder="Add new option..."
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={handleAddOption}
                  disabled={!newOption.trim()}
                  className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rules Section */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Rules
          </h3>

          {/* Required Checkbox */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={field.required || field.systemRequired || false}
                onChange={handleRequiredToggle}
                disabled={field.systemRequired}
                className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground flex items-center gap-2">
                  Required
                  {field.systemRequired && (
                    <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  User must fill this field before submitting
                </p>
              </div>
            </label>

            {/* Visible Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={field.enabled}
                onChange={handleVisibleToggle}
                disabled={field.systemRequired}
                className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground flex items-center gap-2">
                  Visible to Field Officer
                  {field.systemRequired && (
                    <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Show this field to field officers in the property form
                </p>
              </div>
            </label>
          </div>

          {/* System Required Notice */}
          {field.systemRequired && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex gap-2">
                <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-amber-900">
                  This is a system-required field. It must be visible and required at all times.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Description Section */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Description
          </h3>
          <p className="text-xs text-muted-foreground">
            {field.placeholder || 'No description available'}
          </p>
        </div>

        {/* Delete Field Section (for custom fields only) */}
        {field.id.startsWith('custom-') && onDelete && (
          <div className="pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Danger Zone
            </h3>
            
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full px-4 py-2 text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 border border-destructive/30 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Field
              </button>
            ) : (
              <div className="space-y-2">
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-destructive font-medium mb-1">
                    Are you sure?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This action cannot be undone. The field will be permanently deleted.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onDelete(field.id);
                      setShowDeleteConfirm(false);
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-destructive hover:bg-destructive/90 rounded-lg transition-colors"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

