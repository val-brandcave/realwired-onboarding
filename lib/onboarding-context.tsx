"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// ========================================
// NEW 6-MODULE STRUCTURE
// ========================================
export type OnboardingModule = 
  | 'company-setup'
  | 'definitions'
  | 'users'
  | 'routing'
  | 'general-settings'
  | 'it-checklist';

export type ModuleStatus = 'not_started' | 'in_progress' | 'completed';

// MODULE 1: Company Setup
export interface CompanySetupData {
  hasResidentialAppraisals: boolean;
  hasCommercialAppraisals: boolean;
  hasEnvironmental: boolean;
  hasExternalReviews: boolean;
  itChecklistComplete: boolean;
  regions: string[]; // Selected regions of operation
  states: string[]; // Selected states based on regions
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
  placeholder?: string;
  readonly?: boolean; // For overview fields that shouldn't be edited
}

export interface PropertyCategory {
  id: string;
  name: string;
  type: 'Residential' | 'Commercial' | 'Environmental' | 'Agricultural' | 'Other';
}

export interface CustomRequestType {
  id: string;
  name: string;
  category: 'Residential' | 'Commercial' | 'Environmental' | 'Agricultural' | 'Other';
}

export interface DefinitionsData {
  propertyCategories: PropertyCategory[]; // Custom property categories
  customRequestTypes: CustomRequestType[]; // Custom request types
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
    assignToCopyIds?: string[]; // Multi-select users to copy
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


// ========================================
// COMBINED STATE INTERFACE
// ========================================
interface OnboardingState {
  currentModule: OnboardingModule;
  moduleStatuses: Record<OnboardingModule, ModuleStatus>;
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
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialState: OnboardingState = {
  // New structure
  currentModule: 'company-setup',
  moduleStatuses: {
    'company-setup': 'not_started',
    'definitions': 'not_started',
    'users': 'not_started',
    'routing': 'not_started',
    'general-settings': 'not_started',
    'it-checklist': 'not_started',
  },
  companySetup: {
    hasResidentialAppraisals: false,
    hasCommercialAppraisals: false,
    hasEnvironmental: false,
    hasExternalReviews: false,
    itChecklistComplete: false,
    regions: [],
    states: [],
    completed: false,
  },
  definitions: {
    propertyCategories: [
      { id: 'cat-1', name: 'Single Family Residential', type: 'Residential' },
      { id: 'cat-2', name: 'Multi-Family Residential', type: 'Residential' },
      { id: 'cat-3', name: 'Commercial Office', type: 'Commercial' },
      { id: 'cat-4', name: 'Commercial Retail', type: 'Commercial' },
    ],
    customRequestTypes: [
      { id: 'rt-1', name: 'Residential Appraisal', category: 'Residential' },
      { id: 'rt-2', name: 'Commercial Appraisal', category: 'Commercial' },
      { id: 'rt-3', name: 'BPO (Broker Price Opinion)', category: 'Residential' },
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
      { id: 'street-address', label: 'Street Address', category: 'overview', type: 'text', enabled: true, required: true, placeholder: '123 Main Street' },
      { id: 'apt-unit', label: 'Apt/Unit Number', category: 'overview', type: 'text', enabled: true, required: false, placeholder: 'Unit 4B' },
      { id: 'city', label: 'City', category: 'overview', type: 'text', enabled: true, required: true, placeholder: 'Springfield' },
      { id: 'state', label: 'State', category: 'overview', type: 'select', enabled: true, required: true, options: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'] },
      { id: 'zip-code', label: 'ZIP Code', category: 'overview', type: 'text', enabled: true, required: true, placeholder: '12345' },
      { id: 'county', label: 'County', category: 'overview', type: 'text', enabled: true, required: false, placeholder: 'County Name' },
      { id: 'legal-description', label: 'Legal Description', category: 'overview', type: 'textarea', enabled: false, required: false, placeholder: 'Full legal description of property' },
      { id: 'parcel-id', label: 'Parcel/Tax ID', category: 'overview', type: 'text', enabled: true, required: false, placeholder: 'APN-123-456-789' },
      
      // Advanced Details Section
      { id: 'property-category', label: 'Property Category', category: 'advanced', type: 'select', enabled: true, required: true, options: ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Mixed-Use', 'Special Purpose'] },
      { id: 'property-type', label: 'Property Type', category: 'advanced', type: 'select', enabled: true, required: true, options: ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Office', 'Retail', 'Industrial', 'Warehouse', 'Land'] },
      { id: 'year-built', label: 'Year Built', category: 'advanced', type: 'number', enabled: true, required: false, placeholder: '1995' },
      { id: 'square-footage', label: 'Square Footage', category: 'advanced', type: 'number', enabled: true, required: false, placeholder: '2500' },
      { id: 'lot-size', label: 'Lot Size (acres)', category: 'advanced', type: 'number', enabled: false, required: false, placeholder: '0.25' },
      { id: 'bedrooms', label: 'Bedrooms', category: 'advanced', type: 'number', enabled: true, required: false, placeholder: '3' },
      { id: 'bathrooms', label: 'Bathrooms', category: 'advanced', type: 'number', enabled: true, required: false, placeholder: '2.5' },
      { id: 'flood-zone', label: 'Flood Zone', category: 'advanced', type: 'select', enabled: true, required: false, options: ['Zone A', 'Zone AE', 'Zone AH', 'Zone AO', 'Zone V', 'Zone VE', 'Zone X (Shaded)', 'Zone X (Unshaded)', 'Zone D', 'Not in Flood Zone'] },
      { id: 'zoning', label: 'Zoning Classification', category: 'advanced', type: 'text', enabled: false, required: false, placeholder: 'R-1 Residential' },
      { id: 'occupancy-status', label: 'Occupancy Status', category: 'advanced', type: 'select', enabled: true, required: false, options: ['Owner Occupied', 'Tenant Occupied', 'Vacant', 'Under Construction'] },
      { id: 'assessed-value', label: 'Assessed Value', category: 'advanced', type: 'number', enabled: false, required: false, placeholder: '350000' },
      { id: 'hoa-applicable', label: 'HOA Applicable', category: 'advanced', type: 'select', enabled: false, required: false, options: ['Yes', 'No'] },
      { id: 'special-assessments', label: 'Special Assessments', category: 'advanced', type: 'textarea', enabled: false, required: false, placeholder: 'Any special assessments or liens' },
      { id: 'environmental-concerns', label: 'Environmental Concerns', category: 'advanced', type: 'textarea', enabled: false, required: false, placeholder: 'Known environmental issues or hazards' },
      { id: 'additional-notes', label: 'Additional Property Notes', category: 'advanced', type: 'textarea', enabled: true, required: false, placeholder: 'Any additional property details or special instructions' },
    ],
    selectedSamplePropertyId: undefined,
    requestFormFields: [
      // Overview Section (readonly fields showing context)
      { id: 'request-type', label: 'Request Type', category: 'overview', type: 'text', enabled: true, required: true, readonly: true },
      { id: 'property-address', label: 'Property Address', category: 'overview', type: 'text', enabled: true, required: true, readonly: true },
      
      // Details Section (configurable fields)
      { id: 'request-purpose', label: 'Request Purpose', category: 'details', type: 'select', enabled: true, required: true, options: ['Purchase', 'Refinance', 'Cash-out Refinance', 'Home Equity', 'Construction', 'Other'], placeholder: 'Select purpose' },
      { id: 'loan-officer', label: 'Loan Officer', category: 'details', type: 'text', enabled: true, required: true, placeholder: 'Officer name' },
      { id: 'customer-name', label: 'Customer/Borrower Name', category: 'details', type: 'text', enabled: true, required: true, placeholder: 'Full legal name' },
      { id: 'borrower-email', label: 'Borrower Email', category: 'details', type: 'email', enabled: true, required: false, placeholder: 'borrower@example.com' },
      { id: 'borrower-phone', label: 'Borrower Phone', category: 'details', type: 'tel', enabled: true, required: false, placeholder: '(555) 123-4567' },
      { id: 'coborrower-name', label: 'Co-Borrower Name', category: 'details', type: 'text', enabled: false, required: false, placeholder: 'Co-borrower full name' },
      { id: 'loan-amount', label: 'Loan Amount', category: 'details', type: 'number', enabled: true, required: true, placeholder: '250000' },
      { id: 'ltv-ratio', label: 'Loan-to-Value (LTV) Ratio', category: 'details', type: 'number', enabled: true, required: false, placeholder: '80' },
      { id: 'loan-type', label: 'Loan Type', category: 'details', type: 'select', enabled: true, required: true, options: ['Conventional 30-Year Fixed', 'Conventional 15-Year Fixed', 'FHA 30-Year Fixed', 'VA Loan', 'USDA Loan', 'Jumbo Loan', 'ARM 5/1', 'ARM 7/1', 'Commercial Real Estate Loan', 'Agricultural Loan', 'Other'], placeholder: 'Select loan type' },
      { id: 'appraisal-type', label: 'Appraisal Type', category: 'details', type: 'select', enabled: true, required: false, options: ['1004 Full Appraisal', '1025 Small Residential Income', '1073 Condo Appraisal', '2055 Exterior Only', 'Commercial Narrative Report', 'Phase I Environmental Site Assessment', 'Desk Review', 'Other'], placeholder: 'Select appraisal type' },
      { id: 'turn-time', label: 'Turn Time', category: 'details', type: 'select', enabled: true, required: true, options: ['3 Business Days', '5 Business Days', '7 Business Days', '10 Business Days', '14 Business Days', '21 Business Days'], placeholder: 'Select timeline' },
      { id: 'ordering-party', label: 'Ordering Party', category: 'details', type: 'text', enabled: true, required: false, placeholder: 'Bank or institution name' },
      { id: 'order-date', label: 'Order Date', category: 'details', type: 'date', enabled: true, required: true },
      { id: 'due-date', label: 'Due Date', category: 'details', type: 'date', enabled: true, required: true },
      { id: 'rush-order', label: 'Rush Order', category: 'details', type: 'select', enabled: true, required: false, options: ['Yes', 'No'] },
      { id: 'client-file-number', label: 'Client File Number', category: 'details', type: 'text', enabled: true, required: false, placeholder: 'Internal file reference' },
      { id: 'loan-number', label: 'Loan Number', category: 'details', type: 'text', enabled: true, required: false, placeholder: 'Loan reference number' },
      { id: 'sales-price', label: 'Sales/Purchase Price', category: 'details', type: 'number', enabled: true, required: false, placeholder: '350000' },
      { id: 'refinance-purpose', label: 'Refinance Purpose', category: 'details', type: 'textarea', enabled: false, required: false, placeholder: 'Describe refinance purpose if applicable' },
      { id: 'special-instructions', label: 'Special Instructions', category: 'details', type: 'textarea', enabled: true, required: false, placeholder: 'Any special requirements or notes for the appraiser' },
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
