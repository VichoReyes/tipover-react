import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {GameDriver} from "./GameDriver";
import {cards} from "./cards";

function LevelsList() {
  return <main className="max-w-2xl mx-auto my-8">
    <h1 className="text-3xl">
      Levels
    </h1>
    <ol className="mt-8 grid grid-cols-8 gap-4">
      {cards.map((_, i) =>
        <Link to={`/levels/${i}`}>
          <li className="border border-4 rounded-lg p-3">
            <div className="w-fit mx-auto">
              {i + 1}
            </div>
          </li>
        </Link>
      )}
    </ol>
  </main>;
}

function HowToPlay() {
  return <main className="max-w-2xl mx-auto my-8">
    <h1 className="text-3xl">
      How to Play
    </h1>
    <p>
      The objective of the game is to get to the red crate.
      You can use the arrow keys to move around on crates, and if you can, you'll drop
      those crates to make more walkable way.
    </p>
    <p>
      Crates have different colors depending on their height.
      Yellow crates are 2 squares tall, green crates are 3 squares and blue crates are 4 squares tall.
    </p>
    <p>
      The easiest way to understand it is to
      {' '}
      <Link to="/levels/0" className="text-blue-600 underline">
        play the first level
      </Link>.
    </p>
  </main>;
}

export function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="relative w-full bg-gray-300 dark:bg-gray-900">
          <ul className="flex flex-row pl-3">
            <li className="p-4">
              <Link to="/">How to Play</Link>
            </li>
            <li className="p-4">
              <Link to="/levels">All Levels</Link>
            </li>
            <li className="p-4">
              <a href="https://github.com/VichoReyes/tipover-react/">Source on GitHub</a>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/levels/:level_id" children={<GameDriver/>}/>
          <Route path="/levels">
            <LevelsList/>
          </Route>
          <Route path="/">
            <HowToPlay/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

