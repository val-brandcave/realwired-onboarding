"use client";

import { useState } from "react";
import { AgentDetailsModal } from "./AgentDetailsModal";

interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  email: string;
  phone: string;
  avatar: string;
  bio?: string;
  joinDate?: string;
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Onboarding Manager",
    specialization: "System Configuration & Setup",
    email: "sarah.johnson@realwired.com",
    phone: "(555) 123-4567",
    avatar: "SJ",
    bio: "Sarah has over 8 years of experience in client onboarding and system implementation. She specializes in helping organizations transition smoothly to YouConnect.",
    joinDate: "January 2018",
  },
  {
    id: "2",
    name: "Emily Rodriguez",
    role: "Implementation Manager",
    specialization: "Workflow Design & Training",
    email: "emily.rodriguez@realwired.com",
    phone: "(555) 234-5678",
    avatar: "ER",
    bio: "Emily focuses on workflow optimization and training programs. She ensures your team gets the most out of YouConnect's features.",
    joinDate: "March 2019",
  },
  {
    id: "3",
    name: "David Patterson",
    role: "Product Specialist",
    specialization: "Technical Integration",
    email: "david.patterson@realwired.com",
    phone: "(555) 345-6789",
    avatar: "DP",
    bio: "David is our technical integration expert, helping clients connect YouConnect with their existing systems and APIs.",
    joinDate: "June 2020",
  },
  {
    id: "4",
    name: "Michael Chen",
    role: "Appraisal Specialist",
    specialization: "Account Management & Strategy",
    email: "michael.chen@realwired.com",
    phone: "(555) 456-7890",
    avatar: "MC",
    bio: "Michael brings deep appraisal industry knowledge and helps clients optimize their valuation workflows and vendor management.",
    joinDate: "September 2017",
  },
];

interface CSAgentGridProps {
  onRequestMeeting: () => void;
}

export function CSAgentGrid({ onRequestMeeting }: CSAgentGridProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Agent Grid - All agents visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className="bg-white rounded-xl border-2 border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-[#9F2E2B] transition-all duration-300 ease-out cursor-pointer text-left"
            >
              <div className="p-6">
                {/* Avatar */}
                <div className="relative mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9F2E2B] to-[#7a2320] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {agent.avatar}
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {agent.name}
                  </h3>
                  <p className="text-sm font-medium text-[#9F2E2B] mb-1">
                    {agent.role}
                  </p>
                  <p className="text-xs text-gray-600">
                    {agent.specialization}
                  </p>
                </div>

                {/* Contact Actions */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `mailto:${agent.email}`;
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm font-medium text-gray-700 hover:text-white hover:bg-[#9F2E2B] rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `tel:${agent.phone}`;
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm font-medium text-gray-700 hover:text-white hover:bg-[#9F2E2B] rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </div>
                </div>

                {/* View Details Hint */}
                <div className="mt-4 text-center text-xs text-gray-500 italic">
                  Click to view details
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Agent Details Modal */}
      {selectedAgent && (
        <AgentDetailsModal
          agent={selectedAgent}
          isOpen={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </>
  );
}
