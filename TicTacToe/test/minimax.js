import { expect, assert } from 'chai';
import { Minimax } from '../src/minimax.js';

describe('Minimax algorithm', function () {

	let minimax = new Minimax({symbol: 'circle'}, 'cross');
	let state = {
		board: [
			null, null, null,
			null, null, null,
			null, null, null,
		]
	};

	it('Returns number between 0 and 8.', function () {
		let next_move = minimax.getMove(state.board);
		expect(next_move).to.be.a('number');
		expect(next_move).to.be.above(-1);
		expect(next_move).to.be.below(9);
	});

	it('Returns an available index.', function () {
		state.board = [
			null, 'cross', 'cross',
			'cross', 'cross', 'cross',
			'cross', 'cross', 'cross',
		];

		let next_move = minimax.getMove(state.board);
		assert.strictEqual(next_move, 0);
	});

	it('Returns null if all fields are taken.', function () {
		state.board = [
			'cross', 'cross', 'cross',
			'cross', 'cross', 'cross',
			'cross', 'cross', 'cross',
		];

		assert.strictEqual(minimax.getMove(state.board), null);
	});

	it('Extends player object.', function () {
		expect(minimax.symbol).to.be.a('string');
	});

});