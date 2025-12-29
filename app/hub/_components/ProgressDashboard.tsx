"use client";

import { CircularProgressChart } from "./CircularProgressChart";
import { StatusBox } from "./StatusBox";
import { StatusBadge } from "./StatusBadge";
import type { ProgressOverview } from "@/lib/onboarding-context";

interface ProgressDashboardProps {
  overview: ProgressOverview;
}

export function ProgressDashboard({ overview }: ProgressDashboardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5">
      {/* Header Row: Title + Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          Onboarding Progress
        </h3>
        <StatusBadge status={overview.onTrackStatus} />
      </div>
      
      {/* Main Content: Horizontal Layout */}
      <div className="flex items-center gap-5">
        {/* Left: Status Boxes */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-2">
            <StatusBox count={overview.toDoCount} label="To Do" color="teal" />
            <StatusBox count={overview.inProgressCount} label="In Progress" color="orange" />
            <StatusBox count={overview.blockedCount} label="Blocked" color="red" />
            <StatusBox count={overview.completedCount} label="Done" color="green" />
          </div>
        </div>
        
        {/* Center: Circular Chart (Smaller) */}
        <div className="flex-shrink-0">
          <CircularProgressChart 
            percentage={overview.overallProgress}
            toDoCount={overview.toDoCount}
            inProgressCount={overview.inProgressCount}
            blockedCount={overview.blockedCount}
            completedCount={overview.completedCount}
          />
        </div>
        
        {/* Right: Timeline Info */}
        <div className="flex-shrink-0 text-sm text-gray-700 space-y-1.5">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Days left</div>
            <div className="text-xl font-bold text-gray-900">
              {overview.daysLeft !== undefined ? overview.daysLeft : '--'}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Go-Live</div>
            <div className="text-xs font-semibold text-gray-900">
              {formatDate(overview.goLiveDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

