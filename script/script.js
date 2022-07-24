
const CHOICES = ["ROCK", "PAPER", "SCISSORS"];
const totalRounds = parseInt(prompt("How many rounds would you like to play?"));

game(totalRounds);

function game(rounds) {
    let playerScore = 0;
    let roundsPlayed = 1;
    for (let i = 0; i < rounds; i++) {
        console.log(`Round: ${roundsPlayed}  Score: ${playerScore}`);

        let playerSelection = getPlayerChoice(CHOICES);
        console.log(`Player: ${playerSelection}`);

        let computerSelection = CHOICES[getComputerChoice(CHOICES)];
        console.log(`Computer: ${computerSelection}`);

        playerScore += playRound(playerSelection, computerSelection);
        roundsPlayed++;
    }

    alert(`You won ${playerScore} out of ${rounds} rounds.`);
}

function getPlayerChoice(choices) {
    let validChoice = false;
    while(!validChoice) {
        let userInput = prompt("Make your choice. Type ROCK, PAPER, or SCISSORS").toUpperCase();
        if (choices.includes(userInput)) {
            return userInput;
        } else {
            alert("Please enter a valid selection.");
        }
    }
} 

function getComputerChoice(choices) {
    return Math.floor(Math.random() * choices.length);
}

function playRound(playerSelection, computerSelection) {

    if (playerSelection === computerSelection) {
        alert("Tie round!");
        return 0;
    }

    let playerWon = false;
    switch(playerSelection) {
        case "ROCK":
            if (computerSelection === "SCISSORS") 
            {
                playerWon = true;
            }
            break;
        case "PAPER":
            if (computerSelection === "ROCK")
            {
                playerWon = true;
            }
            break;
        case "SCISSORS":
            if (computerSelection === "PAPER")
            {
                playerWon = true;
            }
    }

    if (playerWon) {
        alert(`You win! ${playerSelection} beats ${computerSelection}.`);
        return 1;
    } else {
        alert(`You Lose! ${computerSelection} beats ${playerSelection}.`);
        return 0;
    }
}