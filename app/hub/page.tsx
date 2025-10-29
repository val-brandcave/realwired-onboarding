"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding, type OnboardingParticipant } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { ParticipantSelector } from "./_components/ParticipantSelector";
import { Snackbar } from "@/components/ui/Snackbar";

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

export default function HubPage() {
  const { state, updateModuleAssignment, resetModuleProgress } = useOnboarding();
  const router = useRouter();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

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
      description: 'Download template, fill in team details, and upload for CX team configuration',
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
      description: 'Download template, configure vendor network, and upload for CX team setup',
      completed: state.moduleStatuses['vendors'] === 'completed',
      path: '/vendors-intro',
      duration: '5 min',
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
  
  // Determine status for each module
  const getModuleStatus = (module: typeof modules[0], index: number) => {
    if (module.completed) return 'completed';
    // Module 1 is always ready
    if (index === 0) return 'ready';
    // All other modules are locked until module 1 is complete
    if (!module1Completed) return 'locked';
    // After module 1 is complete, all modules are unlocked
    return 'ready';
  };

  return (
    <MainLayout 
      currentStep={0} 
      steps={[]}
      title="YouConnect Onboarding Hub"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                const isLocked = status === 'locked';

                return (
                  <div 
                    key={module.id}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
                      module.completed 
                        ? 'bg-primary/5 border-primary/30' 
                        : isLocked
                        ? 'bg-muted/20 border-border opacity-50'
                        : 'bg-card border-border hover:border-primary/30'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      module.completed 
                        ? 'bg-primary text-primary-foreground' 
                        : isLocked
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
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {status === 'completed' ? '✓ Completed' : status === 'ready' ? 'Ready' : (
                            <>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                              Locked
                            </>
                          )}
                        </span>
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded">
                          {module.duration}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{module.description}</p>
                      
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
                        <button
                          onClick={() => handleModuleStart(module.path, module.id)}
                          className="px-4 py-2 text-sm font-semibold text-secondary-foreground bg-white border-2 border-border rounded-lg hover:bg-accent hover:border-primary/30 transition-all shadow-sm hover:shadow"
                        >
                          Edit
                        </button>
                      ) : isLocked ? (
                        <button
                          disabled
                          className="p-2 text-muted-foreground bg-muted rounded-lg cursor-not-allowed opacity-60"
                          title="Module locked"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
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
      </div>

      {/* Snackbar Notifications */}
      <Snackbar
        message={snackbarMessage}
        isVisible={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        type="success"
      />
    </MainLayout>
  );
}
