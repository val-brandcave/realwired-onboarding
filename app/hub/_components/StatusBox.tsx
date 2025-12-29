"use client";

interface StatusBoxProps {
  count: number;
  label: string;
  color: 'teal' | 'orange' | 'red' | 'green';
}

export function StatusBox({ count, label, color }: StatusBoxProps) {
  const colorClasses = {
    teal: 'bg-teal-50 text-teal-700',
    orange: 'bg-orange-50 text-orange-700',
    red: 'bg-red-50 text-red-700',
    green: 'bg-green-50 text-green-700',
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg p-2 text-center transition-colors`}>
      <div className="text-xl font-bold mb-0.5">{count}</div>
      <div className="text-[10px] font-medium leading-tight">{label}</div>
    </div>
  );
}

