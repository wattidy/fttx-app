import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CostEstimation } from '../../../domain/models/CostEstimation';

interface EstimationDetailsProps {
  estimation: CostEstimation;
}

export const EstimationDetails: React.FC<EstimationDetailsProps> = ({ estimation }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Cost Estimation Details
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Materials
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Unit Cost</TableCell>
              <TableCell>Unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estimation.materials.map((material) => (
              <TableRow key={material.itemId}>
                <TableCell>{material.name}</TableCell>
                <TableCell align="right">${material.unitCost.toFixed(2)}</TableCell>
                <TableCell>{material.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
        Labor
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell align="right">Rate/Hour</TableCell>
              <TableCell align="right">Hours</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estimation.labor.map((labor) => (
              <TableRow key={labor.taskId}>
                <TableCell>{labor.description}</TableCell>
                <TableCell align="right">${labor.ratePerHour.toFixed(2)}</TableCell>
                <TableCell align="right">{labor.estimatedHours}</TableCell>
                <TableCell align="right">
                  ${(labor.ratePerHour * labor.estimatedHours).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Overhead: {(estimation.overheadPercentage * 100).toFixed(0)}%
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Total Cost: ${estimation.totalCost.toFixed(2)}
      </Typography>
    </Paper>
  );
};