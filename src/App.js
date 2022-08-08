import 'pattern.css/pattern.scss'
import './App.css';
import {directionUnitVector} from "./constants";
import {GenericCell} from "./GenericCell";
import {useEffect, useState} from "react";
import checkMoveCrate, {fillBoard, getInBoard} from "./board";

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

const firstCard = {
  green: [[3, 0], [0, 1]],
  yellow: [[4, 2]],
  red: [[1, 4]],
  start: [4, 2],
}

function move(player, direction, board, setGameState, gameState) {
  const [playerX, playerY] = player
  // try to move
  const [directionX, directionY] = directionUnitVector[direction];

  const [destX, destY] = [playerX + directionX, playerY + directionY]
  const destInBoard = getInBoard(destX, destY, board);
  if (!destInBoard) {
    console.log("move impossible! Out of bounds");
    return;
  }

  if (destInBoard.color) {
    setGameState({
      card: gameState.card,
      moves: gameState.moves,
      player: [destX, destY],
    })
    return;
  }
  // try to drop current crate
  const currentCrate = getInBoard(playerX, playerY, board)
  if (currentCrate.type !== "standing") {
    console.log("move impossible! crate already dropped");
    return;
  }
  if (checkMoveCrate(direction, currentCrate.color, player, board)) {
    setGameState({
      card: gameState.card,
      moves: [...gameState.moves, {
        box: [playerX, playerY],
        direction: direction,
      }],
      player: [destX, destY],
    })
  } else {
    console.log("move impossible! can't drop crate")
  }
}

function App() {
  const [gameState, setGameState] = useState({
    card: firstCard,
    player: firstCard.start,
    moves: [],
  })
  const board = fillBoard(gameState, 6, 6)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const direction = e.key.substring(5).toLowerCase();
        const player = gameState.player;
        move(player, direction, board, setGameState, gameState);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    }
  })
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
