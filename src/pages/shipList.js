import Ships from "../components/ship";


// Create a function of listing ships
const listOfShips = () => {
    // create a list of ships.
    const ships = [
        new Ships ("Submarine"),
        new Ships ("Destroyer"),
        new Ships ("Battleship"),
        new Ships ("Petrol-Boat"),
    ];

    // DOM
    const shipList = document.getElementById("ship-list");
    
    // forEach looping through ship
    ships.forEach((ship) => {
        const li = document.createElement("li");
        li.id = ship.name;
        li.textContent = ship.name;
        li.classList.add("mb-2");

        // append shiplist child to li
        shipList.appendChild(li);
    })
};

export {listOfShips};