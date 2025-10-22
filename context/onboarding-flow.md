# Onboarding Flow

This flow follows a “confirm, not create” principle: we prefill best‑practice defaults and ask users to confirm or adjust. Each step uses short, contextual help and clear transitions.

## 1) Entry Point (Signup or SSO)
- Page name: "Welcome to YouConnect"
- Goal: Verify identity, set expectations, and capture bank profile signals to personalize defaults.
- Key UI:
  - SSO/Invite acceptance
  - Bank profile quick picker (Environmental? Appraisal? External reviews?)
  - IT readiness checklist (URL allowlist, email domains)
- Microcopy ideas:
  - "We’ve set up smart defaults. You’ll just confirm what matches your bank."
  - "Takes ~5–10 minutes to reach your first working configuration."
- Transition:
  - Primary CTA: "Begin Guided Setup" → Guided Setup
  - If IT blockers detected: "Share IT checklist" (email template) → stays on page with status indicator

## 2) Guided Setup (Basic Info & Preferences)
- Page name: "Confirm Your Defaults"
- Goal: Confirm high‑impact defaults with minimal choices, grouped by job‑to‑be‑done.
- Groups (cards):
  - Request Types (1‑Step vs 2‑Step) – seeded list based on bank profile
  - Routing Strategy – Request Type JM vs Assigned Area vs Logical Routing (with precedence diagram)
  - General Settings (Essentials) – filters, business vs calendar days, login‑as, review approval, review due date
- Microcopy ideas:
  - "We’ve prefixed choices from banks like yours. Tap to confirm or tweak."
  - "Everything here is reversible during testing."
- Transition:
  - Primary CTA: "Save & Continue" → Feature Education
  - Secondary: "Preview Impact" (opens side panel preview examples)

## 3) Feature Education (Tooltips, Modals, Checklist)
- Page name: "What Changes Where"
- Goal: Educate via concise, embedded explanations and 30–60s clips.
- Modules (checklist):
  - Property/Request/Review forms – field templates, required flags, dropdown seeds
  - Bid/Engagement panels – side‑by‑side Option 1–4 previews
  - Workflow timers – recommended values and behavior
- Microcopy ideas:
  - "See how your settings change the UI — no guesswork."
  - Tooltip on routing: "Request Type JM overrides Logical, which overrides Assigned Area."
- Transition:
  - Primary CTA: "I Understand, Continue" → First‑Value Action
  - Persisting: mini checklist showing what’s learned

## 4) First‑Value Action (The ‘Aha’ Moment)
- Page name: "Try a Sample Order"
- Goal: Create and route a sample order end‑to‑end using confirmed defaults.
- Steps (inline stepper):
  - Submit sample request (prefilled demo data)
  - Auto‑assign via chosen routing
  - See Bid/Engagement panel selection reflected
  - Reach visible status change (e.g., Submitted → In Progress)
- Microcopy ideas:
  - "That’s it — your site routes requests with your chosen defaults."
  - "You can change details during testing without starting over."
- Transition:
  - Primary CTA: "Proceed to Next Steps" → Retention Hook
  - Secondary: "Adjust a Setting" (deep link back to specific group)

## 5) Retention Hook (Reminder, Celebration, Next)
- Page name: "You’re Live in Test"
- Goal: Reinforce progress, schedule trainings, and collect workbooks.
- Content blocks:
  - Celebration + summary of confirmed settings
  - Links to download User/Vendor/Property Cat–Type workbooks
  - Training scheduler (Job Manager / LO sessions)
  - UAT readiness checklist
- Microcopy ideas:
  - "Great momentum — next up: users, vendors, and a quick training."
  - "Workbooks import is handled by us. You just complete and upload."
- Transition:
  - Primary CTA: "Schedule Training" (date picker) → Confirmation screen
  - Secondary: "Upload Workbook" → Upload page (validates format)

---

## Supplemental Pages
- Page: "Routing Visualizer"
  - Purpose: Interactive diagram showing precedence: Request Type JM → Logical → Assigned Area.
  - Microcopy: "Drag a condition to see who gets assigned."
  - Transition: "Apply as Draft" → returns to Guided Setup with staged changes.

- Page: "Dropdown Seeds & Templates"
  - Purpose: Confirm values for Document Types, Reject Reasons, Review Type/Action, Property Cat/Type.
  - Microcopy: "Use defaults or paste from your policy; you can update anytime."
  - Transition: "Confirm & Continue" → Feature Education checklist updated.

- Page: "Timers & Notifications"
  - Purpose: Set workflow timers (with recommended defaults and notes like Vendor Late behavior).
  - Microcopy: "Notifications repeat daily until resolved; we suggest starting with these values."
  - Transition: "Save & Preview Emails" → preview templates; then back.

## Navigation & State
- Left rail: Module checklist with status (Not started / In progress / Done).
- Top bar: "Need Help?" opens contextual guide/video for the current section.
- Autosave drafts; show "Applied" vs "Draft" badges per group.

## Micro‑Interactions
- Inline confirmations: "Saved — effective immediately in test."
- Empty states: "No Logical rules yet. Add one or rely on Request Type JM."
- Undo toast: "Change applied. Undo?"

## Exit Criteria per Stage
- Entry Point: Identity verified, IT checklist acknowledged.
- Guided Setup: Request Types, Routing, Core General Settings confirmed.
- Feature Education: All modules viewed or skipped with acknowledgment.
- FVA: Sample order successfully routed; user sees resulting status.
- Retention Hook: Training scheduled OR workbooks queued for upload.
