'use strict'

const Should = require('should')
const DataSource = require('../lib/JSONInjectDataSource')
const Injector = require('../lib/Injector')

const Computer = require('./testClasses/Computer')
const CPU = require('./testClasses/CPU')
const GPU = require('./testClasses/GPU')
const HDD = require('./testClasses/HDD')
const RAM = require('./testClasses/RAM')

const CONFIG = new DataSource(require('./config.json'), __dirname)


describe('Injector', function () {
    it('should create instance of a class without dependencies', function () {
        let injector = new Injector(CONFIG)

        injector.get('CPU').should.be.an.instanceOf(CPU)
    })

    it('should create instance of a class without dependencies', function () {
        let injector = new Injector(CONFIG)

        injector.get('Computer').should.be.an.instanceOf(Computer)
        injector.get('CPU').should.be.an.instanceOf(CPU)
        injector.get('GPU').should.be.an.instanceOf(GPU)
        injector.get('HDD').should.be.an.instanceOf(HDD)
        injector.get('RAM').should.be.an.instanceOf(RAM)
    })

    it('should inject same instance in several classes', function () {
        let injector = new Injector(CONFIG)

        let computer = injector.get('Computer')
        let cpu = injector.get('CPU')
        let ram = injector.get('RAM')

        injector.get('RAM').should.be.an.instanceOf(RAM)

        computer.ram.should.equal(ram)
        cpu.ram.should.equal(ram)
        computer.ram.should.equal(cpu.ram)
    })
})