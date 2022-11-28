import { Compiler, Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FunctionInteractorComponent } from './functionInteractor.component';
import { RPFunction, validateStringForFunction, parseStringToFunction, ValidateStringResult } from './function';

@Component({
  selector: 'functionInput',
  templateUrl: 'functionInput.component.html',
	styleUrls: ['./appStyle.css']
})
export class FunctionInputComponent
{
	@ViewChild(FunctionInteractorComponent) functionInteractor: FunctionInteractorComponent;

  funcString = "";
  validateString = "";

  convert()
  {
    this.validateString = "";
    var result = validateStringForFunction(this.funcString);
    switch(result)
    {
    case ValidateStringResult.NoSpacePrecedingOperator:
      this.validateString = "Missing space preceding operator.";
      return;
    case ValidateStringResult.NoSpaceFollowingOperator:
      this.validateString = "Missing space following operator.";
      return;
    case ValidateStringResult.SpaceFollowingOpenBracket:
      this.validateString = "Space following open bracket is invalid.";
      return;
    case ValidateStringResult.SpacePrecedingCloseBracket:
      this.validateString = "Space preceding close bracket is invalid.";
      return;
    case ValidateStringResult.LessThanMinLength:
      this.validateString = "Minimum length for text to be converted is 5 characters."
    case ValidateStringResult.Empty:
      this.validateString = "";
      return;
    }
    this.functionInteractor.initialize(new RPFunction(parseStringToFunction(this.funcString)));
  }
}