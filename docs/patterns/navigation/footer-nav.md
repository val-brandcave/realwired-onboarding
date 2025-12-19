# Sticky Footer Navigation

**Type**: Shared Component  
**Used In**: Customer Flow (All module pages with multi-step flows)  
**Location**: `components/ui/StickyFooterNav.tsx`

---

## Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│  [← Back]                    [Continue to Next Step →]     │
└────────────────────────────────────────────────────────────┘
     Secondary                         Primary CTA
```

---

## Anatomy

```
╔═══════════════════════════════════════════════════════════╗
║  Left Section              Right Section                  ║
║  ┌────────────┐            ┌──────────────────────────┐  ║
║  │ ← Previous │            │ ⚠ Tooltip (if disabled)  │  ║
║  │   Label    │            │ [Next Label →]           │  ║
║  └────────────┘            └──────────────────────────┘  ║
║  (text button)              (gradient button + icon)     ║
╚═══════════════════════════════════════════════════════════╝
```

---

## Button Variants

### Previous/Back Button (Left)
```
┌──────────────────┐
│ ← Previous Label │
└──────────────────┘
```
- **Style**: Text button (no background)
- **Icon**: Left arrow (20px)
- **Color**: Gray-700 → Gray-900 on hover
- **Hover**: Gray-50 background
- **Optional**: Can be hidden via `previousHidden` prop

### Next/Continue Button (Right)
```
┌────────────────────────┐
│ Next Label Text →      │
└────────────────────────┘
```
- **Style**: Gradient button (brand colors)
- **Icon**: Right arrow (20px) - auto-added by component
- **Colors**: `from-[#9F2E2B] to-[#7D2522]`
- **Hover**: Darker gradient
- **Shadow**: md → lg on hover

### Disabled Next Button
```
┌────────────────────────┐
│ Next Label (grayed)    │
└────────────────────────┘
```
- **Style**: Gray background, gray text
- **Cursor**: not-allowed
- **Icon**: Hidden when disabled
- **Tooltip**: Shows reason for disabled state

---

## Properties/Configuration

```typescript
interface FooterNavProps {
  // Previous button
  previousLabel?: string;
  onPrevious?: () => void;
  previousHidden?: boolean;
  
  // Next button (required)
  nextLabel: string;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextTooltip?: string; // Shows if disabled
}
```

---

## Styling Specifications

### Container
- Position: Fixed bottom-0
- Width: Full width
- Background: White
- Border-top: 2px solid gray-200
- Shadow: Large elevation
- Z-index: 40
- Padding: 16px vertical

### Content Area
- Max-width: 7xl (1280px)
- Padding: Responsive (px-4 to px-8)
- Layout: Flexbox, space-between

### Previous Button
- Padding: 24px horizontal, 10px vertical (px-6 py-2.5)
- Border-radius: 8px (rounded-lg)
- Transition: All 200ms

### Next Button
- Padding: 32px horizontal, 12px vertical (px-8 py-3)
- Border-radius: 8px
- Font: font-semibold
- Shadow: md, lg on hover
- Gap: 8px between text and icon

---

## Label Patterns

### Common Previous Labels
- "Back"
- "Back to Templates"
- "Exit Edit Mode"
- "Back to Categories"

### Common Next Labels
- "Continue"
- "Save & Continue"  
- "Continue to [Next Step]"
- "Complete [Module]"
- **Note**: Do NOT include "→" in label (component adds arrow SVG)

---

## Behavior

### Scroll Awareness
- **Always visible**: Sticky at bottom
- **Content padding**: Main content has bottom padding (pb-24) to avoid overlap
- **Chat button**: Positioned above footer (bottom-24)

### Disabled State
- Shows tooltip text if provided
- Tooltip appears to left of disabled button
- Amber color (text-amber-600)
- Prevents click action

### Transitions
- Button states: 200ms smooth transitions
- Hover effects: Scale/shadow changes
- Focus: Ring visible (accessibility)

---

## Usage Examples

### Template Selection Flow
```
[← Back to Categories]              [Continue with Selected Template →]
```

### Edit Mode Flow
```
[← Exit Edit Mode]                  [Continue to Advanced Details →]
```

### Preview Flow
```
[← Back to Templates]               [Continue to Request Types →]
```

### Module Completion
```
[← Back]                            [Complete Definitions Module →]
```

---

## Disabled Examples

### When Selection Required
- Next button: Disabled
- Tooltip: "Please select a template to continue"

### When Configuration Incomplete
- Next button: Disabled  
- Tooltip: "Configure at least one request type"

---

## Accessibility

- **Landmark**: Contained in `<nav>` or proper semantic structure
- **Button semantics**: Proper `<button>` elements
- **Disabled state**: `disabled` attribute + aria-disabled
- **Tooltips**: aria-describedby for disabled tooltips
- **Keyboard**: Tab to focus, Enter/Space to activate

---

## Page Integration

### Content Padding
Pages using footer nav must add bottom padding:
```
<main className="pb-24">
  {/* Content */}
</main>
```

### Conditional Rendering
Footer nav only shows when `footerNav` prop is passed to MainLayout:
```
{footerNav && <StickyFooterNav {...footerNav} />}
```

---

## Related Components
- `MainLayout.tsx` - Parent layout that conditionally renders footer
- `FloatingChatButton` - Positioned above footer (bottom-24 vs bottom-6)
- Module pages - Provide footer nav configuration

---

_Pattern Type: Navigation_  
_Last Updated: December 2025_

