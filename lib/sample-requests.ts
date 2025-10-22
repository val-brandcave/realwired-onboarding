// Sample Request Types for demonstrating request form structure

export interface SampleRequest {
  id: string;
  requestType: string;
  propertyAddress: string;
  requestPurpose: string;
  loanOfficer: string;
  customerName: string;
  loanAmount: number;
  ltvRatio: number;
  loanType: string;
  appraisalType?: string;
  turnTime: string;
  specialInstructions: string;
  propertyCategory: string;
  propertyType: string;
  // Additional fields
  borrowerEmail?: string;
  borrowerPhone?: string;
  coborroweName?: string;
  orderingParty: string;
  orderDate: string;
  dueDate: string;
  rushOrder: boolean;
  clientFileNumber?: string;
  loanNumber?: string;
  salesPrice?: number;
  purchasePrice?: number;
  refinancePurpose?: string;
}

export const sampleRequests: SampleRequest[] = [
  {
    id: 'residential-1',
    requestType: 'Residential Appraisal',
    propertyAddress: '1425 Oakwood Avenue, Springfield, IL 62704',
    requestPurpose: 'Purchase',
    loanOfficer: 'Sarah Johnson',
    customerName: 'Michael Anderson',
    loanAmount: 285000,
    ltvRatio: 80,
    loanType: 'Conventional 30-Year Fixed',
    appraisalType: '1004 Full Appraisal',
    turnTime: '7 Business Days',
    specialInstructions: 'Property has recent kitchen renovation - please note in report',
    propertyCategory: 'Residential',
    propertyType: 'Single Family',
    borrowerEmail: 'michael.anderson@email.com',
    borrowerPhone: '(555) 123-4567',
    orderingParty: 'First National Bank',
    orderDate: '2025-10-21',
    dueDate: '2025-10-30',
    rushOrder: false,
    clientFileNumber: 'FNB-2025-001234',
    loanNumber: 'LN-450298765',
    salesPrice: 356250,
    purchasePrice: 356250,
  },
  {
    id: 'commercial-1',
    requestType: 'Commercial Appraisal',
    propertyAddress: '3580 Commerce Drive, Dallas, TX 75201',
    requestPurpose: 'Refinance',
    loanOfficer: 'Robert Chen',
    customerName: 'Texas Logistics LLC',
    loanAmount: 1850000,
    ltvRatio: 70,
    loanType: 'Commercial Real Estate Loan',
    appraisalType: 'Commercial Narrative Report',
    turnTime: '14 Business Days',
    specialInstructions: 'Income approach required - property currently leased with 5-year lease term remaining',
    propertyCategory: 'Commercial',
    propertyType: 'Warehouse',
    borrowerEmail: 'finance@texaslogistics.com',
    borrowerPhone: '(555) 987-6543',
    orderingParty: 'Commercial Bank of Texas',
    orderDate: '2025-10-21',
    dueDate: '2025-11-08',
    rushOrder: false,
    clientFileNumber: 'CBT-COM-2025-5678',
    loanNumber: 'CL-782934561',
    refinancePurpose: 'Cash-out refinance for expansion',
  },
  {
    id: 'environmental-1',
    requestType: 'Environmental Assessment',
    propertyAddress: '450 Agricultural Road, Napa, CA 94559',
    requestPurpose: 'Purchase',
    loanOfficer: 'Jennifer Martinez',
    customerName: 'Green Valley Investments',
    loanAmount: 975000,
    ltvRatio: 75,
    loanType: 'Agricultural Loan',
    appraisalType: 'Phase I Environmental Site Assessment',
    turnTime: '10 Business Days',
    specialInstructions: 'Property has history of agricultural use - check for pesticide residue and soil contamination',
    propertyCategory: 'Agricultural',
    propertyType: 'Land',
    borrowerEmail: 'info@greenvalley.com',
    borrowerPhone: '(555) 234-5678',
    orderingParty: 'Pacific Agricultural Bank',
    orderDate: '2025-10-21',
    dueDate: '2025-11-04',
    rushOrder: false,
    clientFileNumber: 'PAB-ENV-2025-3456',
    loanNumber: 'AL-198273645',
    purchasePrice: 1300000,
  },
  {
    id: 'residential-condo-1',
    requestType: 'Residential Appraisal',
    propertyAddress: '742 Market Street, Unit 8B, San Francisco, CA 94103',
    requestPurpose: 'Refinance',
    loanOfficer: 'David Lee',
    customerName: 'Emily Chen',
    loanAmount: 620000,
    ltvRatio: 75,
    loanType: 'FHA 30-Year Fixed',
    appraisalType: '1004 Full Appraisal',
    turnTime: '5 Business Days',
    specialInstructions: 'HOA approval required - condo in high-rise building',
    propertyCategory: 'Residential',
    propertyType: 'Condo',
    borrowerEmail: 'emily.chen@email.com',
    borrowerPhone: '(555) 345-6789',
    coborroweName: 'James Chen',
    orderingParty: 'Bay Area Federal Credit Union',
    orderDate: '2025-10-21',
    dueDate: '2025-10-28',
    rushOrder: true,
    clientFileNumber: 'BAFCU-2025-7890',
    loanNumber: 'LN-892745631',
    refinancePurpose: 'Rate and term refinance',
  },
  {
    id: 'residential-townhouse-1',
    requestType: 'Residential Appraisal',
    propertyAddress: '12 Heritage Court, Charleston, SC 29401',
    requestPurpose: 'Purchase',
    loanOfficer: 'Amanda Foster',
    customerName: 'Thomas and Mary Williams',
    loanAmount: 425000,
    ltvRatio: 85,
    loanType: 'VA Loan',
    appraisalType: '1004 Full Appraisal',
    turnTime: '7 Business Days',
    specialInstructions: 'VA appraisal - ensure MPR requirements met. Historic district property.',
    propertyCategory: 'Residential',
    propertyType: 'Townhouse',
    borrowerEmail: 'twilliams@email.com',
    borrowerPhone: '(555) 456-7890',
    coborroweName: 'Mary Williams',
    orderingParty: 'Veterans First Bank',
    orderDate: '2025-10-21',
    dueDate: '2025-10-30',
    rushOrder: false,
    clientFileNumber: 'VFB-VA-2025-2345',
    loanNumber: 'VA-673829451',
    salesPrice: 500000,
    purchasePrice: 500000,
  },
];

export function getRequestById(id: string): SampleRequest | undefined {
  return sampleRequests.find(req => req.id === id);
}

export function getRequestTypesList(): { value: string; label: string; description: string }[] {
  return [
    {
      value: 'residential-1',
      label: 'Residential Purchase',
      description: 'Single Family Home - $285K Conventional Loan',
    },
    {
      value: 'commercial-1',
      label: 'Commercial Refinance',
      description: 'Warehouse - $1.85M Commercial Loan',
    },
    {
      value: 'environmental-1',
      label: 'Environmental Assessment',
      description: 'Agricultural Land - Phase I Environmental',
    },
    {
      value: 'residential-condo-1',
      label: 'Residential Condo Refinance',
      description: 'High-rise Condo - $620K FHA Loan',
    },
    {
      value: 'residential-townhouse-1',
      label: 'Residential Townhouse Purchase',
      description: 'Historic Townhouse - $425K VA Loan',
    },
  ];
}

