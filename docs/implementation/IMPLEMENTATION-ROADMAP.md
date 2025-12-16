# 🗺️ Implementation Roadmap: Digital Onboarding Enhancement

**Goal**: Add missing fields and features to match/exceed Excel workbook functionality  
**Timeline**: 8-10 weeks to full feature parity  
**Current State**: Strong foundation with 40% of features complete

---

## 📊 Current State Assessment

### ✅ What's Already Built (40% complete)

1. **Core Infrastructure** ✅
   - 7-module onboarding flow
   - React Context state management
   - Drag-and-drop field builder
   - 2-column layout system
   - Field settings drawer
   - CS Agent portal
   - Progress tracking
   - Target dates feature

2. **Property Configuration** ✅ (25% complete)
   - Visual field builder
   - 15 fields configured (need 43 more)
   - Basic field types
   - Enable/disable/required toggles
   - Custom labels
   - Add custom fields

3. **Request Configuration** ✅ (12% complete)
   - Visual field builder
   - 20 fields configured (need 136 more)
   - Same builder capabilities as Property

4. **Supporting Features** ✅
   - Users module (template-driven)
   - Vendors module (template-driven)
   - Routing setup (3 priority levels)
   - General Settings
   - IT Checklist

---

## 🎯 Implementation Phases

### **PHASE 1: Core Fields Addition** (Weeks 1-3)
*Goal: Add all missing fields to Property and Request records*

#### Week 1: Property Record Fields
- [ ] Add 7 Primary Property Info fields
  - Portfolio (text)
  - Portfolio Description (textarea)
- [ ] Add 23 Property Overview fields
  - Assigned Area (value picker)
  - Bank (read-only)
  - Lot #, Block, Subdivision, STR (text fields)
  - Site/Excess/Building Unit of Measure dropdowns
  - Excess Land field
  - Number of Tenants (number)
  - Owner (text)
  - Property Status (dropdown)
  - Reg B trigger fields (2x)
  - Property Comments (textarea - required)
  - Active (read-only boolean)
  - Photo (file upload)
  - Lat/Long (auto fields)
- [ ] Update field type support for new types needed
- [ ] Add dropdown values for new fields

**Deliverable**: Property Record with 58 fields total

#### Week 2: Request Info Panel Fields
- [ ] Add 12 System Fields (auto-generated)
  - File Number, Project Number, Request/Workflow/Assignment Status
  - Property link, Ordered By, Job Manager, Original JM
  - Date Accepted, Escalation Date, Submitted Date
- [ ] Add 30 Configurable Fields
  - Portfolio, Ordering Choices, LO Notifications Copy
  - Date Needed, Projected Close Date
  - Loan #, Prior Loan #, Risk Rating/Grade
  - Prior Appraisal Date/Value (auto-populate)
  - Billing/Branch Code, GL Acct, Lending Group
  - Payment Method, Prepayment Proof
  - Intended Use/User field templates
  - SBA fields (with conditional logic)
  - Syndication fields (with conditional logic)
  - HPML, Request Comments, JM Notifications Copy
- [ ] Add 6 Hold/Cancel Fields
- [ ] Implement conditional field logic (basic)

**Deliverable**: Request Info Panel with 54 fields

#### Week 3: Additional Request Panels
- [ ] Add Contact/Access Info Panel (17 fields)
  - Marketing Status, Listing Agent/Phone, List/Sale Price/Date
  - Contact fields (Type, Name, Phone, Email, Phone 2)
  - Alternate Contact fields (same structure)
- [ ] Add initial Bid/Engagement Panel fields (17 fields)
  - Delivery dates, Rush Job indicator
  - Residential Forms, Report Format, Market Analysis Level
  - General Vendor Docs, Approach To Value
  - Inspection Requirements
  - Bid/Engagement Comments, Bid Request Preview

**Deliverable**: 3 panels configured (88 fields total)

---

### **PHASE 2: Advanced Panels & Organization** (Weeks 4-5)

#### Week 4: Report Submission & Review Panels
- [ ] Add Report Submission Panel (26 fields)
  - File uploads (Report, Invoice, Vendor Misc 1-6)
  - Value fields (As Is, Stabilized, Completed with dates)
  - Dates (Ordered, Confirmation, Cancelled, Received)
  - Vendor fields (Name, Fee Quote, Partial Fee)
  - Engagement Letter Preview
- [ ] Add Request Review Panel Part 1 (20 fields)
  - Date fields (Assigned, Start, Due, Completion)
  - Review uploads (Form, Invoice, Reviewer Misc 1-6)
  - Review Type, Review Action, Reviewer
  - Fee fields (Review Fee, Management Fee)

**Deliverable**: 5 panels total, 134 fields

#### Week 5: Complete Review Panel & Panel System
- [ ] Add Request Review Panel Part 2 (22 fields)
  - Value fields (Internal, Reviewed As Is/Completed/Stabilized)
  - Financial fields (Tax Assessed Value, Cap Rate, NOI)
  - Risk dropdown, Vendor Grade
  - Review Approval workflow fields
  - Cancel Review Reason, Request Completion Date
- [ ] Implement panel-based UI
  - Tabbed interface for Request Form config
  - Panel selector (5 tabs)
  - Panel-level field stats
  - Panel-level enable/disable all
- [ ] Update context to support panels

**Deliverable**: Complete 5-panel system with 156+ fields

---

### **PHASE 3: Field Templates & Conditional Logic** (Weeks 6-7)

#### Week 6: Field Templates Implementation
- [ ] Design field template data structure
- [ ] Create Field Templates builder page
  - Template list view
  - Template creation modal
  - Option/content editor
  - Template preview
- [ ] Add `fieldtemplate` field type
- [ ] Implement template rendering in form preview
- [ ] Add default templates:
  - Multiple Building Description (Property)
  - Intended Use of Request
  - Intended User of Request
  - Scope of Work
  - Occupancy
- [ ] Update Property/Request builders to support templates

**Deliverable**: Working field templates system

#### Week 7: Conditional Logic & Dependencies
- [ ] Design conditional logic data structure
- [ ] Create conditional logic builder UI
  - Parent field selector
  - Operator selector (equals, contains, etc.)
  - Value input
  - Child fields selector
- [ ] Implement conditional field visibility
  - Show/hide logic in form preview
  - Dependency tracking
- [ ] Add conditional logic to required fields:
  - SBA Involvement → Involvement Type → Local Lending Partner
  - Syndication → Is Bank Agent → Agent Bank
- [ ] Test conditional logic in live preview

**Deliverable**: Working conditional logic system

---

### **PHASE 4: Bid Panel & Dropdown Management** (Week 8)

#### Bid Panel Configuration (2 days)
- [ ] Design Bid Panel configuration page
- [ ] Create layout selector UI (Options 1-4)
- [ ] Implement Value Scenario structures:
  - Option 1: 3-column table
  - Option 2: 4-column table
  - Option 3: Checkboxes
  - Option 4: Individual dropdowns
- [ ] Add preview for each option
- [ ] Update Request Form builder to respect selected option

#### Dropdown Values Manager (3 days)
- [ ] Create centralized dropdown management page
- [ ] Add all 27 dropdown configurations:
  - Request Purpose (20+ values)
  - Ordering Choices (4)
  - Loan Type, Payment Method, SBA Types
  - Marketing Status, Contact Types
  - Forms, Report Formats, Market Analysis
  - Value premises/qualifiers/interests
  - Inspection, Review Types/Actions
  - Vendor Grades
- [ ] Bulk add/edit/delete functionality
- [ ] Import/export dropdown values (CSV)
- [ ] Link dropdowns to fields automatically

**Deliverable**: Complete Bid Panel + Dropdown Manager

---

### **PHASE 5: Automation & Polish** (Weeks 9-10)

#### Week 9: Auto-Population & Reg B
- [ ] Implement auto-population rules:
  - ZIP → City, State, County (with lookup service)
  - LO selection → Billing Code, GL Acct, Lending Group
  - Property selection → Prior Appraisal Date/Value
  - Portfolio linking
- [ ] Create Reg B Configuration page
  - Enable/disable Reg B notifications
  - Configure trigger conditions
  - Set notification recipients
  - Configure timing (initial/completion)
  - Reg B Administrator workflow
- [ ] Test Reg B logic end-to-end

#### Week 10: Documentation & Final Polish
- [ ] Create in-app help content
  - Field descriptions
  - Video walkthroughs
  - Best practices guides
- [ ] Add field library/presets
  - Basic Residential preset
  - Full Residential preset
  - Commercial Standard preset
  - Environmental preset
- [ ] Implement bulk operations
  - Enable/disable multiple fields
  - Copy configurations
  - Export/import JSON
- [ ] Add configuration summary page
  - Fields enabled count
  - Required fields list
  - Conditional logic summary
  - Panel-level stats
- [ ] Enhanced preview mode
  - Role-based views (LO, JM, Vendor, Reviewer)
  - Sample data population
  - Conditional logic demonstration
- [ ] Final QA and bug fixes

**Deliverable**: Production-ready platform

---

## 📦 Deliverables by Phase

| Phase | Duration | Key Deliverables | Completion % |
|-------|----------|------------------|--------------|
| **Phase 1** | 3 weeks | 156+ fields added | 60% |
| **Phase 2** | 2 weeks | 5-panel system | 75% |
| **Phase 3** | 2 weeks | Templates & logic | 85% |
| **Phase 4** | 1 week | Bid Panel + Dropdowns | 95% |
| **Phase 5** | 2 weeks | Automation + Polish | 100% |

---

## 🛠️ Technical Implementation Details

### Data Structure Updates

#### 1. Enhanced PropertyRecordField
```typescript
interface PropertyRecordField {
  // ... existing fields ...
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea' | 
        'date' | 'file' | 'readonly' | 'link' | 'email' | 'tel' | 
        'fieldtemplate' | 'valuepicker' | 'multientry';  // NEW TYPES
  autoPopulate?: {
    sourceField: string;
    transform?: string;
  };
  conditional?: {
    showWhen: {
      fieldId: string;
      operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
      value: string | number;
    };
  };
  templateOptions?: {
    name: string;
    content: string;
  }[];
  multiEntryConfig?: {
    addButtonLabel: string;
    maxEntries?: number;
  };
}
```

#### 2. Enhanced RequestFormField
```typescript
interface RequestFormField {
  // ... existing fields ...
  panel: 'request-info' | 'contact-access' | 'bid-engagement' | 
         'report-submission' | 'request-review';
  visibleToRoles?: ('loan-officer' | 'job-manager' | 'vendor' | 'reviewer')[];
  availableAtRequestCreation?: boolean;
  // ... same enhancements as PropertyRecordField ...
}
```

#### 3. New BidPanelConfiguration
```typescript
interface BidPanelConfiguration {
  selectedLayout: 'option1' | 'option2' | 'option3' | 'option4';
  option1Config?: {
    // 3-column table config
    columns: ['premise', 'interest', 'comments'];
    premiseValues: string[];
    interestValues: string[];
  };
  option2Config?: {
    // 4-column table config
    columns: ['premise', 'qualifier', 'interest', 'comments'];
    premiseValues: string[];
    qualifierValues: string[];
    interestValues: string[];
  };
  option3Config?: {
    // Checkboxes config
    checkboxOptions: string[];
  };
  option4Config?: {
    // Individual dropdowns config
    asIsValues: string[];
    retrospectiveValues: string[];
    prospectiveCompletionValues: string[];
    prospectiveStabilizationValues: string[];
    leasedFeeTemplate?: FieldTemplate;
  };
}
```

#### 4. New FieldTemplate
```typescript
interface FieldTemplate {
  id: string;
  name: string;
  usedIn: 'property' | 'request';
  options: {
    name: string;
    content: string;
    isDefault?: boolean;
  }[];
}
```

#### 5. New AutoPopulationRule
```typescript
interface AutoPopulationRule {
  id: string;
  name: string;
  enabled: boolean;
  sourceField: string;
  targetFields: string[];
  transform?: (value: any) => any;
  dataSource?: 'user-profile' | 'order-history' | 'external-api';
}
```

#### 6. New RegBConfiguration
```typescript
interface RegBConfiguration {
  enabled: boolean;
  trigger1FieldId: string; // "Is there a 1-4 family residential dwelling?"
  trigger2FieldId: string; // "Is this a first mortgage on property?"
  initialSubmission: {
    enabled: boolean;
    recipients: string[];
    includeLoanOfficer: boolean;
  };
  completion: {
    enabled: boolean;
    timing: 'request-complete' | 'review-complete';
    recipients: string[];
  };
  administrator?: {
    enabled: boolean;
    userId: string;
    timing: 'review-complete' | 'request-complete';
  };
}
```

### New Components to Build

1. **FieldTemplateBuilder.tsx** - Create/edit field templates
2. **ConditionalLogicBuilder.tsx** - Visual conditional logic editor
3. **BidPanelConfigurator.tsx** - Layout selector with previews
4. **DropdownValuesManager.tsx** - Centralized dropdown management
5. **AutoPopulationManager.tsx** - Configure auto-population rules
6. **RegBConfigurator.tsx** - Reg B compliance configuration
7. **PanelTabs.tsx** - Tabbed interface for Request Form panels
8. **FieldLibrary.tsx** - Searchable field library with presets
9. **ConfigurationSummary.tsx** - Overview of all configurations
10. **RoleBasedPreview.tsx** - Preview form as different roles

### New Routes to Add

```
/definitions/property-record/configure        (enhance existing)
/definitions/request-form/configure           (enhance existing)
/definitions/field-templates                  (new)
/definitions/conditional-logic                (new)
/definitions/bid-panel                        (new)
/definitions/dropdown-values                  (new)
/automation/auto-population                   (new)
/automation/reg-b                             (new)
/definitions/field-library                    (new)
/definitions/configuration-summary            (new)
```

---

## 🧪 Testing Strategy

### Phase 1 Testing
- [ ] All 58 Property fields render correctly
- [ ] All field types display properly
- [ ] Drag-and-drop works for new fields
- [ ] Field settings drawer supports new field types
- [ ] Required/optional toggles work
- [ ] Live preview shows all fields

### Phase 2 Testing
- [ ] Panel tabs work correctly
- [ ] Fields organize into correct panels
- [ ] Panel-level operations work
- [ ] Navigation between panels
- [ ] All 156+ fields accessible

### Phase 3 Testing
- [ ] Field templates create/edit/delete
- [ ] Template options add/remove
- [ ] Templates render in preview
- [ ] Conditional logic shows/hides fields
- [ ] Nested conditionals work
- [ ] No circular dependencies

### Phase 4 Testing
- [ ] Bid Panel layout selector works
- [ ] All 4 options render correctly
- [ ] Layout changes reflect in preview
- [ ] Dropdown manager CRUD operations
- [ ] Bulk operations work
- [ ] Import/export functions

### Phase 5 Testing
- [ ] Auto-population triggers correctly
- [ ] ZIP lookup returns accurate data
- [ ] LO selection populates fields
- [ ] Reg B triggers fire correctly
- [ ] Reg B emails send properly
- [ ] Role-based preview works
- [ ] Configuration export/import works

---

## 📊 Success Metrics

### Quantitative
- [ ] **Field Coverage**: 100% (156+ Request fields, 58 Property fields)
- [ ] **Configuration Time**: ≤40 minutes per record type
- [ ] **CS Agent Time**: ≤12 hours per client onboarding
- [ ] **Client Time**: ≤21 hours per onboarding
- [ ] **Rework Rate**: <10% during UAT
- [ ] **Call Reduction**: 60% fewer synchronous calls
- [ ] **Time to First Value**: ≤2 weeks (from 4+ weeks)

### Qualitative
- [ ] **Client Satisfaction**: "Easy to use" rating ≥4.5/5
- [ ] **CS Agent Satisfaction**: "Saves time" rating ≥4.5/5
- [ ] **Error Rate**: "Fewer mistakes" rating ≥4.5/5
- [ ] **Visual Quality**: "Professional appearance" rating ≥4.5/5
- [ ] **Feature Completeness**: "Has everything we need" rating ≥4.5/5

---

## 🚀 Quick Start Checklist

### Week 1 - Day 1
- [ ] Review this roadmap with team
- [ ] Set up project tracking (GitHub issues/Jira)
- [ ] Create mockups for new components
- [ ] Review data structure changes
- [ ] Plan API changes (if backend needed)

### Week 1 - Day 2-3
- [ ] Start adding Property fields
- [ ] Update PropertyRecordField interface
- [ ] Add new field types support
- [ ] Test drag-and-drop with new fields

### Week 1 - Day 4-5
- [ ] Continue Property fields
- [ ] Add dropdown values
- [ ] Update field preview component
- [ ] Test all Property fields

### Week 2 - Day 1-5
- [ ] Add Request Info Panel fields
- [ ] Implement basic conditional logic
- [ ] Test conditional fields
- [ ] Add auto-generated system fields

... (continue for all phases)

---

## 💡 Pro Tips

1. **Start Small**: Implement one field type at a time, test thoroughly
2. **Use Sample Data**: Create realistic sample data for testing
3. **Test Continuously**: Don't wait until the end to test
4. **Document As You Go**: Update docs with each new feature
5. **Get Feedback Early**: Show work-in-progress to stakeholders
6. **Reuse Components**: Leverage existing builders where possible
7. **Think Mobile**: Test on different screen sizes throughout
8. **Performance**: Monitor render times with 156+ fields
9. **Accessibility**: Maintain WCAG AA compliance
10. **Version Control**: Use feature branches for each phase

---

## 🎯 Priority Order

If you need to deliver incrementally, prioritize in this order:

### P0 (Must Have - Week 1-3)
1. Property Record fields (all 58)
2. Request Info Panel fields (54)
3. Contact/Access Panel (17)

### P1 (Should Have - Week 4-5)
4. Report Submission Panel (26)
5. Request Review Panel (42)
6. Panel-based UI

### P2 (Nice to Have - Week 6-7)
7. Field Templates
8. Conditional Logic
9. Bid Panel Configuration

### P3 (Future Enhancement - Week 8-10)
10. Dropdown Values Manager
11. Auto-Population
12. Reg B Configuration
13. Field Library/Presets
14. Advanced Preview

---

## 📞 Support & Questions

**Technical Questions**: Review existing code in:
- `lib/onboarding-context.tsx` - State management
- `app/definitions/properties/configure/page.tsx` - Property builder
- `app/definitions/request-form/configure/page.tsx` - Request builder
- `components/property-config/` - Builder components

**Design Questions**: Reference:
- `ONBOARDING-ANALYSIS-AND-RECOMMENDATIONS.md` - Detailed specs
- `ONBOARDING-VISUAL-COMPARISON.md` - Visual examples
- Excel workbooks in `documents/Onboarding Workbooks/`

---

**Ready to start? Let's build! 🚀**

