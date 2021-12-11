import React from 'react';
import { Box, Typography } from '@mui/material';
import EsquemaPNG from 'presentation/assets/esquema.png';

export const StepFour: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': { width: '160px' },
      }}
    >
      <Typography sx={{ mt: 2, mb: 1 }} component="h2" variant="h4">
        Esquema
      </Typography>
      <ol>
        <li>
          <Typography>Cilindro Pneumático de dupla ação</Typography>
        </li>
        <li>
          <Typography>Válvula solenoide 5/2 com retorno por mola</Typography>
        </li>
      </ol>

      <Typography sx={{ mt: 2, mb: 1 }} component="h6" variant="h6">
        Esquema de ligação de cada cilindro
      </Typography>
      <img src={EsquemaPNG} alt="esquema" />
    </Box>
  );
};
