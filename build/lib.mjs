function default_logLine(ctx, line) {
	if (typeof process === "object") {
		process.stderr.write(`${line}\n`);
	} else if (typeof console === "object") {
		console.log(line);
	}
}

const log_levels = {
	"error": 3,
	"warn" : 4,
	"info" : 5,
	"debug": 6,
	"trace": 7
};

function default_getCurrentLogLevel(ctx) {
	let current_log_level = "info";

	if (typeof process === "object") {
		if ("ANIO_JSBUNDLER_LOG_LEVEL" in process.env) {
			current_log_level = process.env["ANIO_JSBUNDLER_LOG_LEVEL"].toLowerCase();
		}
	} else if (typeof window === "object") {
		if ("ANIO_JSBUNDLER_LOG_LEVEL" in window) {
			current_log_level = window.ANIO_JSBUNDLER_LOG_LEVEL.toLowerCase();
		}
	}

	if (!(current_log_level in log_levels)) {
		default_logLine();

		current_log_level = "info";
	}

	return current_log_level
}

function default_logWithLevel(ctx, level, args) {
	let bundle_identifier = "";

	if (ctx.bundle !== null) {
		bundle_identifier = `@${ctx.bundle.id.slice(0, 6)}`;
	}

	const message_log_level = log_levels[level];
	const current_log_level = log_levels[ctx.plugs.getCurrentLogLevel(ctx)];

	if (message_log_level > current_log_level) return

	let first_line = `[${level.padStart(5, " ")}] <${ctx.package_json.name}${bundle_identifier}> `;
	let padding = " ".repeat(first_line.length);

	const log_message = args.map(arg => {
		return arg.toString()
	}).join("\n");

	const log_lines = log_message.split("\n");

	let str = ``;

	for (let i = 0; i < log_lines.length; ++i) {
		let current_line = padding;

		if (i === 0) {
			current_line = first_line;
		}

		current_line += log_lines[i];

		str += `${current_line}\n`;
	}

	ctx.plugs.logLine(ctx, str.slice(0, str.length - 1));
}

async function makeDefaultContext(meta) {
	const anio_project_config = await meta.anio_project_config;

	let the_context = {
		/**
		 * Export default implementation for pluggables.
		 */
		defaults: {
			getCurrentLogLevel: default_getCurrentLogLevel,
			logLine: default_logLine,
			logWithLevel: default_logWithLevel
		},

		package_json: meta.package_json,
		anio_project_config,
		bundle: meta.bundle,

		/**
		 * Plugs are properties overwritable by the user when importWithContextAysnc()
		 */
		plugs: {}
	};

	/* Make default plugs call the_context.defaults implementation */
	/* This makes it possible to either overwrite .plugs OR .defaults */
	for (const key in the_context.defaults) {
		the_context.plugs[key] = (...args) => {
			return the_context.defaults[key](...args)
		};
	}

	the_context.log = (...args) => {
		// todo: add async mutex?
		the_context.plugs.logWithLevel(the_context, "debug", args);
	};

	for (const log_level of Object.keys(log_levels)) {
		the_context.log[log_level] = function(...args) {
			the_context.plugs.logWithLevel(the_context, log_level, args);
		};
	}

	return the_context
}

// $build_context will be replaced by anio-jsbundler
let build_context = JSON.parse("{\"bundle_id\":\"3f66d5d6de7c09945f8c0ca0024e8dd0c6538c88\",\"short_bundle_id\":\"3f66d5d6...c6538c88\",\"bundled_resources\":{},\"bundler_meta\":{\"bundler\":{\"version\":\"0.2.4\",\"core\":\"0.2.0\"},\"runtime\":{\"version\":\"0.1.2\"}},\"package_json\":{\"name\":\"@anio-core-sh/js-utils\",\"version\":\"0.2.1\",\"license\":\"MIT\",\"scripts\":{\"test\":\"mocha __tests__\",\"prepare\":\"anio_jsbundler .\"},\"main\":\"./build/lib.mjs\",\"devDependencies\":{\"@anio-jsbundler/bundler\":\"^0.2.4\",\"mocha\":\"^10.2.0\"}},\"anio_project_config\":{\"type\":\"lib\"}}");

const {anio_project_config} = build_context;

build_context.anio_project_config = new Promise((resolve) => {
	setTimeout(resolve, 1, anio_project_config);
});

function getBuildContext() {
	return build_context
}

async function createDefaultContextAsync() {
	const project = getBuildContext();

	return await makeDefaultContext({
		package_json: project.package_json,
		anio_project_config: project.anio_project_config,
		bundle: {
			id: project.bundle_id
		}
	})
}

/* Warning: this file was automatically created by @anio-jsbundler/core v0.2.0 */

/* Just used to give a name to the exported wrapped factories */
function createNamedAnonymousFunction(name, fn) {
	let tmp = {
		[`${name}`](...args) {
			return fn(...args)
		}
	};

	return tmp[`${name}`]
}

/**
 * Wraps a factory so that plugs can be specified.
 * If no context was given, a new one will be created.
 */
function wrapFactory(fn_name, factory) {
	return createNamedAnonymousFunction(fn_name, async (plugs = {}, new_context = null) => {
		let context = new_context;

		if (context === null) {
			context = await createDefaultContextAsync();
		}

		/* plugs = null is just to indicate that plugs aren't used */
		if (plugs !== null) {
			for (const key in plugs) {
				context.plugs[key] = plugs[key];
			}
		}

		return factory(context)
	})
}

function arrayify$2(value) {
	if (Array.isArray(value)) return value

	return [value]
}

function delay$2(amount) {
	return new Promise((resolve) => {
		setTimeout(resolve, amount);
	})
}

function escapeshellarg$2(arg) {
  //  discuss at: https://locutus.io/php/escapeshellarg/
  // Warning: this function emulates escapeshellarg() for php-running-on-linux
  // the function behaves differently when running on Windows, which is not covered by this code.
  //
  // original by: Felix Geisendoerfer (https://www.debuggable.com/felix)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: divinity76 (https://github.com/divinity76)
  //   example 1: escapeshellarg("kevin's birthday")
  //   returns 1: "'kevin'\\''s birthday'"
  //   example 2: escapeshellarg("/home'; whoami;''")
  //   returns 2: "'/home'\\''; whoami;'\\'''\\'''"
  if (arg.indexOf('\x00') !== -1) {
    throw new Error('escapeshellarg(): Argument #1 ($arg) must not contain any null bytes')
  }
  let ret = '';
  ret = arg.replace(/'/g, '\'\\\'\'');
  return "'" + ret + "'"
}

/**
 * Converts IPv4 string format `a.b.c.d` into uint32.
 */
function IPv4StringToUInt32$3(ip_str) {
	const octets = ip_str.split(".");
	let num = 0;

	for (let i = 0; i < 4; ++i) {
		const octet = parseInt(octets[i], 10);
		const n_shift = (3 - i) * 8;

		num |= (octet << n_shift);
	}

	return num >>> 0
}

function isObject$2(value) {
	return Object.prototype.toString.call(value).toLowerCase() === "[object object]"
}

function isString$2(value) {
	return Object.prototype.toString.call(value).toLowerCase() === "[object string]"
}

function createSubnetMask(n) {
	n = parseInt(n, 10);

	const ones = "1".repeat(n);
	const zeros = "0".repeat(32 - n);

	return parseInt(`${ones}${zeros}`, 2) >>> 0
}

function invertSubnetMask(n) {
	return (n ^ 0xFFFFFFFF) >>> 0
}

function mask(ip, mask) {
	return (ip & mask) >>> 0
}

function parseIPv4String$2(ip_str) {
	const tmp = ip_str.split("/");

	if (tmp.length > 2) {
		throw new Error(`Invalid IPv4 string '${ip_str}'.`)
	} else if (tmp.length === 1) {
		return parseIPv4String$2(`${ip_str}/32`)
	}

	const submask = createSubnetMask(tmp[1]);
	const host = mask(
		IPv4StringToUInt32(tmp[0]), invertSubnetMask(submask)
	);
	const network = mask(
		IPv4StringToUInt32(tmp[0]), submask
	);

	return {network, host, submask}
}

function replaceStringWithObject(str, obj) {
	let search = [], replace = [];

	for (const key in obj) {
		search.push(key);
		replace.push(obj[key]);
	}

	return replaceString$2(str, search, replace)
}

function replaceString$2(str, search, replace = null) {
	if (isObject$2(search)) {
		if (replace !== null) {
			throw new Error(`Cannot specify parameter 'replace' when 'search' is an object.`)
		}

		return replaceStringWithObject(str, search)
	}

	search = arrayify$2(search);
	replace = arrayify$2(replace);

	// todo: allow for replace to be 1 element
	if (search.length !== replace.length) {
		throw new Error(`'search' and 'replace' input parameters are not balanced.`)
	}

	for (let i = 0; i < search.length; ++i) {
		str = str.split(search[i]).join(replace[i]);
	}

	return str
}

/**
 * Converts 32bit integer `num` to IPv4 string format `a.b.c.d`
 */
function UInt32ToIPv4String$2(num) {
	const binary_string = (num >>> 0).toString(2).padStart(32, "0");
	let octets = [];

	for (let i = 0; i < 4; ++i) {
		const octet_slice = binary_string.slice(8 * i, 8 * (i + 1));
		const octet = parseInt(octet_slice, 2);

		octets.push(octet);
	}

	return octets.join(".")
}

function unsafeRandomIdentifier$2(length) {
	let str = ``;

	for (let i = 0; i < length; ++i) {
		let num = Math.floor(
			Math.random() * 255
		);

		str += num.toString(16).slice(0, 1);
	}

	return str
}

/* Warning: this file was automatically created by @anio-jsbundler/core v0.2.0 */

const _module_default_context = await createDefaultContextAsync();

function getUsedDefaultContext$1() {
	return _module_default_context
}
const arrayify$1 = arrayify$2;
const arrayifyFactory$1 = wrapFactory("arrayifyFactoryAsync", function arrayifyFactory(new_context) { return arrayify$2; });
const delay$1 = delay$2;
const delayFactory$1 = wrapFactory("delayFactoryAsync", function delayFactory(new_context) { return delay$2; });
const escapeshellarg$1 = escapeshellarg$2;
const escapeshellargFactory$1 = wrapFactory("escapeshellargFactoryAsync", function escapeshellargFactory(new_context) { return escapeshellarg$2; });
const IPv4StringToUInt32$2 = IPv4StringToUInt32$3;
const IPv4StringToUInt32Factory$1 = wrapFactory("IPv4StringToUInt32FactoryAsync", function IPv4StringToUInt32Factory(new_context) { return IPv4StringToUInt32$3; });
const isObject$1 = isObject$2;
const isObjectFactory$1 = wrapFactory("isObjectFactoryAsync", function isObjectFactory(new_context) { return isObject$2; });
const isString$1 = isString$2;
const isStringFactory$1 = wrapFactory("isStringFactoryAsync", function isStringFactory(new_context) { return isString$2; });
const parseIPv4String$1 = parseIPv4String$2;
const parseIPv4StringFactory$1 = wrapFactory("parseIPv4StringFactoryAsync", function parseIPv4StringFactory(new_context) { return parseIPv4String$2; });
const replaceString$1 = replaceString$2;
const replaceStringFactory$1 = wrapFactory("replaceStringFactoryAsync", function replaceStringFactory(new_context) { return replaceString$2; });
const UInt32ToIPv4String$1 = UInt32ToIPv4String$2;
const UInt32ToIPv4StringFactory$1 = wrapFactory("UInt32ToIPv4StringFactoryAsync", function UInt32ToIPv4StringFactory(new_context) { return UInt32ToIPv4String$2; });
const unsafeRandomIdentifier$1 = unsafeRandomIdentifier$2;
const unsafeRandomIdentifierFactory$1 = wrapFactory("unsafeRandomIdentifierFactoryAsync", function unsafeRandomIdentifierFactory(new_context) { return unsafeRandomIdentifier$2; });

/* Warning: this file was automatically created by @anio-jsbundler/core v0.2.0 */


var a = {
    "arrayify.mjs"                      : arrayify$1,
    "arrayifyFactory.mjs"               : arrayifyFactory$1,
    "delay.mjs"                         : delay$1,
    "delayFactory.mjs"                  : delayFactory$1,
    "escapeshellarg.mjs"                : escapeshellarg$1,
    "escapeshellargFactory.mjs"         : escapeshellargFactory$1,
    "IPv4StringToUInt32.mjs"            : IPv4StringToUInt32$2,
    "IPv4StringToUInt32Factory.mjs"     : IPv4StringToUInt32Factory$1,
    "isObject.mjs"                      : isObject$1,
    "isObjectFactory.mjs"               : isObjectFactory$1,
    "isString.mjs"                      : isString$1,
    "isStringFactory.mjs"               : isStringFactory$1,
    "parseIPv4String.mjs"               : parseIPv4String$1,
    "parseIPv4StringFactory.mjs"        : parseIPv4StringFactory$1,
    "replaceString.mjs"                 : replaceString$1,
    "replaceStringFactory.mjs"          : replaceStringFactory$1,
    "UInt32ToIPv4String.mjs"            : UInt32ToIPv4String$1,
    "UInt32ToIPv4StringFactory.mjs"     : UInt32ToIPv4StringFactory$1,
    "unsafeRandomIdentifier.mjs"        : unsafeRandomIdentifier$1,
    "unsafeRandomIdentifierFactory.mjs" : unsafeRandomIdentifierFactory$1
};

/* Warning: this file was automatically created by @anio-jsbundler/core v0.2.0 */


async function importWithContextAsync$1(plugs = {}, new_context = null) {
    let library_context = new_context;

    /* Context is created here so every function has the same context */
    if (library_context === null) {
        library_context = await createDefaultContextAsync();
    }

    /* Plugs are set here so every function has the same context */
    for (const key in plugs) {
        library_context.plugs[key] = plugs[key];
    }

    let library = {
        arrayify                            : await arrayifyFactory$1(null, library_context),
        arrayifyFactory                     : arrayifyFactory$1,
        delay                               : await delayFactory$1(null, library_context),
        delayFactory                        : delayFactory$1,
        escapeshellarg                      : await escapeshellargFactory$1(null, library_context),
        escapeshellargFactory               : escapeshellargFactory$1,
        IPv4StringToUInt32                  : await IPv4StringToUInt32Factory$1(null, library_context),
        IPv4StringToUInt32Factory           : IPv4StringToUInt32Factory$1,
        isObject                            : await isObjectFactory$1(null, library_context),
        isObjectFactory                     : isObjectFactory$1,
        isString                            : await isStringFactory$1(null, library_context),
        isStringFactory                     : isStringFactory$1,
        parseIPv4String                     : await parseIPv4StringFactory$1(null, library_context),
        parseIPv4StringFactory              : parseIPv4StringFactory$1,
        replaceString                       : await replaceStringFactory$1(null, library_context),
        replaceStringFactory                : replaceStringFactory$1,
        UInt32ToIPv4String                  : await UInt32ToIPv4StringFactory$1(null, library_context),
        UInt32ToIPv4StringFactory           : UInt32ToIPv4StringFactory$1,
        unsafeRandomIdentifier              : await unsafeRandomIdentifierFactory$1(null, library_context),
        unsafeRandomIdentifierFactory       : unsafeRandomIdentifierFactory$1
    };

    library.dict = {
        "arrayify.mjs"                      : library["arrayify"],
        "arrayifyFactory.mjs"               : library["arrayifyFactory"],
        "delay.mjs"                         : library["delay"],
        "delayFactory.mjs"                  : library["delayFactory"],
        "escapeshellarg.mjs"                : library["escapeshellarg"],
        "escapeshellargFactory.mjs"         : library["escapeshellargFactory"],
        "IPv4StringToUInt32.mjs"            : library["IPv4StringToUInt32"],
        "IPv4StringToUInt32Factory.mjs"     : library["IPv4StringToUInt32Factory"],
        "isObject.mjs"                      : library["isObject"],
        "isObjectFactory.mjs"               : library["isObjectFactory"],
        "isString.mjs"                      : library["isString"],
        "isStringFactory.mjs"               : library["isStringFactory"],
        "parseIPv4String.mjs"               : library["parseIPv4String"],
        "parseIPv4StringFactory.mjs"        : library["parseIPv4StringFactory"],
        "replaceString.mjs"                 : library["replaceString"],
        "replaceStringFactory.mjs"          : library["replaceStringFactory"],
        "UInt32ToIPv4String.mjs"            : library["UInt32ToIPv4String"],
        "UInt32ToIPv4StringFactory.mjs"     : library["UInt32ToIPv4StringFactory"],
        "unsafeRandomIdentifier.mjs"        : library["unsafeRandomIdentifier"],
        "unsafeRandomIdentifierFactory.mjs" : library["unsafeRandomIdentifierFactory"]
    };

    library.importWithContextAsync = importWithContextAsync$1;
    library.getUsedDefaultContext = function getUsedDefaultContext() { return library_context; };

    return library;
}

/* Warning: this file was automatically created by @anio-jsbundler/core v0.2.0 */


/* Generic library exports */
const dict                          = a;
const importWithContextAsync        = importWithContextAsync$1;
const getUsedDefaultContext         = getUsedDefaultContext$1;
/* User defined library functions */
const arrayify                      = arrayify$1;
const arrayifyFactory               = arrayifyFactory$1;
const delay                         = delay$1;
const delayFactory                  = delayFactory$1;
const escapeshellarg                = escapeshellarg$1;
const escapeshellargFactory         = escapeshellargFactory$1;
const IPv4StringToUInt32$1            = IPv4StringToUInt32$2;
const IPv4StringToUInt32Factory     = IPv4StringToUInt32Factory$1;
const isObject                      = isObject$1;
const isObjectFactory               = isObjectFactory$1;
const isString                      = isString$1;
const isStringFactory               = isStringFactory$1;
const parseIPv4String               = parseIPv4String$1;
const parseIPv4StringFactory        = parseIPv4StringFactory$1;
const replaceString                 = replaceString$1;
const replaceStringFactory          = replaceStringFactory$1;
const UInt32ToIPv4String            = UInt32ToIPv4String$1;
const UInt32ToIPv4StringFactory     = UInt32ToIPv4StringFactory$1;
const unsafeRandomIdentifier        = unsafeRandomIdentifier$1;
const unsafeRandomIdentifierFactory = unsafeRandomIdentifierFactory$1;

var index = {
    /* Generic library exports */
    dict                                   : a,
    importWithContextAsync                 : importWithContextAsync$1,
    getUsedDefaultContext                  : getUsedDefaultContext$1,
    /* User defined library functions */
    arrayify                               : arrayify$1,
    arrayifyFactory                        : arrayifyFactory$1,
    delay                                  : delay$1,
    delayFactory                           : delayFactory$1,
    escapeshellarg                         : escapeshellarg$1,
    escapeshellargFactory                  : escapeshellargFactory$1,
    IPv4StringToUInt32                     : IPv4StringToUInt32$2,
    IPv4StringToUInt32Factory              : IPv4StringToUInt32Factory$1,
    isObject                               : isObject$1,
    isObjectFactory                        : isObjectFactory$1,
    isString                               : isString$1,
    isStringFactory                        : isStringFactory$1,
    parseIPv4String                        : parseIPv4String$1,
    parseIPv4StringFactory                 : parseIPv4StringFactory$1,
    replaceString                          : replaceString$1,
    replaceStringFactory                   : replaceStringFactory$1,
    UInt32ToIPv4String                     : UInt32ToIPv4String$1,
    UInt32ToIPv4StringFactory              : UInt32ToIPv4StringFactory$1,
    unsafeRandomIdentifier                 : unsafeRandomIdentifier$1,
    unsafeRandomIdentifierFactory          : unsafeRandomIdentifierFactory$1
};

export { IPv4StringToUInt32$1 as IPv4StringToUInt32, IPv4StringToUInt32Factory, UInt32ToIPv4String, UInt32ToIPv4StringFactory, arrayify, arrayifyFactory, index as default, delay, delayFactory, dict, escapeshellarg, escapeshellargFactory, getUsedDefaultContext, importWithContextAsync, isObject, isObjectFactory, isString, isStringFactory, parseIPv4String, parseIPv4StringFactory, replaceString, replaceStringFactory, unsafeRandomIdentifier, unsafeRandomIdentifierFactory };
