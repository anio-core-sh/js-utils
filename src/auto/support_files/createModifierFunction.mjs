/* Warning: this file was automatically created by anio-jsbundler v0.5.2 */
/* You should commit this file to source control */

import createNamedAnonymousFunction from "./createNamedAnonymousFunction.mjs"

export default function(fn_name, fn_impl, modifiers) {
	let modifier_list = []

	let new_fn = createNamedAnonymousFunction(fn_name, (...args) => {
		return fn_impl(modifier_list, ...args)
	})

	for (const modifier of modifiers) {
		Object.defineProperty(new_fn, modifier, {
			get() {
				modifier_list.push(modifier)

				return new_fn
			}
		})
	}

	return new_fn
}
