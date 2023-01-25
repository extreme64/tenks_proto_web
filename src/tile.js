export default class ItemTile {
   
    id
    type
    name

    constructor(id, type, tileName) {
        this.id = id
        this.type = type
        this.name = tileName
    }


    static tileNeigbours(tileIndex, mapSize) {

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

    static tileSubPart(subPartIndex, subTileModifictionValue, debugDisplayValue, debugDisplayType = 0) {

        let itemSubItemElementDOM = document.createElement("span");
        let dataObjSubTypeAttr = document.createAttribute("data-obj-sub-type");

        /* Render sub-til via. styling attribute selector */
        if (isNaN(subTileModifictionValue[subPartIndex - 1])) {
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

    static _debugDisplay(values, type = -1) {
        return values[type]
    }   


    /**
    *
    *
    * @param {*} item
    * @param {*} tIndex
    * @returns
    */
    calculateSubTypes(item, tIndex, mapTilesCollection) {

        let itemsArraySize = mapTilesCollection.length

        let mapItem = []

        for (let r = 0; r < itemsArraySize; r++) {
            mapItem[r] = [mapTilesCollection[r]["typeId"]]
        }



        let neigbours = ItemTile.tileNeigbours(tIndex, 8)

        let subTypesSetup = [];

        let topleft
        let topcenter
        let topright
        let centerleft
        let centerright
        let bottomleft
        let bottomcenter
        let bottomright


        neigbours = Object.entries(neigbours)


        let currentTile = 0
        neigbours.map(function (neigbour, index) {

            let areSame
            let itemValuAsNumber = Number.parseInt(item[0])

            if (neigbour[1] >= 0 && neigbour[1] <= 64 - 1) {

                //Check for all sides
                areSame = (itemValuAsNumber === Number.parseInt(mapItem[neigbour[1]])) ? 0 : 1;


                // Clean edges more
                if (true) {

                    topleft = neigbours[0][1]
                    topcenter = neigbours[1][1]
                    topright = neigbours[2][1]
                    centerleft = neigbours[3][1]
                    centerright = neigbours[5][1]
                    bottomleft = neigbours[6][1]
                    bottomcenter = neigbours[7][1]
                    bottomright = neigbours[8][1]



                    switch (index) {
                        case 0:

                            if (itemValuAsNumber === Number.parseInt(mapItem[topcenter])) {
                                areSame = 0
                            } else if (itemValuAsNumber === Number.parseInt(mapItem[centerleft])) {
                                areSame = 0 // horisontal edge
                            }
                            if (itemValuAsNumber === Number.parseInt(mapItem[topcenter])
                                && itemValuAsNumber === Number.parseInt(mapItem[centerleft])
                                && itemValuAsNumber !== Number.parseInt(mapItem[topleft])) {
                                areSame = 2
                            }

                            if (itemValuAsNumber === Number.parseInt(mapItem[topcenter])
                                && itemValuAsNumber !== Number.parseInt(mapItem[centerleft])) {
                                areSame = "sub-1-e-4"
                            }
                            if (itemValuAsNumber === Number.parseInt(mapItem[centerleft])
                                && itemValuAsNumber !== Number.parseInt(mapItem[topcenter])) {
                                areSame = "sub-1-e-2"
                            }

                            if (itemValuAsNumber === Number.parseInt(mapItem[topleft])
                                && itemValuAsNumber !== Number.parseInt(mapItem[topcenter])
                                && itemValuAsNumber !== Number.parseInt(mapItem[centerleft])) {
                                areSame = "sub-3-e-1"
                            }
                            break;
                        case 2:

                            // Strait out neighbore 
                            if (itemValuAsNumber === Number.parseInt(mapItem[centerright])) {
                                areSame = 0
                            } else if (itemValuAsNumber === Number.parseInt(mapItem[topcenter])) {
                                areSame = 0
                            }

                            // Inset conner
                            if (itemValuAsNumber === Number.parseInt(mapItem[centerright])
                                && itemValuAsNumber === Number.parseInt(mapItem[topcenter])
                                && itemValuAsNumber !== Number.parseInt(mapItem[topright])) {
                                areSame = 2
                            }

                            // Edge line connect to neightbor hor/ver
                            if (itemValuAsNumber === Number.parseInt(mapItem[centerright])
                                && itemValuAsNumber !== Number.parseInt(mapItem[topcenter])) {
                                areSame = "sub-1-e-2"
                            }
                            if (itemValuAsNumber === Number.parseInt(mapItem[topcenter])
                                && itemValuAsNumber !== Number.parseInt(mapItem[centerright])) {
                                areSame = "sub-1-e-6"
                            }

                            // Toching via diagonal aka two outset conners
                            if (itemValuAsNumber === Number.parseInt(mapItem[topright])
                                && itemValuAsNumber !== Number.parseInt(mapItem[topcenter])
                                && itemValuAsNumber !== Number.parseInt(mapItem[centerright])) {
                                areSame = "sub-3-e-3"
                            }
                            break;
                        case 6:

                            if (itemValuAsNumber === Number.parseInt(mapItem[centerleft])) {
                                areSame = 0
                            } else if (itemValuAsNumber === Number.parseInt(mapItem[bottomcenter])) {
                                areSame = 0
                            }

                            if (itemValuAsNumber === Number.parseInt(mapItem[centerleft])
                                && itemValuAsNumber === Number.parseInt(mapItem[bottomcenter])
                                && itemValuAsNumber !== Number.parseInt(mapItem[bottomleft])) {
                                areSame = 2
                            }

                            if (itemValuAsNumber === Number.parseInt(mapItem[bottomcenter])
                                && itemValuAsNumber !== Number.parseInt(mapItem[centerleft])) {
                                areSame = "sub-1-e-4"
                            }
                            if (itemValuAsNumber === Number.parseInt(mapItem[centerleft])
                                && itemValuAsNumber !== Number.parseInt(mapItem[bottomcenter])) {
                                areSame = "sub-1-e-8"
                            }

                            if (itemValuAsNumber === Number.parseInt(mapItem[bottomleft])
                                && itemValuAsNumber !== Number.parseInt(mapItem[centerleft])
                                && itemValuAsNumber !== Number.parseInt(mapItem[bottomcenter])) {
                                areSame = "sub-3-e-7"
                            }
                            break;
                        case 8:

                            if (itemValuAsNumber === Number.parseInt(mapItem[centerright])) {
                                areSame = 0
                            } else if (itemValuAsNumber === Number.parseInt(mapItem[bottomcenter])) {
                                areSame = 0
                            }

                            // Terrain type inner conner
                            if (itemValuAsNumber === Number.parseInt(mapItem[centerright])
                                && itemValuAsNumber === Number.parseInt(mapItem[bottomcenter])
                                && itemValuAsNumber !== Number.parseInt(mapItem[bottomright])) {
                                areSame = 2
                            }

                            if (itemValuAsNumber === Number.parseInt(mapItem[bottomcenter])
                                && itemValuAsNumber !== Number.parseInt(mapItem[centerright])) {
                                areSame = "sub-1-e-6"
                            }
                            if (itemValuAsNumber === Number.parseInt(mapItem[centerright])
                                && itemValuAsNumber !== Number.parseInt(mapItem[bottomcenter])) {
                                areSame = "sub-1-e-8"
                            }

                            // Toching via diagonal aka two outset conners
                            if (itemValuAsNumber === Number.parseInt(mapItem[bottomright])
                                && itemValuAsNumber !== Number.parseInt(mapItem[bottomcenter])
                                && itemValuAsNumber !== Number.parseInt(mapItem[centerright])) {
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

            currentTile++;
        });

        return { mapItemIndex: tIndex, initSubTypes: subTypesSetup };
    }
}
