import {HashRouter, Link, Route, Switch} from "react-router-dom";
import {GameDriver} from "./GameDriver";
import {card_ids} from "./cards";

function LevelsList() {
  return (
    <main className="max-w-2xl mx-auto my-8 p-2">
      <h1 className="text-3xl">
        Levels
      </h1>
      <ol className="mt-8 grid grid-cols-5 gap-4">
        {card_ids.map((level_id) => {
          const isCompleted = localStorage.getItem(`tipover-level-${level_id}`) === "finished";
          const completedStyle = "bg-green-200 text-green-900 border-green-300 " +
            "dark:bg-green-800 dark:text-green-200 dark: border-green-600 line-through";
          return (
            <Link to={`/levels/${level_id}`}>
              <li className={`border border-4 rounded-lg p-3 ${isCompleted ? completedStyle : ""}`}>
                <div className="w-fit mx-auto">
                  {level_id}
                </div>
              </li>
            </Link>
          );
        })}
      </ol>
    </main>
  );
}

function HowToPlay() {
  return <main className="max-w-2xl mx-auto my-8 p-2">
    <h1 className="text-3xl">
      How to Play
    </h1>
    <p className="my-1">
      The objective of the game is to get to the red crate.
      You can use the arrow keys to move around on adjacent crates.
      You can't walk over empty (grey) sectors,
      but you can drop crates on top of them, if there's enough space.
    </p>
    <p className="my-1">
      Crates have different colors depending on their height.
      Yellow crates are 2 squares tall, green crates are 3 squares and blue crates are 4 squares tall.
      Check out the top right corner if you forget.
    </p>
    <p>
      The easiest way to understand it is to
      {' '}
      <Link to="/levels/1" className="text-blue-600 dark:text-blue-400 underline">
        play the first level
      </Link>.
    </p>
  </main>;
}

function NavBar() {
  return <nav className="relative w-full bg-gray-300 dark:bg-gray-900 flex flex-row text-sm xs:text-base">
    <ul className="flex flex-row m-4 gap-4">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/levels">Levels</Link>
      </li>
      <li className="hidden sm:block">
        <a href="https://github.com/VichoReyes/tipover-react/">Source on GitHub</a>
      </li>
    </ul>

    <ul className="ml-auto m-4 flex flex-row gap-2 items-center">
      <li className="h-5 w-5 bg-yellow-400 rounded-full border border-gray-600" />
      <li>
        = 2
      </li>
      <li className="h-5 w-5 bg-green-500 rounded-full border border-gray-600" />
      <li>
        = 3
      </li>
      <li className="h-5 w-5 bg-blue-600 rounded-full border border-gray-600" />
      <li>
        = 4
      </li>
    </ul>
  </nav>;
}

export function App() {
  return (
    <HashRouter>
      <div>
        <NavBar />
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
    </HashRouter>
  );
}

