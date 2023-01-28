import GameMap from "./map.js";

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
	const mapsFolderPath = './maps/' /*gameMapObject.path */
	const mapProtoSummerPath = 'proto-summer/'

	let levelMapWrap = document.querySelector('[data-render-block="map-matrix"]');

	let mapData
	async function loadMapData() {
		mapData = await import('../' + mapsFolderPath + mapProtoSummerPath + 'data.json', { assert: { type: "json" } } );
		return mapData
	}

	
	let gameMapObject
	let mapddd = loadMapData()
	
	mapddd.then(
		function (value) {

			gameMapObject = new GameMap('[data-render-block="map-matrix"]', value.default.tilesData)

			gameMapObject.buildDom()

			//feed data into minimap
			customElements.whenDefined('minimap-preview').then(() => {
				let minimap = document.querySelector('minimap-preview')
				minimap.setData(value.default.tilesData)
			})
		}
	).then(
		function(value) { }
	)

	// let wc = document.querySelector('test-protol')
	// console.dir(wc.shadowRoot);

	// customElements.whenDefined('minimap-panel').then(() => {
	// 	let wc = document.querySelector('minimap-panel')
	// 	console.dir(wc.shadowRoot);
	// })

	// document.querySelector('[slot = "typeDescription"]').innerText = 'POI'
});
