import { ships } from "../pages/shipList";

function initShipSelector(gameBoard) {
    const shipList = document.getElementById("ship-list");
    const playerGrid = document.getElementById("player-grid");

    if (!shipList || !playerGrid) {
        throw new Error("Ship list and player grid must exist before initializing ship placement.");
    }

    let selectedShip = null;
    const placedShips = new Set();

    const getCell = (target) => {
        if (!(target instanceof Element)) return null;
        const cell = target.closest("[data-x][data-y]");
        return cell && playerGrid.contains(cell) ? cell : null;
    };

    const getPositions = (row, column, ship) =>
        Array.from({ length: ship.size }, (_, offset) => ({
            row,
            column: column + offset,
        }));

    const isPositionValid = (position) =>
        position.row >= 0 &&
        position.row < gameBoard.rows &&
        position.column >= 0 &&
        position.column < gameBoard.columns &&
        gameBoard.getBoards()[position.row][position.column] === null;

    const clearPreview = () => {
        playerGrid.querySelectorAll("[data-placement-preview]").forEach((cell) => {
            cell.classList.remove("bg-gray-500", "bg-red-500");
            delete cell.dataset.placementPreview;
        });
    };

    const showPreview = (row, column) => {
        clearPreview();
        const positions = getPositions(row, column, selectedShip);
        const valid = positions.every(isPositionValid);

        positions.forEach((position) => {
            if (
                position.row < 0 ||
                position.row >= gameBoard.rows ||
                position.column < 0 ||
                position.column >= gameBoard.columns
            ) {
                return;
            }

            const cell = playerGrid.querySelector(
                `[data-x="${position.row}"][data-y="${position.column}"]`,
            );
            if (cell) {
                cell.dataset.placementPreview = "true";
                cell.classList.add(valid ? "bg-gray-500" : "bg-red-500");
            }
        });
    };

    shipList.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const item = event.target.closest("li");
        if (!item || !shipList.contains(item)) return;

        const ship = ships.find((candidate) => candidate.name === item.id);
        if (!ship || placedShips.has(ship.name)) return;

        selectedShip = selectedShip === ship ? null : ship;
        shipList.querySelectorAll("li").forEach((listItem) => {
            const isSelected = selectedShip?.name === listItem.id;
            listItem.classList.toggle("bg-gray-500", isSelected);
            listItem.setAttribute("aria-pressed", String(isSelected));
        });
        clearPreview();
    });

    playerGrid.addEventListener("mouseover", (event) => {
        const cell = getCell(event.target);
        if (!cell || !selectedShip) return;
        showPreview(Number(cell.dataset.x), Number(cell.dataset.y));
    });

    playerGrid.addEventListener("mouseleave", clearPreview);

    playerGrid.addEventListener("click", (event) => {
        const cell = getCell(event.target);
        if (!cell || !selectedShip) return;

        const row = Number(cell.dataset.x);
        const column = Number(cell.dataset.y);
        if (!gameBoard.placeShips(selectedShip, row, column)) return;

        getPositions(row, column, selectedShip).forEach((position) => {
            const occupiedCell = playerGrid.querySelector(
                `[data-x="${position.row}"][data-y="${position.column}"]`,
            );
            occupiedCell?.classList.add("bg-blue-500");
        });

        placedShips.add(selectedShip.name);
        const shipItem = document.getElementById(selectedShip.name);
        shipItem?.classList.add("opacity-50");
        shipItem?.setAttribute("aria-disabled", "true");
        selectedShip = null;
        shipList.querySelectorAll("li").forEach((listItem) => {
            listItem.classList.remove("bg-gray-500");
            listItem.setAttribute("aria-pressed", "false");
        });
        clearPreview();
    });
}

export { initShipSelector };
