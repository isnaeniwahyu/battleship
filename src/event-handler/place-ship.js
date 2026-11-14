import GameBoard from "../components/gameboard";
import Ships from "../components/ship";

// placeships function to drag
const shipList = document.getElementById("ship-list");
const gameboard = new GameBoard();

shipList.addEventListener("click", (e) => {
  // get the ship id
  const id = e.target.id;
  let isActive = false;

  if (id === "Submarine") {
    isActive = true;
    while (isActive) {
      gameboard.placeShips();
    }
    console.log("Submarine selected...");
  }
});
