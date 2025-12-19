"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding, type OnboardingParticipant } from "@/lib/onboarding-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, Suspense } from "react";
import { ParticipantSelector } from "./_components/ParticipantSelector";
import { Snackbar } from "@/components/ui/Snackbar";
import { ConfiguredBadge } from "@/components/ui/ConfiguredBadge";
import { CSTeamDisplay } from "./_components/CSTeamDisplay";
import { HubTabs } from "./_components/HubTabs";
import { ProductDiscovery } from "./_components/ProductDiscovery";
import { CSAgentGrid } from "./_components/CSAgentGrid";
import { MeetingRequestForm } from "./_components/MeetingRequestForm";
import { TicketList, type Ticket } from "./_components/TicketList";
import { SubmitTicketModal, type NewTicketData } from "./_components/SubmitTicketModal";

// Contact Modal Component
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: 'Completed my onboarding',
    selectedDate: '',
    selectedTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Meeting scheduled for ${formData.selectedDate} at ${formData.selectedTime}. A YouConnect agent will contact you at ${formData.email}.`);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-border p-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Schedule Meeting with YouConnect</h2>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Your Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(555) 123-4567"
              className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="meeting-reason" className="block text-sm font-medium text-foreground mb-1">
              Reason for Meeting <span className="text-destructive">*</span>
            </label>
            <select
              id="meeting-reason"
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Completed my onboarding">Completed my onboarding</option>
              <option value="Need help with configuration">Need help with configuration</option>
              <option value="Questions about features">Questions about features</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="meeting-date" className="block text-sm font-medium text-foreground mb-1">
                Preferred Date <span className="text-destructive">*</span>
              </label>
              <input
                id="meeting-date"
                type="date"
                required
                value={formData.selectedDate}
                onChange={(e) => setFormData({ ...formData, selectedDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="meeting-time" className="block text-sm font-medium text-foreground mb-1">
                Preferred Time <span className="text-destructive">*</span>
              </label>
              <select
                id="meeting-time"
                required
                value={formData.selectedTime}
                onChange={(e) => setFormData({ ...formData, selectedTime: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a time</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] disabled:opacity-50 transition-all shadow-lg"
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function HubContent() {
  const { state, updateModuleAssignment, resetModuleProgress, getSectionConfigStatus, expressProductInterest } = useOnboarding();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"onboarding" | "products" | "support-tickets" | "customer-success">("onboarding");
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSubmitTicketModal, setShowSubmitTicketModal] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  // Sample tickets data
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "T-105",
      subject: "Property field configuration question",
      category: "Configuration Help",
      priority: "medium",
      status: "open",
      description: "I need help understanding which fields to enable for residential properties. Should I include flood zone for all properties or only certain types?",
      createdDate: "Dec 16, 2025",
      updatedDate: "Dec 16, 2025",
      assignedAgent: "Sarah Johnson",
    },
    {
      id: "T-104",
      subject: "Routing rule clarification needed",
      category: "Feature Question",
      priority: "high",
      status: "in-progress",
      description: "Need clarification on how routing rules prioritize between request type and assigned area. Which takes precedence?",
      createdDate: "Dec 15, 2025",
      updatedDate: "Dec 16, 2025",
      assignedAgent: "Emily Rodriguez",
      comments: [
        {
          id: "c1",
          author: "Emily Rodriguez",
          authorType: "agent",
          message: "Great question! Request Type routing takes precedence over Assigned Area. I'll send you a detailed guide on routing hierarchy.",
          timestamp: "Dec 16, 2025 10:30 AM",
        },
      ],
    },
    {
      id: "T-103",
      subject: "SSO integration setup assistance",
      category: "Technical Issue",
      priority: "urgent",
      status: "in-progress",
      description: "Having trouble uploading the SSO certificate. Getting an error message about invalid format. Using Azure AD.",
      createdDate: "Dec 15, 2025",
      updatedDate: "Dec 15, 2025",
      assignedAgent: "David Patterson",
      comments: [
        {
          id: "c1",
          author: "David Patterson",
          authorType: "agent",
          message: "I'm on it! Can you send me the certificate file? The format should be .cer or .pem. I'll help you get this resolved today.",
          timestamp: "Dec 15, 2025 2:15 PM",
        },
      ],
    },
    {
      id: "T-102",
      subject: "Training on vendor management",
      category: "Training Request",
      priority: "low",
      status: "resolved",
      description: "Would like to schedule a training session on how to best use the vendor management module and routing.",
      createdDate: "Dec 14, 2025",
      updatedDate: "Dec 15, 2025",
      assignedAgent: "Emily Rodriguez",
      comments: [
        {
          id: "c1",
          author: "Emily Rodriguez",
          authorType: "agent",
          message: "I've scheduled a training session for Dec 18 at 2 PM. You'll receive a calendar invite shortly. Looking forward to it!",
          timestamp: "Dec 15, 2025 9:00 AM",
        },
        {
          id: "c2",
          author: "John Smith",
          authorType: "user",
          message: "Perfect, thank you!",
          timestamp: "Dec 15, 2025 9:15 AM",
        },
      ],
    },
  ]);

  // Sync tab with URL params
  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab === 'products' || tab === 'support-tickets' || tab === 'customer-success') {
      setActiveTab(tab as "products" | "support-tickets" | "customer-success");
    } else if (tab === 'onboarding' || !tab) {
      setActiveTab('onboarding');
    }
  }, [searchParams]);

  // Target completion dates set by CS agent (same as edit-client page)
  const moduleTargetDates: Record<string, string> = {
    'organization-setup': '2025-12-01',
    'definitions': '2025-12-08',
    'users': '2025-12-15',
    'vendors': '2025-12-22',
    'routing': '2025-12-29',
    'general-settings': '2026-01-05',
    'it-checklist': '2026-02-12',
  };

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate days until go-live
  const getDaysUntilGoLive = () => {
    if (!state.projectedGoLiveDate) return null;
    const today = new Date();
    const goLiveDate = new Date(state.projectedGoLiveDate);
    const diffTime = goLiveDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilGoLive = getDaysUntilGoLive();

  // Get all participants (primary + additional)
  const allParticipants = useMemo(() => {
    const participants: OnboardingParticipant[] = [];
    if (state.companySetup.primaryDecisionMaker) {
      participants.push(state.companySetup.primaryDecisionMaker);
    }
    if (state.companySetup.additionalParticipants) {
      participants.push(...state.companySetup.additionalParticipants);
    }
    return participants;
  }, [state.companySetup.primaryDecisionMaker, state.companySetup.additionalParticipants]);

  // Calculate module progress based on step tracking
  const getModuleProgress = (moduleId: string) => {
    const progress = state.moduleProgress[moduleId];
    if (!progress) return 0;
    
    // Calculate percentage: (currentStep / totalSteps) * 100
    // If currentStep === totalSteps, they've completed all steps
    const percentage = Math.round((progress.currentStep / progress.totalSteps) * 100);
    return percentage;
  };

  // Get progress details for display
  const getProgressDetails = (moduleId: string) => {
    const progress = state.moduleProgress[moduleId];
    if (!progress) return null;
    
    return {
      currentStep: progress.currentStep,
      totalSteps: progress.totalSteps,
      percentage: Math.round((progress.currentStep / progress.totalSteps) * 100),
    };
  };

  // Handle module start - reset progress when starting a module
  const handleModuleStart = (modulePath: string, moduleId: string) => {
    resetModuleProgress(moduleId);
    router.push(modulePath);
  };

  // Generate initials for avatar
  const _getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Get assigned participants for a module
  const getModuleParticipants = (moduleId: string) => {
    const assignment = state.moduleAssignments?.find(a => a.moduleId === moduleId);
    return assignment?.assignedParticipantIds || ['primary-decision-maker'];
  };

  // Handle assignment with snackbar notification
  const handleAssignment = (moduleId: string, moduleTitle: string) => (selectedIds: string[]) => {
    updateModuleAssignment(moduleId, selectedIds);
    const participantNames = allParticipants
      .filter(p => selectedIds.includes(p.id))
      .map(p => p.name)
      .join(', ');
    setSnackbarMessage(`Participants assigned to ${moduleTitle}: ${participantNames}`);
    setShowSnackbar(true);
  };

  // Define the 6 modules
  const modules = [
    {
      id: 'organization-setup',
      moduleNumber: 1,
      title: 'Organization Setup',
      description: 'Set up organization info, branding, onboarding participants, and IT configuration',
      completed: state.companySetup.completed,
      path: '/organization-setup-intro',
      duration: '8 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'definitions',
      moduleNumber: 2,
      title: 'Definitions',
      description: 'Setup property categories, request types, and configure form fields',
      completed: state.definitions.completed,
      path: '/definitions-intro',
      duration: '18 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'users',
      moduleNumber: 3,
      title: 'Users Setup',
      description: 'Download template, fill in team details, and upload for CS team configuration',
      completed: state.users.completed,
      path: '/users-intro',
      duration: '5 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'vendors',
      moduleNumber: 4,
      title: 'Vendors Setup',
      description: 'Configure vendor types, credentials, classifications, search criteria, then upload template for CS team setup',
      completed: state.moduleStatuses['vendors'] === 'completed',
      path: '/vendors-intro',
      duration: '8 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'routing',
      moduleNumber: 5,
      title: 'Routing',
      description: 'Create routing rules to automatically assign orders (Request Type, Logical, Assigned Area)',
      completed: state.routing.completed,
      path: '/routing-intro',
      duration: '12 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      id: 'general-settings',
      moduleNumber: 6,
      title: 'General Settings',
      description: 'Configure workflow timers, notifications, and bid engagement panel settings',
      completed: state.generalSettings.completed,
      path: '/general-settings-intro',
      duration: '8 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'it-checklist',
      moduleNumber: 7,
      title: 'IT Readiness Checklist',
      description: 'Ensure your team can access YouConnect without technical issues',
      completed: state.itChecklist.completed,
      path: '/it-checklist-intro',
      duration: '2 min',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const completedModules = modules.filter(m => m.completed).length;
  const nextModule = modules.find(m => !m.completed);
  const module1Completed = modules[0].completed;
  
  // Handle ticket submission
  const handleSubmitTicket = (ticketData: NewTicketData) => {
    const newTicket: Ticket = {
      id: `T-${Date.now().toString().slice(-3)}`,
      subject: ticketData.subject,
      category: ticketData.category,
      priority: ticketData.priority,
      status: "open",
      description: ticketData.description,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      updatedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      assignedAgent: ticketData.assignedAgent === "auto" ? "Sarah Johnson" : ticketData.assignedAgent,
    };
    
    setTickets(prev => [newTicket, ...prev]);
    setSnackbarMessage(`Ticket ${newTicket.id} submitted successfully!`);
    setShowSnackbar(true);
  };
  
  // Determine status for each module based on assignment
  const getModuleStatus = (module: typeof modules[0], index: number) => {
    if (module.completed) return 'completed';
    
    // Check if current user is assigned to this module
    const currentUserId = 'primary-decision-maker'; // In real app, get from auth
    const moduleAssignment = state.moduleAssignments.find(a => a.moduleId === module.id);
    const isAssigned = moduleAssignment?.assignedParticipantIds.includes(currentUserId);
    
    // Module 1 is always ready for assigned users
    if (index === 0 && isAssigned) return 'ready';
    
    // For other modules: if module 1 is not complete, show as unassigned (not locked)
    // Users can see all modules but cannot start them if not assigned
    if (!module1Completed) return 'unassigned';
    
    // After module 1 is complete, check assignment
    if (isAssigned) return 'ready';
    return 'unassigned';
  };

  return (
    <MainLayout 
      currentStep={0} 
      steps={[]}
      title="YouConnect Onboarding Hub"
    >
      {/* Tabbed Navigation - Top Most */}
      <HubTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Onboarding Tab Content */}
        {activeTab === "onboarding" && (
          <>
            {/* Projected Go-Live Date Banner */}
            {state.projectedGoLiveDate && (
          <div className={`mb-6 rounded-xl p-4 border-2 ${
            daysUntilGoLive !== null && daysUntilGoLive < 0 
              ? 'bg-red-50 border-red-300'
              : daysUntilGoLive !== null && daysUntilGoLive <= 7 
              ? 'bg-orange-50 border-orange-300'
              : completedModules === modules.length
              ? 'bg-green-50 border-green-300'
              : 'bg-green-50 border-green-300'
          }`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  daysUntilGoLive !== null && daysUntilGoLive < 0 
                    ? 'bg-red-100'
                    : daysUntilGoLive !== null && daysUntilGoLive <= 7 
                    ? 'bg-orange-100'
                    : completedModules === modules.length
                    ? 'bg-green-100'
                    : 'bg-green-100'
                }`}>
                  <svg className={`w-6 h-6 ${
                    daysUntilGoLive !== null && daysUntilGoLive < 0 
                      ? 'text-red-600'
                      : daysUntilGoLive !== null && daysUntilGoLive <= 7 
                      ? 'text-orange-600'
                      : completedModules === modules.length
                      ? 'text-green-600'
                      : 'text-green-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">Projected Go-Live Date</div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-bold text-slate-900">
                      {new Date(state.projectedGoLiveDate).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      daysUntilGoLive !== null && daysUntilGoLive < 0 
                        ? 'bg-red-100 text-red-700'
                        : daysUntilGoLive !== null && daysUntilGoLive <= 7 
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {daysUntilGoLive !== null && daysUntilGoLive < 0 
                        ? 'Behind'
                        : daysUntilGoLive !== null && daysUntilGoLive <= 7 
                        ? 'Behind'
                        : completedModules === modules.length
                        ? 'On Track'
                        : 'On Track'
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {daysUntilGoLive !== null && (
                  <div className="text-right">
                    <div className="text-xs font-medium text-slate-600">Time Remaining</div>
                    <div className={`text-2xl font-bold ${
                      daysUntilGoLive < 0 
                        ? 'text-red-600'
                        : daysUntilGoLive <= 7 
                        ? 'text-orange-600'
                        : 'text-green-600'
                    }`}>
                      {daysUntilGoLive < 0 
                        ? `${Math.abs(daysUntilGoLive)} days overdue`
                        : daysUntilGoLive === 0
                        ? 'Today!'
                        : daysUntilGoLive === 1
                        ? '1 day'
                        : `${daysUntilGoLive} days`
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Next Step Hero Card (Combined Content + Video) */}
        {nextModule ? (
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Content */}
              <div>
                <div className="text-xs font-medium text-primary mb-2">YOUR NEXT STEP</div>
                
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    {nextModule.title}
                  </h1>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded">
                    Module {nextModule.moduleNumber}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {nextModule.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Estimated time: <strong>{nextModule.duration}</strong></span>
                </div>

                {/* Target Date */}
                {moduleTargetDates[nextModule.id] && (
                  <div className="flex items-center gap-2 text-xs mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-800 font-medium rounded-lg border border-blue-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Target: {formatDate(moduleTargetDates[nextModule.id])}
                    </span>
                  </div>
                )}

                {/* Participant Assignment for Next Module */}
                {allParticipants.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-muted-foreground">Assigned to:</span>
                    <ParticipantSelector
                      participants={allParticipants}
                      selectedIds={getModuleParticipants(nextModule.id)}
                      onChange={(ids) => updateModuleAssignment(nextModule.id, ids)}
                      moduleTitle={nextModule.title}
                    />
                  </div>
                )}

                <button
                  onClick={() => router.push(nextModule.path)}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] focus:outline-none focus:ring-4 focus:ring-[#9F2E2B]/30 transition-all shadow-lg hover:shadow-xl"
                >
                  I'm Ready, Let's Go! →
                </button>
              </div>

              {/* Right: Video Area */}
              <div className="relative bg-slate-100 rounded-xl overflow-hidden flex flex-col items-center justify-center min-h-[220px] p-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                  <svg className="w-6 h-6 text-[#9F2E2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1.5">Learn About This Module</h3>
                <p className="text-sm text-slate-600 text-center">
                  Watch a quick walkthrough of {nextModule.title}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* All Complete State */
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-primary rounded-xl p-8 mb-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                All Modules Complete!
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Excellent work! Your YouConnect instance is fully configured. A YouConnect agent will reach out to you to discuss next steps. In the meanwhile, check out what else you can do:
              </p>
            </div>

            {/* What Else You Can Do */}
            <div className="max-w-2xl mx-auto">
              {/* Schedule Meeting */}
              <div className="bg-white rounded-lg p-5 border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-1.5">
                      Want to reach out to a YouConnect agent?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Schedule a meeting to discuss your next steps, get personalized training, or ask any questions about your setup.
                    </p>
                    <button
                      onClick={() => setShowContactModal(true)}
                      className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg"
                    >
                      Schedule Meeting →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Modal */}
        <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />

        {/* All Modules - Accordion */}
        <div className="bg-card border border-border rounded-lg">
          {/* Accordion Header */}
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full p-4 border-b border-border flex items-center justify-between hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-foreground">
                All Modules
              </span>
              <span className="px-2 py-0.5 bg-muted rounded text-xs font-medium text-muted-foreground">
                {completedModules} of {modules.length} completed
              </span>
            </div>
            <svg 
              className={`w-4 h-4 text-muted-foreground transition-transform ${isAccordionOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Accordion Content */}
          {isAccordionOpen && (
            <div className="p-4 space-y-2.5">
              {modules.map((module, index) => {
                const status = getModuleStatus(module, index);
                const isUnassigned = status === 'unassigned';

                return (
                  <div 
                    key={module.id}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
                      module.completed 
                        ? 'bg-primary/5 border-primary/30' 
                        : isUnassigned
                        ? 'bg-muted/20 border-border opacity-60'
                        : 'bg-card border-border hover:border-primary/30'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      module.completed 
                        ? 'bg-primary text-primary-foreground' 
                        : isUnassigned
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {module.completed ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        module.icon
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title with badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <h3 className="font-semibold text-foreground text-sm">
                          {module.title}
                        </h3>
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                          Module {module.moduleNumber}
                        </span>
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded flex items-center gap-1 ${
                          status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : status === 'ready'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {status === 'completed' ? '✓ Completed' : status === 'ready' ? 'Ready' : (
                            <>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              Not Assigned
                            </>
                          )}
                        </span>
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded">
                          {module.duration}
                        </span>
                        {/* Target Date Badge */}
                        {moduleTargetDates[module.id] && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded border border-blue-300">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(moduleTargetDates[module.id])}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{module.description}</p>
                      
                      {/* CS Team Configured Sections */}
                      {(() => {
                        const configuredSections = [];
                        // Check for configured sections in this module
                        if (module.id === 'organization-setup') {
                          const orgStatus = getSectionConfigStatus('organization-setup-org-info');
                          const brandingStatus = getSectionConfigStatus('organization-setup-branding');
                          const itStatus = getSectionConfigStatus('organization-setup-it-config');
                          if (orgStatus.isConfigured) configuredSections.push({ name: 'Org Info', status: orgStatus });
                          if (brandingStatus.isConfigured) configuredSections.push({ name: 'Branding', status: brandingStatus });
                          if (itStatus.isConfigured) configuredSections.push({ name: 'IT Config', status: itStatus });
                        }
                        if (module.id === 'definitions') {
                          const propStatus = getSectionConfigStatus('definitions-property-categories');
                          const reqStatus = getSectionConfigStatus('definitions-request-types');
                          if (propStatus.isConfigured) configuredSections.push({ name: 'Properties', status: propStatus });
                          if (reqStatus.isConfigured) configuredSections.push({ name: 'Requests', status: reqStatus });
                        }
                        if (module.id === 'vendors') {
                          const vendorStatus = getSectionConfigStatus('vendors-vendor-types');
                          if (vendorStatus.isConfigured) configuredSections.push({ name: 'Vendor Setup', status: vendorStatus });
                        }
                        if (module.id === 'routing') {
                          const routingStatus = getSectionConfigStatus('routing-request-type-routing');
                          if (routingStatus.isConfigured) configuredSections.push({ name: 'Routing Rules', status: routingStatus });
                        }

                        if (configuredSections.length > 0) {
                          return (
                            <div className="mb-3 pb-3 border-b border-border">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-medium text-muted-foreground">CS Team Configured:</span>
                                {configuredSections.map((section, idx) => (
                                  <ConfiguredBadge
                                    key={idx}
                                    status={section.status}
                                    sectionName={section.name}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                      
                      {/* Progress Bar and Participant Assignment Row */}
                      <div className="flex items-center gap-4 flex-wrap">
                        {/* Progress Bar */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground">Progress:</span>
                          <div className="w-[200px] bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                module.completed ? 'bg-green-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${getModuleProgress(module.id)}%` } as React.CSSProperties}
                            />
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-foreground">{getModuleProgress(module.id)}%</span>
                            {getProgressDetails(module.id) && (
                              <span className="text-xs text-muted-foreground">
                                ({getProgressDetails(module.id)!.currentStep}/{getProgressDetails(module.id)!.totalSteps} steps)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Participant Assignment */}
                        {allParticipants.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Assigned:</span>
                            {module.id === 'organization-setup' ? (
                              // Module 1 - show read-only assignee (John Smith)
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg border border-border">
                                <div
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                                  style={{ backgroundColor: '#9F2E2B' }}
                                >
                                  JS
                                </div>
                                <span className="text-xs font-medium text-foreground">
                                  John Smith
                                </span>
                              </div>
                            ) : (
                              // Other modules - editable dropdown with Assign button (only if module 1 is complete)
                              <ParticipantSelector
                                participants={allParticipants}
                                selectedIds={getModuleParticipants(module.id)}
                                onChange={(ids) => updateModuleAssignment(module.id, ids)}
                                onAssign={handleAssignment(module.id, module.title)}
                                moduleTitle={module.title}
                                disabled={!module1Completed}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button - More Prominent */}
                    <div className="flex-shrink-0">
                      {module.completed ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/review/${module.id}`)}
                            className="px-4 py-2 text-sm font-medium text-muted-foreground bg-white border border-border rounded-lg hover:bg-accent hover:border-primary/30 transition-all"
                          >
                            Review
                          </button>
                          {status === 'ready' && (
                            <button
                              onClick={() => handleModuleStart(module.path, module.id)}
                              className="px-4 py-2 text-sm font-semibold text-secondary-foreground bg-white border-2 border-border rounded-lg hover:bg-accent hover:border-primary/30 transition-all shadow-sm hover:shadow"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      ) : isUnassigned ? (
                        <button
                          disabled
                          className="px-4 py-2 text-sm font-medium text-muted-foreground bg-muted rounded-lg cursor-not-allowed opacity-60"
                          title="You are not assigned to this module"
                        >
                          Not Assigned
                        </button>
                      ) : (
                        <button
                          onClick={() => handleModuleStart(module.path, module.id)}
                          className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg"
                        >
                          {getProgressDetails(module.id) ? 'Continue →' : 'Start →'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
          </>
        )}

        {/* Products Tab Content */}
        {activeTab === "products" && (
          <ProductDiscovery
            interestedProducts={state.productInterests}
            onExpressInterest={expressProductInterest}
          />
        )}

        {/* Support Tickets Tab Content */}
        {activeTab === "support-tickets" && (
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Support Tickets
              </h2>
              <p className="text-lg text-gray-600">
                View your support tickets and submit new ones. Our team typically responds within 2 hours.
              </p>
            </div>

            {/* Ticket List */}
            <TicketList 
              tickets={tickets} 
              onSubmitTicket={() => setShowSubmitTicketModal(true)} 
            />
          </div>
        )}

        {/* Customer Success Team Tab Content */}
        {activeTab === "customer-success" && (
          <div className="space-y-12">
            {/* Header - Center Aligned */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Your Customer Success Team
              </h2>
              <p className="text-lg text-gray-600">
                Meet your dedicated team of experts ready to support you throughout your onboarding journey and beyond.
              </p>
            </div>

            {/* Agent Grid */}
            <CSAgentGrid onRequestMeeting={() => {}} />

            {/* Meeting Request Section */}
            <div className="border-t border-gray-200 pt-12">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Schedule a Meeting
                  </h2>
                  <p className="text-gray-600">
                    Need personalized help? Schedule a meeting with your Customer Success team.
                  </p>
                </div>
                <MeetingRequestForm />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Snackbar Notifications */}
      <Snackbar
        message={snackbarMessage}
        isVisible={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        type="success"
      />

      {/* Submit Ticket Modal */}
      <SubmitTicketModal
        isOpen={showSubmitTicketModal}
        onClose={() => setShowSubmitTicketModal(false)}
        onSubmit={handleSubmitTicket}
      />
    </MainLayout>
  );
}

export default function HubPage() {
  return (
    <Suspense fallback={
      <MainLayout currentStep={0} steps={[]} title="YouConnect Onboarding Hub">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading hub...</p>
          </div>
        </div>
      </MainLayout>
    }>
      <HubContent />
    </Suspense>
  );
}
