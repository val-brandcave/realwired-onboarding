# IT Readiness Checklist - PRD

## Overview
- Module: 7
- Purpose: Confirm the bank's IT team has completed essential setup tasks to ensure successful access to YouConnect and email notifications.
- Entry: `/it-checklist-intro`
- Config: `/it-checklist`
- Complete: `/it-checklist/complete`

## Goals
- Reduce go-live friction due to blocked emails or network restrictions
- Provide clear guidance and a quick confirmation checklist

## User Stories
- As a Bank Admin, I want to verify IT readiness so my team can access the platform and receive emails.
- As Client Success, I want a clear confirmation that IT whitelisting and URL access are complete.

## Requirements
- Items:
  1) Email domains allowlisted:
     - `@[yourbank].realwired.com`
     - `no-reply@[yourbank].realwired.com`
  2) URL access verified:
     - `https://[yourbank].youconnect.com`
- UX:
  - Informational banner explaining why IT readiness matters
  - Two checkboxes with concise explanations and guidance
- "Complete IT Checklist" button enabled only when both are checked
- State:
  - `itChecklist.emailDomainsAllowlisted: boolean`
  - `itChecklist.urlAccessVerified: boolean`
  - `itChecklist.completed: boolean`
- Completion:
  - Confetti animation
  - CTA to return to hub

## Acceptance Criteria
- Given both boxes are checked, when I click Complete, then `itChecklist.completed = true` and I see the celebration page.
- Given either box is unchecked, then the Complete button is disabled.

## Non-Goals
- No backend integration; simulated-only environment.
