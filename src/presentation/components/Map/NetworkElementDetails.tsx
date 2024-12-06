import React from 'react';
import { Paper, Typography, Divider, Box, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { NetworkElement } from '../../types/network';

interface NetworkElementDetailsProps {
  element: NetworkElement;
  expanded: boolean;
  onToggle: () => void;
}

export const NetworkElementDetails: React.FC<NetworkElementDetailsProps> = ({ 
  element, 
  expanded, 
  onToggle 
}) => {
  const getElementSpecs = () => {
    const baseSpecs = [
      {
        label: 'Capacity',
        value: `${element.capacity.used}/${element.capacity.total} ports used`
      }
    ];

    switch (element.type) {
      case 'olt':
        return [
          ...baseSpecs,
          { label: 'Coverage', value: 'Metropolitan Area' },
          { label: 'Wavelength', value: '1490nm downstream' },
          { label: 'Power Budget', value: '28dB' }
        ];
      case 'pmz':
        return [
          ...baseSpecs,
          { label: 'Coverage Area', value: '1km radius' },
          { label: 'Fiber Count', value: '288 fibers' },
          { label: 'Protection', value: 'Ring topology' }
        ];
      case 'splitter':
        return [
          ...baseSpecs,
          { label: 'Split Ratio', value: '1:32' },
          { label: 'Insertion Loss', value: '17.5 dB' },
          { label: 'Return Loss', value: '>55 dB' }
        ];
      case 'home':
        return [
          { label: 'ONT Power', value: '-20dBm' },
          { label: 'Link Status', value: 'Active' },
          { label: 'Service Type', value: 'GPON' }
        ];
      default:
        return baseSpecs;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">{element.title}</Typography>
        <IconButton onClick={onToggle} size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {element.description}
      </Typography>
      <Collapse in={expanded}>
        <Divider sx={{ my: 1 }} />
        {getElementSpecs().map((spec, index) => (
          <Box key={index} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {spec.label}
            </Typography>
            <Typography variant="body1">{spec.value}</Typography>
          </Box>
        ))}
      </Collapse>
    </Paper>
  );
};