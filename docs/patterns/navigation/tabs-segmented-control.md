# Segmented Control (Auth Tabs)

**Type**: Customer/CS Shared Component  
**Used In**: Landing Page Auth (`app/page.tsx`)  
**Pattern**: iOS-style segmented control

---

## Visual Structure

```
┌─────────────────────────────────────────────┐
│ ┌──────────────────┬─────────────────────┐ │
│ │ Customer Access  │  CS Team Access     │ │
│ │    (filled)      │   (unfilled)        │ │
│ └──────────────────┴─────────────────────┘ │
└─────────────────────────────────────────────┘
  Background container (light gray)
```

---

## Anatomy

```
╔════════════════════════════════════════════════════════╗
║  Container (bg-slate-100, p-1, rounded-lg)            ║
║  ┌─────────────────────┬─────────────────────────┐   ║
║  │ ████ Active Tab ████│  Inactive Tab           │   ║
║  │ (gradient fill)     │  (transparent)          │   ║
║  └─────────────────────┴─────────────────────────┘   ║
╚════════════════════════════════════════════════════════╝
```

---

## States

### Active Segment (Selected)
```
┌────────────────────┐
│ ████████████████  │ ← Gradient fill
│ ██ Label Text ██  │ ← White text
│ ████████████████  │ ← Shadow
└────────────────────┘
```
- **Background**: Gradient (brand color or blue)
- **Text**: White, font-semibold
- **Shadow**: Small shadow (shadow-sm)
- **Border-radius**: Medium (rounded-md)

### Inactive Segment (Unselected)
```
┌────────────────────┐
│                    │ ← Transparent
│   Label Text       │ ← Gray text
│                    │ ← No shadow
└────────────────────┘
```
- **Background**: Transparent
- **Text**: Slate-600, font-semibold
- **Hover**: Text → slate-900
- **Border-radius**: Medium (rounded-md)

---

## Variants

### Customer/CS Auth Tabs
**Container**: Light gray (bg-slate-100)  
**Active Colors**:
- Customer tab: Red gradient `from-[#9F2E2B] to-[#7D2522]`
- CS tab: Blue gradient `from-blue-500 to-blue-600`

**Labels**:
- "Customer Access"
- "CS Team Access"

---

## Styling Specifications

### Container
- Background: slate-100
- Padding: 4px (p-1)
- Border-radius: 8px (rounded-lg)
- Display: Flex
- Gap: 4px (gap-1)

### Segment Button
- Flex: flex-1 (equal width)
- Padding: 24px horizontal, 10px vertical (px-6 py-2.5)
- Font: text-sm, font-semibold
- Border-radius: 6px (rounded-md)
- Transition: All properties 200ms

### Active Segment Gradients
- **Customer**: `bg-gradient-to-r from-[#9F2E2B] to-[#7D2522]`
- **CS Team**: `bg-gradient-to-r from-blue-500 to-blue-600`

---

## Behavior

### Interaction
- **Click**: Switch active segment
- **Animation**: Smooth transition (200ms)
- **Content**: Tab content updates instantly
- **State**: Single selection (radio behavior)

### Visual Feedback
- Active segment has fill + shadow
- Inactive segments transparent
- Smooth color transitions on switch
- No loading state (instant)

---

## Usage Pattern

### Authentication Flow
Used for switching between:
- Customer login/access methods
- CS team login (SSO only)

### Content Switching
- Customer tab → Email OTP or SSO options
- CS team tab → SSO-only option

---

## Accessibility

- **Role**: radiogroup or tablist
- **Buttons**: role="radio" or role="tab"
- **Selected**: aria-selected="true" or aria-checked="true"
- **Keyboard**: Arrow keys to navigate, Enter/Space to select
- **Focus**: Visible focus ring

---

## Similar Pattern

This pattern differs from the **Hub Tabs** which use:
- Underline style (bottom border only)
- No container background
- Full-width tabs
- 4 tabs instead of 2

---

## When to Use

### Segmented Control (This Pattern)
- ✅ 2-3 mutually exclusive options
- ✅ Equal importance options
- ✅ Limited space
- ✅ iOS-style modern aesthetic

### Regular Tabs (Hub Pattern)
- ✅ 3+ options
- ✅ More horizontal space
- ✅ Distinct sections
- ✅ Content-heavy areas

---

_Pattern Type: Navigation / Toggle_  
_Last Updated: December 2025_

