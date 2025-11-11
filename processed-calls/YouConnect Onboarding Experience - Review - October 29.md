# YouConnect Onboarding Experience – Review (October 29)

- **Participants**: Val Vinnakota (Brandcave), Sunda Scanlon, Missie Guillette
- **Recording**: `https://fathom.video/share/BozFuq5sCMV6GNEWWSsDTax_jPpEbDCr`
- **Duration**: 56 minutes

## Purpose
Client-facing onboarding application and CX portal walkthrough to validate flow, capture corrections, confirm scope for Phase 1 (data collection + manual config) and Phase 2 (automation), and log new asks.

## Where things stand
- **Phase 1 focus**: Replace workbook-only process with an interactive client portal to collect onboarding configs; CX config remains manual initially.
- **Phase 2 goal**: Incrementally wire modules so client inputs configure the system automatically (starting with simpler items like dropdowns/screens).
- **Readiness**: Not guaranteed for mid-December; progress is strong but content/assets (docs/videos/templates) drive pacing.

## Updates from the call
- Client portal validated as client-facing; workbook remains a source but will be enhanced/augmented by the portal.
- Educational panel and chat/ticketing approach aligned; onboarding tickets will live in-app (separate from Zendesk support tickets).
- Bid Engagement/Appraisal and Environmental panel selection to move from General Settings into Request configuration (with screenshots and customization workflow).
- Gating logic: User/Vendor templates must be bank-specific and only available after defining user types/roles and vendor types.
- Add **Projected Go-Live Date** (set on CX side, visible on both sides, updates when timelines slip).

## Corrections and clarifications
- **Request Categories**: Must be exactly three columns (Appraisals, Environmental, Miscellaneous). Client can rename labels, but cannot add new categories.
- **Onboarding Roles vs. System Roles**: Roles added in onboarding participants are for onboarding assignments only, not Uconnect system roles.
- **Vendor data changes**: CX cannot edit vendor records; changes must come from the bank via re-upload.
- **Copy/CC on routing**: Limit to a single copy/CC user.
- **Environmental**: If the client does not use environmental orders, hide Environmental panel/configuration.

## New/confirmed features (client portal)
- **Onboarding Hub**: Stepwise modules, progress tracking, partial completion indicators.
- **Organization Setup**:
  - Custom URL (prefill based on org name + availability), branding (logo upload, brand color with preview).
  - Add onboarding participants with suggested department roles and custom roles.
  - Security/IT: SSO path (download guide, upload cert) or Standard Auth (password policy, lockout, expiry), IP allowlist, session timeout & warning thresholds.
- **Definitions**:
  - Property Categories and Types: add/rename/remove, saved for CX manual config in Phase 1.
  - Property Record fields: relabel, input type (text, multiline, dropdown), option management (e.g., states list vs free text), hide/unhide.
  - Custom fields: supported. Add explicit Required/Not Required toggle; system-required fields remain locked (label-only changes allowed).
- **Request Types & Forms**:
  - Three fixed columns (Appraisals, Environmental, Miscellaneous). Add/rename request types within columns. Select 1-step/2-step workflows.
  - Configure request record fields and create custom fields.
  - Move Bid Engagement selection here; then allow panel-specific field customization.
  - Environmental: single panel; pick and customize; hide if not used.
- **Routing**:
  - Request Type Job Manager, Logical Routing (criteria: request types, loan amounts, property categories, lending groups, states/regions), Assigned Area Routing (single or multiple areas, job manager, optional escalation manager, default area).
  - Add hierarchy explainer + disclaimer that banks can use any combination; include flow/priority diagram in education panel.
  - Limit copy/CC to one user.
- **Users & Vendors Setup**:
  - Education + download bank-specific templates, schedule CX meeting if needed, upload completed templates.
  - Gate downloads until user types/roles and vendor types are defined (bank-specific).
- **General Settings**:
  - Due date basis (business vs calendar days), timer settings (escalation, vendor attestation, reminders), more to follow from workbook.
- **IT Readiness Checklist**: Domain allow list, URL verification, etc. Likely dependent on prior modules.
- **Chat/Ticketing**:
  - In-app chat with AI assist/live handoff; create onboarding tickets when needed; CX sees and resolves tickets within CX portal.

## Vendor management and grading
- Ask client if they want to use Uconnect for vendor credential management (license, E&O, etc.).
- Vendor sub-modules to design:
  - Vendor Types & Designations (bank-defined; drive template columns, monitoring requirements like E&O by type).
  - Vendor Specialties: rename current "property types" to **Vendor Specialties**.
  - Statuses: defaults cannot be changed, but bank can add statuses and mark which are monitored.
  - Region/Subregion: freeform fields for client-defined purposes (search/marking).
  - Vendor Grading: offer simple (A–E) and weighted average options; if weighted selected, show criteria, allow relabeling (e.g., Appraisal Quality), and edit weights.

## CX portal highlights
- Onboarding pipeline: All tenants (in progress/completed/on hold) with initiation date, progress, due date/priority, onboarding tickets.
- Create new tenant (bank name, primary contact, email → invite sent) and monitor their module/page progress.
- CX can admin-edit client-configured items except vendor data (must be re-uploaded by client).
- Notifications: new tickets, module completions, escalations (behind schedule).
- **Projected Go-Live Date**: settable by CX, displayed persistently on both sides, and adjustable as needed.
- Export onboarding project summary upon completion (ticket counts, duration, configuration summary) for CRM continuity.

## Dependencies and assets to provide
- Screenshots for four Appraisal Bid Engagement panels and one Environmental panel (already in shared doc).
- Educational assets: short explainer videos + documentation for each step and complex concept (routing hierarchy, vendor grading options, panel previews, etc.).
- Vendor Types/Designations and General Settings matrix (e.g., per-type monitoring like E&O requirements) to drive bank-specific template generation and gating.
- Confirmation/outline of workbook sections for user and vendor definitions (Ascend may provide generic workbook; final must be bank-specific).

## Open questions
- Exact routing priority rules (finalize visual diagram and text explainer).
- Final list of system-required fields across records (lockdown matrix for required/immutable fields).
- Complete General Settings catalog beyond timers/due-date basis.
- Scope/timing for Phase 2 automations (which modules first?).

## Decisions
- Three fixed request categories; renaming allowed; no new categories.
- Bid/Engagement panel selection lives under Request configuration.
- Environmental panel optional (hidden if not used) and single panel type.
- One copy/CC user limit on routing.
- Onboarding tickets remain in-app (separate from Zendesk).
- Bank-specific templates are gated behind definition of user/vendor types.
- CX cannot change vendor data; client re-uploads to modify.
- Projected Go-Live Date added; visible on both sides.

## Action items
- **Val/Brandcave**:
  - Move Bid Engagement and Environmental panel selection into Request configuration; enable panel customization.
  - Add required-field toggle; enforce system-required lockouts.
  - Add routing disclaimer + hierarchy explainer; limit copy/CC to one user.
  - Hide Environmental if bank indicates they won’t use it.
  - Gate user/vendor template download until types/roles are defined; add meeting-scheduling entry point.
  - Add Projected Go-Live Date (CX-set; always visible); show status heat (hot/cold) vs due date.
  - Rename "Property Types" to "Vendor Specialties" in Vendor module.
  - Provide prototype link to Sunda/Missie; keep updated as changes land.
- **Sunda + Missie**:
  - Provide screenshots for appraisal panels (4) and environmental panel (1) for UI previews.
  - Deliver vendor types/designations + monitoring requirements (e.g., E&O by type) to drive templates/gating.
  - Confirm/add workbook sections for user types/roles and vendor types; share generic workbook (Ascend) if needed.
  - Meet (tomorrow) to consolidate missing vendor/user definitions and general settings; send to Val.
  - Coordinate notifying Chelsea and sharing the prototype at next meeting.

## Risks / considerations
- Timeline depends on content readiness (videos/docs/templates) and definition matrices (user/vendor types, monitoring).
- Phase 2 automation must be staged to reduce implementation risk (start with dropdowns/screens; defer complex layout/field changes).
- Change management: keep broader team informed while avoiding premature dependency on the tool before content is ready.

## Next steps
1. Implement UI moves (Bid/Environmental to Requests), required toggles, routing limits, environmental hide, gating logic, projected go-live.
2. Receive assets/specs from Sunda/Missie; wire education content placeholders.
3. Share prototype link; schedule follow-up after asset delivery; define Phase 2 automation candidates.

---

- Recording: `https://fathom.video/share/BozFuq5sCMV6GNEWWSsDTax_jPpEbDCr`

