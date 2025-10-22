// Sample property data for property setup demonstration
export interface SampleProperty {
  id: string;
  fullAddress: string;
  streetAddress: string;
  aptUnit?: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  legalDescription: string;
  parcelId: string;
  propertyCategory: string;
  propertyType: string;
  yearBuilt: number;
  squareFootage: number;
  lotSize: number;
  bedrooms?: number;
  bathrooms?: number;
  floodZone: string;
  zoning: string;
  occupancyStatus: string;
  assessedValue: number;
  hoaApplicable: string;
  specialAssessments: string;
  environmentalConcerns: string;
  additionalNotes: string;
}

export const sampleProperties: SampleProperty[] = [
  {
    id: 'prop-1',
    fullAddress: '1425 Oakwood Avenue, Springfield, IL 62704',
    streetAddress: '1425 Oakwood Avenue',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    county: 'Sangamon County',
    legalDescription: 'Lot 15, Block 3, Oakwood Estates Subdivision, as recorded in Plat Book 45, Page 12, Sangamon County Records',
    parcelId: 'APN-14-25-401-015',
    propertyCategory: 'Residential',
    propertyType: 'Single Family',
    yearBuilt: 2005,
    squareFootage: 2450,
    lotSize: 0.28,
    bedrooms: 4,
    bathrooms: 2.5,
    floodZone: 'Zone X (Unshaded)',
    zoning: 'R-1 Single Family Residential',
    occupancyStatus: 'Owner Occupied',
    assessedValue: 385000,
    hoaApplicable: 'Yes',
    specialAssessments: 'Annual HOA fee: $850. Special assessment for street repairs planned for 2026.',
    environmentalConcerns: 'None identified. Property is not located in any known environmental concern areas.',
    additionalNotes: 'Well-maintained property in established neighborhood. Recent roof replacement (2023). Updated HVAC system (2021).',
  },
  {
    id: 'prop-2',
    fullAddress: '742 Market Street, Unit 8B, San Francisco, CA 94103',
    streetAddress: '742 Market Street',
    aptUnit: 'Unit 8B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    county: 'San Francisco County',
    legalDescription: 'Condominium Unit 8B, The Market Plaza Condominiums, as described in the Master Deed recorded as Document No. 2015-045628, San Francisco County Records',
    parcelId: 'APN-3725-042-8B',
    propertyCategory: 'Residential',
    propertyType: 'Condo',
    yearBuilt: 2015,
    squareFootage: 1250,
    lotSize: 0,
    bedrooms: 2,
    bathrooms: 2,
    floodZone: 'Zone X (Unshaded)',
    zoning: 'C-3-G Downtown General Commercial',
    occupancyStatus: 'Owner Occupied',
    assessedValue: 925000,
    hoaApplicable: 'Yes',
    specialAssessments: 'Monthly HOA fee: $725. Includes water, building insurance, and common area maintenance. Building earthquake retrofit completed 2020.',
    environmentalConcerns: 'None. Building underwent Phase I Environmental Site Assessment in 2015 with no issues identified.',
    additionalNotes: 'Modern high-rise condo with city views. Amenities include gym, rooftop terrace, and concierge. Parking space #142 included.',
  },
  {
    id: 'prop-3',
    fullAddress: '3580 Commerce Drive, Dallas, TX 75201',
    streetAddress: '3580 Commerce Drive',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75201',
    county: 'Dallas County',
    legalDescription: 'Tract 2, Commerce Center Industrial Park, as recorded in Volume 485, Page 92, Dallas County Deed Records',
    parcelId: 'APN-DC-3580-002',
    propertyCategory: 'Commercial',
    propertyType: 'Warehouse',
    yearBuilt: 1998,
    squareFootage: 18500,
    lotSize: 2.1,
    floodZone: 'Zone X (Shaded)',
    zoning: 'I-1 Light Industrial',
    occupancyStatus: 'Tenant Occupied',
    assessedValue: 2150000,
    hoaApplicable: 'No',
    specialAssessments: 'Property tax abatement through 2026. Requires annual fire inspection per Dallas Fire Code.',
    environmentalConcerns: 'Phase I ESA completed 2022. Minor historical soil contamination from previous tenant (auto repair) remediated in 2020. No Action Letter issued by TCEQ.',
    additionalNotes: 'Metal building with 3 loading docks and 20-foot clear height. Fully fenced with security gate. Current tenant: logistics company, lease expires 2027.',
  },
  {
    id: 'prop-4',
    fullAddress: '8925 Lakeshore Boulevard, Seattle, WA 98118',
    streetAddress: '8925 Lakeshore Boulevard',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98118',
    county: 'King County',
    legalDescription: 'Parcel A, Short Plat No. 9425182, recorded under King County Recording No. 20180425001234',
    parcelId: 'APN-892510-1825',
    propertyCategory: 'Residential',
    propertyType: 'Single Family',
    yearBuilt: 1952,
    squareFootage: 1850,
    lotSize: 0.18,
    bedrooms: 3,
    bathrooms: 1.5,
    floodZone: 'Zone AE',
    zoning: 'SF 5000 Single Family',
    occupancyStatus: 'Vacant',
    assessedValue: 685000,
    hoaApplicable: 'No',
    specialAssessments: 'None. Property recently listed for sale following estate settlement.',
    environmentalConcerns: 'Property is in FEMA flood zone AE - flood insurance required. Oil tank removed in 2019 with no contamination found.',
    additionalNotes: 'Older home with original hardwood floors. Needs cosmetic updating. Excellent location near Lake Washington. Property being sold as-is.',
  },
  {
    id: 'prop-5',
    fullAddress: '12 Heritage Court, Charleston, SC 29401',
    streetAddress: '12 Heritage Court',
    city: 'Charleston',
    state: 'SC',
    zipCode: '29401',
    county: 'Charleston County',
    legalDescription: 'Lot 12, Phase II, Heritage Estates, per Plat recorded in Plat Cabinet D, Slide 875, Charleston County RMC Office',
    parcelId: 'APN-285-12-00-012',
    propertyCategory: 'Residential',
    propertyType: 'Townhouse',
    yearBuilt: 2018,
    squareFootage: 2100,
    lotSize: 0.08,
    bedrooms: 3,
    bathrooms: 2.5,
    floodZone: 'Zone X (Unshaded)',
    zoning: 'R-2 Medium Density Residential',
    occupancyStatus: 'Owner Occupied',
    assessedValue: 475000,
    hoaApplicable: 'Yes',
    specialAssessments: 'Monthly HOA: $285. Covers exterior maintenance, landscaping, and pool access. Reserve study shows adequate funding.',
    environmentalConcerns: 'None identified. Property constructed to current environmental standards.',
    additionalNotes: 'End unit townhome with private patio. Gated community with amenities. Historic district overlay requires approval for exterior changes.',
  },
  {
    id: 'prop-6',
    fullAddress: '450 Agricultural Road, Napa, CA 94559',
    streetAddress: '450 Agricultural Road',
    city: 'Napa',
    state: 'CA',
    zipCode: '94559',
    county: 'Napa County',
    legalDescription: 'The South Half of the Southeast Quarter of Section 12, Township 6 North, Range 5 West, Mount Diablo Meridian, Napa County, California',
    parcelId: 'APN-028-450-021',
    propertyCategory: 'Agricultural',
    propertyType: 'Land',
    yearBuilt: 0,
    squareFootage: 0,
    lotSize: 40.5,
    floodZone: 'Zone X (Unshaded)',
    zoning: 'AG Agricultural Preserve',
    occupancyStatus: 'Vacant',
    assessedValue: 1850000,
    hoaApplicable: 'No',
    specialAssessments: 'Property enrolled in Williamson Act (Agricultural Preserve) - reduced property taxes in exchange for agricultural use restriction through 2033.',
    environmentalConcerns: 'Riparian corridor along western boundary requires 50-foot setback per County ordinance. Previous vineyard operations (pre-2015) - soil testing shows no pesticide residue above acceptable levels.',
    additionalNotes: 'Prime vineyard land with excellent drainage and sun exposure. Municipal water connection available. Access via paved county road. Adjacent parcels are active vineyards.',
  },
];

// Helper function to get property by ID
export function getPropertyById(id: string): SampleProperty | undefined {
  return sampleProperties.find(prop => prop.id === id);
}

// Helper function to get all property addresses for dropdown
export function getPropertyAddressList(): Array<{ id: string; fullAddress: string }> {
  return sampleProperties.map(prop => ({
    id: prop.id,
    fullAddress: prop.fullAddress,
  }));
}

