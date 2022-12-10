import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph.component';
import { FunctionInteractorComponent } from './functionInteractor.component';
import { FunctionInputComponent } from './functionInput.component';
import { DataInputComponent } from './dataInput.component';
import { FileUploadComponent } from './fileUpload.component';

import { SocketManager } from './socketManager';
import { FirebaseService } from './firebaseService';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, BrowserAnimationsModule, FormsModule, MatInputModule, MatFormFieldModule, NgChartsModule ],
  declarations: [ AppComponent, GraphComponent, FunctionInteractorComponent, FunctionInputComponent, DataInputComponent, FileUploadComponent ],
  providers: [ SocketManager, FirebaseService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  
}
