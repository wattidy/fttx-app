import React from 'react';
import { Paper, Typography, Chip, Box } from '@mui/material';
import { PBOZone } from '../../../domain/models/PBOZone';

interface ZoneDetailsProps {
  zone: PBOZone;
}

export const ZoneDetails: React.FC<ZoneDetailsProps> = ({ zone }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'planned':
        return 'warning';
      default:
        return 'error';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Zone Information
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          Zone Name: {zone.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {zone.id}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Chip
          label={`Fiber Status: ${zone.fiberStatus}`}
          color={getStatusColor(zone.fiberStatus)}
          sx={{ mr: 1 }}
        />
        <Chip
          label={`Eligibility: ${zone.eligibilityPercentage}%`}
          color={zone.eligibilityPercentage >= 75 ? 'success' : 'warning'}
        />
      </Box>

      <Typography variant="body2">
        Capacity: {zone.capacity} connections
      </Typography>
      <Typography variant="body2">
        Splitter Count: {zone.splitterCount}
      </Typography>
    </Paper>
  );
};