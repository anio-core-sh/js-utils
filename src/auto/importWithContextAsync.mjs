/* Warning: this file was automatically created by anio-gyp v0.x.x */
/* You will find more information about the specific anio-gyp version used inside the file src/auto/VERSION.txt */
/* You should commit this file to source control */

import {createDefaultContextAsync} from "@anio-gyp/project"
import {
    arrayifyFactory                        as arrayifyFactory,
    delayFactory                           as delayFactory,
    escapeshellargFactory                  as escapeshellargFactory,
    IPv4StringToUInt32Factory              as IPv4StringToUInt32Factory,
    isObjectFactory                        as isObjectFactory,
    isStringFactory                        as isStringFactory,
    parseIPv4StringFactory                 as parseIPv4StringFactory,
    replaceStringFactory                   as replaceStringFactory,
    UInt32ToIPv4StringFactory              as UInt32ToIPv4StringFactory,
    unsafeRandomIdentifierFactory          as unsafeRandomIdentifierFactory
} from "./library.mjs";

export default async function importWithContextAsync(plugs = {}, new_context = null) {
    let library_context = new_context

    /* Context is created here so every function has the same context */
    if (library_context === null) {
        library_context = await createDefaultContextAsync()
    }

    /* Plugs are set here so every function has the same context */
    for (const key in plugs) {
        library_context.plugs[key] = plugs[key];
    }

    let library = {
        arrayify                            : await arrayifyFactory(null, library_context),
        arrayifyFactory                     : arrayifyFactory,
        delay                               : await delayFactory(null, library_context),
        delayFactory                        : delayFactory,
        escapeshellarg                      : await escapeshellargFactory(null, library_context),
        escapeshellargFactory               : escapeshellargFactory,
        IPv4StringToUInt32                  : await IPv4StringToUInt32Factory(null, library_context),
        IPv4StringToUInt32Factory           : IPv4StringToUInt32Factory,
        isObject                            : await isObjectFactory(null, library_context),
        isObjectFactory                     : isObjectFactory,
        isString                            : await isStringFactory(null, library_context),
        isStringFactory                     : isStringFactory,
        parseIPv4String                     : await parseIPv4StringFactory(null, library_context),
        parseIPv4StringFactory              : parseIPv4StringFactory,
        replaceString                       : await replaceStringFactory(null, library_context),
        replaceStringFactory                : replaceStringFactory,
        UInt32ToIPv4String                  : await UInt32ToIPv4StringFactory(null, library_context),
        UInt32ToIPv4StringFactory           : UInt32ToIPv4StringFactory,
        unsafeRandomIdentifier              : await unsafeRandomIdentifierFactory(null, library_context),
        unsafeRandomIdentifierFactory       : unsafeRandomIdentifierFactory
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

    library.importWithContextAsync = importWithContextAsync;
    library.getUsedDefaultContext = function getUsedDefaultContext() { return library_context; };

    return library;
}
