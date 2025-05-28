const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveButton = document.getElementById("jsSave");
const refButton = document.getElementById("ref");

canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.85;

// fill canvas with white background by default
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height);

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2;

// manage painting state
let painting = false;
function stopPainting() {
    painting = false;
}
function startPainting() {
    painting = true;
}

let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting) {   
        // if mouse is not being held down
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

// save to downloads (as png file)
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    // download is an attribute of the anchor tag (HTML)
    link.download = "my_paintjs_drawing🎨"; 
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);

    canvas.addEventListener("click", () => {
        if (filling) {
            ctx.fillRect(0,0,canvas.width, canvas.height);
        }
    });

    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}

// put colors into an array
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if (range) {
    // range event is called "input"
    range.addEventListener("input", handleRangeChange)   
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (saveButton) {
    saveButton.addEventListener("click", handleSaveClick);
}

refButton.addEventListener('click', ()=> {
    ctx.lineWidth = 2;
    location.reload();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.85;
});

