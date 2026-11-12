import GameBoard from "./components/gameboard";
// square
import { createPlayerCell, createEnemyCell } from "./pages/boards";

import Ships from "./components/ship";
import CreatePlayer from "./components/player";

// komponen untuk papan
const boards = new GameBoard();

// render pages
createPlayerCell(boards.rows, boards.columns);
createEnemyCell(boards.rows, boards.columns);
