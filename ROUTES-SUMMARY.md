# YouConnect Onboarding Routes

**Last Updated**: October 29, 2025  
**Implementation Status**: ✅ Prototype implemented end‑to‑end  
**Framework**: Next.js 15 (App Router) with React 19 and TypeScript

---

## Application Flow

### Entry Point: `/` (Home)
- **Purpose**: Landing page that automatically redirects to onboarding
- **Features**: Logo, loading spinner, auto-redirect to Module 1
- **Navigation**: Automatically redirects to `/organization-setup-intro`

---

## The 7-Module Onboarding Flow

### Module Entry Pattern
All modules follow the same entry page pattern:
- Centered card with icon, title, description
- Time estimate with clock icon
- Single CTA button: "Let's Get Started!"
- Navigates to actual module configuration page

---

### 1. Module 1: Organization Setup (Redesigned)

**Entry**: `/organization-setup-intro`
- **Icon**: Building/company icon
- **Title**: "Let's Set Up Your Organization"
- **Description**: Configure organization info, branding, participant roster, and baseline security defaults
- **Time**: 8 minutes
- **CTA**: → `/organization-setup/org-info`

**Flow & Routes (in order)**
- **Organization Info**: `/organization-setup/org-info`
  - Inputs: Organization name, custom URL (auto-generated from name; editable), industry focus
  - Education: video player + workbook download
  - Exit: "Next" → `/organization-setup/branding`

- **Branding**: `/organization-setup/branding`
  - Upload primary/secondary logos (optional); pick primary/secondary colors; live preview; "Skip for now" supported
  - Education: video player + workbook download
  - Exit: "Continue" → `/organization-setup/participants`

- **Participants**: `/organization-setup/participants`
  - Primary decision maker (name + email)
  - Additional participants with inline add and bulk upload (CSV-style text area)
  - Auto-generated avatars from names
  - Education: video player + workbook download
  - Exit: "Next" → `/organization-setup/it-config`

- **IT & Security Configuration**: `/organization-setup/it-config`
  - Authentication selection: Single Sign-On vs standard credentials with password policy controls
  - SSO integration (provider + certificate upload with simulated validation)
  - IP restrictions with whitelist (single IP and CIDR ranges)
  - Session timeout (custom duration, warning thresholds, optional enable)
  - Exit: "Complete Setup" → `/organization-setup/complete`

**Completion**: `/organization-setup/complete`
- Confetti animation
- Success message
- **CTA**: "See Next Steps" → `/hub` (first time user sees hub)

**Archived (no longer used in Module 1)**
- `/organization-setup/request-types`
- `/organization-setup/regions`
- `/organization-setup/locations`
> These routes and their UI are archived under `app/organization-setup/_archived/`.

---

### 2. Module 2: Definitions

**Entry**: `/definitions-intro`
- **Icon**: Document icon
- **Title**: "Let's Define Your Workflow"
- **Description**: Setup property categories, request types, and configure form fields
- **Time**: 18 minutes
- **CTA**: → `/definitions`

**Hub**: `/definitions`
- Navigation to sub-flows:
  - Property Categories → Configure labels/types
  - Request Types → Configure request form fields

**Sub-pages (current)**:
- `/definitions/property-categories` — Manage categories and types
- `/definitions/properties/configure` — Configure property record fields (labels + enable/disable)
- `/definitions/request-types-setup` — Manage request types (name + 1‑step/2‑step)
- `/definitions/request-form/configure` — Configure request form fields

**Completion**: `/definitions/complete`
- Confetti animation
- **CTA**: "See Next Steps" → `/hub`

---

### 3. Module 3: Team & Groups

**Entry**: `/users-intro`
- **Icon**: Users/team icon
- **Title**: "Let's Setup Your Team & Groups"
- **Description**: Template-driven workflow to capture team roster and roles for CX configuration
- **Time**: 5 minutes
- **CTA**: → `/users`

**Configuration**: `/users`
- Step cards guide users through Download Template → Optional CX meeting → Upload Template
- Template download generates `team-template.csv`
- Upload status panels progress through Uploading (spinner), In Review (amber pulse), Configured (green check)
- Upload is required before "Complete Module" CTA is enabled
- Contact CX Team modal lets users schedule help with templating
- **Exit**: "Complete Module →" → `/users/complete`

**Completion**: `/users/complete`
- Confetti animation
- Updates `users.completed = true`
- **CTA**: "See Next Steps" → `/hub`

**Legacy Builder (retained for future iteration)**: `/users/lending-groups`
- Multi-select lending group builder (name, type, regions, products)
- Not currently linked in primary flow; accessible for demos via direct navigation

---

### 4. Module 4: Vendors

**Entry**: `/vendors-intro`
- **Icon**: Vendor network icon
- **Title**: "Let's Setup Your Vendors"
- **Description**: Template-driven vendor roster to capture contacts, licenses, and coverage areas
- **Time**: 5 minutes
- **CTA**: → `/vendors`

**Configuration**: `/vendors`
- Step cards guide users through Download Template → Optional CX meeting → Upload Template
- Template download generates `vendor-template.csv` with sample records
- Upload status panels progress through Uploading (spinner), In Review (amber pulse), Configured (green check)
- Upload is required before "Complete Module" CTA is enabled
- Contact CX Team modal mirrors Users module for scheduling help
- Educational sidebar lists template fields (contact info, licenses, coverage, specialties)
- **Exit**: "Complete Module →" → `/vendors/complete`

**Completion**: `/vendors/complete`
- Confetti animation
- Highlights next recommended modules (Routing, General Settings, IT Checklist)
- **CTA**: "Return to Hub" → `/hub`

---

### 5. Module 5: Routing

**Entry**: `/routing-intro`
- **Icon**: Routing/map icon
- **Title**: "Let's Configure Smart Routing"
- **Description**: Set up intelligent routing rules based on request type, location, or custom logic
- **Time**: 12 minutes
- **CTA**: → `/routing-setup`

**Entry to Setup Pages**
- From `/routing-intro`, navigate directly to setup pages below.

**Route Setup Pages**:
- `/routing-setup/request-type` (Priority 1)
- `/routing-setup/logical` (Priority 2)
- `/routing-setup/assigned-area` (Priority 3)

**Route Cards**
- Show: route name, subtle priority badge (P 1/2/3 with unique colors), type icon, config summary, enable switch, edit/delete
- All multi-selects render pills; toggles and accents use burgundy (#9F2E2B)

**Completion**: `/routing-setup/complete`
- Confetti animation
- **CTA**: "See Next Steps" → `/hub`

---

### 6. Module 6: General Settings

**Entry**: `/general-settings-intro`
- **Icon**: Settings/gear icon
- **Title**: "Let's Configure General Settings"
- **Description**: Set workflow timers, notifications, and bid engagement settings
- **Time**: 8 minutes
- **CTA**: → `/general-settings`

**Configuration**: `/general-settings`
- Core settings (business/calendar days, review approval)
- Workflow timers (modern visible sliders; debounced auto-save without inline "Saved" popups)
- Notification toggles
- Bid Engagement Panel: each template item has an individual Download action
- **Exit**: "Next" → `/general-settings/complete`

**Completion**: `/general-settings/complete`
- Confetti animation
- **CTA**: "See Next Steps" → `/hub`

---

### 7. Module 7: IT Readiness Checklist

**Entry**: `/it-checklist-intro`
- **Icon**: Shield/security icon
- **Title**: "Let's Check IT Readiness"
- **Description**: Confirm IT team has completed essential setup tasks for smooth access
- **Time**: 2 minutes
- **CTA**: → `/it-checklist`

**Configuration**: `/it-checklist`
- Checklist with 2 items:
  1. **Email Domains Allowlisted**: Ensure `@[yourbank].realwired.com` and `no-reply@[yourbank].realwired.com` are allowlisted
  2. **URL Access Verified**: Confirm team can access `https://[yourbank].youconnect.com`
- Each item has checkbox, description, and action guidance
- Info banner explaining importance
- Status summary shown when all items checked
- **Exit**: "Complete IT Checklist" → `/it-checklist/complete`

**Completion**: `/it-checklist/complete`
- Confetti animation
- Success message confirming IT setup
- **CTA**: "See Next Steps" → `/hub`

---

### Hub: `/hub`

**Purpose**: Central navigation for all 7 modules

**Visibility**: Appears AFTER completing Module 1

**Features**:
- "Your Next Step" hero card (shows next incomplete module) with participant assignment dropdown
- Modules list with progress (X of 7 completed)
- Per-module participant assignment dropdowns (including locked modules); defaults to primary decision maker
- Completed modules show read-only assignee badge (Module 1 default: primary decision maker)
- Mini progress bars (200px wide); completed modules show a green bar (100%)
- Each module shows: icon, title, description, duration
- Action buttons: "Start" (not completed) or "Edit" (completed)

**All Complete State**: Shows celebration message and CTAs:
1. **Schedule Meeting with Agent** - Opens modal to book appointment
2. **Create Test Order** → `/test-order`

---

### Test Order (Post-Completion Feature): `/test-order`

**Purpose**: Create a sample order to see routing configuration in action

**Visibility**: Accessible after all 7 modules are complete (linked from Hub's all-complete state)

**Features**:
- Simple order form with:
  - Request Type (from configured types)
  - Property Address
  - City, State, ZIP
  - Loan Officer (from users)
  - Loan Amount
  - Purpose
- **Routing Preview Sidebar**: Shows which routing method will be applied and who it will be assigned to
- **Submission Flow**:
  1. User fills form
  2. Simulated submission (1.5s delay)
  3. Success screen showing:
     - Order ID
     - Request details
     - Routing method used
     - Assigned user
  4. Options to "Create Another Test Order" or "Return to Hub"
- Demonstrates routing priority: Request Type (P1) → Logical (P2) → Assigned Area (P3)
- All data is simulated (no actual backend)
- **Exit**: "Return to Hub" → `/hub`

---

## CS Agent Portal (New)

The CS Agent Portal supports RealWired agents managing multiple bank clients during onboarding.

### Entry: `/cs-portal`
- Paginated client table with status, progress, due date, tickets
- Add New Client modal (org + primary contact)
- Notifications panel with unread count and categories (ticket/progress/completion)

### Client Onboarding (agent view): `/cs-portal/client-onboarding`
- Left‑rail modules mirror the client flow (Organization Setup, Definitions, Users, Vendors, Routing, General Settings, IT Readiness)
- Empty states indicating "Waiting for Client Input"
- Actions: Send Reminder, Fill Out for Client

### Edit Client (deep configuration): `/cs-portal/edit-client?client=Union%20Bank`
- Module tabs for Organization Setup, Definitions, Users, Vendors, Routing, General Settings, IT Readiness
- Tickets view with actions (View, Mark as Resolved, Escalate)
- Notifications slide‑out with mark‑all‑read
- Accessibility: icon‑only buttons include aria‑labels; forms include labels

---

## Navigation Flow

```
Home (/) → Auto-redirect
  ↓
Module 1 Entry (/organization-setup-intro)
  ↓
Module 1 Config (/organization-setup)
  ↓
Module 1 Complete (/organization-setup/complete)
  ↓
Hub (/hub) ← FIRST TIME SEEING HUB
  ↓
┌─────────────────────────────────────────────────────┐
│ User selects modules from hub in any order          │
└─────────────────────────────────────────────────────┘
  │
  ├─> Module 2: Definitions (/definitions-intro → /definitions → /definitions/complete → /hub)
  │
  ├─> Module 3: Team & Groups (/users-intro → /users → /users/complete → /hub)
  │
  ├─> Module 4: Vendors (/vendors-intro → /vendors → /vendors/complete → /hub)
  │
  ├─> Module 5: Routing (/routing-intro → /routing-setup → /routing-setup/complete → /hub)
  │
  ├─> Module 6: General Settings (/general-settings-intro → /general-settings → /general-settings/complete → /hub)
  │
  └─> Module 7: IT Checklist (/it-checklist-intro → /it-checklist → /it-checklist/complete → /hub)
       │
       └─> All Complete → Hub shows celebration + CTAs:
            │
            ├─> Schedule Meeting (modal)
            │
            └─> Create Test Order (/test-order) → Can create multiple test orders → Return to Hub
```

---

## State Management

### Global Context: `OnboardingProvider`
Location: `/lib/onboarding-context.tsx`

**State Structure:**
```typescript
{
  currentModule: OnboardingModule
  moduleStatuses: Record<OnboardingModule, ModuleStatus>
  companySetup: CompanySetupData
  definitions: DefinitionsData
  users: UsersData
  routing: RoutingData
  generalSettings: GeneralSettingsData
  itChecklist: ITChecklistData
}
```

**Key Functions:**
- `updateCompanySetup()` - Updates company setup selections
- `updateDefinitions()` - Updates request types, properties, forms
- `updateUsers()` - Updates user list and lending groups
- `addUser()` / `updateUser()` / `deleteUser()` - User management
- `updateRouting()` - Updates routing rules
- `addRoute()` / `updateRoute()` / `deleteRoute()` - Route management
- `updateGeneralSettings()` - Updates timers and settings
- `updateITChecklist()` - Updates IT checklist progress
- `goToModule()` - Navigation with status update
- `markModuleComplete()` - Marks modules as completed
- `canProceed()` - Validates exit criteria per module
- `updateModuleAssignment()` - Manages participant assignments per module (including vendors)
- `updateModuleProgress()` / `resetModuleProgress()` - Tracks hub progress bars for each module

> Module statuses include `'vendors'`; the Vendors module itself remains template-driven and does not add a dedicated context slice in `OnboardingState`.

---

## Shared UI Components

### Layout Components
- **`MainLayout`** (`components/layout/MainLayout.tsx`):
  - Wraps all onboarding pages
  - Displays sticky header with YouConnect logo and title
  - Progress bar showing step completion
  - "Watch Walkthrough" and "Need Help?" buttons in header
  - Footer with copyright

### Modal Components
- **`VideoModal`** (`components/ui/VideoModal.tsx`):
  - Triggered from "Watch Walkthrough" button in header
  - Full-screen overlay with video player placeholder
  - Close button (X) to dismiss
  
- **`HelpModal`** (`components/ui/HelpModal.tsx`):
  - Triggered from "Need Help?" button in header
  - Support request form with email/phone contact options
  - Urgency selector and notes field
  - Simulated submission (600ms delay) with success state
  
- **`RoutingVisualizerModal`** (`components/ui/RoutingVisualizerModal.tsx`):
  - Triggered from routing setup pages
  - Shows routing precedence diagram with active strategy highlighted
  - Example scenarios and fallthrough explanation
  - Close button returns to routing setup
  
- **`WorkbookUploadModal`** (`components/ui/WorkbookUploadModal.tsx`):
  - Triggered from "Upload" button in users page
  - Drag-and-drop or file browse for Excel files (.xlsx, .xls)
  - File validation (type and size < 10MB)
  - Simulated upload (2s delay) with success state

---

## Key Design Patterns

1. **"Confirm, not create"**: All forms are prefilled with smart defaults
2. **Progressive disclosure**: Complex options hidden until user explores
3. **Inline education**: Tooltips and expandable sections within flow
4. **Reversibility messaging**: "Everything is reversible during testing"
5. **State persistence**: Full React Context tracks all user choices
6. **Accessible by default**: WCAG AA compliant with proper labels and ARIA
7. **Educational sidebar**: 2-column layout (desktop) with contextual tips (blue background, monotone icons)
8. **Simulated backend**: All async operations use setTimeout to simulate network calls
9. **Visual consistency**: Educational panels use blue gradient, monotone icons, and consistent spacing
10. **Modular structure**: Each module is independent and can be completed in any order after Module 1

---

## Testing the Flow

With the dev server running (`npm run dev`), visit:
- http://localhost:3000 - Auto-redirects to Module 1

All pages use simulated data (no backend required) and demonstrate:
- ✅ Real-time state management
- ✅ Navigation between modules
- ✅ Progress tracking
- ✅ Validation and completion logic
- ✅ Responsive design
- ✅ Accessibility features
- ✅ Confetti celebrations after each module
- ✅ Hub-based flexible navigation
