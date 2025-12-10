"use client";

interface SmallDonutProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  color?: string; // Optional custom color for progress
  backgroundColor?: string; // Optional background circle color
}

export function SmallDonut({ 
  percentage, 
  size = 32, 
  strokeWidth = 3,
  showLabel = false,
  color,
  backgroundColor = "#E5E7EB" // Default light gray
}: SmallDonutProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  // Color based on percentage (or use custom color if provided)
  const getColor = () => {
    if (color) return color; // Use custom color if provided
    if (percentage >= 80) return '#10B981'; // green
    if (percentage >= 50) return '#F59E0B'; // amber
    if (percentage >= 25) return '#F97316'; // orange
    return '#EF4444'; // red
  };

  // Show checkmark for 100% completion
  if (percentage === 100) {
    // If color is white (selected state), show white border with white checkmark
    const isSelectedState = color === '#FFFFFF';
    
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <div 
            className="rounded-full flex items-center justify-center border-2"
            style={{ 
              width: size, 
              height: size,
              backgroundColor: 'transparent',
              borderColor: isSelectedState ? '#FFFFFF' : '#10B981'
            }}
          >
            <svg 
              className={isSelectedState ? 'text-white' : 'text-[#10B981]'}
              style={{ width: size * 0.5, height: size * 0.5 }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

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
            stroke={backgroundColor}
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

