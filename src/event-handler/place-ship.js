import GameBoard from "../components/gameboard";
import Ships from "../components/ship";

const shipsName = ["Submarine", "Destroyer", "Battleship", "PetrolBoat"];

// event listeners func
function initShipSelector() {
    const shipList = document.getElementById("ship-list");
    
    // listener
    shipList.addEventListener("click", (e) => {
        const id = e.target.id;
        
        // check if id containts ships name
        if (shipsName.includes(id)){
            console.log(`Selecting ${id}...`);
        }
    })
};

export {initShipSelector};