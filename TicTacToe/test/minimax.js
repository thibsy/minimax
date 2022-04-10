import { expect, assert } from 'chai';
import { Minimax } from '../src/minimax.js';

describe('Minimax algorithm', function () {

	let minimax = new Minimax('circle');
	let state = {
		board: [
			null, null, null,
			null, null, null,
			null, null, null,
		]
	};

	it('Returns number between 0 and 8.', function () {
		let next_move = minimax.getMove(state);
		expect(next_move).to.be('number');
		expect(next_move).to.be.above(-1);
		expect(next_move).to.be.below(9);
	});

	it('Returns an available index.', function () {
		state.board = [
			null, 'cross', 'cross',
			'cross', 'cross', 'cross',
			'cross', 'cross', 'cross',
		];

		assert.strictEqual(minimax.getMove(state), 0);
	});

	it('Returns null if all fields are taken.', function () {
		state.board = [
			'cross', 'cross', 'cross',
			'cross', 'cross', 'cross',
			'cross', 'cross', 'cross',
		];

		assert.strictEqual(minimax.getMove(state), null);
	});

	it('Extends player object.', function () {
		expect(minimax.symbol).to.be('string');
	});

});