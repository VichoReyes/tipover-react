import Board from "./Board";
import {useState} from "react";

function Congrats() {
  return <p className="text-3xl p-6">
    Congrats! You won!
  </p>;
}

export function App() {
  const [finished, setFinished] = useState(false);
  return (
    <div className="dark:text-gray-200 dark:bg-gray-800 text-gray-800 bg-gray-100">
      <main className="min-h-screen flex flex-row content-center justify-center">
        {finished
          ? <Congrats/>
          : <Board finish={() => setFinished(true)}/>
        }
      </main>
    </div>
  )
}