# Multiselect Assignee Picker

**Type**: Customer Flow Component  
**Used In**: Hub module assignment  
**Location**: `app/hub/_components/ParticipantSelector.tsx`

---

## Visual Structure

```
Assigned: [👤 JS 👤 SJ John Smith, Sarah Johnson ▼]  [Assign]
          ─────────────────────────────────────────  ────────
                 Multiselect Dropdown                 Confirm Button
```

---

## Anatomy

```
╔════════════════════════════════════════════════════════╗
║  Label Text:  ┌──────────────────────────────────┐   ║
║               │ Avatar Avatar Selected Names  ▼  │   ║
║               └──────────────────────────────────┘   ║
║                                                       ║
║               Dropdown (when open):                   ║
║               ┌──────────────────────────────────┐   ║
║               │ ☑ John Smith (Primary)          │   ║
║               │ ☑ Sarah Johnson                 │   ║
║               │ ☐ Mike Davis                    │   ║
║               │ ☐ Lisa Chen                     │   ║
║               └──────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════╝
```

---

## States

### Collapsed (Showing Selection)
```
┌───────────────────────────────────────┐
│ [JS] [SJ] John Smith, Sarah Johnson ▼ │
└───────────────────────────────────────┘
```
- **Avatars**: Circular, 24px, brand colors
- **Names**: Comma-separated, truncated if long
- **Arrow**: Down chevron indicating dropdown
- **Background**: Muted/50, border

### Expanded (Dropdown Open)
```
┌───────────────────────────────────────┐
│ [JS] [SJ] John Smith, Sarah... ▲      │
├───────────────────────────────────────┤
│ ☑ [JS] John Smith (Primary)          │ ← Selected
│ ☑ [SJ] Sarah Johnson                 │ ← Selected
│ ☐ [MD] Mike Davis                    │
│ ☐ [LC] Lisa Chen                     │
└───────────────────────────────────────┘
```
- **Checkboxes**: Checked for selected participants
- **Hover**: Background highlight per option
- **Primary label**: Shows who is primary decision maker

### With Assign Button
```
[👤 JS 👤 SJ Selected Names ▼]  [Assign]
─────────────────────────────   ───────
     Dropdown (read mode)        Action
```
- **Dropdown**: Shows current selection
- **Assign Button**: Confirms changes, shows snackbar
- **Flow**: Select → Click Assign → Snackbar confirmation

---

## Avatar Display

### Single Avatar
```
[JS]
───
2ch
```
- Size: 24px circle (w-6 h-6)
- Initials: 2 characters, uppercase
- Background: Brand color or assigned color
- Text: White, font-semibold, text-xs

### Multiple Avatars (Stacked)
```
[JS][SJ]
```
- Slight negative margin for overlap (-ml-1)
- Z-index stacking (first avatar on top)
- Max shown: 3-4, then "+2" badge

### Avatar Colors
- Assigned algorithmically or from participant data
- Primary: Brand red (#9F2E2B)
- Others: Blue, purple, green, orange variations

---

## Dropdown Options

### Option Structure
```
☑ [AV] Avatar Name (Role/Note)
```
- **Checkbox**: Left side, checked if selected
- **Avatar**: Next to checkbox
- **Name**: Participant full name
- **Note**: Optional (e.g., "Primary", "IT Contact")

### Special Options
- **Primary decision maker**: Shows "(Primary)" label
- **Required assignment**: Checkbox disabled (checked, can't uncheck)
- **Empty state**: "No participants added yet"

---

## Styling Specifications

### Trigger Button
- Padding: 12px horizontal, 6px vertical (px-3 py-1.5)
- Background: Muted/50
- Border: 1px solid border color
- Border-radius: 8px (rounded-lg)
- Display: Flex, items-center, gap-2

### Dropdown Menu
- Width: Matches trigger or min-width 240px
- Max-height: 320px (scrollable if more)
- Background: White
- Border: 1px solid slate-200
- Border-radius: 8px
- Shadow: Large elevation
- Z-index: 50

### Dropdown Option
- Padding: 12px horizontal, 8px vertical
- Hover: Background slate-50
- Cursor: Pointer
- Display: Flex, gap-3

### Checkbox
- Size: 16px (w-4 h-4)
- Border: 2px solid
- Checked: Primary color fill
- Unchecked: Border only

---

## Behavior

### Selection Flow
1. Click trigger button → dropdown opens
2. Click participant options → checkboxes toggle
3. Multiple selections allowed
4. Close dropdown (click outside or ESC)
5. **With "Assign" button**: Click Assign to confirm
6. **Without "Assign" button**: Auto-saves on change

### Snackbar Confirmation
```
┌──────────────────────────────────────────┐
│ ✓ Participants assigned to Definitions:  │
│   John Smith, Sarah Johnson              │
└──────────────────────────────────────────┘
```
- Shows after clicking "Assign"
- Duration: 3-4 seconds
- Auto-dismisses

---

## Variants

### Read-Only (Module 1)
```
[JS] John Smith
```
- No dropdown arrow
- No hover effect
- Gray border, muted background
- Shows primary decision maker only

### Editable (Modules 2-7)
```
[JS] [SJ] Selected ▼  [Assign]
```
- Dropdown enabled
- Can add/remove participants
- "Assign" button confirms
- Snackbar feedback

### Empty State
```
[Select participants ▼]  [Assign]
```
- Placeholder text
- No avatars shown
- Opens dropdown on click

---

## Accessibility

- **Role**: combobox or listbox
- **Aria-label**: "Assign participants to [Module Name]"
- **Options**: role="option", aria-selected="true/false"
- **Keyboard**: 
  - Arrow keys to navigate options
  - Space to toggle selection
  - ESC to close
  - Tab to Assign button

---

## Usage Examples

### Module 1 (Primary Only, Read-Only)
```
Assigned: [JS] John Smith
```

### Module 2 (Multiple Assignees)
```
Assigned: [👤 JS 👤 SJ John Smith, Sarah Johnson ▼]  [Assign]
```

### Unassigned Module
```
Assigned: [Select participants to assign ▼]  [Assign]
```

---

## Related Components
- Avatar component (circular initials)
- Dropdown menu component
- Snackbar notification
- Module cards in accordion

---

_Pattern Type: Form Input / Multiselect_  
_Last Updated: December 2025_

