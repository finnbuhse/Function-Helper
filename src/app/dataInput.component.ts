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
  func;

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
      var tempString = this.datasetTexts[i].replace(/ /g, "");
      console.log(tempString);
      var tempArray = tempString.split(",");
      console.log(tempArray);
      this.datasets[i] = [];
      for (var j = 0; j < tempArray.length; j++)
      {
        this.datasets[i].push(parseFloat(tempArray[j]));
      }
    }

    var functionComponents = [];
    for (var i = 0; i < this.datasets[0].length; i++)
    {
      var quotientComponents = [];
      var 
      var first = false;
      for (var j = 0; j < this.datasets[0].length; j++)
      {
        if(j != i)
        {
          functionComponents.push(new Variable(this.variables[0]));
          functionComponents.push(this.datasets[0][j]);
          functionComponents.push(Operator.Subtract);
          if(first)
          {
            functionComponents.push(Operator.Multiply);
          }

          /*
          functionComponents.push(this.datasets[0][i]);
          functionComponents.push(this.datasets[0][j]);
          functionComponents.push(Operator.Subtract);
          */
        }
      }
    }
  }
}