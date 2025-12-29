"use client";

import type { PropertyRecordField, RequestFormField } from "@/lib/onboarding-context";

interface FormFieldPreviewProps {
  field: PropertyRecordField | RequestFormField;
}

// Standard placeholder options for common dropdown types
const PLACEHOLDER_OPTIONS: Record<string, string[]> = {
  'property-category': ['Single Family Residential', 'Multi-Family Residential', 'Commercial', 'Industrial', 'Land', 'Mixed Use'],
  'property-type': ['Single Family Home', 'Condo', 'Townhouse', 'Duplex', 'Triplex', 'Fourplex'],
  'state': ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],
  'site-area-unit': ['Square Feet', 'Acres', 'Units'],
  'building-size-unit': ['Square Feet', 'Square Meters'],
  'excess-land-unit': ['Acres', 'Square Feet'],
  'ownership-type': ['Fee Simple', 'Leasehold', 'Life Estate', 'Easement'],
  'property-status': ['Existing', 'Under Construction', 'Proposed', 'Conversion'],
  'flood-zone': ['Zone A', 'Zone AE', 'Zone AH', 'Zone AO', 'Zone X', 'Zone D'],
  'reg-b-dwelling': ['Yes', 'No'],
  'reg-b-first-mortgage': ['Yes', 'No'],
  'request-type': ['Purchase Appraisal', 'Refinance Appraisal', 'HELOC Appraisal', 'Construction Appraisal', 'FHA Appraisal', 'Phase 1 ESA', 'Phase 2 ESA'],
  'request-purpose': ['Purchase', 'Refinance', 'Home Equity', 'Construction', 'Portfolio Review'],
  'ordering-choices': ['Order Now', 'Engage Only', 'Bid Only', 'Hold for Review'],
  'loan-type': ['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'Portfolio'],
  'risk-rating': ['Low', 'Medium', 'High', 'Very High'],
  'payment-method': ['ACH', 'Check', 'Credit Card', 'Wire Transfer'],
  'report-format': ['URAR 1004', 'Desktop', 'Drive-By', '2055', '1025', 'Narrative'],
  'approach-to-value': ['Sales Comparison', 'Cost Approach', 'Income Approach'],
  'inspection-requirements': ['Full Interior/Exterior', 'Exterior Only', 'Desktop (No Inspection)', 'Drive-By'],
};

export function FormFieldPreview({ field }: FormFieldPreviewProps) {
  const fieldOptions = field.options || PLACEHOLDER_OPTIONS[field.id] || [];
  
  // Helper function to get sample data for fields (per Ed's request - show data in action!)
  const getSampleValue = (fieldId: string, label: string): string => {
    // Sample data for property fields
    const propertySampleData: Record<string, string> = {
      'street-address': '123 Main Street',
      'apt-unit': 'Unit 4B',
      'city': 'Chicago',
      'state': 'IL',
      'zip-code': '60601',
      'county': 'Cook County',
      'portfolio': 'Residential Lending',
      'portfolio-description': 'Primary residential mortgage portfolio',
      'year-built': '2010',
      'building-size': '2,400',
      'site-area': '0.25',
      'bedrooms': '4',
      'bathrooms': '2.5',
      'zoning-classification': 'R-1 Single Family Residential',
      'number-of-tenants': '1',
      'excess-land': '0.1',
      'lot-number': '42',
      'block': '15',
      'subdivision': 'Oak Park Estates',
      'str': 'Section 12, Township 39N, Range 14E',
      'parcel-id': '14-12-345-678-0000',
      'legal-description': 'Lot 42 in Block 15 of Oak Park Estates Subdivision',
      'multiple-building-description': 'Main residence with detached garage',
    };

    // Sample data for request fields
    const requestSampleData: Record<string, string> = {
      'request-id': 'RQ-2024-0147',
      'file-number': 'FILE-2024-0147',
      'project-number': 'PROJ-2024-0147',
      'order-id': 'ORD-45678',
      'property-id': 'PROP-1234',
      'loan-number': '4567890123',
      'prior-loan-number': '3456789012',
      'case-number': 'CASE-12345',
      'tracking-number': 'TRK987654321',
      'customer-name': 'John Smith',
      'loan-amount': '$450,000',
      'ltv-ratio': '80%',
      'approved-ltv': '85%',
      'billing-code': 'BC-1001',
      'gl-account': 'GL-5500-1200',
      'client-file-number': 'CF-2024-789',
      'turn-time': '5',
      'list-price': '$475,000',
      'sale-price': '$462,500',
      'contact-name': 'Sarah Johnson',
      'contact-phone': '(555) 123-4567',
      'contact-email': 'sarah.johnson@email.com',
      'alternate-contact-name': 'Mike Davis',
      'alternate-phone': '(555) 987-6543',
      'alternate-email': 'mike.davis@email.com',
      'lockbox-code': '#1234',
      'hoa-contact': 'Oak Park HOA - (555) 555-5555',
      'fee-quote': '$525',
      'value-as-is': '$465,000',
      'value-as-stabilized': '$475,000',
      'value-as-completed': '$480,000',
      'comparable-sales-count': '6',
      'estimated-repair-cost': '$12,500',
      'appraiser-license': 'IL-CG-123456',
    };

    // Combine both datasets
    const allSampleData = { ...propertySampleData, ...requestSampleData };
    
    return allSampleData[fieldId] || `Sample ${label}`;
  };
  
  // Check if field is readonly or auto-generated
  const isAutoGenerated = field.readonly || field.type === 'readonly';
  
  return (
    <div className="space-y-1.5">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-900">
        {field.customLabel || field.label}
        {field.required && <span className="text-red-600 ml-1">*</span>}
        {field.systemRequired && (
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
            System
          </span>
        )}
        {field.readonly && (
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
            Read-only
          </span>
        )}
      </label>

      {/* Input based on type */}
      {field.type === 'text' && !isAutoGenerated && (
        <input
          type="text"
          disabled
          value={getSampleValue(field.id, field.label)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 cursor-not-allowed"
        />
      )}

      {field.type === 'text' && isAutoGenerated && (
        <input
          type="text"
          disabled
          value={getSampleValue(field.id, field.label)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-mono"
        />
      )}

      {field.type === 'readonly' && (
        <input
          type="text"
          disabled
          value={getSampleValue(field.id, field.label)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-mono"
        />
      )}

      {field.type === 'email' && (
        <input
          type="email"
          disabled
          value={getSampleValue(field.id, field.label)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 cursor-not-allowed"
        />
      )}

      {field.type === 'tel' && (
        <input
          type="tel"
          disabled
          value={getSampleValue(field.id, field.label)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 cursor-not-allowed"
        />
      )}

      {field.type === 'number' && !isAutoGenerated && (
        <input
          type="text"
          disabled
          value={getSampleValue(field.id, field.label)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 cursor-not-allowed"
        />
      )}

      {field.type === 'number' && isAutoGenerated && (
        <input
          type="text"
          disabled
          value={getSampleValue(field.id, field.label)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-mono"
        />
      )}

      {field.type === 'date' && (
        <input
          type="date"
          disabled
          value="2024-12-30"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 cursor-not-allowed"
        />
      )}

      {field.type === 'textarea' && (
        <textarea
          disabled
          rows={3}
          value={getSampleValue(field.id, field.label)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 cursor-not-allowed resize-none"
        />
      )}

      {field.type === 'select' && (
        <select
          disabled={false}
          defaultValue={fieldOptions[0] || ""}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 cursor-pointer hover:border-[#9F2E2B] transition-colors"
        >
          {fieldOptions.length === 0 && <option value="">Select {field.label?.toLowerCase()}</option>}
          {fieldOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {field.type === 'multiselect' && (
        <select
          disabled={false}
          multiple
          size={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
        >
          {fieldOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {field.type === 'checkbox' && fieldOptions.length > 0 && (
        <div className="space-y-2 p-3 border border-gray-300 rounded-lg bg-gray-50">
          {fieldOptions.map((option, idx) => (
            <label key={idx} className="flex items-center gap-2 text-sm text-gray-600 cursor-not-allowed">
              <input
                type="checkbox"
                disabled
                className="w-4 h-4 text-[#9F2E2B] border-gray-300 rounded cursor-not-allowed"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {field.type === 'file' && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-500">File upload</p>
          <p className="text-xs text-gray-400 mt-1">(Disabled in preview)</p>
        </div>
      )}
    </div>
  );
}

