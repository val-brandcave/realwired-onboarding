# Breadcrumb Navigation Component

**Type**: Shared Component  
**Used In**: Customer Flow (All module pages)  
**Location**: `components/ui/Breadcrumbs.tsx`

---

## Visual Structure

```
┌────────────────────────────────────────────────────────┐
│  [🏠 Home]  ›  [Definitions]  ›  [Property Record]  ›  Preview Configuration
└────────────────────────────────────────────────────────┘
```

---

## Anatomy

```
╔═══════════════════════════════════════════════════════════╗
║ [Icon] Label  ›  [Icon] Label  ›  Label  ›  Current Page ║
║ (clickable)      (clickable)    (click)    (plain text)  ║
╚═══════════════════════════════════════════════════════════╝
```

---

## Properties

### Breadcrumb Item
- **Icon**: Optional (SVG, 16px × 16px)
- **Label**: Text string
- **Href**: Navigation path (optional, if not current page)
- **Current**: Boolean (if current page, not clickable)

### Separator
- Character: `›` (chevron right)
- Color: Slate-400 (muted)
- Spacing: 8px margin on each side

---

## Behavior

### Interactive Items (Non-current)
- **Hover**: Text changes from slate-600 → slate-900
- **Cursor**: Pointer
- **Action**: Navigate to href

### Current Page (Last Item)
- **Style**: slate-900, font-semibold
- **Cursor**: Default (not clickable)
- **State**: No hover effect

---

## Styling Specifications

### Container
- Background: White
- Border: Bottom border (1px, slate-200)
- Padding: Vertical 12px, Horizontal responsive (px-4 to px-8)
- Position: Sticky (top-16, below header)
- Z-index: 40

### Links
- Font size: text-sm (14px)
- Default color: slate-600
- Hover color: slate-900
- Transition: 200ms colors

### Icons
- Size: 16px × 16px (w-4 h-4)
- Color: Matches text color
- Vertical align: Middle with text

---

## Usage Examples

### Home → Module Intro
```
[🏠 Home]  ›  Organization Setup
```

### Home → Module → Sub-page
```
[🏠 Home]  ›  [Definitions]  ›  Property Record
```

### Deep Navigation (4+ levels)
```
[🏠 Home]  ›  [Definitions]  ›  [Property Record]  ›  Configure  ›  Overview
```

---

## Common Patterns

### All Module Intros
Always start with Home icon, module name as current:
- `Home › Organization Setup`
- `Home › Definitions`  
- `Home › Users Setup`

### Configuration Pages
Show full path to current sub-step:
- `Home › Definitions › Property Record › Templates`
- `Home › Definitions › Property Record › Preview Configuration`
- `Home › Definitions › Property Record › Overview`

---

## Accessibility

- **Semantic**: Uses `<nav>` with aria-label="Breadcrumb"
- **List structure**: `<ol>` for semantic ordering
- **Current page**: aria-current="page"
- **Keyboard**: Tab-navigable links

---

## Responsive Behavior

- **Desktop**: Full breadcrumb trail
- **Mobile**: May truncate middle items with ellipsis (if needed)
- **Always show**: Home + Current page (minimum)

---

_Pattern Type: Navigation_  
_Last Updated: December 2025_

