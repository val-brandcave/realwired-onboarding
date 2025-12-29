"use client";

import { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanHeader } from "./KanbanHeader";
import type { ModuleDetails, OnboardingModule, ModuleStatus, ProgressOverview } from "@/lib/onboarding-context";

interface ModulesKanbanProps {
  modules: ModuleDetails[];
  progressOverview: ProgressOverview;
  onModuleStatusChange: (moduleId: OnboardingModule, newStatus: ModuleStatus, reason?: string) => void;
  onModuleClick: (moduleId: OnboardingModule) => void;
}

export function ModulesKanban({ modules, progressOverview, onModuleStatusChange, onModuleClick }: ModulesKanbanProps) {
  const [draggedModuleId, setDraggedModuleId] = useState<OnboardingModule | null>(null);

  // Separate modules by status
  const toDoModules = modules.filter(m => m.status === 'not_started');
  const inProgressModules = modules.filter(m => m.status === 'in_progress');
  const blockedModules = modules.filter(m => m.status === 'blocked');
  const completedModules = modules.filter(m => m.status === 'completed');

  const handleDragStart = (moduleId: OnboardingModule) => {
    setDraggedModuleId(moduleId);
  };

  const handleDragEnd = () => {
    setDraggedModuleId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Kanban Header with Progress Metrics */}
      <KanbanHeader overview={progressOverview} />
      
      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 p-6 pt-4">
        {/* To Do Column */}
        <KanbanColumn
          title="To Do"
          count={toDoModules.length}
          color="blue"
          modules={toDoModules}
          draggedModuleId={draggedModuleId}
          onDrop={(moduleId) => onModuleStatusChange(moduleId, 'not_started')}
          onModuleClick={onModuleClick}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          acceptsDrop={true}
        />
        
        {/* In Progress Column */}
        <KanbanColumn
          title="In Progress"
          count={inProgressModules.length}
          color="orange"
          modules={inProgressModules}
          draggedModuleId={draggedModuleId}
          onDrop={(moduleId) => onModuleStatusChange(moduleId, 'in_progress')}
          onModuleClick={onModuleClick}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          acceptsDrop={true}
        />
        
        {/* Blocked Column */}
        <KanbanColumn
          title="Blocked"
          count={blockedModules.length}
          color="red"
          modules={blockedModules}
          draggedModuleId={draggedModuleId}
          onDrop={(moduleId, reason) => onModuleStatusChange(moduleId, 'blocked', reason)}
          onModuleClick={onModuleClick}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          acceptsDrop={true}
          requiresReason={true}
        />
        
        {/* Completed Column */}
        <KanbanColumn
          title="Completed"
          count={completedModules.length}
          color="green"
          modules={completedModules}
          draggedModuleId={draggedModuleId}
          onDrop={() => {}} // No-op
          onModuleClick={onModuleClick}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          acceptsDrop={false}
        />
      </div>
    </div>
  );
}

