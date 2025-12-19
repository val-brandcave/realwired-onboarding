# Client Onboarding Table (CS Portal)

**Type**: CS Flow Component  
**Used In**: CS Portal Dashboard (`app/cs-portal/page.tsx`)  
**Pattern**: Sortable, paginated table with client onboarding data

---

## Visual Structure

```
╔════════════════════════════════════════════════════════════════════════╗
║ [Active (12)]  [Completed (3)]                                         ║
╠════════════════════════════════════════════════════════════════════════╣
║ Client Name    │ Init Date │ Status │ Progress │ Go-Live │ Heat │ ... ║
╟────────────────┼───────────┼────────┼──────────┼─────────┼──────┼─────╢
║ Union Bank     │ Oct 27    │ In Prog│ ███░ 35% │ Feb 11  │ 🔴   │ [👁]║
║ First National │ Sep 14    │ In Prog│ ███░ 75% │ Dec 4   │ 🔴   │ [👁]║
║ Metro Financial│ Sep 30    │ In Prog│ ██░░ 25% │ Feb 11  │ 🔴   │ [👁]║
╟────────────────┴───────────┴────────┴──────────┴─────────┴──────┴─────╢
║ Showing 1 to 10 of 12 clients        [Prev] [1] [2] [Next]            ║
╚════════════════════════════════════════════════════════════════════════╝
```

---

## Table Columns

### 1. Client Name
```
Union Bank
──────────
(clickable)
```
- **Font**: text-sm, font-medium
- **Color**: slate-900
- **Click**: Navigate to client detail page

### 2. Initiation Date
```
Oct 27, 2024
────────────
```
- **Format**: "MMM DD, YYYY"
- **Font**: text-sm
- **Color**: slate-600

### 3. Status
```
┌───────────┐
│ In Progress│
└───────────┘
```
- **Badge**: Colored pill
- **Variants**:
  - `Completed`: Green (bg-green-100, text-green-800)
  - `In Progress`: Blue (bg-blue-100, text-blue-800)
  - `On Hold`: Amber (bg-amber-100, text-amber-800)
  - `Not Started`: Gray (bg-slate-100, text-slate-800)

### 4. Progress
```
████████░░ 80%
```
- **Bar**: 120px wide, 8px height
- **Fill**: Brand gradient
- **Percentage**: Bold text next to bar
- **Color**: Matches status (green if complete, amber if in progress)

### 5. Go-Live Date
```
Feb 11, 2026
────────────
```
- **Format**: "MMM DD, YYYY"
- **Font**: text-sm
- **Color**: slate-600

### 6. Tracking Status (Heat)
```
🔴 Behind  or  🟡 At Risk  or  🟢 On Track
```
- **Calculation**: Compare progress vs. time elapsed
- **Variants**:
  - 🔴 Behind: Progress < expected by 15%+
  - 🟡 At Risk: Progress < expected by 5-15%
  - 🟢 On Track: Progress ≥ expected
- **Badge**: Colored with emoji + text

### 7. Tickets
```
3 ⚠
─
```
- **Number**: Ticket count
- **Icon**: Warning if tickets > 0
- **Color**: Amber if tickets exist

### 8. Actions
```
[👁]
```
- **Icon**: Eye icon (view details)
- **Color**: Primary on hover
- **Click**: Navigate to client edit page

---

## Tab Variants

### Active Tab
```
╔════════════════════════════════════════╗
║ [Active (12)]  Completed (3)           ║
╠════════════════════════════════════════╣
║ ... active clients ...                 ║
╚════════════════════════════════════════╝
```
- Shows clients with progress < 100%
- Default active tab

### Completed Tab
```
╔════════════════════════════════════════╗
║ Active (12)  [Completed (3)]           ║
╠════════════════════════════════════════╣
║ ... completed clients ...              ║
╚════════════════════════════════════════╝
```
- Shows clients with progress = 100%
- Heat column shows "N/A"

---

## Header Row

```
╔════════════════════════════════════════════════════════╗
║ CLIENT NAME │ INITIATION DATE │ STATUS │ PROGRESS │...║
╚════════════════════════════════════════════════════════╝
```
- **Background**: slate-50
- **Text**: text-xs, font-semibold, uppercase, slate-700
- **Padding**: px-6 py-4
- **Sticky**: Optional (sticky header on scroll)

---

## Row States

### Default Row
```
┌──────────────────────────────────────────────────┐
│ Union Bank │ Oct 27 │ Badge │ Progress │ ... │👁 │
└──────────────────────────────────────────────────┘
```
- Background: White
- Border-bottom: 1px solid slate-200

### Hover Row
```
┌──────────────────────────────────────────────────┐
│ Union Bank │ Oct 27 │ Badge │ Progress │ ... │👁 │ ← Highlighted
└──────────────────────────────────────────────────┘
```
- Background: slate-50
- Transition: 150ms

### Clickable Row
- Entire row clickable (optional)
- Or just client name + action icon clickable
- Cursor: pointer on hover

---

## Pagination

### Footer
```
┌────────────────────────────────────────────────────────┐
│ Showing 1 to 10 of 12 clients    [Prev] [1] [2] [Next] │
└────────────────────────────────────────────────────────┘
```

**Left Side**: "Showing X to Y of Z clients"  
**Right Side**: Page controls

### Page Controls
```
[Previous]  [1]  [2]  [Next]
──────────  ───  ───  ──────
(disabled) (active)(page)(enabled)
```

**Active Page**:
- Background: Brand red
- Text: White
- No hover

**Inactive Pages**:
- Background: White
- Border: 1px solid slate-300
- Hover: bg-slate-50

**Disabled (Prev/Next)**:
- Opacity: 50%
- Cursor: not-allowed

---

## Styling Specifications

### Table Container
- Background: White
- Border: 1px solid slate-200
- Border-radius: 12px (rounded-xl)
- Overflow: Hidden
- Shadow: Small

### Table Element
- Width: Full (min-w-full)
- Divide-y: slate-200 (row separators)

### Cell Padding
- px-6 py-4 (consistent across all cells)

### Alignment
- Text columns: Left-aligned
- Number columns: Left-aligned (for consistency)
- Action column: Center-aligned

---

## Responsive Behavior

- **Desktop**: All columns visible
- **Tablet**: May hide less important columns (tickets, heat)
- **Mobile**: Horizontal scroll or card view instead of table

---

## Empty States

### No Clients
```
┌────────────────────────────────────┐
│                                    │
│    No clients found                │
│    Add a new client to get started │
│                                    │
└────────────────────────────────────┘
```

### No Search Results
```
┌────────────────────────────────────┐
│    No clients match your filters   │
│    Try adjusting your search       │
└────────────────────────────────────┘
```

---

## Action Flows

### View Client Details
- Click eye icon or client name
- Navigate to: `/cs-portal/edit-client?client=[name]`
- Opens client detail/edit page

### Add New Client
- Button above table (top-right)
- Opens "Add Client" modal
- Creates new onboarding project

---

## Accessibility

- **Table**: Proper `<table>` semantics
- **Headers**: `<th>` with scope="col"
- **Cells**: `<td>` properly associated
- **Sortable**: aria-sort on sortable columns
- **Row actions**: aria-label="View [Client Name]"
- **Pagination**: Proper button semantics

---

## Related Components
- Add Client Modal
- Client Edit Page
- At-Risk Clients section (above table)
- Status badges
- Progress bars

---

_Pattern Type: Data Table / List_  
_Last Updated: December 2025_

