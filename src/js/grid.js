export class Grid {
  constructor() {
    this.wordSelectMode = false;
    this.selectedItems = [];
    this.firstSelectedItem;
    this.gridArea = null;
  }

  getCellsInRange(firstLetter, currentLetter) {
    let cellsInRange = [];
    if (firstLetter.y === currentLetter.y) {
      if (firstLetter.x > currentLetter.x) {
        [currentLetter, firstLetter] = [firstLetter, currentLetter];
      }
      for (let i = firstLetter.x; i <= currentLetter.x; i++) {
        cellsInRange.push(
          this.gridArea.querySelector(
            `td[data-x="${i}"][data-y="${currentLetter.y}"]`
          )
        );
      }
    }
    return cellsInRange;
  }

  renderGrid(gridSize, wordGrid) {
    const gridArea = document.getElementsByClassName("grid-area")[0];
    if (gridArea.lastChild) {
      gridArea.removeChild(gridArea.lastChild);
    }
    this.gridArea = gridArea;
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    let index = 0;

    for (let i = 0; i < gridSize; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement("td");
        let letter = wordGrid[index++];
        const cellText = document.createTextNode(letter);
        cell.appendChild(cellText);
        cell.setAttribute("data-x", i);
        cell.setAttribute("data-y", j);
        cell.setAttribute("data-letter", letter);
        row.appendChild(cell);
      }

      tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    gridArea.appendChild(tbl);

    // click handlers
    gridArea.addEventListener("mousedown", (event) => {
      this.wordSelectMode = true;
      const cell = event.target;
      cell.classList.add("selected");
      let x = +cell.getAttribute("data-x");
      let y = +cell.getAttribute("data-y");
      let letter = cell.getAttribute("data-letter");
      this.firstSelectedItem = {
        x,
        y,
        letter,
        cell,
      };
    });

    gridArea.addEventListener("mousemove", (event) => {
      if (this.wordSelectMode) {
        const cell = event.target;
        // cell.classList.add("selected");
        let x = +cell.getAttribute("data-x");
        let y = +cell.getAttribute("data-y");
        let letter = cell.getAttribute("data-letter");
        // if (this.selectedItems.length > 0) {
        //   const lastSelectedItem =
        //     this.selectedItems[this.selectedItems.length - 1];
        //   if (lastSelectedItem.x === x && lastSelectedItem.y === y) return;
        // }
        // this.selectedItems.push({cell, x, y, letter});
        this.getCellsInRange(this.firstSelectedItem, { x, y }).forEach((cell) =>
          cell.classList.add("selected")
        );
      }
    });

    gridArea.addEventListener("mouseup", (event) => {
      this.wordSelectMode = false;
      this.selectedItems.forEach((item) =>
        item.cell.classList.remove("selected")
      );
    });
  }
}
