
// Make tile into Tile class
// Tile class contains:
// a var tile = createElement("canvas")
// method att that attaches attributes (class, data-rotation)
// method draw that draws default tile rotation
// method rotate that detects data-rotation and acts accordingly

// Make a for loop that makes 100 tile objects, attaches id, and pushes into grid array
// Make a var gameGrid = querySelector("#grid") and add listener
// Make a start button that upon click, appends grid array to div#grid
// Also sets boolean isGamePlaying = true
const gameGrid = document.querySelector("#grid")
var startButton = document.querySelector("#start")
startButton.addEventListener("click", start)
var eraseButton = document.createElement("input");
var grid = [];
var tileId = 0;
var isGamePlaying = false;
var rotation;



// Added Git
// Test Commit to git

// Default tile object to make code
class Tile {
    constructor(){
        this.element = document.createElement("canvas");
    }
    
    draw() {
        let pen = this.element.getContext("2d")
        pen.beginPath()
        pen.moveTo(0,0)
        pen.lineTo(300,150)
        pen.lineTo(300,0)
        pen.fill()
        return this.element;
    }

    att(){
        this.element.setAttribute("class", "tile")
        this.element.setAttribute("id", tileId)
        this.element.setAttribute("data-rotation", "default")
        gameGrid.appendChild(this.element)
        return this.element;
    }

    erase(){
        let pen = this.element.getContext("2d")
        pen.beginPath()
        pen.clearRect(0, 0, 350, 150)
        pen.fill()
        return this.element;
    }
}


function start(){
    // Function that starts the game
    document.getElementById("start").innerText = "End Game";
    // Sets button's text to end game
    gameGrid.addEventListener("click", rotate)
    startButton.addEventListener("click", end);
    // Add end function to  start button
    startButton.removeEventListener("click", start);
    // Removes start function from start button
    tileId = 0;
    // Resets tile id for the for loop

    if(isGamePlaying === true){return}
    else{
        isGamePlaying = true;
        let tile = new Tile("tile");
    // For loop - creates tiles, pushes into array
        for(i = 0; i < 100; i++){
            tileId++;
            tileId.toString();
            tile = new Tile("tile");
            grid.push(tile);
            tile.att();
            tile.draw();
        }

        function eraserIsActive(e){
            // Function that detects if the erase button is selected
            e = e.target;
            let eraseButton = document.querySelector("#erase");
            if(eraseButton.dataset.state == "0") {
                eraseButton.dataset.state = "1";
                eraseButton.setAttribute("class","eraserOn");
                // Sets button background color to green
            }
            else{
                eraseButton.dataset.state = "0";
                eraseButton.setAttribute("class","reset")
                // resets background color
                eraseButton.setAttribute("class", "eraserOff")
                // Sets background color to the default colors
            }
        }


        var eraseButton = document.createElement("button");
        // Creates erase button
        eraseButton.setAttribute("id", "erase");
        eraseButton.setAttribute("data-state", "0");
        eraseButton.innerText = "Erase";
        document.getElementById("controls").appendChild(eraseButton)
        // Appends to controls section
        gameGrid.addEventListener("click", eraseTool)
        // Adds eraser tool function to the game grid
        eraseButton.addEventListener("click", eraserIsActive)
        // Adds function to erase button to detect if it is clicked
    }

}

function end(){
    // Function that resets game
    if(isGamePlaying === true){
        isGamePlaying = false;
        document.getElementById("start").innerText = "Start Game!";
        if(gameGrid.hasChildNodes()){
            let tileId = 0;
            grid.forEach(()=>{
                tileId++;
                let tile = document.getElementById(tileId);
                tile.parentNode.removeChild(tile);
            })            
        }
        grid = [];
        startButton.removeEventListener("click", end);
        startButton.addEventListener("click", start);

    }
    else{return}
}



function rotate(e){
    let tile = e.target;
    let pen = tile.getContext("2d")
    rotation = tile.dataset.rotation;

    const erase = () => {
        let pen = tile.getContext("2d");
        pen.beginPath();
        pen.clearRect(0, 0, 300, 150);
    }

    switch(rotation){
        case "default":
            tile.setAttribute("data-rotation", "1")
            pen = tile.getContext("2d");
            pen.beginPath();
            erase();
            pen.moveTo(300,0);
            pen.lineTo(0,150);
            pen.lineTo(300,150);
            pen.fill();
            break;
        case "1":
            tile.setAttribute("data-rotation", "2")
            pen = tile.getContext("2d");
            pen.beginPath();
            erase();
            pen.moveTo(0,0);
            pen.lineTo(300,150);
            pen.lineTo(0,150);
            pen.fill();
            break;
        case "2":
            tile.setAttribute("data-rotation", "3")
            pen = tile.getContext("2d");
            pen.beginPath();
            erase();
            pen.moveTo(300,0);
            pen.lineTo(0,150);
            pen.lineTo(0,0);
            pen.fill();
            break;
        case "3":
            tile.setAttribute("data-rotation", "default")
            pen = tile.getContext("2d");
            pen.beginPath();
            erase();
            pen.moveTo(0,0);
            pen.lineTo(300,0);
            pen.lineTo(300,150);
            pen.fill();
            break;
        default:
            break;
    }
}

function eraseTool(e){
    let tile = e.target;
    let eraseButton = document.getElementById("erase")
    eraseButton = eraseButton.dataset.state;

    if(eraseButton == "1"){
        let pen = tile.getContext("2d")
        pen.beginPath();
        pen.clearRect(0,0,300,150);
        pen.fill();
        console.log(e);
        
    }    
    
    
}