# Add New Client Modal (CS Portal)

**Type**: CS Flow Component  
**Used In**: CS Portal Dashboard  
**Location**: `app/cs-portal/page.tsx`

---

## Visual Structure

```
╔═══════════════════════════════════════════════════╗
║ Add New Client                          [× Close] ║
╠═══════════════════════════════════════════════════╣
║                                                    ║
║ Organization Name *                                ║
║ [__________________________________________]       ║
║                                                    ║
║ ═══════════════════════════════════════════       ║
║ Primary Onboarding Contact                        ║
║                                                    ║
║ Name *                                             ║
║ [__________________________________________]       ║
║                                                    ║
║ Email Address *                                    ║
║ [__________________________________________]       ║
║                                                    ║
║ ═══════════════════════════════════════════       ║
║ Timeline                                          ║
║                                                    ║
║ Projected Go-Live Date *                           ║
║ [____/____/________]  📅                          ║
║ ℹ This date will be visible to the client         ║
║                                                    ║
║ ──────────────────────────────────────────        ║
║                                                    ║
║              [Cancel]         [Add Client]         ║
╚═══════════════════════════════════════════════════╝
```

---

## Anatomy

```
╔═════════════════════════════════════════════════╗
║ Header: Title + Close                            ║
╠═════════════════════════════════════════════════╣
║ Section 1: Organization Info                    ║
║  • Organization Name (required)                 ║
╟─────────────────────────────────────────────────╢
║ Section 2: Primary Contact                      ║
║  • Contact Name (required)                      ║
║  • Email Address (required)                     ║
╟─────────────────────────────────────────────────╢
║ Section 3: Timeline                             ║
║  • Projected Go-Live Date (required)            ║
║  • Helper text (info)                           ║
╠═════════════════════════════════════════════════╣
║ Footer: Cancel + Submit Actions                 ║
╚═════════════════════════════════════════════════╝
```

---

## Form Fields

### Organization Name (Required)
```
Organization Name *
[_________Union Bank_________]
```
- **Type**: Text input
- **Placeholder**: "e.g., Union Bank"
- **Validation**: Required, min 2 characters
- **Max length**: 100 characters

### Section Dividers
```
═══════════════════════════════════
Primary Onboarding Contact
```
- **Border**: Top border (slate-200)
- **Padding**: 16px top
- **Title**: text-sm, font-semibold, slate-700
- **Spacing**: 16px margin bottom

### Contact Name (Required)
```
Name *
[_________John Smith_________]
```
- **Type**: Text input
- **Placeholder**: "e.g., John Smith"
- **Validation**: Required

### Contact Email (Required)
```
Email Address *
[____john.smith@unionbank.com____]
```
- **Type**: Email input
- **Placeholder**: "e.g., john.smith@unionbank.com"
- **Validation**: Required, valid email format

### Projected Go-Live Date (Required)
```
Projected Go-Live Date *
[__01__/__30__/__2026__]  📅
ℹ This date will be visible to the client throughout their onboarding process
```
- **Type**: Date picker
- **Min date**: Today (cannot select past dates)
- **Format**: MM/DD/YYYY
- **Helper text**: text-xs, slate-500, info icon

---

## Styling Specifications

### Modal Container
- Width: max-w-md (448px)
- Background: White
- Border-radius: 12px (rounded-xl)
- Shadow: 2xl
- Z-index: 50

### Modal Header
- Padding: 24px (p-6)
- Border-bottom: 1px solid slate-200
- Title: text-xl, font-bold
- Close button: Hover gray-600

### Modal Body
- Padding: 24px (p-6)
- Space-y: 20px (between fields)

### Field Groups
- Space-y: 16px within sections
- Border-top dividers: pt-4, border-slate-200

### Section Titles
- Font: text-sm, font-semibold
- Color: slate-700
- Margin-bottom: 16px

### Input Fields
- Padding: 16px horizontal, 10px vertical (px-4 py-2.5)
- Border: 1px solid slate-300
- Border-radius: 8px (rounded-lg)
- Font: text-sm
- Focus: 2px ring, primary color

### Helper Text
- Font: text-xs
- Color: slate-500
- Margin-top: 4px
- Icon: Info icon (16px) inline

---

## Button Specifications

### Cancel Button
- Padding: px-4 py-2.5
- Font: text-sm, font-medium
- Color: slate-700
- Background: White
- Border: 1px solid slate-300
- Hover: bg-slate-50

### Add Client Button (Primary)
```
┌──────────────┐
│ Add Client   │
└──────────────┘
```
- Padding: px-4 py-2.5
- Font: text-sm, font-semibold
- Background: `from-[#9F2E2B] to-[#7D2522]` gradient
- Text: White
- Shadow: md, lg on hover
- Disabled: Gray background if form invalid

---

## Behavior

### Opening
- Trigger: "Add New Client" button (top-right of dashboard)
- Animation: Fade in backdrop + modal
- Focus: Auto-focus on Organization Name field

### Validation
- **Real-time**: Email validation on blur
- **Submit-time**: Check all required fields
- **Inline errors**: Red text below fields

### Submission Flow
1. User fills all required fields
2. Clicks "Add Client"
3. Modal stays open, button shows "Adding..."
4. On success (1.5s delay):
   - Modal closes
   - Snackbar: "Onboarding email sent to [Contact Name] at [Email]"
   - Navigate to client onboarding setup page with params:
     ```
     /cs-portal/client-onboarding?org=[name]&contact=[name]&email=[email]&goLiveDate=[date]
     ```

### Closing
- Cancel button
- X button (top-right)
- ESC key
- Backdrop click (optional)
- Form data cleared on close

---

## Post-Submission

### Snackbar Message
```
┌──────────────────────────────────────────────────┐
│ ✓ Onboarding email sent to John Smith at        │
│   john.smith@unionbank.com                       │
└──────────────────────────────────────────────────┘
```
- Type: Success (green)
- Duration: 4 seconds
- Position: Bottom-center or top-right

### Navigation
After 1.5 seconds, auto-navigate to:
```
/cs-portal/client-onboarding
  ?org=Union%20Bank
  &contact=John%20Smith
  &email=john.smith@unionbank.com
  &goLiveDate=2026-01-30
```

This loads the client onboarding configuration page.

---

## Validation Rules

### Organization Name
- Required: ✓
- Min length: 2 characters
- No special validation
- Error: "Organization name is required"

### Contact Name
- Required: ✓
- Min length: 2 characters
- Error: "Contact name is required"

### Email Address
- Required: ✓
- Format: Valid email (contains @ and domain)
- Error: "Please enter a valid email address"

### Go-Live Date
- Required: ✓
- Min date: Today
- Format: Valid date
- Error: "Please select a go-live date"

---

## Helper Text

### Date Field Helper
```
ℹ This date will be visible to the client throughout their onboarding process
```
- Explains impact/visibility
- Helps CS agent make informed decision
- Reduces questions/confusion

---

## Accessibility

- **Modal**: role="dialog", aria-modal="true"
- **Title**: aria-labelledby
- **Focus trap**: Tab stays within modal
- **ESC key**: Closes modal
- **Required fields**: aria-required="true"
- **Labels**: Properly associated with inputs

---

## Related Components
- Client table (where new client appears)
- Snackbar notification
- Client onboarding page (navigation target)
- CS Portal navigation

---

_Pattern Type: Modal / Form (CS Flow)_  
_Last Updated: December 2025_

