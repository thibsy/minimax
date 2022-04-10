import { assert, expect } from 'chai';
import { State } from '../src/state.js';

describe('TicTacToe state object', function () {

	let player = {symbol: 'cross'};

	it('Accepts available index.', function () {
		let state  = new State();
		state.addMove(player, 1);
	});

	it('Does not accept taken index.', function () {
		let state  = new State();
		state.board[3] = 'circle';
		expect(function () {
			state.addMove(player, 3)
		}).to.throw(Error);
	});

	it('Does not accept index out of range.', function () {
		let state = new State();
		expect(function () {
			state.addMove(player, 9)
		}).to.throw(Error);

		expect(function () {
			state.addMove(player, -1)
		}).to.throw(Error);
	});

	it('Updates board with player symbol.', function () {
		let state  = new State();
		state.addMove(player, 7);
		assert.strictEqual(state.board[7], player.symbol);
	});

	it('Has blank board after creation.', function () {
		let state  = new State();
		assert.deepEqual(state.board, [
			null, null, null,
			null, null, null,
			null, null, null,
		]);
	});

	it('Can determine winners.', function () {
		let state = new State();
		state.board = [
			'1', '1', '1',
			null, null, null,
			null, null, null,
		];

		assert.strictEqual(state.getWinner(), '1');
		state.board = [
			null, null, null,
			'1', '1', '1',
			null, null, null,
		];

		assert.strictEqual(state.getWinner(), '1');
		state.board = [
			null, null, null,
			null, null, null,
			'1', '1', '1',
		];

		assert.strictEqual(state.getWinner(), '1');
		state.board = [
			'1', null, null,
			'1', null, null,
			'1', null, null,
		];

		assert.strictEqual(state.getWinner(), '1');
		state.board = [
			null, '1', null,
			null, '1', null,
			null, '1', null,
		];

		assert.strictEqual(state.getWinner(), '1');
		state.board = [
			null, null, '1',
			null, null, '1',
			null, null, '1',
		];

		assert.strictEqual(state.getWinner(), '1');
		state.board = [
			null, null, '1',
			null, '1', null,
			'1', null, null,
		];

		assert.strictEqual(state.getWinner(), '1');
		state.board = [
			'1', null, null,
			null, '1', null,
			null, null, '1',
		];

		assert.strictEqual(state.getWinner(), '1');
	});

});