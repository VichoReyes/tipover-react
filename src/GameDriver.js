import {useState} from "react";
import Board from "./Board";
import {Link, useParams} from "react-router-dom";
import {cards} from "./cards";

function Congrats() {
  return <>
    <p className="text-3xl p-6">
      Congrats! You won!
    </p>
    <Link to="/levels">Back to levels</Link>
  </>;
}

export function GameDriver() {
  const {level_id} = useParams();
  const card = cards[Number.parseInt(level_id)];
  const [finished, setFinished] = useState(false);
  return (
    <main className="flex flex-row content-center justify-center">
      {finished
        ? <Congrats/>
        : <Board finish={() => setFinished(true)} card={card}/>
      }
    </main>
  )
}