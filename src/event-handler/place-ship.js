import Ships from "../components/ship";

// placeships function
const placeShips = (e) => {
  // DOM
  const shipList = document.getElementById("ship-list");
  let isPicked = false;
  
  // event listener
  shipList.addEventListener("click", (e) => {
    const id = e.target.id;
    isPicked = true;
    // C . flow
    // Submarine
    if (id === "Submarine") {
      while(isPicked) {
        const ships = new Ships('Submarine');
        console.log(`Selecting ${ships.name}...`);
        isPicked = false;
        return;
      }
    }

    // Destroyer
    if (id === "Destroyer") {
      while(isPicked) {
        const ships = new Ships('Destroyer');
        console.log(`Selecting ${ships.name}...`);
        isPicked = false;
        return;
      }
    }

    // Battleship
    if (id === "Battleship") {
      while(isPicked) {
        const ships = new Ships('Battleship');
        console.log(`Selecting ${ships.name}...`);
        isPicked = false;
        return;
      }
    }

    // Petrol Boat
    if (id === "PetrolBoat") {
      while(isPicked) {
        const ships = new Ships('PetrolBoat');
        console.log(`Selecting ${ships.name}...`);
        isPicked = false;
        return;
      }
    }
  })
}

export {placeShips};