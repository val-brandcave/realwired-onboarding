"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DonutChart } from '@/components/ui/DonutChart';
import { SmallDonut } from '@/components/ui/SmallDonut';

// Define module structure
interface ModuleStep {
  id: string;
  label: string;
  path: string;
}

interface Module {
  id: string;
  title: string;
  icon: React.ReactNode;
  steps: ModuleStep[];
}

const MODULES: Module[] = [
  {
    id: 'organization-setup',
    title: 'Organization Setup',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    steps: [
      { id: 'org-info', label: 'Organization Info & URL', path: 'org-info' },
      { id: 'branding', label: 'Branding', path: 'branding' },
      { id: 'participants', label: 'Onboarding Participants', path: 'participants' },
      { id: 'it-config', label: 'IT Configuration', path: 'it-config' },
    ]
  },
  {
    id: 'definitions',
    title: 'Definitions',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    steps: [
      { id: 'property-categories', label: 'Property Categories & Types', path: 'property-categories' },
      { id: 'property-fields', label: 'Property Record Fields', path: 'property-fields' },
      { id: 'request-types', label: 'Request Types Setup', path: 'request-types' },
      { id: 'request-form', label: 'Request Form Fields', path: 'request-form' },
    ]
  },
  {
    id: 'users',
    title: 'Users Setup',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    steps: [
      { id: 'users', label: 'Team Members', path: 'users' },
      { id: 'lending-groups', label: 'Lending Groups', path: 'lending-groups' },
    ]
  },
  {
    id: 'vendors',
    title: 'Vendors Setup',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    steps: [
      { id: 'vendor-types', label: 'Vendor Types & Credentials', path: 'vendor-types' },
      { id: 'vendor-classifications', label: 'Classifications', path: 'vendor-classifications' },
      { id: 'vendor-geography', label: 'Search Criteria', path: 'vendor-geography' },
      { id: 'vendor-upload', label: 'Upload Template', path: 'vendor-upload' },
    ]
  },
  {
    id: 'routing',
    title: 'Routing',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    steps: [
      { id: 'request-type-routing', label: 'Request Type Routing', path: 'request-type-routing' },
      { id: 'logical-routing', label: 'Logical Routing', path: 'logical-routing' },
      { id: 'assigned-area', label: 'Assigned Area', path: 'assigned-area' },
    ]
  },
  {
    id: 'general-settings',
    title: 'General Settings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    steps: [
      { id: 'workflow-timers', label: 'Workflow & Timers', path: 'workflow-timers' },
      { id: 'notifications', label: 'Notifications', path: 'notifications' },
      { id: 'bid-engagement', label: 'Bid & Engagement Panel', path: 'bid-engagement' },
    ]
  },
  {
    id: 'it-checklist',
    title: 'IT Readiness',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    steps: [
      { id: 'it-checklist', label: 'IT Checklist', path: 'it-checklist' },
      { id: 'security-compliance', label: 'Security & Compliance', path: 'security-compliance' },
    ]
  }
];

function ClientOnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState('organization-setup');
  const [selectedStepId, setSelectedStepId] = useState('org-info');
  const [showNotifications, setShowNotifications] = useState(false);
  
  const orgName = searchParams.get('org') || 'New Organization';
  const contactName = searchParams.get('contact') || '';
  const contactEmail = searchParams.get('email') || '';
  const projectedGoLiveDate = searchParams.get('goLiveDate') || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  // Go-Live Date Edit Modal
  const [showDateEditModal, setShowDateEditModal] = useState(false);
  const [tempGoLiveDate, setTempGoLiveDate] = useState(projectedGoLiveDate);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>(['member-1', 'member-2', 'member-3']);
  const [teamSearchQuery, setTeamSearchQuery] = useState('');

  // CS Team Members Data
  const availableCSTeam = [
    { id: 'member-1', name: 'Sarah Johnson', role: 'Senior CS Manager', phone: '(555) 123-4567', email: 'sarah.j@youconnect.com', avatar: 'SJ', color: 'from-blue-500 to-blue-600' },
    { id: 'member-2', name: 'Mike Chen', role: 'CS Specialist', phone: '(555) 234-5678', email: 'mike.c@youconnect.com', avatar: 'MC', color: 'from-green-500 to-green-600' },
    { id: 'member-3', name: 'Emma Davis', role: 'CS Agent', phone: '(555) 345-6789', email: 'emma.d@youconnect.com', avatar: 'ED', color: 'from-purple-500 to-purple-600' },
    { id: 'member-4', name: 'James Wilson', role: 'Technical Onboarding', phone: '(555) 456-7890', email: 'james.w@youconnect.com', avatar: 'JW', color: 'from-orange-500 to-orange-600' },
    { id: 'member-5', name: 'Lisa Brown', role: 'Account Manager', phone: '(555) 567-8901', email: 'lisa.b@youconnect.com', avatar: 'LB', color: 'from-pink-500 to-pink-600' },
    { id: 'member-6', name: 'David Miller', role: 'CS Agent', phone: '(555) 678-9012', email: 'david.m@youconnect.com', avatar: 'DM', color: 'from-indigo-500 to-indigo-600' },
    { id: 'member-7', name: 'Rachel Green', role: 'Senior CS Manager', phone: '(555) 789-0123', email: 'rachel.g@youconnect.com', avatar: 'RG', color: 'from-teal-500 to-teal-600' },
  ];

  const filteredTeamMembers = availableCSTeam.filter(member =>
    member.name.toLowerCase().includes(teamSearchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(teamSearchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(teamSearchQuery.toLowerCase())
  );

  const toggleTeamMember = (memberId: string) => {
    setSelectedTeamMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  // Module target completion dates (same as edit-client)
  const [moduleCompletionDates, setModuleCompletionDates] = useState<Record<string, string>>({
    'organization-setup': '2025-12-01',
    'definitions': '2025-12-08',
    'users': '2025-12-15',
    'vendors': '2025-12-22',
    'routing': '2025-12-29',
    'general-settings': '2026-01-05',
    'it-checklist': '2026-02-12',
  });

  // Modal state for setting module completion dates
  const [showModuleDateModal, setShowModuleDateModal] = useState(false);
  const [selectedModuleForDate, setSelectedModuleForDate] = useState<typeof MODULES[0] | null>(null);
  const [tempModuleDate, setTempModuleDate] = useState('');

  const unreadCount = 0; // New client, no notifications yet

  const selectedModule = MODULES.find(m => m.id === selectedModuleId) || MODULES[0];

  // Helper functions
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleOpenDateModal = (module: typeof MODULES[0]) => {
    setSelectedModuleForDate(module);
    setTempModuleDate(moduleCompletionDates[module.id] || '');
    setShowModuleDateModal(true);
  };

  const handleSaveModuleDate = () => {
    if (selectedModuleForDate && tempModuleDate) {
      setModuleCompletionDates(prev => ({
        ...prev,
        [selectedModuleForDate.id]: tempModuleDate
      }));
      setShowModuleDateModal(false);
      setSelectedModuleForDate(null);
      setTempModuleDate('');
    }
  };

  const handleCloseModuleDateModal = () => {
    setShowModuleDateModal(false);
    setSelectedModuleForDate(null);
    setTempModuleDate('');
  };

  const handleSignOut = () => {
    router.push('/');
  };

  const handleBackToList = () => {
    router.push('/cs-portal');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Back Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back to List</span>
              </button>
              
              <div className="h-8 w-px bg-slate-300" />
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img 
                    src="/realwired-logo.png" 
                    alt="RealWired Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">YouConnect</h1>
                  <p className="text-xs text-slate-500">CS Agent Portal</p>
                </div>
              </div>
            </div>

            {/* Notification Bell & Profile */}
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:ring-offset-1"
                  aria-label="User menu"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                    SK
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-slate-900">Samuel Kite</p>
                    <p className="text-xs text-slate-500">CS Agent</p>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-slate-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                            SK
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              Samuel Kite
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              samuel.kite@realwired.com
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={() => {
                            console.log('Opening settings...');
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Settings</span>
                        </button>
                      </div>

                      {/* Sign Out Section */}
                      <div className="border-t border-slate-200 pt-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: "CS Portal", href: "/cs-portal" },
        { label: orgName || "Client Onboarding" },
      ]} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Module Navigation */}
        <aside className="bg-white border-r border-slate-200 overflow-y-auto" style={{ width: '288px' }}>
          <div className="p-4">
            {/* Client Completion Status - Moved to Top */}
            <div className="pb-4 mb-6 border-b border-slate-200">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Onboarding Progress
              </h2>
              <div className="flex justify-center">
                <DonutChart 
                  percentage={0} 
                  size={100} 
                  strokeWidth={10}
                  label="Complete"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs text-slate-600">
                  0 of {MODULES.length} modules completed
                </p>
              </div>
            </div>

            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Onboarding Modules
            </h2>
            <nav className="space-y-1 mb-6">
              {MODULES.map((module) => {
                const isSelected = selectedModuleId === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => {
                      setSelectedModuleId(module.id);
                      setSelectedStepId(module.steps[0].id);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-[#9F2E2B] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {module.icon}
                    <span className="truncate flex-1 text-left">{module.title}</span>
                    <div className="flex-shrink-0 ml-auto">
                      <SmallDonut 
                        percentage={0}
                        size={24}
                        strokeWidth={2.5}
                        showLabel={false}
                        color={isSelected ? "#FFFFFF" : "#9F2E2B"}
                        backgroundColor={isSelected ? "#7D2522" : "#E5E7EB"}
                      />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6 lg:p-8">
            {/* Organization Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{orgName}</h1>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                {/* Primary Contact */}
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Primary Contact: {contactName}</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{contactEmail}</span>
                </div>

                {/* Go Live Date */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Go Live:</span>
                  <span className="font-medium text-slate-900">
                    {new Date(projectedGoLiveDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  <button
                    onClick={() => setShowDateEditModal(true)}
                    className="p-1 hover:bg-slate-100 rounded transition-colors"
                    title="Edit go-live date"
                  >
                    <svg className="w-4 h-4 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>

                {/* CS Team Avatars */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">CS Team:</span>
                  <div className="flex items-center -space-x-2">
                    {selectedTeamMembers.slice(0, 3).map((memberId) => {
                      const member = availableCSTeam.find(m => m.id === memberId);
                      if (!member) return null;
                      return (
                        <div 
                          key={member.id}
                          className={`w-7 h-7 rounded-full bg-gradient-to-br ${member.color} border-2 border-white flex items-center justify-center text-white text-xs font-semibold`}
                          title={member.name}
                        >
                          {member.avatar}
                        </div>
                      );
                    })}
                    {selectedTeamMembers.length > 3 && (
                      <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-slate-600 text-xs font-semibold" title={`${selectedTeamMembers.length - 3} more team members`}>
                        +{selectedTeamMembers.length - 3}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setShowTeamModal(true)}
                    className="p-1 hover:bg-slate-100 rounded transition-colors"
                    title="Manage CS team"
                  >
                    <svg className="w-4 h-4 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Module Header with Target Date */}
            <div className="mb-6 bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#9F2E2B] rounded-xl flex items-center justify-center text-white shadow-md">
                    {selectedModule.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedModule.title}</h2>
                    <p className="text-sm text-slate-600 mt-0.5">
                      {selectedModule.steps.length} Steps • Waiting for client
                    </p>
                  </div>
                </div>
                
                {/* Target Date Display/Edit */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-1">Target Completion</p>
                    <div className="flex items-center gap-2">
                      {moduleCompletionDates[selectedModule.id] ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-lg border border-blue-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(moduleCompletionDates[selectedModule.id])}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-500 italic">No date set</span>
                      )}
                      <button
                        onClick={() => handleOpenDateModal(selectedModule)}
                        className="p-2 text-slate-600 hover:text-[#9F2E2B] hover:bg-white rounded-lg border border-slate-300 hover:border-[#9F2E2B] transition-colors"
                        title="Set target date"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module Steps Tabs */}
            <div className="mb-6">
              <div className="border-b border-slate-200">
                <nav className="flex gap-2 -mb-px overflow-x-auto">
                  {selectedModule.steps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setSelectedStepId(step.id)}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        selectedStepId === step.id
                          ? 'border-[#9F2E2B] text-[#9F2E2B]'
                          : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      {step.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content - Empty State */}
            <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-12">
              <div className="text-center max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Waiting for Client Input
                </h3>
                <p className="text-slate-600 mb-6">
                  The client needs to fill out this section. You&apos;ll be able to review and assist once they provide their information.
                </p>
                <div className="flex items-center justify-center">
                  <button className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg">
                    Send Reminder
                  </button>
                </div>
              </div>
            </div>

            {/* Helper Info */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">CS Agent Tip</h4>
                <p className="text-sm text-blue-800">
                  You can navigate between modules using the left sidebar. Each tab represents a step the client needs to complete. Use &quot;Send Reminder&quot; to prompt the client to fill out their information.
                </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Notification Slide-out Panel */}
      {showNotifications && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowNotifications(false)} />
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50">
            <div className="border-b border-slate-200 p-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
                <p className="text-xs text-slate-600">0 unread</p>
              </div>
              <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600" aria-label="Close notifications">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-80px)]">
              <div className="text-center py-12 px-4">
                <svg className="w-16 h-16 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p className="text-sm text-slate-600">No notifications yet</p>
                <p className="text-xs text-slate-500 mt-1">You&apos;ll be notified when the client takes action</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Go-Live Date Edit Modal */}
      {showDateEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="border-b border-slate-200 p-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Edit Projected Go-Live Date</h2>
              <button
                onClick={() => setShowDateEditModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="edit-go-live-date" className="block text-sm font-semibold text-slate-700 mb-2">
                  Projected Go-Live Date <span className="text-red-600">*</span>
                </label>
                <input
                  id="edit-go-live-date"
                  type="date"
                  value={tempGoLiveDate}
                  onChange={(e) => setTempGoLiveDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
                />
                <p className="text-xs text-slate-500 mt-2">
                  This date will be visible to the client throughout their onboarding process
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-blue-900">
                    Adjusting this date will update the timeline shown to {orgName} and affect their tracking status.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowDateEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDateEditModal(false);
                    alert(`Go-Live date updated to ${new Date(tempGoLiveDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. This will be reflected across the client list and client hub.`);
                  }}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md"
                >
                  Update Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module Completion Date Modal */}
      {showModuleDateModal && selectedModuleForDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  {selectedModuleForDate.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Set Target Date</h3>
                  <p className="text-xs text-slate-500">{selectedModuleForDate.title}</p>
                </div>
              </div>
              <button
                onClick={handleCloseModuleDateModal}
                className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Info Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Go-Live Date:</strong> {formatDate(projectedGoLiveDate)}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Set realistic target dates to ensure modules are completed before go-live.
                </p>
              </div>

              {/* Current Date Display */}
              {moduleCompletionDates[selectedModuleForDate.id] && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-600 mb-1">Currently Set To:</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatDate(moduleCompletionDates[selectedModuleForDate.id])}
                  </p>
                </div>
              )}

              {/* Date Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Target Completion Date
                </label>
                <input
                  type="date"
                  value={tempModuleDate}
                  onChange={(e) => setTempModuleDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-slate-900"
                />
                <p className="text-xs text-slate-500">
                  Select a date between today and the go-live date.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={handleCloseModuleDateModal}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModuleDate}
                disabled={!tempModuleDate}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Set Target Date
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Go-Live Date Edit Modal */}
      {showDateEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="border-b border-slate-200 p-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Edit Projected Go-Live Date</h2>
              <button
                onClick={() => setShowDateEditModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="edit-go-live-date" className="block text-sm font-semibold text-slate-700 mb-2">
                  Projected Go-Live Date <span className="text-red-600">*</span>
                </label>
                <input
                  id="edit-go-live-date"
                  type="date"
                  value={tempGoLiveDate}
                  onChange={(e) => setTempGoLiveDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
                />
                <p className="text-xs text-slate-500 mt-2">
                  This date will be visible to the client throughout their onboarding process
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowDateEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDateEditModal(false);
                  }}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md"
                >
                  Update Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CS Team Selection Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="border-b border-slate-200 p-5 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Manage CS Team</h2>
                <p className="text-sm text-slate-600 mt-1">Assign team members to this client</p>
              </div>
              <button
                onClick={() => setShowTeamModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-5 border-b border-slate-200 flex-shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={teamSearchQuery}
                  onChange={(e) => setTeamSearchQuery(e.target.value)}
                  placeholder="Search by name, role, or email..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {selectedTeamMembers.length} member{selectedTeamMembers.length !== 1 ? 's' : ''} selected
              </p>
            </div>

            {/* Team Members List */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="space-y-2">
                {filteredTeamMembers.length > 0 ? (
                  filteredTeamMembers.map((member) => {
                    const isSelected = selectedTeamMembers.includes(member.id);
                    return (
                      <label
                        key={member.id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#9F2E2B] bg-[#9F2E2B]/5'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleTeamMember(member.id)}
                          className="w-4 h-4 text-[#9F2E2B] border-slate-300 rounded focus:ring-[#9F2E2B]"
                        />
                        
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.color} border-2 border-white flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                          {member.avatar}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-900">{member.name}</div>
                          <div className="text-xs text-slate-600">{member.role}</div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {member.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm">No team members found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-5 flex items-center justify-end gap-3 flex-shrink-0">
              <button
                onClick={() => {
                  setShowTeamModal(false);
                  setTeamSearchQuery('');
                }}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowTeamModal(false);
                  setTeamSearchQuery('');
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md"
              >
                Save Team Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientOnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
      <ClientOnboardingContent />
    </Suspense>
  );
}

