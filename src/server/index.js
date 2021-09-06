const { getSchema: storeApiGetSchema } = require('@vtex/store-api')

const options = {
  platform: process.env.GATSBY_COMMERCE_PLATFORM,
  account: process.env.GATSBY_STORE_ID,
  environment: process.env.GATSBY_VTEX_ENVIRONMENT,
}

const getSchema = () => storeApiGetSchema(options)

const memoize = (fn) => {
  let memoized

  return () => {
    if (memoized === undefined) {
      memoized = fn()
    }

    return memoized
  }
}

module.exports = memoize(getSchema)
