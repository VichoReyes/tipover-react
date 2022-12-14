import 'pattern.css/pattern.scss'
import {directionUnitVector} from "./constants";
import {GenericCell} from "./GenericCell";
import {useEffect, useState} from "react";
import checkMoveCrate, {fillBoard, getInBoard} from "./boardUtil";
import {FaChevronCircleDown, FaChevronCircleLeft, FaChevronCircleRight, FaChevronCircleUp} from "react-icons/fa";

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

function rollback_to(move_before, move_index, gameState, setGameState) {
  setGameState({
    card: gameState.card,
    player: move_before.box,
    moves: gameState.moves.slice(0, move_index),
  })
}

function DPad({dPadHandler}) {
  return (
    <div className="grid grid-cols-3 gap-2 w-fit self-center m-3
      bg-gray-300 dark:bg-gray-600 rounded-full text-4xl lg:hidden">
      <button className="col-start-2 active:text-blue-600" onClick={dPadHandler('up')}>
        <FaChevronCircleUp/>
      </button>
      <button className="col-start-1 active:text-blue-600" onClick={dPadHandler('left')}>
        <FaChevronCircleLeft/>
      </button>
      <button className="col-start-3 active:text-blue-600" onClick={dPadHandler('right')}>
        <FaChevronCircleRight/>
      </button>
      <button className="col-start-2 active:text-blue-600" onClick={dPadHandler('down')}>
        <FaChevronCircleDown/>
      </button>
    </div>
  );
}

function Board({finish, card}) {
  const [gameState, setGameState] = useState({
    card: card,
    player: card.start,
    moves: [],
  })
  if (gameState.player[0] === gameState.card.red[0][0]
    && gameState.player[1] === gameState.card.red[0][1]) {
    finish()
  }
  const board = fillBoard(gameState, 6, 6)

  function handleDPad(direction) {
    return function () {
      const player = gameState.player;
      move(player, direction, board, setGameState, gameState);
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const direction = e.key.substring(5).toLowerCase();
        const player = gameState.player;
        move(player, direction, board, setGameState, gameState);
        e.preventDefault();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    }
  })
  return (
    <>
      <div className="p-8 flex flex-col md:flex-row content-center">
        <table className="bg-gray-800 border-separate h-fit w-fit">
          <tbody>
          {board.map((row, i) => <tr key={`row_${i}`}>
            {row.map((cell) => <GenericCell {...cell} />)}
          </tr>)}
          </tbody>
        </table>
        <DPad dPadHandler={handleDPad}/>
        <UndoList gameState={gameState} setGameState={setGameState}/>
      </div>
    </>
  );
}

function UndoList({gameState, setGameState}) {
  return (
    <div className="ml-4 w-36">
      <h3>Undo:</h3>
      <ol>
        {gameState.moves.map((aMove, i) =>
          <li key={`move_${i}`}>
            <button className="my-1 p-1 border border-gray-400 rounded hover:bg-blue-400"
                    onClick={() => rollback_to(aMove, i, gameState, setGameState)}>
              {aMove.box[0] + 1}, {aMove.box[1] + 1} {aMove.direction}
            </button>
          </li>
        )}
      </ol>
    </div>
  )
}

export default Board;
