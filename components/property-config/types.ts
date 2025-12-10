import type { PropertyRecordField, RequestFormField } from '@/lib/onboarding-context';

// Bid panel field type
export interface BidPanelField {
  id: string;
  label: string;
  customLabel?: string;
  enabled: boolean;
  required: boolean;
  systemRequired?: boolean;
  systemFixed?: boolean;
  readonly: boolean;
  type: string;
  options?: string[];
  order?: number;
  column?: 1 | 2;
  placeholder?: string;
}

// Generic field type that works for property, request, and bid panel fields
export type GenericField = PropertyRecordField | RequestFormField | BidPanelField;

