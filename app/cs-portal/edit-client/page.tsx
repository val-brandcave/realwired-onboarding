"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOnboarding } from '@/lib/onboarding-context';
import { ConfiguredBadge } from '@/components/ui/ConfiguredBadge';
import { DonutChart } from '@/components/ui/DonutChart';
import { SmallDonut } from '@/components/ui/SmallDonut';

// Module structure (same as client-onboarding)
interface ModuleStep {
  id: string;
  label: string;
  path: string;
}

interface Module {
  id: string;
  title: string;
  icon: React.ReactNode;
  steps: ModuleStep[];
}

interface OnboardingParticipant {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarColor: string;
}

interface SsoIntegration {
  id: string;
  provider: string;
  certificateUploaded: boolean;
  certificateName?: string;
}

interface PropertyCategory {
  id: string;
  name: string;
  propertyTypes: string[];
}

interface RequestType {
  id: string;
  name: string;
  processType: '1-step' | '2-step';
}

interface RequestCategory {
  id: string;
  name: string;
  requestTypes: RequestType[];
}

interface PropertyField {
  id: string;
  label: string;
  enabled: boolean;
  inputType: string;
  required?: boolean;
}

interface RequestField {
  id: string;
  label: string;
  enabled: boolean;
  inputType: string;
  required?: boolean;
  readonly?: boolean;
}

interface Vendor {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  licenseNumber: string;
  coverageStates: string[];
  specialties: string[];
}

interface Ticket {
  id: string;
  moduleId: string;
  moduleName: string;
  message: string;
  createdDate: string;
  status: 'pending' | 'resolved';
}

interface Notification {
  id: string;
  type: 'ticket' | 'progress' | 'completion';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

type ChecklistStatus = 'completed' | 'in-progress' | 'pending';

interface ChecklistItem {
  id: string;
  task: string;
  status: ChecklistStatus;
}

const MODULES: Module[] = [
  {
    id: 'organization-setup',
    title: 'Organization Setup',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    steps: [
      { id: 'org-info', label: 'Organization Info & URL', path: 'org-info' },
      { id: 'branding', label: 'Branding', path: 'branding' },
      { id: 'participants', label: 'Onboarding Participants', path: 'participants' },
      { id: 'it-config', label: 'IT Configuration', path: 'it-config' },
    ]
  },
  {
    id: 'definitions',
    title: 'Definitions',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    steps: [
      { id: 'property-categories', label: 'Property Categories & Types', path: 'property-categories' },
      { id: 'property-fields', label: 'Property Record Fields', path: 'property-fields' },
      { id: 'request-types', label: 'Request Types Setup', path: 'request-types' },
      { id: 'request-form', label: 'Request Form Fields', path: 'request-form' },
    ]
  },
  {
    id: 'users',
    title: 'Users Setup',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    steps: [
      { id: 'users', label: 'Team Members', path: 'users' },
      { id: 'lending-groups', label: 'Lending Groups', path: 'lending-groups' },
    ]
  },
  {
    id: 'vendors',
    title: 'Vendors Setup',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    steps: [
      { id: 'vendor-types', label: 'Vendor Types & Credentials', path: 'vendor-types' },
      { id: 'vendor-classifications', label: 'Classifications', path: 'vendor-classifications' },
      { id: 'vendor-geography', label: 'Search Criteria', path: 'vendor-geography' },
      { id: 'vendor-upload', label: 'Vendor List Template', path: 'vendor-upload' },
    ]
  },
  {
    id: 'routing',
    title: 'Routing',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    steps: [
      { id: 'request-type-routing', label: 'Request Type Routing', path: 'request-type-routing' },
      { id: 'logical-routing', label: 'Logical Routing', path: 'logical-routing' },
      { id: 'assigned-area', label: 'Assigned Area', path: 'assigned-area' },
    ]
  },
  {
    id: 'general-settings',
    title: 'General Settings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    steps: [
      { id: 'workflow-timers', label: 'Workflow & Timers', path: 'workflow-timers' },
      { id: 'notifications', label: 'Notifications', path: 'notifications' },
      { id: 'bid-engagement', label: 'Bid & Engagement Panel', path: 'bid-engagement' },
    ]
  },
  {
    id: 'it-checklist',
    title: 'IT Readiness',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    steps: [
      { id: 'it-checklist', label: 'IT Checklist', path: 'it-checklist' },
      { id: 'security-compliance', label: 'Security & Compliance', path: 'security-compliance' },
    ]
  }
];

// Helper functions
function getAvatarColor(name: string): string {
  const colors = [
    "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6",
    "#EC4899", "#14B8A6", "#F97316", "#06B6D4", "#6366F1"
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function EditClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, markSectionConfigured, getSectionConfigStatus, updateProjectedGoLiveDate } = useOnboarding();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState('organization-setup');
  const [selectedStepId, setSelectedStepId] = useState('org-info');
  
  const clientName = searchParams.get('client') || 'Union Bank';
  
  // Current CS agent (in a real app, this would come from auth)
  const currentAgent = 'Samuel Kite';
  
  // Timeline management - using state from context
  const projectedGoLiveDate = state.projectedGoLiveDate || '2026-02-12';
  const initiationDate = state.initiationDate || '2024-10-28';
  const [showDateEditModal, setShowDateEditModal] = useState(false);
  const [tempGoLiveDate, setTempGoLiveDate] = useState(projectedGoLiveDate);
  
  // Tab 1: Organization Info & URL
  const [customUrl, setCustomUrl] = useState("union-bank");
  
  // Tab 2: Branding
  const [primaryColor, setPrimaryColor] = useState("#9F2E2B");
  const [logoPreview, setLogoPreview] = useState<string | null>("/realwired-logo.png");
  
  // Tab 3: Participants
  const primaryManager: OnboardingParticipant = {
    id: 'primary',
    name: 'John Smith',
    email: 'john.smith@unionbank.com',
    avatarColor: '#9F2E2B'
  };
  const [additionalParticipants, setAdditionalParticipants] = useState<OnboardingParticipant[]>([
    { id: '2', name: 'Sarah Johnson', email: 'sarah.j@unionbank.com', role: 'IT Team', avatarColor: '#3B82F6' },
    { id: '3', name: 'Michael Chen', email: 'michael.c@unionbank.com', role: 'Vendor Relations', avatarColor: '#10B981' }
  ]);
  const [newParticipantName, setNewParticipantName] = useState("");
  const [newParticipantEmail, setNewParticipantEmail] = useState("");
  const [newParticipantRole, setNewParticipantRole] = useState("");
  
  // Tab 4: IT Configuration
  const [authMethod, setAuthMethod] = useState<'sso' | 'standard'>('sso');
  const [ssoIntegrations, _setSsoIntegrations] = useState<SsoIntegration[]>([
    { id: '1', provider: 'okta', certificateUploaded: true, certificateName: 'okta-certificate.cer' }
  ]);
  const [passwordMinLength, setPasswordMinLength] = useState(8);
  const [passwordMaxLength, setPasswordMaxLength] = useState(20);
  const [requireUppercase, setRequireUppercase] = useState(true);
  const [requireLowercase, setRequireLowercase] = useState(true);
  const [requireNumber, setRequireNumber] = useState(true);
  const [requireSpecialChar, setRequireSpecialChar] = useState(false);
  const [_showAdvancedOptions, _setShowAdvancedOptions] = useState(false);
  const [ipRestrictionsEnabled, setIpRestrictionsEnabled] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState<string[]>(["192.168.1.0/24", "10.0.0.1"]);
  const [newIpAddress, setNewIpAddress] = useState("");
  const [sessionTimeoutEnabled, setSessionTimeoutEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(480);
  const [firstWarningTime, setFirstWarningTime] = useState(20);
  const [secondWarningTime, setSecondWarningTime] = useState(5);

  // Module 2: Definitions States
  const [propertyCategories, setPropertyCategories] = useState<PropertyCategory[]>([
    { id: '1', name: 'Single Family Residential', propertyTypes: ['Detached', 'Attached', 'Townhouse', 'Condo', 'Mobile Home'] },
    { id: '2', name: 'Commercial Property', propertyTypes: ['Office', 'Retail', 'Industrial', 'Warehouse', 'Hotel'] }
  ]);
  const [expandedPropCategoryId, setExpandedPropCategoryId] = useState<string | null>(null);
  const [newPropertyType, setNewPropertyType] = useState("");
  
  const [propertyFields, setPropertyFields] = useState<PropertyField[]>([
    { id: 'property-category', label: 'Property Category', enabled: true, inputType: 'select', required: true },
    { id: 'property-type', label: 'Property Type', enabled: true, inputType: 'select', required: true },
    { id: 'street-address', label: 'Street Address', enabled: true, inputType: 'text', required: true },
    { id: 'city', label: 'City', enabled: true, inputType: 'text', required: true },
    { id: 'state', label: 'State', enabled: true, inputType: 'select', required: true },
    { id: 'zip-code', label: 'Zip Code', enabled: true, inputType: 'text', required: true },
    { id: 'year-built', label: 'Year Built', enabled: true, inputType: 'number' },
    { id: 'square-footage', label: 'Square Footage', enabled: true, inputType: 'number' },
  ]);
  
  const [requestCategories, setRequestCategories] = useState<RequestCategory[]>([
    {
      id: '1',
      name: 'Appraisal',
      requestTypes: [
        { id: 'rt1', name: 'Full Residential Appraisal', processType: '2-step' },
        { id: 'rt2', name: 'Commercial Appraisal', processType: '2-step' },
        { id: 'rt3', name: 'Desktop Review', processType: '1-step' }
      ]
    },
    {
      id: '2',
      name: 'Environmental',
      requestTypes: [
        { id: 'rt4', name: 'Phase I ESA', processType: '2-step' },
        { id: 'rt5', name: 'Phase II ESA', processType: '2-step' }
      ]
    }
  ]);
  const [expandedReqCategoryId, setExpandedReqCategoryId] = useState<string | null>(null);
  
  const [requestFields, setRequestFields] = useState<RequestField[]>([
    { id: 'request-type', label: 'Request Type', enabled: true, inputType: 'select', required: true, readonly: true },
    { id: 'borrower-name', label: 'Borrower Name', enabled: true, inputType: 'text', required: true },
    { id: 'loan-amount', label: 'Loan Amount', enabled: true, inputType: 'number', required: true },
    { id: 'loan-purpose', label: 'Loan Purpose', enabled: true, inputType: 'select' },
    { id: 'due-date', label: 'Due Date', enabled: true, inputType: 'date' },
    { id: 'special-instructions', label: 'Special Instructions', enabled: true, inputType: 'textarea' },
  ]);
  
  const [loanPurposeOptions, setLoanPurposeOptions] = useState<string[]>([
    'New Purchase',
    'Refinance',
    'Construction',
    'Home Equity Line',
    'Commercial Loan',
    'Investment Property'
  ]);
  const [newLoanPurposeOption, setNewLoanPurposeOption] = useState("");
  const [showLoanPurposeOptions, setShowLoanPurposeOptions] = useState(false);

  // Module 3: Users Setup States
  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'John Smith', email: 'john.smith@unionbank.com', role: 'Bank Admin', avatarColor: '#9F2E2B' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.j@unionbank.com', role: 'Job Manager', avatarColor: '#3B82F6' },
    { id: '3', name: 'Michael Chen', email: 'michael.c@unionbank.com', role: 'Job Manager', avatarColor: '#10B981' },
    { id: '4', name: 'Emily Davis', email: 'emily.d@unionbank.com', role: 'Loan Officer', avatarColor: '#F59E0B' },
  ]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<"Loan Officer" | "Bank Admin" | "Job Manager">('Loan Officer');
  
  const [lendingGroups, setLendingGroups] = useState([
    { id: '1', name: 'Commercial Lending', type: 'Commercial' as const, regions: ['Northeast', 'Southeast'], products: ['Fixed Rate Loan', 'Line of Credit (LOC)'] },
    { id: '2', name: 'Residential Mortgage', type: 'Mortgage' as const, regions: ['West Coast'], products: ['Fixed Rate Loan', 'Adjustable Rate Loan'] },
  ]);

  // Module 4: Vendors States
  
  // Vendor Types & Credentials
  interface VendorTypeConfig {
    id: string;
    name: string;
    stateLicenseRequired: boolean;
    eoRequired: boolean;
    autoLiability: boolean;
    commercialLiability: boolean;
    masterAgreement: boolean;
    allowToLO: boolean;
  }
  
  const [vendorTypes, setVendorTypes] = useState<VendorTypeConfig[]>([
    { id: '1', name: 'Appraisal', stateLicenseRequired: true, eoRequired: true, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
    { id: '2', name: 'Environmental', stateLicenseRequired: false, eoRequired: false, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
    { id: '3', name: 'Broker', stateLicenseRequired: false, eoRequired: false, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
    { id: '4', name: 'External Evaluator', stateLicenseRequired: false, eoRequired: false, autoLiability: false, commercialLiability: false, masterAgreement: false, allowToLO: false },
  ]);
  const [editingVendorTypeId, setEditingVendorTypeId] = useState<string | null>(null);

  // Vendor Statuses, Specialties, Designations
  interface VendorStatusConfig {
    id: string;
    name: string;
    monitorCredentials: boolean;
    isDefault: boolean;
  }
  
  const [vendorStatuses, setVendorStatuses] = useState<VendorStatusConfig[]>([
    { id: '1', name: 'New Applicant', monitorCredentials: false, isDefault: true },
    { id: '2', name: 'Pending Applicant', monitorCredentials: false, isDefault: true },
    { id: '3', name: 'Approved', monitorCredentials: true, isDefault: false },
    { id: '4', name: 'Unapproved', monitorCredentials: false, isDefault: false },
    { id: '5', name: 'Pending', monitorCredentials: true, isDefault: false },
    { id: '6', name: 'Temporary Approval', monitorCredentials: true, isDefault: false },
    { id: '7', name: 'Rejected', monitorCredentials: false, isDefault: false },
  ]);
  
  const [vendorSpecialties, setVendorSpecialties] = useState<string[]>([
    'Hotel', 'Convenience Store', 'Oil & Gas', 'Airport', 'Golf Course', 'Marina'
  ]);
  
  const [vendorDesignations, setVendorDesignations] = useState<string[]>([
    'MAI', 'MRICS', 'SRA', 'AI-GRS', 'AI-RRS'
  ]);

  // Vendor Search Criteria - Field Labels and Values
  const [field1Label, setField1Label] = useState('Region');
  const [field2Label, setField2Label] = useState('Sub-Region');
  
  const [vendorRegions, setVendorRegions] = useState<string[]>([
    'Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'
  ]);
  
  const [vendorSubRegions, setVendorSubRegions] = useState<string[]>([
    'Metro Area', 'County', 'State Zone'
  ]);

  // Vendor Roster (Upload tab)
  const [vendors, setVendors] = useState<Vendor[]>([
    { 
      id: 'v1', 
      name: 'John Appraiser', 
      company: 'ABC Appraisals Inc', 
      email: 'john@abcappraisals.com', 
      phone: '(555) 123-4567', 
      licenseNumber: 'LA-12345', 
      coverageStates: ['California', 'Nevada'], 
      specialties: ['Residential', 'Commercial'] 
    },
    { 
      id: 'v2', 
      name: 'Jane Reviewer', 
      company: 'XYZ Reviews LLC', 
      email: 'jane@xyzreviews.com', 
      phone: '(555) 987-6543', 
      licenseNumber: 'LR-67890', 
      coverageStates: ['Arizona', 'Texas', 'New Mexico'], 
      specialties: ['Residential', 'Environmental'] 
    },
  ]);
  const [newVendorName, setNewVendorName] = useState("");
  const [newVendorCompany, setNewVendorCompany] = useState("");
  const [newVendorEmail, setNewVendorEmail] = useState("");
  const [newVendorPhone, setNewVendorPhone] = useState("");
  const [newVendorLicense, setNewVendorLicense] = useState("");
  const [vendorTemplateStatus, _setVendorTemplateStatus] = useState<'none' | 'uploaded' | 'reviewed'>('uploaded');

  // Module 5: Routing States
  const [routingRules, _setRoutingRules] = useState([
    { id: '1', name: 'Commercial Appraisal Rule', type: 'Request Type', assignee: 'Sarah Johnson', conditions: 'Commercial Appraisal' },
    { id: '2', name: 'West Coast Properties', type: 'Logical', assignee: 'Michael Chen', conditions: 'West Coast, Residential' },
    { id: '3', name: 'Northeast Region', type: 'Assigned Area', assignee: 'Emily Davis', conditions: 'Northeast, Southeast' },
  ]);

  // Module 6: General Settings States
  const [workflowTimers, setWorkflowTimers] = useState({
    orderSubmitted: 24,
    vendorSolicitation: 48,
    reportReceived: 72,
    reviewCompleted: 24,
  });
  const [bidEngagementPanel, setBidEngagementPanel] = useState('Option 2');

  // Module 7: IT Readiness States
  const [itChecklistItems, setItChecklistItems] = useState<ChecklistItem[]>([
    { id: '1', task: 'Whitelist YouConnect URLs', status: 'completed' },
    { id: '2', task: 'Configure email domain', status: 'completed' },
    { id: '3', task: 'Setup SSO integration', status: 'in-progress' },
    { id: '4', task: 'Network security review', status: 'pending' },
  ]);

  // Tickets
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 'TKT-001', moduleId: 'organization-setup', moduleName: 'Organization Setup', message: 'Need help configuring SSO with Azure AD. Getting certificate validation errors.', createdDate: '2024-10-15', status: 'pending' },
    { id: 'TKT-002', moduleId: 'definitions', moduleName: 'Definitions', message: 'Can we add a custom property type for Mixed-Use Commercial properties?', createdDate: '2024-10-18', status: 'resolved' },
    { id: 'TKT-003', moduleId: 'routing', moduleName: 'Routing', message: 'Logical routing rules not triggering for Environmental requests.', createdDate: '2024-10-20', status: 'pending' },
    { id: 'TKT-004', moduleId: 'general-settings', moduleName: 'General Settings', message: 'Question about workflow timer configuration for rush orders.', createdDate: '2024-10-22', status: 'pending' },
    { id: 'TKT-005', moduleId: 'definitions', moduleName: 'Definitions', message: 'Request to rename "Full Residential Appraisal" to "Complete Home Appraisal".', createdDate: '2024-10-25', status: 'resolved' }
  ]);
  const [viewingTicket, setViewingTicket] = useState<Ticket | null>(null);
  const [openTicketMenuId, setOpenTicketMenuId] = useState<string | null>(null);
  const [showTicketsView, setShowTicketsView] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'ticket', title: 'New Ticket Created', message: 'Union Bank created a new ticket for Organization Setup', timestamp: '2024-10-28T10:30:00', read: false },
    { id: '2', type: 'progress', title: 'Client Started Module', message: 'Union Bank started working on Definitions module', timestamp: '2024-10-28T09:15:00', read: false },
    { id: '3', type: 'completion', title: 'Module Completed', message: 'Union Bank completed Organization Setup module', timestamp: '2024-10-27T16:45:00', read: true },
    { id: '4', type: 'ticket', title: 'Ticket Escalated', message: 'TKT-003 has been escalated to senior support', timestamp: '2024-10-27T14:20:00', read: true },
    { id: '5', type: 'progress', title: 'Progress Update', message: 'Union Bank reached 65% completion overall', timestamp: '2024-10-27T11:00:00', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample module progress data for demo purposes (~65% overall)
  const [sampleModuleProgress] = useState({
    'organization-setup': { currentStep: 4, totalSteps: 4 }, // 100% - Completed (green donut)
    'definitions': { currentStep: 4, totalSteps: 4 }, // 100% - Completed (green donut)
    'users': { currentStep: 2, totalSteps: 2 }, // 100% - Completed (green donut)
    'vendors': { currentStep: 3, totalSteps: 4 }, // 75% - Almost done (amber donut)
    'routing': { currentStep: 2, totalSteps: 4 }, // 50% - Halfway (amber donut)
    'general-settings': { currentStep: 1, totalSteps: 4 }, // 25% - Just started (orange donut)
    'it-checklist': { currentStep: 0, totalSteps: 2 }, // 0% - Not started (gray donut)
  });

  // Module target completion dates
  const [moduleCompletionDates, setModuleCompletionDates] = useState<Record<string, string>>({
    'organization-setup': '2025-12-01',
    'definitions': '2025-12-08',
    'users': '2025-12-15',
    'vendors': '2025-12-22',
    'routing': '2025-12-29',
    'general-settings': '2026-01-05',
    'it-checklist': '2026-02-12',
  });

  // Modal state for setting module completion dates
  const [showModuleDateModal, setShowModuleDateModal] = useState(false);
  const [selectedModuleForDate, setSelectedModuleForDate] = useState<typeof MODULES[0] | null>(null);
  const [tempModuleDate, setTempModuleDate] = useState('');

  const selectedModule = MODULES.find(m => m.id === selectedModuleId) || MODULES[0];

  const handleSignOut = () => {
    router.push('/');
  };

  const handleBackToList = () => {
    router.push('/cs-portal');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddParticipant = () => {
    if (newParticipantName.trim() && newParticipantEmail.trim() && newParticipantEmail.includes('@')) {
      const newParticipant: OnboardingParticipant = {
        id: `participant-${Date.now()}`,
        name: newParticipantName.trim(),
        email: newParticipantEmail.trim(),
        role: newParticipantRole.trim() || undefined,
        avatarColor: getAvatarColor(newParticipantName.trim())
      };
      setAdditionalParticipants([...additionalParticipants, newParticipant]);
      setNewParticipantName("");
      setNewParticipantEmail("");
      setNewParticipantRole("");
    }
  };

  const handleRemoveParticipant = (id: string) => {
    setAdditionalParticipants(additionalParticipants.filter(p => p.id !== id));
  };

  const handleAddIpAddress = () => {
    if (newIpAddress.trim() && !ipWhitelist.includes(newIpAddress.trim())) {
      setIpWhitelist([...ipWhitelist, newIpAddress.trim()]);
      setNewIpAddress("");
    }
  };

  const handleRemoveIpAddress = (ip: string) => {
    setIpWhitelist(ipWhitelist.filter(i => i !== ip));
  };

  const handleSave = () => {
    alert('Changes saved successfully!');
  };

  const handleOpenDateModal = (module: typeof MODULES[0]) => {
    setSelectedModuleForDate(module);
    setTempModuleDate(moduleCompletionDates[module.id] || '');
    setShowModuleDateModal(true);
  };

  const handleSaveModuleDate = () => {
    if (selectedModuleForDate && tempModuleDate) {
      setModuleCompletionDates(prev => ({
        ...prev,
        [selectedModuleForDate.id]: tempModuleDate
      }));
      setShowModuleDateModal(false);
      setSelectedModuleForDate(null);
      setTempModuleDate('');
    }
  };

  const handleCloseModuleDateModal = () => {
    setShowModuleDateModal(false);
    setSelectedModuleForDate(null);
    setTempModuleDate('');
  };

  // Helper function to format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Helper function to check if target date is at risk (too close to go-live)
  const isDateAtRisk = (dateString: string) => {
    if (!dateString) return false;
    const targetDate = new Date(dateString);
    const goLiveDate = new Date(projectedGoLiveDate);
    const daysUntilGoLive = Math.floor((goLiveDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilGoLive < 7; // At risk if less than 7 days before go-live
  };

  const handleMarkAsResolved = (ticketId: string) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? {...t, status: 'resolved'} : t));
    setOpenTicketMenuId(null);
  };

  const handleEscalate = (ticketId: string) => {
    alert(`Ticket ${ticketId} has been escalated to senior support.`);
    setOpenTicketMenuId(null);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Helper function to calculate module progress
  const getModuleProgress = (moduleId: string) => {
    // Try to get progress from context first, then fallback to sample data
    const progress = state.moduleProgress[moduleId] || sampleModuleProgress[moduleId as keyof typeof sampleModuleProgress];
    if (!progress) return 0;
    return Math.round((progress.currentStep / progress.totalSteps) * 100);
  };

  // Helper function to calculate overall progress
  const getOverallProgress = () => {
    const completedModules = MODULES.filter(module => {
      const progress = getModuleProgress(module.id);
      return progress === 100;
    }).length;
    return Math.round((completedModules / MODULES.length) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Back Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back to List</span>
              </button>
              
              <div className="h-8 w-px bg-slate-300" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#9F2E2B] to-[#7D2522] rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">YC</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">YouConnect</h1>
                  <p className="text-xs text-slate-500">CS Agent Portal</p>
                </div>
              </div>
            </div>

            {/* Notification Bell & Profile */}
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                    SK
                  </div>
                </button>

                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-slate-200">
                        <p className="text-sm font-semibold text-slate-900">Samuel Kite</p>
                        <p className="text-xs text-slate-500">samuel.kite@realwired.com</p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Module Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
          <div className="p-4">
            {/* Client Completion Status - Moved to Top */}
            <div className="pb-4 mb-6 border-b border-slate-200">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Onboarding Progress
              </h2>
              <div className="flex justify-center">
                <DonutChart 
                  percentage={getOverallProgress()} 
                  size={100} 
                  strokeWidth={10}
                  label="Complete"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs text-slate-600">
                  {MODULES.filter(m => getModuleProgress(m.id) === 100).length} of {MODULES.length} modules completed
                </p>
              </div>
            </div>

            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Onboarding Modules
            </h2>
            <nav className="space-y-1 mb-6">
              {MODULES.map((module) => (
                <div key={module.id} className="group relative">
                  <div className="flex items-stretch gap-1">
                    <button
                      onClick={() => {
                        setSelectedModuleId(module.id);
                        setSelectedStepId(module.steps[0].id);
                        setShowTicketsView(false);
                      }}
                      className={`flex-1 flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        selectedModuleId === module.id && !showTicketsView
                          ? 'bg-[#9F2E2B] text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {module.icon}
                      <span className="truncate flex-1 text-left">{module.title}</span>
                      <div className="flex-shrink-0">
                        <SmallDonut 
                          percentage={getModuleProgress(module.id)} 
                          size={28}
                          strokeWidth={2}
                          showLabel={false}
                        />
                      </div>
                    </button>
                    
                    {/* Calendar icon for setting completion date */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenDateModal(module);
                      }}
                      className={`px-2 py-2.5 rounded-lg transition-colors flex items-center justify-center ${
                        selectedModuleId === module.id && !showTicketsView
                          ? 'bg-[#9F2E2B] text-white hover:bg-[#8A2826]'
                          : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                      }`}
                      title={`Set target date: ${formatDate(moduleCompletionDates[module.id])}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Target date indicator below button */}
                  {moduleCompletionDates[module.id] && (
                    <div className={`text-xs px-3 py-1 mt-1 rounded text-center ${
                      isDateAtRisk(moduleCompletionDates[module.id])
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      Target: {formatDate(moduleCompletionDates[module.id])}
                      {isDateAtRisk(moduleCompletionDates[module.id]) && (
                        <span className="ml-1">⚠️</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Onboarding Tickets Section */}
            <div className="border-t border-slate-200 pt-4">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Support
              </h2>
              <button
                onClick={() => setShowTicketsView(true)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  showTicketsView
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="truncate">Onboarding Tickets</span>
                {tickets.filter(t => t.status === 'pending').length > 0 && (
                  <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {tickets.filter(t => t.status === 'pending').length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6 lg:p-8">
            {/* Projected Go-Live Date Banner */}
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">Projected Go-Live Date</div>
                    <div className="text-base font-bold text-slate-900">
                      {new Date(projectedGoLiveDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowDateEditModal(true)}
                  className="px-3 py-1.5 text-sm font-medium text-blue-700 hover:text-blue-900 bg-white border-2 border-blue-300 hover:border-blue-400 rounded-lg transition-colors"
                >
                  Edit Date
                </button>
              </div>
            </div>

            {/* Organization Header */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{clientName}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">In Progress</span>
                    <span>65% Complete</span>
                  </div>
                </div>
              </div>
              {!showTicketsView && (
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md hover:shadow-lg"
                >
                  Save Changes
                </button>
              )}
            </div>

            {/* Tickets View */}
            {showTicketsView ? (
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Onboarding Tickets</h1>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Ticket ID</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Module</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Date Submitted</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {tickets.map((ticket) => (
                          <tr key={ticket.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-mono font-semibold text-slate-900">{ticket.id}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-slate-900">{ticket.moduleName}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-slate-600">
                                {new Date(ticket.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                                ticket.status === 'resolved' 
                                  ? 'bg-green-100 text-green-800 border border-green-200'
                                  : 'bg-amber-100 text-amber-800 border border-amber-200'
                              }`}>
                                {ticket.status === 'resolved' ? 'Resolved' : 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative">
                                <button
                                  onClick={() => setOpenTicketMenuId(openTicketMenuId === ticket.id ? null : ticket.id)}
                                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                                  aria-label="Open ticket menu"
                                >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                  </svg>
                                </button>
                                {openTicketMenuId === ticket.id && (
                                  <>
                                    <div className="fixed inset-0 z-10" onClick={() => setOpenTicketMenuId(null)} />
                                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-20">
                                      <button
                                        onClick={() => setViewingTicket(ticket)}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View Ticket
                                      </button>
                                      {ticket.status === 'pending' && (
                                        <button
                                          onClick={() => handleMarkAsResolved(ticket.id)}
                                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                        >
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          Mark as Resolved
                                        </button>
                                      )}
                                      <button
                                        onClick={() => handleEscalate(ticket.id)}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Escalate
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Module Steps Tabs */}
                <div className="mb-6">
                  <div className="border-b border-slate-200">
                    <nav className="flex gap-2 -mb-px overflow-x-auto">
                      {selectedModule.steps.map((step) => (
                        <button
                          key={step.id}
                          onClick={() => setSelectedStepId(step.id)}
                          className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                            selectedStepId === step.id
                              ? 'border-[#9F2E2B] text-[#9F2E2B]'
                              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                          }`}
                        >
                          {step.label}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  {/* TAB 1: Organization Info & URL */}
                  {selectedStepId === 'org-info' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-slate-900">Organization Info & URL</h2>
                      <ConfiguredBadge
                        status={getSectionConfigStatus('org-setup-org-info')}
                        onMarkAsConfigured={() => markSectionConfigured('org-setup-org-info', currentAgent)}
                        onReconfigure={() => markSectionConfigured('org-setup-org-info', currentAgent)}
                        sectionName="Organization Info"
                      />
                    </div>
                    
                    {/* Organization Name - Display Only */}
                    <div className="mb-6 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-0.5">Organization Name</p>
                          <p className="text-lg font-bold text-slate-900">{clientName}</p>
                        </div>
                      </div>
                    </div>

                    {/* Custom URL */}
                    <div>
                      <label htmlFor="custom-url-edit" className="block text-sm font-semibold text-slate-900 mb-2">
                        Custom URL <span className="text-red-600">*</span>
                      </label>
                      <div className="flex items-center">
                        <input
                          id="custom-url-edit"
                          type="text"
                          value={customUrl}
                          onChange={(e) => setCustomUrl(e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent"
                        />
                        <div className="px-4 py-3 bg-slate-100 border-2 border-l-0 border-slate-300 rounded-r-lg text-slate-600">
                          .realwired.com
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">
                        Full URL: <span className="font-medium text-slate-900">{customUrl}.realwired.com</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

                  {/* TAB 2: Branding */}
                  {selectedStepId === 'branding' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Branding</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('org-setup-branding')}
                      onMarkAsConfigured={() => markSectionConfigured('org-setup-branding', currentAgent)}
                      onReconfigure={() => markSectionConfigured('org-setup-branding', currentAgent)}
                      sectionName="Branding"
                    />
                  </div>
                  
                  {/* Logo Upload */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Organization Logo</h3>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                      {logoPreview ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold">Current Logo</h4>
                            <button
                              onClick={() => setLogoPreview(null)}
                              className="text-xs text-red-600 hover:text-red-800 font-medium"
                            >
                              Remove & Upload New
                            </button>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-48 h-16 bg-white rounded flex items-center justify-center p-2 border border-slate-200">
                                <img src={logoPreview} alt="Logo" className="max-w-full max-h-full object-contain" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Large (192x64px)</p>
                                <p className="text-xs text-slate-600">Used in navigation and main branding</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                          <div className="flex flex-col items-center py-8">
                            <svg className="w-16 h-16 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm font-medium text-slate-700">Click to upload logo</p>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Primary Color */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Brand Color</h3>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-20 h-20 rounded-lg border-2 border-slate-300 cursor-pointer"
                        aria-label="Primary color picker"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] font-mono uppercase"
                          aria-label="Primary color hex code"
                        />
                        <p className="mt-2 text-xs text-slate-600">
                          Used for buttons, links, and accents throughout the platform
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Brand Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Brand Preview</h3>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 space-y-4 border border-slate-200">
                      {/* Mock Header */}
                      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between border-t-4" style={{ borderTopColor: primaryColor }}>
                        <div className="flex items-center gap-3">
                          {logoPreview && <img src={logoPreview} alt="Logo" className="h-8 object-contain" />}
                          <span className="text-base font-semibold">{clientName}</span>
                        </div>
                        <div className="px-3 py-1 rounded text-xs font-medium text-white" style={{ backgroundColor: primaryColor }}>
                          YouConnect
                        </div>
                      </div>
                      {/* Mock Buttons */}
                      <div className="flex items-center gap-3">
                        <button className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg shadow-md" style={{ backgroundColor: primaryColor }}>
                          Primary Action
                        </button>
                        <button className="px-6 py-2.5 text-sm font-medium rounded-lg border-2 bg-white" style={{ borderColor: primaryColor, color: primaryColor }}>
                          Secondary Action
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

                  {/* TAB 3: Onboarding Participants */}
                  {selectedStepId === 'participants' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Onboarding Participants</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('org-setup-participants')}
                      onMarkAsConfigured={() => markSectionConfigured('org-setup-participants', currentAgent)}
                      onReconfigure={() => markSectionConfigured('org-setup-participants', currentAgent)}
                      sectionName="Participants"
                    />
                  </div>
                  
                  {/* Primary Manager - Read Only */}
                  <div className="bg-card border border-slate-300 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Primary Onboarding Manager</h3>
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-2 border-red-200">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md"
                        style={{ backgroundColor: primaryManager.avatarColor }}
                      >
                        {getInitials(primaryManager.name)}
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-semibold text-slate-900">{primaryManager.name}</div>
                        <div className="text-sm text-slate-600">{primaryManager.email}</div>
                      </div>
                      <span className="px-3 py-1.5 bg-[#9F2E2B] text-white text-xs font-semibold rounded-lg">
                        Primary
                      </span>
                    </div>
                  </div>

                  {/* Additional Participants */}
                  <div className="border border-slate-300 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-4">Additional Participants</h3>
                    
                    {/* Add Participant Form */}
                    <div className="space-y-3 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={newParticipantName}
                          onChange={(e) => setNewParticipantName(e.target.value)}
                          placeholder="Name"
                          className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                        />
                        <input
                          type="email"
                          value={newParticipantEmail}
                          onChange={(e) => setNewParticipantEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                        />
                        <input
                          type="text"
                          value={newParticipantRole}
                          onChange={(e) => setNewParticipantRole(e.target.value)}
                          placeholder="Role (optional)"
                          className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                        />
                      </div>
                      <button
                        onClick={handleAddParticipant}
                        disabled={!newParticipantName.trim() || !newParticipantEmail.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#9F2E2B] hover:bg-[#8A2826] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add Participant
                      </button>
                    </div>

                    {/* List of Participants */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-900">Added Participants ({additionalParticipants.length})</h4>
                      {additionalParticipants.map((participant) => (
                        <div key={participant.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                            style={{ backgroundColor: participant.avatarColor }}
                          >
                            {getInitials(participant.name)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-slate-900">{participant.name}</span>
                              {participant.role && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                                  {participant.role}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-600">{participant.email}</div>
                          </div>
                          <button
                            onClick={() => handleRemoveParticipant(participant.id)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Remove participant"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

                  {/* TAB 4: IT Configuration */}
                  {selectedStepId === 'it-config' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">IT & Security Configuration</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('org-setup-it-config')}
                      onMarkAsConfigured={() => markSectionConfigured('org-setup-it-config', currentAgent)}
                      onReconfigure={() => markSectionConfigured('org-setup-it-config', currentAgent)}
                      sectionName="IT Configuration"
                    />
                  </div>
                  
                  {/* Authentication Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Authentication Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer ${
                        authMethod === 'sso' ? 'border-[#9F2E2B] bg-red-50' : 'border-slate-300'
                      }`}>
                        <input
                          type="radio"
                          checked={authMethod === 'sso'}
                          onChange={() => setAuthMethod('sso')}
                          className="mt-1"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-900">Single Sign-On</h4>
                          <p className="text-xs text-slate-600">Use existing identity provider</p>
                        </div>
                      </label>
                      <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer ${
                        authMethod === 'standard' ? 'border-[#9F2E2B] bg-red-50' : 'border-slate-300'
                      }`}>
                        <input
                          type="radio"
                          checked={authMethod === 'standard'}
                          onChange={() => setAuthMethod('standard')}
                          className="mt-1"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-900">Standard Authentication</h4>
                          <p className="text-xs text-slate-600">Username and password</p>
                        </div>
                      </label>
                    </div>

                    {/* SSO Configuration */}
                    {authMethod === 'sso' && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">SSO Integration</h4>
                        <div className="space-y-2">
                          {ssoIntegrations.map((integration) => (
                            <div key={integration.id} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                              <span className="px-2 py-1 bg-[#9F2E2B] text-white text-xs font-semibold rounded">
                                {integration.provider.toUpperCase()}
                              </span>
                              {integration.certificateUploaded && (
                                <span className="text-sm text-green-700 flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {integration.certificateName}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Standard Auth Password Requirements */}
                    {authMethod === 'standard' && (
                      <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                        <h4 className="text-sm font-semibold text-slate-900">Password Requirements</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Min Length</label>
                            <input type="number" value={passwordMinLength} onChange={(e) => setPasswordMinLength(parseInt(e.target.value))} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" aria-label="Password minimum length" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Max Length</label>
                            <input type="number" value={passwordMaxLength} onChange={(e) => setPasswordMaxLength(parseInt(e.target.value))} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" aria-label="Password maximum length" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" checked={requireUppercase} onChange={(e) => setRequireUppercase(e.target.checked)} className="rounded" />
                            <span className="text-sm">Require uppercase letter</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" checked={requireLowercase} onChange={(e) => setRequireLowercase(e.target.checked)} className="rounded" />
                            <span className="text-sm">Require lowercase letter</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" checked={requireNumber} onChange={(e) => setRequireNumber(e.target.checked)} className="rounded" />
                            <span className="text-sm">Require number</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" checked={requireSpecialChar} onChange={(e) => setRequireSpecialChar(e.target.checked)} className="rounded" />
                            <span className="text-sm">Require special character</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* IP Restrictions */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-slate-900">IP Address Restrictions</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ipRestrictionsEnabled}
                          onChange={(e) => setIpRestrictionsEnabled(e.target.checked)}
                          className="sr-only peer"
                          aria-label="Enable IP address restrictions"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9F2E2B]"></div>
                      </label>
                    </div>
                    {ipRestrictionsEnabled && (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newIpAddress}
                            onChange={(e) => setNewIpAddress(e.target.value)}
                            placeholder="192.168.1.1 or 192.168.1.0/24"
                            className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg"
                          />
                          <button
                            onClick={handleAddIpAddress}
                            disabled={!newIpAddress.trim()}
                            className="px-4 py-2 text-sm font-medium text-white bg-[#9F2E2B] hover:bg-[#8A2826] rounded-lg disabled:opacity-50"
                          >
                            Add
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {ipWhitelist.map((ip) => (
                            <div key={ip} className="flex items-center justify-between p-2 bg-white rounded-lg">
                              <span className="text-sm font-mono">{ip}</span>
                              <button
                                onClick={() => handleRemoveIpAddress(ip)}
                                className="text-red-600 hover:text-red-800"
                                aria-label="Remove IP address"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Session Timeout */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-slate-900">Session Timeout</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sessionTimeoutEnabled}
                          onChange={(e) => setSessionTimeoutEnabled(e.target.checked)}
                          className="sr-only peer"
                          aria-label="Enable session timeout"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9F2E2B]"></div>
                      </label>
                    </div>
                    {sessionTimeoutEnabled && (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">Timeout Duration</label>
                          <select
                            value={sessionTimeout}
                            onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                            aria-label="Timeout duration"
                          >
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                            <option value={240}>4 hours</option>
                            <option value={480}>8 hours</option>
                          </select>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <h4 className="text-sm font-semibold text-amber-900 mb-2">Warning Times</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-amber-900 mb-1">First Warning</label>
                              <select value={firstWarningTime} onChange={(e) => setFirstWarningTime(parseInt(e.target.value))} className="w-full px-2 py-1.5 text-sm border border-amber-300 rounded" aria-label="First warning time">
                                <option value={5}>5 min</option>
                                <option value={10}>10 min</option>
                                <option value={20}>20 min</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-amber-900 mb-1">Second Warning</label>
                              <select value={secondWarningTime} onChange={(e) => setSecondWarningTime(parseInt(e.target.value))} className="w-full px-2 py-1.5 text-sm border border-amber-300 rounded" aria-label="Second warning time">
                                <option value={1}>1 min</option>
                                <option value={2}>2 min</option>
                                <option value={5}>5 min</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

                  {/* MODULE 2: DEFINITIONS TABS */}
                  {selectedModuleId === 'definitions' && selectedStepId === 'property-categories' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Property Categories & Types</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('definitions-property-categories')}
                      onMarkAsConfigured={() => markSectionConfigured('definitions-property-categories', currentAgent)}
                      onReconfigure={() => markSectionConfigured('definitions-property-categories', currentAgent)}
                      sectionName="Property Categories"
                    />
                  </div>
                  {propertyCategories.map((category) => (
                    <div key={category.id} className="border-2 border-slate-300 rounded-xl overflow-hidden">
                      <div className="p-4 bg-slate-50 flex items-center justify-between">
                        <button
                          onClick={() => setExpandedPropCategoryId(expandedPropCategoryId === category.id ? null : category.id)}
                          className="flex items-center gap-3 flex-1"
                        >
                          <svg className={`w-5 h-5 transition-transform ${expandedPropCategoryId === category.id ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="font-semibold">{category.name}</span>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs rounded">{category.propertyTypes.length} types</span>
                        </button>
                      </div>
                      {expandedPropCategoryId === category.id && (
                        <div className="p-5 bg-white border-t-2 space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Category Name</label>
                            <input
                              type="text"
                              value={category.name}
                              onChange={(e) => setPropertyCategories(prev => prev.map(c => c.id === category.id ? {...c, name: e.target.value} : c))}
                              className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg"
                              aria-label="Property category name"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-3">Property Types</h4>
                            <div className="space-y-2 mb-3">
                              {category.propertyTypes.map((type, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                                  <span className="text-xs text-slate-500 w-6">{idx + 1}.</span>
                                  <span className="flex-1 text-sm">{type}</span>
                                  <button
                                    onClick={() => setPropertyCategories(prev => prev.map(c => c.id === category.id ? {...c, propertyTypes: c.propertyTypes.filter((_, i) => i !== idx)} : c))}
                                    className="text-red-600 hover:text-red-800"
                                    aria-label="Remove property type"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newPropertyType}
                                onChange={(e) => setNewPropertyType(e.target.value)}
                                placeholder="Add property type"
                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                              />
                              <button
                                onClick={() => {
                                  if (newPropertyType.trim()) {
                                    setPropertyCategories(prev => prev.map(c => c.id === category.id ? {...c, propertyTypes: [...c.propertyTypes, newPropertyType.trim()]} : c));
                                    setNewPropertyType("");
                                  }
                                }}
                                className="px-4 py-2 bg-[#9F2E2B] text-white rounded-lg"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

                  {selectedModuleId === 'definitions' && selectedStepId === 'property-fields' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Property Record Fields</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('definitions-property-fields')}
                      onMarkAsConfigured={() => markSectionConfigured('definitions-property-fields', currentAgent)}
                      onReconfigure={() => markSectionConfigured('definitions-property-fields', currentAgent)}
                      sectionName="Property Fields"
                    />
                  </div>
                  <div className="bg-slate-100 border border-slate-300 rounded-lg p-3 mb-4">
                    <p className="text-sm"><span className="font-semibold">{propertyFields.filter(f => f.enabled).length}</span> of {propertyFields.length} fields selected</p>
                  </div>
                  <div className="space-y-3">
                    {propertyFields.map((field) => (
                      <div key={field.id} className="flex items-center gap-4 p-4 bg-white border border-slate-300 rounded-lg">
                        <input
                          type="checkbox"
                          checked={field.enabled}
                          disabled={field.required}
                          onChange={() => setPropertyFields(prev => prev.map(f => f.id === field.id ? {...f, enabled: !f.enabled} : f))}
                          className="w-5 h-5"
                          aria-label={`Enable ${field.label} field`}
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => setPropertyFields(prev => prev.map(f => f.id === field.id ? {...f, label: e.target.value} : f))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium"
                            aria-label={`Field label for ${field.id}`}
                          />
                        </div>
                        <select
                          value={field.inputType}
                          onChange={(e) => setPropertyFields(prev => prev.map(f => f.id === field.id ? {...f, inputType: e.target.value} : f))}
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          aria-label={`Input type for ${field.label}`}
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="select">Dropdown</option>
                          <option value="textarea">Multi-line</option>
                        </select>
                        {field.required && <span className="text-xs text-red-600 font-semibold">Required</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

                  {selectedModuleId === 'definitions' && selectedStepId === 'request-types' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Request Categories & Types</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('definitions-request-types')}
                      onMarkAsConfigured={() => markSectionConfigured('definitions-request-types', currentAgent)}
                      onReconfigure={() => markSectionConfigured('definitions-request-types', currentAgent)}
                      sectionName="Request Types"
                    />
                  </div>
                  {requestCategories.map((category) => (
                    <div key={category.id} className="border-2 border-slate-300 rounded-xl overflow-hidden">
                      <div className="p-4 bg-slate-50 flex items-center justify-between">
                        <button
                          onClick={() => setExpandedReqCategoryId(expandedReqCategoryId === category.id ? null : category.id)}
                          className="flex items-center gap-3 flex-1"
                        >
                          <svg className={`w-5 h-5 transition-transform ${expandedReqCategoryId === category.id ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="font-semibold">{category.name}</span>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs rounded">{category.requestTypes.length} types</span>
                        </button>
                      </div>
                      {expandedReqCategoryId === category.id && (
                        <div className="p-5 bg-white border-t-2 space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Category Name</label>
                            <input
                              type="text"
                              value={category.name}
                              onChange={(e) => setRequestCategories(prev => prev.map(c => c.id === category.id ? {...c, name: e.target.value} : c))}
                              className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg"
                              aria-label="Request category name"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-3">Request Types</h4>
                            <div className="space-y-2">
                              {category.requestTypes.map((rt) => (
                                <div key={rt.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                  <input
                                    type="text"
                                    value={rt.name}
                                    onChange={(e) => setRequestCategories(prev => prev.map(c => c.id === category.id ? {...c, requestTypes: c.requestTypes.map(r => r.id === rt.id ? {...r, name: e.target.value} : r)} : c))}
                                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                                    aria-label={`Request type name for ${rt.id}`}
                                  />
                                  <select
                                    value={rt.processType}
                                    onChange={(e) => setRequestCategories(prev => prev.map(c => c.id === category.id ? {...c, requestTypes: c.requestTypes.map(r => r.id === rt.id ? {...r, processType: e.target.value as '1-step' | '2-step'} : r)} : c))}
                                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                                    aria-label={`Process type for ${rt.name}`}
                                  >
                                    <option value="2-step">2-Step</option>
                                    <option value="1-step">1-Step</option>
                                  </select>
                                  <button
                                    onClick={() => setRequestCategories(prev => prev.map(c => c.id === category.id ? {...c, requestTypes: c.requestTypes.filter(r => r.id !== rt.id)} : c))}
                                    className="text-red-600 hover:text-red-800"
                                    aria-label="Remove request type"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

                  {selectedModuleId === 'definitions' && selectedStepId === 'request-form' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Request Form Fields</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('definitions-request-form')}
                      onMarkAsConfigured={() => markSectionConfigured('definitions-request-form', currentAgent)}
                      onReconfigure={() => markSectionConfigured('definitions-request-form', currentAgent)}
                      sectionName="Request Form"
                    />
                  </div>
                  <div className="bg-slate-100 border border-slate-300 rounded-lg p-3 mb-4">
                    <p className="text-sm"><span className="font-semibold">{requestFields.filter(f => f.enabled).length}</span> of {requestFields.length} fields selected</p>
                  </div>
                  <div className="space-y-3">
                    {requestFields.map((field) => (
                      <div key={field.id} className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-4 p-4 bg-white">
                          <input
                            type="checkbox"
                            checked={field.enabled}
                            disabled={field.required || field.readonly}
                            onChange={() => setRequestFields(prev => prev.map(f => f.id === field.id ? {...f, enabled: !f.enabled} : f))}
                            className="w-5 h-5"
                            aria-label={`Enable ${field.label} field`}
                          />
                          <div className="flex-1">
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => setRequestFields(prev => prev.map(f => f.id === field.id ? {...f, label: e.target.value} : f))}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium"
                              aria-label={`Field label for ${field.id}`}
                            />
                          </div>
                          <select
                            value={field.inputType}
                            onChange={(e) => setRequestFields(prev => prev.map(f => f.id === field.id ? {...f, inputType: e.target.value} : f))}
                            className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                            aria-label={`Input type for ${field.label}`}
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="select">Dropdown</option>
                            <option value="textarea">Multi-line</option>
                            <option value="date">Date</option>
                            <option value="email">Email</option>
                          </select>
                          {field.inputType === 'select' && field.id === 'loan-purpose' && (
                            <button
                              onClick={() => setShowLoanPurposeOptions(!showLoanPurposeOptions)}
                              className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              {showLoanPurposeOptions ? 'Hide Options' : 'Manage Options'}
                            </button>
                          )}
                          {field.required && <span className="text-xs text-red-600 font-semibold">Required</span>}
                          {field.readonly && <span className="text-xs text-slate-500 font-semibold">Read-only</span>}
                        </div>
                        
                        {/* Dropdown Options Management - Loan Purpose Example */}
                        {field.id === 'loan-purpose' && field.inputType === 'select' && showLoanPurposeOptions && (
                          <div className="border-t border-slate-300 bg-slate-50 p-4">
                            <h4 className="text-sm font-semibold text-slate-900 mb-3">Dropdown Options for "{field.label}"</h4>
                            
                            {/* Existing Options */}
                            <div className="space-y-2 mb-4">
                              {loanPurposeOptions.map((option, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                                  <span className="text-xs font-medium text-slate-500 w-6">{idx + 1}.</span>
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...loanPurposeOptions];
                                      newOptions[idx] = e.target.value;
                                      setLoanPurposeOptions(newOptions);
                                    }}
                                    className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label={`Loan purpose option ${idx + 1}`}
                                  />
                                  <button
                                    onClick={() => setLoanPurposeOptions(loanPurposeOptions.filter((_, i) => i !== idx))}
                                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                    title="Remove option"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>

                            {/* Add New Option */}
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newLoanPurposeOption}
                                onChange={(e) => setNewLoanPurposeOption(e.target.value)}
                                placeholder="Enter new option"
                                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && newLoanPurposeOption.trim()) {
                                    setLoanPurposeOptions([...loanPurposeOptions, newLoanPurposeOption.trim()]);
                                    setNewLoanPurposeOption("");
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  if (newLoanPurposeOption.trim()) {
                                    setLoanPurposeOptions([...loanPurposeOptions, newLoanPurposeOption.trim()]);
                                    setNewLoanPurposeOption("");
                                  }
                                }}
                                disabled={!newLoanPurposeOption.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                aria-label="Add loan purpose option"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>

                            <p className="mt-3 text-xs text-slate-600">
                              Total options: <span className="font-semibold">{loanPurposeOptions.length}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

                  {/* MODULE 3: USERS SETUP TABS */}
                  {selectedModuleId === 'users' && selectedStepId === 'users' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Team Members</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('users-team-members')}
                      onMarkAsConfigured={() => markSectionConfigured('users-team-members', currentAgent)}
                      onReconfigure={() => markSectionConfigured('users-team-members', currentAgent)}
                      sectionName="Team Members"
                    />
                  </div>
                  
                  {/* Add Member Form */}
                  <div className="bg-slate-50 border border-slate-300 rounded-lg p-4 mb-4">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Add New Team Member</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                      <input
                        type="text"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        placeholder="Full Name"
                        className="px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                      <input
                        type="email"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                      <select
                        value={newMemberRole}
                        onChange={(e) => setNewMemberRole(e.target.value as "Loan Officer" | "Bank Admin" | "Job Manager")}
                        className="px-3 py-2 text-sm border border-slate-300 rounded-lg"
                        aria-label="Team member role"
                      >
                        <option value="Loan Officer">Loan Officer</option>
                        <option value="Job Manager">Job Manager</option>
                        <option value="Bank Admin">Bank Admin</option>
                      </select>
                      <button
                        onClick={() => {
                          if (newMemberName.trim() && newMemberEmail.trim()) {
                            setTeamMembers([...teamMembers, {
                              id: `tm-${Date.now()}`,
                              name: newMemberName.trim(),
                              email: newMemberEmail.trim(),
                              role: newMemberRole,
                              avatarColor: getAvatarColor(newMemberName)
                            }]);
                            setNewMemberName("");
                            setNewMemberEmail("");
                          }
                        }}
                        disabled={!newMemberName.trim() || !newMemberEmail.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#9F2E2B] hover:bg-[#8A2826] rounded-lg disabled:opacity-50"
                      >
                        Add Member
                      </button>
                    </div>
                  </div>

                  {/* Team Members List */}
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-4 p-4 bg-white border border-slate-300 rounded-lg">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                          style={{ backgroundColor: member.avatarColor }}
                        >
                          {getInitials(member.name)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{member.name}</p>
                          <p className="text-sm text-slate-600">{member.email}</p>
                          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded mt-1">
                            {member.role}
                          </span>
                        </div>
                        <button
                          onClick={() => setTeamMembers(teamMembers.filter(m => m.id !== member.id))}
                          className="text-red-600 hover:text-red-800"
                          aria-label="Remove team member"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

                  {selectedModuleId === 'users' && selectedStepId === 'lending-groups' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Lending Groups</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('users-lending-groups')}
                      onMarkAsConfigured={() => markSectionConfigured('users-lending-groups', currentAgent)}
                      onReconfigure={() => markSectionConfigured('users-lending-groups', currentAgent)}
                      sectionName="Lending Groups"
                    />
                  </div>
                  
                  {/* Lending Groups List */}
                  <div className="space-y-3">
                    {lendingGroups.map((group) => (
                      <div key={group.id} className="bg-white border border-slate-300 rounded-lg p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{group.name}</h3>
                            <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded mt-1">
                              {group.type}
                            </span>
                          </div>
                          <button
                            onClick={() => setLendingGroups(lendingGroups.filter(g => g.id !== group.id))}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Delete lending group"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-slate-500 mb-1">Regions</p>
                            <div className="flex flex-wrap gap-1">
                              {group.regions.map((region) => (
                                <span key={region} className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                                  {region}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 mb-1">Products</p>
                            <div className="flex flex-wrap gap-1">
                              {group.products.map((product) => (
                                <span key={product} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                                  {product}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => alert('Add new lending group functionality')}
                    className="w-full px-4 py-3 text-sm font-medium text-[#9F2E2B] bg-white border-2 border-dashed border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    + Add New Lending Group
                  </button>
                </div>
              )}

                  {/* MODULE 4: VENDORS SETUP TABS */}
                  
                  {/* Tab 1: Vendor Types & Credentials */}
                  {selectedModuleId === 'vendors' && selectedStepId === 'vendor-types' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Vendor Types & Credential Monitoring</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('vendors-types')}
                      onMarkAsConfigured={() => markSectionConfigured('vendors-types', currentAgent)}
                      onReconfigure={() => markSectionConfigured('vendors-types', currentAgent)}
                      sectionName="Vendor Types"
                    />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Configure vendor types and specify which credentials should be monitored for each type.
                  </p>
                  
                  {/* Vendor Types Cards */}
                  <div className="space-y-4">
                    {vendorTypes.map((type) => (
                      <div key={type.id} className="bg-white border border-slate-300 rounded-lg p-5">
                        <div className="flex items-center justify-between mb-4">
                          <input
                            type="text"
                            value={type.name}
                            onChange={(e) => setVendorTypes(vendorTypes.map(t => 
                              t.id === type.id ? {...t, name: e.target.value} : t
                            ))}
                            onFocus={() => setEditingVendorTypeId(type.id)}
                            onBlur={() => setEditingVendorTypeId(null)}
                            className={`text-lg font-semibold ${editingVendorTypeId === type.id ? 'border border-blue-500' : 'border-0'} rounded px-2 py-1 focus:outline-none focus:border-blue-500`}
                          />
                          <button
                            onClick={() => setVendorTypes(vendorTypes.filter(t => t.id !== type.id))}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Delete vendor type"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Credential Checkboxes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={type.stateLicenseRequired}
                              onChange={(e) => setVendorTypes(vendorTypes.map(t => 
                                t.id === type.id ? {...t, stateLicenseRequired: e.target.checked} : t
                              ))}
                              className="w-4 h-4 text-[#9F2E2B] border-slate-300 rounded focus:ring-[#9F2E2B]"
                            />
                            <span className="text-slate-700">State License Required</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={type.eoRequired}
                              onChange={(e) => setVendorTypes(vendorTypes.map(t => 
                                t.id === type.id ? {...t, eoRequired: e.target.checked} : t
                              ))}
                              className="w-4 h-4 text-[#9F2E2B] border-slate-300 rounded focus:ring-[#9F2E2B]"
                            />
                            <span className="text-slate-700">E&O Required</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={type.autoLiability}
                              onChange={(e) => setVendorTypes(vendorTypes.map(t => 
                                t.id === type.id ? {...t, autoLiability: e.target.checked} : t
                              ))}
                              className="w-4 h-4 text-[#9F2E2B] border-slate-300 rounded focus:ring-[#9F2E2B]"
                            />
                            <span className="text-slate-700">Auto Liability</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={type.commercialLiability}
                              onChange={(e) => setVendorTypes(vendorTypes.map(t => 
                                t.id === type.id ? {...t, commercialLiability: e.target.checked} : t
                              ))}
                              className="w-4 h-4 text-[#9F2E2B] border-slate-300 rounded focus:ring-[#9F2E2B]"
                            />
                            <span className="text-slate-700">Commercial Liability</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={type.masterAgreement}
                              onChange={(e) => setVendorTypes(vendorTypes.map(t => 
                                t.id === type.id ? {...t, masterAgreement: e.target.checked} : t
                              ))}
                              className="w-4 h-4 text-[#9F2E2B] border-slate-300 rounded focus:ring-[#9F2E2B]"
                            />
                            <span className="text-slate-700">Master Agreement</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={type.allowToLO}
                              onChange={(e) => setVendorTypes(vendorTypes.map(t => 
                                t.id === type.id ? {...t, allowToLO: e.target.checked} : t
                              ))}
                              className="w-4 h-4 text-[#9F2E2B] border-slate-300 rounded focus:ring-[#9F2E2B]"
                            />
                            <span className="text-slate-700">Allow to LO</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add New Type Button */}
                  <button
                    onClick={() => {
                      const newType: VendorTypeConfig = {
                        id: Date.now().toString(),
                        name: 'New Vendor Type',
                        stateLicenseRequired: false,
                        eoRequired: false,
                        autoLiability: false,
                        commercialLiability: false,
                        masterAgreement: false,
                        allowToLO: false
                      };
                      setVendorTypes([...vendorTypes, newType]);
                      setEditingVendorTypeId(newType.id);
                    }}
                    className="w-full py-3 px-4 text-sm font-medium text-[#9F2E2B] bg-white border-2 border-dashed border-slate-300 hover:border-[#9F2E2B] rounded-lg transition-colors"
                  >
                    + Add New Vendor Type
                  </button>
                </div>
              )}

                  {/* Tab 2: Classifications (Statuses, Specialties, Designations) */}
                  {selectedModuleId === 'vendors' && selectedStepId === 'vendor-classifications' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Vendor Classifications</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('vendors-classifications')}
                      onMarkAsConfigured={() => markSectionConfigured('vendors-classifications', currentAgent)}
                      onReconfigure={() => markSectionConfigured('vendors-classifications', currentAgent)}
                      sectionName="Vendor Classifications"
                    />
                  </div>
                  
                  {/* Section 1: Vendor Statuses */}
                  <div className="bg-white border border-slate-300 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Vendor Statuses</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Define the different lifecycle statuses for your vendors.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vendorStatuses.map((status) => (
                        <div key={status.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <div className="flex items-center gap-3 flex-1">
                            <input
                              type="text"
                              value={status.name}
                              onChange={(e) => setVendorStatuses(vendorStatuses.map(s => 
                                s.id === status.id ? {...s, name: e.target.value} : s
                              ))}
                              disabled={status.isDefault}
                              className="flex-1 text-sm font-medium bg-transparent border-0 focus:outline-none focus:ring-0 disabled:opacity-70"
                            />
                            {status.isDefault && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                System Default
                              </span>
                            )}
                            <label className="flex items-center gap-1 text-xs text-slate-600">
                              <input
                                type="checkbox"
                                checked={status.monitorCredentials}
                                onChange={(e) => setVendorStatuses(vendorStatuses.map(s => 
                                  s.id === status.id ? {...s, monitorCredentials: e.target.checked} : s
                                ))}
                                className="w-3 h-3 text-[#9F2E2B] border-slate-300 rounded"
                              />
                              Monitor
                            </label>
                          </div>
                          {!status.isDefault && (
                            <button
                              onClick={() => setVendorStatuses(vendorStatuses.filter(s => s.id !== status.id))}
                              className="text-red-600 hover:text-red-800 ml-2"
                              aria-label="Delete status"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        setVendorStatuses([...vendorStatuses, {
                          id: Date.now().toString(),
                          name: 'New Status',
                          monitorCredentials: false,
                          isDefault: false
                        }]);
                      }}
                      className="mt-3 px-4 py-2 text-sm font-medium text-[#9F2E2B] bg-white border border-[#9F2E2B] hover:bg-[#9F2E2B] hover:text-white rounded-lg transition-colors"
                    >
                      + Add Status
                    </button>
                  </div>
                  
                  {/* Section 2: Vendor Specialties */}
                  <div className="bg-white border border-slate-300 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Vendor Specialties</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Property specialties that vendors can be categorized by.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vendorSpecialties.map((specialty, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <input
                            type="text"
                            value={specialty}
                            onChange={(e) => {
                              const updated = [...vendorSpecialties];
                              updated[index] = e.target.value;
                              setVendorSpecialties(updated);
                            }}
                            className="flex-1 text-sm font-medium bg-transparent border-0 focus:outline-none focus:ring-0"
                          />
                          <button
                            onClick={() => setVendorSpecialties(vendorSpecialties.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-800 ml-2"
                            aria-label="Delete specialty"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setVendorSpecialties([...vendorSpecialties, 'New Specialty'])}
                      className="mt-3 px-4 py-2 text-sm font-medium text-[#9F2E2B] bg-white border border-[#9F2E2B] hover:bg-[#9F2E2B] hover:text-white rounded-lg transition-colors"
                    >
                      + Add Specialty
                    </button>
                  </div>
                  
                  {/* Section 3: Vendor Designations */}
                  <div className="bg-white border border-slate-300 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Vendor Designations</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Professional certifications and designations for vendors.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vendorDesignations.map((designation, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <input
                            type="text"
                            value={designation}
                            onChange={(e) => {
                              const updated = [...vendorDesignations];
                              updated[index] = e.target.value;
                              setVendorDesignations(updated);
                            }}
                            className="flex-1 text-sm font-medium bg-transparent border-0 focus:outline-none focus:ring-0"
                          />
                          <button
                            onClick={() => setVendorDesignations(vendorDesignations.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-800 ml-2"
                            aria-label="Delete designation"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setVendorDesignations([...vendorDesignations, 'New Designation'])}
                      className="mt-3 px-4 py-2 text-sm font-medium text-[#9F2E2B] bg-white border border-[#9F2E2B] hover:bg-[#9F2E2B] hover:text-white rounded-lg transition-colors"
                    >
                      + Add Designation
                    </button>
                  </div>
                </div>
              )}

                  {/* Tab 3: Additional Search Criteria */}
                  {selectedModuleId === 'vendors' && selectedStepId === 'vendor-geography' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Additional Search Criteria</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('vendors-geography')}
                      onMarkAsConfigured={() => markSectionConfigured('vendors-geography', currentAgent)}
                      onReconfigure={() => markSectionConfigured('vendors-geography', currentAgent)}
                      sectionName="Additional Search Criteria"
                    />
                  </div>
                  
                  {/* Section 1: Search Field 1 */}
                  <div className="bg-white border border-slate-300 rounded-lg p-5">
                    <div className="mb-4 pb-4 border-b border-slate-200">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Field 1 Label <span className="text-slate-500">(editable)</span>
                      </label>
                      <input
                        type="text"
                        value={field1Label}
                        onChange={(e) => setField1Label(e.target.value)}
                        placeholder="e.g., Region, Complexity, etc."
                        className="w-full max-w-md px-3 py-2 text-sm font-medium border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                      />
                    </div>
                    
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Field Values</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vendorRegions.map((region, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <input
                            type="text"
                            value={region}
                            onChange={(e) => {
                              const updated = [...vendorRegions];
                              updated[index] = e.target.value;
                              setVendorRegions(updated);
                            }}
                            className="flex-1 text-sm font-medium bg-transparent border-0 focus:outline-none focus:ring-0"
                          />
                          <button
                            onClick={() => setVendorRegions(vendorRegions.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-800 ml-2"
                            aria-label="Delete value"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setVendorRegions([...vendorRegions, 'New Value'])}
                      className="mt-3 px-4 py-2 text-sm font-medium text-[#9F2E2B] bg-white border border-[#9F2E2B] hover:bg-[#9F2E2B] hover:text-white rounded-lg transition-colors"
                    >
                      + Add New
                    </button>
                  </div>
                  
                  {/* Section 2: Search Field 2 */}
                  <div className="bg-white border border-slate-300 rounded-lg p-5">
                    <div className="mb-4 pb-4 border-b border-slate-200">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Field 2 Label <span className="text-slate-500">(editable)</span>
                      </label>
                      <input
                        type="text"
                        value={field2Label}
                        onChange={(e) => setField2Label(e.target.value)}
                        placeholder="e.g., Sub-Region, Grade Level, etc."
                        className="w-full max-w-md px-3 py-2 text-sm font-medium border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B]"
                      />
                    </div>
                    
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Field Values</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vendorSubRegions.map((subRegion, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <input
                            type="text"
                            value={subRegion}
                            onChange={(e) => {
                              const updated = [...vendorSubRegions];
                              updated[index] = e.target.value;
                              setVendorSubRegions(updated);
                            }}
                            className="flex-1 text-sm font-medium bg-transparent border-0 focus:outline-none focus:ring-0"
                          />
                          <button
                            onClick={() => setVendorSubRegions(vendorSubRegions.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-800 ml-2"
                            aria-label="Delete value"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setVendorSubRegions([...vendorSubRegions, 'New Value'])}
                      className="mt-3 px-4 py-2 text-sm font-medium text-[#9F2E2B] bg-white border border-[#9F2E2B] hover:bg-[#9F2E2B] hover:text-white rounded-lg transition-colors"
                    >
                      + Add New
                    </button>
                  </div>
                </div>
              )}

                  {/* Tab 4: Vendor List Template */}
                  {selectedModuleId === 'vendors' && selectedStepId === 'vendor-upload' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Vendor List Template</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('vendors-upload')}
                      onMarkAsConfigured={() => markSectionConfigured('vendors-upload', currentAgent)}
                      onReconfigure={() => markSectionConfigured('vendors-upload', currentAgent)}
                      sectionName="Vendor Template"
                    />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Review the vendor roster template submitted by the client.
                  </p>

                  {/* Template Information */}
                  <div className="bg-white border border-slate-300 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-slate-900">Template Information</h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            // Simulate download
                            const csvContent = "Vendor Name,Company,Email,Phone,License Number,Coverage States\nJohn Appraiser,ABC Appraisals Inc,john@abcappraisals.com,(555) 123-4567,LA-12345,California|Nevada\nJane Reviewer,XYZ Reviews LLC,jane@xyzreviews.com,(555) 987-6543,LR-67890,Arizona|Texas|New Mexico";
                            const blob = new Blob([csvContent], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'union-bank-vendor-template.csv';
                            a.click();
                            window.URL.revokeObjectURL(url);
                          }}
                          className="px-4 py-2 text-sm font-medium text-[#9F2E2B] bg-white border border-[#9F2E2B] hover:bg-[#9F2E2B] hover:text-white rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Template
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Mark all vendors as configured in the system?')) {
                              // In a real app, this would update the status
                              alert('Vendors marked as configured');
                            }
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Mark as Configured
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">File Name:</span>
                        <span className="font-medium text-slate-900">vendor-template.csv</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Upload Date:</span>
                        <span className="font-medium text-slate-900">Oct 28, 2024</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Total Vendors:</span>
                        <span className="font-medium text-slate-900">2</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-slate-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          vendorTemplateStatus === 'reviewed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {vendorTemplateStatus === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

                  {/* MODULE 5: ROUTING TABS */}
                  {selectedModuleId === 'routing' && selectedStepId === 'request-type-routing' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Request Type Routing Rules</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('routing-request-type')}
                      onMarkAsConfigured={() => markSectionConfigured('routing-request-type', currentAgent)}
                      onReconfigure={() => markSectionConfigured('routing-request-type', currentAgent)}
                      sectionName="Request Type Routing"
                    />
                  </div>
                  {routingRules.filter(r => r.type === 'Request Type').map((rule) => (
                    <div key={rule.id} className="bg-white border border-slate-300 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{rule.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">
                            <span className="font-medium">Assigns to:</span> {rule.assignee}
                          </p>
                          <p className="text-sm text-slate-600">
                            <span className="font-medium">When:</span> {rule.conditions}
                          </p>
                        </div>
                        <button className="text-red-600 hover:text-red-800" aria-label="Delete routing rule">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full px-4 py-3 text-sm font-medium text-[#9F2E2B] border-2 border-dashed border-red-300 rounded-lg hover:bg-red-50">
                    + Add New Rule
                  </button>
                </div>
              )}

                  {selectedModuleId === 'routing' && selectedStepId === 'logical-routing' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Logical Routing Rules</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('routing-logical')}
                      onMarkAsConfigured={() => markSectionConfigured('routing-logical', currentAgent)}
                      onReconfigure={() => markSectionConfigured('routing-logical', currentAgent)}
                      sectionName="Logical Routing"
                    />
                  </div>
                  {routingRules.filter(r => r.type === 'Logical').map((rule) => (
                    <div key={rule.id} className="bg-white border border-slate-300 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{rule.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">
                            <span className="font-medium">Assigns to:</span> {rule.assignee}
                          </p>
                          <p className="text-sm text-slate-600">
                            <span className="font-medium">Conditions:</span> {rule.conditions}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

                  {selectedModuleId === 'routing' && selectedStepId === 'assigned-area' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Assigned Area Routing Rules</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('routing-assigned-area')}
                      onMarkAsConfigured={() => markSectionConfigured('routing-assigned-area', currentAgent)}
                      onReconfigure={() => markSectionConfigured('routing-assigned-area', currentAgent)}
                      sectionName="Assigned Area Routing"
                    />
                  </div>
                  {routingRules.filter(r => r.type === 'Assigned Area').map((rule) => (
                    <div key={rule.id} className="bg-white border border-slate-300 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{rule.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">
                            <span className="font-medium">Assigns to:</span> {rule.assignee}
                          </p>
                          <p className="text-sm text-slate-600">
                            <span className="font-medium">Areas:</span> {rule.conditions}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

                  {/* MODULE 6: GENERAL SETTINGS TABS */}
                  {selectedModuleId === 'general-settings' && selectedStepId === 'workflow-timers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Workflow & Timer Configuration</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('general-settings-workflow')}
                      onMarkAsConfigured={() => markSectionConfigured('general-settings-workflow', currentAgent)}
                      onReconfigure={() => markSectionConfigured('general-settings-workflow', currentAgent)}
                      sectionName="Workflow Timers"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white border border-slate-300 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Order Submitted to Vendor Solicitation</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={workflowTimers.orderSubmitted}
                          onChange={(e) => setWorkflowTimers({...workflowTimers, orderSubmitted: parseInt(e.target.value)})}
                          className="w-24 px-3 py-2 border border-slate-300 rounded-lg"
                          aria-label="Order submitted to vendor solicitation hours"
                        />
                        <span className="text-sm text-slate-600">hours</span>
                      </div>
                    </div>
                    <div className="bg-white border border-slate-300 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Vendor Solicitation to Report</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={workflowTimers.vendorSolicitation}
                          onChange={(e) => setWorkflowTimers({...workflowTimers, vendorSolicitation: parseInt(e.target.value)})}
                          className="w-24 px-3 py-2 border border-slate-300 rounded-lg"
                          aria-label="Vendor solicitation to report hours"
                        />
                        <span className="text-sm text-slate-600">hours</span>
                      </div>
                    </div>
                    <div className="bg-white border border-slate-300 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Report to Review Completion</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={workflowTimers.reportReceived}
                          onChange={(e) => setWorkflowTimers({...workflowTimers, reportReceived: parseInt(e.target.value)})}
                          className="w-24 px-3 py-2 border border-slate-300 rounded-lg"
                          aria-label="Report to review completion hours"
                        />
                        <span className="text-sm text-slate-600">hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

                  {selectedModuleId === 'general-settings' && selectedStepId === 'bid-engagement' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Bid & Engagement Panel Settings</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('general-settings-bid-engagement')}
                      onMarkAsConfigured={() => markSectionConfigured('general-settings-bid-engagement', currentAgent)}
                      onReconfigure={() => markSectionConfigured('general-settings-bid-engagement', currentAgent)}
                      sectionName="Bid Engagement"
                    />
                  </div>
                  <div className="space-y-3">
                    {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option) => (
                      <label key={option} className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer ${bidEngagementPanel === option ? 'border-[#9F2E2B] bg-red-50' : 'border-slate-300'}`}>
                        <input
                          type="radio"
                          checked={bidEngagementPanel === option}
                          onChange={() => setBidEngagementPanel(option)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{option}</h4>
                          <p className="text-xs text-slate-600">Bid panel configuration {option.toLowerCase()}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

                  {selectedModuleId === 'general-settings' && selectedStepId === 'notifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Notification Settings</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('general-settings-notifications')}
                      onMarkAsConfigured={() => markSectionConfigured('general-settings-notifications', currentAgent)}
                      onReconfigure={() => markSectionConfigured('general-settings-notifications', currentAgent)}
                      sectionName="Notifications"
                    />
                  </div>
                  <div className="text-center py-8 text-slate-600">
                    <p>Notification preferences and email templates</p>
                  </div>
                </div>
              )}

                  {/* MODULE 7: IT READINESS TABS */}
                  {selectedModuleId === 'it-checklist' && selectedStepId === 'it-checklist' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">IT Readiness Checklist</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('it-checklist-readiness')}
                      onMarkAsConfigured={() => markSectionConfigured('it-checklist-readiness', currentAgent)}
                      onReconfigure={() => markSectionConfigured('it-checklist-readiness', currentAgent)}
                      sectionName="IT Readiness"
                    />
                  </div>
                  <div className="space-y-2">
                    {itChecklistItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-white border border-slate-300 rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.status === 'completed' ? 'bg-green-100' :
                          item.status === 'in-progress' ? 'bg-blue-100' : 'bg-slate-100'
                        }`}>
                          {item.status === 'completed' && (
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {item.status === 'in-progress' && (
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{item.task}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded mt-1 ${
                            item.status === 'completed' ? 'bg-green-100 text-green-800' :
                            item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'In Progress' : 'Pending'}
                          </span>
                        </div>
                        <select
                          value={item.status}
                          onChange={(e) => setItChecklistItems(prev => prev.map(i => i.id === item.id ? {...i, status: e.target.value as ChecklistStatus} : i))}
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          aria-label={`Status for ${item.task}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

                  {selectedModuleId === 'it-checklist' && selectedStepId === 'security-compliance' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Security & Compliance</h2>
                    <ConfiguredBadge
                      status={getSectionConfigStatus('it-checklist-security')}
                      onMarkAsConfigured={() => markSectionConfigured('it-checklist-security', currentAgent)}
                      onReconfigure={() => markSectionConfigured('it-checklist-security', currentAgent)}
                      sectionName="Security & Compliance"
                    />
                  </div>
                  <div className="text-center py-8 text-slate-600">
                    <p>Security compliance verification and documentation</p>
                  </div>
                </div>
              )}

                  {/* Empty state for other modules */}
                  {selectedModuleId !== 'organization-setup' && selectedModuleId !== 'definitions' && selectedModuleId !== 'users' && selectedModuleId !== 'vendors' && selectedModuleId !== 'routing' && selectedModuleId !== 'general-settings' && selectedModuleId !== 'it-checklist' && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {selectedModule.title} Configuration
                  </h3>
                  <p className="text-slate-600">
                    Content for this module will be displayed here once the client completes it.
                  </p>
                </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Notification Slide-out Panel */}
      {showNotifications && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowNotifications(false)} />
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
            {/* Panel Header */}
            <div className="border-b border-slate-200 p-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
                <p className="text-xs text-slate-600">{unreadCount} unread</p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Close notifications"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto h-[calc(100vh-80px)]">
              {notifications.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <svg className="w-16 h-16 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p className="text-sm text-slate-600">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-slate-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon based on type */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.type === 'ticket' ? 'bg-amber-100' :
                          notification.type === 'completion' ? 'bg-green-100' :
                          'bg-blue-100'
                        }`}>
                          {notification.type === 'ticket' && (
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                          )}
                          {notification.type === 'completion' && (
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {notification.type === 'progress' && (
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                          <p className="text-xs text-slate-500">
                            {new Date(notification.timestamp).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Ticket Details Modal */}
      {viewingTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            {/* Modal Header */}
            <div className="border-b border-slate-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Ticket Details</h2>
                  <p className="text-sm text-slate-600">{viewingTicket.id}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setViewingTicket(null);
                  setOpenTicketMenuId(null);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Ticket Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-xs font-medium text-slate-500 mb-1">Ticket ID</p>
                  <p className="text-sm font-mono font-semibold text-slate-900">{viewingTicket.id}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-xs font-medium text-slate-500 mb-1">Module</p>
                  <p className="text-sm font-semibold text-slate-900">{viewingTicket.moduleName}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-xs font-medium text-slate-500 mb-1">Created Date</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {new Date(viewingTicket.createdDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-xs font-medium text-slate-500 mb-1">Status</p>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                    viewingTicket.status === 'resolved' 
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {viewingTicket.status === 'resolved' ? 'Resolved' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Message</label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-sm text-slate-700 leading-relaxed">{viewingTicket.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                {viewingTicket.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleEscalate(viewingTicket.id);
                        setViewingTicket(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Escalate
                    </button>
                    <button
                      onClick={() => {
                        handleMarkAsResolved(viewingTicket.id);
                        setViewingTicket(null);
                      }}
                      className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark as Resolved
                    </button>
                  </>
                )}
                {viewingTicket.status === 'resolved' && (
                  <button
                    onClick={() => setViewingTicket(null)}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Go-Live Date Edit Modal */}
      {showDateEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="border-b border-slate-200 p-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Edit Projected Go-Live Date</h2>
              <button
                onClick={() => setShowDateEditModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="edit-go-live-date" className="block text-sm font-semibold text-slate-700 mb-2">
                  Projected Go-Live Date <span className="text-red-600">*</span>
                </label>
                <input
                  id="edit-go-live-date"
                  type="date"
                  value={tempGoLiveDate}
                  onChange={(e) => setTempGoLiveDate(e.target.value)}
                  min={initiationDate}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-sm"
                />
                <p className="text-xs text-slate-500 mt-2">
                  This date will be visible to the client throughout their onboarding process
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-blue-900">
                    Adjusting this date will update the timeline shown to {clientName} and affect their status heat indicator.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowDateEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateProjectedGoLiveDate(tempGoLiveDate);
                    setShowDateEditModal(false);
                    alert(`Go-Live date updated to ${new Date(tempGoLiveDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. This will be reflected across the client list and client hub.`);
                  }}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md"
                >
                  Update Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module Completion Date Modal */}
      {showModuleDateModal && selectedModuleForDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  {selectedModuleForDate.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Set Target Date</h3>
                  <p className="text-xs text-slate-500">{selectedModuleForDate.title}</p>
                </div>
              </div>
              <button
                onClick={handleCloseModuleDateModal}
                className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Info Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Go-Live Date:</strong> {formatDate(projectedGoLiveDate)}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Set realistic target dates to ensure modules are completed before go-live.
                </p>
              </div>

              {/* Current Date Display */}
              {moduleCompletionDates[selectedModuleForDate.id] && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-600 mb-1">Currently Set To:</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatDate(moduleCompletionDates[selectedModuleForDate.id])}
                  </p>
                </div>
              )}

              {/* Date Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Target Completion Date
                </label>
                <input
                  type="date"
                  value={tempModuleDate}
                  onChange={(e) => setTempModuleDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F2E2B] focus:border-transparent text-slate-900"
                />
                <p className="text-xs text-slate-500">
                  Select a date between today and the go-live date.
                </p>
              </div>

              {/* Risk Indicator */}
              {tempModuleDate && isDateAtRisk(tempModuleDate) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-red-800">⚠️ At Risk</p>
                    <p className="text-xs text-red-700">This date is very close to the go-live date. Consider moving it earlier.</p>
                  </div>
                </div>
              )}

              {/* Progress Context */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-xs font-medium text-slate-600 mb-2">Module Progress</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-[#9F2E2B] h-2 rounded-full transition-all"
                      style={{ width: `${getModuleProgress(selectedModuleForDate.id)}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 min-w-fit">
                    {getModuleProgress(selectedModuleForDate.id)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={handleCloseModuleDateModal}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModuleDate}
                disabled={!tempModuleDate}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Set Target Date
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EditClientPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
      <EditClientContent />
    </Suspense>
  );
}

