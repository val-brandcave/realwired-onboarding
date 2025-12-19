# Module Accordion (All Modules)

**Type**: Customer Flow Component  
**Used In**: Hub Onboarding Tab (`app/hub/page.tsx`)  
**Pattern**: Collapsible list of onboarding modules with status tracking

---

## Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│  All Modules  [0 of 7 completed]  [▼]                      │
├────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐ │
│  │ [✓] Organization Setup [Module 1] [Completed] 8 min  │ │
│  │     Set up organization info, branding...            │ │
│  │     Progress: ████████ 100% (5/5 steps)              │ │
│  │     Assigned: [JS] John Smith     [Review] [Edit]    │ │
│  └──────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ [📄] Definitions [Module 2] [Ready] 18 min           │ │
│  │      Setup property categories, request types...     │ │
│  │      Progress: ░░░░░░░░ 0% (0/4 steps)               │ │
│  │      Assigned: [JS] John Smith     [Start →]         │ │
│  └──────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ [👥] Users Setup [Module 3] [Not Assigned] 5 min     │ │
│  │      Download template, fill in team details...      │ │
│  │      Progress: ░░░░░░░░ 0% (0/3 steps)               │ │
│  │      Assigned: [Assign Participants ▼]  [Assign]     │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

---

## Anatomy of Module Card

```
╔═══════════════════════════════════════════════════════════╗
║  Row 1: Icon + Title + Badges + Duration                  ║
║  ─────────────────────────────────────────────────────────║
║  Row 2: Description                                        ║
║  ─────────────────────────────────────────────────────────║
║  Row 3: CS Configured Sections (if any)                   ║
║  ─────────────────────────────────────────────────────────║
║  Row 4: Progress Bar + Percentage + Steps                 ║
║  ─────────────────────────────────────────────────────────║
║  Row 5: Assigned Participants + Action Button             ║
╚═══════════════════════════════════════════════════════════╝
```

---

## Module Card States

### 1. Completed Module
```
┌──────────────────────────────────────────────────────┐
│ [✓] Organization Setup [Module 1] [✓ Completed] 8min│
│     Description text...                              │
│     Progress: ████████ 100% (5/5 steps)              │
│     Assigned: [JS] John Smith    [Review] [Edit]     │
└──────────────────────────────────────────────────────┘
```
- **Icon**: Checkmark (white on brand color background)
- **Border**: Primary color with slight transparency
- **Background**: Primary color tint (5% opacity)
- **Actions**: [Review] [Edit] buttons (gray outline)

### 2. Ready to Start
```
┌──────────────────────────────────────────────────────┐
│ [📄] Definitions [Module 2] [Ready] 18 min           │
│      Setup property categories...                    │
│      Progress: ░░░░░░░░ 0% (0/4 steps)               │
│      Assigned: [JS] John Smith    [Start →]          │
└──────────────────────────────────────────────────────┘
```
- **Icon**: Module icon (colored on tinted background)
- **Border**: Border color (slate-200)
- **Status Badge**: Blue "Ready"
- **Action**: [Start →] button (brand gradient)

### 3. In Progress
```
┌──────────────────────────────────────────────────────┐
│ [📄] Definitions [Module 2] [Ready] 18 min           │
│      Setup property categories...                    │
│      Progress: ████░░░░ 50% (2/4 steps)              │
│      Assigned: [JS] John Smith    [Continue →]       │
└──────────────────────────────────────────────────────┘
```
- **Progress Bar**: Partially filled (amber color)
- **Action**: [Continue →] instead of [Start →]

### 4. Not Assigned
```
┌──────────────────────────────────────────────────────┐
│ [👥] Users Setup [Module 3] [👤 Not Assigned] 5 min  │
│      Download template, fill in team details...      │
│      Progress: ░░░░░░░░ 0% (0/3 steps)               │
│      Assigned: [Select participants ▼]  [Assign]     │
└──────────────────────────────────────────────────────┘
```
- **Opacity**: 60% (grayed out)
- **Status Badge**: Amber "Not Assigned" with person icon
- **Action**: Disabled "Not Assigned" button or assignment dropdown

---

## Component Breakdown

### Icon (Left Side)
```
┌────┐
│ ✓  │  or  [📄]  or  [👥]
└────┘
```
- Size: 40px × 40px (w-10 h-10)
- Border-radius: 8px (rounded-lg)
- **Completed**: Brand color bg, white checkmark
- **Not Started**: Primary/10 bg, colored icon
- **Not Assigned**: Muted bg, muted icon

### Title + Badges Row
```
Definitions  [Module 2]  [Ready]  18 min
───────────  ──────────  ──────  ──────
  (title)     (module#)  (status) (time)
```

**Title**: text-sm, font-semibold  
**Module Badge**: Slate-100 bg, slate-700 text, rounded  
**Status Badge**: Color-coded (green/blue/amber) with icon  
**Duration**: Slate-100 bg, text-xs

### Description
- Text: text-xs, muted-foreground
- Max-lines: 2 (truncate with ellipsis if longer)
- Margin: Bottom 8px

### CS Configured Sections
```
CS Team Configured: [Org Info] [Branding] [IT Config]
```
- Small badges showing what CS team pre-configured
- Color: Purple/blue tint
- Only shows if sections are configured

### Progress Bar Row
```
Progress: ████████░░ 80% (4/5 steps)
```
- **Bar**: 200px wide, 8px height, rounded-full
- **Fill**: Green (complete), Amber (in-progress), Gray (not started)
- **Percentage**: Bold text, foreground color
- **Steps**: Muted text in parentheses

### Assignment Row
```
Assigned: [👤 JS John Smith ▼]    [Start →]
```
- **Left**: Participant selector or assignee display
- **Right**: Action button

---

## Badge Variants

### Status Badges
```
[✓ Completed]  - Green: bg-green-100, text-green-700
[Ready]        - Blue: bg-blue-100, text-blue-700
[👤 Not Assigned] - Amber: bg-amber-100, text-amber-700
```

### Target Date Badge (Optional)
```
[📅 Dec 15, 2025]
```
- Blue: bg-blue-100, text-blue-800
- Border: border-blue-300
- Icon: Calendar

---

## Action Buttons

### Primary Actions (Right Side)
```
[Start →]      - Brand gradient, white text
[Continue →]   - Brand gradient, white text (if in progress)
[Review]       - Gray outline, muted text
[Edit]         - Gray outline, muted text
[Not Assigned] - Gray bg, disabled state
```

### Assignment Actions (With Participants)
```
[Assign]       - Small button after dropdown
```

---

## Accordion Behavior

### Header (Always Visible)
```
┌────────────────────────────────────────────────┐
│  All Modules  [0 of 7 completed]  [▼]          │
└────────────────────────────────────────────────┘
```
- **Click**: Toggles open/closed
- **Icon**: Down arrow rotates 180° when open
- **Counter**: Shows completion status
- **Background**: Light hover effect

### Body (Collapsible)
- **Open**: All module cards visible, smooth expansion
- **Closed**: Module cards hidden, only header visible
- **Default**: Open
- **Animation**: Height transition 300ms

---

## Styling Specifications

### Accordion Container
- Background: White (bg-card)
- Border: 1px solid border color
- Border-radius: 8px (rounded-lg)
- Overflow: Hidden

### Accordion Header
- Padding: 16px (p-4)
- Border-bottom: 1px when open
- Hover: Muted background (hover:bg-muted/30)
- Cursor: Pointer

### Card List (Body)
- Padding: 16px (p-4)
- Gap: 10px between cards (space-y-2.5)

### Individual Module Card
- Padding: 16px (p-4)
- Border: 2px solid
- Border-radius: 8px (rounded-lg)
- Gap: 12px vertical between rows

---

## Responsive Behavior

- **Desktop**: Full layout, 2-column internal grids
- **Tablet**: Action buttons may stack
- **Mobile**: All elements stack vertically, progress bar scales

---

## Interaction Patterns

### Module 1 (Always Assigned)
- Primary decision maker pre-assigned
- Assignment shown as read-only badge
- Cannot change assignment

### Other Modules (Assignable)
- Dropdown selector shown
- Multiple participants can be selected
- "Assign" button confirms assignment
- Snackbar confirms after assignment

---

## Data Requirements

Each module needs:
- `id` (string)
- `title` (string)
- `description` (string)
- `moduleNumber` (number)
- `duration` (string, e.g., "8 min")
- `completed` (boolean)
- `icon` (ReactNode - SVG component)
- `path` (string - navigation route)

---

## Related Components
- `ParticipantSelector` - Assignment dropdown
- Progress bar - Visual progress indicator
- `ConfiguredBadge` - CS configured sections
- Modal cards from hub

---

_Pattern Type: List / Accordion_  
_Last Updated: December 2025_

