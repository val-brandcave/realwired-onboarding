"use client";

import React, { useState } from 'react';
import { FloatingChatButton } from '@/components/ui/FloatingChatButton';
import { UserProfileDropdown } from './UserProfileDropdown';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StickyFooterNav } from '@/components/ui/StickyFooterNav';

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'in_progress' | 'not_started';
}

import type { BreadcrumbItem } from '@/components/ui/Breadcrumbs';
import type { StickyFooterNavProps } from '@/components/ui/StickyFooterNav';

interface MainLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
  steps?: Step[];
  title?: string;
  hideFloatingChat?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  footerNav?: StickyFooterNavProps;
}

interface Notification {
  id: string;
  type: 'reminder' | 'configured' | 'completed';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  csAgent?: string;
  participant?: string;
}

function ProgressBar({ steps }: { steps: Step[] }) {
  // Calculate progress: count completed + in_progress steps
  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const inProgressSteps = steps.filter(s => s.status === 'in_progress').length;
  const totalProgress = completedSteps + (inProgressSteps > 0 ? 0.5 : 0);
  const progressPercent = Math.round((totalProgress / steps.length) * 100);
  
  // ARIA progressbar attributes as props object
  const ariaProps = {
    role: 'progressbar' as const,
    'aria-valuenow': progressPercent,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-label': `Onboarding progress: ${progressPercent}% complete`
  };
  
  return (
    <div className="w-full h-1 bg-slate-200">
      <div 
        {...ariaProps}
        className="h-full bg-[#9F2E2B] transition-all duration-700 ease-out"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
}

export function MainLayout({ 
  children, 
  steps = [],
  title = "YouConnect Onboarding",
  hideFloatingChat = false,
  breadcrumbs,
  footerNav
}: MainLayoutProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'reminder',
      title: 'Reminder: Complete Organization Setup',
      message: 'CS Agent Samuel Kite sent you a reminder to complete the Organization Setup module.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      read: false,
      csAgent: 'Samuel Kite'
    },
    {
      id: '2',
      type: 'configured',
      title: 'Vendor Template Configured',
      message: 'CS Agent Samuel Kite has configured your vendor template. You can now proceed with the vendors module.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      read: false,
      csAgent: 'Samuel Kite'
    },
    {
      id: '3',
      type: 'completed',
      title: 'Module Completed',
      message: 'Sarah Johnson completed the Definitions module.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      read: true,
      participant: 'Sarah Johnson'
    },
    {
      id: '4',
      type: 'configured',
      title: 'IT Configuration Ready',
      message: 'CS Agent Samuel Kite has configured your IT security settings.',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
      read: true,
      csAgent: 'Samuel Kite'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return (
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
      case 'configured':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        );
      case 'completed':
        return (
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation - Fixed Header */}
      <div className="sticky top-0 z-50">
        <header className="bg-white border-b border-border shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Logo and Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/realwired-logo.png" 
                    alt="RealWired Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-base font-semibold text-foreground">{title}</h1>
                </div>
              </div>

              {/* Right Side: Notifications + User Profile */}
              <div className="flex items-center gap-3">
                {/* Notification Bell */}
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Notifications"
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

                {/* User Profile */}
                <UserProfileDropdown />
              </div>
            </div>
          </div>
        </header>

        {/* Progress Bar - Part of sticky header */}
        {steps.length > 0 && <ProgressBar steps={steps} />}
      </div>

      {/* Breadcrumbs - Sticky below header */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}

      {/* Main Content */}
      <main className={`flex-1 ${footerNav ? 'pb-24' : ''}`}>
        {children}
      </main>

      {/* Footer - Only show if no sticky footer nav */}
      {!footerNav && (
        <footer className="bg-slate-50 border-t border-border mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} RealWired · YouConnect
            </p>
          </div>
        </footer>
      )}

      {/* Sticky Footer Navigation */}
      {footerNav && <StickyFooterNav {...footerNav} />}

      {/* Floating Chat Button - Positioned above footer if present */}
      {!hideFloatingChat && pathname !== '/hub-2' && (
        <FloatingChatButton bottomOffset={footerNav ? "bottom-24" : "bottom-6"} />
      )}

      {/* Notification Slide-out Panel */}
      {showNotifications && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-[60]" 
            onClick={() => setShowNotifications(false)}
            aria-label="Close notifications"
          />
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-[70] animate-slide-in-right">
            {/* Header */}
            <div className="border-b border-slate-200 p-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
                <p className="text-xs text-slate-600">{unreadCount} unread</p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead} 
                    className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <button 
                  onClick={() => setShowNotifications(false)} 
                  className="text-slate-400 hover:text-slate-600 transition-colors" 
                  aria-label="Close notifications"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto h-[calc(100vh-80px)]">
              {notifications.length > 0 ? (
                <div className="divide-y divide-slate-200">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 hover:bg-slate-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span>
                              {new Date(notification.timestamp).toLocaleString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                hour: 'numeric', 
                                minute: '2-digit',
                                hour12: true 
                              })}
                            </span>
                            {notification.csAgent && (
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                {notification.csAgent}
                              </span>
                            )}
                            {notification.participant && (
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                {notification.participant}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <svg className="w-16 h-16 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p className="text-sm text-slate-600">No notifications yet</p>
                  <p className="text-xs text-slate-500 mt-1">You'll be notified of updates from your CS team</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

