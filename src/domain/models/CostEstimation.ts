export interface MaterialCost {
  itemId: string;
  name: string;
  unitCost: number;
  unit: string;
}

export interface LaborRate {
  taskId: string;
  description: string;
  ratePerHour: number;
  estimatedHours: number;
}

export interface CostEstimation {
  zoneId: string;
  materials: MaterialCost[];
  labor: LaborRate[];
  overheadPercentage: number;
  totalCost: number;
}