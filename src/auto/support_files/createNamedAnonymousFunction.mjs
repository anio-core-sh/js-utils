/* Warning: this file was automatically created by anio-jsbundler v0.5.2 */
/* You should commit this file to source control */

/* Used to give a consistent name to the exported functions and wrapped factories */
export default function(name, fn) {
	let tmp = {
		[`${name}`](...args) {
			return fn(...args)
		}
	}

	return tmp[`${name}`]
}
