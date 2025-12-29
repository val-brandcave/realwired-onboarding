"use client";

import { MetricCard } from "./MetricCard";

interface MetricsCardsProps {
  activeClients: number;
  averageCompletionRate: number;
  scheduledGoLives: number;
  atRiskClients: number;
}

export function MetricsCards({ 
  activeClients, 
  averageCompletionRate, 
  scheduledGoLives, 
  atRiskClients 
}: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Active Onboarding Clients */}
      <MetricCard
        icon={
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        }
        label="Active Onboarding Clients"
        value={activeClients}
        badge={{ text: '+2 this month', color: 'purple' }}
      />
      
      {/* Average Completion Rate */}
      <MetricCard
        icon={
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
        label="Average Completion Rate"
        value={`${averageCompletionRate}%`}
        badge={{ text: 'On Track', color: 'green' }}
      />
      
      {/* Scheduled Go-Lives */}
      <MetricCard
        icon={
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
        label="Scheduled Go-Lives"
        value={scheduledGoLives}
        badge={{ text: 'November 2025', color: 'blue' }}
      />
      
      {/* At-Risk Clients */}
      <MetricCard
        icon={
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        }
        label="At-Risk Clients"
        value={atRiskClients}
        badge={{ text: 'Needs Attention', color: 'red' }}
      />
    </div>
  );
}

