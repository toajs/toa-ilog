'use strict'
// **Github:** https://github.com/toajs/toa-morgan
//
// modified from https://github.com/expressjs/morgan/blob/master/test/morgan.js
// **License:** MIT

const Toa = require('toa')
const tman = require('tman')
const assert = require('assert')
const request = require('supertest')
const logging = require('..')

tman.suite('toa-logging', function () {
  tman.it('default logging', function * () {
    let app = new Toa()
    let res = null
    app.use(logging({
      consume: function (log) {
        assert.ok(log.start > 0)
        assert.ok(log.time >= 0)
        assert.ok(log.ip)
        assert.ok(log.method)
        assert.ok(log.url)
        assert.ok(log.protocol)
        assert.ok(log.userAgent)
        res = log
      }
    }))
    app.use(function () {
      this.body = 'ok'
    })

    yield request(app.listen())
      .get('/')
      .expect(200)

    assert.ok(res instanceof logging.Log)
    assert.ok(res.method)
  })

  tman.it('custom logging', function * () {
    let app = new Toa()
    let res = null
    app.use(logging({
      init: function (log) {
        assert.ok(log instanceof logging.Log)
        log.test = true
      },
      consume: function (log) {
        assert.ok(log instanceof logging.Log)

        assert.ok(log.start > 0)
        assert.ok(log.time >= 0)
        assert.ok(log.ip)
        assert.ok(log.method)
        assert.ok(log.url)
        assert.ok(log.protocol)
        assert.ok(log.userAgent)
        assert.ok(log.test === true)
        res = log
      }
    }))
    app.use(function () {
      this.body = 'ok'
    })

    yield request(app.listen())
      .get('/')
      .expect(200)

    assert.ok(res instanceof logging.Log)
    assert.ok(res.test === true)
  })
})
