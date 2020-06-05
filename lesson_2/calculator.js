const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
const LANGUAGE = 'fr';

function prompt(message) {
  console.log(`=> ${message}`);
}
function invalidNum(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}
function messages(message, lang='en') {
  return MESSAGES[lang][message];
}

prompt(messages('welcome', LANGUAGE));

while (true) {

// Ask the user for the first number.

prompt(messages('firstNum', LANGUAGE));
let num1 = readline.question();

while (invalidNum(num1)) {
  prompt(messages('invalidNum', LANGUAGE));
  num1 = readline.question();
}
// Ask the user for the second number.

prompt(messages('secondNum', LANGUAGE));
let num2 = readline.question();

while (invalidNum(num2)) {
  prompt(messages('invalidNum', LANGUAGE));
  num2 = readline.question();
}

// Ask the user for an operation to perform.

let operation;

do {
  prompt(messages('typeOperation', LANGUAGE));
  operation = readline.question();
	if (operation < '1' || operation > '4' || operation === NaN) {
		prompt(operation + messages('invalidChoice', LANGUAGE));
	}
} while (operation < '1' || operation > '4' || operation === NaN);

// Perform the operation on the two numbers.

let output;
switch (operation) {
  case '1':
    output = Number(num1) + Number(num2);
    break;
  case '2':
    output = Number(num1) - Number(num2);
    break;
  case '3':
    output = Number(num1) * Number(num2);
    break;
  case '4':
    output = Number(num1) / Number(num2);
    break;
} 

// Print the result to the terminal.
prompt(messages('result', LANGUAGE) + output);
// Ask the user for another calculation.

prompt(messages('another', LANGUAGE));
let response = readline.question();
let yesOrNo = response.toLowerCase();

if (!['y', 'yes', 'oui'].includes(yesOrNo)) break; // So strings like 'yellow' don't return true.

}
// Extract messages into a configuration file.

// Translate messages