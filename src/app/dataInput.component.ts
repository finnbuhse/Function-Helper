import { Compiler, Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Operator, Variable, RPFunction } from './function';
import { FunctionInteractorComponent } from './functionInteractor.component';

@Component({
  selector: 'dataInput',
  templateUrl: 'dataInput.component.html',
	styleUrls: ['./appStyle.css']
})
export class DataInputComponent {
  @ViewChild(FunctionInteractorComponent) functionInteractor: FunctionInteractorComponent;

  variable = "";
  variables = ["x", "y"];
  datasetTexts = [];
  datasets = [[], []];
  datasetsContainNaN = false;
  func;
  RPString = "";

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
    this.datasetsContainNaN = false;
    // Parse strings into datasets
    for (var i = 0; i < this.datasetTexts.length; i++)
    {
      var tempString = this.datasetTexts[i].replace(/ /g, "");
      var tempArray = tempString.split(",");
      this.datasets[i] = [];
      for (var j = 0; j < tempArray.length; j++)
      {
        var f = parseFloat(tempArray[j]);
        console.log()
        if(f == NaN)
        {
          this.datasetsContainNaN = true;
          return;
        }
        this.datasets[i].push(f);
      }
    }
    if(this.datasets[0].length != this.datasets[1].length || this.datasets[0].length == 0)
    {
      return;
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
      functionComponents = functionComponents.concat(this.datasets[1][i]);
      functionComponents.push(Operator.Multiply);
      if(i > 0)
      {
        functionComponents.push(Operator.Add);
      }
    }

    this.functionInteractor.initialize(new RPFunction(functionComponents));
  }
}