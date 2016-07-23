'use strict'

class BaseInjectDataSource {
    /**
     * @returns {Dependency[]}
     */
    getDependencies() {
        throw 'Not implemented'
    }
}

module.exports = BaseInjectDataSource