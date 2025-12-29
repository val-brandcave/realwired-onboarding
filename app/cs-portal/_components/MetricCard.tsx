"use client";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  badge?: {
    text: string;
    color: 'purple' | 'green' | 'blue' | 'red';
  };
}

export function MetricCard({ icon, label, value, badge }: MetricCardProps) {
  const badgeColors = {
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    red: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Top Row: Icon + Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 flex items-center justify-center text-gray-600">
          {icon}
        </div>
        {badge && (
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badgeColors[badge.color]}`}>
            {badge.text}
          </span>
        )}
      </div>
      
      {/* Label */}
      <div className="text-sm text-gray-600 mb-2">
        {label}
      </div>
      
      {/* Value */}
      <div className="text-3xl font-bold text-gray-900">
        {value}
      </div>
    </div>
  );
}

