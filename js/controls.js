import {GameGrid} from "./grid.js"
import {Tile} from "./tile.js";

export class Controls {
    constructor(){
    // Area for properties
        this.startButton = document.querySelector("#start")
        this.eraserButton = document.createElement("button")
    }
    eraser(){
        let eraserButton = this.eraserButton;
        let controlDiv = document.querySelector("#controls")
        let grid = document.querySelector("#grid")
        eraserButton.setAttribute("class", "no_selection")
        eraserButton.setAttribute("data-state", "off")
        eraserButton.innerText = "Eraser";
        eraserButton.setAttribute("id", "eraser")
        controlDiv.appendChild(eraserButton)
        eraserButton.addEventListener("click", (e) => {
            // Logic for detecting if eraser is selected
            e = e.target;
            if(e.dataset.state == "off"){
                e.setAttribute("data-state", "on")
                console.log(e.dataset.state);
                grid.addEventListener("click", eraseTile)

            }
            else{
                e.setAttribute("data-state", "off")
                console.log(e.dataset.state);
                grid.removeEventListener("click", eraseTile)

            }
        })

        function eraseTile(e){
            e = e.target
            e.setAttribute("data-state", "erased")
            e.setAttribute("data-rotation", "default")
            let pen = e.getContext("2d");
            pen.beginPath()
            pen.clearRect(0,0,300,150)
            pen.fill()
            console.log(e);
            
        }
    }


// Area for methods
    start(){
        let idNum = 0;

        this.startButton.addEventListener("click", (startButton) => {
            startButton = startButton.target;
            
            if(startButton.dataset.state == "playing") return;
            startButton.setAttribute("data-state", "playing")
            this.eraser()
            let gameGrid = new GameGrid("gameGrid")

            for(let i = 0; i < 100; i++){
                let tile = new Tile("tile")
                idNum++
                idNum.toString()
                tile.element.setAttribute("id", idNum)
                tile.tileAtt()
                tile.drawTile()
                tile.append()
                gameGrid.gridArray.push(tile)
            }

            gameGrid.grid.addEventListener("click", rotate)
            function rotate(e){
                e = e.target;
                console.log(e);
                let rotation = e.dataset.rotation;
                let tileState = e.dataset.state;
                // if statement for tile clicked's state
                if(tileState != "default"){
                    // Erase button code
                    e.setAttribute("data-state", "default")
                    e.setAttribute("data-rotation", "default")

                    let pen = e.getContext("2d");
                    pen.beginPath();
                    pen.clearRect(0,0,300,150);
                    pen.moveTo(0,0);
                    pen.lineTo(300,0);
                    pen.lineTo(300,150);
                    pen.fill();
                }
                else{
                    let pen = e.getContext("2d");
                    switch(rotation){
                        case "default":
                            e.setAttribute("data-rotation", "1")
                            pen = e.getContext("2d");
                            pen.beginPath();
                            pen.clearRect(0,0,300,150);
                            pen.moveTo(300,0);
                            pen.lineTo(0,150);
                            pen.lineTo(300,150);
                            pen.fill();
                            break;
                        case "1":
                            e.setAttribute("data-rotation", "2")
                            pen = e.getContext("2d");
                            pen.beginPath();
                            pen.clearRect(0,0,300,150);
                            pen.moveTo(0,0);
                            pen.lineTo(300,150);
                            pen.lineTo(0,150);
                            pen.fill();
                            break;
                        case "2":
                            e.setAttribute("data-rotation", "3")
                            pen = e.getContext("2d");
                            pen.beginPath();
                            pen.clearRect(0,0,300,150);
                            pen.moveTo(300,0);
                            pen.lineTo(0,150);
                            pen.lineTo(0,0);
                            pen.fill();
                            break;
                        case "3":
                            e.setAttribute("data-rotation", "default")
                            pen = e.getContext("2d");
                            pen.beginPath();
                            pen.clearRect(0,0,300,150);
                            pen.moveTo(0,0);
                            pen.lineTo(300,0);
                            pen.lineTo(300,150);
                            pen.fill();
                            break;
                        default:
                            break;
                    }
                }
        }
            console.log(startButton);
            console.log(gameGrid.gridArray);
            return startButton;

        })
    }

}
