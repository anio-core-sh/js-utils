/* Warning: this file was automatically created by anio-jsbundler v0.5.2 */
/* You should commit this file to source control */

import createNamedAnonymousFunction from "./createNamedAnonymousFunction.mjs"
import createModifierFunction from "./createModifierFunction.mjs"

/**
 * Wraps an exported function so that modifiers can optionally specified
 * Modifiers are used like this:
 * 
 * exportedFn.modifier(fn_args)
 * exportedFn.modifier.secondModifier(fn_args)
 * 
 * Modifiers are only used if exported factory function
 * returns an object containing two keys: modifiers and fn.
 * 
 * If the factory returns a plain function, that function will not have modifiers enabled.
 */
export default function(fn_name, fn_def) {
	const wants_modifiers = "fn" in fn_def && "modifiers" in fn_def

	if (!wants_modifiers) {
		return createNamedAnonymousFunction(`${fn_name}`, fn_def)
	}

	return createModifierFunction(
		`${fn_name}`,
		fn_def.fn,
		fn_def.modifiers
	)
}
