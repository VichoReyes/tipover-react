import 'pattern.css/pattern.scss'
import './App.css';
import {colorLengths, directionUnitVector} from "./constants";
import {GenericCell} from "./GenericCell";
import {useEffect, useState} from "react";

/*
There are three different board representations, depending on
where they are used.

1. Card:

This is a representation of the initial board state, without having made any moves.
The priority is ease of writing:

{
  blue: [],
  green: [[3, 0], [0, 1]],
  yellow: [[4, 2]],
  red: [[1, 4]],
  start: [4, 2],
}

blue, green, yellow and red are lists of coordinates of the initial places of crates.
start is the coordinates of the initial location of the player.


2. Card + Moves + Player

This is the representation used in the Board's useState.

{
  card: (insert card representation here),
  moves: [
    {
      box: [4, 2],
      direction: "up",
    }, {
      box: [3, 0],
      direction: "left",
    }
  ],
  player: [0, 0] // current location
}


3. Generated table

From representation 2, the function fillBoard
generates a grid of squares. Each square is like

{
  color: "blue",
  coords: [3, 0],
  type: "standing" // or "fall-base" or "fall-top"
}

From this representation, the Board component is made.
 */

function fillBoard({card, moves, player}, width, height) {
  let board = [];
  for (let i = 0; i < width; i++) {
    let row = [];
    for (let j = 0; j < height; j++) {
      row.push({
        color: null,
        key: [j, i],
      });
    }
    board.push(row);
  }

  function getInBoard(x, y) {
    if (board.length > y && board[y].length > x) {
      return board[y][x];
    }
    return null;
  }

  function setInBoard(x, y, contents) {
    console.assert(board.length > y && board[y].length > x);
    board[y][x] = contents
  }

  function initializeAllOf(crateColor) {
    for (const coords of card[crateColor] || []) {
      if (!coords) {
        return
      }
      const [xCoord, yCoord] = coords
      setInBoard(xCoord, yCoord, {
        color: crateColor,
        key: coords,
        type: "standing",
      });
    }
  }

  for (const crateColor of ["blue", "green", "yellow", "red"]) {
    initializeAllOf(crateColor);
  }

  function moveCrate(coords, direction) {
    const [crateX, crateY] = coords;
    const crateInBoard = getInBoard(crateX, crateY);

    // we can only drop a crate if it's standing
    console.assert(crateInBoard.type === "standing")

    const [directionX, directionY] = directionUnitVector[direction];

    // check fallen locations for emptiness
    for (let i = 1; i <= colorLengths[crateInBoard.color]; i++) {
      const [destX, destY] = [crateX + i * directionX, crateY + i * directionY]
      const destInBoard = getInBoard(destX, destY);
      // make sure dest place exists and doesn't have contents
      console.assert(destInBoard && !destInBoard.color);
    }

    // checks passed, let's drop the crate
    for (let i = 1; i <= colorLengths[crateInBoard.color]; i++) {
      const [destX, destY] = [crateX + i * directionX, crateY + i * directionY]
      const destInBoard = getInBoard(destX, destY);
      destInBoard.color = crateInBoard.color
      destInBoard.type = (i === 1 ? "fall-base" : "fall-top");
    }
    crateInBoard.color = null;
    crateInBoard.type = null;
  }

  for (const {box, direction} of moves) {
    moveCrate(box, direction);
  }

  const [playerX, playerY] = player;
  board[playerY][playerX].playerHere = true
  return board;
}

const firstCard = {
  green: [[3, 0], [0, 1]],
  yellow: [[4, 2]],
  red: [[1, 4]],
  start: [4, 2],
}

function App() {
  const [gameState] = useState({
    card: firstCard,
    player: firstCard.start,
    moves: [{box: [4, 2], direction: "up"}, {box: [3, 0], direction: "left"}],
  })
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        console.log("importantKey")
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    }
  })
  const board = fillBoard(gameState, 6, 6)
  return (
    <div className="App">
      <header className="App-header">
        <div className="board-container">
          <table className="board-inner">
            <tbody>
            {board.map((row, i) => <tr key={`row_${i}`}>
              {row.map((cell) => <GenericCell {...cell} />)}
            </tr>)}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
