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
	board;

	/**
	 * Initializes a state for the given board or a new one.
	 * @param {number[]|null} board
	 */
	constructor(board = null) {
		this.board = board ?? this.getBlank();
	}

	/**
	 * @return {array}
	 */
	get board() {
		return this.board;
	}

	/**
	 * @param {Player} player
	 * @param {number} index
	 * @return {void}
	 */
	addMove(player, index) {
		this.abortInvalidMove(index);
		this.board[index] = player.symbol;
	}

	/**
	 * Note that this method can only determine the winner reliably once.
	 *
	 * After the first time a winner is returned and further moves are
	 * added to this state, the returned winner is just the first win-
	 * condition that matches.
	 *
	 * @return {string|null}
	 */
	getWinner() {
		for (let i = 0, i_max = WIN_CONDITIONS.length; i < i_max; i++) {
			let condition = WIN_CONDITIONS[i];
			if (null !== this.board[condition[0]] &&
				this.board[condition[0]] === this.board[condition[1]] &&
				this.board[condition[0]] === this.board[condition[2]]
			) {
				return this.board[condition[0]];
			}
		}

		return null;
	}

	/**
	 * @param {number} index
	 * @return {void}
	 * @throws {Error}
	 */
	abortInvalidMove(index) {
		if (!this.isIndexWithinRange(index)) {
			throw new Error(`Index is not between 0 and 8.`);
		}

		if (!this.isIndexAvailable(index)) {
			throw new Error(`This field is already taken.`);
		}
	}

	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	isIndexAvailable(index) {
		if (!this.isIndexWithinRange(index)) {
			return false;
		}

		return (null === this.board[index]);
	}

	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	isIndexWithinRange(index) {
		return (0 <= index && index <= 8);
	}

	/**
	 * @return {null[]}
	 */
	getBlank() {
		let board = [];
		for (let i = 0, i_max = 9; i < i_max; i++) {
			board[i] = null;
		}

		return board;
	}

}