# Badges & Status Pills

**Type**: Shared Components  
**Used In**: Throughout app (status indicators, labels, counts)  
**Pattern**: Small colored labels for status, categories, and metadata

---

## Visual Structure

```
[Badge Text]  [Another Badge]  [Count: 5]
```

---

## Badge Types

### 1. Status Badges (Rounded Pills)

**Module Status**:
```
[✓ Completed]  [Ready]  [👤 Not Assigned]
```

**Client Status**:
```
[In Progress]  [On Hold]  [Completed]  [Not Started]
```

**Ticket Status**:
```
[Open]  [In Progress]  [Resolved]  [Closed]
```

---

### 2. Info Badges (Rectangular)

**Field Count**:
```
[27 fields]
```

**Module Number**:
```
[Module 1]
```

**Duration**:
```
[8 min]
```

**Target Date**:
```
[📅 Dec 15, 2025]
```

---

### 3. CS Configured Badges

```
[CS Configured: Org Info]
```
- Shows what CS team pre-configured
- Purple/blue tint
- Smaller size (text-xs)

---

## Color Schemes

### Status Colors

**Success/Completed** (Green):
```
[✓ Completed]
```
- Background: bg-green-100
- Text: text-green-700 or text-green-800
- Border: border-green-200 (optional)
- Icon: Checkmark

**In Progress** (Blue):
```
[In Progress]
```
- Background: bg-blue-100
- Text: text-blue-700 or text-blue-800
- Border: border-blue-200

**Warning/At Risk** (Amber):
```
[⚠ At Risk]
```
- Background: bg-amber-100
- Text: text-amber-700
- Border: border-amber-200
- Icon: Warning triangle

**Error/Behind** (Red):
```
[🔴 Behind]
```
- Background: bg-red-100
- Text: text-red-700
- Border: border-red-200
- Icon: Red circle

**Not Started** (Gray):
```
[Not Started]
```
- Background: bg-slate-100
- Text: text-slate-700
- Border: border-slate-200

**On Hold** (Orange):
```
[On Hold]
```
- Background: bg-orange-100
- Text: text-orange-800
- Border: border-orange-200

---

### Info Colors

**Neutral** (Gray):
```
[Module 1]  [8 min]  [27 fields]
```
- Background: bg-slate-100
- Text: text-slate-700 or text-slate-600

**Category** (Purple):
```
[Standard Residential]
```
- Background: bg-purple-100
- Text: text-purple-800

**Highlight** (Blue):
```
[27 fields included]
```
- Background: bg-blue-100
- Text: text-blue-800

**Date/Calendar** (Blue with border):
```
[📅 Jan 30, 2026]
```
- Background: bg-blue-100
- Text: text-blue-800
- Border: border-blue-300 (1px)

---

## Sizing Variants

### Extra Small (xs)
```
[Tag]
```
- Padding: px-1.5 py-0.5
- Font: text-xs (12px)
- Height: ~20px

### Small (sm)
```
[Status]
```
- Padding: px-2 py-0.5 or px-2.5 py-1
- Font: text-xs or text-sm
- Height: ~24px

### Medium (md)
```
[Category Name]
```
- Padding: px-3 py-1 or px-4 py-1.5
- Font: text-sm
- Height: ~28-32px

---

## Shape Variants

### Rounded Pill (Full)
```
┌──────────────┐
│  Badge Text  │ ← rounded-full
└──────────────┘
```
- Border-radius: rounded-full (9999px)
- Use for: Status, tags, removable items

### Rounded Rectangle
```
┌──────────────┐
│  Badge Text  │ ← rounded-md or rounded-lg
└──────────────┘
```
- Border-radius: rounded-md (6px) or rounded-lg (8px)
- Use for: Categories, counts, info labels

---

## With Icons

### Icon + Text
```
[✓ Completed]  [📅 Dec 15]  [👤 Not Assigned]
```
- Icon: 12-14px (w-3 h-3 or w-3.5 h-3.5)
- Gap: 4-6px between icon and text
- Vertical align: Center

### Icon Only
```
[✓]  [×]  [→]
```
- Circular or square
- Size: 20-24px
- Background: Colored
- Icon: White or contrasting

---

## Interactive Badges

### Clickable (Removable)
```
[Category Name  ×]
```
- Hover: Darker background
- Click X: Removes badge
- Cursor: Pointer on hover
- Transition: 150ms

### Dropdown Trigger
```
[Filter: Active  ▼]
```
- Shows dropdown on click
- Arrow indicates interaction
- Hover: Background change

---

## Badge Positioning

### Inline with Text
```
Module 1 is [Completed] and ready for review
```

### Clustered (Multiple Badges)
```
[Module 1] [✓ Completed] [8 min] [📅 Dec 1]
```
- Gap: 4-8px between badges (gap-1 or gap-2)
- Flex-wrap: Wrap on narrow screens

### Corner Badge (Notification Count)
```
    [🔔]
     2  ← Red circle with count
```
- Position: Absolute top-right
- Size: 20px circle
- Background: Red-500
- Text: White, text-xs, font-bold

---

## Styling Specifications

### Base Badge
```css
padding: px-2.5 py-0.5 (or px-2 py-1)
border-radius: rounded-full or rounded-md
font-size: text-xs or text-sm
font-weight: font-medium
display: inline-flex
align-items: center
gap: 0.25rem (if icon present)
```

### With Border (Outlined)
- Border: 1px solid (matches background color)
- Background: Lighter version of border color
- More subtle, less visual weight

### Without Border (Filled)
- No border
- Solid background color
- Higher contrast, more prominence

---

## Usage Guidelines

### When to Use Badges

✅ **Use badges for**:
- Status indicators (Completed, In Progress)
- Categories and tags (Module numbers, types)
- Counts (field counts, ticket counts)
- Metadata (duration, dates)
- Quick visual scanning

❌ **Don't use badges for**:
- Long text (>20 characters)
- Primary actions (use buttons)
- Critical information alone (supplement with text)

---

## Accessibility

- **Color alone**: Never rely solely on color
- **Text/Icon**: Include descriptive text or icon
- **Contrast**: Meet WCAG 4.5:1 for text
- **Screen readers**: Text is readable
- **Interactive**: Proper button/link semantics if clickable

---

## Common Combinations

### Module Card
```
[Module 1] [✓ Completed] [8 min] [📅 Target: Dec 1]
```

### Client Row
```
[In Progress] ████░ 35% [🔴 Behind] [3 tickets]
```

### Ticket Item
```
[T-105] [Configuration Help] [Medium] [Open]
```

---

## Related Components
- Module cards
- Client tables
- Ticket lists
- Status indicators throughout app

---

_Pattern Type: Feedback / Status_  
_Last Updated: December 2025_

