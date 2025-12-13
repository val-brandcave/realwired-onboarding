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

export default function RequestFormOverviewPage() {
  const { state, updateDefinitions, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  useEffect(() => {
    updateModuleProgress('definitions', 4, 5);
  }, [updateModuleProgress]);

  const [fields, setFields] = useState<RequestFormField[]>(() => {
    const fieldsWithDefaults = state.definitions.requestFormFields.map((field, index) => ({
      ...field,
      enabled: true,
      order: field.order ?? index,
      systemFixed: field.systemRequired && ['request-type', 'property-address'].includes(field.id)
    }));
    
    const overviewFields = fieldsWithDefaults.filter(f => f.category === 'overview');
    const detailsFields = fieldsWithDefaults.filter(f => f.category === 'details');
    
    overviewFields.forEach((field, idx) => {
      field.column = (idx % 2) + 1 as 1 | 2;
      field.order = idx;
    });
    
    detailsFields.forEach((field, idx) => {
      field.column = (idx % 2) + 1 as 1 | 2;
      field.order = idx;
    });
    
    return fieldsWithDefaults;
  });

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [draggingFieldId, setDraggingFieldId] = useState<string | null>(null);
  const [_dragOverFieldId, setDragOverFieldId] = useState<string | null>(null);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);

  const getFieldsByColumn = (column: 1 | 2) => {
    return fields
      .filter(f => f.category === 'overview' && f.column === column)
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

    if (!draggingField || !targetField || draggingField.category !== 'overview' || targetField.category !== 'overview') return;

    setFields(prevFields => {
      const newFields = [...prevFields];
      const categoryFields = newFields.filter(f => f.category === 'overview' && f.column === targetColumn).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      const draggingIndex = categoryFields.findIndex(f => f.id === draggingFieldId);
      const targetIndex = categoryFields.findIndex(f => f.id === targetFieldId);

      const fieldToMove = newFields.find(f => f.id === draggingFieldId);
      if (fieldToMove) {
        fieldToMove.column = targetColumn;
      }

      if (draggingIndex === -1) {
        categoryFields.splice(targetIndex, 0, fieldToMove!);
      } else {
        const [removed] = categoryFields.splice(draggingIndex, 1);
        categoryFields.splice(targetIndex, 0, removed);
      }

      categoryFields.forEach((field, idx) => {
        field.order = idx;
      });

      return newFields;
    });

    setDraggingFieldId(null);
    setDragOverFieldId(null);
  };

  const handleDropOnColumn = (column: 1 | 2) => {
    if (!draggingFieldId) return;
    const draggingField = fields.find(f => f.id === draggingFieldId);
    if (!draggingField || draggingField.category !== 'overview') return;

    setFields(prevFields =>
      prevFields.map(field =>
        field.id === draggingFieldId ? { ...field, column, order: 9999 } : field
      )
    );

    setDraggingFieldId(null);
  };

  const handleAddField = (fieldData: { inputType: FieldInputType; label: string; dropdownOptions?: string[]; }) => {
    const newField: RequestFormField = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: fieldData.label,
      customLabel: fieldData.label,
      category: 'overview',
      type: fieldData.inputType as RequestFormField['type'],
      enabled: true,
      required: false,
      systemRequired: false,
      systemFixed: false,
      order: fields.filter(f => f.category === 'overview').length,
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

  const handleContinue = () => {
    updateDefinitions({ requestFormFields: fields });
    router.push('/definitions/request-form/configure/advanced');
  };

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
        { label: "Overview" },
      ]}
      footerNav={{
        previousLabel: "Back to Request Types",
        onPrevious: () => router.push('/definitions/request-types-setup'),
        nextLabel: "Continue to Advanced Details",
        onNext: handleContinue,
      }}
    >
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
            Configure Request Form - Overview
          </h1>
          <p className="text-base text-muted-foreground">
            Configure request context and property information fields
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview Section */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">
                    Overview
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Request context and property information
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
                  {getFieldsByColumn(1).map((field) => (
                    <DraggableField
                      key={field.id}
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onClick={() => handleFieldClick(field.id)}
                      onDelete={() => handleDeleteField(field.id)}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(targetId) => handleDrop(targetId, 1)}
                      isDragging={draggingFieldId === field.id}
                    />
                  ))}
                  {getFieldsByColumn(1).length === 0 && (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                      <p className="text-sm text-muted-foreground">Drag fields here</p>
                    </div>
                  )}
                </div>

                <div className="p-6 min-h-[400px]" onDragOver={handleDragOver} onDrop={() => handleDropOnColumn(2)}>
                  {getFieldsByColumn(2).map((field) => (
                    <DraggableField
                      key={field.id}
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onClick={() => handleFieldClick(field.id)}
                      onDelete={() => handleDeleteField(field.id)}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(targetId) => handleDrop(targetId, 2)}
                      isDragging={draggingFieldId === field.id}
                    />
                  ))}
                  {getFieldsByColumn(2).length === 0 && (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                      <p className="text-sm text-muted-foreground">Drag fields here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Education Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              {/* Why We Need This */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Overview fields capture essential request context - the key information field officers need to initiate appraisal and environmental orders. These fields ensure consistent data collection across all requests.
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
                    Video Tutorial (4:15)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Request Form Overview">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Request Form Overview</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2">Details</h4>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <svg className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Request type and property address
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Loan amount, type, and due date
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Borrower and contact information
                    </li>
                  </ul>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div className="text-xs text-blue-900">
                      <p className="font-semibold mb-1">Tip</p>
                      <p>Keep overview fields simple and focused on request essentials. Save detailed loan specs for Advanced Details in the next step.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FieldSettingsDrawer
        field={selectedField}
        onClose={() => setSelectedFieldId(null)}
        onUpdate={handleFieldUpdate}
        onDelete={handleDeleteField}
      />

      <AddFieldModal
        isOpen={isAddFieldModalOpen}
        onClose={() => setIsAddFieldModalOpen(false)}
        onAdd={handleAddField}
      />
    </MainLayout>
  );
}

