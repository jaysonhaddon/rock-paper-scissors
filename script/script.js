const CHOICES = ["ROCK", "PAPER", "SCISSORS"];
const main = document.querySelector("main");
const totalRounds = document.querySelector("#rounds");
const cpuResults = document.querySelector("#cpu");
const playerResults = document.querySelector("#player");
const roundResults = document.querySelector(".result");
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
  totalRounds.textContent = numRounds;
  cpuResults.textContent = cpuScore;
  playerResults.textContent = playerScore;
}

function updateScoreboard(resultUI, winner) {
  let scoreToUpdate;
  if (winner === "Player") {
    playerScore++;
    scoreToUpdate = playerScore;
  } else {
    cpuScore++;
    scoreToUpdate = cpuScore;
  }
  resultUI.textContent = scoreToUpdate;
}

function endGameCheck(rounds) {
  if (rounds >= 5) {
    let ending = document.createElement("p");
    let restart = document.createElement("button");

    restart.textContent = "Restart Game";
    restart.classList.add("buttons");

    ending.textContent = `Game Over: You won ${playerScore} out of ${rounds} rounds!`;
    ending.classList.add("result");

    playerBtns.forEach((button) => {
      button.disabled = true;
    });

    restart.addEventListener("click", () => {
      location.reload();
    });

    main.appendChild(ending);
    main.appendChild(restart);
  }
}

function getComputerChoice(choices) {
  return Math.floor(Math.random() * choices.length);
}

function playRound(playerSelection) {
  numRounds++;
  totalRounds.textContent = numRounds;
  let computerSelection = CHOICES[getComputerChoice(CHOICES)];
  if (playerSelection === computerSelection) {
    roundResults.textContent = "Tie round!";
    endGameCheck(numRounds);
    return;
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
    roundResults.textContent = `You win! ${playerSelection} beats ${computerSelection}.`;
    updateScoreboard(playerResults, "Player");
  } else {
    roundResults.textContent = `You Lose! ${computerSelection} beats ${playerSelection}.`;
    updateScoreboard(cpuResults, "Computer");
  }

  endGameCheck(numRounds);
}
