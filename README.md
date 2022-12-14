# Function-Helper

Description:
Enables users to plot, calculate the value, gradient, and roots of a function of their choice.

You can enter a function as text however, there is a specific syntax that is supported:
  - Scalars in front of variables cannot be written '5x' but must be written '5 * x' for example.
  - Powers should be written as follows: 'x ^ power'.
  - Similarly, +, -, and / operators must have a space between them and their parameters.
  - There should never be a space immediately following an open bracket, or preceding a closing bracket. For example '( x + 4 )' is invalid and should be written '(x + 4)' instead.
  - Logarithms are supported and should be written log(base, x)
  - Sin, Cos, and Tan are also supported and are written sin(x), cos(x), and tan(x) respectively.
  - Variables are required to be 1 character.

Examples:
  - 'x ^ 2 - 1' [Has solutions]
  - '(100 - x ^ 2) ^ 0.5' [Does not have solutions]
  - 'tan(sin(x))' [Has solutions]
  - 'cos(log(10, x))' [Has solutions]
  - 'cos(log(b, x))' [Has solutions provided b > 0]

Alternatively, one can define a function via data. Currently, only 2-dimensional data is supported (points), so you must enter 'x' and 'y' values. Once the generate function button is pressed a LaGrange polynomial that satisfies the data is generated.

--== Development Stage and future updates ==--

The function mechanics work as intended, however, there is more functionality to come such as:
  - Definite integral calculator.
  - More complex parsing algorithm so that it can handle expressions such as '5x' or '5*x' (currently would have to be written '5 * x').
  - More options with regards to function generation algorithm e.g type of algorithm to use, and interpolation parameters.

Currently in progress is the code connecting to the firebase backend of the website. This Currently extends as far as the ability to register accounts and sign in.
But as of yet no way to save input functions/results.
