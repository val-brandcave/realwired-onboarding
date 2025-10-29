# Module 4: Vendors - PRD (October 29, 2025)

## Summary
Template-driven workflow that captures a bank's vendor roster (contacts, licenses, coverage areas) so the RealWired CX team can configure the account. The module lives between Team & Groups and Routing, bringing the onboarding sequence to seven modules total.

## Routes
- `/vendors-intro` - Entry card describing the template workflow and time estimate.
- `/vendors` - Single-step configuration page with download, optional CX meeting, and upload actions.
- `/vendors/complete` - Celebration screen with guidance for next modules.

## Goals
- Collect vendor details in a structured workbook without requiring inline editing.
- Provide clear hand-off expectations to the CX team (statuses, optional meeting).
- Keep momentum by mirroring the Users module pattern for familiarity.

## User Stories
- As a Bank Admin, I want to upload our approved vendor list so RealWired can configure assignments for us.
- As Client Success, I want a consistent template format with status indicators so I know when to start configuration.

## Experience Overview

### `/vendors-intro`
- Card layout with brand gradient icon and 5-minute estimate.
- Bullet list steps: download template, complete workbook, optional CX meeting, upload.
- CTA: `Let's Get Started!` -> `/vendors`.

### `/vendors`
- Wrapped in `MainLayout` with one-step progress indicator (`updateModuleProgress('vendors', 1, 1)`).
- Three numbered sections:
  1. **Download Vendor Template** - Button generates `vendor-template.csv` with sample data (contact, license, coverage states).
  2. **Need Help? Contact CX Team (Optional)** - Opens modal to request a meeting (mirrors Users module copy and interactions).
  3. **Upload Completed Template** - Hidden file input accepts `.csv/.xlsx/.xls`. Upload required before the continue CTA unlocks.
- Upload status panels:
- **Uploading** - Spinner + filename.
- **In Review** - Amber pulse indicator explaining CX review.
- **Configured** - Green check that signals the team has completed configuration.
- Continue button: disabled until status !== `none`; label `Complete Module ->`; navigates to `/vendors/complete`.
- Back button returns to `/vendors-intro`.
- Educational sidebar outlines five-step process plus template contents (contact info, license numbers, coverage areas, specialties).

### Contact CX Team Modal
- Triggered from Section 2.
- Explains call expectations (review requirements, coverage, template help).
- Primary action `Request Meeting` uses `alert()` to simulate submission and closes modal.

## Completion (`/vendors/complete`)
- Confetti animation, success copy, and list of next recommended modules (Routing, General Settings, IT Checklist).
- CTA: `Return to Hub` -> `/hub`.
- Marks module complete via `markModuleComplete('vendors')` through shared completion logic (handled in component effect).

## State & Implementation Notes
- No dedicated `vendors` slice in `OnboardingState`; workflow relies on local component state plus `moduleProgress` / `moduleStatuses` updates.
- Upload does not persist files; statuses are simulated with `setTimeout` (800 ms to In Review, additional 3 s to Configured).
- Shared patterns reused from Users module: layout, modal styling, button gradients, educational sidebar structure.

## Metrics & Future Enhancements
- Potential metrics: template download rate, upload completion rate, time between upload and hub revisit.
- Future enhancements: validation of workbook schema, inline preview of parsed vendors, pairing with routing auto-suggestions.

