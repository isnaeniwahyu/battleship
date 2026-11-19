// --------------IMPORTS--------------
// Components
import GameBoard from "./components/gameboard";
import Ships from "./components/ship";
// Pages
import { createPlayerCell, createEnemyCell } from "./pages/boards";
import { listOfShips } from "./pages/shipList";
// Handler
import { initShipSelector } from "./event-handler/place-ship";

// komponen untuk papan
const playerBoards = new GameBoard();
const enemyBoards = new GameBoard();

// render pages
// Ship list
listOfShips();
// Board
createPlayerCell(playerBoards.rows, playerBoards.columns);
createEnemyCell(enemyBoards.rows, enemyBoards.columns);
// handler
initShipSelector(playerBoards);
