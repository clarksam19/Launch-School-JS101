const readline = require('readline-sync');
const MESSAGES = require('./mtg_messages.json');
const LANGUAGE = 'en';

function prompt(message) {
  console.log(`=> ${message}`);
}

function message(message, lang = 'en') {
  return MESSAGES[lang][message];
}

function invalidNum(num) {
  return num.trim() === '' ||
         Number(num) < 0   ||
         Number.isNaN(Number(num));
}

function getLoanAmount() {
  prompt(message('amount', LANGUAGE));
  let responseAmount = readline.question();
  
  while (invalidNum(responseAmount)) {
    prompt(message('invalid', LANGUAGE));
    responseAmount = readline.question();
  }
    
  let loanAmount = parseFloat(responseAmount).toFixed(2);
  return loanAmount;
}    
      
function getLoanInterest() {
  prompt(message('apr', LANGUAGE));
  let responseApr = readline.question();
  
  while (invalidNum(responseApr)) {
    prompt(message('invalid', LANGUAGE));
    responseApr = readline.question();
  }
    
  let loanApr = parseFloat(responseApr).toFixed(2);
  let loanInterest = (loanApr / 100) / 12;
  return loanInterest;
}
  
function getLoanDuration() {
  prompt(message('duration', LANGUAGE));
  let responseDuration = readline.question();
  
  while (invalidNum(responseDuration)) {
    prompt(message('invalid', LANGUAGE));
    responseDuration = readline.question();
  }
    
  let loanDuration = responseDuration;
  return loanDuration;
}

function monthlyPayment(loanAmount, loanInterest, loanDuration) {
  loanAmount = getLoanAmount();
  loanInterest = getLoanInterest();
  loanDuration = getLoanDuration();
  
  let operation = loanAmount * (loanInterest / (1 - Math.pow((1 + loanInterest), - loanDuration)));
  if (loanInterest === 0.00) {
    operation = loanAmount / loanDuration;
  }
  let output = parseFloat(operation).toFixed(2);
  prompt(message('payment', LANGUAGE) + '$' + output);
}

while (true) {
  monthlyPayment();
  prompt(message('another', LANGUAGE));
  let response = readline.question().toLowerCase();
  
  if (!['y', 'yes', 'oui'].includes(response)) break;
}