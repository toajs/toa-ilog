'use strict'
// **Github:** https://github.com/toajs/toa-morgan
//
// **License:** MIT
const Toa = require('toa')
const logging = require('../index')

const app = new Toa()
app.use(logging())
app.use(function () {
  this.body = 'Hello!'
})

app.listen(3000)
