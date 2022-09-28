const gridContainer = document.getElementById("gridContainer");

function makeRows(rows, cols) {
  gridContainer.style.setProperty('--grid-rows', rows);
  gridContainer.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    //cell.innerText = (c + 1);
    gridContainer.appendChild(cell).className = "grid-item";
  };
};

makeRows(64, 64);

let currentColor = 'black'

const cells = gridContainer.getElementsByClassName('grid-item')

for (const cell of cells) {
    cell.addEventListener('mouseover', function o () {
        cell.style.backgroundColor = currentColor;
    });
}