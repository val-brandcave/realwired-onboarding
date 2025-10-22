# Onboarding Overview

## Onboarding Goals
- Reduce CS time on synchronous calls by collecting decisions asynchronously with guided context.
- Help banks reach a usable initial configuration quickly; allow iteration during testing.
- Shift from “set everything manually” to “confirm smart defaults” (confirm, not create).
- Standardize outcomes while respecting each bank’s unique needs.
- Enable future client self‑service for safe settings; keep advanced settings with CS initially.

## Target User Segments
- **Bank Admins / Appraisal Dept (Job Managers)**: primary configurers, reviewers, and owners of routing, forms, and workflow decisions.
- **Loan Officers (LOs)**: request creators; see simplified/order‑focused views; may be Glances‑only.
- **External Vendors / Reviewers**: recipients of solicitations, report submitters, reviewers.
- **RealWired CS/Advanced Configurers**: facilitators, implement client choices, validate safety.

## First‑Value Moment (FVM)
- Client completes Module 1 and sees a working site with:
  - Core general settings applied
  - Initial request types (1‑step/2‑step) confirmed
  - Basic routing functioning
  - A sample order successfully submitted and visible to stakeholders

## Key Success Metrics
- Time from contract to FVM (days)
- Number of CS‑led calls required (target: ≤1 for Module 1)
- % of settings accepted as recommended defaults
- Module completion rate and average time per module
- Reduction in rework during UAT (change requests after first pass)
- Training attendance and post‑training task success rate

## Emotional Drivers
- Confidence: “We’re configuring correctly” (examples, demos, previews).
- Control: granular options with safe defaults; ability to change later.
- Clarity: plain‑language choices, visuals, and short videos showing impact.
- Momentum: visible progress, checklists, confetti/celebrations at milestones.

## Drop‑off Risks
- Overwhelm from long, technical settings lists (mitigate via grouping and defaults).
- Decision fatigue without concrete examples.
- IT blockers (whitelisting, URL access) delaying kickoff.
- Ambiguity around roles (bank admin vs LO vs JM) and access.
- Complex routing/fees/regulatory edge cases not covered by defaults.

## UX Principles to Follow
- **Confirm, not create**: pre‑fill based on bank profile; users confirm or tweak.
- **Chunking by jobs‑to‑be‑done**: modules for General Settings, Request Types, Routing, Users, Vendors.
- **Progressive disclosure**: start with essentials; advanced toggles expand on demand.
- **Education in context**: inline tips, 30–60s clips, before/after previews.
- **Safe edits**: call out what can be changed later; stage risky options for CS review.
- **Gated progress**: must complete required modules to proceed; clear time expectations.
- **Accessible language**: avoid jargon; map fields to bank terminology.
- **Auditability & collaboration**: track who changed what; avoid race conflicts.

## Personalization Opportunities
- Bank profile intake (does bank do Environmental? External reviews? Typical request types?).
- Pre‑selected Request Types with 1‑step/2‑step defaults based on segment.
- Default routing template (Request Type JM vs Assigned Area vs Logical Routing) suggested by bank size/structure.
- Tailored dropdown seeds (Property Category/Type, Review Type/Action, Forms, Report Formats) from industry presets.
- Training paths: Glances‑only LOs vs YC LOs; separate content for Bank Admins/JMs.

## Friction Points to Address (from call + docs)
- Large, flat General Settings list with unclear order—group heuristically (visibility, workflow, notifications, accounting).
- Understanding routing precedence (Request Type JM > Logical > Assigned Area)—visualize decision tree.
- Bid/Engagement panels (Appraisal) selection—show side‑by‑side preview of Options 1–4.
- Reg B notifications—plain decision helper with examples and triggers.
- Document Types, Reject Reasons—provide defaults; quick edit/confirm flow.
- Workbooks (Users/Vendors/Prop Cat–Type)—download, validate, and re‑upload with in‑app checks.

## Module Outline (proposed)
1. **Account & Access Readiness**
   - IT checklist (URL allowlist, email domains) – status tracker.
   - Roles overview; invite initial Admins.
2. **General Settings (Core)**
   - Pre‑filled recommendations; confirm/tweak essentials (filters, days, login‑as, review approval, due dates).
3. **Request Types**
   - Recommend catalog; bank confirms 1‑step vs 2‑step; optional “No Review Needed”.
4. **Routing**
   - Choose baseline strategy; configure minimal viable rules; visualize precedence.
5. **Records & Forms**
   - Property/Request/Review: confirm dropdown seeds, field templates, required flags.
6. **Timing & Notifications**
   - Workflow timers with recommended values; highlight effects and late rules.
7. **Users & Vendors**
   - Download/import workbooks; map roles/permissions; credential monitoring decision.
8. **Training & Go‑Live Readiness**
   - Schedule Job Manager and LO sessions; checklist for UAT entry criteria.

## Guardrails & Safety
- Sandbox preview of changes; compare vs current.
- Reversible changes with clear “effective from” timestamps.
- CS approval gates for high‑risk settings (billing, permissions, data retention).

## Data Collection Artifacts (where used)
- Request Type selection (1‑step/2‑step, examples)
- Property Cat/Type workbook (editable with instructions)
- Document Type Names, Reject Reasons (confirm defaults)
- Workflow Timers (recommended defaults)

## Future Automation
- Auto‑apply confirmed settings to YC; record a machine‑readable config profile.
- Suggest logical routing rules from historical patterns (phase 2+).

## Glossary (selected)
- **1‑Step**: Review‑only workflow; no vendor solicitation.
- **2‑Step**: Vendor report → internal/external review.
- **JM**: Job Manager; primary order owner.
- **Glances**: External LO portal; may replace direct YC login for LOs.
