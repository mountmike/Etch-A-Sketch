let res = 32;
let currentColor = '#000000';
let backgroundColor = '#FFFFFF';
let currentMode = "color";

const gridContainer = document.getElementById("gridContainer");
const cells = gridContainer.getElementsByClassName('grid-item')
const gridResSlider = document.getElementById("gridRes")
const clearBtn = document.getElementById('clearBtn');
const colorGrab = document.getElementById('colorGrab');
const eraserBtn = document.getElementById('eraserBtn');
const colorBtn = document.getElementById('colorModeBtn');
const rainbowBtn = document.getElementById('rainbowModeBtn');

// Set color Mode
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');

// Mode selectaaah
function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
  }

// Activate modes &  classes

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
      currentColor = colorGrab.value;
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active')
    }
  }

// Resolution slider function
gridResSlider.addEventListener("click", function() { 
    res = gridResSlider.value;
    clearGrid(gridContainer);
    makeRows(res, res);
    
});

// setup grid function
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

// Rainbow color generator
function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

// Paint function
function paintGrid(elem, color){    
    if(elem.buttons == 1){
        if(elem.target.classList == 'grid-item'){
            let square = elem.target;    
            square.style.backgroundColor = currentColor;
        }  
    } else {
        return;
    }
}

gridContainer.addEventListener('mousedown', event =>{ 
    paintGridEvent = paintGrid(event, currentColor,);
    if(event.buttons == 1){        
        window.addEventListener('mouseover', (e) => {
            if(currentMode == 'rainbow'){
                currentColor = getRandomRgb();
                paintGrid(e, currentColor);
            } else if (currentMode == 'eraser') {
                currentColor = backgroundColor
                paintGrid(e, currentColor);
            } else {
                paintGrid(e, currentColor);
            }            
        });
    }
});

// Clear function


const clearGrid = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

clearBtn.addEventListener('click', function() {
    clearGrid(gridContainer);
    makeRows(res, res);
});




// Color Grabber
function setCurrentColor(newColor) {
    currentColor = newColor;
  }

colorGrab.oninput = (e) => setCurrentColor(e.target.value);
colorGrab.oninput = (e) => setCurrentMode('color');

setCurrentMode('color');
