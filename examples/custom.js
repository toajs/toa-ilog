'use strict'
// **Github:** https://github.com/toajs/toa-morgan
//
// **License:** MIT
const Toa = require('toa')
const uuid = require('uuid')
const logging = require('../')

const app = new Toa()
app.use(logging({
  init: function (log) {
    log.id = uuid.v4()
    log.host = this.host
  },
  consume: function (log) {
    console.log(new Date().toISOString(), JSON.stringify(log))
  }
}))

app.use(function () {
  this.body = 'Hello!'
})

app.listen(3000)
