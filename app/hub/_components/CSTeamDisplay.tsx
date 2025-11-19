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

// Sample CS Team data - in real app, this would come from context/API
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
  {
    id: 'cs-3',
    name: 'David Chen',
    role: 'Technical Support Lead',
    email: 'david.chen@realwired.com',
    phone: '(555) 345-6789',
    avatarColor: '#10B981',
  },
  {
    id: 'cs-4',
    name: 'Maria Rodriguez',
    role: 'Onboarding Specialist',
    email: 'maria.r@realwired.com',
    phone: '(555) 456-7890',
    avatarColor: '#F59E0B',
  },
];

export function CSTeamDisplay() {
  const [csTeam] = useState<CSTeamMember[]>(defaultCSTeam);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CSTeamMember | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleContact = (member: CSTeamMember) => {
    setSelectedMember(member);
    setShowContactModal(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 2 >= csTeam.length ? 0 : prev + 2));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? csTeam.length - 2 : prev - 2));
  };

  // Get visible members (2 at a time for carousel)
  const visibleMembers = csTeam.slice(currentIndex, currentIndex + 2);

  return (
    <>
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Your Customer Success Team</h2>
            <p className="text-sm text-muted-foreground">We're here to help you succeed</p>
          </div>
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={csTeam.length <= 2}
            aria-label="Previous team members"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex-1 flex items-center justify-center gap-2">
            {Array.from({ length: Math.ceil(csTeam.length / 2) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * 2)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === idx * 2 ? 'bg-primary' : 'bg-slate-300'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={csTeam.length <= 2}
            aria-label="Next team members"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-primary/30 transition-colors"
            >
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                style={{ backgroundColor: member.avatarColor }}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{member.role}</p>
                
                <div className="space-y-1">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {member.email}
                  </a>
                  
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {member.phone}
                    </a>
                  )}
                </div>
              </div>

              {/* Contact Button - FIXED HOVER CONTRAST */}
              <button
                onClick={() => handleContact(member)}
                className="px-3 py-1.5 text-xs font-semibold text-primary bg-white border-2 border-primary rounded-lg hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
              >
                Contact
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Contact {selectedMember.name}</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: selectedMember.avatarColor }}
                >
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedMember.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMember.role}</p>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">{selectedMember.email}</p>
                  </div>
                </a>

                {selectedMember.phone && (
                  <a
                    href={`tel:${selectedMember.phone}`}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium text-foreground">{selectedMember.phone}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-border">
              <button
                onClick={() => setShowContactModal(false)}
                className="w-full px-4 py-2.5 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

