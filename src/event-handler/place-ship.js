import Ships from "../components/ship";
import { ships } from "../pages/shipList";

function initShipSelector(playerBoard, enemyBoard) {
    const shipList = document.getElementById("ship-list");
    const playerGrid = document.getElementById("player-grid");
    const enemyGrid = document.getElementById("enemy-grid");
    const rotateButton = document.getElementById("rotate");
    const rotateLabel = document.getElementById("rotate-label");
    const startButton = document.getElementById("start-game");
    const gameStatus = document.getElementById("game-status");
    const statusDot = document.getElementById("status-dot");
    const statusPulse = document.getElementById("status-pulse");
    const battleLog = document.getElementById("battle-log");
    const fleetProgress = document.getElementById("fleet-progress");
    const playerFleetStatus = document.getElementById("player-fleet-status");
    const enemyFleetStatus = document.getElementById("enemy-fleet-status");

    if (
        !shipList ||
        !playerGrid ||
        !enemyGrid ||
        !rotateButton ||
        !rotateLabel ||
        !startButton ||
        !gameStatus ||
        !statusDot ||
        !statusPulse ||
        !battleLog ||
        !fleetProgress ||
        !playerFleetStatus ||
        !enemyFleetStatus
    ) {
        throw new Error("The battle controls and both game boards must exist before initializing the game.");
    }

    let selectedShip = null;
    let direction = "horizontal";
    let gameStarted = false;
    let gameOver = false;
    let computerTurn = false;
    const placedShips = new Set();
    const playerSunkShips = new Set();
    const enemySunkShips = new Set();
    let computerFleet = [];

    const getCell = (target, grid) => {
        if (!(target instanceof Element)) return null;
        const cell = target.closest("[data-x][data-y]");
        return cell && grid.contains(cell) ? cell : null;
    };

    const getPositions = (row, column, ship, orientation = direction) =>
        Array.from({ length: ship.size }, (_, offset) => ({
            row: row + (orientation === "vertical" ? offset : 0),
            column: column + (orientation === "horizontal" ? offset : 0),
        }));

    const positionsAreAvailable = (positions, board) =>
        positions.every(
            ({ row, column }) =>
                row >= 0 &&
                row < board.rows &&
                column >= 0 &&
                column < board.columns &&
                board.getBoards()[row][column] === null,
        );

    const getBoardCell = (grid, row, column) =>
        grid.querySelector(`[data-x="${row}"][data-y="${column}"]`);

    const updateFleetStatus = () => {
        playerFleetStatus.textContent = `Fleet: ${ships.length - playerSunkShips.size}`;
        enemyFleetStatus.textContent = `Fleet: ${ships.length - enemySunkShips.size}`;
        fleetProgress.textContent = `${placedShips.size} / ${ships.length} ships deployed`;
        startButton.disabled = placedShips.size !== ships.length || gameStarted;
    };

    const setStatus = (message, tone = "amber") => {
        gameStatus.textContent = message;
        const colors = {
            amber: "bg-amber-400",
            cyan: "bg-cyan-400",
            rose: "bg-rose-400",
            emerald: "bg-emerald-400",
        };
        statusDot.className = `relative inline-flex h-2.5 w-2.5 rounded-full ${colors[tone]}`;
        statusPulse.className = `absolute inline-flex h-full w-full rounded-full opacity-75 ${colors[tone]}`;
    };

    const setCellMark = (grid, row, column, result, shipName) => {
        const cell = getBoardCell(grid, row, column);
        if (!cell) return;

        const mark = cell.querySelector("span");
        cell.classList.remove("is-ship", "is-hit", "is-miss");
        cell.classList.add(`is-${result}`);

        if (mark) mark.textContent = result === "hit" ? "✕" : result === "miss" ? "•" : "";
        cell.setAttribute(
            "aria-label",
            result === "hit"
                ? `Row ${row + 1}, column ${column + 1}: hit${shipName ? `, ${shipName} sunk` : ""}`
                : result === "miss"
                  ? `Row ${row + 1}, column ${column + 1}: miss`
                  : `Row ${row + 1}, column ${column + 1}: ship`,
        );
    };

    const clearPreview = () => {
        playerGrid.querySelectorAll("[data-placement-preview]").forEach((cell) => {
            cell.classList.remove("is-preview-valid", "is-preview-invalid");
            delete cell.dataset.placementPreview;
        });
    };

    const showPreview = (row, column) => {
        clearPreview();
        if (!selectedShip) return;

        const positions = getPositions(row, column, selectedShip);
        const valid = positionsAreAvailable(positions, playerBoard);
        positions.forEach(({ row: shipRow, column: shipColumn }) => {
            const cell = getBoardCell(playerGrid, shipRow, shipColumn);
            if (!cell) return;
            cell.dataset.placementPreview = "true";
            cell.classList.add(valid ? "is-preview-valid" : "is-preview-invalid");
        });
    };

    const placeComputerFleet = () => {
        computerFleet = ships.map((ship) => new Ships(ship.name));
        const fleetBySize = [...computerFleet].sort((first, second) => second.size - first.size);

        fleetBySize.forEach((ship) => {
            let placed = false;
            const maxAttempts = enemyBoard.rows * enemyBoard.columns * 4;
            for (let attempt = 0; attempt < maxAttempts && !placed; attempt += 1) {
                const row = Math.floor(Math.random() * enemyBoard.rows);
                const column = Math.floor(Math.random() * enemyBoard.columns);
                const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
                placed = enemyBoard.placeShips(ship, row, column, orientation);
            }

            if (!placed) {
                throw new Error(`Could not randomly place the computer's ${ship.name}.`);
            }
        });
    };

    const finishGame = (message, tone) => {
        gameOver = true;
        computerTurn = false;
        setStatus(message, tone);
        battleLog.textContent = message;
        enemyGrid.classList.add("pointer-events-none", "opacity-70");
    };

    const resolveAttack = (board, fleet, sunkShips, grid, row, column) => {
        const result = board.receiveAttacks(row, column);
        if (!result || result.alreadyAttacked) return null;

        if (!result.hit) {
            setCellMark(grid, row, column, "miss");
            return { hit: false };
        }

        const ship = fleet.find((candidate) => candidate.name === result.ship);
        if (!ship) throw new Error(`No ship instance found for ${result.ship}.`);
        ship.hit();
        const sunk = ship.isSunk();
        if (sunk) sunkShips.add(ship.name);
        setCellMark(grid, row, column, "hit", sunk ? ship.name : "");
        return { hit: true, ship, sunk };
    };

    const computerFires = () => {
        const availableTargets = [];
        for (let row = 0; row < playerBoard.rows; row += 1) {
            for (let column = 0; column < playerBoard.columns; column += 1) {
                if (!playerBoard.attacks[row][column]) availableTargets.push({ row, column });
            }
        }
        if (availableTargets.length === 0) {
            throw new Error("The computer has no remaining coordinates to attack.");
        }

        const target = availableTargets[Math.floor(Math.random() * availableTargets.length)];
        const result = resolveAttack(
            playerBoard,
            ships,
            playerSunkShips,
            playerGrid,
            target.row,
            target.column,
        );
        const location = `${String.fromCharCode(65 + target.row)}${target.column + 1}`;

        if (result.hit) {
            battleLog.textContent = `Computer hit your ${result.ship.name} at ${location}.${result.sunk ? " Ship sunk!" : ""}`;
            if (playerSunkShips.size === ships.length) {
                updateFleetStatus();
                finishGame("Your fleet has been sunk. Battle lost.", "rose");
                return;
            }
        } else {
            battleLog.textContent = `Computer missed at ${location}. Your turn.`;
        }

        computerTurn = false;
        setStatus("Your turn — choose a target", "cyan");
        updateFleetStatus();
    };

    shipList.addEventListener("click", (event) => {
        if (gameStarted || !(event.target instanceof Element)) return;
        const item = event.target.closest("button[data-ship]");
        if (!item || !shipList.contains(item)) return;

        const ship = ships.find((candidate) => candidate.name === item.id);
        if (!ship || placedShips.has(ship.name)) return;

        selectedShip = selectedShip === ship ? null : ship;
        shipList.querySelectorAll("[data-ship]").forEach((button) => {
            const isSelected = selectedShip?.name === button.id;
            button.classList.toggle("is-selected", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });
        clearPreview();
    });

    rotateButton.addEventListener("click", () => {
        if (gameStarted) return;
        direction = direction === "horizontal" ? "vertical" : "horizontal";
        const isVertical = direction === "vertical";
        rotateLabel.textContent = isVertical ? "↕ Vertical" : "↔ Horizontal";
        rotateButton.setAttribute("aria-pressed", String(isVertical));
        clearPreview();
    });

    playerGrid.addEventListener("mouseover", (event) => {
        const cell = getCell(event.target, playerGrid);
        if (cell && selectedShip && !gameStarted) {
            showPreview(Number(cell.dataset.x), Number(cell.dataset.y));
        }
    });
    playerGrid.addEventListener("mouseleave", clearPreview);

    playerGrid.addEventListener("click", (event) => {
        if (gameStarted || !selectedShip) return;
        const cell = getCell(event.target, playerGrid);
        if (!cell) return;

        const row = Number(cell.dataset.x);
        const column = Number(cell.dataset.y);
        if (!playerBoard.placeShips(selectedShip, row, column, direction)) return;

        getPositions(row, column, selectedShip).forEach(({ row: shipRow, column: shipColumn }) => {
            setCellMark(playerGrid, shipRow, shipColumn, "ship");
        });

        placedShips.add(selectedShip.name);
        const shipItem = document.getElementById(selectedShip.name);
        if (shipItem instanceof HTMLButtonElement) {
            shipItem.disabled = true;
            shipItem.classList.add("opacity-40");
        }
        selectedShip = null;
        shipList.querySelectorAll("[data-ship]").forEach((button) => {
            button.classList.remove("is-selected");
            button.setAttribute("aria-pressed", "false");
        });
        clearPreview();
        updateFleetStatus();

        if (placedShips.size === ships.length) {
            setStatus("Fleet deployed — ready to start", "emerald");
            battleLog.textContent = "All ships deployed. Start the battle when ready.";
        } else {
            setStatus("Choose your next ship", "amber");
        }
    });

    startButton.addEventListener("click", () => {
        if (gameStarted || placedShips.size !== ships.length) return;

        placeComputerFleet();
        gameStarted = true;
        shipList.classList.add("pointer-events-none");
        rotateButton.disabled = true;
        rotateButton.classList.add("cursor-not-allowed", "opacity-50");
        startButton.textContent = "Battle in progress";
        startButton.disabled = true;
        setStatus("Your turn — choose a target", "cyan");
        battleLog.textContent = "Enemy fleet deployed. Fire at a coordinate to attack.";
        enemyGrid.classList.remove("pointer-events-none", "opacity-70");
    });

    enemyGrid.addEventListener("click", (event) => {
        if (!gameStarted || gameOver || computerTurn) return;
        const cell = getCell(event.target, enemyGrid);
        if (!cell) return;

        const row = Number(cell.dataset.x);
        const column = Number(cell.dataset.y);
        const result = resolveAttack(
            enemyBoard,
            computerFleet,
            enemySunkShips,
            enemyGrid,
            row,
            column,
        );
        if (!result) return;

        const location = `${String.fromCharCode(65 + row)}${column + 1}`;
        if (result.hit) {
            battleLog.textContent = `Direct hit at ${location}.${result.sunk ? ` Enemy ${result.ship.name} sunk!` : ""}`;
            if (enemySunkShips.size === ships.length) {
                updateFleetStatus();
                finishGame("Victory! You sank the enemy fleet.", "emerald");
                return;
            }
        } else {
            battleLog.textContent = `Miss at ${location}. The computer is taking its turn...`;
        }

        updateFleetStatus();
        computerTurn = true;
        setStatus("Computer is taking its turn", "amber");
        window.setTimeout(computerFires, 500);
    });

    updateFleetStatus();
    setStatus("Place your fleet to begin", "amber");
}

export { initShipSelector };
