import { Compiler, Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { GraphComponent } from '../graph/graph.component';
import { solveNewtonRaphson } from '../../shared/function';

/* Enables the user to interact with a function generated via functionInputs and dataInputs */
@Component({
  selector: 'functionInteractor',
  templateUrl: 'functionInteractor.component.html',
	styleUrls: ['../../../styles.css']
})
export class FunctionInteractorComponent
{
	@ViewChild(GraphComponent) graph: GraphComponent;

	hide = true;

  func;
	RPString = "";

	substitutions = [];
	evaluateResult = 0;
	gradientVariable = "x";
	gradientResult = 0;

	plotIncrementVariable = "x";
	plotVariableStart = -10;
	plotVariableEnd = 10;
	plotIncrement = 1;

	solveVariable = "x";
	variableStart = 0;
	solveResult = 0;

	clearSubstitutionInputs()
	{
		this.substitutions = [];
	}

  initialize(func)
  {
    this.func = func;
    this.RPString = func.toString();

    this.clearSubstitutionInputs();
		for (var i = 0; i < this.func.variableNames.length; i++)
		{
			this.substitutions.push([this.func.variableNames[i], 0]);
		}
		this.hide = false;
  }

	/* Displays the functions value when all substitutions are input. */
	evaluate()
	{
		this.evaluateResult = this.func.evaluate(this.substitutions);
	}

	/* Displays the function gradient with respect to a variable of choice when all substitutions are input. */
	gradient()
	{
		this.gradientResult = this.func.gradient(this.substitutions, this.gradientVariable);
	}

	/* Generates datasets based on user input.
		 It then updates the graph to display the function.
	*/
	plot()
	{
		var range = this.func.evaluateRange(this.substitutions, this.plotIncrementVariable, this.plotVariableStart, this.plotVariableEnd, this.plotIncrement);

		this.graph.setDatasets([{
			data: range[1],
			label: 'y',
			type: 'line',
    	xAxisID: 'xAxis1',
			pointRadius: 0.0
		}, {
			data: [],
			label: 'Roots',
			type: 'line',
    	yAxisID: 'yAxis1',
			showLine: false,
		}]);

		this.graph.setLabels(range[0]);
	}

	/* Mathematically solves when the function's solve variable value is equal to 0.
	   All substitutions defined aside from the 
		 solve variable's substitution (because this is substituted by the function over the range input) are used.
	*/
	solve()
	{
		this.solveResult = solveNewtonRaphson(this.func, this.substitutions, this.solveVariable, this.variableStart, 500)[0];
		if(isNaN(this.solveResult))
		{
			this.solveResult = 0;
			return;
		}
		this.graph.addPoint(1, [this.solveResult, 0]);
	}
}