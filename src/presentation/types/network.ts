import { LatLng } from 'leaflet';

export type NetworkElementType = 'olt' | 'pmz' | 'splitter' | 'home';

export interface NetworkElement {
  id: string;
  type: NetworkElementType;
  position: LatLng;
  title: string;
  description?: string;
  capacity: {
    total: number;
    used: number;
  };
}

export interface NetworkConnection {
  type: 'feeder' | 'distribution' | 'drop';
  points: LatLng[];
}