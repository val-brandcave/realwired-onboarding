# Complete Pattern Index

**Quick reference for all documented patterns organized by usage frequency and importance**

---

## 🔴 Critical Patterns (Implement First)

These patterns are used on nearly every page and form the foundation of the app.

| Pattern | File | Used In | Priority |
|---------|------|---------|----------|
| Header Navigation | `navigation/header-nav.md` | All pages | P0 |
| Sticky Footer Nav | `navigation/footer-nav.md` | All multi-step flows | P0 |
| Breadcrumbs | `navigation/breadcrumbs.md` | All module pages | P0 |
| Form Field Library | `forms-inputs/form-fields-library.md` | All forms | P0 |
| Primary Button | `buttons/primary-button.md` | All CTAs | P0 |
| Modal Base | `modals-drawers/modal-base.md` | All dialogs | P0 |
| Snackbar/Toast | `feedback/snackbar-toast.md` | All confirmations | P0 |

---

## 🟡 High Priority Patterns (Week 1-2)

Frequently used patterns that define major page structures.

| Pattern | File | Used In | Priority |
|---------|------|---------|----------|
| Module Accordion | `lists-accordions/module-accordion.md` | Hub | P1 |
| Hub Tabs | `navigation/tabs.md` | Hub | P1 |
| Progress Bars | `feedback/progress-indicators.md` | Hub, CS Portal | P1 |
| Badges & Pills | `feedback/badges-pills.md` | Throughout | P1 |
| Client Table | `cs-flow/client-table.md` | CS Portal | P1 |
| Template Selector | `forms-inputs/template-selector-cards.md` | Definitions | P1 |
| Next Module Hero | `hero-banners/next-module-hero.md` | Hub | P1 |
| Product Cards | `cards/product-discovery-cards.md` | Products tab | P1 |

---

## 🟢 Medium Priority Patterns (Week 2-3)

Important for specific flows but not universal.

| Pattern | File | Used In | Priority |
|---------|------|---------|----------|
| Field Config Editor | `forms-inputs/field-configuration-editor.md` | Definitions | P2 |
| Multiselect Assignee | `forms-inputs/multiselect-assignee.md` | Hub | P2 |
| Ticket Modal | `modals-drawers/ticket-submission-modal.md` | Support | P2 |
| Add Client Modal | `modals-drawers/add-client-modal.md` | CS Portal | P2 |
| Go-Live Banner | `hero-banners/go-live-banner.md` | Hub | P2 |
| Carousel Hero | `hero-banners/carousel-hero.md` | Products | P2 |
| Segmented Control | `navigation/tabs-segmented-control.md` | Auth | P2 |

---

## 🔵 Lower Priority Patterns (Week 3+)

Nice-to-have patterns for polish and specific features.

| Pattern | File | Used In | Priority |
|---------|------|---------|----------|
| Agent Cards | `cards/agent-cards.md` | CS Team tab | P3 |
| Meeting Modal | `modals-drawers/meeting-modal.md` | CS Team | P3 |
| At-Risk Section | `cs-flow/at-risk-section.md` | CS Portal | P3 |
| Funnel Chart | `cs-flow/funnel-chart.md` | CS Portal | P3 |
| Loading States | `feedback/loading-states.md` | Async ops | P3 |
| Field Drawer | `modals-drawers/field-settings-drawer.md` | Field editor | P3 |

---

## By User Flow

### Customer Flow Only
- Hub Tabs (`navigation/tabs.md`)
- Next Module Hero (`hero-banners/next-module-hero.md`)
- Module Accordion (`lists-accordions/module-accordion.md`)
- Go-Live Banner (`hero-banners/go-live-banner.md`)
- Template Selector (`forms-inputs/template-selector-cards.md`)
- Field Config Editor (`forms-inputs/field-configuration-editor.md`)
- Multiselect Assignee (`forms-inputs/multiselect-assignee.md`)
- Product Cards (`cards/product-discovery-cards.md`)

### CS Flow Only
- Client Table (`cs-flow/client-table.md`)
- Add Client Modal (`modals-drawers/add-client-modal.md`)
- At-Risk Section (`cs-flow/at-risk-section.md`)
- Funnel Chart (`cs-flow/funnel-chart.md`)
- Client Edit Pages (metrics, progress tracking)

### Shared (Both Flows)
- Header Navigation (`navigation/header-nav.md`)
- Breadcrumbs (`navigation/breadcrumbs.md`)
- Footer Nav (`navigation/footer-nav.md`)
- Snackbar (`feedback/snackbar-toast.md`)
- Badges (`feedback/badges-pills.md`)
- Progress Indicators (`feedback/progress-indicators.md`)
- Form Fields (`forms-inputs/form-fields-library.md`)
- Modal Base Pattern (`modals-drawers/modal-base.md`)

---

## By Module

### Hub Module
- Header Nav
- Hub Tabs
- Next Module Hero
- Go-Live Banner
- Module Accordion
- Product Cards (Products tab)
- Ticket List (Support tab)
- Agent Cards (CS tab)

### Definitions Module
- Header Nav
- Breadcrumbs
- Footer Nav
- Template Selector Cards
- Field Config Editor (with drag-drop)
- Preview mode (read-only fields)
- Edit mode banner

### CS Portal
- Header Nav
- Client Table
- Add Client Modal
- At-Risk Section
- Funnel Charts
- Metric Cards

### Auth Flow
- Segmented Control (tabs)
- Auth footer (demo shortcuts)
- Welcome page layout

---

## Pattern Relationships

### Composition Patterns

**Module Page** = Header Nav + Breadcrumbs + (Content) + Footer Nav

**Hub Page** = Header Nav + Tabs + (Tab Content) + No Footer

**Edit Mode** = Edit Banner + Field Editor + Settings Drawer + Footer Nav

**Modal Flow** = Modal + Form Fields + Actions + Snackbar (on success)

---

## Common Flows

### Template Selection → Preview → Edit → Continue
1. Template Selector Cards (radio selection)
2. Footer Nav: "Continue with Template" →
3. Preview Page (read-only field display)
4. "Edit Configuration" button →
5. Edit Mode (Field Config Editor)
6. Footer Nav: "Continue to Next" →

### Module Assignment Flow
1. Module card in accordion
2. Click assignee dropdown (Multiselect)
3. Select participants
4. Click "Assign" button
5. Snackbar confirmation
6. Updated display in card

### Ticket Submission Flow
1. "Submit New Ticket" button
2. Ticket Modal opens
3. Fill form fields
4. Click "Submit Ticket"
5. Modal closes
6. Snackbar success
7. New ticket in list

---

## Design System Summary

### Core Principles
- **Consistency**: Reuse patterns across similar contexts
- **Progressive Disclosure**: Show complexity only when needed
- **Clear Hierarchy**: Primary actions prominent, secondary subtle
- **Feedback**: Always confirm user actions
- **Guidance**: Breadcrumbs, labels, help text throughout

### Visual Language
- **Clean**: Ample white space, no clutter
- **Modern**: Gradients, smooth shadows, rounded corners
- **Professional**: Enterprise SaaS aesthetic
- **Accessible**: High contrast, clear labels, keyboard support

---

_Pattern Index for Quick Reference_  
_See individual pattern files for detailed specifications_

