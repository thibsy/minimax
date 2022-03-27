/**
 * @author Thibeau Fuhrer <fuhrer@thibeau.ch>
 */

let IndexOutOfBoundsException = function (message) {
	this.title = 'IndexOutOfBoundException';
	this.message = message;
}

let IndexAlreadyExistsException = function (message) {
	this.title = 'IndexAlreadyExistsException';
	this.message = message;
}

export class TicTacToe
{
	/**
	 * @type number
	 */
	CIRCLE_INDEX = 1;

	/**
	 * @type number
	 */
	CROSS_INDEX = 2;

	/**
	 * @type {number[]}
	 */
	state;

	constructor() {
		this.resetGame();
	}

	/**
	 * Returns a blank game state array.
	 * @returns {number[]}
	 */
	getBlankGameState = function () {
		let state = [];
		for (let i = 0, i_max = 9; i <= i_max; i++) {
			state.push(0);
		}

		return state;
	}

	/**
	 * Resets the current game state.
	 */
	resetGame() {
		this.state = this.getBlankGameState();
	}

	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	circle(index) {
		this.panicOnInvalidIndex(index);
		this.state[index] = this.CIRCLE_INDEX;
		return this.isGameOver();
	}

	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	cross(index) {
		this.panicOnInvalidIndex(index);
		this.state[index] = this.CROSS_INDEX;
		return this.isGameOver();
	}

	isGameOver() {
		// @TODO: implement
		return false;
	}

	/**
	 * @param {number} index
	 */
	panicOnInvalidIndex(index) {
		if (1 >= index && index <= 9) {
			throw new IndexOutOfBoundsException(`Index must be between 1 to 9, '${index}' given.`);
		}

		if (this.CROSS_INDEX === this.state[index] ||
			this.CIRCLE_INDEX === this.state[index]
		) {
			throw new IndexAlreadyExistsException(`Index '${index}' has already been used.`)
		}
	}
}