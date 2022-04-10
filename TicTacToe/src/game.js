import { Minimax } from './minimax.js';
import { Player } from './player.js';
import { State } from './state.js';

/**
 * @type {object}
 */
const SELECTORS = {
	message: 'game-message',
	restart: 'game-restart',
	board:	 'game-board',
};

/**
 * @type {object}
 */
const CLASSES = {
	invisible: 'invisible',
	visible:   'visible',
	success:   'success',
	failure:   'failure',
	common:	   'common',
};

export class Game {

	/**
	 * @type {HTMLElement}
	 */
	message;

	/**
	 * @type {HTMLButtonElement}
	 */
	restart;

	/**
	 * @type {HTMLElement}
	 */
	board;

	/**
	 * @type {Player}
	 */
	current_player;

	/**
	 * @type {Player}
	 */
	computer;

	/**
	 * @type {Player}
	 */
	human;

	/**
	 * @type {Player|null}
	 */
	winner;

	/**
	 * @type {State}
	 */
	state;

	/**
	 * Retrieves all elements from DOM and sets up the players and state.
	 * @throws {Error}
	 */
	constructor() {
		this.message = document.getElementById(SELECTORS.message);
		this.restart = document.getElementById(SELECTORS.restart);
		this.board 	 = document.getElementById(SELECTORS.board);

		if (null === this.message || null === this.restart || null === this.board) {
			throw new Error(`Could not retrieve all necessary elements from DOM.`);
		}

		this.current_player = new Player('cross');
		this.computer = new Minimax('circle');
		this.human = this.current_player;
		this.winner = null;
		this.state = new State();
	}

	/**
	 * @return {void}
	 */
	setupDOM() {
		// use arrow functions to enable usage of 'this' in class context.
		this.restart.addEventListener('click', () => { this.restartHook() });
		this.board.addEventListener('click', (event) => { this.delegateHook(event) });

		this.restart.disabled = true;
		this.message.className = CLASSES.invisible
		this.message.innerHTML = '';

		for (let i = 0, i_max = 9; i < i_max; i++) {
			let list_item = document.createElement('li');
			list_item.id = i.toString();
			this.board.append(list_item);
		}
	}

	/**
	 * @param {MouseEvent} event
	 */
	delegateHook(event) {
		if (event.target.matches('li')) {
			this.boardHook(parseInt(event.target.id));
		}
	}

	/**
	 * @param {number} index
	 * @return {void}
	 */
	boardHook(index) {
		this.restart.disabled = false;

		let list_item = document.getElementById(index.toString());
		if ('' !== list_item.className || null !== this.winner) {
			return;
		}

		try {
			this.state.addMove(this.current_player, index);
			this.winner = this.getWinner();

			list_item.className = this.current_player.symbol;
		} catch (failure) {
			this.showMessage(failure.message, CLASSES.failure);
			return;
		}

		if (this.isGameOver()) {
			if (null !== this.winner && this.winner.symbol === this.computer.symbol) {
				this.showMessage('computer won', CLASSES.failure, false);
			}

			if (null !== this.winner && this.winner.symbol === this.human.symbol) {
				this.showMessage('human won', CLASSES.success, false);
			}

			if (null === this.winner) {
				this.showMessage(`it's a tie!`, CLASSES.common, false);
			}

			return;
		}

		this.toggleCurrentPlayer();
	}

	/**
	 * @return {void}
	 */
	restartHook() {
		let list_entries = this.board.getElementsByTagName('li');
		for (let i = 0, i_max = list_entries.length; i < i_max; i++) {
			list_entries[i].className = '';
		}

		this.restart.disabled = true;
		this.current_player = this.human;
		this.winner = null;
		this.state = new State();

		this.resetMessage();
	}

	/**
	 * @param {string} message
	 * @param {string} type
	 * @param {boolean} temporary
	 */
	showMessage(message, type, temporary = false) {
		this.message.innerHTML = message;
		this.message.className = `${type} ${CLASSES.visible}`;

		if (temporary) {
			setTimeout(this.resetMessage, 2000);
		}
	}

	/**
	 * @return {void}
	 */
	toggleCurrentPlayer() {
		if (this.current_player.symbol === this.human.symbol) {
			this.current_player = this.computer;
		} else {
			this.current_player = this.human;
		}
	}

	/**
	 * @return {boolean}
	 */
	isGameOver() {
		return (
			null !== this.state.getWinner() ||
			!this.state.board.includes(null)
		);
	}

	/**
	 * @return {void}
	 */
	resetMessage() {
		this.message.className = CLASSES.invisible
		this.message.innerHTML = '';
	}

	/**
	 * @return {Player|null}
	 */
	getWinner() {
		switch (this.state.getWinner()) {
			case this.computer.symbol:
				return this.computer;
			case this.human.symbol:
				return this.human;
			default:
				return null;
		}
	}

}