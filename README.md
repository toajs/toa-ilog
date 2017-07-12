# toa-logging

HTTP request logging middleware for Toa.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

## Example

### simple toa server

```js
const Toa = require('toa')
const logging = require('toa-logging')

const app = new Toa()
app.use(logging())
app.use(function () {
  this.body = 'Hello!'
})

app.listen(3000)
```

## API

```js
const logging = require('toa-logging')
```

### logging([options])

Create a new logging middleware function with `options`.

#### options.skipper

Function to determine if logging is skipped, defaults to `false`. This function
will be called as `skipper.call(context)`.

```js
logging({
  skipper: function () {
    return this.path === '/'
  }
})
```

#### options.init

Set a init function that will run at the begin, default to:

```js
function defaultInit (log) {} // do nothing~
```

#### options.consume

Set a consume function that will run at the end, default to:

```js
function defaultConsume (log) {
  ilog.info(log) // write the log by ilog.info
}
```

## Licences

(The MIT License)

[npm-url]: https://npmjs.org/package/toa-logging
[npm-image]: http://img.shields.io/npm/v/toa-logging.svg

[travis-url]: https://travis-ci.org/toajs/toa-logging
[travis-image]: http://img.shields.io/travis/toajs/toa-logging.svg

[downloads-url]: https://npmjs.org/package/toa-logging
[downloads-image]: http://img.shields.io/npm/dm/toa-logging.svg?style=flat-square
