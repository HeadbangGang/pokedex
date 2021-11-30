'use strict'

const { resolveModuleName } = require('ts-pnp')

exports.resolveModuleName = (
    moduleName,
    containingFile,
    compilerOptions,
    resolutionHost
) => {
    return resolveModuleName(
        moduleName,
        containingFile,
        compilerOptions,
        resolutionHost
    )
}

exports.resolveTypeReferenceDirective = (
    moduleName,
    containingFile,
    compilerOptions,
    resolutionHost
) => {
    return resolveModuleName(
        moduleName,
        containingFile,
        compilerOptions,
        resolutionHost
    )
}
