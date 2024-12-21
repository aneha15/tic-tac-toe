function gameBoard() {

    let board = Array(9).fill("");


    const putMarker = (box, player) => {
        if (board[box] === "") {
            board[box] = player;
        } else {
            console.log('invalid');
        }
    }
const checkEnd = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 7], [2, 4, 6]
    ];

        winPatterns.forEach(array => {
            const [x, y, z] = array;
            if(board[x] && board[x] === board[y] && board[y] === board[z] ) {
                console.log(`${board[x]} wins`);
                return true;
            } 
        });


   const isFull = board.every(square => square !== "");
   if (isFull) {
     console.log(`It's as draw`);
     return true;
   }

   return false;
};

    const printBoard = () => console.log(board);

    return { putMarker, printBoard, checkEnd };

}

const gameController = (function () {
    const board = gameBoard();
    let isGameOver = false;
    const player = ['X', 'O'];

    let currentPlayer = player[0];

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === player[0]) ? player[1] : player[0];
    };

    const getCurrentPlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${currentPlayer}'s turn`);
    };

    const playRound = (box, currentPlayer) => {
        // put marker
        board.putMarker(box, currentPlayer);

        // check for win
        isGameOver = board.checkEnd();
        // switch player
        if(!isGameOver) {
        switchPlayer();
        // print new round
        printNewRound();
        } else {
            console.log(`Game over`);
        }
    };

    return { playRound, printNewRound };

})();

// const displayController = function () {

// };

// gameController.playRound(0, 'X');
// gameController.playRound(8, 'O');
// gameController.playRound(1, 'X');
// gameController.playRound(7, 'O');
// gameController.playRound(2, 'X');

// gameController.playRound(0, 'X');
// gameController.playRound(1, 'O');
// gameController.playRound(2, 'X');
// gameController.playRound(3, 'O');
// gameController.playRound(4, 'X');
// gameController.playRound(6, 'O');
// gameController.playRound(7, 'X');
// gameController.playRound(8, 'O');
// gameController.playRound(5, 'X');






// function Square() {
//     let value = " ";

//     const addMarker = (marker) => value = marker;
//     const getValue = () => value;

//     return { addMarker, getValue };
// }

// winPatterns.some(array => {
       
//     const crossWins = array.every(elem => {
        
//         (board.getBoard())[elem] === 'X'

//     });
//     console.log(crossWins);
//     if (crossWins) {
//         console.log('cross wins');
//     }
// });