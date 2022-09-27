import Board from "./Board";
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
      <header className="min-h-screen flex flex-row content-center justify-center bg-gray-600">
        {finished
          ? <Congrats/>
          : <Board finish={() => setFinished(true)}/>
        }
      </header>
    </div>
  )
}