import React from 'react';
import { Box, Typography, Switch } from '@mui/material';
import { SocketContext } from 'presentation/context/socket';

type IOProps = {
  relayOne?: boolean;
  relayTwo?: boolean;
  limitSwitchAStart?: boolean;
  limitSwitchAEnd?: boolean;
  limitSwitchBStart?: boolean;
  limitSwitchBEnd?: boolean;
};

export const StepThree: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const [state, setState] = React.useState<IOProps>();

  React.useEffect(() => {
    // as soon as the component is mounted, do the following tasks:

    // subscribe to socket events
    socket.on('limitStateChange', (data) => {
      console.log('limitStateChange', data);
    });

    return () => {
      socket.off('limitStateChange');
      socket.emit('statesReset');
    };
  }, [socket]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        '& table': {
          minWidth: 200,
        },
        '& table, th, td': {
          border: '1px solid black',
        },
      }}
    >
      <Typography sx={{ mt: 2, mb: 1 }} component="h2" variant="h4">
        Instruções de teste das Entradas e Saídas.
      </Typography>
      <table>
        <thead>
          <tr>
            <th>Instruções</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Ao pressionar esse switch o rele do cilindro <b>"A"</b> deve
              ativar/desativar
            </td>
            <td>
              <Switch
                checked={Boolean(state?.relayOne)}
                onChange={(_e, checked) => {
                  socket.emit('relayStateChange', {
                    relayOne: Number(checked),
                  });
                  setState((current) => ({ ...current, relayOne: checked }));
                }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              Ao pressionar esse switch o rele do cilindro <b>"B"</b> deve
              ativar/desativar
            </td>
            <td>
              <Switch
                checked={Boolean(state?.relayTwo)}
                onChange={(_e, checked) => {
                  socket.emit('relayStateChange', {
                    relayTwo: Number(checked),
                  });
                  setState((current) => ({
                    ...current,
                    relayTwo: checked,
                  }));
                }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              Esse switch deve espelhar o estado do sensor de <b>início</b> de
              curso do cilindro <b>"A"</b>
            </td>
            <td>
              <Switch
                readOnly
                checked={false}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              Esse switch deve espelhar o estado do sensor de <b>fim</b> de
              curso do cilindro <b>"A"</b>
            </td>
            <td>
              <Switch
                readOnly
                checked={false}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              Esse switch deve espelhar o estado do sensor de <b>início</b> de
              curso do cilindro <b>"B"</b>
            </td>
            <td>
              <Switch
                readOnly
                checked={false}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </td>
          </tr>
          <tr>
            <td>
              Esse switch deve espelhar o estado do sensor de <b>fim</b> de
              curso do cilindro <b>"B"</b>
            </td>
            <td>
              <Switch
                readOnly
                checked={false}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};
