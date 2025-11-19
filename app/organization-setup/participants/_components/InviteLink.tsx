"use client";

import { useState } from "react";

interface InviteLinkProps {
  participantId: string;
  participantName: string;
  participantEmail: string;
}

export function InviteLink({ participantId, participantName, participantEmail }: InviteLinkProps) {
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Generate a unique invite link
  const inviteLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/invite/accept?token=${btoa(participantId + '-' + Date.now())}`;

  const handleGenerateLink = () => {
    setLinkGenerated(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent('You\'ve been invited to join YouConnect Onboarding');
    const body = encodeURIComponent(
      `Hi ${participantName},\n\nYou've been invited to participate in the YouConnect onboarding process.\n\nClick the link below to accept your invitation and set up your password:\n\n${inviteLink}\n\nIf you have any questions, please don't hesitate to reach out.\n\nBest regards,\nYouConnect Team`
    );
    window.open(`mailto:${participantEmail}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="space-y-3">
      {!linkGenerated ? (
        <button
          onClick={handleGenerateLink}
          className="w-full px-4 py-2 text-sm font-semibold text-primary bg-white border-2 border-primary rounded-lg hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
        >
          Generate Invite Link
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-1 bg-transparent text-xs text-slate-600 outline-none truncate"
            />
            {/* Quick Copy Icon Button */}
            <button
              onClick={handleCopyLink}
              className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded transition-colors flex-shrink-0"
              title={copied ? "Copied!" : "Copy link"}
            >
              {copied ? (
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 text-xs font-medium text-white bg-primary rounded hover:bg-primary/90 transition-colors flex-shrink-0"
            >
              {copied ? (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </span>
              ) : (
                'Copy'
              )}
            </button>
          </div>
          
          <button
            onClick={handleSendEmail}
            className="w-full px-4 py-2 text-sm font-medium text-secondary-foreground bg-white border border-input rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send via Email
          </button>
        </div>
      )}
    </div>
  );
}

