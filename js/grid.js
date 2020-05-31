import {Tile} from "./tile.js";
export class GameGrid {
    constructor(){
    // Area for properties
        this.grid = document.querySelector("#grid")
        this.gridArray = []
        this.tile = new Tile("tile")
    }   
// Area for methods

    render(){
        let idNum = 0;
        let tile = this.tile;
        for(let i = 0; i < 100; i++){
            tile = new Tile("tile")
            idNum++
            idNum.toString()
            tile.element.setAttribute("id", idNum)
            tile.render()
            this.gridArray.push(tile)
            
        }
        return this.grid;
    }

    reset(){
        let elements =  document.getElementsByClassName("tile");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0])
        }
    }


// END OF GAMEGRID CLASS
}