/* =========================
   THEME
========================= */
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

/* =========================
   VISITS COUNTER
========================= */
let visits = localStorage.getItem("visits") || 0;
visits++;
localStorage.setItem("visits", visits);
document.getElementById("visits").innerText =
    "Visits: " + visits;

/* =========================
   TIC TAC TOE
========================= */
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let difficulty = "hard";

const human = "X";
const ai = "O";

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function createBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    board.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.innerText = cell;

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
    if (!board.includes("")) return endGame("Draw 🤝");

    setTimeout(aiMove, 300);
}

function aiMove() {
    let move;

    if (difficulty === "easy") {
        // EASY: random move
        let available = [];

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") available.push(i);
        }

        move = available[Math.floor(Math.random() * available.length)];

    } else {
        // HARD: minimax
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {
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
    }

    board[move] = ai;
    createBoard();

    if (checkWinner(ai)) return;
    if (!board.includes("")) endGame("Draw 🤝");
}
/* =========================
   MINIMAX AI
========================= */
function minimax(newBoard, depth, isMaximizing) {
    if (checkWin(ai, newBoard)) return 10 - depth;
    if (checkWin(human, newBoard)) return depth - 10;
    if (!newBoard.includes("")) return 0;

    if (isMaximizing) {
        let best = -Infinity;

        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = ai;
                best = Math.max(best, minimax(newBoard, depth + 1, false));
                newBoard[i] = "";
            }
        }

        return best;
    } else {
        let best = Infinity;

        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = human;
                best = Math.min(best, minimax(newBoard, depth + 1, true));
                newBoard[i] = "";
            }
        }

        return best;
    }
}

/* =========================
   WIN CHECK
========================= */
function checkWin(player, b = board) {
    return winPatterns.some(pattern =>
        pattern.every(i => b[i] === player)
    );
}

/* =========================
   WIN HIGHLIGHT (NEW)
========================= */
function getWinningPattern(player, b = board) {
    return winPatterns.find(pattern =>
        pattern.every(i => b[i] === player)
    );
}

function highlightWin(pattern) {
    const cells = document.querySelectorAll(".cell");

    pattern.forEach(i => {
        cells[i].style.background = "#22c55e";
        cells[i].style.color = "white";
        cells[i].style.transform = "scale(1.1)";
        cells[i].style.boxShadow = "0 0 15px #22c55e";
    });
}

/* =========================
   WINNER
========================= */
function checkWinner(player) {
    const winPattern = getWinningPattern(player);

    if (winPattern) {
        highlightWin(winPattern);
        endGame(player + " wins! 🎉");
        return true;
    }
    return false;
}

/* =========================
   GAME END
========================= */
function endGame(message) {
    document.getElementById("status").innerText = message;
    gameActive = false;
}

/* =========================
   RESET GAME
========================= */
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    document.getElementById("status").innerText = "";
    createBoard();
}

/* =========================
   START GAME
========================= */
createBoard();

/* =========================
   CALCULATOR
========================= */
function append(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculate() {
    try {
        document.getElementById("display").value =
            eval(document.getElementById("display").value);
    } catch {
        document.getElementById("display").value = "Error";
    }
}

function setDifficulty(level) {
    difficulty = level;
}