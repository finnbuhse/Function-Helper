# Function-Helper

Description:
Enables users to calculate the value, gradient, roots, and also plot a function of their choice.

You can enter a function as text however, there is a specific syntax that is supported:
  - Scalars infront of variables cannot be written '5x' but must be written '5 * x' for example.
  - Powers should be written as follows: 'x ^ power'.
  - Similarly, +, -, and / operators must have a space between them and their parameters.
  - There should never be a space immedietely following an open bracket, or preceding a closing bracket. For example '( x + 4 )' is invalid and should be written '(x + 4)' instead.
  - Logarithms are supported and should be written log(base, x)
  - Sin, Cos, and Tan are also supported and are written sin(x), cos(x), and tan(x) respectively.
  - Variables are required to be 1 character.

Examples:
  - 'x ^ 2 - 1' [Has solutions]
  - '(100 - x ^ 2) ^ 0.5' [Does not have solutions]
  - 'tan(sin(x))' [Has solutions]
  - 'cos(log(10, x))' [Has solutions]
  - 'cos(log(b, x))' [Has solutions provided b > 0]

Alternatively, one can define a function via data . Currently, only 2-dimensional data is supported (points), so you must enter 'x' and 'y' values. Once the generate function button is pressed a LaGrange polynomial that satifies the data is generated.

--== Development Stage and future updates ==--

The function mechanics work as intented, however there is more functionality to come such as:
  - Definite integral calculator.
  - More complex parsing algorithm so that it can handle expressions such as '5x' or '5*x' (currently would have to be written '5 * x').
  - More options with regards to function generation algorithm e.g type of algorithm to use, interpolation parameters.

Currently in progress is a server side backend to work in conjunction with the website.
For security reasons, this code will be kept private. However I will disclose that currently it is being written in C++ using the Websocketpp and OpenSSL libraries to comply with modern security (mainly TLS) protocols.
Ideally, the server will be 'plugable' and hence the future could see multiple versions implemented using the Firebase Admin SDK or WebSockets in C#, and potentially libwebsockets which is a pure C library. The advantage of this would be that depending on if the server runs on Windows or something else e.g Linux; it could use the former or latter implementations.

The aim of this is to allow users to possess accounts, and save their functions and results to increase the practical applicability of the site.

Currently to test the connection to the server, I am using the file upload component which is yet to be implemented. However once a file is selected, the site will attempt to make a connection with the server.
The server is offline at most times. However once finished, the hope is that the server will be running continuously.