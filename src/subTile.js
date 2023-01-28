import ItemTile from "./tile.js";

export default class SubTile extends ItemTile {

    sid
    subTileModifictionValues
    _debugDesplayValueType = -1
    static subTilesCSSClassTemplate = `sub-%s-e-%s`

    /**
     * @param {any} value
     */
    set debugDesplayValueType(value) {
        this._debugDesplayValueType = 1
    }

    constructor(sid, subTileModifictionValues, parentId, parentType, parentName) {
        super(parentId, parentType, parentName)
        this.sid = sid
        this.subTileModifictionValues = subTileModifictionValues
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
     *
     *
     * @returns
     * @memberof SubTile
     */
    render() {
        
        let itemSubItemElementDOM = document.createElement("span");
        let dataObjSubTypeAttr = document.createAttribute("data-obj-sub-type");

        /* Render sub-til via. styling attribute selector */
        dataObjSubTypeAttr.value = this.subTileModifictionValues[this.sid]
        itemSubItemElementDOM.setAttributeNode(dataObjSubTypeAttr);

        // Print item id or type ID in center sub box
        if (this.sid === 5) {
            itemSubItemElementDOM.textContent = SubTile._debugDisplay(
                [
                    this.id, 
                    this.name
                ], 
                this._debugDesplayValueType
            )
        }

        return itemSubItemElementDOM
    }
}
