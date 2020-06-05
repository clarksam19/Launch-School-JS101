const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const HOTKEYS = ['rock = r', 'paper = p', 'scissors = sc', 'lizard = l', 'spock = sp'];
const GAMES_TO_WIN = 3;
const WINNING_COMBOS = {
  rock:     ['scissors', 'lizard'],
  paper:    ['rock',     'spock'],
  scissors: ['paper',    'lizard'],
  lizard:   ['paper',    'spock'],
  spock:    ['rock',     'scissors'],
};

function displayHotkeys() {
  console.log(HOTKEYS);
}

function shorthandConverter(choice) {
  switch (choice) {
    case 'r':
      return 'rock';
    case 'p':
      return 'paper';
    case 'sc':
      return 'scissors';
    case 'l':
      return 'lizard';
    case 'sp':
      return 'spock';
    default:
      return choice;
  }
 
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function getUserChoice() {
prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
let userChoice = shorthandConverter(readline.question().toLowerCase());

while (!VALID_CHOICES.includes(userChoice)) {
    prompt(`${userChoice} is an invalid choice. Please choose ${VALID_CHOICES.join(', ')}`);
    userChoice = shorthandConverter(readline.question().toLowerCase());
} 
  
  return userChoice;
}

function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];
  return computerChoice;
}

let userScore = 0;
let computerScore = 0;

function playerWins(userChoice, computerChoice) {
  return WINNING_COMBOS[userChoice].includes(computerChoice);
}

function getWinner(userChoice, computerChoice) {
  prompt(`You chose ${userChoice}, computer chose ${computerChoice}`);

  if (playerWins(userChoice, computerChoice)) {
    prompt('You win the round!');
    ++userScore;
  } else if (userChoice === computerChoice) {
    prompt("It's a tie!");
  } else {
    prompt('Computer wins the round!');
    ++computerScore;
  }
  
}

function displayScore() {
  prompt(`Player 1: ${userScore} / ${GAMES_TO_WIN}`);
  prompt(`Computer: ${computerScore} / ${GAMES_TO_WIN}`);
}

function playAgain() {
  prompt('Do you want to play again (y/n)?');
  let response = readline.question().toLowerCase();
  
  while (response[0] !== 'n' && response[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    response = readline.question().toLowerCase();
  }
  
  userScore = 0;
  computerScore = 0;
  return response;
}

prompt('Welcome to Rock, Paper, Scissors, Lizard, Spock!');

while (true) {
  prompt('Ready to play (y/n)? Press h to see the hotkey menu.');
  let response = readline.question().toLowerCase();
  
  while (response[0] !== 'n' && response[0] !== 'y' && response[0] !== 'h') {
    prompt('Please enter "y", "n" or "h".');
    response = readline.question().toLowerCase();
  }
  if (response[0] === 'h') {
    displayHotkeys();
    prompt('Press any key to return to main menu.');
    response = readline.question().toLowerCase();
  }
  
  if (['y'].includes(response)) break;
}

while (true) {
  while (true) {
    getWinner(getUserChoice(), getComputerChoice());
    displayScore();
    if (userScore === GAMES_TO_WIN) {
      prompt('You are the winner!!!');
      break;
    } else if (computerScore === GAMES_TO_WIN) {
        prompt('You lose :( ');
        break;
    }
    
  }
  
  if (!['y', 'yes'].includes(playAgain())) break;
}






