# YouConnect Discovery - Sync Up (December 19, 2025)

- **Date**: December 19, 2025
- **Duration**: 31 minutes
- **Recording**: https://fathom.video/share/Mssoc1CYtxzK3atbgUrYcMHXJvk6xP-X
- **Participants**: Edward Kruger (Realwired), Sunda Scanlon (Realwired), Val Vinnakota (Brandcave)

---

## Purpose

Sync-up call to review current implementation progress, discuss property/request templates approach, and clarify client vs CS portal architecture decisions.

---

## 🎯 Key Decisions Made

### 1. ❌ **Property Templates Approach REJECTED**
**Decision**: Remove property template selector - NOT viable for YouConnect

**Rationale** (Sunda, 7:27):
> "We have one property record and it's a format that has to be used no matter what. You can't have different templates. One property record has to service all facilities at the bank."

**Why This Matters**:
- Every bank uses the SAME base property record
- Cannot have different templates for residential vs commercial
- The current standard template IS the starting point
- Banks customize by adding/removing fields, not choosing templates
- Template selector would confuse clients

**Action Required**: 
- ❌ Remove `/definitions/properties/templates` page
- ✅ Keep ONE standard property record configuration
- ✅ Show preview of standard template, allow customization
- ✅ Change wording from "Choose Template" to "Modify Property Record Template"

---

### 2. ✅ **Preview Mode Should Show Pre-Populated Data**
**Decision**: Fill preview fields with sample data, not empty states

**Ed's Directive** (16:46):
> "Pre-populate with some data so people could just see it in action. If you leave it blank, they feel like 'oh, I'm not quite sure if I like this.' Let's remove those empty states and seed it."

**Why This Matters**:
- Empty forms create anxiety
- Users need to see HOW it works, not just structure
- Pre-populated data creates instant association
- Reduces uncertainty

**Action Required**:
- ✅ Seed property preview with realistic sample data (123 Main St, Chicago, IL, etc.)
- ✅ Seed request preview with realistic sample data (loan amounts, dates, etc.)
- ✅ Show data in action, not empty text boxes

---

### 3. 🔀 **Preview → Edit: Fork in the Road**
**Decision**: Move "Edit Configuration" button to bottom footer (where Continue button is)

**Ed's Directive** (16:46):
> "Let's move the edit configuration button to the continue, which is static, because that way we know you've got one of two choices. You're either editing this thing or you're continuing. The fork of the road is here."

**Why This Matters**:
- Users shouldn't have to scroll up to find edit button
- Clear decision point: "I like this" OR "I want to edit"
- Consistent with rest of flow (footer navigation)

**Action Required**:
- ❌ Remove "Edit Configuration" button from top of preview
- ✅ Add "Edit Configuration" button to sticky footer alongside "Continue"
- ✅ Make it clear this is a decision point

---

### 4. 📝 **Request Form: Section-by-Section Progression**
**Decision**: Break request form edit into sections that match actual form flow

**Sunda's Explanation** (17:47):
> "Instead of going through the whole form, present one section at a time. First section is request info, then contact access info section, then bid panel section, then review info. Going in the flow of the form."

**Sections**:
1. **Request Info** - Core request fields
2. **Contact Access Info** - Contact details
3. **Bid/Engagement Panel** - Vendor bid configuration
4. **Review Info** - Review workflow fields

**Why This Matters**:
- Matches actual workflow progression
- Each section gets its own video walkthrough
- Reduces cognitive load
- Users can say "OK, nothing to do on contact access, next section"

**Action Required**:
- ✅ Split request form edit into 4 distinct sections
- ✅ Show progress through sections (like property overview → advanced)
- ✅ Each section has "Continue to Next Section" button
- ⚠️ Don't use tabs (users shouldn't skip sections)
- ✅ Add section progress indicator
- ✅ Allow preview at any time to see full picture

---

### 5. 🏗️ **Architecture: Two Separate Apps**
**Decision**: CS Portal and Client Onboarding will be TWO separate codebases

**Ed's Confirmation** (5:03):
> "It's going to be two separate things."

**Why This Matters**:
- Different user bases, different permissions
- CS agents need different features than clients
- Allows independent deployment
- Cleaner separation of concerns

**Action Required**:
- ✅ For demo, keep combined (current state is fine)
- 📋 Before handoff, split into two repositories
- 📋 Document the split for InnoStacks team

---

### 6. 📐 **Navigation During Edit: Lose Context Problem**
**Problem Identified** (Ed, 22:15):
> "When you are so focused on the context session that you lose the context of what you did earlier. If you took a break halfway through, I wouldn't want someone to lose the thread."

**Solution Discussion**:
- Ed: Don't want users to lose sight of overall progress
- Sunda: "Hit preview and it shows you what you have so far"
- Val: Breadcrumbs should help, but needs more clarity

**Action Required**:
- ✅ Add clear section progress indicator during edit
- ✅ Allow "Preview" at any point to see full form
- ✅ Use breadcrumbs to show location
- ⚠️ Val to explore patterns that balance section focus vs overall context

---

## 📋 Action Items

### For Val/Brandcave

#### High Priority (Before Next Review)
1. ✅ **Remove Property Templates Page**
   - Delete `/definitions/properties/templates/page.tsx`
   - Update redirect to go straight to preview with standard template
   - Change wording: "Modify Your Property Record Template"

2. ✅ **Pre-Populate Preview Data**
   - Add realistic sample data to property preview
   - Add realistic sample data to request preview
   - Remove all empty states from preview mode

3. ✅ **Move Edit Button to Footer**
   - Remove "Edit Configuration" from top of preview
   - Add to sticky footer alongside "Continue"
   - Make it a clear fork: Edit or Continue

4. ✅ **Request Form: Section-by-Section**
   - Split into 4 sections (Request Info, Contact Access, Bid Panel, Review Info)
   - Add section progress indicator
   - "Continue to Next Section" navigation
   - Allow preview at any time

5. ✅ **Navigation Clarity During Edit**
   - Explore patterns for section progress
   - Add preview capability mid-edit
   - Better breadcrumbs/context indicators

#### Medium Priority
6. 📋 **General Settings Module**
   - Implement with current knowledge
   - Wait for Missy's doc (arriving in January)
   - Iterate when new info arrives

7. 📋 **Pattern Documentation**
   - Continue building reusable component docs
   - Document modules, feedback, forms, hero banners
   - Prepare for handoff package

8. 📋 **Design Refinement**
   - Work with Cody on UX/UI polish
   - Functional requirements are done, now refine visual design
   - Coming in next couple weeks

### For Realwired (Ed/Sunda)
1. 📋 **General Settings Documentation**
   - Sunda to get latest doc from Missy
   - Email to Val when available
   - Expected in January (team out for holidays)

2. 📋 **CS Team Testing**
   - Sunda to identify less technical CS team members
   - Test new flows to find stuck points
   - Provide feedback after Val implements changes

---

## 🚨 Critical Callouts

### **Sunda's Biggest Concern: Property Templates**
**Quote** (7:27):
> "This would make them think [they can have different templates]. We cannot have a property record template choice for a quick setup."

**Missy's Reaction**:
> "What do you mean property templates? What's a property template? That's going to make everybody think they can have a different one for different property types."

**Resolution**: Complete removal of template concept for properties. One standard starting point only.

---

### **Ed's Biggest Concern: Losing Context**
**Quote** (22:15):
> "What I'm just thinking out loud is that button at the bottom navigates me section for section. I'm not going to know that intuitively. When you are so focused on one section, you lose the context of what you did earlier."

**Resolution**: Val to explore patterns that maintain overall context while allowing section-by-section focus.

---

### **Sunda's UX Philosophy**
**Quote** (25:33):
> "We just want to make sure... we don't want to make it so intuitive that there's no instruction needed. The client is looking for the best business practice, which you can't show in here. It depends on what their scenario is. We can discuss that on the videos we make."

**Key Insight**: Don't over-optimize for "no instructions needed" - videos will provide business context that UI cannot.

---

## 💬 Key Quotes & Context

### On Property Configuration Time
**Ed** (11:28): "How much time do we normally spend on this page?"  
**Sunda** (11:40): "It takes me maybe 15 minutes to go through it with a client. In that same amount of time, I'm adding fields, removing fields, having people add or remove required fields."

**Insight**: Property configuration is already fast (15 min). Templates won't speed it up - might slow it down.

---

### On Template Confusion
**Sunda** (12:08):
> "Giving them a couple of choices on the property itself is really going to just muddy the water. They're not going to know which one to start from. No matter what template they chose, they're going to be adjusting it."

---

### On Request Form Flow
**Sunda** (17:47):
> "Going in the flow of the form makes sense to them because that's the way the work flows as well. They have the property information, now they're giving the request info, now contact info, now bid info, then review info."

---

### On Videos & Education
**Sunda** (14:06):
> "Every one of these sections is going to have a video that's going to introduce them to what they're about to do. They're going to see the property screen in Uconnect. You're going to be able to edit these fields, change these, make these required. And now you can go configure your property record."

---

### On Testing Philosophy
**Sunda** (16:11):
> "This is not a final [configuration]. It is your best guess of your setup that you want. And then once you test, if we need to add fields or remove fields, we're happy to do so. It's the initial configuration."

**Insight**: Emphasize that first configuration is iterative, not final.

---

## 📊 What's Working Well

### ✅ Authentication Screens
- Sign in flow for customer access (link-based, not signup)
- Org SSO option for returning customers
- CS team separate auth (will be different app)
- Ed/Sunda approved approach

### ✅ Hub Enhancements
- Products tab with "Talk to Sales" (previously "Express Interest")
- Ticket management system
- CS team profiles and activity tracking
- Meeting scheduler

### ✅ System Field Indicators
**Sunda** (29:14):
> "I love every time there's some changes because you can really see, okay, these are system fields. I love that. They can't change those."

### ✅ Pattern Documentation Progress
- Breaking down into modules, feedback, forms, hero banners
- Ed/Sunda excited about handoff package

---

## 🎯 User Testing Plans

**Sunda's Approach** (24:30):
> "I know the people in CS I can put on it that are a little less technical. I'll take my least knowledgeables, but they still understand the general system. If I take the more technicals, they're going to be able to go through it no matter what because we have the technical brain."

**Testing Strategy**:
- Use less technical CS team members
- See where they get stuck
- More technical users will figure it out regardless of UX
- Real test is with users who need clear guidance

---

## 🔄 What Changed from Previous Understanding

| Previous Assumption | New Reality |
|-------------------|-------------|
| Property templates with 4 options (Residential, Commercial, Full-Service, Blank) | **ONE standard property record only** - no templates |
| Request templates similar to property | **Section-by-section progression** matching form flow |
| Edit button at top of preview | **Edit button in footer** (fork in the road) |
| Empty preview forms | **Pre-populated with sample data** |
| Combined app for demo and production | **Two separate apps** (but demo can stay combined) |
| Full request form at once | **4 distinct sections** (Request Info, Contact Access, Bid Panel, Review Info) |

---

## 🚀 Next Steps Summary

### Immediate (This Week)
1. Remove property templates page and concept
2. Pre-populate preview with sample data
3. Move edit button to footer
4. Change property wording to "Modify" not "Choose"

### Short-Term (Next 2 Weeks)
5. Implement request form section-by-section flow
6. Add section progress indicators
7. Improve navigation clarity during edit
8. Work with Cody on design refinement

### Medium-Term (January)
9. Receive General Settings doc from Missy
10. Implement General Settings module
11. CS team testing with less technical users
12. Iterate based on feedback

---

## 📅 Timeline & Availability

**Holiday Schedule**:
- Most Realwired team out next two weeks
- Ed available for quick calls
- Work picks back up in January

**Val's Plan**:
- Implement General Settings with current knowledge
- Can iterate when Missy's doc arrives in January
- Continue pattern documentation for handoff

---

## ❓ Open Questions

1. **Request Form Sections**: Should preview show all 4 sections at once, or section-by-section preview?
2. **Section Navigation**: Exact pattern for maintaining context while focusing on individual sections?
3. **General Settings Structure**: Waiting for Missy's doc - what's the final structure?
4. **CS Team Testing Timeline**: When will Sunda's less technical team be available for testing?

---

## 📝 Notes for Implementation

### Property Record Flow (New)
```
1. User sees "Modify Your Property Record Template"
2. Preview page shows ONE standard template with SAMPLE DATA
3. Footer has two options:
   - "Edit Configuration" → Goes to field editor
   - "Continue" → Accepts as-is, moves to request types
4. No template selector, no confusion
```

### Request Form Flow (New)
```
1. Preview shows ALL sections with sample data
2. Footer: "Edit Configuration" or "Continue"
3. If Edit:
   - Section 1: Request Info (edit fields)
   - Section 2: Contact Access Info (edit fields)
   - Section 3: Bid/Engagement Panel (edit fields)
   - Section 4: Review Info (edit fields)
4. "Preview" button available anytime to see full form
5. Clear progress: "Section 2 of 4: Contact Access Info"
```

---

## 🎉 Wins & Positive Feedback

- ✅ System field indicators are clear and helpful
- ✅ Authentication approach makes sense
- ✅ Hub enhancements are well-received
- ✅ Pattern documentation is valuable
- ✅ Overall progress is strong

---

**Status**: Alignment call complete - clear action items identified  
**Next Review**: After Val implements changes (likely January)  
**Risk Level**: Low - clear direction, good alignment

---

_Last Updated: December 19, 2025_  
_Next Milestone: Property template removal & preview data seeding_

