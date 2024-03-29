import { terser } from 'rollup-plugin-terser';

export default {
	input: './src/main.js',
	output: {
		file: './dist/main.min.js',
		format: 'es',
		plugins: [terser()],
	},
};