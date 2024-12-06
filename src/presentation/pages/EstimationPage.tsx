import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, Grid } from '@mui/material';
import { LatLng } from 'leaflet';
import { MapComponent } from '../components/Map/MapComponent';
import { LocationDetails } from '../components/LocationInfo/LocationDetails';
import { ZoneDetails } from '../components/ZoneInfo/ZoneDetails';
import { EstimationDetails } from '../components/CostEstimation/EstimationDetails';
import { NetworkLegend } from '../components/Map/NetworkLegend';
import { NetworkElementDetails } from '../components/Map/NetworkElementDetails';
import { useZoneDetection } from '../hooks/useZoneDetection';
import { useCostEstimation } from '../hooks/useCostEstimation';
import { calculateDistance } from '../../utils/coordinates';
import { NetworkElement } from '../types/network';

export const EstimationPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [selectedElement, setSelectedElement] = useState<NetworkElement | null>(null);
  const [legendExpanded, setLegendExpanded] = useState(true);
  const [detailsExpanded, setDetailsExpanded] = useState(true);
  const { zones, loading: zonesLoading } = useZoneDetection(selectedLocation);
  const { estimation, loading: estimationLoading, calculateEstimation } = useCostEstimation();

  const generateNetworkElements = (zone: any) => {
    if (!selectedLocation) return { elements: [], connections: [] };

    // Calculate positions for network elements
    const oltPosition = new LatLng(51.51, -0.1);
    const pmzPosition = new LatLng(
      (oltPosition.lat + selectedLocation.lat) * 0.6,
      (oltPosition.lng + selectedLocation.lng) * 0.6
    );
    const splitterPosition = new LatLng(
      (pmzPosition.lat + selectedLocation.lat) * 0.7,
      (pmzPosition.lng + selectedLocation.lng) * 0.7
    );

    const elements: NetworkElement[] = [
      {
        id: 'olt-1',
        type: 'olt',
        position: oltPosition,
        title: 'OLT',
        description: 'Optical Line Terminal',
        capacity: { total: 1024, used: 768 },
      },
      {
        id: 'pmz-1',
        type: 'pmz',
        position: pmzPosition,
        title: 'PMZ',
      },
    ];
    return elements;
  };
  return <div>Corrected!</div>;
};
