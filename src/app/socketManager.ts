import { Injectable } from "@angular/core";

export const CLIENT_URL = "wss://199.36.158.100";
export const SERVER_URL = "wss://192.168.1.254:27015";

export class Socket
{
  socket: WebSocket;

  constructor(url, protocols = [])
  {
    this.socket = new WebSocket(url, protocols);
    console.log("Connecting to server...");
    while(this.socket.readyState == this.socket.CONNECTING) {}
    if(this.socket.readyState != this.socket.OPEN)
    {
      console.log("[ERROR] Failed to establish connection to server.");
      return;
    }
    console.log("Successfully connected to the server.");

    this.socket.onmessage = (event) => this.recieve(event);
  }

  close()
  {
    this.socket.close();
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

@Injectable()
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