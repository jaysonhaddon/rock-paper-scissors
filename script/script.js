const CHOICES = ["ROCK", "PAPER", "SCISSORS"];
const totalRounds = document.querySelector("#rounds");
const cpuResults = document.querySelector("#cpu");
const playerResults = document.querySelector("#player");
const playerBtns = document.querySelectorAll("button");

let numRounds = 0;
let cpuScore = 0;
let playerScore = 0;

playerBtns.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.value);
  });
});

initializeScore();

function initializeScore() {
  totalRounds.textContent = `Total Rounds: ${numRounds}`;
  cpuResults.textContent = `Computer Wins: ${cpuScore}`;
  playerResults.textContent = `Player Wins: ${playerScore}`;
}

function getComputerChoice(choices) {
  return Math.floor(Math.random() * choices.length);
}

function playRound(playerSelection) {
  let computerSelection = CHOICES[getComputerChoice(CHOICES)];
  if (playerSelection === computerSelection) {
    console.log("Tie round!");
    return 0;
  }

  let playerWon = false;
  switch (playerSelection) {
    case "ROCK":
      if (computerSelection === "SCISSORS") {
        playerWon = true;
      }
      break;
    case "PAPER":
      if (computerSelection === "ROCK") {
        playerWon = true;
      }
      break;
    case "SCISSORS":
      if (computerSelection === "PAPER") {
        playerWon = true;
      }
  }

  if (playerWon) {
    console.log(`You win! ${playerSelection} beats ${computerSelection}.`);
    return 1;
  } else {
    console.log(`You Lose! ${computerSelection} beats ${playerSelection}.`);
    return 0;
  }
}
