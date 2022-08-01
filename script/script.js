const CHOICES = ["ROCK", "PAPER", "SCISSORS"];
const resultCon = document.querySelector(".result-container");
const totalRounds = document.querySelector("#rounds");
const totalGames = document.querySelector("#total");
const cpuResults = document.querySelector("#cpu");
const playerResults = document.querySelector("#player");
const roundResults = document.querySelector(".result");
const playerBtns = document.querySelectorAll(".main-btn");
const sidebar = document.querySelector(".sidebar-container");

const scoreboard = {
  gamesPlayed: 0,
  numRounds: 0,
  playerScore: 0,
  cpuScore: 0,
};

let newGameBtn;
let endingResult;
let maxRounds = 5;

playerBtns.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.value);
  });
});

newGame();

function playRound(playerSelection) {
  updateRounds();

  let computerSelection = CHOICES[getComputerChoice(CHOICES)];
  if (playerSelection === computerSelection) {
    roundResults.textContent = "Tie round! No points.";
    gameoverCheck(scoreboard.numRounds);
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

  gameoverCheck(scoreboard.numRounds);
}

function newGame() {
  resetScoreboard();

  playerBtns.forEach((button) => {
    button.disabled = false;
  });
}

function resetScoreboard() {
  for (let property in scoreboard) {
    if (property === "gamesPlayed") {
      continue;
    } else if (property === "numRounds") {
      scoreboard[property] = 1;
    } else {
      scoreboard[property] = 0;
    }
  }

  totalRounds.textContent = scoreboard.numRounds;
  playerResults.textContent = scoreboard.playerScore;
  cpuResults.textContent = scoreboard.cpuScore;
  totalGames.textContent = scoreboard.gamesPlayed;
  roundResults.textContent = "";

  if (scoreboard.gamesPlayed !== 0) {
    endingResult.remove();
    newGameBtn.remove();
  }
}

function updateScoreboard(resultUI, winner) {
  let scoreToUpdate;
  if (winner === "Player") {
    scoreboard.playerScore++;
    scoreToUpdate = scoreboard.playerScore;
  } else {
    scoreboard.cpuScore++;
    scoreToUpdate = scoreboard.cpuScore;
  }
  resultUI.textContent = scoreToUpdate;
}

function updateRounds() {
  scoreboard.numRounds++;
  if (scoreboard.numRounds < maxRounds + 1) {
    totalRounds.textContent = scoreboard.numRounds;
  }
}

function gameoverCheck(rounds) {
  if (rounds > maxRounds) {
    gameover();
  }
}

function gameover() {
  scoreboard.gamesPlayed++;
  totalGames.textContent = scoreboard.gamesPlayed;

  endingResult = document.createElement("p");
  newGameBtn = document.createElement("button");

  newGameBtn.textContent = "Play Again?";

  endingResult.textContent = `Game Over: You won ${scoreboard.playerScore} out of ${maxRounds} rounds!`;
  endingResult.classList.add("result");

  playerBtns.forEach((button) => {
    button.disabled = true;
  });

  newGameBtn.addEventListener("click", newGame);

  resultCon.appendChild(endingResult);
  sidebar.appendChild(newGameBtn);
}

function getComputerChoice(choices) {
  return Math.floor(Math.random() * choices.length);
}
