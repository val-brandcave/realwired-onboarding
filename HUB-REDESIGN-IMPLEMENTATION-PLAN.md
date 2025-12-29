# 🎨 Hub Redesign Implementation Plan - Figma to Code

**Date**: December 29, 2025  
**Status**: Ready to implement  
**Total Effort**: 30-41 hours  
**Design Reference**: Figma mockup provided  

---

## 🎯 **Design Goals**

Transform the hub from a simple grid layout to a sophisticated kanban-style dashboard with:
- Video-featured hero card for next module
- Detailed progress dashboard with circular chart
- Kanban columns (To Do, In Progress, Blocked, Completed)
- Enhanced module cards with progress bars and step indicators
- Avatar groups for participants
- Better visual hierarchy and modern SaaS aesthetic

---

## 📋 **Implementation Phases**

### **Phase 1: Data Structure & Context Updates** (3-4 hours)

#### **1.1 Update Module Status Type**

**File**: `lib/onboarding-context.tsx`

Add `blocked` status:
```typescript
export type ModuleStatus = 'not_started' | 'in_progress' | 'blocked' | 'completed';
```

#### **1.2 Add Module Details Interface**

```typescript
interface ModuleDetails {
  id: OnboardingModule;
  status: ModuleStatus;
  progress: number; // 0-100
  currentStep: number;
  totalSteps: number;
  assignedParticipants: string[]; // Participant IDs
  targetDate?: string;
  videoUrl?: string;
  blockerReason?: string;
  blockedDate?: string;
}
```

#### **1.3 Add Progress Overview Interface**

```typescript
interface ProgressOverview {
  toDoCount: number;
  inProgressCount: number;
  blockedCount: number;
  completedCount: number;
  overallProgress: number; // 0-100
  daysLeft?: number;
  goLiveDate?: string;
  onTrackStatus: 'on-track' | 'at-risk' | 'critical';
}
```

#### **1.4 Add Context Methods**

```typescript
// Update module status
setModuleStatus(moduleId: OnboardingModule, status: ModuleStatus): void

// Update module progress
setModuleProgress(moduleId: OnboardingModule, progress: number, currentStep: number): void

// Block module with reason
blockModule(moduleId: OnboardingModule, reason: string): void

// Unblock module
unblockModule(moduleId: OnboardingModule): void

// Calculate progress overview
getProgressOverview(): ProgressOverview
```

#### **1.5 Define Module Metadata**

```typescript
const MODULE_METADATA: Record<OnboardingModule, {
  number: number;
  title: string;
  description: string;
  duration: string;
  icon: ReactNode;
  totalSteps: number;
  videoUrl: string;
}> = {
  'company-setup': {
    number: 1,
    title: 'Organization Setup',
    description: 'Configure vendor types, credentials, classifications, search criteria, then upload template',
    duration: '5 Min',
    totalSteps: 4,
    icon: <BuildingIcon />,
    videoUrl: '/videos/org-setup.mp4',
  },
  // ... all 7 modules
};
```

**Deliverables:**
- [ ] Update ModuleStatus type
- [ ] Add ModuleDetails interface
- [ ] Add ProgressOverview interface
- [ ] Add context methods
- [ ] Define module metadata
- [ ] Test TypeScript compilation

---

### **Phase 2: Hero Section Component** (3-4 hours)

#### **2.1 Create NextModuleHero Component**

**File**: `app/hub/_components/NextModuleHero.tsx` (NEW)

**Features:**
- Large card with video thumbnail
- "YOUR NEXT MODULE" label
- Module title (large)
- Description (2-3 lines)
- Module number badge
- Duration badge
- Assigned to with avatar dropdown
- Large "Get started →" button

**Component Structure:**
```tsx
interface NextModuleHeroProps {
  module: {
    id: OnboardingModule;
    number: number;
    title: string;
    description: string;
    duration: string;
    videoUrl?: string;
    assignedParticipants: string[];
  };
  onStart: () => void;
}

export function NextModuleHero({ module, onStart }: NextModuleHeroProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300">
        <button 
          className="absolute inset-0 flex items-center justify-center group"
          aria-label="Play video"
        >
          <div className="w-20 h-20 bg-[#9F2E2B] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-white ml-1">
              {/* Play icon */}
            </svg>
          </div>
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          YOUR NEXT MODULE
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {module.title}
        </h2>
        
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {module.description}
        </p>
        
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
            Module {module.number}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
            ● {module.duration}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-5">
          <span className="text-sm text-gray-700">Assigned to:</span>
          <ParticipantAvatarDropdown participants={module.assignedParticipants} />
        </div>
        
        <button
          onClick={onStart}
          className="w-full py-3 px-6 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Get started</span>
          <svg className="w-5 h-5">{/* Arrow icon */}</svg>
        </button>
      </div>
    </div>
  );
}
```

**Deliverables:**
- [ ] Create NextModuleHero.tsx
- [ ] Add video thumbnail placeholder
- [ ] Implement play button overlay
- [ ] Style module badges
- [ ] Add participant selector
- [ ] Create "Get started" button
- [ ] Test responsive layout

---

### **Phase 3: Progress Dashboard Component** (3-4 hours)

#### **3.1 Create ProgressDashboard Component**

**File**: `app/hub/_components/ProgressDashboard.tsx` (NEW)

**Features:**
- Title "Onboarding Progress"
- 4 status boxes (To Do, In Progress, Blocked, Done)
- On Track status badge
- Days left
- Go-Live Date
- Circular progress chart

**Component Structure:**
```tsx
interface ProgressDashboardProps {
  overview: {
    toDoCount: number;
    inProgressCount: number;
    blockedCount: number;
    completedCount: number;
    overallProgress: number;
    daysLeft?: number;
    goLiveDate?: string;
    onTrackStatus: 'on-track' | 'at-risk' | 'critical';
  };
}

export function ProgressDashboard({ overview }: ProgressDashboardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Onboarding Progress
      </h3>
      
      {/* Status Boxes Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <StatusBox count={overview.toDoCount} label="To Do" color="teal" />
        <StatusBox count={overview.inProgressCount} label="In Progress" color="orange" />
        <StatusBox count={overview.blockedCount} label="Blocked" color="red" />
        <StatusBox count={overview.completedCount} label="Done" color="green" />
      </div>
      
      {/* Status Badge */}
      <div className="mb-4">
        <StatusBadge status={overview.onTrackStatus} />
      </div>
      
      {/* Timeline Info */}
      <div className="text-sm text-gray-700 space-y-1 mb-5">
        <div className="flex justify-between">
          <span>Days left</span>
          <span className="font-semibold">{overview.daysLeft || '--'}</span>
        </div>
        <div className="flex justify-between">
          <span>Go-Live Date</span>
          <span className="font-semibold">{overview.goLiveDate || 'Not set'}</span>
        </div>
      </div>
      
      {/* Circular Progress Chart */}
      <div className="flex justify-center">
        <CircularProgressChart percentage={overview.overallProgress} />
      </div>
    </div>
  );
}
```

#### **3.2 Create CircularProgressChart Component**

**File**: `app/hub/_components/CircularProgressChart.tsx` (NEW)

Use SVG for circular progress:
```tsx
export function CircularProgressChart({ percentage }: { percentage: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle cx="96" cy="96" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        
        {/* Progress circle (multi-color segments) */}
        <circle 
          cx="96" cy="96" r={radius} 
          fill="none" 
          stroke="url(#progressGradient)" 
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient">
            <stop offset="0%" stopColor="#14b8a6" /> {/* Teal */}
            <stop offset="50%" stopColor="#f59e0b" /> {/* Orange */}
            <stop offset="100%" stopColor="#10b981" /> {/* Green */}
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-gray-900">{percentage}%</div>
        <div className="text-sm text-gray-600">completion</div>
      </div>
    </div>
  );
}
```

**Deliverables:**
- [ ] Create ProgressDashboard.tsx
- [ ] Create StatusBox component
- [ ] Create StatusBadge component
- [ ] Create CircularProgressChart.tsx
- [ ] Implement multi-color gradient
- [ ] Test with different percentages

---

### **Phase 4: Kanban Layout Component** (5-6 hours)

#### **4.1 Create ModulesKanban Component**

**File**: `app/hub/_components/ModulesKanban.tsx` (NEW)

**Features:**
- 4 columns with headers and counts
- Responsive grid
- Drag/drop support
- Column styling

```tsx
interface ModulesKanbanProps {
  modules: ModuleDetails[];
  onModuleStatusChange: (moduleId: OnboardingModule, newStatus: ModuleStatus, reason?: string) => void;
  onModuleStart: (moduleId: OnboardingModule) => void;
}

export function ModulesKanban({ modules, onModuleStatusChange, onModuleStart }: ModulesKanbanProps) {
  const toDoModules = modules.filter(m => m.status === 'not_started');
  const inProgressModules = modules.filter(m => m.status === 'in_progress');
  const blockedModules = modules.filter(m => m.status === 'blocked');
  const completedModules = modules.filter(m => m.status === 'completed');

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Onboarding Modules
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* To Do Column */}
        <KanbanColumn
          title="To Do"
          count={toDoModules.length}
          color="blue"
          modules={toDoModules}
          onDrop={(moduleId) => onModuleStatusChange(moduleId, 'not_started')}
        />
        
        {/* In Progress Column */}
        <KanbanColumn
          title="In Progress"
          count={inProgressModules.length}
          color="orange"
          modules={inProgressModules}
          onDrop={(moduleId) => onModuleStatusChange(moduleId, 'in_progress')}
        />
        
        {/* Blocked Column */}
        <KanbanColumn
          title="Blocked"
          count={blockedModules.length}
          color="red"
          modules={blockedModules}
          onDrop={(moduleId, reason) => onModuleStatusChange(moduleId, 'blocked', reason)}
          requiresReason={true}
        />
        
        {/* Completed Column */}
        <KanbanColumn
          title="Completed"
          count={completedModules.length}
          color="green"
          modules={completedModules}
          acceptsDrop={false} // Cannot drag to completed
        />
      </div>
    </div>
  );
}
```

#### **4.2 Create KanbanColumn Component**

**File**: `app/hub/_components/KanbanColumn.tsx` (NEW)

```tsx
interface KanbanColumnProps {
  title: string;
  count: number;
  color: 'blue' | 'orange' | 'red' | 'green';
  modules: ModuleDetails[];
  onDrop?: (moduleId: OnboardingModule, reason?: string) => void;
  acceptsDrop?: boolean;
  requiresReason?: boolean;
}

export function KanbanColumn({ 
  title, 
  count, 
  color, 
  modules, 
  onDrop,
  acceptsDrop = true,
  requiresReason = false 
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    green: 'bg-green-50 text-green-700 border-green-200',
  };

  return (
    <div className="flex flex-col">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          {title}
        </h3>
        <span className={`inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-bold ${colorClasses[color]}`}>
          {count}
        </span>
      </div>
      
      {/* Drop Zone */}
      <div
        className={`flex-1 space-y-4 min-h-[400px] ${
          isDragOver && acceptsDrop ? 'bg-blue-50 rounded-lg p-2' : ''
        }`}
        onDragOver={(e) => {
          if (acceptsDrop) {
            e.preventDefault();
            setIsDragOver(true);
          }
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => handleDrop(e, onDrop, requiresReason)}
      >
        {modules.map(module => (
          <ModuleCard 
            key={module.id} 
            module={module}
            draggable={module.status !== 'completed'}
          />
        ))}
        
        {modules.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No modules here
          </div>
        )}
      </div>
    </div>
  );
}
```

**Deliverables:**
- [ ] Create ModulesKanban.tsx
- [ ] Create KanbanColumn.tsx
- [ ] Implement drag/drop zones
- [ ] Add column styling
- [ ] Handle empty states
- [ ] Test drag interactions

---

### **Phase 5: Enhanced Module Card Component** (4-5 hours)

#### **5.1 Create ModuleCard Component**

**File**: `app/hub/_components/ModuleCard.tsx` (NEW or MAJOR UPDATE)

**Features:**
- Module number + status badge
- Large centered icon
- Module title
- Duration badge
- Description text
- Full-width progress bar with percentage
- Step indicator
- Avatar group (4 visible + count)
- Contextual action button

```tsx
interface ModuleCardProps {
  module: ModuleDetails;
  draggable?: boolean;
  onStart?: () => void;
  onContinue?: () => void;
  onEdit?: () => void;
}

export function ModuleCard({ module, draggable = true, onStart, onContinue, onEdit }: ModuleCardProps) {
  const metadata = MODULE_METADATA[module.id];
  
  return (
    <div
      draggable={draggable}
      onDragStart={(e) => handleDragStart(e, module.id)}
      className={`
        bg-white rounded-lg border-2 border-gray-200 p-5 
        transition-all hover:shadow-md
        ${draggable ? 'cursor-grab active:cursor-grabbing' : 'opacity-90'}
      `}
    >
      {/* Header: Module Number + Status Badge */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-gray-600">
          Module {metadata.number}
        </span>
        <StatusBadge status={module.status} />
      </div>
      
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 flex items-center justify-center text-gray-700">
          {metadata.icon}
        </div>
      </div>
      
      {/* Title */}
      <h4 className="text-lg font-bold text-gray-900 text-center mb-2">
        {metadata.title}
      </h4>
      
      {/* Duration Badge */}
      <div className="flex justify-center mb-3">
        <span className="text-sm text-gray-600">
          ● {metadata.duration}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm text-gray-600 text-center mb-4 leading-snug line-clamp-3">
        {metadata.description}
      </p>
      
      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span className="font-semibold">{module.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(module.progress)}`}
            style={{ width: `${module.progress}%` }}
          />
        </div>
      </div>
      
      {/* Step Indicator */}
      <div className="text-center text-xs text-gray-500 mb-4">
        Step {module.currentStep} of {metadata.totalSteps}
      </div>
      
      {/* Avatar Group */}
      <div className="flex justify-center mb-4">
        <AvatarGroup participants={module.assignedParticipants} max={4} />
      </div>
      
      {/* Action Button */}
      {renderActionButton(module.status)}
      
      {/* Blocker Info (if blocked) */}
      {module.status === 'blocked' && module.blockerReason && (
        <div className="mt-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">
          <strong>Blocked:</strong> {module.blockerReason}
        </div>
      )}
    </div>
  );
}

function getProgressColor(progress: number): string {
  if (progress === 0) return 'bg-gray-400';
  if (progress < 50) return 'bg-orange-400';
  if (progress < 100) return 'bg-amber-400';
  return 'bg-green-500';
}

function renderActionButton(status: ModuleStatus) {
  switch (status) {
    case 'not_started':
      return (
        <button className="w-full py-2.5 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <span>Start</span>
          <svg className="w-4 h-4">{/* Arrow */}</svg>
        </button>
      );
    case 'in_progress':
      return (
        <button className="w-full py-2.5 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <span>Continue</span>
          <svg className="w-4 h-4">{/* Arrow */}</svg>
        </button>
      );
    case 'blocked':
      return (
        <button className="w-full py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4">{/* Alert icon */}</svg>
          <span>Resolve Block</span>
        </button>
      );
    case 'completed':
      return (
        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#9F2E2B] hover:text-[#9F2E2B] transition-colors">
            Review
          </button>
          <button className="flex-1 py-2 bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] text-white font-medium rounded-lg hover:shadow-lg transition-all">
            Edit
          </button>
        </div>
      );
  }
}
```

#### **5.2 Create StatusBox Component**

**File**: `app/hub/_components/StatusBox.tsx` (NEW)

Small colored box showing count and label.

#### **5.3 Create StatusBadge Component**

**File**: `app/hub/_components/StatusBadge.tsx` (NEW)

Shows "On Track", "At Risk", or "Critical" with appropriate styling.

**Deliverables:**
- [ ] Create/update ModuleCard.tsx
- [ ] Create StatusBox.tsx
- [ ] Create StatusBadge.tsx
- [ ] Implement progress bar colors
- [ ] Add blocker info display
- [ ] Create contextual buttons
- [ ] Test all card states

---

### **Phase 6: Avatar Group Component** (2-3 hours)

#### **6.1 Create AvatarGroup Component**

**File**: `app/hub/_components/AvatarGroup.tsx` (NEW)

**Features:**
- Shows up to 4 avatars overlapping
- "+X" indicator for additional participants
- Dropdown to see all participants
- Colored avatars with initials

```tsx
interface AvatarGroupProps {
  participants: string[]; // Participant IDs
  max?: number;
  showDropdown?: boolean;
}

export function AvatarGroup({ participants, max = 4, showDropdown = true }: AvatarGroupProps) {
  const { state } = useOnboarding();
  const [showAll, setShowAll] = useState(false);
  
  // Get participant details
  const participantDetails = participants.map(id => 
    state.companySetup.additionalParticipants?.find(p => p.id === id) ||
    state.companySetup.primaryDecisionMaker
  ).filter(Boolean);
  
  const visibleParticipants = participantDetails.slice(0, max);
  const remainingCount = participantDetails.length - max;

  return (
    <div className="relative flex items-center">
      <div className="flex items-center -space-x-2">
        {visibleParticipants.map((participant, idx) => (
          <div
            key={participant.id}
            className="relative w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white shadow-sm"
            style={{ backgroundColor: participant.avatarColor || '#9F2E2B' }}
            title={participant.name}
          >
            {getInitials(participant.name)}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-xs font-semibold text-white shadow-sm">
            +{remainingCount}
          </div>
        )}
        
        {showDropdown && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Show all participants"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Dropdown */}
      {showAll && (
        <ParticipantDropdown 
          participants={participantDetails}
          onClose={() => setShowAll(false)}
        />
      )}
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
```

**Deliverables:**
- [ ] Create AvatarGroup.tsx
- [ ] Implement overlapping avatars
- [ ] Add "+X" indicator
- [ ] Create participant dropdown
- [ ] Generate avatar colors
- [ ] Test with different participant counts

---

### **Phase 7: Drag & Drop Logic** (3-4 hours)

#### **7.1 Implement Drag Handlers**

**File**: `app/hub/_components/ModuleCard.tsx`

```tsx
const handleDragStart = (e: React.DragEvent, moduleId: OnboardingModule) => {
  e.dataTransfer.setData('moduleId', moduleId);
  e.dataTransfer.effectAllowed = 'move';
  
  // Add ghost image styling
  if (e.currentTarget instanceof HTMLElement) {
    e.currentTarget.style.opacity = '0.5';
  }
};

const handleDragEnd = (e: React.DragEvent) => {
  if (e.currentTarget instanceof HTMLElement) {
    e.currentTarget.style.opacity = '1';
  }
};
```

#### **7.2 Implement Drop Handlers**

**File**: `app/hub/_components/KanbanColumn.tsx`

```tsx
const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragOver(false);
  
  const moduleId = e.dataTransfer.getData('moduleId') as OnboardingModule;
  
  if (!acceptsDrop) {
    // Show toast: "Cannot move to this column"
    return;
  }
  
  if (requiresReason) {
    // Open blocker reason modal
    setBlockerModalOpen({ moduleId });
  } else {
    // Update status directly
    onDrop?.(moduleId);
  }
};
```

#### **7.3 Visual Feedback**

```tsx
// Drop zone indicator
{isDragOver && acceptsDrop && (
  <div className="absolute inset-0 border-2 border-dashed border-blue-400 bg-blue-50/50 rounded-lg flex items-center justify-center">
    <span className="text-sm font-medium text-blue-600">
      Drop here to move
    </span>
  </div>
)}

// Rejected drop
{isDragOver && !acceptsDrop && (
  <div className="absolute inset-0 border-2 border-dashed border-red-400 bg-red-50/50 rounded-lg flex items-center justify-center">
    <span className="text-sm font-medium text-red-600">
      Cannot move here
    </span>
  </div>
)}
```

**Deliverables:**
- [ ] Implement drag handlers
- [ ] Implement drop handlers
- [ ] Add visual feedback
- [ ] Validate allowed moves
- [ ] Test drag/drop interactions
- [ ] Add keyboard accessibility

---

### **Phase 8: Blocker Modal** (2-3 hours)

#### **8.1 Create BlockerReasonModal Component**

**File**: `app/hub/_components/BlockerReasonModal.tsx` (NEW)

```tsx
interface BlockerReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
  moduleName: string;
}

export function BlockerReasonModal({ isOpen, onClose, onSubmit, moduleName }: BlockerReasonModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');

  const reasons = [
    'Waiting on internal approval',
    'Technical issue / error',
    'Missing information from team',
    'Waiting on external party (IT, vendor, etc.)',
    'Need help from CS agent',
    'Other (please describe)',
  ];

  const handleSubmit = () => {
    if (!selectedReason) return;
    onSubmit(selectedReason, details);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-xl font-bold text-gray-900">
            What's blocking your progress?
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Module: <strong>{moduleName}</strong>
          </p>
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Reason Options */}
          <div className="space-y-2">
            {reasons.map((reason) => (
              <label
                key={reason}
                className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#9F2E2B] transition-colors"
              >
                <input
                  type="radio"
                  name="blocker-reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">{reason}</span>
              </label>
            ))}
          </div>
          
          {/* Additional Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional details (optional)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide more context about what's blocking you..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent"
            />
          </div>
          
          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-blue-800">
              This will notify your CS agent and create a support ticket to help resolve the blocker.
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 p-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedReason}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Blocker
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Integration:**
- When module dragged to Blocked column → Opens modal
- When "Resolve Block" button clicked → Navigates to module
- Creates ticket in Support Tickets tab
- Notifies CS agent

**Deliverables:**
- [ ] Create BlockerReasonModal.tsx
- [ ] Add reason options
- [ ] Create support ticket integration
- [ ] Notify CS agent (mock for now)
- [ ] Test modal flow

---

### **Phase 9: Update Hub Page** (3-4 hours)

#### **9.1 Restructure Hub Page**

**File**: `app/hub/page.tsx` (MAJOR UPDATE)

**New Layout:**
```tsx
<MainLayout hideFloatingChat={false}>
  {/* Tabs - Unchanged */}
  <HubTabs activeTab={activeTab} onTabChange={setActiveTab} />
  
  {/* Onboarding Tab Content */}
  {activeTab === "onboarding" && (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Hero + Progress - 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <NextModuleHero 
          module={getNextModule()} 
          onStart={handleStartModule}
        />
        <ProgressDashboard 
          overview={calculateProgressOverview()}
        />
      </div>
      
      {/* Kanban Modules */}
      <ModulesKanban
        modules={getAllModulesWithDetails()}
        onModuleStatusChange={handleModuleStatusChange}
        onModuleStart={handleStartModule}
      />
      
    </div>
  )}
  
  {/* Products Tab - Unchanged */}
  {activeTab === "products" && <ProductDiscovery />}
  
  {/* Support Tickets Tab - Unchanged */}
  {activeTab === "support-tickets" && <TicketList />}
  
  {/* CS Team Tab - Unchanged */}
  {activeTab === "customer-success" && <CSAgentGrid />}
</MainLayout>
```

#### **9.2 Helper Functions**

```typescript
function getNextModule(): ModuleDetails | null {
  // Return first not_started or in_progress module
  const modules = getAllModulesWithDetails();
  return modules.find(m => 
    m.status === 'not_started' || m.status === 'in_progress'
  ) || null;
}

function calculateProgressOverview(): ProgressOverview {
  const modules = getAllModulesWithDetails();
  
  return {
    toDoCount: modules.filter(m => m.status === 'not_started').length,
    inProgressCount: modules.filter(m => m.status === 'in_progress').length,
    blockedCount: modules.filter(m => m.status === 'blocked').length,
    completedCount: modules.filter(m => m.status === 'completed').length,
    overallProgress: calculateOverallProgress(modules),
    daysLeft: calculateDaysLeft(),
    goLiveDate: getGoLiveDate(),
    onTrackStatus: calculateOnTrackStatus(modules),
  };
}

function getAllModulesWithDetails(): ModuleDetails[] {
  const moduleIds: OnboardingModule[] = [
    'company-setup',
    'definitions',
    'users',
    'vendors',
    'routing',
    'general-settings',
    'it-checklist',
  ];
  
  return moduleIds.map(id => ({
    id,
    status: state.moduleStatuses[id],
    progress: calculateModuleProgress(id),
    currentStep: getCurrentStep(id),
    totalSteps: MODULE_METADATA[id].totalSteps,
    assignedParticipants: getAssignedParticipants(id),
    targetDate: getModuleTargetDate(id),
    videoUrl: MODULE_METADATA[id].videoUrl,
  }));
}
```

**Deliverables:**
- [ ] Restructure hub page layout
- [ ] Add hero + progress grid
- [ ] Add kanban section
- [ ] Implement helper functions
- [ ] Calculate progress overview
- [ ] Handle module status changes
- [ ] Test all tab content still works

---

### **Phase 10: All-Complete State** (2-3 hours)

#### **10.1 Kanban All-Complete View**

When all 7 modules completed:

```tsx
{allModulesCompleted && (
  <>
    {/* Celebration Banner */}
    <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 text-center">
      <div className="text-4xl mb-3">🎉</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Congratulations! All modules completed
      </h2>
      <p className="text-gray-600">
        Your YouConnect instance is fully configured and ready for testing.
      </p>
    </div>
    
    {/* Kanban with all in Completed + CTA Cards */}
    <ModulesKanban 
      modules={modules}
      showCTACards={true}
    />
  </>
)}
```

#### **10.2 CTA Cards in Completed Column**

Add special cards to completed column:
```tsx
{/* Schedule Meeting CTA Card */}
<div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5">
  <div className="text-center">
    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
      <svg className="w-6 h-6 text-white">{/* Calendar icon */}</svg>
    </div>
    <h4 className="font-bold text-gray-900 mb-2">Schedule Meeting</h4>
    <p className="text-sm text-gray-600 mb-4">
      Book time with your CS agent
    </p>
    <button className="w-full py-2 bg-blue-600 text-white rounded-lg">
      Schedule Now
    </button>
  </div>
</div>

{/* Create Test Order CTA Card */}
<div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-5">
  {/* Similar structure */}
</div>
```

**Deliverables:**
- [ ] Add all-complete detection
- [ ] Create celebration banner
- [ ] Add CTA cards to completed column
- [ ] Implement Schedule Meeting modal
- [ ] Implement Create Test Order link
- [ ] Test complete state

---

### **Phase 11: Responsive & Mobile** (2-3 hours)

#### **11.1 Mobile Layout**

**Desktop** (> 1024px):
```
[Hero]            [Progress]
[To Do] [In Prog] [Blocked] [Done]
```

**Tablet** (768px - 1024px):
```
[Hero]
[Progress]
[To Do] [In Progress]
[Blocked] [Completed]
```

**Mobile** (< 768px):
```
[Hero]
[Progress]
[To Do ▼]     ← Expandable/Collapsible
[In Prog ▼]
[Blocked ▼]
[Done ▼]
```

#### **11.2 Responsive Grid**

```typescript
// Hero + Progress
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// Kanban
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

**Deliverables:**
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1440px)
- [ ] Test on ultrawide (1920px)
- [ ] Adjust card sizes
- [ ] Fix any overflow issues

---

### **Phase 12: Animations & Polish** (2-3 hours)

#### **12.1 Animations**

- Card hover effects
- Progress bar animation
- Circular chart animation
- Drag ghost opacity
- Drop zone pulse
- Status badge transitions
- Button hover states

#### **12.2 Icons**

Ensure all module icons match design:
- Organization Setup: Building
- Definitions: Document
- Users: People
- Vendors: Store/Network
- Routing: Map/Route
- General Settings: Gear
- IT Checklist: Shield

#### **12.3 Colors**

- Teal/Cyan for "To Do"
- Orange/Amber for "In Progress"
- Red for "Blocked"
- Green for "Completed"

**Deliverables:**
- [ ] Add smooth transitions
- [ ] Animate progress bars
- [ ] Add hover effects
- [ ] Polish drag interactions
- [ ] Verify icon consistency
- [ ] Test color contrast (accessibility)

---

## 📁 **New Files to Create**

### **Components:**
1. `app/hub/_components/NextModuleHero.tsx` (NEW)
2. `app/hub/_components/ProgressDashboard.tsx` (NEW)
3. `app/hub/_components/CircularProgressChart.tsx` (NEW)
4. `app/hub/_components/StatusBox.tsx` (NEW)
5. `app/hub/_components/StatusBadge.tsx` (NEW)
6. `app/hub/_components/ModulesKanban.tsx` (NEW)
7. `app/hub/_components/KanbanColumn.tsx` (NEW)
8. `app/hub/_components/ModuleCard.tsx` (UPDATE or NEW)
9. `app/hub/_components/AvatarGroup.tsx` (NEW)
10. `app/hub/_components/BlockerReasonModal.tsx` (NEW)

### **Files to Update:**
1. `lib/onboarding-context.tsx` (Add blocked status, methods)
2. `app/hub/page.tsx` (Major restructure)

**Total**: 10 new components, 2 major updates

---

## ⏱️ **Timeline Summary**

| Phase | Task | Effort | Priority |
|-------|------|--------|----------|
| **Phase 1** | Data structure & context | 3-4h | Critical |
| **Phase 2** | Hero section | 3-4h | Critical |
| **Phase 3** | Progress dashboard | 3-4h | Critical |
| **Phase 4** | Kanban layout | 5-6h | Critical |
| **Phase 5** | Module cards | 4-5h | Critical |
| **Phase 6** | Avatar groups | 2-3h | High |
| **Phase 7** | Drag/drop logic | 3-4h | High |
| **Phase 8** | Blocker modal | 2-3h | High |
| **Phase 9** | Hub page integration | 3-4h | Critical |
| **Phase 10** | All-complete state | 2-3h | Medium |
| **Phase 11** | Responsive | 2-3h | High |
| **Phase 12** | Polish | 2-3h | Medium |

**Total**: 34-46 hours

---

## 🔮 **Future Phase: Save/Resume** (Deferred)

**Effort**: 7-12 hours  
**Status**: Design approved, implementation deferred

**Includes:**
- Auto-save to localStorage
- Visual "Saved" indicator
- "Return to Hub" button in module footers
- Resume logic when returning
- Progress preservation

**When to implement**: After hub redesign complete

---

## ✅ **Ready to Start**

**Phase 1 is next**: Data Structure & Context Updates

This will:
- Add `blocked` status type
- Create module details interface
- Add progress calculation methods
- Define module metadata

**Estimated time**: 3-4 hours

**Shall I begin?** 🚀

---

_Plan Created: December 29, 2025_  
_Status: Ready for implementation_  
_Design Reference: Figma mockup_

