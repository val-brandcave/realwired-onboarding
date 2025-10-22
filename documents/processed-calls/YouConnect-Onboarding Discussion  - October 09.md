# Realwired–YouConnect Onboarding Discussion (October 09)

- **Date**: October 09 (year not specified)
- **Duration**: 61 minutes
- **Participants**: Sunda Scanlon, Cody Miles, Val Vinnakota (brandcave.co)
- **Recording**: [View Recording](https://fathom.video/share/ydVjDAqtbPvBS9hyzu3JBffd6SkBzbJi)

## Key Topics
- **Onboarding goals and phases**: Reduce CS time on calls by collecting initial configurations via a guided flow; eventually enable client self-service with automated configuration.
- **Order types**: One-step vs two-step processes; educating clients on differences and implications.
- **Forms configuration**: Property form and default order form set up; labels, required/hidden fields, new fields; later create lender-redacted layouts and specialty layouts.
- **Routing strategies**: Priority order and behavior of (1) Request Type Job Manager, (2) Logical Routing (multi-criteria rules), (3) Assigned Area routing (fallback by area/default).
- **General settings (bank-level, system-wide)**: Numerous toggles impacting UX/behavior (e.g., report format requirement, My Items default, department filters, business vs calendar days, preliminary drafts, login-as disable, review approval/due-date requirements, estimated completion notifications, edit-on-hold permissions, post-completion editable fields, request status defaults, dropdown ordering, parcel number format, bid engagement panel selection, accounting/billing settings, batch processing notifications, etc.).
- **Roles and permissions**: Distinction between bank admin vs regular users; some admin-only capabilities; no per-user settings for many defaults.
- **Onboarding UX concept**: Stepper-based, heuristically grouped questions; gated modules; embedded education/videos; pre-fill defaults from a few high-level answers (e.g., whether bank handles environmental and/or commercial orders); show progress and time expectations.
- **Data import and training**: Workbook-driven user import handled by RealWired; training/strategy call scheduled after initial module completion; getting-started screen to drive subsequent modules.
- **Documentation**: 40-page General Settings doc (KB) to be shared; additional onboarding process docs to follow (Missy).

## Decisions
- **Adopt stepper-based, gated onboarding** that groups settings heuristically and blocks general use until required modules are completed.
- **Pre-fill defaults from high-level inputs**, then allow confirmation/edits; include embedded education (videos/tooltips) explaining impacts.
- **Module sequencing**: Initial module focuses on core general settings and users; subsequent modules cover request types and routing.
- **Client-facing questionnaire first, back-end configuration initially**; automation to set system values can be phased in later.

## Action Items
- **Sunda**: Send General Settings KB document to Cody and Val.
- **Sunda**: Ask Missy to send current/refined onboarding process documents to Cody and Val.
- **Cody + Val**: Vibe-code a proof of concept for the RealWired onboarding flow (based on shown example/pattern).
- **Cody ↔ Val**: Connect/sync on approach for the onboarding flow proof of concept before implementation.

## Risks/Concerns
- **Complexity and variability**: Many bank-specific rules; large settings surface can overwhelm users and CS without strong guidance.
- **Education dependency**: Misconfiguration risk if educational context is insufficient; need examples/videos and clear defaults.
- **Change timing**: Some settings are best decided after hands-on testing; the flow must support iteration and safe changes.
- **Access and security**: Prior decisions around disabling login-as and editing on-hold require careful permission handling.
- **Concurrency**: Multiple collaborators may contribute during onboarding—avoid race conflicts and preserve auditability.

## Notable Quotes
- "Our top priority is not to have CS members understand so much... The end goal is client answers configure it for us."
- "Request type setup trumps everything... If not, go to logical routing; if not, fall back to assigned area."
- "They can't use any parts of it until they finish the whole setup part."

## Summary
The call aligned on transforming RealWired’s bank onboarding from CS-led calls into a guided, stepper-based experience that educates users, gathers decisions, and (initially) feeds CS/back-end configuration, with later automation to apply settings directly. Core topics included order types, property/order form setup, detailed bank-level general settings, and routing strategies with a clear precedence model. The team agreed to pre-fill sensible defaults from a few high-level questions (e.g., environmental/commercial scope), embed explanatory content, and gate access until required modules are completed. Immediate next steps are to share the General Settings documentation and onboarding process materials, and for Cody and Val to vibe-code a proof-of-concept onboarding flow to nail functional requirements before full design and development.
