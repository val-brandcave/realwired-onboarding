"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MetricsCards } from "./MetricsCards";
import { ActiveClientProgress } from "./ActiveClientProgress";
import { ModuleCompletionFunnel } from "./ModuleCompletionFunnel";
import { MODULE_COLORS } from "./ModuleCompletionFunnel";
import { AtRiskClientsTable } from "./AtRiskClientsTable";
import { AllClientsTable } from "./AllClientsTable";

interface Client {
  id: string;
  name: string;
  initiationDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
  progress: number;
  projectedGoLiveDate: string;
  tickets: number;
}

interface DashboardContentProps {
  clients: Client[];
  onAddClient: () => void;
}

export function DashboardContent({ clients, onAddClient }: DashboardContentProps) {
  const router = useRouter();
  
  // Calculate metrics
  const activeClients = clients.filter(c => c.status === 'In Progress').length;
  const avgCompletion = Math.round(
    clients.reduce((sum, c) => sum + c.progress, 0) / clients.length
  );
  
  // Scheduled go-lives (next 30 days)
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const scheduledGoLives = clients.filter(c => {
    const goLive = new Date(c.projectedGoLiveDate);
    return goLive >= today && goLive <= thirtyDaysFromNow;
  }).length;
  
  // At-risk clients (progress < 30% or behind schedule)
  const atRiskClients = clients.filter(c => {
    if (c.status === 'Completed') return false;
    const today = new Date();
    const start = new Date(c.initiationDate);
    const end = new Date(c.projectedGoLiveDate);
    const totalDuration = end.getTime() - start.getTime();
    const elapsedTime = today.getTime() - start.getTime();
    const expectedProgress = (elapsedTime / totalDuration) * 100;
    return c.progress < expectedProgress - 15;
  });
  
  // Calculate module completion funnel
  const moduleFunnelData = [
    { moduleId: 'company-setup', moduleName: 'Organization Setup', completionRate: 81, color: MODULE_COLORS['company-setup'] },
    { moduleId: 'vendors', moduleName: 'Vendor Setup', completionRate: 76, color: MODULE_COLORS['vendors'] },
    { moduleId: 'users', moduleName: 'User Setup', completionRate: 68, color: MODULE_COLORS['users'] },
    { moduleId: 'definitions', moduleName: 'Definitions', completionRate: 42, color: MODULE_COLORS['definitions'] },
    { moduleId: 'routing', moduleName: 'Routing', completionRate: 30, color: MODULE_COLORS['routing'] },
    { moduleId: 'general-settings', moduleName: 'General Settings', completionRate: 20, color: MODULE_COLORS['general-settings'] },
    { moduleId: 'it-checklist', moduleName: 'IT Readiness', completionRate: 12, color: MODULE_COLORS['it-checklist'] },
  ];
  
  // Prepare at-risk table data
  const atRiskTableData = atRiskClients.slice(0, 3).map(client => {
    const today = new Date();
    const start = new Date(client.initiationDate);
    const end = new Date(client.projectedGoLiveDate);
    const totalDuration = end.getTime() - start.getTime();
    const elapsedTime = today.getTime() - start.getTime();
    const expectedProgress = (elapsedTime / totalDuration) * 100;
    const daysBehind = Math.ceil((expectedProgress - client.progress) / 100 * (totalDuration / (1000 * 60 * 60 * 24)));
    
    return {
      id: client.id,
      name: client.name,
      daysBehind: Math.max(0, daysBehind),
      stuckModule: 'Definitions', // TODO: Track actual stuck module
      completion: client.progress,
      assignees: ['Samuel Kite', 'Sarah Johnson'],
    };
  });
  
  // Prepare all clients table data
  const allClientsTableData = clients.map(client => {
    // Calculate tracking status with proper type
    let trackingStatus: 'On Track' | 'Behind' | 'At Risk' | 'On Hold';
    if (client.status === 'On Hold') {
      trackingStatus = 'On Hold';
    } else if (client.progress >= 50) {
      trackingStatus = 'On Track';
    } else if (client.progress >= 30) {
      trackingStatus = 'At Risk';
    } else {
      trackingStatus = 'Behind';
    }
    
    return {
      id: client.id,
      name: client.name,
      initiationDate: new Date(client.initiationDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      status: client.status,
      progress: client.progress,
      trackingStatus,
      goLiveDate: new Date(client.projectedGoLiveDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      tickets: client.tickets,
      assignees: ['Samuel Kite', 'Sarah Johnson', 'Mike Davis', 'Emily Chen'],
    };
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(allClientsTableData.length / itemsPerPage);
  const paginatedClients = allClientsTableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title Section */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Client Onboarding Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor onboarding progress, identify at-risk clients, and track key metrics across all active onboardings.
          </p>
        </div>
        <button
          onClick={onAddClient}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add New Client</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <MetricsCards
        activeClients={activeClients}
        averageCompletionRate={avgCompletion}
        scheduledGoLives={scheduledGoLives}
        atRiskClients={atRiskClients.length}
      />

      {/* Active Client Progress + Module Funnel (60/40 split) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <ActiveClientProgress
            clients={clients.map(c => ({ id: c.id, name: c.name, progress: c.progress }))}
            onClientClick={(clientId) => {
              const client = clients.find(c => c.id === clientId);
              if (client) {
                router.push(`/cs-portal/edit-client?client=${encodeURIComponent(client.name)}`);
              }
            }}
          />
        </div>
        <div className="lg:col-span-2">
          <ModuleCompletionFunnel modules={moduleFunnelData} />
        </div>
      </div>

      {/* At-Risk Clients Table */}
      {atRiskTableData.length > 0 && (
        <div className="mb-8">
          <AtRiskClientsTable clients={atRiskTableData} />
        </div>
      )}

      {/* All Clients Table */}
      <AllClientsTable
        clients={paginatedClients}
        currentPage={currentPage}
        totalPages={totalPages}
        totalClients={allClientsTableData.length}
        onPageChange={setCurrentPage}
        onClientClick={(clientId) => {
          const client = clients.find(c => c.id === clientId);
          if (client) {
            router.push(`/cs-portal/edit-client?client=${encodeURIComponent(client.name)}`);
          }
        }}
      />
    </main>
  );
}

