import ItemTile from "./tile.js";

export default class SubTile extends ItemTile {
    
    constructor(id, type, subTyleName) {
        super.id = id
        super.type = type
        super.name = type
    }
    
}