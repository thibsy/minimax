import { terser } from 'rollup-plugin-terser';

export default {
	input: './src/game.js',
	output: {
		file: './dist/main.min.js',
		format: 'es',
		plugins: [terser()]
	},
};