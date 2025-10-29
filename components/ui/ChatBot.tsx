"use client";

import { useState, useRef, useEffect } from 'react';

export interface Message {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  actions?: {
    label: string;
    type: 'resource' | 'ticket' | 'link';
    value: string;
  }[];
}

interface ChatBotProps {
  isOpen: boolean;
  onClose?: () => void;
  embedded?: boolean; // Whether it's embedded in a panel or floating
  contextPage?: string; // Which page/module the chat is on
}

export function ChatBot({ isOpen, onClose, embedded = false, contextPage: _contextPage }: ChatBotProps) {
  const messageIdCounter = useRef(0);
  
  const generateUniqueId = () => {
    messageIdCounter.current += 1;
    return `msg-${Date.now()}-${messageIdCounter.current}-${Math.random().toString(36).substr(2, 9)}`;
  };
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-1',
      type: 'bot',
      content: "Hi! I'm your YouConnect assistant. I can help answer questions, find resources, or connect you with support. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForTicketDescription, setWaitingForTicketDescription] = useState(false);
  const [isProcessingTicket, setIsProcessingTicket] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Check for common question patterns
    if (lowerMsg.includes('property') || lowerMsg.includes('definition')) {
      return {
        id: generateUniqueId(),
        type: 'bot',
        content: "I can help with property definitions! Here are some helpful resources:",
        timestamp: new Date(),
        actions: [
          { label: '📚 View Property Setup Guide', type: 'resource', value: '/definitions/properties/configure' },
          { label: '🎥 Watch Video Tutorial', type: 'resource', value: 'video' },
          { label: '👤 Connect to Live Agent', type: 'ticket', value: 'connect-agent' }
        ]
      };
    }
    
    if (lowerMsg.includes('routing') || lowerMsg.includes('assign')) {
      return {
        id: generateUniqueId(),
        type: 'bot',
        content: "Routing determines how orders are assigned. Here's what I can show you:",
        timestamp: new Date(),
        actions: [
          { label: '📖 Routing Documentation', type: 'resource', value: '/routing-intro' },
          { label: '🔍 View Routing Types', type: 'resource', value: '/routing-setup/request-type' },
          { label: '👤 Connect to Live Agent', type: 'ticket', value: 'connect-agent' }
        ]
      };
    }
    
    if (lowerMsg.includes('user') || lowerMsg.includes('team') || lowerMsg.includes('lending group')) {
      return {
        id: generateUniqueId(),
        type: 'bot',
        content: "Need help with users and teams? Check these out:",
        timestamp: new Date(),
        actions: [
          { label: '👥 User Setup Guide', type: 'resource', value: '/users-intro' },
          { label: '🏦 Lending Groups Info', type: 'resource', value: '/users/lending-groups' },
          { label: '👤 Connect to Live Agent', type: 'ticket', value: 'connect-agent' }
        ]
      };
    }
    
    if (lowerMsg.includes('timer') || lowerMsg.includes('notification') || lowerMsg.includes('setting')) {
      return {
        id: generateUniqueId(),
        type: 'bot',
        content: "General settings control timers and notifications:",
        timestamp: new Date(),
        actions: [
          { label: '⚙️ Settings Guide', type: 'resource', value: '/general-settings' },
          { label: '⏱️ Timer Configuration', type: 'resource', value: '/general-settings' },
          { label: '👤 Connect to Live Agent', type: 'ticket', value: 'connect-agent' }
        ]
      };
    }

    if (lowerMsg.includes('help') || lowerMsg.includes('support') || lowerMsg.includes('ticket')) {
      return {
        id: generateUniqueId(),
        type: 'bot',
        content: "I'd be happy to help! What would you like to do?",
        timestamp: new Date(),
        actions: [
          { label: '📚 Browse Resources', type: 'resource', value: 'browse' },
          { label: '👤 Connect to Live Agent', type: 'ticket', value: 'connect-agent' },
        ]
      };
    }
    
    // Default response
    return {
      id: generateUniqueId(),
      type: 'bot',
      content: "I'm here to help! I can assist with property definitions, routing setup, user management, and general settings. What would you like to know more about?",
      timestamp: new Date(),
      actions: [
        { label: '📚 View All Resources', type: 'resource', value: 'browse' },
        { label: '👤 Connect to Live Agent', type: 'ticket', value: 'connect-agent' }
      ]
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateUniqueId(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    // If we're waiting for ticket description, process it as a ticket
    if (waitingForTicketDescription) {
      setIsProcessingTicket(true);
      setWaitingForTicketDescription(false);
      
      // Show processing message
      const processingMessage: Message = {
        id: generateUniqueId(),
        type: 'system',
        content: '🔄 Processing your request...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, processingMessage]);

      // Simulate ticket creation with processing time
      setTimeout(() => {
        setIsProcessingTicket(false);
        const ticketId = `TKT-${Math.floor(Math.random() * 90000) + 10000}`;
        const ticketMessage: Message = {
          id: generateUniqueId(),
          type: 'system',
          content: `✅ Support ticket submitted successfully!\n\nTicket ID: ${ticketId}\n\nOur team will review your issue and respond within 24 hours. You can track your ticket status in the support portal.`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, ticketMessage]);
      }, 2000);
      return;
    }

    // Normal message processing
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = generateBotResponse(currentInput);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleActionClick = (action: Message['actions'][0]) => {
    if (action.type === 'ticket') {
      // Handle connect to agent request
      if (action.value === 'connect-agent') {
        setIsTyping(true);
        
        // Simulate checking for agents
        setTimeout(() => {
          const checkingMessage: Message = {
            id: generateUniqueId(),
            type: 'system',
            content: '🔍 Checking for available agents...',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, checkingMessage]);
          
          // Show no agent available message
          setTimeout(() => {
            const noAgentMessage: Message = {
              id: generateUniqueId(),
              type: 'bot',
              content: "I'm sorry, but no live agents are currently available. However, I can help you submit a support ticket!\n\nPlease describe your issue below and we'll create a ticket for you. Our team will review it and get back to you as soon as possible.",
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, noAgentMessage]);
            setIsTyping(false);
            setWaitingForTicketDescription(true);
          }, 1500);
        }, 800);
        return;
      }
      
      // Old ticket handling for other actions
      const ticketMessage: Message = {
        id: generateUniqueId(),
        type: 'system',
        content: `✅ Support ticket created! We'll get back to you within 24 hours. Reference: TICKET-${Math.floor(Math.random() * 10000)}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, ticketMessage]);
    } else if (action.type === 'resource') {
      if (action.value === 'browse' || action.value === 'video') {
        const resourceMessage: Message = {
          id: generateUniqueId(),
          type: 'bot',
          content: "Here are some helpful resources based on what you're working on:",
          timestamp: new Date(),
          actions: [
            { label: '📖 Getting Started Guide', type: 'link', value: '/hub' },
            { label: '🎥 Video Tutorials', type: 'link', value: 'videos' },
            { label: '📚 Knowledge Base', type: 'link', value: 'kb' }
          ]
        };
        setMessages(prev => [...prev, resourceMessage]);
      } else {
        // Navigate to resource
        window.location.href = action.value;
      }
    } else if (action.type === 'link') {
      const linkMessage: Message = {
        id: generateUniqueId(),
        type: 'system',
        content: `Opening: ${action.label}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, linkMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: '❓', label: 'Common Questions', value: 'help' },
    { icon: '📚', label: 'Resources', value: 'browse resources' },
  ];

  if (!isOpen && !embedded) return null;

  return (
    <div className={`flex flex-col ${embedded ? 'h-full' : 'fixed bottom-20 right-6 w-96 h-[600px]'} bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden z-50`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">YouConnect Assistant</h3>
            <p className="text-xs text-white/80">Always here to help</p>
          </div>
        </div>
        {!embedded && onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'system' ? 'w-full' : ''}`}>
              <div className={`rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-[#9F2E2B] text-white' 
                  : message.type === 'system'
                  ? 'bg-blue-50 border border-blue-200 text-blue-900 text-sm text-center'
                  : 'bg-white border border-slate-200 text-slate-900'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              
              {/* Action Buttons */}
              {message.actions && message.actions.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleActionClick(action)}
                      className="w-full text-left px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:border-[#9F2E2B] transition-colors flex items-center gap-2"
                    >
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-slate-400 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {(isTyping || isProcessingTicket) && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="border-t border-slate-200 bg-white p-2 flex gap-2">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInputValue(action.value);
              setTimeout(() => handleSendMessage(), 100);
            }}
            className="flex-1 px-2 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            title={action.label}
          >
            <span className="mr-1">{action.icon}</span>
            <span className="hidden sm:inline">{action.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white p-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={waitingForTicketDescription ? "Describe your issue..." : "Ask a question..."}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-[#9F2E2B] text-white rounded-lg hover:bg-[#8A2826] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

