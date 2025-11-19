"use client";

import { useState } from "react";

interface CSTeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  avatarColor: string;
}

const defaultCSTeam: CSTeamMember[] = [
  {
    id: 'cs-1',
    name: 'Samuel Kite',
    role: 'Customer Success Manager',
    email: 'samuel.kite@realwired.com',
    phone: '(555) 123-4567',
    avatarColor: '#9F2E2B',
  },
  {
    id: 'cs-2',
    name: 'Jennifer Martinez',
    role: 'Implementation Specialist',
    email: 'jennifer.m@realwired.com',
    phone: '(555) 234-5678',
    avatarColor: '#3B82F6',
  },
];

export function FloatingCSTeam() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Contact CS Team"
      >
        <div className="relative group">
          {/* Avatar Stack */}
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white font-semibold relative z-10 transition-transform group-hover:scale-110"
              style={{ backgroundColor: defaultCSTeam[0].avatarColor }}
            >
              {defaultCSTeam[0].name.split(' ').map(n => n[0]).join('')}
            </div>
            <div
              className="w-12 h-12 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white font-semibold -ml-4 transition-transform group-hover:scale-110"
              style={{ backgroundColor: defaultCSTeam[1].avatarColor }}
            >
              {defaultCSTeam[1].name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
              Contact CS Team
              <div className="absolute top-full right-4 -mt-1">
                <div className="w-2 h-2 bg-slate-900 transform rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
        </div>
      </button>

      {/* Slide-up Drawer */}
      <div
        className={`fixed bottom-0 right-0 w-full sm:w-96 bg-white rounded-t-2xl shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-bold text-slate-900">Your CS Team</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {defaultCSTeam.map((member) => (
            <div
              key={member.id}
              className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                  style={{ backgroundColor: member.avatarColor }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{member.name}</h4>
                  <p className="text-xs text-slate-600">{member.role}</p>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-slate-700 group-hover:text-blue-900">{member.email}</span>
                </a>

                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm text-slate-700 group-hover:text-green-900">{member.phone}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-200 bg-slate-50">
          <p className="text-xs text-center text-slate-600">
            We're here to help you succeed! Reach out anytime.
          </p>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

