import { Component, ViewChild } from '@angular/core';
import { Operator, Variable, RPFunction } from 'src/app/shared/function/function';
import { FunctionInteractorComponent } from 'src/app/components/function-interactor/functionInteractor.component';

/* Enables user to enter a set of x and y values and generate a function from them. */
@Component({
  selector: 'dataInput',
  templateUrl: 'dataInput.component.html',
  styleUrls: []
})
export class DataInputComponent {
  @ViewChild('interactor') functionInteractor: any;

  variable: string = ""; // Variable to add to dataset

  variables: Array<string> = ["x", "y"];

  datasetTexts: Array<string> = [];
  datasets: Array<Array<any>> = [[], []];

  validateString: string = "";

  clearVariables() {
    this.variables = [];
  }

  addVariable() {
    this.variables.push(this.variable);
    this.variable = "";
  }

  /* Invoked when the generate button is pressed. */
  generateFunction() {
    this.validateString = "";

    // Parse strings into datasets
    for (var i = 0; i < this.datasetTexts.length; i++) {
      var tempString = this.datasetTexts[i].replace(/ /g, "");
      var tempArray = tempString.split(",");
      this.datasets[i] = [];
      for (var j = 0; j < tempArray.length; j++) {
        var f = parseFloat(tempArray[j]);
        if (isNaN(f)) {
          this.validateString = "All data values must be real numbers.";
          return;
        }
        this.datasets[i].push(f);
      }
    }
    if (this.datasets[0].length != this.datasets[1].length) {
      this.validateString = "Number of x values must match the number of y values.";
      return;
    }
    else if (this.datasets[0].length == 0) {
      return;
    }

    // Generate LaGrange-Polynomial
    var functionComponents: Array<any> = [];
    for (var i = 0; i < this.datasets[0].length; i++) {
      var numeratorComponents = [];
      var denominatorComponents = [];

      var first = false;
      for (var j = 0; j < this.datasets[0].length; j++) {
        if (j != i) {
          numeratorComponents.push(new Variable(this.variables[0]));
          numeratorComponents.push(this.datasets[0][j]);
          numeratorComponents.push(Operator.Subtract);

          denominatorComponents.push(this.datasets[0][i]);
          denominatorComponents.push(this.datasets[0][j])
          denominatorComponents.push(Operator.Subtract);
          if (first) {
            numeratorComponents.push(Operator.Multiply);
            denominatorComponents.push(Operator.Multiply);
          }
          first = true;
        }
      }

      functionComponents = functionComponents.concat(numeratorComponents.concat(denominatorComponents.concat(Operator.Divide)));
      functionComponents = functionComponents.concat(this.datasets[1][i]);
      functionComponents.push(Operator.Multiply);
      if (i > 0) {
        functionComponents.push(Operator.Add);
      }
    }

    this.functionInteractor.initialize(new RPFunction(functionComponents));
  }
}
