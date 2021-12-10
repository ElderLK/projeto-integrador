import React from 'react';
import ReactDOM from 'react-dom';
import App from 'presentation/App';
import { ThemeProvider } from 'presentation/providers';
import { SocketContext, socket } from 'presentation/context/socket';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
