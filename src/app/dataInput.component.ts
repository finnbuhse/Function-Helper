import { Compiler, Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { GraphComponent } from './graph.component';
import './function';

@Component({
  selector: 'dataInput',
  templateUrl: 'dataInput.component.html',
	styleUrls: ['./appStyle.css']
})
export class DataInputComponent {
  variable = "";
  variables = [];
}