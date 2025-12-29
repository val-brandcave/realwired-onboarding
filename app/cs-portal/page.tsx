"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Snackbar } from '@/components/ui/Snackbar';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DashboardContent } from './_components/DashboardContent';

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
        <div className="px-4 sm:px-6 lg:px-8">
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
      <DashboardContent 
        clients={SAMPLE_CLIENTS}
        onAddClient={() => setIsAddModalOpen(true)}
      />
        {/* Title Section */}
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

