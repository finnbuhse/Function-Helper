import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartsModule } from 'ng2-charts';

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
import { GraphComponent } from './components/graph/graph.component';
import { FunctionInteractorComponent } from './components/function-interactor/functionInteractor.component';
import { FunctionInputComponent } from './components/function-input/functionInput.component';
import { DataInputComponent } from './components/data-input/dataInput.component';
import { FileUploadComponent } from './components/file-upload/fileUpload.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    BrowserAnimationsModule, 
    FormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    ChartsModule
  ],
  declarations: [
    AppComponent,
    GraphComponent,
    FunctionInteractorComponent,
    FunctionInputComponent,
    DataInputComponent,
    FileUploadComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
