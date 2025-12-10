import React from 'react';
import type { PropertyRecordField, RequestFormField } from '@/lib/onboarding-context';

// Generic field type that works for both property and request fields
type GenericField = PropertyRecordField | RequestFormField;

interface FieldPreviewProps {
  field: GenericField;
  isSelected: boolean;
  onClick: () => void;
  onDelete?: () => void;
  isDragging?: boolean;
  dragHandleProps?: any;
}

export function FieldPreview({ field, isSelected, onClick, onDelete, isDragging, dragHandleProps }: FieldPreviewProps) {
  const displayLabel = field.customLabel || field.label;
  const isRequired = field.required || field.systemRequired;
  
  // Render different field types as they would appear in the final form
  const renderFieldInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={field.placeholder || `Enter ${displayLabel.toLowerCase()}`}
            className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background pointer-events-none"
            disabled
          />
        );
      
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder || `Enter ${displayLabel.toLowerCase()}`}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background resize-none pointer-events-none"
            disabled
          />
        );
      
      case 'number':
        return (
          <div className="relative">
            <input
              type="number"
              placeholder={field.placeholder || '0'}
              className="w-full px-3 py-2 pl-10 text-sm border border-input rounded-md bg-background pointer-events-none"
              disabled
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </div>
        );
      
      case 'select':
        return (
          <div className="relative">
            <select
              className="w-full px-3 py-2 pr-10 text-sm border border-input rounded-md bg-background pointer-events-none appearance-none"
              disabled
            >
              <option>Select {displayLabel.toLowerCase()}</option>
              {field.options?.slice(0, 3).map((opt, idx) => (
                <option key={idx}>{opt}</option>
              ))}
              {field.options && field.options.length > 3 && (
                <option>... and {field.options.length - 3} more</option>
              )}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        );
      
      case 'multiselect':
        return (
          <div className="relative">
            <select
              multiple
              className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background pointer-events-none"
              disabled
              size={3}
            >
              {field.options?.slice(0, 3).map((opt, idx) => (
                <option key={idx}>{opt}</option>
              ))}
            </select>
            <div className="absolute right-3 top-3 text-muted-foreground pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.slice(0, 4).map((option, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`${field.id}-${idx}`}
                  className="w-4 h-4 rounded border-input text-primary focus:ring-primary pointer-events-none"
                  disabled
                />
                <label htmlFor={`${field.id}-${idx}`} className="text-sm text-foreground">
                  {option}
                </label>
              </div>
            ))}
            {field.options && field.options.length > 4 && (
              <div className="text-xs text-muted-foreground ml-6">
                ... and {field.options.length - 4} more options
              </div>
            )}
            {(!field.options || field.options.length === 0) && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-input pointer-events-none"
                  disabled
                />
                <span className="text-sm italic">No options configured</span>
              </div>
            )}
          </div>
        );
      
      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              className="w-full px-3 py-2 pr-10 text-sm border border-input rounded-md bg-background pointer-events-none"
              disabled
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      
      case 'email':
        return (
          <div className="relative">
            <input
              type="email"
              placeholder={'placeholder' in field ? field.placeholder : 'email@example.com'}
              className="w-full px-3 py-2 pl-10 text-sm border border-input rounded-md bg-background pointer-events-none"
              disabled
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        );
      
      case 'tel':
        return (
          <div className="relative">
            <input
              type="tel"
              placeholder={'placeholder' in field ? field.placeholder : '(555) 123-4567'}
              className="w-full px-3 py-2 pl-10 text-sm border border-input rounded-md bg-background pointer-events-none"
              disabled
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        );
      
      case 'file':
        return (
          <div className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-muted-foreground">Choose file</span>
          </div>
        );
      
      case 'readonly':
        return (
          <div className="w-full px-3 py-2 text-sm border border-input rounded-md bg-muted/30 flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-muted-foreground italic">Auto-generated</span>
          </div>
        );
      
      case 'link':
        return (
          <div className="w-full px-3 py-2 text-sm border border-input rounded-md bg-muted/30 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="text-primary underline">View Link</span>
          </div>
        );
      
      default:
        return (
          <input
            type="text"
            placeholder={field.placeholder}
            className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background pointer-events-none"
            disabled
          />
        );
    }
  };

  return (
    <div
      data-field-card
      onClick={onClick}
      className={`
        group relative p-2 border-2 transition-all cursor-pointer
        ${isSelected 
          ? 'border-transparent border-l-[#9b2c2c] border-l-[3px] bg-[#9b2c2c]/5 shadow-sm' 
          : 'border-transparent bg-card hover:shadow-sm'
        }
        ${isDragging ? 'opacity-50 rotate-2' : ''}
      `}
      style={{ borderRadius: 0 }}
    >
      {/* Drag Handle - Always present for alignment */}
      <div
        {...(!field.systemFixed ? dragHandleProps : {})}
        className={`absolute left-1 top-1/2 -translate-y-1/2 transition-opacity ${
          field.systemFixed 
            ? 'opacity-0 pointer-events-none' 
            : 'cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100'
        }`}
      >
        <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="8" cy="5" r="1.5"/>
          <circle cx="8" cy="12" r="1.5"/>
          <circle cx="8" cy="19" r="1.5"/>
          <circle cx="16" cy="5" r="1.5"/>
          <circle cx="16" cy="12" r="1.5"/>
          <circle cx="16" cy="19" r="1.5"/>
        </svg>
      </div>

      {/* Field Content */}
      <div className="ml-5">
        <label className="block text-sm font-medium text-foreground mb-1">
          {displayLabel}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </label>
        {renderFieldInput()}
      </div>

      {/* Top Right Icons and Badges */}
      <div className="absolute right-2 top-2 flex items-center gap-1">
        {/* Hidden Badge */}
        {!field.enabled && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
            Hidden
          </span>
        )}
        
        {/* System Fixed Lock Icon */}
        {field.systemFixed && (
          <div className="p-1">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {/* Delete Icon (shows when selected, only for custom fields) */}
        {isSelected && !field.systemFixed && field.id.startsWith('custom-') && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-destructive/10 rounded transition-colors"
            title="Delete field"
          >
            <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

