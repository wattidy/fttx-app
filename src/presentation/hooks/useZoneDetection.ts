import { useState, useEffect } from 'react';
import { LatLng } from 'leaflet';
import { PBOZone } from '../../domain/models/PBOZone';
import { PBORepository } from '../../data/repositories/PBORepository';

export const useZoneDetection = (location: LatLng | null) => {
  const [zones, setZones] = useState<PBOZone[]>([]);
  const [loading, setLoading] = useState(false);
  const repository = new PBORepository();

  useEffect(() => {
    const detectZones = async () => {
      if (!location) {
        setZones([]);
        return;
      }

      setLoading(true);
      try {
        const detectedZones = await repository.getZonesByLocation({
          latitude: location.lat,
          longitude: location.lng
        });
        setZones(detectedZones);
      } catch (error) {
        console.error('Error detecting zones:', error);
        setZones([]);
      } finally {
        setLoading(false);
      }
    };

    detectZones();
  }, [location]);

  return { zones, loading };
};