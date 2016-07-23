'use strict'

class Computer {
    constructor(ram, hdd, cpu, gpu) {
        this._cpu = cpu
        this._gpu = gpu
        this._hdd = hdd
        this._ram = ram
    }

    get cpu() {
        return this._cpu
    }

    get gpu() {
        return this._gpu
    }

    get hdd() {
        return this._hdd
    }

    get ram() {
        return this._ram
    }
}

module.exports = Computer