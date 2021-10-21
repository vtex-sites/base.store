/* eslint-disable node/global-require */

if (process.env.GATSBY_COMMERCE_PLATFORM === 'vtex') {
  module.exports = require('./vtex.js')
} else {
  throw new Error(
    `No config found for platform: ${process.env.GATSBY_COMMERCE_PLATFORM}`
  )
}
