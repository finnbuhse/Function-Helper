import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

@Injectable() // Defines 'singleton' like behaviour.
export class FirestoreService
{
  firebaseConfig = {

  }

  app = initializeApp(this.firebaseConfig);


}