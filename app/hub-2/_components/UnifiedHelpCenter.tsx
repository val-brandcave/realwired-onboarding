"use client";

import { useState } from "react";
import { ChatBot } from "@/components/ui/ChatBot";

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

type TabType = 'chat' | 'team';

export function UnifiedHelpCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chat');

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Get Help"
      >
        <div className="relative group">
          {/* Main Button */}
          <div className="w-14 h-14 bg-gradient-to-br from-[#9F2E2B] to-[#7D2522] rounded-full shadow-lg hover:shadow-2xl transition-all flex items-center justify-center group-hover:scale-110">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
            1
          </span>

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
              Get Help - Chat or Contact CS Team
              <div className="absolute top-full right-4 -mt-1">
                <div className="w-2 h-2 bg-slate-900 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Help Center Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed bottom-0 right-0 w-full sm:w-[420px] bg-white rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none shadow-2xl z-50 flex flex-col max-h-[85vh] animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white p-5 flex items-center justify-between rounded-t-2xl sm:rounded-tl-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Help Center</h3>
                  <p className="text-xs text-white/80">We're here to support you</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close help center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 bg-slate-50 px-5">
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === 'chat'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span>Chat Assistant</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('team')}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === 'team'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>CS Team</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden bg-white">
              {activeTab === 'chat' ? (
                <div className="h-full">
                  <ChatBot 
                    isOpen={true} 
                    onClose={() => {}} 
                    embedded={true}
                  />
                </div>
              ) : (
                <div className="p-5 space-y-4 overflow-y-auto h-full">
                  <div className="text-center mb-4">
                    <h4 className="text-base font-bold text-slate-900 mb-1">Your Customer Success Team</h4>
                    <p className="text-xs text-slate-600">Reach out for personalized support</p>
                  </div>

                  {defaultCSTeam.map((member) => (
                    <div
                      key={member.id}
                      className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors border border-slate-200"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-md"
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
                          className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors group border border-slate-200"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-slate-500">Email</p>
                            <p className="text-sm text-slate-700 group-hover:text-blue-900 truncate">{member.email}</p>
                          </div>
                        </a>

                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-green-50 transition-colors group border border-slate-200"
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-slate-500">Phone</p>
                              <p className="text-sm text-slate-700 group-hover:text-green-900">{member.phone}</p>
                            </div>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Quick Help Info */}
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">Need immediate help?</p>
                        <p className="text-xs text-blue-700">Try our Chat Assistant first for instant answers to common questions!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Hint */}
            {activeTab === 'chat' && (
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
                <p className="text-xs text-center text-slate-600">
                  Need to talk to a person? Switch to the <button onClick={() => setActiveTab('team')} className="text-primary font-medium hover:underline">CS Team</button> tab
                </p>
              </div>
            )}
            {activeTab === 'team' && (
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
                <p className="text-xs text-center text-slate-600">
                  Have a quick question? Try our <button onClick={() => setActiveTab('chat')} className="text-primary font-medium hover:underline">Chat Assistant</button> for instant help
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

