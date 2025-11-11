"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// ========================================
// NEW 6-MODULE STRUCTURE
// ========================================
export type OnboardingModule = 
  | 'company-setup'
  | 'definitions'
  | 'users'
  | 'vendors'
  | 'routing'
  | 'general-settings'
  | 'it-checklist';

export type ModuleStatus = 'not_started' | 'in_progress' | 'completed';

export interface ModuleAssignment {
  moduleId: string;
  assignedParticipantIds: string[]; // IDs of assigned onboarding participants
}

// MODULE 1: Company Setup
export interface OnboardingParticipant {
  id: string;
  name: string;
  email: string;
  role?: string; // Optional department/role (e.g., IT Team, Vendor Relations)
  avatarColor?: string; // For generated avatars
}

export interface CompanySetupData {
  hasResidentialAppraisals: boolean;
  hasCommercialAppraisals: boolean;
  hasEnvironmental: boolean;
  hasExternalReviews: boolean;
  itChecklistComplete: boolean;
  regions: string[]; // Selected regions of operation
  states: string[]; // Selected states based on regions
  
  // New fields for redesigned Module 1
  organizationName?: string;
  customUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
  secondaryLogoUrl?: string;
  brandingSkipped?: boolean;
  primaryDecisionMaker?: OnboardingParticipant;
  additionalParticipants?: OnboardingParticipant[];
  ssoEnabled?: boolean;
  ssoProvider?: string;
  ipRestrictionsEnabled?: boolean;
  ipWhitelist?: string[];
  mfaRequired?: boolean;
  sessionTimeout?: number;
  
  completed: boolean;
}

// Alias for better naming (OrganizationSetup = CompanySetup)
export type OrganizationSetupData = CompanySetupData;

// MODULE 2: Definitions
export interface RequestTypeDefinition {
  id: string;
  name: string;
  type: '2-step' | '1-step';
  description: string;
  enabled: boolean;
}

export interface PropertyDefinition {
  id: string;
  category: string;
  types: string[];
}

// Property Record Field Definition (for property setup in Module 2)
export interface PropertyRecordField {
  id: string;
  label: string;
  customLabel?: string; // User's custom label name (overrides default label)
  category: 'overview' | 'advanced';
  type: 'text' | 'number' | 'select' | 'textarea';
  options?: string[]; // For select fields
  enabled: boolean; // Whether user wants this field in their standard property record
  required?: boolean;
  systemRequired?: boolean; // System-required field that cannot be disabled or made optional
  placeholder?: string;
}

export interface OrderFormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea';
  required: boolean;
  visible: boolean;
  order: number;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  defaultValue?: string;
}

// Request Form Field Definition (for request form setup in Module 2)
export interface RequestFormField {
  id: string;
  label: string;
  customLabel?: string; // User's custom label name (overrides default label)
  category: 'overview' | 'details';
  type: 'text' | 'number' | 'select' | 'textarea' | 'email' | 'tel' | 'date';
  options?: string[]; // For select fields
  enabled: boolean; // Whether user wants this field in their standard request form
  required?: boolean;
  systemRequired?: boolean; // System-required field that cannot be disabled or made optional
  placeholder?: string;
  readonly?: boolean; // For overview fields that shouldn't be edited
}

export interface PropertyCategory {
  id: string;
  name: string;
  type: 'Residential' | 'Commercial' | 'Environmental' | 'Agricultural' | 'Other';
  propertyTypes: string[]; // List of property types under this category
}

export interface CustomRequestType {
  id: string;
  name: string;
  category: 'Residential' | 'Commercial' | 'Environmental' | 'Agricultural' | 'Other';
  processType?: '1-step' | '2-step'; // Request process type
}

export interface RequestCategory {
  id: string;
  name: string;
  requestTypes: CustomRequestType[];
}

export interface BidPanelField {
  id: string;
  label: string;
  enabled: boolean;
  required: boolean;
  systemRequired?: boolean; // System-required field that cannot be disabled or made optional
  readonly: boolean;
  customLabel?: string;
  inputType?: 'text' | 'textarea' | 'select' | 'number' | 'date';
  dropdownOptions?: string[];
}

export interface DefinitionsData {
  propertyCategories: PropertyCategory[]; // Custom property categories
  customRequestTypes: CustomRequestType[]; // Custom request types
  requestCategories: RequestCategory[]; // Request categories with nested request types
  requestTypes: RequestTypeDefinition[];
  properties: PropertyDefinition[];
  propertyRecordFields: PropertyRecordField[]; // New: fields for property records
  selectedSamplePropertyId?: string; // New: which sample property was selected for preview
  requestFormFields: RequestFormField[]; // New: fields for request forms
  selectedSampleRequestId?: string; // New: which sample request was selected for preview
  orderFormFields: OrderFormField[]; // Legacy - kept for backward compatibility
  documentTypes: string[];
  rejectReasons: string[];
  reviewTypes: string[];
  reviewActions: string[];
  // Bid Engagement Panel Configuration
  bidPanelType?: '3-column' | '4-column' | 'checkboxes' | 'dropdowns';
  useEnvironmental?: boolean;
  appraisalPanelFields?: BidPanelField[];
  environmentalPanelFields?: BidPanelField[];
  completed: boolean;
}

// MODULE 3: Users
export type UserRole = 'bank-admin' | 'job-manager' | 'loan-officer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface LendingGroup {
  id: string;
  name: string;
  type: 'Commercial' | 'Consumer' | 'Mortgage' | 'Auto' | 'Personal' | 'Small Business' | 'Credit Card' | 'Other';
  regions: string[];
  products: string[];
}

export interface UsersData {
  users: User[];
  lendingGroups: LendingGroup[];
  workbookImported: boolean;
  completed: boolean;
}

// MODULE 4: Routing
export type RouteType = 'request-type' | 'logical' | 'assigned-area';

export interface RouteRule {
  id: string;
  name: string;
  type: RouteType;
  priority: number;
  enabled: boolean;
  config: {
    // Request Type Job Manager fields
    jobManagerId?: string; // Single job manager
    requestTypeIds?: string[]; // Multi-select request types
    
    // Assigned Area fields
    assignedAreaJobManagerId?: string; // Single job manager
    locationIds?: string[]; // Multi-select locations (no request types)
    
    // Logical Routing fields
    assigneeId?: string; // Primary assignee
    assignToCopyId?: string; // Single user to copy (changed from multi-select)
    propertyCategoryIds?: string[]; // Multi-select property categories
    logicalRequestTypeIds?: string[]; // Multi-select request types
    lendingGroupIds?: string[]; // Multi-select lending groups
    logicalLocationIds?: string[]; // Multi-select locations
    
    // Legacy fields (kept for backward compatibility)
    conditions?: {
      field: string;
      operator: 'equals' | 'greater-than' | 'less-than' | 'contains';
      value: string;
    }[];
    area?: string;
    defaultAssignee?: string;
  };
}

export interface RoutingData {
  routes: RouteRule[];
  selectedRoutingTypes?: ('request-type' | 'logical' | 'assigned-area')[];
  requestTypeCompleted?: boolean;
  logicalCompleted?: boolean;
  assignedAreaCompleted?: boolean;
  completed: boolean;
}

// MODULE 5: General Settings
export interface TimersSettings {
  vendorResponseDays: number;
  reviewDueDateDays: number;
  vendorLateDays: number;
  dailyEmailsEnabled: boolean;
  escalateToManagersEnabled: boolean;
  weekendNotificationsEnabled: boolean;
  completed?: boolean;
}

export interface BidEngagementPanel {
  templates: {
    id: string;
    name: string;
    description: string;
    configuredByRealwired: boolean;
  }[];
  readonly: boolean;
}

export interface GeneralSettingsData {
  daysCalculation: 'business' | 'calendar';
  reviewApprovalRequired: boolean;
  timers: TimersSettings;
  bidEngagementPanel: BidEngagementPanel;
  completed: boolean;
}

// MODULE 6: IT Checklist
export interface ITChecklistData {
  emailDomainsAllowlisted: boolean;
  urlAccessVerified: boolean;
  completed: boolean;
}


// Module Progress Tracking (for display in hub)
export interface ModuleProgress {
  currentStep: number;  // Current step index (0-based)
  totalSteps: number;   // Total number of steps in the module
}

// Section Configuration Status (for CS portal tracking)
export interface SectionConfigStatus {
  isConfigured: boolean;
  configuredBy?: string; // CS agent name
  configuredAt?: string; // ISO timestamp
}

// ========================================
// COMBINED STATE INTERFACE
// ========================================
interface OnboardingState {
  currentModule: OnboardingModule;
  moduleStatuses: Record<OnboardingModule, ModuleStatus>;
  moduleAssignments: ModuleAssignment[]; // NEW: Track which participants are assigned to each module
  moduleProgress: Record<string, ModuleProgress>; // NEW: Track progress for display in hub
  configuredSections: Record<string, SectionConfigStatus>; // NEW: Track CS agent configuration status per section
  projectedGoLiveDate?: string; // ISO date string - set by CS team
  initiationDate?: string; // ISO date string - when onboarding started
  companySetup: CompanySetupData;
  definitions: DefinitionsData;
  users: UsersData;
  routing: RoutingData;
  generalSettings: GeneralSettingsData;
  itChecklist: ITChecklistData;
}

interface OnboardingContextType {
  state: OnboardingState;
  
  updateCompanySetup: (data: Partial<CompanySetupData>) => void;
  updateDefinitions: (data: Partial<DefinitionsData>) => void;
  updateUsers: (data: Partial<UsersData>) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  updateRouting: (data: Partial<RoutingData>) => void;
  addRoute: (route: Omit<RouteRule, 'id'>) => void;
  updateRoute: (routeId: string, updates: Partial<RouteRule>) => void;
  deleteRoute: (routeId: string) => void;
  updateGeneralSettings: (data: Partial<GeneralSettingsData>) => void;
  updateITChecklist: (data: Partial<ITChecklistData>) => void;
  goToModule: (module: OnboardingModule) => void;
  markModuleComplete: (module: OnboardingModule) => void;
  canProceed: (module: OnboardingModule) => boolean;
  updateModuleAssignment: (moduleId: string, participantIds: string[]) => void;
  updateModuleProgress: (moduleId: string, currentStep: number, totalSteps: number) => void; // NEW
  resetModuleProgress: (moduleId: string) => void; // NEW
  updateProjectedGoLiveDate: (date: string) => void; // NEW: Set projected go-live date
  markSectionConfigured: (sectionId: string, agentName: string) => void; // NEW: Mark section as configured by CS agent
  getSectionConfigStatus: (sectionId: string) => SectionConfigStatus; // NEW: Get configuration status for a section
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialState: OnboardingState = {
  // New structure
  currentModule: 'company-setup',
  moduleStatuses: {
    'company-setup': 'not_started',
    'definitions': 'not_started',
    'users': 'not_started',
    'vendors': 'not_started',
    'routing': 'not_started',
    'general-settings': 'not_started',
    'it-checklist': 'not_started',
  },
  moduleAssignments: [
    { moduleId: 'company-setup', assignedParticipantIds: ['primary-decision-maker'] },
    { moduleId: 'definitions', assignedParticipantIds: ['primary-decision-maker'] },
    { moduleId: 'users', assignedParticipantIds: ['primary-decision-maker'] },
    { moduleId: 'vendors', assignedParticipantIds: ['primary-decision-maker'] },
    { moduleId: 'routing', assignedParticipantIds: ['primary-decision-maker'] },
    { moduleId: 'general-settings', assignedParticipantIds: ['primary-decision-maker'] },
    { moduleId: 'it-checklist', assignedParticipantIds: ['primary-decision-maker'] },
  ],
  moduleProgress: {}, // Initialize empty - will be populated as user progresses
  configuredSections: {}, // Initialize empty - will be populated as CS agents configure sections
  projectedGoLiveDate: '2026-02-12', // Sample projected date - healthy timeline
  initiationDate: '2024-10-28', // Sample initiation date - recent start
  companySetup: {
    hasResidentialAppraisals: false,
    hasCommercialAppraisals: false,
    hasEnvironmental: false,
    hasExternalReviews: false,
    itChecklistComplete: false,
    regions: [],
    states: [],
    organizationName: 'Union Bank',
    customUrl: 'union-bank',
    // Sample participants for assignment (available regardless of user input)
    primaryDecisionMaker: {
      id: 'primary-decision-maker',
      name: 'John Smith',
      email: 'john.smith@unionbank.com',
      avatarColor: '#9F2E2B'
    },
    additionalParticipants: [
      {
        id: 'participant-2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@unionbank.com',
        role: 'IT Team',
        avatarColor: '#3B82F6'
      },
      {
        id: 'participant-3',
        name: 'Michael Chen',
        email: 'michael.chen@unionbank.com',
        role: 'Vendor Relations',
        avatarColor: '#10B981'
      },
      {
        id: 'participant-4',
        name: 'Emily Davis',
        email: 'emily.davis@unionbank.com',
        role: 'Operations',
        avatarColor: '#F59E0B'
      },
      {
        id: 'participant-5',
        name: 'Robert Wilson',
        email: 'robert.wilson@unionbank.com',
        role: 'Compliance',
        avatarColor: '#8B5CF6'
      }
    ],
    completed: false, // Module 1 is NOT completed initially
  },
  definitions: {
    propertyCategories: [
      { 
        id: 'cat-1', 
        name: 'Single Family Residential', 
        type: 'Residential',
        propertyTypes: [
          'Single Family - Detached',
          'Single Family - Attached',
          'Townhouse',
          'Condominium',
          'Mobile Home'
        ]
      },
      { 
        id: 'cat-2', 
        name: 'Multi-Family Residential', 
        type: 'Residential',
        propertyTypes: [
          '2-4 Unit Property',
          'Apartment Building (5+ Units)',
          'Duplex',
          'Triplex',
          'Fourplex'
        ]
      },
      { 
        id: 'cat-3', 
        name: 'Office', 
        type: 'Commercial',
        propertyTypes: [
          'Single-Tenant Office',
          'Multi-Tenant Office Building',
          'Office Park',
          'Medical Office Building',
          'Professional Office Complex'
        ]
      },
      { 
        id: 'cat-4', 
        name: 'Retail', 
        type: 'Commercial',
        propertyTypes: [
          'Strip Center',
          'Neighborhood Shopping Center',
          'Regional Mall',
          'Standalone Retail',
          'Big Box Store'
        ]
      },
      { 
        id: 'cat-5', 
        name: 'Industrial', 
        type: 'Commercial',
        propertyTypes: [
          'Warehouse',
          'Distribution Center',
          'Manufacturing Facility',
          'Flex Space',
          'Cold Storage'
        ]
      },
      { 
        id: 'cat-6', 
        name: 'Hospitality', 
        type: 'Commercial',
        propertyTypes: [
          'Full Service Hotel',
          'Limited Service Hotel',
          'Extended Stay',
          'Resort',
          'Motel'
        ]
      },
      { 
        id: 'cat-7', 
        name: 'Special Purpose', 
        type: 'Commercial',
        propertyTypes: [
          'Church',
          'School',
          'Hospital',
          'Nursing Home',
          'Self-Storage'
        ]
      },
      { 
        id: 'cat-8', 
        name: 'Mixed-Use', 
        type: 'Mixed',
        propertyTypes: [
          'Residential/Retail',
          'Office/Retail',
          'Residential/Office',
          'Multi-Purpose Complex'
        ]
      },
      { 
        id: 'cat-9', 
        name: 'Land', 
        type: 'Land',
        propertyTypes: [
          'Vacant Land',
          'Agricultural Land',
          'Residential Development Site',
          'Commercial Development Site',
          'Industrial Development Site'
        ]
      },
      { 
        id: 'cat-10', 
        name: 'Other', 
        type: 'Other',
        propertyTypes: [
          'Parking Lot/Garage',
          'Marina',
          'Golf Course',
          'Gas Station',
          'Car Wash'
        ]
      },
    ],
    customRequestTypes: [
      { id: 'rt-1', name: 'Residential Appraisal', category: 'Residential' },
      { id: 'rt-2', name: 'Commercial Appraisal', category: 'Commercial' },
      { id: 'rt-3', name: 'BPO (Broker Price Opinion)', category: 'Residential' },
    ],
    requestCategories: [
      {
        id: 'req-cat-1',
        name: 'Appraisal',
        requestTypes: [
          { id: 'rt-app-1', name: 'Appraisal (Internal)', category: 'Residential', processType: '2-step' },
          { id: 'rt-app-2', name: 'Commercial Appraisal', category: 'Commercial', processType: '2-step' },
          { id: 'rt-app-3', name: 'Commercial Evaluation (External)', category: 'Commercial', processType: '1-step' },
          { id: 'rt-app-4', name: 'In-House Evaluation', category: 'Residential', processType: '1-step' },
          { id: 'rt-app-5', name: 'Residential Appraisal (1-4 Family)', category: 'Residential', processType: '2-step' },
          { id: 'rt-app-6', name: 'Review', category: 'Other', processType: '1-step' },
          { id: 'rt-app-7', name: 'Validity Check', category: 'Other', processType: '1-step' },
        ]
      },
      {
        id: 'req-cat-2',
        name: 'Environmental',
        requestTypes: [
          { id: 'rt-env-1', name: 'ESA I PNA', category: 'Environmental', processType: '2-step' },
          { id: 'rt-env-2', name: 'ESA I PNA (SBL)', category: 'Environmental', processType: '2-step' },
          { id: 'rt-env-3', name: 'Environmental Records Search', category: 'Environmental', processType: '1-step' },
          { id: 'rt-env-4', name: 'Environmental Records Search - Risk Assessment - SBA', category: 'Environmental', processType: '2-step' },
          { id: 'rt-env-5', name: 'Environmental Questionnaire Review', category: 'Environmental', processType: '1-step' },
          { id: 'rt-env-6', name: 'Environmental Assessment', category: 'Environmental', processType: '2-step' },
          { id: 'rt-env-7', name: '(HUD) Radon / Fall Study / FFRMS / Green / Noise', category: 'Environmental', processType: '2-step' },
        ]
      }
    ],
    requestTypes: [
      {
        id: 'appraisal-2step',
        name: 'Appraisal (2-Step)',
        type: '2-step',
        description: 'YouConnect manages vendor engagement and your reviewer evaluates the report',
        enabled: true,
      },
      {
        id: 'review-only',
        name: 'Review Only (1-Step)',
        type: '1-step',
        description: 'Internal reviewer evaluates documents submitted directly',
        enabled: true,
      },
    ],
    properties: [
      { id: 'residential', category: 'Residential', types: ['Single Family', 'Condo', 'Townhouse'] },
      { id: 'commercial', category: 'Commercial', types: ['Office', 'Retail', 'Industrial'] },
      { id: 'land', category: 'Land', types: ['Vacant', 'Agricultural'] },
    ],
    propertyRecordFields: [
      // Overview Section
      { id: 'street-address', label: 'Street Address', category: 'overview', type: 'text', enabled: true, required: true, systemRequired: true, placeholder: '123 Main Street' },
      { id: 'apt-unit', label: 'Apt/Unit Number', category: 'overview', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'Unit 4B' },
      { id: 'city', label: 'City', category: 'overview', type: 'text', enabled: true, required: true, systemRequired: true, placeholder: 'Springfield' },
      { id: 'state', label: 'State', category: 'overview', type: 'select', enabled: true, required: true, systemRequired: true, options: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'] },
      { id: 'zip-code', label: 'ZIP Code', category: 'overview', type: 'text', enabled: true, required: true, systemRequired: true, placeholder: '12345' },
      { id: 'county', label: 'County', category: 'overview', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'County Name' },
      { id: 'legal-description', label: 'Legal Description', category: 'overview', type: 'textarea', enabled: false, required: false, systemRequired: false, placeholder: 'Full legal description of property' },
      { id: 'parcel-id', label: 'Parcel/Tax ID', category: 'overview', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'APN-123-456-789' },
      
      // Advanced Details Section
      { id: 'property-category', label: 'Property Category', category: 'advanced', type: 'select', enabled: true, required: true, systemRequired: true, options: ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Mixed-Use', 'Special Purpose'] },
      { id: 'property-type', label: 'Property Type', category: 'advanced', type: 'select', enabled: true, required: true, systemRequired: true, options: ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Office', 'Retail', 'Industrial', 'Warehouse', 'Land'] },
      { id: 'year-built', label: 'Year Built', category: 'advanced', type: 'number', enabled: true, required: false, systemRequired: false, placeholder: '1995' },
      { id: 'square-footage', label: 'Square Footage', category: 'advanced', type: 'number', enabled: true, required: false, systemRequired: false, placeholder: '2500' },
      { id: 'lot-size', label: 'Lot Size (acres)', category: 'advanced', type: 'number', enabled: false, required: false, systemRequired: false, placeholder: '0.25' },
      { id: 'bedrooms', label: 'Bedrooms', category: 'advanced', type: 'number', enabled: true, required: false, systemRequired: false, placeholder: '3' },
      { id: 'bathrooms', label: 'Bathrooms', category: 'advanced', type: 'number', enabled: true, required: false, systemRequired: false, placeholder: '2.5' },
      { id: 'flood-zone', label: 'Flood Zone', category: 'advanced', type: 'select', enabled: true, required: false, systemRequired: false, options: ['Zone A', 'Zone AE', 'Zone AH', 'Zone AO', 'Zone V', 'Zone VE', 'Zone X (Shaded)', 'Zone X (Unshaded)', 'Zone D', 'Not in Flood Zone'] },
      { id: 'zoning', label: 'Zoning Classification', category: 'advanced', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'R-1 Residential' },
      { id: 'occupancy-status', label: 'Occupancy Status', category: 'advanced', type: 'select', enabled: true, required: false, systemRequired: false, options: ['Owner Occupied', 'Tenant Occupied', 'Vacant', 'Under Construction'] },
      { id: 'assessed-value', label: 'Assessed Value', category: 'advanced', type: 'number', enabled: false, required: false, systemRequired: false, placeholder: '350000' },
      { id: 'hoa-applicable', label: 'HOA Applicable', category: 'advanced', type: 'select', enabled: false, required: false, systemRequired: false, options: ['Yes', 'No'] },
      { id: 'special-assessments', label: 'Special Assessments', category: 'advanced', type: 'textarea', enabled: false, required: false, systemRequired: false, placeholder: 'Any special assessments or liens' },
      { id: 'environmental-concerns', label: 'Environmental Concerns', category: 'advanced', type: 'textarea', enabled: false, required: false, systemRequired: false, placeholder: 'Known environmental issues or hazards' },
      { id: 'additional-notes', label: 'Additional Property Notes', category: 'advanced', type: 'textarea', enabled: true, required: false, systemRequired: false, placeholder: 'Any additional property details or special instructions' },
    ],
    selectedSamplePropertyId: undefined,
    requestFormFields: [
      // Overview Section (readonly fields showing context)
      { id: 'request-type', label: 'Request Type', category: 'overview', type: 'text', enabled: true, required: true, systemRequired: true, readonly: true },
      { id: 'property-address', label: 'Property Address', category: 'overview', type: 'text', enabled: true, required: true, systemRequired: true, readonly: true },
      
      // Details Section (configurable fields)
      { id: 'request-purpose', label: 'Request Purpose', category: 'details', type: 'select', enabled: true, required: true, systemRequired: false, options: ['Purchase', 'Refinance', 'Cash-out Refinance', 'Home Equity', 'Construction', 'Other'], placeholder: 'Select purpose' },
      { id: 'loan-officer', label: 'Loan Officer', category: 'details', type: 'text', enabled: true, required: true, systemRequired: true, placeholder: 'Officer name' },
      { id: 'customer-name', label: 'Customer/Borrower Name', category: 'details', type: 'text', enabled: true, required: true, systemRequired: true, placeholder: 'Full legal name' },
      { id: 'borrower-email', label: 'Borrower Email', category: 'details', type: 'email', enabled: true, required: false, systemRequired: false, placeholder: 'borrower@example.com' },
      { id: 'borrower-phone', label: 'Borrower Phone', category: 'details', type: 'tel', enabled: true, required: false, systemRequired: false, placeholder: '(555) 123-4567' },
      { id: 'coborrower-name', label: 'Co-Borrower Name', category: 'details', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Co-borrower full name' },
      { id: 'loan-amount', label: 'Loan Amount', category: 'details', type: 'number', enabled: true, required: true, systemRequired: true, placeholder: '250000' },
      { id: 'ltv-ratio', label: 'Loan-to-Value (LTV) Ratio', category: 'details', type: 'number', enabled: true, required: false, systemRequired: false, placeholder: '80' },
      { id: 'loan-type', label: 'Loan Type', category: 'details', type: 'select', enabled: true, required: true, systemRequired: false, options: ['Conventional 30-Year Fixed', 'Conventional 15-Year Fixed', 'FHA 30-Year Fixed', 'VA Loan', 'USDA Loan', 'Jumbo Loan', 'ARM 5/1', 'ARM 7/1', 'Commercial Real Estate Loan', 'Agricultural Loan', 'Other'], placeholder: 'Select loan type' },
      { id: 'appraisal-type', label: 'Appraisal Type', category: 'details', type: 'select', enabled: true, required: false, systemRequired: false, options: ['1004 Full Appraisal', '1025 Small Residential Income', '1073 Condo Appraisal', '2055 Exterior Only', 'Commercial Narrative Report', 'Phase I Environmental Site Assessment', 'Desk Review', 'Other'], placeholder: 'Select appraisal type' },
      { id: 'turn-time', label: 'Turn Time', category: 'details', type: 'select', enabled: true, required: true, systemRequired: false, options: ['3 Business Days', '5 Business Days', '7 Business Days', '10 Business Days', '14 Business Days', '21 Business Days'], placeholder: 'Select timeline' },
      { id: 'ordering-party', label: 'Ordering Party', category: 'details', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'Bank or institution name' },
      { id: 'order-date', label: 'Order Date', category: 'details', type: 'date', enabled: true, required: true, systemRequired: true },
      { id: 'due-date', label: 'Due Date', category: 'details', type: 'date', enabled: true, required: true, systemRequired: true },
      { id: 'rush-order', label: 'Rush Order', category: 'details', type: 'select', enabled: true, required: false, systemRequired: false, options: ['Yes', 'No'] },
      { id: 'client-file-number', label: 'Client File Number', category: 'details', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'Internal file reference' },
      { id: 'loan-number', label: 'Loan Number', category: 'details', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'Loan reference number' },
      { id: 'sales-price', label: 'Sales/Purchase Price', category: 'details', type: 'number', enabled: true, required: false, systemRequired: false, placeholder: '350000' },
      { id: 'refinance-purpose', label: 'Refinance Purpose', category: 'details', type: 'textarea', enabled: false, required: false, systemRequired: false, placeholder: 'Describe refinance purpose if applicable' },
      { id: 'special-instructions', label: 'Special Instructions', category: 'details', type: 'textarea', enabled: true, required: false, systemRequired: false, placeholder: 'Any special requirements or notes for the appraiser' },
    ],
    selectedSampleRequestId: undefined,
    orderFormFields: [
      { id: 'property-address', label: 'Property Address', type: 'text', required: true, visible: true, order: 1 },
      { id: 'loan-amount', label: 'Loan Amount', type: 'number', required: true, visible: true, order: 2, validation: { min: 0 } },
      { id: 'due-date', label: 'Due Date', type: 'date', required: true, visible: true, order: 3 },
      { id: 'borrower-name', label: 'Borrower Name', type: 'text', required: true, visible: true, order: 4 },
      { id: 'notes', label: 'Notes', type: 'textarea', required: false, visible: true, order: 5 },
    ],
    documentTypes: [
      'Appraisal Report',
      'Inspection Report',
      'Environmental Assessment',
      'Title Document',
      'Review Letter',
    ],
    rejectReasons: [
      'Incomplete Information',
      'Does Not Meet Guidelines',
      'Expired Documentation',
      'Incorrect Property Type',
    ],
    reviewTypes: ['Full Review', 'Desk Review', 'Field Review'],
    reviewActions: ['Approve', 'Approve with Conditions', 'Reject', 'Request Revision'],
    completed: false,
  },
  users: {
    users: [],
    lendingGroups: [],
    workbookImported: false,
    completed: false,
  },
  routing: {
    routes: [],
    completed: false,
  },
  generalSettings: {
    daysCalculation: 'business',
    reviewApprovalRequired: true,
    timers: {
      vendorResponseDays: 2,
      reviewDueDateDays: 3,
      vendorLateDays: 5,
      dailyEmailsEnabled: true,
      escalateToManagersEnabled: true,
      weekendNotificationsEnabled: false,
    },
    bidEngagementPanel: {
      templates: [
        {
          id: 'standard-bid',
          name: 'Standard Bid Request',
          description: 'Default template for vendor bid requests',
          configuredByRealwired: true,
        },
        {
          id: 'rush-bid',
          name: 'Rush Bid Request',
          description: 'Template for urgent bid requests',
          configuredByRealwired: true,
        },
      ],
      readonly: true,
    },
    completed: false,
  },
  itChecklist: {
    emailDomainsAllowlisted: false,
    urlAccessVerified: false,
    completed: false,
  },
};

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(initialState);

  // NEW MODULE METHODS
  const updateCompanySetup = useCallback((data: Partial<CompanySetupData>) => {
    setState(prev => ({
      ...prev,
      companySetup: { ...prev.companySetup, ...data },
    }));
  }, []);

  const updateDefinitions = useCallback((data: Partial<DefinitionsData>) => {
    setState(prev => ({
      ...prev,
      definitions: {
        ...prev.definitions,
        ...data,
        requestTypes: data.requestTypes || prev.definitions.requestTypes,
        properties: data.properties || prev.definitions.properties,
        orderFormFields: data.orderFormFields || prev.definitions.orderFormFields,
      },
    }));
  }, []);

  const updateUsers = useCallback((data: Partial<UsersData>) => {
    setState(prev => ({
      ...prev,
      users: { ...prev.users, ...data },
    }));
  }, []);

  const addUser = useCallback((user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setState(prev => ({
      ...prev,
      users: {
        ...prev.users,
        users: [...prev.users.users, newUser],
      },
    }));
  }, []);

  const updateUser = useCallback((userId: string, updates: Partial<User>) => {
    setState(prev => ({
      ...prev,
      users: {
        ...prev.users,
        users: prev.users.users.map(u => u.id === userId ? { ...u, ...updates } : u),
      },
    }));
  }, []);

  const deleteUser = useCallback((userId: string) => {
    setState(prev => ({
      ...prev,
      users: {
        ...prev.users,
        users: prev.users.users.filter(u => u.id !== userId),
      },
    }));
  }, []);

  const updateRouting = useCallback((data: Partial<RoutingData>) => {
    setState(prev => ({
      ...prev,
      routing: { ...prev.routing, ...data },
    }));
  }, []);

  const addRoute = useCallback((route: Omit<RouteRule, 'id'>) => {
    const newRoute: RouteRule = {
      ...route,
      id: `route-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setState(prev => ({
      ...prev,
      routing: {
        ...prev.routing,
        routes: [...prev.routing.routes, newRoute],
      },
    }));
  }, []);

  const updateRoute = useCallback((routeId: string, updates: Partial<RouteRule>) => {
    setState(prev => ({
      ...prev,
      routing: {
        ...prev.routing,
        routes: prev.routing.routes.map(r => r.id === routeId ? { ...r, ...updates } : r),
      },
    }));
  }, []);

  const deleteRoute = useCallback((routeId: string) => {
    setState(prev => ({
      ...prev,
      routing: {
        ...prev.routing,
        routes: prev.routing.routes.filter(r => r.id !== routeId),
      },
    }));
  }, []);

  const updateGeneralSettings = useCallback((data: Partial<GeneralSettingsData>) => {
    setState(prev => ({
      ...prev,
      generalSettings: {
        ...prev.generalSettings,
        ...data,
        timers: data.timers ? { ...prev.generalSettings.timers, ...data.timers } : prev.generalSettings.timers,
      },
    }));
  }, []);

  const updateITChecklist = useCallback((data: Partial<ITChecklistData>) => {
    setState(prev => ({
      ...prev,
      itChecklist: { ...prev.itChecklist, ...data },
    }));
  }, []);

  const goToModule = useCallback((module: OnboardingModule) => {
    setState(prev => ({
      ...prev,
      currentModule: module,
      moduleStatuses: {
        ...prev.moduleStatuses,
        [module]: 'in_progress',
      },
    }));
  }, []);

  const markModuleComplete = useCallback((module: OnboardingModule) => {
    setState(prev => ({
      ...prev,
      moduleStatuses: {
        ...prev.moduleStatuses,
        [module]: 'completed',
      },
    }));
  }, []);

  const updateModuleAssignment = useCallback((moduleId: string, participantIds: string[]) => {
    setState(prev => ({
      ...prev,
      moduleAssignments: prev.moduleAssignments.map(assignment =>
        assignment.moduleId === moduleId
          ? { ...assignment, assignedParticipantIds: participantIds }
          : assignment
      ),
    }));
  }, []);

  const updateModuleProgress = useCallback((moduleId: string, currentStep: number, totalSteps: number) => {
    setState(prev => ({
      ...prev,
      moduleProgress: {
        ...prev.moduleProgress,
        [moduleId]: { currentStep, totalSteps },
      },
    }));
  }, []);

  const resetModuleProgress = useCallback((moduleId: string) => {
    setState(prev => {
      const newProgress = { ...prev.moduleProgress };
      delete newProgress[moduleId];
      return {
        ...prev,
        moduleProgress: newProgress,
      };
    });
  }, []);

  const updateProjectedGoLiveDate = useCallback((date: string) => {
    setState(prev => ({
      ...prev,
      projectedGoLiveDate: date,
    }));
  }, []);

  const markSectionConfigured = useCallback((sectionId: string, agentName: string) => {
    setState(prev => ({
      ...prev,
      configuredSections: {
        ...prev.configuredSections,
        [sectionId]: {
          isConfigured: true,
          configuredBy: agentName,
          configuredAt: new Date().toISOString(),
        },
      },
    }));
  }, []);

  const getSectionConfigStatus = useCallback((sectionId: string): SectionConfigStatus => {
    return state.configuredSections[sectionId] || { isConfigured: false };
  }, [state.configuredSections]);

  const canProceed = useCallback((module: OnboardingModule): boolean => {
    const s = state;
    
    switch (module) {
      case 'company-setup':
        return s.companySetup.hasResidentialAppraisals || 
               s.companySetup.hasCommercialAppraisals || 
               s.companySetup.hasEnvironmental || 
               s.companySetup.hasExternalReviews;
               
      case 'definitions':
        return s.definitions.requestTypes.some(rt => rt.enabled) &&
               s.definitions.properties.length > 0;
               
      case 'users':
        return s.users.users.length > 0 || s.users.workbookImported;
        
      case 'routing':
        return s.routing.routes.length > 0;
        
      case 'general-settings':
        return true;
        
      case 'it-checklist':
        return true; // Optional module, always can proceed
        
      default:
        return false;
    }
  }, [state]);

  return (
    <OnboardingContext.Provider
      value={{
        state,
        updateCompanySetup,
        updateDefinitions,
        updateUsers,
        addUser,
        updateUser,
        deleteUser,
        updateRouting,
        addRoute,
        updateRoute,
        deleteRoute,
        updateGeneralSettings,
        updateITChecklist,
        goToModule,
        markModuleComplete,
        canProceed,
        updateModuleAssignment,
        updateModuleProgress,
        resetModuleProgress,
        updateProjectedGoLiveDate,
        markSectionConfigured,
        getSectionConfigStatus,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
