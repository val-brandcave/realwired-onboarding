"use client";

interface StatusBadgeProps {
  status: 'on-track' | 'at-risk' | 'critical';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    'on-track': {
      icon: '●',
      label: 'On Track',
      className: 'bg-green-100 text-green-700 border-green-200',
    },
    'at-risk': {
      icon: '⚠',
      label: 'At Risk',
      className: 'bg-orange-100 text-orange-700 border-orange-200',
    },
    'critical': {
      icon: '🔴',
      label: 'Critical',
      className: 'bg-red-100 text-red-700 border-red-200',
    },
  };

  const { icon, label, className } = config[status];

  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${className}`}>
      <span className="text-[10px]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

