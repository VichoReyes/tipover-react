import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {GameDriver} from "./GameDriver";

function LevelsList() {
  return <ol className="m-20 list-decimal">
    <li><Link to="/levels/0">Level 1</Link></li>
  </ol>;
}

function HowToPlay() {
  return <p>how to play</p>;
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

