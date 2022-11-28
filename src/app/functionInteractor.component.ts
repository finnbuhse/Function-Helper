import { Compiler, Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { GraphComponent } from './graph.component';
import { solveNewtonRaphson } from './function';

@Component({
  selector: 'functionInteractor',
  templateUrl: 'functionInteractor.component.html',
	styleUrls: ['./appStyle.css']
})
export class FunctionInteractorComponent
{
	@ViewChild(GraphComponent) graph: GraphComponent;

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
  }

	evaluate()
	{
		this.evaluateResult = this.func.evaluate(this.substitutions);
	}

	gradient()
	{
		this.gradientResult = this.func.gradient(this.substitutions, "x");
	}

	plot()
	{
		 var range = this.func.evaluateRange(this.substitutions, this.plotIncrementVariable, this.plotVariableStart, this.plotVariableEnd, this.plotIncrement);

		 this.graph.datasets = [range[1]];
		 this.graph.labels = range[0].data;
	}

	solve()
	{
		this.solveResult = solveNewtonRaphson(this.func, this.substitutions, this.solveVariable, this.variableStart, 500)[0];
	}
}