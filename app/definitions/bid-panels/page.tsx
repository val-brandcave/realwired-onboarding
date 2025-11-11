"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type BidPanelType = '3-column' | '4-column' | 'checkboxes' | 'dropdowns';
type FieldInputType = 'text' | 'textarea' | 'select' | 'number' | 'date';

interface BidPanelField {
  id: string;
  label: string;
  enabled: boolean;
  required: boolean;
  systemRequired?: boolean; // Cannot be changed by user
  readonly: boolean;
  customLabel?: string;
  inputType?: FieldInputType;
  dropdownOptions?: string[];
}

// Dropdown options extracted from screenshots
const DROPDOWN_OPTIONS = {
  'report-format': [
    'Appraisal Report',
    'Restricted Appraisal Report',
    'Appraisal Consulting Assignment',
    'Evaluation',
    'In-House Evaluation',
    'Equipment Survey',
    'Final Inspection'
  ],
  'residential-forms': [
    '1004C',
    '1025 Form - Multifamily',
    '1025 Single-family, Duplex, Small Residential Income Producing Property',
    '2055 Form - Drive By',
    '2055 Form - Drive By w/Land Value',
    '2055 Form - Drive By w/Land Value',
    '2055 Form - Inspection',
    '2055 Form - Inspection w/GRM',
    '2055 Form - Inspection w/Land Value',
    'Condo Form - 1073 (Interior)',
    'Condo Form - 1075 (Exterior)',
    'Desktop Detai led',
    'Land Form',
    'Market Conditions Addendum',
    'URAR + MC Form',
    'URAR + Suppl. REO Add.',
    'URAR 1004D (Form 442)',
    'URAR Form',
    'URAR with Rental Income Information'
  ],
  'market-analysis-level': [
    'Market Condition Addendum',
    'N/A'
  ],
  'value-premise': [
    'Market Value - As Is',
    'Market Value - Hypothetical',
    'Market Value - Retrospective',
    'Prospective Market Value - At Completion',
    'Prospective Market Value - At Completion/Stabilization',
    'Prospective Market Value - At Stabilization',
    'Monthly Home Absorption',
    'Going Concern',
    'Insurable Value',
    'Liquidation Value'
  ],
  'value-qualifier': [
    'As Is',
    'As Completed',
    'As Stabilized'
  ],
  'interest-appraised': [
    'Fee Simple',
    'Leased Fee',
    'Leasehold'
  ],
  'inspection-requirements': [
    'Full Inspection',
    'Exterior Only Inspection Minimally Required',
    'Exterior Only DO NOT CONTACT BORROWER',
    'Drive By'
  ],
  'approach-to-value': [
    'Sales Comparison',
    'Cost Approach',
    'Income Capitalization',
    'All Applicable Approaches'
  ],
  'valuation-types': [
    'None',
    'Leased Fee (leased, all or part)',
    'Fee Simple',
    'Leasehold'
  ],
  'premise-valued': [
    'Fee Simple',
    'Leased Fee',
    'Leasehold'
  ],
  'value-type': [
    'As Is',
    'As Stabilized',
    'As Completed',
    'Bulk Sale Market Value',
    'Retrospective Value'
  ],
  'value-date-type': [
    'Current',
    'Retrospective',
    'Prospective'
  ],
  'intended-use-environmental': [
    'Conventional Loan Underwriting',
    'SBA Loan Underwriting',
    'Potential Foreclosure'
  ]
};

export default function BidPanelsPage() {
  const { state, updateDefinitions, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('definitions', 5, 5); // Step 5 of 5 - 100%
  }, [updateModuleProgress]);

  const [selectedBidTemplate, setSelectedBidTemplate] = useState<BidPanelType>('3-column');
  const [useEnvironmental, setUseEnvironmental] = useState(true);

  // Fields for each appraisal panel option based on screenshots
  // Note: Report Format and Residential Forms (where applicable) are system-required
  const getAppraisalPanelFields = (templateType: BidPanelType): BidPanelField[] => {
    const baseFields = {
      '3-column': [
        { id: 'report-format', label: 'Report Format', enabled: true, required: true, systemRequired: true, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['report-format'] },
        { id: 'value-premise', label: 'Value Premise', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['value-premise'] },
        { id: 'value-qualifier', label: 'Value Qualifier', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['value-qualifier'] },
        { id: 'inspection-requirements', label: 'Inspection Requirements', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['inspection-requirements'] },
        { id: 'approach-to-value', label: 'Approach To Value', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['approach-to-value'] },
        { id: 'internal-appraisal', label: 'Internal Appraisal', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'text' as FieldInputType },
        { id: 'comments', label: 'Comments', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'textarea' as FieldInputType },
      ],
      '4-column': [
        { id: 'report-format', label: 'Report Format', enabled: true, required: true, systemRequired: true, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['report-format'] },
        { id: 'residential-forms', label: 'Residential Forms', enabled: true, required: true, systemRequired: true, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['residential-forms'] },
        { id: 'market-analysis-level', label: 'Market Analysis Level', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['market-analysis-level'] },
        { id: 'value-premise', label: 'Value Premise', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['value-premise'] },
        { id: 'value-qualifier', label: 'Value Qualifier', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['value-qualifier'] },
        { id: 'interest-appraised', label: 'Interest Appraised', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['interest-appraised'] },
        { id: 'inspection-requirements', label: 'Inspection Requirements', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['inspection-requirements'] },
        { id: 'approach-to-value', label: 'Approach To Value', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['approach-to-value'] },
        { id: 'comments', label: 'Comments', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'textarea' as FieldInputType },
      ],
      'checkboxes': [
        { id: 'report-format', label: 'Report Format', enabled: true, required: true, systemRequired: true, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['report-format'] },
        { id: 'residential-forms', label: 'Residential Forms', enabled: true, required: true, systemRequired: true, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['residential-forms'] },
        { id: 'premise-valued', label: 'Premise Valued', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['premise-valued'] },
        { id: 'value-type', label: 'Value Type', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['value-type'] },
        { id: 'value-date-type', label: 'Value Date Type', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['value-date-type'] },
        { id: 'scope-of-work', label: 'Scope of Work', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'textarea' as FieldInputType },
        { id: 'market-analysis-level', label: 'Market Analysis Level', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['market-analysis-level'] },
        { id: 'approach-to-value', label: 'Approach To Value', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['approach-to-value'] },
      ],
      'dropdowns': [
        { id: 'report-format', label: 'Report Format', enabled: true, required: true, systemRequired: true, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['report-format'] },
        { id: 'market-analysis-level', label: 'Market Analysis Level', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['market-analysis-level'] },
        { id: 'as-is-value', label: 'As Is Value', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['valuation-types'] },
        { id: 'prospective-value-completion', label: 'Prospective Value at Completion', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['valuation-types'] },
        { id: 'if-leased-fee', label: 'If Leased Fee', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'text' as FieldInputType },
        { id: 'retrospective-value', label: 'Retrospective Value', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['valuation-types'] },
        { id: 'prospective-value-stabilization', label: 'Prospective Value at Stabilization', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'select' as FieldInputType, dropdownOptions: DROPDOWN_OPTIONS['valuation-types'] },
        { id: 'scope-of-work', label: 'Scope of Work', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'textarea' as FieldInputType },
      ],
    };
    return baseFields[templateType];
  };

  const [appraisalFields, setAppraisalFields] = useState<BidPanelField[]>(
    getAppraisalPanelFields(selectedBidTemplate)
  );

  const [environmentalFields, setEnvironmentalFields] = useState<BidPanelField[]>([
    { id: 'report-type', label: 'Report Type', enabled: true, required: true, systemRequired: true, readonly: false, inputType: 'select', dropdownOptions: ['Phase I ESA', 'Phase II ESA', 'Transaction Screen', 'Property Condition Assessment'] },
    { id: 'intended-use', label: 'Intended Use', enabled: true, required: true, systemRequired: true, readonly: false, inputType: 'select', dropdownOptions: DROPDOWN_OPTIONS['intended-use-environmental'] },
    { id: 'scope-of-work', label: 'Scope Of Work', enabled: true, required: true, systemRequired: false, readonly: false, inputType: 'textarea' },
    { id: 'bid-reply-time', label: 'Bid Reply Time (Days)', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'number' },
    { id: 'have-recs-identified', label: 'Have any RECs been identified?', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'select', dropdownOptions: ['Yes', 'No', 'Unknown'] },
    { id: 'investigation-recommended', label: 'Is further investigation recommended?', enabled: true, required: false, systemRequired: false, readonly: false, inputType: 'select', dropdownOptions: ['Yes', 'No', 'Not Applicable'] },
  ]);

  // Custom field states
  const [showCustomFieldForm, setShowCustomFieldForm] = useState(false);
  const [customFieldLabel, setCustomFieldLabel] = useState('');
  const [customFieldType, setCustomFieldType] = useState<FieldInputType>('text');
  const [customFieldOptions, setCustomFieldOptions] = useState<string[]>([]);
  const [newCustomOption, setNewCustomOption] = useState('');
  const [customFieldRequired, setCustomFieldRequired] = useState(false);

  // Dropdown editing states
  const [editingDropdownField, setEditingDropdownField] = useState<string | null>(null);
  const [newDropdownItem, setNewDropdownItem] = useState('');

  // Image preview modal states
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState(1);

  const handleFieldLabelUpdate = (fieldId: string, newLabel: string, isEnvironmental: boolean) => {
    if (isEnvironmental) {
      setEnvironmentalFields(prev =>
        prev.map(f => f.id === fieldId ? { ...f, customLabel: newLabel } : f)
      );
    } else {
      setAppraisalFields(prev =>
        prev.map(f => f.id === fieldId ? { ...f, customLabel: newLabel } : f)
      );
    }
  };

  const handleFieldToggle = (fieldId: string, isEnvironmental: boolean) => {
    if (isEnvironmental) {
      setEnvironmentalFields(prev =>
        prev.map(f => f.id === fieldId && !f.systemRequired ? { ...f, enabled: !f.enabled } : f)
      );
    } else {
      setAppraisalFields(prev =>
        prev.map(f => f.id === fieldId && !f.systemRequired ? { ...f, enabled: !f.enabled } : f)
      );
    }
  };

  const handleRequiredToggle = (fieldId: string, isEnvironmental: boolean) => {
    if (isEnvironmental) {
      setEnvironmentalFields(prev =>
        prev.map(f => f.id === fieldId && !f.systemRequired ? { ...f, required: !f.required } : f)
      );
    } else {
      setAppraisalFields(prev =>
        prev.map(f => f.id === fieldId && !f.systemRequired ? { ...f, required: !f.required } : f)
      );
    }
  };

  const handleAddDropdownItem = (fieldId: string, isEnvironmental: boolean) => {
    if (!newDropdownItem.trim()) return;
    
    if (isEnvironmental) {
      setEnvironmentalFields(prev =>
        prev.map(field =>
          field.id === fieldId 
            ? { ...field, dropdownOptions: [...(field.dropdownOptions || []), newDropdownItem.trim()] }
            : field
        )
      );
    } else {
      setAppraisalFields(prev =>
        prev.map(field =>
          field.id === fieldId 
            ? { ...field, dropdownOptions: [...(field.dropdownOptions || []), newDropdownItem.trim()] }
            : field
        )
      );
    }
    setNewDropdownItem('');
  };

  const handleRemoveDropdownItem = (fieldId: string, item: string, isEnvironmental: boolean) => {
    if (isEnvironmental) {
      setEnvironmentalFields(prev =>
        prev.map(field =>
          field.id === fieldId 
            ? { ...field, dropdownOptions: field.dropdownOptions?.filter(i => i !== item) }
            : field
        )
      );
    } else {
      setAppraisalFields(prev =>
        prev.map(field =>
          field.id === fieldId 
            ? { ...field, dropdownOptions: field.dropdownOptions?.filter(i => i !== item) }
            : field
        )
      );
    }
  };

  const handleAddCustomField = (isEnvironmental: boolean) => {
    if (!customFieldLabel.trim()) return;

    const newField: BidPanelField = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: customFieldLabel.trim(),
      customLabel: customFieldLabel.trim(),
      enabled: true,
      required: customFieldRequired,
      systemRequired: false,
      readonly: false,
      inputType: customFieldType,
      dropdownOptions: (customFieldType === 'select') ? customFieldOptions : undefined,
    };

    if (isEnvironmental) {
      setEnvironmentalFields([...environmentalFields, newField]);
    } else {
      setAppraisalFields([...appraisalFields, newField]);
    }
    
    // Reset form
    setCustomFieldLabel('');
    setCustomFieldType('text');
    setCustomFieldOptions([]);
    setNewCustomOption('');
    setCustomFieldRequired(false);
    setShowCustomFieldForm(false);
  };

  const handleAddCustomOption = () => {
    if (newCustomOption.trim() && !customFieldOptions.includes(newCustomOption.trim())) {
      setCustomFieldOptions([...customFieldOptions, newCustomOption.trim()]);
      setNewCustomOption('');
    }
  };

  const handleRemoveCustomOption = (option: string) => {
    setCustomFieldOptions(customFieldOptions.filter(o => o !== option));
  };

  const handleRemoveCustomField = (fieldId: string, isEnvironmental: boolean) => {
    if (fieldId.startsWith('custom-')) {
      if (isEnvironmental) {
        setEnvironmentalFields(environmentalFields.filter(f => f.id !== fieldId));
      } else {
        setAppraisalFields(appraisalFields.filter(f => f.id !== fieldId));
      }
    }
  };

  const handleContinue = () => {
    updateDefinitions({ 
      bidPanelType: selectedBidTemplate,
      useEnvironmental,
      appraisalPanelFields: appraisalFields,
      environmentalPanelFields: environmentalFields,
      completed: true
    });
    router.push('/definitions/complete');
  };

  const steps = [
    { id: '1', label: 'Property Categories', status: 'completed' as const },
    { id: '2', label: 'Property Fields', status: 'completed' as const },
    { id: '3', label: 'Request Types', status: 'completed' as const },
    { id: '4', label: 'Request Form', status: 'completed' as const },
    { id: '5', label: 'Bid Panels', status: 'in_progress' as const },
  ];

  // Update fields when template changes
  useEffect(() => {
    setAppraisalFields(getAppraisalPanelFields(selectedBidTemplate));
  }, [selectedBidTemplate]);

  return (
    <MainLayout 
      currentStep={3} 
      steps={steps}
      title="Definitions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Bid Engagement Panel Configuration
          </h1>
          <p className="text-base text-muted-foreground">
            Select and customize the bid engagement panels for appraisals and environmental orders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            
            {/* Appraisal Bid Engagement Panel */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-foreground">Appraisal Bid Engagement Panel</h2>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Required
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-5">
                Select the template layout for your appraisal bid engagement panel. This determines how vendors will view and interact with bid requirements.
              </p>

              <div className="space-y-4 mb-6">
                {/* Value Premise */}
                <label className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                  selectedBidTemplate === '3-column' ? 'border-primary bg-primary/5' : 'border-border'
                }`}>
                  <input
                    type="radio"
                    name="bidTemplate"
                    value="3-column"
                    checked={selectedBidTemplate === '3-column'}
                    onChange={() => setSelectedBidTemplate('3-column')}
                    className="w-5 h-5 text-primary border-input mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-1">Value Premise</h3>
                    <p className="text-xs text-muted-foreground">
                      Standard appraisal panel with value premise, inspection requirements, and approach to value fields.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setPreviewImage('/panel-screenshots/bid-engagement-appraisal-panel-option1.png');
                    }}
                    className="w-32 h-20 bg-slate-100 rounded border-2 border-slate-300 hover:border-primary overflow-hidden flex-shrink-0 transition-colors cursor-pointer"
                  >
                    <img 
                      src="/panel-screenshots/bid-engagement-appraisal-panel-option1.png" 
                      alt="Value Premise Panel Preview"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </label>

                {/* Value Premise with 4 Fields */}
                <label className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                  selectedBidTemplate === '4-column' ? 'border-primary bg-primary/5' : 'border-border'
                }`}>
                  <input
                    type="radio"
                    name="bidTemplate"
                    value="4-column"
                    checked={selectedBidTemplate === '4-column'}
                    onChange={() => setSelectedBidTemplate('4-column')}
                    className="w-5 h-5 text-primary border-input mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-1">Value Premise with 4 Fields</h3>
                    <p className="text-xs text-muted-foreground">
                      Extended panel with residential forms, market analysis level, and additional value qualifier fields.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setPreviewImage('/panel-screenshots/bid-engagement-appraisal-panel-option2.png');
                    }}
                    className="w-32 h-20 bg-slate-100 rounded border-2 border-slate-300 hover:border-primary overflow-hidden flex-shrink-0 transition-colors cursor-pointer"
                  >
                    <img 
                      src="/panel-screenshots/bid-engagement-appraisal-panel-option2.png" 
                      alt="Value Premise with 4 Fields Panel Preview"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </label>

                {/* Premise Scenarios */}
                <label className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                  selectedBidTemplate === 'checkboxes' ? 'border-primary bg-primary/5' : 'border-border'
                }`}>
                  <input
                    type="radio"
                    name="bidTemplate"
                    value="checkboxes"
                    checked={selectedBidTemplate === 'checkboxes'}
                    onChange={() => setSelectedBidTemplate('checkboxes')}
                    className="w-5 h-5 text-primary border-input mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-1">Premise Scenarios</h3>
                    <p className="text-xs text-muted-foreground">
                      Comprehensive panel with premise valued, value type, value date type, and scope of work options.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setPreviewImage('/panel-screenshots/bid-engagement-appraisal-panel-option3.png');
                    }}
                    className="w-32 h-20 bg-slate-100 rounded border-2 border-slate-300 hover:border-primary overflow-hidden flex-shrink-0 transition-colors cursor-pointer"
                  >
                    <img 
                      src="/panel-screenshots/bid-engagement-appraisal-panel-option3.png" 
                      alt="Premise Scenarios Panel Preview"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </label>

                {/* Valuation Scenarios */}
                <label className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                  selectedBidTemplate === 'dropdowns' ? 'border-primary bg-primary/5' : 'border-border'
                }`}>
                  <input
                    type="radio"
                    name="bidTemplate"
                    value="dropdowns"
                    checked={selectedBidTemplate === 'dropdowns'}
                    onChange={() => setSelectedBidTemplate('dropdowns')}
                    className="w-5 h-5 text-primary border-input mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-1">Valuation Scenarios</h3>
                    <p className="text-xs text-muted-foreground">
                      Flexible panel with multiple valuation types including as-is, prospective, retrospective, and leased fee options.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setPreviewImage('/panel-screenshots/bid-engagement-appraisal-panel-option4.png');
                    }}
                    className="w-32 h-20 bg-slate-100 rounded border-2 border-slate-300 hover:border-primary overflow-hidden flex-shrink-0 transition-colors cursor-pointer"
                  >
                    <img 
                      src="/panel-screenshots/bid-engagement-appraisal-panel-option4.png" 
                      alt="Valuation Scenarios Panel Preview"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </label>
              </div>

              {/* Customize Panel Fields */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">Customize Panel Fields</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Customize the field labels and dropdown options that will appear in the selected panel layout.
                </p>
                <div className="space-y-2">
                  {appraisalFields.map((field) => (
                    <FieldConfiguration
                      key={field.id}
                      field={field}
                      onToggle={() => handleFieldToggle(field.id, false)}
                      onToggleRequired={() => handleRequiredToggle(field.id, false)}
                      onLabelUpdate={(label) => handleFieldLabelUpdate(field.id, label, false)}
                      onAddDropdownItem={() => handleAddDropdownItem(field.id, false)}
                      onRemoveDropdownItem={(item) => handleRemoveDropdownItem(field.id, item, false)}
                      editingDropdownField={editingDropdownField}
                      setEditingDropdownField={setEditingDropdownField}
                      newDropdownItem={newDropdownItem}
                      setNewDropdownItem={setNewDropdownItem}
                      isCustomField={field.id.startsWith('custom-')}
                      onRemoveCustomField={() => handleRemoveCustomField(field.id, false)}
                    />
                  ))}

                  {/* Add Custom Field Button */}
                  {!showCustomFieldForm ? (
                    <button
                      onClick={() => setShowCustomFieldForm(true)}
                      className="w-full px-4 py-3 text-sm font-medium text-primary bg-white hover:bg-primary/5 rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-primary/30"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Custom Field
                    </button>
                  ) : (
                    <CustomFieldForm
                      customFieldLabel={customFieldLabel}
                      setCustomFieldLabel={setCustomFieldLabel}
                      customFieldType={customFieldType}
                      setCustomFieldType={setCustomFieldType}
                      customFieldRequired={customFieldRequired}
                      setCustomFieldRequired={setCustomFieldRequired}
                      customFieldOptions={customFieldOptions}
                      newCustomOption={newCustomOption}
                      setNewCustomOption={setNewCustomOption}
                      onAddCustomOption={handleAddCustomOption}
                      onRemoveCustomOption={handleRemoveCustomOption}
                      onAddCustomField={() => handleAddCustomField(false)}
                      onCancel={() => {
                        setShowCustomFieldForm(false);
                        setCustomFieldLabel('');
                        setCustomFieldType('text');
                        setCustomFieldOptions([]);
                        setNewCustomOption('');
                        setCustomFieldRequired(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Environmental Orders Section */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-foreground">Environmental Orders</h2>
                <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                  Optional
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Configure environmental order settings. If you don't use environmental orders, you can disable this section.
              </p>

              {/* Enable/Disable Environmental */}
              <label className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                useEnvironmental ? 'border-primary bg-primary/5' : 'border-border'
              }`}>
                <input
                  id="use-environmental"
                  type="checkbox"
                  checked={useEnvironmental}
                  onChange={(e) => setUseEnvironmental(e.target.checked)}
                  className="w-5 h-5 text-primary border-input rounded mt-1 focus:ring-2 focus:ring-ring"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground mb-1">Environmental Orders</h3>
                  <p className="text-xs text-muted-foreground">
                    Enable if your organization processes environmental site assessments and related orders.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPreviewImage('/panel-screenshots/bid-engagement-environmental-panel.png');
                  }}
                  className="w-32 h-20 bg-slate-100 rounded border-2 border-slate-300 hover:border-primary overflow-hidden flex-shrink-0 transition-colors"
                >
                  <img 
                    src="/panel-screenshots/bid-engagement-environmental-panel.png" 
                    alt="Environmental Panel Preview"
                    className="w-full h-full object-cover"
                  />
                </button>
              </label>

              {/* Environmental Panel Configuration (shown only if enabled) */}
              {useEnvironmental && (
                <div className="space-y-4 mt-4">
                  {/* Customize Environmental Fields */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Customize Environmental Panel Fields</h3>
                    <div className="space-y-2">
                      {environmentalFields.map((field) => (
                        <FieldConfiguration
                          key={field.id}
                          field={field}
                          onToggle={() => handleFieldToggle(field.id, true)}
                          onToggleRequired={() => handleRequiredToggle(field.id, true)}
                          onLabelUpdate={(label) => handleFieldLabelUpdate(field.id, label, true)}
                          onAddDropdownItem={() => handleAddDropdownItem(field.id, true)}
                          onRemoveDropdownItem={(item) => handleRemoveDropdownItem(field.id, item, true)}
                          editingDropdownField={editingDropdownField}
                          setEditingDropdownField={setEditingDropdownField}
                          newDropdownItem={newDropdownItem}
                          setNewDropdownItem={setNewDropdownItem}
                          isCustomField={field.id.startsWith('custom-')}
                          onRemoveCustomField={() => handleRemoveCustomField(field.id, true)}
                        />
                      ))}

                      {/* Add Custom Field for Environmental */}
                      {!showCustomFieldForm ? (
                        <button
                          onClick={() => setShowCustomFieldForm(true)}
                          className="w-full px-4 py-3 text-sm font-medium text-primary bg-white hover:bg-primary/5 rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-primary/30"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Custom Field
                        </button>
                      ) : (
                        <CustomFieldForm
                          customFieldLabel={customFieldLabel}
                          setCustomFieldLabel={setCustomFieldLabel}
                          customFieldType={customFieldType}
                          setCustomFieldType={setCustomFieldType}
                          customFieldRequired={customFieldRequired}
                          setCustomFieldRequired={setCustomFieldRequired}
                          customFieldOptions={customFieldOptions}
                          newCustomOption={newCustomOption}
                          setNewCustomOption={setNewCustomOption}
                          onAddCustomOption={handleAddCustomOption}
                          onRemoveCustomOption={handleRemoveCustomOption}
                          onAddCustomField={() => handleAddCustomField(true)}
                          onCancel={() => {
                            setShowCustomFieldForm(false);
                            setCustomFieldLabel('');
                            setCustomFieldType('text');
                            setCustomFieldOptions([]);
                            setNewCustomOption('');
                            setCustomFieldRequired(false);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button 
                onClick={() => router.push('/definitions/request-form/configure')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                className="px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
              >
                Complete Definitions Module →
              </button>
            </div>
          </div>

          {/* Educational Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  Bid engagement panels determine how vendors see and respond to your appraisal and environmental order requests. Choose the layout that matches your workflow.
                </p>
              </div>

              <div className="space-y-4">
                {/* Video Tutorial Placeholder */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video Tutorial (3:00)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Bid Panel Configuration</p>
                    </div>
                  </div>
                </div>

                {/* Tip Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-blue-900">
                      <strong>Tip:</strong> You can customize field labels and dropdown options to match your organization's terminology. All settings can be changed later if needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-semibold text-foreground">Panel Preview</h3>
              <div className="flex items-center gap-3">
                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setImageZoom(Math.max(0.5, imageZoom - 0.25))}
                    disabled={imageZoom <= 0.5}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Zoom Out"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-slate-700 min-w-[60px] text-center">
                    {Math.round(imageZoom * 100)}%
                  </span>
                  <button
                    onClick={() => setImageZoom(Math.min(3, imageZoom + 0.25))}
                    disabled={imageZoom >= 3}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Zoom In"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setImageZoom(1)}
                    className="px-3 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded border border-slate-300"
                    title="Reset Zoom"
                  >
                    Reset
                  </button>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => {
                    setPreviewImage(null);
                    setImageZoom(1);
                  }}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded"
                  aria-label="Close preview"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body - Scrollable Image Container */}
            <div className="overflow-auto max-h-[calc(90vh-80px)] bg-slate-50 p-6">
              <div className="flex items-center justify-center min-h-full">
                <img 
                  src={previewImage}
                  alt="Panel Preview"
                  className="max-w-full h-auto shadow-2xl rounded-lg transition-transform duration-200"
                  style={{ transform: `scale(${imageZoom})`, transformOrigin: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

// Field Configuration Component
function FieldConfiguration({
  field,
  onToggle,
  onToggleRequired,
  onLabelUpdate,
  onAddDropdownItem,
  onRemoveDropdownItem,
  editingDropdownField,
  setEditingDropdownField,
  newDropdownItem,
  setNewDropdownItem,
  isCustomField = false,
  onRemoveCustomField
}: {
  field: BidPanelField;
  onToggle: () => void;
  onToggleRequired: () => void;
  onLabelUpdate: (label: string) => void;
  onAddDropdownItem: () => void;
  onRemoveDropdownItem: (item: string) => void;
  editingDropdownField: string | null;
  setEditingDropdownField: (fieldId: string | null) => void;
  newDropdownItem: string;
  setNewDropdownItem: (value: string) => void;
  isCustomField?: boolean;
  onRemoveCustomField?: () => void;
}) {
  const showDropdownManagement = field.inputType === 'select' && !field.readonly;

  return (
    <div className={`border rounded-lg p-4 transition-shadow ${
      isCustomField ? 'border-blue-300 bg-blue-50/30' : field.systemRequired ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white hover:shadow-sm'
    }`}>
      {/* Field Header */}
      <div className="flex items-start gap-3 mb-3">
        <input
          type="checkbox"
          checked={field.enabled}
          onChange={onToggle}
          disabled={field.systemRequired}
          className="mt-1 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Enable ${field.label} field`}
        />
        
        <div className="flex-1 space-y-2">
          {/* Badges */}
          <div className="flex items-center gap-1 mb-1 flex-wrap">
            {isCustomField && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                Custom Field
              </span>
            )}
            {field.systemRequired && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                System Required
              </span>
            )}
          </div>
          
          {/* Field Label */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Field Label {field.required && <span className="text-destructive">*</span>}
              {field.readonly && <span className="text-xs text-slate-500 ml-2">(Read-only)</span>}
            </label>
            <input
              type="text"
              value={field.customLabel || field.label}
              onChange={(e) => onLabelUpdate(e.target.value)}
              disabled={!field.enabled && !field.required && !field.systemRequired}
              className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring disabled:bg-slate-50 disabled:text-slate-500"
              placeholder={field.label}
            />
          </div>

          {/* Required Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`required-${field.id}`}
              checked={field.required || false}
              onChange={onToggleRequired}
              disabled={field.systemRequired || (!field.enabled && !field.required)}
              className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Mark ${field.label} as required`}
            />
            <label htmlFor={`required-${field.id}`} className="text-xs font-medium text-slate-600 cursor-pointer flex items-center gap-1">
              Required Field
              {field.systemRequired && (
                <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20" title="System required - cannot be changed">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
            </label>
          </div>

          {/* Input Type Display */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-medium">Type:</span>
            <span className="px-2 py-0.5 bg-slate-100 rounded capitalize">{field.inputType || 'text'}</span>
          </div>

          {/* System Required Info */}
          {field.systemRequired && (
            <div className="bg-amber-50 border border-amber-200 rounded p-2">
              <p className="text-xs text-amber-900">
                <strong>Note:</strong> This field is required by the system and cannot be disabled or made optional. You can only change its label.
              </p>
            </div>
          )}

          {/* Dropdown Options Management */}
          {showDropdownManagement && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-foreground">
                  Dropdown Options ({field.dropdownOptions?.length || 0})
                </label>
                <button
                  onClick={() => setEditingDropdownField(editingDropdownField === field.id ? null : field.id)}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  {editingDropdownField === field.id ? 'Done' : 'Manage Options'}
                </button>
              </div>

              {/* Show current options */}
              {field.dropdownOptions && field.dropdownOptions.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {field.dropdownOptions.slice(0, editingDropdownField === field.id ? undefined : 5).map((option, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-300 text-xs rounded">
                      {option}
                      {editingDropdownField === field.id && (
                        <button
                          onClick={() => onRemoveDropdownItem(option)}
                          className="hover:text-destructive"
                          aria-label={`Remove ${option}`}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </span>
                  ))}
                  {!editingDropdownField && field.dropdownOptions.length > 5 && (
                    <span className="text-xs text-slate-500">+{field.dropdownOptions.length - 5} more</span>
                  )}
                </div>
              )}

              {/* Add new option */}
              {editingDropdownField === field.id && (
                <div className="flex gap-2 pt-2 border-t border-slate-300">
                  <input
                    type="text"
                    value={newDropdownItem}
                    onChange={(e) => setNewDropdownItem(e.target.value)}
                    placeholder="Add new option..."
                    className="flex-1 px-2 py-1.5 text-xs border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddDropdownItem())}
                  />
                  <button
                    onClick={onAddDropdownItem}
                    disabled={!newDropdownItem.trim()}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-primary hover:bg-primary/90 rounded disabled:opacity-50 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Delete Custom Field Button */}
        {isCustomField && onRemoveCustomField && (
          <button
            onClick={onRemoveCustomField}
            className="ml-auto text-destructive hover:text-destructive/80 transition-colors p-1"
            title="Remove custom field"
            aria-label="Remove custom field"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// Custom Field Form Component
function CustomFieldForm({
  customFieldLabel,
  setCustomFieldLabel,
  customFieldType,
  setCustomFieldType,
  customFieldRequired,
  setCustomFieldRequired,
  customFieldOptions,
  newCustomOption,
  setNewCustomOption,
  onAddCustomOption,
  onRemoveCustomOption,
  onAddCustomField,
  onCancel
}: {
  customFieldLabel: string;
  setCustomFieldLabel: (value: string) => void;
  customFieldType: FieldInputType;
  setCustomFieldType: (value: FieldInputType) => void;
  customFieldRequired: boolean;
  setCustomFieldRequired: (value: boolean) => void;
  customFieldOptions: string[];
  newCustomOption: string;
  setNewCustomOption: (value: string) => void;
  onAddCustomOption: () => void;
  onRemoveCustomOption: (option: string) => void;
  onAddCustomField: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Create Custom Field</h3>
      
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">
          Field Label <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          value={customFieldLabel}
          onChange={(e) => setCustomFieldLabel(e.target.value)}
          placeholder="e.g., Special Instructions"
          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="custom-field-type-bid" className="block text-xs font-medium text-foreground mb-1">
          Input Type <span className="text-destructive">*</span>
        </label>
        <select
          id="custom-field-type-bid"
          value={customFieldType}
          onChange={(e) => setCustomFieldType(e.target.value as FieldInputType)}
          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="textarea">Text Area</option>
          <option value="select">Dropdown (Select)</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="custom-field-required-bid"
          type="checkbox"
          checked={customFieldRequired}
          onChange={(e) => setCustomFieldRequired(e.target.checked)}
          className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
        />
        <label htmlFor="custom-field-required-bid" className="text-xs font-medium text-foreground cursor-pointer">
          Mark as required field
        </label>
      </div>

      {customFieldType === 'select' && (
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">
            Dropdown Options
          </label>
          <div className="space-y-2">
            {customFieldOptions.map((option, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="flex-1 px-2 py-1 bg-white border border-input rounded text-xs">
                  {option}
                </span>
                <button
                  onClick={() => onRemoveCustomOption(option)}
                  className="text-destructive hover:text-destructive/80"
                  aria-label={`Remove ${option}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newCustomOption}
                onChange={(e) => setNewCustomOption(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddCustomOption())}
                placeholder="Add option"
                className="flex-1 px-3 py-1.5 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={onAddCustomOption}
                className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={onAddCustomField}
          disabled={!customFieldLabel.trim() || (customFieldType === 'select' && customFieldOptions.length === 0)}
          className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Field
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
