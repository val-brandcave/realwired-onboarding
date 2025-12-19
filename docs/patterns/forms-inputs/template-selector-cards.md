# Template Selector Cards

**Type**: Customer Flow Component  
**Used In**: Property Templates, Request Form Templates  
**Location**: `app/definitions/properties/templates/page.tsx`, `app/definitions/request-form/templates/page.tsx`

---

## Visual Structure

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ○ Template 1 │  │ ● Template 2 │  │ ○ Template 3 │
│              │  │   (selected) │  │              │
│ [Preview]    │  │ [Preview]    │  │ [Preview]    │
│              │  │              │  │              │
│ Title        │  │ Title        │  │ Title        │
│ Description  │  │ Description  │  │ Description  │
│ 27 fields    │  │ 42 fields    │  │ 18 fields    │
└──────────────┘  └──────────────┘  └──────────────┘
  (unselected)       (selected)       (unselected)
```

---

## Anatomy

```
╔═══════════════════════════════════════════════════╗
║  ┌─────────────────────────────────────────────┐ ║
║  │ ● Radio Button                              │ ║
║  │                                             │ ║
║  │ ┌─────────────────────────────────────────┐│ ║
║  │ │      Thumbnail Preview Image            ││ ║
║  │ │      (screenshot or placeholder)        ││ ║
║  │ └─────────────────────────────────────────┘│ ║
║  │                                             │ ║
║  │ Template Name (Bold)                        │ ║
║  │ ───────────────────                         │ ║
║  │ Short description of what this template     │ ║
║  │ includes and who it's designed for.         │ ║
║  │                                             │ ║
║  │ Badge: [27 fields included]                 │ ║
║  │ Badge: [Best for: Residential]              │ ║
║  └─────────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════╝
```

---

## Template Card States

### Unselected
```
┌─────────────────────────┐
│ ○                       │ ← Empty radio
│ [Preview Image]         │ ← Normal opacity
│ Template Title          │ ← Slate-900
│ Description...          │ ← Slate-600
│ [Badge] [Badge]         │ ← Muted badges
└─────────────────────────┘
```
- **Border**: 2px solid slate-200
- **Background**: White
- **Hover**: Border → primary/30, slight shadow
- **Cursor**: Pointer

### Selected
```
┌─────────────────────────┐
│ ● ← Filled radio        │
│ [Preview Image]         │
│ **Template Title**      │ ← Emphasized
│ Description...          │
│ [Badge] [Badge]         │
└─────────────────────────┘
```
- **Border**: 2px solid primary (#9F2E2B)
- **Background**: Primary/5 (light tint)
- **Radio**: Filled with primary color
- **Shadow**: Medium elevation

---

## Template Examples

### Property Templates

**1. Standard Residential**
- Description: "Essential fields for single-family residential properties"
- Field count: 27 fields
- Best for: Residential lending
- Icon/Preview: House icon or field grid preview

**2. Commercial Focus**  
- Description: "Comprehensive fields for commercial real estate appraisals"
- Field count: 42 fields
- Best for: Commercial lending
- Icon/Preview: Building icon or field grid preview

**3. Full-Service (All Fields)**
- Description: "All available fields enabled - maximum flexibility"
- Field count: 68 fields
- Best for: Complex workflows
- Icon/Preview: Grid icon

**4. Start from Blank**
- Description: "Build your own configuration from scratch"
- Field count: 0 fields (customize all)
- Best for: Custom requirements
- Icon/Preview: Plus icon

### Request Form Templates

**1. Basic Request**
- Description: "Core fields for standard appraisal requests"
- Field count: 18 fields

**2. Comprehensive Request**
- Description: "Extended fields for detailed request intake"
- Field count: 31 fields

**3. Start from Blank**
- Description: "Customize your request form from the ground up"
- Field count: 0 fields

---

## Card Elements

### Radio Button (Top-Left)
- Position: Absolute top-4 left-4
- Size: 20px circle
- Border: 2px solid
- Filled: When selected
- Color: Primary when selected, gray when not

### Preview Thumbnail
- Aspect ratio: 16:9 or 4:3
- Height: 160px - 200px
- Background: Gradient placeholder or actual screenshot
- Border-radius: 8px
- Margin-bottom: 16px

### Title
- Font: text-lg, font-bold
- Color: slate-900
- Margin-bottom: 8px

### Description
- Font: text-sm
- Color: slate-600  
- Line-height: Relaxed
- Max-lines: 3 (with ellipsis)
- Margin-bottom: 12px

### Badges
```
[27 fields]  [Best for: Residential]
```
- **Field Count Badge**: Blue-100 bg, blue-800 text
- **Category Badge**: Purple-100 bg, purple-800 text
- Font: text-xs, font-medium
- Padding: px-2.5 py-0.5
- Border-radius: rounded-md
- Gap: 8px between badges

---

## Grid Layout

### Desktop (3 columns)
```
┌─────────┐ ┌─────────┐ ┌─────────┐
│Template1│ │Template2│ │Template3│
└─────────┘ └─────────┘ └─────────┘
┌─────────┐
│Template4│
└─────────┘
```
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Gap: 24px (gap-6)

### Mobile/Tablet
- Stacks to 1-2 columns
- Maintains card aspect ratios
- Touch-friendly tap targets

---

## Styling Specifications

### Card Container
- Padding: 24px (p-6)
- Border: 2px solid
- Border-radius: 12px (rounded-xl)
- Min-height: 400px
- Transition: All 200ms

### Unselected Card
- Border-color: slate-200
- Background: white
- Shadow: Small
- Hover shadow: Medium

### Selected Card
- Border-color: primary (#9F2E2B)
- Background: primary/5
- Shadow: Medium
- No additional hover effect

---

## Behavior

### Selection
- **Click anywhere on card**: Selects template
- **Radio visual update**: Instant
- **Card styling update**: Smooth transition
- **Previous selection**: Automatically deselected

### Continue Flow
- Footer nav "Next" button enabled when template selected
- Tooltip shows if no selection: "Please select a template to continue"
- On continue: Navigate to preview page with selected template

---

## Accessibility

- **Radio group**: Proper radio button semantics
- **Labels**: Associated with radio inputs
- **Keyboard**: Arrow keys to navigate, Space to select
- **Focus**: Visible focus ring on card
- **Screen readers**: Announce template name, description, selection state

---

## Usage Pattern

### Step Sequence
1. User arrives at template selection page
2. Sees 3-4 template cards in grid
3. Clicks on preferred template
4. Card highlights with filled radio
5. "Continue" button becomes enabled
6. User clicks continue → goes to preview page

---

## Content Guidelines

### Template Names
- Keep short (2-3 words)
- Descriptive of purpose
- Title case

### Descriptions
- 1-2 sentences max
- Explain who it's for or what it includes
- Use friendly, helpful tone

### Field Counts
- Show accurate count
- Update if template changes
- Use as decision-making data point

---

## Related Components
- Radio input elements
- Badge components
- Preview page (next step after selection)
- Footer nav (Continue button)

---

_Pattern Type: Form Input / Selection_  
_Last Updated: December 2025_

