const gameBoard = document.getElementById("game-board");
const resultDisplay = document.getElementById("result");
const resetBtn = document.getElementById("reset-btn");

let board = Array(9).fill(null);
let player = "X";
let endGame = null;

const WINNER_COMBOS = [
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a , b , c] = combo;
    if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c] ){
      return boardToCheck[a]
    }
  }

  return null;
};

const checkTieGame = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null);
}

const handleClick = (index) => {

  if(endGame) return;

  if(board[index]) return;
  
  if(player === "X"){
    board[index] = "X"
    player = "O"
  }else{
    board[index] = "O"
    player = "X"
  }
  
  gameBoard.innerHTML = "";
  createBoard()
  
  if(checkWinner(board)){
    gameBoard.innerHTML = "";
    createBoard()
    endGame = checkWinner(board);
    return resultDisplay.textContent = `Result: Player ${endGame} Win!!`
  } else if(checkTieGame(board)){
    return resultDisplay.textContent = `Result: Draw game`
  }
}

const createBoard = () => {
  return board.map( (element, index) => {
    const square = document.createElement("div");
    square.innerHTML = `<div class="square" onclick="handleClick(${index})">${!element ? "" : element}</div>`;
    gameBoard.appendChild(square);
  } )
};

resetBtn.addEventListener("click", () => {
  board = Array(9).fill(null);
  gameBoard.innerHTML = "";
  resultDisplay.innerHTML = "Result: ";
  player = "X"
  return createBoard(board);
})

createBoard(board)  