import React from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io('http://192.168.100.239:8080');
export const SocketContext = React.createContext<Socket>(socket);
