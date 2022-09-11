import GameMap from "./map.js";

export default class ItemTile {
   
    id
    type
    name

    constructor(id, type, tileName) {
        this.id = id
        this.type = type
        this.name = tileName
    }


    static neigbours(tileIndex, mapSize) {

        let rowSize = mapSize

        return {
            'topleft': tileIndex - (rowSize + 1),
            'topcenter': tileIndex - rowSize,
            'topright': tileIndex - (rowSize - 1),
            'centerleft': tileIndex - 1,
            'center': tileIndex,
            'centerright': tileIndex + 1,
            'bottomleft': tileIndex + (rowSize - 1),
            'bottomcenter': tileIndex + rowSize,
            'bottomright': tileIndex + (rowSize + 1)
        };
    }

   

}
