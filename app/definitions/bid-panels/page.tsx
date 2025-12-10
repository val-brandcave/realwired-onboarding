"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DraggableField } from "@/components/property-config/DraggableField";
import { FieldSettingsDrawer } from "@/components/property-config/FieldSettingsDrawer";
import { AddFieldModal } from "@/components/property-config/AddFieldModal";
import type { FieldInputType } from "@/components/property-config/AddFieldModal";

type BidPanelType = '3-column' | '4-column' | 'checkboxes' | 'dropdowns';

interface BidPanelField {
  id: string;
  label: string;
  enabled: boolean;
  required: boolean;
  systemRequired?: boolean;
  systemFixed?: boolean;
  readonly: boolean;
  customLabel?: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'number' | 'date' | 'file' | 'readonly' | 'checkbox';
  options?: string[];
  order?: number;
  column?: 1 | 2;
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
    '2055 Form - Inspection',
    'Condo Form - 1073 (Interior)',
    'URAR Form',
    'URAR with Rental Income Information'
  ],
  'market-analysis-level': ['Market Condition Addendum', 'N/A'],
  'value-premise': [
    'Market Value - As Is',
    'Market Value - Hypothetical',
    'Prospective Market Value - At Completion',
    'Prospective Market Value - At Stabilization'
  ],
  'value-qualifier': ['As Is', 'As Completed', 'As Stabilized'],
  'interest-appraised': ['Fee Simple', 'Leased Fee', 'Leasehold'],
  'inspection-requirements': [
    'Full Inspection',
    'Exterior Only Minimally Required',
    'Exterior Only DO NOT CONTACT BORROWER',
    'Drive By'
  ],
  'approach-to-value': [
    'Sales Comparison',
    'Cost Approach',
    'Income Capitalization',
    'All Applicable Approaches'
  ],
  'intended-use-environmental': [
    'Conventional Loan Underwriting',
    'SBA Loan Underwriting',
    'Potential Foreclosure'
  ]
};

export default function BidPanelsPage() {
  const { updateDefinitions, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  useEffect(() => {
    updateModuleProgress('definitions', 5, 5);
  }, [updateModuleProgress]);

  const [selectedBidTemplate, setSelectedBidTemplate] = useState<BidPanelType>('3-column');
  const [useEnvironmental, setUseEnvironmental] = useState(true);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [selectedPanelType, setSelectedPanelType] = useState<'appraisal' | 'environmental'>('appraisal');
  const [draggingFieldId, setDraggingFieldId] = useState<string | null>(null);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState(1);

  // Initialize appraisal fields based on template
  const getAppraisalPanelFields = (templateType: BidPanelType): BidPanelField[] => {
    const baseFields: Record<BidPanelType, BidPanelField[]> = {
      '3-column': [
        { id: 'report-format', label: 'Report Format', enabled: true, required: true, systemRequired: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['report-format'], order: 0, column: 1 },
        { id: 'value-premise', label: 'Value Premise', enabled: true, required: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['value-premise'], order: 1, column: 1 },
        { id: 'value-qualifier', label: 'Value Qualifier', enabled: true, required: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['value-qualifier'], order: 2, column: 1 },
        { id: 'inspection-requirements', label: 'Inspection Requirements', enabled: true, required: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['inspection-requirements'], order: 3, column: 1 },
        { id: 'approach-to-value', label: 'Approach To Value', enabled: true, required: true, readonly: false, type: 'checkbox', options: DROPDOWN_OPTIONS['approach-to-value'], order: 0, column: 2 },
        { id: 'internal-appraisal', label: 'Internal Appraisal', enabled: true, required: false, readonly: false, type: 'text', order: 1, column: 2 },
        { id: 'comments', label: 'Comments', enabled: true, required: false, readonly: false, type: 'textarea', order: 2, column: 2 },
      ],
      '4-column': [
        { id: 'report-format', label: 'Report Format', enabled: true, required: true, systemRequired: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['report-format'], order: 0, column: 1 },
        { id: 'residential-forms', label: 'Residential Forms', enabled: true, required: true, systemRequired: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['residential-forms'], order: 1, column: 1 },
        { id: 'market-analysis-level', label: 'Market Analysis Level', enabled: true, required: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['market-analysis-level'], order: 2, column: 1 },
        { id: 'value-premise', label: 'Value Premise', enabled: true, required: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['value-premise'], order: 3, column: 1 },
        { id: 'value-qualifier', label: 'Value Qualifier', enabled: true, required: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['value-qualifier'], order: 0, column: 2 },
        { id: 'interest-appraised', label: 'Interest Appraised', enabled: true, required: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['interest-appraised'], order: 1, column: 2 },
        { id: 'inspection-requirements', label: 'Inspection Requirements', enabled: true, required: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['inspection-requirements'], order: 2, column: 2 },
        { id: 'approach-to-value', label: 'Approach To Value', enabled: true, required: true, readonly: false, type: 'checkbox', options: DROPDOWN_OPTIONS['approach-to-value'], order: 3, column: 2 },
        { id: 'comments', label: 'Comments', enabled: true, required: false, readonly: false, type: 'textarea', order: 4, column: 2 },
      ],
      'checkboxes': [
        { id: 'report-format', label: 'Report Format', enabled: true, required: true, systemRequired: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['report-format'], order: 0, column: 1 },
        { id: 'residential-forms', label: 'Residential Forms', enabled: true, required: true, systemRequired: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['residential-forms'], order: 1, column: 1 },
        { id: 'premise-valued', label: 'Premise Valued', enabled: true, required: true, readonly: false, type: 'checkbox', options: ['Fee Simple', 'Leased Fee', 'Leasehold'], order: 2, column: 1 },
        { id: 'value-type', label: 'Value Type', enabled: true, required: true, readonly: false, type: 'checkbox', options: ['As Is', 'As Stabilized', 'As Completed', 'Bulk Sale Market Value', 'Retrospective Value'], order: 3, column: 1 },
        { id: 'scope-of-work', label: 'Scope of Work', enabled: true, required: true, readonly: false, type: 'textarea', order: 0, column: 2 },
        { id: 'market-analysis-level', label: 'Market Analysis Level', enabled: true, required: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['market-analysis-level'], order: 1, column: 2 },
        { id: 'approach-to-value', label: 'Approach To Value', enabled: true, required: false, readonly: false, type: 'checkbox', options: DROPDOWN_OPTIONS['approach-to-value'], order: 2, column: 2 },
      ],
      'dropdowns': [
        { id: 'report-format', label: 'Report Format', enabled: true, required: true, systemRequired: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['report-format'], order: 0, column: 1 },
        { id: 'market-analysis-level', label: 'Market Analysis Level', enabled: true, required: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['market-analysis-level'], order: 1, column: 1 },
        { id: 'as-is-value', label: 'As Is Value', enabled: true, required: true, readonly: false, type: 'select', options: ['None', 'Leased Fee (leased, all or part)', 'Fee Simple', 'Leasehold'], order: 2, column: 1 },
        { id: 'prospective-value-completion', label: 'Prospective Value at Completion', enabled: true, required: false, readonly: false, type: 'select', options: ['None', 'Leased Fee (leased, all or part)', 'Fee Simple', 'Leasehold'], order: 3, column: 1 },
        { id: 'if-leased-fee', label: 'If Leased Fee', enabled: true, required: false, readonly: false, type: 'text', order: 0, column: 2 },
        { id: 'retrospective-value', label: 'Retrospective Value', enabled: true, required: false, readonly: false, type: 'select', options: ['None', 'Leased Fee (leased, all or part)', 'Fee Simple', 'Leasehold'], order: 1, column: 2 },
        { id: 'prospective-value-stabilization', label: 'Prospective Value at Stabilization', enabled: true, required: false, readonly: false, type: 'select', options: ['None', 'Leased Fee (leased, all or part)', 'Fee Simple', 'Leasehold'], order: 2, column: 2 },
        { id: 'scope-of-work', label: 'Scope of Work', enabled: true, required: true, readonly: false, type: 'textarea', order: 3, column: 2 },
      ],
    };
    return baseFields[templateType];
  };

  const [appraisalFields, setAppraisalFields] = useState<BidPanelField[]>(
    getAppraisalPanelFields(selectedBidTemplate)
  );

  const [environmentalFields, setEnvironmentalFields] = useState<BidPanelField[]>([
    { id: 'report-type', label: 'Report Type', enabled: true, required: true, systemRequired: true, readonly: false, type: 'select', options: ['Phase I ESA', 'Phase II ESA', 'Transaction Screen', 'Property Condition Assessment'], order: 0, column: 1 },
    { id: 'intended-use', label: 'Intended Use', enabled: true, required: true, systemRequired: true, readonly: false, type: 'select', options: DROPDOWN_OPTIONS['intended-use-environmental'], order: 1, column: 1 },
    { id: 'scope-of-work', label: 'Scope Of Work', enabled: true, required: true, readonly: false, type: 'textarea', order: 2, column: 1 },
    { id: 'bid-reply-time', label: 'Bid Reply Time (Days)', enabled: true, required: false, readonly: false, type: 'number', order: 0, column: 2 },
    { id: 'have-recs-identified', label: 'Have any RECs been identified?', enabled: true, required: false, readonly: false, type: 'select', options: ['Yes', 'No', 'Unknown'], order: 1, column: 2 },
    { id: 'investigation-recommended', label: 'Is further investigation recommended?', enabled: true, required: false, readonly: false, type: 'select', options: ['Yes', 'No', 'Not Applicable'], order: 2, column: 2 },
  ]);

  // Get fields by column
  const getFieldsByColumn = (fields: BidPanelField[], column: 1 | 2) => {
    return fields
      .filter(f => f.column === column)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  const handleFieldClick = (fieldId: string, panelType: 'appraisal' | 'environmental') => {
    setSelectedFieldId(fieldId);
    setSelectedPanelType(panelType);
  };

  const handleCloseDrawer = () => {
    setSelectedFieldId(null);
  };

  const handleFieldUpdate = (fieldId: string, updates: Partial<BidPanelField>) => {
    if (selectedPanelType === 'appraisal') {
      setAppraisalFields(prev =>
        prev.map(field => field.id === fieldId ? { ...field, ...updates } : field)
      );
    } else {
      setEnvironmentalFields(prev =>
        prev.map(field => field.id === fieldId ? { ...field, ...updates } : field)
      );
    }
  };

  const handleDeleteField = (fieldId: string) => {
    if (fieldId.startsWith('custom-')) {
      if (selectedPanelType === 'appraisal') {
        setAppraisalFields(prev => prev.filter(f => f.id !== fieldId));
    } else {
        setEnvironmentalFields(prev => prev.filter(f => f.id !== fieldId));
      }
      if (selectedFieldId === fieldId) {
        setSelectedFieldId(null);
      }
    }
  };

  const handleDragStart = (fieldId: string) => {
    setDraggingFieldId(fieldId);
  };

  const handleDragEnd = () => {
    setDraggingFieldId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetFieldId: string, targetColumn: 1 | 2, panelType: 'appraisal' | 'environmental') => {
    if (!draggingFieldId || draggingFieldId === targetFieldId) return;

    const fields = panelType === 'appraisal' ? appraisalFields : environmentalFields;
    const setFields = panelType === 'appraisal' ? setAppraisalFields : setEnvironmentalFields;

    const draggingField = fields.find(f => f.id === draggingFieldId);
    if (!draggingField) return;

    setFields(prevFields => {
      const newFields = [...prevFields];
      const categoryFields = newFields.filter(f => f.column === targetColumn).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      
      const draggingIndex = categoryFields.findIndex(f => f.id === draggingFieldId);
      const targetIndex = categoryFields.findIndex(f => f.id === targetFieldId);
      
      const fieldToMove = newFields.find(f => f.id === draggingFieldId);
      if (fieldToMove) {
        fieldToMove.column = targetColumn;
      }

      if (draggingIndex === -1) {
        categoryFields.splice(targetIndex, 0, fieldToMove!);
    } else {
        const [removed] = categoryFields.splice(draggingIndex, 1);
        categoryFields.splice(targetIndex, 0, removed);
      }

      categoryFields.forEach((field, idx) => {
        field.order = idx;
      });

      return newFields;
    });

    setDraggingFieldId(null);
  };

  const handleAddField = (fieldData: { inputType: FieldInputType; label: string; dropdownOptions?: string[] }) => {
    const newField: BidPanelField = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: fieldData.label,
      customLabel: fieldData.label,
      enabled: true,
      required: false,
      systemRequired: false,
      systemFixed: false,
      readonly: false,
      type: fieldData.inputType as BidPanelField['type'],
      options: fieldData.dropdownOptions,
      order: 999,
      column: 1,
    };

    if (selectedPanelType === 'appraisal') {
      setAppraisalFields([...appraisalFields, newField]);
    } else {
      setEnvironmentalFields([...environmentalFields, newField]);
    }
    
    setSelectedFieldId(newField.id);
    setIsAddFieldModalOpen(false);
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

  // Update appraisal fields when template changes
  useEffect(() => {
    setAppraisalFields(getAppraisalPanelFields(selectedBidTemplate));
  }, [selectedBidTemplate]);

  const selectedField = selectedPanelType === 'appraisal' 
    ? appraisalFields.find(f => f.id === selectedFieldId) 
    : environmentalFields.find(f => f.id === selectedFieldId);

  const steps = [
    { id: '1', label: 'Property Categories', status: 'completed' as const },
    { id: '2', label: 'Property Fields', status: 'completed' as const },
    { id: '3', label: 'Request Types', status: 'completed' as const },
    { id: '4', label: 'Request Form', status: 'completed' as const },
    { id: '5', label: 'Bid Panels', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={3} 
      steps={steps}
      title="Definitions"
    >
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('[data-field-card]') === null &&
              (e.target as HTMLElement).closest('[data-settings-drawer]') === null) {
            setSelectedFieldId(null);
          }
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Bid Engagement Panel Configuration
          </h1>
          <p className="text-base text-muted-foreground">
            Configure bid panels for appraisals and environmental orders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            {/* Bid Template Selection */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Select Panel Layout</h2>
              <div className="space-y-4">
                {/* 3-Column Option */}
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

                {/* 4-Column Option */}
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

                {/* Checkboxes Option */}
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

                {/* Dropdowns Option */}
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
              </div>

            {/* Appraisal Panel Fields */}
            <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
              <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Customize Appraisal Panel Fields</h2>
              <p className="text-sm text-muted-foreground">
                Configure fields for the selected panel layout
              </p>
            </div>
                    <button
              onClick={() => {
                setSelectedPanelType('appraisal');
                setIsAddFieldModalOpen(true);
              }}
              className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
              Add Field
                    </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="p-6 min-h-[200px]" onDragOver={handleDragOver}>
              {getFieldsByColumn(appraisalFields, 1).map((field) => (
                <DraggableField
                  key={field.id}
                  field={field}
                  isSelected={selectedFieldId === field.id && selectedPanelType === 'appraisal'}
                  onClick={() => handleFieldClick(field.id, 'appraisal')}
                  onDelete={() => handleDeleteField(field.id)}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(targetId) => handleDrop(targetId, 1, 'appraisal')}
                  isDragging={draggingFieldId === field.id}
                />
              ))}
              {getFieldsByColumn(appraisalFields, 1).length === 0 && (
                <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Drag fields here</p>
                </div>
                  )}
                </div>

            {/* Column 2 */}
            <div className="p-6 min-h-[200px]" onDragOver={handleDragOver}>
              {getFieldsByColumn(appraisalFields, 2).map((field) => (
                <DraggableField
                  key={field.id}
                  field={field}
                  isSelected={selectedFieldId === field.id && selectedPanelType === 'appraisal'}
                  onClick={() => handleFieldClick(field.id, 'appraisal')}
                  onDelete={() => handleDeleteField(field.id)}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(targetId) => handleDrop(targetId, 2, 'appraisal')}
                  isDragging={draggingFieldId === field.id}
                />
              ))}
              {getFieldsByColumn(appraisalFields, 2).length === 0 && (
                <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Drag fields here</p>
              </div>
              )}
            </div>
          </div>
              </div>

        {/* Environmental Panel Fields */}
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Customize Environmental Panel Fields</h2>
                <p className="text-sm text-muted-foreground">
                  Configure fields for environmental order requests
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedPanelType('environmental');
                  setIsAddFieldModalOpen(true);
                }}
                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Field
              </button>
            </div>

            {/* Environmental Enable/Disable Toggle */}
            <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                useEnvironmental ? 'border-primary bg-primary/5' : 'border-border'
              }`}>
                <input
                  type="checkbox"
                  checked={useEnvironmental}
                  onChange={(e) => setUseEnvironmental(e.target.checked)}
                className="w-5 h-5 text-primary border-input rounded"
                />
              <div>
                <h3 className="text-sm font-semibold text-foreground">Enable Environmental Orders</h3>
                  <p className="text-xs text-muted-foreground">
                  Check this if your organization processes environmental site assessments
                  </p>
                </div>
              </label>
          </div>

              {useEnvironmental && (
            <div className="grid grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="p-6 min-h-[200px]" onDragOver={handleDragOver}>
                {getFieldsByColumn(environmentalFields, 1).map((field) => (
                  <DraggableField
                          key={field.id}
                          field={field}
                    isSelected={selectedFieldId === field.id && selectedPanelType === 'environmental'}
                    onClick={() => handleFieldClick(field.id, 'environmental')}
                    onDelete={() => handleDeleteField(field.id)}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(targetId) => handleDrop(targetId, 1, 'environmental')}
                    isDragging={draggingFieldId === field.id}
                        />
                      ))}
                {getFieldsByColumn(environmentalFields, 1).length === 0 && (
                  <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                    <p className="text-sm text-muted-foreground">Drag fields here</p>
                  </div>
                )}
              </div>

              {/* Column 2 */}
              <div className="p-6 min-h-[200px]" onDragOver={handleDragOver}>
                {getFieldsByColumn(environmentalFields, 2).map((field) => (
                  <DraggableField
                    key={field.id}
                    field={field}
                    isSelected={selectedFieldId === field.id && selectedPanelType === 'environmental'}
                    onClick={() => handleFieldClick(field.id, 'environmental')}
                    onDelete={() => handleDeleteField(field.id)}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(targetId) => handleDrop(targetId, 2, 'environmental')}
                    isDragging={draggingFieldId === field.id}
                  />
                ))}
                {getFieldsByColumn(environmentalFields, 2).length === 0 && (
                  <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                    <p className="text-sm text-muted-foreground">Drag fields here</p>
                  </div>
                )}
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
                {/* Video Tutorial */}
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

      {/* Field Settings Drawer */}
      {selectedField && (
        <FieldSettingsDrawer
          field={selectedField}
          onClose={handleCloseDrawer}
          onUpdate={handleFieldUpdate}
          onDelete={handleDeleteField}
        />
      )}

      {/* Add Field Modal */}
      <AddFieldModal
        isOpen={isAddFieldModalOpen}
        onClose={() => setIsAddFieldModalOpen(false)}
        onAdd={handleAddField}
      />

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
