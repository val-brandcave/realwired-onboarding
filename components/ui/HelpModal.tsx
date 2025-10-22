"use client";

import React, { useState } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVideo: () => void;
}

export function HelpModal({ isOpen, onClose, onOpenVideo }: HelpModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    contactMethod: 'email' as 'email' | 'phone',
    preferredTime: 'morning',
    urgency: 'normal',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({
          email: '',
          phone: '',
          contactMethod: 'email',
          preferredTime: 'morning',
          urgency: 'normal',
          notes: ''
        });
      }, 2000);
    }, 800);
  };

  const handleVideoClick = () => {
    onClose();
    onOpenVideo();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#9F2E2B] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Get Help</h3>
              <p className="text-sm text-slate-600">We're here to assist you</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Close help modal"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Request Submitted!</h4>
            <p className="text-slate-600">
              Our support team will reach out to you shortly via {formData.contactMethod === 'email' ? 'email' : 'phone'}.
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Video Suggestion */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-amber-900 mb-2">
                    <strong>Before you submit:</strong> Try watching our walkthrough video — it answers most common questions!
                  </p>
                  <button 
                    type="button"
                    onClick={handleVideoClick}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#9F2E2B] hover:text-[#7D2522] focus:outline-none focus:underline"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Onboarding Walkthrough
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Method */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                How would you like us to reach you?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.contactMethod === 'email' 
                    ? 'border-[#9F2E2B] bg-[#FDF6F5]' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input 
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={formData.contactMethod === 'email'}
                    onChange={(e) => setFormData({...formData, contactMethod: e.target.value as 'email'})}
                    className="w-4 h-4 text-primary border-input"
                  />
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-slate-900">Email</span>
                  </div>
                </label>
                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.contactMethod === 'phone' 
                    ? 'border-[#9F2E2B] bg-[#FDF6F5]' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input 
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={formData.contactMethod === 'phone'}
                    onChange={(e) => setFormData({...formData, contactMethod: e.target.value as 'phone'})}
                    className="w-4 h-4 text-primary border-input"
                  />
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-medium text-slate-900">Phone</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="help-email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                id="help-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="you@bank.com"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="help-phone" className="block text-sm font-semibold text-slate-900 mb-2">
                Phone Number {formData.contactMethod === 'phone' && <span className="text-red-500">*</span>}
              </label>
              <input 
                id="help-phone"
                type="tel"
                required={formData.contactMethod === 'phone'}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(555) 555-5555"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
              />
            </div>

            {/* Best Time to Call (conditional) */}
            {formData.contactMethod === 'phone' && (
              <div>
                <label htmlFor="preferred-time" className="block text-sm font-semibold text-slate-900 mb-2">
                  Best time to call
                </label>
                <select 
                  id="preferred-time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
                >
                  <option value="morning">Morning (8am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 5pm)</option>
                  <option value="evening">Evening (5pm - 8pm)</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>
            )}

            {/* Urgency */}
            <div>
              <label htmlFor="urgency" className="block text-sm font-semibold text-slate-900 mb-2">
                How urgent is your request?
              </label>
              <select 
                id="urgency"
                value={formData.urgency}
                onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
              >
                <option value="low">Low - General question</option>
                <option value="normal">Normal - Need help within 24 hours</option>
                <option value="high">High - Blocking my progress</option>
                <option value="critical">Critical - System issue</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="help-notes" className="block text-sm font-semibold text-slate-900 mb-2">
                How can we help? <span className="text-red-500">*</span>
              </label>
              <textarea 
                id="help-notes"
                required
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Describe the issue or question you have..."
                rows={4}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B] resize-none"
              />
              <p className="text-xs text-slate-500 mt-1">Include as much detail as possible to help us assist you faster</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button 
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#9F2E2B] rounded-lg hover:bg-[#7D2522] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

