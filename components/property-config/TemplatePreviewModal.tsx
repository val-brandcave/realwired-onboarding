"use client";

import { useState } from "react";
import Image from "next/image";

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  thumbnailUrl: string;
}

export function TemplatePreviewModal({ 
  isOpen, 
  onClose, 
  templateName, 
  thumbnailUrl 
}: TemplatePreviewModalProps) {
  const [imageZoom, setImageZoom] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">{templateName} - Template Preview</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            aria-label="Close preview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image Container */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div className="flex items-center justify-center min-h-full">
            <div 
              className="relative transition-transform duration-200 cursor-zoom-in"
              style={{ transform: `scale(${imageZoom})` }}
              onClick={() => setImageZoom(imageZoom === 1 ? 1.5 : 1)}
            >
              <Image
                src={thumbnailUrl}
                alt={`${templateName} template preview`}
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>

        {/* Footer with Zoom Controls */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setImageZoom(Math.max(0.5, imageZoom - 0.25))}
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Zoom Out
            </button>
            <span className="text-sm text-gray-600 font-medium">{Math.round(imageZoom * 100)}%</span>
            <button
              onClick={() => setImageZoom(Math.min(2, imageZoom + 0.25))}
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Zoom In
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

