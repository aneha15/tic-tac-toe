function gameBoard() {
    let board = Array(9).fill('');

    const putMarker = (box, player) => {
        if (board[box] === '') {
            board[box] = player;
        } else {
            console.log('invalid');
        }
    }
    
    const reset = () => {
        board = Array(9).fill('');
    }

    const getBoard = () => board;

    return { putMarker, getBoard, reset };
}

const gameController = (function () {
    const board = gameBoard();
    const player = ['X', 'O'];
    let currentPlayer = player[0];

    const getBoard = () => board.getBoard();
    const reset = () => {
        board.reset();
        currentPlayer = player[0];
    }
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
            switchPlayer();
    }

    return { getCurrentPlayer, playRound, getBoard, reset, checkEnd };
})();

const displayController = function () {
    const gameboard = document.querySelector('#gameboard');
    const resetBtn = document.querySelector('#reset');

    const updateDisplay = () => {
        const board = gameController.getBoard();
        gameboard.textContent = '';
        const currentPlayer = gameController.getCurrentPlayer();
        const state = document.querySelector('#state');
        // render squares
        board.forEach((box, index) => {
            const square = document.createElement('button');
            square.classList.add('square');
            square.textContent = `${box}`;
            square.setAttribute('data', index);
            gameboard.appendChild(square);
        });

        const end = gameController.checkEnd();

        if (!end) {
            state.textContent = `Player ${currentPlayer}'s turn`;
        } else {
            gameboard.removeEventListener('click', squareClickHandler);
        }
    };

    const squareClickHandler = (e) => {
        const index = e.target.getAttribute('data');
        if (e.target.textContent !== '' || !index) return;
        gameController.playRound(index);
        updateDisplay();
    };

    gameboard.addEventListener('click', squareClickHandler);
    updateDisplay();

    resetBtn.addEventListener('click', () => {
        gameController.reset();
        updateDisplay();
        gameboard.addEventListener('click', squareClickHandler);
    });
};

displayController();

