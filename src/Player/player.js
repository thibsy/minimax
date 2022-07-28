
/**
 * @author Thibeau Fuhrer <fuhrer@thibeau.ch>
 */
export class Player {

	/**
	 * @type {string}
	 */
	symbol;

	/**
	 * @param {string} symbol
	 */
	constructor(symbol) {
		this.symbol = symbol;
	}

	/**
	 * @return {string}
	 */
	get symbol() {
		return this.symbol;
	}

}