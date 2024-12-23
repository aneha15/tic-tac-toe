function gameBoard() {
    let board = Array(9).fill('');

    const putMarker = (box, player) => {
        if (board[box] === '') {
            board[box] = player;
        } else {
            console.log('invalid');
        }
    }
    const getBoard = () => board;

    return { putMarker, getBoard };
}

const gameController = function () {
    const board = gameBoard();
    let isGameOver = false;
    const player = ['X', 'O'];
    let currentPlayer = player[0];

    const getBoard = () => board.getBoard();

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === player[0]) ? player[1] : player[0];
    };

    const getCurrentPlayer = () => currentPlayer;

    const checkEnd = () => {
        const state = document.querySelector('#state');
        boardArr = board.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 7], [2, 4, 6]
        ];

        function checkWin(arr) {
            const [x, y, z] = arr;
            return (boardArr[x] && boardArr[x] === boardArr[y] && boardArr[y] === boardArr[z]);
        }

        const win = winPatterns.some(arr => checkWin(arr));
        const isFull = boardArr.every(square => square !== '');

        if (win || isFull) {
            if (win) {
                state.textContent = `Player ${currentPlayer} wins`;
            } else {
                state.textContent = `It's a tie`;
            }
            return true;
        } else {
            return false;
        }
    };

    const playRound = (box) => {
        // put marker
        board.putMarker(box, getCurrentPlayer());

        // switch player
        const end = checkEnd();
        if (!end) {
            switchPlayer();
        } 
    }

    return { getCurrentPlayer, playRound, getBoard, checkEnd };
};

const displayController = function () {
    const game = gameController();
    const gameboard = document.querySelector('#gameboard');
    const reset = document.querySelector('#reset');

    const updateDisplay = () => {
        const board = game.getBoard();
        gameboard.textContent = '';
        const currentPlayer = game.getCurrentPlayer();
        const state = document.querySelector('#state');
        // render squares
        board.forEach((box, index) => {
            const square = document.createElement('button');
            square.classList.add('square');
            square.textContent = `${box}`;
            square.setAttribute('data', index);
            gameboard.appendChild(square);
        });

        const end = game.checkEnd();

        if (!end) {
            state.textContent = `Player ${currentPlayer}'s turn`;
        } else {
            gameboard.removeEventListener('click', squareClickHandler);
        }
    };

    const squareClickHandler = (e) => {
        const index = e.target.getAttribute('data');
        if (e.target.textContent !== '' || !index) return;

        game.playRound(index);
        updateDisplay();
    };

    gameboard.addEventListener('click', squareClickHandler);
    updateDisplay();
};

displayController();

