/**
 * @type {number}
 */
export const PLAYER_CIRCLE = 0;

/**
 * @type {number}
 */
export const PLAYER_CROSS = 1;

/**
 * @type {number[][]}
 */
const WIN_CONDITIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export class State {
	/**
	 * @type {array}
	 */
	grid;

	/**
	 * @type {number|null}
	 */
	winner;

	/**
	 * @constructor
	 */
	constructor() {
		this.grid = getBlankGrid();
		this.winner = null;
	}

	/**
	 * @return {array}
	 */
	get grid() {
		return this.grid;
	}

	/**
	 * @return {number|null}
	 */
	get winner() {
		return getWinner(this.grid);
	}

	/**
	 * @param {number} index
	 * @param {number} player
	 * @throws {Error}
	 */
	makeMove(index, player) {
		maybeAbortMove(this, index, player);
		this.grid[index] = player;
	}

	/**
	 * @param {number} index
	 * @throws {Error}
	 */
	circle(index) {
		this.makeMove(index, PLAYER_CIRCLE);
	}

	/**
	 * @param {number} index
	 * @throws {Error}
	 */
	cross(index) {
		this.makeMove(index, PLAYER_CROSS);
	}
}

/**
 * @param {State} state
 * @param {number} index
 * @param {number} player
 * @throws {Error}
 */
let maybeAbortMove = function (state, index, player) {
	if (null !== state.winner) {
		throw new Error(`Player '${state.winner}' has already won.`);
	}

	if (1 > index || index > 9) {
		throw new RangeError(`Index '${index}' is not between 1 and 9.`);
	}

	if (null !== state.grid[index]) {
		throw new Error(`Index '${index}' belongs to player '${state.grid[index]}'.`);
	}
}

/**
 * @param {array} current_grid
 * @return {number|null}
 */
let getWinner = function (current_grid) {
	WIN_CONDITIONS.forEach(function (condition) {
		if (null !== current_grid[condition[0]] &&
			current_grid[condition[0]] === current_grid[condition[1]] &&
			current_grid[condition[0]] === current_grid[condition[2]]
		) {
			return current_grid[condition[0]];
		}
	});

	return null;
}

/**
 * @return {null[]}
 */
let getBlankGrid = function () {
	let blank_state = [];
	for (let i = 0, i_max = 9; i <= i_max; i++) {
		blank_state[i] = null;
	}

	return blank_state;
}