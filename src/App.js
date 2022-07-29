import './App.css';

const firstCard = {
  green: [[3, 0], [0, 1]],
  yellow: [[4, 2]],
  red: [[1, 4]],
  start: [4, 2],
}

function GenericCell({color}) {
  let style = {borderColor: "#787878"};

  if (color) {
    style.borderColor = color
  }
  return <td style={style}></td>;
}

function genBoard(width, height) {
  let board = [];
  for (let i = 0; i < width; i++) {
    let row = [];
    for (let j = 0; j < height; j++) {
      row.push(<GenericCell key={[j, i]}></GenericCell>);
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
      board[yCoord][xCoord] = <GenericCell color={crateColor} key={coords}></GenericCell>
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
              {row.map((cell) => cell)}
            </tr>)}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
