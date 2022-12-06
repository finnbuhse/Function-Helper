import { Injectable } from "@angular/core";

export const PORT = "27015";
export const SERVER_URL = /*Common Gateway: "wss://192.168.1.254:27015", IP Address:*/ "wss://192.168.1.83:" + PORT;

export class Socket
{
  socket: WebSocket;
  isOpen = false;

  // Create WebSocket which attempts to connect to url potentially using additional protocols - this argument does not have to be supplied however.
  constructor(url, protocols = [])
  {
    this.socket = new WebSocket(url, protocols);
    this.socket.onopen = (event) => this.open(event);
    this.socket.onclose = (event) => this.close(event);
    this.socket.onerror = (event) => this.error(event);
    this.socket.onmessage = (event) => this.recieve(event);

    console.log("Connecting to server on port " + PORT);
  }

  open(event)
  {
    this.isOpen = true;
    console.log("Socket opened.")
  }

  close(event)
  {
    this.socket.close();
    this.isOpen = false;
    console.log("Socket closed.")
  }

  error(event)
  {
    console.log('[WebSocket ERROR]: ', event);
  }

  send(data)
  {
    this.socket.send(data);
  }

  recieve(event)
  {
    console.log(event.data);
  }
}

@Injectable() // Defines 'singleton' like behaviour.
export class SocketManager
{
  sockets = []

  getSocket(url, protocols = [], forceNew = false)
  {
    if(!forceNew)
    {
      for (var i = 0; i < this.sockets.length; i++)
      {
        for (var j = 0; j < protocols.length; j++)
        {
          if(this.sockets[i].protocol == protocols[j])
          {
            if(this.sockets[i].url == url)
            {
              return this.sockets[i];
            }
          }
        }
      }
    }
    var socket = new Socket(url, protocols);
    this.sockets.push(socket);
    return socket;
  }
}