export class Socket
{
  socket: WebSocket;

  constructor(url, protocols = [])
  {
    this.socket = new WebSocket(url, protocols);
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