'use strict'

const BaseInjectDataSource = require('./BaseInjectDataSource')
const Dependency = require('./Dependency')
const Path = require('path')

class JSONInjectDataSource extends BaseInjectDataSource {
    /**
     * 
     * @param {Object} json
     * @param {string} rootPath
     */
     constructor(json, rootPath) {
         super()
         
         this._data = json
         this._rootPath = rootPath
     }
    
    /**
     * @returns {Dependency[]}
     */
    getDependencies() {
        let dependencies = []

        console.log(this._rootPath)


        for (let key in this._data) {
            dependencies.push(this._loadDependency(key))
        }
        
        return dependencies
    }

    /**
     *
     * @param {string} name
     * @returns {Dependency}
     * @private
     */
    _loadDependency(name) {
        if (this._data[name].args.length === 0) 
            return new Dependency(
                name,
                require(Path.join(this._rootPath, this._data[name].class)),
                []
            )
        
        let args = this._data[name].args.map(arg => this._loadDependency(arg))
        
        return new Dependency(
            name,
            require(Path.join(this._rootPath, this._data[name].class)),
            args
        )
    }
}

module.exports = JSONInjectDataSource