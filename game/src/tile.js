'use strict';
import Misc from "./../core/misc.js";
import SubTile from "./subTile.js";

export default class ItemTile {

    static types = [
        {
            id: 1,
            name: 'dirt1',
            value1: '1',
            heightLevel: '3'
        },
        {
            id: 2,
            name: 'dirt2',
            value1: '2',
            heightLevel: '2'
        },
        {
            id: 3,
            name: 'dirt3',
            value1: '3',
            heightLevel: '1'
        },
        {
            id: 4,
            name: 'grass1',
            value1: '4',
            heightLevel: '5'
        },
        {
            id: 5,
            name: 'grass2',
            value1: '5',
            heightLevel: '6'
        },
        {
            id: 6,
            name: 'grass3',
            value1: '6',
            heightLevel: '7'
        },
        {
            id: 7,
            name: 'sand1',
            value1: '7',
            heightLevel: '4'
        },
        {
            id: 8,
            name: 'water1',
            value1: '8',
            heightLevel: '0'
        },
        {
            id: 9,
            name: 'hole1',
            value1: '9',
            heightLevel: '-1'
        }

    ]

    /**
     * ID value
     *
     * @memberof ItemTile
     */
    id

    /**
     * Type ID
     *
     * @memberof ItemTile
     */
    type

    /**
     * Order in map data array. Same as "id".
     *
     * @memberof ItemTile
     */
    index

    /**
     * CSS class string
     *
     * @memberof ItemTile
     */
    name



    /**
     * Creates an instance of ItemTile.
     * 
     * @param {*} id
     * @param {*} index
     * @param {*} type
     * @param {string} [tileName="mapTile"]
     * @memberof ItemTile
     */
    constructor(id, type, tileName = "mapTile") {
        this.id = id
        this.index = id
        this.type = type
        this.name = tileName
    }

    /**
     * Calculate sub-tile statuses, 
     * based of tile's neigbours in map matrix.
     *
     * @param {*} mapTilesCollection
     * @returns
     * @memberof ItemTile
     */
    calculateSubTypes(mapTilesCollection, mapSize) {

        const itemType = this.type
        const itemInMapIndex = this.id
        const neigbours = ItemTile.tileNeigbours(itemInMapIndex, mapSize, true)

        let mapItem = []
        mapTilesCollection.map((mapTileObj, tileMapIndex) => mapItem[tileMapIndex] = [mapTileObj.typeId])

        let subTypesSetup = [];
        let index = 1
        neigbours.forEach(function (neigbour, key) {

            let areSame
            let itemValueAsNumber = Number.parseInt(itemType)

            //Check for all sides
            areSame = (itemValueAsNumber === Number.parseInt(mapItem[neigbour])) ? 0 : 1;

            switch (index) {

                /* FIXME: Stop tile link if edges continue within the map matrix, break on row end/start (8===9 && row==8 { areSame=false } */
                case 1:

                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topcenter')])) {
                        areSame = 0

                    } else if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerleft')])) {
                        areSame = 0 // horisontal edge
                    }
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topcenter')])
                        && itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerleft')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('topleft')])) {
                        areSame = 2
                    }

                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topcenter')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerleft')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [1, 4]);
                    }
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerleft')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('topcenter')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [1, 2]);
                    }

                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topleft')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('topcenter')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerleft')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [3, 1]);
                    }
                    break;

                case 3:

                    // Strait out neighbore 
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerright')])) {
                        areSame = 0
                    } else if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topcenter')])) {
                        areSame = 0
                    }

                    // Inset conner
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerright')])
                        && itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topcenter')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('topright')])) {
                        areSame = 2
                    }

                    // Edge line connect to neightbor hor/ver
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerright')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('topcenter')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [1, 2]);
                    }
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topcenter')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerright')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [1, 6]);
                    }

                    // Toching via diagonal aka two outset conners
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topright')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('topcenter')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerright')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [3, 3]);
                    }
                    break;

                case 7:

                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerleft')])) {
                        areSame = 0
                    } else if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('bottomcenter')])) {
                        areSame = 0
                    }

                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerleft')])
                        && itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('bottomcenter')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('bottomleft')])) {
                        areSame = 2
                    }

                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('bottomcenter')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerleft')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [1, 4]);
                    }
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerleft')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('bottomcenter')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [1, 8]);
                    }

                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('bottomleft')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerleft')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('bottomcenter')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [3, 7]);
                    }
                    break;

                case 9:

                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerright')])) {
                        areSame = 0
                    } else if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('bottomcenter')])) {
                        areSame = 0
                    }

                    // Terrain type inner conner
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerright')])
                        && itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('bottomcenter')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('bottomright')])) {
                        areSame = 2
                    }

                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('bottomcenter')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerright')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [1, 6]);
                    }
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerright')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('bottomcenter')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [1, 8]);
                    }

                    // Toching via diagonal aka two outset conners
                    if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('bottomright')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('bottomcenter')])
                        && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerright')])) {
                        areSame = Misc.scanf(SubTile.subTilesCSSClassTemplate, [3, 9]);
                    }
                    break;

                default:
                    break;
            }

            subTypesSetup[index] = areSame;
            if (!isNaN(subTypesSetup[index]) || 0 === subTypesSetup[index]) {
                subTypesSetup[index] = Misc.scanf(SubTile.subTilesCSSClassTemplate, [subTypesSetup[index], index]);
            }

            index++
        });

        return { mapItemIndex: itemInMapIndex, initSubTypes: subTypesSetup };
    }


    /**
     * Gets ID offets of the closes neigbouring tiles. 
     * This is used to get real IDs from map data.
     *
     * @static
     * @param {*} tileIndex
     * @param {*} mapSize
     * @param {boolean} [returnAsMap=false]
     * @returns
     * @memberof ItemTile
     */
    static tileNeigbours(tileIndex, mapSize, returnAsMap = false) {

        let rowSize = mapSize

        if (returnAsMap === true) {

            let adjacentTiles = new Map()

            adjacentTiles.set('topleft', tileIndex - (rowSize + 1))
            adjacentTiles.set('topcenter', tileIndex - rowSize)
            adjacentTiles.set('topright', tileIndex - (rowSize - 1))
            adjacentTiles.set('centerleft', tileIndex - 1)
            adjacentTiles.set('center', tileIndex)
            adjacentTiles.set('centerright', tileIndex + 1)
            adjacentTiles.set('bottomleft', tileIndex + (rowSize - 1))
            adjacentTiles.set('bottomcenter', tileIndex + rowSize)
            adjacentTiles.set('bottomright', tileIndex + (rowSize + 1))

            adjacentTiles.forEach((value, key) => {
                if (value < 0) {
                    adjacentTiles.set(key, null)
                }
            })

            return adjacentTiles

        } else {

            let adjacentTilesArray
            adjacentTilesArray = {
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

            return adjacentTilesArray
        }

    }

    /**
     * Create sub-tile DOM element
     *
     * @static
     * @param {*} subPartIndex
     * @param {*} subTileModifictionValue
     * @param {*} debugDisplayValue
     * @param {number} [debugDisplayType=0]
     * @returns
     * @memberof ItemTile
     */
    tileSubPart(subPartIndex, subTileModifictionValue) {

        let tileSubpart = new SubTile(subPartIndex, subTileModifictionValue, this.index, this.type, this.name)
        tileSubpart.debugDesplayValueType = 1

        return tileSubpart.render()
    }

    /**
     * Get CSS class string for tile type. 
     * CSS class defines the style/look of the tile.
     *
     * @static
     * @param {*} id
     * @returns
     * @memberof ItemTile
     */
    static getTypeCSSClass(id) {
        let typeMatched = ItemTile.types.filter(o => o.id === (id + 1))
        return typeMatched[0].name
    }

    /**
     * Get height level
     *
     * @static
     * @param {*} id
     * @returns
     * @memberof ItemTile
     */
    static getTypeHeightLevel(id) {
        let typeMatched = ItemTile.types.filter(o => o.id === (id + 1))
        return typeMatched[0].heightLevel
    }

}
