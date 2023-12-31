/* Warning: this file was automatically created by anio-gyp v0.x.x */
/* You will find more information about the specific anio-gyp version used inside the file src/auto/VERSION.txt */
/* You should commit this file to source control */

import {createDefaultContextAsync} from "@anio-gyp/project"
import createNamedAnonymousFunction from "./createNamedAnonymousFunction.mjs"
import wrapFunction from "./wrapFunction.mjs"

/**
 * Wraps a factory so that plugs can be specified.
 * If no context was given, a new one will be created.
 */
export default function(fn_name, factory) {
	return createNamedAnonymousFunction(`${fn_name}FactoryAsync`, async (plugs = {}, new_context = null) => {
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

		const fn = factory(context)

		return wrapFunction(fn_name, fn)
	})
}
