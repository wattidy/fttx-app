import React from 'react';
import { Paper, Typography } from '@mui/material';
import { LatLng } from 'leaflet';

interface LocationDetailsProps {
  location: LatLng;
}

export const LocationDetails: React.FC<LocationDetailsProps> = ({ location }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Selected Location
      </Typography>
      <Typography>
        Latitude: {location.lat.toFixed(6)}
        <br />
        Longitude: {location.lng.toFixed(6)}
      </Typography>
    </Paper>
  );
};