"use client";

import { useState } from "react";

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "resolved" | "closed";
  description: string;
  createdDate: string;
  updatedDate: string;
  assignedAgent?: string;
  comments?: TicketComment[];
}

export interface TicketComment {
  id: string;
  author: string;
  authorType: "user" | "agent";
  message: string;
  timestamp: string;
}

interface TicketListProps {
  tickets: Ticket[];
  onSubmitTicket: () => void;
}

export function TicketList({ tickets, onSubmitTicket }: TicketListProps) {
  const [statusFilter, setStatusFilter] = useState<"all" | Ticket["status"]>("all");
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  const filteredTickets = statusFilter === "all" 
    ? tickets 
    : tickets.filter(t => t.status === statusFilter);

  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "open": return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress": return "bg-orange-100 text-orange-800 border-orange-200";
      case "resolved": return "bg-green-100 text-green-800 border-green-200";
      case "closed": return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getPriorityColor = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "low": return "text-gray-600";
      case "medium": return "text-blue-600";
      case "high": return "text-orange-600";
      case "urgent": return "text-red-600";
    }
  };

  const getStatusIcon = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "in-progress":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "resolved":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case "closed":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters and Submit Button */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Status Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === "all"
                ? "bg-[#9F2E2B] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All ({tickets.length})
          </button>
          <button
            onClick={() => setStatusFilter("open")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === "open"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Open ({tickets.filter(t => t.status === "open").length})
          </button>
          <button
            onClick={() => setStatusFilter("in-progress")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === "in-progress"
                ? "bg-orange-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            In Progress ({tickets.filter(t => t.status === "in-progress").length})
          </button>
          <button
            onClick={() => setStatusFilter("resolved")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === "resolved"
                ? "bg-green-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Resolved ({tickets.filter(t => t.status === "resolved").length})
          </button>
        </div>

        {/* Submit New Ticket Button */}
        <button
          onClick={onSubmitTicket}
          className="px-6 py-2.5 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Submit New Ticket
        </button>
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-600 font-medium mb-1">No tickets found</p>
          <p className="text-sm text-gray-500">
            {statusFilter === "all" 
              ? "Submit your first support ticket to get help from our team"
              : `No ${statusFilter} tickets at the moment`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const isExpanded = expandedTicket === ticket.id;
            
            return (
              <div
                key={ticket.id}
                className="bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all overflow-hidden"
              >
                {/* Ticket Header - Clickable */}
                <button
                  onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}
                  className="w-full text-left p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          {ticket.status.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className={`text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {ticket.subject}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Created: {ticket.createdDate}</span>
                        <span>•</span>
                        <span>Updated: {ticket.updatedDate}</span>
                        {ticket.assignedAgent && (
                          <>
                            <span>•</span>
                            <span className="text-blue-600">Assigned to: {ticket.assignedAgent}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-5">
                    {/* Description */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {ticket.description}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {ticket.category}
                      </span>
                    </div>

                    {/* Comments */}
                    {ticket.comments && ticket.comments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Updates & Comments</h4>
                        <div className="space-y-3">
                          {ticket.comments.map((comment) => (
                            <div key={comment.id} className={`p-3 rounded-lg ${
                              comment.authorType === "agent" 
                                ? "bg-blue-50 border border-blue-200" 
                                : "bg-white border border-gray-200"
                            }`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-gray-900">
                                  {comment.author}
                                </span>
                                {comment.authorType === "agent" && (
                                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                    CS Agent
                                  </span>
                                )}
                                <span className="text-xs text-gray-500">
                                  {comment.timestamp}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">
                                {comment.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

