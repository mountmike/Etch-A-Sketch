const gridContainer = document.getElementById("gridContainer");
const gridResSlider = document.getElementById("gridRes")
let resX = 64;
let resY = 80;


gridResSlider.addEventListener("change", function() { 
    resX = gridResSlider.value;
    resY = resX * 1.25;
    clearGrid(gridContainer);
});




function makeRows(rows, cols) {
  gridContainer.style.setProperty('--grid-rows', rows);
  gridContainer.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    //cell.innerText = (c + 1);
    gridContainer.appendChild(cell).className = "grid-item";
  };
};

makeRows(resX, resY);

let currentColor = 'black'

const cells = gridContainer.getElementsByClassName('grid-item')

for (const cell of cells) {
    cell.addEventListener('mouseover', function o () {
        cell.style.backgroundColor = currentColor;
    });
}

// Clear function

const clearGrid = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}