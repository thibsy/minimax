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

		let possibilities = state.getPossibleMoves();
		let best_rating = null;
		let best_move = null;

		for (let i = 0, i_max = possibilities.length; i < i_max; i++) {
			let current_move = possibilities[i];

			state.makeMove(this, current_move);

			let current_rating = this.minimax(this.opponent, state);

			state.undoMove(this, current_move);

			if (null === best_rating || current_rating > best_rating) {
				best_rating = current_rating;
				best_move = current_move;
			}
		}

		return best_move;
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
				depth++
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