import {GameGrid} from "./grid.js"

export class Controls {
    constructor(){
    // Area for properties
        this.startButton = document.querySelector("#start")
        this.eraserButton = document.createElement("button")
        this.selectButton = document.createElement("button")
        this.invertButton = document.createElement("button")
        this.gameGrid = new GameGrid("gameGrid")
    }
    // Area for methods 

    invertTool(){
        let invertButton = this.invertButton;
        let selectButton = this.selectButton;
        let eraserButton = this.eraserButton;
        let gameGrid = this.gameGrid;
        invertButton.innerText = "Invert"
        invertButton.setAttribute("id", "invert")
        invertButton.setAttribute("data-state", "off")
        invertButton.setAttribute("class", "controlButton invert")
        document.querySelector("#controls").appendChild(invertButton)
        
        function invert(e){
            e = e.target;
            console.log(e);


            let pen = e.getContext("2d")
            let rotation = e.dataset.rotation;
            let state = invertButton.dataset.state;
            if(state == "off") return;
            e.setAttribute("data-state", "inverted")
            e.setAttribute("data-rotation", "default")

            const erase = () => {
                let pen = e.getContext("2d")
                pen.beginPath()
                pen.clearRect(0,0,300,150)
                pen.fill()
            }

            switch(rotation){
                case "default":
                    e.setAttribute("data-rotation", "0")
                    pen.beginPath()
                    erase()
                    pen.moveTo(150,75)
                    pen.lineTo(300,0)
                    pen.lineTo(300,150)
                    pen.fill()
                    break;
                case "erased":
                    e.setAttribute("data-rotation", "default")

                    break;
                case "0":
                    e.setAttribute("data-rotation", "1")
                    pen.beginPath()
                    erase()
                    pen.moveTo(150,75)
                    pen.lineTo(0,150)
                    pen.lineTo(300,150)
                    pen.fill()
                    break;
                case "1":
                    e.setAttribute("data-rotation", "2")
                    pen.beginPath()
                    erase()
                    pen.moveTo(150,75)
                    pen.lineTo(0,150)
                    pen.lineTo(0,0)
                    pen.fill()
                    break;
                case "2":
                    e.setAttribute("data-rotation", "3")
                    pen.beginPath()
                    erase()
                    pen.moveTo(150,75)
                    pen.lineTo(0,0)
                    pen.lineTo(300,0)
                    pen.fill()
                    break;
                case "3":
                    e.setAttribute("data-rotation", "0")
                    pen.beginPath()
                    erase()
                    pen.moveTo(150,75)
                    pen.lineTo(300,0)
                    pen.lineTo(300,150)
                    pen.fill()
                    break;
                default:
                    break;
            }







        }
        invertButton.addEventListener("click", invertTile)

        function invertTile(){

            if(selectButton.dataset.state == "on" || eraserButton.dataset.state == "on"){
                selectButton.setAttribute("data-state", "off")
                eraserButton.setAttribute("data-state", "off")
                selectButton.style.border = "1px solid #000000"
                eraserButton.style.border = "1px solid #000000"
                invertButton.style.border = "2px solid #000000"
                
            }

            switch(invertButton.dataset.state){
                case "off":
                    // Runs code if invertButton is off
                    invertButton.setAttribute("data-state", "on")
                    invertButton.style.border = "2px solid #000000";
                    gameGrid.grid.addEventListener("click", invert)



                    break;
                case "on":
                    // Runs code if invertButton is on
                    invertButton.setAttribute("data-state", "off")
                    invertButton.style.border = "1px solid #000000";
                    gameGrid.grid.removeEventListener("click", invert)

                    break;
                default:
                    break;
            }
            

        }


    }


    eraserTool(){
            let eraserButton = this.eraserButton;
            let selectButton = this.selectButton;
            let invertButton = this.invertButton;
            let gameGrid = this.gameGrid;
            eraserButton.innerText = "Erase"
            eraserButton.setAttribute("id", "eraser")
            eraserButton.setAttribute("data-state", "off")
            eraserButton.setAttribute("class", "controlButton eraser")


            function erase(e){
                e = e.target
                let eraserState = eraserButton.dataset.state;
                if(eraserState == "off") return;
                e.setAttribute("data-rotation", "erased")
                let pen = e.getContext("2d")
                pen.beginPath()
                pen.clearRect(0,0,300,150)
                pen.fill()
                return e;
            }


            document.querySelector("#controls").appendChild(eraserButton)
            eraserButton.addEventListener("click", eraseTile)

            function eraseTile(){


                if(selectButton.dataset.state == "on" || invertButton.dataset.state == "on"){
                    selectButton.setAttribute("data-state", "off")
                    invertButton.setAttribute("data-state", "off")
                    selectButton.style.border = "1px solid #000000"
                    invertButton.style.border = "1px solid #000000"
                    eraserButton.style.border = "2px solid #000000"
                    
                }

                switch(eraserButton.dataset.state){
                    case "off":
                        // Runs code if eraserButton is off
                        eraserButton.setAttribute("data-state", "on")
                        eraserButton.style.border = "2px solid #000000";
                        gameGrid.grid.addEventListener("click", erase)
                        break;
                    case "on":
                        // Runs code if eraserButton is on
                        eraserButton.setAttribute("data-state", "off")
                        eraserButton.style.border = "1px solid #000000";
                        gameGrid.grid.removeEventListener("click", erase)

                        break;
                    default:
                        break;
                }
                
            }



    }

    selectTool(){
        let selectButton = this.selectButton;
        let eraserButton = this.eraserButton;
        let invertButton = this.invertButton;
        let gameGrid = this.gameGrid;
        selectButton.innerText = "Select"
        selectButton.setAttribute("id", "select")
        selectButton.setAttribute("data-state", "off")
        selectButton.setAttribute("class", "controlButton select")


        function rotate(e){
            e = e.target;
            let pen = e.getContext("2d")
            let rotation = e.dataset.rotation;
            let state = selectButton.dataset.state;
            if(state == "off") return;
            e.setAttribute("data-state", "default")


            const erase = () => {
                let pen = e.getContext("2d")
                pen.beginPath()
                pen.clearRect(0,0,300,150)
                pen.fill()
            }
            switch(rotation){
                case "erased":
                    e.setAttribute("data-rotation", "default")
                    pen = e.getContext("2d");
                    pen.beginPath();
                    erase();
                    pen.moveTo(0,0);
                    pen.lineTo(300,0);
                    pen.lineTo(300,150);
                    pen.fill();
                    break;
                case "default":
                    e.setAttribute("data-rotation", "1")
                    pen = e.getContext("2d");
                    pen.beginPath();
                    erase();
                    pen.moveTo(300,0);
                    pen.lineTo(0,150);
                    pen.lineTo(300,150);
                    pen.fill();
                    break;
                case "0":
                    e.setAttribute("data-rotation", "default")
                    pen = e.getContext("2d");
                    pen.beginPath();
                    erase();
                    pen.moveTo(0,0);
                    pen.lineTo(300,0);
                    pen.lineTo(300,150);
                    pen.fill();
                    break;
                case "1":
                    e.setAttribute("data-rotation", "2")
                    pen = e.getContext("2d");
                    pen.beginPath();
                    erase();
                    pen.moveTo(0,0);
                    pen.lineTo(300,150);
                    pen.lineTo(0,150);
                    pen.fill();
                    break;
                case "2":
                    e.setAttribute("data-rotation", "3")
                    pen = e.getContext("2d");
                    pen.beginPath();
                    erase();
                    pen.moveTo(300,0);
                    pen.lineTo(0,150);
                    pen.lineTo(0,0);
                    pen.fill();
                    break;
                case "3":
                    e.setAttribute("data-rotation", "default")
                    pen = e.getContext("2d");
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

        document.querySelector("#controls").appendChild(selectButton)
        selectButton.addEventListener("click", selectTile)
        function selectTile(){

            if(invert.dataset.state == "on" || eraserButton.dataset.state == "on"){
                invertButton.setAttribute("data-state", "off")
                eraserButton.setAttribute("data-state", "off")
                invertButton.style.border = "1px solid #000000"
                eraserButton.style.border = "1px solid #000000"
                selectButton.style.border = "2px solid #000000"
                
            }

            function erase(e){
                e = e.target
                e.setAttribute("data-rotation", "erased")
                let pen = e.getContext("2d")
                pen.beginPath()
                pen.clearRect(0,0,300,150)
                pen.fill()
                return e;
            }


                // Runs code if eraserButton is off
                    switch(selectButton.dataset.state){
                        case "off":
                        // Runs code if selectButton is off
                            selectButton.setAttribute("data-state", "on")
                            selectButton.style.border = "2px solid #000000";
                            gameGrid.grid.addEventListener("click", rotate)
                            gameGrid.grid.removeEventListener("click", erase)


                            break;
                        case "on":
                        // Runs code if selectButton is on
                            gameGrid.grid.removeEventListener("click", rotate)
                            selectButton.setAttribute("data-state", "off")
                            selectButton.style.border = "1px solid #000000";
                            
                            break;
                        default:
                            break;
                    }
        }
    }


    startGame(){
        let startButton = this.startButton;
        let gameGrid = this.gameGrid;
        startButton.addEventListener("click", start)
        this.selectTool()
        this.eraserTool()
        this.invertTool()

        function start(){
            // Logic for detecting if game has started
            if(startButton.dataset.state == "playing") {
                // If game has started, run this code
                startButton.setAttribute("data-state", "off")
                startButton.innerText = "Start Game!";
                gameGrid.reset()
                return startButton;
            }
            else{
                // If game hasn't started, run this code
                startButton.setAttribute("data-state", "playing")
                startButton.innerText = "End Game";
                gameGrid.render()
                return startButton;
            }
        }
    }

}
