import Ships from "../components/ship";
// create a list of ships.
const ships = [
    new Ships ("Submarine"),
    new Ships ("Destroyer"),
    new Ships ("Battleship"),
    new Ships ("Petrol-Boat"),
];

// Create a function of listing ships
const listOfShips = () => {
    // DOM
    const shipList = document.getElementById("ship-list");
    
    // forEach looping through ship
    ships.forEach((ship) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.id = ship.name;
        button.dataset.ship = "true";
        button.setAttribute("aria-pressed", "false");
        button.className =
            "flex cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400";
        const name = document.createElement("span");
        name.textContent = ship.name;
        const size = document.createElement("span");
        size.textContent = `${ship.size} cells`;
        size.className = "text-xs font-medium text-slate-500";
        button.append(name, size);
        li.append(button);

        // append shiplist child to li
        shipList.appendChild(li);
    });
};

export {listOfShips, ships};