import React, { useState } from 'react';
import { FieldPreview } from '../property-config/FieldPreview';
import { DraggableField } from '../property-config/DraggableField';

type FieldInputType = 'text' | 'textarea' | 'select' | 'number' | 'date';

interface BidPanelField {
  id: string;
  label: string;
  enabled: boolean;
  required: boolean;
  systemRequired?: boolean;
  systemFixed?: boolean;
  readonly: boolean;
  customLabel?: string;
  inputType?: FieldInputType;
  dropdownOptions?: string[];
  order?: number;
  column?: 1 | 2;
  type?: string; // For compatibility with FieldPreview
  placeholder?: string;
}

interface BidPanelFieldBuilderProps {
  fields: BidPanelField[];
  onFieldsChange: (fields: BidPanelField[]) => void;
  onFieldUpdate: (fieldId: string, updates: any) => void;
  onFieldDelete: (fieldId: string) => void;
  onAddField: () => void;
  title: string;
  description: string;
}

export function BidPanelFieldBuilder({
  fields,
  onFieldsChange,
  onFieldUpdate,
  onFieldDelete,
  onAddField,
  title,
  description
}: BidPanelFieldBuilderProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [draggingFieldId, setDraggingFieldId] = useState<string | null>(null);

  // Get fields by column
  const getFieldsByColumn = (column: 1 | 2) => {
    return fields
      .filter(f => f.column === column)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  const handleFieldClick = (fieldId: string) => {
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    } else {
      setSelectedFieldId(fieldId);
    }
  };

  const handleDragStart = (fieldId: string) => {
    setDraggingFieldId(fieldId);
  };

  const handleDragEnd = () => {
    setDraggingFieldId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetFieldId: string, targetColumn: 1 | 2) => {
    if (!draggingFieldId || draggingFieldId === targetFieldId) return;

    const draggingField = fields.find(f => f.id === draggingFieldId);
    const targetField = fields.find(f => f.id === targetFieldId);

    if (!draggingField || !targetField) return;

    const newFields = [...fields];
    
    // Get all fields in the target column
    const columnFields = newFields.filter(f => f.column === targetColumn)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const draggingIndex = columnFields.findIndex(f => f.id === draggingFieldId);
    const targetIndex = columnFields.findIndex(f => f.id === targetFieldId);

    // Update the dragging field's column
    const fieldToMove = newFields.find(f => f.id === draggingFieldId);
    if (fieldToMove) {
      fieldToMove.column = targetColumn;
    }

    if (draggingIndex === -1) {
      // Moving from different column
      columnFields.splice(targetIndex, 0, fieldToMove!);
    } else {
      // Reordering within same column
      const [removed] = columnFields.splice(draggingIndex, 1);
      columnFields.splice(targetIndex, 0, removed);
    }

    // Update orders
    columnFields.forEach((field, idx) => {
      field.order = idx;
    });

    onFieldsChange(newFields);
    setDraggingFieldId(null);
  };

  const handleDropOnColumn = (column: 1 | 2) => {
    if (!draggingFieldId) return;

    const newFields = fields.map(field =>
      field.id === draggingFieldId
        ? { ...field, column, order: 9999 }
        : field
    );

    onFieldsChange(newFields);
    setDraggingFieldId(null);
  };

  // Convert BidPanelField to format compatible with FieldPreview
  const convertToPreviewFormat = (field: BidPanelField) => {
    return {
      ...field,
      type: field.inputType || 'text',
      options: field.dropdownOptions,
      category: 'overview' as const
    };
  };

  const selectedField = fields.find(f => f.id === selectedFieldId);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <button
          onClick={onAddField}
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
          className="p-6 min-h-[300px]"
          onDragOver={handleDragOver}
          onDrop={() => handleDropOnColumn(1)}
        >
          {getFieldsByColumn(1).map((field) => (
            <DraggableField
              key={field.id}
              field={convertToPreviewFormat(field)}
              isSelected={selectedFieldId === field.id}
              onClick={() => handleFieldClick(field.id)}
              onDelete={() => onFieldDelete(field.id)}
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

        {/* Column 2 */}
        <div
          className="p-6 min-h-[300px]"
          onDragOver={handleDragOver}
          onDrop={() => handleDropOnColumn(2)}
        >
          {getFieldsByColumn(2).map((field) => (
            <DraggableField
              key={field.id}
              field={convertToPreviewFormat(field)}
              isSelected={selectedFieldId === field.id}
              onClick={() => handleFieldClick(field.id)}
              onDelete={() => onFieldDelete(field.id)}
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
  );
}

