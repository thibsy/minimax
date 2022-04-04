import { State, PLAYER_CIRCLE, PLAYER_CROSS } from './state';
import { Opponent } from './opponent';

/**
 * @type {object}
 */
const SELECTOR = {
	message: 'game-message',
	restart: 'game-restart',
	grid: 'game-grid',
};

/**
 * @type {object}
 */
const CSS = {
	success: 'success',
	error: 'error',
	invisible: 'invisible',
	visible: 'visible',
	circle: 'circle',
	cross: 'cross',
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
 * @param {number} player
 * @return {string}
 */
let getSymbol = function (player) {
	return (PLAYER_CIRCLE === player) ?
		CSS.circle : CSS.cross
	;
};

/**
 * @param {string} message
 * @param {boolean} permanently
 */
let displayError = function (message, permanently = false) {
	let element = document.getElementById(SELECTOR.error);

	element.innerHTML = message
	element.className = `${CSS.visible} ${CSS.error}`;

	if (!permanently) {
		setTimeout(
			function () {
				element.className = CSS.invisible;
			},
			2000
		);
	}
};

/**
 * @param {string} message
 */
let displaySuccess = function (message) {
	let element = document.getElementById(SELECTOR.error);

	element.innerHTML = message
	element.className = `${CSS.visible} ${CSS.success}`;
};

/**
 * @param {number} index
 */
let humanPlayerMoveHook = function (index) {
	// (redundantly) enable the restart button.
	restart_button.disabled = false;

	// abort if there's already a winner.
	if (null !== game_state.winner) {
		return false;
	}

	let human_move = processMove(index);
	if (null !== human_move) {
		displaySuccess(`Congratulations! You've managed to cheat &1F609;`);
		return false;
	}

	let opponent_move = processMove(
		opponent.getMove(game_state, PLAYER_CIRCLE)
	);

	if (null !== opponent_move) {
		displayError(`I'm sorry, you've lost ... &1F642;`);
		return false;
	}
}

/**
 * @param {number} index
 * @return {number|null}
 */
let processMove = function (index) {
	// abort if there's already a winner.
	if (null !== game_state.winner) {
		return game_state.winner;
	}

	try {
		game_state.makeMove(index, current_player);
		document
			.getElementById(index.toString())
			.className = getSymbol(current_player)
		;
	} catch (error) {
		displayError(error.message);
		return null;
	}
};

/**
 * @return {void}
 */
let restartGameHook = function () {
	game_state = new State();
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
				humanPlayerMoveHook(parseInt(event.target.id))
			}
		}
	);
};