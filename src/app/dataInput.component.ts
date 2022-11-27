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
  datasetTexts = [];
  datasets = [];

  clearVariables()
  {
    this.variables = [];
  }

  addVariable()
  {
    this.variables.push(this.variable);
    this.variable = "";
  }

  generateFunction()
  {
    for (var i = 0; i < this.datasetTexts.length; i++)
    {
      var tempString = this.datasetTexts[i].replace(" ", "");
      console.log(tempString);
      var tempArray = tempString.split(",");
      console.log(tempArray);
      for (var j = 0; j < tempArray.length; j++)
      {
        this.datasets[i][j] = parseFloat(tempArray[j]);
      }
    }

    console.log(this.datasets);
  }
}