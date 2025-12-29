"use client";

import { ClientProgressBar } from "./ClientProgressBar";

interface Client {
  id: string;
  name: string;
  progress: number;
}

interface ActiveClientProgressProps {
  clients: Client[];
  onClientClick?: (clientId: string) => void;
}

export function ActiveClientProgress({ clients, onClientClick }: ActiveClientProgressProps) {
  // Sort by progress descending
  const sortedClients = [...clients].sort((a, b) => b.progress - a.progress);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          Active Client Progress
        </h3>
        <p className="text-sm text-gray-600">
          Current completion status across all active clients
        </p>
      </div>
      
      {/* Client Progress List */}
      <div className="space-y-1">
        {sortedClients.slice(0, 8).map((client) => (
          <ClientProgressBar
            key={client.id}
            clientName={client.name}
            progress={client.progress}
            onClick={() => onClientClick?.(client.id)}
          />
        ))}
      </div>
    </div>
  );
}

