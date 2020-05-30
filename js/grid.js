import {Tile} from "./tile.js";
export class GameGrid {
    constructor(){
    // Area for properties
        this.grid = document.querySelector("#grid")
        this.gridArray = []
    }   
// Area for methods
    append(){
        let tile = new Tile("tile")
        this.grid.appendChild(tile.element)
        return this.grid
    }

}