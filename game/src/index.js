import GameMap from "./map.js";
import { gameEnv } from "./../core/global.js";
'use strict';


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

	let gameMapObject
	let sceneLevelData 

	const mapsFolderPath = './maps/' /*gameMapObject.path */
	const mapProtoSummerPath = 'proto-summer/'

	// load html template
	async function loadTemplate() {
		const response = await fetch('./render/scenes/match/tpl-game.html');
		const template = await response.text();
		return template;
	}

	// Load level data
	async function loadMapData() {
		let levelData = await import('../' + mapsFolderPath + mapProtoSummerPath + 'data.json', { assert: { type: "json" } } );
		return levelData
	}


	const templatePromise = loadTemplate();

	let game = document.querySelector('#game');


	templatePromise.then((template) => {
		game.innerHTML = template;
	})
	.finally( () => {

		sceneLevelData = loadMapData()
		/* --- Loading --- */
		sceneLevelData.then(
			function (value) {
				gameMapObject = new GameMap('[data-render-block="map-matrix"]', value.default.tilesData)
				gameMapObject.buildDom()
			}
		).then(
			function(value) { }
		)
		/* --- --- */
	});


	
	// let gameMapObject
	// let sceneLevelData = loadMapData()
	

	// let wc = document.querySelector('test-protol')
	// console.dir(wc.shadowRoot);

	// customElements.whenDefined('minimap-panel').then(() => {
	// 	let wc = document.querySelector('minimap-panel')
	// 	console.dir(wc.shadowRoot);
	// })

	// document.querySelector('[slot = "typeDescription"]').innerText = 'POI'
});


export const config = gameEnv