import { io } from 'socket.io-client';

export class Socket
{
  socket;

  constructor(url)
  {
    this.socket = io(url, { transports: ["websocket"] } )
  }
}

export class SocketManager
{
  constructor()
  {
    
  }
}