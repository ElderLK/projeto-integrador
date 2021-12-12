import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ReactComponent as CilindroSVG } from 'presentation/assets/cilindro_dupla_acao.svg';
import { SocketContext } from 'presentation/context/socket';

type IOProps = {
  relayOne?: boolean;
  relayTwo?: boolean;
  limitSwitchAStart?: boolean;
  limitSwitchAEnd?: boolean;
  limitSwitchBStart?: boolean;
  limitSwitchBEnd?: boolean;
};

export const StepFive: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const [state, setState] = React.useState<IOProps>();

  React.useEffect(() => {
    socket.on('limitStateChange', (data) => {
      console.log('limitStateChange', data);
      setState((current) => ({ ...current, ...data }));
    });

    socket.on('relayStateChange', (data) => {
      setState((current) => ({ ...current, ...data }));
    });

    return () => {
      socket.off('limitStateChange');
      socket.emit('statesReset');
    };
  }, [socket]);

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
        <Box
          sx={{
            marginRight: 2,
            width: '50%',
            '& #sensor_inicio': {
              fill: state?.limitSwitchAStart ? '#1976d2' : '#C4C4C4',
            },
            '& #sensor_fim': {
              fill: state?.limitSwitchAEnd ? '#1976d2' : '#C4C4C4',
            },
            '& #recuo_linha, #recuo_plug': {
              fill: !state?.relayOne ? '#1976d2' : '#C4C4C4',
              stroke: !state?.relayOne ? '#1976d2' : 'black',
            },
            '& #avanco_linha, #avanco_plug': {
              fill: state?.relayOne ? '#1976d2' : '#C4C4C4',
              stroke: state?.relayOne ? '#1976d2' : 'black',
            },
            '& #cilindro': {
              transition: 'transform 2s',
              transform: state?.limitSwitchAEnd
                ? 'translateX(110px)'
                : state?.limitSwitchAStart
                ? 'translateX(0)'
                : 'translateX(45px)',
            },
          }}
        >
          <CilindroSVG style={{ overflow: 'visible' }} />
        </Box>
        <Box
          sx={{
            marginLeft: 2,
            width: '50%',
            '& #sensor_inicio': {
              fill: state?.limitSwitchBStart ? '#1976d2' : '#C4C4C4',
            },
            '& #sensor_fim': {
              fill: state?.limitSwitchBEnd ? '#1976d2' : '#C4C4C4',
            },
            '& #recuo_linha, #recuo_plug': {
              fill: !state?.relayTwo ? '#1976d2' : '#C4C4C4',
              stroke: !state?.relayTwo ? '#1976d2' : 'black',
            },
            '& #avanco_linha, #avanco_plug': {
              fill: state?.relayTwo ? '#1976d2' : '#C4C4C4',
              stroke: state?.relayTwo ? '#1976d2' : 'black',
            },
            '& #cilindro': {
              transition: 'transform 2s',
              transform: state?.limitSwitchBEnd
                ? 'translateX(110px)'
                : state?.limitSwitchBStart
                ? 'translateX(0)'
                : 'translateX(45px)',
            },
          }}
        >
          <CilindroSVG style={{ overflow: 'visible' }} />
        </Box>
      </Box>
    </Box>
  );
};
