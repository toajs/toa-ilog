'use strict'
// **Github:** https://github.com/toajs/toa-morgan
//
// **License:** MIT
const Toa = require('toa')
const logging = require('../index')

const app = new Toa()
app.use(logging())
app.use(function () {
  // logging middleware will add a Log instance to context.state
  this.body = this.state.log
})

app.listen(3000)
