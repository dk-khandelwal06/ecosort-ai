export type WasteStreamCategory =
  | 'Wet Waste'
  | 'Dry Waste'
  | 'Sanitary Waste'
  | 'Domestic Hazardous Waste';

export interface WasteAnalysisResult {
  item_name: string;
  category: WasteStreamCategory;
  material: string;
  confidence: 'High' | 'Medium' | 'Low';
  explanation: string;
  preparation_steps: string[];
  disposal_instructions: string;
  safety_warnings: string;
  local_rules_caveat: boolean;
  recommended_next_action?: string;
}

export interface ScanHistoryItem {
  id: string;
  timestamp: number;
  item_name: string;
  category: WasteStreamCategory;
  confidence: 'High' | 'Medium' | 'Low';
  thumbnailUrl: string;
  safety_warnings?: string;
  result: WasteAnalysisResult;
}

export interface CategoryDetail {
  id: WasteStreamCategory;
  title: string;
  hindiName: string;
  binColor: string;
  binColorName: string;
  bgBadge: string;
  textBadge: string;
  borderBadge: string;
  summary: string;
  examples: string[];
  unacceptable: string[];
  preparationTips: string[];
  swachhBharatGuideline: string;
}
