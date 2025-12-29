"use client";

import { useState } from "react";
import type { PropertyRecordField } from "@/lib/onboarding-context";
import { DraggableField } from "@/components/property-config/DraggableField";
import { FieldSettingsDrawer } from "@/components/property-config/FieldSettingsDrawer";
import { AddFieldModal } from "@/components/property-config/AddFieldModal";
import type { FieldInputType } from "@/components/property-config/AddFieldModal";

interface PropertyAdvancedSectionProps {
  fields: PropertyRecordField[];
  onFieldsChange: (fields: PropertyRecordField[]) => void;
}

export function PropertyAdvancedSection({ fields, onFieldsChange }: PropertyAdvancedSectionProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [draggingFieldId, setDraggingFieldId] = useState<string | null>(null);
  const [dragOverFieldId, setDragOverFieldId] = useState<string | null>(null);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);

  const getFieldsByColumn = (column: 1 | 2) => {
    return fields
      .filter(f => f.category === 'advanced' && f.column === column)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  const handleFieldClick = (fieldId: string) => {
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    } else {
      setSelectedFieldId(fieldId);
    }
  };

  const handleFieldUpdate = (fieldId: string, updates: Partial<PropertyRecordField>) => {
    onFieldsChange(
      fields.map(field =>
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

    if (!draggingField || !targetField || draggingField.category !== 'advanced' || targetField.category !== 'advanced') return;

    const newFields = [...fields];
    const categoryFields = newFields.filter(f => f.category === 'advanced' && f.column === targetColumn).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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

    onFieldsChange(newFields);
    setDraggingFieldId(null);
    setDragOverFieldId(null);
  };

  const handleDropOnColumn = (column: 1 | 2) => {
    if (!draggingFieldId) return;
    const draggingField = fields.find(f => f.id === draggingFieldId);
    if (!draggingField || draggingField.category !== 'advanced') return;

    onFieldsChange(
      fields.map(field =>
        field.id === draggingFieldId ? { ...field, column, order: 9999 } : field
      )
    );

    setDraggingFieldId(null);
  };

  const handleAddField = (fieldData: { inputType: FieldInputType; label: string; dropdownOptions?: string[]; }) => {
    const newField: PropertyRecordField = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: fieldData.label,
      customLabel: fieldData.label,
      category: 'advanced',
      type: fieldData.inputType as PropertyRecordField['type'],
      enabled: true,
      required: false,
      systemRequired: false,
      systemFixed: false,
      order: fields.filter(f => f.category === 'advanced').length,
      column: 1,
      placeholder: '',
      options: fieldData.dropdownOptions
    };

    onFieldsChange([...fields, newField]);
    setSelectedFieldId(newField.id);
    setIsAddFieldModalOpen(false);
  };

  const handleDeleteField = (fieldId: string) => {
    if (fieldId.startsWith('custom-')) {
      onFieldsChange(fields.filter(f => f.id !== fieldId));
      if (selectedFieldId === fieldId) {
        setSelectedFieldId(null);
      }
    }
  };

  const selectedField = fields.find(f => f.id === selectedFieldId) || null;

  return (
    <div
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('[data-field-card]') === null &&
            (e.target as HTMLElement).closest('[data-settings-drawer]') === null) {
          setSelectedFieldId(null);
        }
      }}
    >
      {/* Advanced Section */}
      <div className="bg-white border border-gray-300 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Advanced Details
            </h2>
            <p className="text-sm text-gray-600">
              Additional property characteristics and specifications. Click a field to edit, drag to reorder.
            </p>
          </div>
          <button
            onClick={() => setIsAddFieldModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-[#7D2522] hover:bg-[#510906] rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Field
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6">
          <div
            className="p-6 min-h-[400px]"
            onDragOver={handleDragOver}
            onDrop={() => handleDropOnColumn(1)}
          >
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
              <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-sm text-gray-500">Drag fields here</p>
              </div>
            )}
          </div>

          <div
            className="p-6 min-h-[400px]"
            onDragOver={handleDragOver}
            onDrop={() => handleDropOnColumn(2)}
          >
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
              <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-sm text-gray-500">Drag fields here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Field Settings Drawer */}
      {selectedField && (
        <FieldSettingsDrawer
          field={selectedField}
          onClose={() => setSelectedFieldId(null)}
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
    </div>
  );
}




