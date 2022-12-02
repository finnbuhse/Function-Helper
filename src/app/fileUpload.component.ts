import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { SERVER_URL, CLIENT_URL, Socket, SocketManager } from './socketManager';

@Component({
  selector: 'fileUpload',
  templateUrl: './fileUpload.component.html',
  styleUrls: ['./appStyle.css']
})
export class FileUploadComponent {
  serverSocket: Socket;

  filename = "";

  constructor(private socketManager: SocketManager)
  {
  }

  onFileSelected(event) {

    const file:File = event.target.files[0];
    if (file) {
      this.filename = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      console.log(this.filename);

      this.serverSocket = this.socketManager.getSocket(SERVER_URL);

      this.serverSocket.send("This is a message from the client site.");

      /*
      const upload$ = this.http.post("/api/thumbnail-upload", formData);

      upload$.subscribe();
      */
    }
  }
}