import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationMarkerProps {
  position: [number, number];
  title: string;
  description?: string;
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({
  position,
  title,
  description
}) => {
  return (
    <Marker position={position} icon={defaultIcon}>
      <Popup>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </Popup>
    </Marker>
  );
};