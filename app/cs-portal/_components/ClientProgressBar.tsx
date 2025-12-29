"use client";

interface ClientProgressBarProps {
  clientName: string;
  progress: number;
  onClick?: () => void;
}

export function ClientProgressBar({ clientName, progress, onClick }: ClientProgressBarProps) {
  return (
    <div 
      className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {/* Client Name */}
      <div className="text-sm font-medium text-gray-900 w-48 truncate">
        {clientName}
      </div>
      
      {/* Progress Bar */}
      <div className="flex-1 mx-4">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Percentage */}
      <div className="text-sm font-bold text-gray-900 w-12 text-right">
        {progress}%
      </div>
    </div>
  );
}

