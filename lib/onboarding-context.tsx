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
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea' | 'date' | 'file' | 'readonly' | 'link' | 'email' | 'tel' | 'checkbox';
  options?: string[]; // For select/multiselect/checkbox fields
  enabled: boolean; // Whether user wants this field in their standard property record (visible)
  required?: boolean;
  systemRequired?: boolean; // System-required field that cannot be disabled or made optional
  systemFixed?: boolean; // Cannot be dragged/reordered
  placeholder?: string;
  order?: number; // For ordering within category
  column?: 1 | 2; // Which column the field appears in
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
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea' | 'date' | 'file' | 'readonly' | 'link' | 'email' | 'tel' | 'checkbox';
  options?: string[]; // For select/multiselect/checkbox fields
  enabled: boolean; // Whether user wants this field in their standard request form (visible to field officer)
  required?: boolean;
  systemRequired?: boolean; // System-required field that cannot be disabled or made optional
  systemFixed?: boolean; // Cannot be dragged/reordered
  placeholder?: string;
  readonly?: boolean; // For overview fields that shouldn't be edited
  order?: number; // For ordering within category
  column?: 1 | 2; // Which column the field appears in
}

export interface PropertyCategory {
  id: string;
  name: string;
  type: 'Residential' | 'Commercial' | 'Environmental' | 'Agricultural' | 'Mixed' | 'Land' | 'Other';
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
  productInterests: string[]; // NEW: Track which products the client is interested in
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
  expressProductInterest: (productId: string) => void; // NEW: Express interest in a product
  removeProductInterest: (productId: string) => void; // NEW: Remove interest in a product
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
  productInterests: [], // Initialize empty - will be populated as user expresses interest
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
      // Primary Property Information (System-level fields)
      { id: 'street-address', label: 'Street Address', category: 'overview', type: 'text', enabled: true, required: true, systemRequired: true, systemFixed: true, placeholder: '123 Main Street', order: 0, column: 1 },
      { id: 'apt-unit', label: 'Apt/Unit Number', category: 'overview', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'Unit 4B', order: 1, column: 1 },
      { id: 'city', label: 'City', category: 'overview', type: 'text', enabled: true, required: true, systemRequired: true, systemFixed: true, placeholder: 'Springfield', order: 2, column: 1 },
      { id: 'state', label: 'State', category: 'overview', type: 'select', enabled: true, required: true, systemRequired: true, systemFixed: true, options: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'], order: 3, column: 1 },
      { id: 'zip-code', label: 'ZIP Code', category: 'overview', type: 'text', enabled: true, required: true, systemRequired: true, systemFixed: true, placeholder: '12345', order: 4, column: 1 },
      { id: 'county', label: 'County', category: 'overview', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'County Name', order: 5, column: 1 },
      { id: 'portfolio', label: 'Portfolio', category: 'overview', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Property group name', order: 6, column: 1 },
      { id: 'portfolio-description', label: 'Portfolio Description', category: 'overview', type: 'textarea', enabled: false, required: false, systemRequired: false, placeholder: 'Description of the portfolio', order: 7, column: 1 },
      
      // Property Overview Section
      { id: 'property-category', label: 'Property Category', category: 'advanced', type: 'select', enabled: true, required: true, systemRequired: true, systemFixed: true, options: ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Mixed-Use', 'Special Purpose'], order: 0, column: 1 },
      { id: 'property-type', label: 'Property Type', category: 'advanced', type: 'select', enabled: true, required: true, systemRequired: true, systemFixed: true, options: ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Office', 'Retail', 'Industrial', 'Warehouse', 'Land'], order: 1, column: 1 },
      { id: 'assigned-area', label: 'Assigned Area', category: 'advanced', type: 'select', enabled: true, required: true, systemRequired: false, options: [], placeholder: 'For routing', order: 2, column: 1 },
      { id: 'bank', label: 'Bank', category: 'advanced', type: 'readonly', enabled: true, required: true, systemRequired: true, placeholder: 'Auto-generated', order: 3, column: 1 },
      { id: 'lot-number', label: 'Lot #', category: 'advanced', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Lot number', order: 4, column: 1 },
      { id: 'block', label: 'Block', category: 'advanced', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Block number', order: 5, column: 1 },
      { id: 'subdivision', label: 'Subdivision', category: 'advanced', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Subdivision name', order: 6, column: 1 },
      { id: 'parcel-id', label: 'Parcel #', category: 'advanced', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'APN-123-456-789', order: 7, column: 1 },
      { id: 'str', label: 'STR', category: 'advanced', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Section Township Range', order: 8, column: 1 },
      { id: 'year-built', label: 'Year Built', category: 'advanced', type: 'number', enabled: true, required: false, systemRequired: false, placeholder: '1995', order: 9, column: 1 },
      { id: 'site-area', label: 'Site Area', category: 'advanced', type: 'number', enabled: true, required: true, systemRequired: false, placeholder: '0.25', order: 10, column: 1 },
      { id: 'site-area-unit', label: 'Site Area Unit of Measure', category: 'advanced', type: 'select', enabled: true, required: false, systemRequired: false, options: ['SF', 'Acres', 'Units'], order: 11, column: 1 },
      { id: 'excess-land', label: 'Excess Land', category: 'advanced', type: 'number', enabled: false, required: false, systemRequired: false, placeholder: '0', order: 12, column: 1 },
      { id: 'excess-land-unit', label: 'Excess Land Unit of Measure', category: 'advanced', type: 'select', enabled: false, required: false, systemRequired: false, options: ['SF', 'Acres', 'Units'], order: 13, column: 1 },
      { id: 'building-size', label: 'Building Size', category: 'advanced', type: 'number', enabled: true, required: true, systemRequired: false, placeholder: '2500', order: 14, column: 2 },
      { id: 'building-size-unit', label: 'Building Size Unit of Measure', category: 'advanced', type: 'select', enabled: true, required: false, systemRequired: false, options: ['SF', 'Units'], order: 15, column: 2 },
      { id: 'number-of-tenants', label: 'Number of Tenants', category: 'advanced', type: 'number', enabled: false, required: false, systemRequired: false, placeholder: '0', order: 16, column: 2 },
      { id: 'ownership-type', label: 'Ownership Type', category: 'advanced', type: 'select', enabled: true, required: false, systemRequired: false, options: ['Owner Occupied', 'Owner Occupied & Leased', 'Leased', 'Ground Leased', 'Leasehold (Borrower is tenant)'], order: 17, column: 2 },
      { id: 'owner', label: 'Owner', category: 'advanced', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Owner name', order: 18, column: 2 },
      { id: 'flood-zone', label: 'Flood Zone', category: 'advanced', type: 'select', enabled: true, required: false, systemRequired: false, options: ['Zone A', 'Zone AE', 'Zone AH', 'Zone AO', 'Zone V', 'Zone VE', 'Zone X (Shaded)', 'Zone X (Unshaded)', 'Zone D', 'Not in Flood Zone'], order: 19, column: 2 },
      { id: 'property-status', label: 'Property Status', category: 'advanced', type: 'select', enabled: true, required: false, systemRequired: false, options: ['Existing', 'Under Construction', 'Renovation', 'Proposed'], order: 20, column: 2 },
      { id: 'reg-b-dwelling', label: 'Is there a 1-4 family residential dwelling on the property?', category: 'advanced', type: 'select', enabled: false, required: false, systemRequired: false, options: ['Yes', 'No'], order: 21, column: 2 },
      { id: 'reg-b-first-mortgage', label: 'Is this a first mortgage on property?', category: 'advanced', type: 'select', enabled: false, required: false, systemRequired: false, options: ['Yes', 'No'], order: 22, column: 2 },
      { id: 'legal-description', label: 'Legal Description', category: 'advanced', type: 'textarea', enabled: false, required: false, systemRequired: false, placeholder: 'Full legal description of property', order: 23, column: 2 },
      { id: 'property-comments', label: 'Property Comments', category: 'advanced', type: 'textarea', enabled: true, required: true, systemRequired: false, placeholder: 'Any property-specific notes', order: 24, column: 2 },
      { id: 'multiple-building-description', label: 'Multiple Building Description', category: 'advanced', type: 'textarea', enabled: false, required: false, systemRequired: false, placeholder: 'Describe additional buildings', order: 25, column: 2 },
      { id: 'active', label: 'Active', category: 'advanced', type: 'readonly', enabled: true, required: false, systemRequired: false, placeholder: 'Auto-generated', order: 26, column: 2 },
      { id: 'photo', label: 'Photo', category: 'advanced', type: 'file', enabled: false, required: false, systemRequired: false, order: 27, column: 2 },
      { id: 'latitude', label: 'Latitude', category: 'advanced', type: 'readonly', enabled: true, required: false, systemRequired: true, placeholder: 'Auto-generated', order: 28, column: 2 },
      { id: 'longitude', label: 'Longitude', category: 'advanced', type: 'readonly', enabled: true, required: false, systemRequired: true, placeholder: 'Auto-generated', order: 29, column: 2 },
      
      // Legacy fields (keeping for now)
      { id: 'bedrooms', label: 'Bedrooms', category: 'advanced', type: 'number', enabled: true, required: false, systemRequired: false, placeholder: '3', order: 30, column: 2 },
      { id: 'bathrooms', label: 'Bathrooms', category: 'advanced', type: 'number', enabled: true, required: false, systemRequired: false, placeholder: '2.5', order: 31, column: 2 },
      { id: 'zoning', label: 'Zoning Classification', category: 'advanced', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'R-1 Residential', order: 32, column: 2 },
      { id: 'assessed-value', label: 'Assessed Value', category: 'advanced', type: 'number', enabled: false, required: false, systemRequired: false, placeholder: '350000', order: 33, column: 2 },
      { id: 'hoa-applicable', label: 'HOA Applicable', category: 'advanced', type: 'select', enabled: false, required: false, systemRequired: false, options: ['Yes', 'No'], order: 34, column: 2 },
      { id: 'special-assessments', label: 'Special Assessments', category: 'advanced', type: 'textarea', enabled: false, required: false, systemRequired: false, placeholder: 'Any special assessments or liens', order: 35, column: 2 },
      { id: 'environmental-concerns', label: 'Environmental Concerns', category: 'advanced', type: 'textarea', enabled: false, required: false, systemRequired: false, placeholder: 'Known environmental issues or hazards', order: 36, column: 2 },
      { id: 'additional-notes', label: 'Additional Property Notes', category: 'advanced', type: 'textarea', enabled: true, required: false, systemRequired: false, placeholder: 'Any additional property details or special instructions', order: 37, column: 2 },
    ],
    selectedSamplePropertyId: undefined,
    requestFormFields: [
      // REQUEST INFO PANEL - Put in 'details' category to show up
      { id: 'file-number', label: 'File Number', category: 'overview', type: 'readonly', enabled: true, required: true, systemRequired: true, readonly: true, placeholder: 'Auto-generated', order: 0, column: 1 },
      { id: 'project-number', label: 'Project Number', category: 'overview', type: 'readonly', enabled: true, required: true, systemRequired: true, readonly: true, placeholder: 'Auto-generated', order: 1, column: 1 },
      { id: 'request-status', label: 'Request Status', category: 'overview', type: 'readonly', enabled: true, required: true, systemRequired: true, readonly: true, placeholder: 'Auto-generated', order: 2, column: 2 },
      { id: 'workflow-stage', label: 'Workflow Stage', category: 'overview', type: 'readonly', enabled: true, required: true, systemRequired: true, readonly: true, placeholder: 'Auto-generated', order: 3, column: 2 },
      
      // Core Request Fields - Details category
      { id: 'request-type', label: 'Request Type', category: 'details', type: 'select', enabled: true, required: true, systemRequired: true, options: [], order: 0, column: 1 },
      { id: 'request-purpose', label: 'Request Purpose', category: 'details', type: 'select', enabled: true, required: true, systemRequired: false, options: ['Additional Collateral', 'Additional Funding', 'Classified Asset', 'Construction Inspection', 'Construction (w/perm in secondary mkt.)', 'Construction (w/perm in-house)', 'External Property Inspection', 'Foreclosure', 'Final Inspection', 'New Loan', 'New loan (secondary market)', 'OREO Asset', 'Loan Renewal (new funds)', 'Loan Renewal (no new funds)'], order: 1, column: 1 },
      { id: 'customer-name', label: 'Customer Name', category: 'details', type: 'text', enabled: true, required: true, systemRequired: true, placeholder: 'Customer/Borrower name', order: 2, column: 1 },
      { id: 'ordering-choices', label: 'Ordering Choices', category: 'details', type: 'select', enabled: true, required: true, systemRequired: false, options: ['Engage at Discretion', 'Obtain Bids - Engage Lowest', 'Obtain Bids - Notify Account Officer', 'ObtainBids-PrePymt Req-NotifyBorrower'], order: 3, column: 1 },
      { id: 'loan-officer', label: 'Loan Officer', category: 'details', type: 'text', enabled: true, required: true, systemRequired: true, placeholder: 'Loan Officer name', order: 4, column: 1 },
      { id: 'lo-notifications-copy', label: 'LO Notifications Copy', category: 'details', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Additional notification recipients', order: 5, column: 1 },
      { id: 'date-needed', label: 'Date Needed', category: 'details', type: 'date', enabled: true, required: true, systemRequired: true, order: 6, column: 1 },
      { id: 'projected-close-date', label: 'Projected Close Date', category: 'details', type: 'date', enabled: true, required: true, systemRequired: false, order: 7, column: 1 },
      { id: 'loan-amount', label: 'Loan Amount', category: 'details', type: 'number', enabled: true, required: true, systemRequired: true, placeholder: '250000', order: 8, column: 1 },
      { id: 'loan-type', label: 'Loan Type', category: 'details', type: 'select', enabled: true, required: true, systemRequired: false, options: ['Business', 'Real Estate', 'Residence'], order: 9, column: 1 },
      { id: 'loan-number', label: 'Loan #', category: 'details', type: 'text', enabled: true, required: true, systemRequired: false, placeholder: 'Loan number', order: 10, column: 1 },
      { id: 'prior-loan-number', label: 'Prior Loan #', category: 'details', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Prior loan number', order: 11, column: 1 },
      { id: 'ltv-ratio', label: 'LTV Ratio', category: 'details', type: 'number', enabled: true, required: false, systemRequired: false, placeholder: '80', order: 12, column: 1 },
      { id: 'approved-ltv-ratio', label: 'Approved LTV Ratio', category: 'details', type: 'number', enabled: false, required: false, systemRequired: false, placeholder: '80', order: 13, column: 1 },
      { id: 'risk-rating', label: 'Risk Rating', category: 'details', type: 'text', enabled: true, required: true, systemRequired: false, placeholder: 'Risk rating', order: 14, column: 1 },
      { id: 'risk-grade', label: 'Risk Grade', category: 'details', type: 'select', enabled: false, required: false, systemRequired: false, options: [], order: 15, column: 1 },
      { id: 'prior-appraisal-date', label: 'Prior Appraisal Date', category: 'details', type: 'date', enabled: false, required: false, systemRequired: false, order: 16, column: 1 },
      { id: 'prior-appraised-value', label: 'Prior Appraised Value', category: 'details', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Auto-populates', order: 17, column: 1 },
      { id: 'billing-branch-code', label: 'Billing/Branch Code', category: 'details', type: 'text', enabled: true, required: true, systemRequired: false, placeholder: 'Can auto-populate from LO', order: 18, column: 2 },
      { id: 'gl-acct', label: 'GL Acct', category: 'details', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Can auto-populate from LO', order: 19, column: 2 },
      { id: 'lending-group', label: 'Lending Group', category: 'details', type: 'select', enabled: false, required: false, systemRequired: false, options: [], order: 20, column: 2 },
      { id: 'payment-method', label: 'Payment Method', category: 'details', type: 'select', enabled: false, required: false, systemRequired: false, options: ['Rolled into Loan', 'Customer Will Pay', 'Bank Will Pay'], order: 21, column: 2 },
      { id: 'prepayment-proof', label: 'Prepayment Proof', category: 'details', type: 'file', enabled: false, required: false, systemRequired: false, order: 22, column: 2 },
      { id: 'sba-involvement', label: 'SBA Involvement', category: 'details', type: 'select', enabled: true, required: false, systemRequired: false, options: ['Yes', 'No'], order: 23, column: 2 },
      { id: 'involvement-type', label: 'Involvement Type', category: 'details', type: 'select', enabled: true, required: false, systemRequired: false, options: ['7A', '504C'], order: 24, column: 2 },
      { id: 'local-lending-partner', label: 'Local Lending Partner', category: 'details', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'Partner name', order: 25, column: 2 },
      { id: 'lending-partner-address', label: 'Lending Partner Address', category: 'details', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'Partner address', order: 26, column: 2 },
      { id: 'syndication-participation', label: 'Syndication / Participation', category: 'details', type: 'select', enabled: true, required: false, systemRequired: false, options: ['Yes', 'No', 'Unknown'], order: 27, column: 2 },
      { id: 'is-bank-agent-bank', label: 'Is Bank the Agent Bank', category: 'details', type: 'select', enabled: true, required: false, systemRequired: false, options: ['Yes', 'No'], order: 28, column: 2 },
      { id: 'agent-bank', label: 'Agent Bank', category: 'details', type: 'text', enabled: true, required: false, systemRequired: false, placeholder: 'Agent bank name', order: 29, column: 2 },
      { id: 'hpml', label: 'HPML', category: 'details', type: 'select', enabled: false, required: false, systemRequired: false, options: ['Yes', 'No'], order: 30, column: 2 },
      { id: 'request-comments', label: 'Request Comments', category: 'details', type: 'textarea', enabled: true, required: false, systemRequired: false, placeholder: 'Communication between LO and JM', order: 31, column: 2 },
      { id: 'job-manager', label: 'Job Manager', category: 'details', type: 'text', enabled: true, required: true, systemRequired: true, placeholder: 'Job Manager', order: 32, column: 2 },
      { id: 'jm-notifications-copy', label: 'JM Notifications Copy', category: 'details', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Additional JM notifications', order: 33, column: 2 },
      { id: 'on-hold', label: 'On Hold', category: 'details', type: 'select', enabled: true, required: false, systemRequired: true, options: ['Yes', 'No'], order: 34, column: 2 },
      
      // Contact/Access Fields - put in details
      { id: 'marketing-status', label: 'Marketing Status', category: 'details', type: 'select', enabled: false, required: false, systemRequired: false, options: ['For Sale', 'Under Contract', 'Not on the Market', 'Recently Sold'], order: 35, column: 2 },
      { id: 'listing-agent', label: 'Listing Agent', category: 'details', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Agent name', order: 36, column: 2 },
      { id: 'listing-phone', label: 'Listing Phone', category: 'details', type: 'tel', enabled: false, required: false, systemRequired: false, placeholder: '(555) 123-4567', order: 37, column: 2 },
      { id: 'contact-type', label: 'Contact Type', category: 'details', type: 'select', enabled: false, required: false, systemRequired: false, options: ['Borrower', 'Property Manager', 'Seller', 'Tenant'], order: 38, column: 2 },
      { id: 'contact-name', label: 'Contact Name', category: 'details', type: 'text', enabled: false, required: false, systemRequired: false, placeholder: 'Contact name', order: 39, column: 2 },
      { id: 'contact-phone', label: 'Contact Phone', category: 'details', type: 'tel', enabled: false, required: false, systemRequired: false, placeholder: '(555) 123-4567', order: 40, column: 2 },
      { id: 'contact-email', label: 'Contact Email', category: 'details', type: 'email', enabled: false, required: false, systemRequired: false, placeholder: 'contact@example.com', order: 41, column: 2 },
      
      // Bid/Engagement Fields - put in details  
      { id: 'desired-delivery-date', label: 'Desired Delivery Date', category: 'details', type: 'date', enabled: false, required: false, systemRequired: false, order: 42, column: 2 },
      { id: 'is-rush-job', label: 'Is Rush Job?', category: 'details', type: 'select', enabled: false, required: false, systemRequired: false, options: ['Yes', 'No'], order: 43, column: 2 },
      { id: 'residential-forms', label: 'Residential Forms', category: 'details', type: 'select', enabled: false, required: false, systemRequired: false, options: ['1004C', '1025 Form - Multifamily', '2055 Form - Drive By', '2055 Form - Inspection', 'Condo Form - 1073 (Interior)', 'URAR Form', 'URAR with Rental Income Information'], order: 44, column: 2 },
      { id: 'report-format', label: 'Report Format', category: 'details', type: 'select', enabled: false, required: false, systemRequired: false, options: ['Appraisal Report', 'Restricted Appraisal Report', 'Evaluation', 'In-House Evaluation'], order: 45, column: 2 },
      { id: 'inspection-requirements', label: 'Inspection Requirements', category: 'details', type: 'select', enabled: false, required: false, systemRequired: false, options: ['Full Inspection', 'Exterior Only Minimally Required', 'Drive By'], order: 46, column: 2 },
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

  const expressProductInterest = useCallback((productId: string) => {
    setState(prev => ({
      ...prev,
      productInterests: prev.productInterests.includes(productId)
        ? prev.productInterests
        : [...prev.productInterests, productId]
    }));
  }, []);

  const removeProductInterest = useCallback((productId: string) => {
    setState(prev => ({
      ...prev,
      productInterests: prev.productInterests.filter(id => id !== productId)
    }));
  }, []);

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
        expressProductInterest,
        removeProductInterest,
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
