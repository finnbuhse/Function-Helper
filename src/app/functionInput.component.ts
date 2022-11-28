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
    var result = validateStringForFunction(this.funcString);
    if(result == ValidateStringResult.NoSpacePrecedingOperator)
    {
      this.validateString = "Missing space preceding operator.";
      return;
    }
    else if(result == ValidateStringResult.NoSpaceFollowingOperator)
    {
      this.validateString = "Missing space following operator.";
      return;
    }
    else if(result == ValidateStringResult.SpaceFollowingOpenBracket)
    {
      this.validateString = "Space following open bracket is invalid.";
      return;
    }
    else if(result == ValidateStringResult.SpacePrecedingCloseBracket)
    {
      this.validateString = "Space preceding close bracket is invalid.";
      return;
    }
    else if(result == ValidateStringResult.Empty)
    {
      this.validateString = "";
      return;
    }
    this.validateString = "";
    this.functionInteractor.initialize(new RPFunction(parseStringToFunction(this.funcString)));
  }
}