// placeships function

const placeShips = (e) => {
  // DOM
  const shipList = document.getElementById("ship-list");
  
  // event listener
  shipList.addEventListener("click", (e) => {
    const id = e.target.id;

    // C . flow
    if (id === "Submarine") console.log("Submarine Picked...");
    if (id === "Destroyer") console.log("Destroyer Picked...");
    if (id === "Battleship") console.log("Battleship Picked...");
    if (id === "PetrolBoat") console.log("Petrol Boat Picked...");
  })
}

export {placeShips};