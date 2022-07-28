import { expect, assert } from 'chai';
import { Minimax } from '../src/Player/minimax.js';
import { State } from '../src/state.js';

describe('Minimax algorithm', function () {

	let minimax = new Minimax({ symbol: 'O' }, 'X');

	it('Returns number between 0 and 8.', function () {
		let state = new State([
			null, null, null,
			null, null, null,
			null, null, null,
		]);

		let next_move = minimax.getMove(state);
		expect(next_move).to.be.a('number');
		expect(next_move).to.be.above(-1);
		expect(next_move).to.be.below(9);
	});

	it('Returns an available index.', function () {
		let state = new State([
			null, 'X', 'X',
			'X', 'O', 'X',
			'X', 'X', 'O',
		]);

		let next_move = minimax.getMove(state);
		assert.strictEqual(next_move, 0);
	});

	it('Returns null if game is over.', function () {
		let state = new State([
			'X', 'X', 'X',
			'X', 'X', 'X',
			'X', 'X', 'X',
		]);

		assert.strictEqual(minimax.getMove(state), null);
	});

	it('Extends player object.', function () {
		expect(minimax.symbol).to.be.a('string');
	});

	it('Can find direct wins.', function () {
		let state = new State([
			'O', 'X', null,
			null, 'X', null,
			null, null, null,
		]);

		let next_move = minimax.getMove(state);
		assert.strictEqual(next_move, 7);
	});

	it('Can prevent direct losses.', function () {
		let state = new State([
			'X', 'O', null,
			null, 'O', null,
			null, null, null,
		]);
		
		let next_move = minimax.getMove(state);
		assert.strictEqual(next_move, 7);
	});

	it('Plays a perfect game against itself.', function () {
		let state = new State();
		let other_minimax = new Minimax(minimax, 'O');
		let current_player = minimax;

		while (!state.isGameOver()) {
			state.makeMove(current_player, current_player.getMove(state));
			current_player = ('O' === current_player.symbol) ? minimax : other_minimax;
		}

		assert.strictEqual(state.isGameOver(), true);
		assert.strictEqual(state.getWinner(), null);
	});

});