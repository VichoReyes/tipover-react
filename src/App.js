import 'pattern.css/pattern.scss'
import './App.css';

const firstCard = {
  green: [[3, 0], [0, 1]],
  yellow: [[4, 2]],
  red: [[1, 4]],
  start: [4, 2],
}

const darkColors = {
  green: "darkgreen",
  red: "darkred",
  yellow: "darkorange",
  blue: "darkblue",
}

function GenericCell({color, type}) {
  let style = {borderColor: "#787878"};
  let className = ""

  if (color) {
    style.borderColor = color

    if (type === "standing") {
      style.color = color
      style.backgroundColor = darkColors[color]
      className = "pattern-triangles-sm"
    } else if (type === "fall-base") {
      style.backgroundColor = darkColors[color]
    }
  }
  return <td style={style} className={className}></td>;
}

function genBoard(width, height) {
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
  const card = firstCard;

  function initializeAllOf(crateColor) {
    for (const coords of card[crateColor] || []) {
      if (!coords) {
        return
      }
      const [xCoord, yCoord] = coords
      board[yCoord][xCoord] = {
        color: crateColor,
        key: coords,
        type: "standing",
      }
    }
  }

  for (const crateColor of ["blue", "green", "yellow", "red"]) {
    initializeAllOf(crateColor);
  }
  return board;
}

function App() {
  const board = genBoard(6, 6);
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
