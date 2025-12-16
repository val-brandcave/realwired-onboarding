"use client";

import { useState } from "react";

interface SubmitTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticket: NewTicketData) => void;
}

export interface NewTicketData {
  subject: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  description: string;
  assignedAgent?: string;
}

const CATEGORIES = [
  "Configuration Help",
  "Technical Issue",
  "Training Request",
  "Feature Question",
  "Bug Report",
  "Other",
];

const AGENTS = [
  "Sarah Johnson",
  "Emily Rodriguez",
  "David Patterson",
  "Michael Chen",
];

export function SubmitTicketModal({ isOpen, onClose, onSubmit }: SubmitTicketModalProps) {
  const [formData, setFormData] = useState<NewTicketData>({
    subject: "",
    category: "Configuration Help",
    priority: "medium",
    description: "",
    assignedAgent: "auto",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        subject: "",
        category: "Configuration Help",
        priority: "medium",
        description: "",
        assignedAgent: "auto",
      });
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="submit-ticket-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full transform transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <h2 id="submit-ticket-title" className="text-2xl font-bold text-gray-900 mb-2">
                Submit Support Ticket
              </h2>
              <p className="text-gray-600">
                Describe your issue or question, and our Customer Success team will respond promptly.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  Subject <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief summary of your issue or question"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent"
                />
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Priority <span className="text-red-600">*</span>
                  </label>
                  <select
                    required
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as NewTicketData["priority"] })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Assigned Agent */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  Assign to Agent (Optional)
                </label>
                <select
                  value={formData.assignedAgent}
                  onChange={(e) => setFormData({ ...formData, assignedAgent: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent"
                >
                  <option value="auto">Auto-assign based on category</option>
                  {AGENTS.map((agent) => (
                    <option key={agent} value={agent}>{agent}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please provide detailed information about your issue or question. Include any relevant details that will help us assist you better."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Be as specific as possible to help us resolve your issue quickly
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    flex-1 px-6 py-3 font-semibold rounded-lg shadow-md transition-all
                    ${isSubmitting
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white hover:shadow-lg'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Ticket"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

