import { CostEstimation } from '../models/CostEstimation';

export interface ICostRepository {
  calculateEstimation(zoneId: string, distance: number): Promise<CostEstimation>;
  getMaterialCosts(): Promise<Record<string, number>>;
  getLaborRates(): Promise<Record<string, number>>;
  saveEstimation(estimation: CostEstimation): Promise<void>;
}