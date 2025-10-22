# Onboarding UX + Functional Checklist

Use this checklist to validate the onboarding experience before sharing with stakeholders. Items focus on UX quality, accessibility, and functional behavior for a “confirm, not create” flow.

## Progress & Navigation
- [ ] Is there visible progress feedback (e.g., stepper/left-rail status: Not started / In progress / Done)?
- [ ] Does the stepper clearly indicate the current step and what’s next?
- [ ] Are saves/applies/uploads acknowledged with inline status or a toast?
- [ ] Are Draft vs Applied states visibly distinct and consistent across pages?
- [ ] Can users safely navigate away without losing unsaved work (autosave or confirm dialog)?

## First-Value Moment (FVM)
- [ ] Is the first value delivered under 90 seconds (e.g., sample order routed end-to-end)?
- [ ] Are defaults prefilled so minimal inputs are required to proceed?
- [ ] Is there a clear “Try a sample order” path and reset/undo option?
- [ ] Is reversibility messaged (“You can change this during testing.”)?

## CTA Hierarchy
- [ ] Is there a clear CTA hierarchy (primary vs secondary vs tertiary)?
- [ ] Are primary CTAs action-oriented (e.g., “Save & Continue”, “Preview Impact”)?
- [ ] Are destructive/irreversible actions visually de-emphasized and confirmed?
- [ ] Are primary CTAs only disabled on blocking errors (not warnings)?

## Motion & Feedback
- [ ] Are animations subtle but informative (100–250ms) and do they respect `prefers-reduced-motion`?
- [ ] Are loading states shown for operations > 300ms (skeletons for content, spinners for brief waits)?
- [ ] Do success states show confirmation (toast/checkmark) and update badges/labels?
- [ ] Are error states specific, actionable, and placed near the source with a summary link?

## Text, Scannability, and Localization
- [ ] Is text scannable (concise headings, bullets, short sentences, generous spacing)?
- [ ] Is text localized and are strings externalized (pluralization, dates, numbers, RTL where relevant)?
- [ ] Is tone friendly, confident, and low-friction (avoid jargon; explain acronyms on first use)?
- [ ] Do tooltips/helper text stay within ~120 characters and add real clarity?

## Accessibility (WCAG 2.2 AA)
- [ ] Color contrast meets 4.5:1 for body text and 3:1 for large text/UI components.
- [ ] Full keyboard support with visible focus order; no traps; `Esc` closes modals/menus.
- [ ] Proper semantics: labeled form fields, grouped inputs (`fieldset`/`legend`), meaningful landmarks.
- [ ] Live regions for async status (`role="status"`/`aria-live="polite"`) and errors (`role="alert"`).
- [ ] Touch targets ≥ 44×44px; adequate spacing to prevent accidental taps.

## Validation & Forms
- [ ] Validate on blur for hints; block on submit/advance for errors; preserve user input.
- [ ] Inline errors reference the exact field and how to fix it; link from summary to field.
- [ ] Required fields kept minimal (e.g., bank name, primary admin email, routing strategy).
- [ ] File upload constraints enforced (type, size); show row-level results for workbook validation.

## Performance & Resilience (Simulated Data)
- [ ] Data interactions are simulated (no backend logic) with deterministic mock data.
- [ ] Simulated latency (300–800ms) is accompanied by appropriate loaders and never blocks the UI thread.
- [ ] No PII in logs; feature flags/dev toggles exist to simulate success/failure paths.
- [ ] Bundle size and route-level code splitting are considered to keep Time to Interactive fast.

## State, Drafts, and Undo
- [ ] Edits save as Draft by default; “Apply” flips to Applied with timestamp and audit note.
- [ ] Undo is available for safe changes; destructive actions require explicit confirmation.
- [ ] Deep links return users to the exact group/section needing adjustment.

## Education & Support
- [ ] Contextual “Need Help?” opens a guide/video specific to the current section.
- [ ] Side-panel previews show before/after impact without full-page reload.
- [ ] Empty states provide next best actions (e.g., “No logical rules yet. Add one or rely on Request Type JM.”).

## Data & Telemetry (Product Health)
- [ ] Track time to FVM, module completion, and % defaults accepted.
- [ ] Track validation error frequency and most-edited settings for future defaults.
- [ ] Events named consistently; no sensitive data captured.

## Security & Privacy
- [ ] No real back-end calls; mock-only interaction; no persistent secrets.
- [ ] Provide links to privacy terms where user data examples are displayed.

## UAT & Go-Live Readiness
- [ ] Training scheduler path works end-to-end with confirmation state.
- [ ] Workbooks download/upload flows run with validation feedback.
- [ ] UAT readiness checklist is clear, scannable, and gated on required items.


