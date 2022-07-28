# Tic-Tac-Toe with Minimax-Algorithm

## Installation

```bash
git clone git@github.com:thibsy/minimax.git ~/minimax
cd ~/minimax
open "$(pwd)/index.html"
```

## Development

### User interface

I'm a developer, I love dark-themes. That's why throughout this repository I've used the dark-themed colour-palette from [Google's material design](https://material.io/design/color/dark-theme.html).
Hence, all new UI elements should follow these colours. 

![Tic-Tac-Toe preview](./assets/preview.png)

### Directories

```
   .
    ├── assets          contains assets like pictures and stylesheets.
    ├── dist            contains bundled files for the browser.
    ├── src             contains the javascript logic.
    └── test            contains the javascript unit tests.
```

### [`main.js`](src/main.js)

This file can be considered the bootstrap file of the repository (or website), since I'm using [rollup.js](https://rollupjs.org/guide/en/) as a module-bundler.
The configuration-file ([`rollup.config.js`](./rollup.config.js)) will handle all imports in this file and bundle them together into one (minified)
javascript file which will be sent to the browser. 

This means, after each change one must re-bundle the bootstrap file in order for them to take effect:

```bash
npx rollup -c "rollup.config.js"
```

### Testing

I'm also using [mocha.js](https://mochajs.org/) for some unit-testing, which helped me develop the algorithm itself a lot. The npm
configuration is set up to execute all tests within `test/` recursively when running `npm test`.

Specific tests can be executed with:

```bash
./node_modules/.bin/mocha "path/to/test"
```

or

```bash
./node_modules/.bin/mocha ./test -g "case-name or description"
```
