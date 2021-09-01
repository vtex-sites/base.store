import { introspectSchema, wrapSchema } from '@graphql-tools/wrap'
import { execute, parse, print } from 'graphql'
import fetch from 'isomorphic-unfetch'
import type { AsyncExecutor } from '@graphql-tools/utils'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import persistedQueries from '../../__generated__/persisted.graphql.json'

const store = process.env.GATSBY_STORE_ID
const workspace = process.env.GATSBY_VTEX_IO_WORKSPACE

const executor: AsyncExecutor = async ({ document, variables }) => {
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

const schemaPromise = introspectSchema(executor).then((schema) =>
  wrapSchema({
    schema,
    executor,
  })
)

const parseProdRequest = (req: GatsbyFunctionRequest) => {
  const res =
    req.method === 'POST'
      ? JSON.parse(req.body)
      : {
          operationName: req.query.operationName,
          extensions: JSON.parse(req.query.extensions),
          variables: JSON.parse(req.query.variables),
        }

  const hash = res.extensions.persistedQuery.sha256Hash
  const query = (persistedQueries as any)[hash]

  if (query == null) {
    throw new Error(`No query found with hash: ${hash}`)
  }

  return {
    query,
    operationName: res.operationName,
    variables: res.variables,
  }
}

const parseDevRequest = (req: GatsbyFunctionRequest) => {
  if (req.method === 'POST') {
    return JSON.parse(req.body)
  }

  throw new Error('No GET request during development is allowed')
}

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405)

    return
  }

  const { operationName, variables, query } =
    process.env.NODE_ENV === 'production'
      ? parseProdRequest(req)
      : parseDevRequest(req)

  try {
    const response = await execute({
      schema: await schemaPromise,
      document: parse(query),
      variableValues: variables,
      operationName,
    })

    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(response))
  } catch (err) {
    console.error(err)
  }
}

export default handler
