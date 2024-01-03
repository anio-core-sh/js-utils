/* Warning: this file was automatically created by anio-jsbundler v0.5.2 */
/* You should commit this file to source control */

import {createDefaultContextAsync} from "@anio-jsbundler/project"
import wrapFactory from "./support_files/wrapFactory.mjs"
import wrapFunction from "./support_files/wrapFunction.mjs"

/* Module's default context */
const _module_default_context = await createDefaultContextAsync()

export function getUsedDefaultContext() {
	return _module_default_context
}

/* arrayify */
import a from "../export/arrayify.mjs"
export const arrayify = wrapFunction("arrayify", a);
export const arrayifyFactory = wrapFactory("arrayify", function arrayifyFactory(new_context) { return a; });

/* delay */
import b from "../export/delay.mjs"
export const delay = wrapFunction("delay", b);
export const delayFactory = wrapFactory("delay", function delayFactory(new_context) { return b; });

/* escapeshellarg */
import c from "../export/escapeshellarg.mjs"
export const escapeshellarg = wrapFunction("escapeshellarg", c);
export const escapeshellargFactory = wrapFactory("escapeshellarg", function escapeshellargFactory(new_context) { return c; });

/* IPv4StringToUInt32 */
import d from "../export/IPv4StringToUInt32.mjs"
export const IPv4StringToUInt32 = wrapFunction("IPv4StringToUInt32", d);
export const IPv4StringToUInt32Factory = wrapFactory("IPv4StringToUInt32", function IPv4StringToUInt32Factory(new_context) { return d; });

/* isObject */
import e from "../export/isObject.mjs"
export const isObject = wrapFunction("isObject", e);
export const isObjectFactory = wrapFactory("isObject", function isObjectFactory(new_context) { return e; });

/* isString */
import f from "../export/isString.mjs"
export const isString = wrapFunction("isString", f);
export const isStringFactory = wrapFactory("isString", function isStringFactory(new_context) { return f; });

/* parseIPv4String */
import g from "../export/parseIPv4String.mjs"
export const parseIPv4String = wrapFunction("parseIPv4String", g);
export const parseIPv4StringFactory = wrapFactory("parseIPv4String", function parseIPv4StringFactory(new_context) { return g; });

/* replaceString */
import h from "../export/replaceString.mjs"
export const replaceString = wrapFunction("replaceString", h);
export const replaceStringFactory = wrapFactory("replaceString", function replaceStringFactory(new_context) { return h; });

/* UInt32ToIPv4String */
import i from "../export/UInt32ToIPv4String.mjs"
export const UInt32ToIPv4String = wrapFunction("UInt32ToIPv4String", i);
export const UInt32ToIPv4StringFactory = wrapFactory("UInt32ToIPv4String", function UInt32ToIPv4StringFactory(new_context) { return i; });

/* unsafeRandomIdentifier */
import j from "../export/unsafeRandomIdentifier.mjs"
export const unsafeRandomIdentifier = wrapFunction("unsafeRandomIdentifier", j);
export const unsafeRandomIdentifierFactory = wrapFactory("unsafeRandomIdentifier", function unsafeRandomIdentifierFactory(new_context) { return j; });
