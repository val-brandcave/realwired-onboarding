# ✅ CS Portal - At-Risk Clients Accordion

**Page**: `/cs-portal`  
**URL**: http://localhost:3000/cs-portal  
**Feature**: At-Risk Clients collapsible accordion  
**Status**: ✅ Implemented!

---

## 🎯 What Changed

### **BEFORE** (Always Expanded):
```
┌────────────────────────────────────────────────┐
│ ⚠️ At-Risk Clients (3 need attention)         │
├────────────────────────────────────────────────┤
│ Bank Name  │ Days Behind │ Stuck Module │ ... │
│────────────┼─────────────┼──────────────┼─────│
│ Client 1   │ 12d         │ Org Setup    │ ... │
│ Client 2   │ 8d          │ Properties   │ ... │
│ Client 3   │ 5d          │ Request Form │ ... │
└────────────────────────────────────────────────┘

❌ Always visible
❌ Takes up space even when not needed
❌ Can't collapse to focus on other sections
```

### **AFTER** (Collapsible Accordion): ✅
```
COLLAPSED STATE (Default):
┌────────────────────────────────────────────────┐
│ ⚠️ At-Risk Clients [3] need attention   [▼]  │
│                   3 behind schedule            │
└────────────────────────────────────────────────┘
↑ Clean, compact header showing count
↑ Click anywhere to expand

EXPANDED STATE (On Click):
┌────────────────────────────────────────────────┐
│ ⚠️ At-Risk Clients [3] need attention   [▲]  │
├────────────────────────────────────────────────┤
│ Bank Name  │ Days Behind │ Stuck Module │ ... │
│────────────┼─────────────┼──────────────┼─────│
│ Client 1   │ 12d         │ Org Setup    │ ... │
│ Client 2   │ 8d          │ Properties   │ ... │
│ Client 3   │ 5d          │ Request Form │ ... │
└────────────────────────────────────────────────┘
↑ Full table visible
↑ Click header to collapse
```

---

## 🎨 Visual Design

### **Collapsed State**:
```
┌──────────────────────────────────────────────────────────┐
│  ⚠️  At-Risk Clients  [3]  need attention     [▼]       │
│                      3 behind schedule                   │
└──────────────────────────────────────────────────────────┘

Elements visible:
✅ Warning icon (⚠️)
✅ Title "At-Risk Clients"
✅ Count badge (red circle with white number)
✅ "need attention" text
✅ Status badge "3 behind schedule" (right side)
✅ Chevron down arrow (▼)

Interactions:
- Hover → Background changes to lighter red
- Click anywhere → Expands to show table
```

### **Expanded State**:
```
┌──────────────────────────────────────────────────────────┐
│  ⚠️  At-Risk Clients  [3]  need attention     [▲]       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Bank Name         Days  Stuck     Progress   CS  Action│
│                    Behind Module                Owner    │
│  ──────────────────────────────────────────────────────  │
│  Union Bank        12d   Org Setup   35%     SK  Review →│
│  Metro Financial    8d   Properties  25%     SK  Review →│
│  Heritage Savings   5d   Requests    45%     SK  Review →│
│  ... (up to 7 clients shown)                            │
│                                                          │
└──────────────────────────────────────────────────────────┘

Elements visible:
✅ Same header (with chevron up ▲)
✅ Full data table
✅ All at-risk client details
✅ Action buttons

Interactions:
- Click header → Collapses back
- Chevron rotates 180° (smooth transition)
```

---

## 🛠️ Implementation Details

### **State Management**:
```typescript
const [isAtRiskExpanded, setIsAtRiskExpanded] = useState(false);
```
- Default: `false` (collapsed)
- Toggle on header click

### **Header Button**:
```typescript
<button
  onClick={() => setIsAtRiskExpanded(!isAtRiskExpanded)}
  className="w-full border-b px-6 py-4 bg-red-50 hover:bg-red-100"
>
  {/* Header content */}
  {/* Chevron rotates based on state */}
</button>
```

### **Conditional Rendering**:
```typescript
{isAtRiskExpanded && (
  <div className="overflow-x-auto">
    <table>
      {/* Table content */}
    </table>
  </div>
)}
```

### **Visual Indicators**:
- **Count Badge**: Red circle with white number
- **Status Badge**: "X behind schedule" (only when collapsed)
- **Chevron Icon**: Rotates 180° with smooth transition
- **Hover Effect**: Background lightens on header hover

---

## ✅ Features

### **When Collapsed**:
- ✅ Shows warning icon
- ✅ Shows title "At-Risk Clients"
- ✅ Shows count in red badge (e.g., [3])
- ✅ Shows "need attention" text
- ✅ Shows status summary "X behind schedule"
- ✅ Shows chevron down (▼)
- ✅ Takes minimal space
- ✅ Hover effect (background lightens)
- ✅ Click to expand

### **When Expanded**:
- ✅ Shows same header with chevron up (▲)
- ✅ Hides status badge (info now in table)
- ✅ Shows full data table
- ✅ Shows up to 7 at-risk clients
- ✅ All table columns visible:
  - Bank Name
  - Days Behind
  - Stuck Module
  - Completion Progress
  - CS Owner
  - Action button
- ✅ Click header to collapse

### **Transitions**:
- ✅ Smooth chevron rotation (180°)
- ✅ Instant table show/hide
- ✅ Hover effects on header
- ✅ Visual feedback on interaction

---

## 🔍 How to Test

### **Test 1: Initial State**
```bash
1. Go to: http://localhost:3000/cs-portal
2. Scroll down past the metrics cards
3. See "At-Risk Clients" section COLLAPSED
4. Should show:
   - Red background header
   - Count badge (e.g., "3")
   - "3 behind schedule" badge
   - Chevron pointing down
```

### **Test 2: Expand Accordion**
```bash
1. Click anywhere on the At-Risk header
2. Table should expand smoothly
3. Chevron rotates to point up
4. Status badge disappears
5. Full table with 7 at-risk clients visible
```

### **Test 3: Collapse Accordion**
```bash
1. Click header again
2. Table collapses
3. Chevron rotates back down
4. Status badge reappears
5. Back to compact state
```

### **Test 4: Hover Effects**
```bash
1. Hover over collapsed header
2. Background should lighten (red-50 → red-100)
3. Cursor changes to pointer
4. Indicates it's clickable
```

---

## 💡 Benefits

### **UX Improvements**:
✅ **Cleaner dashboard** - Less visual clutter  
✅ **Better focus** - Collapse when not needed  
✅ **Quick overview** - Count visible at a glance  
✅ **Easy access** - One click to see details  
✅ **Professional** - Follows best practices for dashboards  

### **Information Hierarchy**:
✅ **Summary first** - See count without expanding  
✅ **Details on demand** - Expand when you need specifics  
✅ **Clear interaction** - Hover and chevron indicate expandability  

---

## 📊 Comparison

### **Dashboard Real Estate**:

**Before**:
- At-Risk section: ~400px height (always)
- Total above-fold content: Cramped
- Scroll required: Yes

**After**:
- At-Risk section collapsed: ~80px height
- At-Risk section expanded: ~400px height
- Total above-fold content: Spacious
- Scroll required: Only if expanded
- **Space saved**: 320px when collapsed

---

## 🎨 Visual States

### **State 1: Collapsed (Default)**
```
┌────────────────────────────────────────────────────────────┐
│ ⚠️ At-Risk Clients   [3]   need attention      ▼         │
│                     3 behind schedule                      │
└────────────────────────────────────────────────────────────┘
```

### **State 2: Collapsed + Hover**
```
┌────────────────────────────────────────────────────────────┐
│ ⚠️ At-Risk Clients   [3]   need attention      ▼         │
│                     3 behind schedule                      │
└────────────────────────────────────────────────────────────┘
  ↑ Background slightly lighter (hover effect)
  ↑ Cursor: pointer
```

### **State 3: Expanded**
```
┌────────────────────────────────────────────────────────────┐
│ ⚠️ At-Risk Clients   [3]   need attention      ▲         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Bank Name          Days Behind  Stuck Module    ...      │
│  ────────────────────────────────────────────────────────  │
│  Union Bank             12d      Org Setup       ...      │
│  Metro Financial         8d      Properties      ...      │
│  Heritage Savings        5d      Requests        ...      │
│  ... (4 more clients)                                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🚀 What to See Now

**Navigate to**: http://localhost:3000/cs-portal

**You should see**:

1. ✅ **Metrics cards** at top (4 cards)
2. ✅ **At-Risk Clients** collapsed accordion (red header)
3. ✅ **Count badge** showing number of at-risk clients
4. ✅ **Status summary** "X behind schedule"
5. ✅ **Chevron down** indicating expandable
6. ✅ **Charts side-by-side** below
7. ✅ **All Clients table** at bottom

**Click the At-Risk header** to see:
- Table expands smoothly
- Chevron rotates up
- All at-risk client details visible

---

## ✨ Additional Enhancements

### **Smart Defaults**:
- Collapsed by default (cleaner dashboard)
- Count always visible (quick reference)
- One-click access to details

### **Visual Feedback**:
- Hover effect on header
- Smooth chevron rotation
- Color-coded (red for "at-risk")
- Badge count prominent

### **Accessibility**:
- Button is keyboard accessible
- Chevron indicates state
- Clear labeling
- Focus states work

---

## 🎊 Result

**The CS Portal dashboard is now cleaner and more professional!**

✅ **Collapsed by default** - Less clutter  
✅ **Count visible** - Quick overview  
✅ **One click** - See full details  
✅ **Smooth transitions** - Professional feel  
✅ **Best practices** - Follows dashboard UX patterns  

---

**Refresh http://localhost:3000/cs-portal and test the accordion!** 🎨

