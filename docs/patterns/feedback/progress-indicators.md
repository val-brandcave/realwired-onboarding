# Progress Indicators

**Type**: Shared Components  
**Used In**: Hub, Module Pages, CS Portal  
**Multiple Patterns**: Progress bars, circular progress, step indicators

---

## 1. Linear Progress Bar

### Visual Structure
```
Progress: ████████░░░░ 65% (13/20 steps)
```

### Anatomy
```
Label: ┌─────────────────────┐ Percentage  Steps
       │████████░░░░░░░░░░░░│ 65%        (13/20)
       └─────────────────────┘
       200px bar with fill
```

---

### Variants

**Module Progress (Small)**
```
████████░░ 80%
```
- Width: 200px
- Height: 8px (h-2)
- Fill: Amber (in progress), Green (complete)
- Background: Gray-200

**Client Progress (Medium)**
```
████████████░░░░ 75%
```
- Width: 120-160px
- Height: 8px
- Fill: Brand gradient
- Rounded: Full

**Page Progress (Header)**
```
█████████████████████████████░░░░░░░░░ 75%
```
- Width: Full width
- Height: 4px (h-1)
- Fill: Brand color
- Sticky: Below header
- Background: Slate-200

---

### Color Coding

**By Completion**:
- 0-25%: Gray or amber
- 26-75%: Amber or blue
- 76-99%: Blue or green
- 100%: Green

**By Status vs. Timeline** (CS Portal):
- 🔴 Behind schedule: Red-500
- 🟡 At risk: Orange-500
- 🟢 On track: Green-500

---

### Styling Specs

**Container** (Background bar):
- Background: gray-200 or slate-200
- Height: 8px (h-2) or 4px (h-1)
- Border-radius: rounded-full
- Overflow: hidden

**Fill** (Progress):
- Background: Gradient or solid color
- Height: Matches container
- Border-radius: rounded-full
- Transition: width 300ms ease-out

**Percentage Text**:
- Font: text-sm or text-xs, font-semibold
- Color: Foreground (slate-900)
- Position: Right of bar or inside bar (if wide enough)

**Step Count** (Optional):
- Font: text-xs
- Color: Muted-foreground (slate-600)
- Format: "(current/total steps)"

---

## 2. Circular Progress

### Visual Structure
```
    ┌──────┐
    │  75% │  ← Percentage in center
    │ ◕──◕ │  ← Circular track
    └──────┘
```

### Anatomy
```
╔════════════════╗
║    ╭───────╮   ║
║   ╱    75%  ╲  ║  ← Number centered
║  │  ◠───────◡ │ ║  ← Arc fills clockwise
║   ╲         ╱  ║
║    ╰───────╯   ║
╚════════════════╝
```

**Specs**:
- Size: 64px × 64px (w-16 h-16) or larger
- Stroke-width: 3-4px
- Background circle: Gray-200
- Progress circle: Brand color
- Center text: Percentage value

---

### Usage

**Dashboard Metric Card**:
```
┌────────────────────┐
│     ╭───────╮      │
│    ╱   42%   ╲     │
│   │  ◠─────◡  │    │
│    ╰─────────╯     │
│                    │
│ Average Completion │
└────────────────────┘
```

**Loading State**:
- Spinning animation
- Indeterminate (no percentage)
- Used during async operations

---

## 3. Step Progress Indicator

### Visual Structure
```
┌───┐     ┌───┐     ┌───┐     ┌───┐
│ ✓ │ ─── │ ✓ │ ─── │ 3 │ ─── │ 4 │
└───┘     └───┘     └───┘     └───┘
Done      Done    Current   Not Started
```

### Anatomy
```
╔═══════════════════════════════════════════════════╗
║ ┌─────┐  ─────  ┌─────┐  ─────  ┌─────┐  ───── ║
║ │  ✓  │  (line) │  2  │  (line) │  3  │  (line)║
║ └─────┘         └─────┘         └─────┘        ║
║  Label          Label           Label           ║
╚═══════════════════════════════════════════════════╝
```

**Elements**:
1. Step circles (completed, current, upcoming)
2. Connecting lines
3. Step labels below circles

---

### States

**Completed Step**:
```
┌───┐
│ ✓ │ ← White checkmark
└───┘
```
- Background: Brand color (#9F2E2B)
- Icon: White checkmark
- Line after: Brand color (solid)

**Current Step**:
```
┌───┐
│ 2 │ ← Step number
└───┘
```
- Background: White or primary/10
- Border: 2px solid brand color
- Number: Brand color, font-semibold
- Line after: Gray (not yet completed)

**Upcoming Step**:
```
┌───┐
│ 3 │ ← Gray number
└───┘
```
- Background: Gray-100
- Border: Gray-300
- Number: Gray-600
- Line after: Gray

---

### Labels
```
Organization    Definitions    Users    Vendors
   Setup
```
- Position: Below step circle
- Font: text-xs or text-sm
- Color: Matches step state (brand/current, gray/upcoming)
- Alignment: Center under circle

---

## Styling Specifications

### Step Container
- Display: Flex, items-center
- Gap: Responsive (8px mobile, 16px desktop)
- Justify: Center or space-between

### Step Circle
- Size: 40px × 40px (w-10 h-10)
- Border-radius: Full circle
- Border: 2px solid (current step)
- Flex-shrink: 0 (maintains size)

### Connecting Line
- Height: 2px
- Width: Flexible (flex-1)
- Background: Color based on completion
- Min-width: 24px

---

## Usage Context

### Module Definitions (4 steps)
```
[✓] ─── [✓] ─── [2] ─── [3]
Prop    Prop    Req     Req
Cat     Fields  Types   Form
```

### Full Onboarding (7 modules)
```
[✓]─[✓]─[3]─[4]─[5]─[6]─[7]
Org Def Usr Vnd Rte Set IT
```

---

## Accessibility

- **List**: role="list" or `<ol>`
- **Steps**: role="listitem"
- **Current**: aria-current="step"
- **Labels**: Clear text labels
- **Status**: Screen readers announce "completed", "current", "upcoming"

---

## Related Components
- Module pages (show step progress in header)
- Breadcrumbs (complement step indicators)
- Linear progress bars

---

_Pattern Type: Feedback / Progress_  
_Last Updated: December 2025_

