/* Warning: this file was automatically created by anio-gyp v0.x.x */
/* You will find more information about the specific anio-gyp version used inside the file src/auto/VERSION.txt */
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
