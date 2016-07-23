#Razr 🗡

Simple and easy to use DI container for node.js

## Installation

To install the stable version:

```bash
npm install --save razr
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.
If you don’t, you can access these files on [npmcdn](https://npmcdn.com/razr/), download them, or point your package manager to them.


## Quick start

First of all you have to create a config file, describing your dependencies:

```js
{
  "Computer": {
    "class": "./Computer.js", // path to computer class file
    "args": ["RAM", "HDD", "CPU", "GPU"] // dependencies we want to inject
  },
  "RAM": {
    "class": "./RAM.js",
    "args": []
  },
  "HDD": {
    "class": "./HDD.js",
    "args": []
  },
  "CPU": {
    "class": "./CPU.js",
    "args": ["RAM"]
  },
  "GPU": {
    "class": "./GPU.js",
    "args": []
  }
}
```

**Note:**
the path you write in config should be relative to the entry point of your app
_(the file, where you `require` razr)_

So the `Computer` class should be like this:

```js
'use strict'

class Computer {
    constructor(ram, hdd, cpu, gpu) {
        this._cpu = cpu
        this._gpu = gpu
        this._hdd = hdd
        this._ram = ram
    }
}

module.exports = Computer
```

And finally you can get your `Computer` instance at ease:

```js

const Injector = require('razr')(__dirname, './path/to/your/config.json')

const computer = Injector.get('Computer')

```

**That's it**, simple and clear! 💥

## License

Copyright (c) 2016 Narek Abovyan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.