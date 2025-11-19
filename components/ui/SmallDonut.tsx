"use client";

interface SmallDonutProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export function SmallDonut({ 
  percentage, 
  size = 32, 
  strokeWidth = 3,
  showLabel = false 
}: SmallDonutProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  // Color based on percentage
  const getColor = () => {
    if (percentage >= 80) return '#10B981'; // green
    if (percentage >= 50) return '#F59E0B'; // amber
    if (percentage >= 25) return '#F97316'; // orange
    return '#EF4444'; // red
  };

  return (
    <div className="flex flex-col items-center justify-center">
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
            className="transition-all duration-500 ease-out"
          />
        </svg>
        {/* Percentage text - only show if showLabel is true */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-slate-700">{percentage}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

