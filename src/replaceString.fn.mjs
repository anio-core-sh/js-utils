import arrayify from "./arrayify.fn.mjs"
import isObject from "./isObject.fn.mjs"

function replaceStringWithObject(str, obj) {
	let search = [], replace = []

	for (const key in obj) {
		search.push(key)
		replace.push(obj[key])
	}

	return replaceString(str, search, replace)
}

export default function replaceString(str, search, replace = null) {
	if (isObject(search)) {
		if (replace !== null) {
			throw new Error(`Cannot specify parameter 'replace' when 'search' is an object.`)
		}

		return replaceStringWithObject(str, search)
	}

	search = arrayify(search)
	replace = arrayify(replace)

	// todo: allow for replace to be 1 element
	if (search.length !== replace.length) {
		throw new Error(`'search' and 'replace' input parameters are not balanced.`)
	}

	for (let i = 0; i < search.length; ++i) {
		str = str.split(search[i]).join(replace[i])
	}

	return str
}
