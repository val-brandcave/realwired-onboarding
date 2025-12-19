# Product Discovery Cards

**Type**: Customer Flow Component  
**Used In**: Hub Products Tab  
**Location**: `app/hub/_components/ProductCard.tsx`

---

## Visual Structure

```
┌────────────────────────────────────┐
│  [Icon/Image]                      │
│                                    │
│  Product Name                      │
│  ─────────────                     │
│  Short description of the product  │
│  and its key benefits...           │
│                                    │
│  [Feature 1] [Feature 2] [Feature] │
│                                    │
│  ☆ Express Interest                │
│                          [Learn →] │
└────────────────────────────────────┘
```

---

## Anatomy

```
╔════════════════════════════════════════════════╗
║  ┌──────────────────────────────────────────┐ ║
║  │         Icon or Hero Image               │ ║
║  │         (64px × 64px or full-width)      │ ║
║  └──────────────────────────────────────────┘ ║
║                                                ║
║  Product Title (Bold, Large)                   ║
║  ─────────────────────────                     ║
║  Description text explaining what this product ║
║  does and who it's for. 2-3 sentences max.     ║
║                                                ║
║  [Badge] [Badge] [Badge]  ← Feature tags       ║
║                                                ║
║  ┌──────────────────────────────────────────┐ ║
║  │ ☐ Express Interest          [Learn More]│ ║
║  └──────────────────────────────────────────┘ ║
╚════════════════════════════════════════════════╝
```

---

## Product Card States

### Available Product (Not Owned)
```
┌─────────────────────────────┐
│  [🤖 Icon]                  │
│  AI Review Forms            │
│  Automate quality checks... │
│  [AI] [Automation] [Beta]   │
│  ☐ Express Interest         │
│                  [Learn →]  │
└─────────────────────────────┘
```
- **Border**: slate-200
- **Hover**: Shadow increases, slight scale (1.02)
- **Express Interest**: Unchecked toggle

### Interested (Expressed Interest)
```
┌─────────────────────────────┐
│  [🤖 Icon]                  │
│  AI Review Forms            │
│  Automate quality checks... │
│  [AI] [Automation] [Beta]   │
│  ☑ Interested ✓             │
│                  [Learn →]  │
└─────────────────────────────┘
```
- **Border**: Blue-200
- **Background**: Blue-50 tint
- **Toggle**: Checked (blue), "Interested" label

### Already Owned
```
┌─────────────────────────────┐
│  [📊 Icon]                  │
│  Reporting Microservice     │
│  Real-time insights...      │
│  [Analytics] [Reports]      │
│  ✓ You have this            │
│              [Get Started →]│
└─────────────────────────────┘
```
- **Border**: Green-200
- **Background**: Green-50 tint
- **Badge**: "You have this" (green)
- **CTA**: "Get Started" instead of "Learn More"

### Coming Soon
```
┌─────────────────────────────┐
│  [🚀 Icon]                  │
│  OneView Platform           │
│  Unified data view...       │
│  [Integration] [AI]         │
│  🔒 Coming Soon             │
│                             │
└─────────────────────────────┘
```
- **Border**: slate-200
- **Opacity**: 75%
- **Badge**: "Coming Soon" (gray)
- **Interactive**: No (cannot express interest yet)

---

## Icon/Image Section

### Icon Variant
```
┌────┐
│ 🤖 │ ← Large emoji or icon
└────┘
```
- Size: 64px × 64px (w-16 h-16)
- Background: Gradient or solid color
- Border-radius: 12px (rounded-xl)
- Centered in card top area

### Image Variant
```
┌──────────────────┐
│                  │
│  Product Image   │ ← Full-width hero
│                  │
└──────────────────┘
```
- Aspect ratio: 16:9 or 4:3
- Object-fit: Cover
- Border-radius: Top corners only

---

## Content Elements

### Product Title
- Font: text-xl or text-2xl, font-bold
- Color: slate-900
- Margin: 16px top, 8px bottom

### Description
- Font: text-sm
- Color: slate-600
- Line-height: Relaxed (1.6)
- Max-lines: 3-4 (with ellipsis)
- Margin-bottom: 16px

### Feature Tags (Badges)
```
[AI] [Automation] [Beta] [New]
```
- Size: Extra small
- Colors: Mixed (blue, purple, green)
- Wrap: Flex-wrap
- Gap: 6px (gap-1.5)
- Margin-bottom: 16px

---

## Interactive Elements

### Express Interest Toggle
```
☐ Express Interest  →  ☑ Interested ✓
```

**Unchecked**:
- Checkbox: Empty square
- Text: "Express Interest"
- Color: Slate-600
- Hover: Slate-900

**Checked**:
- Checkbox: Filled with checkmark (blue)
- Text: "Interested" or "We'll be in touch!"
- Color: Blue-600
- Icon: Checkmark

### Learn More Button
```
┌──────────────┐
│ Learn More → │
└──────────────┘
```
- Style: Text button or outlined button
- Color: Primary or blue
- Hover: Background tint
- Arrow: Right arrow icon
- Action: Opens product detail modal

### Get Started Button (For Owned Products)
```
┌────────────────┐
│ Get Started → │
└────────────────┘
```
- Style: Primary gradient button
- Full-width or right-aligned
- Action: Navigate to product onboarding

---

## Card Grid Layout

### Desktop (3 columns)
```
┌────────┐ ┌────────┐ ┌────────┐
│ Card 1 │ │ Card 2 │ │ Card 3 │
└────────┘ └────────┘ └────────┘
┌────────┐ ┌────────┐
│ Card 4 │ │ Card 5 │
└────────┘ └────────┘
```
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Gap: 24px (gap-6)

### Mobile
- Single column
- Maintains aspect ratio
- Touch-friendly

---

## Styling Specifications

### Card Container
- Background: White
- Border: 2px solid
- Border-radius: 16px (rounded-2xl)
- Padding: 24px (p-6)
- Min-height: 360px
- Transition: All 200ms

### Hover Effect
- Transform: scale(1.02)
- Shadow: md → xl
- Border-color: primary/30 (subtle highlight)

### Express Interest Section
- Margin-top: auto (pushes to bottom)
- Border-top: 1px solid slate-200
- Padding-top: 16px
- Display: Flex, justify-between, items-center

---

## Product Detail Modal

### Opened By
- Click "Learn More" button

### Modal Content
```
╔═══════════════════════════════════════════════╗
║ [Product Icon] Product Name        [× Close]  ║
╠═══════════════════════════════════════════════╣
║                                                ║
║ [Video/Demo Preview]                          ║
║                                                ║
║ ─────────────────────────────────────────────  ║
║                                                ║
║ About This Product                            ║
║ Detailed description...                       ║
║                                                ║
║ Key Features:                                  ║
║ • Feature 1 with explanation                   ║
║ • Feature 2 with explanation                   ║
║ • Feature 3 with explanation                   ║
║                                                ║
║ ─────────────────────────────────────────────  ║
║                                                ║
║ [Talk to Sales]           [Express Interest]   ║
╚═══════════════════════════════════════════════╝
```

**Width**: max-w-2xl (672px)  
**Scrollable**: Yes (if content long)  
**Video**: Embedded or placeholder

---

## Accessibility

- **Card**: Proper heading hierarchy
- **Toggle**: Checkbox with label
- **Buttons**: Clear aria-labels
- **Modal**: role="dialog", focus trap
- **Keyboard**: Tab through interactive elements

---

## Related Components
- Product detail modal
- Video player component
- Express interest state management
- Learn more modal variations

---

_Pattern Type: Card / Discovery_  
_Last Updated: December 2025_

