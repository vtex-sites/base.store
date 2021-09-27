import { execute, parse } from 'graphql'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { getSchema, getContextFactory } from '../server'
import persisted from '../../__generated__/persisted.graphql.json'

const persistedQueries = new Map(Object.entries(persisted))

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
  const query = persistedQueries.get(hash)

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

const contextFactory = getContextFactory()

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
      schema: await getSchema(),
      document: parse(query),
      variableValues: variables,
      contextValue: contextFactory({}),
      operationName,
    })

    if (
      process.env.NODE_ENV !== 'production' &&
      Array.isArray(response.errors)
    ) {
      response.errors.forEach(console.error)
    }

    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(response))
  } catch (err) {
    console.error(err)

    res.status(500)
  }
}

export default handler
