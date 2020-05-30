import {Tile} from "./tile.js";
import {GameGrid} from "./grid.js"
import {Controls} from "./controls.js"
var tile = new Tile("tile");
var gameGrid = new GameGrid("gameGrid");
var controls = new Controls("controls")

var game = () => {
    controls.start()
}
game()
