import {colorLengths, directionUnitVector} from "./constants";

export function getInBoard(x, y, board) {
  if (0 <= y && y < board.length && 0 <= x && x < board[y].length) {
    return board[y][x];
  }
  return null;
}

function setInBoard(x, y, board, contents) {
  console.assert(0 <= y && y < board.length && 0 <= x && x < board[y].length);
  board[y][x] = contents
}

export default function checkMoveCrate(direction, crateColor, crateCoords, board) {
  const [crateX, crateY] = crateCoords;
  const [directionX, directionY] = directionUnitVector[direction];

  for (let i = 1; i <= colorLengths[crateColor]; i++) {
    const [destX, destY] = [crateX + i * directionX, crateY + i * directionY]
    const destInBoard = getInBoard(destX, destY, board);
    // make sure dest place exists and doesn't have contents
    if (!destInBoard || !!destInBoard.color) {
      return false
    }
  }
  return true;
}

export function fillBoard({card, moves, player}, width, height) {
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

  function initializeAllOf(crateColor) {
    for (const coords of card[crateColor] || []) {
      if (!coords) {
        return
      }
      const [xCoord, yCoord] = coords
      setInBoard(xCoord, yCoord, board, {
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
    const crateInBoard = getInBoard(crateX, crateY, board);

    // we can only drop a crate if it's standing
    console.assert(crateInBoard.type === "standing")
    const [directionX, directionY] = directionUnitVector[direction];
    const canMove = checkMoveCrate(direction, crateInBoard.color, coords, board);
    console.assert(canMove);

    // checks passed, let's drop the crate
    for (let i = 1; i <= colorLengths[crateInBoard.color]; i++) {
      const [destX, destY] = [crateX + i * directionX, crateY + i * directionY]
      const destInBoard = getInBoard(destX, destY, board);
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