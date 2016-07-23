'use strict'

class CPU {
    constructor(ram) {
        this._ram = ram
    }

    get ram() {
        return this._ram
    }
}

module.exports = CPU