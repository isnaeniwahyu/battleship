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
  placeShips (ships, r, c, direction = "horizontal") {
    // check for overlaps first
    if (this.boards[r][c] !== null) return;
    let col =  c;
    let row = r;      
    // horizontal handle
    if (direction === "horizontal") {        
      for (let i = 0; i < ships.size; i++) {      
        this.boards[row][col] = ships.name;
        col++;        
      }
    } else if (direction === "vertical") {
        for (let i = 0; i < ships.size; i++) {
          this.boards[row][col] = ships.name;
          row++;
        }
    }
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