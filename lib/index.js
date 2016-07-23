'use strict'

const JSONInjectDataSource = require('./JSONInjectDataSource')
const Injector = require('./Injector')
const path = require('path')

/**
 *
 * @param {String} rootPath
 * @param {String} pathToConfig
 * @returns {Injector}
 */
module.exports = (rootPath, pathToConfig) => {
    const config = require(path.join(rootPath, pathToConfig))

    return new Injector(new JSONInjectDataSource(config, rootPath))
}