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

export default function RequestFormConfigurePage() {
  const { state, updateDefinitions, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('definitions', 4, 5); // Step 4 of 5
  }, [updateModuleProgress]);

  // Initialize fields with order and column assignment
  const [fields, setFields] = useState<RequestFormField[]>(() => {
    return state.definitions.requestFormFields.map((field, index) => ({
      ...field,
      order: field.order ?? index,
      column: field.column ?? ((index % 2) + 1 as 1 | 2),
      systemFixed: field.systemRequired && ['request-type', 'property-address'].includes(field.id)
    }));
  });

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [draggingFieldId, setDraggingFieldId] = useState<string | null>(null);
  const [dragOverFieldId, setDragOverFieldId] = useState<string | null>(null);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [addFieldCategory, setAddFieldCategory] = useState<'overview' | 'details'>('overview');

  // Get fields by category and column
  const getFieldsBySection = (category: 'overview' | 'details', column: 1 | 2) => {
    return fields
      .filter(f => f.category === category && f.column === column)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  const handleFieldClick = (fieldId: string) => {
    // Toggle: if clicking the same field, close drawer
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    } else {
      setSelectedFieldId(fieldId);
    }
  };

  const handleCloseDrawer = () => {
    setSelectedFieldId(null);
  };

  const handleFieldUpdate = (fieldId: string, updates: any) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  };

  // Drag and drop handlers
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

  const handleDrop = (targetFieldId: string, targetColumn: 1 | 2, targetCategory: 'overview' | 'details') => {
    if (!draggingFieldId || draggingFieldId === targetFieldId) return;

    const draggingField = fields.find(f => f.id === draggingFieldId);
    const targetField = fields.find(f => f.id === targetFieldId);

    if (!draggingField || !targetField) return;

    // Cannot drag between sections
    if (draggingField.category !== targetCategory) return;

    setFields(prevFields => {
      const newFields = [...prevFields];
      
      // Get all fields in the target column and category
      const categoryFields = newFields.filter(f => 
        f.category === targetCategory && f.column === targetColumn
      ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      const draggingIndex = categoryFields.findIndex(f => f.id === draggingFieldId);
      const targetIndex = categoryFields.findIndex(f => f.id === targetFieldId);

      // Update the dragging field's column
      const fieldToMove = newFields.find(f => f.id === draggingFieldId);
      if (fieldToMove) {
        fieldToMove.column = targetColumn;
      }

      if (draggingIndex === -1) {
        // Moving from different column - insert at target position
        categoryFields.splice(targetIndex, 0, fieldToMove!);
      } else {
        // Reordering within same column - remove and insert at new position
        const [removed] = categoryFields.splice(draggingIndex, 1);
        categoryFields.splice(targetIndex, 0, removed);
      }

      // Update orders for all fields in this column/category
      categoryFields.forEach((field, idx) => {
        field.order = idx;
      });

      return newFields;
    });

    setDraggingFieldId(null);
    setDragOverFieldId(null);
  };

  const handleDropOnColumn = (column: 1 | 2, category: 'overview' | 'details') => {
    if (!draggingFieldId) return;

    const draggingField = fields.find(f => f.id === draggingFieldId);
    if (!draggingField || draggingField.category !== category) return;

    setFields(prevFields =>
      prevFields.map(field =>
        field.id === draggingFieldId
          ? { ...field, column, order: 9999 } // Move to end
          : field
      )
    );

    setDraggingFieldId(null);
  };

  const handleOpenAddFieldModal = (category: 'overview' | 'details') => {
    setAddFieldCategory(category);
    setIsAddFieldModalOpen(true);
  };

  const handleAddField = (fieldData: {
    inputType: FieldInputType;
    label: string;
    dropdownOptions?: string[];
  }) => {
    const newField: RequestFormField = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: fieldData.label,
      customLabel: fieldData.label,
      category: addFieldCategory,
      type: fieldData.inputType as RequestFormField['type'],
      enabled: true,
      required: false,
      systemRequired: false,
      systemFixed: false,
      readonly: false,
      order: fields.filter(f => f.category === addFieldCategory).length,
      column: 1,
      placeholder: '',
      dropdownOptions: fieldData.dropdownOptions
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
    router.push('/definitions/bid-panels');
  };

  const selectedField = fields.find(f => f.id === selectedFieldId) || null;
  const enabledCount = fields.filter(f => f.enabled).length;

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
    >
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        onClick={(e) => {
          // Close drawer if clicking outside field cards
          if ((e.target as HTMLElement).closest('[data-field-card]') === null &&
              (e.target as HTMLElement).closest('[data-settings-drawer]') === null) {
            setSelectedFieldId(null);
          }
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Configure Request Form Fields
          </h1>
          <p className="text-base text-muted-foreground">
            Click on a field to configure it. Drag fields to reorder them within columns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selection Summary */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-foreground">
                    {enabledCount} of {fields.length} fields visible to Field Officer
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  * = Required field
                </span>
              </div>
            </div>

            {/* Overview Section */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Section Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Overview
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Request context and property information
                  </p>
                </div>
                <button
                  onClick={() => handleOpenAddFieldModal('overview')}
                  className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Field
                </button>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-6">
                {/* Column 1 */}
                <div
                  className="p-6 min-h-[200px]"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnColumn(1, 'overview')}
                >
                  {getFieldsBySection('overview', 1).map((field) => (
                    <DraggableField
                      key={field.id}
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onClick={() => handleFieldClick(field.id)}
                      onDelete={() => handleDeleteField(field.id)}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(targetId) => handleDrop(targetId, 1, 'overview')}
                      isDragging={draggingFieldId === field.id}
                    />
                  ))}
                  {getFieldsBySection('overview', 1).length === 0 && (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                      <p className="text-sm text-muted-foreground">Drag fields here</p>
                    </div>
                  )}
                </div>

                {/* Column 2 */}
                <div
                  className="p-6 min-h-[200px]"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnColumn(2, 'overview')}
                >
                  {getFieldsBySection('overview', 2).map((field) => (
                    <DraggableField
                      key={field.id}
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onClick={() => handleFieldClick(field.id)}
                      onDelete={() => handleDeleteField(field.id)}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(targetId) => handleDrop(targetId, 2, 'overview')}
                      isDragging={draggingFieldId === field.id}
                    />
                  ))}
                  {getFieldsBySection('overview', 2).length === 0 && (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                      <p className="text-sm text-muted-foreground">Drag fields here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Request Details Section */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Section Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Request Details
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Loan and request-specific information
                  </p>
                </div>
                <button
                  onClick={() => handleOpenAddFieldModal('details')}
                  className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Field
                </button>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-6">
                {/* Column 1 */}
                <div
                  className="p-6 min-h-[400px]"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnColumn(1, 'details')}
                >
                  {getFieldsBySection('details', 1).map((field) => (
                    <DraggableField
                      key={field.id}
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onClick={() => handleFieldClick(field.id)}
                      onDelete={() => handleDeleteField(field.id)}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(targetId) => handleDrop(targetId, 1, 'details')}
                      isDragging={draggingFieldId === field.id}
                    />
                  ))}
                  {getFieldsBySection('details', 1).length === 0 && (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                      <p className="text-sm text-muted-foreground">Drag fields here</p>
                    </div>
                  )}
                </div>

                {/* Column 2 */}
                <div
                  className="p-6 min-h-[400px]"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnColumn(2, 'details')}
                >
                  {getFieldsBySection('details', 2).map((field) => (
                    <DraggableField
                      key={field.id}
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onClick={() => handleFieldClick(field.id)}
                      onDelete={() => handleDeleteField(field.id)}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(targetId) => handleDrop(targetId, 2, 'details')}
                      isDragging={draggingFieldId === field.id}
                    />
                  ))}
                  {getFieldsBySection('details', 2).length === 0 && (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                      <p className="text-sm text-muted-foreground">Drag fields here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button 
                onClick={() => router.push('/definitions/request-types-setup')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                className="px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
              >
                Next: Bid Panel Configuration →
              </button>
            </div>
          </div>

          {/* Right Column: Educational Panel (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Request form fields capture essential information about each appraisal request. Customize these fields to match your loan workflow and requirements.
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
                    Video Tutorial (2:30)
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
                      <p className="text-white text-xs font-medium">Request Form Configuration</p>
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
                      <strong>Tip:</strong> Overview fields show request context. Details fields collect loan and appraisal information from field officers.
                    </p>
                  </div>
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
          onClose={handleCloseDrawer}
          onUpdate={handleFieldUpdate}
          onDelete={handleDeleteField}
        />
      )}

      {/* Add Field Modal */}
      <AddFieldModal
        isOpen={isAddFieldModalOpen}
        onClose={() => setIsAddFieldModalOpen(false)}
        onAdd={handleAddField}
      />
    </MainLayout>
  );
}

