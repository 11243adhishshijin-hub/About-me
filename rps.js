let wins = 0;
let losses = 0;

function play(playerChoice) {

    const playerHand = document.getElementById("player-hand");
    const computerHand = document.getElementById("computer-hand");
    const resultElement = document.getElementById("result");

    const winsEl = document.getElementById("wins");
    const lossesEl = document.getElementById("losses");

    const emojis = {
        rock: "🪨",
        paper: "📄",
        scissors: "✂️"
    };

    playerHand.textContent = "✊";
    computerHand.textContent = "✊";

    playerHand.classList.add("shake");
    computerHand.classList.add("shake");

    resultElement.textContent = "Choosing...";

    setTimeout(() => {

        const choices = ["rock", "paper", "scissors"];
        const computerChoice = choices[Math.floor(Math.random() * 3)];

        playerHand.classList.remove("shake");
        computerHand.classList.remove("shake");

        playerHand.textContent = emojis[playerChoice];
        computerHand.textContent = emojis[computerChoice];

        let result;

        if (playerChoice === computerChoice) {

            result = "🤝 Draw";
            resultElement.style.color = "#facc15";

        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {

            result = "🎉 You Win!";
            resultElement.style.color = "#22c55e";
            wins++;

        } else {

            result = "😢 Computer Wins";
            resultElement.style.color = "#ef4444";
            losses++;
        }

        resultElement.textContent = result;

        document.getElementById("player-choice").textContent =
            "You: " + playerChoice;

        document.getElementById("computer-choice").textContent =
            "Computer: " + computerChoice;

        winsEl.textContent = wins;
        lossesEl.textContent = losses;

    }, 1200);
}