"use client";

import { useEffect, useState } from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  daysRemaining?: number | null;
  completedModules?: number;
  totalModules?: number;
}

export function CircularProgress({
  percentage,
  size = 200,
  strokeWidth = 16,
  daysRemaining,
  completedModules,
  totalModules,
}: CircularProgressProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;
  const center = size / 2;

  // Color based on percentage and urgency
  const getColor = () => {
    if (percentage >= 75) return '#10B981'; // green
    if (percentage >= 50) return '#F59E0B'; // amber
    if (percentage >= 25) return '#F97316'; // orange
    return '#EF4444'; // red
  };

  const getUrgencyColor = () => {
    if (daysRemaining === null) return '#10B981';
    if (daysRemaining < 0) return '#EF4444';
    if (daysRemaining <= 7) return '#F97316';
    return '#10B981';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        {/* Inner shadow circle for depth */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke="rgba(0,0,0,0.03)"
          strokeWidth="1"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-slate-900 mb-1">
            {Math.round(animatedPercentage)}%
          </div>
          
          {completedModules !== undefined && totalModules !== undefined && (
            <>
              <div className="text-xs text-slate-500 font-medium mb-1">Complete</div>
              <div className="text-xs text-slate-600 font-semibold">
                {completedModules} of {totalModules}
              </div>
              <div className="text-xs text-slate-500">
                modules
              </div>
            </>
          )}
          
          {daysRemaining !== null && completedModules === undefined && (
            <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
              daysRemaining < 0
                ? 'bg-red-100 text-red-700'
                : daysRemaining <= 7
                ? 'bg-orange-100 text-orange-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {daysRemaining < 0
                ? `${Math.abs(daysRemaining)}d overdue`
                : daysRemaining === 0
                ? 'Today!'
                : `${daysRemaining}d to go`}
            </div>
          )}
        </div>
      </div>

      {/* Outer glow effect */}
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-xl"
        style={{
          background: `radial-gradient(circle, ${getUrgencyColor()} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

