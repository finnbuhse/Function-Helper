const h = 0.00001;

function logBase(base, x)
{
	return Math.log(x)/Math.log(base);
}

class Operator
{
	static Add = new Operator("+", 2, function(parameters) {
		return parameters[0] + parameters[1];
});
	static Subtract = new Operator("-", 2, function(parameters) {
		return parameters[0] - parameters[1];
});
	static Multiply = new Operator("*", 2, function(parameters) {
		return parameters[0] * parameters[1];
});
	static Divide = new Operator("/", 2, function(parameters) {
		return parameters[0] / parameters[1];
});
	static Power = new Operator("^", 2, function(parameters) {
		return Math.pow(parameters[0], parameters[1]);
});
	static Log = new Operator("log", 2, function(parameters) {
		return logBase(parameters[0], parameters[1]);
});
	static Sin = new Operator("sin", 1, function(parameters) {
		return Math.sin(parameters[0]);
});
	static Cos = new Operator("cos", 1, function(parameters) {
		return Math.cos(parameters[0]);
});
	static Tan = new Operator("tan", 1, function(parameters) {
		return Math.tan(parameters[0]);
});

  symbol = "";
  nParameters = 0;
  op;

	constructor(symbol, nParameters, op)
	{
		this.symbol = symbol;
		this.nParameters = nParameters;
		this.op = op;
	}

	toString()
	{
		return this.symbol;
	}
}

class Variable
{
  name = "";

	constructor(name)
	{
		this.name = name;
	}

	toString()
	{
		return this.name;
	}
}

function findVariable(substitutions, variableName) 
{
	for (var varIndex = 0; varIndex < substitutions.length; varIndex++)
	{
		if(substitutions[varIndex][0] == variableName)
		{
			return varIndex;
		}
	}
	return -1;
}

class RPFunction
{
  components = [];
  variableNames = [];

	constructor(components)
	{
		this.components = components;
		this.variableNames = [];
		for (var i = 0; i < this.components.length; i++)
		{
			if(this.components[i] instanceof Variable)
			{
				if(this.variableNames.indexOf(this.components[i].name) == -1)
				{
					this.variableNames.push(this.components[i].name);
				}
			}
		}
	}

	toString()
	{
		var string = "";
		for (var  i = 0; i < this.components.length; i++)
			string += this.components[i].toString() + " ";
		return string;
	}

	evaluate(substitutions)
	{
		var components = [...this.components];
		// SUBSTITUTE VARIABLES
		for(var i = 0; i < components.length; i++)
		{
			if(components[i] instanceof Variable)
			{
				for (var j = 0; j < substitutions.length; j++)
				{
					if(components[i].name == substitutions[j][0])
					{
						components[i] = substitutions[j][1];
						break;
					}
				}
			}
		}
		
		// CALCULATE RESULT
		for(var i = 0; i < components.length; i++)
		{
			if(components[i] instanceof Operator)
			{
				var nParameters = components[i].nParameters;
				var parameters = [];
				for (var j = 0; j < nParameters; j++)
				{
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

	// Gradient of function with respect to variable of choice
	gradient(substitutions, variableName) 
	{
		var variableIndex = findVariable(substitutions, variableName);
		if(variableIndex != -1)
		{
			var variableValue = substitutions[variableIndex][1];
			substitutions[variableIndex][1] = variableValue - h;
			var y0 = this.evaluate(substitutions);
			substitutions[variableIndex][1] = variableValue + h;
			var y1 = this.evaluate(substitutions);
			substitutions[variableIndex][1] = variableValue;
			return (y1 - y0)/(2 * h);
		}
		return 0;
	}

	evaluateRange(substitutions, incrementVariable, incrementVariableStart, incrementVariableEnd, increment)
	{
		var variableIndex = findVariable(substitutions, incrementVariable);
		if(variableIndex != -1)
		{
			var variableValue = substitutions[variableIndex][1];
			substitutions[variableIndex][1] = incrementVariableStart;

			var vardata = [];
			var ydata = [];
			while (substitutions[variableIndex][1] <= incrementVariableEnd)
			{
				var y = this.evaluate(substitutions);
				vardata.push(substitutions[variableIndex][1]);
				ydata.push(y);
				substitutions[variableIndex][1] += increment;
			}
		
			substitutions[variableIndex][1] = variableValue;
			return [ {data: vardata, label: incrementVariable}, {data: ydata, label: "y"} ];
		}
		return [];
	}
}

function inBrackets(string, openBracket)
{
	var bracketDepth = 1;
	var i = openBracket;
	while(bracketDepth != 0)
	{
		i++;
		if(string[i] == "(")
		{
			bracketDepth++;
		}
		else if(string[i] == ")")
		{
			bracketDepth--;
		}
	}
	var substring = string.substring(openBracket + 1, i);
	return substring;
}

function parseParameter(substitutions, parameter)
{
	var components = [];
	var subNames = Object.keys(substitutions);

	if(isNaN(parameter))
	{
		if(subNames.indexOf(parameter) == -1)
		{
			if(parameter.length == 1)
			{
				components = [new Variable(parameter)];
			}
			else 
			{
				components = parseStringToFunction(parameter);
			}
		}
		else 
		{
			components = substitutions[parameter];
		}
	}
	else
	{
		components = [parseFloat(parameter)];
	}
	return components;
}

function parseOperator(substitutions, string, index, symbol)
{
	var components = [];	
	
	// PARSE TRIGENOMIC FUNCTIONS - READS FOLLOWING FORMAT - [operator](a)
	if(symbol == "sin" || symbol == "cos" || symbol == "tan")
	{
		var openBracket = string.indexOf("(", index);

		var param1 = inBrackets(string, openBracket);
		var param1Components = parseParameter(substitutions, param1);
		components = components.concat(param1Components);

		switch (symbol)
		{
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

	if(symbol == "log") // PARSE LOGS - READS FOLLOWING FORMAT - log(a, b)
	{
		var openBracket = string.indexOf("(", index);
		var paramsString = inBrackets(string, openBracket);

		var param2Start = paramsString.indexOf(",");
		var param1 = paramsString.substring(0, param2Start);
		param2Start++;
		while (paramsString[param2Start] == " ")
		{
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
		while(param1Start != 0 && string[param1Start - 1] == " ")
		{
			param1Start--;
		}
		while(param1Start != 0 && string[param1Start - 1] != " ")
		{
			param1Start--;
		}
	
		var param2End = index + 1;
		while(string[param2End] == " " && param2End != string.length)
		{
			param2End++;
		}
		while(string[param2End] != " " && string[param2End] != ")" && param2End != string.length)
		{
			param2End++;
		}
		var param1 = string.substring(param1Start, index - 1);
		var param2 = string.substring(index + 2, param2End);

		var param1Components = parseParameter(substitutions, param1);
		var param2Components = parseParameter(substitutions, param2);
		components = components.concat(param1Components);
		components = components.concat(param2Components);
		switch(symbol)
		{
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

function makeSubstitution(substitutions, string, subString, subName, subComponents)
{
	substitutions[subName] = subComponents;
	string = string.replace(subString, subName);
	return [substitutions, string];
}

function parseStringToFunction(string)
{
	var components = [];
	var substitutions = {};

	// PARSE SIN BEFORE BRACKETS
	var sin = string.indexOf("sin");
	while(sin != -1)
	{
		var parsed = parseOperator(substitutions, string, sin, "sin");
		var subName = "c" + Object.keys(substitutions).length.toString();
		var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
		substitutions = sub[0];
		string = sub[1];
 
		components = parsed[0];
		sin = string.indexOf("sin");
	}

	// PARSE COS BEFORE BRACKETS
	var cos = string.indexOf("cos");
	while(cos != -1)
	{
		var parsed = parseOperator(substitutions, string, cos, "cos");
		var subName = "c" + Object.keys(substitutions).length.toString();
		var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
		substitutions = sub[0];
		string = sub[1];
 
		components = parsed[0];
		cos = string.indexOf("cos");
	}

	// PARSE TAN BEFORE BRACKETS
	var tan = string.indexOf("tan");
	while(tan != -1)
	{
		var parsed = parseOperator(substitutions, string, tan, "tan");
		var subName = "c" + Object.keys(substitutions).length.toString();
		var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
		substitutions = sub[0];
		string = sub[1];
 
		components = parsed[0];
		tan = string.indexOf("tan");
	}

	// PARSE LOGS BEFORE BRACKETS
	var log = string.indexOf("log");
	while(log != -1)
	{
		var parsed = parseOperator(substitutions, string, log, "log");
		var subName = "c" + Object.keys(substitutions).length.toString();
		var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
		substitutions = sub[0];
		string = sub[1];
 
		components = parsed[0];
		log = string.indexOf("log");
	}

	// PARSE BRACKETS
	var startBracket = string.indexOf("(");
	while(startBracket != -1)
	{
		var bracketContent = inBrackets(string, startBracket);
		var subName = "c" + Object.keys(substitutions).length.toString();
		var subComponents = parseStringToFunction(bracketContent);

		var sub = makeSubstitution(substitutions, string, "(" + bracketContent + ")", subName, subComponents);
		substitutions = sub[0];
		string = sub[1];
		
		startBracket = string.indexOf("(", startBracket);
	}

	// PARSE INDICES
	var indice = string.indexOf("^");
	while(indice != -1)
	{
		var parsed = parseOperator(substitutions, string, indice, "^");
		console.log(parsed);
		var subName = "c" + Object.keys(substitutions).length.toString();
		var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
		substitutions = sub[0];
		string = sub[1];
 
		components = parsed[0];
		indice = string.indexOf("^");
	}

	// PARSE DIVIDE
	var divide = string.indexOf("/");
	while(divide != -1)
	{
		var parsed = parseOperator(substitutions, string, divide, "/");
		var subName = "c" + Object.keys(substitutions).length.toString();
		var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
		substitutions = sub[0];
		string = sub[1];
 
		components = parsed[0];
		divide = string.indexOf("/");
	}

	// PARSE MULTIPLY
	var multiply = string.indexOf("*");
	while(multiply != -1)
	{
		var parsed = parseOperator(substitutions, string, multiply, "*");
		var subName = "c" + Object.keys(substitutions).length.toString();
		var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
		substitutions = sub[0];
		string = sub[1];

		components = parsed[0];
		multiply = string.indexOf("*");
	}

	// PARSE ADD
	var add = string.indexOf("+");
	while(add != -1)
	{
		var parsed = parseOperator(substitutions, string, add, "+");
		var subName = "c" + Object.keys(substitutions).length.toString();
		var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
		substitutions = sub[0];
		string = sub[1];

		components = parsed[0];
		add = string.indexOf("+");
	}

	// PARSE SUBTRACT
	var subtract = string.indexOf("-");
	while(subtract != -1)
	{
		var parsed = parseOperator(substitutions, string, subtract, "-");
		var subName = "c" + Object.keys(substitutions).length.toString();
		var sub = makeSubstitution(substitutions, string, parsed[1], subName, parsed[0]);
		substitutions = sub[0];
		string = sub[1];

		components = parsed[0];
		subtract = string.indexOf("-");
	}

	return components;
}

function solveNewtonRaphson(func, substitutions, solveVariable, var0, maximumIterations, iteration = 0)
{
	iteration++;

	var variableIndex = findVariable(substitutions, solveVariable);
	if(variableIndex != -1)
	{
		var originalValue = substitutions[variableIndex][1];

		substitutions[variableIndex][1] = var0;
		var fX0 = func.evaluate(substitutions);
		var gX0 = func.gradient(substitutions, solveVariable);
		substitutions[variableIndex][1] = originalValue;
  
		var x1 = var0 - fX0/gX0;

		if(x1 == var0 || iteration == maximumIterations)
  		return [x1, iteration];
		return solveNewtonRaphson(func, substitutions, solveVariable, x1, maximumIterations, iteration);
	}
	return 0;
}