"use client";

import { useState } from 'react';

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  onMeetingRequest?: (data: { day: string; timeframe: string; reason: string }) => void;
}

export function ChatSidebar({ onMeetingRequest }: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome! I\'m here to help you with your onboarding. You can chat with me or request a meeting with our team.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [meetingData, setMeetingData] = useState({
    day: '',
    timeframe: '',
    reason: ''
  });
  const [agentAvailable] = useState(false); // Simulated - would be from backend

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate agent response or create support ticket
    setTimeout(() => {
      if (agentAvailable) {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'agent',
          content: 'Thank you for your message. An agent will respond shortly.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentMessage]);
      } else {
        const systemMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: 'No agent is currently available. A support ticket has been created and we\'ll get back to you within 24 hours.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, systemMessage]);
      }
    }, 1000);
  };

  const handleMeetingRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onMeetingRequest) {
      onMeetingRequest(meetingData);
    }

    const systemMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: `Meeting request submitted for ${meetingData.day} during ${meetingData.timeframe}. Our CS team will contact you to confirm.`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, systemMessage]);
    setShowMeetingForm(false);
    setMeetingData({ day: '', timeframe: '', reason: '' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Sidebar */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 w-96 h-[600px] bg-white shadow-2xl border-l border-t border-slate-200 rounded-tl-xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] p-4 rounded-tl-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Customer Success</h3>
                <p className="text-white/80 text-xs">
                  {agentAvailable ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white'
                      : message.type === 'agent'
                      ? 'bg-white border border-slate-200 text-slate-900'
                      : 'bg-blue-50 border border-blue-200 text-blue-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-white/70' : 'text-slate-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Meeting Request Form */}
          {showMeetingForm && (
            <div className="p-4 bg-white border-t border-slate-200">
              <form onSubmit={handleMeetingRequest} className="space-y-3">
                <h4 className="font-semibold text-sm text-slate-900">Request a Meeting</h4>
                
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Day *
                  </label>
                  <input
                    type="date"
                    required
                    value={meetingData.day}
                    onChange={(e) => setMeetingData({ ...meetingData, day: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Timeframe *
                  </label>
                  <select
                    required
                    value={meetingData.timeframe}
                    onChange={(e) => setMeetingData({ ...meetingData, timeframe: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                  >
                    <option value="">Select timeframe</option>
                    <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                    <option value="Afternoon (12PM-3PM)">Afternoon (12PM-3PM)</option>
                    <option value="Late Afternoon (3PM-6PM)">Late Afternoon (3PM-6PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Reason *
                  </label>
                  <textarea
                    required
                    value={meetingData.reason}
                    onChange={(e) => setMeetingData({ ...meetingData, reason: e.target.value })}
                    placeholder="What would you like to discuss?"
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowMeetingForm(false)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D]"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Input Area */}
          {!showMeetingForm && (
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="mb-3">
                <button
                  onClick={() => setShowMeetingForm(true)}
                  className="w-full px-4 py-2 text-sm font-medium text-[#9F2E2B] bg-red-50 border border-[#9F2E2B] rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Request a Meeting
                </button>
              </div>
              
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}

