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
      const mark = document.createElement("p");
      mark.textContent = "X";
      // style with tailwind
      cell.classList.add(`grid-cell-${i}-${j}`);
      cell.classList.add("border");
      cell.classList.add("place-items-center");

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
      const mark = document.createElement("p");
      mark.textContent = "X";

      // style
      cell.classList.add(`grid-cell-${i}-${j}`);
      cell.classList.add("border");
      cell.classList.add("place-items-center");

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
