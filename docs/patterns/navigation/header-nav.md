# Header Navigation Component

**Type**: Shared Component  
**Used In**: Customer Flow (All module pages), CS Flow (CS Portal)  
**Location**: `components/layout/MainLayout.tsx`

---

## Visual Structure

```
┌────────────────────────────────────────────────────────────────┐
│  [Logo] YouConnect                    [🔔 2]  [👤 JS ▼]      │
│  Onboarding Portal                                             │
└────────────────────────────────────────────────────────────────┘
```

---

## Anatomy

```
╔═══════════════════════════════════════════════════════════════╗
║ Left Section          |           Right Section               ║
║ ┌──────────────┐      |    ┌──────┐  ┌─────────────────┐    ║
║ │ [Logo Icon]  │      |    │ Bell │  │ Avatar  Name  ▼ │    ║
║ │ Title        │      |    │  +   │  │ Email           │    ║
║ │ Subtitle     │      |    │ Badge│  │ Role            │    ║
║ └──────────────┘      |    └──────┘  └─────────────────┘    ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Variants

### Customer Flow Header
**Logo Section**:
- RealWired logo (48px × 48px)
- Title: "YouConnect" (lg font, bold)
- Subtitle: "Onboarding Portal" (xs font, muted)

**Right Section**:
- Notification bell with badge count
- User profile dropdown (avatar, name, email)

### CS Flow Header  
**Logo Section**: Same as customer

**Right Section**:
- Notification bell (CS-specific notifications)
- User profile (CS agent info: "Samuel Kite", "CS Agent")

---

## Properties/Configuration

### Notification Bell
- **Badge**: Unread count (red circle, white text)
- **States**: Has notifications (badge visible), No notifications (no badge)
- **Action**: Opens notification slide-out panel

### Profile Dropdown
- **Avatar**: Circular, gradient background, initials (2 letters)
- **Avatar Colors**: 
  - Customer: `#9F2E2B` (brand red)
  - CS: `#3B82F6` to `#2563EB` (blue gradient)
- **Dropdown Content**:
  - User info section (avatar, name, email)
  - Menu items (Settings)
  - Sign Out (red text, separated by border)

---

## Behavior

### Notification Panel
**Trigger**: Click bell icon  
**Type**: Slide-out from right (384px width)  
**Backdrop**: Semi-transparent overlay (black/30)  
**Content**:
- Header: "Notifications" + unread count
- "Mark all read" action
- Notification list (grouped by type)
- Icons by type: Ticket (amber), Completion (green), Progress (blue)

### Profile Dropdown
**Trigger**: Click profile button  
**Type**: Dropdown menu (256px width)  
**Position**: Right-aligned below button  
**Content**: User card + menu items + sign out

---

## Styling Specifications

### Container
- Background: White
- Border: Bottom border (1px, slate-200)
- Shadow: Small elevation shadow
- Height: 64px (16 = 4rem)
- Sticky: Yes (top-0, z-50)

### Logo Section
- Gap: 12px between logo and text
- Logo size: 48px × 48px
- Title: text-lg, font-bold, slate-900
- Subtitle: text-xs, slate-500

### Notification Bell
- Icon: 24px × 24px
- Padding: 8px (p-2)
- Hover: slate-100 background
- Badge: 20px circle, top-right positioned

### Profile Avatar
- Size: 36px × 36px (9 = 2.25rem)
- Border-radius: Full circle
- Font: text-sm, font-semibold
- Shadow: Small shadow

---

## States

### Default
- Clean, minimal appearance
- Notifications badge visible if unread count > 0
- Profile dropdown closed

### Notification Panel Open
- Backdrop overlay visible
- Panel slides in from right
- Bell icon highlighted

### Profile Dropdown Open
- Dropdown visible
- Backdrop overlay
- Down arrow rotated 180°

---

## Accessibility

- **Notification button**: aria-label with unread count
- **Profile button**: aria-label="User menu"
- **Dropdown**: Focus trap, ESC to close
- **Keyboard**: Tab navigation through all interactive elements

---

## Usage Examples

### Customer Onboarding
- Used on: Hub, all module pages
- User: John Smith (Onboarding Participant)
- Avatar color: Brand red (#9F2E2B)

### CS Portal
- Used on: CS Portal dashboard, client edit pages
- User: Samuel Kite (CS Agent)  
- Avatar color: Blue gradient

---

## Related Components
- `UserProfileDropdown.tsx` - Profile menu component
- `Notification` slide-out panel (in MainLayout)
- `Breadcrumbs` (appears below header)
- `ProgressBar` (appears below header on module pages)

---

_Pattern Type: App Shell / Navigation_  
_Last Updated: December 2025_

