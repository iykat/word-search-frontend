export class Grid {
  constructor() {
    this.wordSelectMode = false;
  };
  renderGrid(gridSize, wordGrid) {
    const gridArea = document.getElementsByClassName("grid-area")[0]
    if (gridArea.lastChild) {
      gridArea.removeChild(gridArea.lastChild)
    }
      const tbl = document.createElement("table");
      const tblBody = document.createElement("tbody");
      let index = 0;

      for (let i = 0; i < gridSize; i++) {
        const row = document.createElement("tr");
    
        for (let j = 0; j < gridSize; j++) {
          const cell = document.createElement("td");
          let letter = wordGrid[index++]
          const cellText = document.createTextNode(letter);
          cell.appendChild(cellText);
          cell.setAttribute("data-x", i)
          cell.setAttribute("data-y", j)
          cell.setAttribute("data-letter", letter)
          row.appendChild(cell);
        }
    
        tblBody.appendChild(row);
      }
    
      tbl.appendChild(tblBody);
      gridArea.appendChild(tbl);

      // click handlers
      gridArea.addEventListener("mousedown", (event) => {
        this.wordSelectMode = true 
      })
      gridArea.addEventListener("mousemove", (event) => {
        if (this.wordSelectMode) {
          event.target.classList.add("selected")
        }
      })
      gridArea.addEventListener("mouseup", (event) => {
        this.wordSelectMode = false 
      })

    }
    
}