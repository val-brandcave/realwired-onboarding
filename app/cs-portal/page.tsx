"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Snackbar } from '@/components/ui/Snackbar';

// Sample client data
interface Client {
  id: string;
  name: string;
  initiationDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
  progress: number;
  dueDate: string;
  projectedGoLiveDate: string;
  tickets: number;
}

// Calculate status heat based on progress vs time
function getStatusHeat(progress: number, initiationDate: string, projectedGoLiveDate: string): 'hot' | 'warm' | 'cold' {
  const today = new Date();
  const start = new Date(initiationDate);
  const end = new Date(projectedGoLiveDate);
  
  const totalDuration = end.getTime() - start.getTime();
  const elapsedTime = today.getTime() - start.getTime();
  const expectedProgress = (elapsedTime / totalDuration) * 100;
  
  // If actual progress is significantly behind expected progress
  if (progress < expectedProgress - 15) return 'hot'; // More than 15% behind
  if (progress < expectedProgress - 5) return 'warm'; // 5-15% behind
  return 'cold'; // On track or ahead
}

const SAMPLE_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Union Bank',
    initiationDate: '2024-10-28',
    status: 'In Progress',
    progress: 35,
    dueDate: '2024-11-25',
    projectedGoLiveDate: '2026-02-12',
    tickets: 3
  },
  {
    id: '2',
    name: 'First National Credit Union',
    initiationDate: '2024-09-15',
    status: 'In Progress',
    progress: 75,
    dueDate: '2024-11-10',
    projectedGoLiveDate: '2024-12-05',
    tickets: 2
  },
  {
    id: '3',
    name: 'Coastal Community Bank',
    initiationDate: '2024-08-20',
    status: 'Completed',
    progress: 100,
    dueDate: '2024-10-15',
    projectedGoLiveDate: '2024-11-01',
    tickets: 0
  },
  {
    id: '4',
    name: 'Metro Financial Services',
    initiationDate: '2024-10-01',
    status: 'In Progress',
    progress: 25,
    dueDate: '2024-11-20',
    projectedGoLiveDate: '2026-02-12',
    tickets: 5
  },
  {
    id: '5',
    name: 'Heritage Savings Bank',
    initiationDate: '2024-09-05',
    status: 'On Hold',
    progress: 45,
    dueDate: '2024-11-10',
    projectedGoLiveDate: '2025-01-30',
    tickets: 8
  },
  {
    id: '6',
    name: 'Pacific Northwest Bank',
    initiationDate: '2024-10-10',
    status: 'In Progress',
    progress: 30,
    dueDate: '2024-11-28',
    projectedGoLiveDate: '2024-12-19',
    tickets: 1
  },
  {
    id: '7',
    name: 'Sunrise Credit Union',
    initiationDate: '2024-09-20',
    status: 'In Progress',
    progress: 85,
    dueDate: '2024-11-05',
    projectedGoLiveDate: '2024-11-25',
    tickets: 1
  },
  {
    id: '8',
    name: 'Valley Trust Bank',
    initiationDate: '2024-10-22',
    status: 'Not Started',
    progress: 5,
    dueDate: '2024-12-05',
    projectedGoLiveDate: '2025-02-15',
    tickets: 0
  },
  {
    id: '9',
    name: 'Riverside Financial Group',
    initiationDate: '2024-08-15',
    status: 'Completed',
    progress: 100,
    dueDate: '2024-10-10',
    projectedGoLiveDate: '2024-10-28',
    tickets: 0
  },
  {
    id: '10',
    name: 'Mountain View Community Bank',
    initiationDate: '2024-09-25',
    status: 'In Progress',
    progress: 50,
    dueDate: '2024-11-15',
    projectedGoLiveDate: '2024-12-30',
    tickets: 4
  },
  {
    id: '11',
    name: 'Lakeside Banking Corporation',
    initiationDate: '2024-10-25',
    status: 'Not Started',
    progress: 8,
    dueDate: '2024-12-10',
    projectedGoLiveDate: '2025-02-20',
    tickets: 0
  },
  {
    id: '12',
    name: 'Central City Credit Union',
    initiationDate: '2024-09-10',
    status: 'In Progress',
    progress: 90,
    dueDate: '2024-11-08',
    projectedGoLiveDate: '2024-11-22',
    tickets: 1
  },
  {
    id: '13',
    name: 'Gateway Financial Services',
    initiationDate: '2024-08-10',
    status: 'Completed',
    progress: 100,
    dueDate: '2024-10-05',
    projectedGoLiveDate: '2024-10-20',
    tickets: 0
  },
  {
    id: '14',
    name: 'Evergreen Savings Bank',
    initiationDate: '2024-10-05',
    status: 'In Progress',
    progress: 40,
    dueDate: '2024-11-22',
    projectedGoLiveDate: '2025-01-10',
    tickets: 3
  },
  {
    id: '15',
    name: 'Summit Trust Company',
    initiationDate: '2024-10-28',
    status: 'Not Started',
    progress: 2,
    dueDate: '2024-12-15',
    projectedGoLiveDate: '2025-03-01',
    tickets: 0
  }
];

interface Notification {
  id: string;
  type: 'ticket' | 'progress' | 'completion';
  title: string;
  message: string;
  timestamp: string;
  clientName: string;
  read: boolean;
}

export default function CSPortalPage() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [newClientData, setNewClientData] = useState({
    orgName: '',
    contactName: '',
    contactEmail: '',
    projectedGoLiveDate: ''
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'ticket', title: 'New Ticket', message: 'Union Bank created ticket TKT-001', timestamp: '2024-10-28T10:30:00', clientName: 'Union Bank', read: false },
    { id: '2', type: 'completion', title: 'Module Completed', message: 'Coastal Community Bank completed Organization Setup', timestamp: '2024-10-28T09:00:00', clientName: 'Coastal Community Bank', read: false },
    { id: '3', type: 'progress', title: 'Progress Update', message: 'Metro Financial Services reached 50% completion', timestamp: '2024-10-27T15:30:00', clientName: 'Metro Financial', read: true },
  ]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isAtRiskExpanded, setIsAtRiskExpanded] = useState(false);
  const itemsPerPage = 10;

  // Filter clients by active/completed
  const activeClients = SAMPLE_CLIENTS.filter(c => c.progress < 100);
  const completedClients = SAMPLE_CLIENTS.filter(c => c.progress === 100);
  const displayedClients = activeTab === 'active' ? activeClients : completedClients;

  // Calculate pagination
  const totalPages = Math.ceil(displayedClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = displayedClients.slice(startIndex, endIndex);

  // Dashboard metrics
  const atRiskClients = activeClients.filter(c => {
    const heat = getStatusHeat(c.progress, c.initiationDate, c.projectedGoLiveDate);
    return heat === 'hot' || c.progress < 25; // Behind schedule or stuck on early modules
  });

  const avgCompletion = Math.round(
    activeClients.reduce((acc, c) => acc + c.progress, 0) / activeClients.length
  );

  const thisMonthGoLives = SAMPLE_CLIENTS.filter(c => {
    const goLiveDate = new Date(c.projectedGoLiveDate);
    const now = new Date();
    return goLiveDate.getMonth() === now.getMonth() && goLiveDate.getFullYear() === now.getFullYear();
  }).length;

  // Module completion funnel data (mock)
  const moduleStages = [
    { name: 'Organization Setup', count: 15, percentage: 100 },
    { name: 'Property Records', count: 13, percentage: 87 },
    { name: 'Request Forms', count: 11, percentage: 73 },
    { name: 'Bid Panels', count: 9, percentage: 60 },
    { name: 'Definitions', count: 6, percentage: 40 },
    { name: 'User Management', count: 3, percentage: 20 },
  ];

  // Upcoming go-lives (next 2 weeks)
  const upcomingGoLives = SAMPLE_CLIENTS
    .filter(c => {
      const goLiveDate = new Date(c.projectedGoLiveDate);
      const now = new Date();
      const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      return goLiveDate >= now && goLiveDate <= twoWeeksFromNow && c.progress < 100;
    })
    .sort((a, b) => new Date(a.projectedGoLiveDate).getTime() - new Date(b.projectedGoLiveDate).getTime())
    .slice(0, 5);

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'On Hold':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Not Started':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleSignOut = () => {
    router.push('/');
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    // Close modal
    setIsAddModalOpen(false);
    // Show snackbar
    setSnackbarMessage(`Onboarding email sent to ${newClientData.contactName} at ${newClientData.contactEmail}`);
    setShowSnackbar(true);
    // Navigate to the new org onboarding page with the org name
    setTimeout(() => {
      router.push(`/cs-portal/client-onboarding?org=${encodeURIComponent(newClientData.orgName)}&contact=${encodeURIComponent(newClientData.contactName)}&email=${encodeURIComponent(newClientData.contactEmail)}&goLiveDate=${encodeURIComponent(newClientData.projectedGoLiveDate)}`);
    }, 1500);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setNewClientData({ orgName: '', contactName: '', contactEmail: '', projectedGoLiveDate: '' });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
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
                <p className="text-xs text-slate-500">Onboarding Portal</p>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Client Onboarding Dashboard
            </h1>
            <p className="text-slate-600">
              Monitor onboarding progress, identify at-risk clients, and track key metrics across all active onboardings.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add New Client</span>
          </button>
        </div>

        {/* Row 1: Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Clients */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +2 this month
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{activeClients.length}</div>
            <div className="text-sm text-slate-600">Active Onboarding Clients</div>
          </div>

          {/* Average Completion */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="w-16 h-16">
                <svg viewBox="0 0 36 36" className="transform -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="16" 
                    fill="none" 
                    stroke="#9F2E2B" 
                    strokeWidth="3"
                    strokeDasharray={`${avgCompletion * 1.005}, 100.5`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{avgCompletion}%</div>
            <div className="text-sm text-slate-600">Average Completion Rate</div>
          </div>

          {/* This Month's Go-Lives */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-slate-500">November 2024</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{thisMonthGoLives}</div>
            <div className="text-sm text-slate-600">Scheduled Go-Lives</div>
          </div>

          {/* At-Risk Clients */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              {atRiskClients.length > 0 && (
                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  Needs Attention
                </span>
              )}
            </div>
            <div className="text-3xl font-bold text-red-600 mb-1">{atRiskClients.length}</div>
            <div className="text-sm text-slate-600">At-Risk Clients</div>
          </div>
        </div>

        {/* Row 2: At-Risk Clients Accordion */}
        {atRiskClients.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            {/* Accordion Header - Always Visible */}
            <button
              onClick={() => setIsAtRiskExpanded(!isAtRiskExpanded)}
              className="w-full border-b border-slate-200 px-6 py-4 bg-red-50 hover:bg-red-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h2 className="text-lg font-bold text-slate-900">At-Risk Clients</h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-600 text-white">
                    {atRiskClients.length}
                  </span>
                  <span className="text-sm text-slate-600">need attention</span>
                </div>
                <div className="flex items-center gap-2">
                  {!isAtRiskExpanded && atRiskClients.length > 0 && (
                    <span className="text-xs font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                      {atRiskClients.length} behind schedule
                    </span>
                  )}
                  <svg 
                    className={`w-5 h-5 text-slate-600 transition-transform ${isAtRiskExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>
            
            {/* Accordion Content - Expandable */}
            {isAtRiskExpanded && (
              <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Bank Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Days Behind</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Stuck Module</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Completion</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">CS Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {atRiskClients.slice(0, 7).map((client) => {
                    const daysBehind = Math.max(0, Math.floor(
                      (new Date().getTime() - new Date(client.initiationDate).getTime()) / (1000 * 60 * 60 * 24) - 
                      (client.progress * 0.6)
                    ));
                    const stuckModule = client.progress < 25 ? 'Organization Setup' : 
                                       client.progress < 50 ? 'Property Records' : 
                                       client.progress < 75 ? 'Request Forms' : 'Bid Panels';
                    return (
                      <tr key={client.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-slate-900">{client.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-red-600">{daysBehind}d</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-slate-600">{stuckModule}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-red-500 h-2 rounded-full" 
                                style={{ width: `${client.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate-700">{client.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              SK
                            </div>
                            <span className="text-sm text-slate-600">Samuel K.</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => router.push(`/cs-portal/edit-client?client=${encodeURIComponent(client.name)}`)}
                            className="text-sm font-medium text-[#9F2E2B] hover:text-[#7D2522]"
                          >
                            Review →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
            )}
          </div>
        )}

        {/* Row 3: Charts Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Module Completion Funnel */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Module Completion Funnel</h2>
            <p className="text-sm text-slate-600 mb-6">Percentage of clients completing each module</p>
            <div className="space-y-4">
              {moduleStages.map((stage, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{stage.name}</span>
                    <span className="text-sm text-slate-600">
                      {stage.count} / {moduleStages[0].count} ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-slate-200 rounded-full h-8 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] h-8 rounded-full transition-all flex items-center justify-end px-3"
                        style={{ width: `${stage.percentage}%` }}
                      >
                        {stage.percentage > 20 && (
                          <span className="text-xs font-bold text-white">{stage.count}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completion Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Active Client Progress</h2>
            <p className="text-sm text-slate-600 mb-6">Current completion status across all active clients</p>
            <div className="space-y-3 max-h-[340px] overflow-y-auto">
              {activeClients.slice(0, 12).map((client) => {
                const heat = getStatusHeat(client.progress, client.initiationDate, client.projectedGoLiveDate);
                const color = heat === 'hot' ? 'bg-red-500' : heat === 'warm' ? 'bg-orange-500' : 'bg-green-500';
                return (
                  <div key={client.id} className="flex items-center gap-3">
                    <div className="w-32 text-sm text-slate-700 font-medium truncate flex-shrink-0">
                      {client.name.split(' ')[0]}
                    </div>
                    <div className="flex-1 bg-slate-200 rounded-full h-6 overflow-hidden">
                      <div 
                        className={`${color} h-6 rounded-full transition-all flex items-center justify-end px-2`}
                        style={{ width: `${client.progress}%` }}
                      >
                        {client.progress > 15 && (
                          <span className="text-xs font-bold text-white">{client.progress}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 4: Upcoming Go-Lives */}
        {upcomingGoLives.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="border-b border-slate-200 px-6 py-4 bg-green-50">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-lg font-bold text-slate-900">Upcoming Go-Lives</h2>
                <span className="text-sm text-slate-600">(Next 2 weeks)</span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingGoLives.map((client) => {
                  const daysUntil = Math.ceil(
                    (new Date(client.projectedGoLiveDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );
                  const readiness = client.progress >= 90 ? 'green' : client.progress >= 70 ? 'yellow' : 'red';
                  return (
                    <div key={client.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-bold text-slate-900">{client.name}</h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            readiness === 'green' ? 'bg-green-100 text-green-700' :
                            readiness === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {client.progress}% Ready
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(client.projectedGoLiveDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="font-medium">
                            {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                          </span>
                        </div>
                      </div>
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            readiness === 'green' ? 'bg-green-500' :
                            readiness === 'yellow' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${client.progress}%` }}
                        />
                      </div>
                      <button
                        onClick={() => router.push(`/cs-portal/edit-client?client=${encodeURIComponent(client.name)}`)}
                        className="text-sm font-medium text-[#9F2E2B] hover:text-[#7D2522] whitespace-nowrap"
                      >
                        View Details →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Table with Tabs */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">All Clients</h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4">
          <button
            onClick={() => {
              setActiveTab('active');
              setCurrentPage(1);
            }}
            className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors ${
              activeTab === 'active'
                ? 'bg-white text-[#9F2E2B] border-t-2 border-x border-slate-200 border-t-[#9F2E2B]'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Active ({activeClients.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('completed');
              setCurrentPage(1);
            }}
            className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors ${
              activeTab === 'completed'
                ? 'bg-white text-[#9F2E2B] border-t-2 border-x border-slate-200 border-t-[#9F2E2B]'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Completed ({completedClients.length})
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden rounded-tl-none">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Initiation Date
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Go-Live Date
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Tracking Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Tickets
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {currentClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {client.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        {new Date(client.initiationDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[120px]">
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] h-2 rounded-full transition-all"
                              style={{ width: `${client.progress}%` } as React.CSSProperties}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-slate-700 min-w-[40px]">
                          {client.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        {new Date(client.projectedGoLiveDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.status === 'Completed' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-slate-50 text-slate-500 border-slate-200">
                          N/A
                        </span>
                      ) : (() => {
                        const heat = getStatusHeat(client.progress, client.initiationDate, client.projectedGoLiveDate);
                        return (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            heat === 'hot' 
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : heat === 'warm'
                              ? 'bg-orange-50 text-orange-700 border-orange-200'
                              : 'bg-green-50 text-green-700 border-green-200'
                          }`}>
                            {heat === 'hot' ? '🔴 Behind' : heat === 'warm' ? '🟡 At Risk' : '🟢 On Track'}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">
                          {client.tickets}
                        </span>
                        {client.tickets > 0 && (
                          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => router.push(`/cs-portal/edit-client?client=${encodeURIComponent(client.name)}`)}
                        className="text-[#9F2E2B] hover:text-[#7D2522] transition-colors"
                        aria-label={`View ${client.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, displayedClients.length)}</span> of{' '}
                <span className="font-medium">{displayedClients.length}</span> clients
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-[#9F2E2B] text-white'
                          : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add New Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Add New Client</h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddClient} className="p-6 space-y-5">
              {/* Organization Name */}
              <div>
                <label htmlFor="org-name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Organization Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="org-name"
                  type="text"
                  required
                  value={newClientData.orgName}
                  onChange={(e) => setNewClientData({ ...newClientData, orgName: e.target.value })}
                  placeholder="e.g., Union Bank"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
                />
              </div>

              {/* Primary Contact Section */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Primary Onboarding Contact</h3>
                
                {/* Contact Name */}
                <div className="mb-4">
                  <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-2">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={newClientData.contactName}
                    onChange={(e) => setNewClientData({ ...newClientData, contactName: e.target.value })}
                    placeholder="e.g., John Smith"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={newClientData.contactEmail}
                    onChange={(e) => setNewClientData({ ...newClientData, contactEmail: e.target.value })}
                    placeholder="e.g., john.smith@unionbank.com"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Projected Go-Live Date */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Timeline</h3>
                
                <div>
                  <label htmlFor="go-live-date" className="block text-sm font-medium text-slate-700 mb-2">
                    Projected Go-Live Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="go-live-date"
                    type="date"
                    required
                    value={newClientData.projectedGoLiveDate}
                    onChange={(e) => setNewClientData({ ...newClientData, projectedGoLiveDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    This date will be visible to the client throughout their onboarding process
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        message={snackbarMessage}
        isVisible={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        type="success"
      />

      {/* Notification Slide-out Panel */}
      {showNotifications && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowNotifications(false)} />
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50">
            <div className="border-b border-slate-200 p-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
                <p className="text-xs text-slate-600">{unreadCount} unread</p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs font-medium text-blue-600 hover:text-blue-800">
                    Mark all read
                  </button>
                )}
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600" aria-label="Close notifications">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-80px)]">
              <div className="divide-y divide-slate-200">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-4 hover:bg-slate-50 ${!notification.read ? 'bg-blue-50/50' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.type === 'ticket' ? 'bg-amber-100' :
                        notification.type === 'completion' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {notification.type === 'ticket' && (
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        )}
                        {notification.type === 'completion' && (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {notification.type === 'progress' && (
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                          {!notification.read && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>}
                        </div>
                        <p className="text-sm text-slate-600 mb-1">{notification.message}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(notification.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

