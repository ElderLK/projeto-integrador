import React from 'react';
import ReactDOM from 'react-dom';
import App from 'presentation/App';
import { ThemeProvider } from 'presentation/providers';
import { SocketContext, socket } from 'presentation/context/socket';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
