import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartsModule } from 'ng2-charts';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBCajsw1DN4lzSpJJkfUrOUdKmEbZl66f4",
  authDomain: "function-helper.firebaseapp.com",
  databaseURL: "https://function-helper.eur3.firebaseio.com",
  projectId: "function-helper",
  storageBucket: "function-helper.appspot.com",
  messagingSenderId: "278533435669",
  appId: "1:278533435669:web:1f54b8bc463f36b3e3791c",
  measurementId: "G-F7MXM13S6S",
};

import { AppComponent } from './app.component';
import { GraphComponent } from './graph.component';
import { FunctionInteractorComponent } from './functionInteractor.component';
import { FunctionInputComponent } from './functionInput.component';
import { DataInputComponent } from './dataInput.component';
import { FileUploadComponent } from './fileUpload.component';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, BrowserAnimationsModule, FormsModule, MatInputModule, MatFormFieldModule, ChartsModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule ],
  declarations: [ AppComponent, GraphComponent, FunctionInteractorComponent, FunctionInputComponent, DataInputComponent, FileUploadComponent ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
