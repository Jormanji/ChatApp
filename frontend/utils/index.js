import { Platform } from "react-native";
import { io } from "socket.io-client";


export const BaseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000'

export const socket = io.connect('(YOUR IP ADDRESS HERE):4000')


socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
  });
  
  socket.on('connect_error', (error) => {
    console.error('Socket.IO connection error:', error);
  });
  
  socket.on('connect_timeout', (timeout) => {
    console.error('Socket.IO connection timed out:', timeout);
  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
  });
  