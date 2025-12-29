"use client";

interface CircularProgressChartProps {
  percentage: number;
  toDoCount: number;
  inProgressCount: number;
  blockedCount: number;
  completedCount: number;
  size?: number; // Size in pixels (default 80)
}

export function CircularProgressChart({ 
  percentage, 
  toDoCount, 
  inProgressCount, 
  blockedCount, 
  completedCount,
  size = 80
}: CircularProgressChartProps) {
  const radius = (size / 2) - 10;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const totalModules = toDoCount + inProgressCount + blockedCount + completedCount;
  
  // If nothing completed yet, show full circle in "To Do" color (teal)
  const isAllToDo = percentage === 0;
  
  // Calculate segment sizes
  const completedAngle = (completedCount / totalModules) * 360;
  const inProgressAngle = (inProgressCount / totalModules) * 360;
  const blockedAngle = (blockedCount / totalModules) * 360;
  const toDoAngle = (toDoCount / totalModules) * 360;
  
  // Convert angles to stroke-dasharray segments
  const completedSegment = (completedAngle / 360) * circumference;
  const inProgressSegment = (inProgressAngle / 360) * circumference;
  const blockedSegment = (blockedAngle / 360) * circumference;
  const toDoSegment = (toDoAngle / 360) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle - Always gray to show remaining work */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius}
          fill="none" 
          stroke="#e5e7eb"
          strokeWidth="8"
          className="transition-all duration-500"
        />
        
        {/* Progress circle - Show filled percentage */}
        {percentage > 0 && (
          <circle 
            cx={center} 
            cy={center} 
            r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percentage / 100) * circumference}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        )}
        
        {/* Old multi-segment logic (kept for reference, not used) */}
        {false && (
          <>
            {/* To Do segment (teal) - Show remaining work */}
            {toDoCount > 0 && (
              <circle 
                cx={center} 
                cy={center} 
                r={radius} 
                fill="none" 
                stroke="#14b8a6" 
                strokeWidth="8"
                strokeDasharray={`${toDoSegment} ${circumference - toDoSegment}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            )}
            
            {/* In Progress segment (orange) */}
            {inProgressCount > 0 && (
              <circle 
                cx={center} 
                cy={center} 
                r={radius} 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="8"
                strokeDasharray={`${inProgressSegment} ${circumference - inProgressSegment}`}
                strokeDashoffset={-toDoSegment}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            )}
            
            {/* Blocked segment (red) */}
            {blockedCount > 0 && (
              <circle 
                cx={center} 
                cy={center} 
                r={radius} 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="8"
                strokeDasharray={`${blockedSegment} ${circumference - blockedSegment}`}
                strokeDashoffset={-(toDoSegment + inProgressSegment)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            )}
            
            {/* Completed segment (green) */}
            {completedCount > 0 && (
              <circle 
                cx={center} 
                cy={center} 
                r={radius} 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="8"
                strokeDasharray={`${completedSegment} ${circumference - completedSegment}`}
                strokeDashoffset={-(toDoSegment + inProgressSegment + blockedSegment)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            )}
          </>
        )}
      </svg>
      
      {/* Center text - Scaled to size */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-bold text-gray-900" style={{ fontSize: size * 0.25 }}>
          {percentage}%
        </div>
      </div>
    </div>
  );
}

