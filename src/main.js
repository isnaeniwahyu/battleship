import GameBoard from "./components/gameboard";
// square
import { createPlayerCell, createEnemyCell } from "./pages/boards";

import Ships from "./components/ship";
import CreatePlayer from "./components/player";
import { placeShips } from "./event-handler/place-ship";

// komponen untuk papan
const playerBoards = new GameBoard();
const enemyBoards = new GameBoard();

// render pages
createPlayerCell(playerBoards.rows, playerBoards.columns);
createEnemyCell(enemyBoards.rows, enemyBoards.columns);
placeShips();
