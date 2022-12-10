import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

@Injectable() // Defines 'singleton' like behaviour.
export class FirestoreService
{
  firebaseConfig = {

  }

  app = initializeApp(this.firebaseConfig);

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