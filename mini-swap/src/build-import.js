
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./index.min.js')
} else {
  module.exports = require('./index.cjs.js')
}
