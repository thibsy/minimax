/** @author Thibeau Fuhrer <fuhrer@thibeau.ch> */

import { State, PLAYER_CIRCLE, PLAYER_CROSS } from './state';
import { Opponent } from './opponent';

/**
 * @type {object}
 */
const SELECTOR = {
	restart: 'game-restart',
	grid: 'game-grid',
};

/**
 * @type {HTMLElement}
 */
const restart_button = document.getElementById(SELECTOR.restart);

/**
 * @type {HTMLElement}
 */
const game_grid = document.getElementById(SELECTOR.grid);

/**
 * @type {Opponent}
 */
const opponent = new Opponent();

/**
 * @type {State}
 */
let game_state = new State();

/**
 * @type {number}
 */
let next_player = PLAYER_CROSS;

/**
 * @param {number} index
 */
let processMoveHook = function (index) {
	let entry = document.getElementById(index.toString());



	restart_button.disabled = false;

	entry.className = (PLAYER_CIRCLE === next_player) ?
		'circle' : 'cross'
	;

	next_player = (PLAYER_CIRCLE === next_player) ?
		PLAYER_CROSS : PLAYER_CIRCLE
	;
};

/**
 * @return {void}
 */
let restartGameHook = function () {
	game_state = new State();
	next_player = PLAYER_CROSS;
	restart_button.disabled = true;

	// remove all circles and crosses from the grid.
	for (let i = 0, i_max = game_grid.children.length; i < i_max; i++) {
		game_grid.children[i].className = '';
	}
};

/**
 * Registers the list-entry and restart button event listeners after
 * the page has loaded.
 */
window.onload = function () {
	restart_button.addEventListener('click', restartGameHook);
	game_grid.addEventListener(
		'click',
		function (event) {
			if (event.target.matches('li')) {
				processMoveHook(parseInt(event.target.id))
			}
		}
	);
};