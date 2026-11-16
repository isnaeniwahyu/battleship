// Components
import GameBoard from "./components/gameboard";
import Ships from "./components/ship";
// Pages
import { createPlayerCell, createEnemyCell } from "./pages/boards";
// import CreatePlayer from "./components/player";
import { placeShips } from "./event-handler/place-ship";
import { listOfShips } from "./pages/shipList";

// komponen untuk papan
const playerBoards = new GameBoard();
const enemyBoards = new GameBoard();

// render pages
// Ship list
listOfShips();

// Board
createPlayerCell(playerBoards.rows, playerBoards.columns);
createEnemyCell(enemyBoards.rows, enemyBoards.columns);
placeShips();
