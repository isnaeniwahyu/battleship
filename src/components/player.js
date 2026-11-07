export default class CreatePlayer {
  playerBoards = {};
  // constructor
  constructor(name) {
    this.name = name;
  }

  // create player board
  createBoard(gameboard) {
    return (this.getPlayerBoards = gameboard);
  }

  // print players board
  getPlayerBoards() {
    return this.playerBoards;
  }
}

// bots
class Bots {
  botBoards = {};
  // constructor
  constructor() {
    this.name = "BOTS";
  }

  // create bots board
  createBoards(gameboard) {
    return (this.botBoards = gameboard);
  }

  // print bots board
  getBotBoards() {
    return this.botBoards;
  }
}

export { Bots };
