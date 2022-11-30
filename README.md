# Function-Helper

Description:
Enables users to calculate the value, gradient, roots, and also plot a function of thier choice.

You can enter a function as text however, there is a specific syntax that is supported:
  - Scalars infront of variables cannot be written '5x' but must be written '5 * x' for example.
  - Powers should be written as follows: 'x ^ power'.
  - Similarly, +, -, and / operators must have a space between them and thier parameters.
  - There should never be a space immedietly following an open bracket, or preceding a closing bracket. For example '( x + 4 )' is invalid and should be written '(x + 4)' instead.
  - logarithms are supported and should be written log(base, x)
  - sin, cos, and tan are also supported and are written sin(x), cos(x), and tan(x) respectively.

Examples:
  - 'x ^ 2 - 1'
  - '(100 - x ^ 2) ^ 0.5'
  - 'tan(sin(x))'
  - 'cos(log(10, x))'

Alternatively, one can define a function via data . Currently, only 2 dimensional data is supported (points), so you must enter 'x' and 'y' values. Once the generate function button is pressed a LaGrange polynomial that satifies the data is generated.
