"use client";

import { useState } from "react";

interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  email: string;
  phone: string;
  avatar: string;
  status: "available" | "away" | "busy";
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Senior Onboarding Specialist",
    specialization: "System Configuration & Setup",
    email: "sarah.johnson@realwired.com",
    phone: "(555) 123-4567",
    avatar: "SJ",
    status: "available",
  },
  {
    id: "2",
    name: "Missy Guillette",
    role: "Implementation Manager",
    specialization: "Workflow Design & Training",
    email: "missy.guillette@realwired.com",
    phone: "(555) 234-5678",
    avatar: "MG",
    status: "available",
  },
  {
    id: "3",
    name: "Sunda Scanlon",
    role: "Product Specialist",
    specialization: "Technical Integration",
    email: "sunda.scanlon@realwired.com",
    phone: "(555) 345-6789",
    avatar: "SS",
    status: "away",
  },
  {
    id: "4",
    name: "Michael Chen",
    role: "Customer Success Manager",
    specialization: "Account Management & Strategy",
    email: "michael.chen@realwired.com",
    phone: "(555) 456-7890",
    avatar: "MC",
    status: "available",
  },
];

interface CSAgentGridProps {
  onRequestMeeting: () => void;
}

export function CSAgentGrid({ onRequestMeeting }: CSAgentGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Show 3 agents at a time on desktop, 2 on tablet, 1 on mobile
  const cardsToShow = 3;
  const maxIndex = Math.max(0, agents.length - cardsToShow);

  const goToPrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
    }
  };

  const getStatusText = (status: Agent["status"]) => {
    switch (status) {
      case "available":
        return "Available";
      case "away":
        return "Away";
      case "busy":
        return "Busy";
    }
  };

  const visibleAgents = agents.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <div className="relative">
      {/* Agent Carousel Container */}
      <div className="relative px-12">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`
            absolute left-0 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full bg-white border-2 border-gray-300
            flex items-center justify-center
            transition-all duration-200
            ${currentIndex === 0 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-gray-50 hover:border-[#9F2E2B] hover:text-[#9F2E2B] shadow-md'
            }
          `}
          aria-label="Previous agents"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          disabled={currentIndex >= maxIndex}
          className={`
            absolute right-0 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full bg-white border-2 border-gray-300
            flex items-center justify-center
            transition-all duration-200
            ${currentIndex >= maxIndex 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-gray-50 hover:border-[#9F2E2B] hover:text-[#9F2E2B] shadow-md'
            }
          `}
          aria-label="Next agents"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {visibleAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-xl border-2 border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <div className="p-6">
                {/* Avatar */}
                <div className="relative mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9F2E2B] to-[#7a2320] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {agent.avatar}
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute bottom-0 right-1/4 transform translate-x-1/2">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(agent.status)} border-2 border-white`} />
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

                {/* Status Badge */}
                <div className="flex justify-center mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    agent.status === "available" 
                      ? "bg-green-100 text-green-800"
                      : agent.status === "away"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                    {getStatusText(agent.status)}
                  </span>
                </div>

                {/* Contact Actions - Always Visible */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm font-medium text-gray-700 hover:text-white hover:bg-[#9F2E2B] rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm font-medium text-gray-700 hover:text-white hover:bg-[#9F2E2B] rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Dots */}
      {agents.length > cardsToShow && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentIndex
                  ? "w-8 h-2 bg-[#9F2E2B] rounded-full"
                  : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
