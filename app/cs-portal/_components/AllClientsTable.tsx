"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  name: string;
  initiationDate: string;
  status: 'In Progress' | 'On Hold' | 'Not Started' | 'Completed';
  progress: number;
  trackingStatus: 'On Track' | 'Behind' | 'On Hold' | 'At Risk';
  goLiveDate: string;
  tickets: number;
  assignees: string[];
}

interface AllClientsTableProps {
  clients: Client[];
  currentPage: number;
  totalPages: number;
  totalClients: number;
  onPageChange: (page: number) => void;
  onClientClick: (clientId: string) => void;
}

export function AllClientsTable({ 
  clients, 
  currentPage, 
  totalPages, 
  totalClients,
  onPageChange,
  onClientClick 
}: AllClientsTableProps) {
  const router = useRouter();
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Not Started':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTrackingBadgeClass = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-100 text-green-700';
      case 'Behind':
        return 'bg-red-100 text-red-700';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-700';
      case 'At Risk':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string): string => {
    const colors = ['#9F2E2B', '#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626', '#0891b2'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ column }: { column: string }) => (
    <button
      onClick={() => handleSort(column)}
      className="inline-flex items-center ml-1 text-gray-400 hover:text-gray-600"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    </button>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900">All Clients</h3>
      </div>
      
      {/* Tabs */}
      <div className="px-6 pt-4 flex items-center gap-2">
        <button className="px-4 py-2 text-sm font-medium text-gray-900 border-b-2 border-[#9F2E2B] bg-white">
          Active ({clients.length})
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent">
          Completed (3)
        </button>
      </div>
      
      {/* Table with Sticky Columns */}
      <div className="relative overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200 shadow-[2px_0_4px_rgba(0,0,0,0.05)] whitespace-nowrap" style={{ minWidth: '200px' }}>
                <div className="flex items-center">
                  Name
                  <SortIcon column="name" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '140px' }}>
                <div className="flex items-center">
                  Initiation Date
                  <SortIcon column="initiationDate" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '130px' }}>
                <div className="flex items-center">
                  Status
                  <SortIcon column="status" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '160px' }}>
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '150px' }}>
                <div className="flex items-center">
                  Tracking Status
                  <SortIcon column="trackingStatus" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '130px' }}>
                <div className="flex items-center">
                  Go-Live Date
                  <SortIcon column="goLiveDate" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '90px' }}>
                <div className="flex items-center">
                  Tickets
                  <SortIcon column="tickets" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '160px' }}>
                CS Team Assigned
              </th>
              <th className="sticky right-0 z-10 bg-gray-50 px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-l border-gray-200 shadow-[-2px_0_4px_rgba(0,0,0,0.05)] whitespace-nowrap" style={{ minWidth: '90px' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                {/* Name - Sticky Left */}
                <td className="sticky left-0 z-10 bg-white px-6 py-4 whitespace-nowrap border-r border-gray-200 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                  <span className="text-sm font-medium text-gray-900">{client.name}</span>
                </td>
                
                {/* Initiation Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700">{client.initiationDate}</span>
                </td>
                
                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusBadgeClass(client.status)}`}>
                    {client.status}
                  </span>
                </td>
                
                {/* Progress - Bar + Percentage */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[60px] max-w-[100px]">
                      <div 
                        className="h-full bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-full transition-all duration-500"
                        style={{ width: `${client.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 w-8">
                      {client.progress}%
                    </span>
                  </div>
                </td>
                
                {/* Tracking Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getTrackingBadgeClass(client.trackingStatus)}`}>
                    {client.trackingStatus}
                  </span>
                </td>
                
                {/* Go-Live Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700">{client.goLiveDate}</span>
                </td>
                
                {/* Tickets */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-sm font-semibold text-gray-900">{client.tickets}</span>
                </td>
                
                {/* CS Team Assigned - Avatar Group */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center -space-x-2">
                    {client.assignees.slice(0, 4).map((name, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white shadow-sm"
                        style={{ backgroundColor: getAvatarColor(name) }}
                        title={name}
                      >
                        {getInitials(name)}
                      </div>
                    ))}
                    {client.assignees.length > 4 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-xs font-semibold text-white shadow-sm">
                        +{client.assignees.length - 4}
                      </div>
                    )}
                  </div>
                </td>
                
                {/* Action - Sticky Right */}
                <td className="sticky right-0 z-10 bg-white px-6 py-4 text-center border-l border-gray-200 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]">
                  <button
                    onClick={() => onClientClick(client.id)}
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
      
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalClients)}</span> of <span className="font-medium">{totalClients}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ‹
          </button>
          
          {[...Array(Math.min(5, totalPages))].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  currentPage === page
                    ? 'bg-[#9F2E2B] text-white font-medium'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            );
          })}
          
          {totalPages > 5 && (
            <>
              <span className="text-gray-400">...</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

