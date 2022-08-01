const CHOICES = ["ROCK", "PAPER", "SCISSORS"];
const wrapper = document.querySelector(".wrapper");
const totalRounds = document.querySelector("#rounds");
const totalGames = document.querySelector("#total");
const cpuResults = document.querySelector("#cpu");
const playerResults = document.querySelector("#player");
const roundResults = document.querySelector(".result");
const playerBtns = document.querySelectorAll(".main-btn");
const newGameBtn = document.querySelector("#new-game");

let ending;
let restart;

const scoreboard = {
  gamesPlayed: 0,
  numRounds: 0,
  playerScore: 0,
  cpuScore: 0,
};

playerBtns.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.value);
  });
});

newGameBtn.addEventListener("click", newGame);

newGame();

function playRound(playerSelection) {
  scoreboard.numRounds++;
  totalRounds.textContent = scoreboard.numRounds;
  let computerSelection = CHOICES[getComputerChoice(CHOICES)];
  if (playerSelection === computerSelection) {
    roundResults.textContent = "Tie round! No points.";
    endGameCheck(scoreboard.numRounds);
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

  endGameCheck(scoreboard.numRounds);
}

function newGame() {
  for (let property in scoreboard) {
    if (property === "gamesPlayed") {
      continue;
    } else {
      scoreboard[property] = 0;
    }
  }

  totalRounds.textContent = scoreboard.numRounds;
  playerResults.textContent = scoreboard.playerScore;
  cpuResults.textContent = scoreboard.cpuScore;
  totalGames.textContent = scoreboard.gamesPlayed;
  roundResults.textContent = "";

  playerBtns.forEach((button) => {
    button.disabled = false;
  });

  if (scoreboard.gamesPlayed !== 0) {
    ending.remove();
    restart.remove();
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

function endGameCheck(rounds) {
  if (rounds >= 5) {
    scoreboard.gamesPlayed++;
    totalGames.textContent = scoreboard.gamesPlayed;

    ending = document.createElement("p");
    restart = document.createElement("button");

    restart.textContent = "Play Again?";
    restart.classList.add("restart");

    ending.textContent = `Game Over: You won ${scoreboard.playerScore} out of ${rounds} rounds!`;
    ending.classList.add("result");

    playerBtns.forEach((button) => {
      button.disabled = true;
    });

    restart.addEventListener("click", newGame);

    wrapper.appendChild(ending);
    wrapper.appendChild(restart);
  }
}

function getComputerChoice(choices) {
  return Math.floor(Math.random() * choices.length);
}
