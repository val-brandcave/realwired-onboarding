"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type TabId = "onboarding" | "products" | "customer-success";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface HubTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function HubTabs({ activeTab, onTabChange }: HubTabsProps) {
  const router = useRouter();

  const tabs: Tab[] = [
    {
      id: "onboarding",
      label: "Onboarding",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      id: "products",
      label: "Products",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: "customer-success",
      label: "Customer Success",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const handleTabClick = (tabId: TabId) => {
    onTabChange(tabId);
    // Update URL without page reload
    router.push(`/hub?tab=${tabId}`, { scroll: false });
  };

  return (
    <div className="sticky top-14 z-30 border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  group relative py-4 px-1 font-medium text-sm
                  flex items-center gap-2
                  transition-colors duration-200
                  ${
                    isActive
                      ? "text-[#9F2E2B]"
                      : "text-gray-500 hover:text-gray-700"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={`
                  transition-opacity duration-200
                  ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}
                `}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                
                {/* Smooth underline animation */}
                <span
                  className={`
                    absolute bottom-0 left-0 right-0 h-0.5 bg-[#9F2E2B]
                    transition-all duration-300 ease-out
                    ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
                  `}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

