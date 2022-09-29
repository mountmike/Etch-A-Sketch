const gridContainer = document.getElementById("gridContainer");
const cells = gridContainer.getElementsByClassName('grid-item')
const gridResSlider = document.getElementById("gridRes")
const clearBtn = document.getElementById('clear');
const colorBtn = document.getElementById('customColorPicker')
let res = 64;
let currentColor = '#000000'



gridResSlider.addEventListener("click", function() { 
    res = gridResSlider.value;
    clearGrid(gridContainer);
    makeRows(res, res);
    paint();
    
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

makeRows(res, res);



function paint() {
    for (const cell of cells) {
        cell.addEventListener('mouseover', function () {
            cell.style.backgroundColor = currentColor;
        });
    }
}

// Clear function

const clearGrid = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

clearBtn.addEventListener('click', function() {
    clearGrid(gridContainer);
    makeRows(res, res);
    paint();
});


paint();

// Color selector
colorBtn.addEventListener('click', function() {
    currentColor = customColorPicker.value
});

