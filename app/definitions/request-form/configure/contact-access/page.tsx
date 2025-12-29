"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { RequestFormField } from "@/lib/onboarding-context";
import { DraggableField } from "@/components/property-config/DraggableField";
import { FieldSettingsDrawer } from "@/components/property-config/FieldSettingsDrawer";
import { AddFieldModal } from "@/components/property-config/AddFieldModal";
import type { FieldInputType } from "@/components/property-config/AddFieldModal";

export default function ContactAccessInfoPage() {
  const { state, updateDefinitions, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  useEffect(() => {
    updateModuleProgress('definitions', 4, 5);
  }, [updateModuleProgress]);

  // Contact/Access Info field IDs
  const contactAccessFieldIds = [
    'marketing-status',
    'listing-agent',
    'listing-phone',
    'list-price',
    'sale-price',
    'sale-date',
    'contact-type',
    'contact-name',
    'contact-phone',
    'contact-email',
    'contact-phone-2',
    'alternate-contact-type',
    'alternate-contact-name',
    'alternate-contact-phone',
    'alternate-contact-email',
    'alternate-contact-phone-2',
  ];

  const [fields, setFields] = useState<RequestFormField[]>(() => {
    const fieldsWithDefaults = state.definitions.requestFormFields.map((field, index) => ({
      ...field,
      enabled: true,
      order: field.order ?? index,
      systemFixed: field.systemRequired && ['request-type', 'property-address'].includes(field.id)
    }));
    
    // Filter only contact/access fields
    const contactFields = fieldsWithDefaults.filter(f => contactAccessFieldIds.includes(f.id));
    
    // Auto-balance columns
    contactFields.forEach((field, idx) => {
      field.column = (idx % 2) + 1 as 1 | 2;
      field.order = idx;
    });
    
    return fieldsWithDefaults;
  });

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [draggingFieldId, setDraggingFieldId] = useState<string | null>(null);
  const [_dragOverFieldId, setDragOverFieldId] = useState<string | null>(null);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);

  const getContactFieldsByColumn = (column: 1 | 2) => {
    return fields
      .filter(f => contactAccessFieldIds.includes(f.id) && f.column === column)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  const handleFieldClick = (fieldId: string) => {
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    } else {
      setSelectedFieldId(fieldId);
    }
  };

  const handleFieldUpdate = (fieldId: string, updates: Partial<RequestFormField>) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  };

  const handleDragStart = (fieldId: string) => {
    setDraggingFieldId(fieldId);
  };

  const handleDragEnd = () => {
    setDraggingFieldId(null);
    setDragOverFieldId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetFieldId: string, targetColumn: 1 | 2) => {
    if (!draggingFieldId || draggingFieldId === targetFieldId) return;

    const draggingField = fields.find(f => f.id === draggingFieldId);
    const targetField = fields.find(f => f.id === targetFieldId);

    if (!draggingField || !targetField) return;
    if (!contactAccessFieldIds.includes(draggingField.id) || !contactAccessFieldIds.includes(targetField.id)) return;

    setFields(prevFields => {
      const newFields = [...prevFields];
      const categoryFields = newFields
        .filter(f => contactAccessFieldIds.includes(f.id) && f.column === targetColumn)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      const draggingIndex = categoryFields.findIndex(f => f.id === draggingFieldId);
      const targetIndex = categoryFields.findIndex(f => f.id === targetFieldId);

      const fieldToMove = newFields.find(f => f.id === draggingFieldId);
      if (fieldToMove) {
        fieldToMove.column = targetColumn;
        
        if (draggingIndex < targetIndex) {
          categoryFields.forEach((f, idx) => {
            if (idx > draggingIndex && idx <= targetIndex) {
              const field = newFields.find(nf => nf.id === f.id);
              if (field) field.order = (field.order ?? 0) - 1;
            }
          });
          fieldToMove.order = targetIndex;
        } else {
          categoryFields.forEach((f, idx) => {
            if (idx >= targetIndex && idx < draggingIndex) {
              const field = newFields.find(nf => nf.id === f.id);
              if (field) field.order = (field.order ?? 0) + 1;
            }
          });
          fieldToMove.order = targetIndex;
        }

        categoryFields.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        categoryFields.forEach((f, idx) => {
          const field = newFields.find(nf => nf.id === f.id);
          if (field) field.order = idx;
        });
      }

      return newFields;
    });

    setDraggingFieldId(null);
    setDragOverFieldId(null);
  };

  const handleDropOnColumn = (column: 1 | 2) => {
    if (!draggingFieldId) return;
    
    const draggingField = fields.find(f => f.id === draggingFieldId);
    if (!draggingField || !contactAccessFieldIds.includes(draggingField.id)) return;

    setFields(prevFields => {
      const newFields = [...prevFields];
      const fieldToMove = newFields.find(f => f.id === draggingFieldId);
      if (fieldToMove && fieldToMove.column !== column) {
        fieldToMove.column = column;
        const columnFields = newFields
          .filter(f => contactAccessFieldIds.includes(f.id) && f.column === column)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        columnFields.forEach((f, idx) => {
          f.order = idx;
        });
      }
      return newFields;
    });

    setDraggingFieldId(null);
  };

  const handleAddField = (fieldData: { inputType: FieldInputType; label: string; dropdownOptions?: string[]; }) => {
    const newField: RequestFormField = {
      id: `custom-contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: fieldData.label,
      customLabel: fieldData.label,
      category: 'details',
      type: fieldData.inputType as RequestFormField['type'],
      enabled: true,
      required: false,
      systemRequired: false,
      systemFixed: false,
      order: fields.filter(f => contactAccessFieldIds.includes(f.id)).length,
      column: 1,
      placeholder: '',
      options: fieldData.dropdownOptions
    };

    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
    setIsAddFieldModalOpen(false);
  };

  const handleDeleteField = (fieldId: string) => {
    if (fieldId.startsWith('custom-')) {
      setFields(fields.filter(f => f.id !== fieldId));
      if (selectedFieldId === fieldId) {
        setSelectedFieldId(null);
      }
    }
  };

  const handleBack = () => {
    updateDefinitions({ requestFormFields: fields });
    router.push('/definitions/request-form/configure/overview');
  };

  const handleContinue = () => {
    updateDefinitions({ requestFormFields: fields });
    router.push('/definitions/request-form/configure/advanced');
  };

  const handleExitEditMode = () => {
    updateDefinitions({ 
      requestFormFields: fields,
      requestFieldsConfigured: true 
    });
    router.push('/definitions/request-form/preview');
  };

  // ESC key handler to exit edit mode
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleExitEditMode();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedField = fields.find(f => f.id === selectedFieldId) || null;

  const steps = [
    { id: '1', label: 'Property Categories', status: 'completed' as const },
    { id: '2', label: 'Property Fields', status: 'completed' as const },
    { id: '3', label: 'Request Types', status: 'completed' as const },
    { id: '4', label: 'Request Form', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={1} 
      steps={steps}
      title="Definitions"
      breadcrumbs={[
        { label: "Home", href: "/hub", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>) },
        { label: "Definitions", href: "/definitions-intro" },
        { label: "Request Form", href: "/definitions/request-types-setup" },
        { label: "Contact & Access Info" },
      ]}
      footerNav={{
        previousLabel: "Back to Overview",
        onPrevious: handleBack,
        nextLabel: "Continue to Additional Details",
        onNext: handleContinue,
      }}
    >
      {/* Exit Edit Mode Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="font-medium text-blue-900">Edit Mode Active</span>
              <span className="text-blue-700">- Drag, drop, and configure fields</span>
            </div>
            <button
              onClick={handleExitEditMode}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Exit Edit Mode (ESC)
            </button>
          </div>
        </div>
      </div>

      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('[data-field-card]') === null &&
              (e.target as HTMLElement).closest('[data-settings-drawer]') === null) {
            setSelectedFieldId(null);
          }
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Edit Request Form - Contact & Access Info
          </h1>
          <p className="text-base text-muted-foreground">
            Configure property listing and contact information fields
          </p>
        </div>

        <div>
          {/* Main Content */}
          <div>
            {/* Contact & Access Info Section */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">
                    Contact & Access Info
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Property listing details and primary/alternate contacts
                  </p>
                </div>
                <button
                  onClick={() => setIsAddFieldModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Field
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 min-h-[400px]" onDragOver={handleDragOver} onDrop={() => handleDropOnColumn(1)}>
                  {getContactFieldsByColumn(1).map((field) => (
                    <DraggableField
                      key={field.id}
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onClick={() => handleFieldClick(field.id)}
                      onDelete={() => handleDeleteField(field.id)}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDrop={() => handleDrop(field.id, 1)}
                    />
                  ))}
                </div>

                <div className="p-6 min-h-[400px]" onDragOver={handleDragOver} onDrop={() => handleDropOnColumn(2)}>
                  {getContactFieldsByColumn(2).map((field) => (
                    <DraggableField
                      key={field.id}
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onClick={() => handleFieldClick(field.id)}
                      onDelete={() => handleDeleteField(field.id)}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDrop={() => handleDrop(field.id, 2)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Field Settings Drawer */}
      {selectedField && (
        <FieldSettingsDrawer
          field={selectedField}
          onUpdate={(updates) => handleFieldUpdate(selectedField.id, updates)}
          onClose={() => setSelectedFieldId(null)}
          onDelete={handleDeleteField}
        />
      )}

      {/* Add Field Modal */}
      {isAddFieldModalOpen && (
        <AddFieldModal
          onAdd={handleAddField}
          onClose={() => setIsAddFieldModalOpen(false)}
        />
      )}
    </MainLayout>
  );
}
