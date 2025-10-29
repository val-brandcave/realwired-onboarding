"use client";

import { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  type?: 'success' | 'error' | 'info';
}

export function Snackbar({ 
  message, 
  isVisible, 
  onClose, 
  duration = 3000,
  type = 'success'
}: SnackbarProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  }[type];

  const icon = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }[type];

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in-right">
      <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}>
        <div className="flex-shrink-0">
          {icon}
        </div>
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

