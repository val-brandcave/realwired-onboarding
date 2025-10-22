# Module 2: Definitions — PRD (Redesigned, Oct 22)

## Summary
Redesigned Module 2 to educate users on property records first, then configure request form fields. The flow now starts with Property Categories, proceeds to a two-step properties experience (configure labels with a preview checkpoint), then Request Types setup, and finally a two-step request form configuration (also with a preview checkpoint).

## Routes
- `/definitions-intro` — Entry card with CTA (card width standardized to `max-w-md`)
- `/definitions` — Redirect hub → `/definitions/property-categories`
- `/definitions/property-categories` — Create & edit property category cards (Name + Type)
- `/definitions/properties` — Step 1: Property selection with full read-only preview (Overview & Advanced)
- `/definitions/properties/configure` — Step 2: Labels-only checkboxes; editable labels; required fields locked; 2-column layout
- `/definitions/properties/preview` — Preview the configured property record (custom labels, only selected fields)
- `/definitions/request-types-setup` — Create & edit request type cards (Name + Category)
- `/definitions/request-form` — Step 1: Request selection with full read-only preview (Overview, Details, Document Types, Reject Reasons)
- `/definitions/request-form/configure` — Step 2: Labels-only checkboxes; Details 2-column; Document Types & Reject Reasons 2-column
- `/definitions/request-form/preview` — Preview the configured request form (custom labels, only selected fields)
- `/definitions/complete` — Celebration, back to hub

## Goals
- Teach how property data is structured (Overview vs Advanced)
- Provide realistic samples to make choices concrete
- Let users select which fields are in their standard property record
- Teach how request form data is structured (Overview vs Details)
- Let users select which fields are in their standard request form

## Information Architecture
- Desktop layout: 2-column grid
  - Left: Main content (lg:col-span-2)
  - Right: Educational sidebar (lg:col-span-1, sticky)
- Educational sidebar styling: blue gradient background (from-blue-50 → to-indigo-50), blue-200 border, monotone icons (`text-slate-700`), headings `text-slate-900`
- Mobile: single column, sidebar content stacks after main

## Property Categories (`/definitions/property-categories`)
### UX
- Inline editable cards: Category Name (text), Category Type (Residential, Commercial, Environmental, Agricultural, Other)
- Add, Edit, Delete per card; prefilled with a few examples
- CTA: "Continue to Properties →"

### Education (Right Rail)
- Why categories matter (organization, filtering, routing)
- Examples and tips

## Properties: Step 1 — Selection & Preview (`/definitions/properties`)
### UX
- Dropdown of sample properties (from `lib/sample-properties.ts`)
- Full, read-only preview of the property record (Overview & Advanced) with disabled inputs
- Preview badges on section headers
- CTA: "Configure Field Selection →" (disabled until selection)
- Back: "← Back to Hub"

### Education (Right Rail)
- What's happening, what you'll learn
- Field categories explanation (Overview vs Advanced)
- Next step preview

## Properties: Step 2 — Configure Labels (`/definitions/properties/configure`)
### UX
- Header shows selected property; two sections (2-column field layout):
  - Overview: Address lines, city, state, zip, county, legal description, parcel id
  - Advanced: Category, type, year built, sq ft, lot size, bedrooms, bathrooms, flood zone, zoning, occupancy status, assessed value, HOA, special assessments, environmental concerns, notes
- Labels-only checkboxes; labels are inline editable; required fields: checkbox disabled but label editable
- Selection summary: "X of 24 fields selected"
- CTA: "Preview Configured Form →"
- Back: "← Back to Selection"

## Properties: Preview Checkpoint (`/definitions/properties/preview`)
### UX
- Read-only preview of configured property record with custom labels
- Shows only selected fields; Overview & Advanced in 2-column layout
- CTA: "Continue to Request Types →"
- Back: "← Edit Configuration"

### Field Catalog (24)
- Overview (8): street-address, apt-unit, city, state, zip-code, county, legal-description, parcel-id
- Advanced (16): property-category, property-type, year-built, square-footage, lot-size, bedrooms, bathrooms, flood-zone, zoning, occupancy-status, assessed-value, hoa-applicable, special-assessments, environmental-concerns, additional-notes

### Defaults
- Enabled by default: 18
- Disabled by default: 6 (legal-description, lot-size, zoning, assessed-value, hoa-applicable, special-assessments, environmental-concerns)

### Education (Right Rail)
- How to use, instructions, why this matters, tips

## Request Types (`/definitions/request-types-setup`)
### UX
- Inline editable cards: Request Type Name (text), Category (Residential, Commercial, Environmental, Agricultural, Other)
- Add, Edit, Delete per card; prefilled with a few examples
- CTA: "Continue to Request Form →"
- Back: "← Back to Property Preview"

## Request Form (`/definitions/request-form` + `/definitions/request-form/configure`)
### Step 1: Select & Preview a Request
- Dropdown of sample requests (from `lib/sample-requests.ts`)
- Full, read-only preview (disabled inputs) with Overview, Request Details, Document Types, Reject Reasons
- Preview badges on section headers
- CTA: "Configure Field Selection →" (disabled until selection)
- Back: "← Back to Properties"

- Overview (readonly): Request Type, Property Address (white background, monotone icons)
- Details (labels-only checkboxes): Request Purpose, Loan Officer, Customer Name, Borrower Email/Phone, Co‑Borrower, Loan Amount, LTV Ratio, Loan Type, Appraisal Type, Turn Time, Ordering Party, Order/Due Dates, Rush Order, Client File Number, Loan Number, Sales/Purchase Price, Refinance Purpose, Special Instructions — displayed in 2 columns
- Document Types and Reject Reasons as selectable lists (each displayed in 2 columns)
- CTA: "Preview Configured Form →"
- Back: "← Back" → `/definitions/request-form`

### Step 3: Preview Checkpoint (`/definitions/request-form/preview`)
- Preview with only selected fields and custom labels; Details in 2 columns; Document Types & Reject Reasons shown as selected chips
- CTA: "Continue to Request Form →" (to next module step)
- Back: "← Edit Configuration"

## State Management
- File: `lib/onboarding-context.tsx`
- `definitions.selectedSamplePropertyId?: string`
- `definitions.propertyRecordFields: PropertyRecordField[]`
- `definitions.selectedSampleRequestId?: string`
- `definitions.requestFormFields: RequestFormField[]`
- `updateDefinitions()` merges updates, preserves other arrays

## Navigation
- `/definitions` → `/definitions/property-categories`
- `/definitions/property-categories` → `/definitions/properties`
- `/definitions/properties` → `/definitions/properties/configure` (requires selection)
- `/definitions/properties/configure` → `/definitions/properties/preview`
- `/definitions/properties/preview` → `/definitions/request-types-setup`
- `/definitions/request-types-setup` → `/definitions/request-form`
- `/definitions/request-form` → `/definitions/request-form/configure` (requires selection)
- `/definitions/request-form/configure` → `/definitions/request-form/preview`
- `/definitions/request-form/preview` → `/definitions/complete`
- Completion returns to `/hub`

## Non-Goals
- No property CRUD (sample data only)
- No backend persistence (simulated only)
- No custom field creation (future)

## Accessibility
- Labeled checkboxes, semantic headings
- Focus states and keyboard navigation
- Sufficient contrast and clear affordances

## Metrics (future)
- Step completion rate and time on page
- Field selection patterns (avg number of fields enabled)
- Drop-off points between steps

## Open Questions
- Should lot-size be enabled by default for commercial/land categories?
- Do we need per-category default field sets?
- Should zoning be required for certain request processes?

## Status
- Implemented October 22, 2025 — ready for testing
