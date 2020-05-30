export class Tile {
    constructor(){
        this.element = document.createElement("canvas")
        this.state = "default"
        this.rotation = "default"
    }
    
    drawTile() {
        let pen = this.element.getContext("2d")
        pen.beginPath()
        pen.moveTo(0,0)
        pen.lineTo(300,150)
        pen.lineTo(300,0)
        pen.fill()
        return this.element;
    }

    tileAtt(){
        this.element.setAttribute("class", "tile")
        this.element.setAttribute("data-rotation", "default")
        this.element.setAttribute("data-state", "default")
        // document.querySelector("grid")
        return this.element;
    }

    append(){
        document.querySelector("#grid").appendChild(this.element)
    }
}