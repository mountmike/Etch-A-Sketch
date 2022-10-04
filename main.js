const gridContainer = document.getElementById("gridContainer");
const cells = gridContainer.getElementsByClassName('grid-item')
const gridResSlider = document.getElementById("gridRes")
const clearBtn = document.getElementById('clear');
const colorBtn = document.getElementById('customColorPicker');

let res = 32;
let backgroundColor = 'rgb(255, 255, 255)';
let currentColor = 'rgb(0, 0, 0)';

let colorMultiplyer = 0;

// Color controller knob
const colorKnob = Draggable.create("#colorKnob",{
    type: "rotation",
    bounds:{minRotation:0, maxRotation: 180},
    onDragEnd: () => {
        colorMultiplyer = colorKnob[0].endX;
        let RGB1 = colorMultiplyer * 3;
        let RGB2 = colorMultiplyer * 1.3;
        let RGB3 = colorMultiplyer * .2;
        currentColor = `rgb(${RGB1}, ${RGB2}, ${RGB3})`

    }
});

// Color controller knob
const colorController = Draggable.create("#color-controller",{
    type: "rotation",
    bounds:{minRotation:0, maxRotation: 90},
    onDragEnd: () => {
        colorController[0].endRotation < 45 ? currentColor = '#000000' : selectedColor = 'random';
    }
});


// Resolution slider function
gridResSlider.addEventListener("click", function() { 
    res = gridResSlider.value;
    clearGrid(gridContainer);
    makeRows(res, res);
    paint();
    
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
    paintGridEvent = paintGrid(event, currentColor);
    if(event.buttons == 1){        
        window.addEventListener('mouseover', (e) => {
            if(currentColor == 'random'){
                paintGrid(e, getRandomRgb());
            }else{
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
    paint();
});




// Color selector
function setCurrentColor(newColor) {
    currentColor = newColor
  }
  

colorBtn.oninput = (e) => setCurrentColor(e.target.value);





