import { PBOZone, Coordinates } from '../models/PBOZone';

export interface IPBORepository {
  getZonesByLocation(coordinates: Coordinates): Promise<PBOZone[]>;
  getZoneById(id: string): Promise<PBOZone | null>;
  isLocationInZone(coordinates: Coordinates, zoneId: string): Promise<boolean>;
  saveZone(zone: PBOZone): Promise<void>;
}