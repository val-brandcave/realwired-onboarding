"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AtRiskClient {
  id: string;
  name: string;
  daysBehind: number;
  stuckModule: string;
  completion: number;
  assignees: string[]; // Participant names or IDs
}

interface AtRiskClientsTableProps {
  clients: AtRiskClient[];
}

export function AtRiskClientsTable({ clients }: AtRiskClientsTableProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string): string => {
    const colors = ['#9F2E2B', '#2563eb', '#059669', '#d97706', '#7c3aed'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header - Clickable Accordion */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-900">
            At-Risk Clients
          </h3>
          <span className="inline-flex items-center px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            {clients.length} need attention
          </span>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Table - Expandable */}
      {isExpanded && (
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Day Behind
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Stuck Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Completion
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Assignees
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                {/* Name */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{client.name}</span>
                </td>
                
                {/* Days Behind */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-red-600 font-semibold">
                    {client.daysBehind} Days
                  </span>
                </td>
                
                {/* Stuck Module */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700">{client.stuckModule}</span>
                </td>
                
                {/* Completion - Progress Bar */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[80px]">
                      <div 
                        className="h-full bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-full"
                        style={{ width: `${client.completion}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 w-8 text-right">
                      {client.completion}%
                    </span>
                  </div>
                </td>
                
                {/* Assignees - Avatar Group */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center -space-x-2">
                    {client.assignees.slice(0, 3).map((name, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white shadow-sm"
                        style={{ backgroundColor: getAvatarColor(name) }}
                        title={name}
                      >
                        {getInitials(name)}
                      </div>
                    ))}
                    {client.assignees.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-xs font-semibold text-white shadow-sm">
                        +{client.assignees.length - 3}
                      </div>
                    )}
                  </div>
                </td>
                
                {/* Action */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => router.push(`/cs-portal/edit-client?client=${encodeURIComponent(client.name)}`)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
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
      )}
    </div>
  );
}

