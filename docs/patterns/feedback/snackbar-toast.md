# Snackbar / Toast Notifications

**Type**: Shared Component  
**Used In**: Both Customer and CS Flows (All pages with actions)  
**Location**: `components/ui/Snackbar.tsx`

---

## Visual Structure

```
                    ┌──────────────────────────────────┐
                    │ ✓ Action completed successfully  │
                    │   Additional context message...  │
                    └──────────────────────────────────┘
                               (bottom-center or top-right)
```

---

## Anatomy

```
╔══════════════════════════════════════════════════╗
║ [Icon] Message Text                        [×]  ║
║        Secondary message (optional)              ║
╚══════════════════════════════════════════════════╝
```

---

## Variants

### Success (Green)
```
┌─────────────────────────────────────────────┐
│ ✓ Ticket T-123 submitted successfully       │
└─────────────────────────────────────────────┘
```
- **Icon**: Checkmark circle
- **Background**: green-50 or green-500 (solid)
- **Text**: green-900 or white
- **Border**: green-200 or none

### Error (Red)
```
┌─────────────────────────────────────────────┐
│ ✕ Failed to save configuration              │
│   Please try again or contact support       │
└─────────────────────────────────────────────┘
```
- **Icon**: X circle
- **Background**: red-50 or red-500
- **Text**: red-900 or white
- **Border**: red-200

### Warning (Amber)
```
┌─────────────────────────────────────────────┐
│ ⚠ Some fields require attention             │
└─────────────────────────────────────────────┘
```
- **Icon**: Warning triangle
- **Background**: amber-50 or amber-500
- **Text**: amber-900 or white
- **Border**: amber-200

### Info (Blue)
```
┌─────────────────────────────────────────────┐
│ ℹ Configuration auto-saved                  │
└─────────────────────────────────────────────┘
```
- **Icon**: Info circle
- **Background**: blue-50 or blue-500
- **Text**: blue-900 or white
- **Border**: blue-200

---

## Positioning Variants

### Bottom-Center (Default)
```
                    ┌──────────────┐
                    │   Message    │
                    └──────────────┘
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
- Position: Fixed bottom, centered
- Bottom: 24px from bottom (or above footer if present)

### Top-Right
```
━━━━━━━━━━━━━━━━━━━━━━━━━━┌──────────┐
                          │ Message  │
                          └──────────┘
```
- Position: Fixed top-right
- Top: 80px (below header)
- Right: 24px

---

## Styling Specifications

### Container
- Min-width: 320px
- Max-width: 480px
- Padding: 16px horizontal, 12px vertical (px-4 py-3)
- Border-radius: 8px (rounded-lg)
- Shadow: Large elevation (shadow-lg)
- Z-index: 60 (above modals)

### Icon
- Size: 20px (w-5 h-5)
- Position: Left side, vertically centered
- Margin-right: 12px
- Color: Matches variant (green, red, amber, blue)

### Message Text
- **Primary**: text-sm, font-medium
- **Secondary**: text-xs, opacity-90, margin-top-1
- **Color**: Matches variant theme

### Close Button (Optional)
- Size: 16px (w-4 h-4)
- Position: Top-right
- Color: Matches theme, darker on hover
- Click: Dismisses snackbar

---

## Animation

### Enter
1. Slide up from bottom (if bottom-center)
2. Or slide in from right (if top-right)
3. Duration: 200ms
4. Easing: ease-out

### Exit
1. Fade out + slide down/right
2. Duration: 150ms
3. Easing: ease-in

---

## Auto-Dismiss Behavior

### Duration by Type
- **Success**: 3-4 seconds
- **Error**: 5-6 seconds (users need more time to read)
- **Warning**: 4-5 seconds
- **Info**: 3 seconds

### Manual Dismiss
- Click X button: Immediate dismissal
- Click anywhere on snackbar: Dismissal (optional)
- Swipe gesture on mobile: Dismissal (optional)

---

## Usage Examples

### Assignment Confirmation
```
✓ Participants assigned to Definitions:
  John Smith, Sarah Johnson
```
- Type: Success
- Duration: 4 seconds

### Ticket Submission
```
✓ Ticket T-105 submitted successfully!
```
- Type: Success
- Duration: 3 seconds

### Client Added
```
✓ Onboarding email sent to John Smith at
  john.smith@unionbank.com
```
- Type: Success
- Duration: 4 seconds

### Validation Error
```
✕ Please fill in all required fields
```
- Type: Error
- Duration: 5 seconds

### Auto-Save
```
ℹ Draft saved
```
- Type: Info
- Duration: 2 seconds

---

## Multiple Snackbars

### Stacking
```
┌──────────────┐
│ Message 3    │
├──────────────┤
│ Message 2    │
├──────────────┤
│ Message 1    │
└──────────────┘
```
- Stack vertically with 12px gap
- Max 3 visible at once
- Older messages dismissed first
- Each has independent timer

---

## State Management

### Props
```typescript
interface SnackbarProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // milliseconds
}
```

### Usage Pattern
```
const [showSnackbar, setShowSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');

// Trigger
setSnackbarMessage("Action completed!");
setShowSnackbar(true);

// Component
<Snackbar
  message={snackbarMessage}
  isVisible={showSnackbar}
  onClose={() => setShowSnackbar(false)}
  type="success"
/>
```

---

## Accessibility

- **Role**: alert or status
- **Aria-live**: polite (for success/info), assertive (for errors)
- **Aria-atomic**: true
- **Focus**: Does not steal focus (non-intrusive)
- **Screen readers**: Announces message automatically

---

## Responsive Behavior

- **Desktop**: Standard width (320-480px)
- **Mobile**: Full-width with 16px margins
- **Position**: Adjusts to avoid overlapping footer/keyboard

---

## Related Components
- Form submission actions
- Modal submit actions
- Assignment confirmations
- Save/auto-save indicators

---

_Pattern Type: Feedback / Notification_  
_Last Updated: December 2025_

