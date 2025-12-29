"use client";

import { useState } from "react";

interface ModuleProgress {
  id: string;
  name: string;
  icon: React.ReactNode;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

interface ClientSidebarProps {
  clientName: string;
  clientLogo?: string;
  primaryContact: string;
  goLiveDate: string;
  assignees: string[];
  overallProgress: number;
  modules: ModuleProgress[];
  onEditContact?: () => void;
  onEditGoLive?: () => void;
  onEditAssignees?: () => void;
}

export function ClientSidebar({
  clientName,
  clientLogo,
  primaryContact,
  goLiveDate,
  assignees,
  overallProgress,
  modules,
  onEditContact,
  onEditGoLive,
  onEditAssignees,
}: ClientSidebarProps) {
  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string): string => {
    const colors = ['#9F2E2B', '#2563eb', '#059669', '#d97706'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col h-full">
      <div className="p-6 space-y-6">
        {/* Bank Logo/Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
            {clientLogo ? (
              <img src={clientLogo} alt={clientName} className="w-full h-full object-contain" />
            ) : (
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            )}
          </div>
        </div>
        
        {/* Client Name */}
        <h2 className="text-xl font-bold text-gray-900 text-center">
          {clientName}
        </h2>
        
        {/* Primary Contact */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-600">Primary Contact</span>
            <button
              onClick={onEditContact}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Edit contact"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
          <a href={`mailto:${primaryContact}`} className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
            {primaryContact}
          </a>
        </div>
        
        {/* Go Live Date */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-600">Go Live</span>
            <button
              onClick={onEditGoLive}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Edit go-live date"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
          <span className="text-sm font-medium text-gray-900">{formatDate(goLiveDate)}</span>
        </div>
        
        {/* Assignees */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">Assignees</span>
            <button
              onClick={onEditAssignees}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Edit assignees"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center -space-x-2">
            {assignees.slice(0, 4).map((name, idx) => (
              <div
                key={idx}
                className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white shadow-sm"
                style={{ backgroundColor: getAvatarColor(name) }}
                title={name}
              >
                {getInitials(name)}
              </div>
            ))}
          </div>
        </div>
        
        {/* Overall Progress Chart */}
        <div className="flex justify-center py-4">
          <div className="relative w-32 h-32">
            {/* SVG Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              {/* Background */}
              <circle 
                cx="64" 
                cy="64" 
                r="56" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="12"
              />
              {/* Progress */}
              {overallProgress > 0 && (
                <circle 
                  cx="64" 
                  cy="64" 
                  r="56" 
                  fill="none" 
                  stroke="#9F2E2B" 
                  strokeWidth="12"
                  strokeDasharray={`${(overallProgress / 100) * 352} 352`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              )}
            </svg>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-gray-900">{overallProgress}%</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
          </div>
        </div>
        
        {/* Module Checklist */}
        <div>
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
            Onboarding Modules
          </h4>
          <div className="space-y-2">
            {modules.map((module) => (
              <div key={module.id} className="flex items-center gap-3">
                {/* Mini Donut Progress */}
                <div className="relative w-6 h-6 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 24 24">
                    {/* Background */}
                    <circle 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      fill="none" 
                      stroke="#e5e7eb" 
                      strokeWidth="3"
                    />
                    {/* Progress */}
                    {module.progress > 0 && (
                      <circle 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        fill="none" 
                        stroke={module.status === 'completed' ? '#10b981' : '#f59e0b'}
                        strokeWidth="3"
                        strokeDasharray={`${(module.progress / 100) * 62.8} 62.8`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    )}
                  </svg>
                  {/* Checkmark if completed */}
                  {module.status === 'completed' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Module Icon + Name */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-5 h-5 text-gray-600 flex-shrink-0">
                    {module.icon}
                  </div>
                  <span className={`text-sm truncate ${
                    module.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {module.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Support Section */}
      <div className="mt-auto border-t border-gray-200 p-6">
        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Support
        </h4>
        <button className="w-full text-left text-sm text-gray-700 hover:text-[#9F2E2B] transition-colors py-1">
          View Tickets
        </button>
        <button className="w-full text-left text-sm text-gray-700 hover:text-[#9F2E2B] transition-colors py-1">
          Send Reminder
        </button>
      </div>
    </div>
  );
}

