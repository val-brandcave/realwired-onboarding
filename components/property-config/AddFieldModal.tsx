"use client";

import { useState } from 'react';

export type FieldInputType = 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'date' | 'email' | 'tel' | 'file' | 'readonly' | 'link' | 'checkbox';

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (fieldData: {
    inputType: FieldInputType;
    label: string;
    dropdownOptions?: string[];
  }) => void;
}

export function AddFieldModal({ isOpen, onClose, onAdd }: AddFieldModalProps) {
  const [inputType, setInputType] = useState<FieldInputType>('text');
  const [label, setLabel] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState<string[]>(['']);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fieldData: {
      inputType: FieldInputType;
      label: string;
      dropdownOptions?: string[];
    } = {
      inputType,
      label: label.trim() || 'New Field',
    };

    // Add dropdown options if it's a select/multiselect/checkbox field
    if ((inputType === 'select' || inputType === 'multiselect' || inputType === 'checkbox') && dropdownOptions.length > 0) {
      fieldData.dropdownOptions = dropdownOptions.filter(opt => opt.trim() !== '');
    }

    onAdd(fieldData);
    
    // Reset form
    setInputType('text');
    setLabel('');
    setDropdownOptions(['']);
  };

  const handleClose = () => {
    // Reset form
    setInputType('text');
    setLabel('');
    setDropdownOptions(['']);
    onClose();
  };

  const addOption = () => {
    setDropdownOptions([...dropdownOptions, '']);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...dropdownOptions];
    newOptions[index] = value;
    setDropdownOptions(newOptions);
  };

  const removeOption = (index: number) => {
    if (dropdownOptions.length > 1) {
      setDropdownOptions(dropdownOptions.filter((_, i) => i !== index));
    }
  };

  const fieldTypes = [
    { value: 'text', label: 'Text Field', icon: '📝' },
    { value: 'textarea', label: 'Multi-line Text', icon: '📄' },
    { value: 'number', label: 'Number', icon: '#' },
    { value: 'select', label: 'Dropdown (Single)', icon: '▼' },
    { value: 'multiselect', label: 'Dropdown (Multi)', icon: '☰' },
    { value: 'checkbox', label: 'Checkboxes (Multi)', icon: '☑️' },
    { value: 'date', label: 'Date Picker', icon: '📅' },
    { value: 'email', label: 'Email', icon: '✉️' },
    { value: 'tel', label: 'Phone', icon: '📞' },
    { value: 'file', label: 'File Upload', icon: '📎' },
    { value: 'readonly', label: 'Read-only Text', icon: '🔒' },
    { value: 'link', label: 'Clickable Link', icon: '🔗' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="border-b border-slate-200 p-6 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-slate-900">Add New Field</h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Field Label */}
          <div>
            <label htmlFor="field-label" className="block text-sm font-semibold text-slate-700 mb-2">
              Field Label <span className="text-red-600">*</span>
            </label>
            <input
              id="field-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Property Size, Owner Name"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
              autoFocus
            />
          </div>

          {/* Field Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Field Type <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {fieldTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setInputType(type.value as FieldInputType)}
                  className={`p-3 text-left border-2 rounded-lg transition-all ${
                    inputType === type.value
                      ? 'border-[#9F2E2B] bg-[#9F2E2B]/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{type.icon}</span>
                    <span className="text-sm font-medium text-slate-900">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dropdown/Checkbox Options (only for select/multiselect/checkbox) */}
          {(inputType === 'select' || inputType === 'multiselect' || inputType === 'checkbox') && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {inputType === 'checkbox' ? 'Checkbox Options' : 'Dropdown Options'} <span className="text-red-600">*</span>
              </label>
              <div className="space-y-2">
                {dropdownOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
                    />
                    {dropdownOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove option"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addOption}
                className="mt-3 text-sm font-medium text-[#9F2E2B] hover:text-[#7D2522] flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Option
              </button>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg"
            >
              Add Field
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

