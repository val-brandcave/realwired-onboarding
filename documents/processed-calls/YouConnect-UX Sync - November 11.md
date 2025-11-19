# Realwired–YouConnect UX Sync (November 11)

- **Date**: November 11, 2025
- **Duration**: 30 minutes
- **Participants**: Edward Kruger (Realwired), Cody Miles, Val Vinnakota (brandcave.co)
- **Recording**: [View Recording](https://fathom.video/share/cr1jz865gLC8mvz9zqTTg_r7G97R4JaL)

## Key Topics
- **Client onboarding hub**: Walkthrough of the latest sandbox showing gated modules, primary manager assignment, progress indicators, and educational overlays for each step.
- **Branding & participants setup**: Custom URL creation, logo/brand color upload, and bulk participant invitations with role tagging and SSO vs password-based authentication choices.
- **Visibility philosophy**: Desire for every participant to see all modules (grayed out if unassigned) to promote shared ownership and faster progress.
- **Definitions workflow**: Property/request form configuration flow raised “information anxiety”; need for richer previews, inline education, and potentially a WYSIWYG-style form builder.
- **Review and approval**: Discussion on per-module review summaries, edit-back paths, and optional reviewer handoffs without enforcing rigid approval cycles.
- **CS portal separation**: Keep CS portal tiles hidden from client-facing experiences and instead surface CS contact details within the onboarding hub.

## Decisions
- **Expose all modules** in the client hub (with disabled state when unassigned) so participants can discover work and self-assign.
- **Introduce per-module review pages** before marking a module complete, allowing edits prior to finalizing.
- **Hide the CS portal** from the client-facing landing page and replace it with visible CS team contact information.
- **Explore live form previews** (form-builder pattern) to reduce confusion when configuring property and request forms.
- **Prioritize sandbox sharing** so Realwired stakeholders can independently review the prototype flow.

## Action Items
- **Cody**: Share the sandbox URL with Ed; Ed to review asynchronously.  
- **Val**: Implement invite links for additional participants instead of forcing manual email entry.  
- **Val**: Ensure all modules display in the hub with grayed-out states when locked or unassigned.  
- **Val**: Prototype a live-preview form builder / WYSIWYG configuration experience and review feasibility with Sundar.  
- **Val + Cody**: Add module-level review/summary screens with edit-back options before completion.  
- **Cody**: Consult Sundar on whether formal review/approval cycles are needed before implementing.  
- **Val**: Remove CS portal entry points from the client onboarding surface and add the CS team contact block.  
- **Val**: Add CS contact details to the client onboarding hub hero section.  

## Risks/Concerns
- **Information overload**: The definitions module currently overwhelms users; without live previews or clearer guidance, adoption could stall.
- **Workflow friction**: Introducing reviewer cycles may slow progress if not carefully scoped; needs CS leadership validation.
- **Client perception**: Showing CS-only tools to customers risks confusion; urgent to tighten role-based views.
- **Dependence on education**: Heavy reliance on sidebar videos/tooltips may not suffice; interactive guidance is needed.

## Notable Quotes
- “Maybe I can phone up John and say, hey, you know, I can do this. Just assign me to it.” — Edward Kruger  
- “I actually have no idea what I'm supposed to do… I'm experiencing a little bit of information anxiety.” — Edward Kruger  
- “We should probably just very quickly vibe code it out and present that to Sundar.” — Cody Miles  
- “I want people to feel this is easy and so convenient and not like, oh my gosh, this was such a hassle.” — Edward Kruger  

## Summary
The team reviewed the updated onboarding sandbox, focusing on how clients experience module gating, branding setup, participant management, and authentication configuration. Edward emphasized transparency—every participant should see all modules, even if they cannot act on them yet—to encourage collaboration. The definitions module sparked a broader UX critique: the current table-driven configuration induces “information anxiety,” prompting agreement to prototype a live form preview/builder pattern and richer inline education. Before marking modules complete, Realwired wants review checkpoints so stakeholders can double-check configurations without feeling locked in; Cody will validate whether formal approval chains are necessary. Finally, they reaffirmed strict separation between client- and CS-facing surfaces, requesting CS contact info within the client hub and removal of CS portal links from the client experience. Overall sentiment was highly positive, with leadership pushing to elevate the project priority based on internal excitement.  

