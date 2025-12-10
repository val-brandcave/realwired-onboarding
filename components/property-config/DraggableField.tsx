import React from 'react';
import { FieldPreview } from './FieldPreview';
import type { GenericField } from './types';

interface DraggableFieldProps {
  field: GenericField;
  isSelected: boolean;
  onClick: () => void;
  onDelete?: () => void;
  onDragStart: (fieldId: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (targetFieldId: string) => void;
  isDragging: boolean;
}

export function DraggableField({
  field,
  isSelected,
  onClick,
  onDelete,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  isDragging
}: DraggableFieldProps) {
  const handleDragStart = (e: React.DragEvent) => {
    if (field.systemFixed) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', field.id);
    onDragStart(field.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver(e);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(field.id);
  };

  return (
    <div
      draggable={!field.systemFixed}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="mb-3"
    >
      <FieldPreview
        field={field}
        isSelected={isSelected}
        onClick={onClick}
        onDelete={onDelete}
        isDragging={isDragging}
      />
    </div>
  );
}

