import { Compiler, Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FunctionInteractorComponent } from './functionInteractor.component';
import { RPFunction, parseStringToFunction } from './function';

@Component({
  selector: 'functionInput',
  templateUrl: 'functionInput.component.html',
	styleUrls: ['./appStyle.css']
})
export class FunctionInputComponent
{
	@ViewChild(FunctionInteractorComponent) functionInteractor: FunctionInteractorComponent;

  funcString = "";

  convert()
  {
    this.functionInteractor.func.initialize(new RPFunction(parseStringToFunction(this.funcString)));
  }
}