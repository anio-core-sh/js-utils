/* Warning: this file was automatically created by @anio-jsbundler/core v0.2.0 */

import {createDefaultContextAsync} from "@anio-jsbundler/runtime"
/* Just used to give a name to the exported wrapped factories */
function createNamedAnonymousFunction(name, fn) {
	let tmp = {
		[`${name}`](...args) {
			return fn(...args)
		}
	}

	return tmp[`${name}`]
}

/**
 * Wraps a factory so that plugs can be specified.
 * If no context was given, a new one will be created.
 */
export default function(fn_name, factory) {
	return createNamedAnonymousFunction(fn_name, async (plugs = {}, new_context = null) => {
		let context = new_context

		if (context === null) {
			context = await createDefaultContextAsync()
		}

		/* plugs = null is just to indicate that plugs aren't used */
		if (plugs !== null) {
			for (const key in plugs) {
				context.plugs[key] = plugs[key]
			}
		}

		return factory(context)
	})
}
