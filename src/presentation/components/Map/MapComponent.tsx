import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { CustomMarker } from './CustomMarker';
import { NetworkPath } from './NetworkPath';
import { MapEventHandler } from './MapEventHandler';
import { NetworkElement, NetworkConnection } from '../../types/network';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  selectedLocation?: LatLng;
  networkElements?: NetworkElement[];
  connections?: NetworkConnection[];
  onLocationSelect?: (location: LatLng) => void;
  onElementSelect?: (element: NetworkElement) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom,
  selectedLocation,
  networkElements = [],
  connections = [],
  onLocationSelect,
  onElementSelect
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '500px', width: '100%', position: 'relative', zIndex: 1 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {connections.map((connection, index) => (
        <NetworkPath
          key={`connection-${index}`}
          points={connection.points}
          type={connection.type}
          color={connection.type === 'feeder' ? '#1976d2' : '#4caf50'}
        />
      ))}

      {networkElements.map((element, index) => (
        <CustomMarker
          key={`element-${index}`}
          position={element.position}
          type={element.type}
          title={element.title}
          description={element.description}
          onClick={() => onElementSelect?.(element)}
        />
      ))}

      {selectedLocation && (
        <CustomMarker
          position={selectedLocation}
          type="selected"
          title="Selected Location"
          description="Your selected installation point"
        />
      )}

      {onLocationSelect && <MapEventHandler onLocationSelect={onLocationSelect} />}
    </MapContainer>
  );
};