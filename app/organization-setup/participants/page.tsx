"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding, type OnboardingParticipant } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { InviteLink } from "./_components/InviteLink";

// Predefined roles with colors
const PREDEFINED_ROLES = [
  { value: 'IT Department', color: '#3B82F6', bgColor: '#EFF6FF', textColor: '#1E40AF' },
  { value: 'Vendor Relations', color: '#10B981', bgColor: '#ECFDF5', textColor: '#065F46' },
  { value: 'Operations', color: '#F59E0B', bgColor: '#FEF3C7', textColor: '#92400E' },
  { value: 'Compliance', color: '#8B5CF6', bgColor: '#F5F3FF', textColor: '#5B21B6' },
  { value: 'Finance', color: '#EC4899', bgColor: '#FDF2F8', textColor: '#9F1239' },
  { value: 'Legal', color: '#6366F1', bgColor: '#EEF2FF', textColor: '#3730A3' },
  { value: 'Management', color: '#14B8A6', bgColor: '#F0FDFA', textColor: '#115E59' },
];

// Primary Manager badge color
const PRIMARY_MANAGER_BADGE = {
  bgColor: '#FEE2E2',
  textColor: '#991B1B',
  borderColor: '#FCA5A5'
};

// Get role badge colors
function getRoleBadgeColors(role: string): { bgColor: string; textColor: string } {
  const predefined = PREDEFINED_ROLES.find(r => r.value === role);
  if (predefined) {
    return { bgColor: predefined.bgColor, textColor: predefined.textColor };
  }
  // Custom role - use a neutral gray
  return { bgColor: '#F3F4F6', textColor: '#374151' };
}

// Generate avatar color based on name
function getAvatarColor(name: string): string {
  const colors = [
    "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6",
    "#EC4899", "#14B8A6", "#F97316", "#06B6D4", "#6366F1"
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

// Generate initials from name
function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export default function ParticipantsPage() {
  const { state, updateCompanySetup, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('organization-setup', 3, 4); // Step 3 of 4
  }, [updateModuleProgress]);

  // Primary decision maker (already logged in - John Smith)
  const primaryDecisionMaker: OnboardingParticipant = {
    id: 'primary-decision-maker',
    name: 'John Smith',
    email: 'john.smith@unionbank.com',
    avatarColor: '#9F2E2B'
  };
  
  // Additional participants
  const [additionalParticipants, setAdditionalParticipants] = useState<OnboardingParticipant[]>(
    state.companySetup.additionalParticipants || []
  );
  const [newParticipantName, setNewParticipantName] = useState("");
  const [newParticipantEmail, setNewParticipantEmail] = useState("");
  const [newParticipantRole, setNewParticipantRole] = useState("");
  const [isCustomRole, setIsCustomRole] = useState(false);
  const [customRoleInput, setCustomRoleInput] = useState("");
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [bulkUploadText, setBulkUploadText] = useState("");

  const canProceed = true; // Always can proceed now

  const handleAddParticipant = () => {
    if (newParticipantName.trim() && newParticipantEmail.trim() && newParticipantEmail.includes('@')) {
      const finalRole = isCustomRole ? customRoleInput.trim() : newParticipantRole;
      const newParticipant: OnboardingParticipant = {
        id: `participant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: newParticipantName.trim(),
        email: newParticipantEmail.trim(),
        role: finalRole || undefined,
        avatarColor: getAvatarColor(newParticipantName.trim())
      };
      setAdditionalParticipants([...additionalParticipants, newParticipant]);
      setNewParticipantName("");
      setNewParticipantEmail("");
      setNewParticipantRole("");
      setIsCustomRole(false);
      setCustomRoleInput("");
    }
  };

  const handleRoleChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomRole(true);
      setNewParticipantRole('');
    } else {
      setIsCustomRole(false);
      setNewParticipantRole(value);
      setCustomRoleInput('');
    }
  };

  const handleRemoveParticipant = (id: string) => {
    setAdditionalParticipants(additionalParticipants.filter(p => p.id !== id));
  };

  const handleBulkUpload = () => {
    const lines = bulkUploadText.split('\n').filter(line => line.trim());
    const newParticipants: OnboardingParticipant[] = [];
    
    lines.forEach(line => {
      const parts = line.split(',').map(p => p.trim());
      if (parts.length >= 2 && parts[1].includes('@')) {
        newParticipants.push({
          id: `participant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: parts[0],
          email: parts[1],
          role: parts[2] || undefined, // Third column is optional role
          avatarColor: getAvatarColor(parts[0])
        });
      }
    });

    setAdditionalParticipants([...additionalParticipants, ...newParticipants]);
    setBulkUploadText("");
    setShowBulkUpload(false);
  };

  const handleContinue = () => {
    updateCompanySetup({
      primaryDecisionMaker,
      additionalParticipants
    });
    router.push('/organization-setup/it-config');
  };

  const handleBack = () => {
    router.push('/organization-setup/branding');
  };

  const steps = [
    { id: '1', label: 'Organization Info', status: 'completed' as const },
    { id: '2', label: 'Branding', status: 'completed' as const },
    { id: '3', label: 'Participants', status: 'in_progress' as const },
    { id: '4', label: 'IT Config', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={2} 
      steps={steps}
      title="Organization Setup"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Onboarding Participants
          </h1>
          <p className="text-base text-muted-foreground">
            Add team members who will be involved in the onboarding process
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Primary Onboarding Manager (You) */}
            <div className="bg-card border border-border rounded-xl p-6 mb-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">
                    Primary Onboarding Manager
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    You are the primary contact managing this onboarding process
                  </p>
                </div>
              </div>

              {/* Primary Manager Card - Read Only */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border-2 border-primary/20">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-md"
                  style={{ backgroundColor: primaryDecisionMaker.avatarColor }}
                >
                  {getInitials(primaryDecisionMaker.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold text-foreground">{primaryDecisionMaker.name}</div>
                  <div className="text-sm text-muted-foreground">{primaryDecisionMaker.email}</div>
                </div>
                <span 
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm border"
                  style={{ 
                    backgroundColor: PRIMARY_MANAGER_BADGE.bgColor, 
                    color: PRIMARY_MANAGER_BADGE.textColor,
                    borderColor: PRIMARY_MANAGER_BADGE.borderColor
                  }}
                >
                  Primary Manager
                </span>
              </div>
            </div>

            {/* Additional Participants */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground mb-1">
                    Additional Participants <span className="text-sm text-muted-foreground font-normal">(Optional)</span>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Other team members who should be involved in onboarding meetings
                  </p>
                </div>
              </div>

              {/* Add participant form */}
              {!showBulkUpload && (
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={newParticipantName}
                      onChange={(e) => setNewParticipantName(e.target.value)}
                      placeholder="Name"
                      className="px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
                    />
                    <input
                      type="email"
                      value={newParticipantEmail}
                      onChange={(e) => setNewParticipantEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
                    />
                    <div className="space-y-2">
                      <select
                        value={isCustomRole ? 'custom' : newParticipantRole}
                        onChange={(e) => handleRoleChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        aria-label="Participant role"
                      >
                        <option value="">Select Role (optional)</option>
                        {PREDEFINED_ROLES.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.value}
                          </option>
                        ))}
                        <option value="custom">+ Custom Role</option>
                      </select>
                      {isCustomRole && (
                        <input
                          type="text"
                          value={customRoleInput}
                          onChange={(e) => setCustomRoleInput(e.target.value)}
                          placeholder="Enter custom role"
                          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAddParticipant}
                      disabled={!newParticipantName.trim() || !newParticipantEmail.trim() || !newParticipantEmail.includes('@')}
                      className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Participant
                    </button>
                    <button
                      onClick={() => setShowBulkUpload(true)}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-input rounded-lg hover:bg-accent transition-colors"
                    >
                      Bulk Upload
                    </button>
                  </div>
                </div>
              )}

              {/* Bulk upload form */}
              {showBulkUpload && (
                <div className="mb-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Bulk Upload Participants
                    </label>
                    <textarea
                      value={bulkUploadText}
                      onChange={(e) => setBulkUploadText(e.target.value)}
                      placeholder="John Doe, john@example.com, IT Team&#10;Jane Smith, jane@example.com, Vendor Relations&#10;Bob Johnson, bob@example.com, Operations"
                      rows={5}
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Format: Name, Email, Role (optional) - one per line
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBulkUpload}
                      disabled={!bulkUploadText.trim()}
                      className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Upload Participants
                    </button>
                    <button
                      onClick={() => {
                        setShowBulkUpload(false);
                        setBulkUploadText("");
                      }}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* List of added participants */}
              {additionalParticipants.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Added Participants ({additionalParticipants.length})
                  </h3>
                  <div className="space-y-2">
                    {additionalParticipants.map((participant) => {
                      const roleBadgeColors = participant.role ? getRoleBadgeColors(participant.role) : null;
                      return (
                        <div key={participant.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                            style={{ backgroundColor: participant.avatarColor }}
                          >
                            {getInitials(participant.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <div className="text-sm font-medium text-foreground">{participant.name}</div>
                              {participant.role && roleBadgeColors && (
                                <span 
                                  className="px-2 py-0.5 text-xs font-medium rounded"
                                  style={{ 
                                    backgroundColor: roleBadgeColors.bgColor, 
                                    color: roleBadgeColors.textColor 
                                  }}
                                >
                                  {participant.role}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground truncate mb-2">{participant.email}</div>
                            <InviteLink 
                              participantId={participant.id}
                              participantName={participant.name}
                              participantEmail={participant.email}
                            />
                          </div>
                          <button
                            onClick={() => handleRemoveParticipant(participant.id)}
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors self-start"
                            title="Remove participant"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {additionalParticipants.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm">No additional participants added yet</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBack}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                disabled={!canProceed}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all ${
                  canProceed
                    ? 'text-primary-foreground bg-primary hover:bg-primary/90'
                    : 'text-muted-foreground bg-muted cursor-not-allowed'
                }`}
              >
                {canProceed ? 'Next →' : 'Please fill primary decision maker info'}
              </button>
            </div>
          </div>

          {/* Right Column: Educational Panel (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              {/* Why We Need This */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Onboarding participants will receive communications and be included in key meetings during setup. This helps ensure the right stakeholders are involved and informed throughout the configuration process.
                </p>
              </div>

              <div className="space-y-4">
                {/* Video Tutorial */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video Tutorial (2:45)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    {/* Background image placeholder - corporate people conversing */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: Managing Onboarding Participants">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Managing Onboarding Participants</p>
                    </div>
                  </div>
                </div>

                {/* Resource Guide */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Resource Guide
                  </h4>
                  <button 
                    onClick={() => {
                      // Download logic here
                      console.log('Downloading PDF...');
                    }}
                    className="w-full px-3 py-2 text-xs font-medium text-foreground bg-card hover:bg-accent border border-border rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="flex-1 text-left">Participant Management Guide.pdf</span>
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>

                {/* Note Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-blue-900">
                      <strong>Note:</strong> These are onboarding participants only. You'll add your full team and end users in Module 3.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

