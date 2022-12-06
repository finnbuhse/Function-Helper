import { Injectable } from "@angular/core";

export const PORT = "27015";
export const SERVER_URL = /*Common Gateway: "wss://192.168.1.254:27015", IP Address:*/ "wss://192.168.1.83:" + PORT;

export class Socket
{
  socket: WebSocket;
  isOpen = false;

  /* Create WebSocket which attempts to connect to url potentially using additional protocols; this argument 
     does not have to be supplied however.
  */
  constructor(url, protocols = [])
  {
    this.socket = new WebSocket(url, protocols);
    this.socket.onopen = (event) => this.open(event);
    this.socket.onclose = (event) => this.close(event);
    this.socket.onerror = (event) => this.error(event);
    this.socket.onmessage = (event) => this.recieve(event);

    console.log("Connecting to server on port " + PORT);
  }

  // Invoked once a connection is established.
  open(event)
  {
    this.isOpen = true;
    console.log("Socket opened.")
  }

  // Invoked once a connection is closed.
  close(event)
  {
    this.socket.close();
    this.isOpen = false;
    console.log("Socket closed.")
  }

  // Invoked in the case of an error.
  error(event)
  {
    console.log('[WebSocket ERROR]: ', event, event.data);
  }

  // Called externally to send data across the connection.
  send(data)
  {
    this.socket.send(data);
  }

  // Invoked when a message is recieved.
  recieve(event)
  {
    console.log(event.data);
  }
}

@Injectable() // Defines 'singleton' like behaviour.
export class SocketManager
{
  sockets = []

  /* Interface that should be used to retrieve sockets.
     If forceNew is set to false, the existing sockets are searched for a connection with identical protocols and url.
     If a compatible existing connection is found, it is returned and the function exits.

     Otherwise if forceNew is set to true, a new socket is created and returned.
  */
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