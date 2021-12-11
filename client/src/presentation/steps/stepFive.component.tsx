import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ReactComponent as CilindroSVG } from 'presentation/assets/cilindro.svg';

export const StepFive: React.FC = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 2,
          marginBottom: 1,
        }}
      >
        <Typography variant="h4" component="h2">
          Sequência A+/A-/A+B+/B-
        </Typography>
        <Button
          variant="contained"
          disabled
          sx={{ marginBottom: 1, marginLeft: 2 }}
        >
          Executar
        </Button>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ marginRight: 1, width: '50%' }}>
          <CilindroSVG />
        </Box>
        <Box sx={{ marginLeft: 1, width: '50%' }}>
          <CilindroSVG />
        </Box>
      </Box>
    </Box>
  );
};
