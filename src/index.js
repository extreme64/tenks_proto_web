import GameMap from "./map.js";


const mapItemTest1 = [
	[1], [0], [0], [2], [2], [1], [2], [3],
	[1], [1], [7], [2], [2], [5], [2], [3],
	[1], [1], [1], [4], [0], [1], [2], [3],
	[1], [3], [3], [3], [2], [7], [2], [3],
	[3], [3], [3], [8], [2], [1], [4], [3],
	[1], [5], [2], [5], [4], [1], [7], [3],
	[1], [8], [1], [2], [4], [5], [5], [3],
	[1], [1], [2], [4], [3], [1], [2], [3]
];

const mapItemTest2 = [
	[1], [4], [4], [3], [2], [1], [2], [2],
	[1], [3], [7], [3], [2], [3], [3], [3],
	[1], [1], [3], [2], [5], [3], [2], [2],
	[1], [3], [3], [3], [2], [3], [3], [3],
	[3], [3], [3], [8], [3], [3], [4], [3],
	[1], [5], [2], [3], [4], [1], [7], [1],
	[1], [3], [3], [2], [4], [3], [5], [5],
	[1], [3], [3], [4], [3], [3], [2], [2]
];


const rowSize = 8;
const colSize = 8;

let mapItem = mapItemTest2

let mapIdToLoad = 1 // form list of maps and their file paths




/**
 *
 *
 * @param {*} callback
 */
var ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => { 

	let levelMapWrap = document.querySelector('[data-render-block="map-matrix"]');


	
	const gameMapObject = new GameMap('[data-render-block="map-matrix"]', mapItemTest2)


	const mapPath = gameMapObject.path
	let mapData
	async function loadMapData() {
		mapData = await import('../' + mapPath + 'data.json', { assert: { type: "json" } } );
		return mapData
	}

	let mapddd = loadMapData()
	mapddd.then(
		function (value) { 
			console.table(value.default.title) 
			document.title = value.default.title
			console.table(value.default.description) 
			console.table(value.default.author.name) 
			console.table(value.default.author.email) 
			console.table(value.default.players)
			// console.table(value.default.tilesData)
		
		
			gameMapObject.buildDom()
		},
		function (value) {}
	)
	// console.table(mapddd)


	let wc = document.querySelector('minimap-panel')
	// console.dir(wc.shadowRoot);


	// customElements.whenDefined('minimap-panel').then(() => {
	// 	let wc = document.querySelector('minimap-panel')
	// 	console.dir(wc.shadowRoot);
	// })


	// document.querySelector('[slot = "typeDescription"]').innerText = 'POI'
});
