import { Minimax } from './minimax.js';
import { Player } from './player.js';
import { State } from './state.js';

/**
 * @type {object}
 */
const SELECTORS = {
	restart: 'game-restart',
	overlay: 'game-overlay',
	message: 'game-message',
	error:   'game-error',
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
};

/**
 * @type {object}
 */
const MESSAGES = {
	win:   `You've won!`,
	loose: `You've lost!`,
	tie:   `It's a tie!`,
};

export class Game {

	// DOM elements:

	/**
	 * @type {HTMLButtonElement}
	 */
	restart;

	/**
	 * @type {HTMLDivElement}
	 */
	overlay;

	/**
	 * @type {HTMLParagraphElement}
	 */
	message;

	/**
	 * @type {HTMLParagraphElement}
	 */
	error;

	/**
	 * @type {HTMLUListElement}
	 */
	board;

	// Game elements:

	/**
	 * @type {Player}
	 */
	current_player;

	/**
	 * @type {Player|null}
	 */
	winner;

	/**
	 * @type {Player}
	 */
	computer;

	/**
	 * @type {Player}
	 */
	human;

	/**
	 * @type {State}
	 */
	state;

	/**
	 * Retrieves all elements from DOM and sets up the players and state.
	 * @throws {Error}
	 */
	constructor() {
		this.overlay = document.getElementById(SELECTORS.overlay);
		this.restart = document.getElementById(SELECTORS.restart);
		this.message = document.getElementById(SELECTORS.message);
		this.error   = document.getElementById(SELECTORS.error);
		this.board 	 = document.getElementById(SELECTORS.board);

		if (null === this.error || null === this.restart ||
			null === this.board || null === this.overlay || null === this.message
		) {
			throw new Error(`Could not retrieve all necessary elements from DOM.`);
		}

		this.current_player = new Player('cross');
		this.computer = new Minimax('circle');
		this.human = this.current_player;
		this.state = new State();
		this.winner = null;
	}

	/**
	 * @return {void}
	 */
	setupDOM() {
		// use arrow functions to enable usage of 'this' in class context.
		this.restart.addEventListener('click', () => { this.restartHook() });
		this.board.addEventListener('click', (event) => { this.delegateHook(event) });

		this.restart.disabled = true;
		this.resetOverlay();
		this.resetError();

		for (let i = 0, i_max = 9; i < i_max; i++) {
			let list_item = document.createElement('li');
			list_item.id = i.toString();
			this.board.append(list_item);
		}
	}

	/**
	 * @param {MouseEvent} event
	 * @return {void}
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
		let list_item = document.getElementById(index.toString());
		if ('' !== list_item.className || null !== this.winner) {
			return;
		}

		this.restart.disabled = false;

		try {
			this.state.addMove(this.current_player, index);
			this.winner = this.getWinner();

			list_item.className = this.current_player.symbol;
		} catch (failure) {
			this.showError(failure.message);
			return;
		}

		if (this.isGameOver()) {
			this.showOverlayByState();
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
		this.state = new State();
		this.winner = null;

		this.resetOverlay();
		this.resetError();
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
	showOverlayByState() {
		if (null === this.winner) {
			this.showOverlay(MESSAGES.tie);
			return;
		}

		if (this.winner.symbol === this.computer.symbol) {
			this.showOverlay(MESSAGES.loose, CLASSES.failure);
		}
		if (this.winner.symbol === this.human.symbol) {
			this.showOverlay(MESSAGES.win, CLASSES.success);
		}
	}

	/**
	 * @param {string} message
	 * @param {string|null} type
	 * @return {void}
	 */
	showOverlay(message, type = null) {
		this.message.innerHTML = message;
		this.overlay.className = (null !== type) ?
			`${CLASSES.visible} ${type}` :
			`${CLASSES.visible}`
		;
	}

	/**
	 * @return {void}
	 */
	resetOverlay() {
		this.overlay.className = CLASSES.invisible;
		this.message.innerHTML = '';
	}

	/**
	 * @param {string} message
	 * @return {void}
	 */
	showError(message) {
		this.error.className = `${CLASSES.failure} ${CLASSES.visible}`;
		this.error.innerHTML = message;

		// hide error message again after 2 seconds.
		setTimeout(this.resetError, 2000);
	}

	/**
	 * @return {void}
	 */
	resetError() {
		this.error.className = CLASSES.invisible
		this.error.innerHTML = '';
	}

}