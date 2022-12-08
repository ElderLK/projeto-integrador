import React from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io(window.location.href ?? 'http://192.168.31.94:8080');
export const SocketContext = React.createContext<Socket>(socket);
