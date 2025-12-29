# Education Panel (Side Panel)

**Type**: Shared Component  
**Used In**: Most module configuration pages (Customer Flow)  
**Location**: Inline in page files (should be extracted to component)  
**Status**: ⚠️ Inconsistent across pages - needs standardization

---

## Visual Structure

```
┌─────────────────────────────────────┐
│ 📚 Why We Need This                 │
│ ─────────────────────────────────── │
│ Explanation text about why this     │
│ step is important...                │
│                                     │
│ 🎥 Video Tutorial (3:45)            │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │        [▶ Play]                 │ │
│ │     Video Title                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📄 Details                          │
│ ✓ Key point 1                       │
│ ✓ Key point 2                       │
│ ✓ Key point 3                       │
│                                     │
│ 💡 Tip                              │
│ ┌─────────────────────────────────┐ │
│ │ Helpful tip or best practice... │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📥 Resource Guide (Optional)        │
│ [Download PDF →]                    │
└─────────────────────────────────────┘
```

---

## Anatomy

```
╔═══════════════════════════════════════════════╗
║  Sticky Container (top-20)                    ║
║  ┌─────────────────────────────────────────┐ ║
║  │ Section 1: Why We Need This             │ ║
║  │ • Heading + explanation paragraph       │ ║
║  ├─────────────────────────────────────────┤ ║
║  │ Section 2: Video Tutorial (X:XX)        │ ║
║  │ • Heading with duration                 │ ║
║  │ • Video player placeholder              │ ║
║  │ • Play button overlay                   │ ║
║  ├─────────────────────────────────────────┤ ║
║  │ Section 3: Details (Optional)           │ ║
║  │ • Bulleted list with checkmarks         │ ║
║  ├─────────────────────────────────────────┤ ║
║  │ Section 4: Tips (Optional)              │ ║
║  │ • Blue info box with lightbulb          │ ║
║  ├─────────────────────────────────────────┤ ║
║  │ Section 5: Resources (Optional)         │ ║
║  │ • Download button for PDF guide         │ ║
║  └─────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════╝
```

---

## Standard Styling

### Container
```tsx
<div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
```
- **Background**: Gradient from primary/5 to primary/10
- **Border**: 1px solid primary/20
- **Border-radius**: 12px (rounded-xl)
- **Padding**: 20px (p-5)
- **Position**: Sticky, top-20 (below header)

---

## Section 1: Why We Need This

```tsx
<div className="mb-4">
  <h3 className="font-semibold text-foreground text-sm mb-2">
    Why We Need This
  </h3>
  <p className="text-xs text-muted-foreground">
    [Explanation of why this step matters...]
  </p>
</div>
```

**Heading**:
- Font: text-sm, font-semibold
- Color: foreground (slate-900)
- Margin-bottom: 8px

**Body**:
- Font: text-xs
- Color: muted-foreground (slate-600)
- Line-height: Relaxed

---

## Section 2: Video Tutorial

```tsx
<div className="mb-4">
  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
    <svg>...</svg> {/* Video icon */}
    Video Tutorial (3:45)
  </h4>
  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <button className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
        <svg>...</svg> {/* Play icon */}
      </button>
      <span className="mt-2 text-xs font-medium text-slate-700">
        [Video Title]
      </span>
    </div>
  </div>
</div>
```

**Heading**:
- Icon: Video camera (16px)
- Duration: In parentheses
- Font: text-xs, font-medium

**Video Player**:
- Aspect ratio: 16:9 (aspect-video)
- Background: Gradient placeholder
- Border-radius: 8px (rounded-lg)
- Play button: 48px circle, white bg, centered

---

## Section 3: Details (Optional)

```tsx
<div className="mb-4">
  <h4 className="font-medium text-foreground text-xs mb-2">Details</h4>
  <ul className="space-y-1.5 text-xs text-muted-foreground">
    <li className="flex items-start gap-2">
      <svg className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0">
        {/* Checkmark icon */}
      </svg>
      <span>Detail point 1</span>
    </li>
    <li className="flex items-start gap-2">
      <svg className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0">
        {/* Checkmark icon */}
      </svg>
      <span>Detail point 2</span>
    </li>
  </ul>
</div>
```

**List Items**:
- Checkmark icon: 14px, primary color
- Text: text-xs, muted-foreground
- Gap: 8px between icon and text
- Spacing: 6px between items

---

## Section 4: Tips (Optional)

```tsx
<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
  <div className="flex items-start gap-2">
    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0">
      {/* Lightbulb icon */}
    </svg>
    <div>
      <h5 className="text-xs font-medium text-blue-900 mb-1">Tip</h5>
      <p className="text-xs text-blue-700">
        [Helpful tip or best practice...]
      </p>
    </div>
  </div>
</div>
```

**Box Styling**:
- Background: blue-50
- Border: 1px solid blue-200
- Border-radius: 8px (rounded-lg)
- Padding: 12px (p-3)

**Icon**: Lightbulb, 16px, blue-600

---

## Section 5: Resources (Optional)

```tsx
<div>
  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
    <svg>...</svg> {/* Document icon */}
    Resource Guide
  </h4>
  <button className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-foreground hover:bg-slate-50 transition-colors flex items-center justify-between">
    <span>Download PDF Guide</span>
    <svg>...</svg> {/* Download icon */}
  </button>
</div>
```

**Download Button**:
- Full width
- White background with border
- Hover: slate-50
- Icon: Download arrow (right side)

---

## Usage by Module

### ✅ Has Education Panel (Consistent)
- Organization Setup (all 4 pages)
- Definitions (property categories, request types, bid panels, configure pages)
- General Settings
- IT Checklist

### ⚠️ Has Education Panel (Inconsistent Headers)
- Users Upload (uses "How This Works" instead of "Why We Need This")
- Vendors pages (varying headers)
- Routing pages (varying headers)

### ❌ Missing Education Panel
According to audit, all pages now have panels but some need header standardization.

---

## Standardization Needed

### Issue 1: Inconsistent First Section Header
**Standard**: "Why We Need This"  
**Found**: "How This Works", "Vendor Types & Credentials", "Request Type Routing"

**Action**: Change all to "Why We Need This"

### Issue 2: Missing Details Section
Some pages use numbered steps instead of bulleted details.

**Action**: Standardize to bulleted checkmark list

---

## Positioning in Layout

### Two-Column Layout
```
┌────────────────────────────────────────────────┐
│  Main Content (2/3 width)  │  Education Panel  │
│                            │  (1/3 width)      │
│  [Form fields, config]     │  [Sticky panel]   │
│                            │                   │
│                            │                   │
└────────────────────────────────────────────────┘
```

**Grid**: `lg:grid-cols-3`  
**Main**: `lg:col-span-2`  
**Panel**: `lg:col-span-1`

---

## Responsive Behavior

- **Desktop (lg+)**: Side-by-side, panel sticky
- **Tablet (md)**: May stack or remain side-by-side
- **Mobile (sm)**: Stacks below main content, not sticky

---

## When to Use

### Include Education Panel When:
- ✅ Page has complex configuration
- ✅ User needs context about purpose
- ✅ Video tutorial available
- ✅ Tips or best practices to share
- ✅ Downloadable resources available

### Skip Education Panel When:
- ❌ Simple yes/no or single-field pages
- ❌ Preview/read-only pages (removed per user feedback)
- ❌ Completion/confirmation pages
- ❌ Navigation/intro pages

---

## Content Guidelines

### "Why We Need This" Section
- 2-3 sentences max
- Explain business value
- Connect to overall onboarding goal
- Use friendly, helpful tone

### Video Duration
- Show actual duration: (3:45)
- Keep videos under 5 minutes
- Title should match video content

### Details List
- 3-5 bullet points
- Each point = one key concept
- Use checkmarks for completed/included items
- Keep text concise (1 line each)

### Tips
- One tip per page
- Focus on common mistakes or best practices
- Use blue info box for visibility
- Keep to 1-2 sentences

---

## Accessibility

- **Headings**: Proper hierarchy (h3 → h4 → h5)
- **Video**: Accessible play button with aria-label
- **Lists**: Semantic `<ul>` with `<li>` elements
- **Icons**: Decorative (aria-hidden) or with labels
- **Contrast**: All text meets WCAG AA

---

## Refactoring Recommendation

### Current State
- Education panels are inline in each page file
- Duplicated code across 20+ pages
- Inconsistent styling and structure

### Recommended Refactor
Create reusable component:

```tsx
// components/ui/EducationPanel.tsx
interface EducationPanelProps {
  whyWeNeedThis: string;
  videoTitle: string;
  videoDuration: string;
  videoUrl?: string;
  details?: string[];
  tip?: string;
  resourceTitle?: string;
  resourceUrl?: string;
}

export function EducationPanel({ ... }: EducationPanelProps) {
  // Render standard structure
}
```

**Benefits**:
- Single source of truth
- Easy to update styling globally
- Consistent structure enforced
- Reduced code duplication

---

## Related Components
- Video player (placeholder → real player)
- Download button
- Info boxes (tips, notes)
- Sticky positioning utilities

---

_Pattern Type: Education / Help_  
_Status: Needs standardization and component extraction_  
_Last Updated: December 2025_

