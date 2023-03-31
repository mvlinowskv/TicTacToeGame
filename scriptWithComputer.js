const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];
const cells = document.querySelectorAll('td');
let currentPlayer;
let gameActive;

startGame();

function startGame() {
    currentPlayer = X_CLASS;
    gameActive = true;
    document.getElementById('message').innerText = "It's your turn!";
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(event) {
    const cell = event.target;
    if (!gameActive || cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
        return;
    }
    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
    }
    if (gameActive) {
        setTimeout(function() {
            computerMove();
        }, 500);
    }
}

function placeMark(cell, player) {
    cell.classList.add(player);
    cell.innerText = player;
}

function swapTurn() {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
    document.getElementById('message').innerText = currentPlayer + " turn!";
}

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index - 1].classList.contains(player);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        document.getElementById('message').innerText = "Draw!";
    } else {
        document.getElementById('message').innerText = currentPlayer + " wins!";
    }
}

function computerMove() {
    const emptyCells = [];
    cells.forEach(cell => {
        if (!cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)) {
            emptyCells.push(cell);
        }
    });
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];
    placeMark(cell, O_CLASS);
    if (checkWin(O_CLASS)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
    }
}