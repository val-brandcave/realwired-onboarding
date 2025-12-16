"use client";

type SubTabId = "team" | "tickets";

interface SubTab {
  id: SubTabId;
  label: string;
}

interface CustomerSuccessSubTabsProps {
  activeTab: SubTabId;
  onTabChange: (tab: SubTabId) => void;
}

export function CustomerSuccessSubTabs({ activeTab, onTabChange }: CustomerSuccessSubTabsProps) {
  const tabs: SubTab[] = [
    { id: "team", label: "Your Team" },
    { id: "tickets", label: "Support Tickets" },
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8 px-4 sm:px-6 lg:px-8" aria-label="Customer Success tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative pb-4 px-1 font-medium text-base
                transition-colors duration-200
                ${isActive
                  ? "text-[#9F2E2B]"
                  : "text-gray-500 hover:text-gray-700"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{tab.label}</span>
              
              {/* Underline animation */}
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
  );
}

