import { assert, expect } from 'chai';
import { JSDOM } from 'jsdom';
import { Game } from '../src/game.js';

describe('TicTacToe logic', function () {

	beforeEach(function () {
		let dom = new JSDOM(
			`<html lang="en">
				<body>
					<main>
						<p id="game-message"></p>
						<ul id="game-board"></ul>
						<button id="game-restart"><button/>
					</main>
				</body>
			</html>`,
			{
				url: 'http://localhost',
			}
		);

		global.window = dom.window;
		global.document = dom.window.document;
	});

	it('Aborts if DOM elements are missing.', function () {
		let dom = new JSDOM(
			`<html lang="en">
				<body>
				</body>
			</html>`,
			{
				url: 'http://localhost',
			}
		);

		global.window = dom.window;
		global.document = dom.window.document;

		expect(function () {
			new Game();
		}).to.throw(Error);
	});

	it('Generates board list entries.', function () {
		(new Game()).setupDOM();
		let list_entries = document
			.getElementById('game-board')
			.getElementsByTagName('li')
		;

		assert.equal(list_entries.length, 9);

		for (let i = 0; i < 9; i++) {
			assert.strictEqual(list_entries[i].id, i.toString());
		}
	});

	it('Board hook enables restart button.', function () {
		let game = new Game();
		game.setupDOM();
		game.current_player = {symbol: 'cross'};
		game.boardHook(5);

		assert.strictEqual(game.restart.disabled, false);
	});

	it('Board hook adds symbol CSS class.', function () {
		let game = new Game();
		game.setupDOM();
		game.current_player = {symbol: 'cross'};
		game.boardHook(5);

		assert.strictEqual(document.getElementById('5').className, 'cross');
	});

	it('Board hook adds symbol only once.', function () {
		let game = new Game();
		game.setupDOM();
		game.current_player = {symbol: 'cross'};
		game.boardHook(5);

		assert.strictEqual(document.getElementById('5').className, 'cross');

		game.boardHook(5);
		game.current_player = {symbol: 'circle'};

		assert.strictEqual(document.getElementById('5').className, 'cross');
	});

	it('Board hook swaps current player.', function () {
		let game = new Game();
		game.setupDOM();
		game.current_player = {symbol: 'cross'};
		game.computer = game.current_player;
		game.human = {symbol: 'circle'};
		game.boardHook(5);

		assert.strictEqual(game.current_player.symbol, 'circle');
	});

	it('Board hook advances game state.', function () {
		let game = new Game();
		game.setupDOM();
		game.current_player = {symbol: 'cross'};
		game.boardHook(5);

		assert.strictEqual(game.state.board[5], 'cross');
	});

	it('Board hook detects game-over.', function () {
		let game = new Game();
		game.setupDOM();
		game.state.board = [
			'cross', 'circle', 'circle',
			'circle', 'cross', 'cross',
			'circle', 'cross', 'circle',
		];
		assert.strictEqual(game.isGameOver(), true);

		game.state.board = [
			'cross', null, null,
			null, 'cross', null,
			null, null, 'cross',
		];

		assert.strictEqual(game.isGameOver(), true);
	});

	it('Board hook displays winner', function () {
		let game = new Game();
		game.setupDOM();
		game.current_player = {symbol: 'circle'};
		game.human = game.current_player;
		game.state.board = [
			null, 'circle', 'circle',
			'circle', 'cross', 'cross',
			'circle', 'cross', 'circle',
		];
		game.boardHook(0);

		assert.notStrictEqual(game.message.innerHTML, '');
		assert.strictEqual(game.message.className.includes('visible'), true);
		assert.strictEqual(game.message.className.includes('success'), true);
	});

	it('Board hook displays game-over', function () {
		let game = new Game();
		game.setupDOM();
		game.current_player = {symbol: 'circle'};
		game.computer = game.current_player;
		game.state.board = [
			null, 'circle', 'circle',
			'circle', 'cross', 'cross',
			'circle', 'cross', 'circle',
		];

		game.boardHook(0);

		assert.notStrictEqual(game.message.innerHTML, '');
		assert.strictEqual(game.message.className.includes('visible'), true);
		assert.strictEqual(game.message.className.includes('failure'), true);
	});

	it('Restart hook removes all symbols.', function () {
		let game = new Game();
		game.setupDOM();
		game.boardHook(1);
		game.boardHook(2);
		game.restartHook();

		let list_entries = document
			.getElementById('game-board')
			.getElementsByTagName('li')
		;

		for (let i = 0, i_max = list_entries.length; i < i_max; i++) {
			assert.strictEqual(list_entries[i].className, '');
		}
	});

	it('Restart hook disables restart button.', function () {
		let game = new Game();
		game.setupDOM();
		game.boardHook(1);
		game.boardHook(2);
		game.restartHook();

		assert.strictEqual(game.restart.disabled, true);
	});

	it('Restart hook resets winner, state and current player.', function () {
		let game = new Game();
		game.setupDOM();
		game.current_player = {symbol: 'cross'};
		game.computer = {symbol: 'cross'};
		game.human = {symbol: 'circle'};
		game.winner = game.computer;
		game.state.board = [];
		game.restartHook();

		assert.strictEqual(game.current_player.symbol, 'circle');
		assert.strictEqual(game.winner, null);
		assert.deepStrictEqual(game.state.board, [
			null, null, null,
			null, null, null,
			null, null, null,
		]);
	});

});