# Module Completion Dates - Quick Start Guide

## 🎯 What This Feature Does

Allows CS Agents to set and track target completion dates for each onboarding module, helping ensure the client completes all modules before the go-live date.

---

## 🚀 Quick Access

### Where to Find It
1. Navigate to CS Agent Portal → Client List
2. Click "Edit" on any client (e.g., Union Bank)
3. Look at the **left sidebar** under "Onboarding Modules"

### What You'll See

```
📍 Location: Left Sidebar
├─ Overall Progress Donut (Top)
│  └─ Shows 65% completion (4 of 7 modules)
│
└─ Onboarding Modules List
   ├─ 🏢 Organization Setup    [🟢28] 📅
   │  └─ Target: Dec 1, 2025
   │
   ├─ 📋 Definitions           [🟢28] 📅
   │  └─ Target: Dec 8, 2025
   │
   ├─ 👥 Users Setup           [🟢28] 📅
   │  └─ Target: Dec 15, 2025
   │
   └─ ... more modules ...
```

---

## 📅 How to Set a Target Date

### Step 1: Click the Calendar Icon
Find a module and click the **📅 calendar icon** next to the progress donut

### Step 2: Modal Opens
You'll see a modal dialog with:
- Module name and icon
- Current go-live date (for context)
- Previously set date (if any)
- Date picker field

### Step 3: Select a Date
Click the date input field and pick a target completion date

### Step 4: Check for Warnings
If your date is within 7 days of go-live, you'll see a **red warning** ⚠️
- The system recommends moving the date earlier

### Step 5: Save
Click **"Set Target Date"** button (red button at bottom)

### Result
The modal closes and the target date appears below the module in the sidebar

---

## 🎨 Understanding the Visual Indicators

### Progress Donuts (0-100%)

| Color | Percentage | Meaning |
|-------|-----------|---------|
| 🟢 Green | ≥80% | Complete or almost done |
| 🟡 Amber | 50-79% | Well underway |
| 🟠 Orange | 25-49% | Just started |
| ⚪ Gray | 0% | Not started |

**Example:**
- Organization Setup [🟢] = 100% complete
- Vendors Setup [🟠] = 75% complete

### Target Date Badges

| Style | Meaning | Action |
|-------|---------|--------|
| 🔵 Blue Badge | On track | ✓ No action needed |
| 🔴 Red Badge ⚠️ | At risk | ⚡ Consider earlier date |

**Example:**
```
Target: Dec 1, 2025          (Blue - All good)
Target: Dec 29, 2025 ⚠️       (Red - Less than 7 days before go-live)
```

---

## ⚡ Quick Tips

### Tip 1: Set Dates Early
Set target dates as soon as you onboard the client to establish realistic expectations.

### Tip 2: Watch for At-Risk Dates
Red badges with ⚠️ indicate modules that are too close to go-live. Adjust them earlier if possible.

### Tip 3: Use Progress Context
The modal shows current module progress (%), helping you set realistic dates based on completion level.

### Tip 4: Reference Go-Live
The modal always shows the overall go-live date so you can make informed decisions about module dates.

### Tip 5: One Module at a Time
Click each module's 📅 to set its date independently. Dates don't have to be sequential.

---

## 📊 Sample Timeline (Pre-populated)

Here's what the sample data shows:

```
Overall Progress: 65% (3 of 7 modules completed)
Go-Live Date: February 12, 2026

Module Timeline:
┌─────────────────────────────────────────────────────────────────┐
│ Module                    Progress    Target Date    Status     │
├─────────────────────────────────────────────────────────────────┤
│ 1. Organization Setup      ✓ 100%     Dec 1, 2025   ✓ Done     │
│ 2. Definitions             ✓ 100%     Dec 8, 2025   ✓ Done     │
│ 3. Users Setup             ✓ 100%     Dec 15, 2025  ✓ Done     │
│ 4. Vendors Setup            75%       Dec 22, 2025  In Progress│
│ 5. Routing                  50%       Dec 29, 2025  ⚠️ At Risk │
│ 6. General Settings         25%       Jan 5, 2026   Just Start │
│ 7. IT Readiness             0%        Feb 12, 2026  Not Start  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Workflow Examples

### Scenario 1: Initial Onboarding
1. Client just signed up
2. Set all module target dates (stagger them)
3. Dates now visible in sidebar for team reference
4. Team can monitor progress against targets

### Scenario 2: Behind Schedule
1. Notice module showing red ⚠️ at-risk badge
2. Click 📅 to open modal
3. See current progress is lower than expected
4. Move target date earlier to reflect reality
5. Alert client to accelerate work

### Scenario 3: Ahead of Schedule
1. Module marked as 100% complete
2. Click 📅 to open modal
3. Move date earlier to celebrate wins
4. Adjust downstream modules' dates if needed

---

## ❓ FAQ

### Q: Can I change a date after setting it?
**A:** Yes! Click the 📅 again and select a new date. The previous date appears so you know what you're changing.

### Q: What happens if I set a date after go-live?
**A:** You can, but the system will show it as at-risk. The modal encourages you to choose an earlier date.

### Q: Do the dates save permanently?
**A:** Currently, dates are saved during your session. For permanent storage, they would need to be saved to the backend database.

### Q: Can I set the same date for multiple modules?
**A:** Yes! Each module is independent. You can set any dates you want.

### Q: What's the "at-risk" threshold?
**A:** Any module target date less than 7 days before go-live is marked as at-risk. This gives a buffer for IT checks and final QA.

### Q: How is module progress calculated?
**A:** Each module has steps (e.g., 4 steps total). Progress = (completed steps / total steps) × 100%

---

## 🎯 Best Practices

### ✅ DO

- ✅ Set target dates for all modules upfront
- ✅ Review dates with client during kickoff call
- ✅ Adjust dates if client progress changes
- ✅ Monitor at-risk (red) dates weekly
- ✅ Share timeline with client and internal team

### ❌ DON'T

- ❌ Set dates too close together (no buffer)
- ❌ Ignore at-risk warnings
- ❌ Set all modules to same date
- ❌ Forget to update dates if timeline changes
- ❌ Set unrealistic dates for slow-moving modules

---

## 🔗 Related Features

### Overall Progress Donut (Top of Sidebar)
Shows aggregate completion (0-100%) across all modules

### Progress Donuts Next to Modules
Each module shows its individual completion percentage (28px)

### Projected Go-Live Date Banner
Shows overall go-live date prominently at top of main content area

---

## 📱 Mobile Experience

The feature is fully responsive:
- **Mobile**: Modal takes full width with 16px margins
- **Tablet**: Modal centered with 90% width
- **Desktop**: Standard modal sizing

All interactive elements are touch-friendly.

---

## 🐛 Troubleshooting

### Issue: Calendar icon not clickable
**Solution:** Make sure you're on the edit-client page. Try refreshing the page.

### Issue: Modal doesn't open
**Solution:** Check browser console for errors. Try a different browser.

### Issue: Date not saving
**Solution:** Click "Set Target Date" button (not Enter key). Check for validation errors.

### Issue: Dates showing incorrectly
**Solution:** Check your browser's timezone settings. Dates should be in YYYY-MM-DD format in the picker.

---

## 📚 Documentation Files

For more detailed information:
- `MODULE-COMPLETION-DATES.md` - Full feature documentation
- `VISUAL-MOCKUP-MODULE-DATES.md` - UI mockups and design specs
- `IMPLEMENTATION-SUMMARY.md` - Technical implementation details

---

## 🎓 Training Checklist

Before rolling out to team:

- [ ] Read this Quick Start Guide
- [ ] Log into CS Portal and try setting a date
- [ ] Review the sample data and understand the timeline
- [ ] Try clicking 📅 on different modules
- [ ] Understand the at-risk indicator
- [ ] Test on mobile/tablet if applicable
- [ ] Review best practices above
- [ ] Ask questions before go-live

---

## ✨ Key Takeaways

1. **Location**: Calendar icons (📅) next to each module in left sidebar
2. **Action**: Click to open date picker modal
3. **Purpose**: Set realistic target dates for each module
4. **Benefit**: Better planning and timeline management
5. **Visual**: Target dates shown as badges below modules
6. **Warning**: Red badge ⚠️ if date is too close to go-live

---

**Ready to use?** Navigate to a client in the CS Portal and click a 📅 to get started! 🚀


