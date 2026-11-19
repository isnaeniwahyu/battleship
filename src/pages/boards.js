// create a board and celll
const createPlayerCell = (rows, cols) => {
  const playerGrid = document.getElementById("player-grid");
  // clear any children inside of it
  playerGrid.replaceChildren();

  playerGrid.classList.add("grid");
  playerGrid.classList.add(`grid-cols-${cols}`);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // create the cell
      const cell = document.createElement("div");
      const mark = document.createElement("span");
      mark.setAttribute("aria-hidden", "true");
      cell.id = `grid-cell-${i}-${j}`;
      cell.className =
        "board-cell flex aspect-square min-w-0 cursor-crosshair items-center justify-center rounded-md border text-xs font-black sm:rounded-lg sm:text-sm";
      cell.setAttribute("aria-label", `Your waters, row ${i + 1}, column ${j + 1}`);

      // set dataset
      cell.dataset.x = i;
      cell.dataset.y = j;

      cell.appendChild(mark);
      playerGrid.appendChild(cell);
    }
  }
};

const createEnemyCell = (rows, cols) => {
  // get enemy grid
  const enemyGrid = document.getElementById("enemy-grid");
  enemyGrid.replaceChildren();

  enemyGrid.classList.add("grid");
  enemyGrid.classList.add(`grid-cols-${cols}`);

  // create the cell depends on rows & coll
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // create cell & mark and style
      const cell = document.createElement("div");
      const mark = document.createElement("span");
      mark.setAttribute("aria-hidden", "true");

      cell.className =
        "board-cell flex aspect-square min-w-0 cursor-crosshair items-center justify-center rounded-md border text-xs font-black sm:rounded-lg sm:text-sm";
      cell.setAttribute("aria-label", `Enemy waters, row ${i + 1}, column ${j + 1}`);

      // set dataset
      cell.dataset.x = i;
      cell.dataset.y = j;

      // append child
      cell.appendChild(mark);
      enemyGrid.appendChild(cell);
    }
  }
};

export { createPlayerCell, createEnemyCell };
