"use client";

interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  email: string;
  phone: string;
  avatar: string;
  bio?: string;
  joinDate?: string;
}

interface AgentDetailsModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

interface Ticket {
  id: string;
  title: string;
  status: "completed" | "in-progress";
  date: string;
  description: string;
}

interface HistoryItem {
  id: string;
  action: string;
  date: string;
  module?: string;
}

// Sample data - in real app this would come from API/context
const getAgentHistory = (agentId: string): HistoryItem[] => {
  const histories: Record<string, HistoryItem[]> = {
    "1": [ // Sarah Johnson
      { id: "1", action: "Helped complete Organization Setup module", date: "Dec 10, 2025", module: "Organization Setup" },
      { id: "2", action: "Configured branding and logo settings", date: "Dec 10, 2025", module: "Organization Setup" },
      { id: "3", action: "Set up participant roster", date: "Dec 11, 2025", module: "Organization Setup" },
      { id: "4", action: "Reviewed IT configuration options", date: "Dec 12, 2025", module: "Organization Setup" },
    ],
    "2": [ // Emily Rodriguez
      { id: "1", action: "Provided workflow design consultation", date: "Dec 13, 2025" },
      { id: "2", action: "Conducted training session on request types", date: "Dec 14, 2025" },
    ],
    "3": [ // David Patterson
      { id: "1", action: "Assisted with API integration planning", date: "Dec 5, 2025" },
    ],
    "4": [ // Michael Chen
      { id: "1", action: "Reviewed appraisal routing configuration", date: "Dec 8, 2025", module: "Routing" },
      { id: "2", action: "Helped configure vendor management", date: "Dec 9, 2025", module: "Vendors" },
    ],
  };
  return histories[agentId] || [];
};

const getAgentTickets = (agentId: string): Ticket[] => {
  const tickets: Record<string, Ticket[]> = {
    "1": [
      { id: "T-101", title: "Review property field configuration", status: "in-progress", date: "Dec 15, 2025", description: "Working with Union Bank to finalize property record fields" },
      { id: "T-098", title: "SSO integration support", status: "completed", date: "Dec 12, 2025", description: "Successfully configured SSO with Azure AD" },
      { id: "T-095", title: "Branding customization", status: "completed", date: "Dec 10, 2025", description: "Updated logo and color scheme" },
    ],
    "2": [
      { id: "T-102", title: "Custom workflow training session", status: "in-progress", date: "Dec 16, 2025", description: "Scheduled for Dec 18" },
      { id: "T-097", title: "Request type configuration", status: "completed", date: "Dec 14, 2025", description: "Set up 12 custom request types" },
    ],
    "3": [
      { id: "T-103", title: "API documentation review", status: "in-progress", date: "Dec 15, 2025", description: "Preparing API integration guide" },
      { id: "T-099", title: "Webhook configuration", status: "completed", date: "Dec 11, 2025", description: "Configured real-time notifications" },
    ],
    "4": [
      { id: "T-104", title: "Vendor routing optimization", status: "in-progress", date: "Dec 16, 2025", description: "Reviewing routing rules for appraisals" },
      { id: "T-100", title: "Appraisal workflow review", status: "completed", date: "Dec 13, 2025", description: "Optimized 2-step review process" },
      { id: "T-096", title: "Vendor onboarding", status: "completed", date: "Dec 9, 2025", description: "Onboarded 15 appraisal vendors" },
    ],
  };
  return tickets[agentId] || [];
};

export function AgentDetailsModal({ agent, isOpen, onClose }: AgentDetailsModalProps) {
  if (!isOpen) return null;

  const history = getAgentHistory(agent.id);
  const tickets = getAgentTickets(agent.id);
  const inProgressTickets = tickets.filter(t => t.status === "in-progress");
  const completedTickets = tickets.filter(t => t.status === "completed");

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="agent-modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full transform transition-all max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            {/* Header - Agent Info */}
            <div className="flex items-start gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9F2E2B] to-[#7a2320] flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0">
                {agent.avatar}
              </div>
              <div className="flex-1">
                <h2 id="agent-modal-title" className="text-3xl font-bold text-gray-900 mb-2">
                  {agent.name}
                </h2>
                <p className="text-lg font-medium text-[#9F2E2B] mb-2">
                  {agent.role}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {agent.specialization}
                </p>
                {agent.joinDate && (
                  <p className="text-xs text-gray-500">
                    With Realwired since {agent.joinDate}
                  </p>
                )}
                {agent.bio && (
                  <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                    {agent.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="mb-8 bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#9F2E2B] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{agent.email}</span>
                </a>
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#9F2E2B] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{agent.phone}</span>
                </a>
              </div>
            </div>

            {/* Recent History */}
            {history.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity with You</h3>
                <div className="space-y-3">
                  {history.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#9F2E2B] flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{item.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">{item.date}</p>
                          {item.module && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                              {item.module}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tickets */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tickets on Plate</h3>
              
              {/* In Progress */}
              {inProgressTickets.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    In Progress ({inProgressTickets.length})
                  </h4>
                  <div className="space-y-3">
                    {inProgressTickets.map((ticket) => (
                      <div key={ticket.id} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                              <span className="text-sm font-semibold text-gray-900">{ticket.title}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{ticket.description}</p>
                            <p className="text-xs text-gray-500">{ticket.date}</p>
                          </div>
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded flex-shrink-0">
                            In Progress
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed */}
              {completedTickets.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Recently Completed ({completedTickets.length})
                  </h4>
                  <div className="space-y-3">
                    {completedTickets.map((ticket) => (
                      <div key={ticket.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                              <span className="text-sm font-semibold text-gray-900">{ticket.title}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{ticket.description}</p>
                            <p className="text-xs text-gray-500">{ticket.date}</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded flex-shrink-0 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Completed
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

