# Module Completion Dates Feature

## Overview

The Module Completion Dates feature allows CS Agents to set realistic target completion dates for each module in the CX Flow. This helps clients plan their onboarding timeline and ensures all modules are completed before the Go-Live date.

## Features

### 1. **Module Navigation with Inline Target Dates**

Each module in the left sidebar now includes:
- **Module Button**: Click to navigate to the module configuration
- **Calendar Icon**: Click to open the date picker modal
- **Progress Donut**: Shows current completion percentage (0-100%)
- **Target Date Badge**: Displays the set target completion date below each module

**Visual Layout:**
```
┌─────────────────────────────────────┐
│ 🏢 Organization Setup    [🟢 28px]  | ← Calendar Icon
├─────────────────────────────────────┤
│ Target: Dec 1, 2025                 | ← Target Date Badge
│                                     │
│ 📋 Definitions          [🟢 28px] 📅 ← Calendar Icon
├─────────────────────────────────────┤
│ Target: Dec 8, 2025 ⚠️               | ← Warning if at risk
└─────────────────────────────────────┘
```

### 2. **Target Date Modal**

When the CS Agent clicks the calendar icon, a beautiful modal opens with:

**Header Section:**
- Module icon and name
- Close button
- Clear visual hierarchy

**Content Sections:**

a) **Go-Live Date Info Card** (Blue Info Banner)
   - Shows the overall projected go-live date
   - Reminder to set realistic dates before go-live

b) **Current Date Display** (Gray Card)
   - Shows the previously set target date (if any)
   - Helps avoid accidental overwriting

c) **Date Input Field**
   - Native HTML date picker
   - Helpful hint: "Select a date between today and the go-live date"

d) **Risk Indicator** (Conditional Red Warning)
   - Appears when selected date is less than 7 days before go-live
   - Warning icon with advisory text
   - Encourages earlier completion

e) **Module Progress Context** (Gray Card)
   - Shows current module progress with progress bar
   - Percentage display (0-100%)
   - Helps CS agents understand where the module stands

**Footer Section:**
- Cancel button (gray)
- Set Target Date button (branded red, disabled until date is selected)

### 3. **Risk Management System**

**At-Risk Indicators:**
- Dates within 7 days of go-live are marked as "At Risk"
- Red badge with ⚠️ warning indicator appears:
  - In the sidebar target date badge
  - In the modal as an alert

**Risk Calculation:**
```javascript
daysUntilGoLive = (goLiveDate - targetDate) / (24 hours)
isAtRisk = daysUntilGoLive < 7
```

### 4. **Date Display & Formatting**

- All dates use consistent formatting: "Dec 1, 2025"
- Client-friendly and easy to parse
- Responsive to locale (currently en-US)

## Sample Data

Pre-populated module target dates (approximately ~65% overall progress):

| Module | Target Date | Progress | Status |
|--------|-------------|----------|--------|
| Organization Setup | Dec 1, 2025 | 100% | ✅ Completed |
| Definitions | Dec 8, 2025 | 100% | ✅ Completed |
| Users Setup | Dec 15, 2025 | 100% | ✅ Completed |
| Vendors Setup | Dec 22, 2025 | 75% | 🟠 In Progress |
| Routing | Dec 29, 2025 | 50% | 🟠 Halfway |
| General Settings | Jan 5, 2026 | 25% | 🟠 Just Started |
| IT Readiness | Feb 12, 2026* | 0% | ⚪ Not Started |

*Same as go-live date - no buffer

## Visual Design

### Color Scheme
- **Primary Button**: Gradient red (#9F2E2B to #7D2522)
- **Info Card**: Blue background (blue-50)
- **Risk Warning**: Red background (red-50)
- **Progress Bar**: Brand red (#9F2E2B)
- **Target Date Badge**: Blue (normal) or Red (at-risk)

### Interactive Elements

**Calendar Icon Behavior:**
- Normal State: Gray text, slate-500
- Hover State: Darker gray text, slate-200 background
- Active State (selected module): White text, brand red background

**Modal Behavior:**
- Overlay: Black at 50% opacity
- Animation: Smooth focus transition
- Responsive: Handles mobile (mx-4 padding)

### Typography

- **Modal Header**: Large bold text (text-lg font-bold)
- **Section Labels**: Small semibold uppercase (text-xs font-semibold)
- **Badge Text**: Extra small text (text-xs)
- **Helper Text**: Extra small slate-500 (text-xs text-slate-500)

## State Management

### Local State Variables

```typescript
// Module completion dates - maps module ID to YYYY-MM-DD string
const [moduleCompletionDates, setModuleCompletionDates] = useState<Record<string, string>>({...})

// Modal visibility
const [showModuleDateModal, setShowModuleDateModal] = useState(false)

// Currently editing module
const [selectedModuleForDate, setSelectedModuleForDate] = useState<typeof MODULES[0] | null>(null)

// Temporary date input
const [tempModuleDate, setTempModuleDate] = useState('')
```

### Helper Functions

**`formatDate(dateString: string): string`**
- Converts YYYY-MM-DD to "Dec 1, 2025" format
- Returns "No date set" if empty

**`isDateAtRisk(dateString: string): boolean`**
- Calculates days between target date and go-live date
- Returns true if less than 7 days buffer

**`getModuleProgress(moduleId: string): number`**
- Returns percentage (0-100) for a module
- Falls back to sample data if context is empty

**`getOverallProgress(): number`**
- Calculates average progress across all 7 modules
- Used for overall completion donut

### Event Handlers

**`handleOpenDateModal(module: Module)`**
- Opens modal for specific module
- Pre-fills with existing date

**`handleSaveModuleDate()`**
- Validates date is selected
- Updates module completion dates state
- Closes modal

**`handleCloseModuleDateModal()`**
- Closes modal without saving
- Clears temporary state

## User Flow

### Setting a Target Date

1. CS Agent views edit-client page
2. Scans left sidebar for module with calendar icon
3. Clicks calendar icon next to desired module
4. Modal opens with:
   - Current target date (if any)
   - Go-live date context
   - Module progress info
5. Agent selects new date from date picker
6. Risk indicator appears if date is too close to go-live
7. Agent clicks "Set Target Date" button
8. Modal closes
9. New target date appears in sidebar badge below module

### Reviewing Timeline

1. CS Agent can quickly scan all target dates in sidebar
2. Red badges indicate at-risk dates (less than 7 days before go-live)
3. Agent can adjust dates as needed to ensure realistic completion

## Technical Implementation

### File Modified
- `app/cs-portal/edit-client/page.tsx`

### Components Used
- Native HTML `<input type="date">`
- Tailwind CSS for styling
- React hooks (useState) for state management

### Data Structure
```typescript
moduleCompletionDates: {
  'organization-setup': '2025-12-01',
  'definitions': '2025-12-08',
  'users': '2025-12-15',
  'vendors': '2025-12-22',
  'routing': '2025-12-29',
  'general-settings': '2026-01-05',
  'it-checklist': '2026-02-12',
}
```

## Future Enhancements

1. **Calendar Picker**: Replace native date picker with calendar component for better UX
2. **Timeline Visualization**: Show Gantt-style timeline across all modules
3. **Auto-Scheduling**: Suggest optimal dates based on:
   - Module complexity (step count)
   - Current progress
   - Go-live date
4. **Milestone Tracking**: Track actual vs. target completion dates
5. **Notifications**: Alert CS agents when modules are behind schedule
6. **Export**: Generate client timeline/roadmap as PDF
7. **Slack Integration**: Post timeline updates to team channels
8. **Historical Data**: Track date changes and adjustments over time

## Accessibility

✅ Modal has clear focus management
✅ Date input is keyboard accessible
✅ All buttons have clear labels
✅ Color not the only indicator (also uses text labels: "⚠️ At Risk")
✅ Helper text explains all functionality

## Browser Compatibility

- ✅ Chrome (latest) - Full support
- ✅ Firefox (latest) - Full support
- ✅ Safari (latest) - Full support with native date picker
- ✅ Edge (latest) - Full support

## Testing Checklist

- [ ] Click calendar icon on each module
- [ ] Modal opens with correct module details
- [ ] Date picker accepts valid dates
- [ ] Risk indicator appears for dates < 7 days before go-live
- [ ] Saving date updates sidebar badge
- [ ] Cancel button closes without saving
- [ ] Multiple modules can have different target dates
- [ ] Dates persist during session
- [ ] Responsive on mobile (modal visible and usable)

