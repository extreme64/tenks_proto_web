import ItemTile from "./tile.js";


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


    /* Render map data into a scene by creating all DOM elements */
    buildDom(mapSize) {
        let itemTileObj
        let levelMapWrap = this.elementWrap

        let mapTilesCollection = this.tiles
        let mapTilesCollectionSize = mapTilesCollection.length

        let mapTilesArray = []
        for (let r = 0; r < mapTilesCollectionSize; r++) {
            mapTilesArray[r] = [this.tiles[r]["typeId"]]
        }

        /* Create DOM element to represent map's tiles */
        mapTilesArray.map((item, index) => {

            /* Create tile */
            let itemElementDOM = document.createElement("span");
            let classStringFromdictionary = ItemTile.getTypeCSSClass(item[0])
            let typeClassName
            if (classStringFromdictionary !== '') {
                typeClassName = classStringFromdictionary
            }
            
            /* Add attributes to the iterated tile */
            let dataObjTypeAttr = document.createAttribute("data-obj-type");
            let n = index + 1;
            dataObjTypeAttr.value = `map-item-${n}`;
            let dataTextureAttr = document.createAttribute("data-texture");
            dataTextureAttr.value = "terrain-1";
            
            itemElementDOM.classList.add(typeClassName);
            itemElementDOM.classList.add("mapTile");
            itemElementDOM.setAttributeNode(dataObjTypeAttr);
            itemElementDOM.setAttributeNode(dataTextureAttr);

            /* Create sub-tiles */
            itemTileObj = new ItemTile(index, item[0], typeClassName)
            let subTileStatusCollection = itemTileObj.calculateSubTypes(mapTilesCollection, this.mapSize);
            for (let subTileIndex = 1; subTileIndex <= this.mapSize + 1; subTileIndex++) {

                itemElementDOM.append(
                    itemTileObj.tileSubPart(
                        subTileIndex,
                        subTileStatusCollection['initSubTypes']
                    )
                );
            }

            levelMapWrap.append(itemElementDOM);
        })

        itemTileObj = null
    }
}
