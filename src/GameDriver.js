import {useState} from "react";
import Board from "./Board";
import {Link, useParams} from "react-router-dom";
import {cards} from "./cards";

function Congrats() {
  return <>
    <p className="text-3xl p-6">
      Congrats! You won!
    </p>
    <Link className="mx-auto block w-fit border rounded p-1" to="/levels">Back to levels</Link>
  </>;
}

export function GameDriver() {
  const {level_id} = useParams();
  const [finished, setFinished] = useState(false);
  const card = cards[Number.parseInt(level_id)];
  if (!card) {
    return <p>404 error (TODO: make it a real status code error)</p>
  }
  return (
    <main className="mx-auto w-fit">
      {finished
        ? <Congrats/>
        : <Board finish={() => setFinished(true)} card={card}/>
      }
    </main>
  )
}