import React from 'react';
import { Paper, Typography, Box, IconButton, Collapse } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RouterIcon from '@mui/icons-material/Router';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface NetworkLegendProps {
  expanded: boolean;
  onToggle: () => void;
}

export const NetworkLegend: React.FC<NetworkLegendProps> = ({ expanded, onToggle }) => {
  const legendItems = [
    {
      icon: <DataUsageIcon sx={{ color: '#2196f3' }} />,
      label: 'OLT',
      description: 'Optical Line Terminal'
    },
    {
      icon: <RouterIcon sx={{ color: '#1976d2' }} />,
      label: 'PMZ',
      description: 'Primary Mutualisation Zone'
    },
    {
      icon: <AccountTreeIcon sx={{ color: '#4caf50' }} />,
      label: 'Splitter',
      description: 'Optical signal distributor'
    },
    {
      icon: <LocationOnIcon sx={{ color: '#dc004e' }} />,
      label: 'Home',
      description: 'Connected premises'
    },
    {
      customIcon: (
        <Box sx={{ width: 20, height: 3, bgcolor: '#2196f3', my: 1 }} />
      ),
      label: 'Feeder Cable',
      description: 'Main network cable'
    },
    {
      customIcon: (
        <Box sx={{ width: 20, height: 3, bgcolor: '#1976d2', borderStyle: 'dashed', my: 1 }} />
      ),
      label: 'Distribution Cable',
      description: 'Zone distribution'
    },
    {
      customIcon: (
        <Box sx={{ width: 20, height: 3, bgcolor: '#dc004e', borderStyle: 'dotted', my: 1 }} />
      ),
      label: 'Drop Cable',
      description: 'Home connection'
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">Network Legend</Typography>
        <IconButton onClick={onToggle} size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        {legendItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              '&:last-child': { mb: 0 }
            }}
          >
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              {item.icon || item.customIcon}
            </Box>
            <Box>
              <Typography variant="subtitle2">{item.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Collapse>
    </Paper>
  );
};