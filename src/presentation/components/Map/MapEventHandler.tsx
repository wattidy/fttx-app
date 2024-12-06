import { useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';

interface MapEventHandlerProps {
  onLocationSelect: (location: LatLng) => void;
}

export const MapEventHandler: React.FC<MapEventHandlerProps> = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng);
    },
  });

  return null;
};