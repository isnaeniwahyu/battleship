export default class GameBoard {
  // constructor
  constructor(rows = 9, columns = 9) {
    this.rows = rows;
    this.columns = columns;  

    // create 2D array
    this.boards = [];
    for (let i = 0; i < rows; i++) {
      this.boards.push(Array(columns).fill(null));
    }
    this.attacks = Array.from({ length: rows }, () => Array(columns).fill(false));
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
    if (
      !Number.isInteger(x) ||
      !Number.isInteger(y) ||
      x < 0 ||
      x >= this.rows ||
      y < 0 ||
      y >= this.columns
    ) {
      return null;
    }

    if (this.attacks[x][y]) return { alreadyAttacked: true, hit: false };

    this.attacks[x][y] = true;
    const ship = this.boards[x][y];
    return { alreadyAttacked: false, hit: ship !== null, ship };
  };
};