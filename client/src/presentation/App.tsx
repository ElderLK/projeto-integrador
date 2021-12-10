import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import { Steps } from 'presentation/steps/steps.component';
import { SocketContext } from './context/socket';

function App() {
  const socket = React.useContext(SocketContext);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    // as soon as the component is mounted, do the following tasks:

    // subscribe to socket events
    socket.on('light', (data) => {
      console.log('cabuloso');
      setChecked(Boolean(data));
    });

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off('light');
    };
  }, [socket]);

  const handleLight = React.useCallback(
    (checked: boolean) => {
      socket.emit('light', Number(checked));
    },
    [socket]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleLight(event.target.checked);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Steps />
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </React.Fragment>
  );
}

export default App;
