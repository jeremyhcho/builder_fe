if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Store.prod.js')
} else {
  module.exports = require('./Store.dev.js')
}
