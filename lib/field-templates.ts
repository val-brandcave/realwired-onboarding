export interface FieldTemplate {
  id: string;
  name: string;
  description: string;
  useCase: string;
  fieldCount: number;
  enabledFieldIds: string[];
  thumbnailUrl: string;
}

// Request Form Templates
// Note: Property records use ONE standard configuration (no templates)
// Only request forms have template options
export const REQUEST_TEMPLATES: FieldTemplate[] = [
  {
    id: 'basic-request',
    name: 'Basic Request',
    description: 'Core request and loan information',
    useCase: 'Streamlined for simple appraisals and quick turnaround',
    fieldCount: 42,
    thumbnailUrl: '/panel-screenshots/3-column-appraisal.png',
    enabledFieldIds: [
      // System fields (12 - all auto-generated)
      'file-number', 'project-number', 'request-status', 'workflow-stage', 'property-link',
      'assignment-status', 'ordered-by', 'date-of-request', 'submitted-date', 'date-accepted',
      'escalation-date', 'job-manager',
      
      // Core request fields (30)
      'request-type', 'request-purpose', 'customer-name', 'ordering-choices', 'loan-officer',
      'lo-notifications-copy', 'date-needed', 'projected-close-date', 'loan-amount', 'loan-type',
      'loan-number', 'prior-loan-number', 'ltv-ratio', 'approved-ltv', 'risk-rating',
      'portfolio', 'billing-code', 'gl-account', 'lending-group', 'payment-method',
      'request-comments', 'on-hold', 'hold-history', 'hold-reason', 'due-date',
      'turn-time', 'turn-time-unit', 'rush-order', 'rush-reason', 'client-file-number',
    ],
  },
  {
    id: 'full-appraisal',
    name: 'Full Appraisal Workflow',
    description: 'Request info, bidding, and report submission',
    useCase: 'Complete appraisal management with vendor engagement',
    fieldCount: 95,
    thumbnailUrl: '/panel-screenshots/4-column-appraisal.png',
    enabledFieldIds: [
      // All from Basic Request (42 fields)
      'file-number', 'project-number', 'request-status', 'workflow-stage', 'property-link',
      'assignment-status', 'ordered-by', 'date-of-request', 'submitted-date', 'date-accepted',
      'escalation-date', 'job-manager', 'request-type', 'request-purpose', 'customer-name',
      'ordering-choices', 'loan-officer', 'lo-notifications-copy', 'date-needed', 'projected-close-date',
      'loan-amount', 'loan-type', 'loan-number', 'prior-loan-number', 'ltv-ratio', 'approved-ltv',
      'risk-rating', 'portfolio', 'billing-code', 'gl-account', 'lending-group', 'payment-method',
      'request-comments', 'on-hold', 'hold-history', 'hold-reason', 'due-date', 'turn-time',
      'turn-time-unit', 'rush-order', 'rush-reason', 'client-file-number',
      
      // Contact/Access Info Panel (16 fields)
      'marketing-status', 'contact-type', 'listing-agent', 'contact-name', 'list-price',
      'contact-phone', 'contact-email', 'contact-best-time', 'alternate-contact-type',
      'alternate-contact-name', 'alternate-phone', 'alternate-email', 'sale-price', 'sale-date',
      'access-instructions', 'property-occupied',
      
      // Bid/Engagement Panel (12 fields)
      'desired-delivery-date', 'residential-forms', 'is-rush-job', 'report-format',
      'bid-reply-time', 'approach-to-value', 'inspection-requirements', 'lockbox-code',
      'hoa-contact', 'special-instructions', 'bid-comments', 'engagement-letter',
      
      // Report Submission Panel (25 fields)
      'report-upload', 'value-as-is', 'invoice', 'value-as-stabilized', 'vendor-misc-1',
      'vendor-misc-2', 'vendor-misc-3', 'vendor-misc-4', 'vendor-misc-5', 'vendor-misc-6',
      'value-as-completed', 'date-of-report', 'vendor-name', 'fee-quote', 'engagement-letter-preview',
      'effective-date', 'inspection-date', 'report-type', 'comparable-sales-count',
      'highest-and-best-use', 'zoning-compliance', 'adverse-conditions', 'repairs-needed',
      'estimated-repair-cost', 'appraiser-license',
    ],
  },
  {
    id: 'complete-review',
    name: 'Complete Review Workflow',
    description: 'All panels including internal review and QA',
    useCase: 'Banks requiring comprehensive review workflow and quality assurance',
    fieldCount: 156,
    thumbnailUrl: '/panel-screenshots/dropdowns-appraisal.png',
    enabledFieldIds: [], // Empty means all fields enabled
  },
];

export function getTemplateById(templates: FieldTemplate[], templateId: string): FieldTemplate | undefined {
  return templates.find(t => t.id === templateId);
}

