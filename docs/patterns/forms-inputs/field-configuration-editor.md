# Field Configuration Editor (Drag & Drop)

**Type**: Customer Flow Component  
**Used In**: Property Configure, Request Form Configure  
**Location**: `app/definitions/properties/configure/overview/page.tsx`, `app/definitions/request-form/configure/overview/page.tsx`

---

## Visual Structure

```
╔═══════════════════════════════════════════════════════════╗
║  Edit Mode Active - Drag, drop, and configure fields  [×] ║
╠═══════════════════════════════════════════════════════════╣
║                                                            ║
║  Edit Overview Fields                                     ║
║  Configure essential property fields...                   ║
║                                                            ║
║  ┌───────────────────────────────────────────────┐ [Add]  ║
║  │ Overview                                      │        ║
║  ├──────────────────┬────────────────────────────┤        ║
║  │ Column 1         │ Column 2                   │        ║
║  │ ┌──────────────┐ │ ┌──────────────┐          │        ║
║  │ │≡ Field 1  👁▼│ │ │≡ Field 3  👁▼│          │        ║
║  │ └──────────────┘ │ └──────────────┘          │        ║
║  │ ┌──────────────┐ │ ┌──────────────┐          │        ║
║  │ │≡ Field 2  👁▼│ │ │≡ Field 4  👁▼│          │        ║
║  │ └──────────────┘ │ └──────────────┘          │        ║
║  └──────────────────┴────────────────────────────┘        ║
║                                                            ║
║  [← Exit Edit Mode]              [Continue →]             ║
╚═══════════════════════════════════════════════════════════╝
```

---

## Component Anatomy

### Edit Mode Banner (Top)
```
┌────────────────────────────────────────────────┐
│ [✏️] Edit Mode Active - Instructions  [× Exit] │
└────────────────────────────────────────────────┘
```
- **Background**: Blue-50
- **Border**: Bottom border blue-200
- **Icon**: Edit icon
- **Text**: "Edit Mode Active - Drag, drop, and configure fields"
- **Exit Button**: Right-aligned, hover effect

### Section Header
```
┌─────────────────────────────────────────┐
│ Overview                    [+ Add Field]│
│ Basic property identification...         │
└─────────────────────────────────────────┘
```
- **Title**: text-lg, font-semibold
- **Subtitle**: text-sm, muted
- **Add Button**: Top-right, primary bg

### Two-Column Field Layout
```
╔════════════════════╦════════════════════╗
║   Column 1         ║    Column 2        ║
║ ┌────────────────┐ ║ ┌────────────────┐║
║ │≡ Street Address│ ║ │≡ Apt/Unit #    ││
║ │  * Required    │ ║ │  Optional      ││
║ │  👁 Visible  ▼ │ ║ │  👁 Visible  ▼ ││
║ └────────────────┘ ║ └────────────────┘║
║ ┌────────────────┐ ║ ┌────────────────┐║
║ │≡ City *        │ ║ │≡ State *       ││
║ └────────────────┘ ║ └────────────────┘║
╚════════════════════╩════════════════════╝
```

---

## Field Card Anatomy

```
╔═══════════════════════════════════════════════════╗
║  ≡≡  Field Label *  🔒  👁 ▼  ×                   ║
║  ──────────────────────────────────────────────   ║
║  [Text Input] Example Value                       ║
║  Help text or validation message                  ║
╚═══════════════════════════════════════════════════╝
```

**Elements** (Left to Right):
1. **Drag Handle**: `≡≡` (6 dots icon, gray, only visible on hover)
2. **Label**: Field name, bold, with asterisk if required
3. **Lock Icon**: 🔒 (if system-required, cannot disable)
4. **Visibility Toggle**: 👁 (eye icon) + dropdown
5. **Delete**: × (only for custom fields)

---

## Field Card States

### Default (Enabled, Visible)
```
┌───────────────────────────────────┐
│ ≡ Street Address *  👁 ▼          │
│ ───────────────────────────────── │
│ [Text] 123 Main Street            │
└───────────────────────────────────┘
```
- Border: 1px solid slate-200
- Background: White
- Eye icon: Open (blue)

### Selected (Clicked for Configuration)
```
┌───────────────────────────────────┐
│ ≡ Street Address *  👁 ▼          │ ← Blue border
│ ───────────────────────────────── │
│ [Text] 123 Main Street            │
└───────────────────────────────────┘
```
- Border: 2px solid primary
- Background: Primary/5 tint
- Opens settings drawer on right

### Disabled (Hidden Field)
```
┌───────────────────────────────────┐
│ ≡ Portfolio  🚫 ▼                 │ ← Grayed out
│ ───────────────────────────────── │
│ [Text] (Hidden)                   │
└───────────────────────────────────┘
```
- Opacity: 60%
- Eye icon: Closed/crossed out (gray)
- Background: Muted

### System Required (Locked)
```
┌───────────────────────────────────┐
│ ≡ File Number * 🔒  👁            │
│ ───────────────────────────────── │
│ [System] Auto-generated           │
└───────────────────────────────────┘
```
- Lock icon visible
- Eye toggle disabled (always visible)
- Cannot be deleted
- Label can be edited

### Dragging
```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│ ≡ Street Address *  👁 ▼        │ ← Dashed border
│ ───────────────────────────────  │ ← Reduced opacity
│ [Text] 123 Main Street           │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```
- Opacity: 50%
- Border: Dashed
- Cursor: Grabbing
- Ghost preview follows cursor

---

## Drag & Drop Behavior

### Drag Initiations
- **Trigger**: Click and hold drag handle (≡≡)
- **Visual**: Card becomes semi-transparent
- **Cursor**: Changes to grabbing hand

### Drop Zones
- **Within same column**: Reorder fields
- **To other column**: Move field between columns
- **Drop indicator**: Blue line shows drop position
- **Invalid drop**: No indicator, card returns to origin

### Reordering Logic
- Maintains field order within each column
- Updates `order` property on each field
- Saves state immediately (or on blur)

---

## Field Settings Drawer

### Opens When
- Click on field card (not on icons)
- Click gear icon (if present)

### Drawer Content (Right Side)
```
┌────────────────────────────────┐
│ Field Settings          [× Close]│
├────────────────────────────────┤
│                                │
│ Field Label                    │
│ [_________________]            │
│                                │
│ Field Type                     │
│ [Dropdown      ▼]              │
│                                │
│ ☑ Required                     │
│ ☑ Visible                      │
│ ☑ Editable                     │
│                                │
│ Help Text (optional)           │
│ [__________________            │
│  __________________]           │
│                                │
│ [Delete Field]    [Save]       │
└────────────────────────────────┘
```

**Width**: 400px  
**Background**: White  
**Shadow**: Large left shadow  
**Z-index**: Above content

---

## Styling Specifications

### Field Card
- Padding: 16px (p-4)
- Border: 1px solid (2px when selected)
- Border-radius: 8px (rounded-lg)
- Margin-bottom: 12px (mb-3)
- Transition: All 200ms

### Column Layout
- Grid: 2 equal columns
- Gap: 24px (gap-6)
- Min-height: 400px per column
- Padding: 24px each

### Empty State (No Fields in Column)
```
┌───────────────────────────┐
│                           │
│   Drag fields here        │
│                           │
└───────────────────────────┘
```
- Border: 2px dashed slate-300
- Min-height: 128px (h-32)
- Text: Centered, muted

---

## Icon Specifications

### Drag Handle (≡≡)
- Icon: 6 dots (2×3 grid)
- Size: 16px
- Color: Slate-400
- Visibility: Hidden, visible on card hover

### Eye Icon (Visibility)
- Open eye: Field is visible (blue-600)
- Closed eye: Field is hidden (slate-400)
- Size: 16px
- Clickable: Opens dropdown

### Lock Icon (System Required)
- Icon: Padlock
- Size: 14px
- Color: Slate-500
- Tooltip: "System required field"

### Delete Icon (×)
- Size: 16px
- Color: Red-400
- Hover: Red-600
- Only on custom fields

---

## Visibility Dropdown

### Options
```
┌─────────────────┐
│ ● Visible       │ ← Radio selected
│ ○ Hidden        │
└─────────────────┘
```
- Instant toggle
- Updates field state
- Visual feedback on card

---

## Add Field Modal

### Triggered By
- "Add Field" button (top-right of section)

### Modal Content
```
┌──────────────────────────────┐
│ Add Custom Field      [× Close]│
├──────────────────────────────┤
│ Field Label *                │
│ [___________________]        │
│                              │
│ Input Type *                 │
│ [Text         ▼]             │
│                              │
│ ☐ Required                   │
│ ☐ Start Hidden               │
│                              │
│ Column                       │
│ ○ Column 1  ● Column 2       │
│                              │
│ [Cancel]          [Add Field]│
└──────────────────────────────┘
```

---

## Keyboard Shortcuts

- **ESC**: Exit edit mode / Close drawer
- **E**: Enter edit mode (when in preview)
- **Tab**: Navigate between fields
- **Enter**: Open field settings (when focused)

---

## Related Components
- `DraggableField` - Individual field card component
- `FieldSettingsDrawer` - Settings side panel
- `AddFieldModal` - Add new field dialog
- Preview page - Read-only view before edit mode

---

_Pattern Type: Form / Field Editor_  
_Last Updated: December 2025_

