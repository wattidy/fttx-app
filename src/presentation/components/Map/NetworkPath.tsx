import React from 'react';
import { Polyline, Tooltip } from 'react-leaflet';
import { LatLng } from 'leaflet';

interface NetworkPathProps {
  points: LatLng[];
  color: string;
  type: 'feeder' | 'distribution' | 'drop';
}

const pathStyles = {
  feeder: {
    color: '#1976d2',
    weight: 3,
    dashArray: '',
  },
  distribution: {
    color: '#4caf50',
    weight: 2,
    dashArray: '5, 5',
  },
  drop: {
    color: '#dc004e',
    weight: 2,
    dashArray: '2, 4',
  },
};

export const NetworkPath: React.FC<NetworkPathProps> = ({ points, type }) => {
  return (
    <Polyline
      positions={points}
      pathOptions={pathStyles[type]}
    >
      <Tooltip sticky>
        {type.charAt(0).toUpperCase() + type.slice(1)} Cable
      </Tooltip>
    </Polyline>
  );
};