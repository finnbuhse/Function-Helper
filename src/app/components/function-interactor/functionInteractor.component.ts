import { Component, ViewChild } from '@angular/core';
import { GraphComponent } from 'src/app/components/graph/graph.component';
import { RPFunction, solveNewtonRaphson } from 'src/app/shared/function/function';

/* Enables the user to interact with a function generated via functionInputs and dataInputs. */
@Component({
  selector: 'functionInteractor',
  templateUrl: 'functionInteractor.component.html',
  styleUrls: []
})
export class FunctionInteractorComponent {
  @ViewChild('plot0') graph: any;

  hide: boolean = true;

  func: any; // The function to interact with
  RPString: string = ""; // The function parsed to a string

  // Array of two-element arrays where index 0 is a variable character and index 1 is the value to substitute for it
  substitutions: Array<Array<any>> = [];

  evaluateResult = 0; // Result of evaluate()

  gradientVariable = "x"; // Variable to calculate gradient with respect to
  gradientResult = 0; // Result of gradient()

  plotIncrementVariable = "x"; // Variable to increment when plotting
  plotVariableStart = -10; // Starting value to substitute into increment variable
  plotVariableEnd = 10; // Final value to substitute into increment variable
  plotIncrement = 1; // The increment between substitutions into increment variable

  solveVariable = "x"; // Variable to solve for
  variableStart = 0; // Starting value (hint) for Newton-Raphson solving method. Should be close to root
  solveResult = 0; // Result of solve()

  clearSubstitutionInputs() {
    this.substitutions = [];
  }

  /* Remains hidden until initialized as pre-initialization there is no function to interact with. */
  initialize(func: RPFunction) {
    this.func = func;
    this.RPString = func.toString();

    this.clearSubstitutionInputs();
    for (var i = 0; i < this.func.variableNames.length; i++) {
      this.substitutions.push([this.func.variableNames[i], 0]);
    }
    this.hide = false;
  }

  /* Displays the functions value when all substitutions are input. */
  evaluate() {
    this.evaluateResult = this.func.evaluate(this.substitutions);
  }

  /* Displays the function gradient with respect to a variable of choice when all substitutions are input. */
  gradient() {
    this.gradientResult = this.func.gradient(this.substitutions, this.gradientVariable);
  }

  /* Generates datasets based on user input.
     The graph is automatically updated to display the function. */
  plot() {
    var range = this.func.evaluateRange(this.substitutions, this.plotIncrementVariable, this.plotVariableStart, this.plotVariableEnd, this.plotIncrement);

    this.graph.setDatasets([{
      data: range[1],
      label: 'y',
      type: 'line',
      xAxisID: 'xAxis',
      yAxisID: 'yAxis',

      pointRadius: 0.0, // Dont show points

      borderColor: "rgba(0, 150, 255, 1.0)",
      backgroundColor: "rgba(0, 150, 255, 0.3)"
    }, {
      data: [],
      label: 'Roots',
      type: 'line',
      xAxisID: 'xAxis',
      yAxisID: 'yAxis',

      showLine: false, // Dont show line

      borderColor: "rgba(80, 200, 0, 1.0)",
      backgroundColor: "rgba(80, 200, 0, 0.3)"
    }]);

    this.graph.setLabels(range[0]);
  }

  /* Mathematically solves when the function's solve variable when the function is equal to 0.
     All substitutions defined aside from the 
     solve variable's substitution (because this is substituted over the range inputed by the user) are used. */
  solve() {
    this.solveResult = solveNewtonRaphson(this.func, this.substitutions, this.solveVariable, this.variableStart, 500)[0];
    if (isNaN(this.solveResult)) {
      this.solveResult = 0;
      return;
    }
    this.graph.addPoint(1, [this.solveResult, 0]);
  }
}
