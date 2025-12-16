# Module Completion Dates - UI Interaction Demo

## Full Page Layout with Feature

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                            CS AGENT PORTAL - EDIT CLIENT                         ║
║  [← Back]  [YC Logo]  [YouConnect] [CS Agent Portal]  🔔 [3]  👤 [Samuel Kite] ↓║
╚═══════════════════════════════════════════════════════════════════════════════════╝

┌──────────────────────────┬─────────────────────────────────────────────────────────┐
│                          │                                                         │
│  SIDEBAR (264px)         │  MAIN CONTENT AREA                                      │
│  bg-white                │  bg-slate-50                                            │
│                          │                                                         │
│  ┌────────────────────┐  │  ┌───────────────────────────────────────────────────┐ │
│  │ ONBOARDING         │  │  │ 📅 Projected Go-Live Date                        │ │
│  │ PROGRESS (Top)     │  │  │ February 12, 2026                                 │ │
│  │                    │  │  │                          [Edit Date]               │ │
│  │    ◐●●●●●●●●◯◯◯    │  │  └───────────────────────────────────────────────────┘ │
│  │      65%           │  │                                                         │
│  │                    │  │  Union Bank                                             │
│  │  3 of 7 modules    │  │  ✓ In Progress    65% Complete      [Save Changes]    │
│  │  completed         │  │                                                         │
│  │                    │  │  ═══════════════════════════════════════════════════  │
│  │ ┌────────────────┐ │  │  ORGANIZATION SETUP                                    │
│  └────────────────────┘  │  • Organization Info & URL                              │
│                          │  • Branding                                              │
│  ┌────────────────────┐  │  • Onboarding Participants                              │
│  │ ONBOARDING        │  │  • IT & Security Configuration                           │
│  │ MODULES           │  │  ═════════════════════════════════════════════════════  │
│  │                   │  │  [Continue with detailed content...]                     │
│  │ ┌─────────────┐   │  │                                                         │
│  │ │🏢 Organization  │   │                                                         │
│  │ │Setup [🟢28]📅   │   │                                                         │
│  │ └─────────────┘   │  │                                                         │
│  │ Target:          │  │                                                         │
│  │ Dec 1, 2025      │  │                                                         │
│  │                   │  │                                                         │
│  │ ┌─────────────┐   │  │                                                         │
│  │ │📋 Definitions  │   │                                                         │
│  │ │[🟢28]📅         │   │                                                         │
│  │ └─────────────┘   │  │                                                         │
│  │ Target:          │  │                                                         │
│  │ Dec 8, 2025      │  │                                                         │
│  │                   │  │                                                         │
│  │ ┌─────────────┐   │  │                                                         │
│  │ │👥 Users Setup   │   │                                                         │
│  │ │[🟢28]📅         │   │                                                         │
│  │ └─────────────┘   │  │                                                         │
│  │ Target:          │  │                                                         │
│  │ Dec 15, 2025     │  │                                                         │
│  │                   │  │                                                         │
│  │ ┌─────────────┐   │  │                                                         │
│  │ │🏪 Vendors Setup │   │                                                         │
│  │ │[🟠28]📅         │   │   ← User clicks 📅 on this module                      │
│  │ └─────────────┘   │  │                                                         │
│  │ Target:          │  │                                                         │
│  │ Dec 22, 2025     │  │                                                         │
│  │                   │  │                                                         │
│  │ ┌─────────────┐   │  │                                                         │
│  │ │🛣️  Routing     │   │                                                         │
│  │ │[🟠28]📅         │   │                                                         │
│  │ └─────────────┘   │  │                                                         │
│  │ Target:          │  │                                                         │
│  │ Dec 29 ⚠️        │  │   ← RED badge shows at-risk!                            │
│  │                   │  │                                                         │
│  │ ┌─────────────┐   │  │                                                         │
│  │ │⚙️ General      │   │                                                         │
│  │ │Settings [🟠28]  │   │                                                         │
│  │ │📅              │   │                                                         │
│  │ └─────────────┘   │  │                                                         │
│  │ Target:          │  │                                                         │
│  │ Jan 5, 2026      │  │                                                         │
│  │                   │  │                                                         │
│  │ ┌─────────────┐   │  │                                                         │
│  │ │🛡️ IT         │   │                                                         │
│  │ │Readiness   │   │                                                         │
│  │ │[⚪28]📅     │   │                                                         │
│  │ └─────────────┘   │  │                                                         │
│  │ Target:          │  │                                                         │
│  │ Feb 12, 2026     │  │                                                         │
│  │                   │  │                                                         │
│  ├────────────────────┤  │                                                         │
│  │ SUPPORT           │  │                                                         │
│  │ 💬 Onboarding     │  │                                                         │
│  │ Tickets        [3]│  │                                                         │
│  └────────────────────┘  │                                                         │
│                          │                                                         │
└──────────────────────────┴─────────────────────────────────────────────────────────┘
```

---

## Modal Opens When 📅 Clicked

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    BLACK OVERLAY (50% opacity)                                  │
│                                                                                 │
│                  ┌─────────────────────────────────────────┐                  │
│                  │ ┌────────────────────────────────────┐  │                  │
│                  │ │ 🏪 Set Target Date        [X]     │  │  Modal Header   │
│                  │ │ Vendors Setup                      │  │                  │
│                  │ └────────────────────────────────────┘  │                  │
│                  │                                         │                  │
│                  │ ┌─────────────────────────────────────┐ │                  │
│                  │ │ ℹ️ Info Card (Blue Background)     │ │                  │
│                  │ │ Go-Live Date: Feb 12, 2026         │ │                  │
│                  │ │                                     │ │  Modal Content  │
│                  │ │ Set realistic target dates to       │ │                  │
│                  │ │ ensure modules are completed       │ │                  │
│                  │ │ before go-live.                    │ │                  │
│                  │ └─────────────────────────────────────┘ │                  │
│                  │                                         │                  │
│                  │ ┌─────────────────────────────────────┐ │                  │
│                  │ │ Currently Set To:                   │ │                  │
│                  │ │ Dec 22, 2025                        │ │                  │
│                  │ └─────────────────────────────────────┘ │                  │
│                  │                                         │                  │
│                  │ Target Completion Date                  │                  │
│                  │ ┌─────────────────────────────────────┐ │                  │
│                  │ │ [2025-12-22      ▼]               │ │  Date Picker    │
│                  │ └─────────────────────────────────────┘ │                  │
│                  │ Select date between today & go-live     │                  │
│                  │                                         │                  │
│                  │ ⚠️ At Risk Warning (Red Background):   │                  │
│                  │ ┌─────────────────────────────────────┐ │                  │
│                  │ │ ⚠️  AT RISK                          │ │                  │
│                  │ │                                     │ │                  │
│                  │ │ This date is very close to the     │ │  Risk Alert     │
│                  │ │ go-live date. Consider moving     │ │                  │
│                  │ │ it earlier.                        │ │                  │
│                  │ └─────────────────────────────────────┘ │                  │
│                  │                                         │                  │
│                  │ ┌─────────────────────────────────────┐ │                  │
│                  │ │ Module Progress                     │ │                  │
│                  │ │                                     │ │                  │
│                  │ │ ◀●●●●●●◯◯◯◯◯ 75%                 │ │  Progress Bar   │
│                  │ └─────────────────────────────────────┘ │                  │
│                  │                                         │                  │
│                  │ ┌──────────────────┐ ┌──────────────┐   │                  │
│                  │ │ Cancel           │ │ Set Date✓    │   │  Modal Footer   │
│                  │ │ (Gray)           │ │ (Red)        │   │                  │
│                  │ └──────────────────┘ └──────────────┘   │                  │
│                  └─────────────────────────────────────────┘                  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Interaction Flow

### Step 1: Initial View
```
User sees sidebar with modules and target dates
Each module shows:
  ✓ Icon (🏪)
  ✓ Name (Vendors Setup)
  ✓ Progress Donut (🟠 28px = 75%)
  ✓ Calendar Icon (📅)
  ✓ Target Date Badge (Dec 22, 2025)
```

### Step 2: User Clicks Calendar Icon
```
User hovers over 📅 and clicks
Tooltip shows: "Set target date: Dec 22, 2025"
Modal opens with smooth fade-in
Focus moves to modal
```

### Step 3: Modal Display
```
Modal shows:
  ✓ Header: 🏪 Vendors Setup
  ✓ Go-Live Date: Feb 12, 2026
  ✓ Current Date: Dec 22, 2025
  ✓ Module Progress: 75%
  ✓ Date Input: Highlighted
```

### Step 4: User Adjusts Date
```
User clicks date picker
Calendar widget appears (browser default)
User selects new date: Jan 5, 2026
Input field updates

If date is within 7 days of go-live:
  → At-risk warning appears
  → Background color changes to red-50
  → Warning text displays
```

### Step 5: User Saves
```
User clicks "Set Target Date" button
Modal validates:
  ✓ Date is selected
  ✓ Date is not empty
Button is enabled (not grayed out)
```

### Step 6: Modal Closes & Updates
```
Modal fades out
Sidebar updates:
  ✓ Target badge shows new date
  ✓ If at-risk: badge turns red with ⚠️
  ✓ If normal: badge stays blue
Animation duration: ~300ms
```

### Step 7: Verification
```
User can see:
  ✓ New target date in sidebar
  ✓ Color indicates status
  ✓ Can click 📅 again to change
  ✓ Dates are persistent during session
```

---

## State Changes During Interaction

### Before Clicking 📅
```javascript
{
  showModuleDateModal: false,
  selectedModuleForDate: null,
  tempModuleDate: '',
  moduleCompletionDates: {
    'vendors': '2025-12-22'
  }
}
```

### After Clicking 📅
```javascript
{
  showModuleDateModal: true,           // Modal becomes visible
  selectedModuleForDate: VendorsModule, // Module object stored
  tempModuleDate: '2025-12-22',        // Current date pre-filled
  moduleCompletionDates: {
    'vendors': '2025-12-22'             // Unchanged until saved
  }
}
```

### After Selecting New Date (e.g., Jan 5)
```javascript
{
  showModuleDateModal: true,           // Modal still open
  selectedModuleForDate: VendorsModule,
  tempModuleDate: '2026-01-05',        // Updated in form
  moduleCompletionDates: {
    'vendors': '2025-12-22'             // Not updated yet
  }
}
```

### After Clicking Save
```javascript
{
  showModuleDateModal: false,          // Modal closes
  selectedModuleForDate: null,         // Cleared
  tempModuleDate: '',                  // Cleared
  moduleCompletionDates: {
    'vendors': '2026-01-05'             // UPDATED! 🎉
  }
}
```

---

## User Journeys

### Journey 1: Initial Onboarding Setup
```
CS Agent Opening:
  1. Client just signed up
  2. Agent navigates to edit-client page
  3. Sees all modules with no target dates set
  4. For each module:
     - Clicks 📅
     - Sets realistic target date
     - Reviews for at-risk dates
     - Makes adjustments
  5. All modules now have target dates
  6. Timeline visible at-a-glance
  Result: Clear roadmap established ✓
```

### Journey 2: Monitoring Progress
```
CS Agent Review (Weekly):
  1. Logs in to client edit page
  2. Scans sidebar for progress donuts
  3. Compares current progress vs. target dates
  4. Identifies at-risk modules (red badges ⚠️)
  5. For behind-schedule modules:
     - Clicks 📅
     - Reviews current progress
     - Adjusts date realistically
  6. Takes action (contact client, escalate, etc.)
  Result: Proactive timeline management ✓
```

### Journey 3: Accelerated Completion
```
CS Agent Celebrating Win:
  1. Module completes faster than expected
  2. Progress donut goes to 100% (🟢)
  3. Target date still shows (e.g., Dec 22)
  4. Agent clicks 📅 to update
  5. Changes date to actual completion date (e.g., Dec 15)
  6. Date badge updates
  Result: Accurate historical record ✓
```

---

## Mobile Experience

### Mobile Sidebar (375px width)
```
┌──────────────────────┐
│ ONBOARDING PROGRESS  │
│                      │
│   ◐●●●●●●●◯◯◯       │
│      65%             │
│                      │
│ 3 of 7 modules       │
└──────────────────────┘
┌──────────────────────┐
│ ONBOARDING MODULES   │
│ ┌────────────────┐   │
│ │🏢 Org Setup    │   │
│ │[🟢] 📅         │   │
│ └────────────────┘   │
│ Target: Dec 1        │
│                      │
│ ┌────────────────┐   │
│ │📋 Definitions  │   │
│ │[🟢] 📅         │   │
│ └────────────────┘   │
│ Target: Dec 8        │
│                      │
│ ... more modules ... │
└──────────────────────┘
```

### Mobile Modal (with mx-4 padding)
```
┌─────────────────────────────────┐
│                                 │
│ ┌───────────────────────────┐   │
│ │ 🏪 Set Target Date   [X]  │   │
│ │ Vendors Setup             │   │
│ ├───────────────────────────┤   │
│ │ ℹ️ Go-Live: Feb 12, 2026  │   │
│ │                           │   │
│ │ Current: Dec 22, 2025    │   │
│ │                           │   │
│ │ Target Date               │   │
│ │ [   2025-12-22   ▼]      │   │
│ │                           │   │
│ │ ⚠️ At Risk (if < 7 days)  │   │
│ │                           │   │
│ │ Progress: 75%             │   │
│ │ ◀●●●●●●◯◯◯ 75%          │   │
│ │                           │   │
│ ├───────────────────────────┤   │
│ │ [Cancel] [Set Date✓]      │   │
│ └───────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

---

## Color Transitions

### Updating Target Date Badge Color

**Scenario: User changes date from Jan 5 to Dec 29 (now at-risk)**

```
Before Update:
┌─────────────────┐
│ Target: Jan 5   │  ← Blue badge (>7 days from Feb 12)
│ (Blue badge)    │
└─────────────────┘

User clicks 📅, changes to Dec 29 → 14 days before Feb 12

After Update:
┌──────────────────┐
│ Target: Dec 29 ⚠️ │  ← Red badge (exactly 7 days, at threshold)
│ (Red badge)      │
└──────────────────┘

Animation: Smooth color transition
Duration: ~300ms
```

---

## Keyboard Shortcuts & Accessibility

### Modal Keyboard Support
```
Tab          → Navigate between inputs
Shift+Tab    → Navigate backwards
Enter        → Activate focused button (if button)
Escape       → Close modal
```

### Screen Reader Announcement
```
"Modal dialog: Set Target Date for Vendors Setup
Go-Live Date: February 12, 2026
Target Completion Date input field
Currently at risk
At Risk warning: This date is very close to the go-live date
Module Progress: 75%
Button: Cancel
Button: Set Target Date"
```

---

## Success Indicators

### Visual Feedback
✅ Modal opens smoothly
✅ Date pre-fills correctly
✅ Risk warning appears/disappears
✅ Progress bar displays correctly
✅ Badge updates after save
✅ Colors change based on risk status

### Functional Feedback
✅ Modal closes on save
✅ Modal closes on cancel (without saving)
✅ Modal closes on ESC (without saving)
✅ Date persists during session
✅ Can edit date multiple times

### User Confidence
✅ Clear instructions in modal
✅ Current date always visible
✅ Go-live date always visible
✅ Progress context always shown
✅ Risk indicators prominent
✅ Error prevention (required field validation)


