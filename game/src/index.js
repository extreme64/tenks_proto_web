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

	let levelData
	async function loadMapData() {
		levelData = await import('../' + mapsFolderPath + mapProtoSummerPath + 'data.json', { assert: { type: "json" } } );
		return levelData
	}

	
	let gameMapObject
	let sceneLevelData = loadMapData()
	
	/* --- Loading --- */
	sceneLevelData.then(
		function (value) {

			gameMapObject = new GameMap('[data-render-block="map-matrix"]', value.default.tilesData)

			gameMapObject.buildDom()

			//feed data into minimap
			// TODO: do this from a component level
			customElements.whenDefined('minimap-ui').then(() => {
				let minimap = document.querySelector('minimap-ui')
				minimap.setData(value.default.tilesData)
				minimap.panelType = 'graphicsRender';
			})
		}
	).then(
		function(value) { }
	)
	/* --- --- */

	// let wc = document.querySelector('test-protol')
	// console.dir(wc.shadowRoot);

	// customElements.whenDefined('minimap-panel').then(() => {
	// 	let wc = document.querySelector('minimap-panel')
	// 	console.dir(wc.shadowRoot);
	// })

	// document.querySelector('[slot = "typeDescription"]').innerText = 'POI'
});
