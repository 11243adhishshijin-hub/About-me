/* THEME */
if (localStorage.getItem("theme") === "dark") {
document.body.classList.add("dark");
}

function toggleTheme() {
document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark") ? "dark" : "light"
);
}

/* VISITS */
let visits = localStorage.getItem("visits") || 0;
visits++;
localStorage.setItem("visits", visits);

let v = document.getElementById("visits");
if (v) v.innerText = "Visits: " + visits;

/* LOADER FIX */
window.addEventListener("load", () => {
const loader = document.getElementById("loader");
if (loader) loader.style.display = "none";
});

/* PARTICLES SAFE */
window.addEventListener("load", () => {
const el = document.getElementById("tsparticles");
if (!el || typeof tsParticles === "undefined") return;

tsParticles.load("tsparticles", {
fullScreen: { enable: false },
particles: {
number: { value: 40 },
color: { value: "#ff7300" },
move: { enable: true, speed: 1 },
opacity: { value: 0.4 },
size: { value: { min: 1, max: 3 } },
links: {
enable: true,
color: "#ff7300",
distance: 120
}
}
});
});

/* =========================
   TIC TAC TOE (FIXED)
========================= */

let difficulty = "hard";

function setDifficulty(value) {
    difficulty = value;
}

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const human = "X";
const ai = "O";

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function createBoard() {
    const boardDiv = document.getElementById("board");
    if (!boardDiv) return; // safety fix

    boardDiv.innerHTML = "";

    board.forEach((cell, index) => {
        const div = document.createElement("div");
        div.className = "cell";
        div.textContent = cell;

        if (cell === "X") div.classList.add("x");
        if (cell === "O") div.classList.add("o");

        div.addEventListener("click", () => handleMove(index));
        boardDiv.appendChild(div);
    });
}

function handleMove(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = human;
    createBoard();

    if (checkWinner(human)) return;

    if (!board.includes("")) {
        endGame("Draw 🤝");
        return;
    }

    setTimeout(aiMove, 250);
}

function aiMove() {

    let available = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") available.push(i);
    }

    if (available.length === 0) return;

    let move;

    if (difficulty === "easy") {

        move = available[Math.floor(Math.random() * available.length)];

    } else {

        move = getBestMove();
    }

    board[move] = ai;

    createBoard();

    if (checkWinner(ai)) return;

    if (!board.includes("")) {
        endGame("Draw 🤝");
    }
}

function getBestMove() {

    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            board[i] = ai;

            let score = minimax(board, 0, false);

            board[i] = "";

            if (score > bestScore) {

                bestScore = score;
                move = i;
            }
        }
    }

    return move;
}

function minimax(boardState, depth, isMaximizing) {

    if (winnerExists(ai)) return 10 - depth;
    if (winnerExists(human)) return depth - 10;
    if (!boardState.includes("")) return 0;

    if (isMaximizing) {

        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {

            if (boardState[i] === "") {

                boardState[i] = ai;

                let score = minimax(boardState, depth + 1, false);

                boardState[i] = "";

                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for (let i = 0; i < 9; i++) {

            if (boardState[i] === "") {

                boardState[i] = human;

                let score = minimax(boardState, depth + 1, true);

                boardState[i] = "";

                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}

function winnerExists(player) {

    return winPatterns.some(pattern => {

        const [a,b,c] = pattern;

        return (
            board[a] === player &&
            board[b] === player &&
            board[c] === player
        );
    });
}

function checkWinner(player) {
    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;

        if (board[a] === player &&
            board[b] === player &&
            board[c] === player) {

            highlightWin(pattern);
            endGame(player + " wins 🎉");
            return true;
        }
    }
    return false;
}

function highlightWin(pattern) {
    const cells = document.querySelectorAll(".cell");

    pattern.forEach(i => {
        if (cells[i]) {
            cells[i].style.background = "#22c55e";
            cells[i].style.color = "white";
            cells[i].style.transform = "scale(1.1)";
        }
    });
}

function endGame(message) {
    const status = document.getElementById("status");
    if (status) status.textContent = message;
    gameActive = false;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    const status = document.getElementById("status");
    if (status) status.textContent = "";

    createBoard();
}

/* IMPORTANT FIX */
window.addEventListener("load", createBoard);

/* =========================
   CALCULATOR (FIXED)
========================= */

function getDisplay() {
    return document.getElementById("display");
}

function append(value) {
    const display = getDisplay();
    if (!display) return;
    display.value += value;
}

function clearDisplay() {
    const display = getDisplay();
    if (!display) return;
    display.value = "";
}

function calculate() {
    const display = getDisplay();
    if (!display) return;

    try {
        // safer eval check
        const result = Function(
    `"use strict"; return (${display.value})`
)();

display.value = result;
    } catch (e) {
        display.value = "Error";
    }
}
