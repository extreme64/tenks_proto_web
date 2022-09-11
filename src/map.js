import ItemTile     from "./tile.js";
import SubTile from "./subTile.js";


export default class GameMap {

    _name
    _id
    mapSize
    _elementWrap
    _tiles
    _path;
    
    constructor(elementWrapSelector, tiles) {
        this._name = "proto_summer"
        this._id = "0"
        this.mapSize = 8
        this._elementWrap = document.querySelector(elementWrapSelector);
        this._tiles = tiles
        this._path = './maps/proto-summer/'
        this.buildDom = this.buildDom.bind(this) // bind this in method
    }

    get id() {
        return this._id
    }
    set id(value) {
        this._id = value
    }
    get tiles() {
        return this._tiles
    }
    set tiles(value) {
        this._tiles = value
    }
    get mapSize() {
        return this._mapSize
    }
    set mapSize(value) {
        this._mapSize = value
    }
    get elementWrap() {
        return this._elementWrap;
    }
    set elementWrap(value) {
        this._elementWrap = value;
    }
    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
    }
    
    
    buildDom(mapSize) {

        let mapItem = this.tiles
        let levelMapWrap = this.elementWrap

        mapItem.map((item, index) => {
            
            /* Tile element */
            let itemElementDOM = document.createElement("span");

            /* CSS class */
            let classStringFromdictionary = SubTile.getClassStringById(item[0])
            let typeClassName
            if (classStringFromdictionary !== '') {
                typeClassName = classStringFromdictionary
            }
            itemElementDOM.classList.add(typeClassName)
            itemElementDOM.classList.add("mapTile");
            
            
            /* Add sub tiles into DOM */
            let parentChanges = this.calculateSubTypes(item, index);
            for (let sti = 1; sti <= this.mapSize + 1; sti++) {

                let itemSubItemElementDOM = document.createElement("span");
                itemElementDOM.append(
                    this.tileSubPart(
                        sti, 
                        parentChanges['initSubTypes'],
                        {
                            'type': item, 
                            'parentIndex': index
                        },
                    )
                );

            }

            /* Tile element attributes */
            let dataObjTypeAttr = document.createAttribute("data-obj-type");
            let n = index + 1;
            dataObjTypeAttr.value = `map-item-${n}`;
            itemElementDOM.setAttributeNode(dataObjTypeAttr);
            levelMapWrap.append(itemElementDOM);

            let dataTextureAttr = document.createAttribute("data-texture");
            dataTextureAttr.value = "terrain-1";
            itemElementDOM.setAttributeNode(dataTextureAttr);
            levelMapWrap.append(itemElementDOM);

        })
    }

    tileSubPart(subPartIndex, parentChanges, parentDebugValues, parentValueDisplay = 1) {

        let itemSubItemElementDOM = document.createElement("span");
        //itemElementDOM.append(itemSubItemElementDOM);

        let dataObjSubTypeAttr = document.createAttribute("data-obj-sub-type");

        if (isNaN(parentChanges[subPartIndex - 1])) {
            dataObjSubTypeAttr.value = parentChanges[subPartIndex - 1]
        } else {
            dataObjSubTypeAttr.value = 'sub-' + parentChanges[subPartIndex - 1] + "-e-" + subPartIndex;
        }

        // add sub type styling - background sprite
        itemSubItemElementDOM.setAttributeNode(dataObjSubTypeAttr);

        // print item id or type in center sub box
        if (subPartIndex === 5)
            if (parentValueDisplay === 1) {
                itemSubItemElementDOM.textContent = parentDebugValues.parentIndex
            } else {
                itemSubItemElementDOM.textContent = parentDebugValues.type
            }

        return itemSubItemElementDOM
    }

    /**
    *
    *
    * @param {*} item
    * @param {*} tIndex
    * @returns
   */
    calculateSubTypes(item, tIndex) {

        let mapItem = this.tiles

        let neigbours = ItemTile.neigbours(tIndex, 8)

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

            if (neigbour[1] >= 0 && neigbour[1] <= 64 - 1) {

                //Check for all sides
                areSame = (Number.parseInt(item[0]) === Number.parseInt(mapItem[neigbour[1]])) ? 0 : 1;


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

                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[topcenter])) {
                                areSame = 0
                            } else if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerleft])) {
                                areSame = 0 // horisontal edge
                            }
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[topcenter])
                                && Number.parseInt(item[0]) === Number.parseInt(mapItem[centerleft])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[topleft])) {
                                areSame = 2
                            }

                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[topcenter])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[centerleft])) {
                                areSame = "sub-1-e-4"
                            }
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerleft])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[topcenter])) {
                                areSame = "sub-1-e-2"
                            }

                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[topleft])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[topcenter])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[centerleft])) {
                                areSame = "sub-3-e-1"
                            }
                            break;
                        case 2:

                            // Strait out neighbore 
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerright])) {
                                areSame = 0
                            } else if (Number.parseInt(item[0]) === Number.parseInt(mapItem[topcenter])) {
                                areSame = 0
                            }

                            // Inset conner
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerright])
                                && Number.parseInt(item[0]) === Number.parseInt(mapItem[topcenter])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[topright])) {
                                areSame = 2
                            }

                            // Edge line connect to neightbor hor/ver
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerright])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[topcenter])) {
                                areSame = "sub-1-e-2"
                            }
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[topcenter])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[centerright])) {
                                areSame = "sub-1-e-6"
                            }

                            // Toching via diagonal aka two outset conners
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[topright])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[topcenter])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[centerright])) {
                                areSame = "sub-3-e-3"
                            }
                            break;
                        case 6:

                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerleft])) {
                                areSame = 0
                            } else if (Number.parseInt(item[0]) === Number.parseInt(mapItem[bottomcenter])) {
                                areSame = 0
                            }

                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerleft])
                                && Number.parseInt(item[0]) === Number.parseInt(mapItem[bottomcenter])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[bottomleft])) {
                                areSame = 2
                            }

                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[bottomcenter])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[centerleft])) {
                                areSame = "sub-1-e-4"
                            }
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerleft])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[bottomcenter])) {
                                areSame = "sub-1-e-8"
                            }

                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[bottomleft])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[centerleft])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[bottomcenter])) {
                                areSame = "sub-3-e-7"
                            }
                            break;
                        case 8:

                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerright])) {
                                areSame = 0
                            } else if (Number.parseInt(item[0]) === Number.parseInt(mapItem[bottomcenter])) {
                                areSame = 0
                            }

                            // Terrain type inner conner
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerright])
                                && Number.parseInt(item[0]) === Number.parseInt(mapItem[bottomcenter])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[bottomright])) {
                                areSame = 2
                            }

                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[bottomcenter])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[centerright])) {
                                areSame = "sub-1-e-6"
                            }
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[centerright])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[bottomcenter])) {
                                areSame = "sub-1-e-8"
                            }

                            // Toching via diagonal aka two outset conners
                            if (Number.parseInt(item[0]) === Number.parseInt(mapItem[bottomright])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[bottomcenter])
                                && Number.parseInt(item[0]) !== Number.parseInt(mapItem[centerright])) {
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
