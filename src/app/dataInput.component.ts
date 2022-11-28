import { Compiler, Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { GraphComponent } from './graph.component';
import './function.ts';

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

    // Generate LaGrange Polynomial
    var functionComponents = [];
    for (var i = 0; i < this.datasets[0].length; i++)
    {
      var numeratorComponents = [];
      var denominatorComponents = [];
      
      var first = false;
      for (var j = 0; j < this.datasets[0].length; j++)
      {
        if(j != i)
        {
          numeratorComponents.push(new Variable(this.variables[0]));
          numeratorComponents.push(this.datasets[0][j]);
          numeratorComponents.push(Operator.Subtract);

          denominatorComponents.push(this.datasets[0][i]);
          denominatorComponents.push(this.datasets[0][j])
          denominatorComponents.push(Operator.Subtract);
          if(first)
          {
            numeratorComponents.push(Operator.Multiply);
            denominatorComponents.push(Operator.Multiply);
          }
          first = true;
        }
      }

      functionComponents = functionComponents.concat(numeratorComponents.concat(denominatorComponents.concat(Operator.Divide)));
      if(i > 0)
      {
        functionComponents.push(Operator.Add);
      }
    }
    console.log(functionComponents);
  }
}