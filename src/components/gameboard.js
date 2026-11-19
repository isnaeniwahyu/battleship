export default class GameBoard {
  // constructor
  constructor(rows = 9, columns = 9) {
    this.rows = rows;
    this.columns = columns;  

    // create 2D array
    this.boards = [];
    for (let i = 0; i < rows; i++) {
      this.boards.push(Array(columns).fill(null))
    }
  };  

  // print board
  getBoards() {
    return this.boards;
  };

  // place a ships
  placeShips(ships, r, c, direction = "horizontal") {
    if (
      !Number.isInteger(r) ||
      !Number.isInteger(c) ||
      !Number.isInteger(ships.size) ||
      ships.size <= 0 ||
      !["horizontal", "vertical"].includes(direction)
    ) {
      return false;
    }

    const positions = Array.from({ length: ships.size }, (_, offset) => ({
      row: r + (direction === "vertical" ? offset : 0),
      column: c + (direction === "horizontal" ? offset : 0),
    }));

    const isPositionAvailable = ({ row, column }) =>
      row >= 0 &&
      row < this.rows &&
      column >= 0 &&
      column < this.columns &&
      this.boards[row][column] === null;

    if (!positions.every(isPositionAvailable)) return false;

    positions.forEach(({ row, column }) => {
      this.boards[row][column] = ships.name;
    });
    return true;
  };

  // receive attacks
  receiveAttacks(x, y) {
    // check for overlaps/safe guard
    if (this.boards[x][y] === "X") return;

    // check if misses an attack 
    if(this.boards[x][y] === null) {
      this.boards[x][y] = ".";
    } else {
      this.boards[x][y] = "X"
    }
  };
};