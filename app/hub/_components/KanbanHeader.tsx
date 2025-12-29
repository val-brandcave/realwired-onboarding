"use client";

import { StatusBadge } from "./StatusBadge";
import { CircularProgressChart } from "./CircularProgressChart";
import type { ProgressOverview } from "@/lib/onboarding-context";

interface KanbanHeaderProps {
  overview: ProgressOverview;
}

export function KanbanHeader({ overview }: KanbanHeaderProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      {/* Left: Title + Progress Chart */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Onboarding Modules
        </h2>
        
        {/* Progress Chart - Mini donut (68px) */}
        <CircularProgressChart 
          percentage={overview.overallProgress}
          toDoCount={overview.toDoCount}
          inProgressCount={overview.inProgressCount}
          blockedCount={overview.blockedCount}
          completedCount={overview.completedCount}
          size={68}
        />
      </div>
      
      {/* Right: Status Counts + Metrics */}
      <div className="flex items-center gap-4">
        {/* Status Counts */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-teal-50 border border-teal-200 rounded-md">
            <span className="text-base font-bold text-teal-700">{overview.toDoCount}</span>
            <span className="text-xs text-teal-600">To Do</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 border border-orange-200 rounded-md">
            <span className="text-base font-bold text-orange-700">{overview.inProgressCount}</span>
            <span className="text-xs text-orange-600">In Progress</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-red-50 border border-red-200 rounded-md">
            <span className="text-base font-bold text-red-700">{overview.blockedCount}</span>
            <span className="text-xs text-red-600">Blocked</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded-md">
            <span className="text-base font-bold text-green-700">{overview.completedCount}</span>
            <span className="text-xs text-green-600">Done</span>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-px h-8 bg-gray-300" />
        
        {/* Status Badge */}
        <StatusBadge status={overview.onTrackStatus} />
        
        {/* Divider */}
        <div className="w-px h-8 bg-gray-300" />
        
        {/* Timeline - Days left + Go-Live Date */}
        <div className="text-sm">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-bold text-gray-900 text-lg">
              {overview.daysLeft !== undefined ? overview.daysLeft : '--'}
            </span>
            <span className="text-gray-600">days left</span>
          </div>
          <div className="text-xs text-gray-500">
            Go-Live: {formatDate(overview.goLiveDate)}
          </div>
        </div>
      </div>
    </div>
  );
}

