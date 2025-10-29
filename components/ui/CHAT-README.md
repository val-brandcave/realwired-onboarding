# Chat Assistant Feature

## 🎯 Overview

The Chat Assistant is an integrated help system that provides users with instant support, resource recommendations, and ticket creation capabilities throughout the YouConnect onboarding experience.

## 📦 Components

### 1. **ChatBot.tsx**
The main chat interface component that handles conversations, bot responses, and action buttons.

**Features:**
- Real-time message display
- Smart bot responses based on keywords
- Action buttons for resources, tickets, and links
- Quick action shortcuts
- Typing indicators
- Message history
- Context-aware suggestions

**Usage:**
```tsx
import { ChatBot } from '@/components/ui/ChatBot';

<ChatBot 
  isOpen={true} 
  embedded={false} 
  contextPage="module-1"
/>
```

**Props:**
- `isOpen` (boolean): Controls visibility
- `onClose` (function): Callback when closed
- `embedded` (boolean): Whether it's embedded in a panel or floating
- `contextPage` (string): Current page/module context

### 2. **FloatingChatButton.tsx**
A floating action button that opens the chat assistant.

**Features:**
- Always visible on screen
- Notification badge
- Hover tooltip
- Smooth animations
- Opens chat window on click

**Usage:**
```tsx
import { FloatingChatButton } from '@/components/ui/FloatingChatButton';

<FloatingChatButton />
```

### 3. **HelpModal.tsx** (Enhanced)
Updated to include tabbed interface with chat and contact form.

**Features:**
- Tab system (Chat Assistant | Contact Support)
- Integrated ChatBot in first tab
- Traditional contact form in second tab
- Seamless switching between tabs

## 🚀 Implementation

### On Hub Page
The floating chat button appears in the bottom-right corner:

```tsx
import { FloatingChatButton } from "@/components/ui/FloatingChatButton";

// In your component
<FloatingChatButton />
```

### In Help Modal
Chat is integrated as the default tab when help modal opens:

```tsx
// Already integrated - just click "Need Help?" button
```

### In Education Panels (Future)
Can be embedded directly in right-side education panels:

```tsx
<div className="education-panel">
  <ChatBot isOpen={true} embedded={true} contextPage="current-module" />
</div>
```

## 💡 Bot Intelligence

The bot responds to various keywords and provides contextual help:

### Recognized Topics:
- **Property & Definitions**: "property", "definition"
  - Links to property setup, video tutorials
  
- **Routing**: "routing", "assign"
  - Links to routing docs, routing types
  
- **Users & Teams**: "user", "team", "lending group"
  - Links to user setup, lending groups info
  
- **Settings**: "timer", "notification", "setting"
  - Links to settings guide, timer configuration
  
- **General Help**: "help", "support", "ticket"
  - Options to browse resources, submit tickets, schedule calls

### Bot Actions:
1. **Resource Links** - Direct navigation to help pages
2. **Ticket Creation** - Submit support tickets with unique reference numbers
3. **External Links** - Open knowledge base, video tutorials, scheduling

## 🎨 Design Features

### Visual Elements:
- **Brand Colors**: Uses YouConnect's #9F2E2B red gradient
- **Modern UI**: Clean, rounded corners, shadows
- **Responsive**: Works on all screen sizes
- **Animations**: 
  - Typing indicator with bouncing dots
  - Smooth message transitions
  - Button hover effects
  - Badge pulse animation

### User Experience:
- **Persistent**: Chat history maintained during session
- **Accessible**: Keyboard navigation (Enter to send)
- **Quick Actions**: One-click common tasks
- **Contextual**: Aware of current page/module
- **Non-intrusive**: Collapsible on hub, embedded elsewhere

## 🔧 Customization

### Adding New Bot Responses:
Edit `components/ui/ChatBot.tsx` in the `generateBotResponse` function:

```typescript
if (lowerMsg.includes('your-keyword')) {
  return {
    id: Date.now().toString(),
    type: 'bot',
    content: "Your response here",
    timestamp: new Date(),
    actions: [
      { label: 'Action 1', type: 'resource', value: '/path' },
      { label: 'Action 2', type: 'ticket', value: 'topic' }
    ]
  };
}
```

### Styling:
All styles are inline Tailwind CSS classes. Modify colors in the component files to match your brand.

### Integration with Backend:
To connect to a real chat API:
1. Replace `generateBotResponse` with API call
2. Update ticket creation to POST to your backend
3. Add authentication as needed

## 📱 Mobile Responsiveness

- Chat window adjusts to screen size
- Floating button positioned appropriately
- Touch-friendly tap targets
- Scrollable message history

## 🚦 Status

✅ **Implemented:**
- Basic chat interface
- Bot keyword recognition
- Action buttons
- Floating chat button on hub
- Integration with help modal
- Quick action shortcuts

🔄 **Future Enhancements:**
- AI-powered responses
- Chat history persistence (localStorage/database)
- File attachments
- Real-time typing indicators for live agents
- Multi-language support
- Advanced analytics

## 🐛 Known Issues

None currently - all features working as designed!

## 📞 Support

For questions about the chat feature implementation, contact the development team or refer to the main YouConnect documentation.

