import { Injectable } from "@angular/core";


@Injectable() // Defines 'singleton' like behaviour.
export class FirestoreService
{
  firebaseConfig = {

  }

  app = initializeApp(this.firebaseConfig);


}