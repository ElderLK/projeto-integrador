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

type Props = {
  sequence: string[];
};

export const StepFive: React.FC<Props> = ({ sequence }: Props) => {
  const socket = React.useContext(SocketContext);
  const [state, setState] = React.useState<IOProps>({});
  const {
    limitSwitchAStart,
    limitSwitchAEnd,
    limitSwitchBStart,
    limitSwitchBEnd,
  } = state;
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [executedWebserver, setExecutedWebserver] = React.useState<string[]>(
    []
  );
  const [completedSequence, setCompletedSequence] = React.useState<string[]>(
    []
  );

  console.log('state', state);

  React.useEffect(() => {
    socket.on('limitStateChange', (data) => {
      setState((current) => ({ ...current, ...data }));
    });

    socket.on('relayStateChange', (data) => {
      setState((current) => ({ ...current, ...data }));
    });

    socket.on('executedSequence', (data) => {
      setExecutedWebserver((current) => [...current, data]);
    });

    return () => {
      socket.off('limitStateChange');
      socket.off('relayStateChange');
      socket.emit('statesReset');
    };
  }, [socket]);

  const executeSequence = React.useCallback(
    (action) => {
      socket.emit('executeSequence', action);
    },
    [socket]
  );

  React.useEffect(() => {
    let next = false;
    switch (executedWebserver?.[executedWebserver.length - 1]) {
      case 'A+':
        if (limitSwitchAEnd) {
          next = true;
        }
        break;
      case 'B+':
        if (limitSwitchBEnd) {
          next = true;
        }
        break;
      case 'A-':
        if (limitSwitchAStart) {
          next = true;
        }
        break;
      case 'B-':
        if (limitSwitchBStart) {
          next = true;
        }
        break;
      case 'A+B+':
        if (limitSwitchAEnd && limitSwitchBEnd) {
          next = true;
        }
        break;
      case 'A-B-':
        if (limitSwitchAStart && limitSwitchBStart) {
          next = true;
        }
        break;
      case 'A+B-':
        if (limitSwitchAEnd && limitSwitchBStart) {
          next = true;
        }
        break;
      case 'A-B+':
        if (limitSwitchAStart && limitSwitchBEnd) {
          next = true;
        }
        break;
    }

    if (next) {
      setCompletedSequence((current) => [
        ...current,
        executedWebserver?.[executedWebserver.length - 1],
      ]);
    }

    if (
      executedWebserver.length &&
      executedWebserver.length < sequence.length
    ) {
      if (next) {
        executeSequence(sequence[executedWebserver.length]);
      }
    } else if (executedWebserver.length === sequence.length && next) {
      setBtnDisabled(false);
      setExecutedWebserver([]);
    }
  }, [
    executedWebserver,
    sequence,
    executeSequence,
    limitSwitchAStart,
    limitSwitchAEnd,
    limitSwitchBStart,
    limitSwitchBEnd,
  ]);

  return sequence.length ? (
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
          Sequência {sequence.join('/')}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setBtnDisabled(true);
            setCompletedSequence([]);
            executeSequence(sequence[0]);
          }}
          disabled={btnDisabled}
          sx={{ marginBottom: 1, marginLeft: 2 }}
        >
          Executar
        </Button>
      </Box>
      {completedSequence.length && (
        <Typography variant="h6" component="h4">
          Etapas executadas {completedSequence.join('/')}
        </Typography>
      )}
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
  ) : (
    <Box mt={5}>
      <Typography variant="subtitle1" color="error.main">
        Volte para a primeira etapa e selecione uma sequência
      </Typography>
    </Box>
  );
};
