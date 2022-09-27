import Board from "./Board";
import {useState} from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";

function Congrats() {
  return <p className="text-3xl p-6">
    Congrats! You won!
  </p>;
}

export function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="relative w-full bg-gray-300 dark:bg-gray-900">
          <ul className="flex flex-row pl-3">
            <li className="p-4">
              <Link to="/">Home</Link>
            </li>
            <li className="p-4">
              <Link to="/users">Users</Link>
            </li>
            <li className="p-4">
              <a href="https://github.com/VichoReyes/tipover-react/">Source on GitHub</a>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/">
            <GameDriver />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export function GameDriver() {
  const [finished, setFinished] = useState(false);
  return (
    <div>
      <main className="flex flex-row content-center justify-center">
        {finished
          ? <Congrats/>
          : <Board finish={() => setFinished(true)}/>
        }
      </main>
    </div>
  )
}