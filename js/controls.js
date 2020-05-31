import {GameGrid} from "./grid.js"
export class Controls {
    constructor(){
    // Area for properties
        this.startButton = document.querySelector("#start")
        this.eraserButton = document.createElement("button")
        this.squareButton = document.createElement("button")
        this.invertButton = document.createElement("button")
        this.rectangleButton = document.createElement("button")

        this.gameGrid = new GameGrid("gameGrid")
    }
    // Area for methods 

    invertTool(){
        let invertButton = this.invertButton;
        let squareButton = this.squareButton;
        let eraserButton = this.eraserButton;
        let rectangleButton = this.rectangleButton;
        let gameGrid = this.gameGrid;

        invertButton.innerText = "Invert"
        invertButton.setAttribute("id", "invert")
        invertButton.setAttribute("data-state", "off")
        invertButton.setAttribute("class", "controlButton invert")
        document.querySelector("#controls").appendChild(invertButton)
        
        function invert(e){
            e = e.target;
            console.log(e);
            
            if(invertButton.dataset.state == "off") return;

            let pen = e.getContext("2d")
            let rotation = e.dataset.rotation;

            const erase = () => {
                let pen = e.getContext("2d")
                pen.beginPath()
                pen.clearRect(0,0,300,150)
                pen.fill()
            }

            if(e.dataset.state == "default"
            || e.dataset.state == "rectangle"
            || e.dataset.state =="erased"
            || e.dataset.state == "square"){
               e.setAttribute("data-state", "inverted")
               e.setAttribute("data-rotation", "default")
            }

            switch(rotation){
                case "default":
                    e.setAttribute("data-rotation", "1")
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
                    e.setAttribute("data-rotation", "1")
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
        invertButton.addEventListener("click", checkState)
        function checkState(e){
            e = e.target;

            if(rectangleButton.dataset.state == "on" 
            || eraserButton.dataset.state == "on"
            || squareButton.dataset.state == "on")
            {
                rectangleButton.setAttribute("data-state", "off")
                eraserButton.setAttribute("data-state", "off")
                squareButton.setAttribute("data-state", "off")

                rectangleButton.style.border = "1px solid #000000"
                squareButton.style.border = "1px solid #000000"
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
            let squareButton = this.squareButton;
            let invertButton = this.invertButton;
            let rectangleButton = this.rectangleButton;
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
            eraserButton.addEventListener("click", checkState)
            function checkState(e){
                e = e.target;
    
                if(rectangleButton.dataset.state == "on" 
                || invertButton.dataset.state == "on"
                || squareButton.dataset.state == "on")
                {
                    rectangleButton.setAttribute("data-state", "off")
                    invertButton.setAttribute("data-state", "off")
                    squareButton.setAttribute("data-state", "off")
    
                    rectangleButton.style.border = "1px solid #000000"
                    squareButton.style.border = "1px solid #000000"
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
    rectangleTool(){
        let squareButton = this.squareButton;
        let eraserButton = this.eraserButton;
        let invertButton = this.invertButton;
        let rectangleButton = this.rectangleButton;
        let gameGrid = this.gameGrid;
        
        rectangleButton.innerText = "Rectangle"
        rectangleButton.setAttribute("id", "rectangle")
        rectangleButton.setAttribute("data-state", "off")
        rectangleButton.setAttribute("class", "controlButton rectangle")

        function rotate(e){
            e = e.target;
            
            let pen = e.getContext("2d")
            let rotation = e.dataset.rotation;
            let state = e.dataset.state;
            if(state == "default"
            || state == "erased"
            || state == "square")
            {
                e.setAttribute("data-state", "rectangle")
            }

                const erase = () => {
                    let pen = e.getContext("2d")
                    pen.beginPath()
                    pen.clearRect(0,0,300,150)
                    pen.fill()
                }

                switch(rotation){
                    case "erased":
                        e.setAttribute("data-rotation", "default")
                        pen.beginPath()
                        erase()
                        pen.moveTo(0,0)
                        pen.lineTo(300,0)
                        pen.lineTo(300,75)
                        pen.lineTo(0,75)
                        pen.fill()
                        console.log(e);
    
                        break;
                    case "default":
                        e.setAttribute("data-rotation", "1")
                        pen.beginPath()
                        erase()
                        pen.moveTo(300,0)
                        pen.lineTo(300,150)
                        pen.lineTo(150,150)
                        pen.lineTo(150,0)
                        pen.fill()
                        console.log(e);
                        break;
                    case "1":
                        e.setAttribute("data-rotation", "2")
                        console.log(e);
                        pen.beginPath()
                        erase()
                        pen.moveTo(0,75)
                        pen.lineTo(300,75)
                        pen.lineTo(300,150)
                        pen.lineTo(0,150)
                        pen.fill()
                        break;
                    case "2":
                        e.setAttribute("data-rotation", "3")
                        console.log(e);
                        pen.beginPath()
                        erase()
                        pen.moveTo(0,0)
                        pen.lineTo(150,0)
                        pen.lineTo(150,150)
                        pen.lineTo(0,150)
                        pen.fill()
                        break;
                    case "3":
                        e.setAttribute("data-rotation", "default")
                        console.log(e);
                        pen.beginPath()
                        erase()
                        pen.moveTo(0,0)
                        pen.lineTo(300,0)
                        pen.lineTo(300,75)
                        pen.lineTo(0,75)
                        pen.fill()
                        break;
                    default:
                        break;
                }
            

        }

        document.querySelector("#controls").appendChild(rectangleButton)
        rectangleButton.addEventListener("click", checkState)
        function checkState(e){
            e = e.target;
            if(invertButton.dataset.state == "on" 
            || eraserButton.dataset.state == "on"
            || squareButton.dataset.state == "on")
            {
                invertButton.setAttribute("data-state", "off")
                eraserButton.setAttribute("data-state", "off")
                squareButton.setAttribute("data-state", "off")

                invertButton.style.border = "1px solid #000000"
                squareButton.style.border = "1px solid #000000"
                eraserButton.style.border = "1px solid #000000"

                rectangleButton.style.border = "2px solid #000000"

                switch(rectangleButton.dataset.state){
                    case "off":
                    // Runs code if rectangleButton is off
                        rectangleButton.setAttribute("data-state", "on")
                        rectangleButton.style.border = "2px solid #000000";
                        gameGrid.grid.addEventListener("click", rotate)
                        console.log(rectangleButton);
                        
                        break;
                    case "on":
                    // Runs code if rectangleButton is on
                        gameGrid.grid.removeEventListener("click", rotate)
                        rectangleButton.setAttribute("data-state", "off")
                        rectangleButton.style.border = "1px solid #000000";
                        console.log(rectangleButton);
    
                        break;
                    default:
                        break;
                }
            }



    }
}
    squareTool(){
        let squareButton = this.squareButton;
        let eraserButton = this.eraserButton;
        let invertButton = this.invertButton;
        let rectangleButton = this.rectangleButton;
        let gameGrid = this.gameGrid;
        squareButton.innerText = "Square"
        squareButton.setAttribute("id", "square")
        squareButton.setAttribute("data-state", "off")
        squareButton.setAttribute("class", "controlButton square")


        if(invertButton.dataset.state == "on" 
        || eraserButton.dataset.state == "on"
        || rectangleButton.dataset.state == "on")
        {
            invertButton.setAttribute("data-state", "off")
            eraserButton.setAttribute("data-state", "off")
            rectangleButton.setAttribute("data-state", "off")

            invertButton.style.border = "1px solid #000000"
            rectangletButton.style.border = "1px solid #000000"
            eraserButton.style.border = "1px solid #000000"

            squareButton.style.border = "2px solid #000000"
            console.log(squareButton);
            
        }

        function rotate(e){
            e = e.target;
            let pen = e.getContext("2d")
            let rotation = e.dataset.rotation;
            let state = squareButton.dataset.state;
            if(state == "off") return;
            if(!e.dataset.state == "default"){
                e.setAttribute("data-state", "default")
                e.setAttribute("data-rotation", rotation)
            }
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
                        pen.moveTo(150,75);
                        pen.lineTo(0,0);
                        pen.lineTo(0,0);
                        pen.fill();
                        break;
                    case "default":
                        e.setAttribute("data-rotation", "1")
                        pen = e.getContext("2d");
                        pen.beginPath();
                        erase();
                        pen.moveTo(150,75);
                        pen.lineTo(150,0);
                        pen.lineTo(300,0);
                        pen.lineTo(300,75);
                        pen.lineTo(150,75);
                        pen.fill();
                        break;
                    case "1":
                        e.setAttribute("data-rotation", "2")
                        pen = e.getContext("2d");
                        pen.beginPath();
                        erase();
                        pen.moveTo(150,75);
                        pen.lineTo(300,75);
                        pen.lineTo(300,150);
                        pen.lineTo(150,150);
                        pen.lineTo(150,75);
                        pen.fill();
                        break;
                    case "2":
                        e.setAttribute("data-rotation", "3")
                        pen = e.getContext("2d");
                        pen.beginPath();
                        erase();
                        pen.moveTo(150,75);
                        pen.lineTo(0,75);
                        pen.lineTo(0,150);
                        pen.lineTo(150,150);
                        pen.lineTo(150,75);
                        pen.fill();
                        break;
                    case "3":
                        e.setAttribute("data-rotation", "default")
                        pen = e.getContext("2d");
                        pen.beginPath();
                        erase();
                        pen.moveTo(150,75);
                        pen.lineTo(150,0)
                        pen.lineTo(0,0)
                        pen.lineTo(0,75)
                        pen.fill();
                        break;
                    default:
                        break;
                }

        }

        document.querySelector("#controls").appendChild(squareButton)
        squareButton.addEventListener("click", checkState)
        function checkState(e){
            e = e.target;
            console.log(e);
            if(invert.dataset.state == "on" || eraserButton.dataset.state == "on"){
                invertButton.setAttribute("data-state", "off")
                eraserButton.setAttribute("data-state", "off")
                invertButton.style.border = "1px solid #000000"
                eraserButton.style.border = "1px solid #000000"
                squareButton.style.border = "2px solid #000000"
                
            }
                // Runs code if eraserButton is off
                    switch(squareButton.dataset.state){
                        case "off":
                        // Runs code if squareButton is off
                            squareButton.setAttribute("data-state", "on")
                            squareButton.style.border = "2px solid #000000";
                            gameGrid.grid.addEventListener("click", rotate)
                            break;
                        case "on":
                        // Runs code if squareButton is on
                            gameGrid.grid.removeEventListener("click", rotate)
                            squareButton.setAttribute("data-state", "off")
                            squareButton.style.border = "1px solid #000000";
                            break;
                        default:
                            break;
                    }
        }
    }


    startGame(){
        let startButton = this.startButton;
        let squareButton = this.squareButton;
        let eraserButton = this.squareButton;
        let invertButton = this.squareButton;
        let rectangleButton = this.rectangleButton;
        let gameGrid = this.gameGrid;

        startButton.addEventListener("click", start)
        gameGrid.grid.addEventListener("click", rotate)

        this.squareTool()
        this.eraserTool()
        this.invertTool()
        this.rectangleTool()

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
        function rotate(e){
            e = e.target;
            if(squareButton.dataset.state == "off" 
            && eraserButton.dataset.state == "off"
            && invertButton.dataset.state == "off"
            && rectangleButton.dataset.state == "off"){
                let pen = e.getContext("2d")
                let rotation = e.dataset.rotation;
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
 

            
        }
    
    }

}
