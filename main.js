const gridContainer = document.getElementById("gridContainer");
const cells = gridContainer.getElementsByClassName('grid-item')
const gridResSlider = document.getElementById("gridRes")
const clearBtn = document.getElementById('clear');
const colorBtn = document.getElementById('colorGrab');

let res = 32;
let currentColor = '#000000';



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
});




// Color selector
function setCurrentColor(newColor) {
    currentColor = newColor
  }
  

colorBtn.oninput = (e) => setCurrentColor(e.target.value);







// Left knob
const leftKnob = Draggable.create("#colorKnob",{
    type: "rotation",
    bounds:{minRotation:-180, maxRotation: -270},
    onDragEnd: () => {

    }
});

// Right kob
const rightKnob = Draggable.create("#color-controller",{
    type: "rotation",
    bounds:{minRotation:0, maxRotation: 90},
    onDragEnd: () => {
        
    }
});
