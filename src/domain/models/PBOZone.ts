export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PBOZone {
  id: string;
  name: string;
  coordinates: Coordinates[];
  eligibilityPercentage: number;
  fiberStatus: 'available' | 'planned' | 'unavailable';
  capacity: number;
  splitterCount: number;
}

export interface NetworkComponent {
  id: string;
  type: 'pole' | 'cable' | 'splitter';
  location: Coordinates;
  status: 'active' | 'maintenance' | 'planned';
  properties: Record<string, unknown>;
}