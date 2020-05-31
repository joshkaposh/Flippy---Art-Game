export class Tile {
    constructor(){
        this.element = document.createElement("canvas")
        this.state = "default"
        this.rotation = "default"
    }
    
    render(){
        let element = this.element;
        
        function tileAtt(){
            element.setAttribute("class", "tile")
            element.setAttribute("data-rotation", "default")
            element.setAttribute("data-state", "default")
        }
        function drawTile() {
            let pen = element.getContext("2d")
            pen.beginPath()
            pen.moveTo(0,0)
            pen.lineTo(300,150)
            pen.lineTo(300,0)
            pen.fill()
        }
        tileAtt()
        drawTile();
        document.querySelector("#grid").appendChild(this.element)
        return this.element;
    }


}