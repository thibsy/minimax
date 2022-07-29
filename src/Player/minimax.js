import { Player } from './player.js';
import { State } from '../state.js';

/**
 * @author Thibeau Fuhrer <fuhrer@thibeau.ch>
 */
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
	 * @param {State} state
	 * @return {number|null}
	 */
	getMove(state) {
		if (state.isGameOver()) {
			return null;
		}

		let possible_moves = state.getPossibleMoves();
		let ratings = [];

		for (let i = 0, i_max = possible_moves.length; i < i_max; i++) {
			let current_move = possible_moves[i];

			state.makeMove(this, current_move);

			ratings.push(this.minimax(this.opponent, state));

			state.undoMove(this, current_move);
		}

		let best_rating = Math.max(...ratings);
		let best_moves = [];

		for (let i = 0, i_max = ratings.length; i < i_max; i++) {
			if (best_rating === ratings[i]) {
				best_moves.push(possible_moves[i]);
			}
		}

		// if there are multiple best moves, return one randomly.
		if (1 < best_moves.length) {
			return best_moves[Math.floor(Math.random() * best_moves.length)];
		}

		return best_moves[0];
	}

	/**
	 * @param {Player} player
	 * @param {State} state
	 * @param {number} depth
	 * @return {number}
	 */
	minimax(player, state, depth = 0) {
		if (state.isGameOver()) {
			return this.getScore(player, state, depth);
		}

		let maximize = this.isMaximizingPlayer(player);
		let rating = (maximize) ? -Infinity : Infinity;
		let possibilities = state.getPossibleMoves();

		for (let i = 0, i_max = possibilities.length; i < i_max; i++) {
			let current_move = possibilities[i];

			state.makeMove(player, current_move);

			let current_rating = this.minimax(
				this.getOppositePlayer(player),
				state,
				(depth + 1)
			);

			state.undoMove(player, current_move);

			if (maximize) {
				rating = Math.max(current_rating, rating);
			} else {
				rating = Math.min(current_rating, rating);
			}
		}

		return rating;
	}

	/**
	 * @param {Player} player
	 * @param {State} state
	 * @param {number} depth
	 * @return {number}
	 */
	getScore(player, state, depth) {
		switch (state.getWinner()) {
			case this.opponent.symbol:
				return -10 + depth;
			case this.symbol:
				return 10 - depth;
			default:
				return 0;
		}
	}

	/**
	 * @param {Player} player
	 * @return {Player}
	 */
	getOppositePlayer(player) {
		if (this.isMaximizingPlayer(player)) {
			return this.opponent;
		}

		return this;
	}

	/**
	 * @param {Player} player
	 * @return {boolean}
	 */
	isMaximizingPlayer(player) {
		return (this.symbol === player.symbol);
	}

}