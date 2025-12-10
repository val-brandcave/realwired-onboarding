# How to Use the Property Field Builder

## Quick Start Guide

### Overview
The Property Field Builder allows you to configure which fields appear in your property records, customize their labels and types, and arrange them in a two-column layout.

---

## Interface Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                  Property Record Configuration                       │
├─────────────────────────────────────┬───────────────────────────────┤
│                                     │                               │
│   OVERVIEW FIELDS         [Add]     │                               │
│  ┌─────────────┬─────────────┐     │                               │
│  │  Column 1   │  Column 2   │     │   FIELD SETTINGS DRAWER       │
│  │             │             │     │                               │
│  │ [Field 1] ← Click me!    │     │   📋 General                   │
│  │ [Field 2]   │ [Field 5]  │     │   • Field Label               │
│  │ [Field 3]   │ [Field 6]  │     │   • Input Type                │
│  │ [Field 4]   │             │     │                               │
│  └─────────────┴─────────────┘     │   ✓ Rules                     │
│                                     │   □ Required                  │
│   ADVANCED DETAILS        [Add]     │   ☑ Visible                   │
│  ┌─────────────┬─────────────┐     │                               │
│  │  Column 1   │  Column 2   │     │   [Delete Field]              │
│  │             │             │     │                               │
│  │ [Field 7]   │ [Field 10] │     │                               │
│  │ [Field 8]   │ [Field 11] │     │                               │
│  │ [Field 9]   │             │     │                               │
│  └─────────────┴─────────────┘     │                               │
└─────────────────────────────────────┴───────────────────────────────┘
```

---

## Basic Actions

### 1. Viewing & Selecting Fields
**What you see:**
- Fields displayed as they will appear in the final form
- Each field shows its label, input type, and required status (*)
- Hidden fields are shown with reduced opacity and "(Hidden)" label

**To select a field:**
1. Click anywhere on the field card
2. The field highlights with a blue border
3. Settings drawer opens on the right
4. A checkmark appears in the top-right corner

### 2. Configuring Field Settings
Once a field is selected, the drawer shows:

#### **Field Label**
- The name displayed to users
- Editable text input
- Changes appear instantly on the left

#### **Input Type**
- Dropdown with available types:
  - Text Input (single line)
  - Multi-line Text (text area)
  - Number (numeric only)
  - Dropdown (Single Select)
  - Dropdown (Multi Select)
  - Date Picker
  - File Upload
  - Read-only Text (auto-generated)
  - Clickable Link

#### **Rules**
- **Required**: User must fill this field ✓
- **Visible**: Show field in the form ✓
- System-required fields show 🔒 (cannot be changed)

#### **Dropdown Options** (for select types)
- List of current options
- Add new options with text input + "Add" button
- Remove options by hovering and clicking X
- Press Enter to quickly add options

### 3. Reordering Fields (Drag & Drop)

**To reorder within same column:**
1. Hover over a field
2. Drag handle (≡) appears on the left
3. Click and drag to new position
4. Drop on target field
5. Fields reorder automatically

**To move to different column:**
1. Drag a field
2. Drag it over to the other column
3. Drop on a field in that column
4. Field moves to the new column

**Cannot drag:**
- 🔒 System-required fields (locked in place)
- Between sections (Overview ↔ Advanced)

### 4. Adding New Fields

**Steps:**
1. Click "Add Field" button at top-right of a section
2. New field appears in Column 1
3. Settings drawer opens automatically
4. Configure the field:
   - Change label from "New Field"
   - Select input type
   - Set required/visible
   - Add dropdown options (if applicable)

**Example:**
```
Click [Add Field] → 
New field "New Field" created → 
Drawer opens → 
Change label to "Pool Type" → 
Select "Dropdown" → 
Add options: "In-Ground", "Above-Ground", "None" → 
Done! ✓
```

### 5. Deleting Custom Fields

**Only custom fields can be deleted** (not system fields)

**Steps:**
1. Select the custom field
2. Scroll to bottom of settings drawer
3. Find "Danger Zone" section
4. Click "Delete Field"
5. Confirmation appears: "Are you sure?"
6. Click "Yes, Delete" or "Cancel"

---

## Field Types Explained

| Type | What It's For | Example |
|------|---------------|---------|
| **Text Input** | Short single-line text | Street Address, Property Name |
| **Multi-line Text** | Longer text, multiple lines | Legal Description, Notes |
| **Number** | Numeric values only | Square Footage, Year Built |
| **Dropdown (Single)** | Choose one option | Property Category, State |
| **Dropdown (Multi)** | Choose multiple options | Amenities, Features |
| **Date Picker** | Calendar date selection | Closing Date, Inspection Date |
| **File Upload** | Upload documents/images | Property Photos, Deeds |
| **Read-only Text** | Auto-generated, no edit | Property ID, Created Date |
| **Clickable Link** | Generated URL links | Property Listing URL |

---

## System-Required Fields

These fields are **locked** and have special rules:

### Overview Section:
- 🔒 Street Address
- 🔒 City
- 🔒 State
- 🔒 ZIP Code

### Advanced Section:
- 🔒 Property Category
- 🔒 Property Type

**What you CAN do:**
- ✓ Change the label
- ✓ Change input type (within limits)

**What you CANNOT do:**
- ✗ Delete the field
- ✗ Make it optional (must be required)
- ✗ Hide it (must be visible)
- ✗ Drag/reorder it

---

## Common Tasks

### Task 1: Add a Custom Dropdown Field
```
1. Click [Add Field] in desired section
2. Change label to "Parking Type"
3. Select "Dropdown (Single Select)"
4. Add options:
   - Type "Garage" → [Add]
   - Type "Driveway" → [Add]
   - Type "Street" → [Add]
   - Type "None" → [Add]
5. Check "Required" if needed
6. Done! Field appears in form
```

### Task 2: Reorder Fields for Better UX
```
1. Drag "Square Footage" field
2. Drop it below "Bedrooms"
3. Drag "Lot Size" to Column 2
4. Fields now flow logically
```

### Task 3: Hide Unused Fields
```
1. Click on "Assessed Value" field
2. Uncheck "Visible" checkbox
3. Field grays out but stays in list
4. Won't appear in final form
```

### Task 4: Change Text Field to Dropdown
```
1. Select "Occupancy Status" field
2. Change Input Type to "Dropdown"
3. Add options:
   - "Owner Occupied"
   - "Tenant Occupied"
   - "Vacant"
4. Field now shows as dropdown
```

---

## Tips & Best Practices

### Layout Tips:
- **Group related fields** in same column
- **Put frequently used fields** in Column 1
- **Balance column lengths** for visual appeal
- **Required fields** should be near the top

### Field Configuration Tips:
- **Use clear labels** that users understand
- **Add all dropdown options** before going live
- **Mark critical fields** as required
- **Hide fields** you might need later (don't delete)

### Organization Tips:
- **Address fields** stay in Overview
- **Property characteristics** go in Advanced
- **Custom business fields** can go in either section
- **Keep forms concise** - hide unnecessary fields

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Close drawer | Click outside or [X] button |
| Add dropdown option | Type + [Enter] |
| Cancel operation | [Cancel] button |

---

## Troubleshooting

### "I can't drag this field"
- Check for 🔒 lock icon (system-required field)
- These fields are locked in position

### "My changes aren't saving"
- Changes save automatically to the form
- Click "Next: Setup Request Types →" to save permanently

### "I accidentally deleted a field"
- Custom fields: Can't be undone, re-add it
- System fields: Cannot be deleted

### "Dropdown options disappeared"
- Check if you changed field type away from dropdown
- Changing back will show empty options list
- Re-add options as needed

---

## Next Steps

After configuring your property fields:
1. Review both sections (Overview & Advanced)
2. Verify required fields are marked
3. Test drag-and-drop layout
4. Click "Next: Setup Request Types →"
5. Your configuration is saved!

---

## Visual Indicators Guide

| Symbol | Meaning |
|--------|---------|
| * | Required field |
| 🔒 | System-required (locked) |
| ≡ | Drag handle (hover to see) |
| ✓ | Selected/Active |
| (Hidden) | Field not visible in form |
| Blue border | Currently selected |
| Gray/faded | Hidden or disabled field |

---

**Need Help?** 
The settings drawer provides contextual information for each field. Hover over elements to see tooltips and guidance.

