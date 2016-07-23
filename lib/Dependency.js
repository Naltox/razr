'use strict'

class Dependency {
    /**
     *
     * @param {string} name
     * @param {Function} type
     * @param {Dependency[]} args
     */
    constructor(name, type, args) {
        this._name = name
        this._type = type
        this._args = args
    }

    /**
     *
     * @returns {string}
     */
    get name() {
        return this._name
    }

    /**
     *
     * @returns {Function}
     */
    get type() {
        return this._type
    }

    /**
     *
     * @returns {Dependency[]}
     */
    get args() {
        return this._args
    }
}

module.exports = Dependency