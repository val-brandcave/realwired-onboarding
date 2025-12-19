# Go-Live Date Banner

**Type**: Customer Flow Component  
**Used In**: Hub Onboarding Tab  
**Location**: `app/hub/page.tsx`

---

## Visual Structure

```
╔══════════════════════════════════════════════════════════════╗
║  📅  PROJECTED GO-LIVE DATE                    Time Remaining ║
║                                                               ║
║      Thursday, January 30, 2026  [On Track]        42 days   ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Anatomy

```
╔════════════════════════════════════════════════════════╗
║  ┌────┐  Label (small caps)           Right Section  ║
║  │ 📅 │  ─────────────────            ─────────────  ║
║  └────┘  Full Date [Status Badge]     "X days"       ║
║  Icon    Formatted date                Countdown     ║
╚════════════════════════════════════════════════════════╝
```

---

## States

### On Track (Green)
```
╔══════════════════════════════════════════════════════╗
║ 📅 Thursday, January 30, 2026  [On Track]   42 days ║
╚══════════════════════════════════════════════════════╝
```
- **Background**: green-50
- **Border**: 2px solid green-300
- **Icon bg**: green-100
- **Badge**: green-100, text-green-700
- **Countdown**: green-600, bold

### At Risk / Behind (Orange/Amber)
```
╔══════════════════════════════════════════════════════╗
║ 📅 Thursday, January 30, 2026  [Behind]      7 days  ║
╚══════════════════════════════════════════════════════╝
```
- **Background**: orange-50
- **Border**: 2px solid orange-300
- **Icon bg**: orange-100
- **Badge**: orange-100, text-orange-700
- **Countdown**: orange-600, bold

### Overdue (Red)
```
╔══════════════════════════════════════════════════════╗
║ 📅 Thursday, January 30, 2026  [Behind]  5 days overdue ║
╚══════════════════════════════════════════════════════╝
```
- **Background**: red-50
- **Border**: 2px solid red-300
- **Icon bg**: red-100
- **Badge**: red-100, text-red-700
- **Countdown**: red-600, "X days overdue"

---

## Content Elements

### Calendar Icon
```
┌────┐
│ 📅 │ ← 48px circle
└────┘
```
- Size: 48px × 48px (w-12 h-12)
- Background: Colored based on status
- Border-radius: Full circle
- Icon: Calendar (24px)

### Label
```
PROJECTED GO-LIVE DATE
```
- Font: text-xs, font-medium, uppercase
- Color: slate-600
- Letter-spacing: tracking-wide
- Margin-bottom: 4px

### Date Display
```
Thursday, January 30, 2026
```
- Format: "weekday, month day, year"
- Font: text-lg or text-xl, font-bold
- Color: slate-900

### Status Badge
```
[On Track]  or  [Behind]
```
- Size: Small pill
- Positioned: Inline with date
- Colors: Match banner state

### Countdown
```
42 days  or  5 days overdue
```
- Font: text-2xl, font-bold
- Color: Matches status
- Label: "Time Remaining" (text-xs above)

---

## Status Logic

### On Track
- **Condition**: Current progress ≥ expected progress based on timeline
- **Or**: Days remaining > 7 AND completion rate adequate

### At Risk / Behind
- **Condition**: Days remaining ≤ 7 
- **Or**: Progress behind expected by 5-15%

### Overdue
- **Condition**: Current date > go-live date
- **Display**: "X days overdue" instead of "X days"

---

## Styling Specifications

### Container
- Padding: 16px (p-4)
- Border: 2px solid (status-colored)
- Border-radius: 12px (rounded-xl)
- Margin-bottom: 24px (mb-6)
- Display: Flex, space-between, wrap

### Left Section (Date Info)
- Display: Flex, gap-12px
- Align-items: Center

### Right Section (Countdown)
- Text-align: Right
- Display: Flex column
- Justify: Center

---

## Responsive Behavior

- **Desktop**: Side-by-side layout (date left, countdown right)
- **Tablet**: May stack if date text is long
- **Mobile**: Stack vertically (date on top, countdown below)

---

## Visibility Rules

### Show When
- ✅ Go-live date is set (CS team configured)
- ✅ User is on Onboarding tab
- ✅ Onboarding not yet complete

### Hide When
- ❌ No go-live date set
- ❌ All modules completed
- ❌ User on other tabs (Products, Tickets, CS)

---

## Data Requirements

```typescript
interface GoLiveBanner {
  projectedGoLiveDate: string; // ISO date
  completedModules: number;
  totalModules: number;
  currentProgress: number; // 0-100
}
```

---

## Calculation Examples

### Days Until Go-Live
```typescript
const today = new Date();
const goLiveDate = new Date(projectedGoLiveDate);
const diffTime = goLiveDate - today;
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
```

### Status Determination
```typescript
// Simplified logic
if (diffDays < 0) return 'overdue';
if (diffDays <= 7 || progressBehind) return 'at-risk';
return 'on-track';
```

---

## Accessibility

- **Landmark**: Contained in main content
- **Status**: Conveys via text + color (not color alone)
- **Icon**: Decorative (aria-hidden) or has aria-label
- **Text**: High contrast meeting WCAG AA

---

## Related Components
- Module progress tracking
- CS Portal go-live date setting
- Dashboard heat indicators
- Status badges

---

_Pattern Type: Banner / Status Display_  
_Last Updated: December 2025_

