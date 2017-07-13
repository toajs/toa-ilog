'use strict'
// **Github:** https://github.com/toajs/toa-logging
//
// **License:** MIT
// Modified from https://github.com/expressjs/logging

const ilog = require('ilog')

/**
 * Create a logging middleware.
 *
 * @param {Object} [options]
 * @return {Function} Toa middleware
 * @public
 */
function logging (options) {
  options = options || {}

  // check if log entry should be skipped
  const skipper = typeof options.skipper === 'function' ? options.skipper : noOp
  const initFn = typeof options.init === 'function' ? options.init : defaultInit
  const consumeFn = typeof options.consume === 'function' ? options.consume : defaultConsume

  return function logger () {
    if (skipper.call(this)) return

    this.state.log = new Log(this)
    initFn.call(this, this.state.log)
    this.on('end', handle).on('close', handle)
  }

  function handle () {
    this.removeListener('end', handle).removeListener('close', handle)

    let log = this.state.log
    if (log.start > 0) log.time = Date.now() - log.start
    consumeFn.call(this, log)
  }
}

function noOp () { return false }

function defaultInit (log) {} // do nothing~

function defaultConsume (log) {
  log.status = this.status
  ilog.info(log) // write the log by ilog.info
}

class Log {
  constructor (ctx) {
    this.start = Date.now()
    this.time = 0
    this.ip = ctx.ip
    this.method = ctx.method
    this.url = ctx.originalUrl
    this.protocol = ctx.protocol
    this.userAgent = ctx.get('user-agent')
  }
}

logging.Log = Log
module.exports = logging
