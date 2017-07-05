

// Global variables

var number1 = ""; // holds first input - x
var number2 = ""; // holds second input - y

var input1 = true; // state variable - true when first number is being input
var input2 = false; // state variable - true when second number is being input

var operator = ""; // stores current operator

/**
*	Displays parameter number to calculator display
*	@param {String} num
*/
function display(num) {
   	var node = document.getElementById("display");  
	node.value = num;
}

/**
*	Resets display, global variables - All Clear 
*/
function reset() {
	number1 = "";
	number2 = "";

	input1 = true;
	input2 = false;

	operator = "";
	display("");
}

/**
*	Function called at computation stage - post entering second number.
*   @return {String} output - result of computation
*/
function compute () {
	if (operator == "add") {
		var output = parseFloat(number1) + parseFloat(number2);
		output = output + "";
	}
	else if (operator == "subtract") {
		var output = parseFloat(number1) - parseFloat(number2);
		output = output + "";
	}
	else if (operator == "multiply") {
		var output = parseFloat(number1) * parseFloat(number2);
		output = output + "";
	}
	else if (operator == "divide") {
		var output = parseFloat(number1) / parseFloat(number2);
		output = output + "";
	}
	else if (operator == "power") {
		var output = Math.pow(parseFloat(number1),  parseFloat(number2));
		output = output + "";
	}
	else if (operator == "root") {
		var output = Math.pow(parseFloat(number1),  1/parseFloat(number2));
		output = output + "";
	}
	else if (operator == "log") {
		var output = Math.log(parseFloat(number1))/Math.log(parseFloat(number2));
		output = output + "";
	}
	else if (operator == "percent") {
		var output = (parseFloat(number1)/parseFloat(number2))*100;
		output = output + "";
	}
	else if (operator == "mod") {
		var output = Math.floor(parseFloat(number1)/parseFloat(number2));
		output = output + "";
	}

	return output;
}

/**
*	This function resolves state of computation upon user click/interaction - which number is being entered, what is the current operator etc.
*	@param {DOM node} current - HTML element that has most recently been clicked.
*/
function calculate(current) {

	if (input1 == true) {
    	
    	if ((current.getAttribute("class") == "calculator-button operator scientific" || current.getAttribute("class") == "calculator-button operator") && number1 != "") {
    		if (current.getAttribute("value") == "AC") {
    			reset();
    		}
    		else {
    			input1 = false;
    			operator = current.getAttribute("id");
    		}
		}
    	else {
    		if (current.getAttribute("class") == "calculator-button number") {
    			number1 = number1 + current.getAttribute("value");
    			display(number1);
    		}
    		else if (current.getAttribute("value") == "." && number1.indexOf(current.getAttribute("value")) == -1) {
    			number1 = number1 + current.getAttribute("value");
    			display(number1);
    		}
		}
    }
    else {

		if (current.getAttribute("class") == "calculator-button operator scientific" || current.getAttribute("class") == "calculator-button operator") {
			
			if (current.getAttribute("value") == "AC") {
    			reset();
    		}
			else if (number2 == "") operator = current.getAttribute("id");
			else {
				number1 = compute();
				number2 = "";

				display(number1);
				operator = current.getAttribute("id");
			}
		}
		else {
			if (current.getAttribute("class") == "calculator-button number") {
    			number2 = number2 + current.getAttribute("value");
    			display(number2);
    		}
    		else if (current.getAttribute("value") == "." && number2.indexOf(current.getAttribute("value")) == -1) {
    			number2 = number2 + current.getAttribute("value");
    			display(number2);
    		}
    		else if (current.getAttribute("value") == "=") {
    			number1 = compute();
				display(number1);

				input1 = true;
				input2 = false;
				number2 = "";
    		}
		}
    }
 }

/**
*	Add's 'click' event listeners to all the buttons on the calculator, calls Calculate function on click.
*/
function addlisteners () {

	var numbers = document.getElementsByClassName("calculator-button");

	for (var i = 0; i < numbers.length; ++i) {

		var current = numbers[i];
		if (typeof window.addEventListener === 'function')	{
			(function (_current) {
				_current.addEventListener('click', function(){
    				calculate(_current);
				});
			})(current);
		}
	}
}