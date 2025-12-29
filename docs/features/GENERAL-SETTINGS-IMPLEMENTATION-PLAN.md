# General Settings Module - Implementation Plan

**Date**: December 23, 2025  
**Source**: General Settings Customer-Facing Workbook + Onboarding Workshop Materials  
**Status**: Ready for implementation

---

## 📋 Overview

General Settings are system-wide configuration options that enable/disable functionalities within YouConnect. This module is part of the **Basic Configurations** phase in the onboarding workflow.

**From Workbook**:
> "General Settings are various system settings that enable or disable certain functionalities within YouConnect."

---

## 🎯 Module Position in Onboarding Flow

Based on `Workbook Ownership.csv`:

| Step | Phase | Timing | Owner |
|------|-------|--------|-------|
| **General Settings Reminder & Bank Set Up** | Basic Configurations | Week 4 (11/28) | Zach/Missie |
| **General Settings and Bank Setup Enter** | Basic Configurations | Week 4 (11/28) | Zach |

**Context in Flow**:
- Comes AFTER: Request Type, Property Record, Workflow Timers, Document Types, Reject Reasons
- Comes BEFORE: JM Routing, Review Forms, Vendor Letters
- Part of "Basic Configuration Review Call" milestone

---

## 📊 Settings Categories & Structure

### **Organized by User Impact**

The General Settings workbook contains **36 distinct settings** organized into logical groups:

### 1️⃣ **Default Filters & Views** (4 settings)
Controls what users see by default when they log in

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Default Filters - "Not Submitted" Orders | Toggle | Disabled | JM/Bank Admin default view |
| Default "My Items" for Bank Admins | Toggle | Disabled | Filter scope on login |
| Department Filters on Searches | Toggle | Disabled | Department-based filtering |
| Add JM/LO Notification Copy to "My Items" | Toggle | Enabled (rec) | See requests where copied |

---

### 2️⃣ **Property & Data Configuration** (2 settings)
Property record and data structure options

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Parcel Number Format (State + County fields) | Toggle | Disabled | Additional parcel fields |
| Additional Vendor Fee in Quotes | Toggle | N/A | System fee in vendor quotes |

---

### 3️⃣ **Workflow & Editing Permissions** (3 settings)
Who can edit what and when

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Enable Edit for "On Hold" Requests | Dropdown | Disabled / JM Only / JM+BA | Edit locked requests |
| Forbid Edit to LOs after JM Accepts | Toggle | Enabled (rec) | Lock request/property after acceptance |
| Enable Review Approval | Toggle | N/A | Request review before completion |

---

### 4️⃣ **Dates & Notifications** (2 settings)
Date fields and notification triggers

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Estimated Total Completion Date | Toggle | N/A | Auto-calculated completion date + email |
| Review Due Date - Require at Acceptance | Toggle | Enabled (rec) | Force due date entry |

---

### 5️⃣ **Loan Officer Visibility** (5 settings)
What LOs can see and when

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Always Show Report Panels to LOs | Toggle | Disabled | Show reports before completion |
| Always Show Bid/Engagement Panels to LOs | Toggle | N/A | LO sees bid panel |
| Always Show Bank Documents to LOs | Toggle | Disabled | LO sees internal docs |
| Allow LOs to act as Job Managers | Dropdown | Disabled / Selected Types | LO as JM for certain requests |
| Allow LOs to Clone Requests | Toggle | Disabled | LO can clone existing requests |

---

### 6️⃣ **Loan Officer Bid Selection** (3 settings)
LO bid approval workflow

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Enable LO Bid Selection | Toggle | Enabled (rec) | JM sends bids to LO for approval |
| Auto-Check "Display to LOs" | Toggle | Unchecked | Bids visible to LO by default |
| Require Prepayment Proof | Toggle | N/A | Upload required at bid selection |

---

### 7️⃣ **Default Field Population** (1 setting)
Auto-populate behavior

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Default Loan Officer to Ordered By | Toggle | Disabled (rec) | Auto-populate LO field |

---

### 8️⃣ **Request List View - All Users** (1 setting)
What shows in the 'i' popup on Requests tab

| Setting | Type | Options | Impact |
|---------|------|---------|--------|
| 'i' Additional Details Popup | Multi-select | Vendor Fee, Review Fee, Mgmt Fee, System Fee, Total | Fee visibility for all users |

---

### 9️⃣ **Request List View - LO Specific** (1 setting)
Additional LO-specific controls for 'i' popup

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Hide Engaged Vendor/Reviewer from LOs | Multi-select | N/A | Hide vendor/reviewer names from LOs |

---

### 🔟 **Field Configuration for Loan Officers** (7 settings)
Granular field visibility for LOs

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Show Value As Is to LOs | Toggle | N/A | LO sees appraised value |
| Show Vendor Bid Response Panel | Toggle | N/A | LO sees VBR panel |
| Show Vendor Grades | Toggle | N/A | LO sees vendor ratings |
| Show Fee Quote | Toggle | N/A | LO sees fee quotes |
| Show Total Fee | Toggle | N/A | LO sees total fees |
| Show View Summary Link | Toggle | N/A | LO sees summary link |
| Show Fee Breakdown / Hide Mgmt Fee | Toggle | N/A | Fee breakdown visibility |

---

### 1️⃣1️⃣ **Vendor Webform Options** (5 settings)
What vendors see when submitting bids

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Show Request Documents on Bid Solicitation | Toggle | Enabled (rec) | Vendor sees docs at bid time |
| Default "Display to Vendor - Solicitation" | Toggle | Disabled (rec) | Auto-check solicitation visibility |
| Default "Display to Vendor - Engagement" | Toggle | N/A | Auto-check engagement visibility |
| Allow Vendors to Upload in Comments | Toggle | N/A | Vendor can attach files to comments |
| Allow LOs to "Select" Documents from Requests | Toggle | N/A | LO can copy docs between requests |

---

### 1️⃣2️⃣ **Reviewer Webform Options** (4 settings)
What reviewers see on webforms

| Setting | Type | Options | Impact |
|---------|------|---------|--------|
| Show Bank Documents - Internal Reviewers | Toggle | N/A | Internal reviewer sees bank docs |
| Show Bank Documents - External Reviewers | Toggle | N/A | External reviewer sees bank docs |
| Show Request Documents - Internal Reviewers | Toggle | N/A | Internal reviewer sees request docs |
| Show Request Documents - External Reviewers | Toggle | N/A | External reviewer sees request docs |

---

### 1️⃣3️⃣ **Session Security** (4 settings)
Session timeout configuration

| Setting | Type | Default | Impact |
|---------|------|---------|--------|
| Enable Session Timer | Toggle | Enabled (rec ~30min) | Force logout after inactivity |
| Inactivity Duration | Number | 30 minutes | Time until logout |
| Enable Warning Popup | Toggle | Optional | Show warning before logout |
| Warning Time Remaining | Number | 5 minutes | When to show first warning |
| Enable Secondary Warning | Toggle | Optional | Show final warning |
| Secondary Warning Time | Number | 1 minute | When to show final warning |

---

## 🎨 UI/UX Design Recommendations

### **Page Structure**

```
┌─────────────────────────────────────────────────────┐
│  BREADCRUMBS: Home > General Settings               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [VIDEO PLACEHOLDER]                                │
│  "Watch: General Settings Overview (3:45)"          │
│                                                     │
│  General Settings                                   │
│  Configure system-wide settings that control        │
│  functionality and visibility across YouConnect.    │
│                                                     │
│  ⚠️ These are your initial configurations and can   │
│     be adjusted during testing.                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📋 PROGRESS: 3 of 13 sections complete             │
│  [████████░░░░░░░░░░░] 23%                          │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ACCORDION LAYOUT                                   │
│                                                     │
│  ▼ 1. Default Filters & Views                       │
│     [Settings expanded with toggles/dropdowns]      │
│                                                     │
│  ▶ 2. Property & Data Configuration                 │
│                                                     │
│  ▶ 3. Workflow & Editing Permissions                │
│                                                     │
│  ...etc                                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [Save Draft]         [< Back]  [Save & Continue >] │
└─────────────────────────────────────────────────────┘
```

---

### **Individual Setting Component**

Each setting should use this pattern:

```tsx
<div className="setting-item">
  {/* Setting Header */}
  <div className="setting-header">
    <div className="setting-title-group">
      <h4 className="setting-title">Enable Review Approval</h4>
      {hasRecommendation && (
        <span className="badge badge-recommendation">
          Recommended: Enable
        </span>
      )}
    </div>
    
    {/* Control (Toggle, Dropdown, Input, etc.) */}
    <Toggle value={value} onChange={handleChange} />
  </div>

  {/* Description */}
  <p className="setting-description">
    Review Approval allows a Job Manager or Reviewer to send a 
    request for review to another JM/Reviewer prior to completing 
    the order. This is an optional step in the workflow.
  </p>

  {/* Additional Info (if applicable) */}
  {additionalInfo && (
    <div className="setting-info">
      <InfoIcon />
      <span>{additionalInfo}</span>
    </div>
  )}

  {/* Conditional Fields */}
  {showConditional && (
    <div className="setting-conditional">
      {/* Sub-settings appear here */}
    </div>
  )}
</div>
```

---

### **Accordion Pattern**

Use collapsible accordions to group related settings:

```tsx
<Accordion defaultExpanded={['filters', 'workflow']}>
  <AccordionItem id="filters" title="Default Filters & Views" count={4}>
    {/* 4 settings here */}
  </AccordionItem>
  
  <AccordionItem id="property" title="Property & Data Configuration" count={2}>
    {/* 2 settings here */}
  </AccordionItem>
  
  <AccordionItem id="workflow" title="Workflow & Editing Permissions" count={3}>
    {/* 3 settings here */}
  </AccordionItem>
</Accordion>
```

**Benefits**:
- Reduces cognitive load (see 3-4 settings at once, not 36)
- Clear categorization
- Easy to navigate with progress tracking
- Collapses completed sections

---

## 🔧 Implementation Steps

### **Phase 1: Data Structure** (1-2 hours)

**File**: `lib/onboarding-context.tsx`

Add to state interface:

```typescript
interface GeneralSettings {
  // Default Filters & Views
  showNotSubmittedByDefault: boolean;
  myItemsDefaultForBankAdmins: boolean;
  enableDepartmentFilters: boolean;
  addNotificationCopyToMyItems: boolean;
  
  // Property & Data
  enableParcelStateCounty: boolean;
  includeSystemFeeInVendorQuotes: boolean;
  
  // Workflow & Editing
  enableEditOnHold: 'disabled' | 'jm_only' | 'jm_and_ba';
  forbidLOEditAfterAcceptance: boolean;
  enableReviewApproval: boolean;
  
  // Dates & Notifications
  enableEstimatedCompletionDate: boolean;
  requireReviewDueDateAtAcceptance: boolean;
  
  // LO Visibility
  alwaysShowReportPanelsToLOs: boolean;
  alwaysShowBidPanelsToLOs: boolean;
  alwaysShowBankDocsToLOs: boolean;
  allowLOsActAsJM: 'disabled' | 'selected_types';
  allowLOsToClone: boolean;
  
  // LO Bid Selection
  enableLOBidSelection: boolean;
  autoCheckDisplayToLOs: boolean;
  requirePrepaymentProof: boolean;
  
  // Default Population
  defaultLOToOrderedBy: boolean;
  
  // Request List View
  additionalDetailsPopup: string[]; // ['vendorFee', 'reviewFee', 'mgmtFee', etc.]
  hideEngagedFromLOs: string[]; // ['vendor', 'reviewer']
  
  // LO Field Visibility
  loCanSeeValueAsIs: boolean;
  loCanSeeVBRPanel: boolean;
  loCanSeeVendorGrades: boolean;
  loCanSeeFeeQuote: boolean;
  loCanSeeTotalFee: boolean;
  loCanSeeViewSummary: boolean;
  showFeeBreakdown: boolean;
  hideMgmtFeeInBreakdown: boolean;
  
  // Vendor Webform
  showRequestDocsOnSolicitation: boolean;
  defaultDisplayToVendorSolicitation: boolean;
  defaultDisplayToVendorEngagement: boolean;
  allowVendorUploadInComments: boolean;
  allowLOSelectDocs: boolean;
  
  // Reviewer Webform
  showBankDocsInternalReviewer: boolean;
  showBankDocsExternalReviewer: boolean;
  showRequestDocsInternalReviewer: boolean;
  showRequestDocsExternalReviewer: boolean;
  
  // Session Security
  enableSessionTimer: boolean;
  sessionTimeoutMinutes: number;
  enableWarningPopup: boolean;
  warningTimeMinutes: number;
  enableSecondaryWarning: boolean;
  secondaryWarningTimeMinutes: number;
}

interface OnboardingState {
  // ... existing state
  generalSettings: GeneralSettings;
}
```

---

### **Phase 2: Page Component** (3-4 hours)

**File**: `app/general-settings/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { Accordion } from "@/components/ui/Accordion";
import { Toggle } from "@/components/ui/Toggle";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";

export default function GeneralSettingsPage() {
  const router = useRouter();
  const { state, updateGeneralSettings } = useOnboarding();
  const [settings, setSettings] = useState(state.generalSettings);

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateGeneralSettings(settings);
    router.push('/general-settings/complete');
  };

  return (
    <MainLayout
      title="General Settings"
      breadcrumbs={[
        { label: "Home", href: "/hub" },
        { label: "General Settings" }
      ]}
      footerNav={{
        previousLabel: "Back",
        onPrevious: () => router.back(),
        nextLabel: "Save & Continue",
        onNext: handleSave
      }}
    >
      {/* Video Placeholder */}
      <div className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <PlayIcon className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">
                Watch: General Settings Overview
              </h3>
              <p className="text-sm text-gray-600">
                3:45 - Learn what each setting controls
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          General Settings
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Configure system-wide settings that control functionality and 
          visibility across YouConnect.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex gap-3">
            <InfoIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              These are your initial configurations and can be adjusted 
              during testing. We recommend starting with the recommended 
              settings and customizing based on your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <ProgressBar completed={3} total={13} />

      {/* Accordion Sections */}
      <Accordion defaultExpanded={['filters']}>
        <AccordionItem id="filters" title="Default Filters & Views" count={4}>
          <SettingItem
            title="Show 'Not Submitted' Orders by Default"
            description="By default, the system displays 'Submitted' and 'In Progress' orders. Enable this to also show 'Not Submitted' orders for Job Managers and Bank Admins."
            additionalInfo="Only applies to orders created within YouConnect (no Glances)"
            control={
              <Toggle
                value={settings.showNotSubmittedByDefault}
                onChange={(val) => handleChange('showNotSubmittedByDefault', val)}
              />
            }
          />
          
          {/* Other 3 settings in this section */}
        </AccordionItem>

        {/* Repeat for all 13 sections */}
      </Accordion>
    </MainLayout>
  );
}
```

---

### **Phase 3: Specialized Components** (2-3 hours)

**File**: `components/general-settings/SettingItem.tsx`

```tsx
interface SettingItemProps {
  title: string;
  description: string;
  additionalInfo?: string;
  recommendation?: string;
  control: React.ReactNode;
  conditionalContent?: React.ReactNode;
  showConditional?: boolean;
}

export function SettingItem({
  title,
  description,
  additionalInfo,
  recommendation,
  control,
  conditionalContent,
  showConditional
}: SettingItemProps) {
  return (
    <div className="setting-item border-b border-gray-200 py-6 last:border-b-0">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-base font-semibold text-gray-900">
              {title}
            </h4>
            {recommendation && (
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                Recommended: {recommendation}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex-shrink-0">{control}</div>
      </div>

      {additionalInfo && (
        <div className="flex gap-2 items-start bg-blue-50 border border-blue-200 rounded p-3 mb-3">
          <InfoIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">{additionalInfo}</p>
        </div>
      )}

      {showConditional && conditionalContent && (
        <div className="ml-6 mt-4 pl-4 border-l-2 border-gray-300">
          {conditionalContent}
        </div>
      )}
    </div>
  );
}
```

---

### **Phase 4: Progress Tracking** (1 hour)

Track section completion:

```typescript
const getSectionCompletion = (settings: GeneralSettings) => {
  const sections = [
    {
      id: 'filters',
      fields: ['showNotSubmittedByDefault', 'myItemsDefaultForBankAdmins', /*...*/]
    },
    // ... other sections
  ];

  let completed = 0;
  sections.forEach(section => {
    const allSet = section.fields.every(field => 
      settings[field] !== undefined && settings[field] !== null
    );
    if (allSet) completed++;
  });

  return { completed, total: sections.length };
};
```

---

## 📝 Copy & Microcopy Guidelines

### **Page-Level Copy**

**Title**: "General Settings"  
**Subtitle**: "Configure system-wide settings that control functionality and visibility across YouConnect."

**Info Banner**:
> ⚠️ These are your initial configurations and can be adjusted during testing. We recommend starting with the recommended settings and customizing based on your needs.

---

### **Section Titles**

Use clear, benefit-oriented titles:

- ✅ "Default Filters & Views" (not "Filter Settings")
- ✅ "Workflow & Editing Permissions" (not "Edit Permissions")
- ✅ "Loan Officer Visibility" (not "LO Settings")
- ✅ "Session Security" (not "Session Timers")

---

### **Setting Descriptions**

Follow this pattern:

1. **What it does** (1 sentence)
2. **Why it matters** (1 sentence)
3. **Recommendation** (if applicable)

**Example**:
> **Enable Review Approval**  
> Allows a Job Manager or Reviewer to request review from another JM/Reviewer before completing an order. This is an optional step that adds a quality check layer. **Recommended: Enable if you have multiple reviewers.**

---

### **Recommendation Badges**

Use color-coded badges:

- 🟢 **Recommended: Enable** (green)
- 🔴 **Recommended: Disable** (red)
- 🟡 **Optional** (yellow)
- ⚪ **Bank-Specific** (gray)

---

## 🎥 Video Walkthrough Plan

Based on onboarding workshop materials, each section should have:

### **Main Video** (3-5 minutes)
- Overview of General Settings purpose
- How settings affect workflow
- Best practices

### **Section Videos** (30-60 seconds each)
- One video per accordion section
- Show setting in action in YouConnect
- Explain when to enable/disable

### **Video Placement**

```tsx
<div className="video-container">
  <button onClick={openVideoModal} className="video-trigger">
    <PlayIcon />
    <span>Watch: {sectionTitle} ({duration})</span>
  </button>
</div>
```

---

## 🚨 Warnings & Edge Cases

### **Conditional Dependencies**

Some settings depend on others:

1. **Prepayment Proof** requires **LO Bid Selection** to be enabled
2. **Auto-Check Display to LOs** only works if **LO Bid Selection** is enabled
3. **Session Warning Popup** requires **Session Timer** to be enabled

**UI Treatment**:
```tsx
{!settings.enableLOBidSelection && (
  <div className="opacity-50 pointer-events-none">
    <SettingItem
      title="Require Prepayment Proof"
      description="..."
      control={<Toggle disabled />}
    />
    <p className="text-sm text-gray-500 italic mt-2">
      ℹ️ This setting requires "Enable LO Bid Selection" to be enabled first.
    </p>
  </div>
)}
```

---

### **Conflicting Settings**

Warn users about conflicts:

**Example**: If "Forbid Edit to LOs after Acceptance" is enabled but "Enable Edit for On Hold" includes LOs:

```tsx
<div className="bg-yellow-50 border border-yellow-400 rounded p-3">
  <div className="flex gap-2">
    <AlertIcon className="text-yellow-600" />
    <div>
      <p className="text-sm font-medium text-yellow-900">
        Potential Conflict Detected
      </p>
      <p className="text-sm text-yellow-800">
        You've forbidden LOs from editing after acceptance, but enabled 
        editing for on-hold requests. Consider which behavior takes priority.
      </p>
    </div>
  </div>
</div>
```

---

## 📱 Mobile Responsiveness

### **Accordion Behavior**
- Only one section expanded at a time on mobile
- Larger tap targets (min 44x44px)
- Sticky section header when scrolling

### **Toggle Placement**
- Stack toggle below title on small screens
- Side-by-side on tablet+

```css
@media (max-width: 640px) {
  .setting-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .setting-title-group {
    margin-bottom: 1rem;
  }
}
```

---

## ✅ Completion Criteria

User has successfully completed General Settings when:

- ✅ All 13 sections reviewed (expanded at least once)
- ✅ At least one setting configured per section
- ✅ No unresolved conflicts
- ✅ "Save & Continue" clicked
- ✅ Redirected to `/general-settings/complete`

**Completion Page**:
```tsx
<CompletionPage
  title="General Settings Configured!"
  message="Your initial system settings are ready. You can adjust these during testing."
  nextStep={{
    label: "Continue to JM Routing",
    href: "/routing-setup"
  }}
/>
```

---

## 🔄 Integration with Existing Flow

### **Navigation From Hub**

From hub module card:

```tsx
<ModuleCard
  title="General Settings"
  description="Configure system-wide settings"
  status={moduleStatus.generalSettings}
  estimatedTime="8 minutes"
  icon={<SettingsIcon />}
  href="/general-settings"
/>
```

---

### **Context Updates**

```typescript
const updateGeneralSettings = (settings: Partial<GeneralSettings>) => {
  setState(prev => ({
    ...prev,
    generalSettings: { ...prev.generalSettings, ...settings }
  }));
};

const completeGeneralSettings = () => {
  updateModuleProgress('general-settings', 'completed');
  // Mark module as done
};
```

---

## 📊 Estimated Implementation Time

| Phase | Task | Est. Time |
|-------|------|-----------|
| 1 | Data structure in context | 1-2h |
| 2 | Main page component | 3-4h |
| 3 | Setting item components | 2-3h |
| 4 | Accordion & progress | 1h |
| 5 | Conditional logic | 2h |
| 6 | Mobile responsive | 1h |
| 7 | Completion page | 30min |
| 8 | Testing & polish | 2h |
| **Total** | | **12-15 hours** |

---

## 🎯 Summary & Next Steps

### **What We Know**
- ✅ 36 settings organized into 13 logical sections
- ✅ Clear recommendations from workbook
- ✅ Position in onboarding flow (Week 4, Basic Configurations)
- ✅ Video walkthrough structure expected

### **What We Need**
- ⏳ Missy's updated General Settings doc (arriving January)
- ⏳ CS team testing feedback (January)

### **Implementation Strategy**
1. ✅ Implement with current workbook structure (12-15 hours)
2. ⏳ Iterate when Missy's doc arrives (2-4 hours adjustments)
3. ⏳ Refine based on CS team testing (2-3 hours fixes)

### **Recommended Approach**
**"Implement now, iterate later"** - Sunda confirmed this is OK:
> "I'll get you any other information. I'll talk to Missy... Let's at least get more data to you." (28:28)

---

**Status**: Ready to implement  
**Blocked By**: None (can proceed with current knowledge)  
**Next Review**: After Missy's doc arrives (January)

---

_Last Updated: December 23, 2025_  
_Source: General Settings Customer-Facing Workbook + Onboarding Workshop CSV_

