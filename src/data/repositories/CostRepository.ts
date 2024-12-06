import { ICostRepository } from '../../domain/repositories/ICostRepository';
import { CostEstimation, MaterialCost, LaborRate } from '../../domain/models/CostEstimation';

export class CostRepository implements ICostRepository {
  private materialCosts: Record<string, number> = {
    'fiber_cable': 2.5,  // per meter
    'splice_closure': 45.0,
    'connector': 3.5,
    'splitter': 35.0
  };

  private laborRates: Record<string, number> = {
    'cable_laying': 25.0,
    'splicing': 35.0,
    'testing': 30.0,
    'installation': 28.0
  };

  private estimations: Map<string, CostEstimation> = new Map();

  async calculateEstimation(zoneId: string, distance: number): Promise<CostEstimation> {
    const materials: MaterialCost[] = [
      {
        itemId: 'fiber_cable',
        name: 'Fiber Optic Cable',
        unitCost: this.materialCosts.fiber_cable,
        unit: 'meter'
      },
      {
        itemId: 'splice_closure',
        name: 'Splice Closure',
        unitCost: this.materialCosts.splice_closure,
        unit: 'piece'
      }
    ];

    const labor: LaborRate[] = [
      {
        taskId: 'cable_laying',
        description: 'Cable Laying and Installation',
        ratePerHour: this.laborRates.cable_laying,
        estimatedHours: Math.ceil(distance / 100) // 100 meters per hour
      },
      {
        taskId: 'splicing',
        description: 'Fiber Splicing',
        ratePerHour: this.laborRates.splicing,
        estimatedHours: 2
      }
    ];

    const materialCost = materials.reduce((total, item) => {
      return total + (item.unitCost * (item.itemId === 'fiber_cable' ? distance : 1));
    }, 0);

    const laborCost = labor.reduce((total, item) => {
      return total + (item.ratePerHour * item.estimatedHours);
    }, 0);

    const overheadPercentage = 0.15;
    const totalCost = (materialCost + laborCost) * (1 + overheadPercentage);

    const estimation: CostEstimation = {
      zoneId,
      materials,
      labor,
      overheadPercentage,
      totalCost
    };

    return estimation;
  }

  async getMaterialCosts(): Promise<Record<string, number>> {
    return this.materialCosts;
  }

  async getLaborRates(): Promise<Record<string, number>> {
    return this.laborRates;
  }

  async saveEstimation(estimation: CostEstimation): Promise<void> {
    this.estimations.set(estimation.zoneId, estimation);
  }
}