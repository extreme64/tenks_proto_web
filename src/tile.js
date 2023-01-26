'use strict';

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
     * Name as in CSS 
     *
     * @memberof ItemTile
     */
    name


    /**
     * Creates an instance of ItemTile.
     * 
     * @param {*} id
     * @param {*} type
     * @param {string} [tileName="mapTile"]
     * @memberof ItemTile
     */
    constructor(id, type, tileName = "mapTile") {
        this.id = id
        this.type = type
        this.index = id
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
        let index = 0
        neigbours.forEach(function (neigbour, key) {

            let areSame
            let itemValueAsNumber = Number.parseInt(itemType)

            if (neigbour >= 0 && neigbour <= mapSize * mapSize - 1) {

                //Check for all sides
                areSame = (itemValueAsNumber === Number.parseInt(mapItem[neigbour])) ? 0 : 1;

                // Clean edges more
                if (true) {
                    switch (index) {
                        case 0:

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
                                areSame = "sub-1-e-4"
                            }
                            if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerleft')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('topcenter')])) {
                                areSame = "sub-1-e-2"
                            }

                            if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topleft')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('topcenter')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerleft')])) {
                                areSame = "sub-3-e-1"
                            }
                            break;
                        case 2:

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
                                areSame = "sub-1-e-2"
                            }
                            if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topcenter')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerright')])) {
                                areSame = "sub-1-e-6"
                            }

                            // Toching via diagonal aka two outset conners
                            if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('topright')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('topcenter')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerright')])) {
                                areSame = "sub-3-e-3"
                            }
                            break;
                        case 6:

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
                                areSame = "sub-1-e-4"
                            }
                            if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerleft')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('bottomcenter')])) {
                                areSame = "sub-1-e-8"
                            }

                            if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('bottomleft')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerleft')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('bottomcenter')])) {
                                areSame = "sub-3-e-7"
                            }
                            break;
                        case 8:

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
                                areSame = "sub-1-e-6"
                            }
                            if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('centerright')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('bottomcenter')])) {
                                areSame = "sub-1-e-8"
                            }

                            // Toching via diagonal aka two outset conners
                            if (itemValueAsNumber === Number.parseInt(mapItem[neigbours.get('bottomright')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('bottomcenter')])
                                && itemValueAsNumber !== Number.parseInt(mapItem[neigbours.get('centerright')])) {
                                areSame = "sub-3-e-9"
                            }
                            break;
                        default:
                            break;
                    }

                }
                subTypesSetup[index] = areSame;
            } else {
                subTypesSetup[index] = 0;
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
    static tileSubPart(subPartIndex, subTileModifictionValue, debugDisplayValue, debugDisplayType = 0) {

        let itemSubItemElementDOM = document.createElement("span");
        let dataObjSubTypeAttr = document.createAttribute("data-obj-sub-type");

        /* Render sub-til via. styling attribute selector */
        if (isNaN(subTileModifictionValue[subPartIndex - 1])) { // FIXME: wtaf? "undefined" no tile found at index (e.g. -8)
            dataObjSubTypeAttr.value = subTileModifictionValue[subPartIndex - 1]
        } else {
            dataObjSubTypeAttr.value = 'sub-' + subTileModifictionValue[subPartIndex - 1] + "-e-" + subPartIndex;
        }
        itemSubItemElementDOM.setAttributeNode(dataObjSubTypeAttr);

        // Print item id or type ID in center sub box
        if (subPartIndex === 5) {
            itemSubItemElementDOM.textContent = this._debugDisplay([debugDisplayValue.parentIndex, debugDisplayValue.type], debugDisplayType)
        }

        return itemSubItemElementDOM
    }

    /**
     * Debug value to show. None, index or type. [type=[-1,0,1]]
     *
     * @static
     * @param {*} values
     * @param {*} [type=-1]
     * @returns
     * @memberof ItemTile
     */
    static _debugDisplay(values, type = -1) {
        return values[type]
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
