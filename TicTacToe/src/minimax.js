import { Player } from './player.js';
import { State } from './state.js';

const LOSS = -10;
const WIN = 10;
const TIE = 0;

export class Minimax extends Player {

	/**
	 * @type {Player}
	 */
	opponent;

	/**
	 * @param {Player} opponent
	 * @param {string} symbol
	 */
	constructor(opponent, symbol) {
		super(symbol);
		this.opponent = opponent;
	}

	/**
	 * @param {number[]} board
	 * @return {number|null}
	 */
	getMove(board) {
		let possible_moves = this.getPossibleMoves(board);
		let possible_move_count = possible_moves.length
		let rated_moves = [];

		for (let i = 0, i_max = possible_move_count; i < i_max; i++) {
			let state = new State([...board]);
			let move = possible_moves[i];

			state.addMove(this, move);
			rated_moves[move] = this.getScore(this, state);
		}

		let best_rating = 0;
		let best_move = null;

		for (let move in rated_moves) {
			if (null === best_move || rated_moves[move] > best_rating) {
				best_move = move;
			}
		}

		if (null !== best_move) {
			return parseInt(best_move);
		}

		return null;
	}

	/**
	 * @param {Player} player
	 * @param {State} state
	 * @return {number}
	 */
	getScore(player, state) {
		switch (state.getWinner()) {
			case this.opponent.symbol:
				return LOSS;
			case this.symbol:
				return WIN;
			default:
				return TIE;
		}
	}

	/**
	 * @param {[]} board
	 * @return {number[]}
	 */
	getPossibleMoves(board) {
		let indices = [];
		for (let i = 0, i_max = 9; i < i_max; i++) {
			if (null === board[i]) {
				indices.push(i);
			}
		}

		return indices;
	}

}