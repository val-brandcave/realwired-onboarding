# Next Module Hero Card

**Type**: Customer Flow Component  
**Used In**: Hub Onboarding Tab (`app/hub/page.tsx`)  
**Pattern**: Call-to-action card highlighting next onboarding step

---

## Visual Structure

```
╔═══════════════════════════════════════════════════════════════╗
║  YOUR NEXT STEP                                               ║
║                                                                ║
║  Organization Setup  [Module 1]                               ║
║  ─────────────────────────────────────────                    ║
║  Set up organization info, branding, onboarding participants, ║
║  and IT configuration                                         ║
║                                                                ║
║  ⏱ Estimated time: 8 min    📅 Target: Dec 1, 2025          ║
║                                                                ║
║  Assigned to: [👤 JS John Smith]                             ║
║                                                                ║
║  ┌──────────────────────┐        ┌────────────┐              ║
║  │ I'm Ready, Let's Go! │        │   [▶ Play] │              ║
║  └──────────────────────┘        │   Video    │              ║
║  (primary CTA button)            └────────────┘              ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Anatomy

```
╔════════════════════════════════════════════════════════════╗
║  Label: "YOUR NEXT STEP" (small, primary color)           ║
║  ────────────────────────────────────────────────────────  ║
║  Title + Badge                                             ║
║  Description Text                                          ║
║  ────────────────────────────────────────────────────────  ║
║  Meta Info Row (time estimate, target date)               ║
║  Assigned Participants                                     ║
║  ────────────────────────────────────────────────────────  ║
║  Left: CTA Button          Right: Video Placeholder        ║
╚════════════════════════════════════════════════════════════╝
```

---

## Content Elements

### Header Label
- Text: "YOUR NEXT STEP"
- Style: text-xs, font-medium, primary color
- Transform: Uppercase
- Margin: Bottom 8px

### Title Row
```
Organization Setup  [Module 1]
──────────────────  ─────────
   (h1, bold)        (badge)
```
- **Module Title**: text-2xl, font-bold, foreground color
- **Module Badge**: Small pill (px-2 py-0.5, bg-slate-100, text-xs)

### Description
- Text: Module description (1-2 sentences)
- Style: text-sm, muted-foreground
- Max-width: Readable line length

### Meta Info Row
```
⏱ Estimated time: 8 min    📅 Target: Dec 1, 2025
```
- **Icons**: Clock and calendar (16px)
- **Text**: text-xs, muted-foreground
- **Layout**: Inline-flex with gap
- **Emphasis**: Time in `<strong>` tag

### Participant Assignment
```
Assigned to: [👤 JS John Smith]
```
- Uses `ParticipantSelector` component
- Shows avatar + name
- Clickable to change assignment

### CTA Button
```
┌─────────────────────────┐
│ I'm Ready, Let's Go! → │
└─────────────────────────┘
```
- **Style**: Primary gradient button
- **Text**: Encouraging, action-oriented
- **Icon**: Right arrow (auto-added)
- **Size**: Large (px-6 py-2.5)

### Video Placeholder
```
┌──────────────┐
│    [▶]       │
│  Learn About │
│  This Module │
└──────────────┘
```
- **Background**: Light gray (bg-slate-100)
- **Icon**: Play button (centered)
- **Text**: "Learn About This Module"
- **Size**: Min-height 220px

---

## Styling Specifications

### Container
- Background: `from-primary/5 to-primary/10` gradient
- Border: 2px solid primary color
- Border-radius: 12px (rounded-xl)
- Padding: 24px (p-6)
- Margin-bottom: 24px (mb-6)

### Layout Grid
- **Desktop**: 2 columns (lg:grid-cols-2)
  - Left: Content (title, description, CTA)
  - Right: Video area
- **Mobile**: Stacks vertically
- **Gap**: 24px (gap-6)

### Colors
- **Background tint**: Primary color at 5-10% opacity
- **Border**: Primary color at full opacity
- **Text**: Foreground (slate-900) and muted (slate-600)

---

## States

### Has Next Module
- Card visible
- Shows next incomplete module
- CTA active

### All Modules Complete
Different card shown instead:
```
╔═══════════════════════════════════════════════╗
║         ✓ All Modules Complete!               ║
║  Excellent work! Your YouConnect instance is  ║
║  fully configured.                            ║
║                                                ║
║  [Schedule Meeting with CS →]                 ║
╚═══════════════════════════════════════════════╝
```

---

## Behavior

### On CTA Click
- Navigates to module intro page
- Resets module progress (fresh start)
- Updates onboarding state

### Target Date Display
- Shows if CS team set target date
- Color-coded badge (blue)
- Format: "Target: Dec 1, 2025"

### Assignment Display
- Shows assigned participants
- Primary decision maker shown
- Can reassign (if not Module 1)

---

## Usage Examples

### Module 1 (First Module)
```
YOUR NEXT STEP

Organization Setup [Module 1]
Set up organization info, branding, onboarding participants, and IT configuration

⏱ Estimated time: 8 min    📅 Target: Dec 1, 2025

Assigned to: [JS] John Smith (read-only, primary)

[I'm Ready, Let's Go! →]    [Video Preview]
```

### Module 3 (Mid-flow)
```
YOUR NEXT STEP

Users Setup [Module 3]
Download template, fill in team details, and upload for CS team configuration

⏱ Estimated time: 5 min    📅 Target: Dec 15, 2025

Assigned to: [JS] John Smith, [SJ] Sarah Johnson (editable)

[I'm Ready, Let's Go! →]    [Video Preview]
```

---

## Accessibility

- **Landmark**: Contained in main content
- **Heading**: Proper heading hierarchy (h1 for title)
- **Button**: Clear action button with focus state
- **Video**: Accessible button with aria-label

---

## Related Components
- `ParticipantSelector` - Assignment component
- Module cards - Appear in accordion below
- Go-live banner - May appear above this card

---

_Pattern Type: Hero / CTA Card_  
_Last Updated: December 2025_

