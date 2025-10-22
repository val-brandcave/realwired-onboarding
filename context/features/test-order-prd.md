# Test Order (Post-Completion) - PRD

## Overview
- Trigger: Hub “All Complete” state after Modules 1–6
- Entry: CTA from Hub → `/test-order`
- Purpose: Let users create a sample order to validate routing configuration end-to-end.

## Goals
- Provide a safe, simulated environment to confirm routing behavior
- Reinforce value immediately after completion

## User Stories
- As a Bank Admin, I want to create a test order to see how the system assigns it based on my routing.
- As Client Success, I want customers to validate their setup before scheduling training.

## Scope
- Form fields:
  - Request Type (from configured types)
  - Property Address, City, State, ZIP
  - Loan Officer (from users)
  - Loan Amount, Purpose
- Routing Preview Sidebar:
  - Shows which routing method will be applied
  - Shows route name (if applicable)
  - Shows assignee (resolved user name)
- Submission:
  - Simulated 1.5s delay; display success state
  - Show order ID, details, routing method, route name, assignee
  - Actions: Create Another Test Order, Return to Hub

## Routing Logic (priority)
1) Request Type Job Manager (P1)
2) Logical (P2)
3) Assigned Area (P3)
4) Default Assignment (if no rule applies)

## Non-Goals
- No actual order creation in backend
- No email notifications

## Acceptance Criteria
- Given configured routing, when I submit a test order, then I see the correct routing method and assignee.
- Given no routing, then the preview shows Default Assignment.
