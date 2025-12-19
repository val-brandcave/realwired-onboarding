# Tabs Component

**Type**: Customer Flow Component  
**Used In**: Customer Hub (`app/hub/page.tsx`)  
**Location**: `app/hub/_components/HubTabs.tsx`

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────────┐
│  [Onboarding]  [Products]  [Support Tickets]  [CS Team]     │
│  ════════════                                                │
└─────────────────────────────────────────────────────────────┘
     Active         Inactive      Inactive         Inactive
```

---

## Anatomy

```
╔════════════════════════════════════════════════════════════╗
║  ┌──────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐     ║
║  │ Active   │  │ Tab 2   │  │ Tab 3   │  │ Tab 4   │     ║
║  │ Tab Text │  │ Text    │  │ Text    │  │ Text    │     ║
║  └──────────┘  └─────────┘  └─────────┘  └─────────┘     ║
║  ════════════                                               ║
║  (bottom border 2px, brand color)                          ║
╚════════════════════════════════════════════════════════════╝
```

---

## Tab States

### Active Tab
- **Text color**: Brand red (#9F2E2B)
- **Font**: font-semibold
- **Bottom border**: 2px solid brand red
- **Background**: White
- **Transition**: 200ms on all properties

### Inactive Tab
- **Text color**: Slate-600
- **Font**: font-medium
- **Bottom border**: None
- **Background**: Transparent
- **Hover**: Text → slate-900

---

## Tab Options

### Customer Hub Tabs (4 tabs)
1. **Onboarding** (Default active)
   - Module cards and progress
   - Next module hero
   - Go-live banner

2. **Products**
   - Product discovery carousel
   - Product cards grid
   - Express Interest toggles

3. **Support Tickets**
   - Ticket list with filters
   - Create new ticket button
   - Ticket status management

4. **Customer Success Team**
   - CS agent cards
   - Meeting request form
   - Agent bios and contact info

---

## Styling Specifications

### Tab Container
- Background: White
- Border: Bottom border (1px, slate-200)
- Padding: None on container
- Display: Flex, gap-1
- Sticky: Yes (below breadcrumbs if present)

### Individual Tab Button
- Padding: 16px horizontal, 12px vertical (px-4 py-3)
- Font size: text-sm (14px)
- Min-width: auto (content-based)
- Border-radius: None (full-width bottom border instead)
- Cursor: Pointer

### Active State Border
- Width: 2px
- Color: Brand red (#9F2E2B)
- Position: Bottom of tab
- Transition: Smooth (200ms)

---

## Behavior

### Tab Switching
- **Click**: Switch to selected tab
- **Content**: Replace tab content panel below
- **URL**: Update search params (`?tab=products`)
- **Scroll**: Return to top of content area
- **Animation**: Smooth fade transition (optional)

### URL Persistence
- Active tab stored in URL: `?tab=onboarding`
- On page load: Read param and set active tab
- Default: `onboarding` if no param

---

## Content Patterns

### Tab 1: Onboarding
- Go-live date banner (if set)
- Next module hero card
- "All Modules" accordion

### Tab 2: Products
- Carousel hero with product highlights
- Product discovery grid
- Product detail modals

### Tab 3: Support Tickets
- Page header with description
- "Submit New Ticket" button
- Ticket list with status filters

### Tab 4: Customer Success Team
- Page header
- CS agent grid (3 columns)
- Meeting request form

---

## Accessibility

- **Role**: tablist
- **Tab buttons**: role="tab", aria-selected="true/false"
- **Tab panels**: role="tabpanel", aria-labelledby="[tab-id]"
- **Keyboard**: Arrow keys to navigate tabs, Enter/Space to activate
- **Focus**: Visible focus ring on active element

---

## Responsive Behavior

- **Desktop (lg+)**: All 4 tabs in single row
- **Tablet (md)**: May stack if text is long
- **Mobile (sm)**: Horizontal scroll if needed, or stack vertically

---

## Related Components
- `HubTabs.tsx` - Main tabs component
- Tab content components (ProductDiscovery, TicketList, CSAgentGrid)
- URL search params handling

---

_Pattern Type: Navigation_  
_Last Updated: December 2025_

