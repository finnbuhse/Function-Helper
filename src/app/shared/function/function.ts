const h = 0.00001;
const minFunctionStringLength = 5;

function logBase(base: number, x: number): number {
  return Math.log(x) / Math.log(base);
}

/* Used in a similar fashion to enums to represent an operation within a function.
   However, also possesses a function which performs the Operator's operation, the number of parameters required for the operation,
   and the symbol of the operator. */
export class Operator {
  static Add = new Operator("+", 2, function (parameters: Array<number>) {
    return parameters[0] + parameters[1];
  });
  static Subtract = new Operator("-", 2, function (parameters: Array<number>) {
    return parameters[0] - parameters[1];
  });
  static Multiply = new Operator("*", 2, function (parameters: Array<number>) {
    return parameters[0] * parameters[1];
  });
  static Divide = new Operator("/", 2, function (parameters: Array<number>) {
    return parameters[0] / parameters[1];
  });
  static Power = new Operator("^", 2, function (parameters: Array<number>) {
    return Math.pow(parameters[0], parameters[1]);
  });
  static Log = new Operator("log", 2, function (parameters: Array<number>) {
    return logBase(parameters[0], parameters[1]);
  });
  static Sin = new Operator("sin", 1, function (parameters: Array<number>) {
    return Math.sin(parameters[0]);
  });
  static Cos = new Operator("cos", 1, function (parameters: Array<number>) {
    return Math.cos(parameters[0]);
  });
  static Tan = new Operator("tan", 1, function (parameters: Array<number>) {
    return Math.tan(parameters[0]);
  });

  symbol = "";
  nParameters = 0;
  op;

  constructor(symbol: string, nParameters: number, op: Function) {
    this.symbol = symbol;
    this.nParameters = nParameters;
    this.op = op;
  }

  toString() {
    return this.symbol;
  }
}

/* Represents a variable that can be substituted within a function. */
export class Variable {
  name: string = "";

  constructor(name: string) {
    this.name = name;
  }

  toString() {
    return this.name;
  }
}

/* Finds the substitution for a given variable within an array of substitutions. */
function findVariable(substitutions: any, variableName: string) {
  for (var varIndex = 0; varIndex < substitutions.length; varIndex++) {
    if (substitutions[varIndex][0] == variableName) {
      return varIndex;
    }
  }
  return -1;
}

/* Represents a mathematical function which can be queried at runtime. */
export class RPFunction {
  components: any = [];
  variableNames: any = [];

  constructor(components: any = []) {
    this.components = components;

    // Finds all variables within the function and appends them to variableNames
    this.variableNames = [];
    for (var i = 0; i < this.components.length; i++) {
      if (this.components[i] instanceof Variable) {
        if (this.variableNames.indexOf(this.components[i].name) == -1) {
          this.variableNames.push(this.components[i].name);
        }
      }
    }
  }

  /* Parses the function to a string by concatinating each of it's components with a space. */
  toString() {
    var string = "";
    for (var i = 0; i < this.components.length; i++)
      string += this.components[i].toString() + " ";
    return string;
  }

  /* Calculated the value of the function when all variables are substituted with corresponding values. */
  evaluate(substitutions: any) {
    // Make a copy of components so the function's components aren't affected as the algorithm eliminates elements as it goes 
    var components = [...this.components];

    // SUBSTITUTE VARIABLES
    for (var i = 0; i < components.length; i++) {
      if (components[i] instanceof Variable) {
        for (var j = 0; j < substitutions.length; j++) {
          if (components[i].name == substitutions[j][0]) {
            components[i] = substitutions[j][1];
            break;
          }
        }
      }
    }

    // CALCULATE RESULT
    for (var i = 0; i < components.length; i++) {
      if (components[i] instanceof Operator) {
        var nParameters = components[i].nParameters;
        var parameters = [];
        for (var j = 0; j < nParameters; j++) {
          parameters.push(components[i - nParameters + j]);
        }
        var result = components[i].op(parameters);
        components.splice(i - nParameters + 1, nParameters);
        components[i - nParameters] = result;
        i -= nParameters;
      }
    }
    return components[0];
  }

  /* Calculates the gradient of the function with respect to a variable of choice. */
  gradient(substitutions: any, variableName: string): number {
    var variableIndex = findVariable(substitutions, variableName);
    if (variableIndex != -1) {
      var variableValue = substitutions[variableIndex][1];
      substitutions[variableIndex][1] = variableValue - h;
      var y0 = this.evaluate(substitutions);
      substitutions[variableIndex][1] = variableValue + h;
      var y1 = this.evaluate(substitutions);
      substitutions[variableIndex][1] = variableValue;

      // Uses /\y = /\y / /\x where change in x is a small number
      return parseFloat(((y1 - y0) / (2 * h)).toPrecision(4));
    }
    return 0;
  }

  /* Calculates the value of the function over a range. Returns the result as a two-element array where
     index 0 is an array containing the values substituted into the increment variable 
     and index 1 is an array containing the points generated in the following format {x: [value], y: [value]}. */
  evaluateRange(substitutions: any, incrementVariable: string, incrementVariableStart: number, incrementVariableEnd: number, increment: number): any {
    var variableIndex = findVariable(substitutions, incrementVariable);
    if (variableIndex != -1) {
      var variableValue = substitutions[variableIndex][1];
      substitutions[variableIndex][1] = incrementVariableStart;

      var vardata = [];
      var data = [];
      while (substitutions[variableIndex][1] <= incrementVariableEnd) {
        var xVal = substitutions[variableIndex][1];
        var yVal = this.evaluate(substitutions);
        vardata.push(xVal);
        data.push({ x: xVal, y: yVal });
        substitutions[variableIndex][1] += increment;
      }

      substitutions[variableIndex][1] = variableValue;
      return [vardata, data];
    }
    return [];
  }
}

/* Used internally to get the substring contained within specific brackets from a larger string. */
function inBrackets(string: string, openBracket: number) {
  var bracketDepth = 1;
  var i = openBracket;
  while (bracketDepth != 0) {
    i++;
    if (string[i] == "(") {
      bracketDepth++;
    }
    else if (string[i] == ")") {
      bracketDepth--;
    }
  }
  var substring = string.substring(openBracket + 1, i);
  return substring;
}

/* Used internally to parse an operator's parameter into function 'components'. */
function parseParameter(substitutions: any, parameter: any): any {
  var components: any = [];

  if (isNaN(parameter)) {
    if (substitutions.get(parameter) == undefined) {
      if (parameter.length == 1) {
        components = [new Variable(parameter)];
      }
      else {
        components = parseStringToFunction(parameter);
      }
    }
    else {
      var tempComponents = substitutions.get(parameter);
      if (tempComponents != undefined) {
        components = tempComponents;
      }
    }
  }
  else {
    components = [parseFloat(parameter)];
  }
  return components;
}

/* Used internally to parse a operator and it's parameters into function 'components'. */
function parseOperator(substitutions: any, string: string, index: number, symbol: string): any {
  var components: any = [];

  // PARSE TRIGENOMIC FUNCTIONS - READS FOLLOWING FORMAT - [operator](a)
  if (symbol == "sin" || symbol == "cos" || symbol == "tan") {
    var openBracket = string.indexOf("(", index);

    var param1 = inBrackets(string, openBracket);
    var param1Components = parseParameter(substitutions, param1);
    components = components.concat(param1Components);

    switch (symbol) {
      case "sin":
        components.push(Operator.Sin);
        break;
      case "cos":
        components.push(Operator.Cos);
        break;
      case "tan":
        components.push(Operator.Tan);
        break;
    }

    return [components, string.substring(index, index + param1.length + 5)];
  }

  if (symbol == "log") // PARSE LOGS - READS FOLLOWING FORMAT - log(b, x)
  {
    var openBracket = string.indexOf("(", index);
    var paramsString = inBrackets(string, openBracket);

    var param2Start = paramsString.indexOf(",");
    var param1 = paramsString.substring(0, param2Start);
    param2Start++;
    while (paramsString[param2Start] == " ") {
      param2Start++;
    }
    var param2 = paramsString.substring(param2Start, paramsString.length);

    var param1Components = parseParameter(substitutions, param1);
    var param2Components = parseParameter(substitutions, param2);
    components = components.concat(param1Components);
    components = components.concat(param2Components);
    components.push(Operator.Log);

    return [components, string.substring(index, index + paramsString.length + 5)]
  }
  else // PARSE STANDARD OPERATOR - READS FOLLOWING FORMAT - a [operator] b
  {
    var param1Start = index;
    while (param1Start != 0 && string[param1Start - 1] == " ") {
      param1Start--;
    }
    while (param1Start != 0 && string[param1Start - 1] != " ") {
      param1Start--;
    }

    var param2End = index + 1;
    while (string[param2End] == " " && param2End != string.length) {
      param2End++;
    }
    while (string[param2End] != " " && string[param2End] != ")" && param2End != string.length) {
      param2End++;
    }
    var param1 = string.substring(param1Start, index - 1);
    var param2 = string.substring(index + 2, param2End);

    var param1Components = parseParameter(substitutions, param1);
    var param2Components = parseParameter(substitutions, param2);
    components = components.concat(param1Components);
    components = components.concat(param2Components);
    switch (symbol) {
      case "+":
        components.push(Operator.Add);
        break;
      case "-":
        components.push(Operator.Subtract);
        break;
      case "*":
        components.push(Operator.Multiply);
        break;
      case "/":
        components.push(Operator.Divide);
        break;
      case "^":
        components.push(Operator.Power);
        break;
    }

    return [components, string.substring(param1Start, param2End)];
  }
}

/* Used internally to maintain correct order of operations when parsing a string to a function. */
function makeSubstitution(substitutions: any, string: string, subString: string, subName: string, subComponents: any): any {
  substitutions.set(subName, subComponents);
  string = string.replace(subString, subName);
  return [substitutions, string];
}

export enum ValidateStringResult {
  Success,
  Empty,
  LessThanMinLength,
  NoSpacePrecedingOperator,
  NoSpaceFollowingOperator,
  SpaceFollowingOpenBracket,
  SpacePrecedingCloseBracket
}

/* Use to validate a string can be converted to a function before actually converting it.
   This procedure is by no means robust and there are likely invalid strings that will still be deemed valid by this function. */
export function validateStringForFunction(string: string): ValidateStringResult {
  if (string == "") {
    return ValidateStringResult.Empty;
  }
  else if (string.length < minFunctionStringLength) {
    return ValidateStringResult.LessThanMinLength;
  }

  var lastWasSpace = false;
  var lastWasOperator = false;
  var lastWasOpenBracket = false;
  for (var i = 0; i < string.length; i++) {
    if (string[i] == "+" || string[i] == "-" || string[i] == "*" || string[i] == "/" || string[i] == "^") {
      if (lastWasSpace == false) {
        return ValidateStringResult.NoSpacePrecedingOperator;
      }
      else {
        lastWasSpace = false;
        lastWasOperator = true;
        lastWasOpenBracket = false;
      }
    }
    else if (string[i] == " ") {
      if (lastWasOpenBracket) {
        return ValidateStringResult.SpaceFollowingOpenBracket;
      }
      lastWasOperator = false;
      lastWasSpace = true;
      lastWasOpenBracket = false;
    }
    else if (lastWasOperator) {
      return ValidateStringResult.NoSpaceFollowingOperator;
    }
    else if (string[i] == "(") {
      lastWasOperator = false;
      lastWasSpace = false;
      lastWasOpenBracket = true;
    }
    else if (string[i] == ")") {
      if (lastWasSpace) {
        return ValidateStringResult.SpacePrecedingCloseBracket
      }
      lastWasOperator = false;
      lastWasSpace = false;
      lastWasOpenBracket = false;
    }
    else {
      lastWasOperator = false;
      lastWasSpace = false;
      lastWasOpenBracket = false;
    }
  }
  return ValidateStringResult.Success;
}

/* Use to convert a string into function 'components'. 
   These components can be used to make a new RPFunction from its constructor. */
export function parseStringToFunction(string: string) {
  var components: any = [];
  var substitutions: any = new Map<string, any>();

  // PARSE SIN BEFORE BRACKETS
  var sin = string.indexOf("sin");
  while (sin != -1) {
    var parsed = parseOperator(substitutions, string, sin, "sin");
    var subName = "c" + substitutions.size.toString();

    var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);

    substitutions = sub[0];
    string = sub[1];
    
    components = parsed[0];
    sin = string.indexOf("sin");
  }

  // PARSE COS BEFORE BRACKETS
  var cos = string.indexOf("cos");
  while (cos != -1) {
    var parsed = parseOperator(substitutions, string, cos, "cos");
    var subName = "c" + substitutions.size.toString();
    var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
    substitutions = sub[0];
    string = sub[1];

    components = parsed[0];
    cos = string.indexOf("cos");
  }

  // PARSE TAN BEFORE BRACKETS
  var tan = string.indexOf("tan");
  while (tan != -1) {
    var parsed = parseOperator(substitutions, string, tan, "tan");
    var subName = "c" + substitutions.size.toString();
    var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
    substitutions = sub[0];
    string = sub[1];

    components = parsed[0];
    tan = string.indexOf("tan");
  }

  // PARSE LOGS BEFORE BRACKETS
  var log = string.indexOf("log");
  while (log != -1) {
    var parsed = parseOperator(substitutions, string, log, "log");
    var subName = "c" + substitutions.size.toString();
    var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
    substitutions = sub[0];
    string = sub[1];

    components = parsed[0];
    log = string.indexOf("log");
  }

  // PARSE BRACKETS
  var startBracket = string.indexOf("(");
  while (startBracket != -1) {
    var bracketContent = inBrackets(string, startBracket);
    var subName = "c" + substitutions.size.toString();
    var subComponents = parseStringToFunction(bracketContent);
    var sub = makeSubstitution(substitutions, string, "(" + bracketContent + ")", subName, subComponents);
    substitutions = sub[0];
    string = sub[1];

    startBracket = string.indexOf("(", startBracket);
  }

  // PARSE INDICES
  var indice = string.indexOf("^");
  while (indice != -1) {
    var parsed = parseOperator(substitutions, string, indice, "^");
    var subName = "c" + substitutions.size.toString();
    var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
    substitutions = sub[0];
    string = sub[1];

    components = parsed[0];
    indice = string.indexOf("^");
  }

  // PARSE DIVIDE
  var divide = string.indexOf("/");
  while (divide != -1) {
    var parsed = parseOperator(substitutions, string, divide, "/");
    var subName = "c" + substitutions.size.toString();
    var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
    substitutions = sub[0];
    string = sub[1];

    components = parsed[0];
    divide = string.indexOf("/");
  }

  // PARSE MULTIPLY
  var multiply = string.indexOf("*");
  while (multiply != -1) {
    var parsed = parseOperator(substitutions, string, multiply, "*");
    var subName = "c" + substitutions.size.toString();
    var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
    substitutions = sub[0];
    string = sub[1];

    components = parsed[0];
    multiply = string.indexOf("*");
  }

  // PARSE ADD
  var add = string.indexOf("+");
  while (add != -1) {
    var parsed = parseOperator(substitutions, string, add, "+");
    var subName = "c" + substitutions.size.toString();

    var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);

    substitutions = sub[0];
    string = sub[1];

    components = parsed[0];
    add = string.indexOf("+");
  }

  // PARSE SUBTRACT
  var subtract = string.indexOf("-");
  while (subtract != -1) {
    var parsed = parseOperator(substitutions, string, subtract, "-");
    var subName = "c" + substitutions.size.toString();

    var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);

    substitutions = sub[0];
    string = sub[1];

    components = parsed[0];
    subtract = string.indexOf("-");
  }

  return components;
}

/* Mathematically solves a function via the Newton-Raphson method. */
export function solveNewtonRaphson(func: RPFunction, substitutions: any, solveVariable: string, var0: number, maximumIterations: number, iteration: number = 0): any {
  iteration++;

  var variableIndex = findVariable(substitutions, solveVariable);
  if (variableIndex != -1) {
    var originalValue = substitutions[variableIndex][1];

    substitutions[variableIndex][1] = var0;
    var fX0 = func.evaluate(substitutions);
    var gX0 = func.gradient(substitutions, solveVariable);
    substitutions[variableIndex][1] = originalValue;

    var x1 = var0 - fX0 / gX0;

    if (x1 == var0 || iteration == maximumIterations)
      return [x1, iteration];
    return solveNewtonRaphson(func, substitutions, solveVariable, x1, maximumIterations, iteration);
  }
  return [0, -1];
}
