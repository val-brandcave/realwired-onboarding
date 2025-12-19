# YouConnect Pattern Library

**Purpose**: Component and pattern documentation for InnoStacks development team  
**Last Updated**: December 2025  
**Status**: Handoff Documentation for Implementation Phase

---

## Overview

This pattern library documents all reusable components, UI patterns, and design metaphors used across the YouConnect Onboarding application. Use these patterns to maintain consistency and build scalable features efficiently.

---

## Pattern Categories

### 🧭 Navigation
Patterns for app navigation and wayfinding

- **[Header Navigation](./navigation/header-nav.md)** - Top app bar with branding, notifications, profile  
  *Used in: All pages (Customer & CS)*

- **[Breadcrumbs](./navigation/breadcrumbs.md)** - Hierarchical navigation trail  
  *Used in: All module pages*

- **[Hub Tabs](./navigation/tabs.md)** - 4-tab navigation for Hub sections  
  *Used in: Customer Hub (Onboarding / Products / Tickets / CS)*

- **[Segmented Control](./navigation/tabs-segmented-control.md)** - iOS-style 2-option toggle  
  *Used in: Auth landing page (Customer / CS access)*

- **[Sticky Footer Nav](./navigation/footer-nav.md)** - Bottom navigation with Previous/Next  
  *Used in: All multi-step flows*

---

### 🎯 Hero Sections & Banners

- **[Carousel Hero](./hero-banners/carousel-hero.md)** - Auto-rotating product showcase  
  *Used in: Products tab*

- **[Next Module Hero](./hero-banners/next-module-hero.md)** - CTA card for next onboarding step  
  *Used in: Hub Onboarding tab*

- **Go-Live Banner** - Countdown banner with status  
  *Used in: Hub (when date is set)*

---

### 📋 Lists & Accordions

- **[Module Accordion](./lists-accordions/module-accordion.md)** - Collapsible module list with progress  
  *Used in: Hub Onboarding tab*

- **Ticket List** - Support ticket management list  
  *Used in: Support Tickets tab*

- **CS Agent Grid** - Team member cards in grid  
  *Used in: CS Team tab*

---

### 📝 Forms & Inputs

- **[Template Selector Cards](./forms-inputs/template-selector-cards.md)** - Radio-card selection pattern  
  *Used in: Property/Request template selection*

- **[Field Configuration Editor](./forms-inputs/field-configuration-editor.md)** - Drag-drop field manager  
  *Used in: Property/Request configure pages*

- **[Multiselect Assignee](./forms-inputs/multiselect-assignee.md)** - Participant assignment dropdown  
  *Used in: Hub module assignment*

- **Form Field Library** - Standard inputs (text, dropdown, date, etc.)  
  *Used in: Throughout app*

---

### 🪟 Modals & Drawers

- **[Ticket Submission Modal](./modals-drawers/ticket-submission-modal.md)** - Create support ticket  
  *Used in: Support Tickets tab*

- **[Add Client Modal](./modals-drawers/add-client-modal.md)** - CS creates new onboarding  
  *Used in: CS Portal*

- **Field Settings Drawer** - Right-side panel for field configuration  
  *Used in: Field editor*

- **Meeting Request Modal** - Schedule CS meeting  
  *Used in: CS Team tab*

- **Product Detail Modal** - Product info and features  
  *Used in: Products tab*

---

### 🎨 Cards & Content Blocks

- **[Product Discovery Cards](./cards/product-discovery-cards.md)** - Product showcase with interest toggle  
  *Used in: Products tab*

- **Module Cards** - Onboarding module display in accordion  
  *Used in: Hub accordion*

- **CS Agent Cards** - Team member profiles  
  *Used in: CS Team tab*

- **Metric Cards** - Dashboard KPI displays  
  *Used in: CS Portal dashboard*

---

### 💬 Feedback & Status

- **[Snackbar/Toast](./feedback/snackbar-toast.md)** - Temporary notification messages  
  *Used in: All action confirmations*

- **[Progress Indicators](./feedback/progress-indicators.md)** - Linear, circular, step progress  
  *Used in: Hub, tables, module pages*

- **[Badges & Pills](./feedback/badges-pills.md)** - Status and category labels  
  *Used in: Throughout app*

- **Loading States** - Skeletons and spinners  
  *Used in: Async operations*

---

### 📊 CS Flow Specific

- **[Client Table](./cs-flow/client-table.md)** - Onboarding pipeline table  
  *Used in: CS Portal dashboard*

- **At-Risk Clients Section** - Accordion with problem clients  
  *Used in: CS Portal*

- **Module Completion Funnel** - Visual funnel chart  
  *Used in: CS Portal dashboard*

---

## Design Tokens

### Brand Colors
- **Primary Red**: `#9F2E2B`
- **Primary Dark**: `#7D2522`
- **Hover Red**: `#8A2826`
- **Hover Dark**: `#6B1F1D`

### UI Colors
- **Blue (CS)**: `#3B82F6` to `#2563EB`
- **Success Green**: `#10B981`
- **Warning Amber**: `#F59E0B`
- **Error Red**: `#EF4444`

### Neutral Palette
- **Slate-50 to Slate-900**: Primary text/background scale
- **White**: `#FFFFFF`
- **Black**: `#000000`

---

## Typography

### Font Family
- Primary: Montserrat (variable weights: 300-800)
- Fallback: System font stack

### Scale
- **3xl**: 30px (page titles)
- **2xl**: 24px (section headers)
- **xl**: 20px (modal titles)
- **lg**: 18px (card titles)
- **base**: 16px (body)
- **sm**: 14px (secondary text)
- **xs**: 12px (labels, captions)

### Weights
- **300**: Light (rarely used)
- **400**: Regular (body text)
- **500**: Medium (labels)
- **600**: Semibold (buttons, emphasis)
- **700**: Bold (headings)
- **800**: Extra bold (hero text)

---

## Spacing System

Uses Tailwind's spacing scale (4px increments):
- **1**: 4px
- **2**: 8px
- **3**: 12px
- **4**: 16px
- **6**: 24px
- **8**: 32px
- **12**: 48px
- **16**: 64px

---

## Border Radius

- **sm**: 4px (small elements)
- **md**: 6px (buttons, inputs)
- **lg**: 8px (cards, containers)
- **xl**: 12px (large cards)
- **2xl**: 16px (modals, major containers)
- **full**: 9999px (pills, avatars, circles)

---

## Shadows

- **sm**: Subtle elevation (cards)
- **md**: Standard elevation (hover states)
- **lg**: High elevation (modals)
- **xl**: Maximum elevation (dropdowns)
- **2xl**: Modal overlays

---

## Animation & Transitions

### Standard Transitions
- **Duration**: 200ms (most interactions)
- **Easing**: ease-in-out
- **Properties**: all, colors, transform, opacity

### Hover Effects
- **Scale**: 1.02 - 1.05 (subtle)
- **Shadow**: Increase elevation
- **Color**: Darken slightly

### Page Transitions
- **Duration**: 300ms
- **Type**: Fade or slide
- **Easing**: ease-out

---

## Responsive Breakpoints

- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)
- **2xl**: 1536px (extra large)

---

## Pattern Usage Guidelines

### Consistency Rules
1. ✅ Always use documented patterns for new features
2. ✅ Match spacing, colors, and animations exactly
3. ✅ Reuse existing components before creating new ones
4. ✅ Follow accessibility guidelines for all patterns

### When to Deviate
- ⚠️ Only create new patterns for truly unique use cases
- ⚠️ Consult with design team before major variations
- ⚠️ Document new patterns immediately if created

---

## Component Hierarchy

### Atomic Components (Smallest)
- Buttons
- Input fields
- Icons
- Badges
- Avatars

### Molecular Components (Combined)
- Form groups (label + input + helper)
- Card headers (title + action button)
- List items (icon + text + action)

### Organism Components (Complex)
- Headers (logo + nav + actions)
- Tables (header + rows + pagination)
- Modals (header + body + footer)
- Accordions (header + collapsible content)

### Templates (Page-level)
- MainLayout (header + breadcrumbs + content + footer)
- Auth Layout (card-based)
- Dashboard Layout (metrics + tables)

---

## File Structure

```
/docs/patterns/
├── README.md (this file)
├── navigation/
│   ├── header-nav.md
│   ├── breadcrumbs.md
│   ├── tabs.md
│   ├── tabs-segmented-control.md
│   └── footer-nav.md
├── hero-banners/
│   ├── carousel-hero.md
│   ├── next-module-hero.md
│   └── go-live-banner.md
├── lists-accordions/
│   ├── module-accordion.md
│   ├── ticket-list.md
│   └── agent-grid.md
├── forms-inputs/
│   ├── template-selector-cards.md
│   ├── field-configuration-editor.md
│   ├── multiselect-assignee.md
│   └── form-fields-library.md
├── modals-drawers/
│   ├── ticket-submission-modal.md
│   ├── add-client-modal.md
│   ├── field-settings-drawer.md
│   ├── meeting-modal.md
│   └── product-detail-modal.md
├── cards/
│   ├── product-discovery-cards.md
│   ├── module-cards.md
│   ├── agent-cards.md
│   └── metric-cards.md
├── cs-flow/
│   ├── client-table.md
│   ├── at-risk-section.md
│   └── funnel-chart.md
├── feedback/
│   ├── snackbar-toast.md
│   ├── progress-indicators.md
│   ├── badges-pills.md
│   └── loading-states.md
└── education/
    ├── education-panel.md (removed from edit mode)
    └── help-sections.md
```

---

## Quick Reference

### Most Commonly Used Patterns

| Pattern | Usage Frequency | Priority |
|---------|----------------|----------|
| Header Nav | Every page | 🔴 Critical |
| Footer Nav | Most flows | 🔴 Critical |
| Snackbar | All actions | 🔴 Critical |
| Badges | Throughout | 🟡 High |
| Progress Bars | Hub, CS Portal | 🟡 High |
| Modal Base | Multiple flows | 🟡 High |
| Form Fields | All forms | 🔴 Critical |
| Module Cards | Hub | 🟡 High |

---

## Implementation Priority

### Phase 1: Core Patterns (Week 1)
1. Header Navigation
2. Footer Navigation  
3. Breadcrumbs
4. Form field library
5. Buttons (primary, secondary, text)
6. Modal base pattern

### Phase 2: Content Patterns (Week 2)
7. Module accordion
8. Product cards
9. Client table
10. Progress indicators
11. Badges and pills
12. Snackbar/toast

### Phase 3: Advanced Patterns (Week 3)
13. Field configuration editor
14. Drag-and-drop functionality
15. Template selector
16. Multiselect components
17. Tabs and tab panels
18. Hero sections

---

## Related Documentation

- **Onboarding Checklist**: `/documents/onboarding-checklist.md`
- **Implementation Plan**: `/processed-calls/IMPLEMENTATION-PLAN-Dec-09-UX-Sync.md`
- **Meeting Notes**: `/processed-calls/` folder
- **Component Code**: `/components/` folder
- **Page Code**: `/app/` folder

---

## Support & Questions

For questions about patterns:
1. Reference this documentation first
2. Check component code in `/components/`
3. Review meeting notes in `/processed-calls/`
4. Contact Val (Brandcave) or Ed (Realwired)

---

_Documentation created for InnoStacks development team handoff_  
_Covers Customer Onboarding Flow + CS Portal patterns_  
_Foundation for scalable, maintainable development_

