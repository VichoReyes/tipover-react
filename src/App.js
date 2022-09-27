import 'bootstrap/dist/css/bootstrap.min.css';
import Board from "./Board";
import './App.css';
import {useState} from "react";

function Congrats() {
  return <p>
    Congrats! You won!
  </p>;
}

export function App() {
  const [finished, setFinished] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        {finished
          ? <Congrats/>
          : <Board finish={() => setFinished(true)}/>
        }
      </header>
    </div>
  )
}