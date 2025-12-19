# Ticket Submission Modal

**Type**: Shared Component  
**Used In**: Customer Support Tickets Tab  
**Location**: `app/hub/_components/SubmitTicketModal.tsx`

---

## Visual Structure

```
╔═══════════════════════════════════════════════════╗
║ Submit Support Ticket                      [× Close]║
╠═══════════════════════════════════════════════════╣
║                                                    ║
║ Subject *                                          ║
║ [_________________________________________]        ║
║                                                    ║
║ Category *                                         ║
║ [Configuration Help            ▼]                 ║
║                                                    ║
║ Priority *                                         ║
║ [Medium                        ▼]                 ║
║                                                    ║
║ Description *                                      ║
║ [_________________________________________         ║
║  _________________________________________         ║
║  _________________________________________]        ║
║                                                    ║
║ Assign to Agent                                    ║
║ [Auto-assign                   ▼]                 ║
║                                                    ║
║ ──────────────────────────────────────────        ║
║                                                    ║
║         [Cancel]              [Submit Ticket]      ║
╚═══════════════════════════════════════════════════╝
```

---

## Anatomy

```
╔═══════════════════════════════════════════════════════╗
║ Header: Title + Close Button                          ║
╠═══════════════════════════════════════════════════════╣
║ Body: Form Fields                                     ║
║  ┌─────────────────────────────────────────────────┐ ║
║  │ • Subject (text input)                          │ ║
║  │ • Category (dropdown)                           │ ║
║  │ • Priority (dropdown)                           │ ║
║  │ • Description (textarea)                        │ ║
║  │ • Agent assignment (dropdown)                   │ ║
║  └─────────────────────────────────────────────────┘ ║
╠═══════════════════════════════════════════════════════╣
║ Footer: Cancel + Submit Actions                       ║
╚═══════════════════════════════════════════════════════╝
```

---

## Form Fields

### 1. Subject (Required)
- **Type**: Text input
- **Placeholder**: "Brief description of your issue"
- **Validation**: Required, min 5 characters
- **Max length**: 100 characters

### 2. Category (Required)
- **Type**: Dropdown select
- **Options**:
  - Configuration Help
  - Feature Question
  - Technical Issue
  - Training Request
  - Other
- **Default**: No selection (placeholder)

### 3. Priority (Required)
- **Type**: Dropdown select
- **Options**:
  - Low (🟢)
  - Medium (🟡)
  - High (🟠)
  - Urgent (🔴)
- **Default**: "Medium"
- **Color-coded**: Visual indicators per priority

### 4. Description (Required)
- **Type**: Textarea
- **Rows**: 4-6
- **Placeholder**: "Provide details about your request or issue..."
- **Validation**: Required, min 20 characters
- **Max length**: 1000 characters

### 5. Assign to Agent (Optional)
- **Type**: Dropdown select
- **Options**:
  - Auto-assign (default)
  - Sarah Johnson
  - Emily Rodriguez
  - David Patterson
- **Default**: "Auto-assign"

---

## Styling Specifications

### Modal Overlay
- Background: black/50 (semi-transparent)
- Z-index: 50
- Full screen coverage
- Click to close (optional)

### Modal Container
- Width: max-w-md (448px)
- Background: White
- Border-radius: 12px (rounded-xl)
- Shadow: 2xl (large elevation)
- Max-height: 90vh (scrollable if needed)

### Modal Header
- Padding: 24px (p-6)
- Border-bottom: 1px solid slate-200
- Display: Flex, justify-between
- Title: text-xl, font-bold

### Modal Body
- Padding: 24px (p-6)
- Space-y: 20px between fields
- Max-height: Scrollable if exceeds viewport

### Form Labels
- Font: text-sm, font-medium
- Color: Foreground
- Margin-bottom: 8px
- Asterisk for required: Red-600

### Form Inputs
- Padding: 12px horizontal, 10px vertical
- Border: 1px solid slate-300
- Border-radius: 8px
- Focus: 2px ring, primary color
- Font: text-sm

### Modal Footer
- Padding: 24px (p-6)
- Border-top: 1px solid slate-200
- Display: Flex, justify-end, gap-12px

---

## Button Specifications

### Cancel Button
- Style: Secondary (outline)
- Padding: px-4 py-2.5
- Text: text-sm, font-medium
- Border: 1px solid slate-300
- Background: White
- Hover: bg-slate-50

### Submit Button
- Style: Primary (gradient)
- Padding: px-4 py-2.5
- Text: text-sm, font-semibold
- Background: `from-[#9F2E2B] to-[#7D2522]`
- Hover: Darker gradient
- Disabled: Gray, cursor not-allowed

---

## Behavior

### Opening
- Trigger: "Submit New Ticket" button
- Animation: Fade in backdrop + scale modal (from 0.95 to 1.0)
- Duration: 200ms
- Focus: Auto-focus on subject field

### Validation
- **On blur**: Show field-level errors
- **On submit**: Validate all required fields
- **Inline errors**: Red text below invalid fields
- **Submit disabled**: Until all required fields valid

### Submission
1. User fills form
2. Clicks "Submit Ticket"
3. Modal shows loading state (button: "Submitting...")
4. On success:
   - Modal closes
   - Snackbar shows: "Ticket T-XXX submitted successfully!"
   - New ticket appears in list
5. On error: Shows error message in modal

### Closing
- Click Cancel button
- Click X button
- Click backdrop (optional)
- Press ESC key
- Clears form data on close

---

## Priority Color Indicators

```
Priority Dropdown Options:
┌────────────────────┐
│ 🟢 Low            │ ← Green dot
│ 🟡 Medium         │ ← Yellow dot
│ 🟠 High           │ ← Orange dot
│ 🔴 Urgent         │ ← Red dot
└────────────────────┘
```

After selection, shows in ticket:
- Low: `bg-green-100 text-green-700`
- Medium: `bg-yellow-100 text-yellow-700`
- High: `bg-orange-100 text-orange-700`
- Urgent: `bg-red-100 text-red-700`

---

## Generated Ticket

### Ticket ID
- Format: `T-XXX` (3 digits)
- Auto-generated from timestamp
- Shown in success message

### Created Ticket Object
```
{
  id: "T-123",
  subject: "User input",
  category: "Selected category",
  priority: "Selected priority",
  status: "open",
  description: "User input",
  createdDate: "Dec 16, 2025",
  updatedDate: "Dec 16, 2025",
  assignedAgent: "Auto-assigned or selected"
}
```

---

## Accessibility

- **Modal**: role="dialog", aria-modal="true"
- **Title**: aria-labelledby="modal-title"
- **Focus trap**: Tab cycles within modal only
- **ESC key**: Closes modal
- **Required fields**: aria-required="true"
- **Error messages**: aria-describedby linking to errors

---

## Responsive Behavior

- **Desktop**: Centered modal, fixed width
- **Mobile**: Full-width modal with small margins
- **Scrolling**: Body scrolls if content exceeds viewport

---

## Validation Rules

### Subject
- Required: ✓
- Min length: 5 characters
- Max length: 100 characters
- Error: "Subject must be at least 5 characters"

### Category
- Required: ✓
- Must select from dropdown
- Error: "Please select a category"

### Priority
- Required: ✓
- Default: "Medium" (pre-selected)

### Description
- Required: ✓
- Min length: 20 characters
- Max length: 1000 characters
- Error: "Please provide at least 20 characters"

### Agent
- Optional
- Defaults to "Auto-assign"

---

## Related Components
- `TicketList` - Shows submitted tickets
- Snackbar - Success confirmation
- Ticket detail view - Expanded ticket info

---

_Pattern Type: Modal / Form_  
_Last Updated: December 2025_

