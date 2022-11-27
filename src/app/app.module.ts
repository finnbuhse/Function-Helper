import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph.component';
import { FunctionComponent } from './function.component';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, MatInputModule, MatFormFieldModule, ChartsModule ],
  declarations: [ AppComponent, GraphComponent, FunctionComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

}
