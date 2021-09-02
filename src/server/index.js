const fetch = require('isomorphic-unfetch')
const { introspectSchema, wrapSchema } = require('@graphql-tools/wrap')
const { print } = require('graphql')

const store = process.env.GATSBY_STORE_ID
const workspace = process.env.GATSBY_VTEX_IO_WORKSPACE

const executor = async ({ document, variables }) => {
  const query = print(document)
  const response = await fetch(
    `https://${workspace}--${store}.myvtex.com/graphql/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    }
  )

  return response.json()
}

const getSchema = async () => {
  const remoteSchema = await introspectSchema(executor)

  return wrapSchema({
    schema: remoteSchema,
    executor,
  })
}

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
