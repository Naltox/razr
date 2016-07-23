'use strict'

class Injector {
    /**
     * 
     * @param {BaseInjectDataSource} dataSource
     */
    constructor(dataSource) {
        this._dataSource = dataSource;
        this._instances = {}

        /**
         * @type {Dependency[]}
         * @private
         */
        this._preparedDependencies = []
        this._dependencies = this._dataSource.getDependencies()

        this._createInstances()
    }

    /**
     *
     * @param {string} name
     * @returns {Object}
     */
    get(name) {
        return this._instances[name]
    }

    /**
     * 
     * @param {Function} type
     * @param {Object[]} [args]
     * @returns {Object}
     * @private
     */
    _createInstance(type, args) {
        return new type(...args || [])
    }

    /**
     *
     * @param {Dependency} dependency
     * @returns {boolean}
     * @private
     */
    _havePreparedDependency(dependency) {
        return !(this._preparedDependencies.indexOf(dependency) === -1)
    }

    /**
     * @private
     */
    _createInstances() {
        this._dependencies.forEach(dependency => {
            if (this._havePreparedDependency(dependency)) return

            if (dependency.args.length === 0 ) {
                this._instances[dependency.name] = this._createInstance(dependency.type)
                this._preparedDependencies.push(dependency)
            }
            else if (this._haveArgumentsToCreateInstance(dependency) ) {
                let classArguments = dependency.args.map(arg => this._instances[arg.name])

                this._instances[dependency.name] = this._createInstance(dependency.type, classArguments)
                this._preparedDependencies.push(dependency)
            }
        })

        if (this._preparedDependencies.length < this._dependencies.length) {
            this._createInstances()
        }
    }

    /**
     *
     * @param {Dependency} dependency
     * @returns {boolean}
     * @private
     */
    _haveArgumentsToCreateInstance(dependency) {
        let isPrepared = true

        dependency.args.forEach(arg => {
            if (!this._preparedDependencies.some(d => arg.name === d.name)) {
                isPrepared = false
            }
        })

        return isPrepared
    }
}

module.exports = Injector