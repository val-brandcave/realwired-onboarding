# Onboarding Flow Rules

## Accessibility (WCAG 2.2 AA minimum)
- Color and contrast: text ≥ 4.5:1, large text ≥ 3:1; non‑text UI components/graphics ≥ 3:1.
- Keyboard: all interactive elements reachable in logical tab order; visible focus ring; no keyboard traps; `Esc` closes modals and menus.
- Semantics: use native HTML controls first; associate every `label` with `input`; group related inputs with `fieldset`/`legend`.
- Screen readers: meaningful `aria-label`/`aria-labelledby` for icons and unlabeled controls; associate errors with inputs via `aria-describedby`.
- Live regions: non‑blocking status uses `role="status"`/`aria-live="polite"`; errors/validation use `role="alert"`/`aria-live="assertive"`.
- Motion: respect `prefers-reduced-motion`; avoid parallax/auto‑playing animations; keep nonessential transitions subtle (100–200ms) and cancellable.
- Targets & spacing: minimum 44×44px hit area on touch; sufficient spacing to avoid accidental taps.
- Timing: no unexpected timeouts; give warnings and a way to extend if time limits exist.
- Copy: plain language, grade‑8 reading level; avoid jargon; expand acronyms on first use.

## Tone of voice (friendly, confident, minimal friction)
- Friendly and direct: “Confirm your defaults” vs. “Configure settings.”
- Confident and reassuring: emphasize reversibility and safety (e.g., “You can change this during testing.”).
- Concise microcopy: headlines 3–6 words; helper text ≤ 1 sentence; tooltips ≤ 120 chars.
- Action‑oriented CTAs: “Save and continue”, “Preview impact”, “Schedule training”.
- Blame‑free errors: state the issue, how to fix, and preserve user input. Example: “This email looks off. Enter a valid address like name@bank.com.”

## Data interactions are simulated (no backend logic)
- All reads/writes use in‑memory mocks or `localStorage` only; no network or server state required.
- Simulated latency: add 300–800ms delays to mimic real requests; show loading indicators during waits.
- Deterministic demo: seed mock data so reloading yields predictable results; no PII in samples.
- Staging model: writes land as Draft by default; “Apply” simply flips a mock status to Applied.
- Failure modes: provide dev toggles (or query params) to simulate success, validation errors, and network errors.

## Input validation rules
- When to validate: on blur for field‑level hints; on submit/step‑advance for blocking errors.
- How to present: inline error beneath the field; concise message plus example when helpful; link from a step‑level summary to each invalid field.
- Accessibility: tie messages with `aria-describedby`; use `role="alert"` for blocking validation; do not rely on color alone.
- Blocking vs non‑blocking: disable primary CTA only when there are blocking errors; non‑blocking warnings appear as toasts or inline notes.
- Common constraints:
  - Required fields: bank name, primary admin email, routing strategy choice.
  - Formats: email must match simple RFC‑5322‑like regex; phone digits plus optional `+`, `(`, `)`, `-`, spaces; URLs must be https.
  - Ranges: timers use positive integers within sensible bounds (e.g., 1–365 days).
  - Lengths: names 2–100 chars; free‑text notes ≤ 1000 chars.
  - Uniqueness: request type names and routing rule names must be unique within their scope.
  - File uploads (workbooks): `.xlsx` only; max 10 MB; show row‑level validation results in a table.
- Sanitization: trim whitespace; collapse repeated spaces; normalize phone numbers; strip control characters.

## Motion & feedback principles (progress, confirmation)
- Progress indicators: left‑rail module checklist (Not started / In progress / Done) and per‑page stepper with current step.
- Loading: prefer skeletons for content areas; spinners only for short waits. Show optimistic "Saving…" with a subtle progress bar when appropriate.
- State changes: after save/apply, show a brief success toast and set badges to Draft/Applied accordingly; provide "Undo" where safe.
- Button lifecycle: Idle → Loading (spinner + disabled) → Success (checkmark, 800–1200ms) or Error (shake/subtle highlight + inline message). Keep button width stable to avoid layout shift.
- Timing guidelines: micro‑interactions 50–150ms; standard transitions 150–250ms; show a loading affordance if > 300ms; provide cancel/close for waits > 2s.
- Errors: non‑blocking issues appear as toasts (polite live region); blocking validation uses inline messages and may focus the first invalid field; use confirm dialogs for destructive actions.
- Previews: side‑panel preview updates without full page reload; highlight changed elements briefly (auto‑fade) to draw attention without distraction.


