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
        capacity: { total: 1024, used: 768 }
      },
      {
        id: 'pmz-1',
        type: 'pmz',
        position: pmzPosition,
        title: 'PMZ',
        description: 'Primary Mutualisation Zone',
        capacity: { total: 288, used: 156 }
      },
      {
        id: 'splitter-1',
        type: 'splitter',
        position: splitterPosition,
        title: 'Splitter',
        description: '1:32 Optical Splitter',
        capacity: { total: 32, used: 24 }
      }
    ];

    const connections = [
      {
        type: 'feeder' as const,
        points: [oltPosition, pmzPosition]
      },
      {
        type: 'distribution' as const,
        points: [pmzPosition, splitterPosition]
      },
      {
        type: 'drop' as const,
        points: [splitterPosition, selectedLocation]
      }
    ];

    return { elements, connections };
  };

  const handleLocationSelect = (location: LatLng) => {
    setSelectedLocation(location);
    setSelectedElement(null);
  };

  const handleElementSelect = (element: NetworkElement) => {
    setSelectedElement(element);
    setDetailsExpanded(true);
  };

  useEffect(() => {
    if (zones.length > 0 && selectedLocation) {
      const zone = zones[0];
      const distance = calculateDistance(
        { latitude: selectedLocation.lat, longitude: selectedLocation.lng },
        zone.coordinates[0]
      );
      calculateEstimation(zone, distance);
    }
  }, [zones, selectedLocation, calculateEstimation]);

  const network = zones.length > 0 ? generateNetworkElements(zones[0]) : { elements: [], connections: [] };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          FTTx Eligibility & Cost Estimation
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2 }}>
              <MapComponent
                center={[51.505, -0.09]}
                zoom={13}
                selectedLocation={selectedLocation}
                networkElements={network.elements}
                connections={network.connections}
                onLocationSelect={handleLocationSelect}
                onElementSelect={handleElementSelect}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <NetworkLegend 
              expanded={legendExpanded}
              onToggle={() => setLegendExpanded(!legendExpanded)}
            />
            {selectedElement && (
              <NetworkElementDetails 
                element={selectedElement}
                expanded={detailsExpanded}
                onToggle={() => setDetailsExpanded(!detailsExpanded)}
              />
            )}
          </Grid>
        </Grid>

        {(zonesLoading || estimationLoading) && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {selectedLocation && (
          <LocationDetails location={selectedLocation} />
        )}

        {zones.length > 0 && (
          <ZoneDetails zone={zones[0]} />
        )}

        {estimation && (
          <EstimationDetails estimation={estimation} />
        )}
      </Box>
    </Container>
  );
};