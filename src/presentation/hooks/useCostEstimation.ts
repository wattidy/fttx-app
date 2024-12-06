import { useState, useCallback } from 'react';
import { CostEstimation } from '../../domain/models/CostEstimation';
import { CostRepository } from '../../data/repositories/CostRepository';
import { PBOZone } from '../../domain/models/PBOZone';

export const useCostEstimation = () => {
  const [estimation, setEstimation] = useState<CostEstimation | null>(null);
  const [loading, setLoading] = useState(false);
  const repository = new CostRepository();

  const calculateEstimation = useCallback(async (zone: PBOZone, distance: number) => {
    setLoading(true);
    try {
      const result = await repository.calculateEstimation(zone.id, distance);
      setEstimation(result);
      await repository.saveEstimation(result);
    } catch (error) {
      console.error('Error calculating estimation:', error);
      setEstimation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { estimation, loading, calculateEstimation };
};