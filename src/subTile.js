import ItemTile from "./tile.js";

export default class SubTile extends ItemTile {

    static typesDictionary = [
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
    
    constructor(id, type, subTyleName) {
        super.id = id
        super.type = type
        super.name = type
    }
    
    static getClassStringById(id){
        let entry = SubTile.typesDictionary.filter(o => o.id === (id+1))
        return entry[0].name
    }

    static getHeightLevelById(id) {
        return SubTile.typesDictionary.filter(o => o.id === (id+1))
    }
    
    //     [1, "dirt1", 1, 3],
    //     [2, "dirt2", 2, 2],
    //     [3, "dirt3", 3, 1],
    //     [4, "grass1", 4, 5],
    //     [5, "grass2", 5, 6],
    //     [6, "grass3", 6, 7],
    //     [7, "sand1", 7, 4],
    //     [8, "water1", 8, 0],
    //     [9, "hole1", -1]

}