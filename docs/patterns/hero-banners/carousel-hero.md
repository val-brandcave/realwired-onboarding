# Carousel Hero Banner

**Type**: Customer Flow Component  
**Used In**: Products Tab (`app/hub/page.tsx`)  
**Location**: `app/hub/_components/ProductHeroCarousel.tsx`

---

## Visual Structure

```
╔═══════════════════════════════════════════════════════════════╗
║                  🎯 Discover Our Products                     ║
║                                                                ║
║   Explore additional solutions to enhance your workflow       ║
║                                                                ║
║   ● ○ ○ ○  (carousel indicators)                             ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Anatomy

```
╔════════════════════════════════════════════════════════╗
║              Gradient Background Container             ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │  [Icon]  Title Text                              │ ║
║  │          Subtitle/Description                    │ ║
║  │                                                  │ ║
║  │  ● ○ ○ ○ (Dots - current/inactive)             │ ║
║  └──────────────────────────────────────────────────┘ ║
╚════════════════════════════════════════════════════════╝
```

---

## Slide Structure

### Each Slide Contains
- **Icon**: Optional (emoji or SVG, centered, large)
- **Title**: Bold heading (text-2xl or text-3xl)
- **Description**: Subtitle text (text-base or text-lg)
- **Background**: Gradient (unique per slide or theme-based)

### Example Slides

**Slide 1: AI Review Forms**
```
    🤖
Discover AI-Powered Review Forms
Automate quality checks with intelligent review assistance
```

**Slide 2: Reporting Microservice**
```
    📊
Advanced Reporting & Analytics
Real-time insights for better decision making
```

**Slide 3: Coming Soon**
```
    🚀
More Products Coming Soon
Stay tuned for exciting new features
```

---

## Carousel Controls

### Indicator Dots
```
● ○ ○ ○
```
- **Active**: Filled circle, brand color
- **Inactive**: Hollow circle, gray
- **Size**: 8px (w-2 h-2)
- **Spacing**: 8px gap between dots
- **Position**: Bottom center of carousel
- **Interactive**: Click to jump to slide

### Auto-play
- **Interval**: 4-5 seconds per slide
- **Direction**: Left to right (slides advance)
- **Loop**: Yes (returns to first after last)
- **Pause**: On hover (optional)

---

## Styling Specifications

### Container
- Padding: 48px vertical, 24px horizontal (py-12 px-6)
- Border-radius: 16px (rounded-2xl) or 12px (rounded-xl)
- Min-height: 280px - 320px
- Background: Gradient (varies by theme)

### Gradient Examples
- **Brand theme**: `from-red-50 via-white to-red-50`
- **Blue theme**: `from-blue-50 via-white to-blue-50`
- **Purple theme**: `from-purple-50 via-white to-purple-50`

### Text Alignment
- All content: Centered
- Icon: Above text
- Title: Below icon
- Description: Below title
- Dots: Bottom of container

### Typography
- **Title**: text-2xl md:text-3xl, font-bold, slate-900
- **Description**: text-base md:text-lg, slate-600
- **Icon**: text-4xl or w-12 h-12 (if SVG)

---

## Animation

### Slide Transition
- Type: Fade or slide (horizontal)
- Duration: 300-500ms
- Easing: Ease-in-out
- Direction: Left to right

### Indicator Transition
- Dot fill: Smooth color transition
- Active dot: May scale slightly (1.1x)

---

## Responsive Behavior

- **Desktop**: Full carousel with large text
- **Tablet**: Adjust text sizes (md breakpoint)
- **Mobile**: Smaller padding, smaller text, dots remain visible

---

## Accessibility

- **Carousel**: role="region", aria-label="Product carousel"
- **Slides**: aria-live="polite" for screen readers
- **Controls**: Keyboard arrows to navigate (optional)
- **Pause**: Respects prefers-reduced-motion
- **Indicators**: Accessible buttons with labels ("Go to slide 1")

---

## Usage Context

### Products Tab
- Showcases product highlights
- Auto-rotates through featured items
- Draws attention to product catalog below
- Sets tone for discovery experience

### Content Principles
- Keep slides concise (1 sentence description)
- Use emojis or icons for visual interest
- Maintain consistent slide height
- Limit to 3-5 slides total

---

## Related Components
- `ProductHeroCarousel.tsx` - Main carousel component
- Product cards (appear below carousel)
- Product detail modals

---

_Pattern Type: Hero / Banner_  
_Last Updated: December 2025_

